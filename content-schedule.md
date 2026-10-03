# Content schedule: Persistence Chiro

Source: content-schedule.html (3-month content sprint, compiled 17 Aug 2026). This file is that plan with a status column, so progress
lives beside the code. The SEO client tracker reads it on every push.

**Update the Status column in the same commit as the work.** Statuses: Not started, In
progress, Blocked, Built (in the repo, not yet on the production domain), Live, Dropped.

**Slug** is where the tracker looks for the page. When a new blog post, condition or service
page with that slug appears in a pushed commit, the tracker marks the item Built by itself.
If you publish under a different slug, change the Slug cell in the same commit. Several
slugs can be listed, separated by commas. Refreshes of existing pages have no slug: set
their status by hand.

Keep the ID column. It is how the tracker matches rows. A new row needs a new, unused ID.

## Month 1: Foundation, Money & Displacement

| ID | Piece | Primary keyword | Type | Slug | Status | Evidence |
|---|---|---|---|---|---|---|
| pc001 | Pricing / Fees page | how much does a chiropractor cost in malaysia | Other | `offers` | Built | /offers ("Offers and Prices, Cheras KL"), with cost FAQ |
| pc002 | Best Chiropractor in KL (2026) | best chiropractor kuala lumpur | Blog | `best-chiropractor-kuala-lumpur` | Built | /blog/best-chiropractor-kuala-lumpur (2026-08-26) |
| pc003 | Best Chiropractor in Cheras / Maluri | best chiropractor cheras | Blog | `best-chiropractor-cheras` | Not started |  |
| pc004 | Gonstead Technique page | gonstead chiropractor kuala lumpur | Service | `gonstead-technique` | Built | /blog/gonstead-technique (2026-08-26). Built as a blog post, not a service page |
| pc005 | Muscle Knots / Trigger Points page | muscle knots | Condition | `muscle-knots` | Built | /blog/muscle-knots (2026-07-25). Built as a blog post, not a condition page |
| pc006 | How to Get Rid of Muscle Knots | how to get rid of muscle knots | Blog | `how-to-get-rid-of-muscle-knots` | Not started | May already be covered by /blog/muscle-knots ("What Actually Helps"). Decide: merge or write separately |
| pc007 | Dry Needling vs Acupuncture | dry needling vs acupuncture | Blog | `dry-needling-vs-acupuncture` | Built | /blog/dry-needling-vs-acupuncture (2026-08-27) |
| pc008 | Chiropractic vs Physiotherapy | chiropractic vs physiotherapy | Blog | `chiropractic-vs-physiotherapy` | Built | /blog/chiropractic-vs-physiotherapy (2026-08-27) |
| pc009 | Herniated / Bulging Disc page | herniated disc | Condition | `bulging-disc-vs-herniated-disc` | Built | /blog/bulging-disc-vs-herniated-disc (2026-08-27). Delivered as a comparison blog post, not a condition page |
| pc010 | Pinched Nerve page | pinched nerve | Condition | `pinched-nerve` | Built | /conditions/pinched-nerve (commit 2026-09-08) |
| pc011 | Tension Headache page | tension headache | Condition | `tension-headache` | Built | /conditions/tension-headache (commit 2026-09-08) |
| pc012 | Whiplash page | whiplash | Condition | `whiplash` | Built | /conditions/whiplash (commit 2026-09-08) |
| pc013 | Areas We Serve (Greater KL) page | chiropractor near me | Other | `areas-we-serve` | Not started | /locate-us exists but is a directions page, not an areas page |
| pc014 | Chiropractor vs Doctor: When to See Which | when to see a chiropractor | Blog | `chiropractor-vs-doctor` | Not started |  |
| pc015 | Dry Needling page (complete "coming soon" page) | dry needling kl | Service |  | Built | /services/dry-needling, full page in EN/ZH/MS |
| pc016 | Slipped Disc page (refresh + internal links) | slipped disc remedy | Condition |  | Built | Refreshed 2026-10-01: retargeted to "slipped disc lumbar region" (590/mo; "slipped disc remedy" left for a blog post), lower back vs neck table, disc terms and at home FAQs, links to pinched nerve and the disc terms post. Awaiting Valerie's re-review |
| pc017 | Neck Pain page (refresh + internal links) | neck pain | Condition |  | Built | Refreshed 2026-10-01: stiff neck vs pinched nerve vs whiplash vs neck headache table, woke up stiff FAQ, now links all four neck siblings. Keyword kept as "stiffness neck pain". Awaiting Valerie's re-review |
| pc018 | Migraine page (refresh + internal links) | migraine | Condition |  | Built | Refreshed 2026-10-01: migraine vs tension vs neck headache table, medication overuse FAQ, pregnancy red flag, links tension headache. Keyword kept as "migraine headache". Awaiting Valerie's re-review |

