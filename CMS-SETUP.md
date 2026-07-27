# Hope Church CMS (TinaCMS) — Setup & Usage

This site now has a content editor (CMS) powered by **TinaCMS**. Your content
lives as files in this GitHub repo, you edit it through a web login, and every
save commits to GitHub and triggers a Vercel redeploy — no code required.

- **Where you edit:** `https://hopejc.org/admin` (and we can point
  `admin.hopejc.org` at it — see step 5).
- **Login:** your own email + password, managed by TinaCloud (free tier).
- **What's editable so far (Phase 1):** Sunday **Service Times** (times,
  livestreamed service, worship run-through, kids-class notes). More content is
  being added in later phases (events, homepage/ministry copy, images).

---

## One-time setup (≈15 minutes — this part is yours; I can't create accounts)

### 1. Create a TinaCloud account + project
1. Go to **https://app.tina.io** and sign up (you can use your `hopejc.org`
   email — this becomes your CMS login).
2. Click **Create Project → “I have an existing Tina project”** (this repo
   already has the `tina/` config).
3. Connect **GitHub** and select the **`hope-church-website`** repository.
4. Set the project branch to **`main`**.

### 2. Copy your two keys
From the TinaCloud project **Overview / Settings**, copy:
- **Client ID** (public)
- **Token** → create a **Read Only** token

### 3. Add the keys to Vercel
In **Vercel → your project → Settings → Environment Variables**, add (for
Production **and** Preview):

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | your Client ID |
| `TINA_TOKEN` | your Read-Only Token |

> These names are also documented in `.env.example`. For editing on your own
> computer, copy `.env.example` to `.env` and paste the same values.

### 4. Go live
Merge the `add-tinacms-cms` branch into `main` (or I can open the PR for you).
Vercel will build with the CMS included and publish `https://hopejc.org/admin`.

> ⚠️ **Order matters:** set the Vercel env vars (step 3) **before** merging, or
> the deploy build will fail. Until you merge, your live `main` site keeps
> deploying exactly as it does today.

### 5. (Optional) Use `admin.hopejc.org`
The editor lives at `hopejc.org/admin` by default. To get the branded
subdomain you asked for, the simplest path is a **redirect**:
1. In **Vercel → Settings → Domains**, add `admin.hopejc.org`.
2. Vercel shows a DNS record to add at your domain registrar (a `CNAME` for
   `admin` → `cname.vercel-dns.com`, or the exact value Vercel gives you).
3. Configure `admin.hopejc.org` to **redirect to** `https://hopejc.org/admin`.

I can wire the redirect config in the repo once the domain is added — just say
the word.

---

## How you'll edit content
1. Go to `hopejc.org/admin` and log in with your email/password.
2. Pick a collection (e.g. **Service Times**), change fields, click **Save**.
3. Tina commits the change to GitHub; Vercel redeploys automatically
   (~1–2 minutes) and the change is live.

Because content is committed to git, **every change is versioned and
revertable** — nothing is ever lost.

---

## For developers
- Content files: `content/**` (e.g. `content/settings/service-times.json`).
- Schema / collections: `tina/config.ts`.
- Local editing: `npm run dev` (runs Tina + Vite together at `/admin`).
- Site-only build (no CMS creds needed): `npm run build:site`.
- Full build (used by Vercel): `npm run build` (`tinacms build` + site build).
- The site reads content by importing the JSON directly, so the CMS layer adds
  no runtime dependency — if Tina were ever removed, the site still builds.
