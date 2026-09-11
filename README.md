# Origin

Origin is a static, GitHub Pages-ready company-history product. It includes an A–Z directory, searchable/filterable companies, full story views, origin flowcharts, product-universe sections, product-study visuals, timelines, source links, and optional AI summaries.

## AI summaries

The UI is wired to the supplied Crystal API Worker endpoint:

`https://crystal-api.baddampujithareddy19.workers.dev/`

It sends the requested Workers AI model name and prompt format. The browser asks for the token on first use and stores it in `localStorage` under `ORIGIN_AI_TOKEN`; the token is **not embedded in the public GitHub Pages files**.

For a production public deployment, the safest architecture is to have the Worker hold the secret and expose a restricted `/summarize` route to Origin rather than sending a bearer token from the browser.

## GitHub Pages

Upload the contents of this folder to a repository and enable GitHub Pages. No build step is required.

## Notes

The product-study visual is a lightweight CSS 3D presentation, so the site stays dependency-free and fast. It is not a binary GLB/CAD model viewer. Product lists are notable product families/current offerings rather than every SKU, revision, or discontinued variant.
