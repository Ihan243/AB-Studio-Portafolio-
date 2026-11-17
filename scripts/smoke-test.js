const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const home = read('index.html');
const js = read('public/assets/js/site.js');
const css = read('public/assets/css/site.css');
const routes = ['servicios', 'sitios-web', 'sistemas', 'seo', 'automatizacion', 'empresa', 'blog'];
assert.match(home, /href="\/assets\/css\/site\.css"/);
assert.match(home, /src="\/assets\/js\/site\.js" defer/);
assert.match(home, /id="homeInquiryForm"/);
assert.match(home, /id="faq"/);
assert.match(home, /data-inquiry-service="seo"/);
assert.match(js, /function jumpToInquiry\(/);
assert.match(js, /inquiryType/);
assert.match(css, /\[hidden\]\s*\{\s*display:\s*none/);
for (const route of routes) {
  const doc = read(`${route}/index.html`);
  assert.match(doc, new RegExp(`https://ab-studio-portafolio\\.vercel\\.app/${route}/`));
  assert.match(doc, /class="route-mode"/);
  assert.match(doc, /content="[^\"]+"/);
}
assert.match(read('public/sitemap.xml'), /https:\/\/ab-studio-portafolio\.vercel\.app\/sitios-web\//);
assert.match(read('public/robots.txt'), /Sitemap:/);
assert.ok(fs.existsSync(path.join(root,'public/assets/portfolio/floreria-muniz.webp')));
console.log('AB Studio smoke tests passed (homepage, routes, SEO, images, CTA).');
