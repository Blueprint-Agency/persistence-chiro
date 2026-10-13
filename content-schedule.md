# Content schedule: Persistence Chiro

Source: content-schedule.html (3-month content sprint, compiled 17 Aug 2026), extended to Month 4 on
13 Oct 2026. This file is that plan with a status column, so progress lives beside the code. The SEO
client tracker reads it on every push.

**Monthly cadence from Month 3 on:** 10 new pieces and at least 5 improvements to existing pages,
split into two tables per month. A new piece is checked for overlap with live pages before it is
scheduled (one page, one intent). Anything that would compete with a live page is dropped or
turned into an improvement of that page instead.

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
| pc006 | How to Get Rid of Muscle Knots | how to get rid of muscle knots | Blog | `how-to-get-rid-of-muscle-knots` | Not started | May already be covered by /blog/muscle-knots ("What Actually Helps"). Planned as a merge into that post (pc056, Month 3); drop this row once pc056 ships |
| pc007 | Dry Needling vs Acupuncture | dry needling vs acupuncture | Blog | `dry-needling-vs-acupuncture` | Built | /blog/dry-needling-vs-acupuncture (2026-08-27) |
| pc008 | Chiropractic vs Physiotherapy | chiropractic vs physiotherapy | Blog | `chiropractic-vs-physiotherapy` | Built | /blog/chiropractic-vs-physiotherapy (2026-08-27) |
| pc009 | Herniated / Bulging Disc page | herniated disc | Condition | `bulging-disc-vs-herniated-disc` | Built | /blog/bulging-disc-vs-herniated-disc (2026-08-27). Delivered as a comparison blog post, not a condition page |
| pc010 | Pinched Nerve page | pinched nerve | Condition | `pinched-nerve` | Built | /conditions/pinched-nerve (commit 2026-09-08) |
| pc011 | Tension Headache page | tension headache | Condition | `tension-headache` | Built | /conditions/tension-headache (commit 2026-09-08) |
| pc012 | Whiplash page | whiplash | Condition | `whiplash` | Built | /conditions/whiplash (commit 2026-09-08) |
| pc013 | Areas We Serve (Greater KL) page | chiropractor near me | Other | `areas-we-serve` | Not started | /locate-us exists but is a directions page, not an areas page |
| pc014 | Chiropractor vs Doctor: When to See Which | when to see a chiropractor | Blog | `chiropractor-vs-doctor` | Built | /blog/chiropractor-vs-doctor (2026-10-12). Malaysian angle: Act 775 vs Medical Council vs Act 774 table, Employment Act MC rule, doctor-first list, symptom-by-symptom guide. Valerie review pending |
| pc015 | Dry Needling page (complete "coming soon" page) | dry needling kl | Service |  | Built | /services/dry-needling, full page in EN/ZH/MS |
| pc016 | Slipped Disc page (refresh + internal links) | slipped disc remedy | Condition |  | Built | Refreshed 2026-10-01: retargeted to "slipped disc lumbar region" (590/mo; "slipped disc remedy" left for a blog post), lower back vs neck table, disc terms and at home FAQs, links to pinched nerve and the disc terms post. Reviewed by Valerie 2026-10-03 |
| pc017 | Neck Pain page (refresh + internal links) | neck pain | Condition |  | Built | Refreshed 2026-10-01: stiff neck vs pinched nerve vs whiplash vs neck headache table, woke up stiff FAQ, now links all four neck siblings. Keyword kept as "stiffness neck pain". Reviewed by Valerie 2026-10-03 |
| pc018 | Migraine page (refresh + internal links) | migraine | Condition |  | Built | Refreshed 2026-10-01: migraine vs tension vs neck headache table, medication overuse FAQ, pregnancy red flag, links tension headache. Keyword kept as "migraine headache". Reviewed by Valerie 2026-10-03 |

## Month 2: Condition Pillars & Comparisons

