# Persistence Chiropractic — Site Architecture (Next.js rebuild)

*Supersedes `seo-strategy.md` §3 Phase 3. Sources: live-site audit 2026-07-19,
`current-url-structure.md` (Wix sitemap), Ubersuggest MY (locId 2458) re-pull 2026-07-19.*

## Business facts (from live-site audit)

| | |
|---|---|
| Legal name | Persistence Chiropractic Care |
| Address | VO6-G-02, Signature 2, Lingkaran SV, Sunway Velocity, 55100 Kuala Lumpur |
| Phone | 018-2014088 |
| Email | info@persistencechiropractic.com |
| Hours | Mon–Thu 10:00–20:00 · Fri 10:00–17:00 · Sat 10:00–20:00 · Sun 10:00–15:00 |
| Geo | 3.1292534, 101.7219458 |
| Booking | External — SweetPew (`sweetpew.com/en/my/persistence-chiropratic-care`) |
| Practitioners | Valerie Na (Director), Rynn Hoh, Kee Shan, Pristencia Chow |
| Socials | IG `persistencechiromy` · FB `Persistence-Chiropractic-Care-107415958154457` · wa.link/b0541h |

## URL map

```
/                                    Chiropractor in Cheras (Maluri), KL
│
├── /conditions                      hub
│   ├── /conditions/back-pain
│   ├── /conditions/slipped-disc
│   ├── /conditions/sciatica
│   ├── /conditions/scoliosis
│   ├── /conditions/neck-pain-posture
│   └── /conditions/sports-injury
│
├── /chiropractic                    Gonstead 6-step method
│
├── /physiotherapy                   hub
│   ├── /physiotherapy/dry-needling
│   ├── /physiotherapy/manual-therapy
│   ├── /physiotherapy/sports-rehab
│   └── /physiotherapy/rehab-programming
│
├── /blog
│   └── /blog/[slug]                 14 migrated + new
│
├── /what-to-expect
├── /about-us                        4 practitioners + partners
├── /press
└── /contact-us                      NAP, map, hours, SweetPew booking
```

**16 pages + 14 posts = 30 URLs** (from 26). Max two levels.

## Why conditions and modalities are split

Symptom-first ("back pain treatment KL") and modality-first ("dry needling kuala lumpur") are
different queries. Splitting them means every URL answers one question and no two pages compete.
`/chiropractic` gives the Gonstead 6-step content — already written on the live site — a real
home instead of stranding it on a hub.

Seven physio services collapse to four pages: "Therapeutic Modalities & Recovery Technologies"
and "Spinal & Core Stability Conditioning" fold into sports-rehab and rehab-programming;
"Biomechanical, Orthotics & Movement Analysis" into manual-therapy. Four substantial pages beat
seven thin near-duplicates.

## Decisions locked

| Decision | Rationale |
|---|---|
| **No location page** | Single clinic. Location pages exist to reach cities you have no premises in. `/` already ranks #16 for "chiro cheras" and holds most of the 40 referring domains — a second page competes with it from zero. `/contact-us` covers "where are you". |
| **No `/services/tit-tar`** | Clinic does not offer tit tar; the live site never mentions it. Captured instead by `/blog/tit-tar-vs-chiropractic`, which makes no service claim. |
| **`/press` flat, no `[slug]`** | One press feature exists. Cards link out to the publication — better for the backlink story than hosting a copy. |
| **No `/pricing`** | No pricing exists anywhere on the live site; nothing to publish. |
| **Booking stays on SweetPew** | Preserves staff workflow. Embedded on `/contact-us`, lazy-loaded so it doesn't cost LCP. |
| **MDX in repo, no CMS** | Agency edits content. Zero CMS cost, static export. |
| **Portable redirects** | `redirects.ts` consumed by `next.config.mjs` — not host-specific. |

## Redirects (301)

| Legacy | New |
|---|---|
| `/our-services` | `/conditions` |
| `/press-and-publications` | `/press` |
| `/going-places-magazine-september-feature` | `/press` |
| `/our-partners` | `/about-us#partners` |
| `/book-now` | `/contact-us` |
| `/landingpage` | `/` |
| `/post/[slug]` | `/blog/[slug]` — all 14, slug byte-identical |

