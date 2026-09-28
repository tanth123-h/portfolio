import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog } from './catalog.js';
test('competitions and activities are separate without duplicate events', () => {
  assert.equal(catalog.competitions.length, 8);
  assert.equal(catalog.activities.length, 2);
  assert.equal(new Set([...catalog.competitions, ...catalog.activities].map(x => x.id)).size, 10);
  assert.ok(catalog.competitions.some(x => x.id === 'grow-a-garden-science'));
  assert.ok(catalog.competitions.find(x => x.id === 'agri').outcome.includes('national'));
});
