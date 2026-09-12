/* Origin AI presentation layer. Keeps AI output clean and ready for Origin's rich UI. */
(function () {
  const clean = text => String(text ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/^\s*#{1,6}\s+/gm, match => match.trimStart())
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const install = () => {
    const original = window.originAISummarize;
    if (typeof original !== 'function' || original.__originFormatted) return typeof original === 'function';
    const wrapped = async function (company) {
      return clean(await original(company));
    };
    wrapped.__originFormatted = true;
    window.originAISummarize = wrapped;
    return true;
  };

  if (!install()) {
    const timer = setInterval(() => { if (install()) clearInterval(timer); }, 50);
    setTimeout(() => clearInterval(timer), 10000);
  }
})();
