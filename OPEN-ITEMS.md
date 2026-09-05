# Open items

Work that is **blocked on a person, an asset or an access grant** — not on code. Every
item below has its reasoning recorded in a comment next to the thing it governs; this file
exists so the list can be found in one place instead of stumbled upon in four.

Last updated **2026-09-03**, when the client approved bundle pricing and confirmed
sports massage is offered.

> Keep this file honest. When an item is resolved, delete it here *and* remove the
> corresponding gate or comment in the code. A stale blocker is worse than no list.

---

## 1. Physiotherapist names — blocked until probation ends

The clinic's physiotherapists are within their probation period and are not to be named on
the site yet (client, 2026-08-08). **Chiropractors are not licensed to deliver
physiotherapy**, so the three practitioners in `lib/clinic.ts` cannot stand in for them.

`/services/physiotherapy` therefore sets `practitionersWithheld` and shows no team section:
a block headed "Meet your chiropractors" on a physiotherapy page implies the wrong
profession provides the care, which is worse than an absent section.

When the list arrives:

1. Add each physio with a `role` of `'Physiotherapist'`.
2. Leave `registrationsVerified: false` until their MOH / allied-health numbers are checked
   against the register.
3. Give `<MeetDoctors>` a way to filter by role, and un-hardcode its "chiropractors" eyebrow
   and default heading.
4. Drop `practitionersWithheld` from the physiotherapy entry.

## 2. Three other team sections — needs a scope-of-practice answer

`/services/dry-needling`, `/services/sports-injury-rehabilitation` and
`/services/posture-correction` still render "Meet your chiropractors". If physiotherapists
deliver any of those, the same misrepresentation as item 1 applies.

**Ask which of the three are physio-delivered**, then set `practitionersWithheld` on those.
One line per page now the field exists.

⚠️ **`/services/sports-injury-rehabilitation` got more urgent on 2026-09-03, and now in three
languages.** It carries the shockwave and sports massage bundle, and the clinic has confirmed
either profession delivers those, while the page still renders "Meet your chiropractors"
underneath. The page's own core service may well be chiropractor-delivered, which is why this was
not changed unilaterally, but the page now advertises something it may be naming the wrong
profession for. This is the one item on this list with copy already live that depends on the
answer, and the answer must be applied to the **en, zh and ms records together**: locales
disagreeing about who delivers a service is worse than either answer.

## 3. Per-condition photography — needs assets

Conditions now have a hero slot (`<ConditionHero>`) and every page shares one honest fallback,
the reception photograph, behind a scrim. What is still missing is **per-condition imagery**:

- Set `heroImage` on individual conditions to override the shared fallback, then generate a
  1200x630 `ogImage` crop from each. Until then all eight share the sitewide OG card, so a
  link to the sciatica page and a link to the migraine page preview identically.
- Replace the animated `ConcernIllustration` diagrams on the service pages. The client finds
  them weak and prefers photographs, as on `/services/dry-needling`. The `Outcome` type in
  `lib/services.ts` already supports `image`, so that swap is **data-only** once photos land.

## 4. Google Search Console access — needs the clinic

The connected GSC account has Five Clinic, Vatti, Kaiteki and Yoga Sadhana. **Persistence is
not on it.**

This matters because Ubersuggest's Malaysia index has real holes: `neck pain` reports 0/mo
while `stiffness neck pain` reports 1,600/mo, and `sciatica` reports difficulty 59 alongside
zero volume. Both are internally impossible, so a zero there means "no data", not "no demand".

Four condition pages have target keywords that cannot be validated without real impression
data:

| Page | targetKeyword | Reported | Note |
|---|---|---|---|
| back-pain | `back pain treatment kl` | 0/mo | base term `back pain` is 4,400/mo at SD 63 |
| slipped-disc | `slipped disc treatment malaysia` | 0/mo | no reliable variant found |
| sciatica | `sciatica treatment` | 0/mo | SD 59 with 0 volume is contradictory |
| scoliosis | `scoliosis treatment malaysia` | 0/mo | no reliable variant found |

