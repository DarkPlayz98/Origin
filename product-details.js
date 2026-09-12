/* Origin V3 Product Explorer: live model discovery, full returned specs, 3D viewing, and refresh metadata. */
(function () {
  'use strict';

  const PHONE_API = 'https://api-mobilespecs.azharimm.dev';
  const CACHE_TTL = 30 * 60 * 1000;

  // Curated 3D embeds are used only where a specific model page is known.
  // Other products get a direct 3D-search action instead of inventing a model.
  const model3D = {
    'iPhone 17 Pro Max': 'https://sketchfab.com/models/87fc1df741384124a8ce0226d2b2058d/embed',
    'iPhone 16 Pro Max': 'https://sketchfab.com/models/8acb38f436d5467c82fa5364712dd8df/embed',
    'MacBook Pro': 'https://sketchfab.com/models/a2158f4d07c24861b268b170cb24c6d8/embed'
  };

  const fallbackCatalog = {
    'iPhone': ['iPhone 17 Pro Max','iPhone 17 Pro','iPhone 17','iPhone Air','iPhone 16 Pro Max','iPhone 16 Pro','iPhone 16 Plus','iPhone 16'],
    'Mac': ['MacBook Air','MacBook Pro','iMac','Mac mini','Mac Studio','Mac Pro'],
    'iPad': ['iPad Pro','iPad Air','iPad','iPad mini'],
    'Apple Watch': ['Apple Watch Series','Apple Watch Ultra','Apple Watch SE'],
    'AirPods': ['AirPods Pro','AirPods','AirPods Max'],
    'Surface': ['Surface Laptop','Surface Pro','Surface Laptop Studio'],
    'Xbox': ['Xbox Series X','Xbox Series S'],
    'Kindle': ['Kindle Paperwhite','Kindle Scribe','Kindle'],
    'Fire TV': ['Fire TV Stick','Fire TV Stick 4K','Fire TV Cube'],
    'Echo / Alexa': ['Echo','Echo Dot','Echo Show'],
    'Air Jordan': ['Air Jordan 1','Air Jordan 4','Air Jordan 11'],
    'Air Max': ['Air Max 1','Air Max 90','Air Max 97'],
    'Air Force 1': ['Air Force 1 Low','Air Force 1 Mid','Air Force 1 High'],
    'Dunk': ['Dunk Low','Dunk High'],
    'Pegasus': ['Pegasus'],
    'Pixel': ['Pixel phone','Pixel Watch','Pixel Tablet'],
    'Android': ['Android'],
    'Google Maps': ['Google Maps'],
    'Chrome': ['Chrome'],
    'Figma Design': ['Figma Design','Dev Mode'],
    'FigJam': ['FigJam'],
    'Figma Slides': ['Figma Slides'],
    'Netflix streaming': ['Netflix Standard with ads','Netflix Standard','Netflix Premium'],
    'Airbnb app': ['Airbnb guest experience','Airbnb host experience']
  };

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function cacheKey(company, product) {
    return `origin-v3:${company}:${product}`.toLowerCase().replace(/[^a-z0-9:_-]+/g, '-');
  }

  function readCache(key) {
    try {
      const item = JSON.parse(localStorage.getItem(key) || 'null');
      if (item && Date.now() - item.time < CACHE_TTL) return item.data;
    } catch (_) {}
    return null;
  }

  function writeCache(key, data) {
    try { localStorage.setItem(key, JSON.stringify({ time: Date.now(), data })); } catch (_) {}
  }

  function isPhoneProduct(company, product) {
    const p = `${company} ${product}`.toLowerCase();
    return /iphone|pixel phone|galaxy|phone|smartphone|oneplus|xiaomi|redmi|poco|nokia phone|motorola|asus rog phone|nothing phone|realme/.test(p);
  }

  async function fetchJSON(url) {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Live catalog HTTP ${response.status}`);
    return response.json();
  }

  function normaliseSearch(data) {
    if (Array.isArray(data)) return data;
    return data?.data?.phones || data?.data?.results || data?.phones || data?.results || [];
  }

  function modelName(item) {
    return item?.phone_name || item?.name || item?.model || item?.model_name || item?.title || 'Unnamed model';
  }

  function modelSlug(item) {
    return item?.slug || item?.url || item?.phone_slug || item?.id || '';
  }

  async function livePhoneModels(company, product) {
    const query = `${company} ${product}`.trim();
    const key = cacheKey(company, product);
    const cached = readCache(key);
    if (cached) return { models: cached, source: 'Live phone database · cached', cached: true };

    const data = await fetchJSON(`${PHONE_API}/search?query=${encodeURIComponent(query)}`);
    const rows = normaliseSearch(data);
    const models = rows.map(item => ({
      name: modelName(item),
      slug: modelSlug(item),
      summary: [item?.release_date, item?.display?.size, item?.chipset, item?.ram].filter(Boolean).join(' · '),
      raw: item
    })).filter(item => item.name !== 'Unnamed model');

    writeCache(key, models);
    return { models, source: 'Live phone database · refreshed now', cached: false };
  }

  function flatten(value, prefix, out) {
    if (value === null || value === undefined || value === '') return;
    if (typeof value !== 'object') { out.push([prefix || 'Specification', String(value)]); return; }
    if (Array.isArray(value)) {
      if (!value.length) return;
      value.forEach((v, i) => flatten(v, `${prefix || 'Item'} ${i + 1}`, out));
      return;
    }
    Object.keys(value).forEach(key => flatten(value[key], prefix ? `${prefix} · ${key}` : key, out));
  }

  async function fullPhoneSpecs(item) {
    const slug = item?.slug || item?.raw?.slug || item?.raw?.url || item?.raw?.phone_slug || item?.raw?.id;
    if (!slug) return item?.raw || {};
    const cleanSlug = String(slug).replace(/^https?:\/\/[^/]+\//, '').replace(/^\//, '');
    const key = `origin-v3-spec:${cleanSlug}`;
    const cached = readCache(key);
    if (cached) return cached;

    const candidates = [
      `${PHONE_API}/${cleanSlug}`,
      `${PHONE_API}/brands/apple-phones-48/${cleanSlug}`
    ];
    for (const url of candidates) {
      try {
        const data = await fetchJSON(url);
        const result = data?.data || data?.phone || data;
        if (result && typeof result === 'object') { writeCache(key, result); return result; }
      } catch (_) {}
    }
    return item?.raw || {};
  }

  function sketchfabSearchURL(name) {
    return `https://sketchfab.com/search?type=models&q=${encodeURIComponent(name)}`;
  }

  function embed3D(name) {
    const exact = Object.keys(model3D).find(key => key.toLowerCase() === name.toLowerCase());
    return exact ? model3D[exact] : '';
  }

  function render3D(name) {
    const url = embed3D(name);
    if (url) {
      return `<div class="origin-3d-wrap"><div class="origin-3d-head"><span>INTERACTIVE 3D</span><small>Drag · pinch · rotate</small></div><iframe title="3D model of ${esc(name)}" src="${url}" allow="autoplay; fullscreen; xr-spatial-tracking" loading="lazy"></iframe></div>`;
    }
    return `<div class="origin-3d-empty"><div class="origin-3d-icon">3D</div><div><strong>3D model search</strong><p>No exact model is catalogued in Origin yet. Open the live 3D model library for ${esc(name)}.</p><a href="${sketchfabSearchURL(name)}" target="_blank" rel="noopener">Find 3D model ↗</a></div></div>`;
  }

  function renderFullSpecs(specs) {
    const rows = [];
    flatten(specs, '', rows);
    const filtered = rows.filter(([key, value]) => !/^image|^thumbnail|^url$/i.test(key) && value.length < 600);
    if (!filtered.length) return '<p class="origin-empty-spec">The live source did not return a structured specification sheet.</p>';
    return `<div class="origin-spec-grid">${filtered.map(([key, value]) => `<div class="origin-spec-row"><span>${esc(key.replace(/[_-]+/g,' '))}</span><strong>${esc(value)}</strong></div>`).join('')}</div>`;
  }

  function renderModelCards(models, company, product) {
    if (!models.length) {
      const fallback = fallbackCatalog[product] || [];
      if (!fallback.length) return `<div class="origin-empty-state"><strong>No models found yet.</strong><p>Origin won't invent model names. Refresh later when the live catalog has them.</p></div>`;
      return fallback.map((name, index) => `<button class="origin-model-card" data-fallback-model="${esc(name)}" type="button"><span>${String(index + 1).padStart(2,'0')}</span><div><h3>${esc(name)}</h3><p>Catalogued product family · open for full details and 3D</p></div><b>›</b></button>`).join('');
    }
    return models.map((item, index) => `<button class="origin-model-card" data-live-model="${esc(item.name)}" type="button"><span>${String(index + 1).padStart(2,'0')}</span><div><h3>${esc(item.name)}</h3><p>${esc(item.summary || 'Live model record · select for the complete returned specification sheet')}</p></div><b>›</b></button>`).join('');
  }

  function createModal() {
    if (document.getElementById('originProductModal')) return;
    const modal = document.createElement('div');
    modal.id = 'originProductModal';
    modal.className = 'origin-product-modal';
    modal.hidden = true;
    modal.innerHTML = `<div class="origin-product-backdrop" data-close></div><section class="origin-product-sheet" role="dialog" aria-modal="true"><button class="origin-product-close" data-close aria-label="Close">×</button><div class="origin-product-kicker">PRODUCT EXPLORER · V3</div><div class="origin-product-heading"><div><h2 data-title></h2><p data-company></p></div><span class="origin-live-pill"><i></i> LIVE</span></div><div class="origin-product-body" data-body></div></section>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
  }

  function openModal() {
    const modal = document.getElementById('originProductModal');
    modal.hidden = false;
    document.body.classList.add('origin-modal-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
  }

  function closeModal() {
    const modal = document.getElementById('originProductModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('origin-modal-open');
    setTimeout(() => { modal.hidden = true; }, 180);
  }

  async function showModel(company, product, item) {
    const modal = document.getElementById('originProductModal');
    const body = modal.querySelector('[data-body]');
    body.innerHTML = `<div class="origin-loading"><div class="origin-spinner"></div><strong>Loading complete specification sheet…</strong><p>Origin is requesting the live record.</p></div>`;
    try {
      const specs = isPhoneProduct(company.name, product) ? await fullPhoneSpecs(item) : (item?.raw || {});
      const name = item?.name || product;
      body.innerHTML = `${render3D(name)}<div class="origin-detail-bar"><span>FULL SPECIFICATIONS</span><small>Source data · ${new Date().toLocaleString()}</small></div>${renderFullSpecs(specs)}<p class="origin-disclaimer">Origin displays the fields returned by the live source. It does not fill missing values with guesses. Specifications can vary by generation, market and configuration.</p>`;
    } catch (error) {
      body.innerHTML = `<div class="origin-empty-state"><strong>Live specification lookup failed.</strong><p>${esc(error.message || 'Unknown error')}</p><button class="origin-retry" type="button">Try again</button></div>`;
      body.querySelector('.origin-retry')?.addEventListener('click', () => showModel(company, product, item));
    }
  }

  async function showProduct(company, product) {
    createModal();
    const modal = document.getElementById('originProductModal');
    modal.querySelector('[data-title]').textContent = product;
    modal.querySelector('[data-company]').textContent = `${company.name} · live product catalog`;
    const body = modal.querySelector('[data-body]');
    body.innerHTML = `<div class="origin-loading"><div class="origin-spinner"></div><strong>Finding every available model…</strong><p>Checking the live catalog instead of using a fixed three-model list.</p></div>`;
    openModal();

    let result = { models: [], source: 'Product catalog' };
    try {
      if (isPhoneProduct(company.name, product)) result = await livePhoneModels(company.name, product);
    } catch (_) {}

    const models = result.models || [];
    body.innerHTML = `<div class="origin-catalog-status"><div><strong>${models.length || (fallbackCatalog[product] || []).length || '—'} models</strong><span>${esc(result.source || 'Catalog')}</span></div><button type="button" class="origin-refresh" data-refresh>↻ Refresh</button></div><div class="origin-model-list">${renderModelCards(models, company, product)}</div><p class="origin-spec-note">Select any model for the complete specification fields returned by the live source. Origin does not truncate a model to only three headline specs.</p>`;

    body.querySelectorAll('[data-live-model]').forEach(button => {
      button.addEventListener('click', () => {
        const found = models.find(m => m.name === button.dataset.liveModel);
        showModel(company, product, found || { name: button.dataset.liveModel });
      });
    });
    body.querySelectorAll('[data-fallback-model]').forEach(button => {
      button.addEventListener('click', () => showModel(company, product, { name: button.dataset.fallbackModel, raw: { Product: button.dataset.fallbackModel, Status: 'Product family catalogued; detailed live specification source not connected for this category yet.' } }));
    });
    body.querySelector('[data-refresh]')?.addEventListener('click', async () => {
      try { localStorage.removeItem(cacheKey(company.name, product)); } catch (_) {}
      await showProduct(company, product);
    });
  }

  function currentCompany(page) {
    return { name: page.querySelector('.company-hero-copy h1')?.textContent?.trim() || 'Company' };
  }

  function decorateProducts() {
    const page = document.querySelector('#companyPage:not([hidden])');
    if (!page) return;
    const company = currentCompany(page);
    page.querySelectorAll('.product-universe-card').forEach(card => {
      if (card.dataset.originProductV3) return;
      card.dataset.originProductV3 = '1';
      card.setAttribute('role','button');
      card.setAttribute('tabindex','0');
      const product = card.querySelector('strong')?.textContent?.trim() || card.textContent.trim().split('\n')[0];
      card.title = `Open all ${product} models, full specs & 3D`;
      const open = () => showProduct(company, product);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  function addVersionBadge() {
    const about = document.getElementById('about');
    if (!about || about.querySelector('.origin-version-badge')) return;
    const badge = document.createElement('span');
    badge.className = 'origin-version-badge';
    badge.textContent = 'V3';
    badge.title = 'Origin version 3 · live product explorer';
    about.querySelector('.manifesto-mark')?.appendChild(badge);
  }

  const style = document.createElement('style');
  style.textContent = `
    .origin-version-badge{position:absolute;top:-10px;right:-14px;display:grid;place-items:center;min-width:34px;height:24px;padding:0 8px;border:1px solid #deded9;border-radius:999px;background:#fff;color:#6d5dfc;font-size:10px;font-weight:800;letter-spacing:.08em;box-shadow:0 8px 20px rgba(17,17,17,.08)}
    .manifesto-mark{position:relative}.origin-modal-open{overflow:hidden}
    .origin-product-modal{position:fixed;inset:0;z-index:100;display:block}.origin-product-modal[hidden]{display:none}
    .origin-product-backdrop{position:absolute;inset:0;background:rgba(17,17,17,.42);backdrop-filter:blur(10px);opacity:0;transition:opacity .18s ease}
    .origin-product-sheet{position:absolute;left:50%;bottom:14px;width:min(940px,calc(100% - 20px));max-height:92vh;overflow:auto;transform:translate(-50%,24px);opacity:0;border:1px solid #deded9;border-radius:30px;background:#fff;padding:30px;box-shadow:0 30px 100px rgba(17,17,17,.25);transition:transform .22s cubic-bezier(.2,.8,.2,1),opacity .18s ease}
    .origin-product-modal.is-open .origin-product-backdrop{opacity:1}.origin-product-modal.is-open .origin-product-sheet{transform:translate(-50%,0);opacity:1}
    .origin-product-close{position:absolute;right:18px;top:18px;width:40px;height:40px;border:1px solid #deded9;border-radius:50%;background:#fff;font-size:25px;cursor:pointer}
    .origin-product-kicker{font-size:10px;font-weight:800;letter-spacing:.14em;color:#6d5dfc;margin-bottom:12px}.origin-product-heading{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;border-bottom:1px solid #deded9;padding-bottom:22px;margin-bottom:20px}.origin-product-heading h2{margin:0;font-size:clamp(30px,5vw,54px);letter-spacing:-.05em;line-height:1}.origin-product-heading p{margin:9px 0 0;color:#6e6e6a}
    .origin-live-pill{display:flex;align-items:center;gap:7px;border:1px solid #deded9;border-radius:999px;padding:7px 10px;font-size:10px;font-weight:800;letter-spacing:.1em;color:#3e3e3a}.origin-live-pill i{width:7px;height:7px;border-radius:50%;background:#32a852;box-shadow:0 0 0 4px rgba(50,168,82,.12)}
    .origin-catalog-status{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.origin-catalog-status strong{display:block;font-size:17px}.origin-catalog-status span{display:block;color:#888883;font-size:12px;margin-top:3px}.origin-refresh,.origin-retry{border:1px solid #deded9;background:#fff;border-radius:999px;padding:9px 13px;font-weight:700;cursor:pointer}
    .origin-model-list{display:grid;gap:9px}.origin-model-card{width:100%;display:grid;grid-template-columns:42px 1fr 20px;gap:14px;text-align:left;align-items:center;padding:15px;border:1px solid #deded9;border-radius:17px;background:#f7f7f5;cursor:pointer;transition:.2s}.origin-model-card:hover,.origin-model-card:focus-visible{background:#fff;border-color:#bdb8ff;transform:translateY(-2px);box-shadow:0 12px 30px rgba(17,17,17,.07);outline:none}.origin-model-card>span{font-size:11px;font-weight:800;color:#6d5dfc}.origin-model-card h3{margin:0;font-size:16px}.origin-model-card p{margin:5px 0 0;color:#777772;font-size:13px;line-height:1.5}.origin-model-card b{font-size:22px;color:#aaa}
    .origin-3d-wrap{overflow:hidden;border:1px solid #deded9;border-radius:22px;background:#f3f3f0;margin-bottom:22px}.origin-3d-head{display:flex;justify-content:space-between;padding:12px 15px;background:#fff;border-bottom:1px solid #deded9;font-size:10px;font-weight:800;letter-spacing:.12em}.origin-3d-head small{font-size:10px;letter-spacing:0;color:#888883;font-weight:600}.origin-3d-wrap iframe{display:block;width:100%;height:430px;border:0}.origin-3d-empty{display:flex;gap:16px;align-items:center;padding:20px;border:1px solid #deded9;border-radius:22px;background:#f7f7f5;margin-bottom:22px}.origin-3d-icon{display:grid;place-items:center;width:58px;height:58px;border-radius:16px;background:#111;color:#fff;font-size:12px;font-weight:900}.origin-3d-empty strong{font-size:16px}.origin-3d-empty p{margin:5px 0 8px;color:#777772;font-size:13px;line-height:1.5}.origin-3d-empty a{color:#6d5dfc;font-size:13px;font-weight:800;text-decoration:none}
    .origin-detail-bar{display:flex;justify-content:space-between;gap:10px;align-items:center;border-bottom:1px solid #deded9;padding-bottom:12px;margin-bottom:8px}.origin-detail-bar span{font-size:10px;font-weight:800;letter-spacing:.13em;color:#6d5dfc}.origin-detail-bar small{color:#999;font-size:10px}.origin-spec-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border:1px solid #deded9;border-radius:18px;overflow:hidden}.origin-spec-row{display:flex;justify-content:space-between;gap:15px;padding:12px 14px;border-bottom:1px solid #deded9;background:#fff}.origin-spec-row:nth-child(4n+1),.origin-spec-row:nth-child(4n+2){background:#fafaf8}.origin-spec-row span{text-transform:capitalize;color:#777772;font-size:12px}.origin-spec-row strong{text-align:right;font-size:12px;max-width:65%;overflow-wrap:anywhere}.origin-spec-note,.origin-disclaimer{margin:15px 0 0;color:#888883;font-size:11px;line-height:1.6}.origin-empty-state,.origin-loading{padding:42px 18px;text-align:center;border:1px dashed #deded9;border-radius:20px;background:#fafaf8}.origin-empty-state p,.origin-loading p{color:#777772;font-size:13px}.origin-spinner{width:26px;height:26px;margin:0 auto 14px;border:2px solid #deded9;border-top-color:#6d5dfc;border-radius:50%;animation:originSpin .7s linear infinite}@keyframes originSpin{to{transform:rotate(360deg)}}
    @media(max-width:700px){.origin-product-sheet{bottom:0;width:100%;max-height:94vh;padding:21px;border-radius:26px 26px 0 0}.origin-3d-wrap iframe{height:320px}.origin-spec-grid{grid-template-columns:1fr}.origin-product-heading h2{font-size:34px}.origin-live-pill{margin-right:42px}.origin-spec-row{display:block}.origin-spec-row strong{display:block;text-align:left;max-width:100%;margin-top:4px}.origin-detail-bar{display:block}.origin-detail-bar small{display:block;margin-top:4px}}
  `;
  document.head.appendChild(style);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  const observer = new MutationObserver(() => { createModal(); addVersionBadge(); decorateProducts(); });
  observer.observe(document.body, { childList:true, subtree:true });
  createModal(); addVersionBadge(); decorateProducts();
})();
