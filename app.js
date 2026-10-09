import { sprite, scene, water, mascot, buddyMessage } from "./pixel-art.js";
import { shouldBoot, buddyGaze } from "./boot-state.js";
import {
  boundedPosition,
  resolveRoute,
  routeFor,
  restoreWindowGeometry,
} from "./os-state.js";
import {
  portfolio,
  entries,
  projects,
  setLanguage,
  getLanguage,
  copy,
  e,
  local,
  display,
  asset,
  date,
  image,
  badges,
  fileCard,
  overview,
  media,
  contactSheet,
} from "./portfolio-view.js";
const $ = (s) => document.querySelector(s);
const apps = {
  projects: "PROJECTS.EXE",
  achievements: "ACHIEVEMENTS.EXE",
  memories: "MEMORIES.EXE",
  about: "ABOUT.TXT",
  research: "RESEARCH.EXE",
  contact: "CONTACT.APP",
  settings: "SETTINGS",
};
const windows = new Map();
let layer = 10,
  active = null,
  current = null,
  lastTrigger = null,
  lastImageTrigger;
let buddyIndex = 0,
  buddyTimer;
const small = () => matchMedia("(max-width:800px)").matches;
const text = (en, th) => (getLanguage() === "th" ? th : en);
const reducedMotion = () => !motion;
function motionHint() {
  const hint = $("#motion-notice");
  hint.hidden = false;
  hint.innerHTML = `<button data-motion aria-pressed="${motion}">${motion ? text("Motion on · Turn off", "Motion เปิด · กดเพื่อปิด") : text("Motion off · Turn on", "Motion ปิด · กดเพื่อเปิด")}</button>`;
}
let bootTimer, bootFrame, bootTrigger;
let gazeTimer;
function resetGaze() {
  clearTimeout(gazeTimer);
  $("#pixel-buddy").style.removeProperty("--gaze-x");
  $("#pixel-buddy").style.removeProperty("--gaze-y");
}
function dismissBoot(animate = false) {
  clearTimeout(bootTimer);
  cancelAnimationFrame(bootFrame);
  if (animate && $("#boot-screen").open && motion && !reducedMotion()) {
    $("#boot-screen").classList.add("boot-leaving");
    bootTimer = setTimeout(() => dismissBoot(), 450);
    return;
  }
  $("#boot-screen").classList.remove("boot-leaving", "boot-ready");
  if ($("#boot-screen").open) $("#boot-screen").close();
}
function startBoot(replay = false) {
  if (
    !shouldBoot({
      path: location.pathname,
      seen: false,
      motion,
      reduced: reducedMotion(),
    })
  )
    return;
  clearTimeout(bootTimer);
  cancelAnimationFrame(bootFrame);
  bootTrigger = document.activeElement;
  $("#boot-screen").classList.remove("boot-ready", "boot-leaving");
  $("#boot-title").textContent = text(
    "Starting your desktop…",
    "กำลังเปิดโลกเล็ก ๆ ของผม…",
  );
  $("#boot-caption").textContent = text(
    "A quick hello from Bit. Your desktop is next.",
    "Bit ขอทักทายสักครู่ แล้วพบกันที่หน้าแรก",
  );
  $(".boot-walker").innerHTML = mascot();
  $("#boot-progress").setAttribute(
    "aria-label",
    text("Startup animation", "ความคืบหน้าหน้าเปิดเว็บ"),
  );
  $("#boot-progress").setAttribute("aria-valuenow", "0");
  $("#boot-percent").textContent = "0%";
  $(".boot-display").style.setProperty("--boot-progress", 0);
  $("#boot-skip").textContent = text("Enter now ↗", "เข้าเลย ↗");
  $("#boot-screen").showModal();
  const started = performance.now();
  const advance = (now) => {
    if (!$("#boot-screen").open) return;
    const fraction = Math.min(1, (now - started) / 1600);
    const percent = Math.floor(fraction * 100);
    $(".boot-display").style.setProperty("--boot-progress", fraction);
    $("#boot-progress").setAttribute("aria-valuenow", percent);
    $("#boot-percent").textContent = `${percent}%`;
    if (fraction < 1) bootFrame = requestAnimationFrame(advance);
    else {
      $("#boot-screen").classList.add("boot-ready");
      $("#boot-title").textContent = text(
        "Ready. Hello, world!",
        "พร้อมแล้ว สวัสดีครับ!",
      );
      bootTimer = setTimeout(() => dismissBoot(true), 650);
    }
  };
  bootFrame = requestAnimationFrame(advance);
}
$("#boot-skip").addEventListener("click", () => dismissBoot());
$("#boot-screen").addEventListener("close", () => {
  clearTimeout(bootTimer);
  cancelAnimationFrame(bootFrame);
  $("#boot-screen").classList.remove("boot-leaving", "boot-ready");
  const target =
    bootTrigger?.isConnected && bootTrigger !== document.body
      ? bootTrigger
      : $(".welcome-note .primary");
  target.focus({ preventScroll: true });
});
let motion = localStorage.getItem("pixel-motion-explicit") !== "off",
  wallpaper = ["sky", "mint", "dusk"].includes(
    localStorage.getItem("pixel-wallpaper"),
  )
    ? localStorage.getItem("pixel-wallpaper")
    : "sky";
