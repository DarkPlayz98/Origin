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
  storyStats: document.getElementById('storyStats'), storyFlow: document.getElementById('storyFlow'), storyProducts: document.getElementById('storyProducts'), azIndex: document.getElementById('azIndex'), aiButton: document.getElementById('aiSummaryBtn'), aiSummary: document.getElementById('aiSummary'), aiSummaryText: document.getElementById('aiSummaryText'), productHeroName: document.getElementById('productHeroName'), productHeroCopy: document.getElementById('productHeroCopy'), productStage: document.getElementById('productStage'), productModel: document.getElementById('productModel'), modelCaption: document.getElementById('modelCaption'),
  storyTimeline: document.getElementById('storyTimeline'), storySource: document.getElementById('storySource'), featuredTitle: document.getElementById('featuredTitle'),
  featuredSummary: document.getElementById('featuredSummary'), featuredYear: document.getElementById('featuredYear'), featuredTag: document.getElementById('featuredTag'),
  featuredLink: document.getElementById('featuredLink'), surprise: document.getElementById('surpriseBtn')
};

const state = { search: '', industry: 'All', decade: 'all', letter: 'All' };
let activeCompany = null;
const industries = ['All', ...new Set(companies.map(c => c.industry))];
function normalize(value) { return value.toLowerCase().trim(); }

function initDirectoryNavigation() {
  const decades = [...new Set(companies.map(c => Math.floor(c.year / 10) * 10))].sort((a,b) => a-b);
  els.decade.innerHTML = '<option value="all">All decades</option>' + decades.map(d => `<option value="${d}">${d}s</option>`).join('');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  els.azIndex.innerHTML = `<button class="az-chip active" type="button" data-letter="All">All</button>` + letters.map(letter => {
    const exists = companies.some(c => c.name[0].toUpperCase() === letter);
    return `<button class="az-chip ${exists ? '' : 'empty'}" type="button" data-letter="${letter}" ${exists ? '' : 'disabled'}>${letter}</button>`;
  }).join('');
  els.azIndex.addEventListener('click', event => {
    const button = event.target.closest('[data-letter]'); if (!button || button.disabled) return;
    state.letter = button.dataset.letter;
    [...els.azIndex.querySelectorAll('.az-chip')].forEach(el => el.classList.toggle('active', el === button));
    render();
  });
}

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
    return (!q || haystack.includes(q)) && (state.industry === 'All' || c.industry === state.industry) && (state.decade === 'all' || String(c.decade) === state.decade) && (state.letter === 'All' || c.name[0].toUpperCase() === state.letter);
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
  activeCompany = company;
  els.aiSummary.hidden = true; els.aiSummaryText.textContent = '';
  els.aiButton.disabled = false; els.aiButton.innerHTML = 'Summarize with Origin AI <span>✦</span>';
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
  els.productHeroName.textContent = company.firstProduct;
  els.productHeroCopy.textContent = `${company.firstProductNote} See how the original product connects to ${company.successProduct}, the defining success story.`;
  els.modelCaption.textContent = `${company.firstProduct.toUpperCase()} · PRODUCT STUDY`;
  els.productModel.dataset.industry = company.industry.toLowerCase();
  els.storyProducts.innerHTML = `<div class="product-heading"><span class="section-eyebrow">THE PRODUCT UNIVERSE</span><span>${company.products.length} core products / product lines</span></div><div class="product-chips">${company.products.map(p => `<span class="product-chip">${p}</span>`).join('')}</div><p class="product-disclaimer">“All products” here means the company’s notable product families and current offerings, not every model, version, SKU, or discontinued item.</p>`;
  els.storyTimeline.innerHTML = company.timeline.map(([year, title, copy]) => `<div class="timeline-item"><div class="timeline-year">${year}</div><div class="timeline-title">${title}</div><p class="timeline-copy">${copy}</p></div>`).join('');
  els.storySource.innerHTML = `<span>Primary source</span><a class="source-link" href="${company.source}" target="_blank" rel="noopener noreferrer">Open source ↗</a>`;
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
els.clear.addEventListener('click', () => { state.search = ''; state.industry = 'All'; state.decade = 'all'; state.letter = 'All'; els.search.value = ''; els.decade.value = 'all'; [...els.industries.querySelectorAll('.filter-chip')].forEach(el => el.classList.toggle('active', el.dataset.industry === 'All')); [...els.azIndex.querySelectorAll('.az-chip')].forEach(el => el.classList.toggle('active', el.dataset.letter === 'All')); render(); });

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


els.aiButton.addEventListener('click', async () => {
  if (!activeCompany) return;
  els.aiButton.disabled = true; els.aiButton.textContent = 'Summarizing…';
  try {
    const result = await originAISummarize(activeCompany);
    els.aiSummaryText.textContent = result || 'No summary was returned.';
    els.aiSummary.hidden = false;
  } catch (error) {
    els.aiSummaryText.textContent = `${error.message} If your Worker expects a different auth header, update ai.js to match it.`;
    els.aiSummary.hidden = false;
  } finally {
    els.aiButton.disabled = false; els.aiButton.innerHTML = 'Summarize with Origin AI <span>✦</span>';
  }
});

initDirectoryNavigation(); initFilters(); render(); route(); window.addEventListener('hashchange', route);

