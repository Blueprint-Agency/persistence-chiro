/**
 * Service pages — modality-first, commercial intent ("dry needling near me").
 *
 * Replaces the old `physiotherapy.ts`. The proposal (`seo-proposal.html`, Cycle 1 Pages
 * tab) specifies five service pages under a single `/services/*` namespace rather than the
 * previous split between a standalone `/chiropractic` page and four `/physiotherapy/*`
 * modality pages. Seven live Wix services had already been folded to four; those four now
 * fold to five alongside chiropractic:
 *
 *   /chiropractic                      -> /services/chiropractic-treatment
 *   /physiotherapy                     -> /services/physiotherapy
 *   /physiotherapy/dry-needling        -> /services/dry-needling
 *   /physiotherapy/sports-rehab        -> /services/sports-injury-rehabilitation
 *   /physiotherapy/manual-therapy      -> folded into /services/physiotherapy
 *   /physiotherapy/rehab-programming   -> folded into /services/sports-injury-rehabilitation
 *   /conditions/sports-injury          -> folded into /services/sports-injury-rehabilitation
 *   (new)                              -> /services/posture-correction
 *
 * manual-therapy and rehab-programming have no slot in the proposal's five, and neither
 * had enough distinct search intent to justify keeping a thin page alive. Their section
 * copy folds in verbatim so nothing is lost — same approach as the original Wix fold-down.
 *
 * Sports injury moves from a *condition* to a *service*. The proposal lists it under
 * services and its eight conditions do not include it; keeping both would have put two
 * pages on one intent, which is the cannibalisation the architecture exists to prevent.
 *
 * CLAIM RULE: no page here may promise a cure, fix or guaranteed outcome. Enforced by
 * `content.test.ts`. See the hedging house style in `conditions.ts`.
 */

export type Service = {
  slug: string
  /** <h1>. Must be unique across the site. */
  title: string
  /** <title>. Keep under ~60 chars so it isn't truncated in the SERP. */
  metaTitle: string
  metaDescription: string
  /** Primary keyword this page owns. No two pages may share one. */
  targetKeyword: string
  /** Lead paragraph under the h1. */
  intro: string
  /** Service blocks. First one is the page's primary service. */
  sections: { heading: string; body: string }[]
  /** Condition slugs this service is used for — the cross-link back into /conditions. */
  treats: string[]
  faqs: { q: string; a: string }[]
  /**
   * True when the service has a hand-built route file instead of rendering through
   * app/services/[slug]/page.tsx. Only chiropractic-treatment does: it carries the
   * Gonstead six-step walkthrough, which is a bespoke layout rather than section blocks.
   * Excluded from generateStaticParams so the two routes can't collide at build time.
   */
  dedicatedRoute?: boolean
  draft: boolean
}

export const servicesIntro =
  'Chiropractic care, physiotherapy and targeted rehabilitation under one roof in Cheras. Which one suits you depends on what the assessment finds. A fair number of patients end up having both, and we will tell you where to start on your first visit.'

