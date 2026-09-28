import { motionAllowed, particleCount } from './ocean-state.js';

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(pointer: fine)');
const layer = document.createElement('div');
layer.className = 'ocean-particles';
layer.setAttribute('aria-hidden', 'true');
document.body.append(layer);
const toggle = document.createElement('button');
toggle.type = 'button';
toggle.id = 'motion-toggle';
document.querySelector('.nav-tools').prepend(toggle);
let paused = false;
try { paused = localStorage.getItem('ocean-paused') === 'true'; } catch {}
function sync() {
  const running = motionAllowed(reduced.matches, paused, document.hidden);
  root.dataset.oceanMotion = running ? 'running' : 'paused';
  const thai = root.lang === 'th';
  toggle.textContent = thai ? 'การเคลื่อนไหว' : 'Motion';
  toggle.setAttribute('aria-pressed', String(!paused && !reduced.matches));
  toggle.setAttribute('aria-label', reduced.matches
    ? (thai ? 'ปิดการเคลื่อนไหวตามการตั้งค่าระบบ' : 'Motion disabled by system preference')
    : (thai ? (paused ? 'เปิดการเคลื่อนไหว' : 'หยุดการเคลื่อนไหว') : (paused ? 'Resume ocean motion' : 'Pause ocean motion')));
  toggle.disabled = reduced.matches;
  if (!running) root.style.setProperty('--pointer-x', '0px');
}
function particles() {
  const count = particleCount(innerWidth);
  if (layer.childElementCount === count) return;
  layer.replaceChildren(...Array.from({length: count}, (_, i) => {
    const particle = document.createElement('i');
    particle.className = i % 8 === 0 ? 'ocean-bubble' : 'ocean-speck';
    particle.style.cssText = `--x:${(i * 47 + 11) % 100}%;--y:${(i * 31 + 7) % 100}%;--size:${i % 8 === 0 ? 7 : 2 + i % 3}px;--duration:${22 + i % 9 * 4}s;--delay:-${i * 3}s`;
    return particle;
  }));
}
toggle.addEventListener('click', () => {
  paused = !paused;
  try { localStorage.setItem('ocean-paused', String(paused)); } catch {}
  sync();
});
new MutationObserver(sync).observe(root, {attributes:true, attributeFilter:['lang']});
reduced.addEventListener('change', sync);
document.addEventListener('visibilitychange', sync);
window.addEventListener('resize', particles, {passive:true});
const hero = document.querySelector('.hero');
hero.addEventListener('pointermove', event => {
  if (finePointer.matches && motionAllowed(reduced.matches, paused, document.hidden)) {
    const rect = hero.getBoundingClientRect();
    root.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width - .5) * 12}px`);
  }
});
hero.addEventListener('pointerleave', () => root.style.setProperty('--pointer-x', '0px'));
particles();
sync();
