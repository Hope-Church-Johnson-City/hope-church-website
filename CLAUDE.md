# Hope Church website

Vite + React, pre-rendered to static pages by vite-react-ssg, hosted on Vercel
at www.hopejc.org. See README.md for the structure and DEPLOY.md for build and
deploy. Events, the announcement bar and Discover Hope come from the CMS
(`media.hopejc.org`) at build time; the Worker lives in the separate
hope-church-cms repo.

## Documentation

Any change to a page, a data source, the build or the deploy steps updates
README.md and DEPLOY.md (or docs/) in the same commit. If a page is added or
removed, update the page table in README.md too.

## State and a new Mac (2026-11-22)

- `main` is what Vercel builds and serves; a push to `main` deploys. The CMS also
  rebuilds the site through a Vercel deploy hook when events or the announcement
  change. Unmerged branches on GitHub: `service-times` and older experiments.
- `npm run build` rewrites `src/generated/*.json` from the live CMS. Those local
  changes are build output: leave them out of commits.
- No secret files are needed to build. Vercel holds its own settings. The repo is
  **public**, so never commit a key or a `.env`.
- Moving to a new Mac: `HANDOFF-NEW-MAC.md` in hope-church-automation.
