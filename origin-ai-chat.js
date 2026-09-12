/* Origin AI V2 chat: full-page conversational UI, contextual questions, and real client-side typing. */
(function () {
  'use strict';

  const esc = value => String(value ?? '').replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));

  function companyFromPage() {
    const page = document.querySelector('#companyPage:not([hidden])');
    if (!page) return null;
    const text = selector => page.querySelector(selector)?.textContent?.trim() || '';
    return {
      name: text('.company-hero-copy h1'),
      year: text('.company-hero-meta b'),
      industry: text('.company-hero-section .section-eyebrow'),
      summary: text('.company-hero-deck'),
      idea: text('.origin-flow-card h2'),
      firstProduct: page.querySelector('.product-flow-card h2')?.textContent?.trim() || '',
      breakthrough: page.querySelector('.success-flow-card h2')?.textContent?.trim() || ''
    };
  }

  function buildContext(company) {
    return `You are Origin AI, the research assistant inside Origin, a company-origin platform. Answer the user's question specifically about ${company.name}. Use the provided company context as your starting point. Do not invent facts. When the context is insufficient, clearly say that the answer is not in Origin's stored story and answer cautiously. Use clean Markdown headings, bold emphasis, and bullet points. Never output raw heading markers like ###; use simple headings without Markdown # characters.\n\nCOMPANY CONTEXT\nCompany: ${company.name}\nFounded: ${company.year}\nIndustry: ${company.industry}\nSummary: ${company.summary}\nOriginal idea: ${company.idea}\nFirst product: ${company.firstProduct}\nBreakthrough: ${company.breakthrough}`;
  }

  function formatAssistant(text) {
    const raw = String(text || '').replace(/\r\n/g, '\n').trim();
    if (!raw) return '<p>No response returned.</p>';
    const lines = raw.split('\n');
    const out = [];
    let list = false;
    const close = () => { if (list) { out.push('</ul>'); list = false; } };
    const inline = value => esc(value)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
    for (const line of lines) {
      const s = line.trim();
      if (!s) { close(); continue; }
      const heading = s.replace(/^#{1,6}\s+/, '');
      if (heading !== s || (/^[A-Z][A-Z0-9 &'’\-]{2,40}$/.test(s) && s.length < 44)) {
        close(); out.push(`<h3>${inline(heading)}</h3>`); continue;
      }
      if (/^[-*•]\s+/.test(s)) {
        if (!list) { out.push('<ul>'); list = true; }
        out.push(`<li>${inline(s.replace(/^[-*•]\s+/, ''))}</li>`); continue;
      }
      close(); out.push(`<p>${inline(s)}</p>`);
    }
    close();
    return out.join('');
  }

  function typeText(element, text, done) {
    const value = String(text || '');
    element.innerHTML = '<span class="origin-raw-typing"></span>';
    const target = element.firstElementChild;
    let index = 0;
    const speed = value.length > 1800 ? 4 : value.length > 900 ? 7 : 10;
    const tick = () => {
      target.textContent = value.slice(0, index++);
      element.classList.add('origin-chat-typing');
      if (index <= value.length) requestAnimationFrame(() => setTimeout(tick, speed));
      else {
        element.classList.remove('origin-chat-typing');
        element.innerHTML = formatAssistant(value);
        done?.();
      }
    };
    tick();
  }

  function makeLogo() {
    return '<span class="origin-chat-logo" aria-hidden="true">O</span>';
  }

  function createChat(company) {
    const old = document.getElementById('originAiChat');
    if (old) old.remove();
    const host = document.createElement('section');
    host.id = 'originAiChat';
    host.className = 'origin-ai-chat';
    host.innerHTML = `
      <div class="origin-chat-shell">
        <header class="origin-chat-header">
          <div class="origin-chat-brand">${makeLogo()}<div><strong>Origin AI</strong><span>Ask anything about ${esc(company.name)}</span></div></div>
          <button class="origin-chat-close" type="button" aria-label="Close Origin AI">×</button>
        </header>
        <div class="origin-chat-content">
          <div class="origin-chat-intro"><div class="origin-chat-kicker">ORIGIN AI · CONVERSATION</div><h2>Understand the beginning.<br><em>Then ask why.</em></h2><p>Ask follow-up questions about the founders, first products, turning points, strategy, or anything else around this company's story.</p></div>
          <div class="origin-chat-suggestions">
            <button type="button" data-question="Who founded the company and what problem were they trying to solve?">Who were the founders?</button>
            <button type="button" data-question="Why was the first product important to the company?">Why did the first product matter?</button>
            <button type="button" data-question="What was the biggest turning point in the early years?">What changed everything?</button>
            <button type="button" data-question="What can a founder learn from this company's earliest days?">What can founders learn?</button>
          </div>
          <div class="origin-chat-messages" aria-live="polite"></div>
        </div>
        <form class="origin-chat-composer">
          <textarea aria-label="Ask Origin AI" rows="1" placeholder="Ask Origin AI anything…"></textarea>
          <button type="submit" aria-label="Send question">↑</button>
        </form>
      </div>`;
    document.body.appendChild(host);

    const messages = host.querySelector('.origin-chat-messages');
    const input = host.querySelector('textarea');
    const form = host.querySelector('form');
    const close = () => { host.classList.remove('is-open'); document.body.classList.remove('origin-ai-open'); setTimeout(() => host.remove(), 180); };
    host.querySelector('.origin-chat-close').addEventListener('click', close);
    host.addEventListener('click', e => { if (e.target === host) close(); });

    const addMessage = (role, text, typing = false) => {
      const row = document.createElement('article');
      row.className = `origin-chat-message ${role}`;
      row.innerHTML = role === 'assistant' ? `${makeLogo()}<div class="origin-chat-bubble"></div>` : `<div class="origin-chat-bubble"></div>`;
      const bubble = row.querySelector('.origin-chat-bubble');
      messages.appendChild(row);
      if (typing) typeText(bubble, text); else bubble.innerHTML = formatAssistant(text);
      requestAnimationFrame(() => { messages.scrollTop = messages.scrollHeight; });
      return row;
    };

    let busy = false;
    async function ask(question) {
      const q = String(question || '').trim();
      if (!q || busy) return;
      busy = true;
      host.classList.add('busy');
      input.value = '';
      input.style.height = 'auto';
      addMessage('user', q);
      const loading = addMessage('assistant', 'Thinking…', false);
      const loadingBubble = loading.querySelector('.origin-chat-bubble');
      loadingBubble.innerHTML = '<span class="origin-chat-dots"><i></i><i></i><i></i></span>';
      try {
        if (!window.crystalAI || typeof window.crystalAI.chat !== 'function') throw new Error('Origin AI is unavailable right now.');
        const answer = await window.crystalAI.chat(`${buildContext(company)}\n\nCONVERSATION\n${Array.from(messages.querySelectorAll('.origin-chat-message.user')).slice(-8).map(n => n.textContent.trim()).join('\n')}\n\nCURRENT QUESTION\n${q}`, { maxTokens: 1800, temperature: 0.45 });
        loading.remove();
        addMessage('assistant', answer, true);
      } catch (error) {
        loadingBubble.innerHTML = `<strong>Origin AI couldn't answer that.</strong><p>${esc(error?.message || 'Please try again.')}</p>`;
      } finally {
        busy = false;
        host.classList.remove('busy');
        input.focus();
      }
    }

    host.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => ask(button.dataset.question)));
    form.addEventListener('submit', e => { e.preventDefault(); ask(input.value); });
    input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 140) + 'px'; });
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } });
    requestAnimationFrame(() => { host.classList.add('is-open'); input.focus(); });
    return { close };
  }

  function install() {
    const button = document.querySelector('#aiSummaryBtn');
    const page = document.querySelector('#companyPage:not([hidden])');
    if (!button || !page || button.dataset.originChatInstalled) return;
    button.dataset.originChatInstalled = '1';
    const replacement = button.cloneNode(true);
    replacement.id = 'originAskAiBtn';
    replacement.innerHTML = 'Open Origin AI <span>✦</span>';
    button.replaceWith(replacement);
    replacement.addEventListener('click', () => {
      const company = companyFromPage();
      if (company?.name) createChat(company);
    });
  }

  const style = document.createElement('style');
  style.textContent = `
    .origin-ai-open{overflow:hidden}
    .origin-ai-chat{position:fixed;inset:0;z-index:1000;background:rgba(17,17,17,.5);backdrop-filter:blur(14px);opacity:0;transition:opacity .18s ease}
    .origin-ai-chat.is-open{opacity:1}
    .origin-chat-shell{position:absolute;inset:0;background:#f7f7f5;display:grid;grid-template-rows:auto 1fr auto;transform:translateY(24px);transition:transform .24s cubic-bezier(.2,.8,.2,1)}
    .origin-ai-chat.is-open .origin-chat-shell{transform:none}
    .origin-chat-header{height:72px;padding:0 28px;border-bottom:1px solid #deded9;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:space-between}
    .origin-chat-brand{display:flex;align-items:center;gap:12px}.origin-chat-brand>div{display:grid;gap:2px}.origin-chat-brand strong{font-size:15px}.origin-chat-brand span{font-size:11px;color:#83837d}
    .origin-chat-logo{width:34px;height:34px;border-radius:10px;background:#111;color:#fff;display:grid;place-items:center;font-size:16px;font-weight:850;flex:0 0 auto}
    .origin-chat-close{width:40px;height:40px;border:1px solid #deded9;background:#fff;border-radius:50%;font-size:24px;cursor:pointer}
    .origin-chat-content{overflow:auto;padding:44px 22px 34px}.origin-chat-content>*{max-width:820px;margin-left:auto;margin-right:auto}
    .origin-chat-intro{padding-top:18px}.origin-chat-kicker{font-size:10px;font-weight:850;letter-spacing:.14em;color:#6d5dfc}.origin-chat-intro h2{font-size:clamp(38px,7vw,72px);line-height:.98;letter-spacing:-.055em;margin:14px 0 18px;color:#111}.origin-chat-intro h2 em{font-style:normal;color:#777772}.origin-chat-intro p{max-width:650px;color:#6e6e6a;font-size:15px;line-height:1.7}
    .origin-chat-suggestions{display:flex;flex-wrap:wrap;gap:8px;margin-top:26px}.origin-chat-suggestions button{border:1px solid #deded9;background:#fff;border-radius:999px;padding:10px 13px;font-size:12px;cursor:pointer;transition:.18s}.origin-chat-suggestions button:hover{border-color:#bdb8ff;transform:translateY(-1px)}
    .origin-chat-messages{display:grid;gap:20px;margin-top:30px;padding-bottom:12px}.origin-chat-message{display:flex;gap:11px;align-items:flex-start}.origin-chat-message.user{justify-content:flex-end}.origin-chat-message.user .origin-chat-bubble{background:#111;color:#fff}.origin-chat-message.assistant .origin-chat-bubble{background:#fff;border:1px solid #deded9;color:#4f4f4a}.origin-chat-bubble{max-width:min(740px,86%);padding:15px 17px;border-radius:18px;font-size:15px;line-height:1.7;box-shadow:0 10px 30px rgba(17,17,17,.04)}.origin-chat-bubble h3{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#6d5dfc;margin:4px 0 9px}.origin-chat-bubble p{margin:0 0 12px}.origin-chat-bubble p:last-child{margin-bottom:0}.origin-chat-bubble ul{margin:7px 0 13px;padding-left:20px}.origin-chat-bubble li{margin:4px 0}.origin-chat-bubble strong{color:#111;font-weight:760}.origin-chat-message.user .origin-chat-bubble strong{color:#fff}.origin-chat-bubble code{background:#f0f0ed;padding:2px 5px;border-radius:5px;font-size:.9em}.origin-chat-message.user .origin-chat-bubble code{background:#333}
    .origin-chat-composer{border-top:1px solid #deded9;background:rgba(255,255,255,.94);padding:14px 22px 18px;display:flex;gap:10px;align-items:flex-end}.origin-chat-composer textarea{flex:1;resize:none;border:1px solid #d8d8d2;border-radius:18px;padding:14px 16px;background:#fff;font:inherit;font-size:14px;line-height:1.45;outline:none;max-height:140px;box-shadow:0 8px 24px rgba(17,17,17,.04)}.origin-chat-composer textarea:focus{border-color:#bdb8ff;box-shadow:0 0 0 4px #ebe8ff}.origin-chat-composer button{width:48px;height:48px;border:0;border-radius:50%;background:#111;color:#fff;font-size:20px;cursor:pointer}.origin-chat-composer button:disabled{opacity:.4}.origin-chat-dots{display:inline-flex;gap:4px}.origin-chat-dots i{width:6px;height:6px;border-radius:50%;background:#8d8d87;animation:originDot 1s infinite}.origin-chat-dots i:nth-child(2){animation-delay:.15s}.origin-chat-dots i:nth-child(3){animation-delay:.3s}@keyframes originDot{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-4px);opacity:1}}
    .origin-chat-typing .origin-raw-typing:after{content:' ';display:inline-block;width:2px;height:1.05em;vertical-align:-.15em;margin-left:3px;background:currentColor;animation:originTypeCursor .7s steps(1) infinite}@keyframes originTypeCursor{0%,49%{opacity:1}50%,100%{opacity:0}}
    @media(max-width:700px){.origin-chat-header{height:64px;padding:0 16px}.origin-chat-content{padding:30px 15px 24px}.origin-chat-intro h2{font-size:42px}.origin-chat-bubble{max-width:92%;font-size:14px}.origin-chat-composer{padding:10px 12px 12px}.origin-chat-suggestions{overflow:auto;flex-wrap:nowrap;margin-right:-15px;padding-right:15px}.origin-chat-suggestions button{white-space:nowrap}}
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(install);
  observer.observe(document.body, { childList:true, subtree:true });
  install();
})();
