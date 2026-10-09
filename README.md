# Tankhun’s portfolio

A bilingual static portfolio built with semantic HTML, CSS, and browser ES modules. No framework or runtime dependencies.

## Run

Run `npm run dev` and open `http://127.0.0.1:4173`. The local server supports video range requests and PDF assets. ES modules do not run correctly from a file URL.

- `npm test`: content and asset integrity checks.
- `npm run build`: JavaScript syntax checks. There is no bundling step.

## Edit

- `site-data.js`: English project stories, awards, dates, source links, and original media.
- `content.js`: Thai stories and both languages’ interface copy.
- `app.js`: desktop window management, media browsing, language switching and History API routing.
- `portfolio-view.js`: shared localized project and media views.
- `pixel-art.js`: original integer-grid icons and pixel wallpaper illustration.
- `os-state.js`: stable routes and drag bounds.
- `manifest.js`: archive slugs, categories, roles, results, source confidence and unresolved dates.
- `styles.css`: design tokens and responsive component styles.
- `docs/portfolio-audit.md`: evidence, design decisions, QA, and unresolved facts.

Keep claims about implemented features separate from proposals. Add a date only when supported by the owner or an event document. Do not infer a national-round date from a participation certificate for another round.

## Images

Original evidence is preserved. The page uses pre-generated 640px and 1200px WebP derivatives; originals open in the image viewer.

To regenerate, make `sharp` available as a development tool and run `node scripts/optimize-images.mjs`. Alternatively, set `SHARP_MODULE_PATH` to an existing Sharp installation. Commit the generated assets; production does not need Sharp.

Videos use compressed streaming copies, real preview frames, and `preload="none"`; original files remain available for download. PDFs render on demand with zoom, pagination, and fullscreen. No media autoplays.

## Browser regression checks

