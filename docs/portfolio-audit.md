# Portfolio audit and redesign — 28 September 2026

## Repository findings

The site is vanilla HTML, CSS and ES modules. It has no framework or runtime dependencies. `site-data.js` stores English content/media; Thai content and interface copy were embedded in `app.js`. Vercel serves the repository as static files. `npm run build` is a syntax check, not a bundle or framework build.

Strengths: genuine project photographs, certificates, PDFs, source links, bilingual content, and native dialogs. These are more valuable than additional effects.

Critical: nested interactive achievement controls can trigger the same dialog twice. Some descriptions imply implemented or effective systems without evidence supporting that scope.

High impact: achievements appear twice; five project cards have arbitrary column offsets and negative margins; huge Thai headings wrap poorly; the hero repeats generic copy. The hidden timeline still renders and costs maintenance.

Medium: CSS is a single long file plus multiple overriding inline blocks. Fake social glyphs and the icon font are inconsistent. Dialog tabs lack arrow-key behavior and panel associations. Focus restoration uses one shared variable across nested dialogs. Images are eager-loaded; some source images exceed 7 MB. Videos are about 226–229 MB. There is no favicon, Open Graph image or meaningful fallback content.

Minor: placeholder LinkedIn, public editorial notes, stale project descriptions, repeated translation overrides, and tests tied to an old color value rather than behavior.

## Evidence and corrections

FACT (owner + certificate): Grow a Garden science invention entry, Gold/first place, 19 September 2569. Certificate names the Diocese of Nakhon Ratchasima school academic skills competition. Private Education Day context is owner supplied.

FACT (owner): depa 2026 regional Bronze and advancement to nationals; depa 2025 national round; leadership/pitch/software and some hardware in team projects. Do not infer exact round dates from a generic event date.

CURRENT: CityFlowBKK solves unspecified city problems. PROPOSED: Android transit and discovery prototype, Kotlin/Jetpack Compose, route planning and place discovery. EVIDENCE: https://github.com/tanth123-h/CityFlowBKK README retrieved 28 September 2026. README is project documentation, not independent proof of deployed performance.

CURRENT: Grow a Garden analyzes soil, weather, costs and markets. PROPOSED: Flutter farm mapping and planting planning prototype; AI/IoT ambitions described as project scope rather than all confirmed shipped functions. EVIDENCE: https://github.com/tanth123-h/argi README separates mapping/planning from roadmap features; its mapping-provider descriptions conflict, so no provider claim is needed.

CURRENT: Heritage AI technology badges include React. PROPOSED: YOLOv8, FastAPI, visitor counting/dashboard and history assistant. EVIDENCE: local youth research PDF describes YOLOv8 and RAG; https://github.com/tanth123-h/phimai documents FastAPI, RTSP, visitor history and LINE alerts. The research prototype is not presented as a proven public deployment.

CURRENT: TropoSense implies faster medical screening. PROPOSED: research concept exploring cTnI testing, OCR and a chatbot; no clinical validation or emergency-service integration is asserted. EVIDENCE: local competition posters describe the proposal, but do not independently validate clinical use.

UNKNOWN [NEEDS OWNER CONFIRMATION]: exact depa 2025 date and project name; regional versus national dates for depa 2026; official English spelling of name/school; implemented versus proposed PhishWall detection pipeline; current production domain. Missing dates remain omitted. No resume or live-demo link is invented.

## Information architecture and strategy

Hero: identify an AI student building computer-vision and connected-device prototypes; direct visitors to work or contact.
Work: five project case studies, each once, with role, purpose, evidence and source links.
Awards and activities: all seven achievements/training/exhibition entries with photographs; science award stays here.
About and skills: school context, learning approach, compact icon-and-label capabilities.
Contact: direct channels with meaningful labels; no generic sales slogan or redundant gallery. Photos remain accessible in case studies.

Visual system: deep navy #082c40, ocean #11546a, pale blue #edf6f8, white #ffffff, muted blue #acc5cf and cyan #8bdfdf. System sans-serif with Thai fallbacks; heading sizes bounded to avoid giant name text. 1120px container; 8/12/16/24/32/48/72px spacing; 12/20px radii. One purposeful porthole-like process illustration connects observation, code and prototypes. All other imagery is supplied work. No continuous animation.

Project cards keep a short summary and role. Full problem, approach, learning and media live in keyboard-accessible native dialogs. Media controls use ordinary toggle buttons, avoiding incomplete ARIA tabs. Focus returns correctly through image lightboxes. Reference: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ .

## Implementation order

1. `index.html`: semantic layout, navigation, metadata, actual removal of timeline and inline CSS.
2. `content.js`, `site-data.js`: centralized bilingual copy, supported technical descriptions and distinct project/award records.
3. `app.js`: simple renderers, native buttons, robust nested dialog focus, on-demand PDF/video content, media/download/source access.
4. `styles.css`: token-based responsive design, visible focus, reduced-motion support, mobile navigation.
5. `scripts/optimize-images.mjs`: derived WebP covers/thumbnails; originals preserved for viewing/download.
6. QA: all requested widths, both languages, dialog/lightbox keyboard behavior, resource errors, build/data tests, external source checks.

No framework migration is warranted. Canonical URL and sitemap need a confirmed production domain; relative social preview is provided until then. Original videos remain available with no preload; transcoding can be considered separately without discarding originals.

## Additional correction

The TIRA certificate was visually checked during implementation. It records 30 hours, online on 14, 15, and 22 June 2568 and onsite in Nakhon Ratchasima on 20–21 September 2568. The old 14 February 2026 date and Suan Sunandha venue were unsupported and have been replaced in both languages.

## QA results

- Seven Node content/asset tests pass; all three production modules pass syntax checks.
- Five projects and seven distinct award/activity entries render. The timeline and redundant gallery are removed; their photographs remain in the relevant stories.
- No horizontal overflow at 320, 375, 430, 768, 1024, 1280, 1440, or 1920 pixels, in English and Thai.
- Native keyboard activation, mobile menu Escape, modal Escape, and nested image/story focus restoration pass in both languages.
- All homepage images decode. All twelve stories and their media categories were opened; photo, poster, and certificate thumbnails decode.
- Videos use no preload. Playback itself was not assessed end-to-end.
- Axe 4.10.3 reports zero WCAG A/AA violations on the English homepage, Thai mobile homepage, and an open story dialog. This is an automated check, not a complete accessibility certification.
- No JavaScript page errors during the responsive run.
- All 64 referenced images have two WebP sizes. Originals total 54,275,072 bytes; both derivative sets total 8,772,570 bytes.
- GitHub project links and research publication respond HTTP 200. The school site rejects the automated HEAD request; its destination is retained. Social login destinations are not independently verified.
- Desktop and Thai/English mobile screenshots were visually inspected. Browser CSS caching exposed the old design until version queries were added.

## Questions for the owner

1. What are the exact depa 2025 participation dates and project name?
2. Which depa 2026 round occurred on 21–23 August? What are the other round’s dates?
3. Which English name spelling should be authoritative: Srichankaew (current portfolio) or Srijankaew (certificate/repository)?
4. What is the confirmed public production domain?
5. Which PhishWall detection components are implemented, and is there a source repository or evaluation report?
6. Confirm the Hairline Detector event date (the old 5 June 2026 date is omitted pending confirmation), plus missing PhishWall and TropoSense dates.

The unused Orion PDF remains in the asset library; its project mapping is not inferred.

Independent code review found no blocking issues. English media captions/accessible names now have language markup. iDektep intentionally retains its competition poster as the cover, matching the owner's specific request; event photographs remain in its media browser.
