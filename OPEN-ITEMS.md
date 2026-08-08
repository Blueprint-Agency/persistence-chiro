# Open items

Work that is **blocked on a person, an asset or an access grant** — not on code. Every
item below has its reasoning recorded in a comment next to the thing it governs; this file
exists so the list can be found in one place instead of stumbled upon in four.

Last updated **2026-08-08**, after the services and conditions revamp.

> Keep this file honest. When an item is resolved, delete it here *and* remove the
> corresponding gate or comment in the code. A stale blocker is worse than no list.

---

## 1. Condition reviewer bylines — needs Valerie Na

`lastReviewed` is unset on all eight entries in `lib/conditions.ts`, so no "Reviewed by"
byline and no `reviewedBy` schema renders anywhere under `/conditions`.

This is deliberate. The field asserts that a named, registered practitioner read that page
on that date, and no such review has happened. Setting it to make the byline appear would
fabricate an E-E-A-T signal — the same reasoning behind `registrationsVerified` and
`googleReviews.verified` in `lib/clinic.ts`.

**One confirmation from Valerie that she has read the clinical copy turns the byline and the
schema on for all eight pages at once.** Cheapest remaining E-E-A-T win on the site, and it
costs a conversation rather than a commit.

## 2. Physiotherapist names — blocked until probation ends

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

## 3. Three other team sections — needs a scope-of-practice answer

`/services/dry-needling`, `/services/sports-injury-rehabilitation` and
`/services/posture-correction` still render "Meet your chiropractors". If physiotherapists
deliver any of those, the same misrepresentation as item 2 applies.

**Ask which of the three are physio-delivered**, then set `practitionersWithheld` on those.
One line per page now the field exists.

## 4. Condition hero photography — needs assets

`PageHero` is text-only, so all eight condition pages fall back to the sitewide shopfront OG
card when shared. `heroImage` / `ogImage` are declared on the `Condition` type but left unset
on purpose, because pointing them at an image nothing renders would be a lie in the data.

Two things unblock together when real photos exist:

- Give conditions a hero slot (the shared `<ServiceHero>` in `components/service.tsx` is the
  obvious thing to reuse), then generate 1200x630 OG crops from each hero.
- Replace the animated `ConcernIllustration` diagrams on the service pages. The client finds
  them weak and prefers photographs, as on `/services/dry-needling`. The `Outcome` type in
  `lib/services.ts` already supports `image`, so that swap is **data-only** once photos land.

## 5. Google Search Console access — needs the clinic

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

## 6. Sports massage — needs a yes or no from the clinic

`sports massage kl` runs **170/mo at difficulty 8 with commercial intent**, and competitors
bid on it. It is the best untapped keyword found anywhere on this site.

`/services/sports-injury-rehabilitation` currently targets `sports injury treatment malaysia`
at **10/mo**, kept deliberately (client, 2026-08-08) because every localised variant measured
worse, not better: `sports injury treatment kl` 0, `sports rehab kl` 0,
`sports physiotherapy kuala lumpur` 0, `sports injury clinic kuala lumpur` 10 (eleven of
twelve months at zero).

**If the clinic offers sports massage, retargeting that page is the single best remaining SEO
move.** If it does not, the page stays as it is and earns its place through internal linking
rather than search — low volume is not low value, since sprains still walk in via
`physio cheras`, the Business Profile and the condition pages.

## 7. Pricing — a client decision, not an SEO one

Pricing stays off the site on volume grounds. Every pricing keyword measured between 0 and
50/mo in Malaysia, and the only term clearing 50 was `home physiotherapy price`, which is a
service the clinic does not offer.

But both strong chiropractic competitors publish theirs (Ian The Chiro RM150 consultation /
RM120 adjustment; Osso RM70 consultation / RM250 chiro-plus-physio), and no physiotherapy
competitor does. So it remains a **conversion** question worth putting to the clinic, even
though it is not a search one. If a figure is ever approved, the FAQ is where it belongs, not
a dedicated section.
