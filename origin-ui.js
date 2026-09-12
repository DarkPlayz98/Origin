/* Origin UI V4: full-directory logos, rich AI formatting, Origin branding, and typing animation. */
(function () {
  'use strict';

  /* Exact domains for common brands. Everything else gets a safe derived domain + initials fallback. */
  const domainOverrides = {
    '3M':'3m.com','Adidas':'adidas.com','Adobe':'adobe.com','Airbnb':'airbnb.com','Airbus':'airbus.com','Alibaba':'alibabagroup.com','Amazon':'amazon.com','American Express':'americanexpress.com','AMD':'amd.com','Anheuser-Busch InBev':'ab-inbev.com','Apple':'apple.com','AstraZeneca':'astrazeneca.com','AT&T':'att.com','Audi':'audi.com','Bank of America':'bankofamerica.com','Barclays':'barclays.com','BASF':'basf.com','Bayer':'bayer.com','Berkshire Hathaway':'berkshirehathaway.com','BMW':'bmw.com','Boeing':'boeing.com','BP':'bp.com','Bosch':'bosch.com','Burberry':'burberry.com','ByteDance':'bytedance.com','Canon':'canon.com','Caterpillar':'caterpillar.com','Chanel':'chanel.com','Chevron':'chevron.com','China Mobile':'chinamobileltd.com','Cisco':'cisco.com','Citigroup':'citigroup.com','Coca-Cola':'coca-cola.com','Colgate-Palmolive':'colgatepalmolive.com','Comcast':'comcast.com','Costco':'costco.com','Dell':'dell.com','Deloitte':'deloitte.com','Delta Air Lines':'delta.com','Deutsche Bank':'db.com','Disney':'disney.com',"Domino's Pizza":'dominos.com','Dropbox':'dropbox.com','eBay':'ebay.com','Eli Lilly':'lilly.com','Emirates':'emirates.com','ExxonMobil':'exxonmobil.com','FedEx':'fedex.com','Ferrari':'ferrari.com','Ford':'ford.com','Fox Corporation':'foxcorporation.com','General Dynamics':'gd.com','General Electric':'ge.com','General Motors':'gm.com','GlaxoSmithKline':'gsk.com','Goldman Sachs':'goldmansachs.com','Google':'google.com','Gucci':'gucci.com','H&M':'hm.com','Heineken':'heineken.com','Hermès':'hermes.com','Honda':'honda.com','Honeywell':'honeywell.com','HP':'hp.com','HSBC':'hsbc.com','Huawei':'huawei.com','Hyundai':'hyundai.com','IBM':'ibm.com','IKEA':'ikea.com','Infosys':'infosys.com','Intel':'intel.com','JD.com':'jd.com','John Deere':'deere.com','Johnson & Johnson':'jnj.com','JPMorgan Chase':'jpmorganchase.com','KFC':'kfc.com','Kellogg’s':'kellanova.com',"Kellogg's":'kellanova.com','Kia':'kia.com','KPMG':'kpmg.com','Kraft Heinz':'kraftheinzcompany.com','Lego':'lego.com','Lenovo':'lenovo.com','LG Electronics':'lg.com','LinkedIn':'linkedin.com',"L'Oréal":'loreal.com','Louis Vuitton':'louisvuitton.com','Lufthansa':'lufthansa.com','Marriott International':'marriott.com','Mastercard':'mastercard.com',"McDonald's":'mcdonalds.com','Mercedes-Benz':'mercedes-benz.com','Merck':'merck.com','Meta':'meta.com','Microsoft':'microsoft.com','Mitsubishi':'mitsubishi.com','Morgan Stanley':'morganstanley.com','Nestlé':'nestle.com','Netflix':'netflix.com','Nike':'nike.com','Nikon':'nikon.com','Nintendo':'nintendo.com','Nissan':'nissan-global.com','Nokia':'nokia.com','Northrop Grumman':'northropgrumman.com','Novartis':'novartis.com','Nvidia':'nvidia.com','Oracle':'oracle.com','Panasonic':'panasonic.com','Paramount Global':'paramount.com','PayPal':'paypal.com','PepsiCo':'pepsico.com','Pfizer':'pfizer.com','Philips':'philips.com','Pinterest':'pinterest.com','Porsche':'porsche.com','Prada':'prada.com','Procter & Gamble':'pg.com','PwC':'pwc.com','Qatar Airways':'qatarairways.com','Qualcomm':'qualcomm.com','Raytheon (RTX)':'rtx.com','Reddit':'reddit.com','Reebok':'reebok.com','Renault':'renault.com','Rolex':'rolex.com','Rolls-Royce':'rolls-royce.com','Salesforce':'salesforce.com','Samsung':'samsung.com','SAP':'sap.com','Saudi Aramco':'aramco.com','Shell':'shell.com','Siemens':'siemens.com','Singapore Airlines':'singaporeair.com','Snap Inc.':'snap.com','Sony':'sony.com','SpaceX':'spacex.com','Spotify':'spotify.com','Starbucks':'starbucks.com','Stellantis':'stellantis.com','Subway':'subway.com','Target':'target.com','Tesco':'tesco.com','Tesla':'tesla.com','TikTok':'tiktok.com','T-Mobile':'t-mobile.com','Toshiba':'global.toshiba','Toyota':'toyota.com','Uber':'uber.com','United Airlines':'united.com','UnitedHealth Group':'unitedhealthgroup.com','Unilever':'unilever.com','UPS':'ups.com','Verizon':'verizon.com','Visa':'visa.com','Vodafone':'vodafone.com','Volkswagen':'volkswagen.com','Volvo':'volvocars.com','Walmart':'walmart.com','Warner Bros. Discovery':'wbd.com','Wells Fargo':'wellsfargo.com','Xerox':'xerox.com','Xiaomi':'mi.com','Yahoo':'yahoo.com','Yamaha':'yamaha.com','YouTube':'youtube.com','Yum! Brands':'yum.com','Zara':'zara.com','Zoom':'zoom.us'
  };

  const slugOverrides = {
    '3M':'3m','AT&T':'att','Coca-Cola':'coca-cola','H&M':'h-and-m','Hermès':'hermes','Lego':'lego','L'Oréal':'loreal',"McDonald's":'mcdonalds','Raytheon (RTX)':'rtx','T-Mobile':'t-mobile','Visa':'visa','Walmart':'walmart','Xiaomi':'xiaomi','Yum! Brands':'yum-brands'
  };

  const originMark = '<span class="origin-mini-logo" aria-hidden="true">O</span>';

  function slugify(name) {
    if (slugOverrides[name]) return slugOverrides[name];
    return String(name || '')
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g,'and')
      .replace(/[^a-zA-Z0-9]+/g,'-')
      .replace(/^-+|-+$/g,'')
      .toLowerCase();
  }

  function domainFor(name) {
    if (domainOverrides[name]) return domainOverrides[name];
    const clean = String(name || '').toLowerCase()
      .replace(/\b(company|corporation|inc\.?|international|group|holdings|global)\b/g,'')
      .replace(/&/g,'and').replace(/[^a-z0-9]/g,'');
    return clean ? `${clean}.com` : '';
  }

  function initials(name) {
    const words = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!words.length) return 'O';
    if (words.length === 1) return words[0].slice(0,2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  function logoSources(name) {
    const domain = domainFor(name);
    const slug = slugify(name);
    const sources = [];
    if (slug) sources.push(`https://cdn.simpleicons.org/${encodeURIComponent(slug)}`);
    if (domain) sources.push(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`);
    if (domain) sources.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
    return sources;
  }

  function makeFallback(name) {
    const span = document.createElement('span');
    span.className = 'origin-logo-fallback';
    span.setAttribute('aria-hidden','true');
    span.textContent = initials(name);
    return span;
  }

  function attachLogo(target, name) {
    const img = target.querySelector('img.company-logo, img.company-hero-logo-image');
    if (!img) return;
    const sources = logoSources(name);
    let index = 0;
    const fallback = makeFallback(name);
    const fail = () => {
      if (index < sources.length) {
        img.src = sources[index++];
        return;
      }
      img.remove();
      target.appendChild(fallback);
    };
    img.onerror = fail;
    if (sources.length) img.src = sources[index++];
    else fail();
  }

  function addCompanyLogo(card) {
    if (card.querySelector('.company-logo,.origin-logo-fallback')) return;
    const title = card.querySelector('h3')?.textContent?.trim();
    if (!title) return;
    const img = document.createElement('img');
    img.className = 'company-logo';
    img.alt = `${title} logo`;
    img.loading = 'lazy';
    const top = card.querySelector('.company-top');
    if (!top) return;
    top.insertAdjacentElement('afterbegin', img);
    attachLogo(top, title);
  }

  function addCompanyPageLogo(page) {
    const heading = page.querySelector('.company-hero-copy h1');
    if (!heading || page.querySelector('.company-hero-logo')) return;
    const name = heading.textContent.trim();
    const wrap = document.createElement('div');
    wrap.className = 'company-hero-logo';
    const img = document.createElement('img');
    img.className = 'company-hero-logo-image';
    img.alt = `${name} logo`;
    wrap.appendChild(img);
    heading.before(wrap);
    attachLogo(wrap, name);
  }

  function escapeHTML(text) {
    return String(text ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function inlineMarkdown(text) {
    return escapeHTML(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function formatAI(root) {
    if (!root || root.dataset.originFormatted === '1') return;
    const raw = root.textContent.trim();
    if (!raw || /distilling the founding story/i.test(raw)) return;
    const lines = raw.replace(/\r\n/g,'\n').split('\n');
    const out = [];
    let listOpen = false;
    const closeList = () => { if (listOpen) { out.push('</ul>'); listOpen = false; } };
    lines.forEach(line => {
      const s = line.trim();
      if (!s) { closeList(); return; }
      if (/^#{1,6}\s+/.test(s)) { closeList(); out.push(`<h3>${inlineMarkdown(s.replace(/^#{1,6}\s+/,''))}</h3>`); return; }
      if (/^[-•*]\s+/.test(s)) {
        if (!listOpen) { out.push('<ul>'); listOpen = true; }
        out.push(`<li>${inlineMarkdown(s.replace(/^[-•*]\s+/,''))}</li>`);
        return;
      }
      closeList();
      out.push(`<p>${inlineMarkdown(s)}</p>`);
    });
    closeList();
    root.innerHTML = out.join('');
    root.dataset.originFormatted = '1';
  }

  function scrubBranding(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (/Crystal/i.test(node.nodeValue)) node.nodeValue = node.nodeValue.replace(/Crystal\s*AI/gi,'Origin AI').replace(/Crystal/gi,'Origin AI');
    });
  }

  function typeNode(source, parent, speed, done) {
    if (!source) return done();
    if (source.nodeType === Node.TEXT_NODE) {
      const out = document.createTextNode('');
      parent.appendChild(out);
      let i = 0;
      const tick = () => {
        out.textContent += source.textContent.charAt(i++);
        if (i >= source.textContent.length) done();
        else setTimeout(tick, speed);
      };
      return tick();
    }
    const clone = source.cloneNode(false);
    parent.appendChild(clone);
    const children = Array.from(source.childNodes);
    let index = 0;
    const next = () => {
      if (index >= children.length) return done();
      typeNode(children[index++], clone, speed, next);
    };
    next();
  }

  function typeText(element, html, speed = 9) {
    element.classList.add('origin-typing');
    element.innerHTML = '';
    const holder = document.createElement('div');
    holder.innerHTML = html;
    const nodes = Array.from(holder.childNodes);
    let index = 0;
    const next = () => {
      if (index >= nodes.length) { element.classList.remove('origin-typing'); return; }
      typeNode(nodes[index++], element, speed, next);
    };
    next();
  }

  function enhanceTyping() {
    const button = document.querySelector('#aiSummaryBtn');
    const summary = document.querySelector('#aiSummary');
    const text = document.querySelector('#aiSummaryText');
    if (!button || !summary || !text || button.dataset.originTypingReady) return;
    button.dataset.originTypingReady = '1';
    button.addEventListener('click', () => {
      setTimeout(() => {
        if (text.dataset.originFormatted === '1') {
          const html = text.innerHTML;
          delete text.dataset.originFormatted;
          typeText(text, html, 8);
        }
      }, 50);
    });
  }

  function decorate() {
    document.querySelectorAll('.company-card').forEach(addCompanyLogo);
    const page = document.querySelector('#companyPage:not([hidden])');
    if (page) addCompanyPageLogo(page);
    const summary = document.querySelector('#aiSummaryText');
    if (summary) formatAI(summary);
    enhanceTyping();
    scrubBranding(document.body);
  }

  const style = document.createElement('style');
  style.textContent = `
    .company-top{align-items:center!important}.company-logo{width:44px;height:44px;object-fit:contain;border:1px solid #deded9;border-radius:12px;padding:7px;background:#fff;flex:0 0 auto;display:block}.origin-logo-fallback{width:44px;height:44px;display:grid;place-items:center;border:1px solid #deded9;border-radius:12px;background:#111;color:#fff;font-size:11px;font-weight:850;letter-spacing:.04em;flex:0 0 auto}.company-card h3{display:flex;align-items:center;gap:10px}.company-hero-logo{width:80px;height:80px;border:1px solid #deded9;border-radius:22px;background:#fff;display:grid;place-items:center;margin:0 0 22px;box-shadow:0 12px 30px rgba(17,17,17,.06)}.company-hero-logo-image{width:52px;height:52px;object-fit:contain}.company-hero-logo .origin-logo-fallback{width:52px;height:52px;border:0;border-radius:15px;font-size:14px}.origin-mini-logo{width:42px;height:42px;border-radius:12px;background:#111;color:#fff;display:grid;place-items:center;font-weight:800;font-size:21px;letter-spacing:-.08em}.ai-summary-page{border:1px solid #deded9!important;border-radius:24px!important;padding:30px!important;background:#fff!important;box-shadow:0 20px 55px rgba(17,17,17,.06)!important}#aiSummaryText{font-size:16px;line-height:1.75;color:#4f4f4a;min-height:28px}#aiSummaryText h3{font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#6d5dfc;margin:24px 0 8px}#aiSummaryText h3:first-child{margin-top:0}#aiSummaryText strong{color:#111;font-weight:750}#aiSummaryText p{margin:0 0 14px}#aiSummaryText ul{margin:8px 0 16px;padding-left:22px}#aiSummaryText li{margin:6px 0}#aiSummaryText code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9em;background:#f1f1ee;padding:2px 5px;border-radius:5px}#aiSummaryText.origin-typing:after{content:'';display:inline-block;width:2px;height:1.05em;margin-left:3px;vertical-align:-.16em;background:currentColor;animation:originCursor .8s steps(1) infinite}@keyframes originCursor{0%,49%{opacity:1}50%,100%{opacity:0}}
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(() => decorate());
  observer.observe(document.body, { childList:true, subtree:true, characterData:true });
  decorate();
})();