| ID | Piece | Primary keyword | Type | Slug | Status | Evidence |
|---|---|---|---|---|---|---|
| pc019 | Spinal Stenosis page | spinal stenosis | Condition | `spinal-stenosis` | Not started |  |
| pc020 | Spondylolisthesis page | spondylolisthesis | Condition | `spondylolisthesis` | Not started |  |
| pc021 | Upper Back Pain page | upper back pain | Condition | `upper-back-pain` | Dropped | Folded into /conditions/back-pain (pc033, 2026-10-03): no measured demand for "upper back pain" in Malaysia and no GSC queries; between the shoulder blades is also covered by /blog/tech-neck |
| pc022 | Carpal Tunnel Syndrome page | carpal tunnel syndrome | Condition | `carpal-tunnel-syndrome` | Not started |  |
| pc023 | Frozen Shoulder page | frozen shoulder | Condition | `frozen-shoulder` | Not started |  |
| pc024 | Text Neck / Tech Neck page | text neck | Blog | `tech-neck` | Live | /blog/tech-neck (2026-10-03). Built as a blog post, not a condition page (informational SERP; a condition page would overlap /conditions/neck-pain). Targets "tech neck" (590/mo) over "text neck" (170/mo) |
| pc025 | Slipped Disc vs Sciatica | slipped disc vs sciatica | Blog | `slipped-disc-vs-sciatica` | Dropped | Covered by the sciatica page table (sciatica vs hip vs lower back) and the slipped disc page; a separate post would compete with both (2026-10-12) |
| pc026 | Slipped Disc vs Herniated Disc | slipped disc vs herniated disc | Blog | `slipped-disc-vs-herniated-disc` | Dropped | Overlaps /blog/bulging-disc-vs-herniated-disc, which already explains the disc terms (2026-10-12) |
| pc027 | Sciatica vs Piriformis Syndrome | sciatica vs piriformis syndrome | Blog | `sciatica-vs-piriformis-syndrome` | Dropped | Covered by the sciatica page piriformis FAQ and the cause table in /blog/sciatica-exercises (2026-10-12) |
| pc028 | Migraine vs Tension Headache | migraine vs tension headache | Blog | `migraine-vs-tension-headache` | Dropped | Covered by the migraine vs tension vs neck headache table added to /conditions/migraine on 2026-10-01 (2026-10-12) |
| pc029 | Chiropractic vs Massage | chiropractic vs massage | Blog | `chiropractic-vs-massage` | Not started |  |
| pc030 | Tit Tar vs Chiropractic | tit tar vs chiropractic | Blog | `tit-tar-vs-chiropractic` | Live | /blog/tit-tar-vs-chiropractic (2026-10-02). Targets "tit tar" (1,000/mo) as primary; fair comparison, Act 775 practice areas, no price row |
| pc031 | Lower Back Pain Exercises & Relief | lower back pain exercises | Blog | `lower-back-pain-exercises` | Built | /blog/lower-back-pain-exercises (2026-10-12). Split by stage: flare-up (gentle movement) vs recurring (strength), per Cochrane 2021 and Karlsson 2020; desk routine; no exercise repeats the sciatica post. Illustrated (8 AI images). Valerie review pending |
| pc032 | Sciatica Exercises & Stretches | sciatica exercises | Blog | `sciatica-exercises` | Live | /blog/sciatica-exercises (2026-10-03). Exercise to cause table and stop rule; no exercise photos yet (OPEN-ITEMS 14) |
| pc033 | Back Pain page (refresh + split Upper Back) | lower back pain | Condition |  | Live | Refreshed 2026-10-03: GSC showed 0 impressions here while the homepage ranks 3 to 6 for back pain searches, so the homepage keeps those and this page goes deeper. Upper back folded in (not split): lower vs upper back vs sciatica vs slipped disc table, upper back cause, symptom and red flag, three FAQs linking tech neck and slipped disc. Reviewed by Valerie 2026-10-03 |
| pc034 | Scoliosis page (refresh + internal links) | scoliosis | Condition |  | Built | Refreshed 2026-10-12: scoliosis vs tilted pelvis vs uneven shoulders table with back-view body maps, four cause illustrations, "Is it scoliosis or just bad posture?" FAQ, links shoulder imbalance. Title and keyword unchanged pending GSC. Valerie re-review pending |
| pc035 | Sciatica page (refresh + internal links) | sciatica treatment malaysia | Condition |  | Live | Refreshed 2026-10-03 from GSC page queries: retargeted to "sciatica treatment kl" (81 impressions, pos 35; "malaysia" had 3), "sciatic nerve pain" in title and H1, sciatica vs hip vs lower back table, specialist, physio and piriformis FAQs, links the exercises post. Reviewed by Valerie 2026-10-03 |
| pc036 | Hip Pain page (add "vs sciatica" section) | hip pain | Condition |  | Built | Refreshed 2026-10-12: hip joint vs outer hip vs sciatica vs lower back table (links sciatica and back pain), "Is it hip pain or sciatica?" FAQ. Title and keyword unchanged pending GSC (disconnected). Valerie re-review pending |

