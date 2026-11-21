/* AB Studio — optional first-visit door reveal on the homepage. */
(() => {
  'use strict';
  const root = document.documentElement;
  const gate = document.getElementById('ab-entry');
  const openButton = document.getElementById('ab-entry-open');
  const skipButton = document.getElementById('ab-entry-skip');
  const replayButton = document.getElementById('ab-entry-replay');
  if (!gate || !openButton || !skipButton) {
    root.classList.remove('ab-entry-active');
    return;
  }
  const background = Array.from(document.querySelectorAll('header, main, footer, .mobile-contact'));
  const labels = {
    en: {open:'Open the AB Studio doors',skip:'Skip intro',footnote:'A quieter way to begin',eyebrow:'WELCOME TO',subtitle:'WEB · SYSTEMS · AUTOMATION',action:'CLICK TO ENTER',replay:'Replay entrance'},
    es: {open:'Abrir las puertas de AB Studio',skip:'Omitir introducción',footnote:'Una forma distinta de comenzar',eyebrow:'BIENVENIDO A',subtitle:'WEB · SISTEMAS · AUTOMATIZACIÓN',action:'HAZ CLIC PARA ENTRAR',replay:'Volver a ver la entrada'}
  };
  const labelKeys = {eyebrow:'.ab-entry-plaque-eyebrow',subtitle:'.ab-entry-plaque-sub',action:'.ab-entry-plaque-action-label',footnote:'.ab-entry-footnote'};
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = root.classList.contains('ab-entry-active');
  let opening = false;
  let completeTimeout = null;
  function translate() {
    let lang = root.lang === 'es' ? 'es' : 'en';
    try { if (localStorage.getItem('abstudio-lang') === 'es') lang = 'es'; } catch (_) {}
    const terms = labels[lang];
    Object.entries(labelKeys).forEach(([key,selector]) => {
      const element = gate.querySelector(selector);
      if (element) element.textContent = terms[key];
    });
    openButton.setAttribute('aria-label',terms.open);
    skipButton.textContent = terms.skip;
    if (replayButton) replayButton.textContent = terms.replay;
  }
  function inertBackground(value) { background.forEach(element => { element.inert = value; }); }
  function finish() {
    if (!active) return;
    active = false;
    opening = false;
    if (completeTimeout !== null) clearTimeout(completeTimeout);
    root.classList.remove('ab-entry-active');
    gate.classList.remove('is-opening');
    gate.setAttribute('aria-hidden','true');
    inertBackground(false);
    try { sessionStorage.setItem('abstudio-intro-seen-v1','1'); } catch (_) {}
    if (document.activeElement === openButton || document.activeElement === skipButton) {
      document.querySelector('header .brand')?.focus({preventScroll:true});
    }
  }
  function enter() {
    if (!active || opening) return;
    opening = true;
    openButton.disabled = true;
    if (reduceMotion.matches) {finish();return;}
    gate.classList.add('is-opening');
    completeTimeout = window.setTimeout(finish, 2480);
  }
  function show() {
    if (active && !opening) return;
    if (completeTimeout !== null) clearTimeout(completeTimeout);
    opening = false;
    active = true;
    gate.classList.remove('is-opening');
    gate.setAttribute('aria-hidden','false');
    openButton.disabled = false;
    root.classList.add('ab-entry-active');
    inertBackground(true);
    translate();
    openButton.focus({preventScroll:true});
  }
  openButton.addEventListener('click',enter);
  skipButton.addEventListener('click',finish);
  replayButton?.addEventListener('click',show);
  document.addEventListener('keydown', event => {
    if (!active || opening) return;
    if (event.key === 'Escape') {event.preventDefault();finish();}
    if (event.key === 'Tab') {
      // Keep keyboard navigation within the two dialog controls.
      if (event.shiftKey && document.activeElement === openButton) {event.preventDefault();skipButton.focus();}
      else if (!event.shiftKey && document.activeElement === skipButton) {event.preventDefault();openButton.focus();}
    }
  });
  new MutationObserver(translate).observe(root,{attributes:true,attributeFilter:['lang']});
  translate();
  if (active) {
    gate.setAttribute('aria-hidden','false');
    inertBackground(true);
    // Move initial keyboard focus after first paint so activating inert
    // does not force a synchronous style/layout flush during mobile LCP.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if(active && !opening)openButton.focus({preventScroll:true});
    }));
  } else {
    gate.setAttribute('aria-hidden','true');
  }
})();