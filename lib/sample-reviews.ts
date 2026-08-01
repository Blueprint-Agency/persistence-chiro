/**
 * ⚠️⚠️  PLACEHOLDER MOCKUP DATA — THESE ARE NOT REAL REVIEWS.  ⚠️⚠️
 *
 * Fabricated sample reviews used ONLY to preview the Google-review UI during the build.
 * DO NOT LAUNCH WITH THIS. Publishing invented patient reviews on a real clinic site
 * misleads patients and is an advertising / professional-conduct risk for a registered
 * healthcare practice — worse than a placeholder rating number, not the same thing.
 *
 * THIS CAN NO LONGER SHIP. `components/GoogleReviews.tsx` gates the placeholder branch on
 * `process.env.NODE_ENV !== 'production'`, so `next build` never takes it and a production
 * page renders the clinic's REAL migrated quotes (`ServiceTestimonials`) instead. The flag
 * below only controls whether `next dev` previews the Google-styled treatment.
 *
 * That gate is deliberately structural rather than procedural. The previous arrangement
 * relied on someone remembering to flip a boolean before launch, which is exactly the kind
 * of promise that fails at 2am on a deploy — and the failure mode here is invented patient
 * reviews on a registered healthcare practice's website.
 *
 * TO SHIP REAL GOOGLE REVIEWS:
 *   (a) replace `sampleReviews` / `sampleReviewSummary` with the clinic's REAL Google
 *       reviews (hand-curated, or pulled at build time via the Featurable approach), then
 *   (b) delete the NODE_ENV gate in GoogleReviews.tsx so the block renders in production.
 *
 * Note there is deliberately still no `aggregateRating` anywhere in the JSON-LD. Do not add
 * one until the rating is real and verified — fabricated review markup is a structured-data
 * violation on top of the conduct problem.
 */

export const USE_SAMPLE_REVIEWS = true

/** Fake aggregate — mirrors what a Google Business Profile summary looks like. NOT REAL. */
export const sampleReviewSummary = {
  rating: 4.9,
  count: 128,
}

export type SampleReview = {
  /** Placeholder display name. */
  name: string
  /** Avatar background — Google-style coloured circle with the initial. */
  color: string
  /** Relative time, as Google renders it. */
  when: string
  body: string
}

/**
 * Experiential, hedged copy on purpose — a review may describe how someone felt, but this
 * mock still avoids anything that reads as a cure/guarantee so it does not model bad copy.
 */
export const sampleReviews: SampleReview[] = [
  {
    name: 'Aisyah R.',
    color: '#17364a',
    when: '3 weeks ago',
    body: 'Came in for lower back stiffness after months at my desk. Valerie explained exactly what she was seeing on the assessment before doing anything. Really thorough and never pushy.',
  },
  {
    name: 'Wei Jian L.',
    color: '#7d6407',
    when: 'a month ago',
    body: 'Been to a few places for my neck. First time someone actually walked me through the plan and set honest expectations. Friendly team and easy to find near Sunway Velocity.',
  },
  {
    name: 'Priya M.',
    color: '#2a6a73',
    when: '2 months ago',
    body: 'Went for dry needling on a tight shoulder. They talked me through it as I was nervous about the needles. Felt looser after a couple of sessions and they gave me exercises to keep it up.',
  },
  {
    name: 'Daniel T.',
    color: '#4a7594',
    when: '2 weeks ago',
    body: 'Physio here has been great for my knee after a badminton injury. They staged the rehab properly instead of rushing me back, and explained each step along the way.',
  },
  {
    name: 'Sarah C.',
    color: '#5b4c06',
    when: 'a month ago',
    body: 'Very professional and welcoming. No hard selling, just clear advice on what would help and what would not. Parking around Sunway Velocity is convenient too.',
  },
  {
    name: 'Hafiz A.',
    color: '#1c4c53',
    when: '3 months ago',
    body: 'Brought my mum for her back. The chiropractor was gentle and patient, and took time to answer all her questions. Would recommend for older patients.',
  },
  {
    name: 'Michelle W.',
    color: '#2b5672',
    when: '1 week ago',
    body: 'Booking was easy and they were on time. My posture felt better after a few weeks of the exercises they prescribed. Comfortable clinic and helpful staff.',
  },
  {
    name: 'Rajesh K.',
    color: '#12293a',
    when: '2 months ago',
    body: 'Honest and knowledgeable team. They were upfront that results take consistency with the exercises, which I respected. Clean, comfortable clinic near Cheras.',
  },
]
