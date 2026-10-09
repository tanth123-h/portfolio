import test from "node:test";
import assert from "node:assert/strict";
import { manifest } from "./manifest.js";
test("archive metadata has stable slugs, roles, status and transparent dates", () => {
  assert.equal(new Set(manifest.map((m) => m.slug)).size, manifest.length);
  for (const m of manifest) {
    assert.ok(m.role && m.status && m.sourceConfidence);
    assert.ok(m.dateConfidence);
  }
  assert.equal(manifest.find((m) => m.id === "depa-2025-national").date, null);
  assert.ok(manifest.find((m) => m.id === "agri").status.includes("210"));
});
