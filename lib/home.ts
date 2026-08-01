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

/**
 * CAPITALISATION: the client asks for the two disciplines to read as proper nouns —
 * "Chiropractic", "Physiotherapy", "Chiropractors", "Physiotherapists" — wherever they name
 * the service. Applied to headings, card titles, labels and button text across the homepage.
 * Deliberately NOT applied inside running prose ("our chiropractor in Kuala Lumpur will put
 * together a chiropractic care plan"), where a mid-sentence capital reads as a typo rather
 * than as a brand convention. Extend it there only if the client asks a second time.
 */
export const homeIntro = {
  heading: 'Chiropractic and Physiotherapy, built around your spine.',
  body: [
    'Persistence Chiropractic Care is a trusted Chiropractic & Physiotherapy centre in Cheras, Kuala Lumpur that specialises in spinal adjustments and personalised hands-on care.',
    'We assess properly and explain what we find in plain terms, including the parts of your case that care is unlikely to change.',
  ],
}

/**
 * "What We Offer". Only two items exist in the live page source — the Wix carousel has no
 * more. Two is fine as a pair; do not pad it to three for symmetry.
 */
export const offers = [
  {
    title: 'Personalised Chiropractic Care',
    href: '/services/chiropractic-care',
    image: '/img/hero-adjustment.webp',
    alt: 'Gonstead chiropractic adjustment at Persistence Chiropractic Care, Cheras Kuala Lumpur',
    body: 'Based on your overall health, goals and lifestyle, our chiropractor in Kuala Lumpur will put together a chiropractic care plan for you. What that plan involves varies quite a bit from one patient to the next.',
  },
  {
    /**
     * RETITLED 2026-08-01 at the client's request, from "Initial consultation".
     *
     * Their reasoning is that X-ray analysis is what separates this clinic from other
     * chiropractic centres, and the generic title buried it. "X-Ray Analysis" is not a new
     * coinage — it is step five of the Gonstead method as the clinic already names it in
     * `gonstead.ts`, so the homepage and /services/chiropractic-care now use one term
     * for one thing.
     *
     * The title change forced the body and the photograph with it: a card headed "X-Ray
     * Analysis" carrying a general first-visit description and a photo of a neck exam is a
     * card that doesn't say what it claims to.
     */
    title: 'X-Ray Analysis',
    // Still /what-to-expect — imaging is described there in the first-visit sequence, and
    // the other card already takes /services/chiropractic-care. Two cards pointing at
    // one URL would waste the internal link.
    href: '/what-to-expect',
    // Line-marking a full-spine film on a lightbox: the analysis itself, not a generic
    // clinical stock shot. It was sitting unused in public/img, and it is the only image on
    // the site that shows this step — the hero's X-ray slides are conversations *about* a
    // film, which is a different moment.
    image: '/img/xray-assessment.webp',
    alt: 'Chiropractor marking up a full-spine X-ray on a lightbox at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    /**
     * Kept close to the clinic's own words for Gonstead step five, which is clinical process
     * they stand behind. Two things stay in deliberately: imaging happens when the case calls
     * for it rather than as a routine, and the referral line. Selling X-rays as a standard
     * part of every visit would be selling unnecessary radiation, and the differentiator the
     * client wants is the *analysis*, which is true without that claim.
     */
    body: 'X-Rays are read as part of the Gonstead assessment: they help rule out pathology, show the intervertebral discs and spinal joints, and tell your chiropractor where the problem sits and how it is best approached. We image when your case calls for it, and refer you on if another healthcare provider is better placed to help.',
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
