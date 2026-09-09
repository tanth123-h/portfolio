# Duck Pond Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build accessible, data-driven night-pond portfolio for Tankhun Srichankaew using supplied competition assets.

**Architecture:** Static HTML page uses `site-data.js` as single editable content source. `app.js` renders reusable sections, cards, media detail dialogs, lightbox, ripple interaction, and form fallback. `styles.css` implements responsive Night Pond Field Journal visual system.

**Tech Stack:** HTML5, CSS3, ES modules, Node built-in test runner. No framework or external dependencies.

**Spec:** `docs/superpowers/specs/2026-09-07-duck-pond-portfolio-design.md`

## Global Constraints

- Preserve `competition/` source assets unchanged.
- Copy evidence into `public/assets/projects`, `certificates`, `photos`, `videos`, `pdfs`, and `graphics`.
- Use only supplied evidence and clearly labelled contact placeholders for unknown personal links.
- Support keyboard, 200% zoom, mobile widths, `prefers-reduced-motion`, native video controls, PDF embed/open/download, and focus return from dialogs.
- Never autoplay video or depend on external fonts, servers, analytics, or a backend.
- This directory is not a Git repository. Do not attempt commits.

---

## File Structure

- `index.html`: semantic page shell, navigation, skip link, modal roots, module entry.
- `styles.css`: tokens, responsive visual system, motion, focus, media viewer styling.
- `site-data.js`: typed-by-convention portfolio object and real asset paths.
- `app.js`: rendering, media dialog state, event listeners, client-side contact form validation.
- `site-data.test.mjs`: model and asset-path assertions.
- `public/assets/*`: normalized copies of original evidence.

### Task 1: Asset library and content contract

**Files:**
- Create: `public/assets/projects/`, `public/assets/certificates/`, `public/assets/photos/`, `public/assets/videos/`, `public/assets/pdfs/`, `public/assets/graphics/`
- Create: `site-data.js`
- Modify: `site-data.test.mjs`

**Interfaces:**
- Produces: `export const portfolio` with `projects`, `achievements`, `experiences`, `gallery`, `skills`, `journey`, `education`, `reflections`, and `goals` arrays.
- Produces: each entry media object with arrays named `photos`, `certificateImages`, `pdfs`, `videos`, and `graphics`.

- [ ] **Step 1: Add failing asset-model tests**

```js
test('each portfolio entry uses complete media groups', () => {
  for (const entry of [...portfolio.projects, ...portfolio.achievements]) {
    assert.deepEqual(Object.keys(entry.media).sort(),
      ['certificateImages', 'graphics', 'pdfs', 'photos', 'videos']);
  }
});

test('each linked asset has a public path', () => {
  for (const entry of [...portfolio.projects, ...portfolio.achievements]) {
    for (const group of Object.values(entry.media)) {
      for (const asset of group) assert.match(asset.src, /^\.\/public\/assets\//);
    }
  }
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npm test`

Expected: FAIL because `site-data.js` does not exist.

- [ ] **Step 3: Copy and normalize original evidence**

Run PowerShell commands that copy, never move, files from `competition/`. Use clear names such as:

```powershell
Copy-Item 'competition/depa2026/project.pdf' 'public/assets/pdfs/depa-2026-project.pdf'
Copy-Item 'competition/depa2026/Why Nature Matters.pdf' 'public/assets/pdfs/depa-2026-brochure.pdf'
Copy-Item 'competition/change education/heart.mp4' 'public/assets/videos/troposense-pitch.mp4'
Copy-Item 'competition/cyber secure/ส่งใจในเเอร์ดรอบ.mp4' 'public/assets/videos/phishwall-demo.mp4'
Copy-Item 'competition/youth/Youth final 7 (1).pdf' 'public/assets/pdfs/youth-innovation-research.pdf'
```

Copy every source image into the category matching its role. Put poster and screenshot images in `graphics`, award and certificate images in `certificates`, and event/person images in `photos`.

- [ ] **Step 4: Create `site-data.js`**

