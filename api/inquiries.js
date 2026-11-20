const { createHmac } = require('node:crypto');
// Public inquiry intake. Secrets must only be configured in Vercel environment variables.
const MAX_BODY = 12_000;
// Support changing Vercel Preview URLs while blocking cross-site browser posts.
function validRequestHost(host) {
  if (host === 'ab-studio-portafolio.vercel.app' || host === 'localhost:3000' || host === '127.0.0.1:3000') return true;
  return /^ab-studio-portafolio-[a-z0-9-]+\.vercel\.app$/.test(host);
}
function configured() {
  const hasCredentials = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY?.startsWith('sb_secret_'));
  // Do not activate public lead capture just because credentials were copied into Production.
  // Public launch requires a deliberate opt-in after security, abuse and backup checks.
  return hasCredentials && (process.env.VERCEL_ENV !== 'production' || (process.env.CRM_CAPTURE_ENABLED === 'true' && process.env.CRM_RATE_LIMIT_ENABLED === 'true'));
}
const text = (v,n=1000) => typeof v === 'string' ? v.trim().slice(0,n) : '';
const emailOkay = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254;
function response(res,code,body){res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json; charset=utf-8');return res.status(code).json(body)}
module.exports = async function inquiry(req,res){
  if(req.method === 'GET') return response(res,200,{ok:true,service:'crm-intake',configured:configured()});
  if(req.method !== 'POST'){res.setHeader('Allow','GET, POST');return response(res,405,{error:'method_not_allowed'});}
  const origin=req.headers.origin;
  const host=String(req.headers.host||'').toLowerCase().trim();
  if(!validRequestHost(host)) return response(res,403,{error:'host_not_allowed'});
  if(!origin) return response(res,403,{error:'origin_required'});
  try {
    const url = new URL(origin);
    if(url.host.toLowerCase() !== host || !['https:','http:'].includes(url.protocol) ||
       (url.protocol==='http:' && !host.startsWith('localhost:') && !host.startsWith('127.0.0.1:')))
      return response(res,403,{error:'origin_not_allowed'});
  } catch {return response(res,403,{error:'origin_not_allowed'});}
  const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body||{});
  if(Buffer.byteLength(raw)>MAX_BODY) return response(res,413,{error:'too_large'});
  let data;try{data=typeof req.body==='string'?JSON.parse(req.body):req.body;}catch{return response(res,400,{error:'invalid_json'});}
  if(!data||typeof data!=='object'||Array.isArray(data))return response(res,400,{error:'invalid_body'});
  if(text(data.website,200))return response(res,422,{ok:false,error:'invalid_fields'}); // Do not claim an unrecorded submission succeeded
  if(data.consent!==true)return response(res,400,{error:'consent_required'});
  const name=text(data.name,120), email=text(data.email,254), description=text(data.description,4000);
  const service=text(data.service,80), plan=text(data.plan,80), channel=text(data.channel,30);
  const modules=Array.isArray(data.modules)?data.modules.filter(x=>typeof x==='string').slice(0,12).map(x=>x.slice(0,60)):[];
  if(name.length<2 || !emailOkay(email) || description.length<10)return response(res,400,{error:'invalid_fields'});
  if(!['whatsapp','email'].includes(channel))return response(res,400,{error:'invalid_channel'});
  const submissionId=text(data.submission_id,36);
  if(!/^[0-9a-f]{8}-[0-9a-f-]{27,28}$/i.test(submissionId))return response(res,400,{error:'invalid_submission_id'});
  const url=process.env.SUPABASE_URL, key=process.env.SUPABASE_SECRET_KEY;
  if(!configured()||!url||!key)return response(res,503,{error:'crm_not_configured'});
  let endpoint;try{endpoint=new URL('/rest/v1/crm_leads?on_conflict=submission_id',url);if(endpoint.protocol!=='https:')throw Error('https required');}catch{return response(res,503,{error:'crm_not_configured'});}
  // Production throttle: atomic, database-backed, fail-closed. Never stores raw IP/email.
  // The database RPC must be created first (see supabase/migrations/20261120_crm_rate_limit.sql).
  if(process.env.VERCEL_ENV === 'production' || process.env.CRM_RATE_LIMIT_ENABLED === 'true'){
    try{
      const ip=String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '')
        .split(',')[0].trim().slice(0,100);
      const identities=['email:'+email.toLowerCase()];
      if(ip)identities.push('ip:'+ip);
      for(const identity of identities){
        const fingerprint=createHmac('sha256',key).update(identity).digest('hex');
        const limitResponse=await fetch(new URL('/rest/v1/rpc/crm_rate_limit_check',url),{
          method:'POST',
          headers:{'apikey':key,'Content-Type':'application/json'},
          body:JSON.stringify({p_fingerprint:fingerprint}),
          signal:AbortSignal.timeout(5000)
        });
        if(!limitResponse.ok){
          console.error('CRM throttle unavailable',limitResponse.status);
          return response(res,503,{error:'rate_limit_unavailable'});
        }
        const granted=await limitResponse.json();
        if(granted!==true){
          res.setHeader('Retry-After','3600');
          return response(res,429,{error:'rate_limited'});
        }
      }
    }catch(error){
      console.error('CRM throttle exception',error?.name||'unknown');
      return response(res,503,{error:'rate_limit_unavailable'});
    }
  }
  const item={submission_id:submissionId,name,email,description,service,plan,channel,modules,source:'website',status:'new'};
  try{
    const result=await fetch(endpoint,{method:'POST',headers:{'apikey':key,'Content-Type':'application/json','Prefer':'resolution=ignore-duplicates,return=minimal'},body:JSON.stringify(item),signal:AbortSignal.timeout(8000)});
    if(!result.ok){console.error('CRM insert failed',result.status);return response(res,502,{error:'storage_unavailable'});}
    return response(res,201,{ok:true,submission_id:submissionId});
  }catch(e){console.error('CRM intake error',e?.name||'unknown');return response(res,502,{error:'storage_unavailable'});}
};
