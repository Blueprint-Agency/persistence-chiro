# KPI 3 — keyword → page map (corrected)

*Supersedes the "KPI 3 — 14 Primary Keywords We Track" table in `seo-proposal.html`.
Corrected 2026-07-21 after the build was reconciled against the proposal.*

The proposal's table assigns three keywords to `/locations/*` pages that **will not be
built**, and three more to blog posts that **do not exist yet**. Reporting against the
original table would show six keywords pointing at 404s. This file is the version to
track against.

## Why the location pages are gone

`/locations/cheras-maluri` and `/locations/kuala-lumpur` are not being built. Google's own
[local ranking factors](https://support.google.com/business/answer/7091) name only
relevance, distance and prominence — no on-site page factor. Whitespark's 2026 Local
Search Ranking Factors puts GBP + review signals at ~52% of local-pack weight against 15%
for on-page. A Cheras page would also compete directly with the homepage, which already
ranks #16 for "chiro cheras" and holds most of the site's referring domains.

**The homepage is the Cheras page.** Those keywords are re-pointed to `/`.

## The 14 tracked keywords

| # | Keyword | Vol/mo | Page (corrected) | Status |
|---|---|---|---|---|
| 1 | chiropractor near me | 8,100 | `/` | ✅ live |
| 2 | chiro cheras | 480 | `/` — **was** `/locations/cheras-maluri` | ✅ live |
| 3 | chiropractor cheras | — | `/` — **was** `/locations/cheras-maluri` | ✅ live |
| 4 | chiro kuala lumpur | 480 | `/` — **was** `/locations/kuala-lumpur` | ✅ live |
| 5 | physio cheras | 260 | `/services/physiotherapy` | ✅ live |
| 6 | dry needling near me | 210 | `/services/dry-needling` | ✅ live |
| 7 | bone alignment near me | 260 | `/services/chiropractic-treatment` | ✅ live |
| 8 | stiffness neck pain | 1,600 | `/conditions/neck-pain` | ✅ live |
| 9 | slipped disc lumbar region | 590 | `/conditions/slipped-disc` | ✅ live |
| 10 | migraine headache | 3,600 | `/conditions/migraine` | ✅ live |
| 11 | sciatica and exercises | 1,300 | `/conditions/sciatica` | ✅ live |
| 12 | tit tar near me | 1,600 | `/blog/tit-tar-vs-chiropractic` | ⏸️ **not built** |
| 13 | tit tar | 1,000 | `/blog/tit-tar-vs-chiropractic` | ⏸️ **not built** |
| 14 | muscle knots | 1,000 | `/blog/muscle-knots` | ⏸️ **not built** |

**11 of 14 have a live page. 3 are blocked on the blog**, which is deferred by client
decision. The KPI target is 7 of 14 on Page 1 — reachable without the blog, but it removes
most of the margin, so the blog is a schedule risk rather than an optional extra.

## ⚠️ Re-pull tit tar before committing to it

The proposal prices `tit tar` at **SD 12–15**. The 2026-07-19 Ubersuggest re-pull recorded
in `proposed-site-architecture.md` puts `tit tar` at **SD 31** and `tit tar near me` at
**SD 29**, both brand-dominated (Chris Leong Method, CLM, HKD).

Two of the 14 tracked keywords rest on that number. If the re-pull is right, they are
unlikely Page-1 wins and should be swapped out of the KPI set **before** reporting starts,
not after a miss. Worth 10 minutes with Keyword Planner to settle.

## Pages built beyond the tracked set

Not in the KPI table, but live and carrying their own targets — these are what widen the
surface area against Ian The Chiro, who has no condition pages at all:

| Page | Target |
|---|---|
| `/conditions/back-pain` | back pain treatment kl |
| `/conditions/scoliosis` | scoliosis treatment malaysia |
| `/conditions/hip-pain` | lower back ache hip pain |
| `/conditions/shoulder-imbalance` | shoulder and neck pain |
| `/services/sports-injury-rehabilitation` | sports injury treatment malaysia |
| `/services/posture-correction` | sit posture correction |

`content.test.ts` asserts no two pages share a `targetKeyword`, so this table cannot drift
into cannibalisation without failing the build.
