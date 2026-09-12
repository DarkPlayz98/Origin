/* Origin V6 product engine — MobileAPI.dev via a server-side Cloudflare proxy. */
(function () {
  'use strict';

  const PROXY = window.ORIGIN_MOBILE_API_PROXY || '/api/mobileapi';
  const TTL = 10 * 60 * 1000;
  const THREE_D = {
    'iPhone 17 Pro Max':'https://sketchfab.com/models/87fc1df741384124a8ce0226d2b2058d/embed',
    'iPhone 16 Pro Max':'https://sketchfab.com/models/8acb38f436d5467c82fa5364712dd8df/embed',
    'MacBook Pro':'https://sketchfab.com/models/a2158f4d07c24861b268b170cb24c6d8/embed'
  };
  const esc = s => String(s ?? '').replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const cacheKey = s => `origin-mobileapi:${String(s).toLowerCase().replace(/[^a-z0-9:_-]+/g,'-')}`;
  const readCache = k => { try { const x=JSON.parse(localStorage.getItem(k)||'null'); return x && Date.now()-x.t<TTL ? x.d : null; } catch (_) { return null; } };
  const writeCache = (k,d) => { try { localStorage.setItem(k,JSON.stringify({t:Date.now(),d})); } catch (_) {} };

  async function getJSON(path, force=false) {
    const k=cacheKey(path); if (!force) { const hit=readCache(k); if (hit) return hit; }
    const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),12000);
    try {
      const r=await fetch(`${PROXY}${path}`,{method:'GET',headers:{Accept:'application/json'},cache:'no-store',signal:controller.signal});
      const text=await r.text(); let data={};
      try { data=text?JSON.parse(text):{}; } catch (_) { throw new Error(`Provider returned non-JSON (HTTP ${r.status}).`); }
      if(!r.ok) throw new Error(data?.detail || data?.error || data?.message || `HTTP ${r.status}`);
      writeCache(k,data); return data;
    } catch(e) {
      if(e?.name==='AbortError') throw new Error('MobileAPI lookup timed out.');
      if(e instanceof TypeError) throw new Error('MobileAPI proxy is not connected yet.');
      throw e;
    } finally { clearTimeout(timer); }
  }

  function rows(data) {
    if(Array.isArray(data)) return data;
    return data?.results || data?.data?.results || data?.devices || data?.data?.devices || data?.data || [];
  }
  function nameOf(x) { return x?.name || x?.model_name || x?.model || x?.device_name || x?.title || 'Unknown device'; }
  function idOf(x) { return x?.id ?? x?.device_id ?? x?.pk ?? ''; }
  function manufacturerOf(x) { return x?.manufacturer?.name || x?.manufacturer || x?.brand?.name || x?.brand || ''; }
  function summary(x) {
    return [manufacturerOf(x),x?.release_date||x?.releaseDate,x?.display?.size||x?.screen_size,x?.platform?.chipset||x?.chipset,x?.memory?.ram||x?.ram].filter(Boolean).slice(0,5).join(' · ');
  }

  async function search(query) {
    const data=await getJSON(`/devices/search/?name=${encodeURIComponent(query)}&page=1`);
    return rows(data).map(x=>({name:nameOf(x),id:idOf(x),raw:x,summary:summary(x)})).filter(x=>x.id!=='' && x.name!=='Unknown device');
  }

  async function detail(model) {
    const id=model?.id ?? model?.raw?.id ?? model?.raw?.device_id ?? model?.raw?.pk;
    if(id==='') throw new Error('MobileAPI did not return a device ID.');
    const data=await getJSON(`/devices/${encodeURIComponent(id)}/`);
    return data?.data?.device || data?.device || data?.data || data;
  }

  function imageOf(x) {
    return x?.image?.url || x?.image_url || x?.thumbnail || x?.images?.[0]?.url || x?.images?.[0] || x?.device_image || '';
  }
  function flatten(value,path,out,depth=0) {
    if(depth>16 || value===null || value===undefined || value==='') return;
    if(typeof value!=='object') { out.push([path||'Specification',String(value)]); return; }
    if(Array.isArray(value)) { value.forEach((v,i)=>flatten(v,`${path||'Item'} ${i+1}`,out,depth+1)); return; }
    Object.keys(value).forEach(key=>flatten(value[key],path?`${path} · ${key}`:key,out,depth+1));
  }
  function specHTML(data) {
    const rows=[]; flatten(data,'',rows);
    const filtered=rows.filter(([k,v])=>!/(^| · )(image|thumbnail|url|image_url|base64)$/i.test(k)&&v.length<2000);
    if(!filtered.length) return '<div class="origin-v6-empty">MobileAPI returned no displayable specification fields.</div>';
    return `<div class="origin-v6-specs">${filtered.map(([k,v])=>`<div><span>${esc(k.replace(/[_-]+/g,' '))}</span><strong>${esc(v)}</strong></div>`).join('')}</div>`;
  }
  function threeDHTML(name) {
    const exact=Object.keys(THREE_D).find(k=>k.toLowerCase()===String(name).toLowerCase());
    if(exact) return `<div class="origin-v6-3d"><div><b>INTERACTIVE 3D</b><span>drag · pinch · rotate</span></div><iframe title="3D model of ${esc(name)}" src="${THREE_D[exact]}" allow="autoplay; fullscreen; xr-spatial-tracking" loading="lazy"></iframe></div>`;
    return `<div class="origin-v6-3d-empty"><b>3D</b><div><strong>No verified 3D embed is stored for this device yet.</strong><a target="_blank" rel="noopener" href="https://sketchfab.com/search?type=models&q=${encodeURIComponent(name)}">Search ${esc(name)} in Sketchfab ↗</a></div></div>`;
  }

  let modal;
  function makeModal() {
    if(modal) return modal;
    modal=document.createElement('div'); modal.id='originV6Modal'; modal.className='origin-v6-modal'; modal.hidden=true;
    modal.innerHTML='<div class="origin-v6-backdrop"></div><section class="origin-v6-sheet" role="dialog" aria-modal="true"><button class="origin-v6-close" aria-label="Close">×</button><div class="origin-v6-kicker">ORIGIN · MOBILEAPI LIVE</div><div class="origin-v6-heading"><div><h2 data-title></h2><p data-subtitle></p></div><span class="origin-v6-live">● LIVE</span></div><div data-content></div></section>';
    document.body.appendChild(modal);
    const close=()=>{modal.classList.remove('open');document.body.classList.remove('origin-v6-open');setTimeout(()=>{modal.hidden=true;},180);};
    modal.querySelector('.origin-v6-close').onclick=close;
    modal.querySelector('.origin-v6-backdrop').onclick=close;
    return modal;
  }
  function openModal(){const m=makeModal();m.hidden=false;requestAnimationFrame(()=>m.classList.add('open'));document.body.classList.add('origin-v6-open');}
  function errorHTML(title,message,retry) { return `<div class="origin-v6-error"><strong>${esc(title)}</strong><p>${esc(message)}</p><button data-retry>Retry</button></div>`; }

  async function showModel(company,product,model,force=false) {
    const m=makeModal(), c=m.querySelector('[data-content]');
    m.querySelector('[data-title]').textContent=model?.name || product;
    m.querySelector('[data-subtitle]').textContent=`${company} · complete MobileAPI device record`;
    c.innerHTML='<div class="origin-v6-loading"><i></i><strong>Fetching the complete device record…</strong><span>All available MobileAPI fields · no guessed values</span></div>';
    openModal();
    try {
      const data=await detail(model,force); const image=imageOf(data)||imageOf(model?.raw);
      const imageBlock=image?`<div class="origin-v6-device-image"><img src="${esc(image)}" alt="${esc(model.name)}" loading="lazy"></div>`:'';
      c.innerHTML=imageBlock+threeDHTML(model.name)+`<div class="origin-v6-bar"><strong>FULL SPECIFICATIONS</strong><span>Live MobileAPI response · ${new Date().toLocaleString()}</span><button data-refresh>↻ Refresh</button></div>`+specHTML(data)+`<p class="origin-v6-note">Origin displays the fields returned by MobileAPI.dev. Availability can differ by device variant and market.</p>`;
      c.querySelector('[data-refresh]').onclick=()=>showModel(company,product,model,true);
    } catch(e) { c.innerHTML=errorHTML('Device specs could not be fetched.',e.message); c.querySelector('[data-retry]').onclick=()=>showModel(company,product,model,true); }
  }

  async function showProduct(company,product,force=false) {
    const m=makeModal(), c=m.querySelector('[data-content]');
    m.querySelector('[data-title]').textContent=product;
    m.querySelector('[data-subtitle]').textContent=`${company} · searchable live device database`;
    c.innerHTML='<div class="origin-v6-loading"><i></i><strong>Searching MobileAPI.dev…</strong><span>Fuzzy device matching across the live database</span></div>';
    openModal();
    try {
      let models=await search(`${company} ${product}`);
      models=models.slice(0,50);
      if(!models.length) { c.innerHTML=errorHTML('No matching device was found.',`MobileAPI returned no match for ${company} ${product}.`); c.querySelector('[data-retry]').onclick=()=>showProduct(company,product,true); return; }
      c.innerHTML=`<div class="origin-v6-status"><strong>${models.length} matching devices</strong><span>MobileAPI.dev · open one for the complete record</span><button data-refresh>↻ Refresh</button></div><div class="origin-v6-models">${models.map((x,i)=>{const img=imageOf(x.raw);return `<button type="button" data-model="${i}">${img?`<img src="${esc(img)}" alt="" loading="lazy">`:`<span class="origin-v6-num">${String(i+1).padStart(2,'0')}</span>`}<div><strong>${esc(x.name)}</strong><small>${esc(x.summary||'Open complete live specifications')}</small></div><b>›</b></button>`;}).join('')}</div>`;
      c.querySelectorAll('[data-model]').forEach(b=>b.onclick=()=>showModel(company,product,models[Number(b.dataset.model)]));
      c.querySelector('[data-refresh]').onclick=()=>{try{localStorage.removeItem(cacheKey(`/devices/search/?name=${company} ${product}&page=1`));}catch(_){} showProduct(company,product,true);};
    } catch(e) { c.innerHTML=errorHTML('MobileAPI search failed.',e.message); c.querySelector('[data-retry]').onclick=()=>showProduct(company,product,true); }
  }

  function bind() {
    const page=document.querySelector('#companyPage:not([hidden])'); if(!page) return;
    const company=page.querySelector('.company-hero-copy h1')?.textContent?.trim()||'Company';
    page.querySelectorAll('.product-universe-card').forEach(card=>{
      if(card.dataset.originV6Bound==='1') return;
      card.dataset.originV6Bound='1';
      card.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();const product=card.querySelector('strong')?.textContent?.trim()||card.textContent.trim();showProduct(company,product);},true);
    });
  }

  const style=document.createElement('style');
  style.textContent=`
    .origin-v6-open{overflow:hidden}.origin-v6-modal{position:fixed;inset:0;z-index:1400;background:rgba(17,17,17,.52);backdrop-filter:blur(18px);opacity:0;transition:opacity .18s ease}.origin-v6-modal.open{opacity:1}.origin-v6-modal[hidden]{display:none}.origin-v6-sheet{position:absolute;inset:0;background:#f7f7f5;overflow:auto;padding:28px max(18px,calc((100% - 980px)/2)) 56px;transform:translateY(14px);transition:transform .22s cubic-bezier(.2,.8,.2,1)}.origin-v6-modal.open .origin-v6-sheet{transform:none}.origin-v6-close{position:fixed;top:16px;right:18px;width:44px;height:44px;border:1px solid #deded9;border-radius:50%;background:#fff;font-size:25px;cursor:pointer;z-index:5}.origin-v6-kicker{font-size:10px;font-weight:850;letter-spacing:.14em;color:#6d5dfc;margin:10px 0 16px}.origin-v6-heading{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;margin-bottom:26px}.origin-v6-heading h2{margin:0;font-size:clamp(38px,7vw,74px);line-height:.98;letter-spacing:-.06em;max-width:760px}.origin-v6-heading p{margin:10px 0 0;color:#777772}.origin-v6-live{font-size:10px;font-weight:850;letter-spacing:.12em;background:#fff;border:1px solid #deded9;border-radius:999px;padding:8px 11px;white-space:nowrap}.origin-v6-live:first-letter{color:#28a745}.origin-v6-status,.origin-v6-bar{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;border-bottom:1px solid #deded9;padding:14px 0;margin-bottom:14px}.origin-v6-status strong,.origin-v6-bar strong{font-size:14px}.origin-v6-status span,.origin-v6-bar span{font-size:11px;color:#878781}.origin-v6-status button,.origin-v6-bar button,.origin-v6-error button{border:1px solid #deded9;background:#fff;border-radius:999px;padding:8px 12px;font-weight:750;cursor:pointer}.origin-v6-models{display:grid;gap:8px}.origin-v6-models button{width:100%;border:1px solid #deded9;background:#fff;border-radius:17px;padding:12px;display:grid;grid-template-columns:48px 1fr 20px;gap:12px;align-items:center;text-align:left;cursor:pointer}.origin-v6-models button:hover{border-color:#bdb8ff;transform:translateY(-1px)}.origin-v6-models img{width:48px;height:48px;object-fit:contain;border-radius:12px;background:#f4f4f1}.origin-v6-num{width:48px;height:48px;border-radius:12px;background:#111;color:#fff;display:grid;place-items:center;font-size:11px;font-weight:850}.origin-v6-models strong{display:block;font-size:14px}.origin-v6-models small{display:block;color:#777772;font-size:11px;margin-top:4px}.origin-v6-loading,.origin-v6-error,.origin-v6-empty{border:1px dashed #deded9;border-radius:20px;background:#fff;padding:44px;text-align:center}.origin-v6-loading i{display:block;width:27px;height:27px;margin:0 auto 15px;border:2px solid #ddd;border-top-color:#6d5dfc;border-radius:50%;animation:ov6spin .7s linear infinite}@keyframes ov6spin{to{transform:rotate(360deg)}}.origin-v6-loading span,.origin-v6-error p{display:block;color:#777772;font-size:13px;margin-top:7px}.origin-v6-error button{margin-top:12px}.origin-v6-device-image{border:1px solid #deded9;border-radius:22px;background:#fff;padding:18px;margin-bottom:20px;text-align:center}.origin-v6-device-image img{max-width:min(380px,100%);max-height:380px;object-fit:contain;border-radius:15px}.origin-v6-3d{border:1px solid #deded9;border-radius:22px;overflow:hidden;background:#fff;margin-bottom:20px}.origin-v6-3d>div{display:flex;justify-content:space-between;gap:12px;padding:12px 15px;border-bottom:1px solid #deded9;font-size:10px;letter-spacing:.12em}.origin-v6-3d>div span{letter-spacing:0;color:#888}.origin-v6-3d iframe{width:100%;height:460px;border:0;display:block}.origin-v6-3d-empty{display:flex;gap:15px;align-items:center;border:1px solid #deded9;border-radius:20px;padding:20px;background:#fff;margin-bottom:20px}.origin-v6-3d-empty>b{width:54px;height:54px;border-radius:14px;background:#111;color:#fff;display:grid;place-items:center}.origin-v6-3d-empty a{display:block;margin-top:6px;color:#6d5dfc;font-size:12px;font-weight:750;text-decoration:none}.origin-v6-specs{display:grid;grid-template-columns:1fr 1fr;border:1px solid #deded9;border-radius:18px;overflow:hidden}.origin-v6-specs>div{padding:13px 14px;border-bottom:1px solid #deded9;background:#fff;display:grid;grid-template-columns:minmax(110px,.75fr) minmax(0,1.25fr);gap:14px}.origin-v6-specs span{font-size:11px;color:#85857f;text-transform:capitalize}.origin-v6-specs strong{font-size:12px;line-height:1.5;word-break:break-word}.origin-v6-note{margin:16px 2px 0;color:#85857f;font-size:12px;line-height:1.6}@media(max-width:640px){.origin-v6-sheet{padding:24px 14px 42px}.origin-v6-heading{display:block}.origin-v6-live{display:inline-flex;margin-top:12px}.origin-v6-status,.origin-v6-bar{align-items:flex-start}.origin-v6-specs{grid-template-columns:1fr}.origin-v6-3d iframe{height:320px}.origin-v6-models button{grid-template-columns:42px 1fr 16px}.origin-v6-models img,.origin-v6-num{width:42px;height:42px}}
  `;
  document.head.appendChild(style);
  const observer=new MutationObserver(bind); observer.observe(document.body,{childList:true,subtree:true});
  bind();
})();