## Month 3: Spokes, Trust & Comparisons

### New content (10)

| ID | Piece | Primary keyword | Type | Slug | Status | Evidence |
|---|---|---|---|---|---|---|
| pc037 | Is Chiropractic Safe? / Legit in Malaysia | is chiropractic safe | Blog | `is-chiropractic-safe` | Not started |  |
| pc038 | How to Choose a Chiropractor in Malaysia | how to choose a chiropractor | Blog | `how-to-choose-a-chiropractor` | Not started |  |
| pc039 | Chiropractic vs Osteopathy | chiropractic vs osteopathy | Blog | `chiropractic-vs-osteopathy` | Not started |  |
| pc040 | Lower Back Pain vs Kidney Pain | lower back pain vs kidney pain | Blog | `lower-back-pain-vs-kidney-pain` | Not started |  |
| pc041 | Migraine vs Cluster / Sinus / Vertigo | migraine vs cluster headache | Blog | `migraine-vs-cluster-headache` | Not started | Must not repeat the migraine vs tension vs neck headache table on /conditions/migraine |
| pc042 | Slipped Disc Recovery & Exercises | slipped disc recovery time | Blog | `slipped-disc-recovery` | Not started | Also picks up "slipped disc remedy", left for a blog post by the pc016 refresh |
| pc043 | Scoliosis in Adults: Exercises | scoliosis in adults | Blog | `scoliosis-in-adults` | Not started | Adult and exercise angle only; /conditions/scoliosis keeps "scoliosis treatment malaysia" |
| pc044 | Migraine Triggers & Natural Relief | migraine triggers | Blog | `migraine-triggers` | Not started |  |
| pc046 | Heat vs Ice for Back / Neck Pain | neck pain heat or ice | Blog | `heat-or-ice-for-back-pain` | Not started |  |
| pc047 | Dry Needling: Does It Hurt / Worth It | does dry needling hurt | Blog | `does-dry-needling-hurt` | Not started | Check the /services/dry-needling FAQs first so the post goes deeper rather than repeating them |

### Improvements to existing content (5)