**Getting the clinic to grant GSC access unblocks all four retargeting decisions at once.**

## 5. Sports massage and shockwave — pages BUILT 2026-09-03, assets and review outstanding

`/services/sports-massage` is live in **all three locales**, with shockwave as a section on it
and the RM200 bundle on the page. Each locale targets its own measured keyword rather than a
translation of the English one (Ubersuggest, Malaysia locId 2458, pulled 2026-09-03):

| Locale | Target | Volume | SD |
|---|---|---|---|
| en | `sports massage kl` | 170/mo | 8 |
| zh | `运动按摩` | 50/mo | 42 |
| ms | `urut sukan` | 50/mo | 19 |

`深层按摩` measured 0 and is used nowhere. `urutan sukan` returned an identical volume,
difficulty and monthly series to `urut sukan`, so Ubersuggest clusters them and either captures
the same demand. All three set `practitionersWithheld`, since either profession delivers this
and the physiotherapists still cannot be named.

Outstanding:

- ~~A sports massage photograph~~ **PARTLY SOLVED 2026-09-03, with a caveat.** Two images were
  generated in Canva and wired in: `sports-massage-session.webp` in the "how it works" column of
  all three sports massage pages, and `shockwave-session.webp` on the bundle card wherever it
  renders. They are the first images on the site that actually show the services they sit beside.

  A third followed on the same day: `sports-massage-hero.webp` replaced `therapy-neck.webp` as
  the hero of all three sports massage pages. The old frame is a real clinic photograph but shows
  a cervical hold, which on a sports massage page reads as an adjustment; it stays on the
  physiotherapy page, where it is accurate.

  ⚠️ **ALL THREE ARE AI GENERATED, AND THEIR ALT TEXT DELIBERATELY NAMES NO LOCATION.** Every real
  clinic frame on this site carries the Cheras or Kuala Lumpur modifier; these two must not,
  because they are not photographs of this clinic, these practitioners or these patients. Do not
  "fix" the inconsistency by adding the modifier. The bundle card matters most here: it sells
  something for money, which is the worst place on the site to imply provenance it does not have.
  Replace them with real photography when the clinic can shoot it, and add the modifier back at
  that point.

  The hero is the sharpest edge of this. It is what an OG card gets cropped from, so if one is
  ever generated for these routes, the image representing the page on WhatsApp and Facebook will
  not be a photograph of the clinic. `ogImage` is currently unset, which is why it has not
  happened yet; decide that deliberately rather than by adding the field.

  Still reusing borrowed frames: the four concern cards on each sports massage page are the
  shared symptom illustrations, and the sports rehabilitation pages still have no images of
  their own beyond the hero.
- **An OG card.** No `ogImage`, so all three share the sitewide shopfront card.
- **Two wording calls for the clinic to confirm**, both recorded in the code:
  - **`冲击波疗法`, not `冲击波治疗`**, for shockwave. `疗法` names the technique without the
    banned `治疗` string, so nothing had to be added to the whitelist in `content.test.ts`.
    AGENTS.md says the Chinese banned-word list is a strong draft pending client review, so
    widening its carve-outs was not ours to do unilaterally. Worth asking whether `疗法` reads
    naturally to their Chinese-speaking patients.
  - **`urut sukan` sits close to `urut sendi`**, which the Malay chiropractic page targets. The
    strings differ so the duplicate-keyword test passes, but the two pages are one careless edit
    away from the same intent. Keep this page on soft tissue and training load; leave joint work
    to that one.
- **Is shockwave worth its own page?** It exists only as a section. Worth measuring
  `shockwave therapy kl` before assuming.

## 7b. Multilingual coverage is complete, and two pages need watching

As of **2026-09-03** every condition and every service exists in all three locales: 8 conditions
and 6 services, 42 pages, no gaps. The blog stays English only by design.

