/**
 * Physiotherapy modality pages — modality-first intent ("dry needling kuala lumpur").
 *
 * All `sections` copy is VERBATIM from the live Wix /our-services page (extracted
 * 2026-07-19 from the Wix page JSON). Do not paraphrase.
 *
 * The live site lists seven physio services. Seven near-identical thin pages would rank
 * worse than four substantial ones, so three fold in — each folded service keeps its own
 * heading and its own verbatim text as a section, so nothing is lost:
 *   Therapeutic Modalities & Recovery Technologies -> sports-rehab
 *   Spinal & Core Stability Conditioning           -> rehab-programming
 *   Biomechanical, Orthotics & Movement Analysis   -> manual-therapy
 */

export const physiotherapyIntro =
  'Rebuilding strength and restoring mobility through evidence-based physiotherapy. Our physiotherapist delivers personalised treatment plans combining manual therapy, corrective exercises, and functional rehabilitation to help you recover faster and move with confidence.'

export type Modality = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  targetKeyword: string
  /** Verbatim service blocks from the live site. First one is the page's primary service. */
  sections: { heading: string; body: string }[]
  /** Condition slugs this modality treats — the cross-link back into /conditions. */
  treats: string[]
  draft: boolean
}

export const modalities: Modality[] = [
  {
    slug: 'dry-needling',
    title: 'Integrative Dry Needling in Cheras, Kuala Lumpur',
    metaTitle: 'Dry Needling in Cheras, KL | Persistence Chiropractic',
    metaDescription:
      'Integrative dry needling to release deep muscular tension, improve activation patterns and accelerate recovery. Cheras, Maluri.',
    targetKeyword: 'dry needling kuala lumpur',
    sections: [
      {
        heading: 'Integrative Dry Needling',
        body: 'Advanced neuromuscular technique used to release deep muscular tension, improve activation patterns, and accelerate recovery.',
      },
    ],
    treats: ['sciatica', 'neck-pain-posture', 'sports-injury'],
    draft: false,
  },
  {
    slug: 'manual-therapy',
    title: 'Precision Manual Therapy in Cheras, Kuala Lumpur',
    metaTitle: 'Manual Therapy in Cheras, KL | Persistence Chiropractic',
    metaDescription:
      'Joint mobilisation, myofascial release and full biomechanical and gait assessment in Cheras, Maluri.',
    targetKeyword: 'manual therapy kuala lumpur',
    sections: [
      {
        heading: 'Precision Manual Therapy',
        body: 'Refined hands-on techniques including joint mobilization and myofascial release to restore optimal joint mechanics and reduce pain with precision.',
      },
      {
        heading: 'Biomechanical, Orthotics & Movement Analysis',
        body: 'Detailed assessment of posture, gait, and functional movement patterns to identify root causes and optimise mechanical efficiency.',
      },
    ],
    treats: ['back-pain', 'slipped-disc', 'neck-pain-posture'],
    draft: false,
  },
  {
    slug: 'sports-rehab',
    title: 'Performance & Sports Rehabilitation in Cheras, Kuala Lumpur',
    metaTitle: 'Sports Rehabilitation in Cheras, KL | Persistence Chiropractic',
    metaDescription:
      'Injury management and return-to-sport protocols restoring strength, agility and movement control. Cheras, Maluri.',
    targetKeyword: 'sports rehabilitation kuala lumpur',
    sections: [
      {
        heading: 'Performance & Sports Rehabilitation',
        body: 'Comprehensive injury management and return-to-sport protocols focused on restoring peak strength, agility, and movement control while minimising reinjury risk.',
      },
      {
        heading: 'Therapeutic Modalities & Recovery Technologies',
        body: 'Evidence-based adjunct therapies to enhance pain modulation, tissue repair, and rehabilitation outcomes.',
      },
    ],
    treats: ['sports-injury', 'back-pain'],
    draft: false,
  },
  {
    slug: 'rehab-programming',
    title: 'Individualised Rehabilitation Programming in Cheras, Kuala Lumpur',
    metaTitle: 'Rehabilitation Programming in KL | Persistence Chiropractic',
    metaDescription:
      'Progressive rehabilitation plans and spinal and core stability conditioning tailored to your condition and goals. Cheras, Maluri.',
    targetKeyword: 'rehabilitation programme kuala lumpur',
    sections: [
      {
        heading: 'Individualised Rehabilitation Programming',
        body: 'Strategically designed, progressive rehabilitation plans tailored to your condition, goals, and lifestyle — ensuring efficient and sustainable recovery.',
      },
      {
        heading: 'Spinal & Core Stability Conditioning',
        body: 'Targeted training to enhance deep stabilising muscle function, improving spinal support, resilience, and long-term durability.',
      },
    ],
    treats: ['back-pain', 'slipped-disc', 'scoliosis'],
    draft: false,
  },
]

export const publishedModalities = () => modalities.filter((m) => !m.draft)
export const modalityBySlug = (slug: string) => modalities.find((m) => m.slug === slug)
