/* Origin MobileAPI routing layer.
 * Keeps the existing product engine compatible while moving the API proxy
 * from the standalone Worker to the same-origin Cloudflare Pages Function.
 */
(function () {
  'use strict';

  const OLD_WORKER = 'https://origin-mobileapi.srishankjashankreddy.workers.dev';
  const PAGES_PROXY = '/api/mobileapi';
  const nativeFetch = window.fetch.bind(window);

  window.fetch = function (input, init) {
    try {
      const raw = typeof input === 'string' ? input : input?.url;
      if (raw && raw.startsWith(OLD_WORKER)) {
        const target = new URL(raw);
        target.pathname = PAGES_PROXY + target.pathname;
        return nativeFetch(target.toString(), init);
      }
    } catch (_) {}
    return nativeFetch(input, init);
  };
})();
