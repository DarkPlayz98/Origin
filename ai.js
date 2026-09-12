/**
 * Origin — Crystal Provider API client
 * Endpoint: https://crystal-api.baddampujithareddy19.workers.dev/
 * Text model: @cf/meta/llama-3.3-70b-instruct-fp8-fast
 *
 * IMPORTANT:
 * This site is static/GitHub Pages, so a key in client-side JS is public.
 * For production, keep the key inside your Cloudflare Worker instead.
 */

const CRYSTAL_ENDPOINT = "https://crystal-api.baddampujithareddy19.workers.dev/";
const CRYSTAL_KEY = "cry_live_5af500f2081c32b24f4552552e5079a2";
const CRYSTAL_TEXT_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

function extractResult(data) {
  const result = data?.result;

  if (typeof result === "string") return result;
  if (result && typeof result.response === "string") return result.response;
  if (result && typeof result.output_text === "string") return result.output_text;
  if (typeof data?.response === "string") return data.response;
  if (typeof data?.output_text === "string") return data.output_text;
  if (typeof data?.text === "string") return data.text;

  return "";
}

export class CrystalAI {
  constructor(apiKey = CRYSTAL_KEY) {
    if (!apiKey || !apiKey.startsWith("cry_live_")) {
      throw new Error("A valid Crystal API key is required.");
    }

    this.apiKey = apiKey;
  }

  async chat(prompt, options = {}) {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("CrystalAI.chat() requires a non-empty prompt.");
    }

    const payload = {
      model: options.model ?? CRYSTAL_TEXT_MODEL,
      prompt,
      max_tokens: options.maxTokens ?? 4096,
      temperature: options.temperature ?? 0.6
    };

    const data = await this._send(payload);
    const result = extractResult(data);

    if (!result) {
      throw new Error("Crystal API returned success but no text result.");
    }

    return result;
  }

  async generateImage(prompt, model = "dall-e-3") {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("CrystalAI.generateImage() requires a non-empty prompt.");
    }

    const data = await this._send({
      model,
      prompt
    });

    const result = extractResult(data);
    if (!result) {
      throw new Error("Crystal API returned success but no image result.");
    }

    return result;
  }

  async _send(body) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

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

      const rawText = await response.text();
      let data;

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        throw new Error(
          `[Crystal API Error] Status ${response.status}: Worker returned non-JSON data.`
        );
      }

      if (!response.ok) {
        const detail =
          data?.error ||
          data?.message ||
          `HTTP ${response.status}`;
        throw new Error(`[Crystal API Error] ${detail}`);
      }

      if (data?.status && data.status !== "success") {
        throw new Error(data.error || data.message || "Crystal execution failed.");
      }

      return data;
    } catch (error) {
      if (error?.name === "AbortError") {
        throw new Error("Crystal API request timed out after 30 seconds.");
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}

export const crystalAI = new CrystalAI();
