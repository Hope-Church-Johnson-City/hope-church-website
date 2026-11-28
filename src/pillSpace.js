/* Hope Church — room for the floating pill header (2026-11-27).

   The header floats over the top of every page (mega-nav.css), so the page's
   first block — the hero, a page header, or plain content — runs up behind it.
   That block keeps its own top padding plus --pill-space, so nothing it holds
   sits under the pill while its background (and any picture laid over it)
   fills the space behind.

   "First block" looks through plain wrappers: while the first element has no
   background and no top padding of its own, its first child is used instead,
   so a page wrapped in a <div> (Give, App) still gets its banner behind the
   pill. Its own padding is read fresh each time, since pages set it per
   breakpoint. index.html runs the same before first paint (keep them alike). */
function hasBackground(cs) {
  return cs.backgroundImage !== 'none' || !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor);
}

export function pillTarget(main) {
  let el = main && main.firstElementChild;
  for (let i = 0; el && i < 3; i++) {
    el.style.paddingTop = '';
    const cs = getComputedStyle(el);
    const next = el.firstElementChild;
    if (hasBackground(cs) || parseFloat(cs.paddingTop) > 0 || !next) break;
    // A picture laid over the block (position absolute) is not the block.
    if (/absolute|fixed/.test(getComputedStyle(next).position)) break;
    el = next;
  }
  return el;
}

export function applyPillSpace(main = document.querySelector('main')) {
  // Pages without the site header (the /download card) are left alone.
  if (!document.querySelector('.site-header')) return;
  const el = pillTarget(main);
  if (!el) return;
  el.style.paddingTop = '';
  const own = getComputedStyle(el).paddingTop || '0px';
  el.style.paddingTop = `calc(${own} + var(--pill-space))`;
}
