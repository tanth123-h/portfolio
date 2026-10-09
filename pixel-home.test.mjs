import test from "node:test";
import assert from "node:assert/strict";
import * as art from "./pixel-art.js";
test("each desktop scene has independent animated detail layers", () => {
  assert.match(art.scene("sky"), /screen-code/);
  assert.match(art.scene("mint"), /garden-leaves/);
  assert.match(art.scene("dusk"), /telescope-head/);
  assert.match(art.scene("dusk"), /star-spark/);
});

test("scene selection renders distinct artwork and falls back safely", () => {
  const sky = art.scene("sky"),
    mint = art.scene("mint"),
    dusk = art.scene("dusk");
  assert.notEqual(mint, sky, "Mint still uses the sky artwork");
  assert.notEqual(dusk, sky, "Dusk still uses the sky artwork");
  assert.notEqual(mint, dusk);
  assert.equal(art.scene("unknown"), sky);
});
test("mascot messages cycle through hints without losing either language", () => {
  assert.equal(
    typeof art.buddyMessage,
    "function",
    "Mascot interactions are not implemented",
  );
  assert.equal(art.buddyMessage(0, "en"), "Hi, I’m Bit. Click me!");
  assert.ok(art.buddyMessage(1, "en").includes("Projects"));
  assert.ok(art.buddyMessage(1, "th").includes("โครงงาน"));
  assert.equal(art.buddyMessage(4, "en"), art.buddyMessage(0, "en"));
});
test("mascot artwork supplies separate eyes and arm for responsive motion", () => {
  assert.equal(
    typeof art.mascot,
    "function",
    "Mascot artwork is not implemented",
  );
  const svg = art.mascot();
  assert.ok(svg.includes('class="buddy-eyes"'));
  assert.ok(svg.includes('class="buddy-arm"'));
  assert.ok(svg.includes('aria-hidden="true"'));
});