Start a local server. Open a named session with Playwright CLI, then execute the function in `scripts/pixel-check.js` with its `run-code` command:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=portfolio-audit open http://127.0.0.1:4173
$check = (Get-Content -Raw scripts/pixel-check.js).Trim().TrimEnd(';')
npx --yes --package @playwright/cli playwright-cli -s=portfolio-audit run-code $check
```

This checks eight viewport widths in both languages, six projects, ten experience records, all seven apps, dragging, minimize/restore/maximize, direct route refresh, image viewing, preferences and reduced motion. Run `scripts/pixel-media-check.js` the same way to test real video playback, inline PDFs, zoom, pagination and fullscreen. Screenshots are stored under ignored `output/playwright`.

`scripts/pixel-routes-check.js` checks all sixteen archive URLs, image decoding, browser history, keyboard activation, mobile task switching and missing-media 404s. `scripts/pixel-polish-check.js` checks persistent window geometry, maximized restoration, mobile isolation, all nine photo contact sheets and keyboard focus after closing a photo. `scripts/pixel-home-check.js` checks the mascot, three distinct scenes, persistent scene selection, settings synchronization, motion preferences, keyboard activation and shorter laptop layouts. The older non-pixel browser scripts are historical checks for the previous layouts; use the five `pixel-*` scripts for this redesign.

Project covers share a 16:9 frame with separate, bilingual award/stage/prototype labels. Memories starts with a contact sheet (three columns on desktop, two on mobile); each frame opens the original image, with an optional single-photo browser below. Desktop windows remember their normal position, dimensions and maximized state in local browser storage. Restored geometry is bounded to the current screen; mobile panels never overwrite desktop geometry.

The homepage now includes Bit, an original pixel mascot with click/Enter hints and a short wave. Sky, Mint and Dusk switch the actual vector artwork (workbench, garden lab, observatory), not just the background color. Desktop scenes gently float and respond to the mouse; clicking the scene opens Projects. Ambient animation pauses behind open apps. System reduced motion and the user's motion-off preference disable motion; hints and scene controls remain functional. There is no audio. The large scene is hidden on mobile to preserve space, while Bit and the scene buttons remain usable. Editable source artwork is mirrored in Figma at [Living desktop artwork](https://www.figma.com/design/XBoJHinXQtfhrWRjuTQq03?node-id=9-2); this is an artwork board, not a full interactive website prototype.

## PIXEL//OS

The desktop shell uses original vector pixel art and functional windows. On phones, app panels become fullscreen and dragging is disabled. Opening a project changes the URL to a full-page, readable case study. The short pixel-block transition is skipped when motion is disabled. Wallpaper, motion and language preferences are stored locally; no audio autoplays.

Routes use `/projects/:slug` and `/achievements/:slug`. The local server and Vercel rewrites support refresh and direct entry. Missing media files must return 404 rather than the HTML shell. Original media and the lazy PDF reader remain unchanged.

The visual direction is inspired by the supplied playful desktop reference, retro OS interfaces, Aseprite and Lospec, without copying artwork or branding. An editable palette/type direction is in the existing Figma file, board `5:2`.

## Current motion policy — 9 October 2026

Animation defaults on, as explicitly requested, even when the browser reports reduced motion. The homepage and Settings On/Off controls share a persistent `pixel-motion-explicit` preference. Off disables motion and bypasses startup; legacy motion settings are no longer read. Temporary animation Preview has been removed. No operating-system settings are changed.

Power-up plays on every animated root-page load and can be skipped immediately. Bit walks over a 0–100% startup bar (intro progress, not download progress), reaching 100% in 1.6 seconds before a brief hold and monitor expansion into the homepage; total duration is approximately 2.2 seconds. Direct project/achievement links bypass it. Bit follows desktop mouse movement and returns to idle. Scene details, water and window opening use smooth motion while the artwork stays pixel styled. Ambient scenes pause behind apps and dialogs.

`scripts/pixel-default-check.js` is the current motion acceptance check: browser reduced-motion enabled, default startup, actual gaze, both On/Off controls, persisted Off, replay, direct links and five viewport widths. `scripts/pixel-loading-check.js` verifies advancing percentage, walking Bit, 100% before exit, smooth motion, skip cleanup and mobile Escape. Earlier browser scripts below describe historical motion policies and their motion assertions need updating before reuse. Current Figma motion notes are not synchronized: the update was blocked by the Figma Starter tool quota.

## Historical motion iterations

Reduced-motion diagnostic: the homepage now explains when animation is paused and offers an explicit Try animations button. This temporarily opts into motion for the current page only, including Bit's mouse gaze and wave; Stop preview restores the prior preference and reload clears the preview. No operating-system setting is changed and no override is stored. `scripts/pixel-preview-check.js` tests this with reduced motion enabled, including actual mouse tracking, click/wave, stopping and reload restoration.

Scene detail animation: Sky's screen glyphs drift subtly, Mint's leaves sway while the pots stay fixed, and Dusk's telescope head scans slowly on a fixed stand while individual stars softly twinkle. The independent loops pause behind apps, case studies and open dialogs, and reduced motion disables them. `scripts/pixel-scene-check.js` verifies actual transform changes, app pausing and reduced motion in all three scenes.

Final homepage polish: Bit's eyes follow desktop mouse movement within 1.2 SVG pixels and return to center after 900ms inactivity or when an app opens. No tracking runs on touch/mobile or with reduced motion. The automatic power-up finishes with a 450ms monitor expansion/fade into the underlying desktop; Enter now and Escape still skip immediately. Startup plus exit lasts 1.8 seconds. Mobile has a compact, theme-tinted water strip below Bit. `scripts/pixel-finish-check.js` verifies gaze/reset, transition observation, focus restoration, immediate skip, four mobile widths and reduced motion. The Figma artwork notes reflect these timings.

Motion polish: water now uses seamless tiled 12-second and 18-second linear loops rather than alternating drift. Clicking the island adds a short, self-cleaning ripple. Newly opened app windows expand from their launching button in 300ms; restoring an existing app remains immediate. Reduced motion disables both effects. `scripts/pixel-flow-check.js` checks the flow direction, ripple cleanup, window origin and reduced-motion behavior. Figma board `9:2` documents these production timings.

The power-up intro plays for 1.8 seconds on the first animated homepage visit per session. Enter now or Escape skips it; Settings has Replay power-up. Direct case-study links bypass it. System reduced motion and motion-off bypass it entirely. Bit has a gentle independent idle bob/sway, and the desktop scene has two theme-tinted pixel water layers. Both pause behind apps. `scripts/pixel-power-check.js` checks first-visit/session behavior, skip, replay, focus restoration, automatic dismissal, reduced motion, deep links, mobile layout and animation pausing. The editable Figma artwork board includes water art and implementation notes, not an interactive boot prototype.

## Hosting

`vercel.json` keeps the existing static hosting setup. Git integration handles deployments. When changing JS/CSS, update the version query in `index.html` and imports in `app.js` together.

For authenticated deployment inspection and logs, install Vercel CLI with `npm i -g vercel`, then sign in. A confirmed production domain is still needed before setting canonical URL, absolute Open Graph image URL, and sitemap. Do not use an immutable preview URL as the canonical domain.
