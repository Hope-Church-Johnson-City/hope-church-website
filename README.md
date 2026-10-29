# Hope Church website

www.hopejc.org, the public site for Hope Church (Johnson City, TN). A Vite +
React app pre-rendered to one static HTML file per page by `vite-react-ssg`,
hosted on Vercel. Repo: github.com/Hope-Church-Johnson-City/hope-church-website.

## Commands

```bash
npm install
npm run dev       # Vite dev server, http://localhost:5173 (uses the committed src/generated/*.json)
npm run build     # fetch CMS data, generate sitemap, pre-render to dist/
npm run preview
```

`npm run build` runs, in order: `scripts/gen-events.mjs`,
`scripts/gen-discover-hope.mjs`, `scripts/gen-announcement.mjs`,
`scripts/gen-sitemap.mjs`, `vite-react-ssg build`, `scripts/postbuild-404.mjs`.
Details are in DEPLOY.md.

## Pages

`src/nav.js` is the one list of pages (key to URL). `src/routes.jsx` wires each
URL to a component, and `src/seo.jsx` holds each page's title and description.
The sitemap is generated from `nav.js`.

| URL | Component file |
|---|---|
| `/` | `components/homepage.jsx` (via `routes.jsx`) |
| `/visit` | `pages.jsx` (Connect Card embed, see below) |
| `/about`, `/team`, `/sermons`, `/events`, `/ministries`, `/give`, `/serve`, `/next-steps`, `/contact` | `pages.jsx` |
| `/events/<slug>` | `event-detail.jsx` (one pre-rendered page per event) |
| `/ministries/kids`, `linked56`, `students`, `college`, `women`, `men`, `worship`, `fueled-by-hope` | `ministry-*.jsx` |
| `/generations` | `generations.jsx` |
| `/life-groups`, `/missions`, `/connect`, `/discover-hope` | `getinvolved.jsx` |
| `/prayer`, `/get-help`, `/podcast`, `/podcast/finding-hope`, `/app`, `/download`, `/this-week` | `pages-extra.jsx` |
| `/privacy`, `/accessibility`, `/terms`, `/delete-account` | `pages-legal.jsx` |
| anything else | pre-rendered 404 (`dist/404.html`) |

`components/shared.jsx` has the header, footer, Sunday strip and announcement
bar. `src/serviceTimes.jsx` holds the Sunday service times used across pages.
Navigation uses real `<a href>` links; routing is react-router. Old
`?page=...` links redirect to the clean URL.

Stylesheets, fonts and images are in `public/` and served as-is under `/assets`
and `/fonts`.

## Data from the CMS

The CMS is the Cloudflare Worker at `media.hopejc.org` (repo hope-church-cms).
Three things on the site come from its public JSON API. Each is fetched at
build time so the pre-rendered HTML has the content, then fetched again in the
browser so an edit shows before the next rebuild finishes.

| What | API | Build script | Baked into | Live fetch |
|---|---|---|---|---|
| Events (list and each event page) | `/api/public/calendar` | `gen-events.mjs` -> `src/generated/events.json` | `/events/<slug>` pages, sitemap | `components/event-detail.jsx` |
| Announcement bar | `/api/public/app-layout` (the `announcement` field, same document the apps read) | `gen-announcement.mjs` -> `src/generated/announcement.json` | every page | `src/announcement.jsx` |
| Next Discover Hope class | picked from the events file | `gen-discover-hope.mjs` -> `src/generated/discover-hope.json` | `/discover-hope` | `src/discoverHope.js` |

Notes:

- `gen-events` fetches upcoming events plus those that ended in the last 180
  days, so shared links to recent events keep their pre-rendered page. The
  sitemap lists upcoming events only. An event created after the last build has
  no static file; Vercel sends `/events/<slug>` to the Worker's own page until
  the next rebuild.
- If the CMS cannot be reached, each script keeps the previous generated file
  and the build continues. The `src/generated/*.json` files are committed.
- `/this-week` reads `/api/public/app-layout` and the latest message from
  `/api/public/media` in the browser only.
