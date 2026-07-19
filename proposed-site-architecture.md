# Persistence Chiropractic — Proposed Site Architecture

*Supersedes `seo-strategy.md` §3 Phase 3. Grounded in `current-url-structure.md` (Wix, live 2026-07-19).*

## Design decisions (and why they differ from the old plan)

1. **The homepage IS the Cheras page.** The old plan retitles `/` to "Chiropractor in
   Cheras (Maluri)" *and* builds `/locations/cheras-maluri`. Those two pages compete for
   the same query — classic cannibalisation, and `/` already ranks #16 for it with the
   strongest internal link equity on the site. Don't split it. One clinic, one location,
   one page.
2. **No area/location pages at all.** The clinic serves Cheras/Maluri only. The one area
   page worth having would be Cheras — that's the homepage. Kepong and Bangsar pages
   would be doorway pages for areas they don't serve; 2026 guidance treats those as a
   quality liability, not a ranking asset. KL-wide terms ("chiro kuala lumpur", SD 9)
   get targeted from the homepage and `/services/*` copy, since Maluri *is* in KL.
3. **Services get a hub + spokes.** `/our-services` is one flat page trying to rank for
   six intents. Split it: each service page owns one symptom cluster and one intent.
   With the blog gone, these pages carry the entire content load — they must be deep.
4. **No blog.** Removed at client direction. See the trade-off note at the bottom.
5. **Three-click depth max.** Every money page is one click from the homepage nav.

## Target URL map

```
/                                  Chiropractor in Cheras (Maluri), Kuala Lumpur   [canonical local page]
│
├── /services                      hub — overview + links to all six
│   ├── /services/back-pain
│   ├── /services/slipped-disc
│   ├── /services/sciatica
│   ├── /services/scoliosis
│   ├── /services/neck-pain-posture
│   └── /services/sports-injury
│
├── /gonstead-technique            differentiator page; absorbs the "tit tar vs chiro" angle
├── /what-to-expect                keep — first-visit intent
├── /about-us                      keep (+ practitioner bios w/ Person schema)
├── /contact-us                    NAP, map, hours + booking form (absorbs /book-now)
│
└── /press                         was /press-and-publications
    └── /press/{slug}              was /going-places-magazine-september-feature
```

**11 pages → 11.** Flat page count, but six of them are now money pages instead of one.
Every page one click from home.

## Redirect table (301)

| Old | New |
|---|---|
| `/our-services` | `/services` |
| `/press-and-publications` | `/press` |
| `/going-places-magazine-september-feature` | `/press/going-places-september-feature` |
| `/our-partners` | `/about-us#partners` |
| `/landingpage` | `/` — stray Wix default, kill it |
| `/book-now` | `/contact-us` — booking form moves there |
| `/blog` | `/services` |
| `/post/a-deeper-understanding-of-scoliosis` | `/services/scoliosis` |
| `/post/chiropractic-care-for-athletes-...` | `/services/sports-injury` |
| `/post/spike-higher-play-longer` | `/services/sports-injury` |
| `/post/derek-s-journey-with-gonstead-chiropractic-care` | `/gonstead-technique` |
| `/post/less-pain-more-gain-with-regular-chiropractic-care` | `/services` |
| `/post/what-to-expect-when-going-to-the-chiropractor-...` | `/what-to-expect` |
| `/post/chiropractic-care-a-fresh-perspective-on-migraine-relief` | `/services/neck-pain-posture` |
| `/post/sleeping-well-waking-better-...` | `/services/neck-pain-posture` |
| `/post/are-house-chores-a-pain-in-the-back-...` | `/services/back-pain` |
| `/post/health-benefits-of-ergonomic-chairs` | `/services/neck-pain-posture` |
| `/post/chiropractic-care-through-the-stages-of-a-woman-s-life` | `/services` |
| remaining 3 `/post/*` (webinar, charity talk, anniversary) | `/about-us` |

**301 every post — never 404 them.** They hold the site's existing crawl history and
whatever link equity the 40 referring domains point at. Redirecting to the closest
service page recycles it; deleting throws it away.

## Internal linking rules

- Homepage links to all six service pages and `/gonstead-technique`.
- Every service page links **up** to `/services`, **across** to two related services, and
  ends with a booking CTA to `/contact-us`.
- `/gonstead-technique` links to all six services (it's the how, they're the what).
- Footer carries NAP + `/contact-us` sitewide.

## Schema per template

| Template | JSON-LD |
|---|---|
| `/` | `Chiropractic` + `LocalBusiness` (NAP, Maluri geo, hours, `areaServed: Cheras`) |
| `/services/*` | `MedicalWebPage` + `FAQPage` |
| `/contact-us` | `LocalBusiness` + `ReserveAction` for the booking form |
| `/about-us` | `Person` per practitioner |

## Wix implementation constraint

Wix static pages are flat (`/back-pain`, not `/services/back-pain`). To get the nested
paths above you must build `/services/*` as **CMS dynamic pages** with a URL prefix —
one collection, one design template. Flat slugs are the fallback and cost little
ranking-wise, but you lose the crawl-clarity of the silo.

## Build order

1. Homepage retitle + schema + nav rebuild → unlocks everything downstream.
2. `/services/back-pain`, `/services/slipped-disc`, `/services/sciatica` (highest intent).
3. All redirects + `/landingpage` removal, deployed **before** the blog comes down.
4. Remaining services + `/gonstead-technique`.

## Trade-off: removing the blog

Recorded so the decision is deliberate, not accidental:

- `seo-strategy.md` §4 Phase 4 was entirely blog-driven, and the competitor analysis
  (§3) shows Ian The Chiro wins this market *with blog content* — "tit tar" (1,000
  vol/mo, SD 9) and "muscle knots" (1,000 vol/mo) are informational queries that no
  service page can rank for. Those keywords are now out of reach.
- Excellence ranks #9 for "chiropractor malaysia kuala lumpur" via a blog listicle.
  That route is closed too.
- Without a blog there is no new-content cadence, which removes the main lever for
  building the 32 → 50 referring domains in §5.

**What partly covers the gap:** `/gonstead-technique` can absorb the tit-tar comparison
angle as a service-adjacent page rather than a post, and deep `/services/*` pages with
FAQ schema can capture some symptom-level informational intent. This recovers maybe a
third of what the blog reached.

**If the objection is cadence/effort rather than the blog itself**, a lower-cost option
is keeping `/post/*` frozen — no new posts, no deletion — so the existing 14 URLs keep
their equity while the effort goes into service pages. Say the word and I'll rework it
that way.
