const companies = [
  {
    id: 'apple', name: 'Apple', year: 1976, decade: 1970, industry: 'Technology',
    founders: 'Steve Jobs, Steve Wozniak, Ronald Wayne',
    summary: 'A homebrew computer, a garage-era partnership, and a company built around making computing personal.',
    idea: 'Build and sell an assembled personal computer simple enough for people to use at home, beginning with the Apple I.',
    firstProduct: 'Apple I', firstProductNote: 'The original single-board computer sold as a kit in 1976.',
    successProduct: 'iPhone', successNote: 'Apple’s defining modern product family and one of the company’s biggest commercial successes; Apple says more than one billion iPhones had been sold by 2017.',
    products: ['Mac', 'iPhone', 'iPad', 'Apple Watch', 'AirPods', 'Apple TV 4K', 'Apple Vision Pro', 'HomePod', 'Mac Studio', 'Mac mini', 'MacBook Air', 'MacBook Pro', 'iMac', 'App Store', 'Apple Music', 'Apple TV', 'Apple Arcade', 'iCloud', 'Apple Pay'],
    timeline: [
      ['1975', 'Homebrew Computer Club', 'Steve Wozniak begins showing his self-built computer in Silicon Valley.'],
      ['1976', 'Apple is formed', 'Jobs, Wozniak and Wayne establish the company and begin selling the Apple I.'],
      ['1977', 'Apple II', 'A more complete consumer computer turns the early project into a major business.'],
      ['1984', 'Macintosh', 'Apple introduces the Macintosh and its mouse-driven graphical interface.'],
      ['2001', 'iPod', 'The iPod expands Apple from computers into a much wider consumer-electronics market.'],
      ['2007', 'iPhone', 'The iPhone combines phone, iPod and internet communication into one device.']
    ],
    source: 'https://www.apple.com/50-years-of-thinking-different/'
  },
  {
    id: 'microsoft', name: 'Microsoft', year: 1975, decade: 1970, industry: 'Software',
    founders: 'Bill Gates, Paul Allen',
    summary: 'A magazine cover, a BASIC interpreter, and a tiny software company built around the coming personal-computer wave.',
    idea: 'Create software for the new microcomputer revolution, beginning with a BASIC interpreter for the Altair 8800.',
    firstProduct: 'Altair BASIC', firstProductNote: 'Microsoft’s first program, developed for the MITS Altair 8800.',
    successProduct: 'Windows', successNote: 'The Windows platform became the company’s defining desktop software franchise.',
    products: ['Windows', 'Microsoft 365', 'Microsoft Teams', 'Azure', 'Copilot', 'Xbox', 'Surface', 'Edge', 'OneDrive', 'Power Platform', 'Dynamics 365', 'Visual Studio', 'GitHub', 'Minecraft'],
    timeline: [
      ['1975', 'Altair BASIC', 'Gates and Allen develop a BASIC interpreter and sell it to MITS.'],
      ['1975', 'Microsoft begins', 'The partnership adopts the Microsoft name and builds a software business.'],
      ['1981', 'IBM PC', 'Microsoft supplies an operating system for IBM’s new personal computer.'],
      ['1985', 'Windows 1.0', 'Microsoft launches its graphical Windows environment.'],
      ['1990', 'Office', 'Microsoft launches the integrated Office suite, creating a second huge software franchise.']
    ],
    source: 'https://learn.microsoft.com/en-us/shows/history/history-of-microsoft-1975'
  },
  {
    id: 'nike', name: 'Nike', year: 1964, decade: 1960, industry: 'Consumer',
    founders: 'Phil Knight, Bill Bowerman',
    summary: 'Running shoes, a station-wagon-era sales operation, and a small athletic-shoe company that became a global brand.',
    idea: 'Bring better athlete-focused footwear to the U.S. market, first by importing Japanese running shoes through Blue Ribbon Sports.',
    firstProduct: 'Imported Tiger running shoes', firstProductNote: 'Blue Ribbon Sports began by distributing Japanese running shoes before making its own.',
    successProduct: 'Air Jordan', successNote: 'The Air Jordan line became one of Nike’s most influential and commercially important footwear franchises.',
    products: ['Running', 'Basketball', 'Football', 'Training', 'Lifestyle', 'Air Max', 'Air Force 1', 'Air Jordan', 'Dunk', 'Pegasus', 'Mercurial', 'Bridge footwear & apparel', 'Nike Training Club', 'Nike Run Club'],
    timeline: [
      ['1964', 'Blue Ribbon Sports', 'Knight and Bowerman start importing Japanese running shoes.'],
      ['1967', 'First store', 'Blue Ribbon Sports opens its first retail location in Portland.'],
      ['1971', 'Nike is born', 'The Nike name and Swoosh arrive as the company begins selling its own footwear.'],
      ['1972', 'Moon Shoe', 'Bowerman’s waffle-sole running design becomes an early technical breakthrough.'],
      ['1984', 'Jordan', 'Nike signs Michael Jordan, creating one of the world’s most recognizable sports franchises.']
    ],
    source: 'https://about.nike.com/en/magazine/the-handshake-that-started-it-all'
  },
  {
    id: 'amazon', name: 'Amazon', year: 1994, decade: 1990, industry: 'Commerce',
    founders: 'Jeff Bezos',
    summary: 'An internet bookstore that used books as the wedge for a much bigger idea: a store with almost everything.',
    idea: 'Use the internet to build a scalable store, beginning with books because millions of titles could not fit in one physical shop.',
    firstProduct: 'Online books', firstProductNote: 'Amazon launched as an online bookstore, shipping books directly to customers.',
    successProduct: 'Amazon marketplace', successNote: 'The retail marketplace became Amazon’s central consumer business and expanded far beyond books.',
    products: ['Amazon.com', 'Prime', 'AWS', 'Kindle', 'Fire TV', 'Echo / Alexa', 'Ring', 'eero', 'Amazon Music', 'Prime Video', 'Twitch', 'Audible', 'Zoox', 'Amazon Pharmacy', 'Project Kuiper'],
    timeline: [
      ['1994', 'The business starts', 'Bezos leaves his job and starts Amazon around the idea of internet commerce.'],
      ['1995', 'Books go live', 'Amazon launches publicly as an online bookstore.'],
      ['1996', 'Early growth', 'The catalog, customer base and team expand rapidly.'],
      ['1997', 'Going public', 'Amazon enters the public markets while continuing to broaden beyond books.'],
      ['2005', 'Prime', 'Amazon introduces Prime, changing the expectations around shipping and membership.']
    ],
    source: 'https://www.aboutamazon.com/about-us'
  },
  {
    id: 'google', name: 'Google', year: 1998, decade: 1990, industry: 'Search',
    founders: 'Larry Page, Sergey Brin',
    summary: 'Two Stanford researchers, a new way to rank pages, and a search engine that grew out of a research project.',
    idea: 'Improve web search by using links and page authority to rank results — the foundation of PageRank.',
    firstProduct: 'Google Search', firstProductNote: 'The search engine evolved from the Stanford project called BackRub.',
    successProduct: 'Google Search', successNote: 'Search remains the company’s defining consumer product and a core part of its business.',
    products: ['Google Search', 'YouTube', 'Android', 'Google Maps', 'Gmail', 'Chrome', 'Google Drive', 'Google Photos', 'Google Play', 'Google Workspace', 'Google Cloud', 'Google Ads', 'Pixel', 'Nest', 'Gemini'],
    timeline: [
      ['1995', 'Stanford', 'Page and Brin meet at Stanford and begin working together.'],
      ['1996', 'BackRub', 'They build a search engine that uses links to determine page importance.'],
      ['1997', 'Google.com', 'The project is renamed Google and gets its own domain.'],
      ['1998', 'Google is incorporated', 'A $100,000 check from Andy Bechtolsheim helps establish the company.'],
      ['1998', 'The garage', 'The young company moves from Stanford into Susan Wojcicki’s garage in Menlo Park.']
    ],
    source: 'https://about.google/intl/ALL_en/our-story/'
  },
  {
    id: 'netflix', name: 'Netflix', year: 1997, decade: 1990, industry: 'Entertainment',
    founders: 'Reed Hastings, Marc Randolph',
    summary: 'A DVD in an envelope, a problem with late fees, and a subscription model that changed movie rental.',
    idea: 'Make movie rental more convenient through the internet, first using DVDs sent by mail and later shifting toward subscriptions.',
    firstProduct: 'DVD-by-mail rental', firstProductNote: 'Netflix started by mailing physical DVDs ordered online.',
    successProduct: 'Netflix streaming', successNote: 'Streaming transformed Netflix from a rental company into a global entertainment platform.',
    products: ['Netflix streaming', 'Netflix Games', 'Netflix Ads', 'Netflix mobile app', 'Netflix for TV', 'Netflix House', 'Merchandise & consumer products'],
    timeline: [
      ['1997', 'Netflix starts', 'Hastings and Randolph establish the company and test DVD-by-mail logistics.'],
      ['1998', 'DVD rental site', 'Netflix launches with an online catalog and a mail-based rental model.'],
      ['1999', 'Subscription model', 'A monthly subscription replaces the traditional per-rental structure.'],
      ['2007', 'Streaming', 'Netflix introduces streaming, beginning its transition into internet television.'],
      ['2013', 'Originals', 'Netflix’s original series strategy becomes a major part of the business.']
    ],
    source: 'https://about.netflix.com/en'
  },
  {
    id: 'airbnb', name: 'Airbnb', year: 2007, decade: 2000, industry: 'Travel',
    founders: 'Brian Chesky, Joe Gebbia, Nathan Blecharczyk',
    summary: 'Three hosts, a few guests, and an air-mattress idea that became a global marketplace for stays and travel.',
    idea: 'Help visitors find a simple place to stay when hotels were full, starting with an air-mattress-based short stay in San Francisco.',
    firstProduct: 'Airbed & Breakfast', firstProductNote: 'The first version connected visitors with spare sleeping space in the founders’ apartment.',
    successProduct: 'Airbnb stays marketplace', successNote: 'The stays marketplace became Airbnb’s core product, later expanding to rooms, homes, experiences and more.',
    products: ['Stays', 'Airbnb Rooms', 'Entire homes', 'Experiences', 'Services', 'Airbnb app', 'Host tools', 'Payments', 'AirCover'],
    timeline: [
      ['2007', 'First guests', 'Chesky and Gebbia host visitors in their apartment during a busy design conference.'],
      ['2008', 'Launch', 'Airbed & Breakfast officially launches around short-term stays.'],
      ['2009', 'Airbnb', 'The company shortens its name and expands beyond air mattresses to apartments and homes.'],
      ['2010', 'Instant Book', 'The app and Instant Book feature make booking much easier.'],
      ['2011', 'Global expansion', 'Airbnb opens its first international office and grows beyond San Francisco.']
    ],
    source: 'https://news.airbnb.com/en-in/about-us'
  },
  {
    id: 'figma', name: 'Figma', year: 2012, decade: 2010, industry: 'Design',
    founders: 'Dylan Field, Evan Wallace',
    summary: 'A contrarian bet that professional design tools could live in the browser — with collaboration as the default.',
    idea: 'Build a powerful design tool in the browser so people could work together in one shared file instead of passing files around.',
    firstProduct: 'Figma Design', firstProductNote: 'The browser-native collaborative design editor was Figma’s original product.',
    successProduct: 'Figma Design', successNote: 'Figma Design became the company’s core collaborative design product and platform anchor.',
    products: ['Figma Design', 'Dev Mode', 'FigJam', 'Figma Slides', 'Figma Draw', 'Figma Buzz', 'Figma Sites', 'Figma Make', 'Figma Weave', 'Figma Motion'],
    timeline: [
      ['2012', 'Company begins', 'Field and Wallace start working on a collaborative graphics editor for the web.'],
      ['2015', 'Figma launches', 'The first public product reaches designers as a browser-native design tool.'],
      ['2016', 'Multiplayer', 'Figma doubles down on real-time collaboration and shared files.'],
      ['2023', 'Dev Mode', 'Figma adds a dedicated workspace for developers and design-to-code workflows.'],
      ['2026', 'Platform expands', 'Figma’s product family spans design, development, collaboration, presentations, websites and AI-assisted creation.']
    ],
    source: 'https://www.figma.com/about/'
  }
];