- The homepage "This week at Hope." block (`HomeThisWeek` in
  `components/homepage.jsx`, under the hero) is drawn like the app's Home
  This Week card (iOS `HomeWeek.swift`): a tinted band with the date from
  `thisWeek.updated`, a "See all" link to `/this-week` and the Sunday's
  message card (newest message from `/api/public/media?branch=messages&limit=1`,
  as on `/this-week`; hidden when there is none or `thisWeek.latest.enabled`
  is false); then the link rows (solid tiles in the app's colours, by icon
  name: notes blue, newsletter teal, prayer pink, give green, else navy); then
  "Coming up this week" with the event rows (ids `ev-*`, `no-*`,
  `all-events`), whose tile shows the day and time split off the title's
  "Sun 5:30pm · " prefix. An event with no prefix shows its glyph (the
  Christmas tree for `glyph: "christmas-tree"` or `tree` / `tree.fill`, else a
  calendar). "No ..." rows keep the amber Not meeting style. All of it is
  fetched in the browser only, so publishing This Week, or a calendar change
  (the CMS computes the event rows on each request), shows without a rebuild;
  a layout save does not need to mark the site stale. The pre-rendered HTML
  holds a placeholder card. The card shows the first four events (a "No ..."
  notice always shows) and, when more are left, a footer "See all N this week"
  to `/this-week`. On desktop the link rows are a 2x2 grid of compact tiles; on
  phones they are rows. Each event row can carry a tag, worked out in the
  browser from church time (America/New_York), so the pre-rendered HTML has
  none, and re-read every minute while the page is visible (`eventStatus`,
  `useChurchNow` in `src/thisWeek.jsx`). It uses the row's `startDate`,
  `startTime`, `endDate` and `endTime` from the CMS (HH:MM, church time), and
  only if `startDate` is missing falls back to the date on the event link and
  the time in the title. No tag for a "No ..." notice, a multi-day event
  (`endDate`) or a row with no `startTime`. Today: "Happening now" between
  start and end; "Today" if it started and has no end time; otherwise "This
  morning" (before 12:00), "This afternoon" (12:00-16:59) or "Tonight" (17:00
  on). Tomorrow, by the event's start: "Tomorrow morning", "Tomorrow
  afternoon" or "Tomorrow night". Later days have no tag. A row whose last day
  is before today, or that ended earlier today, is hidden. On a phone the tag
  sits on its own line under the title, so a change of tag never changes how
  the title wraps. `?previewNow=YYYY-MM-DDTHH:MM` sets church time, for QA and
  screenshots only.
  Time tiles show the time only, no am/pm. Desktop puts the section heading to
  the left of the card (at most 640px wide), with the app block under it
  (store badges from the existing App Band, and a QR code to `/download`, the
  page that sends a phone to the right store; `public/assets/app-download-qr.svg`
  is a static file, regenerate it if that URL changes); below 1024px the
  heading sits above the card and the app block is hidden, and on phones the
  card is full width with 16px gutters. Shared helpers are in
  `src/thisWeek.jsx`. `?previewThisWeek=empty` shows the empty state.
- The homepage hero checks `/api/public/live` in the browser once a minute
  (`src/liveStream.jsx`). While a Transmit broadcast is live on YouTube (never
  a private test) it shows the YouTube player beside the headline and an "Open
  on YouTube" button; otherwise it is the normal hero. Nothing about it is
  baked in at build time, and a failed check counts as not live. Add
  `?previewLive=1` (placeholder player) or `?previewLive=<YouTube video id>`
  to preview it, and `?previewLive=off` to clear it.
- Sermon pages (`/sermons/<branch>/...`) and the CMS hosts (`media.`,
  `dashboard.`, `calendar.`, `analytics.hopejc.org`) are proxied to the Worker
  by `vercel.json` rewrites, so they are never stale.
- `VITE_CMS_ORIGIN` overrides `https://media.hopejc.org` for local testing
  (This Week included).
- Add `?previewBanner` to see the announcement outside its window, or
  `?previewSignup=closed` for the Discover Hope "coming soon" state.
- `src/components/ServiceTimesModal.jsx` is a one-off popup announcing the
  new Sunday service times (8:00, 9:30 and 11:15am). It stops showing at
  2:00pm Eastern on Nov 1, 2026. `?previewServiceTimes` shows it any time.
  Safe to delete with its line in `src/routes.jsx`.

