'use strict';
/**
 * Local browser QA for public pages, pricing and contact drafts.
 * Requires: npm install --no-save playwright && npx playwright install chromium
 * Run: node scripts/qa-phase1.browser.test.cjs
 */
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {setTimeout:delay}=require('node:timers/promises');
const {chromium}=require('playwright');
const path=require('node:path');
const base='http://127.0.0.1:43017';
const root=path.resolve(__dirname,'..');
const server=spawn(process.execPath,['server.js'],{cwd:root,env:{...process.env,PORT:'43017'},stdio:'pipe'});
server.stderr.on('data',data=>process.stderr.write(data));
async function waitForServer(){
 for(let i=0;i<75;i++){
   try{const r=await fetch(base+'/');if(r.status===200)return;}catch(_){}
   await delay(200);
 }
 throw new Error('Local server failed to start');
}
const paths=['/','/servicios/','/pricing.html','/sitios-web/','/business-management/','/crm/','/sistemas/','/seo/','/automatizacion/','/empresa/','/blog/','/proyectos/','/faq/','/privacidad/','/condiciones/'];
async function main(){
 await waitForServer();
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
   const context=await browser.newContext({viewport:{width:1280,height:900},locale:'en-US',reducedMotion:'reduce'});
   const page=await context.newPage();
   const exceptions=[];
   page.on('pageerror',e=>exceptions.push(String(e)));
   for(const route of paths){
     const r=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:20000});
     assert.equal(r.status(),200,'Broken local route '+route);
     assert.ok((await page.title()).includes('AB Studio'),'Missing title on '+route);
     assert.ok((await page.locator('h1').count())>=1,'Missing heading '+route);
   }
   // Invalid percent encodings must not crash the local server.
   const malformed=await fetch(base+'/bad%ZZ');
   assert.equal(malformed.status,400,'Malformed URL should receive HTTP 400');
   const stillAlive=await fetch(base+'/');
   assert.equal(stillAlive.status,200,'Server crashed on malformed path');
   const bad=await page.goto(base+'/does-not-exist/',{waitUntil:'domcontentloaded'});
   assert.equal(bad.status(),404,'Unknown routes must be 404');
   await page.goto(base+'/pricing.html',{waitUntil:'domcontentloaded'});
   assert.equal(await page.locator('.ab-pricing-service').count(),4);
   assert.equal(await page.locator('.ab-pricing-module').count(),6);
   const heading=page.locator('#pricing-overview .ab-pricing-header h2');
   await page.waitForSelector('[data-p-initial]');
   await page.locator('[data-p-module="catalog"]').check();
   await page.locator('[data-p-module="orders"]').check();
   assert.equal(await page.locator('[data-p-initial]').textContent(),'$1,150');
   assert.equal(await page.locator('[data-p-monthly]').textContent(),'$55/mo');
   await page.locator('[data-p-name]').fill('QA Example');
   await page.locator('[data-p-notes]').fill('Inventory and orders');
   const email=await page.locator('[data-p-email]').getAttribute('href');
   const whatsapp=await page.locator('[data-p-wa]').getAttribute('href');
   assert.match(decodeURIComponent(email),/QA Example/);
   assert.match(decodeURIComponent(whatsapp),/Inventory and orders/);
   await page.locator('#langToggle').click();
   await page.waitForFunction(()=>document.documentElement.lang==='es');
   assert.match(await heading.textContent(),/forma más clara/i,'Pricing heading did not translate');
   assert.equal(await page.locator('[data-p-initial]').textContent(),'$1,150','Language switch reset estimate');
   assert.equal(await page.locator('[data-p-monthly]').textContent(),'$55/mes','Monthly estimate not translated');
   assert.equal(await page.locator('a[data-copy="nav.pricing"]').first().getAttribute('aria-current'),'page');
   const darkToggle=page.locator('#themeToggle');
   if(!(await page.locator('body').evaluate(e=>e.classList.contains('theme-dark'))))await darkToggle.click();
   assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('theme-dark')),true);
   // Empty and invalid calculator data must not yield NaN or block the UI.
   await page.locator('[data-p-management]').uncheck();
   await page.locator('[data-p-crm]').selectOption('none');
   assert.equal(await page.locator('[data-p-initial]').textContent(),'$0');
   for(const width of [360,390,768,1024]){
     for(const route of paths){
       const p=await browser.newPage({viewport:{width,height:820},locale:'en-US',reducedMotion:'reduce'});
       const viewportErrors=[];
       p.on('pageerror',err=>viewportErrors.push(String(err)));
       await p.goto(base+route,{waitUntil:'domcontentloaded',timeout:20000});
       const size=await p.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));
       assert.ok(size.scroll <= size.viewport+3,'Horizontal overflow '+route+' at '+width+'px: '+JSON.stringify(size));
       if(route==='/business-management/'){
         await p.waitForSelector('#inquiryModules');
         await p.locator('#themeToggle').click();
         const colors=await p.locator('#inquiryModules .inquiry-module-heading').evaluate(el=>{
           const style=getComputedStyle(el),card=getComputedStyle(el.parentElement);
           return {fg:style.color,bg:card.backgroundColor};
         });
         assert.ok(colors.fg&&colors.bg&&colors.bg!=='rgba(0, 0, 0, 0)','Invisible module background '+width);
       }
       assert.deepEqual(viewportErrors,[],'JS error at '+width+'px on '+route);
       await p.close();
     }
   }
   assert.deepEqual(exceptions,[],'Unhandled JS errors during local routes');
   console.log('Phase 1 browser QA PASS: all 15 routes x 360/390/768/1024 widths, bilingual quote, contact drafts, 400/404');
   await context.close();
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{server.kill('SIGTERM')});