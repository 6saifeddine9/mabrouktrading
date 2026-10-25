/* Accessible, persistent light / dark theme. Loaded before the stylesheet to avoid a flash. */
(() => {
  'use strict';
  const storageKey = 'mt-theme';
  const labels = {
    fr: { dark: 'Activer le mode sombre', light: 'Activer le mode clair' },
    en: { dark: 'Switch to dark mode', light: 'Switch to light mode' },
    ar: { dark: 'تفعيل الوضع الداكن', light: 'تفعيل الوضع الفاتح' },
    zh: { dark: '切换至深色模式', light: '切换至浅色模式' }
  };
  let current = 'light';
  try { if (localStorage.getItem(storageKey) === 'dark') current = 'dark'; } catch { /* storage unavailable */ }
  document.documentElement.dataset.theme = current;

  function updateButton() {
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    const language = window.MTI18n?.getLanguage?.() || document.documentElement.dataset.lang || 'fr';
    const translation = labels[language] || labels.fr;
    const action = current === 'dark' ? translation.light : translation.dark;
    button.setAttribute('aria-label', action);
    button.setAttribute('title', action);
    button.setAttribute('aria-pressed', String(current === 'dark'));
  }

  function setTheme(mode, remember = true) {
    current = mode === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = current;
    if (remember) {
      try { localStorage.setItem(storageKey, current); } catch { /* storage unavailable */ }
    }
    updateButton();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      setTheme(current === 'light' ? 'dark' : 'light');
    });
    updateButton();
  });
  document.addEventListener('mt-language-change', updateButton);
  window.addEventListener('storage', (event) => {
    if (event.key === storageKey) setTheme(event.newValue, false);
  });
})();
