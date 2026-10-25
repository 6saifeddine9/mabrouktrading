(() => {
  'use strict';
  const STORAGE_KEY = 'mt-artibot-consent';
  const banner = document.getElementById('consent-banner');
  const accept = document.getElementById('consent-allow');
  const decline = document.getElementById('consent-decline');
  const change = document.getElementById('open-consent');
  let started = false;

  function readConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }
  function saveConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* storage disabled */ }
  }
  function startArtiBot() {
    if (started) return;
    started = true;
    // Provided by MABROUK TRADING; loaded only after the visitor opts in.
    !function(t,e){t.artibotApi={l:[],t:[],on:function(){this.l.push(arguments)},trigger:function(){this.t.push(arguments)}};var a=!1,i=e.createElement("script");i.async=!0,i.type="text/javascript",i.src="https://app.artibot.ai/loader.js",e.getElementsByTagName("head").item(0).appendChild(i),i.onreadystatechange=i.onload=function(){if(!(a||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState)){new window.ArtiBot({i:"0078f1e8-1190-4a8c-bbf0-213faff1e1ac"});a=!0}}}(window,document);
  }
  const show = () => { if (banner) banner.hidden = false; };
  const hide = () => { if (banner) banner.hidden = true; };
  accept?.addEventListener('click', () => { saveConsent('yes'); hide(); startArtiBot(); });
  decline?.addEventListener('click', () => {
    saveConsent('no'); hide();
    // A previously loaded third-party widget cannot be unloaded safely in-place.
    if (started) window.location.reload();
  });
  change?.addEventListener('click', show);
  if (readConsent() === 'yes') startArtiBot();
  else if (readConsent() !== 'no') show();
})();
