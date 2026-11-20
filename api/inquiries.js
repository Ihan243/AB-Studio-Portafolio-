// Public inquiry intake. Secrets must only be configured in Vercel environment variables.
const MAX_BODY = 12_000;
// Support changing Vercel Preview URLs while blocking cross-site browser posts.
function validRequestHost(host) {
  if (host === 'ab-studio-portafolio.vercel.app' || host === 'localhost:3000' || host === '127.0.0.1:3000') return true;
  return /^ab-studio-portafolio-[a-z0-9-]+\.vercel\.app$/.test(host);
}
function configured() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY?.startsWith('sb_secret_'));
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
  if(text(data.website,200))return response(res,200,{ok:true}); // spam honeypot; no DB write
  if(data.consent!==true)return response(res,400,{error:'consent_required'});
  const name=text(data.name,120), email=text(data.email,254), description=text(data.description,4000);
  const service=text(data.service,80), plan=text(data.plan,80), channel=text(data.channel,30);
  const modules=Array.isArray(data.modules)?data.modules.filter(x=>typeof x==='string').slice(0,12).map(x=>x.slice(0,60)):[];
  if(name.length<2 || !emailOkay(email) || description.length<10)return response(res,400,{error:'invalid_fields'});
  if(!['whatsapp','email'].includes(channel))return response(res,400,{error:'invalid_channel'});
  const submissionId=text(data.submission_id,36);
  if(!/^[0-9a-f]{8}-[0-9a-f-]{27,28}$/i.test(submissionId))return response(res,400,{error:'invalid_submission_id'});
  const url=process.env.SUPABASE_URL, key=process.env.SUPABASE_SECRET_KEY;
  if(!url||!key||!key.startsWith('sb_secret_'))return response(res,503,{error:'crm_not_configured'});
  let endpoint;try{endpoint=new URL('/rest/v1/crm_leads?on_conflict=submission_id',url);if(endpoint.protocol!=='https:')throw Error('https required');}catch{return response(res,503,{error:'crm_not_configured'});}
  const item={submission_id:submissionId,name,email,description,service,plan,channel,modules,source:'website',status:'new'};
  try{
    const result=await fetch(endpoint,{method:'POST',headers:{'apikey':key,'Content-Type':'application/json','Prefer':'resolution=ignore-duplicates,return=minimal'},body:JSON.stringify(item),signal:AbortSignal.timeout(8000)});
    if(!result.ok){console.error('CRM insert failed',result.status);return response(res,502,{error:'storage_unavailable'});}
    return response(res,201,{ok:true,submission_id:submissionId});
  }catch(e){console.error('CRM intake error',e?.name||'unknown');return response(res,502,{error:'storage_unavailable'});}
};
