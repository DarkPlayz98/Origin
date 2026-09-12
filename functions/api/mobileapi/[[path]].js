/* Origin MobileAPI.dev proxy for Cloudflare Pages Functions.
 * Required Pages secret: MOBILEAPI_KEY
 * The MobileAPI key never reaches the browser.
 */
const API = 'https://api.mobileapi.dev';
const PREFIX = '/api/mobileapi';

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

export async function onRequest(context) {
  const request = context.request;
  const origin = request.headers.get('Origin') || '*';
  const headers = cors(origin);

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== 'GET') {
    return json({ error: 'GET only' }, 405, headers);
  }

  const secret = String(context.env.MOBILEAPI_KEY || '').trim();
  if (!secret) {
    return json({
      error: 'MOBILEAPI_KEY is not configured in Cloudflare Pages Secrets.'
    }, 500, headers);
  }

  const incoming = new URL(request.url);
  if (!incoming.pathname.startsWith(PREFIX + '/devices')) {
    return json({ error: 'Only MobileAPI /devices endpoints are exposed.' }, 403, headers);
  }

  const upstreamPath = incoming.pathname.slice(PREFIX.length);
  const upstream = new URL(API + upstreamPath);
  upstream.search = incoming.search;

  let response;
  try {
    response = await fetch(upstream.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${secret}`
      }
    });
  } catch (error) {
    return json({
      error: 'Could not reach MobileAPI.dev.',
      detail: error?.message || 'upstream fetch failed'
    }, 502, headers);
  }

  const contentType = response.headers.get('content-type') || '';
  const bodyText = await response.text();

  if (!response.ok) {
    let detail = bodyText.slice(0, 1000);
    try {
      const parsed = JSON.parse(bodyText);
      detail = parsed?.detail || parsed?.error || parsed?.message || detail;
    } catch (_) {}

    return json({
      error: `MobileAPI.dev returned HTTP ${response.status}.`,
      status: response.status,
      detail,
      content_type: contentType || null
    }, response.status, headers);
  }

  let payload;
  try {
    payload = bodyText ? JSON.parse(bodyText) : {};
  } catch (_) {
    return json({
      error: 'MobileAPI.dev returned a successful response that was not valid JSON.',
      status: response.status,
      content_type: contentType || null,
      preview: bodyText.slice(0, 500)
    }, 502, headers);
  }

  return json(payload, response.status, headers);
}
