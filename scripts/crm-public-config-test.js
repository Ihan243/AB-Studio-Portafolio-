const assert=require('node:assert/strict');
const handler=require('../api/crm-public-config');
const publicKey='sb_publishable_TEST_PUBLIC_VALUE_FOR_QA';
function fakeResponse(){
 return {statusCode:200,headers:{},setHeader(k,v){this.headers[k]=v;return this},
 status(n){this.statusCode=n;return this},json(data){this.data=data;return this}};
}
function invoke(method='GET'){const res=fakeResponse();handler({method},res);return res}
const old={url:process.env.SUPABASE_URL,pub:process.env.SUPABASE_PUBLISHABLE_KEY,secret:process.env.SUPABASE_SECRET_KEY};
try{
 delete process.env.SUPABASE_URL;delete process.env.SUPABASE_PUBLISHABLE_KEY;
 assert.equal(invoke().statusCode,503,'No public config must fail closed');
 assert.equal(invoke('POST').statusCode,405);
 process.env.SUPABASE_URL='https://project.supabase.co';
 process.env.SUPABASE_PUBLISHABLE_KEY='sb_secret_wrong_key';
 assert.equal(invoke().statusCode,503,'Secret key must never be served as public configuration');
 process.env.SUPABASE_PUBLISHABLE_KEY=publicKey;
 process.env.SUPABASE_SECRET_KEY='sb_secret_DO_NOT_EXPOSE_THIS_VALUE';
 const response=invoke();
 assert.equal(response.statusCode,200);
 assert.equal(response.data.ok,true);
 assert.equal(response.data.projectUrl,'https://project.supabase.co');
 assert.equal(response.data.publishableKey,publicKey);
 assert.equal(response.headers['Cache-Control'],'no-store');
 assert.ok(!JSON.stringify(response.data).includes('DO_NOT_EXPOSE'));
 process.env.SUPABASE_URL='https://evil.example';
 assert.equal(invoke().statusCode,503,'Only the intended Supabase host may be configured');
 console.log('CRM public configuration tests passed.');
}finally{
 for(const [name,value] of [['SUPABASE_URL',old.url],['SUPABASE_PUBLISHABLE_KEY',old.pub],['SUPABASE_SECRET_KEY',old.secret]]){
   if(value===undefined)delete process.env[name];else process.env[name]=value;
 }
}
