/* Origin GSMArena fallback provider for Cloudflare Pages Functions.
 * Unofficial: reads public GSMArena pages through server-side fetches.
 * No GSMArena API key is required.
 */
const BASE = 'https://www.gsmarena.com';

const cors = (origin) => ({
  'Access-Control-Allow-Origin': origin || '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Cache-Control': 'public, max-age=300',
  'Vary': 'Origin'
});

const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' }
});

const clean = (s) => String(s || '').replace(/\s+/g, ' ').trim();
const strip = (s) => clean(String(s || '').replace(/<[^>]*>/g, ' '));
const decode = (s) => String(s || '')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

function parseSearch(html) {
  const out = [];
  const re = /<a[^>]+href="([^"]*?-\d+\.php)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) && out.length < 50) {
    const name = decode(strip(m[2]));
    if (!name || /^(home|phones|news|reviews|compare)$/i.test(name)) continue;
    out.push({ name, slug: m[1].replace(/^\//, ''), source: 'GSMArena' });
  }
  return out;
}

function parseSpec(html, slug) {
  const title = decode(clean((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [,''])[1]));
  const image = decode((html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i) || [,''])[1]);
  const specs = [];
  const tableRe = /<tr[^>]*>[\s\S]*?<td[^>]*class="ttl"[^>]*>([\s\S]*?)<\/td>[\s\S]*?<td[^>]*class="nfo"[^>]*>([\s\S]*?)<\/td>[\s\S]*?<\/tr>/gi;
  let m;
  while ((m = tableRe.exec(html)) && specs.length < 300) {
    const key = decode(strip(m[1]));
    const value = decode(strip(m[2]));
    if (key && value) specs.push([key, value]);
  }
  return {
    name: title || slug.replace(/\.php$/i, '').replace(/_/g, ' '),
    source: 'GSMArena',
    source_url: `${BASE}/${slug}`,
    image,
    specifications: specs
  };
}

async function get(url) {
  return fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; OriginPhoneSpecs/1.0)',
      'Accept': 'text/html,application/xhtml+xml'
    },
    cf: { cacheTtl: 300, cacheEverything: true }
  });
}

export async function onRequest(context) {
  const origin = context.request.headers.get('Origin') || '*';
  const headers = cors(origin);
  if (context.request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (context.request.method !== 'GET') return json({ error: 'GET only' }, 405, headers);

  const url = new URL(context.request.url);
  const route = url.pathname.replace(/^\/api\/gsmarena\/?/, '');
  if (!route) return json({ error: 'Missing GSMArena route.' }, 400, headers);

  try {
    if (route === 'search') {
      const q = clean(url.searchParams.get('q') || url.searchParams.get('name'));
      if (!q) return json({ error: 'Missing q parameter.' }, 400, headers);
      const page = await get(`${BASE}/res.php3?sQuickSearch=yes&sName=${encodeURIComponent(q)}`);
      const html = await page.text();
      if (!page.ok) return json({ error: `GSMArena returned HTTP ${page.status}.` }, page.status, headers);
      return json({ results: parseSearch(html), source: 'GSMArena' }, 200, headers);
    }

    if (route === 'device') {
      const slug = url.searchParams.get('slug');
      if (!slug || !/^[a-z0-9_.-]+\.php$/i.test(slug)) return json({ error: 'Invalid GSMArena slug.' }, 400, headers);
      const page = await get(`${BASE}/${slug}`);
      const html = await page.text();
      if (!page.ok) return json({ error: `GSMArena returned HTTP ${page.status}.` }, page.status, headers);
      return json(parseSpec(html, slug), 200, headers);
    }

    return json({ error: 'Supported routes: /search?q=..., /device?slug=...' }, 404, headers);
  } catch (error) {
    return json({ error: 'GSMArena fallback failed.', detail: error?.message || 'unknown error' }, 502, headers);
  }
}
