# Build and deploy

Host: Vercel, project for this repo, domain www.hopejc.org. The apex
`hopejc.org` redirects to `www` (in `vercel.json`); canonical tags use
`https://www.hopejc.org`. To change the canonical domain, change `SITE_ORIGIN`
in `src/nav.js` and the redirect together.

## Deploy

Push to `main`. Vercel's GitHub app is installed on the Hope-Church-Johnson-City
organisation for this repo only, and builds with `npm run build`, output `dist`.
No dashboard settings need changing for a normal deploy.

A rebuild without a code change is a POST to the Vercel deploy hook "CMS
rebuild" (branch `main`). The hook URL is stored only as the Worker secret
`VERCEL_DEPLOY_HOOK`. Reconnecting the Git integration in Vercel deletes deploy
hooks; if that happens, create a new one and set it on the Worker
(`wrangler secret put VERCEL_DEPLOY_HOOK`, from `~/hope-media-automation/worker-deploy`).

## What the build does

`npm run build`:

1. `gen-events.mjs`: fetches `https://media.hopejc.org/api/public/calendar`
   (upcoming plus the last 180 days) to `src/generated/events.json`.
2. `gen-discover-hope.mjs`: picks the next Discover Hope class from that file to
   `src/generated/discover-hope.json`.
3. `gen-announcement.mjs`: fetches `/api/public/app-layout` and writes its
   `announcement` to `src/generated/announcement.json`.
4. `gen-sitemap.mjs`: writes `public/sitemap.xml` from `src/nav.js` plus
   upcoming events (generated file, git-ignored).
5. `vite-react-ssg build`: pre-renders every page in `src/nav.js` plus one page
   per event in `events.json` (`vite.config.js`) into `dist/`.
6. `postbuild-404.mjs`: copies `dist/404/index.html` to `dist/404.html`.

If a CMS fetch fails, steps 1 to 3 keep the previous generated file and the
build still succeeds. Check the build log for `gen-...: keeping the previous
file` when content looks old.

## How CMS changes reach the site

Events, the announcement and the Discover Hope class are baked in at build time
and also fetched live by the browser, so a visitor sees an edit within a page
load and the static HTML catches up on the next build.

The CMS marks the site stale (`app_settings.site_stale_at`) when staff edit
events or the announcement. The Worker cron then calls the deploy hook after 90
seconds of quiet, at most once every 5 minutes, plus a nightly rebuild at about
3 a.m. Eastern. Site changes in the CMS need no action here.

Editing the CMS database directly with SQL skips this. After editing events or
the announcement that way, set it by hand (from
`~/hope-media-automation/worker-deploy`):

```bash
npx wrangler d1 execute hope-media --remote --command "INSERT INTO app_settings (key,value) VALUES ('site_stale_at', CAST(strftime('%s','now') AS INTEGER)*1000) ON CONFLICT (key) DO UPDATE SET value=excluded.value;"
```

## After adding a page

1. Add the key and path to `KEY_TO_PATH` in `src/nav.js` (the sitemap follows).
2. Add the route in `src/routes.jsx` and the title and description in `src/seo.jsx`.
3. Update the page table in README.md.

## Search Console

Submit `https://www.hopejc.org/sitemap.xml` under Indexing, Sitemaps. Old
`?page=...` links redirect to the clean URLs.

## Vercel routing (`vercel.json`)

- `/sermons/<branch>/...` and `/events/img/...` are rewritten to the Worker
  (`hope-media.cowens-09f.workers.dev`), as is `/events/<slug>` for events with
  no pre-rendered file.
- `media.`, `calendar.`, `dashboard.` and `analytics.hopejc.org` are served by
  the Worker through host-based rewrites; their root paths redirect to
  `/admin`, `/calendar`, `/dashboard` and `/analytics`.
- `cleanUrls` on, `trailingSlash` off.
