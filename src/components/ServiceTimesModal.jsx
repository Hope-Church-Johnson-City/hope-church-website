/* Hope Church — one-off popup announcing the new Sunday service times
   (8:00, 9:30 and 11:15am) starting Nov 1, 2026. It shows on page load until
   ENDS_AT (2:00pm Eastern that Sunday, after the clocks fall back), then never
   again, so it can sit in the code harmlessly after the window closes. Delete
   this file and its one line in routes.jsx whenever convenient.

   Add ?previewServiceTimes to any URL to see it outside its window. */
import React, { useEffect, useRef, useState } from 'react';

const ENDS_AT = Date.parse('2026-11-01T14:00:00-05:00');
const DISMISSED_KEY = 'hope_service_times_2026_11_dismissed';

const CSS = `
.hc-st-backdrop{position:fixed;inset:0;z-index:1000;background:rgba(0,42,84,.72);display:flex;align-items:center;justify-content:center;padding:16px;animation:hcFade .28s cubic-bezier(.22,1,.36,1)}
.hc-st{position:relative;width:100%;max-width:460px;max-height:calc(100vh - 32px);overflow:auto;background:#fff;border-radius:24px;font-family:var(--font-sans,'Gotham','Montserrat',sans-serif);color:var(--ink-900,#1A1F26);container-type:inline-size;animation:hcRise .36s cubic-bezier(.22,1,.36,1)}
.hc-st__hero{position:relative;overflow:hidden;background:linear-gradient(160deg,var(--hope-blue,#0082CA) 0%,var(--hope-navy,#004A98) 100%);padding:32px 32px 28px;color:#fff}
.hc-st__hero::after{content:"";position:absolute;right:-36px;top:-24px;width:190px;height:190px;background:url(/assets/icon-white.png) center/contain no-repeat;opacity:.12;pointer-events:none}
.hc-st__eyebrow{position:relative;margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--hope-sky,#6BC4E8)}
.hc-st__title{position:relative;margin:0;font-family:var(--font-display,'Gotham Ultra','Gotham',sans-serif);font-size:40px;font-weight:900;line-height:1.02;letter-spacing:-.02em;color:#fff}
.hc-st__body{padding:26px 32px 30px}
.hc-st__times{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:0 0 20px;padding:0;list-style:none}
.hc-st__times li{background:var(--bg-brand-soft,#E6F4FB);border-radius:14px;padding:16px 4px 14px;text-align:center}
.hc-st__times b{display:block;font-size:clamp(17px,6.4cqi,26px);font-weight:900;line-height:1;letter-spacing:-.02em;color:var(--hope-navy,#004A98);font-variant-numeric:tabular-nums}
.hc-st__times span{display:block;margin-top:6px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-700,#3D4550)}
.hc-st__text{margin:0 0 22px;font-size:15px;line-height:1.55;color:var(--ink-700,#3D4550)}
.hc-st__actions{display:flex;gap:10px;flex-wrap:wrap}
.hc-st__btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:46px;padding:0 22px;border-radius:999px;font:inherit;font-size:15px;font-weight:700;text-decoration:none;cursor:pointer;transition:background .16s cubic-bezier(.22,1,.36,1)}
.hc-st__btn--primary{border:0;background:var(--hope-blue,#0082CA);color:#fff;box-shadow:0 8px 22px rgba(0,130,202,.28)}
.hc-st__btn--primary:hover{background:var(--hope-navy,#004A98);color:#fff;text-decoration:none}
.hc-st__btn--secondary{border:1px solid var(--hope-blue,#0082CA);background:#fff;color:var(--hope-blue,#0082CA)}
.hc-st__btn--secondary:hover{background:var(--bg-brand-soft,#E6F4FB)}
.hc-st__btn:active{transform:translateY(1px)}
.hc-st__close{position:absolute;z-index:2;top:14px;right:14px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.08);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .16s}
.hc-st__close:hover{background:rgba(255,255,255,.18)}
.hc-st button:focus-visible,.hc-st a:focus-visible{outline:3px solid rgba(107,196,232,.4);outline-offset:2px}
[data-theme="dark"] .hc-st{background:#1A222E;color:#fff}
[data-theme="dark"] .hc-st__times li{background:#0E2238}
[data-theme="dark"] .hc-st__times b{color:#6BC4E8}
[data-theme="dark"] .hc-st__times span,[data-theme="dark"] .hc-st__text{color:#C8CED5}
[data-theme="dark"] .hc-st__btn--secondary{background:transparent;color:#6BC4E8;border-color:#6BC4E8}
[data-theme="dark"] .hc-st__btn--secondary:hover{background:#0E2238}
[data-theme="dark"] .hc-st-backdrop{background:rgba(0,0,0,.72)}
@media (max-width:480px){.hc-st__hero{padding:24px 22px 22px}.hc-st__body{padding:22px}.hc-st__title{font-size:32px}}
@keyframes hcFade{from{opacity:0}to{opacity:1}}
@keyframes hcRise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.hc-st-backdrop,.hc-st{animation:none}}
`;

function shouldShow() {
  try {
    if (new URLSearchParams(window.location.search).has('previewServiceTimes')) return true;
    if (Date.now() >= ENDS_AT) return false;
    return window.localStorage.getItem(DISMISSED_KEY) !== '1';
  } catch {
    return Date.now() < ENDS_AT;
  }
}

export default function ServiceTimesModal() {
  // Starts closed so the pre-rendered HTML and first client render match.
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => { if (shouldShow()) setOpen(true); }, []);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    if (closeRef.current) closeRef.current.focus();
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open]);

  function close() {
    try { window.localStorage.setItem(DISMISSED_KEY, '1'); } catch { /* ignore */ }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="hc-st-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <style>{CSS}</style>
      <div className="hc-st" role="dialog" aria-modal="true" aria-labelledby="hc-st-title">
        <button ref={closeRef} className="hc-st__close" onClick={close} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
        <div className="hc-st__hero">
          <p className="hc-st__eyebrow">Starting this Sunday</p>
          <h2 id="hc-st-title" className="hc-st__title">New service times.</h2>
        </div>
        <div className="hc-st__body">
          <ul className="hc-st__times">
            <li><b>8:00am</b><span>First</span></li>
            <li><b>9:30am</b><span>Second</span></li>
            <li><b>11:15am</b><span>Third</span></li>
          </ul>
          <p className="hc-st__text">Beginning November 1, we’re gathering three times every Sunday. Pick the one that fits your morning. We’ll save you a seat.</p>
          <div className="hc-st__actions">
            <a className="hc-st__btn hc-st__btn--primary" href="/visit" onClick={close}>Plan your visit →</a>
            <button className="hc-st__btn hc-st__btn--secondary" onClick={close}>Got it</button>
          </div>
        </div>
      </div>
    </div>
  );
}
