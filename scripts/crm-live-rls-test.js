const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const config=fs.readFileSync(path.join(__dirname,'../public/admin/public-config.js'),'utf8');
const ctx={window:{}};
vm.runInNewContext(config,ctx,{timeout:1000});
const {projectUrl,publishableKey}=ctx.window.AB_STUDIO_CRM_PUBLIC_CONFIG||{};
assert.match(projectUrl||'',/^https:\/\/[a-z0-9-]+\.supabase\.co$/i);
assert.ok(publishableKey?.startsWith('sb_publishable_'));
async function anonymousRead(resource){
 const response=await fetch(projectUrl+'/rest/v1/'+resource,{
   headers:{apikey:publishableKey,Accept:'application/json'},
   signal:AbortSignal.timeout(10000)
 });
 if(response.status===401||response.status===403){
   console.log(resource+': anonymous access rejected ('+response.status+')');
   return;
 }
 assert.ok(response.ok,resource+': unexpected HTTP '+response.status);
 const data=await response.json();
 assert.ok(Array.isArray(data),resource+': unexpected response');
 assert.equal(data.length,0,resource+': public Supabase key exposed protected data');
 console.log(resource+': no records accessible to an anonymous caller');
}
(async()=>{
 await anonymousRead('crm_leads?select=id,name,email&limit=10');
 await anonymousRead('crm_staff?select=user_id&limit=10');
 console.log('Live anonymous CRM data access checks passed.');
})().catch(err=>{console.error(err.message||err);process.exitCode=1});