/* Extended A–Z directory: notable, widely-known companies. Each gets the same full Origin story template. */
companies.push(
  {id:'adobe',name:'Adobe',year:1982,decade:1980,industry:'Software',founders:'John Warnock, Charles Geschke',summary:'A new way to describe digital pages became the foundation for modern creative software.',idea:'Create a portable digital document and graphics technology that could reproduce typography and images reliably.',firstProduct:'PostScript',firstProductNote:'Adobe’s foundational page-description technology, licensed to early printer makers.',successProduct:'Photoshop',successNote:'The image-editing product that became one of Adobe’s most recognizable creative tools.',products:['Photoshop','Illustrator','Acrobat','Premiere Pro','After Effects','Lightroom','InDesign','Adobe Express','Creative Cloud'],timeline:[['1982','Adobe begins','Warnock and Geschke found Adobe around digital publishing technology.'],['1984','PostScript','Adobe introduces the technology that helps drive desktop publishing.'],['1987','Illustrator','Adobe expands into professional digital illustration.'],['1988','Photoshop','Adobe acquires and begins distributing Photoshop.'],['2003','Creative Suite','Adobe bundles its major creative applications into a suite.']],source:'https://en.wikipedia.org/wiki/Adobe_Inc.'},
  {id:'alibaba',name:'Alibaba',year:1999,decade:1990,industry:'Commerce',founders:'Jack Ma and 17 co-founders',summary:'A small apartment team built a digital marketplace connecting Chinese businesses with the world.',idea:'Build an online marketplace that could help small Chinese businesses reach international buyers.',firstProduct:'Alibaba.com',firstProductNote:'The original business-to-business online marketplace.',successProduct:'Taobao',successNote:'Alibaba’s consumer marketplace became one of its defining platforms.',products:['Alibaba.com','Taobao','Tmall','AliExpress','Lazada','Cainiao','Alibaba Cloud','DingTalk','Alipay'],timeline:[['1999','Founded','Jack Ma and a founding team start Alibaba in Hangzhou.'],['2003','Taobao','Alibaba launches its consumer marketplace.'],['2004','Alipay','A payment service is created to support online commerce.'],['2008','Tmall','The platform expands into branded consumer commerce.']],source:'https://en.wikipedia.org/wiki/Alibaba_Group'},
  {id:'atlassian',name:'Atlassian',year:2002,decade:2000,industry:'Software',founders:'Mike Cannon-Brookes, Scott Farquhar',summary:'Two founders used a credit card and a developer-focused idea to build tools for teams.',idea:'Create practical software for software teams and sell it online without a traditional sales force.',firstProduct:'Jira',firstProductNote:'An issue-tracking product built for software development teams.',successProduct:'Jira',successNote:'Jira became Atlassian’s flagship work-management product.',products:['Jira','Confluence','Trello','Bitbucket','Loom','Jira Product Discovery','Statuspage','Opsgenie'],timeline:[['2002','Atlassian begins','The founders launch a bootstrapped software company in Sydney.'],['2002','Jira','The issue tracker becomes the company’s first major product.'],['2004','Confluence','Atlassian launches a collaboration and knowledge product.'],['2015','IPO','Atlassian goes public on Nasdaq.']],source:'https://en.wikipedia.org/wiki/Atlassian'},
  {id:'bmw',name:'BMW',year:1916,decade:1910,industry:'Automotive',founders:'Karl Rapp, Gustav Otto',summary:'An aircraft-engine company evolved through motorcycles into one of the world’s best-known car makers.',idea:'Build engines and vehicles around engineering performance and precision.',firstProduct:'BMW IIIa',firstProductNote:'An early aircraft engine associated with BMW’s first major production success.',successProduct:'BMW 3 Series',successNote:'A long-running model family that became central to BMW’s global identity.',products:['3 Series','5 Series','7 Series','X3','X5','X7','i4','i5','i7','iX','MINI'],timeline:[['1916','Origins','The company’s roots begin in German aircraft-engine manufacturing.'],['1923','Motorcycles','BMW enters motorcycle production.'],['1928','Automobiles','BMW acquires a car manufacturer and enters automobile production.'],['1975','3 Series era','The 3 Series becomes a defining BMW model line.']],source:'https://en.wikipedia.org/wiki/BMW'},
  {id:'canva',name:'Canva',year:2013,decade:2010,industry:'Design',founders:'Melanie Perkins, Cliff Obrecht, Cameron Adams',summary:'A simple online design tool turned templates into a new way for anyone to make visual content.',idea:'Make professional-looking design dramatically easier for people without formal design training.',firstProduct:'Canva',firstProductNote:'The browser-based visual design platform launched in 2013.',successProduct:'Canva',successNote:'The platform itself became the company’s defining product and global brand.',products:['Canva Editor','Canva Presentations','Canva Docs','Canva Whiteboards','Canva Websites','Canva Video','Canva Print','Canva AI'],timeline:[['2013','Canva launches','The visual design platform opens to the public.'],['2014','Growth','Templates and easy collaboration accelerate adoption.'],['2019','Enterprise','Canva expands into larger organizations and teams.'],['2024','Visual suite','Canva broadens into websites, documents, whiteboards and AI-assisted creation.']],source:'https://en.wikipedia.org/wiki/Canva'},
  {id:'coca-cola',name:'Coca-Cola',year:1886,decade:1880,industry:'Consumer',founders:'John Stith Pemberton',summary:'A pharmacist’s syrup became one of the most recognizable consumer brands in history.',idea:'Develop a distinctive flavored syrup that could be served as a soda fountain beverage.',firstProduct:'Coca-Cola',firstProductNote:'The original beverage formula first sold at a pharmacy soda fountain in Atlanta.',successProduct:'Coca-Cola',successNote:'The flagship beverage became the company’s global anchor.',products:['Coca-Cola','Diet Coke','Coke Zero Sugar','Sprite','Fanta','Minute Maid','Powerade','Dasani'],timeline:[['1886','First serving','Coca-Cola is first served at Jacobs’ Pharmacy in Atlanta.'],['1887','Trademark','The Coca-Cola name and logo begin to spread commercially.'],['1892','Company formed','The Coca-Cola Company is incorporated.'],['1915','Contour bottle','The iconic bottle design is introduced.']],source:'https://en.wikipedia.org/wiki/Coca-Cola'},
  {id:'costco',name:'Costco',year:1983,decade:1980,industry:'Retail',founders:'James Sinegal, Jeffrey Brotman',summary:'A warehouse-club model focused on low prices and membership turned bulk shopping into a global retail format.',idea:'Sell a tightly selected range of products in warehouse quantities while keeping operating costs low.',firstProduct:'Costco warehouse club',firstProductNote:'The original membership warehouse format.',successProduct:'Costco membership model',successNote:'Membership economics became the company’s defining commercial advantage.',products:['Costco Warehouses','Kirkland Signature','Costco Business Center','Costco Travel','Costco Gasoline','Costco Optical'],timeline:[['1983','First Costco','The first Costco warehouse opens in Seattle.'],['1985','Expansion','The company expands its membership warehouse footprint.'],['1993','Price Club merger','Costco merges with Price Club, accelerating scale.']],source:'https://en.wikipedia.org/wiki/Costco'},
  {id:'disney',name:'Disney',year:1923,decade:1920,industry:'Entertainment',founders:'Walt Disney, Roy O. Disney',summary:'Two brothers started a small animation studio that turned characters and storytelling into an entire entertainment universe.',idea:'Make animated stories with stronger character, emotion and visual ambition.',firstProduct:'Alice Comedies',firstProductNote:'The early short-film series produced by the Disney Brothers studio.',successProduct:'Snow White and the Seven Dwarfs',successNote:'The first full-length animated feature became a landmark commercial and artistic success.',products:['Disney Animation','Pixar','Marvel','Star Wars','Disney+','ESPN','Disney Parks','Disney Cruise Line'],timeline:[['1923','Disney Brothers Studio','Walt and Roy begin producing animated films in Hollywood.'],['1928','Mickey Mouse','Steamboat Willie introduces Mickey in a landmark synchronized-sound cartoon.'],['1937','Snow White','Disney releases its first feature-length animated film.'],['1955','Disneyland','The first Disney theme park opens in California.']],source:'https://en.wikipedia.org/wiki/The_Walt_Disney_Company'},
  {id:'duolingo',name:'Duolingo',year:2011,decade:2010,industry:'Education',founders:'Luis von Ahn, Severin Hacker',summary:'A language-learning experiment made lessons short, game-like and available to anyone with a phone.',idea:'Make language education accessible and engaging through a free, game-like platform.',firstProduct:'Duolingo',firstProductNote:'The original language-learning app and web platform.',successProduct:'Duolingo',successNote:'The app became the company’s flagship global education product.',products:['Duolingo','Duolingo Max','Duolingo English Test','Duolingo ABC','Duolingo Music','Duolingo Math'],timeline:[['2011','Founded','Von Ahn and Hacker begin building Duolingo.'],['2012','Beta','The platform opens to early users.'],['2014','Mobile expansion','Duolingo becomes a major mobile language-learning app.'],['2021','IPO','Duolingo goes public.']],source:'https://en.wikipedia.org/wiki/Duolingo'},
  {id:'ebay',name:'eBay',year:1995,decade:1990,industry:'Commerce',founders:'Pierre Omidyar',summary:'An online auction experiment proved strangers would buy and sell objects directly to each other on the internet.',idea:'Create a trusted marketplace where individuals could transact directly online.',firstProduct:'AuctionWeb',firstProductNote:'The original auction marketplace that later became eBay.',successProduct:'eBay marketplace',successNote:'The global peer-to-peer marketplace became eBay’s defining product.',products:['eBay Marketplace','eBay Motors','eBay Refurbished','eBay Live'],timeline:[['1995','AuctionWeb','Omidyar launches the first version of the auction marketplace.'],['1997','eBay name','The company adopts the eBay name and scales rapidly.'],['1998','IPO','eBay becomes a public company.']],source:'https://en.wikipedia.org/wiki/EBay'},
  {id:'epic-games',name:'Epic Games',year:1991,decade:1990,industry:'Gaming',founders:'Tim Sweeney',summary:'A one-person shareware experiment grew into a game engine and entertainment company.',idea:'Make ambitious games and the technology required to build them.',firstProduct:'ZZT',firstProductNote:'The early shareware game that launched Epic MegaGames.',successProduct:'Fortnite',successNote:'Fortnite became Epic’s defining global entertainment phenomenon.',products:['Fortnite','Unreal Engine','Epic Games Store','Rocket League','Fall Guys','Unreal Editor for Fortnite'],timeline:[['1991','Epic MegaGames','Tim Sweeney starts the company and releases ZZT.'],['1998','Unreal','Epic launches Unreal and begins the Unreal Engine era.'],['2017','Fortnite','Fortnite Battle Royale becomes a global phenomenon.'],['2018','Epic Games Store','Epic launches its PC game storefront.']],source:'https://en.wikipedia.org/wiki/Epic_Games'},
  {id:'ford',name:'Ford',year:1903,decade:1900,industry:'Automotive',founders:'Henry Ford, 11 original investors',summary:'A Detroit automobile company transformed manufacturing by making a reliable car affordable at massive scale.',idea:'Build a practical automobile for ordinary people and manufacture it efficiently.',firstProduct:'Model A',firstProductNote:'Ford’s first production automobile, introduced in 1903.',successProduct:'Model T',successNote:'The Model T and moving assembly line made mass-market automobiles possible.',products:['F-Series','Mustang','Explorer','Bronco','Ranger','Transit','Maverick','Mach-E'],timeline:[['1903','Ford Motor Company','The company is incorporated in Detroit.'],['1908','Model T','Ford introduces the car that will transform the automobile market.'],['1913','Moving assembly line','Ford applies moving-line production at Highland Park.'],['1927','Model A','Ford replaces the Model T with a new generation of cars.']],source:'https://en.wikipedia.org/wiki/Ford_Motor_Company'},
  {id:'hp',name:'HP',year:1939,decade:1930,industry:'Technology',founders:'Bill Hewlett, David Packard',summary:'A Palo Alto garage partnership became one of Silicon Valley’s earliest technology companies.',idea:'Build practical electronic instruments and sell them to emerging technology industries.',firstProduct:'HP 200A oscillator',firstProductNote:'An audio oscillator famously sold to Walt Disney for Fantasia-related production work.',successProduct:'HP calculators',successNote:'HP’s scientific and business calculators became iconic products.',products:['HP PCs','HP Spectre','HP EliteBook','HP LaserJet','HP DesignJet','HP printers','HP Z'],timeline:[['1939','Founded','Hewlett and Packard begin working together in Palo Alto.'],['1939','Garage','The early business operates from a small rented garage.'],['1940s','Instrumentation','HP grows through electronic test and measurement products.'],['1968','HP 9100A','HP enters programmable computing with an early desktop computer.']],source:'https://en.wikipedia.org/wiki/HP_Inc.'},
  {id:'ikea',name:'IKEA',year:1943,decade:1940,industry:'Retail',founders:'Ingvar Kamprad',summary:'A mail-order business in rural Sweden developed into a global system for affordable flat-pack furniture.',idea:'Offer well-designed everyday products at prices ordinary households could afford.',firstProduct:'Furniture line',firstProductNote:'Furniture became the core category as IKEA evolved beyond mail-order goods.',successProduct:'Billy bookcase',successNote:'The Billy became one of IKEA’s most recognizable and widely sold products.',products:['Billy','Kallax','Malm','Pax','Poäng','Lack','Hemnes','IKEA Food'],timeline:[['1943','IKEA founded','Kamprad starts IKEA as a mail-order business.'],['1948','Furniture','IKEA begins focusing heavily on furniture.'],['1956','Flat-pack','Flat-pack furniture and customer assembly become central to the model.'],['1978','Billy','The Billy bookcase launches and becomes a long-running bestseller.']],source:'https://en.wikipedia.org/wiki/IKEA'},
  {id:'intel',name:'Intel',year:1968,decade:1960,industry:'Semiconductors',founders:'Robert Noyce, Gordon Moore',summary:'A semiconductor startup helped create the microprocessor industry and the modern personal computer.',idea:'Build increasingly powerful semiconductor memory and logic products.',firstProduct:'3101 SRAM',firstProductNote:'One of Intel’s earliest commercial semiconductor memory products.',successProduct:'x86 processors',successNote:'Intel’s x86 processor family became a defining architecture of personal computing.',products:['Intel Core','Xeon','Arc','Gaudi','Ethernet','N-series','Intel Foundry'],timeline:[['1968','Intel founded','Noyce and Moore establish Intel in California.'],['1970','DRAM','Intel introduces an early commercially viable DRAM chip.'],['1971','4004','Intel introduces the 4004 microprocessor.'],['1978','8086','The 8086 processor establishes the x86 architecture lineage.']],source:'https://en.wikipedia.org/wiki/Intel'},
  {id:'jpmorgan',name:'JPMorgan Chase',year:2000,decade:2000,industry:'Finance',founders:'J.P. Morgan and predecessor institutions',summary:'A modern banking giant assembled from generations of financial institutions and mergers.',idea:'Build a full-service financial institution spanning consumer, commercial and investment banking.',firstProduct:'Banking services',firstProductNote:'The modern company is the result of many predecessor banks rather than one single product.',successProduct:'J.P. Morgan financial platform',successNote:'The firm’s global banking and payments businesses define its modern scale.',products:['Chase','J.P. Morgan','Chase Credit Cards','Chase Business','J.P. Morgan Payments','J.P. Morgan Asset Management'],timeline:[['1799','Early roots','The company traces roots to early U.S. banking institutions.'],['1871','J.P. Morgan','J. Pierpont Morgan enters the banking business.'],['2000','JPMorgan Chase','J.P. Morgan merges with Chase Manhattan.'],['2004','Bank One','The firm merges with Bank One, expanding consumer banking.']],source:'https://en.wikipedia.org/wiki/JPMorgan_Chase'},
  {id:'lego',name:'LEGO',year:1932,decade:1930,industry:'Consumer',founders:'Ole Kirk Christiansen',summary:'A Danish carpenter’s workshop found a durable language for play in small interlocking bricks.',idea:'Make high-quality toys that encourage children to build and create.',firstProduct:'Wooden toys',firstProductNote:'LEGO began with wooden toys before moving into plastic construction bricks.',successProduct:'LEGO bricks',successNote:'The interlocking brick system became one of the world’s most recognizable toy platforms.',products:['LEGO City','LEGO Technic','LEGO Friends','LEGO Star Wars','LEGO Architecture','LEGO Icons','LEGO DUPLO'],timeline:[['1932','Workshop','Ole Kirk Christiansen begins making toys in Billund.'],['1934','LEGO name','The company adopts the LEGO name.'],['1949','Automatic Binding Bricks','Early plastic interlocking bricks appear.'],['1958','Modern brick patent','The modern tube-and-stud brick system is patented.']],source:'https://en.wikipedia.org/wiki/The_Lego_Group'},
  {id:'linkedin',name:'LinkedIn',year:2002,decade:2000,industry:'Social',founders:'Reid Hoffman, Allen Blue, Konstantin Guericke, Eric Ly, Jean-Luc Vaillant',summary:'A professional network started with a simple idea: put people’s professional identities online and make them useful.',idea:'Create a network centered on professional identity, relationships and opportunity.',firstProduct:'LinkedIn network',firstProductNote:'The original professional networking service.',successProduct:'LinkedIn platform',successNote:'The professional graph became the company’s defining asset.',products:['LinkedIn','LinkedIn Premium','Sales Navigator','Recruiter','Learning','Marketing Solutions'],timeline:[['2002','Founded','The founding team begins building LinkedIn.'],['2003','Launch','LinkedIn opens to the public.'],['2006','Growth','The network reaches millions of members and becomes a professional identity layer.'],['2016','Microsoft acquisition','Microsoft acquires LinkedIn.']],source:'https://en.wikipedia.org/wiki/LinkedIn'},
  {id:'meta',name:'Meta',year:2004,decade:2000,industry:'Social',founders:'Mark Zuckerberg, Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, Chris Hughes',summary:'A college social network grew into a global family of communication, social and immersive products.',idea:'Build an online directory that connects people through real identities and social relationships.',firstProduct:'Facebook',firstProductNote:'The original social networking service launched from Harvard.',successProduct:'Facebook',successNote:'Facebook became the company’s foundational global social platform.',products:['Facebook','Instagram','WhatsApp','Messenger','Threads','Quest','Ray-Ban Meta','Horizon','Meta AI'],timeline:[['2004','Facebook launches','The social network begins at Harvard.'],['2006','Open to everyone','Facebook expands beyond universities.'],['2012','Instagram','Facebook acquires Instagram.'],['2014','WhatsApp','Facebook acquires WhatsApp.'],['2021','Meta','The company adopts the Meta name and emphasizes the metaverse.']],source:'https://en.wikipedia.org/wiki/Meta_Platforms'},
  {id:'nvidia',name:'NVIDIA',year:1993,decade:1990,industry:'Semiconductors',founders:'Jensen Huang, Chris Malachowsky, Curtis Priem',summary:'Three engineers bet that accelerated graphics would become a new computing platform.',idea:'Build high-performance graphics processors for a new era of visual computing.',firstProduct:'NV1',firstProductNote:'NVIDIA’s first graphics accelerator product.',successProduct:'GeForce',successNote:'GeForce became the company’s defining consumer GPU family.',products:['GeForce','RTX','GeForce NOW','NVIDIA DGX','NVIDIA HGX','CUDA','Jetson','NVIDIA DRIVE','Blackwell'],timeline:[['1993','Founded','NVIDIA is founded in Silicon Valley.'],['1995','NV1','The company releases its first graphics product.'],['1999','GeForce 256','NVIDIA popularizes the term GPU with GeForce 256.'],['2006','CUDA','NVIDIA introduces CUDA, expanding GPUs into general-purpose computing.'],['2024','Blackwell','NVIDIA launches a new generation of accelerated computing platforms.']],source:'https://en.wikipedia.org/wiki/Nvidia'},
  {id:'openai',name:'OpenAI',year:2015,decade:2010,industry:'AI',founders:'Sam Altman, Elon Musk, Greg Brockman, Ilya Sutskever, John Schulman, Wojciech Zaremba',summary:'A research lab focused on broadly beneficial artificial intelligence became one of the defining AI product companies.',idea:'Advance artificial general intelligence research and make powerful AI broadly useful.',firstProduct:'OpenAI Gym',firstProductNote:'An early open-source toolkit for reinforcement-learning research.',successProduct:'ChatGPT',successNote:'ChatGPT became OpenAI’s defining consumer AI product.',products:['GPT','ChatGPT','Sora','Codex','API','OpenAI Platform','DALL·E','Whisper'],timeline:[['2015','Founded','OpenAI begins as an AI research organization.'],['2016','Gym','OpenAI releases Gym for reinforcement-learning research.'],['2018','GPT','The GPT research line begins.'],['2020','GPT-3','OpenAI releases GPT-3 through its API.'],['2022','ChatGPT','ChatGPT launches publicly and rapidly reaches a global audience.']],source:'https://en.wikipedia.org/wiki/OpenAI'},
  {id:'oracle',name:'Oracle',year:1977,decade:1970,industry:'Software',founders:'Larry Ellison, Bob Miner, Ed Oates',summary:'A database startup pursued a new relational model and became a foundational enterprise software company.',idea:'Commercialize relational database technology for business computing.',firstProduct:'Oracle Database',firstProductNote:'The relational database system at the center of the company’s original business.',successProduct:'Oracle Database',successNote:'Oracle’s database platform became a defining enterprise technology product.',products:['Oracle Database','Oracle Cloud Infrastructure','Java','MySQL','NetSuite','Oracle Fusion Cloud','Exadata'],timeline:[['1977','SDL begins','The company is founded as Software Development Laboratories.'],['1979','Oracle V2','The first commercial Oracle database product is released.'],['1982','Oracle name','The company adopts the Oracle name.'],['1995','Internet strategy','Oracle increasingly positions its software for internet-era computing.']],source:'https://en.wikipedia.org/wiki/Oracle_Corporation'},
  {id:'paypal',name:'PayPal',year:1998,decade:1990,industry:'Fintech',founders:'Max Levchin, Peter Thiel, Luke Nosek, Ken Howery',summary:'A cryptography company pivoted into a simple way for people to send money online.',idea:'Make digital payments fast and convenient over the internet.',firstProduct:'PayPal digital payments',firstProductNote:'The original online payments service evolved from Confinity’s payment technology.',successProduct:'PayPal',successNote:'The PayPal wallet became a foundational consumer internet payment product.',products:['PayPal','Venmo','Braintree','Xoom','Honey','PayPal Checkout'],timeline:[['1998','Confinity','The company begins with cryptography and mobile payment experiments.'],['1999','PayPal','The PayPal service takes shape.'],['2002','eBay acquisition','eBay acquires PayPal after rapid marketplace adoption.'],['2015','Independent','PayPal separates from eBay as an independent public company.']],source:'https://en.wikipedia.org/wiki/PayPal'},
  {id:'pepsi',name:'PepsiCo',year:1965,decade:1960,industry:'Consumer',founders:'Pepsi-Cola and Frito-Lay predecessor businesses',summary:'A beverage brand and snack company combined to form a global consumer-products portfolio.',idea:'Build a broad food and beverage company around iconic consumer brands.',firstProduct:'Pepsi-Cola',firstProductNote:'The beverage brand dates to the late nineteenth century; PepsiCo formed later through merger.',successProduct:'Lay’s',successNote:'Lay’s became one of the company’s most recognizable global snack brands.',products:['Pepsi','Lay’s','Gatorade','Doritos','Mountain Dew','Quaker','Cheetos','7UP international'],timeline:[['1898','Pepsi roots','The Pepsi beverage begins as Bradham’s drink in North Carolina.'],['1965','PepsiCo','Pepsi-Cola and Frito-Lay combine.'],['1980s','Portfolio growth','The company expands its global food and beverage portfolio.'],['2001','Quaker','PepsiCo acquires Quaker Oats, including Gatorade.']],source:'https://en.wikipedia.org/wiki/PepsiCo'},
  {id:'pinterest',name:'Pinterest',year:2009,decade:2000,industry:'Social',founders:'Ben Silbermann, Paul Sciarra, Evan Sharp',summary:'A visual bookmarking experiment became a discovery engine for ideas, projects and products.',idea:'Create a visual collection tool where people could save and organize things they wanted to remember or make.',firstProduct:'Pinterest',firstProductNote:'The original visual discovery and pinboard service.',successProduct:'Pinterest',successNote:'The visual discovery platform became the company’s core product.',products:['Pinterest','Pinterest Business','Pinterest Shopping','Pinterest Trends','Pinterest Ads'],timeline:[['2009','Prototype','Silbermann and the founding team begin developing Pinterest.'],['2010','Launch','The service opens to early users.'],['2012','Growth','Pinterest scales as a visual discovery platform.'],['2019','IPO','Pinterest becomes a public company.']],source:'https://en.wikipedia.org/wiki/Pinterest'},
  {id:'qualcomm',name:'Qualcomm',year:1985,decade:1980,industry:'Semiconductors',founders:'Irwin Jacobs, Andrew Viterbi and others',summary:'A communications research company helped turn wireless technology into a global semiconductor and licensing business.',idea:'Advance digital wireless communications and commercialize the underlying technology.',firstProduct:'OmniTRACS',firstProductNote:'An early commercial satellite-based mobile communications system.',successProduct:'Snapdragon',successNote:'Snapdragon became Qualcomm’s defining mobile computing platform.',products:['Snapdragon','FastConnect','Dragonwing','Qualcomm RF','Modems','Automotive platforms'],timeline:[['1985','Founded','Qualcomm begins as a communications technology company.'],['1988','OmniTRACS','The company launches a commercial satellite communications system.'],['1990s','CDMA','Qualcomm helps commercialize CDMA cellular technology.'],['2007','Snapdragon','Qualcomm introduces its Snapdragon mobile platform family.']],source:'https://en.wikipedia.org/wiki/Qualcomm'},
  {id:'reddit',name:'Reddit',year:2005,decade:2000,industry:'Social',founders:'Steve Huffman, Alexis Ohanian',summary:'A simple front page for internet links became a vast network of communities built around conversation.',idea:'Create a front page of the internet where users submit, vote on and discuss links and ideas.',firstProduct:'Reddit',firstProductNote:'The original social news and discussion website.',successProduct:'Reddit communities',successNote:'Subreddits and community moderation became the platform’s defining system.',products:['Reddit','Subreddits','Reddit Ads','Reddit Premium','Reddit Pro','Developer Platform'],timeline:[['2005','Founded','Huffman and Ohanian launch Reddit with support from Y Combinator.'],['2006','Acquired','Condé Nast acquires Reddit.'],['2011','Independent subsidiary','Reddit becomes operationally independent from Condé Nast.'],['2024','IPO','Reddit becomes a public company.']],source:'https://en.wikipedia.org/wiki/Reddit'},
  {id:'samsung',name:'Samsung',year:1938,decade:1930,industry:'Technology',founders:'Lee Byung-chul',summary:'A small Korean trading company evolved into a diversified technology group with a global electronics business.',idea:'Start with trade and build a diversified industrial group serving everyday markets.',firstProduct:'Consumer electronics',firstProductNote:'Samsung entered electronics manufacturing in the late 1960s, later building a major consumer-electronics portfolio.',successProduct:'Galaxy smartphones',successNote:'Galaxy became Samsung’s defining global mobile product family.',products:['Galaxy','Galaxy Z','Galaxy Tab','Bespoke','Neo QLED','OLED','SmartThings','Exynos','Galaxy Watch'],timeline:[['1938','Founded','Samsung begins as a small trading company in Korea.'],['1969','Samsung Electronics','The electronics business is established.'],['1970','Black-and-white TV','Samsung begins producing black-and-white televisions.'],['1988','Mobile era','Samsung Electronics expands into advanced telecommunications and consumer electronics.'],['2010','Galaxy','Samsung launches the Galaxy smartphone family.']],source:'https://en.wikipedia.org/wiki/Samsung_Electronics'},
  {id:'shopify',name:'Shopify',year:2006,decade:2000,industry:'Commerce',founders:'Tobias Lütke, Daniel Weinand, Scott Lake',summary:'A snowboard-shop frustration turned into software that lets almost anyone build an online store.',idea:'Build a better ecommerce platform after finding existing tools too rigid for a small online shop.',firstProduct:'Shopify',firstProductNote:'The ecommerce platform created for the founders’ own Snowdevil store.',successProduct:'Shopify platform',successNote:'Shopify became a global operating system for independent commerce.',products:['Shopify','Shopify Payments','Shopify POS','Shopify Markets','Shopify Plus','Shop Pay','Shopify Collabs'],timeline:[['2004','Snowdevil','The founders build an online snowboard store.'],['2006','Shopify','They turn the store technology into a platform for other merchants.'],['2015','IPO','Shopify becomes a public company.'],['2020s','Commerce platform','Payments, POS and merchant services expand around the core store.']],source:'https://en.wikipedia.org/wiki/Shopify'},
  {id:'slack',name:'Slack',year:2009,decade:2000,industry:'Software',founders:'Stewart Butterfield, Eric Costello, Cal Henderson, Serguei Mourachov',summary:'A failed game left behind an internal communication tool that became one of the defining workplace apps.',idea:'Turn the team communication system built for a game studio into a product for other teams.',firstProduct:'Slack',firstProductNote:'The workplace messaging platform spun out of the game development company Tiny Speck.',successProduct:'Slack',successNote:'Slack became a major team communication platform.',products:['Slack','Slack Connect','Slack Canvas','Slack Lists','Workflow Builder','Salesforce integrations'],timeline:[['2009','Tiny Speck','The founding team starts work on a multiplayer game.'],['2012','Internal tool','The team uses an internal messaging system to coordinate development.'],['2013','Slack pivot','The company pivots from the game to its communication product.'],['2014','Public launch','Slack opens widely and begins rapid enterprise adoption.']],source:'https://en.wikipedia.org/wiki/Slack_(software)'},
  {id:'spotify',name:'Spotify',year:2006,decade:2000,industry:'Entertainment',founders:'Daniel Ek, Martin Lorentzon',summary:'A Swedish startup tried to make music streaming feel as instant as local files while creating a new business model for music.',idea:'Build a fast, legal music service that could compete with piracy through convenience.',firstProduct:'Spotify',firstProductNote:'The original music streaming service.',successProduct:'Spotify',successNote:'Spotify became one of the world’s largest music streaming platforms.',products:['Spotify','Spotify Premium','Spotify for Artists','Spotify for Podcasters','Audiobooks','Spotify Ad Studio'],timeline:[['2006','Founded','Ek and Lorentzon establish Spotify in Stockholm.'],['2008','Launch','Spotify launches in several European markets.'],['2011','United States','Spotify expands into the U.S. market.'],['2018','IPO','Spotify becomes a public company through a direct listing.']],source:'https://en.wikipedia.org/wiki/Spotify'},
  {id:'starbucks',name:'Starbucks',year:1971,decade:1970,industry:'Consumer',founders:'Jerry Baldwin, Zev Siegl, Gordon Bowker',summary:'A single Seattle coffee shop evolved from selling beans into a global café experience.',idea:'Bring high-quality coffee beans and later an Italian-inspired café experience to a broad audience.',firstProduct:'Coffee beans',firstProductNote:'The original Starbucks sold roasted coffee beans and equipment.',successProduct:'Starbucks cafés',successNote:'The café format became the company’s defining global experience.',products:['Starbucks Coffee','Starbucks Reserve','Frappuccino','Cold Brew','Refreshers','Starbucks Rewards'],timeline:[['1971','First store','Starbucks opens its first store at Pike Place Market in Seattle.'],['1982','Howard Schultz','Schultz joins and sees the potential of the Italian coffeehouse model.'],['1987','New Starbucks','Schultz acquires the company and expands the café format.'],['1992','IPO','Starbucks becomes a public company.']],source:'https://en.wikipedia.org/wiki/Starbucks'},
  {id:'tesla',name:'Tesla',year:2003,decade:2000,industry:'Automotive',founders:'Martin Eberhard, Marc Tarpenning',summary:'A startup bet that electric cars could be desirable, fast and technologically ambitious.',idea:'Prove that electric vehicles could outperform gasoline cars while eventually reaching a wider market.',firstProduct:'Roadster',firstProductNote:'Tesla’s first production vehicle, based on a Lotus Elise-derived platform.',successProduct:'Model 3',successNote:'The Model 3 became Tesla’s mass-market breakthrough.',products:['Model 3','Model Y','Model S','Model X','Cybertruck','Semi','Supercharger','Powerwall','Megapack'],timeline:[['2003','Founded','Eberhard and Tarpenning establish Tesla Motors.'],['2006','Roadster prototype','Tesla demonstrates its first electric sports car.'],['2008','Roadster','The first production Tesla is delivered.'],['2012','Model S','Tesla launches its first mass-produced sedan.'],['2017','Model 3','Tesla begins deliveries of its lower-priced Model 3.']],source:'https://en.wikipedia.org/wiki/Tesla,_Inc.'},
  {id:'toyota',name:'Toyota',year:1937,decade:1930,industry:'Automotive',founders:'Kiichiro Toyoda',summary:'An industrial loom business became an automobile company famous for lean production and reliable mass-market vehicles.',idea:'Build automobiles using disciplined manufacturing and continuous improvement.',firstProduct:'Toyota AA',firstProductNote:'Toyota’s first passenger car, introduced in 1936 before the company was formally established.',successProduct:'Corolla',successNote:'The Corolla became one of the world’s best-selling nameplates.',products:['Corolla','Camry','RAV4','Land Cruiser','Prius','Hilux','Tacoma','bZ4X','Lexus'],timeline:[['1937','Toyota Motor founded','Kiichiro Toyoda establishes the automobile company.'],['1938','Koromo plant','Toyota opens its first major automobile production plant.'],['1966','Corolla','Toyota launches the Corolla.'],['1997','Prius','Toyota introduces the first-generation Prius.']],source:'https://en.wikipedia.org/wiki/Toyota'},
  {id:'uber',name:'Uber',year:2009,decade:2000,industry:'Mobility',founders:'Garrett Camp, Travis Kalanick',summary:'A simple idea for requesting a ride from a phone became a global on-demand mobility platform.',idea:'Make urban transportation easier to request and coordinate using a smartphone.',firstProduct:'UberCab',firstProductNote:'The original black-car ride service in San Francisco.',successProduct:'Uber rides',successNote:'The ride marketplace became Uber’s foundational global service.',products:['Uber','Uber Eats','Uber Freight','Uber for Business','Uber One','Uber Direct'],timeline:[['2009','UberCab','The founders begin testing a premium ride service in San Francisco.'],['2010','First ride','Uber expands from prototype to a working ride marketplace.'],['2012','UberX','The service broadens beyond luxury cars.'],['2014','Uber Eats roots','Uber begins experimenting with food delivery.']],source:'https://en.wikipedia.org/wiki/Uber'},
  {id:'unilever',name:'Unilever',year:1929,decade:1920,industry:'Consumer',founders:'Lever Brothers and Margarine Unie',summary:'Two consumer-goods businesses combined to build a portfolio spanning food, home care and personal care.',idea:'Scale everyday household and personal products through industrial manufacturing and global distribution.',firstProduct:'Sunlight Soap',firstProductNote:'Lever Brothers’ early mass-market soap became a foundational product.',successProduct:'Dove',successNote:'Dove became one of Unilever’s best-known global personal-care brands.',products:['Dove','Axe','Lifebuoy','Lux','Vaseline','Hellmann’s','Knorr','Ben & Jerry’s','Persil'],timeline:[['1880s','Lever Brothers','William Lever builds a mass-market soap business.'],['1929','Unilever','Lever Brothers and Margarine Unie combine.'],['1950s','Portfolio expansion','Unilever expands across food, home and personal care.'],['1957','Dove','Dove launches as a beauty bar and grows into a global brand.']],source:'https://en.wikipedia.org/wiki/Unilever'},
  {id:'visa',name:'Visa',year:1958,decade:1950,industry:'Fintech',founders:'Bank of America and member banks',summary:'A bank card experiment evolved into a global payment network connecting consumers, merchants and banks.',idea:'Create a scalable card-payment system that banks could offer to consumers and merchants.',firstProduct:'BankAmericard',firstProductNote:'The card program launched by Bank of America that became the foundation of Visa.',successProduct:'Visa network',successNote:'The global card network became Visa’s defining infrastructure product.',products:['Visa cards','Visa Debit','Visa Business','Visa Direct','Visa Token Service','VisaNet'],timeline:[['1958','BankAmericard','Bank of America launches a pioneering general-purpose credit card program.'],['1976','Visa name','The BankAmericard system adopts the Visa name.'],['2008','Visa IPO','Visa becomes a public company.'],['2010s','Digital payments','Visa expands tokenization and mobile payment infrastructure.']],source:'https://en.wikipedia.org/wiki/Visa_Inc.'},
  {id:'walmart',name:'Walmart',year:1962,decade:1960,industry:'Retail',founders:'Sam Walton',summary:'A discount-store experiment in small-town America grew into the world’s largest retail businesses.',idea:'Offer a wide selection at consistently low prices using efficient distribution and scale.',firstProduct:'Discount store',firstProductNote:'The first Walmart discount store opened in Rogers, Arkansas.',successProduct:'Everyday Low Prices',successNote:'The operating model itself became Walmart’s defining competitive product.',products:['Walmart stores','Walmart.com','Walmart+','Sam’s Club','Walmart Marketplace','Great Value'],timeline:[['1962','First Walmart','Sam Walton opens the first Walmart discount store.'],['1969','Incorporation','Wal-Mart Stores, Inc. is incorporated.'],['1983','Sam’s Club','The warehouse-club business launches.'],['1996','International','Walmart expands its global retail footprint.']],source:'https://en.wikipedia.org/wiki/Walmart'},
  {id:'xiaomi',name:'Xiaomi',year:2010,decade:2010,industry:'Technology',founders:'Lei Jun and co-founders',summary:'A software-first smartphone startup used online sales, community and aggressive pricing to build a global hardware brand.',idea:'Build high-spec consumer hardware around a software and internet-services ecosystem.',firstProduct:'MIUI',firstProductNote:'Xiaomi began with Android-based MIUI software before releasing phones.',successProduct:'Xiaomi smartphones',successNote:'The smartphone business became Xiaomi’s defining global hardware category.',products:['Xiaomi phones','Redmi','POCO','Xiaomi Pad','Xiaomi Watch','Xiaomi TV','Mi Home','SU7'],timeline:[['2010','Founded','Lei Jun and the founding team establish Xiaomi.'],['2010','MIUI','Xiaomi releases its first product, the MIUI Android interface.'],['2011','Mi 1','The first Xiaomi smartphone launches.'],['2024','SU7','Xiaomi enters electric vehicles with the SU7.']],source:'https://en.wikipedia.org/wiki/Xiaomi'},
  {id:'zoom',name:'Zoom',year:2011,decade:2010,industry:'Software',founders:'Eric Yuan',summary:'A former video-conferencing engineer built a simpler meeting product around reliability and a polished user experience.',idea:'Make video meetings easier to join, more reliable and more pleasant across devices.',firstProduct:'Zoom Meetings',firstProductNote:'The original cloud video-conferencing product.',successProduct:'Zoom Meetings',successNote:'Zoom Meetings became the company’s defining product during rapid remote-work adoption.',products:['Zoom Meetings','Zoom Phone','Zoom Rooms','Zoom Webinars','Zoom Events','Zoom Workplace','Zoom AI Companion'],timeline:[['2011','Founded','Eric Yuan starts Zoom after leaving Cisco.'],['2013','Launch','Zoom opens its video-meeting service to customers.'],['2019','IPO','Zoom becomes a public company.'],['2020','Global scale','Remote work drives extraordinary adoption of Zoom Meetings.']],source:'https://en.wikipedia.org/wiki/Zoom_Video_Communications'}
);

companies.sort((a,b) => a.name.localeCompare(b.name));
