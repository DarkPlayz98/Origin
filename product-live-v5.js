/* Origin V9 product engine — Gemini-only live phone specs. */
(function () {
  'use strict';

  const GEMINI_ENDPOINT = '/api/gemini/phone';
  const VERSION = 'V9';
  let modal;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));

  function createModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'originGeminiProductModal';
    modal.className = 'origin-gemini-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="origin-gemini-backdrop" data-close></div>
      <section class="origin-gemini-sheet" role="dialog" aria-modal="true" aria-label="Phone specifications">
        <button class="origin-gemini-close" data-close aria-label="Close">×</button>
        <div class="origin-gemini-kicker">ORIGIN · LIVE PHONE SPECS · ${VERSION}</div>
        <header class="origin-gemini-heading">
          <div><h2 data-title></h2><p data-meta></p></div>
          <span class="origin-gemini-live"><i></i> GEMINI</span>
        </header>
        <div data-body></div>
      </section>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', event => {
      if (event.target.closest('[data-close]')) closeModal();
    });
    return modal;
  }

  function openModal() {
    const m = createModal();
    m.hidden = false;
    document.body.classList.add('origin-gemini-open');
    requestAnimationFrame(() => m.classList.add('is-open'));
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('origin-gemini-open');
    setTimeout(() => { if (modal) modal.hidden = true; }, 160);
  }

  function loadingHTML() {
    return `<div class="origin-gemini-loading"><span class="origin-gemini-spinner"></span><div><strong>Fetching live specifications</strong><small>Gemini is searching the web and building the spec sheet.</small></div></div>`;
  }

  function errorHTML(message) {
    return `<div class="origin-gemini-error"><strong>Specs could not be loaded.</strong><p>${esc(message || 'Gemini did not return a usable phone record.')}</p><button type="button" data-retry>Retry</button></div>`;
  }

  function renderSheet(data) {
    if (!data || !data.found) {
      return `<div class="origin-gemini-not-found"><strong>No exact phone match.</strong><p>Gemini could not confidently identify this as a specific phone model.</p></div>`;
    }

    const image = data.image_url ? `<div class="origin-gemini-image"><img src="${esc(data.image_url)}" alt="${esc(data.name)}" referrerpolicy="no-referrer"><span>LIVE IMAGE</span></div>` : '';
    const heroMeta = [data.brand, data.release_date, data.status].filter(Boolean).join(' · ');
    const groups = (data.sections || []).map(section => `
      <section class="origin-gemini-section">
        <div class="origin-gemini-section-title">${esc(section.title)}</div>
        <div class="origin-gemini-rows">
          ${section.rows.map(row => `<div class="origin-gemini-row"><span>${esc(row.label)}</span><strong>${esc(row.value)}</strong></div>`).join('')}
        </div>
      </section>`).join('');

    const sourceList = [...new Set([data.source_url, ...(data.sources || [])].filter(Boolean))].slice(0, 8);
    const sources = sourceList.length ? `<div class="origin-gemini-sources"><span>Sources</span>${sourceList.map(url => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(new URL(url).hostname.replace(/^www\./,''))} ↗</a>`).join('')}</div>` : '';

    return `${image}
      <div class="origin-gemini-summary">
        <div><span>MODEL</span><strong>${esc(data.name)}</strong></div>
        ${heroMeta ? `<p>${esc(heroMeta)}</p>` : ''}
      </div>
      ${data.summary ? `<div class="origin-gemini-note">${esc(data.summary)}</div>` : ''}
      <div class="origin-gemini-specs">${groups || '<div class="origin-gemini-empty">No structured specification sections were returned.</div>'}</div>
      ${sources}`;
  }

  async function fetchGemini(company, product) {
    const q = `${company} ${product}`.replace(/\s+/g, ' ').trim();
    const response = await fetch(`${GEMINI_ENDPOINT}?q=${encodeURIComponent(q)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });
    const text = await response.text();
    let payload = {};
    try { payload = text ? JSON.parse(text) : {}; } catch (_) {}
    if (!response.ok) throw new Error(payload?.detail || payload?.error || `Gemini HTTP ${response.status}`);
    return payload;
  }

  async function showProduct(company, product) {
    const m = createModal();
    const title = m.querySelector('[data-title]');
    const meta = m.querySelector('[data-meta]');
    const body = m.querySelector('[data-body]');
    title.textContent = product;
    meta.textContent = `${company} · Google Search grounded · Gemini`;
    body.innerHTML = loadingHTML();
    openModal();

    try {
      const result = await fetchGemini(company, product);
      if (!result.found) {
        body.innerHTML = renderSheet(result);
        return;
      }
      title.textContent = result.name || product;
      meta.textContent = [result.brand, result.release_date, 'Gemini · live web'].filter(Boolean).join(' · ');
      body.innerHTML = renderSheet(result);
    } catch (error) {
      body.innerHTML = errorHTML(error.message);
      body.querySelector('[data-retry]')?.addEventListener('click', () => showProduct(company, product));
    }
  }

  function bind() {
    const page = document.querySelector('#companyPage:not([hidden])');
    if (!page) return;
    const company = page.querySelector('.company-hero-copy h1')?.textContent?.trim() || 'Company';
    page.querySelectorAll('.product-universe-card').forEach(card => {
      if (card.dataset.originGeminiBound === '1') return;
      card.dataset.originGeminiBound = '1';
      card.addEventListener('click', event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const product = card.querySelector('strong')?.textContent?.trim() || card.textContent.trim();
        showProduct(company, product);
      }, true);
    });
  }

  const style = document.createElement('style');
  style.textContent = `
    body.origin-gemini-open{overflow:hidden}
    .origin-gemini-modal{position:fixed;inset:0;z-index:1600;background:rgba(17,17,17,.38);backdrop-filter:blur(16px);opacity:0;transition:opacity .16s ease}
    .origin-gemini-modal.is-open{opacity:1}.origin-gemini-modal[hidden]{display:none}
    .origin-gemini-sheet{position:absolute;inset:0;overflow:auto;background:#f7f7f5;padding:18px max(12px,calc((100% - 1040px)/2)) 24px}
    .origin-gemini-close{position:sticky;float:right;top:0;z-index:5;width:40px;height:40px;margin:0 0 -40px;border:1px solid #deded9;border-radius:50%;background:#fff;font-size:23px;line-height:1;cursor:pointer}
    .origin-gemini-kicker{font-size:9px;font-weight:850;letter-spacing:.15em;color:#6d5dfc;margin:0 54px 8px 0}
    .origin-gemini-heading{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;padding-bottom:11px;border-bottom:1px solid #deded9}
    .origin-gemini-heading h2{margin:0;font-size:clamp(34px,6vw,68px);line-height:.96;letter-spacing:-.065em;max-width:780px}
    .origin-gemini-heading p{margin:5px 0 0;color:#777;font-size:11px}
    .origin-gemini-live{display:inline-flex;align-items:center;gap:6px;border:1px solid #deded9;background:#fff;border-radius:999px;padding:6px 9px;font-size:9px;font-weight:800;letter-spacing:.08em;white-space:nowrap}
    .origin-gemini-live i{width:6px;height:6px;border-radius:50%;background:#41a35a}
    .origin-gemini-loading,.origin-gemini-error,.origin-gemini-not-found{display:flex;gap:12px;align-items:center;padding:15px 0;border-bottom:1px solid #deded9}
    .origin-gemini-loading small,.origin-gemini-error p,.origin-gemini-not-found p{display:block;margin:3px 0 0;color:#777;font-size:11px}
    .origin-gemini-spinner{width:18px;height:18px;border:2px solid #d9d9d4;border-top-color:#111;border-radius:50%;animation:originSpin .7s linear infinite;flex:0 0 auto}
    @keyframes originSpin{to{transform:rotate(360deg)}}
    .origin-gemini-error{justify-content:space-between}.origin-gemini-error button{border:1px solid #111;border-radius:999px;background:#111;color:#fff;padding:7px 11px;font-size:11px}
    .origin-gemini-image{position:relative;margin:11px 0;border:1px solid #deded9;background:#fff;border-radius:14px;min-height:170px;display:grid;place-items:center;overflow:hidden}
    .origin-gemini-image img{display:block;max-width:100%;max-height:280px;object-fit:contain;padding:12px}.origin-gemini-image span{position:absolute;left:9px;bottom:8px;font-size:8px;letter-spacing:.12em;color:#888}
    .origin-gemini-summary{display:flex;justify-content:space-between;gap:15px;align-items:end;padding:10px 0;border-bottom:1px solid #deded9}.origin-gemini-summary span{display:block;color:#888;font-size:8px;letter-spacing:.12em}.origin-gemini-summary strong{font-size:16px}.origin-gemini-summary p{margin:0;color:#777;font-size:11px;text-align:right}.origin-gemini-note{padding:9px 0;color:#666;font-size:12px;border-bottom:1px solid #deded9}
    .origin-gemini-specs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:#deded9;border:1px solid #deded9;border-radius:12px;overflow:hidden;margin-top:9px}
    .origin-gemini-section{background:#fff}.origin-gemini-section-title{padding:8px 10px;background:#f1f1ed;font-size:9px;font-weight:850;letter-spacing:.11em;text-transform:uppercase;border-bottom:1px solid #deded9}.origin-gemini-rows{display:grid}.origin-gemini-row{display:grid;grid-template-columns:minmax(90px,.65fr) minmax(0,1.35fr);gap:10px;padding:8px 10px;border-bottom:1px solid #efefeb}.origin-gemini-row:last-child{border-bottom:0}.origin-gemini-row span{font-size:10px;color:#888}.origin-gemini-row strong{font-size:11px;line-height:1.4;font-weight:650}.origin-gemini-empty{grid-column:1/-1;background:#fff;padding:15px;text-align:center;color:#777;font-size:11px}
    .origin-gemini-sources{display:flex;flex-wrap:wrap;gap:7px;align-items:center;padding:9px 1px;color:#888;font-size:9px}.origin-gemini-sources span{margin-right:2px;text-transform:uppercase;letter-spacing:.12em}.origin-gemini-sources a{padding:5px 8px;border:1px solid #deded9;border-radius:999px;background:#fff;color:#666}
    @media(max-width:650px){.origin-gemini-sheet{padding:13px 10px 18px}.origin-gemini-heading{display:block}.origin-gemini-live{margin-top:8px}.origin-gemini-heading h2{font-size:34px}.origin-gemini-specs{grid-template-columns:1fr}.origin-gemini-summary{display:block}.origin-gemini-summary p{text-align:left;margin-top:4px}.origin-gemini-row{grid-template-columns:92px 1fr}.origin-gemini-image{min-height:145px}}
  `;
  document.head.appendChild(style);
  new MutationObserver(bind).observe(document.body, { subtree:true, childList:true });
  bind();
})();