**The two biggest keywords in this entire project are both migraine, and migraine is the one
thing the clinic does not claim to help with.**

| Keyword | Locale | Volume | SD |
|---|---|---|---|
| `migrain` | ms | **27,100/mo** | 41 |
| `偏头痛` | zh | **1,300/mo** | 39 |

Both pages are built as the English one is: an honest refusal that says the medical management of
migraine belongs with a doctor, plus the one thing the clinic can honestly assess, which is
whether part of the head pain is coming from the upper neck. **Do not let anyone "optimise" these
into conversion pages because of the volume.** If traffic arrives and bounces, that is the page
working correctly. The number does not change the answer.

**Three targets were chosen on judgement because Ubersuggest has no data for them**, all
returning 0 with an empty `monthly_searches` array, which is the same reporting hole as item 4:

| Page | Target | Also measured at 0 |
|---|---|---|
| zh slipped-disc | `腰椎间盘突出` | `椎间盘突出`, `骨刺` |
| zh sciatica | `坐骨神经痛` | `坐骨神经` |
| ms scoliosis | `skoliosis` | `tulang belakang bengkok` |

These are the standard clinical terms in both languages, so a zero is not credible. **Validate
them against GSC once Chinese and Malay impressions accumulate**, and do not swap the terminology
to chase a number the tool cannot see.

**All of it is unreviewed.** Every zh and ms record on the site is adapted from clinic-reviewed
English copy and has never been read by a native speaker. `lastReviewed` is unset throughout,
which is honest, but it means 28 non-English pages are live on a YMYL medical site with no
second reader. The migraine and scoliosis pages are the ones to hand over first: both make
refusals, and a refusal that translates badly is worse than no page.

## 8. Pricing — SHIPPED 2026-09-03, one bundle still held

The client reversed the earlier decision and approved publishing prices. The RM588 bundle is
**live**; the RM200 one is built but held.

**Chiro + Physio, RM588 (from RM660)** — a new-patient bundle:

| Component | Listed at |
|---|---|
| Chiropractic initial consultation and first adjustment | RM310 |
| X-ray | RM190 |
| Physiotherapy initial assessment, first session, home exercise programme | RM160 |

Renders on `/services/chiropractic-care` and `/services/physiotherapy` in all three locales,
answers the "how much does a first visit cost" FAQ on `/what-to-expect`, and reaches JSON-LD as
`makesOffer` on the clinic entity — which is the point, since the case for pricing was AEO, not
ranking. Every figure comes from `lib/pricing.ts`; nothing is retyped into a component or an
FAQ answer.

⚠️ **Each card shows two facts and they are not interchangeable.** The eyebrow names the kind of
bundle ("New patient bundle", "Sports recovery bundle"); a separate aqua badge says "Website-only
promo". They were briefly collapsed into one line, while only the shockwave bundle was thought to
be exclusive. Do not collapse them again: dropping "new patient" invites a returning patient to
claim a first-visit price, and dropping the badge hides the exclusivity that is the commercial
point of both offers.

Two faults in the client's artwork were caught on the way in and are worth remembering:

1. **The poster's "TOTAL WORTH RM650" did not match its own breakdown** — 310 + 190 + 160 is
   RM660. The clinic confirmed RM660. `content.test.ts` now asserts that a bundle's `compareAt`
   equals the sum of its components, so the same error cannot ship twice.
2. **The poster reads "Initial Consultation, Treatment"** — the banned word, on a graphic a
   patient sees. The block is rebuilt as markup rather than dropped in as an image. Never
   publish that artwork as-is.

**Shockwave + Sports Massage, RM200 (from RM240), one session of each — LIVE 2026-09-03** on
`/services/sports-massage`. **BOTH bundles are website-only** (client, 2026-09-03, correcting an
earlier note here that had the RM588 available at the counter too), and GSC shows the site holding
positions 4-11 on its money queries
while taking near-zero clicks, because those are local-pack impressions where the tap goes to
the Business Profile. An offer that exists nowhere else is a reason to tap the website.

