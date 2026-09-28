# Tankhun’s portfolio

A bilingual static portfolio built with semantic HTML, CSS, and browser ES modules. No framework or runtime dependencies.

## Run

Serve this directory over HTTP (for example, `python -m http.server 5500`) and open `http://localhost:5500`. ES modules do not run correctly from a file URL.

- `npm test`: content and asset integrity checks.
- `npm run build`: JavaScript syntax checks. There is no bundling step.

## Edit

- `site-data.js`: English project stories, awards, dates, source links, and original media.
- `content.js`: Thai stories and both languages’ interface copy.
- `app.js`: cards, media browsing, language switching, and native dialogs.
- `styles.css`: design tokens and responsive component styles.
- `docs/portfolio-audit.md`: evidence, design decisions, QA, and unresolved facts.

Keep claims about implemented features separate from proposals. Add a date only when supported by the owner or an event document. Do not infer a national-round date from a participation certificate for another round.

## Images

Original evidence is preserved. The page uses pre-generated 640px and 1200px WebP derivatives; originals open in the image viewer.

To regenerate, make `sharp` available as a development tool and run `node scripts/optimize-images.mjs`. Alternatively, set `SHARP_MODULE_PATH` to an existing Sharp installation. Commit the generated assets; production does not need Sharp.

Videos are original large files and use `preload="none"`. PDFs open on demand. No media autoplays.

## Browser regression checks

Start a local server. Open a named session with Playwright CLI, then execute the function in `scripts/browser-check.js` with its `run-code` command. In PowerShell, collapse newlines to keep one CLI argument:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=portfolio-audit open http://localhost:5500
$check = (Get-Content -Raw scripts/browser-check.js) -replace '\r?\n', ' '
npx --yes --package @playwright/cli playwright-cli -s=portfolio-audit run-code $check
```

This checks eight viewport widths in both languages, project counts, mobile menu behavior, nested focus restoration, image decoding, and reduced motion. Screenshots are stored under ignored `output/playwright`.

## Hosting

`vercel.json` keeps the existing static hosting setup. Git integration handles deployments. When changing JS/CSS, update the version query in `index.html` and imports in `app.js` together.

For authenticated deployment inspection and logs, install Vercel CLI with `npm i -g vercel`, then sign in. A confirmed production domain is still needed before setting canonical URL, absolute Open Graph image URL, and sitemap. Do not use an immutable preview URL as the canonical domain.
