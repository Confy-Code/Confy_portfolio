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


/* ── 2. LANGUAGE SWITCHER ── */
(function initLanguage() {
  const KEY = 'portfolio-language';
  const select = document.getElementById('language-select');
  if (!select) return;

  const translations = {
    en: {
      nav_about: 'About',
      nav_work: 'Work',
      nav_experience: 'Experience',
      nav_contact: 'Contact',
      badge_available: 'Available for work',
      hero_greeting: "Hi, I'm a",
      hero_tagline: 'Designer & Machine Learning Engineer, creating your daily AI assistants.',
      hero_cta: 'View my work ↓',
      about_label: 'About me',
      about_title: 'I build things<br />that feel <em>right.</em>',
      about_p1: 'Designer & ML Engineer from Kigali, building intelligent systems and crafting intuitive digital experiences. I specialize in creating ML models (LLMs and algorithms), writing clean maintainable code, and obsessing over the details.',
      about_p2: "When I'm not coding, you'll find me playing piano, jogging, or exploring new ML frameworks.",
      cv_label: 'Curriculum Vitae',
      cv_title: 'My Professional Background',
      cv_button: 'View CV',
      work_label: 'Selected work',
      work_title: 'Projects I\'m proud of',
      project_type_ml: 'Machine Learning model',
      project_desc_ai: 'A machine learning model that attempts to predict the next random multiplier of a popular gambling game using a 10k+ row dataset I built.',
      project_type_web: 'Web App',
      project_desc_cc: 'A simple web app for converting currencies in real-time.',
      project_link: 'View project',
      experience_label: 'Experience',
      experience_title: 'Where I\'ve worked',
      experience_role: 'Trainee',
      experience_company: 'African To Silicon Valley (A2SV)',
      experience_detail: 'I was a trainee at African To Silicon Valley (A2SV), where I gained hands-on experience in Data Structures and Algorithms, all in Python language.',
      contact_label: 'Get in touch',
      contact_title: 'Let\'s work together',
      contact_paragraph: 'Whether you have a project in mind, a question, or just want to say hello, my inbox is always open.',
      contact_linkedin: 'LinkedIn',
      contact_github: 'GitHub',
      contact_leetcode: 'LeetCode',
      footer_text: '© 2026 ISINGIZWE Jean Confiance — Built with care.'
    },
    fr: {
      nav_about: 'À propos',
      nav_work: 'Travail',
      nav_experience: 'Expérience',
      nav_contact: 'Contact',
      badge_available: 'Disponible pour le travail',
      hero_greeting: 'Bonjour, je suis',
      hero_tagline: 'Designer et ingénieur en apprentissage automatique, créant vos assistants IA quotidiens.',
      hero_cta: 'Voir mon travail ↓',
      about_label: 'À propos de moi',
      about_title: 'Je crée des choses<br />qui paraissent justes.',
      about_p1: 'Designer et ingénieur ML de Kigali, je construis des systèmes intelligents et des expériences numériques intuitives. Je me spécialise dans la création de modèles ML (LLMs et algorithmes), l’écriture d’un code propre et maintenable, et l’attention aux détails.',
      about_p2: 'Quand je ne code pas, vous me trouverez en train de jouer du piano, de courir ou d’explorer de nouveaux frameworks ML.',
      cv_label: 'Curriculum Vitae',
      cv_title: 'Mon parcours professionnel',
      cv_button: 'Voir le CV',
      work_label: 'Travaux sélectionnés',
      work_title: 'Projets dont je suis fier',
      project_type_ml: 'Modèle de Machine Learning',
      project_desc_ai: 'Un modèle de machine learning qui tente de prédire le prochain multiplicateur aléatoire d’un jeu de hasard populaire à partir d’un dataset de plus de 10k lignes que j’ai construit.',
      project_type_web: 'Application Web',
      project_desc_cc: 'Une application web simple pour convertir des devises en temps réel.',
      project_link: 'Voir le projet',
      experience_label: 'Expérience',
      experience_title: 'Où j’ai travaillé',
      experience_role: 'Stagiaire',
      experience_company: 'African To Silicon Valley (A2SV)',
      experience_detail: 'J’étais stagiaire chez African To Silicon Valley (A2SV), où j’ai acquis une expérience pratique en structures de données et algorithmes, essentiellement en Python.',
      contact_label: 'Contact',
      contact_title: 'Travaillons ensemble',
      contact_paragraph: 'Que vous ayez un projet en tête, une question ou juste envie de dire bonjour, ma boîte mail est toujours ouverte.',
      contact_linkedin: 'LinkedIn',
      contact_github: 'GitHub',
      contact_leetcode: 'LeetCode',
      footer_text: '© 2026 ISINGIZWE Jean Confiance — Construit avec soin.'
    },
    rw: {
      nav_about: 'Ibinyerekeyeho',
      nav_work: 'Imirimo',
      nav_experience: 'Uburambe',
      nav_contact: 'Guhura',
      badge_available: 'Ndaboneka ku kazi',
      hero_greeting: 'Muraho, ndi',
      hero_tagline: 'Umushushanyi na Injeniyeri wa Machine Learning, nkora sisitemu za AI zibana nawe buri munsi.',
      hero_cta: 'Reba imirimo yanjye ↓',
      about_label: 'Ibinyerekeyeho',
      about_title: 'Nubaka ibintu<br />bifite ubwuzu.',
      about_p1: 'Umushushanyi na Injeniyeri wa ML ukomoka i Kigali, nubatse sisitemu z’ubwenge buhangano na experience z’ibikoresho byoroshye gukoresha. Ndi inzobere mu gukora model za ML (LLMs na algorithms), kwandika code isukuye kandi yoroshye gusigasira, no kwitonda ku biciriritse.',
      about_p2: 'Iyo ntari gukora porogaramu, mba ncuranga piano, nkora sports, cyangwa niga frameworks nshya za ML.',
      cv_label: 'Curriculum Vitae',
      cv_title: 'Amateka yanjye mu mwuga',
      cv_button: 'Reba CV',
      work_label: 'Imirimo nahisemo',
      work_title: 'Imishinga yajye nishimira',
      project_type_ml: 'Model ya Machine Learning',
      project_desc_ai: 'Model ya machine learning igerageza gutahura multiplier ikurikira mu mukino wa gutega amahirwe ukoresheje dataset yanjye ifite imirongo irenga 10,000.',
      project_type_web: 'Porogaramu ya Web',
      project_desc_cc: 'Porogaramu yoroshye yo guhinduranya amafaranga mu gihe nyacyo.',
      project_link: 'Reba umushinga',
      experience_label: 'Uburambe',
      experience_title: 'Aho nakoze',
      experience_role: 'Umwigishwa',
      experience_company: 'African To Silicon Valley (A2SV)',
      experience_detail: 'Nari umwigishwa muri African To Silicon Valley (A2SV), aho nakuyemo uburambe mu ntonde z’imibare n’algorithms, byose muri Python.',
      contact_label: 'Tuvugane',
      contact_title: 'Tugire icyo dukora hamwe',
      contact_paragraph: 'Niba ufite umushinga mu bitekerezo, ikibazo, cyangwa ushaka kuvuga gusa, inbox yanjye ihora ifunguye.',
      contact_linkedin: 'LinkedIn',
      contact_github: 'GitHub',
      contact_leetcode: 'LeetCode',
      footer_text: '© 2026 ISINGIZWE Jean Confiance — Yubatswe neza.'
    },
    sw: {
      nav_about: 'Kuhusu',
      nav_work: 'Kazi',
      nav_experience: 'Uzoefu',
      nav_contact: 'Wasiliana',
      badge_available: 'Napatikana kwa kazi',
      hero_greeting: 'Hujambo, mimi ni',
      hero_tagline: 'Mbunifu na mhandisi wa Machine Learning, nikiunda wasaidizi wako wa AI wa kila siku.',
      hero_cta: 'Tazama kazi zangu ↓',
      about_label: 'Kuhusu mimi',
      about_title: 'Ninajenga vitu<br />vinavyohisi sawa.',
      about_p1: 'Mbunifu na mhandisi wa ML kutoka Kigali, ninaunda mifumo mahiri na uzoefu wa dijitali unaoeleweka kwa urahisi. Nitaalamu katika kuunda modeli za ML (LLMs na algorithms), kuandika msimbo safi unaoweza kudumishwa, na umakini kwa undani.',
      about_p2: 'Nikiwa si katika kuandika msimbo, nitakupata nikicheza piano, nikikimbia, au nikichunguza mfumo mpya za ML.',
      cv_label: 'Curriculum Vitae',
      cv_title: 'Historia yangu ya kitaalamu',
      cv_button: 'Angalia CV',
      work_label: 'Kazi zilizochaguliwa',
      work_title: 'Miradi ninayoijivunia',
      project_type_ml: 'Mfano wa Machine Learning',
      project_desc_ai: 'Mfano wa machine learning unaojaribu kutabiri multiplier inayofuata ya bahati nasibu maarufu kwa kutumia dataset ya mistari 10k+ niliyoijenga.',
      project_type_web: 'Tovuti ya Wavuti',
      project_desc_cc: 'Tovuti rahisi ya kubadilisha sarafu kwa wakati halisi.',
      project_link: 'Tazama mradi',
      experience_label: 'Uzoefu',
      experience_title: 'Wapi nimefanya kazi',
      experience_role: 'Mwanafunzi',
      experience_company: 'African To Silicon Valley (A2SV)',
      experience_detail: 'Nilikuwa mwanafunzi katika African To Silicon Valley (A2SV), ambapo nilipata uzoefu wa vitendo katika Miundo ya Data na Algorithms, yote kwa lugha ya Python.',
      contact_label: 'Wasiliana',
      contact_title: 'Tufanye kazi pamoja',
      contact_paragraph: 'Ikiwa una mradi akilini, swali, au unataka kusema jambo tu, barua pepe yangu daima iko wazi.',
      contact_linkedin: 'LinkedIn',
      contact_github: 'GitHub',
      contact_leetcode: 'LeetCode',
      footer_text: '© 2026 ISINGIZWE Jean Confiance — Imetengenezwa kwa uangalifu.'
    }
  };

  const setLanguage = (lang) => {
    const current = translations[lang] ? lang : 'en';
    localStorage.setItem(KEY, current);
    document.documentElement.lang = current;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const value = translations[current][key] || translations.en[key] || '';
      el.innerHTML = value;
    });

    select.value = current;
  };

  select.addEventListener('change', (event) => {
    setLanguage(event.target.value);
  });

  const saved = localStorage.getItem(KEY) || 'en';
  setLanguage(saved);
})();


/* ── 2. TYPEWRITER EFFECT ── */
(function initTypewriter() {
  const el      = document.getElementById('typewriter-text');
  if (!el) return;

  // Phrases to cycle through — replace with your real names/titles
  const phrases = [
    'I.J Confiance',
    'Python developer',
    'ML models developer',
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
