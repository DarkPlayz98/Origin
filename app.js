const companies = [
  {
    id: 'apple', name: 'Apple', year: 1976, decade: 1970, industry: 'Technology', founders: 'Steve Jobs, Steve Wozniak, Ronald Wayne',
    summary: 'A homebrew computer, a garage-era partnership, and a new company built around making computers personal.',
    idea: 'Build and sell an assembled personal computer simple enough for people to use at home, starting with the Apple I.',
    timeline: [
      ['1975', 'The Homebrew Computer Club', 'Steve Wozniak begins showing his self-built computer at the club in Silicon Valley.'],
      ['1976', 'Apple Computer is formed', 'Jobs, Wozniak and Wayne establish the company and begin selling the Apple I.'],
      ['1977', 'Apple II arrives', 'The Apple II turns the early hobbyist project into a much bigger commercial proposition.'],
    ],
    source: 'https://www.apple.com/newsroom/2026/04/apple-celebrates-50-years/'
  },
  {
    id: 'microsoft', name: 'Microsoft', year: 1975, decade: 1970, industry: 'Software', founders: 'Bill Gates, Paul Allen',
    summary: 'A magazine cover, a BASIC interpreter, and a tiny software company built around the coming personal-computer wave.',
    idea: 'Create software for the new microcomputer revolution, beginning with a BASIC interpreter for the Altair 8800.',
    timeline: [
      ['1975', 'Altair BASIC', 'Gates and Allen develop a BASIC interpreter and license it to MITS for the Altair 8800.'],
      ['1975', 'Microsoft begins', 'The partnership adopts the Microsoft name and starts building a software business.'],
      ['1976', 'The company formalizes', 'Microsoft continues its focus on software rather than hardware as the PC market grows.'],
    ],
    source: 'https://news.microsoft.com/announcement/microsoft-40th-anniversary/'
  },
  {
    id: 'nike', name: 'Nike', year: 1964, decade: 1960, industry: 'Consumer', founders: 'Phil Knight, Bill Bowerman',
    summary: 'Running shoes, a station wagon trunk, and a small athletic-shoe operation that slowly became a global brand.',
    idea: 'Bring better, athlete-focused running shoes to the U.S. market through an early company originally called Blue Ribbon Sports.',
    timeline: [
      ['1964', 'Blue Ribbon Sports', 'Knight and Bowerman start importing Japanese running shoes and selling them at track meets.'],
      ['1967', 'First store', 'The company opens its first retail location in Santa Monica, California.'],
      ['1971', 'Nike is born', 'The Nike name and Swoosh emerge as the company shifts toward its own footwear line.'],
    ],
    source: 'https://about.nike.com/en/company.html'
  },
  {
    id: 'amazon', name: 'Amazon', year: 1994, decade: 1990, industry: 'Commerce', founders: 'Jeff Bezos',
    summary: 'A long list of fast-growing internet ideas, reduced to one: start with books, then build the store for almost everything.',
    idea: 'Use the internet to build a scalable store, starting with books because millions of titles could not fit in a physical shop.',
    timeline: [
      ['1994', 'The business starts', 'Bezos leaves his job and starts Amazon as an online bookstore.'],
      ['1995', 'Books go live', 'Amazon launches publicly from a Bellevue-area garage and home office.'],
      ['1996', 'Early growth', 'The catalog, customer base and team expand rapidly as online shopping gains traction.'],
    ],
    source: 'https://www.aboutamazon.com/news/company-news/amazon-30-years'
  },
  {
    id: 'google', name: 'Google', year: 1998, decade: 1990, industry: 'Search', founders: 'Larry Page, Sergey Brin',
    summary: 'Two Stanford researchers, a new way to rank pages, and a search engine that grew out of a research project.',
    idea: 'Improve web search by ranking pages partly according to the links and authority connected to them — the foundation of PageRank.',
    timeline: [
      ['1996', 'BackRub', 'Page and Brin collaborate on a Stanford research project that explores the structure of the web.'],
      ['1997', 'Google.com', 'The pair register the Google domain as the search project takes a new identity.'],
      ['1998', 'Google is incorporated', 'The company is formally incorporated and starts operating beyond the university project.'],
    ],
    source: 'https://about.google/intl/en_us/company-info/our-story/'
  },
  {
    id: 'netflix', name: 'Netflix', year: 1997, decade: 1990, industry: 'Entertainment', founders: 'Reed Hastings, Marc Randolph',
    summary: 'A DVD in an envelope, a late fee problem, and a subscription model that rethought how movies reached people.',
    idea: 'Make movie rental more convenient through the internet, first using DVDs sent by mail and later moving toward subscriptions.',
    timeline: [
      ['1997', 'Netflix starts', 'Hastings and Randolph establish the company and test DVD-by-mail logistics.'],
      ['1998', 'DVD rental site', 'Netflix launches with a large online catalog and a mail-based rental model.'],
      ['1999', 'Subscription model', 'A monthly subscription replaces the traditional per-rental structure and changes the economics.'],
    ],
    source: 'https://about.netflix.com/en/company'
  },
  {
    id: 'airbnb', name: 'Airbnb', year: 2007, decade: 2000, industry: 'Travel', founders: 'Brian Chesky, Joe Gebbia, Nathan Blecharczyk',
    summary: 'Three roommates, a sold-out design conference, and three air mattresses turned into an experiment in belonging anywhere.',
    idea: 'Help visitors find a simple place to stay when hotels were full, beginning with an air-mattress-based short stay in San Francisco.',
    timeline: [
      ['2007', 'Air beds for guests', 'Chesky and Gebbia host visitors in their apartment during a busy design conference.'],
      ['2008', 'AirBed & Breakfast', 'The service is launched around short-term stays and a growing host community.'],
      ['2009', 'YC and focus', 'The company joins Y Combinator and focuses tightly on getting listings, photos and trust right.'],
      ['2010', 'First major scale', 'The marketplace expands quickly beyond its San Francisco origins.'],
    ],
    source: 'https://news.airbnb.com/about-us/'
  },
  {
    id: 'figma', name: 'Figma', year: 2012, decade: 2010, industry: 'Design', founders: 'Dylan Field, Evan Wallace',
    summary: 'A contrarian bet that professional design tools could live in the browser — and that collaboration could be the default.',
    idea: 'Build a powerful graphics and interface-design tool that runs in the browser, making collaboration immediate rather than an add-on.',
    timeline: [
      ['2012', 'Company begins', 'Field and Wallace start working on a collaborative graphics editor for the web.'],
      ['2015', 'Figma launches', 'The first public product reaches designers as a browser-native design tool.'],
      ['2016', 'Team workflows', 'Figma doubles down on multiplayer collaboration and shared files for product teams.'],
    ],
    source: 'https://www.figma.com/about/'
  }
];

