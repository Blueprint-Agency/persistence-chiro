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
 * Patient testimonials, migrated from the live homepage.
 *
 * These render on the homepage. `ServiceTestimonials` in components/service.tsx used to
 * reuse them on all five service pages too; it was dead code (superseded by the dict-driven
 * `GoogleReviews` component) and was removed.
 *
 * TWO CLIENT DECISIONS, 2026-08-01, taken when "Dr" was dropped as a title for the clinic's
 * own practitioners:
 *
 * 1. The testimonial crediting "Dr Derek" was RETIRED. He is not on the practitioner roster
 *    in `clinic.ts`, so it pointed six pages at a chiropractor who no longer appears on
 *    /about — an open question in this file since migration, now settled.
 * 2. The remaining quote is verbatim except for the honorific, removed to match how the team
 *    is named everywhere else. Dropping "Dr." does not change what the patient said about
 *    their experience, and nothing else in the text was touched.
 *
 * ONE testimonial is not a healthy amount of social proof, and the layouts adapt to that
 * rather than fix it. Six further reviews sit unrendered in the Wix page JSON; they are
 * unused because nobody has confirmed they were approved for publication. Getting two or
 * three approved is the real fix, and it is outstanding client work.
 */
export const testimonials = [
  {
    name: 'Yeow Rong Low',
    quote:
      'Went for 4 sessions and have been noticing improvements after each adjustment by Valerie! I always feel my lower back is tense and used to "crack" myself every night before I sleep and since then I didn\'t feel like cracking my lower back on my bed anymore after the first adjustment.',
    detail:
      'Valerie is very patient with all my questions & concerns while being really friendly to explain everything to me in details. Highly recommended!',
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

/**
 * Locale dispatch for `homeIntro`/`offers` — see the matching comment in `lib/conditions.ts`
 * for the rationale. `offer.href` is shared across all three locales (see `lib/home.zh.ts`'s
 * header comment); only `title`/`image`/`alt`/`body` vary, so each locale's array is zipped
 * back onto the English `href`s here rather than repeating them in every sibling file.
 */
import type { Locale } from './i18n'
import { homeIntroZh, offersZh } from './home.zh.ts'
import { homeIntroMs, offersMs } from './home.ms.ts'

const homeIntroByLocale: Record<Locale, typeof homeIntro> = {
  en: homeIntro,
  zh: homeIntroZh,
  ms: homeIntroMs,
}

const offersByLocale: Record<Locale, typeof offers> = {
  en: offers,
  zh: offers.map((o, i) => ({ ...o, title: offersZh[i].title, image: offersZh[i].image, alt: offersZh[i].alt, body: offersZh[i].body })),
  ms: offers.map((o, i) => ({ ...o, title: offersMs[i].title, image: offersMs[i].image, alt: offersMs[i].alt, body: offersMs[i].body })),
}

export const homeIntroFor = (locale: Locale) => homeIntroByLocale[locale]
export const offersFor = (locale: Locale) => offersByLocale[locale]
