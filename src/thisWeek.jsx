/* Hope Church — the This Week list, shared by /this-week and the homepage.

   Both read `thisWeek` from the App Layout document at media.hopejc.org, the
   same document the iOS and Android apps read, in the browser only. Publishing
   This Week in the CMS therefore updates the apps, /this-week and the homepage
   together, with no rebuild; that is why nothing here is baked in at build time.

   QA: ?previewThisWeek=empty shows the homepage block with an empty list. */
import React from 'react';

export const THIS_WEEK_CMS = (import.meta.env && import.meta.env.VITE_CMS_ORIGIN) || 'https://media.hopejc.org';

// The app's own screens, as pages on this site. A row pointing somewhere the
// site has no page for (the Bible tab, notifications) is left out.
const THIS_WEEK_SCREENS = {
  nextSteps: '/next-steps', serve: '/serve', missions: '/missions', discoverHope: '/discover-hope',
  about: '/about', team: '/team', generations: '/generations', prayer: '/prayer', getHelp: '/get-help',
  contact: '/contact', podcasts: '/podcast', ministries: '/ministries',
  'ministry-kids': '/ministries/kids', 'ministry-linked56': '/ministries/linked56',
  'ministry-students': '/ministries/students', 'ministry-college': '/ministries/college',
  'ministry-women': '/ministries/women', 'ministry-men': '/ministries/men',
  'ministry-worship': '/ministries/worship', 'ministry-fueledbyhope': '/ministries/fueled-by-hope',
};
const THIS_WEEK_TABS = { home: '/', media: '/sermons', events: '/events', give: '/give' };

export function thisWeekHref(d) {
  if (!d) return null;
  if (d.kind === 'link' || d.kind === 'web') {
    // Our own pages open here rather than reloading the site.
    return String(d.url || '').replace(/^https:\/\/(www\.)?hopejc\.org(?=\/|$)/, '') || '/';
  }
  if (d.kind === 'tab') return THIS_WEEK_TABS[d.id] || null;
  if (d.kind === 'screen') return THIS_WEEK_SCREENS[d.id] || null;
  return null;
}

/** An SF Symbol name from the CMS, as one of the site's own icons. */
export function thisWeekIcon(name) {
  const n = String(name || '');
  if (/play|video|mic/.test(n)) return 'play';
  if (/heart|pray/.test(n)) return 'heart';
  if (/gift|give|dollar/.test(n)) return 'gift';
  if (/calendar|clock/.test(n)) return 'calendar';
  if (/book|bible/.test(n)) return 'book';
  if (/news|mail|envelope/.test(n)) return 'mail';
  return 'arrow';
}

/**
 * True for a row that should draw the Christmas tree: the explicit
 * `glyph: "christmas-tree"`, or the `tree` / `tree.fill` symbol the This Week
 * builder gives Operation Christmas Child (THIS_WEEK_EVENT_ICONS in the Worker).
 */
export function isChristmasTree(row) {
  if (!row) return false;
  if (row.glyph === 'christmas-tree') return true;
  return /^tree(\.fill)?$/.test(String(row.icon || ''));
}

/** A green tiered evergreen with a gold star, drawn in colour on any theme. */
export function ChristmasTree({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5.2 7.4 10.4h2.4L5.6 15.2h2.8L4 20h16l-4.4-4.8h2.8l-4.2-4.8h2.4z" fill="#2F8F4E" />
      <path d="M12 5.2 9.6 7.9h4.8z" fill="#3FA862" />
      <rect x="10.8" y="20" width="2.4" height="2.4" rx="0.4" fill="#8A5A2B" />
      <path d="m12 1.2.82 1.66 1.83.27-1.32 1.29.31 1.82L12 5.38l-1.64.86.31-1.82-1.32-1.29 1.83-.27z" fill="#F2B705" />
    </svg>
  );
}

export function thisWeekDate(day) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day || '');
  if (!m) return '';
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

// "No Hope Students – back October 14": a week something is not meeting.
// Shown in amber so it is not read past as one more link.
export const THIS_WEEK_NOTICE = /^(no|not meeting|cancel)/i;

/** Enabled rows the site can link to, each with its `href`. */
export function thisWeekRows(week) {
  return ((week && week.rows) || [])
    .filter((r) => r && r.enabled !== false)
    .map((r) => ({ ...r, href: thisWeekHref(r.destination) }))
    .filter((r) => r.href);
}

function previewEmpty() {
  try { return new URLSearchParams(window.location.search).get('previewThisWeek') === 'empty'; }
  catch { return false; }
}

/**
 * The homepage's copy of This Week: `{ week, latest, failed }`. `week` starts
 * null so the pre-rendered HTML and the first client render agree; a
 * switched-off section reads as an empty list. `latest` is the newest Sunday
 * message from /api/public/media, fetched the way /this-week does, unless the
 * layout turns it off (`thisWeek.latest.enabled === false`).
 */
export function useThisWeek() {
  const [state, setState] = React.useState({ week: null, latest: null, failed: false });
  React.useEffect(() => {
    let live = true;
    if (previewEmpty()) { setState({ week: { rows: [] }, latest: null, failed: false }); return undefined; }
    fetch(`${THIS_WEEK_CMS}/api/public/app-layout`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((layout) => {
        if (!live) return;
        const tw = layout && layout.thisWeek;
        const week = tw && tw.enabled !== false ? tw : { rows: [] };
        setState((s) => ({ ...s, week, failed: false }));
        if (!tw || !tw.latest || tw.latest.enabled !== false) {
          fetch(`${THIS_WEEK_CMS}/api/public/media?branch=messages&limit=1`)
            .then((r) => (r.ok ? r.json() : null))
            .then((j) => { if (live && j && j.media && j.media[0]) setState((s) => ({ ...s, latest: j.media[0] })); })
            .catch(() => {});
        }
      })
      .catch(() => { if (live) setState({ week: null, latest: null, failed: true }); });
    return () => { live = false; };
  }, []);
  return state;
}

/** Rows the This Week builder makes from the calendar (APP-LAYOUT.md). */
export function isEventRow(row) {
  const id = String((row && row.id) || '');
  return id.startsWith('ev-') || id.startsWith('no-') || id === 'all-events';
}

/**
 * "Sun 5:30pm · Woven Farm to Table" -> { day: 'SUN', time: '5:30', name }.
 * A title without that prefix comes back with day and time null.
 */
export function splitEventTitle(title) {
  const t = String(title || '');
  const m = /^(sun|mon|tue|wed|thu|fri|sat)[a-z]*\.?\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*[·•|-]\s*(.+)$/i.exec(t);
  if (!m) return { day: null, time: null, name: t };
  return { day: m[1].toUpperCase(), time: `${m[2]}:${m[3] || '00'}`, name: m[5] };
}

/**
 * The app's colour for a link row's tile (HomeWeek.swift `style`), by SF Symbol
 * name or id: iOS system teal, pink and green, brand blue for notes, and the
 * deep brand blue for anything else.
 */
export function thisWeekTileColor(row) {
  const key = `${(row && row.icon) || ''} ${(row && row.id) || ''} ${(row && row.title) || ''}`.toLowerCase();
  if (/note|play/.test(key)) return '#0082CA';
  if (/newspaper|newsletter/.test(key)) return '#30B0C7';
  if (/heart|prayer/.test(key)) return '#FF2D55';
  if (/gift|give/.test(key)) return '#34C759';
  if (/step|signpost/.test(key)) return '#5856D6';
  return '#004A98';
}
