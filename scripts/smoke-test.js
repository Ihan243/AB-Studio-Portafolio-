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

new Function(js); // Catch syntax errors before deployment.
assert.match(js, /setLanguage\(savedLang === "es" \? "es" : "en"\)/);
assert.match(js, /event\.submitter\?\.dataset\.inquiryChannel/);
assert.match(js, /mailto:sales\.abstudio@gmail\.com\?subject=/);
assert.match(css, /\.home-inquiry-actions/);
for (const document of [home, read('public/index.html'), projectsPage, read('public/proyectos/index.html')]) {
  assert.match(document, /data-inquiry-channel="email"/);
  assert.match(document, /data-inquiry-channel="whatsapp"/);
  assert.match(document, /data-preview-project="home-keetchen"/);
  assert.match(document, /data-preview-project="curiel-basic"/);
  assert.doesNotMatch(document, /quickpixie21\.chatgpt\.site/);
  assert.doesNotMatch(document, /<([a-z]+)[^>]*data-copy="work\.[^"]+"[^>]*>\s*<\/\1>/);
  assert.match(document, /data-copy="work\.patarata\.title">La Patarata · Website</);
}



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

const routes = ['servicios', 'business-management', 'crm', 'sitios-web', 'sistemas', 'seo', 'automatizacion', 'empresa', 'blog', 'proyectos'];

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
for (const page of ['servicios','business-management','crm','sistemas','seo','automatizacion','empresa','blog','proyectos']) {
  const content = read(`public/${page}/index.html`);
  assert.match(content, /class="subpage-intro-copy"/);
  assert.match(content, /class="intro-art intro-art--/);
}

assert.match(read('public/sitemap.xml'), /https:\/\/ab-studio-portafolio\.vercel\.app\/sitios-web\//);
assert.match(read('public/sitemap.xml'), /https:\/\/ab-studio-portafolio\.vercel\.app\/proyectos\//);
assert.match(read('vercel.json'), /proyectos\/index\.html/);
assert.match(read('public/robots.txt'), /Sitemap:/);
assert.ok(fs.existsSync(path.join(root,'public/assets/portfolio/floreria-muniz.webp')));

/* Business Management web add-on: checkout estimates remain honest, responsive and bilingual. */
const servicePage = read('public/servicios/index.html');
const websitePage = read('public/sitios-web/index.html');
assert.match(servicePage, /data-copy="nav\.serviceAdmin"/);
assert.match(websitePage, /data-copy="nav\.serviceAdmin"/);
assert.match(js, /quoteMarkup\(currentLang,"services"\)/);
assert.match(js, /quoteMarkup\(lang,"web"\)/);
assert.match(js, /quoteMarkup\(currentLang,"home"\)/);
assert.match(js, /servicesChooserMarkup\(currentLang\)/);

assert.match(js, /portfolioCtaMarkup\(currentLang\)/);
assert.match(js, /savedQuotes\.find/); // language switches preserve selections
assert.match(js, /data-workflow-status/);
assert.match(css, /\.portfolio-convert/);

assert.match(js, /data-quote-root/);
assert.match(js, /data-q-email/);
assert.match(js, /data-q-wa/);
assert.match(js, /data-bm-workflow/);
assert.match(js, /data-inquiry-module/);
assert.match(js, /inquiryAdmin\.addEventListener/);
assert.match(css, /\.quote-section/);

assert.match(css, /container-type:inline-size/); // cards respond to their actual column width
assert.match(css, /@container \(max-width:720px\)/);
assert.match(css, /\.quote-fieldset\{border:0!important/);
assert.match(css, /\.quote-plan-card/);
assert.match(css, /\.quote-step-heading/);
assert.match(js, /quote-visually-hidden/);
assert.match(js, /quote-plan-description/);

assert.match(css, /\.service-chooser-card/);
assert.match(css, /\.bm-workflow-board/);
assert.match(css, /\.inquiry-extra-block/);
assert.match(read('public/index.html'), /href="\/servicios\/#admin-panel"/);
for (const name of ['index.html','public/index.html','public/sitios-web/index.html','public/servicios/index.html']) {
  const page = read(name);
  for (const price of ['$1,100','$1,500','$2,500']) {
    assert.ok(page.includes(price), `Website price ${price} missing from ${name}`);
  }
}
const quoteStart=js.indexOf('const quoteData = '),quoteEnd=js.indexOf('const businessAddonData = ',quoteStart);
assert.ok(quoteStart>-1 && quoteEnd>quoteStart,'Quote builder source not found');
const quoteTools=new Function(js.slice(quoteStart,quoteEnd)+';return {quoteMarkup,quoteUpdate};')();
for (const lang of ['en','es']) {
  const sample=quoteTools.quoteMarkup(lang,'test');
  assert.equal((sample.match(/data-q-plan/g)||[]).length,3);
  assert.equal(sample.split('data-q-module ').length-1,6);
  assert.match(sample,/data-q-email/);
  assert.match(sample,/data-q-wa/);
  assert.match(sample,/data-q-crm/);
  assert.equal((sample.match(/class="quote-step-heading"/g)||[]).length,3);
  assert.equal((sample.match(/class="quote-plan-card"/g)||[]).length,3);
}
function sampleQuote(plan='professional',seo=false,crm='none',admin=false){
  const fields={
    '[data-q-plan]:checked':{value:plan},'[data-q-admin]':{checked:admin},'[data-q-seo]':{checked:seo},
    '[data-q-crm]':{value:crm},'[data-q-initial]':{textContent:''},'[data-q-monthly]':{textContent:''},
    '[data-q-modules]':{hidden:true},'[data-q-custom]':{textContent:''},
    '[data-q-name]':{value:'Sample Shop'},'[data-q-notes]':{value:'I need a clear website'},
    '[data-q-email]':{href:''},'[data-q-wa]':{href:''}
  };
  return {dataset:{quoteLang:'en'},querySelector:key=>fields[key],querySelectorAll:()=>[],
    result:fields};
}
const basic=sampleQuote('basic');
quoteTools.quoteUpdate(basic);
assert.equal(basic.result['[data-q-initial]'].textContent,'$1,100');
assert.equal(basic.result['[data-q-monthly]'].textContent,'$0 / mo');
const growth=sampleQuote('professional',true,'growth',true);
quoteTools.quoteUpdate(growth);
assert.equal(growth.result['[data-q-initial]'].textContent,'$3,200 – $4,700');
assert.equal(growth.result['[data-q-monthly]'].textContent,'$119 / mo');
assert.equal(growth.result['[data-q-modules]'].hidden,false);
assert.match(growth.result['[data-q-email]'].href,/mailto:sales\.abstudio@gmail\.com/);
const enterprise=sampleQuote('basic',false,'enterprise');
quoteTools.quoteUpdate(enterprise);
assert.equal(enterprise.result['[data-q-initial]'].textContent,'$4,100+');
assert.equal(enterprise.result['[data-q-monthly]'].textContent,'$199+ / mo');


/* CRM education, actual examples and prices must work in both languages. */
const crmStart=js.indexOf('const crmText = '),crmEnd=js.indexOf('function showRoute(',crmStart);
assert.ok(crmStart>=0 && crmEnd>crmStart,'CRM source missing');
const crmRuntime=new Function(js.slice(crmStart,crmEnd)+';return {crmText,crmPanelMarkup};')();
for(const lang of ['en','es']){
  const model=crmRuntime.crmText[lang];
  const markup=crmRuntime.crmPanelMarkup(lang);
  assert.equal(model.plans.length,3);
  assert.equal((markup.match(/class="crm-plan /g)||[]).length,3);
  assert.equal((markup.match(/class="crm-plan-example"/g)||[]).length,3);
  assert.equal((markup.match(/class="crm-journey-step"/g)||[]).length,5);
  assert.equal((markup.match(/class="crm-compare-card /g)||[]).length,3);
  assert.equal((markup.match(/class="crm-fee crm-fee--/g)||[]).length,6);
  assert.equal((markup.match(/<details>/g)||[]).length,6);
  assert.equal((markup.match(/mailto:sales\.abstudio@gmail\.com/g)||[]).length,3);
  for(const price of ['$900–$1,500','$1,500–$3,000','$3,000+','$39','$89','$199+']){
    assert.ok(markup.includes(price),`Missing CRM price ${price} in ${lang}`);
  }
  assert.ok(model.journeyNote.includes(lang==='en'?'Illustrative':'ilustrativo'));
  assert.ok(model.plans.every(plan=>plan.scenario && plan.steps.length===3 && plan.result));
}
assert.match(css,/CRM EDUCATION V2/);
assert.match(css,/\.crm-explanation/);
assert.match(css,/\.crm-plan-example/);
assert.match(css,/\.crm-payment-guide/);
assert.match(css,/max-width:1130px/);


/* Featured Business Management priority — homepage, navigation and Services. */
for(const pagePath of ['public/index.html','index.html']){
  const page=read(pagePath);
  assert.match(page,/id="business-management"/);
  assert.match(page,/id="bm-feature-title"/);
  assert.match(page,/href="\/servicios\/#admin-panel"/);
  assert.match(page,/href="\/sitios-web\/#quote-builder-web"/);
  assert.match(page,/data-copy-html="bmHome\.title"/);
  assert.match(page,/data-copy="bmHome\.note"/);
}
assert.match(js,/overview\.after\(feature\)/);
assert.match(js,/bmServiceSpotlightMarkup\(currentLang\)/);
assert.match(css,/\.bm-home-feature-grid/);
assert.match(css,/\.bm-service-lead-grid/);
assert.match(css,/\.nav-dropdown \[data-copy="nav\.serviceAdmin"\]/);
assert.match(css,/max-width:970px/);
const featuredStart=js.indexOf('const bmServiceHero = ');
const featuredEnd=js.indexOf('const quoteData = ',featuredStart);
assert.ok(featuredStart>=0&&featuredEnd>featuredStart,'Featured service code not found');
const featured=new Function(js.slice(featuredStart,featuredEnd)+';return {bmServiceHero,bmServiceSpotlightMarkup,servicesChooserCopy};')();
for(const lang of ['en','es']){
  const content=featured.bmServiceSpotlightMarkup(lang);
  assert.match(content,/id="bm-service-lead-title"/);
  assert.match(content,/href="#admin-panel"/);
  assert.match(content,/href="#quote-builder-services"/);
  assert.equal((content.match(/class="bm-route-module"/g)||[]).length,3);
  assert.equal(featured.servicesChooserCopy[lang].cards[0][3],'/business-management/');
  assert.equal(featured.servicesChooserCopy[lang].cards[2][3],'/crm/');
}
const servicesRender=js.match(/if \(path === '\/servicios\/'\) routePage\.innerHTML = ([^;]+);/);
assert.ok(servicesRender,'Services rendering was not found');
assert.equal(servicesRender[1].trim(),'servicesChooserMarkup(currentLang)','Services is just the overview');
const managementRender=js.match(/if \(path === '\/business-management\/'\) routePage\.innerHTML = ([^;]+);/);
const crmRender=js.match(/if \(path === '\/crm\/'\) routePage\.innerHTML = ([^;]+);/);
assert.ok(managementRender&&crmRender,'Dedicated routes must be present');
for(const component of ['bmServiceSpotlightMarkup','adminPanelMarkup','quoteMarkup','adminGuideMarkup']) assert.ok(managementRender[1].includes(component), 'Missing Business Management content: '+component);
assert.ok(!managementRender[1].includes('crmPanelMarkup'),'Business Management cannot render CRM');
assert.equal(crmRender[1].trim(),'crmPanelMarkup(currentLang)','CRM should render only its own content');


/* Separate Business Management and CRM options throughout the Services navigation. */
for (const prefix of ['','public/']) {
  for (const page of ['index.html','servicios/index.html','sitios-web/index.html','sistemas/index.html','seo/index.html','automatizacion/index.html','empresa/index.html','proyectos/index.html','blog/index.html','faq/index.html']) {
    const source=read(prefix+page);
    const management='<a href="/business-management/" data-copy="nav.serviceAdmin">Business Management</a>';
    const customerCRM='<a href="/crm/" data-copy="nav.serviceCrm">Customer CRM</a>';
    assert.ok(source.includes(management),`Missing Business Management nav link: ${prefix+page}`);
    assert.ok(source.includes(customerCRM),`Missing Customer CRM nav link: ${prefix+page}`);
    assert.equal(source.split('data-copy="nav.serviceAdmin"').length-1,1);
    assert.equal(source.split('data-copy="nav.serviceCrm"').length-1,1);
  }
}
assert.match(js,/"nav\.serviceCrm":"Customer CRM"/);
assert.match(js,/"nav\.serviceCrm":"CRM · Gestión de clientes"/);
assert.match(js,/feature\.after\(crm\)/);
assert.match(js,/oldManagementHashes/);
assert.match(js,/oldCrmHashes/);
assert.match(js,/crmPanelMarkup\(currentLang\)/);
assert.match(css,/\.nav-dropdown \[data-copy="nav\.serviceCrm"\]/);

/* Business Management and CRM must be two clearly distinct, linked cards on Home and Services. */
for (const file of ['index.html','public/index.html','servicios/index.html','public/servicios/index.html']) {
  const source=read(file);
  const grid=source.split('<div class="services-grid">')[1]?.split('        </div>\n        <div class="section-more">')[0];
  assert.ok(grid, 'Missing services grid: '+file);
  const management=grid.indexOf('id="admin-panel-service"');
  const crm=grid.indexOf('id="crm"');
  const web=grid.indexOf('data-copy="services.webTitle"');
  assert.ok(management>=0 && crm>management && web>crm, 'Distinct service card order: '+file);
  assert.equal((grid.match(/data-copy="admin.serviceTitle"/g)||[]).length,1);
  assert.equal((grid.match(/data-copy="crm.serviceTitle"/g)||[]).length,1);
  assert.ok(grid.includes('href="/business-management/"'));
  assert.ok(grid.includes('href="/crm/"'));
  assert.ok(!grid.includes('Customer & business management panel'));
}
assert.match(js, /"services.numManagement":"01 \/ MANAGEMENT"/);
assert.match(js, /"services.numCrm":"02 \/ CRM"/);
assert.match(css, /body\.home-mode #services \.service--admin/);

/* New separate pages have their own routes, SEO and active UI; the directory stays short. */
for (const slug of ['business-management','crm']) {
  const output = read('public/'+slug+'/index.html');
  const source = read(slug+'/index.html');
  assert.equal(source,output,'Source/public page mismatch: '+slug);
  assert.ok(output.includes('data-page="'+(slug==='crm'?'crm':'management')+'"'));
  assert.ok(output.includes('https://ab-studio-portafolio.vercel.app/'+slug+'/'));
  assert.match(output,/id="route-page"/);
  assert.match(output,/id="homeInquiryForm"/);
  assert.doesNotMatch(output,/id="services"/);
  assert.ok(read('public/sitemap.xml').includes('https://ab-studio-portafolio.vercel.app/'+slug+'/'));
  const entry=JSON.parse(read('vercel.json')).rewrites.find(x=>x.source==='/'+slug+'/');
  assert.equal(entry?.destination,'/'+slug+'/index.html');
  assert.ok(js.includes('"/'+slug+'/":'));
}
assert.match(js,/href="\/crm\/#crm-plans"/);
assert.ok(!js.includes('bmServiceSpotlightMarkup(currentLang) + servicesChooserMarkup(currentLang)'));

console.log('AB Studio smoke tests passed (routes, SEO, portfolio, bilingual quote builder, extras and CRM pricing).');
