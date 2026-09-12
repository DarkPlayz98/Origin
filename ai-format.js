/* Origin AI presentation layer.
 * Keeps Crystal's API client untouched and prevents Markdown markers like ###
 * from leaking into Origin's editorial UI.
 */
(function () {
  const original = window.originAISummarize;
  if (typeof original !== "function") return;

  const clean = text => String(text ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/^\s*#{1,6}\s*/gm, "")
    .replace(/^\s*\*\*(ORIGIN|FIRST PRODUCT|BREAKTHROUGH|WHY IT MATTERS)\*\*\s*:?\s*$/gmi, "$1")
    .replace(/^\s*(ORIGIN|FIRST PRODUCT|BREAKTHROUGH|WHY IT MATTERS)\s*:\s*$/gmi, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  window.originAISummarize = async function (company) {
    return clean(await original(company));
  };
})();