| ID | Piece | Primary keyword | Type | Slug | Status | Evidence |
|---|---|---|---|---|---|---|
| pc053 | Shoulder Imbalance → Shoulder Pain (broaden) | shoulder pain | Condition |  | Not started | Page exists at /conditions/shoulder-imbalance; refresh not yet verified |
| pc054 | What to Expect page (first visit): optimise | what to expect at chiropractor | Other |  | Not started | Page exists at /what-to-expect. Also settle the overlap with legacy /blog/what-to-expect-when-going-to-the-chiropractor-for-the-first-time (merge and 301, or retarget the post) |
| pc055 | Chiropractic in Pregnancy: refresh | chiropractic during pregnancy | Blog |  | Not started | Nearest legacy post: /blog/chiropractic-care-through-the-stages-of-a-woman-s-life. MY volumes 2026-10-13: "pregnancy back pain" 210/mo, "chiropractic care pregnant" 90 |
| pc050 | Chiropractic for Athletes & Runners: refresh legacy post | chiropractic for athletes | Blog |  | Not started | Changed from a new post to a refresh 2026-10-13: /blog/chiropractic-care-for-athletes-optimising-performance-and-preventing-injuries already holds this intent. Link /services/sports-injury-rehabilitation |
| pc056 | Muscle Knots: add "how to get rid of" section | how to get rid of muscle knots | Blog |  | Not started | Refresh /blog/muscle-knots to absorb pc006 rather than publish a second muscle knots post |

### Dropped from the original Month 3 plan

| ID | Piece | Primary keyword | Type | Slug | Status | Evidence |
|---|---|---|---|---|---|---|
| pc045 | Stiff Neck Relief / Won't Go Away | stiff neck relief | Blog | `stiff-neck-relief` | Dropped | /conditions/neck-pain targets "stiffness neck pain" and has the woke up stiff FAQ; a post would compete with it (2026-10-13) |
| pc048 | Fix Forward Head Posture / Sleeping Position | how to fix forward head posture | Blog | `forward-head-posture` | Dropped | Forward head posture is covered by /blog/tech-neck and /services/posture-correction; the sleeping half moves to pc066 (2026-10-13) |
| pc049 | Chiropractic for Office Workers / WFH | desk job back pain | Blog | `chiropractic-for-office-workers` | Dropped | Desk setup and desk routines are already in /blog/tech-neck and /blog/lower-back-pain-exercises; the intent moves to the ergonomic chairs refresh, pc067 (2026-10-13) |
| pc052 | Scoliosis Treatment Options in Malaysia | scoliosis treatment malaysia | Blog | `scoliosis-treatment-malaysia` | Dropped | Same keyword as /conditions/scoliosis (its targetKeyword); a post would cannibalise the condition page (2026-10-13) |

## Month 4: Patient Questions, Trust & Legacy Clean-up

Keyword volumes are Ubersuggest, Malaysia (locId 2458), English, pulled 2026-10-13. Rows are in
priority order, highest measured demand first.

### New content (10)

