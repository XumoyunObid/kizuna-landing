/* Kizuna — site-wide tour announcement bar + entry popup (Golden Route, Dec 2026) */
(function () {
  if (window.__kzPromoLoaded) return;
  window.__kzPromoLoaded = true;

  var TOUR_URL = 'golden-route-turu.html';
  var onTourPage = /golden-route-turu\.html?$/.test(location.pathname) ||
                   location.pathname === '/golden-route-turu';
  var lang = function () { try { return localStorage.getItem('kizuna-lang') === 'en' ? 'en' : 'tr'; } catch (e) { return 'tr'; } };

  var T = {
    bar: {
      tr: '🌸 Japonya Golden Route · 8–15 Aralık 2026 · Osaka’dan Tokyo’ya 4 kadim şehir + Fuji Dağı · Türkçe rehber · THY direkt uçuş · 2.650 € (her şey dahil) · Kontenjan sınırlı — Detaylar →',
      en: '🌸 Japan Golden Route · 8–15 December 2026 · Osaka to Tokyo — 4 ancient cities + Mt. Fuji · Turkish-speaking guide · THY direct flight · €2,650 all-inclusive · Limited spots — Details →'
    },
    eyebrow: { tr: 'Yeni Tur · 8–15 Aralık 2026', en: 'New Tour · 8–15 December 2026' },
    title: { tr: 'Japonya Golden Route', en: 'Japan Golden Route' },
    sub: { tr: '“Kış Güneşi Altında”', en: '“Under the Winter Sun”' },
    desc: {
      tr: 'Osaka’dan Tokyo’ya 4 kadim şehir ve Fuji Dağı tek rotada. İstanbul çıkışlı, Türkçe rehberli, THY direkt uçuş. 7 gece · her şey dahil · kişi başı 2.650 €.',
      en: 'Osaka to Tokyo — 4 ancient cities and Mt. Fuji on one route. From Istanbul, Turkish-speaking guide, direct THY flight. 7 nights · all-inclusive · €2,650 pp.'
    },
    cta: { tr: 'Turu İncele', en: 'View the tour' },
    later: { tr: 'Şimdi değil', en: 'Not now' }
  };
  var IMG = 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900&h=500&fit=crop&q=85';

  var css = '' +
  '.kz-promo{background:linear-gradient(90deg,#C4A265,#E0CB95,#C4A265);color:#1a1405;font-family:"DM Sans",system-ui,sans-serif;font-size:12.5px;font-weight:500;overflow:hidden;white-space:nowrap;border-bottom:1px solid rgba(0,0,0,0.08)}' +
  '.kz-promo a{color:#1a1405;text-decoration:none;display:block}' +
  '.kz-promo-track{display:inline-flex;will-change:transform;animation:kzpromo 34s linear infinite}' +
  '.kz-promo:hover .kz-promo-track{animation-play-state:paused}' +
  '.kz-promo-track span{display:inline-block;padding:8px 48px;letter-spacing:0.01em}' +
  '@keyframes kzpromo{from{transform:translateX(0)}to{transform:translateX(-50%)}}' +
  '@media (prefers-reduced-motion:reduce){.kz-promo-track{animation:none;width:100%;justify-content:center}.kz-promo-track span.kz-dup{display:none}}' +
  '.kz-pop-ov{position:fixed;inset:0;background:rgba(0,0,0,0.62);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .35s ease}' +
  '.kz-pop-ov.kz-show{opacity:1;pointer-events:auto}' +
  '.kz-pop{background:var(--bg,#0d0d0d);color:var(--text,#fff);border:1px solid rgba(196,162,101,0.25);border-radius:18px;max-width:430px;width:100%;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,0.5);transform:scale(.95) translateY(10px);transition:transform .4s cubic-bezier(.23,1,.32,1);position:relative}' +
  '.kz-pop-ov.kz-show .kz-pop{transform:scale(1) translateY(0)}' +
  '.kz-pop-img{height:172px;background-size:cover;background-position:center;position:relative}' +
  '.kz-pop-img::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,var(--bg,#0d0d0d),rgba(0,0,0,0) 72%)}' +
  '.kz-pop-x{position:absolute;top:12px;right:12px;width:32px;height:32px;border:none;border-radius:50%;background:rgba(0,0,0,0.5);color:#fff;font-size:18px;line-height:1;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center}' +
  '.kz-pop-body{padding:6px 28px 26px}' +
  '.kz-pop-eyebrow{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#C4A265;font-weight:600}' +
  '.kz-pop h3{font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;font-size:29px;margin:6px 0 1px;line-height:1.1;color:var(--text,#fff)}' +
  '.kz-pop-sub{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;color:#C4A265;font-size:18px;margin-bottom:12px}' +
  '.kz-pop p{font-size:13.5px;line-height:1.6;opacity:.82;margin:0 0 18px}' +
  '.kz-pop-actions{display:flex;align-items:center;gap:16px}' +
  '.kz-pop-btn{background:#C4A265;color:#0d0d0d;padding:12px 22px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;display:inline-block;transition:transform .14s ease,background .2s}' +
  '.kz-pop-btn:hover{background:#D4B87A}.kz-pop-btn:active{transform:scale(.97)}' +
  '.kz-pop-later{background:none;border:none;color:var(--text,#fff);opacity:.5;font-size:13px;cursor:pointer;font-family:inherit;padding:4px}' +
  '.kz-pop-later:hover{opacity:.8}';

  function injectCss() {
    var s = document.createElement('style');
    s.id = 'kz-promo-css';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function buildBar() {
    var bar = document.createElement('div');
    bar.className = 'kz-promo';
    bar.id = 'kzPromoBar';
    var a = document.createElement('a');
    a.href = TOUR_URL;
    a.setAttribute('aria-label', 'Japonya Golden Route Turu');
    var track = document.createElement('div');
    track.className = 'kz-promo-track';
    var s1 = document.createElement('span');
    var s2 = document.createElement('span');
    s2.className = 'kz-dup';
    s2.setAttribute('aria-hidden', 'true');
    track.appendChild(s1);
    track.appendChild(s2);
    a.appendChild(track);
    bar.appendChild(a);
    bar._s1 = s1; bar._s2 = s2;
    document.body.insertBefore(bar, document.body.firstChild);
    return bar;
  }

  function buildPop() {
    var ov = document.createElement('div');
    ov.className = 'kz-pop-ov';
    ov.id = 'kzPop';
    ov.innerHTML =
      '<div class="kz-pop" role="dialog" aria-modal="true" aria-label="Japonya Golden Route Turu">' +
        '<button class="kz-pop-x" type="button" aria-label="Kapat">&times;</button>' +
        '<div class="kz-pop-img" style="background-image:url(' + IMG + ')"></div>' +
        '<div class="kz-pop-body">' +
          '<div class="kz-pop-eyebrow" data-k="eyebrow"></div>' +
          '<h3 data-k="title"></h3>' +
          '<div class="kz-pop-sub" data-k="sub"></div>' +
          '<p data-k="desc"></p>' +
          '<div class="kz-pop-actions">' +
            '<a class="kz-pop-btn" href="' + TOUR_URL + '" data-k="cta"></a>' +
            '<button class="kz-pop-later" type="button" data-k="later"></button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    return ov;
  }

  var bar, pop;

  function applyLang() {
    var L = lang();
    if (bar) { bar._s1.textContent = T.bar[L]; bar._s2.textContent = T.bar[L]; }
    if (pop) {
      pop.querySelector('[data-k="eyebrow"]').textContent = T.eyebrow[L];
      pop.querySelector('[data-k="title"]').textContent = T.title[L];
      pop.querySelector('[data-k="sub"]').textContent = T.sub[L];
      pop.querySelector('[data-k="desc"]').textContent = T.desc[L];
      pop.querySelector('[data-k="cta"]').textContent = T.cta[L];
      pop.querySelector('[data-k="later"]').textContent = T.later[L];
    }
  }

  function closePop() { if (pop) pop.classList.remove('kz-show'); }

  function maybeShowPop() {
    var seen;
    try { seen = sessionStorage.getItem('kz-grpop'); } catch (e) { seen = null; }
    if (seen) return;
    setTimeout(function () {
      if (!pop) return;
      pop.classList.add('kz-show');
      try { sessionStorage.setItem('kz-grpop', '1'); } catch (e) {}
    }, 1300);
  }

  function init() {
    injectCss();
    bar = buildBar();
    if (!onTourPage) {
      pop = buildPop();
      pop.querySelector('.kz-pop-x').addEventListener('click', closePop);
      pop.querySelector('.kz-pop-later').addEventListener('click', closePop);
      pop.addEventListener('click', function (e) { if (e.target === pop) closePop(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePop(); });
    }
    applyLang();
    if (!onTourPage) maybeShowPop();
    // keep texts in sync when the page's language toggle runs
    if (typeof window.setLang === 'function' && !window.setLang.__kzWrapped) {
      var orig = window.setLang;
      window.setLang = function (l) { orig(l); applyLang(); };
      window.setLang.__kzWrapped = true;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
