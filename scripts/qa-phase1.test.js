'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const js=read('public/assets/js/site.js'),css=read('public/assets/css/site.css');
const routes=['/','/servicios/','/pricing.html','/sitios-web/','/business-management/','/crm/','/sistemas/','/seo/','/automatizacion/','/empresa/','/blog/','/proyectos/','/faq/','/privacidad/','/condiciones/'];
const htmlFile=route=>route==='/'?'public/index.html':route==='/pricing.html'?'public/pricing.html':'public'+route+'index.html';
new Function(js);
new Function(read('public/assets/js/effects.js'));
new Function(read('public/assets/js/entrance.js'));
const conf=JSON.parse(read('vercel.json'));
assert.equal(conf.outputDirectory,'public');
assert.ok(conf.redirects.some(x=>x.source==='/pricing/'&&x.destination==='/pricing.html'));
assert.ok(exists('public/404.html')&&exists('public/robots.txt')&&exists('public/sitemap.xml'));
assert.match(read('public/404.html'),/noindex/);
const known=new Set(routes),unverified=new Set();
let localLinks=0,assetLinks=0,altChecked=0;
for(const route of routes){
  const file=htmlFile(route);
  assert.ok(exists(file),'Missing route '+route);
  const h=read(file);
  assert.match(h,/<title>[^<]+<\/title>/);
  assert.match(h,/<meta name="description" content="[^"]+"/);
  assert.match(h,/<link rel="canonical" href="https:\/\/ab-studio-portafolio\.vercel\.app\//);
  assert.match(h,/<h1\b/);
  const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,'Duplicate HTML IDs in '+route);
  for(const m of h.matchAll(/<img\b[^>]*>/g)){assert.match(m[0],/\balt="[^"]*"/,'Image without alt in '+route);altChecked++;}
  for(const m of h.matchAll(/<a\b[^>]*href="([^"]+)"/g)){
    const href=m[1];
    if(href.startsWith('#')&&href!=='#')assert.ok(ids.includes(decodeURIComponent(href.slice(1))),'Broken anchor '+route+href);
    if(href.startsWith('/')&&!href.startsWith('//')){
      const p=href.split(/[?#]/)[0];
      assert.ok(p==='/'||known.has(p)||p.startsWith('/assets/')||(p.endsWith('.html')&&exists('public'+p)),'Broken internal URL '+route+' -> '+href);
      localLinks++;
    }
    if(/^https?:\/\//.test(href)&&/preview\.emergentagent\.com|preview\.c24\.airoapp\.ai/.test(href))unverified.add(href.split('?')[0]);
  }
  for(const m of h.matchAll(/(?:src|poster|href)="(\/assets\/[^"#?]+)"/g)){
    assert.ok(exists('public'+m[1]),'Missing asset '+m[1]);
    assetLinks++;
  }
}
const slice=(start,end)=>js.slice(js.indexOf(start),js.indexOf(end,js.indexOf(start)));
const dict=new Function(slice('const copy = ','const pageIntroCopy = ')+'return copy;')();
assert.deepEqual(Object.keys(dict.en).sort(),Object.keys(dict.es).sort());
const core=js.slice(0,js.indexOf('const copy = '));
const quote=slice('const quoteData = ','const businessAddonData = ');
const crm=slice('const crmText = ','        function showRoute(');
const runtime=new Function(core+quote+crm+'return {abPrices,quoteMarkup,quoteUpdate,pricingPageMarkup,pricingCalculate};')();
for(const lang of ['en','es']){
 const markup=runtime.pricingPageMarkup(lang);
 assert.equal((markup.match(/class="ab-pricing-service"/g)||[]).length,4);
 assert.equal((markup.match(/class="ab-pricing-module"/g)||[]).length,6);
 assert.match(runtime.quoteMarkup(lang,'home'),/data-q-initial/);
}
const samples=[
 [{website:'existing',management:false,plan:'basic',modules:[],crm:'none',seo:false},[0,0,0]],
 [{website:'existing',management:true,plan:'professional',modules:[],crm:'none',seo:false},[450,450,25]],
 [{website:'new',management:true,plan:'professional',modules:['catalog','inventory','orders'],crm:'none',seo:false},[3050,3050,75]],
 [{website:'new',management:true,plan:'basic',modules:['crm','catalog'],crm:'starter',seo:true},[2900,3500,104]],
 [{website:'existing',management:false,plan:'premium',modules:[],crm:'enterprise',seo:false},[3000,null,199]],
 [{website:'new',management:true,plan:'unknown',modules:['__bad__','catalog','catalog','base'],crm:'bad',seo:true},[900,900,65]],
 [{website:'new',management:true,plan:'basic',modules:null,crm:'none',seo:false},[1550,1550,25]]
];
for(const [state,expected] of samples){
 const r=runtime.pricingCalculate(state);
 assert.deepEqual([r.min,r.max,r.monthly],expected,JSON.stringify(state));
 assert.ok(Number.isFinite(r.min)&&Number.isFinite(r.monthly));
}
function mock({plan='professional',admin=false,seo=false,crm='none',modules=[],lang='en'}={}){
 const el=(v='')=>({value:v,checked:false,textContent:'',href:'',hidden:false});
 const fields={'[data-q-plan]:checked':el(plan),'[data-q-admin]':Object.assign(el(),{checked:admin}),
 '[data-q-seo]':Object.assign(el(),{checked:seo}),'[data-q-crm]':el(crm),
 '[data-q-initial]':el(),'[data-q-monthly]':el(),'[data-q-modules]':el(),
 '[data-q-custom]':el(),'[data-q-name]':el('Demo Co.'),'[data-q-notes]':el('Orders and stock'),
 '[data-q-email]':el(),'[data-q-wa]':el(),'[data-q-breakdown]':null};
 return {dataset:{quoteLang:lang},fields,querySelector:k=>fields[k],
 querySelectorAll:k=>k==='[data-q-module]:checked'?modules.map(value=>({value})):[]};
}
for(const opts of [
 {plan:'professional',admin:true,crm:'none',modules:['catalog','orders'],lang:'es'},
 {plan:'nonsense',admin:true,crm:'unknown',modules:[],lang:'en'},
 {plan:'basic',admin:false,seo:true,crm:'enterprise',lang:'es'}
]){
 const root=mock(opts);runtime.quoteUpdate(root);
 const initial=root.fields['[data-q-initial]'].textContent;
 const monthly=root.fields['[data-q-monthly]'].textContent;
 assert.doesNotMatch(initial+monthly,/NaN|undefined|Infinity/);
 const mail=decodeURIComponent(root.fields['[data-q-email]'].href);
 const wa=decodeURIComponent(root.fields['[data-q-wa]'].href);
 assert.match(mail,/Demo Co\./);assert.match(wa,/Demo Co\./);
}
assert.match(js,/location\.pathname === '\/pricing\.html'\s*\?\s*'\/pricing\/'/);
assert.match(css,/body\.theme-dark/);
assert.match(css,/#home-inquiry \.inquiry-module-fieldset/);
console.log('Phase 1 static QA passed',JSON.stringify({routes:routes.length,localLinks,assetLinks,altChecked,languageKeys:Object.keys(dict.en).length,estimateCases:samples.length,externalPreviewsUnverified:unverified.size}));
if(unverified.size)console.log('Not verified externally:',[...unverified].join(' | '));