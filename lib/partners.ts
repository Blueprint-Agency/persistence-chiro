/**
 * Partner and sponsor logos, migrated from the live Wix /our-partners page (pulled
 * 2026-07-22). The live page groups them as three "key partners" and a wall of brands the
 * clinic has "worked with"; that split is preserved here.
 *
 * Names were read from the logos themselves — the live site carries no alt text or
 * captions, so a few may need the clinic's confirmation (flagged in the handover notes).
 * The decorative "and more…" tile from the live wall is deliberately dropped; the grid
 * ends with a short line of copy instead.
 *
 * Logos are third-party marks shown with permission implied by their existing publication
 * on the clinic's own site. They are NOT clinic imagery, so the local-modifier alt rule in
 * AGENTS.md does not apply — "<name> logo" is the correct, accessible alt here.
 */

export type Partner = { file: string; name: string }

/** Prominent partners — rendered larger, first. */
export const keyPartners: Partner[] = [
  { file: '/img/partners/key-1.webp', name: 'Sunway Medical Centre Velocity' },
  { file: '/img/partners/key-2.webp', name: 'Lunox Mattress' },
  { file: '/img/partners/key-3.webp', name: 'ANEW Level Up' },
]

/** Brands and organisations the clinic has worked with — the logo wall. */
export const partners: Partner[] = [
  { file: '/img/partners/partner-1.webp', name: 'AF Sunway Visio' },
  { file: '/img/partners/partner-2.webp', name: 'Shopee' },
  { file: '/img/partners/partner-3.webp', name: 'BIG Pharmacy' },
  { file: '/img/partners/partner-4.webp', name: 'Hoju' },
  { file: '/img/partners/partner-5.webp', name: 'Face Bar' },
  { file: '/img/partners/partner-6.webp', name: 'The Ori Theory' },
  { file: '/img/partners/partner-7.webp', name: 'Seiketsu' },
  { file: '/img/partners/partner-8.webp', name: 'Maxis' },
  { file: '/img/partners/partner-9.webp', name: 'Spritzer' },
  { file: '/img/partners/partner-10.webp', name: 'DKSH' },
  { file: '/img/partners/partner-11.webp', name: 'Beyond Food' },
  { file: '/img/partners/partner-12.webp', name: 'Ti-Ratana Welfare Society' },
  { file: '/img/partners/partner-13.webp', name: 'Tricor' },
  { file: '/img/partners/partner-15.webp', name: 'Panasonic' },
  { file: '/img/partners/partner-16.webp', name: 'Reebok' },
  { file: '/img/partners/partner-17.webp', name: 'KL Wellness City' },
  { file: '/img/partners/partner-18.webp', name: 'Recogen' },
  { file: '/img/partners/partner-19.webp', name: 'Hello Dental Clinic' },
  { file: '/img/partners/partner-20.webp', name: 'Exoteric' },
  { file: '/img/partners/partner-21.webp', name: 'UOB' },
  { file: '/img/partners/partner-22.webp', name: 'Oatside' },
  { file: '/img/partners/partner-23.webp', name: 'Young Living' },
  { file: '/img/partners/partner-24.webp', name: 'myFeet' },
  { file: '/img/partners/partner-25.webp', name: 'Smart View Vision Optometry' },
  { file: '/img/partners/partner-26.webp', name: 'Naturenite' },
]