## Month 2: Condition Pillars & Comparisons

| ID | Piece | Primary keyword | Type | Slug | Status | Evidence |
|---|---|---|---|---|---|---|
| pc019 | Spinal Stenosis page | spinal stenosis | Condition | `spinal-stenosis` | Not started |  |
| pc020 | Spondylolisthesis page | spondylolisthesis | Condition | `spondylolisthesis` | Not started |  |
| pc021 | Upper Back Pain page | upper back pain | Condition | `upper-back-pain` | Dropped | Folded into /conditions/back-pain (pc033, 2026-10-03): no measured demand for "upper back pain" in Malaysia and no GSC queries; between the shoulder blades is also covered by /blog/tech-neck |
| pc022 | Carpal Tunnel Syndrome page | carpal tunnel syndrome | Condition | `carpal-tunnel-syndrome` | Not started |  |
| pc023 | Frozen Shoulder page | frozen shoulder | Condition | `frozen-shoulder` | Not started |  |
| pc024 | Text Neck / Tech Neck page | text neck | Blog | `tech-neck` | Live | /blog/tech-neck (2026-10-03). Built as a blog post, not a condition page (informational SERP; a condition page would overlap /conditions/neck-pain). Targets "tech neck" (590/mo) over "text neck" (170/mo) |
| pc025 | Slipped Disc vs Sciatica | slipped disc vs sciatica | Blog | `slipped-disc-vs-sciatica` | Not started |  |
| pc026 | Slipped Disc vs Herniated Disc | slipped disc vs herniated disc | Blog | `slipped-disc-vs-herniated-disc` | Not started | Overlaps /blog/bulging-disc-vs-herniated-disc; check before writing |
| pc027 | Sciatica vs Piriformis Syndrome | sciatica vs piriformis syndrome | Blog | `sciatica-vs-piriformis-syndrome` | Not started |  |
| pc028 | Migraine vs Tension Headache | migraine vs tension headache | Blog | `migraine-vs-tension-headache` | Not started |  |
| pc029 | Chiropractic vs Massage | chiropractic vs massage | Blog | `chiropractic-vs-massage` | Not started |  |
| pc030 | Tit Tar vs Chiropractic | tit tar vs chiropractic | Blog | `tit-tar-vs-chiropractic` | Live | /blog/tit-tar-vs-chiropractic (2026-10-02). Targets "tit tar" (1,000/mo) as primary; fair comparison, Act 775 practice areas, no price row |
| pc031 | Lower Back Pain Exercises & Relief | lower back pain exercises | Blog | `lower-back-pain-exercises` | Not started |  |
| pc032 | Sciatica Exercises & Stretches | sciatica exercises | Blog | `sciatica-exercises` | Live | /blog/sciatica-exercises (2026-10-03). Exercise to cause table and stop rule; no exercise photos yet (OPEN-ITEMS 14) |
| pc033 | Back Pain page (refresh + split Upper Back) | lower back pain | Condition |  | Live | Refreshed 2026-10-03: GSC showed 0 impressions here while the homepage ranks 3 to 6 for back pain searches, so the homepage keeps those and this page goes deeper. Upper back folded in (not split): lower vs upper back vs sciatica vs slipped disc table, upper back cause, symptom and red flag, three FAQs linking tech neck and slipped disc. Awaiting Valerie re-review |
| pc034 | Scoliosis page (refresh + internal links) | scoliosis | Condition |  | Not started | Page exists at /conditions/scoliosis; refresh not yet verified |
| pc035 | Sciatica page (refresh + internal links) | sciatica treatment malaysia | Condition |  | Live | Refreshed 2026-10-03 from GSC page queries: retargeted to "sciatica treatment kl" (81 impressions, pos 35; "malaysia" had 3), "sciatic nerve pain" in title and H1, sciatica vs hip vs lower back table, specialist, physio and piriformis FAQs, links the exercises post. Awaiting Valerie re-review |
| pc036 | Hip Pain page (add "vs sciatica" section) | hip pain | Condition |  | Not started | Page exists at /conditions/hip-pain; refresh not yet verified |

