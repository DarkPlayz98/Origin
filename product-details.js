/* Origin V4 Product Explorer: resilient live phone discovery, complete returned specs, 3D viewer, refresh. */
(function () {
  'use strict';

  const PROVIDERS = [
    {
      name: 'Phone Specs API · live',
      base: 'https://phone-specs-api-production.up.railway.app/api/v1',
      search: q => `/search?q=${encodeURIComponent(q)}&limit=100`,
      detail: id => `/specs/${encodeURIComponent(id)}`
    },
    {
      name: 'GSMArena-derived phone database · live',
      base: 'https://api-mobilespecs.azharimm.dev/v2',
      search: q => `/search?query=${encodeURIComponent(q)}`
    }
  ];

  const CACHE_TTL = 15 * 60 * 1000;

  const model3D = {
    'iPhone 17 Pro Max': 'https://sketchfab.com/models/87fc1df741384124a8ce0226d2b2058d/embed',
    'iPhone 16 Pro Max': 'https://sketchfab.com/models/8acb38f436d5467c82fa5364712dd8df/embed',
    'MacBook Pro': 'https://sketchfab.com/models/a2158f4d07c24861b268b170cb24c6d8/embed'
  };

  const fallbackCatalog = {
    'iPhone': ['iPhone 17 Pro Max','iPhone 17 Pro','iPhone 17','iPhone Air','iPhone 16 Pro Max','iPhone 16 Pro','iPhone 16 Plus','iPhone 16','iPhone 15 Pro Max','iPhone 15 Pro','iPhone 15 Plus','iPhone 15','iPhone 14 Pro Max','iPhone 14 Pro','iPhone 14 Plus','iPhone 14','iPhone 13 Pro Max','iPhone 13 Pro','iPhone 13'],
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

  function cacheKey(...parts) {
    return `origin-v4:${parts.join(':')}`.toLowerCase().replace(/[^a-z0-9:_-]+/g, '-');
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
    return /iphone|pixel phone|galaxy|phone|smartphone|oneplus|xiaomi|redmi|poco|nokia|motorola|asus rog phone|nothing phone|realme|oppo|vivo|honor|tecno|infinix|zte|sony xperia/.test(p);
  }

  async function fetchJSON(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }

  function arrayFrom(data) {
    if (Array.isArray(data)) return data;
    return data?.results || data?.phones || data?.data?.results || data?.data?.phones || data?.data || [];
  }

  function modelName(item) {
    return item?.model_name || item?.phone_name || item?.model || item?.name || item?.title || 'Unnamed model';
  }

  function modelId(item) {
    return item?.id || item?.slug || item?.phone_slug || '';
  }

  function compactSummary(item) {
    const bits = [
      item?.launch_date,
      item?.release_date,
      item?.screen_size,
      item?.display?.size,
      item?.chipset,
      item?.ram,
      item?.storage
    ].filter(v => v !== undefined && v !== null && String(v).trim());
    return bits.slice(0, 4).map(String).join(' · ');
  }

  function normalizeModel(item, provider) {
    const name = modelName(item);
    return {
      name,
      id: modelId(item),
      provider: provider.name,
      raw: item,
      summary: compactSummary(item)
    };
  }

  function dedupeModels(models) {
    const seen = new Map();
    for (const item of models) {
      const key = item.name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      if (!key || key === 'unnamed model') continue;
      if (!seen.has(key)) seen.set(key, item);
    }
    return Array.from(seen.values());
  }

  async function providerSearch(provider, query) {
    const data = await fetchJSON(provider.base + provider.search(query));
    return arrayFrom(data).map(item => normalizeModel(item, provider)).filter(item => item.name !== 'Unnamed model');
  }

  async function livePhoneModels(company, product) {
    const query = `${company} ${product}`.replace(/\s+/g, ' ').trim();
    const key = cacheKey('models', company, product);
    const cached = readCache(key);
    if (cached) return { models: cached.models || cached, sources: cached.sources || [], cached: true };

    const results = await Promise.allSettled(PROVIDERS.map(provider => providerSearch(provider, query)));
    const models = [];
    const sources = [];
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        models.push(...result.value);
        sources.push(PROVIDERS[index].name);
      }
    });

    const merged = dedupeModels(models);
    if (!merged.length) throw new Error('Both live phone providers returned no models.');
    writeCache(key, { models: merged, sources });
    return { models: merged, sources, cached: false };
  }

  async function getPhoneSpecs(item) {
    const provider = PROVIDERS.find(p => p.name === item?.provider);
    const id = item?.id || item?.raw?.id || item?.raw?.slug || item?.raw?.phone_slug;
    const itemKey = cacheKey('spec', item?.provider || 'unknown', id || item?.name);
    const cached = readCache(itemKey);
    if (cached) return cached;

    if (provider?.detail && id) {
      try {
        const data = await fetchJSON(provider.base + provider.detail(id));
        const specs = data?.data || data?.result || data?.phone || data;
        if (specs && typeof specs === 'object') {
          writeCache(itemKey, specs);
          return specs;
        }
      } catch (_) {}
    }

    const raw = item?.raw;
    const rawBrand = raw?.brand || raw?.brand_name;
    const rawSlug = raw?.slug || raw?.phone_slug;
    const legacyBase = 'https://api-mobilespecs.azharimm.dev/v2';
    const candidates = [];
    if (rawBrand && rawSlug) candidates.push(`${legacyBase}/brands/${encodeURIComponent(String(rawBrand).toLowerCase())}/${encodeURIComponent(String(rawSlug))}`);
    if (raw?.url && /^https?:/i.test(raw.url)) candidates.push(raw.url);

    for (const url of candidates) {
      try {
        const data = await fetchJSON(url);
        const specs = data?.data || data?.phone || data;
        if (specs && typeof specs === 'object') {
          writeCache(itemKey, specs);
          return specs;
        }
      } catch (_) {}
    }

    if (raw && typeof raw === 'object' && Object.keys(raw).length > 2) return raw;
    throw new Error('A live detail record was not returned for this model.');
  }

  function sketchfabSearchURL(name) {
    return `https://sketchfab.com/search?type=models&q=${encodeURIComponent(name)}`;
  }

  function embed3D(name) {
    const exact = Object.keys(model3D).find(key => key.toLowerCase() === String(name).toLowerCase());
    return exact ? model3D[exact] : '';
  }

  function render3D(name) {
    const url = embed3D(name);
    if (url) {
      return `<div class="origin-3d-wrap"><div class="origin-3d-head"><span>INTERACTIVE 3D</span><small>Drag · pinch · rotate</small></div><iframe title="3D model of ${esc(name)}" src="${url}" allow="autoplay; fullscreen; xr-spatial-tracking" loading="lazy"></iframe></div>`;
    }
    return `<div class="origin-3d-empty"><div class="origin-3d-icon">3D</div><div><strong>3D model search</strong><p>No verified exact model is embedded in Origin yet.</p><a href="${sketchfabSearchURL(name)}" target="_blank" rel="noopener">Find ${esc(name)} in 3D ↗</a></div></div>`;
  }

  function flatten(value, prefix, out, depth = 0) {
    if (depth > 12 || value === null || value === undefined || value === '') return;
    if (typeof value !== 'object') { out.push([prefix || 'Specification', String(value)]); return; }
    if (Array.isArray(value)) {
      value.forEach((v, i) => flatten(v, `${prefix || 'Item'} ${i + 1}`, out, depth + 1));
      return;
    }
    Object.keys(value).forEach(key => flatten(value[key], prefix ? `${prefix} · ${key}` : key, out, depth + 1));
  }

  function renderFullSpecs(specs) {
    const rows = [];
    flatten(specs, '', rows);
    const filtered = rows.filter(([key, value]) => {
      const k = key.toLowerCase();
      if (/^image$|^thumbnail$|^url$|^source_url$/.test(k)) return false;
      return value.length < 1200;
    });
    if (!filtered.length) return '<p class="origin-empty-spec">The live source returned no structured fields.</p>';
    return `<div class="origin-spec-grid">${filtered.map(([key, value]) => `<div class="origin-spec-row"><span>${esc(key.replace(/[_-]+/g,' '))}</span><strong>${esc(value)}</strong></div>`).join('')}</div>`;
  }

  function renderModelCards(models, product) {
    if (!models.length) {
      const fallback = fallbackCatalog[product] || [];
      if (!fallback.length) return '<div class="origin-empty-state"><strong>No live models found.</strong><p>Origin did not invent model names.</p></div>';
      return fallback.map((name, index) => `<button class="origin-model-card" data-fallback-model="${esc(name)}" type="button"><span>${String(index + 1).padStart(2,'0')}</span><div><h3>${esc(name)}</h3><p>Known product family · live detail source unavailable</p></div><b>›</b></button>`).join('');
    }
    return models.map((item, index) => `<button class="origin-model-card" data-live-index="${index}" type="button"><span>${String(index + 1).padStart(2,'0')}</span><div><h3>${esc(item.name)}</h3><p>${esc(item.summary || item.provider)}</p></div><b>›</b></button>`).join('');
  }

  function createModal() {
    if (document.getElementById('originProductModal')) return;
    const modal = document.createElement('div');
    modal.id = 'originProductModal';
    modal.className = 'origin-product-modal';
    modal.hidden = true;
    modal.innerHTML = `<div class="origin-product-backdrop" data-close></div><section class="origin-product-sheet" role="dialog" aria-modal="true"><button class="origin-product-close" data-close aria-label="Close">×</button><div class="origin-product-kicker">PRODUCT EXPLORER · V4</div><div class="origin-product-heading"><div><h2 data-title></h2><p data-company></p></div><span class="origin-live-pill"><i></i> LIVE</span></div><div class="origin-product-body" data-body></div></section>`;
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
    body.innerHTML = `<div class="origin-loading"><div class="origin-spinner"></div><strong>Loading complete specification sheet…</strong><p>Origin is requesting the full live record.</p></div>`;
    try {
      const specs = isPhoneProduct(company.name, product) ? await getPhoneSpecs(item) : (item?.raw || {});
      const name = item?.name || product;
      body.innerHTML = `${render3D(name)}<div class="origin-detail-bar"><span>FULL SPECIFICATIONS</span><small>${esc(item?.provider || 'Live source')} · ${new Date().toLocaleString()}</small></div>${renderFullSpecs(specs)}<p class="origin-disclaimer">Origin shows the fields returned by the live source. Missing values are not guessed. Specs can vary by generation, market and configuration.</p>`;
    } catch (error) {
      body.innerHTML = `<div class="origin-empty-state"><strong>Could not fetch this model's live specs.</strong><p>${esc(error.message || 'The provider did not return a detail record.')}</p><button class="origin-retry" type="button">Retry live lookup</button></div>`;
      body.querySelector('.origin-retry')?.addEventListener('click', () => showModel(company, product, item));
    }
  }

  async function showProduct(company, product) {
    createModal();
    const modal = document.getElementById('originProductModal');
    modal.querySelector('[data-title]').textContent = product;
    modal.querySelector('[data-company]').textContent = `${company.name} · live product catalog`;
    const body = modal.querySelector('[data-body]');
    body.innerHTML = `<div class="origin-loading"><div class="origin-spinner"></div><strong>Finding available models…</strong><p>Origin checks more than one live phone provider.</p></div>`;
    openModal();

    let result = { models: [], sources: [] };
    try {
      if (isPhoneProduct(company.name, product)) result = await livePhoneModels(company.name, product);
    } catch (error) {
      body.innerHTML = `<div class="origin-empty-state"><strong>Live model lookup failed.</strong><p>${esc(error.message || 'No provider responded.')}</p><button class="origin-retry" type="button">Retry</button></div>`;
      body.querySelector('.origin-retry')?.addEventListener('click', () => showProduct(company, product));
      return;
    }

    const models = result.models || [];
    const fallback = fallbackCatalog[product] || [];
    const count = models.length || fallback.length || 0;
    const sourceText = result.cached ? `${(result.sources || []).length || 1} live sources · cached < 15 min` : `${result.sources?.length || 0} live sources · refreshed now`;
    body.innerHTML = `<div class="origin-catalog-status"><div><strong>${count || '—'} models</strong><span>${esc(sourceText)}</span></div><button type="button" class="origin-refresh" data-refresh>↻ Refresh</button></div><div class="origin-model-list">${renderModelCards(models, product)}</div><p class="origin-spec-note">Open a model to see every structured field returned by the live source.</p>`;

    body.querySelectorAll('[data-live-index]').forEach(button => {
      button.addEventListener('click', () => showModel(company, product, models[Number(button.dataset.liveIndex)]));
    });
    body.querySelectorAll('[data-fallback-model]').forEach(button => {
      button.addEventListener('click', () => showModel(company, product, { name: button.dataset.fallbackModel, raw: { Product: button.dataset.fallbackModel, Status: 'Known product family; this category has no connected structured live-detail provider.' } }));
    });
    body.querySelector('[data-refresh]')?.addEventListener('click', async () => {
      try { localStorage.removeItem(cacheKey('models', company.name, product)); } catch (_) {}
      await showProduct(company, product);
    });
  }

  function decorateProducts() {
    const page = document.querySelector('#companyPage:not([hidden])');
    if (!page) return;
    const company = { name: page.querySelector('.company-hero-copy h1')?.textContent?.trim() || 'Company' };
    page.querySelectorAll('.product-universe-card').forEach(card => {
      if (card.dataset.originProductV4) return;
      card.dataset.originProductV4 = '1';
      card.setAttribute('role','button');
      card.setAttribute('tabindex','0');
      const product = card.querySelector('strong')?.textContent?.trim() || card.textContent.trim().split('\n')[0];
      card.title = `Open ${product} models, full specs & 3D`;
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
    badge.textContent = 'V4';
    badge.title = 'Origin version 4 · resilient live product explorer';
    about.querySelector('.manifesto-mark')?.appendChild(badge);
  }

  const style = document.createElement('style');
  style.textContent = `
    .origin-version-badge{position:absolute;top:-10px;right:-14px;display:grid;place-items:center;min-width:34px;height:24px;padding:0 8px;border:1px solid #deded9;border-radius:999px;background:#111;color:#fff;font-size:10px;font-weight:800;letter-spacing:.08em;box-shadow:0 8px 20px rgba(17,17,17,.08)}
    .manifesto-mark{position:relative}.origin-modal-open{overflow:hidden}.origin-product-modal{position:fixed;inset:0;z-index:100;display:block}.origin-product-modal[hidden]{display:none}.origin-product-backdrop{position:absolute;inset:0;background:rgba(17,17,17,.42);backdrop-filter:blur(10px);opacity:0;transition:opacity .18s ease}.origin-product-sheet{position:absolute;left:50%;bottom:14px;width:min(940px,calc(100% - 20px));max-height:92vh;overflow:auto;transform:translate(-50%,24px);opacity:0;border:1px solid #deded9;border-radius:30px;background:#fff;padding:30px;box-shadow:0 30px 100px rgba(17,17,17,.25);transition:transform .22s cubic-bezier(.2,.8,.2,1),opacity .18s ease}.origin-product-modal.is-open .origin-product-backdrop{opacity:1}.origin-product-modal.is-open .origin-product-sheet{transform:translate(-50%,0);opacity:1}.origin-product-close{position:absolute;right:18px;top:18px;width:40px;height:40px;border:1px solid #deded9;border-radius:50%;background:#fff;font-size:25px;cursor:pointer}.origin-product-kicker{font-size:10px;font-weight:800;letter-spacing:.14em;color:#6d5dfc;margin-bottom:12px}.origin-product-heading{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;border-bottom:1px solid #deded9;padding-bottom:22px;margin-bottom:20px}.origin-product-heading h2{margin:0;font-size:clamp(30px,5vw,54px);letter-spacing:-.05em;line-height:1}.origin-product-heading p{margin:9px 0 0;color:#6e6e6a}.origin-live-pill{display:flex;align-items:center;gap:7px;border:1px solid #deded9;border-radius:999px;padding:7px 10px;font-size:10px;font-weight:800;letter-spacing:.1em;color:#3e3e3a}.origin-live-pill i{width:7px;height:7px;border-radius:50%;background:#32a852;box-shadow:0 0 0 4px rgba(50,168,82,.12)}.origin-catalog-status{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.origin-catalog-status strong{display:block;font-size:17px}.origin-catalog-status span{display:block;color:#888883;font-size:12px;margin-top:3px}.origin-refresh,.origin-retry{border:1px solid #deded9;background:#fff;border-radius:999px;padding:9px 13px;font-weight:700;cursor:pointer}.origin-model-list{display:grid;gap:9px}.origin-model-card{width:100%;display:grid;grid-template-columns:42px 1fr 20px;gap:14px;text-align:left;align-items:center;padding:15px;border:1px solid #deded9;border-radius:17px;background:#f7f7f5;cursor:pointer;transition:.2s}.origin-model-card:hover,.origin-model-card:focus-visible{background:#fff;border-color:#bdb8ff;transform:translateY(-2px);box-shadow:0 12px 30px rgba(17,17,17,.07);outline:none}.origin-model-card>span{font-size:11px;font-weight:800;color:#6d5dfc}.origin-model-card h3{margin:0;font-size:16px}.origin-model-card p{margin:5px 0 0;color:#777772;font-size:13px;line-height:1.5}.origin-model-card b{font-size:22px;color:#aaa}.origin-3d-wrap{overflow:hidden;border:1px solid #deded9;border-radius:22px;background:#f3f3f0;margin-bottom:22px}.origin-3d-head{display:flex;justify-content:space-between;padding:12px 15px;background:#fff;border-bottom:1px solid #deded9;font-size:10px;font-weight:800;letter-spacing:.12em}.origin-3d-head small{font-size:10px;letter-spacing:0;color:#888883;font-weight:600}.origin-3d-wrap iframe{display:block;width:100%;height:430px;border:0}.origin-3d-empty{display:flex;gap:16px;align-items:center;padding:20px;border:1px solid #deded9;border-radius:22px;background:#f7f7f5;margin-bottom:22px}.origin-3d-icon{display:grid;place-items:center;width:58px;height:58px;border-radius:16px;background:#111;color:#fff;font-size:12px;font-weight:900}.origin-3d-empty strong{font-size:16px}.origin-3d-empty p{margin:5px 0 8px;color:#777772;font-size:13px;line-height:1.5}.origin-3d-empty a{color:#6d5dfc;font-size:13px;font-weight:800;text-decoration:none}.origin-detail-bar{display:flex;justify-content:space-between;gap:10px;align-items:center;border-bottom:1px solid #deded9;padding-bottom:12px;margin-bottom:8px}.origin-detail-bar span{font-size:10px;font-weight:800;letter-spacing:.13em;color:#6d5dfc}.origin-detail-bar small{color:#999;font-size:10px}.origin-spec-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border:1px solid #deded9;border-radius:18px;overflow:hidden}.origin-spec-row{display:flex;justify-content:space-between;gap:15px;padding:12px 14px;border-bottom:1px solid #deded9;background:#fff}.origin-spec-row:nth-child(4n+1),.origin-spec-row:nth-child(4n+2){background:#fafaf8}.origin-spec-row span{text-transform:capitalize;color:#777772;font-size:12px}.origin-spec-row strong{text-align:right;font-size:12px;max-width:65%;overflow-wrap:anywhere}.origin-spec-note,.origin-disclaimer{margin:15px 0 0;color:#888883;font-size:11px;line-height:1.6}.origin-empty-state,.origin-loading{padding:42px 18px;text-align:center;border:1px dashed #deded9;border-radius:20px;background:#fafaf8}.origin-empty-state p,.origin-loading p{color:#777772;font-size:13px}.origin-spinner{width:26px;height:26px;margin:0 auto 14px;border:2px solid #deded9;border-top-color:#6d5dfc;border-radius:50%;animation:originSpin .7s linear infinite}@keyframes originSpin{to{transform:rotate(360deg)}}
    @media(max-width:700px){.origin-product-sheet{bottom:0;width:100%;max-height:94vh;padding:21px;border-radius:26px 26px 0 0}.origin-3d-wrap iframe{height:320px}.origin-spec-grid{grid-template-columns:1fr}.origin-product-heading h2{font-size:34px}.origin-live-pill{margin-right:42px}.origin-spec-row{display:block}.origin-spec-row strong{display:block;text-align:left;max-width:100%;margin-top:4px}.origin-detail-bar{display:block}.origin-detail-bar small{display:block;margin-top:4px}}
  `;
  document.head.appendChild(style);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  const observer = new MutationObserver(() => { createModal(); addVersionBadge(); decorateProducts(); });
  observer.observe(document.body, { childList:true, subtree:true });
  createModal(); addVersionBadge(); decorateProducts();
})();