function preferences() {
  document.body.dataset.wallpaper = wallpaper;
  document.body.classList.toggle("reduce-motion", !motion || reducedMotion());
  if (!motion || reducedMotion()) {
    resetGaze();
    dismissBoot();
    $("#wallpaper-art").style.removeProperty("--look-x");
    $("#wallpaper-art").style.removeProperty("--look-y");
  }
  motionHint();
}
preferences();
$("#pixel-buddy").innerHTML = `<span class="buddy-idle">${mascot()}</span>`;
function renderWorld() {
  $("#wallpaper-art").innerHTML =
    `<button class="scene-launch" data-app="projects" aria-label="${text("Explore projects from the workbench", "เปิดโครงงานจากโต๊ะทดลอง")}"><span class="scene-float">${scene(wallpaper)}</span><span class="scene-caption">${text({ sky: "Floating workbench", mint: "Garden lab", dusk: "Night observatory" }[wallpaper], { sky: "โต๊ะทดลองบนเกาะลอย", mint: "สวนทดลอง", dusk: "หอดูดาวยามค่ำ" }[wallpaper])}<span class="scene-open">${text("Click to explore", "คลิกเพื่อสำรวจ")}</span></span></button>`;
  $(".world-switcher").innerHTML = ["sky", "mint", "dusk"]
    .map(
      (v) =>
        `<button data-world="${v}" aria-pressed="${wallpaper === v}"><span class="world-dot ${v}" aria-hidden="true"></span>${v[0].toUpperCase() + v.slice(1)}</button>`,
    )
    .join("");
  $(".world-switcher").setAttribute(
    "aria-label",
    text("Choose a desktop scene", "เลือกฉาก desktop"),
  );
  $("#pixel-buddy").setAttribute(
    "aria-label",
    text("Say hello to Bit", "ทักทาย Bit"),
  );
  $("#buddy-message").textContent = buddyMessage(buddyIndex, getLanguage());
  $(".scene-float").insertAdjacentHTML("beforeend", water(wallpaper));
  $("#mobile-tide").innerHTML = water(wallpaper);
  motionHint();
}
function renderShell() {
  renderWorld();
  $("#desktop-icons").innerHTML = Object.entries(apps)
    .map(
      ([id, label]) =>
        `<button class="desktop-icon" data-app="${id}">${sprite(id)}<span>${label}</span></button>`,
    )
    .join("");
  $("#launcher-menu").innerHTML = Object.entries(apps)
    .map(
      ([id, label]) =>
        `<button data-app="${id}">${sprite(id)}${label}</button>`,
    )
    .join("");
  $(".task-settings").innerHTML = sprite("settings");
  $("#language-toggle").textContent = getLanguage() === "en" ? "TH" : "EN";
  $("#language-toggle").setAttribute(
    "aria-label",
    getLanguage() === "en" ? "Switch to Thai" : "Switch to English",
  );
  $(".welcome-description").textContent = text(
    "AI, software, hardware — and the things I learned building them.",
    "AI ซอฟต์แวร์ ฮาร์ดแวร์ และสิ่งที่เรียนรู้จากการลงมือทำ",
  );
  $(".welcome-note .primary").textContent = text(
    "Explore my work ↗",
    "สำรวจผลงาน ↗",
  );
}
function taskbar() {
  resetGaze();
  document.body.classList.toggle(
    "home-busy",
    [...windows.values()].some((w) => !w.minimized),
  );
  $("#task-buttons").innerHTML = [...windows]
    .map(
      ([id, w]) =>
        `<button data-task="${id}" aria-label="${apps[id]}" class="${id === active && !w.minimized ? "active" : ""}" aria-pressed="${id === active && !w.minimized}">${sprite(id)}<span>${apps[id]}</span></button>`,
    )
    .join("");
}
function focusWindow(id) {
  const w = windows.get(id);
  if (!w) return;
  active = id;
  w.minimized = false;
  w.node.hidden = false;
  w.node.style.zIndex = ++layer;
  for (const [key, item] of windows)
    item.node.classList.toggle("focused", key === id);
  for (const [key, item] of windows) {
    item.node.hidden = item.minimized || (small() && key !== id);
    if (item.node.hidden) pause(item.node);
  }
  for (const selector of ["#desktop-icons", ".welcome-note"])
    $(selector).inert = small();
  taskbar();
}
function pause(root) {
  root.querySelectorAll("video").forEach((v) => v.pause());
}
function savedGeometry(id) {
  try {
    return JSON.parse(localStorage.getItem("pixel-window-" + id));
  } catch {
    return null;
  }
}
function rememberWindow(id) {
  const w = windows.get(id);
  if (!w || small()) return;
  try {
    localStorage.setItem(
      "pixel-window-" + id,
      JSON.stringify({
        ...w.geometry,
        maximized: w.node.classList.contains("maximized"),
      }),
    );
  } catch {
    /* Storage may be unavailable in private or restricted browsers. */
  }
}
function placeWindow(w) {
  const field = $(".desktop-field");
  const geometry = restoreWindowGeometry(
    w.geometry,
    w.geometry,
    field.clientWidth,
    field.clientHeight,
  );
  Object.assign(w.node.style, {
    left: geometry.x + "px",
    top: geometry.y + "px",
    width: geometry.width + "px",
    height: geometry.height + "px",
  });
}
function closeWindow(id) {
  const w = windows.get(id);
  if (!w) return;
  rememberWindow(id);
  pause(w.node);
  w.node.remove();
  windows.delete(id);
  active = null;
  const prev = [...windows].reverse().find(([, item]) => !item.minimized);
  if (prev) {
    focusWindow(prev[0]);
    prev[1].node.querySelector(".window-body").focus();
  } else {
    taskbar();
    $("#desktop-icons").inert = false;
    $(".welcome-note").inert = false;
    if (w.trigger?.isConnected) w.trigger.focus();
  }
}
function minimize(id) {
  const w = windows.get(id);
  pause(w.node);
  w.minimized = true;
  w.node.hidden = true;
  active = null;
  const next = [...windows]
    .reverse()
    .find(([key, item]) => key !== id && !item.minimized);
  if (next) focusWindow(next[0]);
  else {
    taskbar();
    $("#desktop-icons").inert = false;
    $(".welcome-note").inert = false;
  }
  $('#task-buttons [data-task="' + id + '"]').focus();
}
function openApp(id, trigger) {
  if (!apps[id]) return;
  $("#launcher-menu").hidden = true;
  $("[data-launcher]").setAttribute("aria-expanded", "false");
  if (windows.has(id)) {
    focusWindow(id);
    windows.get(id).node.querySelector(".window-body").focus();
    return;
  }
  const node = document.createElement("section");
  node.style.animation = "none";
  node.className = "app-window";
  node.dataset.window = id;
  node.setAttribute("aria-label", apps[id]);
  node.innerHTML = `<header class="window-titlebar">${sprite(id)}<h2>${apps[id]}</h2><div class="window-controls"><button data-minimize="${id}" aria-label="Minimize ${apps[id]}">−</button><button data-maximize="${id}" aria-label="Maximize ${apps[id]}" aria-pressed="false">□</button><button data-window-close="${id}" aria-label="Close ${apps[id]}">×</button></div></header><div class="window-body" tabindex="-1"></div>`;
  $("#windows").append(node);
  const n = windows.size % 4,
    fallback = { x: 160 + n * 32, y: 32 + n * 28, width: 850, height: 680 };
  const geometry = restoreWindowGeometry(
    savedGeometry(id),
    fallback,
    small() ? 1440 : $(".desktop-field").clientWidth,
    small() ? 900 : $(".desktop-field").clientHeight,
  );
  const w = { node, trigger, minimized: false, geometry };
  windows.set(id, w);
  if (!small()) placeWindow(w);
  node.classList.toggle("maximized", geometry.maximized);
  const maxButton = node.querySelector("[data-maximize]");
  maxButton.setAttribute("aria-pressed", geometry.maximized);
  maxButton.setAttribute(
    "aria-label",
    (geometry.maximized ? "Restore " : "Maximize ") + apps[id],
  );
  fillApp(id);
  if (trigger?.isConnected && motion && !reducedMotion()) {
    const from = trigger.getBoundingClientRect();
    const to = node.getBoundingClientRect();
    node.style.setProperty(
      "--open-x",
      from.x + from.width / 2 - to.x - to.width / 2 + "px",
    );
    node.style.setProperty(
      "--open-y",
      from.y + from.height / 2 - to.y - to.height / 2 + "px",
    );
  }
  node.style.removeProperty("animation");
  focusWindow(id);
  node.querySelector(".window-body").focus();
  node.addEventListener("pointerdown", () => focusWindow(id));
  node.addEventListener("focusin", () => {
    if (active !== id) focusWindow(id);
  });
  const bar = node.querySelector(".window-titlebar");
  let drag = null;
  bar.addEventListener("pointerdown", (event) => {
    if (
      small() ||
      node.classList.contains("maximized") ||
      event.button !== 0 ||
      event.target.closest("button")
    )
      return;
    drag = {
      x: event.clientX,
      y: event.clientY,
      left: node.offsetLeft,
      top: node.offsetTop,
    };
    bar.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  bar.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const p = boundedPosition(
      drag.left + event.clientX - drag.x,
      drag.top + event.clientY - drag.y,
      node.offsetWidth,
      node.offsetHeight,
      $(".desktop-field").clientWidth,
      $(".desktop-field").clientHeight,
    );
    node.style.left = p.x + "px";
    node.style.top = p.y + "px";
    w.geometry = {
      ...w.geometry,
      x: p.x,
      y: p.y,
      width: node.offsetWidth,
      height: node.offsetHeight,
    };
  });
  const release = () => {
    if (drag) rememberWindow(id);
    drag = null;
  };
  bar.addEventListener("pointerup", release);
  bar.addEventListener("pointercancel", release);
  bar.addEventListener("lostpointercapture", release);
}
const intro = (title, desc) =>
  `<div class="app-intro"><h3>${title}</h3><p>${desc}</p></div>`;
