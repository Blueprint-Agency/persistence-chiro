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
  /**
   * Optional hero photograph, rendered beside the title on the article page and on the
   * blog index's featured slot. Most posts carry none: this clinic's photography is of
   * this clinic, not stock filler (see DESIGN.md), and there is no dedicated shoot for
   * most topics. When one is set from a licensed stock source rather than the clinic's
   * own photography, say so in a comment next to the entry — same discipline as crediting
   * the Unsplash photo behind `blog-gonstead-hero.webp`.
   */
  heroImage?: { src: string; alt: string }
  /**
   * Structured Q&A, matching `Condition.keyTakeaways` / `Condition.faqs`. Rendered inline in
   * the MDX body via `<KeyTakeawayList slug="..." />` / `<FaqList slug="..." />`
   * (mdx-components.tsx) and fed into `pageFaqSchema` for FAQPage structured data — one
   * array serves both, so the rendered page and the schema can never drift apart the way
   * they would if the FAQ were retyped as freehand MDX prose.
   *
   * Optional: legacy posts keep their Q&A as plain MDX paragraphs rather than being
   * retrofitted, so a post with neither field simply emits no FAQPage schema.
   */
  keyTakeaways?: { q: string; a: string }[]
  faqs?: { q: string; a: string }[]
  /**
   * Verifiable, cautiously worded facts attributed to a journal, historical record or
   * regulator, matching `Condition.citations` / `Service.citations`. Never a competitor,
   * never an efficacy promise. Renders via `<References>` on the article page.
   */
  citations?: { claim: string; source: string; url?: string }[]
  /**
   * ISO date the clinical content was ACTUALLY reviewed by the practitioner (always Valerie
   * Na — see `reviewer` in components/service.tsx). Same contract as `Condition.lastReviewed`
   * / `Service.lastReviewed`: unset means no claim is made, which is the correct state until
   * the clinic confirms a review actually happened. DO NOT set this to make the byline
   * appear.
   */
  lastReviewed?: string
}

