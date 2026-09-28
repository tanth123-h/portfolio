import { portfolio } from "./site-data.js?v=20260928";
import { ui, thEntries } from "./content.js?v=20260928";

const $ = (selector, root = document) => root.querySelector(selector);
let language = "en";
const copy = () => ui[language];
const escape = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const entries = [...portfolio.projects, ...portfolio.achievements];
const local = (entry) =>
  language === "th" ? { ...entry, ...thEntries[entry.id] } : entry;
const optimized = (src, width = 640) =>
  "./public/assets/optimized/" +
  src.replace("./public/assets/", "").replace(/[/.]/g, "-") +
  "-" +
  width +
  ".webp";
const date = (entry) => (language === "th" ? entry.dateTh : entry.date);
const external = 'target="_blank" rel="noopener noreferrer"';
const conceptPath = {
  vision:
    "M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  tree: "M12 3v7M5 10h14M5 10v7M19 10v7M9 3h6v4H9Z M2 17h6v4H2Z M16 17h6v4h-6Z",
  chip: "M7 7h10v10H7ZM9 2v5m6-5v5M9 17v5m6-5v5M2 9h5m-5 6h5m10-6h5m-5 6h5",
  chat: "M4 4h16v12H9l-5 4V4Zm4 5h8m-8 3h5",
  research: "M9 3h6m-5 0v7l-5 9v2h14v-2l-5-9V3M8 16h8",
  people: "M15 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M5 21v-3a7 7 0 0 1 14 0v3",
  code: "m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18",
};
function icon(label) {
  const key = label.toLowerCase();
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
  };
  const match = Object.keys(logos).find((name) => key.includes(name));
  if (match || key === "c")
    return (
      '<img class="icon" alt="" width="20" height="20" src="./public/assets/icons/' +
      (match ? logos[match] : "c") +
      '.svg">'
    );
  const path = /tree/.test(key)
    ? "tree"
    : /yolo|vision|detect|classification|ocr/.test(key)
      ? "vision"
      : /rag|chat/.test(key)
        ? "chat"
        : /research|วิจัย/.test(key)
          ? "research"
          : /lead|pitch|นำเสนอ|ทีม/.test(key)
            ? "people"
            : /iot|edge|hardware|ฮาร์ดแวร์/.test(key)
              ? "chip"
              : "code";
  return (
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="' +
    conceptPath[path] +
    '"/></svg>'
  );
}
function image(item, cover = false) {
  return (
    '<img lang="en" src="' +
    optimized(item.src) +
    '" srcset="' +
    optimized(item.src) +
    " 640w, " +
    optimized(item.src, 1200) +
    ' 1200w" sizes="' +
    (cover
      ? "(max-width:760px) 100vw, 560px"
      : "(max-width:480px) 100vw, 420px") +
    '" width="1200" height="800" loading="lazy" decoding="async" alt="' +
    escape(item.alt || item.title) +
    '">'
  );
}
function card(raw, award = false, index = 0) {
  const entry = local(raw);
  const featured =
    raw.media.graphics[0] ||
    raw.media.photos[0] ||
    raw.media.certificateImages[0];
  const poster =
    raw.media.graphics.includes(featured) ||
    raw.media.certificateImages.includes(featured);
  const role = award
    ? ""
    : '<p class="card-role"><strong>' +
      copy().role +
      "</strong>" +
      escape(entry.whatIDid) +
      '</p><div class="detail-skills">' +
      entry.skills
        .slice(0, 3)
        .map((label) => "<span>" + icon(label) + escape(label) + "</span>")
        .join("") +
      "</div>";
  return (
    '<article class="' +
    (award ? "award-card" : "project-card") +
    '" id="entry-' +
    raw.id +
    '"><div class="cover' +
    (poster ? " poster" : "") +
    '">' +
    image(featured, true) +
    '</div><div class="card-body"><p class="eyebrow">' +
    escape(entry.type) +
    "</p><h3>" +
    escape(entry.title) +
    "</h3>" +
    (date(entry) ? '<p class="date">' + escape(date(entry)) + "</p>" : "") +
    "<p>" +
    escape(entry.summary) +
    "</p>" +
    (entry.outcome
      ? '<p class="outcome">' + escape(entry.outcome) + "</p>"
      : "") +
    role +
    '<div class="card-bottom"><button class="story-button" type="button" data-entry="' +
    entry.id +
    '" aria-label="' +
    escape((award ? copy().details : copy().open) + ": " + entry.title) +
    '">' +
    (award ? copy().details : copy().open) +
    ' <span aria-hidden="true">↗</span></button><span class="entry-number" aria-hidden="true">' +
    String(index + 1).padStart(2, "0") +
    "</span></div></div></article>"
  );
}
function renderSkills() {
  const groups = [
    [
      copy().ai,
      [
        "OpenCV",
        "Object detection",
        "Image classification",
        "Decision Tree AI",
        "Edge AI",
        "RAG chatbot",
      ],
    ],
    [
      copy().code,
      ["Python", "Jupyter Notebook", "HTML", "CSS", "JavaScript", "C"],
    ],
    [
      copy().make,
      [
        "Arduino",
        "IoT / hardware",
        "Research",
        "Project leadership",
        "Pitching",
      ],
    ],
  ];
  $("#skills-grid").innerHTML = groups
    .map(
      ([title, items]) =>
        '<div class="skill-group"><h4>' +
        title +
        '</h4><div class="skill-list">' +
        items
          .map(
            (label) =>
              '<span class="skill-chip">' +
              icon(label) +
              escape(label) +
              "</span>",
          )
          .join("") +
        "</div></div>",
    )
    .join("");
}
function renderContact() {
  const contact = portfolio.profile.contact;
  const links = [
    ["GitHub", contact.github, "github"],
    ["Instagram", contact.instagram, "instagram"],
    ["Facebook", contact.facebook, "facebook"],
    ["Discord", contact.discord, "discord"],
    [copy().phone, "tel:" + contact.phone, "phone"],
  ];
  $("#contact-links").innerHTML = links
    .map(
      ([label, url, name]) =>
        '<a href="' +
        escape(url) +
        '" ' +
        (url.startsWith("http") ? external : "") +
        '><img class="icon" src="./public/assets/icons/' +
        name +
        '.svg" alt="" width="20" height="20">' +
        escape(label) +
        "</a>",
    )
    .join("");
}
function render() {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-text]").forEach((node) => {
    node.textContent = copy()[node.dataset.text];
  });
  $("#language-toggle").textContent = language === "en" ? "TH" : "EN";
  $("#language-toggle").setAttribute(
    "aria-label",
    language === "en" ? "Switch to Thai" : "Switch to English",
  );
  $("#projects-grid").innerHTML = portfolio.projects
    .map((entry, index) => card(entry, false, index))
    .join("");
  const order = [
    "grow-a-garden-science",
    "depa-2026-third-place",
    "youth-bronze",
    "idektep-honorable-mention",
    "depa-2025-national",
    "tira-iot-training",
    "minister-exhibition",
  ];
  $("#achievements-grid").innerHTML = order
    .map((id, index) =>
      card(
        portfolio.achievements.find((entry) => entry.id === id),
        true,
        index,
      ),
    )
    .join("");
  renderSkills();
  renderContact();
}
const returnFocus = new WeakMap();
function show(dialog, trigger) {
  returnFocus.set(dialog, trigger);
  dialog.showModal();
  ($("[data-close]", dialog) || dialog).focus();
}
function overview(entry) {
  const fields = [
    ["problem", "problem"],
    ["role", "whatIDid"],
    ["approach", "approach"],
    ["challenge", "challenge"],
    ["learned", "whatILearned"],
    ["outcome", "outcome"],
  ];
  return (
    '<div class="detail-grid">' +
    fields
      .filter(([, field]) => entry[field])
      .map(
        ([label, field]) =>
          '<section class="detail-block"><h3>' +
          copy()[label] +
          "</h3><p>" +
          escape(entry[field]) +
          "</p></section>",
      )
      .join("") +
    '</div><div class="detail-skills">' +
    entry.skills
      .map((label) => "<span>" + icon(label) + escape(label) + "</span>")
      .join("") +
    '</div><div class="detail-links">' +
    Object.entries(entry.links || {})
      .map(
        ([label, url]) =>
          '<a href="' +
          escape(url) +
          '" ' +
          external +
          ">" +
          escape(label === "github" ? copy().source : copy().publication) +
          " ↗</a>",
      )
      .join("") +
    "</div>"
  );
}
function media(entry, group) {
  if (group === "overview") return overview(entry);
  const items = entry.media[group] || [];
  if (group === "pdfs")
    return items
      .map(
        (item) =>
          '<div class="file-row"><h3 lang="en">' +
          escape(item.title) +
          '</h3><div class="file-actions"><a href="' +
          escape(item.src) +
          '" ' +
          external +
          ">" +
          copy().openFile +
          ' ↗</a><a href="' +
          escape(item.src) +
          '" download>' +
          copy().download +
          "</a></div></div>",
      )
      .join("");
  if (group === "videos")
    return items
      .map(
        (item) =>
          '<div class="video-block"><h3 lang="en">' +
          escape(item.title) +
          "</h3><p>" +
          copy().videoNote +
          '</p><video lang="en" controls preload="none" aria-label="' +
          escape(item.title) +
          '" src="' +
          escape(item.src) +
          '"></video><div class="file-actions"><a href="' +
          escape(item.src) +
          '" download>' +
          copy().download +
          "</a></div></div>",
      )
      .join("");
  return (
    '<div class="media-images">' +
    items
      .map(
        (item) =>
          '<button type="button" lang="en" class="media-image" data-image="' +
          escape(item.src) +
          '" data-alt="' +
          escape(item.alt || item.title) +
          '">' +
          image(item) +
          "<span>" +
          escape(item.title) +
          " ↗</span></button>",
      )
      .join("") +
    "</div>"
  );
}
let activeEntry;
function openEntry(id, trigger) {
  const raw = entries.find((entry) => entry.id === id);
  if (!raw) return;
  activeEntry = local(raw);
  const entry = activeEntry;
  const dialog = $("#portfolio-dialog");
  const groups = [
    "overview",
    ...Object.keys(entry.media).filter((key) => entry.media[key].length),
  ];
  dialog.innerHTML =
    '<div class="dialog-top"><div><p class="eyebrow">' +
    escape(entry.type) +
    '</p><h2 id="dialog-title">' +
    escape(entry.title) +
    '</h2><p class="dialog-summary">' +
    escape(entry.summary) +
    '</p><p class="date">' +
    escape(date(entry) || copy().dateUnknown) +
    "</p>" +
    (entry.id.includes("depa-2026") || entry.id === "agri"
      ? '<p class="date">' + copy().dateContext + "</p>"
      : "") +
    '</div><button class="close-button" type="button" data-close aria-label="' +
    copy().close +
    '">×</button></div><div class="media-controls" aria-label="' +
    copy().details +
    '">' +
    groups
      .map(
        (group) =>
          '<button type="button" data-group="' +
          group +
          '" aria-controls="media-panel" aria-pressed="' +
          (group === "overview") +
          '">' +
          copy()[group] +
          "</button>",
      )
      .join("") +
    '</div><div class="media-panel" id="media-panel">' +
    overview(entry) +
    "</div>";
  show(dialog, trigger);
}
function openImage(trigger) {
  const dialog = $("#lightbox");
  dialog.setAttribute("aria-label", trigger.dataset.alt);
  dialog.innerHTML =
    '<div class="lightbox-head"><a href="' +
    escape(trigger.dataset.image) +
    '" download>' +
    copy().download +
    '</a><button type="button" class="close-button" data-close aria-label="' +
    copy().close +
    '">×</button></div><img src="' +
    escape(trigger.dataset.image) +
    '" alt="' +
    escape(trigger.dataset.alt) +
    '">';
  show(dialog, trigger);
}
for (const dialog of document.querySelectorAll("dialog")) {
  dialog.addEventListener("close", () => {
    dialog.querySelectorAll("video").forEach((video) => video.pause());
    returnFocus.get(dialog)?.focus();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close();
    }
  });
}
document.addEventListener("click", (event) => {
  const trigger = event.target.closest("button");
  if (!trigger) return;
  if (trigger.dataset.entry) openEntry(trigger.dataset.entry, trigger);
  if (trigger.hasAttribute("data-close")) trigger.closest("dialog").close();
  if (trigger.dataset.image) openImage(trigger);
  if (trigger.dataset.group) {
    const dialog = trigger.closest("dialog");
    dialog.querySelectorAll("video").forEach((video) => video.pause());
    dialog
      .querySelectorAll("[data-group]")
      .forEach((button) =>
        button.setAttribute("aria-pressed", String(button === trigger)),
      );
    $("#media-panel").innerHTML = media(activeEntry, trigger.dataset.group);
    dialog.scrollTop = 0;
  }
});
function closeMenu() {
  $("#nav-links").classList.remove("open");
  $(".nav-toggle").setAttribute("aria-expanded", "false");
}
$(".nav-toggle").addEventListener("click", () => {
  const open = $("#nav-links").classList.toggle("open");
  $(".nav-toggle").setAttribute("aria-expanded", String(open));
});
$("#nav-links").addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && $("#nav-links").classList.contains("open")) {
    closeMenu();
    $(".nav-toggle").focus();
  }
});
$("#language-toggle").addEventListener("click", () => {
  language = language === "en" ? "th" : "en";
  render();
});
render();
