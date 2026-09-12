/* Origin V2 product explorer: clickable products with models, variants and specs. */
(function () {
  'use strict';

  const catalog = {
    'iPhone': { type:'Hardware', models:[['iPhone 17 Pro Max','6.9-inch OLED · A19 Pro · Pro camera system · USB-C'],['iPhone 17 Pro','6.3-inch OLED · A19 Pro · Pro camera system · USB-C'],['iPhone 17','6.3-inch OLED · A19 · dual-camera system · USB-C']] },
    'Mac': { type:'Hardware family', models:[['MacBook Air','M-series chip · fanless notebook · 13/15-inch classes'],['MacBook Pro','M-series Pro/Max chip options · 14/16-inch classes'],['iMac','24-inch all-in-one · Apple silicon · 4.5K-class display']] },
    'iPad': { type:'Tablet', models:[['iPad Pro','Apple silicon · OLED display · USB-C/Thunderbolt class'],['iPad Air','Apple silicon · lightweight tablet · USB-C'],['iPad','11-inch class · Apple silicon generation dependent'],['iPad mini','Compact tablet · 8-inch class · Apple silicon generation dependent']] },
    'Apple Watch': { type:'Wearable', models:[['Apple Watch Series','Aluminum/stainless-class cases · OLED display · health and fitness sensors'],['Apple Watch Ultra','49mm titanium-class case · rugged design · extended battery class'],['Apple Watch SE','Entry Apple Watch family · fitness and safety features']] },
    'AirPods': { type:'Audio', models:[['AirPods Pro','In-ear · active noise cancellation · USB-C charging case'],['AirPods','Open-fit wireless earbuds · charging case'],['AirPods Max','Over-ear wireless headphones · active noise cancellation']] },
    'Apple Vision Pro': { type:'Spatial computer', models:[['Vision Pro','Micro-OLED displays · eye/hand tracking · Apple silicon · spatial audio']] },
    'HomePod': { type:'Smart speaker', models:[['HomePod','High-excursion woofer · beamforming microphones · spatial audio'],['HomePod mini','Compact smart speaker · computational audio · Siri']] },
    'Mac mini': { type:'Desktop', models:[['Mac mini','Compact desktop · Apple silicon · HDMI · USB-C/Thunderbolt class ports']] },
    'MacBook Air': { type:'Notebook', models:[['13-inch MacBook Air','13-inch class · Apple silicon · fanless design'],['15-inch MacBook Air','15-inch class · Apple silicon · fanless design']] },
    'MacBook Pro': { type:'Professional notebook', models:[['14-inch MacBook Pro','14-inch class · Pro/Max chip options · Liquid Retina XDR class'],['16-inch MacBook Pro','16-inch class · Pro/Max chip options · Liquid Retina XDR class']] },
    'iMac': { type:'All-in-one desktop', models:[['24-inch iMac','24-inch 4.5K-class display · Apple silicon · all-in-one chassis']] },
    'Windows': { type:'Operating system', models:[['Windows 11 Home','Consumer edition · x64/Arm64 hardware support · desktop OS'],['Windows 11 Pro','Business/pro edition · management and security features']] },
    'Surface': { type:'Hardware family', models:[['Surface Laptop','Windows laptop family · touchscreen options · Snapdragon/Intel class configurations'],['Surface Pro','2-in-1 tablet PC · detachable keyboard · touchscreen'],['Surface Laptop Studio','Convertible performance PC · touch display · discrete graphics options']] },
    'Xbox': { type:'Console', models:[['Xbox Series X','4K-class gaming · SSD storage · high-performance console'],['Xbox Series S','Digital-first console · SSD storage · 1440p-class target'],['Xbox Cloud Gaming','Cloud streaming service · supported devices vary']] },
    'Azure': { type:'Cloud platform', models:[['Virtual Machines','Configurable CPU, memory, storage and GPU tiers'],['Azure App Service','Managed web/app hosting · autoscaling options'],['Azure Functions','Serverless compute · event-driven execution']] },
    'Kindle': { type:'E-reader', models:[['Kindle Paperwhite','E-ink display · adjustable front light · waterproof class'],['Kindle Scribe','Large E-ink display · pen input · reading and writing'],['Kindle','Compact E-ink reader · front light class']] },
    'Fire TV': { type:'Streaming device', models:[['Fire TV Stick','HD/4K streaming depending on model · Wi-Fi · Alexa remote'],['Fire TV Stick 4K','4K streaming · HDR formats · Wi-Fi'],['Fire TV Cube','Hands-free Alexa · streaming hub · HDMI connectivity']] },
    'Echo / Alexa': { type:'Smart home', models:[['Echo','Smart speaker · Alexa · far-field microphones'],['Echo Dot','Compact smart speaker · Alexa'],['Echo Show','Smart display · Alexa · touchscreen']] },
    'Air Jordan': { type:'Footwear', models:[['Air Jordan 1','High/low basketball-inspired sneaker · Air cushioning family'],['Air Jordan 4','Basketball-inspired silhouette · visible Air cushioning class'],['Air Jordan 11','Basketball/lifestyle line · carbon-fiber-style support plate family']] },
    'Air Max': { type:'Footwear', models:[['Air Max 1','Visible Air cushioning · mesh/synthetic upper family'],['Air Max 90','Lifestyle runner · visible Air unit'],['Air Max 97','Full-length wave-inspired upper · Air cushioning family']] },
    'Air Force 1': { type:'Footwear', models:[['Air Force 1 Low','Low-top basketball-inspired sneaker · Air cushioning'],['Air Force 1 Mid','Mid-top construction · Air cushioning'],['Air Force 1 High','High-top construction · ankle strap · Air cushioning']] },
    'Dunk': { type:'Footwear', models:[['Dunk Low','Low-top basketball-inspired sneaker · rubber outsole'],['Dunk High','High-top construction · padded collar']] },
    'Pegasus': { type:'Running shoe', models:[['Pegasus','Neutral daily trainer family · responsive foam · engineered mesh variants']] },
    'Pixel': { type:'Hardware family', models:[['Pixel phone','Google Tensor-class chip · Android · multi-camera system; exact specs vary by generation'],['Pixel Watch','Wear OS · health sensors · circular OLED-class display'],['Pixel Tablet','Android tablet · Tensor-class platform generation dependent']] },
    'Android': { type:'Operating system', models:[['Android 16','Mobile OS · Material 3 Expressive era · device-specific features vary'],['Android Go','Optimized Android edition for entry-level devices']] },
    'Google Maps': { type:'Software', models:[['Maps mobile app','Android/iOS navigation · maps · routing · places'],['Maps web','Browser-based maps · routing · places · satellite imagery']] },
    'Chrome': { type:'Browser', models:[['Chrome desktop','Windows/macOS/Linux · extensions · multi-process browser architecture'],['Chrome mobile','Android/iOS · mobile tab and sync features']] },
    'Figma Design': { type:'Design software', models:[['Design editor','Browser/desktop collaborative UI design · multiplayer editing'],['Dev Mode','Developer-focused inspection · measurements · code-oriented handoff']] },
    'FigJam': { type:'Collaboration software', models:[['FigJam board','Online whiteboard · multiplayer collaboration · widgets'],['FigJam templates','Reusable workshop and planning boards']] },
    'Figma Slides': { type:'Presentation software', models:[['Slides','Collaborative presentations · design-system integration · browser based']] },
    'Netflix streaming': { type:'Streaming service', models:[['Standard with ads','Streaming plan · supported devices and resolution depend on plan/market'],['Standard','Streaming plan · HD-class viewing depending on market'],['Premium','Higher-resolution streaming tier where offered · plan limits vary by market']] },
    'Airbnb app': { type:'Travel software', models:[['Guest experience','Search · maps · booking · messaging · trip management'],['Host experience','Listing management · calendar · pricing · guest communication']] }
  };

  function escapeHTML(value) { return String(value ?? '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[c])); }

  function showProduct(company, product) {
    const data = catalog[product] || {
      type: 'Product / service',
      models: [['Product profile', 'Origin has not catalogued generation-level specifications for this product yet. The product name, company and role in the company story are preserved.']]
    };
    const modal = document.getElementById('originProductModal');
    modal.querySelector('[data-product-title]').textContent = product;
    modal.querySelector('[data-product-company]').textContent = `${company.name} · ${data.type}`;
    modal.querySelector('[data-product-models]').innerHTML = data.models.map((model, index) => `
      <article class="origin-model-card">
        <div class="origin-model-number">${String(index + 1).padStart(2,'0')}</div>
        <div><h3>${escapeHTML(model[0])}</h3><p>${escapeHTML(model[1])}</p></div>
      </article>`).join('');
    modal.hidden = false;
    document.body.classList.add('origin-modal-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
  }

  function closeProduct() {
    const modal = document.getElementById('originProductModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('origin-modal-open');
    setTimeout(() => { modal.hidden = true; }, 180);
  }

  function ensureModal() {
    if (document.getElementById('originProductModal')) return;
    const modal = document.createElement('div');
    modal.id = 'originProductModal';
    modal.className = 'origin-product-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="origin-product-backdrop" data-product-close></div>
      <section class="origin-product-sheet" role="dialog" aria-modal="true" aria-labelledby="originProductTitle">
        <button class="origin-product-close" type="button" aria-label="Close" data-product-close>×</button>
        <div class="origin-product-kicker">PRODUCT EXPLORER · V2</div>
        <div class="origin-product-heading"><div><h2 id="originProductTitle" data-product-title></h2><p data-product-company></p></div><span class="origin-v2-pill">V2</span></div>
        <div class="origin-model-list" data-product-models></div>
        <p class="origin-spec-note">Specs are concise reference points, not a complete technical specification sheet. Exact specifications can vary by generation, region and configuration.</p>
      </section>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', event => { if (event.target.closest('[data-product-close]')) closeProduct(); });
  }

  function decorateProducts() {
    const page = document.querySelector('#companyPage:not([hidden])');
    if (!page) return;
    page.querySelectorAll('.product-universe-card').forEach(card => {
      if (card.dataset.originProductReady) return;
      card.dataset.originProductReady = '1';
      card.setAttribute('role','button');
      card.setAttribute('tabindex','0');
      const product = card.querySelector('strong')?.textContent?.trim();
      card.setAttribute('aria-label', `Open ${product} models and specs`);
      const open = () => showProduct(window.__originActiveCompany || {name:'Company'}, product);
      card.addEventListener('click', open);
      card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
    });
  }

  function addVersionBadge() {
    const about = document.getElementById('about');
    if (!about || about.querySelector('.origin-version-badge')) return;
    const badge = document.createElement('span');
    badge.className = 'origin-version-badge';
    badge.textContent = 'V2';
    badge.title = 'Origin version 2';
    about.querySelector('.manifesto-mark')?.appendChild(badge);
  }

  function decorate() {
    ensureModal();
    addVersionBadge();
    decorateProducts();
    const company = window.__originActiveCompany;
    if (company) document.querySelectorAll('.product-universe-card').forEach(card => card.title = `Open ${card.querySelector('strong')?.textContent || 'product'} models & specs`);
  }

  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeProduct(); });
  const observer = new MutationObserver(decorate);
  observer.observe(document.body, { childList:true, subtree:true });
  decorate();
})();
