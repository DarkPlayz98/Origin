/* Origin UI polish: reliable company logos, rich AI typography, Origin branding, and ChatGPT-style typing. */
(function () {
  'use strict';

  const logoDomains = {
    Apple:'apple.com',Microsoft:'microsoft.com',Nike:'nike.com',Amazon:'amazon.com',Google:'google.com',Netflix:'netflix.com',Airbnb:'airbnb.com',Figma:'figma.com',Adobe:'adobe.com',Nvidia:'nvidia.com',Meta:'meta.com',Facebook:'facebook.com',Instagram:'instagram.com',WhatsApp:'whatsapp.com',YouTube:'youtube.com',Uber:'uber.com',Airbus:'airbus.com',Boeing:'boeing.com','Coca-Cola':'coca-cola.com',"McDonald's":'mcdonalds.com',Starbucks:'starbucks.com',Disney:'disney.com',Sony:'sony.com',Samsung:'samsung.com',Toyota:'toyota.com',Ford:'ford.com',IBM:'ibm.com',Intel:'intel.com',Oracle:'oracle.com',PayPal:'paypal.com',Salesforce:'salesforce.com',LinkedIn:'linkedin.com',Zoom:'zoom.us',Shopify:'shopify.com',Stripe:'stripe.com',Canva:'canva.com',Notion:'notion.so',Slack:'slack.com',Pinterest:'pinterest.com',Snapchat:'snapchat.com',TikTok:'tiktok.com',ByteDance:'bytedance.com',Alibaba:'alibabagroup.com',Huawei:'huawei.com',Xiaomi:'mi.com',Lenovo:'lenovo.com',HP:'hp.com',Dell:'dell.com',Qualcomm:'qualcomm.com',AMD:'amd.com',Cisco:'cisco.com',SAP:'sap.com',Siemens:'siemens.com',Bosch:'bosch.com',BMW:'bmw.com','Mercedes-Benz':'mercedes-benz.com',Volkswagen:'volkswagen.com',Porsche:'porsche.com',Hyundai:'hyundai.com',Kia:'kia.com',Honda:'honda.com',Nissan:'nissan-global.com',Mitsubishi:'mitsubishi.com',Volvo:'volvocars.com',Adidas:'adidas.com',Puma:'puma.com',Reebok:'reebok.com',Gucci:'gucci.com',Prada:'prada.com','Louis Vuitton':'louisvuitton.com','Hermès':'hermes.com',Chanel:'chanel.com',Burberry:'burberry.com',Zara:'zara.com','H&M':'hm.com',IKEA:'ikea.com',Lego:'lego.com',3M:'3m.com',AstraZeneca:'astrazeneca.com','American Express':'americanexpress.com',Audi:'audi.com',Barclays:'barclays.com',BASF:'basf.com',Bayer:'bayer.com','Bank of America':'bankofamerica.com','Berkshire Hathaway':'berkshirehathaway.com','General Electric':'ge.com','General Motors':'gm.com','Goldman Sachs':'goldmansachs.com',HP:'hp.com',HSBC:'hsbc.com',Infosys:'infosys.com',KFC:'kfc.com',Kellogg:'kellanova.com',LG:'lg.com','LG Electronics':'lg.com',Mastercard:'mastercard.com',McDonalds:'mcdonalds.com','Morgan Stanley':'morganstanley.com',Nestlé:'nestle.com',Nintendo:'nintendo.com',Nokia:'nokia.com',Panasonic:'panasonic.com',PepsiCo:'pepsico.com',Pfizer:'pfizer.com',Qualcomm:'qualcomm.com',Reddit:'reddit.com',Rolex:'rolex.com',SAP:'sap.com',SpaceX:'spacex.com',Spotify:'spotify.com',Tesla:'tesla.com',Toyota:'toyota.com',Uber:'uber.com',Visa:'visa.com',Walmart:'walmart.com',Xerox:'xerox.com',Yahoo:'yahoo.com',Yamaha:'yamaha.com',YouTube:'youtube.com',Zara:'zara.com'
  };

  const originMark = '<span class="origin-mini-logo" aria-hidden="true">O</span>';

  function logoSources(name) {
    const domain = logoDomains[name];
    if (!domain) return [];
    return [
      `https://logo.clearbit.com/${domain}?size=128`,
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`,
      `https://icons.duckduckgo.com/ip3/${domain}.ico`
    ];
  }

  function attachLogo(img, name) {
    const sources = logoSources(name);
    if (!sources.length) return false;
    let index = 0;
    const next = () => {
      if (index >= sources.length) { img.style.display = 'none'; return; }
      img.src = sources[index++];
    };
    img.onerror = next;
    next();
    return true;
  }

  function addCompanyLogo(card) {
    if (card.querySelector('.company-logo')) return;
    const title = card.querySelector('h3')?.textContent?.trim();
    if (!title) return;
    const img = document.createElement('img');
    img.className = 'company-logo';
    img.alt = `${title} logo`;
    img.loading = 'lazy';
    if (!attachLogo(img, title)) return;
    const top = card.querySelector('.company-top');
    if (top) top.insertAdjacentElement('afterbegin', img);
  }

  function addCompanyPageLogo(page) {
    const heading = page.querySelector('.company-hero-copy h1');
    if (!heading || page.querySelector('.company-hero-logo')) return;
    const name = heading.textContent.trim();
    const wrap = document.createElement('div');
    wrap.className = 'company-hero-logo';
    const img = document.createElement('img');
    img.alt = `${name} logo`;
    if (attachLogo(img, name)) {
      img.onerror = () => { wrap.innerHTML = originMark; };
      wrap.appendChild(img);
    } else wrap.innerHTML = originMark;
    heading.before(wrap);
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
      if (/^[-•]\s+/.test(s)) {
        if (!listOpen) { out.push('<ul>'); listOpen = true; }
        out.push(`<li>${inlineMarkdown(s.replace(/^[-•]\s+/,''))}</li>`);
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

  function typeText(element, html, speed = 10) {
    if (!element) return;
    element.classList.add('origin-typing');
    element.innerHTML = '';
    const holder = document.createElement('div');
    holder.innerHTML = html;
    const nodes = Array.from(holder.childNodes);
    let nodeIndex = 0;
    let charIndex = 0;
    let activeText = null;

    function step() {
      if (nodeIndex >= nodes.length) { element.classList.remove('origin-typing'); return; }
      const source = nodes[nodeIndex];
      if (source.nodeType === Node.TEXT_NODE) {
        if (!activeText) activeText = document.createTextNode('');
        if (!activeText.parentNode) element.appendChild(activeText);
        activeText.textContent += source.textContent.charAt(charIndex++);
        if (charIndex >= source.textContent.length) { nodeIndex++; charIndex = 0; activeText = null; }
      } else {
        const clone = source.cloneNode(false);
        element.appendChild(clone);
        const text = source.textContent || '';
        if (!text) { nodeIndex++; }
        else {
          let textNode = document.createTextNode('');
          clone.appendChild(textNode);
          textNode.textContent = text.slice(0, ++charIndex);
          if (charIndex >= text.length) { nodeIndex++; charIndex = 0; }
          else { setTimeout(step, speed); return; }
        }
      }
      setTimeout(step, speed);
    }
    step();
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
          typeText(text, html, 9);
        }
      }, 40);
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
    .company-top{align-items:center!important}
    .company-logo{width:44px;height:44px;object-fit:contain;border:1px solid #deded9;border-radius:12px;padding:7px;background:#fff;flex:0 0 auto;display:block}
    .company-card h3{display:flex;align-items:center;gap:10px}
    .company-hero-logo{width:80px;height:80px;border:1px solid #deded9;border-radius:22px;background:#fff;display:grid;place-items:center;margin:0 0 22px;box-shadow:0 12px 30px rgba(17,17,17,.06)}
    .company-hero-logo img{width:52px;height:52px;object-fit:contain}
    .origin-mini-logo{width:42px;height:42px;border-radius:12px;background:#111;color:#fff;display:grid;place-items:center;font-weight:800;font-size:21px;letter-spacing:-.08em}
    .ai-summary-page{border:1px solid #deded9!important;border-radius:24px!important;padding:30px!important;background:#fff!important;box-shadow:0 20px 55px rgba(17,17,17,.06)!important}
    #aiSummaryText{font-size:16px;line-height:1.75;color:#4f4f4a;min-height:28px}
    #aiSummaryText h3{font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#6d5dfc;margin:24px 0 8px}
    #aiSummaryText h3:first-child{margin-top:0}
    #aiSummaryText strong{color:#111;font-weight:750}
    #aiSummaryText p{margin:0 0 14px}
    #aiSummaryText ul{margin:8px 0 16px;padding-left:22px}
    #aiSummaryText li{margin:6px 0}
    #aiSummaryText code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9em;background:#f1f1ee;padding:2px 5px;border-radius:5px}
    #aiSummaryText.origin-typing:after{content:'';display:inline-block;width:2px;height:1.05em;margin-left:3px;vertical-align:-.16em;background:currentColor;animation:originCursor .8s steps(1) infinite}
    @keyframes originCursor{0%,49%{opacity:1}50%,100%{opacity:0}}
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(() => decorate());
  observer.observe(document.body, { childList:true, subtree:true, characterData:true });
  decorate();
})();