export const services: Service[] = [
  {
    slug: 'chiropractic-treatment',
    title: 'Chiropractic Treatment in Cheras, Kuala Lumpur',
    metaTitle: 'Chiropractic Treatment in Cheras, KL | Persistence',
    metaDescription:
      'Gonstead chiropractic in Cheras, Maluri. Detailed spinal assessment and precise hands-on adjustment for bone and body alignment.',
    targetKeyword: 'bone alignment near me',
    intro:
      'Gonstead chiropractic care in Cheras. We assess the spine segment by segment before anything is adjusted, so treatment goes to whichever segment is actually driving your problem. That is not always where you feel it.',
    sections: [
      {
        heading: 'Gonstead spinal assessment',
        body: 'A full six-step analysis: history, visualisation, instrumentation, palpation, X-ray analysis where indicated, and only then adjustment. Working through it in that order narrows the search down before any force is applied.',
      },
      {
        heading: 'Hands-on spinal adjustment',
        body: 'Adjustments are delivered precisely and skilfully by hand only, targeted at the specific segment identified during assessment. What one patient gets is rarely what the next one gets, because the assessments come out differently.',
      },
      {
        heading: 'Bone and body alignment',
        body: 'Where segments have become restricted, adjustment aims to improve how well they move. How much changes, and over what period, depends on what is causing the restriction and how long it has been there.',
      },
    ],
    treats: ['back-pain', 'slipped-disc', 'sciatica', 'neck-pain', 'scoliosis'],
    faqs: [
      {
        q: 'What is the Gonstead method?',
        a: 'Gonstead is a chiropractic technique built around a detailed six-step assessment before any adjustment is made. That includes instrumentation and, where indicated, X-ray analysis. The aim is to identify precisely which segment is involved rather than treating the region generally.',
      },
      {
        q: 'Do I need an X-ray before chiropractic treatment?',
        a: 'Not always. X-rays help identify how each spinal segment sits and can rule out pathologies, but they are not mandatory, and we often go without one for pregnant women and children. Your chiropractor will explain whether imaging is appropriate in your case and why.',
      },
      {
        q: 'Is chiropractic the same as bone setting or tit tar?',
        a: 'No. Chiropractic is a regulated healthcare profession with formal university training, and assessment comes before treatment. Traditional bone setting works differently and is not regulated in the same way. We would encourage you to ask any practitioner about their qualifications before treatment.',
      },
    ],
    dedicatedRoute: true,
    draft: false,
  },
  {
    slug: 'dry-needling',
    title: 'Integrative Dry Needling in Cheras, Kuala Lumpur',
    metaTitle: 'Dry Needling in Cheras, KL | Persistence Chiropractic',
    metaDescription:
      'Integrative dry needling to release deep muscular tension, improve activation patterns and support recovery. Cheras, Maluri.',
    targetKeyword: 'dry needling near me',
    intro:
      'Dry needling in Cheras. A neuromuscular technique that uses fine needles to reach trigger points and bands of muscular tension which are difficult to release by hand alone.',
    sections: [
      {
        heading: 'Integrative Dry Needling',
        body: 'Advanced neuromuscular technique used to release deep muscular tension, improve activation patterns, and support recovery.',
      },
      {
        heading: 'What a session involves',
        body: 'Fine needles are placed into the muscle at the points identified during assessment. Most patients describe a brief twitch or dull ache rather than sharp pain. Some soreness for a day afterwards is common and settles on its own.',
      },
    ],
    treats: ['sciatica', 'neck-pain', 'shoulder-imbalance'],
    faqs: [
      {
        q: 'Is dry needling the same as acupuncture?',
        a: 'They use similar needles but come from different traditions. Dry needling is based on Western anatomy and aims at specific trigger points in muscle. Acupuncture follows traditional Chinese meridian theory, and treats points that have nothing to do with where the muscle tension sits.',
      },
      {
        q: 'Does dry needling hurt?',
        a: 'Most patients report a brief twitch response or a dull ache rather than sharp pain. Mild soreness afterwards is common. Tell your practitioner if anything feels worse than uncomfortable, because the technique can be adjusted.',
      },
    ],
    draft: false,
  },
  {
    slug: 'physiotherapy',
    title: 'Physiotherapy in Cheras, Kuala Lumpur',
    metaTitle: 'Physio in Cheras, KL | Persistence Chiropractic',
    metaDescription:
      'Physiotherapy in Cheras, Maluri. Manual therapy, joint mobilisation, gait and movement assessment, and corrective exercise programmes.',
    targetKeyword: 'physio cheras',
    intro:
      'Physiotherapy in Cheras, pairing hands-on treatment with corrective exercise. Once a joint is moving more freely, the exercise work aims to rebuild the strength and control that help keep it that way.',
    sections: [
      {
        heading: 'Precision Manual Therapy',
        body: 'Refined hands-on techniques including joint mobilization and myofascial release aimed at improving joint mechanics and easing pain with precision.',
      },
      {
        heading: 'Biomechanical, Orthotics & Movement Analysis',
        body: 'Detailed assessment of posture, gait, and functional movement patterns to help identify contributing factors and improve mechanical efficiency.',
      },
      {
        heading: 'Corrective exercise programming',
        body: 'Progressive plans tailored to your condition, goals and lifestyle. Most of the lasting change tends to come from the exercise, so we prescribe it rather than suggest it.',
      },
    ],
    treats: ['back-pain', 'slipped-disc', 'neck-pain', 'sciatica', 'scoliosis', 'migraine'],
    faqs: [
      {
        q: 'Do I need physiotherapy if my pain is not severe?',
        a: 'Physiotherapy is not only for severe injuries. Assessing a problem early often means it is easier to manage before it becomes chronic or recurring.',
      },
      {
        q: 'Should I see a chiropractor or a physiotherapist?',
        a: 'It depends what the assessment finds. Broadly, chiropractic works on how a restricted joint moves and physiotherapy works on the strength and control around it. Many patients benefit from both. If you are unsure, message us your main concern and we will point you to the right starting point.',
      },
    ],
    draft: false,
  },
  {
    slug: 'sports-injury-rehabilitation',
    title: 'Sports Injury & Rehabilitation in Cheras, Kuala Lumpur',
    metaTitle: 'Sports Injury Treatment in Cheras, KL | Persistence',
    metaDescription:
      'Sports injury assessment, rehabilitation and return-to-sport programming in Cheras, Maluri. Sprains, strains and overuse injuries.',
    targetKeyword: 'sports injury treatment malaysia',
    intro:
      'Sports injury care in Cheras. We assess what failed and why, then work through staged rehabilitation aimed at getting you back to your sport without carrying the same weakness into it.',
    sections: [
      {
        heading: 'Performance & Sports Rehabilitation',
        body: 'Comprehensive injury management and return-to-sport protocols focused on rebuilding strength, agility, and movement control, with attention to reducing reinjury risk.',
      },
      {
        heading: 'Therapeutic Modalities & Recovery Technologies',
        body: 'Evidence-based adjunct therapies used to support pain modulation, tissue repair, and rehabilitation.',
      },
      {
        heading: 'Individualised Rehabilitation Programming',
        body: 'Strategically designed, progressive rehabilitation plans tailored to your condition, goals, and lifestyle aimed at supporting an efficient and sustainable recovery.',
      },
      {
        heading: 'Spinal & Core Stability Conditioning',
        body: 'Targeted training to enhance deep stabilising muscle function, with the aim of improving spinal support, resilience, and long-term durability.',
      },
    ],
    treats: ['back-pain', 'shoulder-imbalance', 'hip-pain'],
    faqs: [
      {
        q: 'How soon after an injury should I be assessed?',
        a: 'Once the acute swelling has settled enough to move the area, an assessment is usually more informative. If you cannot put weight through the limb, or there is obvious deformity or severe swelling, go to A&E first rather than booking with us.',
      },
      {
        q: 'When can I return to my sport?',
        a: 'That depends on the injury, the sport and how rehabilitation progresses, and we will not give you a date at the first visit. Returning before the area tolerates the load is the most common reason an injury recurs.',
      },
    ],
    draft: false,
  },
  {
    slug: 'posture-correction',
    title: 'Posture Correction in Cheras, Kuala Lumpur',
    metaTitle: 'Posture Correction in Cheras, KL | Persistence',
    metaDescription:
      'Posture assessment and correction for desk workers in Cheras, Maluri. Sitting posture, workstation setup and corrective exercise.',
    targetKeyword: 'sit posture correction',
    intro:
      'Posture work for desk workers in Cheras. We assess how you actually sit and move, then combine strength work with practical workstation changes so that a better position becomes sustainable instead of something you have to keep remembering.',
    sections: [
      {
        heading: 'Postural assessment',
        body: 'We look at how you sit, stand and move rather than at a single photograph. Posture is as much habit as structure, so the position you hold through a working day tells us more than the one you can manage for thirty seconds in a clinic.',
      },
      {
        heading: 'Sitting posture and workstation setup',
        body: 'Practical changes to chair height, screen position and desk setup, based on where you actually work. With most of the desk-related complaints we see, the trouble comes from holding any one position for too long.',
      },
      {
        heading: 'Corrective exercise',
        body: 'Targeted strength and mobility work for the muscles that hold a position over a working day. No single treatment changes posture on its own. The exercise is what carries the work between visits.',
      },
    ],
    treats: ['neck-pain', 'shoulder-imbalance', 'back-pain'],
    faqs: [
      {
        q: 'Can posture actually be corrected?',
        a: 'Not in the way most people mean it. Comfort often improves, and patients tend to find they can hold a better position for longer before it starts to feel like work. Your practitioner will tell you honestly what is likely to shift in your case and what is not.',
      },
      {
        q: 'I sit at a desk all day. Is that the cause?',
        a: 'Prolonged sitting is a common contributor, though rarely the only one. Movement breaks generally matter more than any single "correct" position. The body copes with most positions reasonably well until you stay in one of them for hours.',
      },
      {
        q: 'Will a posture brace help?',
        a: 'Braces can act as a reminder, but they do not build the strength needed to hold a position without one, and relying on a brace long-term is not something we would recommend without assessment. Ask your practitioner before buying one.',
      },
    ],
    draft: false,
  },
]

export const publishedServices = () => services.filter((s) => !s.draft)
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
/** Services rendered by app/services/[slug]/page.tsx — excludes hand-built routes. */
export const templatedServices = () => publishedServices().filter((s) => !s.dedicatedRoute)
