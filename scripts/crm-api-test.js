const assert = require('node:assert/strict');
const handler = require('../api/inquiries');
const valid = {
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
 const out=res();await handler({method,headers:{origin,host:'ab-studio-portafolio.vercel.app'},body:data},out);return out;
}
(async()=>{
 const prev={url:process.env.SUPABASE_URL,key:process.env.SUPABASE_SECRET_KEY,env:process.env.VERCEL_ENV,enabled:process.env.CRM_CAPTURE_ENABLED,fetch:global.fetch};
 try{
  delete process.env.SUPABASE_URL;delete process.env.SUPABASE_SECRET_KEY;
  const health=await call(valid,'GET');assert.equal(health.statusCode,200);assert.equal(health.body.configured,false);
  assert.equal((await call({...valid,consent:false})).statusCode,400);
  assert.equal((await call({...valid,email:'not-an-email'})).statusCode,400);
  assert.equal((await call({...valid,description:'short'})).statusCode,400);
  assert.equal((await call(valid,'POST','https://attacker.example')).statusCode,403);
  assert.equal((await call(valid)).statusCode,503);
  const preview = res(); await handler({method:'POST',headers:{origin:'https://ab-studio-portafolio-jp92qlf0d-raulsandi2000-3282.vercel.app',host:'ab-studio-portafolio-jp92qlf0d-raulsandi2000-3282.vercel.app'},body:valid},preview); assert.equal(preview.statusCode,503);
  process.env.SUPABASE_URL='https://example.supabase.co';process.env.SUPABASE_SECRET_KEY='sb_secret_test_server_only';
  process.env.VERCEL_ENV='production';
  delete process.env.CRM_CAPTURE_ENABLED;
  const blocked = await call(valid);
  assert.equal(blocked.statusCode,503,'Unapproved production intake must remain disabled');
  assert.equal((await call(valid,'GET')).body.configured,false);
  process.env.CRM_CAPTURE_ENABLED='true';
  assert.equal((await call(valid,'GET')).body.configured,true);
  const trap = await call({...valid,website:'https://spam.invalid'});
  assert.equal(trap.statusCode,422);
  assert.equal(trap.body.ok,false,'Honeypot must not claim an unsaved lead was recorded');

  let inserts=0; global.fetch=async(url,opts)=>{inserts++;assert.match(String(url),/rest\/v1\/crm_leads/);const item=JSON.parse(opts.body);assert.equal(item.name,'Test Client');assert.equal(opts.headers.apikey,'sb_secret_test_server_only');assert.ok(!('Authorization' in opts.headers));assert.ok(!('consent' in item));return {ok:true,status:201}};
  const ok=await call(valid);assert.equal(ok.statusCode,201);assert.equal(ok.body.ok,true);assert.equal(inserts,1);
  global.fetch=async()=>({ok:false,status:503});
  const failed=await call(valid);assert.equal(failed.statusCode,502);assert.equal(failed.body.error,'storage_unavailable');
  console.log('CRM API validation and storage failure tests passed.');
 }finally{
  global.fetch=prev.fetch;
  if(prev.url===undefined)delete process.env.SUPABASE_URL;else process.env.SUPABASE_URL=prev.url;
  if(prev.key===undefined)delete process.env.SUPABASE_SECRET_KEY;else process.env.SUPABASE_SECRET_KEY=prev.key;
  if(prev.env===undefined)delete process.env.VERCEL_ENV;else process.env.VERCEL_ENV=prev.env;
  if(prev.enabled===undefined)delete process.env.CRM_CAPTURE_ENABLED;else process.env.CRM_CAPTURE_ENABLED=prev.enabled;
 }
})().catch(err=>{console.error(err);process.exitCode=1});
