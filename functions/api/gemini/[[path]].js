/* Origin Gemini phone-spec provider.
 * Required Cloudflare Pages secret: GEMINI_API_KEY
 * Gemini is the only active live phone provider.
 * Uses Google Search grounding + structured JSON so the browser receives data,
 * not a conversational answer.
 */
const API = 'https://generativelanguage.googleapis.com/v1beta2/interactions';
const MODEL = 'gemini-3.8-flash';
const PREFIX = '/api/gemini';

const CORS = origin => ({
  'Access-Control-Allow-Origin': origin || '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Max-Age': '86400',
  'Cache-Control': 'no-store',
  'Vary': 'Origin'
});

const json = (body, status, headers) => new Response(JSON.stringify(body), {
  status,
  headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' }
});

const schema = {
  type: 'object',
  properties: {
    found: { type: 'boolean' },
    name: { type: 'string' },
    brand: { type: 'string' },
    release_date: { type: 'string' },
    status: { type: 'string' },
    image_url: { type: 'string' },
    source_url: { type: 'string' },
    summary: { type: 'string' },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          rows: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                value: { type: 'string' }
              },
              required: ['label', 'value']
            }
          }
        },
        required: ['title', 'rows']
      }
    },
    sources: {
      type: 'array',
      items: { type: 'string' }
    }
  },
  required: ['found', 'name', 'brand', 'release_date', 'status', 'image_url', 'source_url', 'summary', 'sections', 'sources']
};

const systemInstruction = [
  'You are Origin Phone Specs, a data extraction service.',
  'Use Google Search to find current, reliable information for the exact phone the user requested.',
  'Prefer manufacturer sources and reputable technical specification sources. Cross-check important fields when possible.',
  'Return ONLY the JSON object required by the schema. Never return markdown, headings, explanations, greetings, or prose outside the JSON.',
  'Do not guess. Use an empty string when a field cannot be verified.',
  'For sections, organize useful phone specifications into concise groups such as Network, Body, Display, Platform, Memory, Main Camera, Selfie Camera, Sound, Connectivity, Features, Battery, Software, and Pricing/Availability.',
  'Only mark found=true when the requested product is confidently identified as a phone.',
  'sources must contain direct URLs used as evidence when available.'
].join(' ');

function textFromInteraction(payload) {
  if (typeof payload?.output_text === 'string') return payload.output_text;
  const outputs = Array.isArray(payload?.outputs) ? payload.outputs : [];
  for (let i = outputs.length - 1; i >= 0; i--) {
    const out = outputs[i];
    if (typeof out?.text === 'string') return out.text;
    const content = Array.isArray(out?.content) ? out.content : [];
    const text = content.find(x => x?.type === 'text' && typeof x.text === 'string');
    if (text) return text.text;
  }
  const steps = Array.isArray(payload?.steps) ? payload.steps : [];
  for (let i = steps.length - 1; i >= 0; i--) {
    const content = Array.isArray(steps[i]?.content) ? steps[i].content : [];
    for (let j = content.length - 1; j >= 0; j--) {
      const item = content[j];
      if (item && typeof item.text === 'string') return item.text;
    }
  }
  return '';
}

function parseJson(text) {
  const raw = String(text || '').trim();
  try { return JSON.parse(raw); } catch (_) {}
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced) {
    try { return JSON.parse(fenced[1]); } catch (_) {}
  }
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start >= 0 && end > start) return JSON.parse(raw.slice(start, end + 1));
  throw new Error('Gemini did not return valid structured JSON.');
}

function sanitize(data) {
  return {
    found: Boolean(data?.found),
    name: String(data?.name || ''),
    brand: String(data?.brand || ''),
    release_date: String(data?.release_date || ''),
    status: String(data?.status || ''),
    image_url: /^https?:\/\//i.test(String(data?.image_url || '')) ? String(data.image_url) : '',
    source_url: /^https?:\/\//i.test(String(data?.source_url || '')) ? String(data.source_url) : '',
    summary: String(data?.summary || ''),
    sections: Array.isArray(data?.sections) ? data.sections.map(section => ({
      title: String(section?.title || 'Specifications'),
      rows: Array.isArray(section?.rows) ? section.rows.map(row => ({
        label: String(row?.label || ''),
        value: String(row?.value || '')
      })).filter(row => row.label && row.value) : []
    })).filter(section => section.title && section.rows.length) : [],
    sources: Array.isArray(data?.sources) ? data.sources.filter(x => /^https?:\/\//i.test(String(x))).map(String) : []
  };
}

export async function onRequest(context) {
  const request = context.request;
  const origin = request.headers.get('Origin') || '*';
  const headers = CORS(origin);

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (request.method !== 'GET') return json({ error: 'GET only' }, 405, headers);

  const incoming = new URL(request.url);
  const route = incoming.pathname.slice(PREFIX.length).replace(/^\/+/, '');
  if (route !== 'phone') return json({ error: 'Supported route: /api/gemini/phone?q=...' }, 404, headers);

  const query = String(incoming.searchParams.get('q') || '').trim();
  if (!query) return json({ error: 'Missing q parameter.' }, 400, headers);
  if (query.length > 180) return json({ error: 'Query is too long.' }, 400, headers);

  const key = String(context.env.GEMINI_API_KEY || '').trim();
  if (!key) return json({ error: 'GEMINI_API_KEY is not configured in Cloudflare Pages Secrets.' }, 500, headers);

  const prompt = `Find the exact phone requested below and build its current specification sheet. Search the web and verify the model carefully. Requested product: ${query}`;

  const body = {
    model: MODEL,
    input: prompt,
    system_instruction: systemInstruction,
    tools: [{ type: 'google_search' }],
    response_format: [
      {
        type: 'text',
        mime_type: 'application/json',
        schema
      }
    ],
    store: false,
    generation_config: {
      temperature: 0,
      thinking_level: 'low',
      max_output_tokens: 7000
    }
  };

  try {
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': key
      },
      body: JSON.stringify(body)
    });

    const text = await response.text();
    let payload = {};
    try { payload = text ? JSON.parse(text) : {}; } catch (_) {}

    if (!response.ok) {
      return json({
        error: `Gemini returned HTTP ${response.status}.`,
        detail: payload?.error?.message || text.slice(0, 1000)
      }, response.status, headers);
    }

    const output = parseJson(textFromInteraction(payload));
    return json(sanitize(output), 200, headers);
  } catch (error) {
    return json({
      error: 'Gemini phone lookup failed.',
      detail: error?.message || 'Unknown error.'
    }, 502, headers);
  }
}
