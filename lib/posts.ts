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
        a: 'Yes. Our patients have ranged from a four month old baby to a 96 year old, because the assessment adapts to the person rather than following a fixed protocol, and the approach for a child differs from the approach for an adult accordingly.',
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
      {
        q: 'Is a clinic near Sunway Velocity in Cheras easier to reach by public transport?',
        a: 'Yes, if you are coming by rail. Maluri MRT and LRT stations sit close together with a short covered walkway between them, both a short walk from Sunway Velocity, which is not true of every clinic in the wider Klang Valley.',
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
      {
        claim:
          'Maluri MRT station (Kajang Line) and Maluri LRT station (Ampang Line) are connected by a paid-to-paid linkway roughly two minutes long, and the station serves shoppers heading to Sunway Velocity.',
        source: 'klia2.info, Maluri MRT station guide',
        url: 'https://www.klia2.info/rail/mrt-sbk/maluri-mrt-station/',
      },
    ],
    // Reviewed by Valerie Na, confirmed 2026-08-26.
    lastReviewed: '2026-08-26',
    draft: false,
  },
  {
    // Month 1 content schedule item, built via the persistence-content-builder skill.
    // Coexists with /services/dry-needling's single "Is dry needling the same as
    // acupuncture?" FAQ the same way gonstead-technique coexists with chiropractic-care's
    // short Gonstead FAQ: the service page targets a different keyword ("dry needling near
    // me") and answers this in one paragraph, this post goes into full comparative depth
    // (mechanism, Malaysian regulation under two different Acts, session mechanics, which
    // one fits which problem) that a single FAQ answer can't carry.
    slug: 'dry-needling-vs-acupuncture',
    title: "Dry Needling vs Acupuncture: What's Actually Different",
    description:
      "Dry needling and acupuncture both use needles, but the theory, technique and regulation in Malaysia differ. Here's what actually separates them.",
    datePublished: '2026-08-27',
    author: 'Persistence Chiropractic Care',
    linksTo: 'dry-needling',
    // Real clinic photography, reused from the dry-needling service page's mid-article
    // slot (lib/services.ts) rather than sourcing anything new.
    heroImage: {
      src: '/img/dry-needling-session.webp',
      alt: 'Gloved practitioner placing a single-use needle into a trigger point in a patient shoulder at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    keyTakeaways: [
      {
        q: 'What is the core difference between dry needling and acupuncture?',
        a: 'Dry needling is a Western, anatomy based technique that targets a specific tight band of muscle, a myofascial trigger point. Acupuncture comes from traditional Chinese medicine and selects points along meridians rather than by muscle anatomy.',
      },
      {
        q: 'Are the two regulated the same way in Malaysia?',
        a: 'No. Physiotherapists, who most commonly perform dry needling here, register under the Allied Health Professions Act 2016 (Act 774). Acupuncture falls under traditional Chinese medicine, one of the recognised practice areas of the Traditional and Complementary Medicine Act 2016 (Act 775), registered separately with the T&CM Council.',
      },
      {
        q: 'Does one use more needles than the other?',
        a: 'Generally yes. Dry needling typically uses somewhere between three and twenty needles placed directly into tight muscle. Acupuncture sessions can use eight to thirty needles placed along meridian points, which may sit well away from where discomfort is felt.',
      },
      {
        q: 'What is each one generally used for?',
        a: 'Dry needling is aimed at muscle and movement problems, a stubborn trigger point or tension that keeps returning. Acupuncture is used more broadly, including for things outside dry needling scope entirely, such as stress, sleep or nausea.',
      },
      {
        q: 'Is one better than the other?',
        a: 'Neither is inherently better. They are built for different problems, so which one fits depends on what an assessment finds is actually driving your case, not on which technique sounds more effective.',
      },
    ],
    faqs: [
      {
        q: 'Is dry needling the same as acupuncture, and why do they look so similar?',
        a: 'They look similar because both use a fine, solid filament needle, but the reasoning behind where it goes is different. Dry needling targets a muscle found to be tight during assessment. Acupuncture targets a point on a meridian, a pathway from traditional Chinese medicine, which is not necessarily anywhere near the muscle causing discomfort.',
      },
      {
        q: 'Does dry needling hurt more than acupuncture?',
        a: 'They tend to feel different rather than one being simply more painful. Dry needling is usually described as a brief twitch response followed by a dull ache, sometimes with soreness the next day. Acupuncture needles sit more superficially and are generally described as a dull, heavy sensation rather than sharp pain.',
      },
      {
        q: 'Is dry needling regulated the same way as acupuncture in Malaysia?',
        a: 'No, and this is worth checking before you book either one. Dry needling here is performed by physiotherapists registered under the Allied Health Professions Act 2016. Acupuncture is registered separately under the Traditional and Complementary Medicine Act 2016 through the T&CM Council. Neither registration covers the other technique.',
      },
      {
        q: 'Can a physiotherapist perform acupuncture, or an acupuncturist perform dry needling?',
        a: 'Not on the strength of their existing registration alone. The two sit under different Acts and different councils in Malaysia, so a practitioner would need separate training and registration to practise the other technique legitimately.',
      },
      {
        q: 'Which is better for a stubborn muscle knot versus general stress or wellness?',
        a: 'A stubborn, locatable muscle knot is generally the closer fit for dry needling, since it targets that specific tissue directly. A broader goal such as stress or general wellbeing sits more within what acupuncture is used for, and is not something dry needling is aimed at.',
      },
    ],
    citations: [
      {
        claim:
          'Physiotherapists are among the allied health professions listed under Malaysia’s Allied Health Professions Act 2016 (Act 774), which requires registration with the Malaysian Allied Health Professions Council (MAHPC).',
        source: 'Bernama, "MAHPC Extends Allied Health Practitioners’ Registration Deadline To Dec 2026"',
        url: 'https://www.bernama.com/en/news.php?id=2437599',
      },
      {
        claim:
          'Malaysia’s Traditional and Complementary Medicine Act 2016 (Act 775) established the T&CM Council, which registers practitioners in recognised practice areas including traditional Chinese medicine.',
        source: 'Thoo & Partners, "Registration of Traditional and Complementary Medicine Practitioners"',
        url: 'https://www.thoopartners.com/registration-of-traditional-and-complementary-medicine-practitioners/',
      },
      {
        claim:
          'Surveys of trigger point dry needling report that adverse events are usually minor and transient, such as soreness or minor bruising.',
        source: 'Brady et al. (2014), Journal of Manual & Manipulative Therapy',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4101552/',
      },
    ],
    draft: false,
  },
  {
    // Month 1 content schedule item, built via the persistence-content-builder skill.
    // /services/physiotherapy already carries a dedicated comparison TABLE for this exact
    // query (lib/services.ts .comparison, built deliberately "because no competitor page on
    // this SERP answers the question at all") plus its own H2 section, a stronger overlap
    // signal than the one-FAQ-paragraph cases (Gonstead, dry needling vs acupuncture). This
    // post does not restate that table; it links to it and adds three angles the table
    // doesn't cover: the regulatory contrast (Act 775/T&CM Council vs Act 774/MAHPC, same
    // framing that worked for dry-needling-vs-acupuncture), which condition leans which way
    // grounded in this site's own conditions.ts helpedBy data rather than generic claims,
    // and what combining both actually looks like at a single clinic offering all three.
    slug: 'chiropractic-vs-physiotherapy',
    title: 'Chiropractic vs Physiotherapy: How to Actually Decide',
    description:
      "Chiropractic and physiotherapy are regulated under two different Malaysian Acts and suit different conditions. Here's how to actually decide between them.",
    datePublished: '2026-08-27',
    author: 'Persistence Chiropractic Care',
    linksTo: 'chiropractic-care',
    // Real clinic photography, previously unused elsewhere on the site.
    heroImage: {
      src: '/img/treatment-room.webp',
      alt: 'Treatment room at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    keyTakeaways: [
      {
        q: 'Are chiropractic and physiotherapy regulated the same way in Malaysia?',
        a: 'No. Chiropractic is one of the recognised practice areas under the Traditional and Complementary Medicine Act 2016 (Act 775), registered through the T&CM Council. Physiotherapy falls under the Allied Health Professions Act 2016 (Act 774), registered with the Malaysian Allied Health Professions Council.',
      },
      {
        q: 'What does each mainly work on?',
        a: 'Chiropractic care works on how a restricted spinal joint moves, most often through a hands on adjustment. Physiotherapy works on the strength and control around a problem, through movement assessment, hands on care and a structured exercise programme.',
      },
      {
        q: 'Does the same condition always call for the same one?',
        a: 'No, it genuinely varies. Sciatica and neck pain often lean toward physiotherapy and dry needling first, while back pain, a slipped disc, scoliosis and migraine can draw on both, and which starts first depends on what an assessment finds.',
      },
      {
        q: 'Is it normal to need both?',
        a: 'Yes. A joint that has been stuck for a while often carries tight muscle around it, and freeing the joint does not automatically retrain that muscle, so combining both is common rather than a sign either approach fell short.',
      },
      {
        q: 'When is neither the right call?',
        a: 'When the problem is not mechanical: infection, fracture, or disease affecting an organ. A practitioner who takes that seriously refers you to a doctor rather than adjusting or exercising you regardless.',
      },
    ],
    faqs: [
      {
        q: 'Which is better, chiropractic or physiotherapy?',
        a: 'Neither is better in the abstract. They work on different things and suit different presentations, so which one fits depends on what an assessment finds is driving your specific case.',
      },
      {
        q: 'Do I need a referral to see a chiropractor or a physiotherapist in Malaysia?',
        a: 'No, both can be seen directly without a referral. A practitioner who takes a proper history should still refer you onward if your case needs imaging or a medical opinion first.',
      },
      {
        q: 'Is it normal to be recommended both chiropractic and physiotherapy?',
        a: 'Yes, and it is a common combination rather than a sign that one approach did not work. Many problems involve both a joint that has stopped moving well and muscle that has tightened up around it.',
      },
      {
        q: 'Can the same practitioner be trained in both?',
        a: 'Registration in one does not cover the other, since they sit under separate Acts and separate councils in Malaysia. A practitioner would need distinct training and registration to legitimately practise both.',
      },
      {
        q: 'How do I know which one to book first?',
        a: 'If you are not sure, message a clinic your main concern before booking. A place that offers both under one roof can point you to a sensible starting point rather than leave you to guess from a website.',
      },
    ],
    citations: [
      {
        claim:
          'Malaysia’s Traditional and Complementary Medicine Act 2016 (Act 775) established the T&CM Council, which registers practitioners across seven recognised practice areas including chiropractic.',
        source: 'Thoo & Partners, "Registration of Traditional and Complementary Medicine Practitioners"',
        url: 'https://www.thoopartners.com/registration-of-traditional-and-complementary-medicine-practitioners/',
      },
      {
        claim:
          'Physiotherapists are among the allied health professions listed under Malaysia’s Allied Health Professions Act 2016 (Act 774), which requires registration with the Malaysian Allied Health Professions Council (MAHPC).',
        source: 'Bernama, "MAHPC Extends Allied Health Practitioners’ Registration Deadline To Dec 2026"',
        url: 'https://www.bernama.com/en/news.php?id=2437599',
      },
      {
        claim:
          'Clinical guidelines recommend staying active and using exercise based care for most non specific low back pain, rather than prolonged rest.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
    ],
    draft: false,
  },
  {
    // Month 1 content schedule item, reframed from a "Herniated/Bulging Disc" CONDITION
    // page (which would have cannibalised /conditions/slipped-disc — its own intro already
    // says "'Slipped disc' is the everyday name for a disc that has bulged or herniated")
    // into a comparison blog post instead, same move as dry-needling-vs-acupuncture and
    // chiropractic-vs-physiotherapy. Routes to slipped-disc for the actual care pathway
    // rather than duplicating causes/approach/redFlags. Confirmed via WebFetch that no
    // Malaysia-specific competitor content exists for this exact comparison at all, and
    // that ranking competitors are neurosurgery/spine-surgery practices whose "treatment"
    // sections default to procedures, genuinely different context from a conservative,
    // assessment-first clinic.
    slug: 'bulging-disc-vs-herniated-disc',
    title: "Bulging Disc vs Herniated Disc: What's the Difference",
    description:
      "Bulging disc and herniated disc get used interchangeably, but there's a real structural difference. Here's what it is, and what it does and doesn't change.",
    datePublished: '2026-08-27',
    author: 'Persistence Chiropractic Care',
    linksTo: 'slipped-disc',
    // Real clinic photography, reused from the homepage (lib/home.ts) - X-ray analysis is
    // literally how the two are actually told apart, so it fits this post's own point.
    heroImage: {
      src: '/img/xray-assessment.webp',
      alt: 'Chiropractor reviewing a spinal X-ray with a patient at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    keyTakeaways: [
      {
        q: "What's the actual structural difference between a bulging disc and a herniated disc?",
        a: "In a bulging disc, the disc's inner material pushes outward but stays contained within the outer layer. In a herniated disc, the outer layer has torn and some of that material has escaped through it.",
      },
      {
        q: 'Is a herniated disc always worse than a bulging disc?',
        a: 'Usually more likely to cause sharp or sudden symptoms, since torn tissue and displaced material are more likely to irritate a nearby nerve, but not always. Plenty of people have either finding on a scan with no symptoms at all.',
      },
      {
        q: 'Why do the terms get used interchangeably?',
        a: 'Even major clinics blur the line in patient materials, and "slipped disc" is commonly used as the umbrella term for the whole group. The label alone is not a reliable way to judge how serious a case is.',
      },
      {
        q: 'Does the label change what a chiropractor does about it?',
        a: 'Not fundamentally. Either way the approach starts with a proper assessment, establishing which level is involved and how it is behaving, before anything is adjusted.',
      },
      {
        q: 'How do you actually tell the two apart?',
        a: 'Only imaging reliably distinguishes them, not how the pain feels. Imaging is used where an assessment indicates it rather than as a routine first step for every back pain presentation.',
      },
    ],
    faqs: [
      {
        q: 'Is a bulging disc the same as a slipped disc?',
        a: '"Slipped disc" is generally used as the everyday umbrella term covering bulges, protrusions and herniations alike, rather than referring to one specific structural finding.',
      },
      {
        q: 'Can a bulging disc become a herniated disc?',
        a: 'Both are considered part of the same disc degeneration process, though the evidence for a bulge reliably progressing into a herniation over time is not conclusive. Either can also stay stable for years.',
      },
      {
        q: 'Does the label on my scan report change my care plan?',
        a: 'Not on its own. What matters more is what an assessment finds: how the level is behaving, whether any red flags are present, and how you are actually moving, not the specific word used in the report.',
      },
      {
        q: 'Do I need an MRI to know which one I have?',
        a: 'Not necessarily to begin care. We start with the Gonstead assessment and X-ray analysis where indicated, which is often enough to guide the first steps. An MRI is arranged where the presentation suggests it would change the plan.',
      },
      {
        q: 'Are bulging discs or herniated discs more common?',
        a: 'Bulges are generally more common, and a meaningful proportion of both are found incidentally on scans done for an unrelated reason, in people with no back pain at all.',
      },
    ],
    citations: [
      {
        claim:
          'A bulging disc occurs when the disc pushes outward while its outer layer stays intact; a herniated disc occurs when that outer layer tears and inner material escapes into the spinal canal.',
        source: 'Baylor Scott & White Health',
        url: 'https://www.bswhealth.com/blog/bulging-disc-vs-herniated-disc',
      },
      {
        claim:
          'Bulging discs and herniated discs are both considered manifestations of the same underlying disc degeneration process, caused by factors such as injury, ageing, and sustained physical load.',
        source: 'NeurosurgeryOne',
        url: 'https://www.neurosurgeryone.com/blog/bulging-disc-vs-herniated-disc/',
      },
      {
        claim:
          'Imaging findings such as disc bulges and protrusions are commonly present in people without any symptoms, and increase with age.',
        source: 'Brinjikji et al. (2015), American Journal of Neuroradiology',
        url: 'https://www.ajnr.org/content/36/4/811',
      },
    ],
    lastReviewed: '2026-08-27',
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