const homeEls = {
  grid: document.getElementById('companyGrid'),
  count: document.getElementById('resultCount'),
  search: document.getElementById('searchInput'),
  decade: document.getElementById('decadeFilter'),
  industries: document.getElementById('industryFilters'),
  empty: document.getElementById('emptyState'),
  clear: document.getElementById('clearFilters'),
  azIndex: document.getElementById('azIndex'),
  featuredTitle: document.getElementById('featuredTitle'),
  featuredSummary: document.getElementById('featuredSummary'),
  featuredYear: document.getElementById('featuredYear'),
  featuredTag: document.getElementById('featuredTag'),
  featuredLink: document.getElementById('featuredLink'),
  surprise: document.getElementById('surpriseBtn')
};
const companyPage = document.getElementById('companyPage');
const homepage = document.getElementById('top');
const industries = ['All', ...new Set(companies.map(c => c.industry))];
const state = { search: '', industry: 'All', decade: 'all', letter: 'All' };
let activeCompany = null;
const escapeHTML = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
const normalize = value => String(value ?? '').toLowerCase().trim();

function initDirectoryNavigation() {
  const decades = [...new Set(companies.map(c => Math.floor(c.year / 10) * 10))].sort((a,b) => a-b);
  homeEls.decade.innerHTML = '<option value="all">All decades</option>' + decades.map(d => `<option value="${d}">${d}s</option>`).join('');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  homeEls.azIndex.innerHTML = `<button class="az-chip active" type="button" data-letter="All">All</button>` + letters.map(letter => {
    const exists = companies.some(c => c.name[0].toUpperCase() === letter);
    return `<button class="az-chip ${exists ? '' : 'empty'}" type="button" data-letter="${letter}" ${exists ? '' : 'disabled'}>${letter}</button>`;
  }).join('');
  homeEls.azIndex.addEventListener('click', event => {
    const button = event.target.closest('[data-letter]');
    if (!button || button.disabled) return;
    state.letter = button.dataset.letter;
    [...homeEls.azIndex.querySelectorAll('.az-chip')].forEach(el => el.classList.toggle('active', el === button));
    renderDirectory();
  });
}

