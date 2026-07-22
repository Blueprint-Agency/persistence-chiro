/**
 * Blog index.
 *
 * Titles, authors and dates below are the REAL values extracted from the live Wix site —
 * not paraphrases. Bodies live in `content/blog/<slug>.mdx`, also verbatim.
 * `app/blog/[slug]/page.tsx` renders them; metadata lives only here, so title and
 * description can't drift between the index and the page.
 *
 * ⚠️ `slug` must match the legacy Wix slug byte-for-byte. `redirects.ts` sends
 * /post/:slug -> /blog/:slug as one wildcard rule; a renamed slug 301s a crawler
 * straight into a 404 and throws away that post's history. `content.test.ts` enforces it.
 */

export type Post = {
  slug: string
  title: string
  description: string
  /** ISO date — the original Wix publish date, not the migration date. */
  datePublished: string
  author: string
  /** Condition or modality slug this post links to. One each, per the linking rules. */
  linksTo: string
  /**
   * True = excluded from routes, sitemap and index. Used for posts whose body needs
   * editorial work before republication, not for missing content.
   */
  draft: boolean
  /** Why this post is still held back. Empty when draft is false. */
  holdReason?: string
}

export const posts: Post[] = [
  {
    slug: 'a-deeper-understanding-of-scoliosis',
    title: 'Scoliosis: A Deeper Understanding',
    description:
      'What scoliosis is, how it is assessed, and how chiropractic care fits into managing it.',
    datePublished: '2024-12-09',
    author: 'Kee Shan Lim',
    linksTo: 'scoliosis',
    draft: false,
  },
  {
    slug: 'chiropractic-care-through-the-stages-of-a-woman-s-life',
    title: 'Chiropractic Care Through the Stages of a Woman’s Life',
    description:
      'How spinal care needs change through adolescence, pregnancy, postpartum and menopause.',
    datePublished: '2025-09-01',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'chiropractic-care-for-athletes-optimising-performance-and-preventing-injuries',
    title: 'Chiropractic Care for Athletes: Optimising Performance and Preventing Injuries',
    description: 'How chiropractic supports athletic performance and reduces injury risk.',
    datePublished: '2024-12-09',
    author: 'Kee Shan Lim',
    linksTo: 'sports-injury-rehabilitation',
    draft: false,
  },
  {
    slug: 'spike-higher-play-longer',
    title: 'Spike Higher, Play Longer!',
    description: 'Spinal care for volleyball players and overhead athletes.',
    datePublished: '2025-09-30',
    author: 'Persistence Chiropractic Care',
    linksTo: 'sports-injury-rehabilitation',
    draft: false,
  },
  {
    slug: 'blog-boost-your-bone-health-webinar',
    title: 'Boost Your Bone Health: Spine & Joint Health (Webinar)',
    description: 'A clinic webinar on spine and joint health.',
    datePublished: '2022-11-07',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: true,
    holdReason:
      '98 words and it exists only to point at a webinar recording that did not survive the migration. Thin content — rewrite with the webinar takeaways or drop it and 301 to /blog.',
  },
  {
    slug: 'derek-s-journey-with-gonstead-chiropractic-care',
    title: "Derek's Journey with Gonstead Chiropractic Care",
    description: 'A patient case study following the Gonstead approach.',
    datePublished: '2023-10-23',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'three-years-of-gratitude-and-growth-celebrating-wellness-world-spine-day-and-our-community',
    title: 'Three Years of Gratitude and Growth: Celebrating Wellness, World Spine Day, and Our Community',
    description: 'Marking World Spine Day and three years of the clinic community.',
    datePublished: '2025-08-25',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'less-pain-more-gain-with-regular-chiropractic-care',
    title: 'Less Pain, More Gain with Regular Chiropractic Care',
    description: 'Why consistency matters in a chiropractic treatment plan.',
    datePublished: '2022-10-23',
    author: 'Dr Valerie Na',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'sleeping-well-waking-better-the-key-to-spinal-health-and-quality-sleep',
    title: 'Sleeping Well, Waking Better: The Key to Spinal Health and Quality Sleep',
    description: 'Sleep position, mattress choice and their effect on spinal health.',
    datePublished: '2023-05-31',
    author: 'Persistence Chiropractic Care',
    linksTo: 'neck-pain',
    draft: false,
  },
  {
    slug: 'chiropractic-care-charity-talk-for-ti-ratana-welfare',
    title: 'Making a Difference in the Community: Chiropractic Care & Charity Talk for Ti-Ratana Welfare',
    description: 'Community outreach and a charity talk on spinal health.',
    datePublished: '2025-08-25',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'what-to-expect-when-going-to-the-chiropractor-for-the-first-time',
    title: 'What to Expect When Going to the Chiropractor for the First Time?',
    description: 'A walkthrough of what happens on a first chiropractic visit.',
    datePublished: '2023-06-20',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'are-house-chores-a-pain-in-the-back-here-s-what-chiropractors-say',
    title: "Are House Chores a Pain in the Back? Here's What Chiropractors Say.",
    description: 'How to avoid back strain during everyday household tasks.',
    datePublished: '2025-05-07',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'health-benefits-of-ergonomic-chairs',
    title: 'Health Benefits of Ergonomic Chairs: Why You Need One',
    description: 'What to look for in a chair if you sit at a desk all day.',
    datePublished: '2023-01-30',
    author: 'Persistence Chiropractic Care',
    linksTo: 'neck-pain',
    draft: true,
    holdReason:
      'Body is largely a promo for a third-party brand and carries expired discount code PCC2023, plus "watch the video" references to a video that did not migrate. Strip the promo and the dead code before publishing.',
  },
  {
    slug: 'chiropractic-care-a-fresh-perspective-on-migraine-relief',
    title: 'Chiropractic Care: A Fresh Perspective on Migraine Relief',
    description: 'How cervical spine care relates to migraine symptoms.',
    datePublished: '2024-12-09',
    author: 'Kee Shan Lim',
    linksTo: 'migraine',
    draft: false,
  },
]

export const publishedPosts = () =>
  posts
    .filter((p) => !p.draft)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug)
