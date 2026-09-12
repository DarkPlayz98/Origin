/* Origin MobileAPI Proxy — Cloudflare Worker
 * Secret required: MOBILEAPI_KEY
 * The MobileAPI key never reaches the browser.
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

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '*';
    const headers = cors(origin);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'GET') return json({ error: 'GET only' }, 405, headers);

    const secret = String(env.MOBILEAPI_KEY || '').trim();
    if (!secret) return json({ error: 'MOBILEAPI_KEY secret is not configured on this Worker.' }, 500, headers);

    const incoming = new URL(request.url);
    if (!ALLOWED.test(incoming.pathname)) {
      return json({ error: 'Only MobileAPI /devices endpoints are exposed.' }, 403, headers);
    }

    const upstream = new URL(API + incoming.pathname);
    upstream.search = incoming.search;

    let upstreamResponse;
    try {
      upstreamResponse = await fetch(upstream.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${secret}`
        }
      });
    } catch (error) {
      return json({ error: 'Could not reach MobileAPI.dev.', detail: error?.message || 'upstream fetch failed' }, 502, headers);
    }

    const contentType = upstreamResponse.headers.get('content-type') || '';
    const bodyText = await upstreamResponse.text();

    if (!upstreamResponse.ok) {
      let detail = bodyText;
      try {
        const parsed = JSON.parse(bodyText);
        detail = parsed?.detail || parsed?.error || parsed?.message || parsed;
      } catch (_) {}
      return json({
        error: `MobileAPI.dev returned HTTP ${upstreamResponse.status}.`,
        status: upstreamResponse.status,
        detail,
        content_type: contentType || null
      }, upstreamResponse.status, headers);
    }

    let payload;
    try {
      payload = bodyText ? JSON.parse(bodyText) : {};
    } catch (_) {
      return json({
        error: 'MobileAPI.dev returned a successful response that was not valid JSON.',
        status: upstreamResponse.status,
        content_type: contentType || null,
        preview: bodyText.slice(0, 500)
      }, 502, headers);
    }

    return json(payload, upstreamResponse.status, headers);
  }
};
