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

- **Address:** V06-G-02, Signature 2, Lingkaran SV, Sunway Velocity, 55100 Kuala Lumpur
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
| `OPEN-ITEMS.md` | Work blocked on the client, an asset or an access grant — read before proposing any of it as new |

**Note:** `proposed-site-architecture.md` ends with a "Wix implementation constraint"
about flat slugs and CMS dynamic pages. That constraint does not apply here — Next.js
gives nested routes for free. Build the nested paths as written in the URL map.

## Non-negotiables

These are the reason the project exists. Don't simplify them away.

- **One page, one intent.** No two pages target the same query. The homepage *is* the
  Cheras page — do not build `/areas/cheras`.
- **Never write "treat" or "treatment" in published copy.** Client instruction, 2026-08-01.
  Say **"help with"**, **"care"**, **"care for"**, or name the thing actually done
  (*assess*, *adjust*, *rehab*, *manage*). This covers everything a patient or a regulator
  sees: body copy, headings, `h1`, card titles, link text, button labels, alt text, FAQ
  questions and answers, `<title>` and meta descriptions. There is no "just this once" — if
  a line genuinely cannot be written without the word, **stop and ask the client**, don't
  ship it and flag it afterwards.

  Two carve-outs, both deliberate:

  1. **Disclaimers keep the word.** Lines that say what chiropractic does *not* do —
     "Chiropractic does not treat migraine", "we will refer you rather than treat you here",
     "knowing when it is not ours to treat" — reduce exposure rather than create it, and
     "does not help with migraine" is vaguer and less protective. Confirmed with the client.
  2. **`targetKeyword` fields keep the word.** They are internal tracking, never rendered.
     The clinic still ranks for "back pain treatment kl"; it just doesn't say it. Confirmed
     with the client: *"We can rank on SEO with the word treatment, just can't show
     treatment word in our page content."*

  Search `treat` — not `treatment` — before shipping copy. It catches *treated*, *treating*
  and *treats*, which is how the first sweep missed several.
- **JSON-LD on every template**, per the schema table in `proposed-site-architecture.md`.
- **Core Web Vitals pass.** Static render by default. `next/image` for every image, always
  with width/height. No client component unless it genuinely needs interactivity.
- **Real metadata per route** — unique `title` and `description` via the `metadata` export.
  No inherited defaults on a money page.
- **301 redirects** for every old URL in the redirect table, in `next.config.ts`. Losing
  the existing link equity would undo the whole exercise.
- **Alt text with local modifiers** on clinic imagery.
- Accessibility basics: semantic headings (one `h1`), labelled controls, visible focus.

## Copy voice — sound human, not AI

Apply this pass to every piece of published copy (body text, headings, FAQ, meta
descriptions, blog posts) before shipping it. It's a checklist, not a vibe — run through
each letter:

- **R — Repetition.** Don't restate the same point three different ways or reflexively
  list things in threes. Cut the redundant restatement.
- **E — Em dash.** A reliable AI tell when used as connective tissue everywhere a period,
  comma, or nothing would do. Strip it out.
- **A — Amplified language.** No "game-changing," "unlock," "revolutionize," "seamless,"
  "crucial," "elevate," or similar hype words a person writing plainly about their own
  clinic wouldn't reach for.
- **C — Contrast.** Avoid "it's not just X, it's Y" and "not only... but also"
  constructions. Say the plain thing directly.
- **T — Trust your gut.** Re-read once more after the first four checks. If it still
  reads as AI-written but doesn't fit a category above, fix it anyway.

Since the audience is Malaysian, light local flavor (Malaysian English cadence, the
occasional lah/word choice) is welcome but should stay subtle — around 10% of the piece,
not a costume. Never let it collide with the "no treat/treatment" rule above.

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
