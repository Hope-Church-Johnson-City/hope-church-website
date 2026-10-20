/* Fetches the Get Help resource list from the CMS and writes
   src/generated/help.json before the build.

   The list used to be typed into pages-extra.jsx, and again into the iOS and
   Android apps, so a changed phone number meant a deploy and two app releases.
   It now lives in the CMS (dashboard.hopejc.org/get-help); the apps read the
   same endpoint. Saving there marks the site stale, so a rebuild follows.

   Baked in so the page is complete in its pre-rendered HTML. The page still
   fetches the live copy when it loads (GetHelpPage), so an edit shows up
   before the rebuild has finished.

   Like the other generators, a failure here must never fail the build: keep
   whatever the last successful run wrote. */
import { writeFileSync, existsSync } from 'node:fs';

const API = 'https://media.hopejc.org/api/public/help';
const OUT = new URL('../src/generated/help.json', import.meta.url);
// Unique per run so no proxy can hand back a response from a previous build.
const TAG = `${process.pid}-${Date.now().toString(36)}`;

async function main() {
  const res = await fetch(`${API}?b=${TAG}`, {
    headers: { 'user-agent': 'hope-church-build/1.0', 'cache-control': 'no-cache' },
  });
  if (!res.ok) throw new Error(`help responded ${res.status}`);
  const help = await res.json();
  if (!help || !Array.isArray(help.categories)) throw new Error('unexpected response shape');
  writeFileSync(OUT, JSON.stringify(help, null, 2) + '\n');
  const n = help.categories.reduce((sum, c) => sum + c.resources.length, 0);
  console.log(`Wrote src/generated/help.json (${help.categories.length} categories, ${n} resources${help.featured ? ', 1 featured' : ''})`);
}

main().catch((err) => {
  console.warn(`gen-help: ${err.message}`);
  if (existsSync(OUT)) {
    console.warn('gen-help: keeping the previous file');
  } else {
    // pages-extra.jsx imports this file, so it has to exist for the build.
    writeFileSync(OUT, JSON.stringify({ featured: null, categories: [] }) + '\n');
    console.warn('gen-help: wrote an empty list; the page will rely on the live copy');
  }
});