const els = {
  grid: document.getElementById('companyGrid'),
  count: document.getElementById('resultCount'),
  search: document.getElementById('searchInput'),
  decade: document.getElementById('decadeFilter'),
  industries: document.getElementById('industryFilters'),
  empty: document.getElementById('emptyState'),
  clear: document.getElementById('clearFilters'),
  modal: document.getElementById('storyModal'),
  storyTitle: document.getElementById('storyTitle'),
  storyNumber: document.getElementById('storyNumber'),
  storyIndustry: document.getElementById('storyIndustry'),
  storyDeck: document.getElementById('storyDeck'),
  storyStats: document.getElementById('storyStats'),
  storyOriginalIdea: document.getElementById('storyOriginalIdea'),
  storyTimeline: document.getElementById('storyTimeline'),
  storySource: document.getElementById('storySource'),
  featuredTitle: document.getElementById('featuredTitle'),
  featuredSummary: document.getElementById('featuredSummary'),
  featuredYear: document.getElementById('featuredYear'),
  featuredTag: document.getElementById('featuredTag'),
  featuredLink: document.getElementById('featuredLink'),
  surprise: document.getElementById('surpriseBtn')
};

const state = { search: '', industry: 'All', decade: 'all' };
const industries = ['All', ...new Set(companies.map(c => c.industry))];

function normalize(value) { return value.toLowerCase().trim(); }

function initFilters() {
  els.industries.innerHTML = industries.map(industry => `
    <button type="button" class="filter-chip ${industry === 'All' ? 'active' : ''}" data-industry="${industry}">${industry}</button>
  `).join('');

  els.industries.addEventListener('click', (event) => {
    const button = event.target.closest('[data-industry]');
    if (!button) return;
    state.industry = button.dataset.industry;
    [...els.industries.querySelectorAll('.filter-chip')].forEach(el => el.classList.toggle('active', el === button));
    render();
  });
}

