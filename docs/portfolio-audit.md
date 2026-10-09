# Portfolio audit and redesign — 28 September 2026

## Latest motion correction — 9 October 2026

Approved loading-screen follow-up: restored smooth motion while retaining pixel artwork. Power-up now shows Bit walking across a 0–100% intro progress bar, followed by a brief completed state and monitor expansion; total approximately 2.2 seconds. This percentage represents the intro, not asset downloads. Skip/Escape cancel animation frames and timers. Added a real-browser check for visible progress, movement, reaching 100% before exit and mobile layout. This supersedes the stepped-motion description below.

At the user's explicit request, animations now default on independently of the browser's reduced-motion signal. Homepage and Settings switches use the same persistent explicit preference; Off disables all animation and startup. Removed the temporary Preview control. Power-up runs on every animated root-page load, with immediate skip and deep-link bypass. Water, scene details, gaze transitions and opening windows now use stepped pixel motion.

Verification: the new `scripts/pixel-default-check.js` passes with browser reduced motion enabled, including startup, actual cursor tracking, both switches, persistence, replay, five viewport widths and a direct project URL. All 26 Node tests and build syntax checks pass. Earlier entries below are historical; their OS-priority/once-per-session/Preview behavior is superseded. Figma synchronization remains pending because its Starter tool quota blocked this turn's call. No push or deployment.

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

## PIXEL//OS update — 9 October 2026

This section supersedes the historical visual/architecture notes above. The implementation remains static HTML/CSS/ES modules, now with seven functional desktop apps, original SVG pixel art, bounded pointer dragging, focus stacking, minimize/restore/maximize, a launcher/taskbar/clock, persistent preferences and fullscreen mobile apps. Project and experience details are full pages rather than story dialogs. Native image dialogs and the lazy PDF reader are retained.

Content corrections: owner name is Tankhun Srijankaew; school is Marie Vithaya School, Nakhon Ratchasima; class is Mathayom 5/10 in the AI programme. depa 2025 is the CiRA Core weed-detection vehicle with servo-controlled spot spraying, national qualification and participation. depa 2026 is Central Isan regional Bronze plus national qualification among 210 teams, with no national award; 21–23 August is the national date, not the unconfirmed regional date. PhishWall includes workshop attendance, seven-day proposal/video submission and failure to qualify; its subsequent working prototype is owner-confirmed, without published source/benchmarks. TropoSense's 24 October final remains future, not attended.

Six project files include the depa 2025 vehicle. Ten experience files comprise eight competition records and two non-competition activities. The Gold science-project award remains tied to Grow a Garden, with the original certificate and photographs. Heritage AI cover now uses the real live-camera prototype screenshot; its screenshot captions identify dashboards, camera detection, visitor pages, code and LINE alerts rather than incorrectly calling them event photographs.

Verification: fifteen Node tests pass; build syntax checks pass. Browser checks pass English/Thai at 320, 375, 430, 768, 1024, 1280, 1440 and 1920 pixels without horizontal overflow. Window controls, bounded dragging, all apps, persistent preferences, reduced motion, image viewing and mobile fullscreen panels pass. All six project and ten experience routes load directly; project refresh, keyboard activation, browser back/forward, mobile app switching and desktop resize restoration pass. All case-cover images decode. Missing-media requests return 404, not the HTML shell. Both demo videos play at 1280px with real poster frames; mobile PDF rendering/zoom, pagination and fullscreen pass. No JavaScript page errors occurred. PDF.js emits one non-blocking TrueType font warning for an existing document. These checks are not a complete accessibility certification.

Figma board `5:2` contains the editable PIXEL//OS palette and typography direction, not a full screen mockup. Website previews are under ignored `output/playwright`. No production push/deployment was performed in this redesign task. Vercel route rewrites were prepared but are not yet tested against a deployed build.

Still unknown: actual depa 2025 participation dates; depa 2026 regional dates; exact PhishWall attendance dates; TropoSense selection-round participation date; confirmed production domain; quantitative performance measurements. Certificate-issue dates are not substituted for attendance dates. Original assets and unmapped Orion PDF are preserved.

### PIXEL//OS polish — 9 October 2026