It renders on **`/services/sports-massage` and
`/services/sports-injury-rehabilitation`** (client request, 2026-09-03), **in all three locales
on both**, so six pages carry it. The Chinese sports rehabilitation record was written on
2026-09-03 to close the last locale gap; it targets `复健` at 90/mo, which is nine times the
English record's own `sports injury treatment malaysia` at 10/mo.

The claim path is the CTA itself. The card's only button is a prefilled WhatsApp message naming
the bundle and its price, which reaches the clinic before the patient does and is itself the
evidence they came through the site. No code, voucher or counter process was invented.

Terms per the client, 2026-09-03: **no expiry date, one per person.** Both are recorded in
`lib/pricing.ts` and **deliberately not shown on the card**, at the client's direction the same
day. Do not add them back as a helpful clarification; that has already been done and undone once.

⚠️ **That makes briefing the front desk load-bearing rather than tidy.** The per-person cap is
now enforced entirely at the counter, and nothing on the page hints at it, so reception has to
know both that the offer exists and that it is once per patient.

Also outstanding: **all zh/ms bundle and sports massage copy is unreviewed.**
`lib/pricing.zh.ts`, `lib/pricing.ms.ts` and the two `sports-massage` records in
`lib/services.zh.ts` / `.ms.ts` are adapted from the clinic-reviewed English records and have
not been read by a native speaker. The pricing copy carries a commercial claim rather than
general prose, so get that checked before any paid traffic points at those locales.

## Locate Us — the How to Find Us walkthroughs (added 2026-09-05)

The client sent 21 Instagram slides ("Persistence - How to Find us") in three sets. They are now
the three photo routes at the foot of `/locate-us` (`lib/directions.ts` + `.zh.ts` / `.ms.ts`),
which the nav finally links to again as **"Locate Us"** — between 2026-08-01 and now, "Book Now"
went straight off-site to SweetPew, so a visitor could tap the one nav item that sounded like
"where are you" and never see the address at all.

Four things need the client:

1. **There is no slide 5.** The mall set runs 01, 02, 03, 04, 6, 7. A step may be missing
   between "turn left at Peng Chu" and "walk towards VO6" — the two published steps do join up
   plausibly, but nobody has walked it to check. **Ask whether a slide was dropped.**
2. ~~The slides print the unit with a letter O and the address is a digit zero.~~ **RESOLVED
   2026-09-05, THE OTHER WAY ROUND: the slides were right.** The client confirmed the unit is
   `VO6-G-02` with a LETTER O, and the repo had carried a digit zero since 2026-08-01. Every
   file now says letter O and `content.test.ts` fails on a stray digit-zero spelling.
   **⚠️ Still worth one check: what does the Google Business Profile itself say?** It is the
   anchor every other citation must match and it could not be read from here (Maps needs JS,
   and the live domain now serves this build, so reading it back is circular). The citations
   are genuinely split — the clinic's own Facebook and ClassPass say letter O, its own
   Instagram caption and three scraper directories say digit zero. If the GBP says digit zero,
   the GBP or the citations need changing, not just this repo.
3. **The Waze / Google Maps slide shows "5.0 (12)" reviews.** The profile is at 224. That slide
   is deliberately not used; the page renders live Maps and Waze links instead. **The slide
   should be re-exported or retired** before it goes out again.
4. **The zh/ms walkthrough copy is a first-pass draft, unreviewed.** Same standing as the zh/ms
   dictionaries. The route facts came off the client's own slides and are not in question; the
   wording has not been read by a native speaker.

The three title-card slides carry no information and are not used. The Waze link in
`lib/clinic.ts` is derived from `clinic.geo` rather than saved from a Waze place, so the pin
cannot drift from the address.
