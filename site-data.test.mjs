import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { portfolio } from './site-data.js';

test('every featured portfolio entry has a story and at least one media slot', () => {
  for (const entry of portfolio.projects.concat(portfolio.achievements)) {
    assert.ok(entry.whatILearned, `${entry.title} needs a learning reflection`);
    assert.ok(Object.values(entry.media).some((items) => items.length), `${entry.title} needs media`);
  }
});

test('each portfolio entry uses complete media groups', () => {
  for (const entry of [...portfolio.projects, ...portfolio.achievements]) {
    assert.deepEqual(Object.keys(entry.media).sort(),
      ['certificateImages', 'graphics', 'pdfs', 'photos', 'videos']);
  }
});

test('each linked asset has a public path', () => {
  for (const entry of [...portfolio.projects, ...portfolio.achievements]) {
    for (const group of Object.values(entry.media)) {
      for (const item of group) assert.match(item.src, /^\.\/public\/assets\//);
    }
  }
});

test('each referenced public asset exists', () => {
  for (const entry of [...portfolio.projects, ...portfolio.achievements]) {
    for (const group of Object.values(entry.media)) {
      for (const item of group) {
        assert.ok(existsSync(new URL(item.src, import.meta.url)), `${item.src} must exist`);
      }
    }
  }
});

test('ocean-depth stylesheet supplies page layout and theme', async () => {
  const css = await readFile(new URL('./styles.css', import.meta.url), 'utf8');
  assert.match(css, /--surface:\s*#ddf8ff/);
  assert.match(css, /--abyss:\s*#011722/);
  assert.match(css, /\.hero-wave\s*\{/);
  assert.match(css, /\.case-study\s*\{/);
  assert.match(css, /prefers-reduced-motion/);
  assert.ok(css.length > 5000, 'stylesheet must not be a truncated theme fragment');
});
