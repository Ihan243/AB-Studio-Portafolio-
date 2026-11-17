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
      '.home-inquiry-inner', '.route-hero > .wrap'
    ];
    const candidates = [...new Set(selectors.flatMap(s => [...document.querySelectorAll(s)]))];
    const observer = new IntersectionObserver((entries, instance) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          instance.unobserve(entry.target);
        }
      }
    }, {threshold: 0.08, rootMargin: '0px 0px -28px 0px'});
    for (const el of candidates) {
      if (!el.getClientRects().length) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * .88) {
        el.classList.add('scroll-reveal');
        observer.observe(el);
      }
    }
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

    const buttons = () => activeCards().map(card => card.querySelector('.case-image')).filter(Boolean);
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
    document.querySelectorAll('.case-image').forEach(button => {
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