```js
const media = ({ photos = [], certificateImages = [], pdfs = [], videos = [], graphics = [] }) => ({
  photos, certificateImages, pdfs, videos, graphics,
});

export const portfolio = {
  profile: {
    nameTh: 'นายแทนคุณ ศรีจันทร์แก้ว',
    nameEn: 'Tankhun Srichankaew',
    title: 'Student · AI Builder · Creator',
    school: 'Maryvit Nakhon Ratchasima',
    grade: 'Grade 11, AI Programme',
  },
  // Add supplied entries with summary, problem, whatIDid, challenge, whatILearned, skills, links, and media(...).
};
```

Include verified entries for `Agri`, `PhishWall AI`, `Troposense`, `Youth Innovation`, and `CityFlowBKK`. Include achievements for depa 2026 third place, Youth Innovation Bronze, iDektep honorable mention, TIRA training, and Minister exhibition. Mark uncertain depa 2025 relation in its `note` field.

- [ ] **Step 5: Run tests**

Run: `npm test`

Expected: PASS.

### Task 2: Semantic structural shell

**Files:**
- Create: `index.html`
- Modify: `package.json`

**Interfaces:**
- Consumes: IDs `home`, `about`, `journey`, `skills`, `projects`, `achievements`, `gallery`, `education`, `contact`.
- Produces: roots `#projects-grid`, `#achievements-grid`, `#gallery-grid`, `#portfolio-dialog`, `#lightbox`, `#status-message` consumed by `app.js`.

- [ ] **Step 1: Add failing shell assertions to `site-data.test.mjs`**

```js
import { readFile } from 'node:fs/promises';

test('page includes landmark sections and modal roots', async () => {
  const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
  for (const id of ['home', 'about', 'journey', 'skills', 'projects', 'achievements', 'gallery', 'education', 'contact']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /id="portfolio-dialog"/);
  assert.match(html, /id="lightbox"/);
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npm test`

Expected: FAIL because `index.html` does not exist.

- [ ] **Step 3: Build semantic `index.html`**

```html
<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header"><nav aria-label="Primary">...</nav></header>
<main id="main-content">
  <section id="home" aria-labelledby="home-title">...</section>
  <section id="projects" aria-labelledby="projects-title"><div id="projects-grid"></div></section>
</main>
<dialog id="portfolio-dialog" aria-labelledby="dialog-title"></dialog>
<dialog id="lightbox" aria-label="Expanded image"></dialog>
<p id="status-message" class="sr-only" aria-live="polite"></p>
<script type="module" src="./app.js"></script>
```

Use buttons for modal triggers. Use anchors only for navigation or real URLs. Add `npm run build` command to syntax-check `site-data.js` and `app.js`.

- [ ] **Step 4: Run tests and build**

Run: `npm test; npm run build`

Expected: PASS after placeholder `app.js` module exists in Task 3; before Task 3 run only `npm test`.

### Task 3: Reusable renderer and accessible media dialogs

**Files:**
- Create: `app.js`
- Modify: `site-data.test.mjs`

**Interfaces:**
- Consumes: `portfolio` exported from `site-data.js`, DOM roots from `index.html`.
- Produces: `renderCard(entry, kind)`, `openEntry(entry)`, `openLightbox(asset)`, `closeDialog(dialog)`.

- [ ] **Step 1: Add failing renderer tests**

```js
test('source implements only available media tabs', async () => {
  const source = await readFile(new URL('./app.js', import.meta.url), 'utf8');
  assert.match(source, /Object\.entries\(entry\.media\)\.filter/);
  assert.match(source, /dialog\.showModal\(\)/);
  assert.match(source, /document\.activeElement/);
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npm test`

Expected: FAIL because `app.js` does not exist.

- [ ] **Step 3: Implement rendering and dialogs**

```js
import { portfolio } from './site-data.js';

let priorFocus = null;
const mediaLabels = { photos: 'Photos', certificateImages: 'Certificate', pdfs: 'PDF', videos: 'Video', graphics: 'Graphics' };

function presentMedia(entry) {
  return Object.entries(entry.media).filter(([, assets]) => assets.length);
}

function openDialog(dialog, trigger) {
  priorFocus = trigger;
  dialog.showModal();
  dialog.querySelector('[data-close]')?.focus();
}

function closeDialog(dialog) {
  dialog.close();
  priorFocus?.focus();
}
```