| ID | Piece | Primary keyword | Type | Slug | Status | Evidence |
|---|---|---|---|---|---|---|
| pc059 | Kinesiology Tape: What It Does and When It Helps | kinesiology tape | Blog | `kinesiology-tape` | Not started | 4,400/mo, informational, SD 25. The clinic tapes as part of physio (real taping photo already on /services/physiotherapy-house-call). Link physiotherapy and sports injury rehab |
| pc060 | What Is Chiropractic? (and What a Chiropractor Actually Does) | define chiropractic | Blog | `what-is-chiropractic` | Not started | "define chiropractic" 480/mo, "what does a chiropractor do" 70, "benefits of chiropractic" 90. Plain explainer; must not repeat /blog/chiropractor-vs-doctor or /what-to-expect |
| pc063 | Do Posture Correctors Work? | posture corrector | Blog | `do-posture-correctors-work` | Not started | "posture corrector" 590/mo (transactional SERP, so an honest guide competes with shops), "posture corrector exercises" 140, "posture corrector malaysia" 50. /services/posture-correction keeps the commercial intent |
| pc062 | Knee Pain Exercises | knee pain and exercises | Blog | `knee-pain-exercises` | Not started | 480/mo, plus "knee pain when squat" 170 and "knee pain on inside of knee" 170. Exercise spoke for the knee pain page (pc064), same split as back pain and lower back pain exercises |
| pc064 | Knee Pain page | knee pain | Condition | `knee-pain` | Not started | Knee care confirmed in scope (user, 2026-10-13). Ubersuggest returns no figure for the head term, but "sakit lutut in english" 260/mo and "knee pain exercise physiotherapy" 90 show demand. Commercial page; pc062 takes the exercise queries |
| pc065 | Best Pillow for Neck Pain | best pillow for neck pain | Blog | `best-pillow-for-neck-pain` | Not started | 210/mo, informational. Pillow choice only; sleeping positions stay in the pc066 refresh |
| pc058 | Why Does My Back Crack? (and Is Self-Cracking Bad?) | is cracking your back bad | Blog | `is-cracking-your-back-bad` | Not started | 30/mo. Goes deeper than the popping answer in the /services/chiropractic-care FAQ |
| pc061 | Why a Gonstead Chiropractor Takes an X-ray | chiropractic xray | Blog | `chiropractic-x-ray` | Not started | 20/mo. Low volume, kept as a trust piece for first-visit nerves. Needs Valerie input on when an X-ray is and is not indicated |
| pc057 | How Often Should You See a Chiropractor? | how often should you see a chiropractor | Blog | `how-often-to-see-a-chiropractor` | Not started | 10/mo. Low volume, kept for conversion: answers the question people ask before buying a bundle. Link /offers; no promised visit counts |
| pc051 | Chiropractic for Seniors / Students | chiropractic for seniors | Blog | `chiropractic-for-seniors` | Not started | Moved from Month 3 (2026-10-13). "chiropractor for elderly" 10/mo; "knee pain for old people" 50 suggests linking the knee pages. Lowest priority |

### Improvements to existing content (5)

| ID | Piece | Primary keyword | Type | Slug | Status | Evidence |
|---|---|---|---|---|---|---|
| pc066 | Sleeping position post: refresh legacy | good sleeping position | Blog |  | Not started | "good sleeping position" 880/mo, "proper sleeping position" 320, "best sleeping position for back pain" 170, "sciatica sleeping position" 140. Legacy /blog/sleeping-well-waking-better-the-key-to-spinal-health-and-quality-sleep. Takes the sleeping half of dropped pc048 |
| pc067 | Ergonomic chairs post: refresh legacy | ergonomic chair | Blog |  | Not started | 6,600/mo but a transactional SERP; aim the refresh at choosing and setting up a chair, which a clinic can rank for. Legacy /blog/health-benefits-of-ergonomic-chairs. Takes the intent of dropped pc049; link tech neck and lower back exercises |
| pc069 | Legacy migraine post: consolidate | migraine | Blog |  | Not started | /blog/chiropractic-care-a-fresh-perspective-on-migraine-relief competes with /conditions/migraine. Merge and 301, or retarget to an angle the condition page does not cover |
| pc070 | Legacy scoliosis post: consolidate | scoliosis | Blog |  | Not started | /blog/a-deeper-understanding-of-scoliosis competes with /conditions/scoliosis and pc043. Merge and 301, or retarget |
| pc068 | House chores post: refresh legacy | back pain from lifting | Blog |  | Not started | No measured volume for lifting or chores terms; lowest priority. Legacy /blog/are-house-chores-a-pain-in-the-back-here-s-what-chiropractors-say |

### Researched and not scheduled

These were in the first Month 4 draft (2026-10-13) and measured zero in Malaysia. They were never
pushed, so their IDs were reused above for the replacements.

- "sore after chiropractic adjustment" (0): better as an FAQ on /what-to-expect (pc054).
- "sacroiliac joint pain" / "si joint pain" (0 to 10): mention in the back pain and hip pain tables instead.
- "chiropractic insurance malaysia" (0): better as an FAQ on /offers once the clinic confirms the facts.
- Also checked: "plantar fasciitis" and "tennis elbow" (no data), "massage gun" (2,400/mo, transactional), "best mattress for back pain" (110).