function fillApp(id) {
  const body = windows.get(id).node.querySelector(".window-body");
  if (id === "projects")
    body.innerHTML =
      intro(
        text("Project archive", "ผลงานโครงงาน"),
        text(
          "Six projects. Open a file to explore the prototype, my role, and the evidence.",
          "เปิดโครงงานเพื่ออ่านรายละเอียด บทบาท และดูหลักฐานการทำงาน",
        ),
      ) +
      `<div class="file-grid">${projects.map((p) => fileCard(p)).join("")}</div>`;
  if (id === "achievements")
    body.innerHTML =
      intro(
        text("Results & experiences", "ผลการแข่งขันและประสบการณ์"),
        text(
          "Awards, qualification and participation are different. Each record keeps its own context.",
          "แยกรางวัล การผ่านเข้ารอบ และการเข้าร่วมตามข้อเท็จจริง",
        ),
      ) +
      `<div class="filter-bar" aria-label="Filter experiences">${[
        ["all", text("All", "ทั้งหมด")],
        ["competition", text("Competitions", "การแข่งขัน")],
        ["activity", text("Training & exhibitions", "อบรมและนิทรรศการ")],
      ]
        .map(
          ([v, label]) =>
            `<button data-filter="${v}" aria-pressed="${v === "all"}">${label}</button>`,
        )
        .join(
          "",
        )}</div><div class="file-grid" id="achievement-files">${entries.map((p) => fileCard(p, "achievements")).join("")}</div>`;
  if (id === "about")
    body.innerHTML =
      intro("Tankhun Srijankaew", "นายแทนคุณ ศรีจันทร์แก้ว") +
      `<div class="about-paper"><p class="pixel-label">ABOUT.TXT / ${text("STUDENT & BUILDER", "นักเรียนและผู้สร้างต้นแบบ")}</p><h3>${text("Learning by making.", "เรียนรู้ผ่านการลงมือทำ")}</h3><p>${text("I am an AI-programme student at Marie Vithaya School in Nakhon Ratchasima, Thailand. I study in Mathayom 5, Class 5/10. My work connects computer vision, software and physical prototypes.", "ผมเป็นนักเรียนแผนการเรียน AI ชั้นมัธยมศึกษาปีที่ 5 ห้อง 5/10 โรงเรียนมารีย์วิทยา จังหวัดนครราชสีมา สนใจการเชื่อมต่อคอมพิวเตอร์วิทัศน์ ซอฟต์แวร์ และต้นแบบฮาร์ดแวร์")}</p><p>${text("Competitions have helped me learn to lead a team, develop applications, connect sensors, document research and explain a working prototype. This portfolio includes the process as well as the results.", "การแข่งขันช่วยให้ผมเรียนรู้การคุมทีม พัฒนาแอปพลิเคชัน เชื่อมต่อเซนเซอร์ เขียนเอกสาร และอธิบายต้นแบบที่สร้างขึ้น แฟ้มผลงานนี้จึงรวมทั้งกระบวนการและผลลัพธ์")}</p><h3>${text("Tools I work with", "เครื่องมือและทักษะ")}</h3>${badges({ skills: ["OpenCV", "Object detection", "Image classification", "Decision Tree AI", "Edge AI", "RAG chatbot", "Python", "Flutter", "Kotlin", "FastAPI", "HTML", "CSS", "JavaScript", "C", "Arduino", "Research", "Project leadership", "Pitching"] })}<div class="about-photo">${image(entries.find((p) => p.id === "minister-exhibition").media.photos[0])}</div></div>`;
  if (id === "contact") {
    const c = portfolio.profile.contact;
    body.innerHTML =
      intro(
        text("Let’s talk.", "ติดต่อผม"),
        text(
          "Questions, project ideas, or a conversation about AI.",
          "พูดคุยเรื่องโครงงาน การเรียนรู้ หรือไอเดีย AI",
        ),
      ) +
      `<a class="email-link" href="mailto:${c.email}">${c.email} ↗</a><div class="contact-list">${[
        ["GitHub", c.github, "github"],
        ["Instagram", c.instagram, "instagram"],
        ["Facebook", c.facebook, "facebook"],
        ["Discord", c.discord, "discord"],
        [c.phone, "tel:" + c.phone, "phone"],
      ]
        .map(
          ([label, url, logo]) =>
            `<a href="${url}" ${url.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}><img class="icon" src="/public/assets/icons/${logo}.svg" alt="">${label} ↗</a>`,
        )
        .join("")}</div>`;
  }
  if (id === "research")
    body.innerHTML =
      intro(
        text("Research & documents", "งานวิจัยและเอกสาร"),
        text(
          "Project proposals, reports and certificates. These are not all peer-reviewed publications.",
          "ข้อเสนอ รายงาน และเกียรติบัตร ไม่ได้เป็นผลงานตีพิมพ์ที่ผ่านการประเมินทั้งหมด",
        ),
      ) +
      `<div class="research-list">${entries
        .filter((p) => p.media.pdfs.length)
        .map(
          (p) =>
            `<section><h3>${e(local(p).title)}</h3><p>${e(local(p).summary)}</p>${p.media.pdfs.map((f, i) => `<button class="document-link" data-document="${p.id}" data-document-index="${i}">${sprite("about")}${e(f.title)} ↗</button>`).join("")}<a href="${routeFor(p.id, projects.includes(p) ? "projects" : "achievements")}" data-route>${text("Related story", "อ่านเรื่องราว")} ↗</a>${p.links?.publication ? `<a class="publication-link" href="${e(p.links.publication)}" target="_blank" rel="noopener noreferrer">${copy().publication} ↗</a>` : ""}</section>`,
        )
        .join("")}</div><div id="research-reader"></div>`;
  if (id === "settings")
    body.innerHTML =
      intro(
        text("Desktop preferences", "ตั้งค่าเดสก์ท็อป"),
        text(
          "Preferences stay on this device. No sound plays automatically.",
          "บันทึกการตั้งค่าบนอุปกรณ์นี้ ไม่มีเสียงเล่นอัตโนมัติ",
        ),
      ) +
      `<fieldset><legend>${text("Wallpaper", "พื้นหลัง")}</legend><div class="wallpaper-options">${[
        ["sky", "SKY / blue"],
        ["mint", "GARDEN / mint"],
        ["dusk", "DUSK / lavender"],
      ]
        .map(
          ([v, label]) =>
            `<button class="swatch ${v}" data-wallpaper="${v}" aria-pressed="${wallpaper === v}">${label}</button>`,
        )
        .join(
          "",
        )}</div></fieldset><fieldset><legend>${text("Animation", "ภาพเคลื่อนไหว")}</legend><button data-motion aria-pressed="${motion}">${motion ? text("Motion on", "เปิดภาพเคลื่อนไหว") : text("Motion off", "ปิดภาพเคลื่อนไหว")}</button><p>${text("Animations are on by default. This switch controls all website motion and remembers your choice.", "เปิดภาพเคลื่อนไหวเป็นค่าเริ่มต้น ปุ่มนี้ควบคุมการเคลื่อนไหวทั้งหมดบนเว็บและจำตัวเลือกของคุณ")}</p><button data-replay-intro ${!motion ? "disabled" : ""}>${text("Replay power-up", "เล่น power-up อีกครั้ง")}</button></fieldset>`;
  if (id === "memories") {
    const albums = entries.filter((p) => p.media.photos.length);
    body.innerHTML =
      intro(
        text("Behind the projects", "ภาพระหว่างการทำงาน"),
        text(
          "Real teams, prototypes and presentation days.",
          "ภาพทีมงาน ต้นแบบ และวันนำเสนอจริง",
        ),
      ) +
      `<label class="album-select">${text("Album", "อัลบั้ม")}<select id="album-select">${albums.map((p) => `<option value="${p.id}">${e(local(p).title)}</option>`).join("")}</select></label><div id="album"></div>`;
    renderAlbum(albums[0].id, 0);
  }
}
function renderAlbum(id, index) {
  const raw = entries.find((p) => p.id === id),
    photos = raw.media.photos;
  index = (index + photos.length) % photos.length;
  const p = photos[index];
  const expanded = $(".album-viewer")?.open || index !== 0;
  $("#album").innerHTML =
    `<p class="album-count">${photos.length} ${text("photos · Select a frame to view full size", "ภาพ · เลือกภาพเพื่อดูขนาดเต็ม")}</p>${contactSheet(photos)}<details class="album-viewer" ${expanded ? "open" : ""}><summary>${text("Browse one photo at a time", "ดูภาพทีละภาพ")}</summary><div class="album-main"><button class="media-image" data-image="${e(asset(p.src))}" data-alt="${e(p.alt || p.title)}">${image(p)}</button></div><div class="album-toolbar"><button data-album="${id}" data-index="${index - 1}" aria-label="Previous photo">←</button><span>${index + 1} / ${photos.length} · ${e(p.title)}</span><button data-album="${id}" data-index="${index + 1}" aria-label="Next photo">→</button></div><div class="thumbnail-strip">${photos.map((p, i) => `<button data-album="${id}" data-index="${i}" aria-label="Photo ${i + 1}" aria-pressed="${index === i}">${image(p)}</button>`).join("")}</div></details><a class="album-story" href="${routeFor(id, projects.includes(raw) ? "projects" : "achievements")}" data-route>${text("Open related story", "อ่านเรื่องราวที่เกี่ยวข้อง")} ↗</a>`;
}
async function mountPdfs(root) {
  const readers = [...root.querySelectorAll("[data-pdf]")];
  if (!readers.length) return;
  try {
    const { mountReader } = await import("./pdf-viewer.js");
    readers.forEach((n) => {
      if (n.isConnected) mountReader(n, getLanguage());
    });
  } catch {
    readers.forEach(
      (n) =>
        (n.textContent = text(
          "Use the open-file link above.",
          "เปิดเอกสารผ่านลิงก์ด้านบนได้",
        )),
    );
  }
}
function renderCase(route) {
  current = route;
  const raw = route.entry,
    item = display(raw, route.kind);
  pause($("#desktop"));
  $("#desktop").hidden = true;
  $("#case-study").hidden = false;
  document.body.classList.add("case-open");
  document.title = item.title + " — Tankhun Srijankaew";
  const groups = [
    "overview",
    ...Object.keys(raw.media).filter((k) => raw.media[k].length),
  ];
  $("#case-study").innerHTML =
    `<header class="case-nav"><a href="/" data-home>← ${text("Back to desktop", "กลับสู่เดสก์ท็อป")}</a><span>PIXEL//OS <span class="case-file">/ ${route.kind === "projects" ? "PROJECT" : "EXPERIENCE"}</span></span><button data-case-language>${getLanguage() === "en" ? "TH" : "EN"}</button></header><article class="case-article"><div class="case-intro"><p class="eyebrow">${e(item.type)}</p><h1 tabindex="-1">${e(item.title)}</h1><p class="case-summary">${e(item.summary)}</p><div class="case-facts"><div><span>${text("Date", "วันที่")}</span><p>${e(date(item))}</p>${["agri", "depa-2026-third-place"].includes(raw.id) ? `<small>${copy().dateContext}</small>` : ""}</div><div><span>${copy().outcome}</span><p>${e(item.outcome || item.type)}</p></div><div><span>${copy().role}</span><p>${e(item.whatIDid)}</p></div></div></div><nav class="media-controls" aria-label="Story media">${groups.map((g) => `<button data-group="${g}" aria-pressed="${g === "overview"}" aria-controls="media-panel">${copy()[g]}</button>`).join("")}</nav><div class="media-panel overview" id="media-panel">${overview(raw)}</div><footer class="case-footer"><a href="/" data-home>← ${text("Back to desktop", "กลับสู่เดสก์ท็อป")}</a><a href="mailto:${portfolio.profile.contact.email}">${text("Ask me about this project", "พูดคุยเกี่ยวกับโครงงานนี้")} ↗</a></footer></article>`;
  window.scrollTo(0, 0);
  $("#case-study h1").focus({ preventScroll: true });
}
function home() {
  current = null;
  pause($("#case-study"));
  $("#case-study").hidden = true;
  $("#case-study").innerHTML = "";
  $("#desktop").hidden = false;
  document.body.classList.remove("case-open");
  document.title = "PIXEL//OS — Tankhun Srijankaew";
  lastTrigger?.isConnected
    ? lastTrigger.focus()
    : $("#desktop-icons button").focus();
}
function pixelTransition() {
  if (document.body.classList.contains("reduce-motion")) return;
  document.querySelector(".pixel-transition")?.remove();
  const overlay = document.createElement("div");
  overlay.className = "pixel-transition";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = Array.from(
    { length: 48 },
    (_, i) =>
      `<i style="--delay:${(i % 8) * 18 + Math.floor(i / 8) * 12}ms"></i>`,
  ).join("");
  document.body.append(overlay);
  setTimeout(() => overlay.remove(), 550);
}
function navigate(path, push = true) {
  if (push) {
    history.pushState({ pixel: true }, "", path);
    pixelTransition();
  }
  const route = resolveRoute(path, entries);
  if (route) renderCase(route);
  else if (path === "/") home();
  else {
    $("#desktop").hidden = true;
    $("#case-study").hidden = false;
    $("#case-study").innerHTML =
      '<div class="missing-page"><h1>File not found</h1><a href="/" data-home>Back to desktop</a></div>';
  }
}
window.addEventListener("popstate", () => navigate(location.pathname, false));
document.addEventListener("click", (event) => {
  const route = event.target.closest("[data-route]");
  if (
    route &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey &&
    event.button === 0
  ) {
    event.preventDefault();
    lastTrigger = route;
    navigate(new URL(route.href).pathname);
    return;
  }
  if (
    event.target.closest("[data-home]") &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey &&
    event.button === 0
  ) {
    event.preventDefault();
    navigate("/");
    return;
  }
  const b = event.target.closest("button");
  if (b?.classList.contains("scene-launch") && motion && !reducedMotion()) {
    const ripple = document.createElement("span");
    ripple.className = "scene-click-ripple";
    ripple.setAttribute("aria-hidden", "true");
    b.querySelector(".scene-float").append(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), {
      once: true,
    });
    setTimeout(() => ripple.remove(), 800);
  }
  if (!b) return;
  if (b.id === "pixel-buddy") {
    buddyIndex++;
    $("#buddy-message").textContent = buddyMessage(buddyIndex, getLanguage());
    clearTimeout(buddyTimer);
    b.classList.remove("waving");
    if (motion && !reducedMotion()) {
      void b.offsetWidth;
      b.classList.add("waving");
      buddyTimer = setTimeout(() => b.classList.remove("waving"), 800);
    }
  }
  if (b.dataset.app) openApp(b.dataset.app, b);
  if (b.dataset.task) {
    const w = windows.get(b.dataset.task);
    if (active === b.dataset.task && !w.minimized) minimize(b.dataset.task);
    else {
      focusWindow(b.dataset.task);
      w.node.querySelector(".window-body").focus();
    }
  }
  if (b.dataset.windowClose) closeWindow(b.dataset.windowClose);
  if (b.dataset.minimize) minimize(b.dataset.minimize);
  if (b.dataset.maximize) {
    const node = windows.get(b.dataset.maximize).node,
      max = node.classList.toggle("maximized");
    b.setAttribute("aria-pressed", max);
    b.setAttribute(
      "aria-label",
      (max ? "Restore " : "Maximize ") + apps[b.dataset.maximize],
    );
    rememberWindow(b.dataset.maximize);
  }
  if (b.hasAttribute("data-launcher")) {
    const menu = $("#launcher-menu");
    menu.hidden = !menu.hidden;
    b.setAttribute("aria-expanded", !menu.hidden);
    if (!menu.hidden) menu.querySelector("button").focus();
  }
  if (b.dataset.filter) {
    const root = b.closest(".window-body");
    root
      .querySelectorAll("[data-filter]")
      .forEach((n) => n.setAttribute("aria-pressed", n === b));
    const competition = (p) =>
      !["tira-iot-training", "minister-exhibition"].includes(p.id);
    const filtered =
      b.dataset.filter === "competition"
        ? entries.filter(competition)
        : b.dataset.filter === "activity"
          ? entries.filter((p) => !competition(p))
          : entries;
    root.querySelector("#achievement-files").innerHTML = filtered
      .map((p) => fileCard(p, "achievements"))
      .join("");
  }
  if (b.dataset.album) renderAlbum(b.dataset.album, Number(b.dataset.index));
  if (b.dataset.wallpaper || b.dataset.world) {
    wallpaper = b.dataset.wallpaper || b.dataset.world;
    localStorage.setItem("pixel-wallpaper", wallpaper);
    preferences();
    renderWorld();
    if (windows.has("settings")) fillApp("settings");
    if (b.dataset.world) $(`[data-world="${wallpaper}"]`).focus();
    else
      windows
        .get("settings")
        .node.querySelector(`[data-wallpaper="${wallpaper}"]`)
        .focus();
  }
  if (b.hasAttribute("data-motion")) {
    motion = !motion;
    localStorage.setItem("pixel-motion-explicit", motion ? "on" : "off");
    preferences();
    if (windows.has("settings")) fillApp("settings");
    const target = b.closest("#motion-notice")
      ? $("#motion-notice [data-motion]")
      : windows.get("settings")?.node.querySelector("[data-motion]");
    target?.focus();
  }
  if (b.dataset.document) {
    const raw = entries.find((p) => p.id === b.dataset.document),
      f = raw.media.pdfs[Number(b.dataset.documentIndex)],
      root = $("#research-reader");
    root.innerHTML = `<h3>${e(f.title)}</h3><a href="${e(asset(f.src))}" target="_blank" rel="noopener noreferrer">${copy().openFile} ↗</a> · <a href="${e(asset(f.src))}" download>${copy().download}</a><div class="pdf-preview" data-pdf="${e(asset(f.src))}"></div>`;
    mountPdfs(root);
    root.scrollIntoView({ block: "start", behavior: "instant" });
  }
  if (b.dataset.group && current) {
    const root = $("#case-study");
    pause(root);
    root
      .querySelectorAll("[data-group]")
      .forEach((n) => n.setAttribute("aria-pressed", n === b));
    const panel = $("#media-panel");
    panel.className = "media-panel " + b.dataset.group;
    panel.innerHTML = media(current.entry, b.dataset.group);
    mountPdfs(panel);
  }
  if (b.dataset.image) {
    const dialog = $("#lightbox");
    lastImageTrigger = b;
    dialog.setAttribute("aria-label", b.dataset.alt || "Image viewer");
    dialog.innerHTML = `<div class="lightbox-head"><a href="${e(b.dataset.image)}" download>${copy().download}</a><button data-image-close aria-label="Close image">×</button></div><img src="${e(b.dataset.image)}" alt="${e(b.dataset.alt)}">`;
    dialog.showModal();
    dialog.querySelector("button").focus();
  }
  if (b.hasAttribute("data-image-close")) $("#lightbox").close();
  if (b.id === "language-toggle" || b.hasAttribute("data-case-language")) {
    setLanguage(getLanguage() === "en" ? "th" : "en");
    localStorage.setItem("pixel-language", getLanguage());
    renderShell();
    for (const id of windows.keys()) fillApp(id);
    if (current) renderCase(current);
  }
});
$(".desktop-field").addEventListener("pointermove", (event) => {
  if (
    small() ||
    current ||
    active ||
    !motion ||
    reducedMotion() ||
    event.pointerType !== "mouse"
  )
    return;
  const art = $("#wallpaper-art");
  const buddy = $("#pixel-buddy");
  const bounds = buddy.getBoundingClientRect();
  const gaze = buddyGaze(
    event.clientX - bounds.x - bounds.width / 2,
    event.clientY - bounds.y - bounds.height / 2,
  );
  buddy.style.setProperty("--gaze-x", gaze.x + "px");
  buddy.style.setProperty("--gaze-y", gaze.y + "px");
  clearTimeout(gazeTimer);
  gazeTimer = setTimeout(resetGaze, 900);
  art.style.setProperty(
    "--look-x",
    ((event.clientX / innerWidth - 0.5) * 10).toFixed(1) + "px",
  );
  art.style.setProperty(
    "--look-y",
    ((event.clientY / innerHeight - 0.5) * 6).toFixed(1) + "px",
  );
});
$(".desktop-field").addEventListener("pointerleave", () => {
  resetGaze();
  $("#wallpaper-art").style.removeProperty("--look-x");
  $("#wallpaper-art").style.removeProperty("--look-y");
});
$("#lightbox").addEventListener(
  "close",
  () => lastImageTrigger?.isConnected && lastImageTrigger.focus(),
);
$("#lightbox").addEventListener("click", (event) => {
  if (event.target === $("#lightbox")) {
    const r = event.target.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      event.target.close();
  }
});
document.addEventListener("change", (event) => {
  if (event.target.id === "album-select") renderAlbum(event.target.value, 0);
});
document.addEventListener("keydown", (event) => {
  if (
    event.key !== "Escape" ||
    $("#lightbox").open ||
    $("#boot-screen").open ||
    document.fullscreenElement
  )
    return;
  if (!$("#launcher-menu").hidden) {
    $("#launcher-menu").hidden = true;
    $("[data-launcher]").setAttribute("aria-expanded", "false");
    $("[data-launcher]").focus();
  } else if (active && !current) closeWindow(active);
});
window.addEventListener("resize", () => {
  for (const [, w] of windows) {
    if (!small()) placeWindow(w);
  }
  if (active) focusWindow(active);
  else {
    $("#desktop-icons").inert = false;
    $(".welcome-note").inert = false;
  }
});
function clock() {
  const now = new Date();
  $("#clock").dateTime = now.toISOString();
  $("#clock").textContent = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
  $("#clock").title = now.toLocaleDateString();
}
clock();
setInterval(clock, 30000);
setLanguage(localStorage.getItem("pixel-language") === "th" ? "th" : "en");
renderShell();
if (location.pathname !== "/") navigate(location.pathname, false);
else startBoot();
document.addEventListener("click", (event) => {
  if (event.target.closest("[data-replay-intro]")) startBoot(true);
});
