export function shouldBoot({
  path = "/",
  seen = false,
  motion = true,
  reduced = false,
} = {}) {
  return path === "/" && !seen && motion && !reduced;
}
export function buddyGaze(dx, dy) {
  const clamp = (value) =>
    Math.max(-1.2, Math.min(1.2, Number.isFinite(value) ? value / 180 : 0));
  return { x: clamp(dx), y: clamp(dy) };
}
