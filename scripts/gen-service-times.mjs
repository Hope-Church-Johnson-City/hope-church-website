/* Fetches the Sunday service times from the CMS and writes
   src/generated/service-times.json before the build.

   The times used to be constants in serviceTimes.jsx, changed by a deploy and
   mirrored by hand in the apps. They now live in Shepherd (Settings > Church >
   Service times); the CMS publishes them and the apps read the same endpoint.
   The pages bake this file into their pre-rendered HTML, and index.html's
   opening-hours data is generated from it (see vite.config.js).

   Like the other generators, a failure here must never fail the build: keep
   whatever the last successful run wrote. The committed file holds the current
   times, so a fresh checkout builds offline. */
import { writeFileSync, existsSync } from 'node:fs';

const API = 'https://media.hopejc.org/api/public/service-times';
const OUT = new URL('../src/generated/service-times.json', import.meta.url);
// Unique per run so no proxy can hand back a response from a previous build.
const TAG = `${process.pid}-${Date.now().toString(36)}`;

async function main() {
  const res = await fetch(`${API}?b=${TAG}`, {
    headers: { 'user-agent': 'hope-church-build/1.0', 'cache-control': 'no-cache' },
  });
  if (!res.ok) throw new Error(`service-times responded ${res.status}`);
  const data = await res.json();
  if (!data || !Array.isArray(data.times) || !data.times.some((t) => t.weekday === 0)) {
    throw new Error('unexpected response shape');
  }
  writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`Wrote src/generated/service-times.json (${data.times.length} times${data.upcoming ? ', change upcoming' : ''})`);
}

main().catch((err) => {
  console.warn(`gen-service-times: ${err.message}`);
  if (existsSync(OUT)) console.warn('gen-service-times: keeping the previous file');
  else console.warn('gen-service-times: no file to keep; the build will fail on the missing import');
});
