---
name: persistence-content-builder
description: "Guided workflow for building new page and blog content directly into the Persistence Chiropractic Next.js repo. Use whenever someone asks to create or improve a blog post, condition page, service page, or other page for persistencechiropractic.com / this repo, or mentions SEO content, page copy, content briefs, or a landing page outline. Walks through a structured requirements interview (client is always Persistence Chiropractic), benchmarks competitors, gets outline approval, then builds the content as real routes/MDX/data in this repo following its conventions, and verifies the build. No .docx output."
---

# Persistence Chiro Page & Content Builder

A guided workflow that gathers requirements, benchmarks competitors, gets outline
approval, then **builds the content straight into this Next.js repo** as real pages. No
Word document. The deliverable is committed source that passes `npm test`, `npm run lint`
and `npm run build`.

This is the Claude Code adaptation of a multi-client skill. The client here is **always
Persistence Chiropractic** — do not ask which client. Use Claude Code tools: `AskUserQuestion`
for the interview, `WebSearch` / `WebFetch` for competitors, and the normal file tools to
build. There is no `ask_user_input_v0`, no `web_fetch` allowlist workaround, and no
`/mnt/skills` docx step — ignore all of those from the original skill.

## Non-negotiables (read `AGENTS.md` and the memory files first)

These override anything in the generic workflow below. Breaking one fails review.

- **No medical outcome promises.** Never state or imply that chiropractic cures, fixes,
  resolves, or is guaranteed to help a condition. Suggesting a visit is fine; promising an
  outcome is not. Hedge every efficacy statement (`may`, `often`, `tends to`, `aims to`,
  `for most people`, `it depends`). This is a hard client rule and a build gate — see
  `lib/content.test.ts`. Migraine, scoliosis and any neurological/structural claim are
  especially sensitive; follow the honest-refusal style already in `lib/conditions.ts`
  ("No — and we would rather be plain about that").
- **No dashes of any kind in rendered copy** — no hyphens as punctuation, en dashes, or em
  dashes. Rewrite the sentence (comma, conjunction, or split) instead. Compound words like
  "drug-free" are fine.
- **No location pages.** The repo deliberately has none (single clinic; the homepage is the
  Cheras page). If asked for a location page, explain the decision in
  `proposed-site-architecture.md` and redirect to a blog post or condition angle instead.
- **One page, one intent.** No two pages may target the same primary keyword.
  `content.test.ts` enforces it. Check existing `targetKeyword` values before choosing one.
- **British / Malaysian spelling** (mobilisation, personalised, programme).
- **Real per-route metadata, JSON-LD, internal links, one h1** — the templates handle most
  schema automatically; do not hand-roll it.

## Where content lives in this repo

| Page type | Where it goes |
|---|---|
| **Blog post** | `content/blog/<slug>.mdx` (body prose) + an entry in `lib/posts.ts` + wire the import into `lib/post-content.ts`. `linksTo` one condition or service slug. `BlogPosting` schema is auto-emitted by `app/blog/[slug]/page.tsx`. |
| **Condition page** | A typed entry in `lib/conditions.ts` (8 already exist). Renders via `app/conditions/[slug]/page.tsx` with `MedicalWebPage` + `FAQPage` schema. |
| **Service page** | A typed entry in `lib/services.ts` (5 already exist). Renders via `app/services/[slug]/page.tsx`. |
| **Other page** | A new `app/<route>/page.tsx`, following an existing page as the template. |

Blog posts are the most common ask. Conditions and services are largely built already —
prefer *improving* an existing one over adding a near-duplicate.

---

## SEO / CRO / AEO / GEO framework

Established 2026-08-26 after auditing the Gonstead post (`content/blog/gonstead-technique.mdx`)
against a competitor's blog (`kl.mychiro.com.my`) and finding the site's own condition/service
pages already did most of this — blog was the one content type lagging behind its own site.
Apply every box below to a new blog post; retrofitting an old one is a separate, smaller ask,
not a blocker on shipping a new one.

**SEO**
- [ ] Real per-route `title`/`description` via `pageMetadata` (automatic from the `Post` entry).
- [ ] **FAQPage schema.** Author `keyTakeaways` and `faqs` as typed Q&A arrays on the `Post`
  entry in `lib/posts.ts` (same shape as `Condition.keyTakeaways`/`Condition.faqs`), render
  them in the MDX body with `<KeyTakeawayList slug="<post-slug>" />` and
  `<FaqList slug="<post-slug>" />` (see `mdx-components.tsx`) instead of freehand bold-paragraph
  prose. `app/blog/[slug]/page.tsx` emits `pageFaqSchema(post.keyTakeaways, post.faqs)`
  automatically whenever either array is non-empty — writing the structured data is the only
  step; the schema follows for free. Freehand prose Q&A renders fine but is invisible to
  anything reading JSON-LD, which is the gap this closes.
- [ ] One link per post to its `linksTo` target, plus 1–3 more internal links in prose
  (condition ↔ service ↔ another post) — see Step 7.

