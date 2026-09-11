/* Origin AI
   NOTE: This site is static/GitHub Pages, so any token included here is public.
   For a private production key, proxy this request through your Cloudflare Worker.
*/
const ORIGIN_AI_ENDPOINT = 'https://crystal-api.baddampujithareddy19.workers.dev/';
const ORIGIN_AI_TOKEN = 'cry_live_5af500f2081c32b24f4552552e5079a2';

async function originAISummarize(company) {
  const prompt = `You are the editorial intelligence behind Origin, a premium company-history product. Summarize ${company.name} for a polished company origin page. Return exactly 4 concise sections with these labels: ORIGIN, FIRST PRODUCT, BREAKTHROUGH, WHY IT MATTERS. Use only facts in this company record; if something is uncertain, say so instead of inventing it. Company record: ${JSON.stringify({name:company.name, year:company.year, founders:company.founders, idea:company.idea, firstProduct:company.firstProduct, firstProductNote:company.firstProductNote, successProduct:company.successProduct, successNote:company.successNote, timeline:company.timeline})}`;

  const response = await fetch(ORIGIN_AI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ORIGIN_AI_TOKEN}`
    },
    body: JSON.stringify({
      model: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
      prompt,
      max_tokens: 900,
      temperature: 0.6
    })
  });

  if (!response.ok) throw new Error(`AI request failed (${response.status}).`);
  const data = await response.json();
  return data?.result?.response || data?.response || data?.output_text || '';
}
