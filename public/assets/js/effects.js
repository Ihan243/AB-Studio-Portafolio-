/* AB Studio — progressive scroll transitions + interactive portfolio. */
(() => {
  'use strict';
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

  // Enhance visible page content only: hidden route sections remain untouched.
  if (!reduced && 'IntersectionObserver' in window) {
    const selectors = [
      '.section-head', '.services-grid .service', '.case-grid .case-card',
      '.pricing-grid .plan', '.process .step', '.insight-grid > *',
      '.about-block', '.nfc-review-panel', '.subpage-detail .subpage-feature',
      '.home-inquiry-inner', '.route-hero > .wrap',
      '.route-content .route-card', '.route-content .route-plan',
      '.ab-detail-section .ab-detail-card', '.ab-detail-section .ab-detail-step',
      '.ab-detail-section .ab-detail-visual', '.subpage-intro .intro-art'
    ];
    const candidates = [...new Set(selectors.flatMap(s => [...document.querySelectorAll(s)]))];
    // IntersectionObserver reports visibility after layout. Avoid the previous
    // synchronous geometry measurement loop, which forced ~93ms
    // of layout recalculation on the desktop Lighthouse baseline.
    const observer = new IntersectionObserver((entries, instance) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('scroll-reveal')) {
            entry.target.classList.add('is-revealed');
          }
          instance.unobserve(entry.target);
        } else {
          // Only animate items below the fold. Items already visible in the
          // initial viewport should render immediately, with no fade-in or CLS.
          entry.target.classList.add('scroll-reveal');
        }
      }
    }, {threshold: 0.08, rootMargin: '0px 0px -28px 0px'});
    for (const element of candidates) observer.observe(element);
  }

  // A native loading="lazy" iframe may still prefetch up to ~1,250px before
  // the viewport on a slow mobile connection. Keep La Patarata's full site
  // completely off the critical path, but restore the live preview when
  // the actual project card approaches the viewport.
  const liveDemos=[...document.querySelectorAll('.case-live-website iframe[data-src]')];
  function activateLiveDemo(frame){
    if(!frame.dataset.src)return;
    frame.addEventListener('load',()=>frame.classList.add('is-loaded'),{once:true});
    frame.src=frame.dataset.src;
    delete frame.dataset.src;
  }
  if('IntersectionObserver' in window){
    const demosObserver=new IntersectionObserver((entries,observer)=>{
      for(const entry of entries){
        if(!entry.isIntersecting)continue;
        const frame=entry.target.querySelector('iframe[data-src]');
        if(frame)activateLiveDemo(frame);
        observer.unobserve(entry.target);
      }
    },{rootMargin:'120px 0px',threshold:0});
    liveDemos.forEach(frame=>demosObserver.observe(frame.parentElement));
    // Observing the card avoids the scaled iframe's 240%-size layout box.
  }else{
    // On older browsers the original demo remains available immediately.
    liveDemos.forEach(activateLiveDemo);
  }

  const projectPage = document.body?.dataset.page === 'projects';
  const allCards = [...document.querySelectorAll('.case-grid .case-card')];
  const bar = document.getElementById('portfolio-filters');
  const liveStatus = document.getElementById('portfolio-filter-status');
  const filters = bar ? [...bar.querySelectorAll('[data-portfolio-filter]')] : [];
  const categories = (card) => {
    const key = card.querySelector('.case-topline small')?.getAttribute('data-copy') || '';
    return {
      all: true,
      websites: key !== 'work.type.system',
      systems: key === 'work.type.system',
      concepts: key === 'work.type.curiel' || key === 'work.type.concept'
    };
  };
  let activeFilter = 'all';
  function activeCards() {
    return allCards.filter(card => card.getClientRects().length > 0 && !card.hidden);
  }
  function translatePortfolio() {
    const es = document.documentElement.lang === 'es';
    const names = es
      ? {all:'Todos', websites:'Sitios web', systems:'Sistemas', concepts:'Conceptos'}
      : {all:'All projects', websites:'Websites', systems:'Systems', concepts:'Concepts'};
    filters.forEach(button => {
      const name = names[button.dataset.portfolioFilter];
      if (name) button.textContent = name;
    });
    const count = allCards.filter(card => categories(card)[activeFilter]).length;
    if (liveStatus) liveStatus.textContent = es
      ? `${count} ${count === 1 ? 'proyecto' : 'proyectos'} visibles`
      : `${count} ${count === 1 ? 'project' : 'projects'} shown`;
    const controls = document.querySelectorAll('[data-portfolio-control]');
    controls.forEach(btn => {
      btn.setAttribute('aria-label', es
        ? (btn.dataset.portfolioControl === 'prev' ? 'Imagen anterior' : 'Imagen siguiente')
        : (btn.dataset.portfolioControl === 'prev' ? 'Previous image' : 'Next image'));
    });
    document.querySelectorAll('.case-image[data-preview-label]').forEach(button => {
      button.dataset.previewLabel = es ? 'Ampliar imagen' : 'View screenshot';
    });
  }
  function setFilter(filter) {
    if (!['all','websites','systems','concepts'].includes(filter)) return;
    activeFilter = filter;
    allCards.forEach(card => {
      card.hidden = !categories(card)[filter];
      if (!card.hidden) card.classList.add('is-revealed');
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.portfolioFilter === filter)));
    translatePortfolio();
  }
  if (projectPage && filters.length) {
    filters.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.portfolioFilter)));
    setFilter('all');
  }

  // Existing screenshot dialog remains intact. Add prev/next browsing with keyboard support.
  const dialog = document.getElementById('projectLightbox');
  const image = document.getElementById('projectLightboxImage');
  const caption = document.getElementById('projectLightboxCaption');
  if (dialog && image && caption && allCards.length) {
    let current = -1;
    const nav = document.createElement('nav');
    nav.className = 'portfolio-lightbox-nav';
    nav.setAttribute('aria-label','Screenshot navigation');
    const prev = document.createElement('button');
    const next = document.createElement('button');
    const counter = document.createElement('span');
    prev.type = next.type = 'button';
    prev.className = next.className = 'portfolio-lightbox-step';
    prev.dataset.portfolioControl = 'prev';
    next.dataset.portfolioControl = 'next';
    prev.textContent = '←';
    next.textContent = '→';
    counter.className = 'portfolio-lightbox-counter';
    counter.setAttribute('aria-live', 'polite');
    nav.append(prev,counter,next);
    dialog.append(nav);

    const buttons = () => activeCards().map(card => card.querySelector('.case-image[data-lightbox-src]')).filter(Boolean);
    function render(index) {
      const set = buttons();
      if (!set.length) return;
      current = (index + set.length) % set.length;
      const button = set[current];
      const preview = button.querySelector('img');
      image.src = button.dataset.lightboxSrc || preview?.src || '';
      image.alt = preview?.alt || '';
      caption.textContent = image.alt;
      counter.textContent = `${current+1} / ${set.length}`;
      prev.disabled = next.disabled = set.length < 2;
    }
    document.querySelectorAll('.case-image[data-lightbox-src]').forEach(button => {
      button.setAttribute('data-preview-label', 'View screenshot');
      button.addEventListener('click', () => {
        current = buttons().indexOf(button);
        render(Math.max(current,0));
      });
    });
    prev.addEventListener('click', () => render(current-1));
    next.addEventListener('click', () => render(current+1));
    dialog.addEventListener('close', () => { current = -1; });
    document.addEventListener('keydown', event => {
      if (!dialog.open || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      event.preventDefault();
      render(current + (event.key === 'ArrowRight' ? 1 : -1));
    });
  }
  translatePortfolio();
  new MutationObserver(translatePortfolio).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
