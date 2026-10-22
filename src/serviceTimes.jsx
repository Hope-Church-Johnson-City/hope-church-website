import React from 'react';
import baked from './generated/service-times.json';

/* Hope Church — Sunday service times, single source of truth.

   The times come from the CMS (media.hopejc.org/api/public/service-times,
   set in Shepherd). scripts/gen-service-times.mjs writes them to
   src/generated/service-times.json before every build, so the pre-rendered
   HTML already has them: no flash, and crawlers see the real times.

   After the page loads we ask the CMS again. The CMS changes what it shows
   after services on the Sunday before a new schedule starts, and the static
   page may be older than that. The first render always uses the baked data,
   so hydration matches; the refresh only swaps in a different answer. */
const { useState, useEffect } = React;

const API = 'https://media.hopejc.org/api/public/service-times';

const ORDINALS = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth'];
const COUNT_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];

// "HH:MM" minus some minutes, in the house style ("6:30am").
function clock(hhmm, minus) {
  const [h, m] = hhmm.split(':').map(Number);
  const total = (((h * 60 + m - minus) % 1440) + 1440) % 1440;
  const hh = Math.floor(total / 60);
  const mm = String(total % 60).padStart(2, '0');
  return `${hh % 12 || 12}:${mm}${hh < 12 ? 'am' : 'pm'}`;
}

// "a, b, and c" / "a and b" / "a".
export function joinList(items) {
  if (items.length <= 1) return items.join('');
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function noteLine(sunday) {
  const groups = [];
  sunday.filter((t) => t.note).forEach((t) => {
    const g = groups.find((x) => x.note === t.note);
    if (g) g.times.push(t.label); else groups.push({ note: t.note, times: [t.label] });
  });
  return groups
    .map((g) => `the ${joinList(g.times)} ${g.times.length === 1 ? 'service is' : 'services are'} ${g.note.charAt(0).toLowerCase()}${g.note.slice(1)}`)
    .join(', ');
}

// Turns the API answer into what the pages use. Sunday only: the site never
// lists other days' services.
function shape(data) {
  const sunday = (data.times || [])
    .filter((t) => t.weekday === 0)
    .map((t, i) => ({
      time: t.time,
      label: t.label,
      short: t.short,
      ampm: t.ampm,
      name: t.name || (ORDINALS[i] ? `${ORDINALS[i]} Service` : `Service ${i + 1}`),
      note: t.note || null,
      stream: !!t.stream,
      minutes: t.minutes || 70,
    }));
  const first = sunday[0];
  const hasNotes = sunday.some((t) => t.note);
  return {
    sunday,
    count: sunday.length,
    // "Sundays · 7:30 · 9:00 · 11:00 · 12:45pm": am/pm dropped except on the last.
    dotted: sunday.map((t, i) => (i < sunday.length - 1 ? t.short : t.label)).join(' \u00b7 '),
    // "Three services", "One service".
    countLabel: sunday.length === 1 ? 'One service' : `${COUNT_WORDS[sunday.length] || sunday.length} services`,
    // For lines that name the streamed time, or nothing when nothing streams.
    streamAt: data.stream ? ` at ${data.stream.label}` : '',
    // "the 7:30am service is nursery & preschool only", from the per-time notes.
    noteLine: noteLine(sunday),
    countWord: COUNT_WORDS[sunday.length] || String(sunday.length),
    stream: data.stream ? data.stream.label : null,
    summary: data.summary || joinList(sunday.map((t) => t.label)),
    startsOn: data.startsOn || null,
    upcoming: data.upcoming || null,
    // Rehearsal: an hour before the first service, finished half an hour before.
    runthrough: first ? clock(first.time, 60) : '',
    runthroughEnd: first ? clock(first.time, 30) : '',
    hasNotes,
    // Services where every kids class meets: the ones with no note.
    classTimes: sunday.filter((t) => !t.note),
    // "every service", or "the 9:00am, 11:00am, and 12:45pm services".
    classServices: hasNotes && sunday.some((t) => !t.note)
      ? `the ${joinList(sunday.filter((t) => !t.note).map((t) => t.label))} ${sunday.filter((t) => !t.note).length === 1 ? 'service' : 'services'}`
      : 'every service',
    // The time to point people at when copy says "the 9:00 service":
    // the livestreamed one, else the second, else the only one.
    featured: sunday.find((t) => t.stream) || sunday[1] || first,
  };
}

const initial = shape(baked);
let current = initial;
const listeners = new Set();
let refreshed = false;

function refresh() {
  if (refreshed || typeof window === 'undefined') return;
  refreshed = true;
  fetch(API)
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (!data || !Array.isArray(data.times) || !data.times.some((t) => t.weekday === 0)) return;
      const next = shape(data);
      if (JSON.stringify(next) === JSON.stringify(current)) return;
      current = next;
      listeners.forEach((fn) => fn(next));
    })
    .catch(() => { /* keep the baked times */ });
}

export function useServiceTimes() {
  // Initial state is the baked data on the server and the client alike.
  const [st, setSt] = useState(initial);
  useEffect(() => {
    listeners.add(setSt);
    if (current !== st) setSt(current);
    refresh();
    return () => { listeners.delete(setSt); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return st;
}

// What the kids' pages say about services that differ. Nothing when no Sunday
// time has a note; otherwise the noted services, their note, and where the
// classes do meet.
export function KidsServiceNote({ className }) {
  const st = useServiceTimes();
  const noted = st.sunday.filter((t) => t.note);
  if (!noted.length) return null;
  const groups = [];
  noted.forEach((t) => {
    const g = groups.find((x) => x.note === t.note);
    if (g) g.times.push(t.label); else groups.push({ note: t.note, times: [t.label] });
  });
  return (
    <p className={className}>
      {groups.map((g, i) => (
        <React.Fragment key={g.note}>
          {i > 0 && ' '}
          <strong>Heads up for the {joinList(g.times)} {g.times.length === 1 ? 'service' : 'services'}:</strong> {g.note}.
        </React.Fragment>
      ))}
      {st.classTimes.length > 0 && <> Kindergarten&ndash;4th grade and Linked 5&ndash;6th grade classes meet at {st.classServices}.</>}
    </p>
  );
}
