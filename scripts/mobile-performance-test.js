const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('public/index.html');
const projects=read('public/proyectos/index.html');
const effects=read('public/assets/js/effects.js');
const intro=read('public/assets/js/entrance.js');
const introCss=read('public/assets/css/entrance.css');
const siteCss=read('public/assets/css/site.css');
assert.equal(html,read('index.html'),'Home HTML mirror must be in sync');
assert.equal(projects,read('proyectos/index.html'),'Projects HTML mirror must be in sync');
for(const page of [html,projects]){
  assert.match(page,/iframe data-src="https:\/\/lapatarata\.vercel\.app\//);
  assert.doesNotMatch(page,/iframe src="https:\/\/lapatarata\.vercel\.app\//);
  assert.match(page,/logo-96\.webp/);
}
assert.match(effects,/IntersectionObserver/);
assert.match(effects,/activateLiveDemo\(frame\)/);
assert.match(effects,/rootMargin:'120px 0px'/);
assert.match(siteCss,/iframe\.is-loaded/);
assert.match(html,/preload\.fetchPriority = 'high'/);
assert.match(html,/abstudio-bamboo-entry-mobile\.webp/);
assert.match(html,/id="ab-main-styles"[^>]*media="print"/);
assert.match(html,/!document\.documentElement\.classList\.contains\('ab-entry-active'\)/);
assert.match(introCss,/@media \(max-width:680px\)/);
assert.match(introCss,/abstudio-bamboo-entry-mobile\.webp/);
assert.match(intro,/requestAnimationFrame\(\(\) => requestAnimationFrame/);
for(const [asset,max] of [
  ['public/assets/brand/logo-96.webp',15000],
  ['public/assets/brand/abstudio-bamboo-entry-mobile.webp',85000]
]){
  const stat=fs.statSync(path.join(root,asset));
  assert.ok(stat.size>100 && stat.size<max,asset+' must be optimized; got '+stat.size);
}
console.log('Mobile performance resource-loading regression checks passed.');
