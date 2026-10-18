/* Hope Church — scroll reveals and image fade-in.

   Everything is progressive: the pre-rendered HTML and a page with JS off show
   all content. This only runs in the browser after hydration, hides (opacity
   and a 14px offset, see public/assets/motion.css) elements that are still
   below the fold, and shows them once as they scroll into view. Anything on
   screen at that moment is never touched, and the attributes are plain DOM
   ones (`data-rv`, `data-ld`) that React never rewrites.

   Off entirely under prefers-reduced-motion. To keep an element out of it, put
   `data-no-reveal` on it or on any ancestor. */
const CARDS = [
  '.ministry-card', '.event-card', '.event-card-big', '.msg-card', '.msg-list-card',
  '.visit-card', '.value-card', '.discover-card', '.lifegroup-card', '.belief-card',
  '.step-rail', '.mission-pillar', '.missions-tier', '.missions-partner',
  '.missions-partner-v2', '.app-feature-card', '.lifegroups-why-card',
].join(',');
const MAX_STAGGER = 6;
const STAGGER_MS = 50;
const SETTLE_MS = 900;

function reduced() {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  catch { return true; }
}

function belowFold(el) {
  const r = el.getBoundingClientRect();
  return r.top > window.innerHeight * 0.96;
}

/** The blocks to reveal inside <main>: section headers and cards, else the section's first container. */
function targets(root) {
  const found = [];
  root.querySelectorAll('section:not(.hero-a)').forEach((sec) => {
    if (sec.closest('[data-no-reveal]')) return;
    const cards = sec.querySelectorAll(CARDS);
    if (cards.length) {
      sec.querySelectorAll('.section-header').forEach((h) => found.push(h));
      cards.forEach((c) => found.push(c));
    } else {
      const block = sec.querySelector(':scope > [class*="container"]') || sec;
      found.push(block);
    }
  });
  // Drop anything inside another target, so a card in a revealed block is not revealed twice.
  return found.filter((el, i) => !found.some((o, j) => j !== i && o !== el && o.contains(el)));
}

/**
 * Sets up reveals for what is on the page now. Returns a cleanup function.
 * Call again after navigation.
 */
export function initReveal(root = document.querySelector('main')) {
  if (!root || reduced() || typeof IntersectionObserver === 'undefined') return () => {};
  const timers = [];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      io.unobserve(el);
      el.dataset.rv = 'in';
      // Once it has settled, hand the element's own hover transitions back.
      const delay = Number(el.style.getPropertyValue('--rv-delay').replace('ms', '')) || 0;
      timers.push(setTimeout(() => { delete el.dataset.rv; el.style.removeProperty('--rv-delay'); }, SETTLE_MS + delay));
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

  const seenParents = new Map();
  targets(root).forEach((el) => {
    if (el.dataset.rv || belowFold(el) === false) return;
    // Stagger siblings that sit in the same group.
    const n = seenParents.get(el.parentElement) || 0;
    seenParents.set(el.parentElement, n + 1);
    el.style.setProperty('--rv-delay', `${Math.min(n, MAX_STAGGER) * STAGGER_MS}ms`);
    el.dataset.rv = 'pre';
    io.observe(el);
  });

  // Images below the fold fade in as they load; any already loaded are left alone.
  root.querySelectorAll('img').forEach((img) => {
    if (img.complete || img.dataset.ld || !belowFold(img)) return;
    img.dataset.ld = 'wait';
    const done = () => { img.dataset.ld = 'done'; };
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', () => { delete img.dataset.ld; }, { once: true });
  });

  return () => { io.disconnect(); timers.forEach(clearTimeout); };
}

/**
 * For an element that manages its own entrance (the This Week card): sets
 * `data-tw` to `pre` while it is below the fold and `in` once it is seen. Never
 * `pre` if it is already on screen, or under reduced motion.
 */
export function watchInView(el, attr = 'data-tw') {
  if (!el || reduced() || typeof IntersectionObserver === 'undefined') return () => {};
  if (!belowFold(el)) { el.setAttribute(attr, 'in'); return () => {}; }
  el.setAttribute(attr, 'pre');
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { el.setAttribute(attr, 'in'); io.disconnect(); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  io.observe(el);
  return () => io.disconnect();
}
