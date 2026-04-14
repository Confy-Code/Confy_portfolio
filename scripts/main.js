/* =============================================
   PORTFOLIO — main.js
   ============================================= */

/* ── 1. DARK / LIGHT THEME TOGGLE ── */
(function initTheme() {
  const root   = document.documentElement;
  const btn    = document.getElementById('theme-toggle');
  const KEY    = 'portfolio-theme';

  // Respect saved preference, then OS preference
  const saved  = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', initial);

  btn.setAttribute('aria-label',
    initial === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
    btn.setAttribute('aria-label',
      next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  });

  // Also update if OS preference changes while page is open
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(KEY)) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
})();


/* ── 2. TYPEWRITER EFFECT ── */
(function initTypewriter() {
  const el      = document.getElementById('typewriter-text');
  if (!el) return;

  // Phrases to cycle through — replace with your real names/titles
  const phrases = [
    'I.J Confiance',
    'a Python developer',
    'a ML models developer',
    'I.J Confiance'   // always land back on the real name
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  // Timing constants (ms)
  const TYPE_SPEED   = 80;
  const DELETE_SPEED = 45;
  const PAUSE_END    = 1800;  // how long to hold before deleting
  const PAUSE_START  = 400;   // how long to hold empty before typing next

  function tick() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      // Type one character
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        // Finished typing — pause, then start deleting
        // (unless it's the last phrase — stop there)
        if (phraseIndex === phrases.length - 1) return; // done
        isDeleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, TYPE_SPEED);

    } else {
      // Delete one character
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting — move to next phrase
        isDeleting    = false;
        phraseIndex   = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  // Kick off with a short delay so the page has settled
  setTimeout(tick, 800);
})();


/* ── 3. CV TOGGLE ── */
(function initCVToggle() {
  const btn = document.getElementById('cv-button');
  const cvSection = document.getElementById('cv');
  if (!btn || !cvSection) return;

  btn.addEventListener('click', () => {
    cvSection.classList.toggle('hidden');
    // Scroll to CV if showing
    if (!cvSection.classList.contains('hidden')) {
      cvSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
})();


/* ── 3. SCROLL FADE-IN ── */
(function initFadeIn() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();