301 every post — they hold the crawl history and whatever equity the 40 referring domains carry.

## Content migration

**Migrates as-is (already written):**

| Live content | New home |
|---|---|
| Gonstead 6-step approach | `/chiropractic` |
| Post-Treatment Care article | `/what-to-expect` |
| "Are X-Rays Really Necessary?" | `/what-to-expect` |
| FAQ blocks (home + services) | split per condition page, each with `FAQPage` schema |
| Valerie Na bio + Education | `/about-us` |
| 7 physiotherapy service descriptions | `/physiotherapy/*` |
| 43 partner logos | `/about-us#partners` |
| 2 testimonials | homepage + relevant condition pages |

**Must be written fresh:** six condition pages, four physio pages, bios for Rynn Hoh / Kee Shan
/ Pristencia Chow (currently names + registration numbers only).

## Page targeting

| URL | Primary target |
|---|---|
| `/` | chiro cheras, chiropractor cheras, chiropractor near me |
| `/conditions/back-pain` | back pain treatment KL |
| `/conditions/slipped-disc` | slipped disc treatment malaysia |
| `/conditions/sciatica` | sciatica treatment |
| `/conditions/scoliosis` | scoliosis treatment malaysia |
| `/conditions/neck-pain-posture` | neck pain, posture correction |
| `/conditions/sports-injury` | sports injury chiropractic |
| `/chiropractic` | gonstead chiropractic malaysia |
| `/physiotherapy` | physio cheras (260/mo, SD 19 — unclaimed by any chiro in the area) |
| `/physiotherapy/dry-needling` | dry needling kuala lumpur |
| `/contact-us` | chiropractor cheras contact, directions |

### Keyword caveats

**Ubersuggest cannot validate the clinical pages.** Its MY index returns zero volume for slipped
disc, sciatica, scoliosis treatment, frozen shoulder, chiropractic, physiotherapy, sakit
belakang — sparse-database artefact, not absent demand. Build on presenting complaints; confirm
with Google Keyword Planner + GSC once connected.

**Tit tar is not the cheap win `seo-strategy.md` claims.** That doc lists SD 9–12; the
2026-07-19 re-pull shows `tit tar` at **SD 31** and `tit tar near me` at **SD 29**, both
brand-dominated (Chris Leong Method, CLM, HKD). Blog post only; do not build a service page.

**Do NOT chase "urut."** `urut near me` (18,100/mo) and `urut` (9,900/mo) are the biggest numbers
in the dataset and the wrong target — relaxation-massage intent, with a tail heavily contaminated
by adult services (`urut b2b`, `urut lelaki near me`, `incall urut`). Brand and trust liability
for a registered clinic. Recorded so nobody reopens it.

## Internal linking

- Homepage → `/conditions` hub, `/chiropractic`, `/physiotherapy`.
- Condition page → up to `/conditions`, across to two related conditions, down to the modality
  that treats it, CTA to `/contact-us`.
- Physio modality → up to `/physiotherapy`, across to the conditions it treats.
- Every blog post → exactly one condition or modality page, descriptive anchor.
- Footer: NAP + `/contact-us` sitewide.

## Schema

| Template | JSON-LD |
|---|---|
| `/` | `Chiropractic` + `LocalBusiness` (NAP, geo, hours, `areaServed: Cheras`) |
| `/conditions/*` | `MedicalWebPage` + `FAQPage` |
| `/physiotherapy/*` | `MedicalProcedure` |
| `/blog/[slug]` | `BlogPosting` + author |
| `/contact-us` | `LocalBusiness` + `ReserveAction` |
| `/about-us` | `Person` per practitioner |

## Stack

Next.js App Router · TypeScript · Tailwind · MDX via `next-mdx-remote` · static export.
No CMS, no database. `lib/clinic.ts` is the single source of truth for NAP, hours, and schema.

## Deliverable

Final sign-off as an HTML redirect map matching
`C:\Users\chris\Desktop\blueprint\kaiteki\redirect-map.html`.
