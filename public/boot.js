(() => {
    'use strict';
    let savedLanguage;try{savedLanguage=localStorage.getItem('myHabbitLanguageV1');}catch{}
    const english=savedLanguage==='en'||(!['uk','en'].includes(savedLanguage)&&(navigator.language||'').toLowerCase().startsWith('en'));
    const labels={"Перевіряємо локальні дані…":"Reading local data…","Відновлюємо профіль…":"Restoring your profile…","Підключаємо модулі…":"Loading modules…","Майже готово…":"Almost ready…","Безпечне відновлення":"Safe recovery","Застарілий кеш або локальні дані завадили запуску. Особисті дані не видалятимуться без окремого підтвердження.":"Outdated cache or local data prevented startup. Personal data will not be deleted without separate confirmation.","Оновити кеш і перезапустити":"Refresh cache and restart","Технічна інформація":"Technical information","Скрипт не підтвердив запуск":"The app did not confirm startup","Не вдалося завантажити застосунок":"Could not load the app"};
    const label=text=>english?(labels[text]||text):text;
    document.documentElement.lang=english?'en':'uk';
    if(english){document.getElementById('appSplash')?.setAttribute('aria-label','Loading myHabbit');const status=document.getElementById('splashStatus');if(status)status.textContent='Starting safely…';}
    const splash = document.getElementById('appSplash');
    const bar = document.getElementById('splashProgressBar');
    const text = document.getElementById('splashProgressText');
    const status = document.getElementById('splashStatus');
    const app = document.getElementById('app');
    let finished = false;
    let lastError = '';
    const setProgress = (value, label) => {
      if (finished) return;
      if (bar) bar.style.width = `${value}%`;
      if (text) text.textContent = `${value}%`;
      if (status && label) status.textContent = english ? (labels[label] || label) : label;
    };
    const hide = () => {
      if (finished) return;
      finished = true;
      splash?.classList.add('hidden');
      setTimeout(() => { if (splash) splash.style.display = 'none'; }, 450);
    };
    const recovery = () => {
      if (window.__MYHABBIT_APP_READY__) return hide();
      finished = true;
      splash?.classList.add('hidden');
      if (splash) setTimeout(() => splash.style.display = 'none', 300);
      if (app && !app.innerHTML.trim()) app.innerHTML = `
        <main style="min-height:100vh;padding:24px;display:grid;place-items:center;font-family:system-ui;background:#fffaf6;color:#29252b">
          <section style="max-width:520px;width:100%;padding:24px;border:1px solid #eadfd7;border-radius:24px;background:white;box-shadow:0 16px 44px rgba(80,55,45,.08)">
            <h1 style="margin:0 0 10px">${label("Безпечне відновлення")}</h1>
            <p style="line-height:1.55;color:#6e6670">${label("Застарілий кеш або локальні дані завадили запуску. Особисті дані не видалятимуться без окремого підтвердження.")}</p>
            <button id="safeReload" style="width:100%;padding:14px;border:0;border-radius:16px;background:#7654d6;color:white;font-weight:800;font-size:16px">${label("Оновити кеш і перезапустити")}</button>
            <details style="margin-top:14px"><summary>${label("Технічна інформація")}</summary><pre style="white-space:pre-wrap;font-size:12px">${String(lastError || 'Скрипт не підтвердив запуск').replace(/[<>&]/g, s => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[s]))}</pre></details>
          </section>
        </main>`;
      document.getElementById('safeReload')?.addEventListener('click', async () => {
        try {
          const regs = await navigator.serviceWorker?.getRegistrations?.() || [];
          await Promise.all(regs.map(r => r.unregister()));
          const keys = await caches.keys();
          await Promise.all(keys.filter(k => k.startsWith('myhabbit-')).map(k => caches.delete(k)));
        } catch {}
        location.replace(`/?recovery=${Date.now()}`);
      });
    };
    window.addEventListener('error', e => { lastError = e.error?.stack || e.message || 'JavaScript error'; });
    window.addEventListener('unhandledrejection', e => { lastError = e.reason?.stack || e.reason?.message || String(e.reason); });
    window.addEventListener('myhabbit:ready', hide, { once:true });
    setTimeout(() => setProgress(22, 'Перевіряємо локальні дані…'), 120);
    setTimeout(() => setProgress(48, 'Відновлюємо профіль…'), 380);
    setTimeout(() => setProgress(72, 'Підключаємо модулі…'), 700);
    setTimeout(() => setProgress(92, 'Майже готово…'), 1100);
    const script = document.createElement('script');
    script.type = 'module';
    script.src = '/app.js?v=12.20.0';
    script.onerror = () => { lastError = 'Не вдалося завантажити застосунок'; recovery(); };
    document.body.appendChild(script);
    setTimeout(() => {
      if (window.__MYHABBIT_APP_READY__ || app?.innerHTML.trim()) hide();
      else recovery();
    }, 6500);
  })();
