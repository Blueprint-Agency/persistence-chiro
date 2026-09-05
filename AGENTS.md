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

  **The same rule applies in Chinese and Malay, with the same two carve-outs**, once that
  copy is written (see Multilingual below):

  - **Chinese:** avoid 治疗/治療 (and 治/療 as a verb) for what the clinic does to a
    patient — use 帮助/护理/调理-style phrasing instead. "物理治疗" (physiotherapy) as the
    *name of the discipline* is fine, the same way English "physiotherapy" is fine despite
    containing no banned word by coincidence — the rule targets the verb, not a profession's
    own name.
  - **Malay:** avoid "rawatan"/"merawat" — use "bantu"/"jagaan" or name the action
    (menilai, melaras, pemulihan) instead.

  Neither list is client-confirmed yet the way the English rule is — treat it as a strong
  draft, not a substitute for asking the client once real zh/ms copy is ready to ship.
- **JSON-LD on every template**, per the schema table in `proposed-site-architecture.md`.
- **Core Web Vitals pass.** Static render by default. `next/image` for every image, always
  with width/height. No client component unless it genuinely needs interactivity.
- **Real metadata per route** — unique `title` and `description` via the `metadata` export.
  No inherited defaults on a money page.
- **301 redirects** for every old URL in the redirect table, in `next.config.ts`. Losing
  the existing link equity would undo the whole exercise.
- **Alt text with local modifiers** on clinic imagery.
- Accessibility basics: semantic headings (one `h1`), labelled controls, visible focus.

## Multilingual (English default, Chinese, Bahasa Malaysia)

The site targets local SEO/GEO/AEO in three languages: English (default, unprefixed —
`/conditions/back-pain`), Chinese (`/zh/...`), Bahasa Malaysia (`/ms/...`). This is **not**
translation — each locale targets keywords with real, distinct search demand (confirmed via
Ubersuggest, Malaysia locId 2458), which sometimes means a completely different keyword
angle per language on the same page (e.g. Malay physiotherapy pages target symptom terms
like "sakit belakang" rather than a literal "kiropraktor" translation, which measures ~0
volume).

- **Routing:** every route, including the blog, lives under `app/[locale]/...` — even blog
  (English-only, gated with `if (locale !== 'en') notFound()`), because Next allows only one
  root layout per route subtree and `app/[locale]/layout.tsx` is that root layout. `proxy.ts`
  rewrites any unprefixed request to `/en/...` internally via `NextResponse.rewrite` so
  English stays invisible in the URL bar; a direct hit on `/en/*` 308s back to the unprefixed
  path. `lib/i18n.ts` is the single source of truth for the locale list (`LOCALES`, `Locale`,
  `LOCALE_TAG`, `pathFor`).
- **Never call `headers()`, `cookies()`, or any other Dynamic API in `app/[locale]/layout.tsx`
  or anything it always renders (Header/Footer).** It opts the *entire site* out of static
  generation — this actually happened once (a `headers()` call to build a per-page language
  switcher) and was reverted specifically to keep "Static render by default" intact. The
  language switcher (`components/LocaleSwitcher.tsx`) links to each locale's homepage for
  exactly this reason, not the exact equivalent of the current page.
- **Content model:** English data files (`lib/conditions.ts`, `lib/services.ts`, ...) are
  untouched and stay the source of truth; each has `zh`/`ms` sibling files
  (`lib/conditions.zh.ts`, `.ms.ts`, etc.) of the *same* type, keyed by the *same* `slug`.
  Locale dispatch helpers live on the English file (`conditionsFor(locale)`,
  `publishedConditionsFor(locale)`, `conditionBySlugFor(locale, slug)`, and the `services.ts`
  equivalents). A locale's `draft: true` (or an absent slug) means "not live in *this*
  locale" — the same gate English already uses, just per-locale now. Practitioner bios are
  the one exception: `lib/clinic.ts` keeps the roster (name/role/credentials — facts, never
  translated) and reads locale-specific prose via `bioFor(locale, slug)` /
  `hasBioFor(locale, slug)`, backed by `lib/practitioner-bios.zh.ts` / `.ms.ts`.
- **Slugs stay byte-identical across locales** (`/zh/conditions/back-pain`, never a
  transliterated slug) — a deliberate phase-1 simplification, not a permanent rule. Revisit
  only with real evidence a localized slug would outperform it.
- **`pageMetadata()` (`lib/seo.ts`) now requires `locale` and `availableIn`.** `availableIn`
  lists every locale this exact page exists in — compute it with
  `LOCALES.filter((l) => pathExistsIn(l, path))` from `lib/locale-availability.ts`, never by
  hand, or hreflang tags will point at a URL that 404s. The same `pathExistsIn` check gates
  the language switcher, so the two can never disagree about what's live.
- **One-off pages with no locale-dispatched content yet** (home, about hub, book-now, press,
  partner-with-us, what-to-expect, the hand-built `/services/chiropractic-care`) gate with a
  plain `if (locale !== 'en') notFound()` at the top of the route. Loosen that gate only once
  real, reviewed copy exists for that locale — never ship a thin or duplicate page to prove
  the plumbing works.
- **UI chrome** (nav labels, footer, buttons, breadcrumb names) comes from
  `dictionaries/{en,zh,ms}.ts` via `getDictionary(locale)` (`lib/dictionaries.ts`) — thread
  the dictionary value into existing component props rather than hardcoding a string. The
  zh/ms dictionaries are a first-pass draft, not client-reviewed; treat them like an
  unreviewed `Service`/`Condition` record.
- **Place names stay in English/Latin script in every locale — "Cheras", "Maluri", "Kuala
  Lumpur", never 增江/马鲁里/吉隆坡.** Confirmed with the user, 2026-08-28. Same NAP-consistency
  reasoning as the byte-identical address rule at the top of this file: a transliterated
  Chinese place name doesn't match what the Google Business Profile, Maps, or an actual
  searcher uses. Malaysian Chinese sites commonly mix English place names into Chinese
  sentences this way ("位于 Cheras 的诊所") — it reads as normal, not as an error. Malay
  copy already does this naturally; Chinese needs the reminder.
- **物理治疗 (physiotherapy) / 治疗师 (therapist) / 徒手治疗 (manual therapy) are confirmed
  correct terms, not a wording to avoid.** Confirmed with the user, 2026-08-28. These are the
  approved profession/technique-name compounds `content.test.ts`'s banned-word sweep
  whitelists — see `lib/services.zh.ts`.
- Full rationale, the keyword-research findings behind the BM/ZH targeting decisions, and the
  page-by-page rollout order live in the multilingual plan (ask the user for the current doc
  if it's not obviously nearby — it isn't committed to the repo).

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
