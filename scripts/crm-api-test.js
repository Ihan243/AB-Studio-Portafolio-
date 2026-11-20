const assert=require('node:assert/strict');
const handler=require('../api/inquiries');
const valid={
  submission_id:'8e4c5d31-68ae-49de-8a0a-18f8d27bb5f2',
  name:'Test Client',email:'client@example.com',
  description:'Please build a business website for our shop.',
  service:'website',plan:'Basic',channel:'email',modules:[],consent:true,website:''
};
function res(){
 return {headers:{},statusCode:200,setHeader(k,v){this.headers[k]=v;return this},
 status(code){this.statusCode=code;return this},json(value){this.body=value;return this}};
}
async function call(data,method='POST',origin='https://ab-studio-portafolio.vercel.app'){
 const out=res();await handler({method,headers:{origin,host:'ab-studio-portafolio.vercel.app','x-forwarded-for':'198.51.100.6'},body:data},out);return out;
}
(async()=>{
 const original={
  url:process.env.SUPABASE_URL,key:process.env.SUPABASE_SECRET_KEY,
  env:process.env.VERCEL_ENV,capture:process.env.CRM_CAPTURE_ENABLED,
  throttle:process.env.CRM_RATE_LIMIT_ENABLED,fetch:global.fetch
 };
 try{
  delete process.env.SUPABASE_URL;delete process.env.SUPABASE_SECRET_KEY;
  assert.equal((await call(valid,'GET')).body.configured,false);
  assert.equal((await call(valid,'PUT')).statusCode,405);
  assert.equal((await call({...valid,consent:false})).statusCode,400);
  assert.equal((await call({...valid,email:'invalid'})).statusCode,400);
  assert.equal((await call({...valid,description:'tiny'})).statusCode,400);
  assert.equal((await call(valid,'POST','https://attacker.example')).statusCode,403);
  assert.equal((await call(valid)).statusCode,503);
  const preview=res();
  await handler({method:'POST',headers:{
    origin:'https://ab-studio-portafolio-jp92qlf0d-raulsandi2000-3282.vercel.app',
    host:'ab-studio-portafolio-jp92qlf0d-raulsandi2000-3282.vercel.app'
  },body:valid},preview);
  assert.equal(preview.statusCode,503);
  process.env.SUPABASE_URL='https://example.supabase.co';
  process.env.SUPABASE_SECRET_KEY='sb_secret_test_server_only';
  process.env.VERCEL_ENV='production';
  delete process.env.CRM_CAPTURE_ENABLED;
  delete process.env.CRM_RATE_LIMIT_ENABLED;
  assert.equal((await call(valid)).statusCode,503);
  assert.equal((await call(valid,'GET')).body.configured,false);
  process.env.CRM_CAPTURE_ENABLED='true';
  assert.equal((await call(valid,'GET')).body.configured,false,'Public capture requires throttle opt-in');
  process.env.CRM_RATE_LIMIT_ENABLED='true';
  assert.equal((await call(valid,'GET')).body.configured,true);
  assert.equal((await call({...valid,website:'https://spam.invalid'})).statusCode,422);
  let rpc=0,inserts=0;
  global.fetch=async(url,opts)=>{
    const target=String(url);
    assert.equal(opts.headers.apikey,'sb_secret_test_server_only');
    assert.ok(!('Authorization' in opts.headers));
    if(target.includes('/rpc/crm_rate_limit_check')){
      rpc++;
      const json=JSON.parse(opts.body);
      assert.match(json.p_fingerprint,/^[0-9a-f]{64}$/);
      return {ok:true,status:200,json:async()=>true};
    }
    inserts++;
    assert.match(target,/rest\/v1\/crm_leads/);
    const item=JSON.parse(opts.body);
    assert.equal(item.name,'Test Client');
    assert.ok(!('consent' in item));
    return {ok:true,status:201};
  };
  const ok=await call(valid);
  assert.equal(ok.statusCode,201);
  assert.equal(ok.body.ok,true);
  assert.equal(inserts,1);
  assert.equal(rpc,2,'Must rate-limit both email and IP when available');
  global.fetch=async(url)=>{
    if(String(url).includes('/rpc/crm_rate_limit_check'))return {ok:true,status:200,json:async()=>false};
    throw Error('Storage must not be reached after throttle denial');
  };
  const throttled=await call(valid);
  assert.equal(throttled.statusCode,429);
  assert.equal(throttled.body.error,'rate_limited');
  assert.equal(throttled.headers['Retry-After'],'3600');
  global.fetch=async(url)=>{
    if(String(url).includes('/rpc/crm_rate_limit_check'))return {ok:false,status:404};
    throw Error('Storage must not be reached when throttle is unavailable');
  };
  assert.equal((await call(valid)).statusCode,503,'Throttle failure must fail closed');
  global.fetch=async(url)=>{
    if(String(url).includes('/rpc/crm_rate_limit_check'))return {ok:true,status:200,json:async()=>true};
    return {ok:false,status:503};
  };
  const failed=await call(valid);
  assert.equal(failed.statusCode,502);
  assert.equal(failed.body.error,'storage_unavailable');
  console.log('CRM intake validation, fail-closed throttling and storage tests passed.');
 }finally{
  global.fetch=original.fetch;
  for(const [k,v] of [
    ['SUPABASE_URL',original.url],['SUPABASE_SECRET_KEY',original.key],
    ['VERCEL_ENV',original.env],['CRM_CAPTURE_ENABLED',original.capture],
    ['CRM_RATE_LIMIT_ENABLED',original.throttle]
  ]){if(v===undefined)delete process.env[k];else process.env[k]=v}
 }
})().catch(e=>{console.error(e);process.exitCode=1});