The follow-up keeps the existing pixel palette, type and window chrome. Project covers now use a consistent 16:9 frame and separate bilingual award/stage/prototype labels. PhishWall explicitly separates its later working prototype from its non-qualifying proposal; TropoSense remains a research concept with a selection-stage award, not a completed national-final result.

Memories opens with a three-column desktop / two-column mobile contact sheet across all nine photo albums. Selecting a frame opens the original image; closing it restores keyboard focus. The optional single-photo browser remains available below the sheet.

Desktop window position, dimensions and maximized state persist in local browser storage. Restored geometry is validated and bounded to the current workspace; mobile panels remain fullscreen and do not overwrite desktop geometry. No resize handle was added.

Verification: nineteen Node tests and build syntax checks pass. The responsive browser suite passes English/Thai at all eight supported test widths. The polish browser check passes drag/reload restoration, saved dimensions, maximized restoration, mobile isolation, all nine contact sheets and photo-viewer focus restoration with no JavaScript errors. No push or deployment was performed.

### Interactive homepage — 9 October 2026

Visibility correction: reduced motion was active in the user's preview, suppressing all animation. Added an inline explanation and explicit, reversible, page-only animation preview. Default reduced motion remains respected. The preview browser check passes actual Bit gaze and wave with reduced motion enabled, then verifies Stop preview and reload restore the default. No OS preference, push or deployment changes.

Scene-animation follow-up: independent Sky code-glyph motion, Mint foliage sway with fixed pots, and Dusk telescope-head rotation with a fixed stand and staggered soft star twinkles. Loops pause behind apps, case studies and dialogs. All 26 Node tests and build checks pass; the scene browser check confirms actual movement and motion safeguards in all three themes. Mint and Dusk screenshots were visually inspected. No push or deployment.

Final polish: added bounded desktop-only mascot eye tracking with 900ms idle reset, an automatic 450ms monitor expansion/fade at the end of startup, and a compact mobile tide below Bit. Skip/Escape remain immediate; system reduced motion disables tracking and flow and bypasses the intro. Total automatic intro remains 1.8 seconds. The final dedicated browser check passes, and the eight-width English/Thai app regression suite passes. All 25 Node tests and build checks pass. Updated Figma implementation notes; no push or deployment.

Additional motion polish: seamless tiled water loops replace reversing drift. Island clicks trigger a 650ms ripple; new app windows expand from the launch button in 300ms. Existing app restoration remains immediate. The dedicated flow browser check and the eight-width bilingual app regression suite pass, along with all 24 Node tests and build checks. Figma motion notes were updated and their text clipping corrected. No push or deployment.

Power-up follow-up: added a 1.8-second native modal intro, session-scoped first-visit behavior, Enter now/Escape skipping, automatic focus restoration and Settings replay. Deep links and reduced-motion/motion-off preferences bypass the intro. Added independent 4-second mascot idle motion and theme-tinted layered water flow, paused behind apps. Water is desktop-only with the existing scene; the mascot and intro remain available on mobile. The artwork board now includes the original water vector and motion implementation notes. Twenty-four Node tests, build checks, the dedicated power-up browser check, homepage checks and the eight-width bilingual app regression suite pass. No push or deployment.

Added original Bit SVG artwork with separately animated eyes and arm. Click or Enter advances a bilingual portfolio hint and triggers an 800ms wave when motion is enabled. Added direct homepage scene controls for Sky (floating workbench), Mint (garden lab) and Dusk (night observatory). Each renders different original vector artwork and persists its selection; Settings stays synchronized. Desktop artwork gently floats, follows the mouse within a small range and opens Projects when clicked. Ambient motion pauses behind apps, respects system reduced motion and the user's motion-off preference, and never plays sound. Mobile keeps the mascot and scene controls but hides the large artwork to avoid crowding.

Figma artwork board `9:2` holds editable versions of all three scenes and the mascot, alongside the retained palette and prior direction boards. The final Figma composition was visually inspected. This is not a full-page mockup or a Figma animation prototype.

Verification: twenty-two Node tests and build syntax checks pass. Homepage checks pass mascot click/Enter, hint cycling, three distinct scenes, persisted selection, Settings synchronization, paused background animation, motion-off, system reduced motion, parallax and scene-to-Projects navigation. Both languages pass seven homepage widths plus 650px-high laptop checks. The existing eight-width responsive/app suite also passes. No JavaScript errors, push or deployment.