**CRO**
- [ ] `CtaBand` and the mobile `StickyCta` render automatically on every post — no action
  needed. (Earlier drafts of this skill said posts don't get a CTA band; that's no longer
  true as of 2026-08-26.)
- [ ] **Mid-article qualifier.** If the post's `linksTo` target (a condition or service) has
  `qualifierConcerns` defined, drop `<InlineQualifier slug="<target-slug>" />` into the MDX
  roughly 50–60% through the body — after the reader understands the topic, before the
  closing sections. It reuses the target's own concerns, so there is nothing new to author.
  Skip it if the target has no `qualifierConcerns` yet rather than inventing a one-off list.

**AEO** (answer-engine extraction)
- Answer-first: every H2 opens with the direct answer in the first sentence, then explains.
- Key Takeaways and FAQ are structured data (see SEO above), not prose — that's what makes
  them extractable rather than just readable.
- Modular H2s that read independently; primary keyword in H1, first paragraph, Key Takeaways,
  and 2–3 times naturally in the body.
- A comparison, a process, or a spec belongs in a **table** (GFM tables work — `remark-gfm` is
  configured) or a **structured step list** (see `GonsteadStepList` for the pattern: a
  component that reads real data, e.g. `lib/gonstead.ts`, rather than retyping it as prose) —
  not a wall of paragraphs.

**GEO** (what a generative engine cites)
- [ ] **Citations.** Populate `Post.citations` (`{ claim, source, url? }`, 2–4 typically) with
  verifiable facts attributed to a journal, historical record, or regulator — never a
  competitor, never an efficacy promise. Verify the source before citing it (fetch it, don't
  guess a title/author/year); `<References>` renders it automatically. This was the single
  biggest gap the mychiro.com.my audit found: their post named a reviewer and cited seven
  peer-reviewed sources, this site's blog cited none.
- [ ] **`lastReviewed`.** Leave unset unless a named practitioner has genuinely read the
  post's clinical content. Setting it without a real review is exactly the fabricated-review
  problem `registrationsVerified` (`lib/clinic.ts`) and `Condition.lastReviewed` exist to
  prevent — `<ReviewedBy>` and the `reviewedMedicalWebPage` schema both key off this one
  field, so an honest unset is a silent no-op, not a missing feature. Ask the client to
  review before setting it, same as the eight condition pages.

Any post that ships with `keyTakeaways`/`faqs` structured but no `citations` and no
`lastReviewed` has still closed the SEO and AEO gaps — those two are content-sourcing work
that depends on the clinic, not something to fabricate to complete the checklist.

---

## Workflow

Follow in order. Use `AskUserQuestion` for steps 1–3 and 6; free text for 4–5.

### Step 1: Page type
Ask via `AskUserQuestion`: **Blog post · Condition page · Service page · Other page.**
(Do not offer Location page — see non-negotiables.)

### Step 2: New or improve
Ask whether creating new or improving existing. If improving, **read the existing file/route
in the repo** (and `WebFetch` the live URL if it is already published) before proposing changes.

### Step 3: Intent (multi-select)
`AskUserQuestion` with `multiSelect: true`: **Informational · Comparison · Conversion · Branding.**

### Step 4: Primary keyword (free text)
Ask for the primary keyword(s). Then **check `lib/conditions.ts`, `lib/services.ts` and
`lib/posts.ts` for an existing page already targeting it** — if one exists, flag the
cannibalisation and propose improving that page or picking a distinct long-tail instead.

### Step 5: Competitor benchmarking (mandatory)
Never present an outline without it.
1. `WebSearch` the primary keyword(s). Prioritise Malaysia/KL results.
2. `WebFetch` the top 2–3 ranking pages.
3. For each: heading hierarchy (every H2), topics covered, depth/length, unique angles, CTAs.
4. Build a **gap analysis** — what they all miss that we can own.
5. Present a competitor deep-dive before the outline.
**Never cite or name a competitor in the final content.** Structural analysis only.

### Step 6: CTA (fixed for this client)
No client table. Persistence uses two conversion paths, both from `lib/clinic.ts`:
- **Booking:** `clinic.bookingUrl` (SweetPew).
- **WhatsApp:** `clinic.whatsappUrl` (wa.link) for static links, or a `wa.me` link with the
  clinic number for a prefilled message (see `components/PartnerEnquiry.tsx` for the pattern).
