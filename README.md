# Origin

A clean, static company-origin story directory.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server.

Example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages

1. Create a GitHub repository.
2. Upload `index.html`, `styles.css`, `app.js`, and this README.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select the branch/folder containing the files.

No build step is required.

## Add a company

Edit the `companies` array in `app.js`. Each company uses:

- `id`
- `name`
- `year`
- `decade`
- `industry`
- `founders`
- `summary`
- `idea`
- `timeline`
- `source`

All routing is hash-based (`#company/id`), so it works cleanly on GitHub Pages without server rewrites.
