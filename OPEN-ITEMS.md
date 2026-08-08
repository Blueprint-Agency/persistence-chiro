# Open items

Work that is **blocked on a person, an asset or an access grant** — not on code. Every
item below has its reasoning recorded in a comment next to the thing it governs; this file
exists so the list can be found in one place instead of stumbled upon in four.

Last updated **2026-08-08**, after the services and conditions revamp.

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

## 5. Sports massage — needs a yes or no from the clinic

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

## 6. Pricing — a client decision, not an SEO one

Pricing stays off the site on volume grounds. Every pricing keyword measured between 0 and
50/mo in Malaysia, and the only term clearing 50 was `home physiotherapy price`, which is a
service the clinic does not offer.

But both strong chiropractic competitors publish theirs (Ian The Chiro RM150 consultation /
RM120 adjustment; Osso RM70 consultation / RM250 chiro-plus-physio), and no physiotherapy
competitor does. So it remains a **conversion** question worth putting to the clinic, even
though it is not a search one. If a figure is ever approved, the FAQ is where it belongs, not
a dedicated section.
