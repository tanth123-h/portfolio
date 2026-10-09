import test from "node:test";
import assert from "node:assert/strict";
import { boundedPosition, resolveRoute, routeFor } from "./os-state.js";
import * as state from "./os-state.js";
test("drag stays inside workspace even when viewport is smaller", () => {
  assert.deepEqual(boundedPosition(-2, 900, 800, 600, 1200, 800), {
    x: 0,
    y: 200,
  });
  assert.deepEqual(boundedPosition(400, 300, 900, 700, 375, 600), {
    x: 0,
    y: 0,
  });
});
test("project routes are durable and unknown routes are rejected", () => {
  const list = [{ id: "agri" }];
  assert.equal(routeFor("agri"), "/projects/grow-a-garden");
  assert.equal(resolveRoute("/projects/grow-a-garden/", list).entry.id, "agri");
  assert.equal(resolveRoute("/projects/missing", list), null);
  assert.equal(resolveRoute("/public/no.pdf", list), null);
});
test("saved window geometry restores within the current desktop", () => {
  const { restoreWindowGeometry } = state;
  assert.equal(
    typeof restoreWindowGeometry,
    "function",
    "Window restoration is not implemented",
  );
  const fallback = { x: 160, y: 32, width: 850, height: 680 };
  assert.deepEqual(
    restoreWindowGeometry(
      { x: 250, y: 100, width: 720, height: 500, maximized: true },
      fallback,
      1440,
      900,
    ),
    { x: 250, y: 100, width: 720, height: 500, maximized: true },
  );
  assert.deepEqual(
    restoreWindowGeometry(
      { x: 1200, y: 800, width: 850, height: 680 },
      fallback,
      900,
      700,
    ),
    { x: 50, y: 20, width: 850, height: 680, maximized: false },
  );
});
test("malformed saved geometry falls back instead of hiding the window", () => {
  const { restoreWindowGeometry } = state;
  assert.equal(
    typeof restoreWindowGeometry,
    "function",
    "Window restoration is not implemented",
  );
  assert.deepEqual(
    restoreWindowGeometry(
      { x: "oops", y: -90, width: -1, height: null, maximized: "yes" },
      { x: 160, y: 32, width: 850, height: 680 },
      1200,
      800,
    ),
    { x: 160, y: 0, width: 850, height: 680, maximized: false },
  );
});