### What triggers a rebuild

When staff change an event or the announcement in the CMS, it sets
`app_settings.site_stale_at` in its database. The Worker's cron (every minute)
checks it: once edits have been quiet for 90 seconds, and the last build was at
least 5 minutes ago, it POSTs the Vercel deploy hook (Worker secret
`VERCEL_DEPLOY_HOOK`), records `site_build_at` and clears the mark. A failed
hook leaves the mark so the next tick retries. There is also one rebuild at
about 3 a.m. Eastern when nothing else has built in 20 hours, so pages that
depend on today's date stay current. Editing the CMS database with SQL does not
set `site_stale_at`; see DEPLOY.md.

## Visit page: Connect Card

`/visit` embeds the Planning Center form 341611 in an iframe (`VisitPage` in
`components/pages.jsx`):
`https://hopejc.churchcenter.com/people/forms/341611?open_in_church_center_modal=false`.
`/connect` (`ConnectCardPage` in `components/getinvolved.jsx`) embeds the same
form on its own. Both hard-code the URL in a `formUrl` constant. Submissions go
to Planning Center, not to this site. Other forms (kids and students serve,
worship sign-up, giving) are also Church Center iframes or links.

## Other embeds

Sermon library and most ministry calendars are Subsplash embeds
(`components/embeds.jsx`); the Events page and parts of the Sermons page use
`HopeCalendarEmbed` and `HopeCmsEmbed`, iframes of the CMS at
`media.hopejc.org`. Giving is the Church Center giving page in an iframe.
The Contact form opens the visitor's email client (`mailto:info@hopejc.org`).

## Motion

Calm and quick, nothing decorative: interactions take 180-260 ms, reveals about
520 ms, all on one curve. Only transform and opacity move (plus colour and
shadow on hover); there is no looping or auto-playing motion, parallax or
layout animation. Tokens are in `public/assets/colors_and_type.css`:
`--motion-ease`, `--motion-fast`, `--motion-base`, `--motion-reveal`,
`--motion-stagger`, `--motion-rise`. The rules are in `public/assets/motion.css`,
loaded last in `index.html`, so it overrides earlier hover rules without editing
them.

- **Scroll reveals** (`src/motion.js`, started from `Layout` in `routes.jsx`):
  section headers and cards (the `CARDS` list in that file), or a section's
  first container if it has none, fade up 14px once as they scroll in, with
  50 ms steps within a group. Below-the-fold images fade in as they load.
  Nothing on screen when the page loads is ever hidden, and the pre-rendered
  HTML and a no-JS page show everything: the hidden state is a `data-rv="pre"`
  attribute that only JS sets, and it is removed once the element has settled
  so its own hover transitions come back.
- **Opt out**: put `data-no-reveal` on an element or any ancestor. A new card
  type is added to `CARDS` in `src/motion.js`.
- **This Week card**: eases in when seen (`watchInView`, attribute `data-tw`),
  its rows rise in a stagger by their `--i` index, the tag pill pulses once.
- **Hero**: a 100 ms fade-up stagger, 860 ms in all. **Page change**: the main
  content fades in after a client-side navigation (`main[data-pt]`), never on
  the first load. Buttons, nav underline, dropdown and mobile menu share the
  same feel.
- **Reduced motion**: under `prefers-reduced-motion: reduce` the script does
  nothing and the CSS turns off every animation, transition and transform
  (content stays fully visible). Print shows everything too.
- The header's shrink on scroll (`height` in `redesign-header-hero.css`) was
  there before and is the one layout transition left.

## Theme

Light or dark, in this order: `?theme=` URL parameter, saved preference, OS
setting, local clock (dark 7 p.m. to 7 a.m.). An inline script in `index.html`
applies it before first paint.

## Other folders

- `public/admin` and `tina/`: generated TinaCMS files. Not used by the site's
  current editing flow; the CMS above is the source for dynamic content.
- `scripts/binary-assets/`: a base64 copy of one image.
- `vercel.json`: clean URLs, the Worker rewrites and redirects described above,
  the apex-to-www redirect, and the `apple-app-site-association` content type.
