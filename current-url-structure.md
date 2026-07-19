# Persistence Chiropractic — Current URL Structure

*Source: live sitemap (`/sitemap.xml`), fetched 2026-07-19. Platform: **Wix**.*

> ⚠️ This is the **actual current** structure. It is NOT the architecture in
> `seo-strategy.md` §3 Phase 3 — that `/services/*` + `/locations/*` tree is the
> *proposed* revamp target and does not exist yet. There are currently **no
> service pages and no location pages** — the single biggest gap vs the plan.

## Main pages (`pages-sitemap.xml`, lastmod 2026-05-04)

```
/                                         → Home
/about-us
/our-services                             (single page — NOT split per service)
/what-to-expect
/our-partners
/press-and-publications
/going-places-magazine-september-feature  (press feature)
/contact-us
/book-now                                 (booking page)
/landingpage                              (stray/orphan Wix landing page)
/blog                                     (blog index + only blog category)
```

## Blog posts (`blog-posts-sitemap.xml`) — 14 posts under `/post/*`

```
/post/a-deeper-understanding-of-scoliosis                                (2024-12-09)
/post/chiropractic-care-through-the-stages-of-a-woman-s-life             (2025-09-01)
/post/chiropractic-care-for-athletes-optimising-performance-and-preventing-injuries  (2024-12-09)
/post/spike-higher-play-longer                                          (2025-09-30)
/post/blog-boost-your-bone-health-webinar                               (2022-11-07)
/post/derek-s-journey-with-gonstead-chiropractic-care                   (2023-10-23)
/post/three-years-of-gratitude-and-growth-celebrating-wellness-world-spine-day-and-our-community  (2025-08-25)
/post/less-pain-more-gain-with-regular-chiropractic-care                (2022-10-23)
/post/sleeping-well-waking-better-the-key-to-spinal-health-and-quality-sleep  (2023-05-31)
/post/chiropractic-care-charity-talk-for-ti-ratana-welfare              (2025-08-25)
/post/what-to-expect-when-going-to-the-chiropractor-for-the-first-time  (2023-06-20)
/post/are-house-chores-a-pain-in-the-back-here-s-what-chiropractors-say (2025-05-07)
/post/health-benefits-of-ergonomic-chairs                               (2023-01-30)
/post/chiropractic-care-a-fresh-perspective-on-migraine-relief          (2024-12-09)
```

## Observations vs the revamp plan

| Plan expectation (§3) | Current reality |
|---|---|
| Per-service pages (`/services/back-pain`, `/slipped-disc`, `/scoliosis`, `/sciatica`, `/neck-pain-posture`, `/sports-injury`) | **None** — one flat `/our-services` page |
| Location pages (`/locations/cheras-maluri`, `/kuala-lumpur`, `/kepong`, `/bangsar`) | **None** — no Cheras/Maluri landing page exists |
| Dedicated "chiro cheras" landing page | **None** — the homepage `/` ranks #16 for it (no `/book-now` involvement anymore) |
| Content engine (Gonstead/tit-tar/muscle-knots angle) | 14 blog posts exist but topics are general wellness, not the SD-easy keyword targets |

**Slug notes:** `/landingpage` looks like a stray Wix default — verify it isn't indexed/thin-content dragging quality. Blog category taxonomy is minimal (one category = `/blog`).
