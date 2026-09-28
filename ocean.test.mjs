import test from 'node:test';
import assert from 'node:assert/strict';
import { motionAllowed, particleCount } from './ocean-state.js';
test('motion never runs against reduced motion or a paused preference', () => {
  assert.equal(motionAllowed(false, false, false), true);
  assert.equal(motionAllowed(true, false, false), false);
  assert.equal(motionAllowed(false, true, false), false);
  assert.equal(motionAllowed(false, false, true), false);
});
test('small screens use fewer particles', () => {
  assert.equal(particleCount(375), 10);
  assert.equal(particleCount(1440), 24);
});