function initFilters() {
  homeEls.industries.innerHTML = industries.map(industry => `<button type="button" class="filter-chip ${industry === 'All' ? 'active' : ''}" data-industry="${escapeHTML(industry)}">${escapeHTML(industry)}</button>`).join('');
  homeEls.industries.addEventListener('click', event => {
    const button = event.target.closest('[data-industry]');
    if (!button) return;
    state.industry = button.dataset.industry;
    [...homeEls.industries.querySelectorAll('.filter-chip')].forEach(el => el.classList.toggle('active', el === button));
    renderDirectory();
  });
}

function filteredCompanies() {
  const q = normalize(state.search);
  return companies.filter(c => {
    const haystack = normalize([c.name, c.industry, c.founders, c.summary, c.firstProduct, c.successProduct, ...c.products].join(' '));
    return (!q || haystack.includes(q)) &&
      (state.industry === 'All' || c.industry === state.industry) &&
      (state.decade === 'all' || String(c.decade) === state.decade) &&
      (state.letter === 'All' || c.name[0].toUpperCase() === state.letter);
  });
}

function renderDirectory() {
  const items = filteredCompanies();
  homeEls.count.textContent = `${items.length} ${items.length === 1 ? 'story' : 'stories'}`;
  document.getElementById('resultSort').textContent = `${state.letter === 'All' ? 'A–Z' : state.letter} · ${state.industry} · ${state.decade === 'all' ? 'All origins' : state.decade + 's'}`;
  homeEls.grid.innerHTML = items.map((c, index) => `
    <a class="company-card" href="#company/${encodeURIComponent(c.id)}" aria-label="Read ${escapeHTML(c.name)} origin story">
      <div><div class="company-top"><span class="company-year">${c.year}</span><span class="company-industry">${escapeHTML(c.industry)}</span></div>
      <h3>${escapeHTML(c.name)}</h3><p>${escapeHTML(c.summary)}</p></div>
      <div class="card-footer"><span class="founders">Built by ${escapeHTML(c.founders)}</span><span class="card-arrow">↗</span></div>
    </a>`).join('');
  homeEls.empty.hidden = items.length !== 0;
}

