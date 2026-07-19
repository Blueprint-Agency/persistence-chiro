/**
 * Condition pages — symptom-first intent ("back pain treatment KL").
 *
 * Shape is fixed (symptoms -> how we treat -> FAQ), so this is typed data rather than
 * MDX: it gives us FAQPage schema for free and stops the six pages drifting apart.
 * Blog prose stays MDX; this does not.
 *
 * `body` and `faqs` are the clinical copy that must come from the clinic — see
 * `proposed-site-architecture.md` § Content migration. Pages with `draft: true` are
 * excluded from the sitemap and nav until that copy lands, so we never ship a thin
 * indexed page.
 */

export type Condition = {
  slug: string
  /** <h1>. Must be unique across the site. */
  title: string
  /** <title>. Keep under ~60 chars so it isn't truncated in the SERP. */
  metaTitle: string
  metaDescription: string
  /** Primary keyword this page owns. No two pages may share one. */
  targetKeyword: string
  /** Slugs of conditions to cross-link. Two each, per the internal-linking rules. */
  related: string[]
  /** Physiotherapy modality slugs that treat this condition. */
  treatedBy: string[]
  faqs: { q: string; a: string }[]
  draft: boolean
}

export const conditions: Condition[] = [
  {
    slug: 'back-pain',
    title: 'Back Pain Treatment in Cheras, Kuala Lumpur',
    metaTitle: 'Back Pain Treatment in Cheras, KL | Persistence Chiropractic',
    metaDescription:
      'Gonstead chiropractic care for lower and upper back pain in Cheras, Maluri. Assessment, adjustment and rehab from registered chiropractors.',
    targetKeyword: 'back pain treatment kl',
    related: ['slipped-disc', 'sciatica'],
    treatedBy: ['manual-therapy', 'rehab-programming'],
    faqs: [],
    draft: true,
  },
  {
    slug: 'slipped-disc',
    title: 'Slipped Disc Treatment in Cheras, Kuala Lumpur',
    metaTitle: 'Slipped Disc Treatment in KL | Persistence Chiropractic',
    metaDescription:
      'Non-surgical slipped disc (herniated disc) care in Cheras, Maluri. Gonstead assessment, X-ray analysis and a staged treatment plan.',
    targetKeyword: 'slipped disc treatment malaysia',
    related: ['back-pain', 'sciatica'],
    treatedBy: ['manual-therapy', 'rehab-programming'],
    faqs: [],
    draft: true,
  },
  {
    slug: 'sciatica',
    title: 'Sciatica Treatment in Cheras, Kuala Lumpur',
    metaTitle: 'Sciatica Treatment in Cheras, KL | Persistence Chiropractic',
    metaDescription:
      'Sciatic nerve pain relief through Gonstead chiropractic and targeted rehab. Registered chiropractors in Cheras, Maluri.',
    targetKeyword: 'sciatica treatment',
    related: ['slipped-disc', 'back-pain'],
    treatedBy: ['dry-needling', 'manual-therapy'],
    faqs: [],
    draft: true,
  },
  {
    slug: 'scoliosis',
    title: 'Scoliosis Care in Cheras, Kuala Lumpur',
    metaTitle: 'Scoliosis Treatment in KL | Persistence Chiropractic',
    metaDescription:
      'Scoliosis assessment and chiropractic management in Cheras, Maluri. Postural analysis, X-ray review and conditioning programmes.',
    targetKeyword: 'scoliosis treatment malaysia',
    related: ['neck-pain-posture', 'back-pain'],
    treatedBy: ['rehab-programming'],
    faqs: [],
    draft: true,
  },
  {
    slug: 'neck-pain-posture',
    title: 'Neck Pain & Posture Correction in Cheras, Kuala Lumpur',
    metaTitle: 'Neck Pain & Posture Correction in KL | Persistence Chiropractic',
    metaDescription:
      'Neck pain, tech neck and posture correction for desk workers in Cheras, Maluri. Gonstead chiropractic plus ergonomic guidance.',
    targetKeyword: 'neck pain treatment kuala lumpur',
    related: ['back-pain', 'scoliosis'],
    treatedBy: ['dry-needling', 'manual-therapy'],
    faqs: [],
    draft: true,
  },
  {
    slug: 'sports-injury',
    title: 'Sports Injury Treatment in Cheras, Kuala Lumpur',
    metaTitle: 'Sports Injury Chiropractic in KL | Persistence Chiropractic',
    metaDescription:
      'Sports injury assessment, treatment and return-to-play rehab in Cheras, Maluri. Chiropractic and physiotherapy under one roof.',
    targetKeyword: 'sports injury chiropractic',
    related: ['back-pain', 'neck-pain-posture'],
    treatedBy: ['sports-rehab', 'dry-needling'],
    faqs: [],
    draft: true,
  },
]

export const publishedConditions = () => conditions.filter((c) => !c.draft)
export const conditionBySlug = (slug: string) => conditions.find((c) => c.slug === slug)
