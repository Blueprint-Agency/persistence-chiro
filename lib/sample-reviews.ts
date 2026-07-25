/**
 * ⚠️⚠️  PLACEHOLDER MOCKUP DATA — THESE ARE NOT REAL REVIEWS.  ⚠️⚠️
 *
 * Fabricated sample reviews used ONLY to preview the Google-review UI during the build.
 * DO NOT LAUNCH WITH THIS. Publishing invented patient reviews on a real clinic site
 * misleads patients and is an advertising / professional-conduct risk for a registered
 * healthcare practice — worse than a placeholder rating number, not the same thing.
 *
 * BEFORE GOING LIVE: either
 *   (a) replace `sampleReviews` / `sampleReviewSummary` with the clinic's REAL Google
 *       reviews (hand-curated, or pulled at build time via the Featurable approach), and
 *   (b) set USE_SAMPLE_REVIEWS = false once real data is wired in.
 *
 * The `USE_SAMPLE_REVIEWS` flag exists so a reviewer can grep one constant to confirm
 * whether the page is still showing mock data.
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
    color: '#1a73e8',
    when: '3 weeks ago',
    body: 'Came in for lower back stiffness after months at my desk. Dr Valerie explained exactly what she was seeing on the assessment before doing anything. Really thorough and never pushy.',
  },
  {
    name: 'Wei Jian L.',
    color: '#db4437',
    when: 'a month ago',
    body: 'Been to a few places for my neck. First time someone actually walked me through the plan and set honest expectations. Friendly team and easy to find near Sunway Velocity.',
  },
  {
    name: 'Priya M.',
    color: '#0f9d58',
    when: '2 months ago',
    body: 'Went for dry needling on a tight shoulder. They talked me through it as I was nervous about the needles. Felt looser after a couple of sessions and they gave me exercises to keep it up.',
  },
  {
    name: 'Daniel T.',
    color: '#f4b400',
    when: '2 weeks ago',
    body: 'Physio here has been great for my knee after a badminton injury. They staged the rehab properly instead of rushing me back, and explained each step along the way.',
  },
  {
    name: 'Sarah C.',
    color: '#a142f4',
    when: 'a month ago',
    body: 'Very professional and welcoming. No hard selling, just clear advice on what would help and what would not. Parking around Sunway Velocity is convenient too.',
  },
  {
    name: 'Hafiz A.',
    color: '#00897b',
    when: '3 months ago',
    body: 'Brought my mum for her back. The chiropractor was gentle and patient, and took time to answer all her questions. Would recommend for older patients.',
  },
  {
    name: 'Michelle W.',
    color: '#e8710a',
    when: '1 week ago',
    body: 'Booking was easy and they were on time. My posture felt better after a few weeks of the exercises they prescribed. Comfortable clinic and helpful staff.',
  },
  {
    name: 'Rajesh K.',
    color: '#3949ab',
    when: '2 months ago',
    body: 'Honest and knowledgeable team. They were upfront that results take consistency with the exercises, which I respected. Clean, comfortable clinic near Cheras.',
  },
]
