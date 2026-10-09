export const slugs = {
  agri: "grow-a-garden",
  "youth-innovation": "heritage-ai",
  cityflowbkk: "cityflowbkk",
  "phishwall-ai": "phishwall-ai",
  troposense: "troposense",
  "depa-2025-national": "weed-detection-vehicle",
};
export const routeFor = (id, kind = "projects") =>
  `/${kind}/${slugs[id] || id}`;
export function resolveRoute(path, entries) {
  const m = path
    .replace(/\/$/, "")
    .match(/^\/(projects|achievements)\/([^/]+)$/);
  if (!m) return null;
  const entry = entries.find((e) => (slugs[e.id] || e.id) === m[2]);
  return entry ? { entry, kind: m[1] } : null;
}
export function boundedPosition(x, y, w, h, vw, vh) {
  return {
    x: Math.max(0, Math.min(x, Math.max(0, vw - w))),
    y: Math.max(0, Math.min(y, Math.max(0, vh - h))),
  };
}
export function restoreWindowGeometry(saved, fallback, vw, vh) {
  const value = (key, positive = false) =>
    Number.isFinite(saved?.[key]) && (!positive || saved[key] > 0)
      ? saved[key]
      : fallback[key];
  const width = Math.min(vw, Math.max(Math.min(480, vw), value("width", true))),
    height = Math.min(vh, Math.max(Math.min(320, vh), value("height", true)));
  return {
    ...boundedPosition(value("x"), value("y"), width, height, vw, vh),
    width,
    height,
    maximized: saved?.maximized === true,
  };
}
