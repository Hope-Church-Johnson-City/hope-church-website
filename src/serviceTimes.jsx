import React from 'react';

/* Hope Church — Sunday service times, single source of truth.

   The NEW Sunday schedule goes live on the website on
   Sunday, July 26 2026 at 1:00pm ET (EDT = UTC-4 -> 17:00 UTC).
   Before that instant the site shows the current (OLD) times; after it,
   the NEW times — flipped automatically, no redeploy needed.

   `stream` is the livestreamed service (currently the 9:45am service; it
   maps to the new 9:00am service). Change here if a different service is
   streamed after the switch. */
const { useState, useEffect } = React;

export const SERVICE_TIMES_SWITCH = Date.parse('2026-07-26T17:00:00Z');

const OLD = { first: '8:00am', second: '9:45am', third: '11:30am', stream: '9:45am', runthrough: '7:00am', runthroughEnd: '7:30am', isNew: false };
// From Sunday, October 26 2026: three services, kids' classes at all three.
const NEW = { first: '8:00am', second: '9:30am', third: '11:15am', stream: '9:30am', runthrough: '6:30am', runthroughEnd: '7:00am', isNew: true };

export const OLD_SERVICE_TIMES = OLD;
export const NEW_SERVICE_TIMES = NEW;

// The switch (Jul 26 2026) is now permanently in the past, so NEW is the
// default the static/SSR render bakes in — this keeps the pre-rendered HTML
// and SEO structured data correct for no-JS visitors and crawlers, with no
// flash of old times. The date gate below is retained for safety/preview.
// Add ?previewTimes=new (or =old) to any URL to force a set for QA.
// The fourth service (12:45pm) ended when the church went back to three
// services in late October 2026. The gate is kept rather than deleted because
// every "is the fourth service on?" decision on the site reads it; Infinity
// answers "no" everywhere without those call sites changing. NEW has no
// `fourth`, so ?previewFourth=live has nothing to show.
export const FOURTH_SERVICE_START = Infinity;

// Initial state is deliberately `false` so the pre-rendered HTML and the first
// client render agree (no hydration mismatch); the effect corrects it. The
// build bakes the live state into the static HTML for crawlers.
export function useFourthServiceLive() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    let force = null;
    try {
      const p = new URLSearchParams(window.location.search).get('previewFourth');
      if (p === 'live' || p === 'soon') window.sessionStorage.setItem('previewFourth', p);
      else if (p === 'off') window.sessionStorage.removeItem('previewFourth');
      const stored = window.sessionStorage.getItem('previewFourth');
      if (stored === 'live') force = true;
      else if (stored === 'soon') force = false;
    } catch { /* ignore */ }
    setLive(force !== null ? force : Date.now() >= FOURTH_SERVICE_START);
  }, []);
  return live;
}
// Kids' classes meet at every service now, so there is no exception to note.
// Kept as a component so a future limited service has one place to say so.
export function KidsServiceNote() {
  return null;
}

export function useServiceTimes() {
  const [times, setTimes] = useState(NEW);
  useEffect(() => {
    let force = null;
    try {
      // Persist the preview choice in sessionStorage so it survives in-app
      // navigation (the ?previewTimes param is dropped on client-side nav).
      const p = new URLSearchParams(window.location.search).get('previewTimes');
      if (p === 'new' || p === 'old') window.sessionStorage.setItem('previewTimes', p);
      else if (p === 'off') window.sessionStorage.removeItem('previewTimes');
      const stored = window.sessionStorage.getItem('previewTimes');
      if (stored === 'new') force = NEW;
      else if (stored === 'old') force = OLD;
    } catch { /* ignore */ }
    setTimes(force || (Date.now() >= SERVICE_TIMES_SWITCH ? NEW : OLD));
  }, []);
  return times;
}