export const posts: Post[] = [
  {
    // Month 1 content schedule item, built as a blog post rather than the sixth service
    // page the schedule specified: /services/chiropractic-care already owns "Gonstead"
    // (dedicated route, six-step walkthrough, an FAQ literally titled "What is the Gonstead
    // method?"), and the proposal fixes the service namespace at five slugs. A standalone
    // service page here would cannibalise chiropractic-care's own ranking for the term.
    slug: 'gonstead-technique',
    title: 'Gonstead Chiropractor KL: What the Technique Involves',
    description:
      'What the Gonstead technique actually involves, the six-step assessment behind it, and how it differs from a general adjustment. Cheras, Kuala Lumpur.',
    datePublished: '2026-08-26',
    author: 'Persistence Chiropractic Care',
    linksTo: 'chiropractic-care',
    // Licensed stock (Unsplash License, free commercial use), not clinic photography.
    // Photographer: Julius Toltesi. https://unsplash.com/photos/ZzkNkbUxFMc
    heroImage: {
      src: '/img/blog-gonstead-hero.webp',
      alt: 'Chiropractor placing both hands on a patient upper back during a spinal adjustment',
    },
    keyTakeaways: [
      {
        q: 'What is the Gonstead technique?',
        a: 'A chiropractic system built around a thorough, structured assessment, history taking, visual and instrument checks, hands on palpation and X-ray analysis where indicated, used to find the exact spinal segment behind a problem before it is adjusted.',
      },
      {
        q: 'Who created it?',
        a: 'Dr Clarence Gonstead, an American chiropractor who developed and refined the system over several decades of practice in Mount Horeb, Wisconsin, beginning in the 1920s.',
      },
      {
        q: 'How is it different from a general adjustment?',
        a: 'A general adjustment can move through the spine broadly. Gonstead is built to identify one specific segment first, so the adjustment that follows is aimed precisely rather than applied generally.',
      },
      {
        q: 'Is Gonstead better than other chiropractic techniques?',
        a: 'There is no good evidence that any one chiropractic technique outperforms the others for most people. What Gonstead offers is a particularly structured, repeatable process for finding where to work, which is why our chiropractors use it.',
      },
      {
        q: 'Is it safe, and who is it suitable for?',
        a: 'Assessment comes first specifically so an adjustment is only used where it is appropriate. Where it is not, or a case would be better served elsewhere, that is exactly what the assessment is for.',
      },
    ],
    faqs: [
      {
        q: 'Does Gonstead chiropractic hurt?',
        a: 'The assessment itself does not, beyond ordinary palpation. The adjustment is usually described as brief pressure followed by release rather than pain, though any tenderness already present in the area can make it feel more noticeable.',
      },
      {
        q: 'Do I need an X-ray for a Gonstead assessment?',
        a: 'Not for every patient. It is used where it is clinically indicated, particularly where it would change the plan, and it is generally avoided for pregnant women and children unless there is a clear reason.',
      },
      {
        q: 'Is Gonstead suitable for children?',
        a: 'Yes, the assessment adapts to the person rather than following a fixed protocol, and the approach for a child differs from the approach for an adult accordingly.',
      },
      {
        q: 'How long does a Gonstead assessment take?',
        a: 'A first visit usually takes longer than a routine follow up, because it works through all six steps rather than going straight to an adjustment. Expect to spend more time than a quick, general session.',
      },
      {
        q: 'Can I request Gonstead specifically when I book?',
        a: 'Yes. It is worth mentioning if you have a preference, though your chiropractor will still start with the same assessment either way, since that is what decides whether and how an adjustment happens.',
      },
    ],
    citations: [
      {
        claim:
          'Dr Clarence Gonstead opened his chiropractic clinic in Mount Horeb, Wisconsin in 1924, and it later became the largest single doctor chiropractic practice in the world.',
        source: 'Wisconsin Historical Society',
        url: 'https://www.wisconsinhistory.org/Records/Article/CS16980',
      },
      {
        claim:
          'Reviews comparing thrust spinal manipulation to non-thrust mobilisation have generally found no consistent difference in pain and disability outcomes, though findings vary by spinal region.',
        source: 'Gevers-Montoro et al. (2021), Frontiers in Pain Research',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8915715/',
      },
      {
        claim:
          'In Malaysia, chiropractic is a regulated healthcare practice, and practitioners are expected to hold recognised qualifications.',
        source: 'Ministry of Health Malaysia',
        url: 'https://www.moh.gov.my/en/corporate-info/division-information/traditional-and-complementary-medicine-division',
      },
    ],
    // Reviewed by Valerie Na, confirmed 2026-08-26.
    lastReviewed: '2026-08-26',
    draft: false,
  },
  {
    // Month 1 content schedule item, built via the persistence-content-builder skill.
    // Deliberately not a ranked listicle: AGENTS.md forbids naming or citing a competitor,
    // and there is no honest way to crown ourselves "best" without either. Instead this
    // teaches the reader what to verify in any KL chiropractor, which our own clinic is
    // positioned to pass on every count without the post ever claiming so directly.
    slug: 'best-chiropractor-kuala-lumpur',
    title: 'Best Chiropractor in Kuala Lumpur: What to Actually Check',
    description:
      'What actually separates a good chiropractor from a busy one in Kuala Lumpur: registration, assessment, and the questions worth asking first.',
    datePublished: '2026-08-26',
    author: 'Persistence Chiropractic Care',
    linksTo: 'chiropractic-care',
    // Reused from /what-to-expect rather than sourcing anything new — real clinic
    // photography, not stock, and it illustrates the "assessment before anything happens"
    // point this post keeps making.
    heroImage: {
      src: '/img/first-visit-consultation.webp',
      alt: 'Chiropractor assessing a patient neck during a consultation at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    keyTakeaways: [
      {
        q: 'What makes a chiropractor good in Kuala Lumpur, rather than just popular?',
        a: 'Verifiable registration with the Ministry of Health and, separately, membership with the Association of Chiropractic Malaysia, alongside an assessment that happens before any adjustment. Reviews and search rankings for "best chiropractor Kuala Lumpur" do not tell you either of those things.',
      },
      {
        q: 'Is one chiropractic technique genuinely better than another?',
        a: 'No published evidence puts one named technique ahead of the others across the board. What matters more is whether the chiropractor can explain how they decided where to work on you.',
      },
      {
        q: 'How do I check if a chiropractor in KL is actually registered?',
        a: 'Ask directly for their Ministry of Health T&CM registration number and whether they hold Association of Chiropractic Malaysia membership. A genuinely registered practitioner answers both without hesitation.',
      },
      {
        q: 'What should a first visit with a good chiropractor look like?',
        a: 'History taken first, then a physical examination, then an explanation of what was found, before anything is adjusted, not an adjustment within the first few minutes regardless of what brought you in.',
      },
      {
        q: 'Should I worry if a clinic is not the top result in a search for the best chiropractor?',
        a: 'Not particularly. Search rankings and review counts reflect marketing and popularity more than they reflect registration, assessment quality or the approach actually used.',
      },
    ],
    faqs: [
      {
        q: 'How much does a chiropractor cost in Kuala Lumpur?',
        a: 'It varies by clinic and is usually priced per visit rather than as a fixed package, because a fair quote depends on what the assessment finds. Ask what a first visit costs specifically before you book, since most clinics do not publish this upfront.',
      },
      {
        q: "Do I need a doctor's referral to see a chiropractor in KL?",
        a: 'No. Chiropractors in Malaysia can be seen directly without a referral, though a chiropractor who takes a proper history should refer you onward if your case needs imaging or a medical opinion first.',
      },
      {
        q: "What's the difference between a chiropractor and a physiotherapist?",
        a: 'Broadly, a chiropractor works on how a restricted spinal joint moves, while a physiotherapist works on the strength and control around it, and a fair number of patients end up needing both. Which one to start with depends on what an assessment finds, not on which you happened to search for first.',
      },
      {
        q: 'Are there unregistered or unqualified practitioners operating in KL?',
        a: "It's a real risk worth taking seriously, given how few patients check credentials: a 2023 survey of Klang Valley adults found under five percent were aware of the Act that regulates the profession here. Asking to see a registration number directly is the simplest way to rule this out.",
      },
      {
        q: 'Is it normal for a chiropractor to recommend ongoing visits?',
        a: 'It can be, for a recurring or long-standing problem, but a plan should be reviewed honestly as it goes rather than sold as a fixed number of sessions before you have even been assessed once.',
      },
    ],
    citations: [
      {
        claim:
          "A 2023 survey of adults in Malaysia's Klang Valley found that only 4.8 percent were aware of the Act that regulates chiropractic practice, despite almost half of respondents holding a university degree.",
        source: 'Wong, Haneline & Tan (2023), Journal of Chiropractic Humanities',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10562678/',
      },
      {
        claim: 'The Association of Chiropractic Malaysia, the profession’s professional body, was established in 2013.',
        source: 'Association of Chiropractic Malaysia',
        url: 'https://chiroacm.org/about-us',
      },
      {
        claim:
          'Reviews comparing thrust spinal manipulation to non-thrust mobilisation have generally found no consistent difference in pain and disability outcomes, though findings vary by spinal region.',
        source: 'Gevers-Montoro et al. (2021), Frontiers in Pain Research',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8915715/',
      },
    ],
    // Reviewed by Valerie Na, confirmed 2026-08-26.
    lastReviewed: '2026-08-26',
    draft: false,
  },
  {
    // First net-new SEO post (not a migrated Wix post, so not in LEGACY_POST_SLUGS and it
    // needs no /post/ redirect). Written 2026-07-25 via the persistence-content-builder skill.
    slug: 'muscle-knots',
    title: 'Muscle Knots: Causes, Symptoms and What Actually Helps',
    description:
      'What causes muscle knots, what genuinely helps, how to ease one at home, and the signs that mean you should get checked. Cheras, Kuala Lumpur.',
    datePublished: '2026-07-25',
    author: 'Persistence Chiropractic Care',
    linksTo: 'dry-needling',
    draft: false,
  },
  {
    slug: 'a-deeper-understanding-of-scoliosis',
    title: 'Scoliosis: A Deeper Understanding',
    description:
      'What scoliosis actually is, how a curve is measured and monitored, and where chiropractic care fits into managing it. From our chiropractors in Cheras, KL.',
    datePublished: '2024-12-09',
    author: 'Kee Shan Lim',
    linksTo: 'scoliosis',
    draft: false,
  },
  {
    slug: 'chiropractic-care-through-the-stages-of-a-woman-s-life',
    title: 'Chiropractic Care Through the Stages of a Woman’s Life',
    description:
      'How spinal care needs change through adolescence, pregnancy, postpartum and menopause, and what to raise with a chiropractor at each stage.',
    datePublished: '2025-09-01',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    // Licensed stock carried over from the original Wix post cover: a flat teal silhouette
    // illustration, not clinic photography or a real patient, so no local modifier in the alt.
    heroImage: {
      src: '/img/post-womans-life.webp',
      alt: 'Illustration of a woman silhouette through the stages of life, from infant to grandmother, including pregnancy',
    },
    draft: false,
  },
  {
    slug: 'chiropractic-care-for-athletes-optimising-performance-and-preventing-injuries',
    title: 'Chiropractic Care for Athletes: Optimising Performance and Preventing Injuries',
    description:
      'How chiropractic care fits into an athlete training schedule, what a pre-season assessment looks at, and the injury patterns worth catching early.',
    datePublished: '2024-12-09',
    author: 'Kee Shan Lim',
    linksTo: 'sports-injury-rehabilitation',
    draft: false,
  },
  {
    slug: 'spike-higher-play-longer',
    title: 'Spike Higher, Play Longer!',
    description:
      'Shoulder, spine and landing mechanics for volleyball players and overhead athletes, and the niggles worth getting assessed before they end a season.',
    datePublished: '2025-09-30',
    author: 'Persistence Chiropractic Care',
    linksTo: 'sports-injury-rehabilitation',
    // Licensed stock carried over from the original Wix post cover, not clinic photography
    // (a volleyball player, not this clinic or a patient), so the alt below names no local
    // modifier and no clinic, same discipline as the dry-needling/physio illustration alts.
    heroImage: {
      src: '/img/post-spike-higher.webp',
      alt: 'Volleyball player jumping to set the ball at the net',
    },
    draft: false,
  },
  {
    slug: 'blog-boost-your-bone-health-webinar',
    title: 'Boost Your Bone Health: Spine & Joint Health (Webinar)',
    description:
      'Our webinar on bone, spine and joint health: what affects bone density, why it matters for your spine, and the habits that support it.',
    datePublished: '2022-11-07',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: true,
    holdReason:
      '98 words and it exists only to point at a webinar recording that did not survive the migration. Thin content: rewrite with the webinar takeaways or drop it and 301 to /blog.',
  },
  {
    slug: 'derek-s-journey-with-gonstead-chiropractic-care',
    title: "Derek's Journey with Gonstead Chiropractic Care",
    description:
      'Derek came in with a long-standing complaint. What the Gonstead assessment found, how the plan was staged, and how his care progressed at our Cheras clinic.',
    datePublished: '2023-10-23',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'three-years-of-gratitude-and-growth-celebrating-wellness-world-spine-day-and-our-community',
    title: 'Three Years of Gratitude and Growth: Celebrating Wellness, World Spine Day, and Our Community',
    description:
      'Three years of Persistence Chiropractic in Cheras, marking World Spine Day with the patients, partners and community who made the clinic what it is.',
    datePublished: '2025-08-25',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'less-pain-more-gain-with-regular-chiropractic-care',
    title: 'Less Pain, More Gain with Regular Chiropractic Care',
    description:
      'Why consistency matters more than intensity in a chiropractic care plan, what changes between visits, and why stopping early tends to undo the progress.',
    datePublished: '2022-10-23',
    author: 'Valerie Na',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'sleeping-well-waking-better-the-key-to-spinal-health-and-quality-sleep',
    title: 'Sleeping Well, Waking Better: The Key to Spinal Health and Quality Sleep',
    description:
      'How sleep position, pillow height and mattress choice affect your spine, plus practical fixes for waking with a stiff neck or an aching lower back.',
    datePublished: '2023-05-31',
    author: 'Persistence Chiropractic Care',
    linksTo: 'neck-pain',
    draft: false,
  },
  {
    slug: 'chiropractic-care-charity-talk-for-ti-ratana-welfare',
    title: 'Making a Difference in the Community: Chiropractic Care & Charity Talk for Ti-Ratana Welfare',
    description:
      'Our team ran a spinal health talk and screening for Ti-Ratana Welfare Society. What we covered, and what community outreach looks like for a Cheras clinic.',
    datePublished: '2025-08-25',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'what-to-expect-when-going-to-the-chiropractor-for-the-first-time',
    title: 'What to Expect When Going to the Chiropractor for the First Time?',
    // Deliberately angled at nerves and common worries, not the visit steps — those belong
    // to /what-to-expect, which is the page we want ranking for the transactional query.
    description:
      'Nervous about seeing a chiropractor for the first time? The questions patients ask most, what the cracking sound is, and whether an adjustment hurts.',
    datePublished: '2023-06-20',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    draft: false,
  },
  {
    slug: 'are-house-chores-a-pain-in-the-back-here-s-what-chiropractors-say',
    title: "Are House Chores a Pain in the Back? Here's What Chiropractors Say.",
    description:
      'Mopping, laundry, lifting groceries and reaching overhead all load the back in ways people underestimate. How to avoid strain during everyday chores.',
    datePublished: '2025-05-07',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    // Licensed stock carried over from the original Wix post cover, not clinic photography
    // or a real patient, so no local modifier in the alt.
    heroImage: {
      src: '/img/post-house-chores.webp',
      alt: 'Woman kneeling and resting her head on a pile of laundry beside a laundry basket',
    },
    draft: false,
  },
  {
    slug: 'health-benefits-of-ergonomic-chairs',
    title: 'Health Benefits of Ergonomic Chairs: Why You Need One',
    description:
      'What actually matters in an ergonomic chair if you sit at a desk all day: seat depth, lumbar support, armrest height, and what is just marketing.',
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
    description:
      'How the neck can contribute to migraine and headache symptoms, what a cervical assessment looks at, and when to see a doctor rather than a chiropractor.',
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
