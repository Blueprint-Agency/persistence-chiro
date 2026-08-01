# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: someone in pain, deciding today.** A person in Cheras / Maluri / Sunway
Velocity with back, neck, disc or nerve pain right now. They are on a phone, they searched
"chiropractor near me" or "chiro cheras", and they are comparing two or three clinics with
the intent to book within the hour — not to research chiropractic as a subject.

What this implies for every page: the visitor arrives mid-decision, not at the top of a
funnel. They need to establish quickly that this clinic is real, close, open, credentialled
and bookable. Depth and education still matter — but as reassurance that closes the
decision, not as a first course.

Secondary audiences exist (cautious first-timers, desk workers and athletes with recurring
strain, existing patients checking hours) and the site serves them, but no page is designed
around them at the expense of the primary visitor.

## Product Purpose

The website for Persistence Chiropractic Care — a single-location Gonstead chiropractic and
physiotherapy clinic in Sunway Velocity, Kuala Lumpur.

The site exists to win local search and convert the resulting visit into a booking. It is a
rebuild of an existing Wix site whose organic traffic decayed roughly 90% since mid-2024
(~300/mo → ~24/mo). Success is measured externally, not aesthetically:

- "chiropractor near me" (MY): position 23 → top 10
- "chiro cheras" / "chiropractor cheras": → top 3 organic plus local-pack entry
- Organic traffic: 24/mo → 400+/mo within 90 days
- Booking clicks (SweetPew) and WhatsApp conversations started

Full keyword and competitive detail lives in `seo-strategy.md`; the URL map, redirect table
and per-template schema live in `proposed-site-architecture.md`. Those two files are
product inputs, not background reading.

## Positioning

Three claims a neighbouring Cheras clinic could not truthfully copy, in priority order:

1. **Gonstead specialism.** A documented six-step method — history taking, visualisation,
   nervoscope instrumentation, palpation, X-ray analysis, then hands-only adjustment. No
   drop tables, no activators. The steps are real clinical process the clinic stands behind
   and are recorded verbatim-adjacent in `lib/gonstead.ts`.
2. **Thoroughness before contact.** Full assessment and X-ray analysis happen before anyone
   touches a spine. The clinic is positioned against the "crack and go" experience —
   precision about *where* the problem sits is the point of the method.
3. **Chiropractic and physiotherapy under one roof.** Adjustment plus rehabilitation — dry
   needling, sports injury rehabilitation, posture correction — so a patient is not sent
   elsewhere for the rehab half of their care.

Deliberately **not** positioning: the all-female practitioner team. It is a true fact about
the clinic and may appear as such, but it is not a claim the site leads with.

## Operating Context

- **Single clinic, no service area beyond it.** V06-G-02, Signature 2, Lingkaran SV, Sunway
  Velocity, 55100 Kuala Lumpur. Geo 3.129237, 101.721961.
- **Open seven days:** Mon–Thu & Sat 10:00–20:00 · Fri 10:00–17:00 · Sun 10:00–15:00.
- **Booking is external.** SweetPew handles scheduling; the site links out and holds no
  booking logic. WhatsApp (018-2014088) is the secondary conversion path and in practice
  often the faster one for an acute-pain visitor.
- **Local pack is the real battlefield.** Positions 1–3 of every Cheras SERP are the map
  pack, won off-site through Google Business Profile, review volume and citation
  consistency. The site's job is relevance and conversion; NAP consistency is the site's
  contribution to the off-site half.
- **Three practitioners:** Dr. Valerie Na (director, principal chiropractor), Dr. Kee Shan
  Lim, Dr. Rynn Hoh. All hold ACM and/or MOH T&CM registration and Gonstead Chiropractic
  Society Australia membership.

## Capabilities and Constraints

**Confirmed functionality**

- Static Next.js App Router site. No database, no auth, no API routes, nothing server-side.
- Content lives in the repo as TS data modules and MDX, not a CMS.
- Templates in place: homepage, services (5), conditions, blog, about + per-practitioner,
  what-to-expect, book-now, press, partner-with-us.
- JSON-LD on every template per the schema table in `proposed-site-architecture.md`.
- 301 redirects for every legacy Wix URL live in `next.config.ts`. Link equity is the
  single most losable asset in this migration.

**Hard constraints**

- **No medical outcome promises.** No page may claim chiropractic cures, fixes or
  guarantees the resolution of any condition. Describe the concern and the method; suggest a
  visit. This is enforced mechanically by `lib/content.test.ts`, not left to judgment.
- **One page, one intent.** No two pages target the same query. The homepage *is* the
  Cheras page — `/areas/cheras` must not exist. Cannibalisation is the failure mode the
  architecture exists to prevent.