function setFeatured(company) {
  homeEls.featuredTitle.textContent = company.name;
  homeEls.featuredSummary.textContent = company.summary;
  homeEls.featuredYear.textContent = company.year;
  homeEls.featuredTag.textContent = `${company.industry} · ${company.year}`;
  homeEls.featuredLink.href = `#company/${company.id}`;
}

function productModelClass(company) {
  const i = normalize(company.industry);
  if (i.includes('software') || i.includes('search') || i.includes('ai') || i.includes('social')) return 'model-screen';
  if (i.includes('automotive')) return 'model-car';
  if (i.includes('consumer') || i.includes('retail')) return 'model-object';
  return 'model-device';
}

function storyNumber(company) { return String(companies.indexOf(company) + 1).padStart(2, '0'); }

function renderCompanyPage(company) {
  activeCompany = company;
  companyPage.innerHTML = `
    <div class="company-page-bg" aria-hidden="true"></div>
    <header class="company-page-nav">
      <a class="wordmark" href="#top">origin<span class="wordmark-dot">.</span></a>
      <div class="company-breadcrumb"><a href="#explore">Directory</a><span>/</span><span>${escapeHTML(company.name)}</span></div>
      <a class="company-back" href="#explore">Back to stories <span>↗</span></a>
    </header>

    <main class="company-page-content">
      <section class="company-hero-section">
        <div class="company-hero-index"><span>${storyNumber(company)}</span><i></i><span>${companies.length.toString().padStart(2,'0')}</span></div>
        <div class="company-hero-copy">
          <div class="section-eyebrow">${escapeHTML(company.industry)} · ${company.year}</div>
          <h1>${escapeHTML(company.name)}</h1>
          <p class="company-hero-deck">${escapeHTML(company.summary)}</p>
          <div class="company-hero-meta"><span>Founded <b>${company.year}</b></span><span>Founders <b>${escapeHTML(company.founders)}</b></span></div>
        </div>
      </section>

      <section class="origin-flow-block">
        <div class="page-section-kicker"><span>01</span><span>THE ORIGIN FLOW</span></div>
        <div class="origin-flow-visual">
          <div class="origin-flow-line"></div>
          <article class="origin-flow-card"><span>01 · The idea</span><h2>${escapeHTML(company.idea)}</h2><p>The starting belief.</p></article>
          <div class="origin-flow-connector"><span>↓</span></div>
          <article class="origin-flow-card product-flow-card"><div><span>02 · First product</span><h2>${escapeHTML(company.firstProduct)}</h2><p>${escapeHTML(company.firstProductNote)}</p></div><div class="mini-product ${productModelClass(company)}"><span></span></div></article>
          <div class="origin-flow-connector"><span>↓</span></div>
          <article class="origin-flow-card success-flow-card"><span>03 · Breakthrough</span><h2>${escapeHTML(company.successProduct)}</h2><p>${escapeHTML(company.successNote)}</p></article>
        </div>
      </section>

      <section class="product-study-page">
        <div class="page-section-kicker"><span>02</span><span>PRODUCT STUDY</span></div>
        <div class="product-study-grid">
          <div class="product-study-copy"><div class="section-eyebrow">FIRST PRODUCT</div><h2>${escapeHTML(company.firstProduct)}</h2><p>${escapeHTML(company.firstProductNote)}</p><div class="study-facts"><div><span>Origin</span><b>${company.year}</b></div><div><span>Industry</span><b>${escapeHTML(company.industry)}</b></div><div><span>Success</span><b>${escapeHTML(company.successProduct)}</b></div></div></div>
          <div class="large-product-stage"><div class="stage-grid"></div><div class="product-orbit"></div><div class="large-product-model ${productModelClass(company)}"><div class="model-face"></div><div class="model-side"></div><div class="model-top"></div><div class="model-detail"></div><div class="model-screen"></div></div><span class="model-caption">3D PRODUCT STUDY · ORIGIN</span></div>
        </div>
      </section>

      <section class="ai-page-section">
        <div><div class="page-section-kicker"><span>03</span><span>ORIGIN AI</span></div><h2>See the beginning<br><em>in context.</em></h2><p>Crystal summarizes the founding story into a compact editorial brief.</p><button class="ai-button page-ai-button" id="aiSummaryBtn" type="button">Summarize with Origin AI <span>✦</span></button></div>
        <div class="ai-summary-page" id="aiSummary" hidden><div class="ai-summary-status">ORIGIN AI · CRYSTAL</div><div id="aiSummaryText"></div></div>
      </section>

      <section class="products-page-section">
        <div class="page-section-kicker"><span>04</span><span>PRODUCT UNIVERSE</span><span>${company.products.length} notable lines</span></div>
        <div class="product-universe-grid">${company.products.map((product,i) => `<div class="product-universe-card"><span>${String(i+1).padStart(2,'0')}</span><strong>${escapeHTML(product)}</strong></div>`).join('')}</div>
        <p class="product-universe-note">Product universe = notable product families and offerings represented in Origin’s editorial dataset; it is not every SKU, version or discontinued model.</p>
      </section>

      <section class="timeline-page-section">
        <div class="page-section-kicker"><span>05</span><span>EARLY TIMELINE</span></div>
        <div class="timeline-page">${company.timeline.map(([year,title,copy],i) => `<article class="timeline-page-item"><div class="timeline-page-marker">${String(i+1).padStart(2,'0')}</div><div class="timeline-page-year">${escapeHTML(year)}</div><div><h3>${escapeHTML(title)}</h3><p>${escapeHTML(copy)}</p></div></article>`).join('')}</div>
      </section>

      <section class="source-page-section">
        <div><div class="section-eyebrow">PRIMARY SOURCE</div><h2>Go deeper.</h2></div>
        <a class="source-page-link" href="${escapeHTML(company.source)}" target="_blank" rel="noopener noreferrer">Open source <span>↗</span></a>
      </section>
    </main>
    <footer class="company-page-footer"><span>origin.</span><span>${escapeHTML(company.name)} · ${company.year}</span><a href="#top">Return home ↑</a></footer>`;

  companyPage.hidden = false;
  homepage.style.display = 'none';
  document.body.classList.add('company-view');
  window.scrollTo({ top: 0, behavior: 'instant' });

  const button = companyPage.querySelector('#aiSummaryBtn');
  const summary = companyPage.querySelector('#aiSummary');
  const summaryText = companyPage.querySelector('#aiSummaryText');
  button.addEventListener('click', async () => {
    button.disabled = true;
    button.innerHTML = 'Writing the brief… <span>✦</span>';
    summary.hidden = false;
    summaryText.textContent = 'Crystal is distilling the founding story…';
    try {
      const result = await window.originAISummarize(company);
      summaryText.textContent = result;
    } catch (error) {
      summaryText.textContent = `Origin AI could not summarize this story right now. ${error.message || ''}`.trim();
    } finally {
      button.disabled = false;
      button.innerHTML = 'Refresh Origin AI <span>✦</span>';
    }
  });
}

