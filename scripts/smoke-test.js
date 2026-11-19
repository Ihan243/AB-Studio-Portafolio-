const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const home = read('index.html');
const js = read('public/assets/js/site.js');
const css = read('public/assets/css/site.css');

const projectsPage = read('proyectos/index.html');
const effectsJS = read('public/assets/js/effects.js');
assert.match(home, /data-project="la-patarata"/);
assert.match(home, /https:\/\/lapatarata\.vercel\.app\//);
assert.doesNotMatch(home, /data-copy="work\.cuervosWeb\.title"/);
assert.match(projectsPage, /data-project="la-patarata"/);
assert.match(projectsPage, /id="portfolio-filters"/);
assert.match(js, /work\.patarata\.title/);
assert.match(js, /case-image\[data-lightbox-src\]/);
assert.match(effectsJS, /case-image\[data-lightbox-src\]/);
assert.match(css, /\.case-live-website iframe/);


const faqPage = read('public/faq/index.html');
const faqConfig = JSON.parse(read('vercel.json'));
assert.match(home, /href="\/faq\/" data-route="\/faq\/" data-target="faq-page"/);
assert.match(faqPage, /id="faq-page"/);
assert.match(faqPage, /data-page="faq"/);
assert.match(faqPage, /data-ab-locale="en"/);
assert.match(faqPage, /data-ab-locale="es"/);
assert.equal((faqPage.match(/class="ab-faq-questions"/g) || []).length, 6);
assert.equal((faqPage.match(/class="ab-faq-plus"/g) || []).length, 24);
assert.match(js, /"\/faq\/": "faq-page"/);
assert.match(js, /"nav.faq":"FAQ"/);
assert.match(css, /AB Studio dedicated FAQ page and navigation/);
assert.ok(faqConfig.rewrites.some(rule => rule.source === '/faq/' && rule.destination === '/faq/index.html'));
assert.match(read('public/sitemap.xml'), /https:\/\/ab-studio-portafolio\.vercel\.app\/faq\//);

const routes = ['servicios', 'sitios-web', 'sistemas', 'seo', 'automatizacion', 'empresa', 'blog', 'proyectos'];

const effects = read('public/assets/js/effects.js');
const entrance = read('public/assets/js/entrance.js');
const entranceCss = read('public/assets/css/entrance.css');
const projects = read('public/proyectos/index.html');
new Function(effects);
new Function(entrance);
assert.match(home, /id="ab-entry"/);
assert.match(home, /ab-entry-engraved-rail/);
assert.match(home, /ab-entry-rays/);
assert.match(home, /ab-entry-mist/);
assert.match(home, /ab-entry-falling-leaves/);
assert.match(home, /src="\/assets\/js\/effects\.js" defer/);
assert.match(home, /src="\/assets\/js\/entrance\.js" defer/);
assert.match(projects, /id="portfolio-filters"/);
assert.match(projects, /data-portfolio-filter="websites"/);
assert.match(projects, /data-portfolio-filter="systems"/);
assert.match(projects, /data-portfolio-filter="concepts"/);
assert.match(effects, /IntersectionObserver/);
assert.match(effects, /ArrowRight/);
assert.match(css, /scroll-reveal\.is-revealed/);
assert.match(entranceCss, /ab-entry-engraved-text/);
assert.match(entranceCss, /ab-entry-leaf-fall/);
assert.match(entranceCss, /prefers-reduced-motion/);

assert.match(home, /href="\/assets\/css\/site\.css"/);
assert.match(home, /src="\/assets\/js\/site\.js" defer/);
assert.match(home, /id="homeInquiryForm"/);
assert.match(home, /id="faq"/);
assert.match(home, /class="home-mode" data-page="home"/);
assert.match(home, /href="\/proyectos\/" data-route=/);
assert.match(css, /body\.home-mode #plans/);
assert.match(css, /body\.route-mode main > \.subpage-intro/);
assert.match(js, /Normal links navigate to real, independent HTML pages/);
assert.match(home, /data-inquiry-service="seo"/);
assert.match(js, /function jumpToInquiry\(/);
assert.match(js, /inquiryType/);
assert.match(css, /\[hidden\]\s*\{\s*display:\s*none/);
for (const route of routes) {
  const doc = read(`${route}/index.html`);
  assert.match(doc, new RegExp(`https://ab-studio-portafolio\\.vercel\\.app/${route}/`));
  assert.match(doc, /class="route-mode" data-page="/);
  assert.match(doc, /content="[^\"]+"/);
}

// Verify complementary bilingual content on every dedicated page.
for (const route of routes) {
  const detail = read(`public/${route}/index.html`);
  assert.ok(detail.includes(`AB-STUDIO-COMPLEMENTARY-CONTENT:${route}`), `No complementary content: ${route}`);
  assert.ok(detail.includes('class="ab-detail-section'), `No detail section: ${route}`);
  assert.ok(detail.includes('data-ab-locale="en"'), `English detail missing: ${route}`);
  assert.ok(detail.includes('data-ab-locale="es"'), `Spanish detail missing: ${route}`);
  assert.ok(detail.includes('class="ab-detail-card"'), `Feature details missing: ${route}`);
  assert.ok(detail.includes('class="ab-detail-step"'), `Process details missing: ${route}`);
}
assert.match(css, /main > \.ab-detail-section \{display:block !important;\}/);
assert.match(css, /data-ab-locale="es"/);
assert.match(read('public/sitios-web/index.html'), /floreria-muniz\.webp/);


// Ensure every detail page keeps a natural height and a visual hero.
const modernCss = read('public/assets/css/site.css');
assert.match(modernCss, /AB editorial redesign: eliminate empty full-page sections/);
assert.match(modernCss, /min-height:0 !important/);
assert.match(modernCss, /route-hero-showcase/);
assert.match(modernCss, /subpage-intro-inner/);
assert.match(modernCss, /ab-detail-section--alternate/);
const modernJs = read('public/assets/js/site.js');
assert.match(modernJs, /route-hero--visual/);
assert.match(read('public/sitios-web/index.html'), /route-hero-showcase/);
for (const page of ['servicios','sistemas','seo','automatizacion','empresa','blog','proyectos']) {
  const content = read(`public/${page}/index.html`);
  assert.match(content, /class="subpage-intro-copy"/);
  assert.match(content, /class="intro-art intro-art--/);
}

assert.match(read('public/sitemap.xml'), /https:\/\/ab-studio-portafolio\.vercel\.app\/sitios-web\//);
assert.match(read('public/sitemap.xml'), /https:\/\/ab-studio-portafolio\.vercel\.app\/proyectos\//);
assert.match(read('vercel.json'), /proyectos\/index\.html/);
assert.match(read('public/robots.txt'), /Sitemap:/);
assert.ok(fs.existsSync(path.join(root,'public/assets/portfolio/floreria-muniz.webp')));
console.log('AB Studio smoke tests passed (routes, SEO, bamboo entrance, scroll and portfolio).');
