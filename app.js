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

const els = {
  grid: document.getElementById('companyGrid'), count: document.getElementById('resultCount'), search: document.getElementById('searchInput'),
  decade: document.getElementById('decadeFilter'), industries: document.getElementById('industryFilters'), empty: document.getElementById('emptyState'),
  clear: document.getElementById('clearFilters'), modal: document.getElementById('storyModal'), storyTitle: document.getElementById('storyTitle'),
  storyNumber: document.getElementById('storyNumber'), storyIndustry: document.getElementById('storyIndustry'), storyDeck: document.getElementById('storyDeck'),
  storyStats: document.getElementById('storyStats'), storyFlow: document.getElementById('storyFlow'), storyProducts: document.getElementById('storyProducts'),
  storyTimeline: document.getElementById('storyTimeline'), storySource: document.getElementById('storySource'), featuredTitle: document.getElementById('featuredTitle'),
  featuredSummary: document.getElementById('featuredSummary'), featuredYear: document.getElementById('featuredYear'), featuredTag: document.getElementById('featuredTag'),
  featuredLink: document.getElementById('featuredLink'), surprise: document.getElementById('surpriseBtn')
};

const state = { search: '', industry: 'All', decade: 'all' };
const industries = ['All', ...new Set(companies.map(c => c.industry))];
function normalize(value) { return value.toLowerCase().trim(); }

function initFilters() {
  els.industries.innerHTML = industries.map(industry => `<button type="button" class="filter-chip ${industry === 'All' ? 'active' : ''}" data-industry="${industry}">${industry}</button>`).join('');
  els.industries.addEventListener('click', event => {
    const button = event.target.closest('[data-industry]'); if (!button) return;
    state.industry = button.dataset.industry;
    [...els.industries.querySelectorAll('.filter-chip')].forEach(el => el.classList.toggle('active', el === button)); render();
  });
}

function filteredCompanies() {
  const q = normalize(state.search);
  return companies.filter(c => {
    const haystack = normalize([c.name, c.industry, c.founders, c.summary, c.firstProduct, c.successProduct, ...c.products].join(' '));
    return (!q || haystack.includes(q)) && (state.industry === 'All' || c.industry === state.industry) && (state.decade === 'all' || String(c.decade) === state.decade);
  });
}

function render() {
  const items = filteredCompanies();
  els.count.textContent = `${items.length} ${items.length === 1 ? 'story' : 'stories'}`;
  els.grid.innerHTML = items.map(c => `
    <a class="company-card" href="#company/${c.id}" aria-label="Read ${c.name} origin story">
      <div><div class="company-top"><span class="company-year">${c.year}</span><span class="company-industry">${c.industry}</span></div>
      <h3>${c.name}</h3><p>${c.summary}</p></div>
      <div class="card-footer"><span class="founders">Built by ${c.founders}</span><span class="card-arrow">↗</span></div>
    </a>`).join('');
  els.empty.hidden = items.length !== 0;
}

function node(label, value, meta, accent = false) {
  return `<div class="flow-node ${accent ? 'flow-node-accent' : ''}"><span class="flow-label">${label}</span><strong>${value}</strong>${meta ? `<p>${meta}</p>` : ''}</div>`;
}
function arrow() { return `<div class="flow-arrow" aria-hidden="true"><span></span><b>↓</b></div>`; }

function openStory(id) {
  const company = companies.find(c => c.id === id); if (!company) return;
  const number = String(companies.indexOf(company) + 1).padStart(2, '0');
  els.storyNumber.textContent = number;
  els.storyIndustry.textContent = `${company.industry} · ${company.year}`;
  els.storyTitle.textContent = company.name;
  els.storyDeck.textContent = company.summary;
  els.storyStats.innerHTML = `
    <div class="stat"><span class="stat-label">Founded</span><span class="stat-value">${company.year}</span></div>
    <div class="stat"><span class="stat-label">Founders</span><span class="stat-value">${company.founders}</span></div>
    <div class="stat"><span class="stat-label">Industry</span><span class="stat-value">${company.industry}</span></div>`;
  els.storyFlow.innerHTML = `
    <div class="flow-rail">
      ${node('01 · The idea', company.idea, 'The starting belief')}${arrow()}
      ${node('02 · First product', company.firstProduct, company.firstProductNote)}${arrow()}
      ${node('03 · Breakthrough', company.successProduct, company.successNote, true)}
    </div>`;
  els.storyProducts.innerHTML = `<div class="product-heading"><span class="section-eyebrow">THE PRODUCT UNIVERSE</span><span>${company.products.length} core products / product lines</span></div><div class="product-chips">${company.products.map(p => `<span class="product-chip">${p}</span>`).join('')}</div><p class="product-disclaimer">“All products” here means the company’s notable product families and current offerings, not every model, version, SKU, or discontinued item.</p>`;
  els.storyTimeline.innerHTML = company.timeline.map(([year, title, copy]) => `<div class="timeline-item"><div class="timeline-year">${year}</div><div class="timeline-title">${title}</div><p class="timeline-copy">${copy}</p></div>`).join('');
  els.storySource.innerHTML = `<span>Primary source</span><a class="source-link" href="${company.source}" target="_blank" rel="noopener noreferrer">Open official company history ↗</a>`;
  els.modal.classList.add('open'); els.modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
  history.replaceState(null, '', `#company/${company.id}`);
}

function closeStory() {
  els.modal.classList.remove('open'); els.modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
  if (location.hash.startsWith('#company/')) history.replaceState(null, '', '#explore');
}
function route() { const hash = location.hash; if (hash.startsWith('#company/')) openStory(hash.split('/')[1]); else if (els.modal.classList.contains('open')) closeStory(); }

els.search.addEventListener('input', e => { state.search = e.target.value; render(); });
els.decade.addEventListener('change', e => { state.decade = e.target.value; render(); });
els.clear.addEventListener('click', () => { state.search = ''; state.industry = 'All'; state.decade = 'all'; els.search.value = ''; els.decade.value = 'all'; [...els.industries.querySelectorAll('.filter-chip')].forEach(el => el.classList.toggle('active', el.dataset.industry === 'All')); render(); });

document.addEventListener('click', event => {
  if (event.target.closest('.source-link')) return;
  if (event.target.matches('[data-close]') || event.target.closest('[data-close]')) closeStory();
  const card = event.target.closest('.company-card');
  if (card) { event.preventDefault(); openStory(card.getAttribute('href').split('/')[1]); }
});
document.addEventListener('keydown', event => {
  if (event.key === '/' && document.activeElement !== els.search) { event.preventDefault(); els.search.focus(); }
  if (event.key === 'Escape' && els.modal.classList.contains('open')) closeStory();
});
els.surprise.addEventListener('click', () => openStory(companies[Math.floor(Math.random() * companies.length)].id));

initFilters(); render(); route(); window.addEventListener('hashchange', route);
