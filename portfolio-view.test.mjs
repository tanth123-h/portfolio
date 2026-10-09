import test from "node:test";
import assert from "node:assert/strict";
import { overview, cover, projects } from "./portfolio-view.js";
import * as view from "./portfolio-view.js";
test("stories tolerate missing optional images and skills", () => {
  const raw = {
    id: "minimal",
    title: "Minimal",
    media: {
      photos: [],
      certificateImages: [],
      graphics: [],
      videos: [],
      pdfs: [],
    },
  };
  assert.doesNotThrow(() => overview(raw));
  assert.ok(!overview(raw).includes("data-image"));
});
test("project covers use real prototype evidence where available", () => {
  assert.ok(
    cover(projects.find((p) => p.id === "youth-innovation")).src.endsWith(
      "youth-innovation-2.png",
    ),
  );
  assert.ok(
    cover(projects.find((p) => p.id === "agri")).src.includes(
      "project-display",
    ),
  );
});
test("project labels distinguish awards, qualification and later prototypes", () => {
  const { projectLabels } = view;
  assert.equal(
    typeof projectLabels,
    "function",
    "Project labels are not implemented",
  );
  assert.deepEqual(
    projectLabels("agri").map((p) => p.en),
    ["Regional Bronze", "National · 210 teams"],
  );
  assert.deepEqual(
    projectLabels("phishwall-ai").map((p) => p.en),
    ["Working prototype", "Proposal · not qualified"],
  );
  assert.deepEqual(
    projectLabels("troposense").map((p) => p.en),
    ["Research concept", "Selection Gold"],
  );
  assert.deepEqual(projectLabels("missing"), []);
});
test("contact sheet exposes each real photo with its original viewer target", () => {
  const { contactSheet } = view;
  assert.equal(
    typeof contactSheet,
    "function",
    "Contact sheet is not implemented",
  );
  const html = contactSheet([
    { src: "./public/assets/a.jpg", title: "Demo", alt: "Sensor" },
    { src: "./public/assets/b.jpg", title: "Team" },
  ]);
  assert.equal((html.match(/data-image=/g) || []).length, 2);
  assert.ok(html.includes('data-image="/public/assets/a.jpg"'));
  assert.ok(html.includes('alt="Sensor"'));
  assert.ok(html.includes("Team"));
});