function leaveCompanyPage() {
  companyPage.hidden = true;
  companyPage.innerHTML = '';
  homepage.style.display = '';
  document.body.classList.remove('company-view');
  activeCompany = null;
}

function route() {
  const hash = location.hash.replace(/^#/, '');
  if (hash.startsWith('company/')) {
    const id = decodeURIComponent(hash.slice('company/'.length));
    const company = companies.find(c => c.id === id);
    if (company) renderCompanyPage(company);
    else { history.replaceState(null, '', '#explore'); leaveCompanyPage(); }
  } else {
    leaveCompanyPage();
    if (hash === 'explore') requestAnimationFrame(() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }));
    else if (hash === 'about') requestAnimationFrame(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }));
  }
}

homeEls.search.addEventListener('input', e => { state.search = e.target.value; renderDirectory(); });
homeEls.decade.addEventListener('change', e => { state.decade = e.target.value; renderDirectory(); });
homeEls.clear.addEventListener('click', () => {
  state.search = ''; state.industry = 'All'; state.decade = 'all'; state.letter = 'All';
  homeEls.search.value = ''; homeEls.decade.value = 'all';
  [...homeEls.industries.querySelectorAll('.filter-chip')].forEach(el => el.classList.toggle('active', el.dataset.industry === 'All'));
  [...homeEls.azIndex.querySelectorAll('.az-chip')].forEach(el => el.classList.toggle('active', el.dataset.letter === 'All'));
  renderDirectory();
});
document.addEventListener('keydown', event => {
  if (event.key === '/' && document.activeElement !== homeEls.search && !document.body.classList.contains('company-view')) { event.preventDefault(); homeEls.search.focus(); }
});
homeEls.surprise.addEventListener('click', () => { const c = companies[Math.floor(Math.random() * companies.length)]; location.hash = `company/${c.id}`; });

initDirectoryNavigation();
initFilters();
renderDirectory();
setFeatured(companies.find(c => c.id === 'airbnb') || companies[0]);
window.addEventListener('hashchange', route);
route();
