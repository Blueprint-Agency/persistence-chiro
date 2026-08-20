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
 *
 * Wix exported every logo onto a padded square canvas, so a wide wordmark like Panasonic
 * filled only 12% of its own height. Capping those canvases to one shared CSS height made
 * such logos render a fraction of the size of the full-bleed ones. The files have since
 * been trimmed to the mark itself, and `w`/`h` below are the real post-trim pixel
 * dimensions — they feed `next/image` so each logo keeps its true aspect ratio. Re-trim
 * (and update these numbers) if a logo is ever replaced with a fresh padded export.
 */

export type Partner = { file: string; name: string; w: number; h: number }

/** Prominent partners — rendered larger, first. */
export const keyPartners: Partner[] = [
  { file: '/img/partners/key-1.webp', name: 'Sunway Medical Centre Velocity', w: 370, h: 131 },
  { file: '/img/partners/key-2.webp', name: 'Lunox Mattress', w: 350, h: 106 },
  { file: '/img/partners/key-3.webp', name: 'ANEW Level Up', w: 393, h: 139 },
]

/** Brands and organisations the clinic has worked with — the logo wall. */
export const partners: Partner[] = [
  { file: '/img/partners/partner-1.webp', name: 'AF Sunway Visio', w: 399, h: 400 },
  { file: '/img/partners/partner-2.webp', name: 'Shopee', w: 182, h: 260 },
  { file: '/img/partners/partner-3.webp', name: 'BIG Pharmacy', w: 359, h: 113 },
  { file: '/img/partners/partner-4.webp', name: 'Hoju', w: 255, h: 150 },
  { file: '/img/partners/partner-5.webp', name: 'Face Bar', w: 208, h: 263 },
  { file: '/img/partners/partner-6.webp', name: 'The Ori Theory', w: 234, h: 112 },
  { file: '/img/partners/partner-7.webp', name: 'Seiketsu', w: 285, h: 288 },
  { file: '/img/partners/partner-8.webp', name: 'Maxis', w: 295, h: 128 },
  { file: '/img/partners/partner-9.webp', name: 'Spritzer', w: 360, h: 103 },
  { file: '/img/partners/partner-10.webp', name: 'DKSH', w: 391, h: 400 },
  { file: '/img/partners/partner-11.webp', name: 'Beyond Food', w: 291, h: 292 },
  { file: '/img/partners/partner-12.webp', name: 'Ti-Ratana Welfare Society', w: 349, h: 84 },
  { file: '/img/partners/partner-13.webp', name: 'Tricor', w: 242, h: 79 },
  { file: '/img/partners/partner-15.webp', name: 'Panasonic', w: 312, h: 48 },
  { file: '/img/partners/partner-16.webp', name: 'Reebok', w: 360, h: 184 },
  { file: '/img/partners/partner-17.webp', name: 'KL Wellness City', w: 335, h: 196 },
  { file: '/img/partners/partner-18.webp', name: 'Recogen', w: 282, h: 102 },
  { file: '/img/partners/partner-19.webp', name: 'Hello Dental Clinic', w: 226, h: 114 },
  { file: '/img/partners/partner-20.webp', name: 'Exoteric', w: 326, h: 326 },
  { file: '/img/partners/partner-21.webp', name: 'UOB', w: 255, h: 73 },
  { file: '/img/partners/partner-22.webp', name: 'Oatside', w: 290, h: 52 },
  { file: '/img/partners/partner-23.webp', name: 'Young Living', w: 253, h: 77 },
  { file: '/img/partners/partner-24.webp', name: 'myFeet', w: 214, h: 54 },
  { file: '/img/partners/partner-25.webp', name: 'Smart View Vision Optometry', w: 233, h: 65 },
  { file: '/img/partners/partner-26.webp', name: 'Naturenite', w: 364, h: 182 },
]
