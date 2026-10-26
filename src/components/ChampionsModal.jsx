/* Hope Church — one-off popup congratulating the 2026 Fall Festival cornhole
   champions. It shows on page load until ENDS_AT, then never again, so it can
   sit in the code harmlessly after the window closes. Delete this file and its
   one line in routes.jsx whenever convenient.

   Add ?previewChampions to any URL to see it outside its window. */
import React, { useEffect, useRef, useState } from 'react';

const ENDS_AT = Date.parse('2026-10-26T13:00:00-04:00');
const DISMISSED_KEY = 'hope_champions_2026_dismissed';

const CSS = `
.hc-champ-backdrop{position:fixed;inset:0;z-index:1000;background:rgba(0,42,84,.72);display:flex;align-items:center;justify-content:center;padding:16px;animation:hcFade .28s cubic-bezier(.22,1,.36,1)}
.hc-champ{position:relative;width:100%;max-width:520px;max-height:calc(100vh - 32px);overflow:auto;background:#fff;border-radius:16px;font-family:var(--font-sans,'Gotham','Montserrat',sans-serif);color:var(--ink-900,#1A1F26);animation:hcRise .36s cubic-bezier(.22,1,.36,1)}
.hc-champ__hero{background:linear-gradient(160deg,var(--hope-navy,#004A98) 0%,var(--hope-blue,#0082CA) 100%);padding:32px 32px 28px;color:#fff}
.hc-champ__logo{display:block;width:140px;height:auto;margin:0 0 28px}
.hc-champ__eyebrow{margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--hope-sky,#6BC4E8)}
.hc-champ__title{margin:0;font-size:40px;font-weight:900;line-height:1.02;letter-spacing:-.02em;color:#fff}
.hc-champ__rule{width:48px;height:3px;background:var(--hope-sky,#6BC4E8);margin:18px 0 14px;border:0}
.hc-champ__names{margin:0;font-size:17px;font-weight:500;line-height:1.5;color:#fff}
.hc-champ__body{padding:28px 32px 32px}
.hc-champ__q{margin:0 0 14px;font-size:17px;font-weight:700;line-height:1.4}
.hc-champ__quote{margin:0;background:var(--bg-brand-soft,#E6F4FB);border-radius:10px;padding:20px}
.hc-champ__quote p{margin:0 0 12px;font-size:16px;line-height:1.6;color:var(--ink-900,#1A1F26)}
.hc-champ__quote cite{font-style:normal;font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--hope-navy,#004A98)}
.hc-champ__cta{display:block;width:100%;margin-top:24px;height:48px;border:0;border-radius:999px;background:var(--hope-blue,#0082CA);color:#fff;font:inherit;font-size:16px;font-weight:700;cursor:pointer;transition:background .16s cubic-bezier(.22,1,.36,1)}
.hc-champ__cta:hover{background:var(--hope-navy,#004A98)}
.hc-champ__cta:active{transform:translateY(1px)}
.hc-champ__close{position:absolute;top:14px;right:14px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.08);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .16s}
.hc-champ__close:hover{background:rgba(255,255,255,.18)}
.hc-champ button:focus-visible{outline:3px solid rgba(107,196,232,.4);outline-offset:2px}
@media (max-width:480px){.hc-champ__hero{padding:24px 22px 22px}.hc-champ__body{padding:22px}.hc-champ__title{font-size:32px}.hc-champ__logo{margin-bottom:22px}}
@keyframes hcFade{from{opacity:0}to{opacity:1}}
@keyframes hcRise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.hc-champ-backdrop,.hc-champ{animation:none}}
`;

function shouldShow() {
  try {
    if (new URLSearchParams(window.location.search).has('previewChampions')) return true;
    if (Date.now() >= ENDS_AT) return false;
    return window.localStorage.getItem(DISMISSED_KEY) !== '1';
  } catch {
    return Date.now() < ENDS_AT;
  }
}

export default function ChampionsModal() {
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
    <div className="hc-champ-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <style>{CSS}</style>
      <div className="hc-champ" role="dialog" aria-modal="true" aria-labelledby="hc-champ-title">
        <button ref={closeRef} className="hc-champ__close" onClick={close} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
        <div className="hc-champ__hero">
          <img className="hc-champ__logo" src="/assets/logo-horizontal-reversed.png" alt="Hope Church" />
          <p className="hc-champ__eyebrow">2026 Fall Festival</p>
          <h2 id="hc-champ-title" className="hc-champ__title">Cornhole Champions</h2>
          <hr className="hc-champ__rule" />
          <p className="hc-champ__names">Congratulations to Brant Taylor and Nate Abma.</p>
        </div>
        <div className="hc-champ__body">
          <p className="hc-champ__eyebrow" style={{ color: 'var(--hope-blue,#0082CA)' }}>From the Champs</p>
          <p className="hc-champ__q">What was going through your heads in that final round?</p>
          <blockquote className="hc-champ__quote">
            <p>“It felt very surreal. You dream about being in that situation during all the workouts and long practices. We got to a point where Nate set me up in great position to bring it home, and I put every bag right where it needed to be. I know this sounds corny but it felt like we were destined to take it home. We worked so hard all year to get here, just feels good to get it done, ya know?”</p>
            <cite>Brant Taylor</cite>
          </blockquote>
          <button className="hc-champ__cta" onClick={close}>Continue to site</button>
        </div>
      </div>
    </div>
  );
}
