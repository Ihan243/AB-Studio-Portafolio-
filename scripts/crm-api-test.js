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
 const out=res();await handler({method,headers:{origin},body:data},out);return out;
}
(async()=>{
 const prev={url:process.env.SUPABASE_URL,key:process.env.SUPABASE_SERVICE_ROLE_KEY,fetch:global.fetch};
 try{
  delete process.env.SUPABASE_URL;delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  assert.equal((await call(valid,'GET')).statusCode,405);
  assert.equal((await call({...valid,consent:false})).statusCode,400);
  assert.equal((await call({...valid,email:'not-an-email'})).statusCode,400);
  assert.equal((await call({...valid,description:'short'})).statusCode,400);
  assert.equal((await call(valid,'POST','https://attacker.example')).statusCode,403);
  assert.equal((await call(valid)).statusCode,503);
  process.env.SUPABASE_URL='https://example.supabase.co';process.env.SUPABASE_SERVICE_ROLE_KEY='private-test-secret';
  let inserts=0; global.fetch=async(url,opts)=>{inserts++;assert.match(String(url),/rest\/v1\/crm_leads/);const item=JSON.parse(opts.body);assert.equal(item.name,'Test Client');assert.ok(!('consent' in item));return {ok:true,status:201}};
  const ok=await call(valid);assert.equal(ok.statusCode,201);assert.equal(ok.body.ok,true);assert.equal(inserts,1);
  global.fetch=async()=>({ok:false,status:503});
  const failed=await call(valid);assert.equal(failed.statusCode,502);assert.equal(failed.body.error,'storage_unavailable');
  console.log('CRM API validation and storage failure tests passed.');
 }finally{
  global.fetch=prev.fetch;
  if(prev.url===undefined)delete process.env.SUPABASE_URL;else process.env.SUPABASE_URL=prev.url;
  if(prev.key===undefined)delete process.env.SUPABASE_SERVICE_ROLE_KEY;else process.env.SUPABASE_SERVICE_ROLE_KEY=prev.key;
 }
})().catch(err=>{console.error(err);process.exitCode=1});
