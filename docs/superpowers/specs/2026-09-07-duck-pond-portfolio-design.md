# Duck Pond Portfolio Design

## Purpose

Build a polished personal portfolio for **นายแทนคุณ ศรีจันทร์แก้ว (Tankhun Srichankaew)**, a Grade 11 AI student at Maryvit Nakhon Ratchasima. The site presents work as a growing story: problem, contribution, evidence, reflection, next step.

## Audience and success criteria

- Teachers, universities, competition judges, internship recruiters, and future employers can understand Tankhun's strengths within one minute.
- Each featured project or achievement opens a detail view with only its real available evidence: photos, certificate image, PDF, video, and external links.
- New portfolio entries require data changes only, not page rewrites.
- Website works with keyboard, narrow mobile screens, reduced-motion settings, and missing optional media.

## Design direction

### Chosen concept: Night Pond Field Journal

The page is a guided evening walk around an original pond. Content uses editorial pacing rather than identical dashboard cards. One large illustrated water surface anchors hero; all other pond details stay quiet.

Alternative rejected: a cartoon-heavy duck world would weaken professional credibility. Alternative rejected: generic dark SaaS dashboard would lose personality.

### Tokens

- `abyss #061425`: page base
- `pond #0B2942`: water surface
- `moon #DFF5FF`: primary text and moon glow
- `cyan #76E2E3`: interactive highlights
- `lily #729B70`: milestone and tag accents
- `duck #FFBD59`: limited warm attention accent

Typography: `Noto Sans Thai` for Thai text; `DM Sans` for English, navigation, metadata. Large, rounded display type is reserved for the hero and section titles.

### Layout

```text
sticky pond navigation
hero: story / profile portrait / interactive duck-water scene
about: short narrative / current focus / values
journey: curved pond path with lily-pad milestones
skills: grouped lily-pad clusters
featured work: editorial project cards
achievement shelf: collected pond badges
experience and education: two-column story cards
memory gallery: irregular floating photos
what pond taught me: reflections
goals: distant moon path
contact: message across pond form
```

Desktop uses a 12-column container, left-aligned content, staggered media panels. Mobile collapses to one column, retains semantic heading order and tap targets.

## Content model

`site-data.js` exports one `portfolio` object:

- `profile`, `skills`, `journey`, `education`, `reflections`, `goals`, `contact`
- `projects[]`, `achievements[]`, `experiences[]`, `gallery[]`

Each entry has title, type, date, organization, summary, problem, `whatIDid`, `challenge`, `whatILearned`, skills, links, and `media` grouped as `photos`, `certificateImages`, `pdfs`, `videos`, `graphics`.

Rendering inspects media arrays. Empty arrays produce no tab or viewer.

## Asset map

Original competition directory stays intact. Build copies source files into `public/assets/{projects,certificates,photos,videos,pdfs,graphics}` with normalized safe filenames.

| Entry | Evidence observed | Planned entry type |
| --- | --- | --- |
| depa2025 / Orion | `Orion.pdf`, event photos | agricultural AI project |
| depa2026 | project, brochure, x-stand PDFs; certificate and hardware/event photos; GitHub `tanth123-h/argi`; 3rd, Central Isan | agricultural technology project + achievement |
| Cyber Secure / PhishWall AI | project information, poster, participation PDF, demo video | cybersecurity concept/project |
| Change Innovation / Troposense | proposal, landscape/portrait posters, video, finalist photo | innovation competition entry |
| Youth Innovation | research PDF, poster, Bronze certificate image, project and presentation photos, GitHub `tanth123-h/phimai` | national research/presentation achievement |
| Bangkok Hackathon / CityFlowBKK | accomplishment certificate, event photos, screenshots, GitHub `tanth123-h/CityFlowBKK` | hackathon, Top 20 claim from owner |
| TIRA | workshop certificate and event photos | Arduino IoT training |
| iDektep | certificate/award images and photos | AI training competition, honorable mention claim from owner |
| Minister visit | exhibition photos and event description | school innovation exhibition |

Uncertain mapping: `depa2025` materials do not explicitly name Cira Core AI weed-spraying car. Website labels it as user-provided project description and retains file title `Orion` until user confirms.

## Components and interaction

- `app.js`: data render, navigation, modal state, media tabs, form validation, ripple interaction.
- `site-data.js`: editable content and asset paths only.
- `styles.css`: design tokens, responsive layout, animations, focus states.
- `index.html`: semantic structural shell.

Click or keyboard activate project/achievement card: open accessible dialog with tabs only for real media. Image and graphics open lightbox. PDFs show embedded viewer with open/download actions. Videos use native controls; never autoplay. Escape closes dialog. Focus returns to trigger.

The decorative duck button creates a visual ripple and updates a polite live region. It has no audio dependency. Floating particles and water motion stop under `prefers-reduced-motion`.

## Data and error behavior

Unknown social/email values appear as clearly labelled placeholders, not dead links. Missing images use a styled pond placeholder. Missing PDF/video viewer errors leave original download/open link available. Contact form is client-side mailto fallback with required name, email, and message fields; no server data collection.

## Verification

- `npm test`: content model ensures every featured entry has learning reflection and at least one media item.
- `npm run build`: JavaScript syntax checks.
- Manual browser checks: desktop/mobile layout, keyboard navigation, dialogs, media tabs, PDF/embed links, videos, reduced motion, 200% zoom.

## Scope boundary

No upload CMS, server form delivery, analytics, external font dependency, or image generation. All showcased evidence derives from supplied assets. Placeholders mark information not supplied.