Render image buttons with alt text; graphics and photos open lightbox. Render PDF with `<iframe title="${asset.title}" src="${asset.src}">` plus open/download links. Render video with `<video controls preload="metadata">`. Do not render missing media tabs. Close on close button, backdrop click, and Escape. Make `openEntry` reachable from Enter and Space.

- [ ] **Step 4: Run tests and build**

Run: `npm test; npm run build`

Expected: PASS.

### Task 4: Night pond visual system and responsive behavior

**Files:**
- Create: `styles.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: section and component class names emitted by `app.js`.
- Produces: theme variables, desktop grid, mobile breakpoint, visible focus ring, reduced-motion override.

- [ ] **Step 1: Add failing CSS assertions**

```js
test('styles support reduced motion and keyboard focus', async () => {
  const css = await readFile(new URL('./styles.css', import.meta.url), 'utf8');
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /--abyss:\s*#061425/);
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npm test`

Expected: FAIL because `styles.css` does not exist.

- [ ] **Step 3: Implement styles and include stylesheet**

```css
:root { --abyss: #061425; --pond: #0b2942; --moon: #dff5ff; --cyan: #76e2e3; --lily: #729b70; --duck: #ffbd59; }
body { background: var(--abyss); color: var(--moon); }
:focus-visible { outline: 3px solid var(--cyan); outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; scroll-behavior: auto !important; } }
```

Use moonlight gradients only behind hero. Use lily-pad milestone circles in journey. Use translucent, rounded detail surfaces with clear borders instead of repeated card shadows. Use `minmax(0, 1fr)` grid columns and one-column mobile layout at `760px`.

- [ ] **Step 4: Run tests and build**

Run: `npm test; npm run build`

Expected: PASS.

### Task 5: Pond interactions, contact fallback, and final verification

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `site-data.test.mjs`

**Interfaces:**
- Consumes: `#duck-button`, `#ripple-layer`, `#contact-form`, `#status-message`.
- Produces: keyboard-operable ripple action and validated `mailto:` fallback.

- [ ] **Step 1: Add failing interaction tests**

```js
test('source includes ripple and validated mailto fallback', async () => {
  const source = await readFile(new URL('./app.js', import.meta.url), 'utf8');
  assert.match(source, /duck-button/);
  assert.match(source, /requestAnimationFrame/);
  assert.match(source, /mailto:/);
  assert.match(source, /checkValidity\(\)/);
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npm test`

Expected: FAIL because interactions do not exist.

- [ ] **Step 3: Implement interaction and form behavior**

```js
duckButton.addEventListener('click', (event) => {
  rippleLayer.style.setProperty('--x', `${event.offsetX}px`);
  rippleLayer.classList.remove('is-rippling');
  requestAnimationFrame(() => rippleLayer.classList.add('is-rippling'));
  statusMessage.textContent = 'The duck made a ripple.';
});

contactForm.addEventListener('submit', (event) => {
  if (!contactForm.checkValidity()) return;
  event.preventDefault();
  const data = new FormData(contactForm);
  location.href = `mailto:[YOUR EMAIL]?subject=${encodeURIComponent(`Portfolio message from ${data.get('name')}`)}&body=${encodeURIComponent(data.get('message'))}`;
});
```

Respect reduced motion by disabling ripple animation. Explain near contact form that email value needs replacement before publishing.

- [ ] **Step 4: Run automated verification**

Run: `npm test; npm run build`

Expected: PASS.

- [ ] **Step 5: Run manual browser verification**

Check 1440px and 375px width. Tab through nav, cards, dialogs, lightbox, duck button, form. Open every available PDF. Play both videos. Set reduced motion and verify animated elements stop. Zoom browser to 200% and verify no clipped primary content.

- [ ] **Step 6: Record unresolved user actions**

Report the exact contact placeholders and the uncertain depa 2025 `Orion` relationship. Do not claim these values are verified.

## Plan Self-Review

- Spec coverage: Tasks 1-5 cover data, copied media, all page sections, responsive visual system, modal image/PDF/video viewers, accessibility, duck ripple, contact fallback, and verification.
- Placeholder scan: No unfinished implementation instruction remains. Contact placeholder is deliberate public-site content because email was not supplied.
- Type consistency: `portfolio`, media group names, dialog root IDs, and renderer function names match across all tasks.
