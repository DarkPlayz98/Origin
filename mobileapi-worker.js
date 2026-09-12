/* Origin MobileAPI Proxy — deploy this as a Cloudflare Worker.
 * Secret required: MOBILEAPI_KEY
 * The key never reaches the browser.
 */
const API = 'https://api.mobileapi.dev';
const ALLOWED = /^\/devices(?:\/|$)/;

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '*';
    const headers = cors(origin);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'GET') return new Response(JSON.stringify({ error: 'GET only' }), { status: 405, headers: { ...headers, 'Content-Type':'application/json' } });
    if (!env.MOBILEAPI_KEY) return new Response(JSON.stringify({ error: 'MOBILEAPI_KEY secret is not configured on this Worker.' }), { status: 500, headers: { ...headers, 'Content-Type':'application/json' } });

    const incoming = new URL(request.url);
    if (!ALLOWED.test(incoming.pathname)) return new Response(JSON.stringify({ error:'Only MobileAPI /devices endpoints are exposed.' }), { status: 403, headers:{...headers,'Content-Type':'application/json'} });

    const upstream = new URL(API + incoming.pathname);
    upstream.search = incoming.search;

    const upstreamResponse = await fetch(upstream.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${env.MOBILEAPI_KEY}`
      }
    });

    const responseHeaders = new Headers(upstreamResponse.headers);
    Object.entries(headers).forEach(([k,v]) => responseHeaders.set(k,v));
    responseHeaders.set('Content-Type','application/json; charset=utf-8');
    responseHeaders.delete('Set-Cookie');

    return new Response(upstreamResponse.body, { status: upstreamResponse.status, statusText: upstreamResponse.statusText, headers: responseHeaders });
  }
};
