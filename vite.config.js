import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, existsSync } from 'node:fs';

// One static page per event, so a shared link previews correctly and the
// content is in the HTML rather than appearing after a fetch. The list is
// written by scripts/gen-events.mjs before the build. Events created after a
// build are not here; vercel.json falls those back to the SPA shell.
function eventPaths() {
  const f = new URL('./src/generated/events.json', import.meta.url);
  if (!existsSync(f)) return [];
  try {
    return JSON.parse(readFileSync(f, 'utf8')).map((e) => `/events/${e.slug}`);
  } catch {
    return [];
  }
}

// The Sunday opening hours in index.html's structured data come from the same
// file as the pages (src/generated/service-times.json), so the times a search
// engine reads can't drift from the ones a visitor sees. Each service runs for
// `minutes` (70 when the CMS sends none).
function sundayHours() {
  const f = new URL('./src/generated/service-times.json', import.meta.url);
  const data = JSON.parse(readFileSync(f, 'utf8'));
  const hhmm = (mins) => `${String(Math.floor(mins / 60) % 24).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
  return (data.times || [])
    .filter((t) => t.weekday === 0)
    .map((t) => {
      const [h, m] = t.time.split(':').map(Number);
      const spec = {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: t.time,
        closes: hhmm(h * 60 + m + (t.minutes || 70)),
      };
      if (data.startsOn) spec.validFrom = data.startsOn;
      return `      ${JSON.stringify(spec)},\n`;
    })
    .join('')
    .trim();
}

const serviceTimesHtml = () => ({
  name: 'service-times-html',
  transformIndexHtml: (html) => html.replace('__SUNDAY_HOURS__', () => sundayHours()),
});

// Hope Church website — Vite + React build.
// Stylesheets, fonts, and images live in /public and are served as-is at /assets
// and /fonts, exactly as the original design prototype referenced them.
export default defineConfig({
  plugins: [react(), serviceTimesHtml()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  ssgOptions: {
    includedRoutes(paths) {
      // Drop the parameterised route itself; add a real path per event.
      return [...paths.filter((p) => !p.includes(':')), ...eventPaths()];
    },
  },
});
