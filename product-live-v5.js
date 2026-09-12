/* Origin V5 live product engine. Overrides the older product handler and uses the current Vercel phone API. */
(function () {
  'use strict';

  const API = 'https://phone-specs-api.vercel.app/api/v1';
  const TTL = 10 * 60 * 1000;
  const fallback = {
    iPhone: ['iPhone 17 Pro Max','iPhone 17 Pro','iPhone 17','iPhone Air','iPhone 16 Pro Max','iPhone 16 Pro','iPhone 16 Plus','iPhone 16','iPhone 15 Pro Max','iPhone 15 Pro','iPhone 15 Plus','iPhone 15'],
    Pixel: ['Pixel 10 Pro XL','Pixel 10 Pro','Pixel 10','Pixel 9 Pro XL','Pixel 9 Pro','Pixel 9'],
    Galaxy: ['Galaxy S25 Ultra','Galaxy S25+','Galaxy S25','Galaxy Z Fold7','Galaxy Z Flip7']
  };
  const threeD = {
    'iPhone 17 Pro Max': 'https://sketchfab.com/models/87fc1df741384124a8ce0226d2b2058d/embed',
    'iPhone 16 Pro Max': 'https://sketchfab.com/models/8acb38f436d5467c82fa5364712dd8df/embed',
    'MacBook Pro': 'https://sketchfab.com/models/a2158f4d07c24861b268b170cb24c6d8/embed'
  };
  const esc = s => String(s ?? '').replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const key = s => `origin-v5:${s}`.toLowerCase().replace(/[^a-z0-9:_-]+/g,'-');

  function getCache(k) { try { const x = JSON.parse(localStorage.getItem(k) || 'null'); return x && Date.now()-x.t < TTL ? x.d : null; } catch (_) { return null; } }
  function putCache(k,d) { try { localStorage.setItem(k, JSON.stringify({t:Date.now(),d})); } catch (_) {} }

  async function getJSON(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      const r = await fetch(url, { method:'GET', mode:'cors', cache:'no-store', headers:{Accept:'application/json'}, signal:controller.signal });
      const text = await r.text();
      let data = {}; try { data = text ? JSON.parse(text) : {}; } catch (_) { throw new Error(`Provider returned non-JSON (HTTP ${r.status}).`); }
      if (!r.ok) throw new Error(data?.detail || data?.error || `HTTP ${r.status}`);
      return data;
    } catch (e) {
      if (e?.name === 'AbortError') throw new Error('Live product lookup timed out.');
      throw e;
    } finally { clearTimeout(timer); }
  }

  function rows(data) {
    if (Array.isArray(data)) return data;
    return data?.results || data?.phones || data?.data?.results || data?.data?.phones || data?.data || [];
  }
  function nameOf(x) { return x?.model_name || x?.model || x?.name || x?.phone_name || x?.title || 'Unknown model'; }
  function idOf(x) { return x?.id || x?.slug || x?.phone_slug || ''; }
  function summary(x) {
    return [x?.brand, x?.release_date, x?.screen_size, x?.display, x?.chipset, x?.ram, x?.storage].filter(Boolean).slice(0,5).map(String).join(' · ');
  }

  async function search(q) {
    const k = key(`search:${q}`), cached = getCache(k); if (cached) return cached;
    const data = await getJSON(`${API}/search?q=${encodeURIComponent(q)}`);
    const result = rows(data).map(x => ({name:nameOf(x), id:idOf(x), raw:x, summary:summary(x)})).filter(x => x.name !== 'Unknown model');
    putCache(k,result); return result;
  }

  async function specs(model) {
    const id = model?.id || model?.raw?.id;
    if (!id) {
      const found = await search(model?.name || '');
      model = found.find(x => x.name.toLowerCase() === String(model?.name || '').toLowerCase()) || found[0] || model;
    }
    const realId = model?.id || model?.raw?.id;
    if (!realId) throw new Error('No live model ID was returned by the provider.');
    const k = key(`spec:${realId}`), cached = getCache(k); if (cached) return cached;
    const data = await getJSON(`${API}/specs/${encodeURIComponent(realId)}`);
    const result = data?.data || data?.result || data?.phone || data;
    if (!result || typeof result !== 'object') throw new Error('The provider returned no specification object.');
    putCache(k,result); return result;
  }

  function flatten(v,p,out,d=0) {
    if (d > 14 || v === null || v === undefined || v === '') return;
    if (typeof v !== 'object') { out.push([p || 'Specification',String(v)]); return; }
    if (Array.isArray(v)) { v.forEach((x,i)=>flatten(x,`${p || 'Item'} ${i+1}`,out,d+1)); return; }
    Object.keys(v).forEach(k=>flatten(v[k],p ? `${p} · ${k}` : k,out,d+1));
  }

  function specHTML(data) {
    const out=[]; flatten(data,'',out);
    const list=out.filter(([k,v])=>!/(^| · )(image|thumbnail|url|image_url)$/i.test(k) && v.length < 1600);
    if (!list.length) return '<div class="origin-v5-empty">No structured specification fields were returned.</div>';
    return `<div class="origin-v5-specs">${list.map(([k,v])=>`<div><span>${esc(k.replace(/[_-]+/g,' '))}</span><strong>${esc(v)}</strong></div>`).join('')}</div>`;
  }

  function modelEmbed(name) {
    return Object.keys(threeD).find(k=>k.toLowerCase()===String(name).toLowerCase()) ? threeD[Object.keys(threeD).find(k=>k.toLowerCase()===String(name).toLowerCase())] : '';
  }
  function threeDHTML(name) {
    const url=modelEmbed(name);
    if (url) return `<div class="origin-v5-3d"><div><b>INTERACTIVE 3D</b><span>drag · pinch · rotate</span></div><iframe title="3D model of ${esc(name)}" src="${url}" allow="autoplay; fullscreen; xr-spatial-tracking" loading="lazy"></iframe></div>`;
    return `<div class="origin-v5-3d-empty"><b>3D</b><div><strong>3D viewer not verified for this model yet.</strong><a href="https://sketchfab.com/search?type=models&q=${encodeURIComponent(name)}" target="_blank" rel="noopener">Search ${esc(name)} in Sketchfab ↗</a></div></div>`;
  }

  function makeModal() {
    let m=document.getElementById('originV5Modal'); if(m) return m;
    m=document.createElement('div'); m.id='originV5Modal'; m.className='origin-v5-modal';
    m.innerHTML='<div class="origin-v5-backdrop"></div><section class="origin-v5-sheet" role="dialog" aria-modal="true"><button class="origin-v5-close" aria-label="Close">×</button><div class="origin-v5-kicker">ORIGIN · LIVE PRODUCT DATA</div><h2 data-title></h2><p data-subtitle></p><div data-content></div></section>';
    document.body.appendChild(m);
    m.querySelector('.origin-v5-close').onclick=close;
    m.querySelector('.origin-v5-backdrop').onclick=close;
    return m;
  }
  function open(){const m=makeModal(); m.hidden=false; document.body.classList.add('origin-v5-open'); requestAnimationFrame(()=>m.classList.add('open'));}
  function close(){const m=document.getElementById('originV5Modal'); if(!m)return; m.classList.remove('open'); document.body.classList.remove('origin-v5-open'); setTimeout(()=>m.hidden=true,180);}

  async function showModel(company,product,model){
    const m=makeModal(), c=m.querySelector('[data-content]'), title=m.querySelector('[data-title]'), sub=m.querySelector('[data-subtitle]');
    title.textContent=model?.name || product; sub.textContent=`${company} · complete live record`;
    c.innerHTML='<div class="origin-v5-loading"><i></i><strong>Fetching every available field…</strong><span>Live source · no guessed values</span></div>'; open();
    try { const data=await specs(model); c.innerHTML=threeDHTML(model.name)+`<div class="origin-v5-bar"><strong>FULL SPECIFICATIONS</strong><span>Live lookup · ${new Date().toLocaleString()}</span></div>`+specHTML(data)+`<p class="origin-v5-note">All fields shown here come from the live provider response. Different variants and markets can have different specifications.</p>`; }
    catch(e) { c.innerHTML=`<div class="origin-v5-error"><strong>Specs could not be fetched.</strong><p>${esc(e.message)}</p><button data-retry>Retry</button></div>`; c.querySelector('[data-retry]').onclick=()=>showModel(company,product,model); }
  }

  async function showProduct(company,product){
    const m=makeModal(), c=m.querySelector('[data-content]'), title=m.querySelector('[data-title]'), sub=m.querySelector('[data-subtitle]');
    title.textContent=product; sub.textContent=`${company} · live model database`;
    c.innerHTML='<div class="origin-v5-loading"><i></i><strong>Finding live models…</strong><span>Searching current structured product data</span></div>'; open();
    let models=[];
    try { models=await search(`${company} ${product}`); } catch(e) { c.innerHTML=`<div class="origin-v5-error"><strong>Live model lookup failed.</strong><p>${esc(e.message)}</p><button data-retry>Retry</button></div>`; c.querySelector('[data-retry]').onclick=()=>showProduct(company,product); return; }
    if (!models.length) {
      const f=Object.entries(fallback).find(([k])=>product.toLowerCase().includes(k.toLowerCase()))?.[1] || [];
      models=f.map(name=>({name,id:'',raw:{}}));
    }
    c.innerHTML=`<div class="origin-v5-status"><strong>${models.length} models</strong><span>Live search · open any model for all fields</span><button data-refresh>↻ Refresh</button></div><div class="origin-v5-models">${models.map((x,i)=>`<button type="button" data-model="${i}"><span>${String(i+1).padStart(2,'0')}</span><div><strong>${esc(x.name)}</strong><small>${esc(x.summary || 'Open for complete live specification sheet')}</small></div><b>›</b></button>`).join('')}</div>`;
    c.querySelectorAll('[data-model]').forEach(b=>b.onclick=()=>showModel(company,product,models[Number(b.dataset.model)]));
    c.querySelector('[data-refresh]').onclick=()=>{ try{localStorage.removeItem(key(`search:${company} ${product}`));}catch(_){} showProduct(company,product); };
  }

  function install(){
    const page=document.querySelector('#companyPage:not([hidden])'); if(!page)return;
    const company=page.querySelector('.company-hero-copy h1')?.textContent?.trim() || 'Company';
    page.querySelectorAll('.product-universe-card').forEach(card=>{
      if(card.dataset.originV5Bound==='1')return; card.dataset.originV5Bound='1';
      card.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();const product=card.querySelector('strong')?.textContent?.trim() || card.textContent.trim();showProduct(company,product);},true);
    });
  }

  const style=document.createElement('style'); style.textContent=`
    .origin-v5-open{overflow:hidden}.origin-v5-modal{position:fixed;inset:0;z-index:1200;background:rgba(17,17,17,.48);backdrop-filter:blur(16px);opacity:0;transition:opacity .18s ease}.origin-v5-modal.open{opacity:1}.origin-v5-modal[hidden]{display:none}.origin-v5-sheet{position:absolute;inset:0;background:#f7f7f5;overflow:auto;transform:translateY(18px);transition:transform .22s cubic-bezier(.2,.8,.2,1);padding:32px max(18px,calc((100% - 960px)/2)) 50px}.origin-v5-modal.open .origin-v5-sheet{transform:none}.origin-v5-close{position:fixed;right:22px;top:18px;width:42px;height:42px;border:1px solid #deded9;border-radius:50%;background:#fff;font-size:25px;cursor:pointer;z-index:2}.origin-v5-kicker{font-size:10px;letter-spacing:.14em;font-weight:850;color:#6d5dfc;margin:12px 0}.origin-v5-sheet h2{margin:0;font-size:clamp(38px,7vw,72px);letter-spacing:-.055em;line-height:1}.origin-v5-sheet>p{color:#777772;margin:10px 0 28px}.origin-v5-status,.origin-v5-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;border-bottom:1px solid #deded9;padding:14px 0;margin-bottom:12px}.origin-v5-status strong,.origin-v5-bar strong{font-size:14px}.origin-v5-status span,.origin-v5-bar span{font-size:11px;color:#8b8b86}.origin-v5-status button,.origin-v5-error button{border:1px solid #deded9;background:#fff;border-radius:999px;padding:8px 12px;font-weight:750;cursor:pointer}.origin-v5-models{display:grid;gap:8px}.origin-v5-models button{border:1px solid #deded9;background:#fff;border-radius:16px;padding:15px;display:grid;grid-template-columns:34px 1fr 20px;gap:12px;text-align:left;align-items:center;cursor:pointer}.origin-v5-models button:hover{border-color:#bdb8ff;transform:translateY(-1px)}.origin-v5-models button>span{color:#6d5dfc;font-size:11px;font-weight:850}.origin-v5-models strong{display:block;font-size:15px}.origin-v5-models small{display:block;color:#7d7d77;font-size:12px;margin-top:4px}.origin-v5-loading,.origin-v5-error,.origin-v5-empty{border:1px dashed #deded9;border-radius:20px;background:#fff;padding:42px;text-align:center}.origin-v5-loading i{display:block;width:26px;height:26px;margin:0 auto 15px;border:2px solid #ddd;border-top-color:#6d5dfc;border-radius:50%;animation:ov5spin .7s linear infinite}@keyframes ov5spin{to{transform:rotate(360deg)}}.origin-v5-loading span,.origin-v5-error p{display:block;color:#777772;font-size:13px;margin-top:6px}.origin-v5-3d{border:1px solid #deded9;border-radius:22px;overflow:hidden;background:#fff;margin-bottom:22px}.origin-v5-3d>div{display:flex;justify-content:space-between;padding:12px 15px;border-bottom:1px solid #deded9;font-size:10px;letter-spacing:.12em}.origin-v5-3d>div span{letter-spacing:0;color:#888}.origin-v5-3d iframe{width:100%;height:460px;border:0;display:block}.origin-v5-3d-empty{display:flex;gap:15px;align-items:center;border:1px solid #deded9;border-radius:20px;padding:20px;background:#fff;margin-bottom:22px}.origin-v5-3d-empty>b{width:54px;height:54px;border-radius:14px;background:#111;color:#fff;display:grid;place-items:center}.origin-v5-3d-empty a{display:block;margin-top:6px;color:#6d5dfc;font-size:12px;font-weight:750;text-decoration:none}.origin-v5-specs{display:grid;grid-template-columns:1fr 1fr;border:1px solid #deded9;border-radius:18px;overflow:hidden}.origin-v5-specs>div{padding:13px 14px;border-bottom:1px solid #deded9;display:flex;justify-content:space-between;gap:16px;background:#fff}.origin-v5-specs>div:nth-child(4n+1),.origin-v5-specs>div:nth-child(4n+2){background:#fafaf8}.origin-v5-specs span{color:#777772;font-size:12px;text-transform:capitalize}.origin-v5-specs strong{font-size:12px;text-align:right;max-width:67%;overflow-wrap:anywhere}.origin-v5-note{font-size:11px;line-height:1.6;color:#8b8b86;margin:15px 0}.origin-v5-error strong{font-size:16px}.origin-v5-error p{margin-bottom:14px}@media(max-width:700px){.origin-v5-sheet{padding:24px 15px 34px}.origin-v5-close{right:14px}.origin-v5-specs{grid-template-columns:1fr}.origin-v5-specs>div{display:block}.origin-v5-specs strong{display:block;max-width:100%;text-align:left;margin-top:5px}.origin-v5-3d iframe{height:320px}.origin-v5-status{display:block}.origin-v5-status button{margin-top:8px}.origin-v5-models button{padding:13px}.origin-v5-sheet h2{font-size:42px}}
  `; document.head.appendChild(style);
  const obs=new MutationObserver(install); obs.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  install();
})();
