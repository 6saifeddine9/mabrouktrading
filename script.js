(() => {
  'use strict';
  const $ = (query) => document.querySelector(query);
  const $$ = (query) => [...document.querySelectorAll(query)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
  // Show the short brand reveal once per tab, without penalizing repeat navigation.
  try {
    if (reducedMotion || sessionStorage.getItem('mt-intro-seen') === '1') document.body.classList.add('skip-intro');
    else sessionStorage.setItem('mt-intro-seen', '1');
  } catch { if (reducedMotion) document.body.classList.add('skip-intro'); }

  const header = $('.site-header');
  const menu = $('.menu-toggle');
  const nav = $('#main-nav');
  const hero = $('.hero');
  const collection = $('.collection-scroll-space');
  const stage = $('#collection-sticky');
  const slides = $$('.collection-slide');
  const meter = $('#scroll-meter-fill');
  const collectionMeter = $('#collection-progress-fill');
  const counter = $('#collection-counter');
  const goldenThread = $('#thread-progress');
  const threadWrap = $('.gold-thread');
  const threadLength = goldenThread?.getTotalLength() || 1050;
  if (goldenThread) {
    goldenThread.style.strokeDasharray = String(threadLength);
    goldenThread.style.strokeDashoffset = String(threadLength);
  }
  const sceneElements = $$('.scene-interlude');
  const manifesto = $('.manifesto');
  const finale = $('.finale');
  let lastActive = 0;
  let scheduled = false;

  if ($('#current-year')) $('#current-year').textContent = String(new Date().getFullYear());

  function toggleMenu(open) {
    menu?.setAttribute('aria-expanded', String(open));
    menu?.setAttribute('aria-label', window.MTI18n?.t(open ? 'menuClose' : 'menuOpen') || (open ? 'Fermer le menu' : 'Ouvrir le menu'));
    nav?.classList.toggle('open', open);
  }
  menu?.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') !== 'true'));
  $$('#main-nav a').forEach((link) => link.addEventListener('click', () => toggleMenu(false)));
  window.addEventListener('resize', () => { if (innerWidth > 760) toggleMenu(false); }, { passive: true });

  function activateSlide(index) {
    if (index === lastActive) return;
    lastActive = index;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    stage?.setAttribute('data-active', String(index));
    if (counter) counter.textContent = '0' + (index + 1) + ' — 03';
  }
  function drawScroll() {
    scheduled = false;
    const scroll = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (meter) meter.style.width = max > 0 ? (scroll / max * 100).toFixed(2) + '%' : '0%';
    if (header) header.classList.toggle('scrolled', scroll > 24);
    const progress = max > 0 ? clamp(scroll / max) : 0;
    if (goldenThread && !reducedMotion) {
      goldenThread.style.strokeDashoffset = String(threadLength * (1 - progress));
      threadWrap?.style.setProperty('--thread-position', (progress * 65).toFixed(2) + 'px');
      threadWrap?.classList.toggle('is-visible', progress > .035 && progress < .95);
    }
    if (!reducedMotion && innerWidth > 760) sceneElements.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      const p = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
      scene.style.setProperty('--scene-progress', p.toFixed(4));
      const open = clamp(p * 3.35);
      scene.style.setProperty('--cinema-left', (-open * 105).toFixed(2) + '%');
      scene.style.setProperty('--cinema-right', (open * 105).toFixed(2) + '%');
      scene.classList.toggle('scene-seen', p > .12 && p < .96);
    });

    if (!reducedMotion && innerWidth > 760 && manifesto) {
      const rect = manifesto.getBoundingClientRect();
      if (rect.bottom > -innerHeight / 2 && rect.top < innerHeight * 1.5) {
        const p = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
        const drift = (p - .5) * 65;
        manifesto.style.setProperty('--manifesto-first', (-drift).toFixed(1) + 'px');
        manifesto.style.setProperty('--manifesto-second', drift.toFixed(1) + 'px');
        manifesto.style.setProperty('--manifesto-third', (-drift * .5).toFixed(1) + 'px');
      }
    }
    if (!reducedMotion && innerWidth > 760 && finale) {
      const rect = finale.getBoundingClientRect();
      if (rect.bottom > -innerHeight / 2 && rect.top < innerHeight * 1.5) {
        const p = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
        finale.style.setProperty('--finale-drift', ((p - .5) * 95).toFixed(1) + 'px');
      }
    }

    if (hero && !reducedMotion && innerWidth > 760 && scroll < hero.offsetHeight + innerHeight) {
      const p = clamp(scroll / Math.max(1, hero.offsetHeight));
      hero.style.setProperty('--hero-left', (-p * 135).toFixed(1) + 'px');
      hero.style.setProperty('--hero-right', (p * 102).toFixed(1) + 'px');
      hero.style.setProperty('--hero-caption-shift', (p * 48).toFixed(1) + 'px');
      hero.style.setProperty('--hero-zoom', (1.02 + p * .20).toFixed(3));
      hero.style.setProperty('--hero-image-y', (-p * 32).toFixed(1) + 'px');
    }

    if (collection && stage) {
      const rect = collection.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const travel = Math.max(1, collection.offsetHeight - innerHeight);
      const p = clamp(-rect.top / travel);
      const index = Math.min(2, Math.floor(p * 3));
      activateSlide(index);
      if (collectionMeter) collectionMeter.style.width = (p * 100).toFixed(2) + '%';
      if (!reducedMotion && innerWidth > 760) {
        stage.style.setProperty('--photo-y', (-48 + p * 100).toFixed(1) + 'px');
        stage.style.setProperty('--photo-rotate', (-5 + p * 10).toFixed(2) + 'deg');
        stage.style.setProperty('--photo-scale', (1.04 + p * .19).toFixed(3));
        stage.style.setProperty('--watermark-shift', (-p * 130).toFixed(1) + 'px');
      }
    }
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(drawScroll); }
  }, { passive: true });
  window.addEventListener('resize', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(drawScroll); } }, { passive: true });
  drawScroll();

  // The WhatsApp link composes a neutral greeting in the visitor's selected language.
  const whatsapp = $('#whatsapp-cta');
  const whatsappMessages = {
    fr:"Bonjour MABROUK TRADING, j'aimerais discuter d'un projet d'approvisionnement professionnel.",
    en:"Hello MABROUK TRADING, I would like to discuss a professional supply project.",
    ar:"مرحباً MABROUK TRADING، أرغب في مناقشة مشروع للتوريد المهني.",
    zh:"您好 MABROUK TRADING，我想咨询专业设备采购项目。"
  };
  function updateWhatsapp() {
    if (!whatsapp) return;
    const language = window.MTI18n?.getLanguage?.() || 'fr';
    whatsapp.href = 'https://wa.me/212631465304?text=' + encodeURIComponent(whatsappMessages[language] || whatsappMessages.fr);
  }
  document.addEventListener('mt-language-change', updateWhatsapp);
  updateWhatsapp();

  // Interactive lookbook — original brand-colored illustrations, no product stock photography.
  const looks = [
    { category: 'Informatique & technologies', copy: {fr:'Des équipements et technologies pour répondre aux ambitions de votre organisation.',en:'Technology and equipment designed for your organization’s ambitions.',ar:'معدات وتقنيات لدعم طموحات مؤسستكم.',zh:'为您的组织愿景寻找合适的技术设备。'} },
    { category: 'Équipements bureautiques', copy: {fr:'La précision des outils et des fournitures qui rendent le quotidien plus fluide.',en:'The right office tools and supplies to make everyday work effortless.',ar:'تجهيزات مكتبية ولوازم دقيقة لتسهيل العمل اليومي.',zh:'通过合适的办公用品与设备提升日常效率。'} },
    { category: 'Mobilier & aménagement', copy: {fr:'Des espaces pensés pour bien travailler, et pour durer.',en:'Thoughtfully sourced spaces and furniture, made for the long term.',ar:'أثاث وفضاءات عمل مدروسة لتدوم طويلاً.',zh:'精心规划家具与空间，为长期使用而设计。'} },
    { category: 'Recherche sur mesure', copy: {fr:'Votre cahier des charges ouvre la voie à une recherche sans compromis.',en:'Your specifications guide a precise, personalized sourcing journey.',ar:'دفتر تحملاتكم هو منطلق البحث عن حلول مخصصة.',zh:'以您的技术需求为起点，寻找定制化供应方案。'} }
  ];
  let currentLook = 0;
  function selectLook(index) {
    currentLook = Math.max(0, Math.min(looks.length - 1, index));
    $$('.lookbook-image').forEach((img, i) => img.classList.toggle('is-current', i === currentLook));
    $$('.lookbook-tab').forEach((tab, i) => {
      tab.classList.toggle('is-selected', i === currentLook);
      tab.setAttribute('aria-pressed', String(i === currentLook));
    });
    if ($('#lookbook-number')) $('#lookbook-number').textContent = String(currentLook + 1).padStart(2,'0');
    if ($('#lookbook-quote')) $('#lookbook-quote').dataset.category = looks[currentLook].category;
    const lang = window.MTI18n?.getLanguage?.() || 'fr';
    if ($('#lookbook-lead')) $('#lookbook-lead').textContent = looks[currentLook].copy[lang] || looks[currentLook].copy.fr;
  }
  $$('.lookbook-tab').forEach(tab => {
    tab.addEventListener('click', () => selectLook(Number(tab.dataset.look)));
    tab.addEventListener('keydown', e => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const next = (Number(tab.dataset.look) + ((e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : 3)) % 4;
      selectLook(next);
      $(`.lookbook-tab[data-look="${next}"]`)?.focus();
    });
  });
  document.addEventListener('mt-language-change', () => selectLook(currentLook));
  selectLook(0);

  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: .09, rootMargin: '0px 0px -35px 0px' });
    $$('.reveal').forEach((el) => observer.observe(el));
  } else $$('.reveal').forEach((el) => el.classList.add('in-view'));

  // The quote drawer retains the company's working email channel.
  const dialog = $('#quote-dialog');
  const closeButton = $('#quote-close');
  const form = $('#quote-form');
  const category = $('#quote-category');
  const submit = $('#quote-submit');
  const status = $('#quote-status');
  const fallback = $('#quote-fallback');
  const wizardSteps = $$('.quote-step');
  const nextButton = $('#quote-next');
  const backButton = $('#quote-back');
  const fileInputs = [$('#quote-file-1'), $('#quote-file-2')].filter(Boolean);
  const fileZone = $('#quote-upload-zone');
  let wizardIndex = 0;
  let focusBeforeDialog = null;

  // Custom step validation lets us keep future required fields out of view.
  if (form) form.noValidate = true;
  function wizardGo(index) {
    wizardIndex = Math.max(0, Math.min(wizardSteps.length - 1, index));
    wizardSteps.forEach((step, i) => { step.hidden = i !== wizardIndex; step.classList.toggle('is-active', i === wizardIndex); });
    $$('.quote-wizard-progress [data-progress]').forEach((node,i) => {
      node.classList.toggle('is-active', i === wizardIndex);
      node.classList.toggle('is-done', i < wizardIndex);
    });
    if (backButton) backButton.hidden = wizardIndex === 0;
    if (nextButton) nextButton.hidden = wizardIndex === wizardSteps.length - 1;
    if (submit) submit.hidden = wizardIndex !== wizardSteps.length - 1;
  }
  function invalidField(step) {
    const fields = [...wizardSteps[step].querySelectorAll('input,select,textarea')];
    const bad = fields.find(el => !el.checkValidity());
    if (bad) { wizardGo(step); bad.reportValidity(); bad.focus(); }
    return bad;
  }
  nextButton?.addEventListener('click', () => {
    if (!invalidField(wizardIndex)) wizardGo(wizardIndex + 1);
  });
  backButton?.addEventListener('click', () => wizardGo(wizardIndex - 1));
  const maxUploadBytes = 10 * 1024 * 1024;
  const allowedExtensions = /\.(pdf|xls|xlsx)$/i;
  function selectedFiles() { return fileInputs.flatMap(input => [...(input.files || [])]); }
  function validateFiles() {
    const files = selectedFiles();
    if (files.some(file => !allowedExtensions.test(file.name))) return window.MTI18n?.t('fileTypeError') || 'Formats acceptés : PDF, XLS ou XLSX uniquement.';
    if (files.reduce((n, file) => n + file.size, 0) > maxUploadBytes) return window.MTI18n?.t('fileSizeError') || 'Les fichiers dépassent 10 Mo au total.';
    return '';
  }
  function updateFiles() {
    const files = selectedFiles();
    const summary = $('#quote-file-summary');
    const problem = validateFiles();
    if (summary) { summary.textContent = problem || (files.length ? files.map(f => f.name).join(' · ') : window.MTI18n?.t('fileEmpty') || 'Aucun document sélectionné.'); summary.classList.toggle('error', Boolean(problem)); }
  }
  fileInputs.forEach(input => input.addEventListener('change', updateFiles));
  document.addEventListener('mt-language-change', updateFiles);
  updateFiles();
  fileZone?.addEventListener('dragover', (e) => { e.preventDefault(); fileZone.classList.add('drag-over'); });
  fileZone?.addEventListener('dragleave', (e) => { if (!fileZone.contains(e.relatedTarget)) fileZone.classList.remove('drag-over'); });
  fileZone?.addEventListener('drop', (e) => {
    e.preventDefault(); fileZone.classList.remove('drag-over');
    const files = [...(e.dataTransfer?.files || [])];
    if (files.length > 2) { showStatus(window.MTI18n?.t('fileCountError') || 'Maximum 2 fichiers.', true); return; }
    files.forEach((file, i) => { if (fileInputs[i]) { const dt = new DataTransfer(); dt.items.add(file); fileInputs[i].files = dt.files; } });
    updateFiles();
  });

  function showQuote(button) {
    if (!dialog?.showModal) return;
    focusBeforeDialog = document.activeElement;
    const value = button?.dataset?.category;
    if (category && value) category.value = value;
    if (status) { status.hidden = true; status.textContent = ''; status.classList.remove('error'); }
    if (fallback) fallback.hidden = true;
    wizardGo(0);
    toggleMenu(false);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    form?.querySelector('input[name="name"]')?.focus();
  }
  $$('.quote-open').forEach((button) => button.addEventListener('click', () => showQuote(button)));
  closeButton?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => {
    document.body.style.overflow = '';
    focusBeforeDialog?.focus?.();
  });

  function showStatus(text, error = false) {
    if (!status) return;
    status.hidden = false;
    status.classList.toggle('error', error);
    status.textContent = text;
    status.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
  }
  function makeMailto(data) {
    const lines = [
      'Nom : ' + (data.get('name') || ''),
      'Entreprise : ' + (data.get('societe') || ''),
      'E-mail : ' + (data.get('email') || ''),
      'Téléphone : ' + (data.get('telephone') || ''),
      'Domaine : ' + (data.get('categorie') || ''),
      'Objet : ' + (data.get('objet') || ''),
      'Quantité : ' + (data.get('quantite') || ''),
      '', 'Demande :', String(data.get('message') || '')
    ];
    return 'mailto:saifeddine.mabrouk@mabrouktrading.com?subject=' +
      encodeURIComponent('Demande de devis — MABROUK TRADING') +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    for (let i = 0; i < wizardSteps.length; i++) if (invalidField(i)) return;
    const fileError = validateFiles();
    if (fileError) { wizardGo(2); showStatus(fileError, true); return; }
    const data = new FormData(form);
    if (String(data.get('_honey') || '').trim()) {
      showStatus(window.MTI18n?.t('botSuccess') || 'Merci, votre demande a été prise en compte.');
      return;
    }
    // FormSubmit's documented file-upload endpoint needs a regular multipart POST.
    if (selectedFiles().length) {
      form.action = 'https://formsubmit.co/saifeddine.mabrouk@mabrouktrading.com';
      form.enctype = 'multipart/form-data';
      form.submit();
      return;
    }
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    submit.textContent = window.MTI18n?.t('submitting') || 'TRANSMISSION EN COURS...';
    status.hidden = true;
    fallback.hidden = true;
    try {
      const payload = Object.fromEntries(data.entries());
      delete payload.attachment;
      delete payload.attachment2;
      payload._replyto = String(data.get('email') || '');
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const reply = await response.json();
      if (!response.ok || reply?.success === false || reply?.success === 'false') {
        throw new Error('Envoi non confirmé');
      }
      showStatus(window.MTI18n?.t('sent') || "Demande transmise au service d'envoi. Merci ! Nous vous répondrons dès que possible.");
      form.reset();
      updateFiles();
      wizardGo(0);
    } catch (_) {
      showStatus(window.MTI18n?.t('sendError') || "L'envoi automatique n'a pas pu être confirmé. Utilisez le lien e-mail ci-dessous.", true);
      const fallbackLink = $('#quote-fallback-mail');
      if (fallbackLink) fallbackLink.href = makeMailto(data);
      fallback.hidden = false;
    } finally {
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
      submit.innerHTML = '<span>' + (window.MTI18n?.t('quoteSubmit') || 'ENVOYER MA DEMANDE') + '</span><span>↗</span>';
    }
  });
})();
