const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const homepage=read('public/index.html');
const projects=read('public/proyectos/index.html');
const effects=read('public/assets/js/effects.js');
assert.equal(homepage,read('index.html'),'Homepage mirrors must match');
assert.equal(projects,read('proyectos/index.html'),'Project mirrors must match');
assert.match(homepage,/<link rel="stylesheet" href="\/assets\/css\/site\.css">/);
assert.doesNotMatch(homepage,/media="print" onload=/);
assert.doesNotMatch(homepage,/ab-main-styles/);
assert.ok(homepage.indexOf('/assets/css/site.css') < homepage.indexOf('/assets/css/entrance.css'));
const startupEffects=effects.split('// A native loading="lazy" iframe')[0];
assert.doesNotMatch(startupEffects,/getBoundingClientRect|getClientRects/,'Scroll-reveal initialization must not force synchronous layout reads');
assert.match(startupEffects,/new IntersectionObserver/);
assert.match(startupEffects,/if \(entry\.isIntersecting\)/);
assert.match(startupEffects,/element of candidates\) observer\.observe\(element\)/);
for(const source of [homepage,projects]){
  assert.match(source,/floreria-muniz-480\.webp 480w/);
  assert.match(source,/floreria-muniz\.webp 1061w/);
  assert.match(source,/sizes="\(max-width:680px\)/);
}
const file=path.join(root,'public/assets/portfolio/floreria-muniz-480.webp');
const stat=fs.statSync(file);
assert.ok(stat.size>1000 && stat.size<28000,'Responsive preview must be under 28 KB');
console.log('Desktop CLS and image delivery regression checks passed.');
