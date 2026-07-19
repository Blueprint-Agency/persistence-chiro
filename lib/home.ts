/**
 * Homepage content. VERBATIM from the live Wix homepage (extracted 2026-07-19, see
 * `content-migration/home.md`). Do not paraphrase — this copy carries the rankings.
 *
 * FAQs live in `faqs.ts` as `homeFaqs`, kept apart from `clinicFaqs` so the same question
 * never emits FAQPage schema on two routes.
 */

export const homeIntro = {
  heading: 'The Key to Achieve a Healthy, Pain-free Life.',
  body: [
    'Persistence Chiropractic Care is a trusted Chiropractic & Physiotherapy centre in Cheras, Kuala Lumpur that specialises in spinal adjustments and personalised hands-on treatments.',
    'With the aim of providing the utmost quality care, we take on a patient - focused approach to ensure every patient walks out with a genuine smile and better quality of life, free from pain.',
  ],
}

/**
 * "What We Offer". Only two items exist in the live page source — the Wix carousel has no
 * more. Two is fine as a pair; do not pad it to three for symmetry.
 */
export const offers = [
  {
    title: 'Personalised chiropractic care',
    href: '/chiropractic',
    image: '/img/hero-adjustment.webp',
    alt: 'Gonstead chiropractic adjustment at Persistence Chiropractic Care, Cheras Kuala Lumpur',
    body: 'Based on your overall health, treatment goals, and lifestyle, our chiropractor in Kuala Lumpur will create a suitable chiropractic care plan specifically made for you. No two patients are the same. Here at Persistence Chiropractic Care, we are persistently empowered to help our patients achieve optimal health.',
  },
  {
    title: 'Initial consultation',
    href: '/what-to-expect',
    image: '/img/consultation-assessment.webp',
    alt: 'Chiropractor assessing a patient posture before treatment in Cheras, Kuala Lumpur',
    body: "Understanding of the patient's medical conditions and health situation. A thorough chiropractic exam will be conducted, which includes posture analysis, instrumentation analysis, necessary imaging analysis, and palpation to examine the patient's current spinal health.",
  },
]

/**
 * Patient testimonials, verbatim from the live homepage.
 *
 * ⚠️ The first one names "Dr Derek", who is not on the current practitioner roster in
 * `clinic.ts`. It is published on the live site today, so it is migrated as-is rather
 * than silently dropped — but the clinic should confirm whether to keep a testimonial
 * crediting a chiropractor who no longer appears on /about-us. Six further testimonials
 * exist unrendered in the Wix page JSON; they are not used here because we don't know
 * whether they were approved for publication.
 */
export const testimonials = [
  {
    name: 'Beverley',
    /** Trimmed to the first two paragraphs; the full text runs five and buries the point. */
    quote:
      'Dr Derek practices the Gonstead chiropractic method, which encompasses a detailed set of procedures aimed at pinpointing the root causes of discomfort. After months of suffering from knee instability and weakness, I am grateful to have regained an active lifestyle thanks to Dr Derek!',
    detail:
      'With the X-Ray analysis, he has also identified other spinal issues that would have gone unnoticed and leading to detrimental consequences in the future.',
  },
  {
    name: 'Yeow Rong Low',
    quote:
      'Went for 4 sessions and have been noticing improvements after each adjustment by Dr. Valerie! I always feel my lower back is tense and used to "crack" myself every night before I sleep and since then I didn\'t feel like cracking my lower back on my bed anymore after the first adjustment.',
    detail:
      'Dr. Valerie is very patient with all my questions & concerns while being really friendly to explain everything to me in details. Highly recommended!',
  },
]

/** Trust marks. Files are trimmed exports of the logos already on the live homepage. */
export const accreditations = [
  { src: '/img/accred-acm.png', alt: 'Association of Chiropractic Malaysia', width: 226, height: 196 },
  {
    src: '/img/accred-gonstead-australia.png',
    alt: 'Gonstead Chiropractic Society Australia',
    width: 240,
    height: 62,
  },
  { src: '/img/accred-accp.png', alt: 'ACCP accredited', width: 240, height: 78 },
  {
    src: '/img/accred-best-services-2023.png',
    alt: 'Best Services 2023 award',
    width: 240,
    height: 206,
  },
]

/** Blog teaser artwork, keyed by slug. Only the three the homepage features. */
export const postImages: Record<string, string> = {
  'spike-higher-play-longer': '/img/post-spike-higher.webp',
  'chiropractic-care-through-the-stages-of-a-woman-s-life': '/img/post-womans-life.webp',
  'are-house-chores-a-pain-in-the-back-here-s-what-chiropractors-say': '/img/post-house-chores.webp',
}