Every template (condition/service/other/**blog post**) gets a `<CtaBand>` and, on blog posts,
a mobile `<StickyCta>` too — both render automatically from `app/blog/[slug]/page.tsx`, no
authoring needed. A blog post also links once, with descriptive anchor text, to the condition
or service page named in its `linksTo`. See the SEO/CRO/AEO/GEO framework above for the
optional mid-article `<InlineQualifier>` — the strongest CRO lever available on a post.

### Step 7: Internal links (from this repo, not a sitemap)
Do **not** fetch an external sitemap. Read the repo's own content and pick 2–4 topically
relevant internal targets:
- Conditions: `lib/conditions.ts` (slugs → `/conditions/<slug>`)
- Services: `lib/services.ts` (slugs → `/services/<slug>`)
- Published posts: `lib/posts.ts` (`/blog/<slug>`)
- Static routes: `lib/routes.ts`
Weave them in as natural, descriptive anchor text. A blog post must link to its `linksTo`
target at minimum. Prefer linking a condition to the service that treats it and vice versa,
matching the `related` / `treatedBy` / `treats` conventions already in the data.

### Step 8: Outline for approval
Present, in order:
- **8a. Competitor deep-dive** — one row per competitor, in exactly this table shape:

  ```
  | Source | Words | Structure | Strengths | Weaknesses |
  |---|---|---|---|---|
  | <name (+ rank if known)> | ~N | key H2s / sections | ... | ... |
  ```

- **8b. Gap analysis table** — one row per content element, a column per competitor plus a
  final "Us" column, in exactly this shape. Use ✅ / ❌ / ⚠️ (partial). Every row justifies a
  section in the outline, and the "Us" column should surface at least one element every
  competitor misses that we can own:

  ```
  | Element | Comp A | Comp B | Comp C | Us |
  |---|---|---|---|---|
  | <content element> | ✅/❌/⚠️ | ... | ... | ✅ |
  ```
- **8c. Proposed outline** — title tag (<60 chars, primary keyword), meta description (<160),
  H1, answer-first intro, Key Takeaways (5 structured Q&A, `<KeyTakeawayList>`), 5–6 H2
  sections, FAQ (5 structured Q&A, `<FaqList>`), conclusion, and the list of internal links
  with their anchor text. Note where a mid-article `<InlineQualifier>` and any citations
  will go.
- **SEO summary table** — SEO Title · Meta Description · URL Slug (clean, lowercase, hyphen-separated) · Primary Keyword.
Get explicit approval before building.

### Step 9: Build it into the repo (no docx)
Write the content as real source following the table in "Where content lives", the
SEO/CRO/AEO/GEO framework above, the body-structure notes below, and every non-negotiable.
Then:

1. For a **blog post**: create `content/blog/<slug>.mdx`, add the `lib/posts.ts` entry
   (`slug`, `title`, `description`, `datePublished`, `author`, `linksTo`, `draft: false`,
   plus `keyTakeaways`/`faqs`/`citations`/`heroImage` per the framework above), and add the
   import + `postBodies` mapping in `lib/post-content.ts`. Keep the slug byte-stable if it
   maps to a legacy Wix URL. Reference the structured data from the MDX body with
   `<KeyTakeawayList slug="..." />` / `<FaqList slug="..." />`, not retyped prose.
2. For a **condition/service**: add the typed entry with all required fields (including
   `redFlags` for conditions, `faqs`, `related`/`treatedBy`/`treats`, unique `targetKeyword`).
3. **Verify before declaring done:** `npm test` (includes the promissory-claims guard, the
   no-duplicate-keyword check, and — for posts — the same guard over `keyTakeaways`/`faqs`/
   `citations`), `npm run lint`, `npm run build`. All must pass. If the claims guard trips,
   fix the copy, do not weaken the guard.
4. Do not commit or push unless asked; report what changed and the verification results.

**Body structure** (see the SEO/CRO/AEO/GEO framework above for the full checklist):
- Answer-first: every H2 opens with the direct answer in the first sentence, then explains.
- Key Takeaways (`<KeyTakeawayList>`) near the top, FAQ (`<FaqList>`) near the end — both
  5 items is a reasonable default, more is fine if the topic genuinely supports it.
- Modular H2s that read independently.
- Primary keyword in H1, first paragraph, Key Takeaways, and 2–3 times naturally in the body.

**Hero image:** `Post.heroImage` is optional. Prefer reusing an existing real clinic photo
(`public/img/*.webp`) over commissioning or sourcing new imagery. A licensed stock photo is
acceptable only with the user's explicit sign-off *for that specific image* — this site's
established convention is real clinic/practitioner photography only (see DESIGN.md's
anti-reference), so treat stock as the exception, credit the photographer in a code comment
next to the entry, and confirm the license explicitly (Unsplash License or equivalent, verify
by fetching the actual photo page — don't assume).

**Citations (2–4 typical, only verifiable facts):** see the GEO section of the framework
above — this now means populating `Post.citations`, not writing a References list into the
MDX prose.

**Tone:** blog posts are warm and conversational, plain English, explain any medical term in
brackets. Condition/service/other pages are confident, professional, still human — match the
existing house voice in `lib/conditions.ts`.

**Word count:** ~1,500–1,800 words for a published blog post; fact density over length.

---

## Quick reference
- Client: **Persistence Chiropractic** (single clinic, Cheras/Maluri, KL). NAP + CTAs: `lib/clinic.ts`.
- Booking: SweetPew (`clinic.bookingUrl`). WhatsApp: `clinic.whatsappUrl`.
- Blog target keywords still open (deferred cycle): tit tar, muscle knots, trigger points,
  slipped disc remedy, best chiropractors KL, office workers' back pain — see `kpi-keyword-map.md`.
- Hard gates live in `lib/content.test.ts`. Read `AGENTS.md` and the two memory files
  (no-medical-outcome-promises, persistence-chiro-content-plan) before writing.
