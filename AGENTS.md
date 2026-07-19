<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Persistence Chiropractic — Next.js revamp

Rebuild of https://www.persistencechiropractic.com/ (currently Wix) as a static Next.js
site. The whole point of this project is **local SEO** — every build decision serves the
targets in `seo-strategy.md`. If a change doesn't help rank for "chiropractor near me" /
"chiro cheras" or convert a visitor into a booking, it probably shouldn't exist.

## The client

Persistence Chiropractic Care — single clinic, Gonstead-technique chiropractic +
physiotherapy.

- **Address:** VO6-G-02, Signature 2, Lingkaran SV, Sunway Velocity, 55100 Kuala Lumpur
- **Geo:** 3.129237, 101.721961 (Maluri / Cheras)
- **Phone / WhatsApp:** 018-2014088 · `wa.link/b0541h`
- **Email:** info@persistencechiropractic.com
- **Hours:** Mon–Thu & Sat 10:00–20:00 · Fri 10:00–17:00 · Sun 10:00–15:00
- **Practitioners:** Dr. Valerie Na (founder/director), Dr. Kee Shan, Dr. Rynn Hoh
- **Socials:** IG `@persistencechiromy` · FB `Persistence-Chiropractic-Care-107415958154457`

NAP (name/address/phone) must be byte-identical everywhere it appears — site, schema,
and every external citation. Inconsistent NAP costs local-pack ranking. Single source of
truth lives in one module; never retype it into a component.

## Booking

Booking is **external** — SweetPew: `https://www.sweetpew.com/en/my/persistence-chiropratic-care`
(their slug has a typo; it's correct as written). WhatsApp is the secondary conversion
path. There is no booking logic in this codebase and there shouldn't be — CTAs are links.

## Reference docs (read before planning work)

| File | What it holds |
|---|---|
| `seo-strategy.md` | Keyword targets, competitor gap, 5-phase plan, 90-day KPIs |
| `proposed-site-architecture.md` | Target URL map, redirects, internal linking, schema per template |
| `current-url-structure.md` | What exists on Wix today — the migration source |

**Note:** `proposed-site-architecture.md` ends with a "Wix implementation constraint"
about flat slugs and CMS dynamic pages. That constraint does not apply here — Next.js
gives nested routes for free. Build the nested paths as written in the URL map.

## Non-negotiables

These are the reason the project exists. Don't simplify them away.

- **One page, one intent.** No two pages target the same query. The homepage *is* the
  Cheras page — do not build `/areas/cheras`.
- **JSON-LD on every template**, per the schema table in `proposed-site-architecture.md`.
- **Core Web Vitals pass.** Static render by default. `next/image` for every image, always
  with width/height. No client component unless it genuinely needs interactivity.
- **Real metadata per route** — unique `title` and `description` via the `metadata` export.
  No inherited defaults on a money page.
- **301 redirects** for every old URL in the redirect table, in `next.config.ts`. Losing
  the existing link equity would undo the whole exercise.
- **Alt text with local modifiers** on clinic imagery.
- Accessibility basics: semantic headings (one `h1`), labelled controls, visible focus.

## Conventions

- App Router, TypeScript, Tailwind v4, no `src/` dir, `@/*` import alias.
- Static by default. No database, no auth, no API routes — nothing here needs a server.
- Content lives in the repo (MDX/TS data), not a CMS. If the clinic ever needs to
  self-edit, that's a real decision to revisit — not something to pre-build for.
- Brand colours from the existing site: gold `#E8C111`, slate blue `#2B5672`,
  greys `#212121` / `#414141`. Headings Montserrat.
- `assets/` is 120MB of raw Wix image originals — **gitignored, not deployed**. Optimise
  what you actually use into `public/` and commit only that.

## Commands

```
npm run dev      # dev server
npm run build    # production build — must pass before any commit
npm run lint
```