## Month 3: Spokes, Trust, Audience & Local Fill

| ID | Piece | Primary keyword | Type | Slug | Status | Evidence |
|---|---|---|---|---|---|---|
| pc037 | Is Chiropractic Safe? / Legit in Malaysia | is chiropractic safe | Blog | `is-chiropractic-safe` | Not started |  |
| pc038 | How to Choose a Chiropractor in Malaysia | how to choose a chiropractor | Blog | `how-to-choose-a-chiropractor` | Not started |  |
| pc039 | Chiropractic vs Osteopathy | chiropractic vs osteopathy | Blog | `chiropractic-vs-osteopathy` | Not started |  |
| pc040 | Lower Back Pain vs Kidney Pain | lower back pain vs kidney pain | Blog | `lower-back-pain-vs-kidney-pain` | Not started |  |
| pc041 | Migraine vs Cluster / Sinus / Vertigo | migraine vs cluster headache | Blog | `migraine-vs-cluster-headache` | Not started |  |
| pc042 | Slipped Disc Recovery & Exercises | slipped disc recovery time | Blog | `slipped-disc-recovery` | Not started |  |
| pc043 | Scoliosis in Adults: Exercises | scoliosis in adults | Blog | `scoliosis-in-adults` | Not started |  |
| pc044 | Migraine Triggers & Natural Relief | migraine triggers | Blog | `migraine-triggers` | Not started |  |
| pc045 | Stiff Neck Relief / Won't Go Away | stiff neck relief | Blog | `stiff-neck-relief` | Not started |  |
| pc046 | Heat vs Ice for Back / Neck Pain | neck pain heat or ice | Blog | `heat-or-ice-for-back-pain` | Not started |  |
| pc047 | Dry Needling: Does It Hurt / Worth It | does dry needling hurt | Blog | `does-dry-needling-hurt` | Not started |  |
| pc048 | Fix Forward Head Posture / Sleeping Position | how to fix forward head posture | Blog | `forward-head-posture` | Not started |  |
| pc049 | Chiropractic for Office Workers / WFH | desk job back pain | Blog | `chiropractic-for-office-workers` | Not started |  |
| pc050 | Chiropractic for Athletes & Runners | chiropractic for athletes | Blog | `chiropractic-for-athletes` | Not started | Legacy post exists: /blog/chiropractic-care-for-athletes-optimising-performance-and-preventing-injuries |
| pc051 | Chiropractic for Seniors / Students | chiropractic for seniors | Blog | `chiropractic-for-seniors` | Not started |  |
| pc052 | Scoliosis Treatment Options in Malaysia | scoliosis treatment malaysia | Blog | `scoliosis-treatment-malaysia` | Not started |  |
| pc053 | Shoulder Imbalance → Shoulder Pain (broaden) | shoulder pain | Condition |  | Not started | Page exists at /conditions/shoulder-imbalance; refresh not yet verified |
| pc054 | What to Expect page (first visit): optimise | what to expect at chiropractor | Other |  | Not started | Page exists at /what-to-expect; refresh not yet verified |
| pc055 | Chiropractic in Pregnancy: refresh | chiropractic during pregnancy | Blog |  | Not started | Nearest legacy post: /blog/chiropractic-care-through-the-stages-of-a-woman-s-life |

