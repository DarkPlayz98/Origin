/**
 * Origin AI — Crystal Provider client
 * Static-site friendly. No user API-key prompt.
 * NOTE: A client-side key is publicly inspectable on GitHub Pages.
 */
const CRYSTAL_ENDPOINT = "https://crystal-api.baddampujithareddy19.workers.dev/";
const CRYSTAL_KEY = "cry_live_5af500f2081c32b24f4552552e5079a2";
const CRYSTAL_TEXT_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

function extractCrystalResult(data) {
  const r = data?.result;
  if (typeof r === "string") return r;
  if (typeof r?.response === "string") return r.response;
  if (typeof r?.output_text === "string") return r.output_text;
  if (typeof r?.text === "string") return r.text;
  if (typeof data?.response === "string") return data.response;
  if (typeof data?.output_text === "string") return data.output_text;
  if (typeof data?.text === "string") return data.text;
  return "";
}

class CrystalAI {
  constructor(apiKey = CRYSTAL_KEY) {
    if (!apiKey?.startsWith("cry_live_")) throw new Error("Crystal API key is invalid.");
    this.apiKey = apiKey;
  }

  async chat(prompt, options = {}) {
    const payload = {
      model: options.model || CRYSTAL_TEXT_MODEL,
      prompt,
      max_tokens: options.maxTokens ?? 4096,
      temperature: options.temperature ?? 0.6
    };
    const data = await this._send(payload);
    const text = extractCrystalResult(data);
    if (!text) throw new Error("Crystal returned no text.");
    return text;
  }

  async _send(body) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch(CRYSTAL_ENDPOINT, {
        method: "POST",
        headers: {
          "X-Crystal-Key": this.apiKey,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      const raw = await response.text();
      let data = {};
      try { data = raw ? JSON.parse(raw) : {}; } catch {
        throw new Error(`Crystal returned non-JSON data (HTTP ${response.status}).`);
      }
      if (!response.ok) throw new Error(data?.error || data?.message || `Crystal HTTP ${response.status}`);
      if (data?.status && data.status !== "success") throw new Error(data?.error || data?.message || "Crystal execution failed.");
      return data;
    } catch (error) {
      if (error?.name === "AbortError") throw new Error("Crystal request timed out.");
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

const crystalAI = new CrystalAI();

/** Public Origin integration expected by app.js. */
async function originAISummarize(company) {
  const prompt = `You are Origin AI, an editorial historian for a premium company-origin platform.
Summarize this company story in four crisp sections. Do not invent facts. Keep each section 2–4 sentences.

1. ORIGIN — why the company was started
2. FIRST PRODUCT — what it first made/sold and why it mattered
3. BREAKTHROUGH — the product/event that changed its trajectory
4. WHY IT MATTERS — what the early story teaches founders today

Company: ${company.name}
Founded: ${company.year}
Founders: ${company.founders}
Industry: ${company.industry}
Idea: ${company.idea}
First product: ${company.firstProduct} — ${company.firstProductNote}
Breakthrough: ${company.successProduct} — ${company.successNote}
Early timeline: ${company.timeline.map(x => x.join(" — ")).join(" | ")}`;
  return crystalAI.chat(prompt, { maxTokens: 1400, temperature: 0.45 });
}

window.CrystalAI = CrystalAI;
window.crystalAI = crystalAI;
window.originAISummarize = originAISummarize;
