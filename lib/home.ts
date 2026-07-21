/**
 * Homepage content. Sourced from the live Wix homepage (extracted 2026-07-19, see
 * `content-migration/home.md`), with outcome promises REWRITTEN 2026-07-21.
 *
 * The original heading ("Pain-free Life") and body ("ensure every patient walks out ...
 * free from pain") guaranteed results the clinic cannot promise. Keyword intent is
 * preserved — Cheras/KL and the chiropractic + physiotherapy pairing are untouched, and
 * the h1 in `app/page.tsx` still carries "Chiropractor in Cheras" — so nothing that
 * carries the rankings has been dropped.
 *
 * FAQs live in `faqs.ts` as `homeFaqs`, kept apart from `clinicFaqs` so the same question
 * never emits FAQPage schema on two routes.
 */

export const homeIntro = {
  heading: 'Chiropractic and physiotherapy, built around your spine.',
  body: [
    'Persistence Chiropractic Care is a trusted Chiropractic & Physiotherapy centre in Cheras, Kuala Lumpur that specialises in spinal adjustments and personalised hands-on treatments.',
    'We take a patient-focused approach: assess properly, explain what we find in plain terms, and be straightforward about what care can and cannot change in your case.',
  ],
}

/**
 * "What We Offer". Only two items exist in the live page source — the Wix carousel has no
 * more. Two is fine as a pair; do not pad it to three for symmetry.
 */
export const offers = [
  {
    title: 'Personalised chiropractic care',
    href: '/services/chiropractic-treatment',
    image: '/img/hero-adjustment.webp',
    alt: 'Gonstead chiropractic adjustment at Persistence Chiropractic Care, Cheras Kuala Lumpur',
    body: 'Based on your overall health, treatment goals, and lifestyle, our chiropractor in Kuala Lumpur will create a suitable chiropractic care plan specifically made for you. No two patients are the same, so no two care plans are either.',
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