- **NAP is byte-identical everywhere** — site, JSON-LD, and every external citation. Single
  source of truth is `lib/clinic.ts`; never retyped into a component.
- **Core Web Vitals must pass.** Static render by default, `next/image` with explicit
  width/height for every image, no client component without genuine interactivity.
- Unique `title` and `description` per route. No inherited defaults on a money page.
- `assets/` holds ~120MB of raw Wix originals — gitignored, never deployed. Only optimised
  derivatives in `public/` are committed.

**Terminology**

Gonstead · subluxation · adjustment (not "crack") · nervoscope · palpation · dry needling ·
sports injury rehabilitation · posture correction. "Chiro" is acceptable in headings and
titles because it is how the market searches.

**Open decisions**

- Blog cadence and whether the content engine in `seo-strategy.md` Phase 4 runs. Sixteen
  migrated posts exist; ongoing publishing is not yet committed.
- Location pages beyond the homepage (KL, Kepong, Bangsar) are deliberately not built, and
  will only be reconsidered if genuinely serviceable — no doorway pages.
- Pricing is not published anywhere on the site. Whether it should be is undecided.

## Brand Commitments

- Name is **Persistence Chiropractic Care**, byte-exact.
- Brand colours carried from the existing site: gold `#E8C111`, slate blue `#2B5672`, greys
  `#212121` / `#414141`. Headings in Montserrat.
- Voice is plain, measured and non-hyped. The clinic describes what it does and declines to
  promise what it delivers — the claim rule above is as much a voice constraint as a legal
  one.
- Socials: Instagram `@persistencechiromy`, Facebook
  `Persistence-Chiropractic-Care-107415958154457`.

## Evidence on Hand

**Real, usable**

- Founder biography for Dr. Valerie Na, verbatim from the live site (`lib/clinic.ts`).
- The Gonstead six-step method, extracted from the live Wix service page.
- Sixteen migrated blog posts in `content/blog/`, including patient-journey and event
  content.
- Practitioner photographs in `public/img/`.
- Press coverage (`/press`) and partner content.

**Missing — must not be fabricated**

- **Google reviews are placeholder.** `lib/sample-reviews.ts` contains invented reviews
  rendered behind `USE_SAMPLE_REVIEWS` purely for design preview. `googleReviews.verified`
  in `lib/clinic.ts` is `false` and gates the real rating badge. A human must read the live
  Business Profile and fill in the true rating and count before launch. No number ships
  unverified.
- **Practitioner registration numbers are unverified.** Two extractions of the live about
  page disagreed on which chiropractor holds which number. `registrationsVerified` is
  `false` and withholds them. Mis-assigning a healthcare registration number is not an
  acceptable error — confirm against the ACM and MOH T&CM registers first.
- **Dr. Kee Shan Lim and Dr. Rynn Hoh have no biography or credentials** anywhere — not on
  the live site, not in this repo. Their pages exist and are reachable but carry
  `robots: noindex` and stay out of the sitemap until the clinic supplies real text. Do not
  invent education, experience or specialism for a registered healthcare practitioner.
- No patient testimonials, case studies, outcome data or pricing exist. Do not write them.

## Product Principles

1. **Search intent is the unit of design.** Every page owns exactly one query and earns its
   existence by ranking for it. A page that duplicates another's intent is a liability, not
   extra content.
2. **Describe the method, never promise the outcome.** This is the clinic's voice, its legal
   posture and its actual differentiator all at once. Hedged, specific language reads more
   credible than confident claims in this market anyway.
3. **The visitor is mid-decision, on a phone, in pain.** Distance, hours, credibility and a
   working booking link outrank everything. Anything that delays those is cost.
4. **Unverified is unpublished.** Ratings, registration numbers, bios and credentials ship
   only when a human has confirmed them. The gates in `lib/clinic.ts` are the mechanism, not
   a suggestion.
5. **Nothing exists that a server would need.** Static by default, content in the repo. If
   the clinic ever needs to self-edit, that is a real decision to revisit — not something to
   pre-build for.

## Accessibility & Inclusion

- Semantic heading structure with exactly one `h1` per page, labelled controls, visible
  focus states.
- Alt text on clinic imagery carries local modifiers and describes what is actually in the
  frame — never the service being sold.
- Mobile-first is a hard requirement, not a breakpoint afterthought: the primary visitor is
  on a phone.
- **Language:** the site is English-only and stays that way through launch. Chinese-language
  pages are a planned post-launch phase once English content is complete, so structure and
  content should not be written in a way that makes translation impossible — but no i18n
  tooling is to be built ahead of that decision.
