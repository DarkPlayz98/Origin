/* Origin UI polish: rich AI typography, company logos, and Origin branding. */
(function () {
  'use strict';

  const logoDomains = {
    Apple: 'apple.com', Microsoft: 'microsoft.com', Nike: 'nike.com', Amazon: 'amazon.com', Google: 'google.com',
    Netflix: 'netflix.com', Airbnb: 'airbnb.com', Figma: 'figma.com',
    Adobe: 'adobe.com', Nvidia: 'nvidia.com', Meta: 'meta.com', Facebook: 'facebook.com', Instagram: 'instagram.com',
    WhatsApp: 'whatsapp.com', YouTube: 'youtube.com', Uber: 'uber.com', Airbus: 'airbus.com', Boeing: 'boeing.com',
    'Coca-Cola': 'coca-cola.com', McDonald's: 'mcdonalds.com', Starbucks: 'starbucks.com', Disney: 'disney.com',
    Sony: 'sony.com', Samsung: 'samsung.com', Toyota: 'toyota.com', Ford: 'ford.com', IBM: 'ibm.com', Intel: 'intel.com',
    Oracle: 'oracle.com', PayPal: 'paypal.com', Salesforce: 'salesforce.com', LinkedIn: 'linkedin.com', Zoom: 'zoom.us',
    Shopify: 'shopify.com', Stripe: 'stripe.com', Canva: 'canva.com', Notion: 'notion.so', Slack: 'slack.com',
    Pinterest: 'pinterest.com', Snapchat: 'snapchat.com', TikTok: 'tiktok.com', ByteDance: 'bytedance.com', Alibaba: 'alibabagroup.com',
    Huawei: 'huawei.com', Xiaomi: 'mi.com', Lenovo: 'lenovo.com', HP: 'hp.com', Dell: 'dell.com', Qualcomm: 'qualcomm.com',
    AMD: 'amd.com', Cisco: 'cisco.com', SAP: 'sap.com', Siemens: 'siemens.com', Bosch: 'bosch.com', BMW: 'bmw.com',
    'Mercedes-Benz': 'mercedes-benz.com', Volkswagen: 'volkswagen.com', Porsche: 'porsche.com', Hyundai: 'hyundai.com',
    Kia: 'kia.com', Honda: 'honda.com', Nissan: 'nissan-global.com', Mitsubishi: 'mitsubishi.com', Volvo: 'volvocars.com',
    Adidas: 'adidas.com', Puma: 'puma.com', Reebok: 'reebok.com', Gucci: 'gucci.com', Prada: 'prada.com', 'Louis Vuitton': 'louisvuitton.com',
    Hermès: 'hermes.com', Chanel: 'chanel.com', Burberry: 'burberry.com', Zara: 'zara.com', 'H&M': 'hm.com', IKEA: 'ikea.com', Lego: 'lego.com'
  };

  const originMark = '<span class="origin-mini-logo" aria-hidden="true"><span>O</span></span>';

  function favicon(name) {
    const domain = logoDomains[name];
    if (!domain) return '';
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
  }

  function addCompanyLogo(card) {
    if (card.querySelector('.company-logo')) return;
    const title = card.querySelector('h3')?.textContent?.trim();
    const src = favicon(title);
    if (!title || !src) return;
    const img = document.createElement('img');
    img.className = 'company-logo';
    img.alt = '';
    img.loading = 'lazy';
    img.src = src;
    img.onerror = () => img.remove();
    const top = card.querySelector('.company-top');
    if (top) top.insertAdjacentElement('afterbegin', img);
  }

  function addCompanyPageLogo(page) {
    const heading = page.querySelector('.company-hero-copy h1');
    if (!heading || page.querySelector('.company-hero-logo')) return;
    const name = heading.textContent.trim();
    const src = favicon(name);
    const wrap = document.createElement('div');
    wrap.className = 'company-hero-logo';
    if (src) {
      wrap.innerHTML = `<img src="${src}" alt="" />`;
      wrap.querySelector('img').onerror = () => { wrap.innerHTML = originMark; };
    } else wrap.innerHTML = originMark;
    heading.before(wrap);
  }

  function formatAI(root) {
    if (!root || root.dataset.originFormatted === '1') return;
    const raw = root.textContent.trim();
    if (!raw || /distilling the founding story/i.test(raw)) return;
    let html = raw
      .replace(/\r\n/g, '\n')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^\s*#{1,6}\s*(.+)$/gm, '<h3>$1</h3>')
      .replace(/^\s*\*\*(.+?)\*\*\s*:?(.*)$/gm, '<strong>$1</strong>$2')
      .replace(/^\s*[-•]\s+(.+)$/gm, '<li>$1</li>')
      .replace(/\n\n+/g, '</p><p>')
      .replace(/\n/g, '<br>');
    html = html.replace(/(<li>.*?<\/li>)(?:<br>)?/g, '$1');
    if (!/^\s*<h3|^\s*<p/i.test(html)) html = `<p>${html}</p>`;
    root.innerHTML = html;
    root.dataset.originFormatted = '1';
  }

  function scrubBranding(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (/Crystal/i.test(node.nodeValue)) node.nodeValue = node.nodeValue.replace(/Crystal\s*AI/gi, 'Origin AI').replace(/Crystal/gi, 'Origin AI');
    });
  }

  function decorate() {
    document.querySelectorAll('.company-card').forEach(addCompanyLogo);
    const page = document.querySelector('#companyPage:not([hidden])');
    if (page) addCompanyPageLogo(page);
    const summary = document.querySelector('#aiSummaryText');
    if (summary) formatAI(summary);
    scrubBranding(document.body);
  }

  const style = document.createElement('style');
  style.textContent = `
    .company-top{align-items:center!important}
    .company-logo{width:42px;height:42px;object-fit:contain;border:1px solid #deded9;border-radius:12px;padding:8px;background:#fff;flex:0 0 auto}
    .company-card h3{display:flex;align-items:center;gap:10px}
    .company-hero-logo{width:76px;height:76px;border:1px solid #deded9;border-radius:22px;background:#fff;display:grid;place-items:center;margin:0 0 22px;box-shadow:0 12px 30px rgba(17,17,17,.06)}
    .company-hero-logo img{width:48px;height:48px;object-fit:contain}
    .origin-mini-logo{width:42px;height:42px;border-radius:12px;background:#111;color:#fff;display:grid;place-items:center;font-weight:800;font-size:21px;letter-spacing:-.08em}
    .origin-ai-brand{display:inline-flex;align-items:center;gap:8px;font-weight:750}
    .ai-summary-page{border:1px solid #deded9!important;border-radius:24px!important;padding:30px!important;background:#fff!important;box-shadow:0 20px 55px rgba(17,17,17,.06)!important}
    #aiSummaryText{font-size:16px;line-height:1.75;color:#4f4f4a}
    #aiSummaryText h3{font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#6d5dfc;margin:24px 0 8px}
    #aiSummaryText h3:first-child{margin-top:0}
    #aiSummaryText strong{color:#111;font-weight:750}
    #aiSummaryText p{margin:0 0 14px}
    #aiSummaryText li{margin:5px 0 5px 20px}
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(decorate);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  decorate();
})();
