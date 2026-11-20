// One-off public-key diagnostic. Makes no authentication attempts and needs no secret.
const fs=require('node:fs'), vm=require('node:vm'), path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../public/admin/public-config.js'),'utf8');
const sandbox={window:{}};vm.runInNewContext(source,sandbox,{timeout:1000});
const {projectUrl,publishableKey}=sandbox.window.AB_STUDIO_CRM_PUBLIC_CONFIG||{};
if(!projectUrl||!publishableKey)throw Error('Missing bundled public configuration');
(async()=>{
  const res=await fetch(projectUrl+'/auth/v1/settings',{
    headers:{apikey:publishableKey},
    signal:AbortSignal.timeout(12000)
  });
  console.log('Supabase Auth public configuration response:',res.status);
  const body=await res.text();
  if(res.status===401||res.status===403){
    console.error('Publishable key rejected by Supabase; verify it belongs to the project URL.');
    process.exitCode=1;
  }else if(res.ok){
    console.log('Supabase Auth accepted the public key.');
  }else{
    console.error('Supabase Auth responded with a non-success status; inspect configuration.');
    process.exitCode=1;
  }
})().catch(err=>{console.error('Could not check Supabase Auth:',err?.name||'unknown');process.exitCode=1});
