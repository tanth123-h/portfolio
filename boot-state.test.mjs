import test from "node:test";
import assert from "node:assert/strict";
import { shouldBoot, buddyGaze } from "./boot-state.js";
test("mascot gaze stays subtle and handles invalid pointer values", () => {
  assert.deepEqual(buddyGaze(0, 0), { x: 0, y: 0 });
  assert.deepEqual(buddyGaze(900, -900), { x: 1.2, y: -1.2 });
  assert.deepEqual(buddyGaze(NaN, Infinity), { x: 0, y: 0 });
});
import * as art from "./pixel-art.js";
test("intro only plays on a fresh animated homepage", () => {
  assert.equal(shouldBoot(), true);
  for (const options of [
    { path: "/projects/grow-a-garden" },
    { seen: true },
    { motion: false },
    { reduced: true },
  ])
    assert.equal(shouldBoot(options), false);
});
test("water has independent flow layers in each scene", () => {
  for (const theme of ["sky", "mint", "dusk"]) {
    assert.match(art.water(theme), /water-current/);
    assert.match(art.water(theme), /water-ripple/);
    assert.match(art.water(theme), /translate\(180 0\)/);
    assert.match(art.water(theme), /aria-hidden="true"/);
  }
  assert.notEqual(art.water("sky"), art.water("dusk"));
});
