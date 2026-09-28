# Ocean portfolio revision — 28 September 2026

The approved revision restores a light sea-surface hero, an empty decorative porthole, teal competition cards, and darker lower sections. The generic slogan, process diagram, numbered entries, and five-project introduction are no longer rendered.

## Content organization

Eight competition entries combine project information and results. Grow a Garden's depa 2026 project and regional/national qualification share one card; Heritage AI and Youth Innovation share one card. The school-network science competition remains a distinct event. depa 2025 remains visible. TIRA training and the Hairline Detector exhibition appear separately under activities. No camp participation was invented.

Original data remains intact. `catalog.js` derives the displayed groups and merges duplicate media by source path. Existing uncertain dates remain unconfirmed.

## Embedded media

PDF.js 6.3.289 is self-hosted and lazily loaded for Documents. It provides page controls, responsive canvas previews, extracted text for assistive technology, and an original-file fallback. Source and license are included under `public/vendor/pdfjs/`. Implementation follows the [official PDF.js examples](https://mozilla.github.io/pdf.js/examples/).

The two original videos are preserved. H.264/AAC fast-start 1280px web copies live outside the Git LFS video directory so Git deployments receive actual playback files. PhishWall is 7,772,065 bytes; TropoSense is 54,937,540 bytes. Both played in Chromium, advancing playback time and decoding 1280px frames. Original download links still depend on original LFS assets being available on the deployment.

## Verification

- Eight Node tests and syntax build passed.
- English and Thai layouts passed overflow checks at 320, 375, 430, 768, 1024, 1280, 1440, and 1920px.
- Keyboard menus, nested dialog focus restoration, image decoding, and reduced-motion checks passed.
- English homepage axe WCAG A/AA scan reported zero violations.
- PhishWall and TropoSense web playback and PDF previews passed; pagination exercised where available.
- Grow a Garden's two PDFs rendered in Thai at 375px with no dialog overflow.

These are local browser checks, not proof of public production access. The prior Vercel deployment was protected by login. Git deployment status must be checked separately; do not remove access protection without the owner's direction.
