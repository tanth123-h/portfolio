import { motionAllowed } from "./ocean-state.js";

const root = document.documentElement;
const canvas = document.querySelector(".water-surface");
const context = canvas.getContext("2d", { alpha: false });
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const toggle = document.createElement("button");
toggle.type = "button";
toggle.id = "motion-toggle";
document.querySelector(".nav-tools").prepend(toggle);
let paused = false;
let visible = true;
let frame = 0;
let lastTime = 0;
let phase = 0;
try {
  paused = localStorage.getItem("ocean-paused") === "true";
} catch {}
function paint(time) {
  const width = canvas.width,
    height = canvas.height;
  const pixels = context.createImageData(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = (x / width) * 6,
        v = (y / height) * 4;
      const a = Math.sin(u * 2.1 + v * 1.4 + time * 0.18);
      const b = Math.sin(u * 1.4 - v * 2.8 - time * 0.12);
      const c = Math.cos(u * 3.5 + v * 2.1 + time * 0.1);
      const ridge = Math.pow(
        Math.max(0, 1 - Math.abs(a + b * 0.7 + c * 0.35) * 2.4),
        5,
      );
      const shade = (a + b) * 3 + ridge * 22;
      const fade = (y / height) * 12;
      const i = (y * width + x) * 4;
      pixels.data[i] = 199 + shade + fade;
      pixels.data[i + 1] = 224 + shade * 0.65 + fade * 0.4;
      pixels.data[i + 2] = 229 + shade * 0.5 + fade * 0.3;
      pixels.data[i + 3] = 255;
    }
  }
  context.putImageData(pixels, 0, 0);
}
function animate(time) {
  if (!motionAllowed(reduced.matches, paused, document.hidden) || !visible) {
    frame = 0;
    return;
  }
  if (time - lastTime > 80) {
    phase += 0.08;
    paint(phase);
    lastTime = time;
  }
  frame = requestAnimationFrame(animate);
}
function sync() {
  const running =
    motionAllowed(reduced.matches, paused, document.hidden) && visible;
  root.dataset.oceanMotion = running ? "running" : "paused";
  const thai = root.lang === "th";
  toggle.textContent = thai ? "เคลื่อนไหว" : "Motion";
  toggle.setAttribute("aria-pressed", String(!paused && !reduced.matches));
  toggle.setAttribute(
    "aria-label",
    thai
      ? paused
        ? "เปิดการเคลื่อนไหว"
        : "หยุดการเคลื่อนไหว"
      : paused
        ? "Resume water motion"
        : "Pause water motion",
  );
  toggle.disabled = reduced.matches;
  if (running && !frame) frame = requestAnimationFrame(animate);
  else if (!running && frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}
function resize() {
  canvas.width = innerWidth < 760 ? 180 : 300;
  canvas.height = Math.round(
    (canvas.width * canvas.clientHeight) / Math.max(1, canvas.clientWidth),
  );
  paint(phase);
}
toggle.addEventListener("click", () => {
  paused = !paused;
  try {
    localStorage.setItem("ocean-paused", String(paused));
  } catch {}
  sync();
});
new MutationObserver(sync).observe(root, {
  attributes: true,
  attributeFilter: ["lang"],
});
reduced.addEventListener("change", sync);
document.addEventListener("visibilitychange", sync);
window.addEventListener("resize", resize, { passive: true });
new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  sync();
}).observe(canvas);
resize();
sync();
