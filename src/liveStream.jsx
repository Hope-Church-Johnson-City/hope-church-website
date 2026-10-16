import React from 'react';

/* Hope Church — "are we live right now?"

   The CMS answers at media.hopejc.org/api/public/live from the Transmit
   encoder: live only while a real (not test) broadcast is on YouTube. The
   homepage swaps its "Watch live" button for the player while that is true
   and goes back on its own when the broadcast ends.

   Initial state is null so the pre-rendered HTML and the first client render
   agree; the effect fills it in. A failed check counts as not live, so a CMS
   problem can only ever leave the page as it is today.

   QA: ?previewLive=1 shows the live layout with a placeholder player;
   ?previewLive=VIDEOID plays that YouTube video; ?previewLive=off clears it. */
const { useState, useEffect } = React;

const CMS_ORIGIN = (import.meta.env && import.meta.env.VITE_CMS_ORIGIN) || 'https://media.hopejc.org';
const LIVE_URL = `${CMS_ORIGIN}/api/public/live`;
const CHECK_MS = 60e3;

function previewState() {
  try {
    const p = new URLSearchParams(window.location.search).get('previewLive');
    if (p === 'off') window.sessionStorage.removeItem('previewLive');
    else if (p) window.sessionStorage.setItem('previewLive', p);
    const v = window.sessionStorage.getItem('previewLive');
    if (!v) return null;
    const id = /^[A-Za-z0-9_-]{11}$/.test(v) ? v : null;
    return {
      live: true,
      title: 'Sunday Worship (preview)',
      embedUrl: id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0` : null,
      watchUrl: id ? `https://www.youtube.com/watch?v=${id}` : 'https://www.youtube.com/@hopechurchjohnsoncity/live',
    };
  } catch {
    return null;
  }
}

export function useLiveStream() {
  const [state, setState] = useState(null);
  useEffect(() => {
    const preview = previewState();
    if (preview) { setState(preview); return undefined; }
    let stopped = false;
    let timer = null;
    const check = () => {
      fetch(LIVE_URL, { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : { live: false }))
        .catch(() => ({ live: false }))
        .then((j) => {
          if (stopped) return;
          const next = j && j.live && j.embedUrl ? j : { live: false };
          // Keep the same object while nothing changed, so the player is
          // never reloaded under someone who is watching.
          setState((prev) => (prev && prev.live === next.live && prev.embedUrl === next.embedUrl && prev.title === next.title ? prev : next));
        });
    };
    const schedule = () => { clearInterval(timer); timer = setInterval(check, CHECK_MS); };
    const onVisible = () => { if (document.visibilityState === 'visible') { check(); schedule(); } else clearInterval(timer); };
    check();
    schedule();
    document.addEventListener('visibilitychange', onVisible);
    return () => { stopped = true; clearInterval(timer); document.removeEventListener('visibilitychange', onVisible); };
  }, []);
  return state && state.live ? state : null;
}
