import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { thEntries } from "./content.js";
import { portfolio } from "./site-data.js";

test("every featured portfolio entry has a story and at least one media slot", () => {
  for (const entry of portfolio.projects.concat(portfolio.achievements)) {
    assert.ok(entry.whatILearned, `${entry.title} needs a learning reflection`);
    assert.ok(
      Object.values(entry.media).some((items) => items.length),
      `${entry.title} needs media`,
    );
  }
});

test("each portfolio entry uses complete media groups", () => {
  for (const entry of [...portfolio.projects, ...portfolio.achievements]) {
    assert.deepEqual(Object.keys(entry.media).sort(), [
      "certificateImages",
      "graphics",
      "pdfs",
      "photos",
      "videos",
    ]);
  }
});

test("each linked asset has a public path", () => {
  for (const entry of [...portfolio.projects, ...portfolio.achievements]) {
    for (const group of Object.values(entry.media)) {
      for (const item of group) assert.match(item.src, /^\.\/public\/assets\//);
    }
  }
});

test("each referenced public asset exists", () => {
  for (const entry of [...portfolio.projects, ...portfolio.achievements]) {
    for (const group of Object.values(entry.media)) {
      for (const item of group) {
        assert.ok(
          existsSync(new URL(item.src, import.meta.url)),
          `${item.src} must exist`,
        );
      }
    }
  }
});

test("entry IDs remain unique across work and activities", () => {
  const ids = [...portfolio.projects, ...portfolio.achievements].map(
    (entry) => entry.id,
  );
  assert.equal(new Set(ids).size, ids.length);
});

test("every story has a Thai translation", () => {
  for (const entry of [...portfolio.projects, ...portfolio.achievements]) {
    assert.ok(thEntries[entry.id]?.summary, entry.id);
    assert.ok(thEntries[entry.id]?.whatIDid, entry.id);
    assert.ok(thEntries[entry.id]?.whatILearned, entry.id);
  }
});

test("all responsive media derivatives exist", () => {
  for (const entry of [...portfolio.projects, ...portfolio.achievements]) {
    for (const group of ["photos", "graphics", "certificateImages"]) {
      for (const item of entry.media[group]) {
        const base = item.src
          .replace("./public/assets/", "")
          .replace(/[/.]/g, "-");
        for (const width of [640, 1200]) {
          assert.ok(
            existsSync(
              new URL(
                "./public/assets/optimized/" + base + "-" + width + ".webp",
                import.meta.url,
              ),
            ),
            item.src,
          );
        }
      }
    }
  }
});