function filteredCompanies() {
  const q = normalize(state.search);
  return companies.filter(c => {
    const haystack = normalize([c.name, c.industry, c.founders, c.summary].join(' '));
    const matchesSearch = !q || haystack.includes(q);
    const matchesIndustry = state.industry === 'All' || c.industry === state.industry;
    const matchesDecade = state.decade === 'all' || String(c.decade) === state.decade;
    return matchesSearch && matchesIndustry && matchesDecade;
  });
}

function render() {
  const items = filteredCompanies();
  els.count.textContent = `${items.length} ${items.length === 1 ? 'story' : 'stories'}`;
  els.grid.innerHTML = items.map((c, index) => `
    <a class="company-card" href="#company/${c.id}" aria-label="Read ${c.name} origin story">
      <div>
        <div class="company-top"><span class="company-year">${c.year}</span><span class="company-industry">${c.industry}</span></div>
        <h3>${c.name}</h3>
        <p>${c.summary}</p>
      </div>
      <div class="card-footer"><span class="founders">Built by ${c.founders}</span><span class="card-arrow">↗</span></div>
    </a>
  `).join('');
  els.empty.hidden = items.length !== 0;
}

function openStory(id) {
  const company = companies.find(c => c.id === id);
  if (!company) return;

  els.storyNumber.textContent = String(companies.indexOf(company) + 1).padStart(2, '0');
  els.storyIndustry.textContent = `${company.industry} · ${company.year}`;
  els.storyTitle.textContent = company.name;
  els.storyDeck.textContent = company.summary;
  els.storyStats.innerHTML = `
    <div class="stat"><span class="stat-label">Founded</span><span class="stat-value">${company.year}</span></div>
    <div class="stat"><span class="stat-label">Founders</span><span class="stat-value">${company.founders}</span></div>
    <div class="stat"><span class="stat-label">Industry</span><span class="stat-value">${company.industry}</span></div>
  `;
  els.storyOriginalIdea.textContent = company.idea;
  els.storyTimeline.innerHTML = company.timeline.map(([year, title, copy]) => `
    <div class="timeline-item"><div class="timeline-year">${year}</div><div class="timeline-title">${title}</div><p class="timeline-copy">${copy}</p></div>
  `).join('');
  els.storySource.innerHTML = `Source links: <a href="${company.source}" target="_blank" rel="noreferrer">official company history ↗</a>`;

  els.modal.classList.add('open');
  els.modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  history.replaceState(null, '', `#company/${company.id}`);
}

function closeStory() {
  els.modal.classList.remove('open');
  els.modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (location.hash.startsWith('#company/')) history.replaceState(null, '', '#explore');
}

function route() {
  const hash = location.hash;
  if (hash.startsWith('#company/')) {
    openStory(hash.split('/')[1]);
  } else if (els.modal.classList.contains('open')) {
    closeStory();
  }
}

els.search.addEventListener('input', (e) => { state.search = e.target.value; render(); });
els.decade.addEventListener('change', (e) => { state.decade = e.target.value; render(); });
els.clear.addEventListener('click', () => {
  state.search = ''; state.industry = 'All'; state.decade = 'all';
  els.search.value = ''; els.decade.value = 'all';
  [...els.industries.querySelectorAll('.filter-chip')].forEach(el => el.classList.toggle('active', el.dataset.industry === 'All'));
  render();
});

document.addEventListener('click', (event) => {
  if (event.target.matches('[data-close]')) closeStory();
  const card = event.target.closest('.company-card');
  if (card) {
    event.preventDefault();
    openStory(card.getAttribute('href').split('/')[1]);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== els.search) { event.preventDefault(); els.search.focus(); }
  if (event.key === 'Escape' && els.modal.classList.contains('open')) closeStory();
});

els.surprise.addEventListener('click', () => {
  const company = companies[Math.floor(Math.random() * companies.length)];
  openStory(company.id);
});

document.getElementById('featuredCard')?.addEventListener('click', () => openStory('airbnb'));

initFilters();
render();
route();
window.addEventListener('hashchange', route);
