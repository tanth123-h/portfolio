import test from "node:test";
import assert from "node:assert/strict";
import * as view from "./portfolio-view.js";

test("archive search matches Thai or English regardless of display language", () => {
  assert.equal(typeof view.searchArchive, "function", "Archive search missing");
  assert.deepEqual(
    view.searchArchive(view.projects, "  GROW garden ").map((p) => p.id),
    ["agri"],
  );
  assert.ok(
    view.searchArchive(view.projects, "เกษตร").some((p) => p.id === "agri"),
  );
  assert.deepEqual(view.searchArchive(view.projects, "unmatched-xyz"), []);
  assert.equal(
    view.searchArchive(view.projects, "").length,
    view.projects.length,
  );
});
