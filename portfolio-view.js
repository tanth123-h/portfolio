import { portfolio } from "./site-data.js";
import { catalog } from "./catalog.js";
import { ui, thEntries } from "./content.js";
import { routeFor } from "./os-state.js";
export { portfolio };
export const entries = [...catalog.competitions, ...catalog.activities];
export const projects = entries.filter(
  (e) =>
    portfolio.projects.some((p) => p.id === e.id) ||
    e.id === "depa-2025-national",
);
let language = "en";
export const setLanguage = (v) => {
  language = v;
  document.documentElement.lang = v;
};
export const getLanguage = () => language;
export const copy = () => ui[language];
export const e = (v = "") =>
  String(v).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const local = (raw) =>
  language === "th" ? { ...raw, ...thEntries[raw.id] } : raw;
export const asset = (src) => src?.replace(/^\.\//, "/") || "";
export const date = (raw) =>
  (language === "th" ? raw.dateTh : raw.date) || copy().dateUnknown;
export const optimized = (src, w = 640) =>
  "/public/assets/optimized/" +
  src.replace(/^\.?\/public\/assets\//, "").replace(/[/.]/g, "-") +
  "-" +
  w +
  ".webp";
export function cover(raw) {
  if (raw.id === "youth-innovation")
    return raw.media.photos.find((item) =>
      item.src.endsWith("youth-innovation-2.png"),
    );
  if (raw.id === "cityflowbkk")
    return raw.media.photos.find((item) =>
      item.src.endsWith("cityflowbkk-event-2.jpg"),
    );
  if (raw.id === "agri")
    return {
      src: "./public/assets/photos/grow-a-garden-science/04-project-display.jpg",
      alt: "Grow a Garden software and sensor hardware demonstrated together",
      title: "Grow a Garden prototype",
    };
  if (["phishwall-ai", "troposense"].includes(raw.id))
    return {
      src:
        "./public/assets/previews/" +
        (raw.id === "phishwall-ai" ? "phishwall-demo" : "troposense-pitch") +
        ".jpg",
      alt: raw.title + " video preview",
      title: raw.title,
    };
  return (
    raw.media.photos[0] ||
    raw.media.certificateImages[0] ||
    raw.media.graphics[0]
  );
}
export function image(item) {
  if (!item) return "";
  const preview = item.src.includes("/previews/");
  return `<img src="${e(preview ? asset(item.src) : optimized(item.src))}" ${preview ? "" : `srcset="${optimized(item.src)} 640w, ${optimized(item.src, 1200)} 1200w" sizes="(max-width:700px) 100vw, 650px"`} alt="${e(item.alt || item.title)}" loading="lazy" decoding="async">`;
}
export function icon(label) {
  const logos = {
    python: "python",
    javascript: "javascript",
    html: "html5",
    css: "css3",
    opencv: "opencv",
    jupyter: "jupyter",
    arduino: "arduino",
    flutter: "flutter",
    kotlin: "kotlin",
    fastapi: "fastapi",
    c: "c",
  };
  const key = label.toLowerCase(),
    match = Object.keys(logos).find(
      (k) => key === k || (k !== "c" && key.includes(k)),
    );
  if (match)
    return `<img class="icon" src="/public/assets/icons/${logos[match]}.svg" alt="">`;
  const paths = {
    tree: "M12 3v7M5 10h14M5 10v7M19 10v7M9 2h6v5H9ZM2 17h6v5H2ZM16 17h6v5h-6Z",
    vision:
      "M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    chat: "M4 4h16v12H9l-5 4V4Zm4 5h8m-8 3h5",
    research: "M9 3h6m-5 0v7l-5 9v2h14v-2l-5-9V3M8 16h8",
    people: "M15 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M5 21v-3a7 7 0 0 1 14 0v3",
    chip: "M6 6h12v12H6zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4",
  };
  const kind = /tree/.test(key)
    ? "tree"
    : /detect|vision|classification|ocr/.test(key)
      ? "vision"
      : /rag|chat/.test(key)
        ? "chat"
        : /research|วิจัย/.test(key)
          ? "research"
          : /lead|pitch|team|ทีม|นำเสนอ/.test(key)
            ? "people"
            : "chip";
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[kind]}" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
}
export const badges = (raw) =>
  `<div class="detail-skills">${(raw.skills || []).map((s) => `<span>${icon(s)}${e(s)}</span>`).join("")}</div>`;
export function display(raw, kind = "projects") {
  const awardId =
    raw.id === "agri"
      ? "depa-2026-third-place"
      : raw.id === "youth-innovation"
        ? "youth-bronze"
        : raw.id;
  return local(
    kind === "achievements"
      ? portfolio.achievements.find((p) => p.id === awardId) || raw
      : raw,
  );
}
export function fileCard(raw, kind = "projects") {
  const item = display(raw, kind);
  const labels = kind === "projects" ? projectLabels(raw.id) : [];
  return `<a class="file-card" href="${routeFor(raw.id, kind)}" data-route><div class="file-cover">${image(cover(raw))}</div><div>${labels.length ? `<div class="project-labels">${labels.map((p) => `<span class="project-label ${p.tone}">${e(p[language])}</span>`).join("")}</div>` : ""}<p class="file-type">${e(item.type)}</p><h3>${e(item.title)}</h3><p class="date">${["agri", "depa-2026-third-place"].includes(raw.id) ? (language === "th" ? "รอบประเทศ: " : "National round: ") : ""}${e(date(item))}</p><p class="file-result">${e(item.outcome || item.summary)}</p><p class="file-role"><strong>${copy().role}</strong> ${e(local(raw).whatIDid)}</p><span class="file-open">${copy().open} ↗</span></div></a>`;
}
export function projectLabels(id) {
  const label = (en, th, tone = "stage") => ({ en, th, tone });
  return (
    {
      agri: [
        label("Regional Bronze", "Bronze ระดับภูมิภาค", "award"),
        label("National · 210 teams", "รอบประเทศ · 210 ทีม"),
      ],
      "youth-innovation": [
        label("National Bronze", "Bronze ระดับประเทศ", "award"),
        label("AIoT prototype", "ต้นแบบ AIoT", "prototype"),
      ],
      cityflowbkk: [
        label("Top 20 finalist", "รอบสุดท้าย 20 ทีม"),
        label("App prototype", "ต้นแบบแอป", "prototype"),
      ],
      "phishwall-ai": [
        label("Working prototype", "ต้นแบบใช้งานได้", "prototype"),
        label("Proposal · not qualified", "ส่งข้อเสนอ · ไม่ผ่านเข้ารอบ"),
      ],
      troposense: [
        label("Research concept", "แนวคิดวิจัย", "prototype"),
        label("Selection Gold", "Gold รอบคัดเลือก", "award"),
      ],
      "depa-2025-national": [
        label("National qualifier", "ผ่านเข้ารอบประเทศ"),
        label("Vehicle prototype", "ต้นแบบรถ", "prototype"),
      ],
    }[id] || []
  );
}
export function contactSheet(photos) {
  return `<div class="contact-sheet">${photos.map((p, i) => `<button class="contact-photo media-image" data-image="${e(asset(p.src))}" data-alt="${e(p.alt || p.title)}">${image(p)}<span><span class="photo-number">${String(i + 1).padStart(2, "0")}</span>${e(p.title)}</span></button>`).join("")}</div>`;
}
export function overview(raw) {
  const item = local(raw),
    p = cover(raw),
    fields = [
      ["problem", "problem"],
      ["role", "whatIDid"],
      ["approach", "approach"],
      ["challenge", "challenge"],
      ["outcome", "outcome"],
      ["learned", "whatILearned"],
    ];
  return `${p ? `<button class="case-hero media-image" data-image="${e(asset(p.src))}" data-alt="${e(p.alt || p.title)}">${image(p)}<span>${e(p.title)} ↗</span></button>` : ""}<div class="detail-grid">${fields
    .filter(([, key]) => item[key])
    .map(
      ([label, key]) =>
        `<section class="detail-block"><h2>${copy()[label]}</h2><p>${e(item[key])}</p></section>`,
    )
    .join("")}</div>${badges(item)}<div class="detail-links">${Object.entries(
    item.links || {},
  )
    .map(
      ([label, url]) =>
        `<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${label === "github" ? copy().source : copy().publication} ↗</a>`,
    )
    .join("")}</div>`;
}
export function media(raw, group) {
  if (group === "overview") return overview(raw);
  return (raw.media[group] || [])
    .map((item) => {
      const src = asset(item.src);
      if (group === "pdfs")
        return `<section class="document-block"><div class="file-row"><h2>${e(item.title)}</h2><a href="${e(src)}" target="_blank" rel="noopener noreferrer">${copy().openFile} ↗</a><a href="${e(src)}" download>${copy().download}</a></div><div class="pdf-preview" data-pdf="${e(src)}"></div></section>`;
      if (group === "videos")
        return `<section class="video-block"><h2>${e(item.title)}</h2><video controls playsinline preload="none" aria-label="${e(item.title)}" poster="${e(src.replace("/videos/", "/previews/").replace(".mp4", ".jpg"))}" src="${e(src.replace("/videos/", "/video-web/"))}"></video><a href="${e(src)}" download>${copy().download}</a></section>`;
      return `<button class="media-image" data-image="${e(src)}" data-alt="${e(item.alt || item.title)}">${image(item)}<span>${e(item.title)} ↗</span></button>`;
    })
    .join("");
}
