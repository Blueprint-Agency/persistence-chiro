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
    // Schedule pc029, built via the persistence-content-builder skill. "chiropractic vs
    // massage" measures 10/mo in Ubersuggest MY; the cluster's volume is "chiropractic
    // massage" (170/mo, a local-pack SERP), which gets its own H2. Every ranking page is a
    // chiropractic clinic claiming chiro lasts and massage is temporary; this post's angle is
    // evidence parity (Cochrane, BMJ, NICE NG59 all put the two on a similar footing), a
    // symptom-pattern table, and massage-specific red flags. It deliberately does NOT restate
    // the spa vs sports massage table on /services/sports-massage, the Act 775 and joint
    // "crack" sections of tit-tar-vs-chiropractic, or the condition leanings in
    // chiropractic-vs-physiotherapy; it links to each. The cost FAQ quotes BUNDLE totals only:
    // lib/pricing.ts says standalone prices (sports massage RM120 an hour) must not be
    // published. Citation source/claim strings are paraphrased because the BMJ title, the
    // Cochrane conclusion and NICE's wording all contain the banned word. No lastReviewed
    // until Valerie reads it.
    slug: 'chiropractic-vs-massage',
    title: 'Chiropractic vs Massage: How to Tell Which You Need',
    description:
      'Chiropractic works on how a stuck joint moves, massage on the muscle around it. How to tell which your pain leans towards, and when having both makes sense.',
    datePublished: '2026-10-19',
    author: 'Persistence Chiropractic Care',
    linksTo: 'sports-massage',
    // Hero is an AI-generated flat illustration (Higgsfield Nano Banana 2 Lite, 2026-10-19) in the
    // tech neck style. Not a clinic photo, so no Cheras modifier in the alt text.
    heroImage: {
      src: '/img/blog-massage-hero.webp',
      alt: 'Illustration of a practitioner in a navy polo shirt working on the upper back muscles of a patient lying face down on a clinic table, with a golden glow across the upper back',
    },
    keyTakeaways: [
      {
        q: 'What is the main difference between chiropractic and massage?',
        a: 'Chiropractic care assesses and adjusts joints that have stopped moving well, mostly in the spine. Massage works on muscle, tendon and fascia, the soft tissue around those joints.',
      },
      {
        q: 'Is chiropractic or massage better for back pain?',
        a: 'Neither clearly. Research reviews find modest, mostly short term benefits for both, and the NICE guideline groups spinal manipulation and massage together as manual therapy to consider alongside exercise.',
      },
      {
        q: 'What is chiropractic massage?',
        a: 'It is not a separate discipline. It usually means soft tissue work done in a chiropractic clinic, often in the same visit as an adjustment.',
      },
      {
        q: 'How can I tell which one my pain leans towards?',
        a: 'A spot that feels locked, or a movement you cannot make, leans towards a joint assessment. Broad tightness from training or desk work that eases with pressure leans towards massage.',
      },
      {
        q: 'When is neither chiropractic nor massage the right call?',
        a: 'When the symptoms point to something medical, such as spreading numbness, a fever with back pain, or a swollen and painful calf. Those need a doctor first.',
      },
    ],
    faqs: [
      {
        q: 'Should I get a massage before or after a chiropractic adjustment?',
        a: 'Both orders are used. Some people find soft tissue work first helps them relax so the adjustment feels easier, and others prefer the adjustment first. No good research shows one order is better, so we decide from what the assessment finds and what you find comfortable.',
      },
      {
        q: 'Can a chiropractor do massage?',
        a: 'Yes. Soft tissue work is part of chiropractic training, and at our clinic sports massage is carried out by a chiropractor or a physiotherapist after an assessment, depending on what the area needs.',
      },
      {
        q: 'Is it okay to have chiropractic and massage in the same week?',
        a: 'For most people, yes. Feeling a little tender for a day after either one is common, and the research reviews describe side effects of both as mostly mild and short lived. Let each practitioner know about the other.',
      },
      {
        q: 'Why does massage feel good but my pain keeps coming back?',
        a: 'Research on massage for back pain finds its effect is mostly short term. If the same spot tightens again within days, something is probably still loading it, such as a stiff joint, a weak area or how you sit, and that is worth having assessed.',
      },
      {
        q: 'How much do chiropractic and massage cost at your clinic?',
        a: 'Our published prices are bundles, listed on our Offers page. The sports recovery bundle, one sports massage and one electromodalities session, is RM200 instead of RM240. The new patient bundle, a chiropractic initial consultation with the first adjustment, an X-ray and a physiotherapy first visit, is RM588 instead of RM660. Both are website prices, claimed by WhatsApp message before you come in.',
      },
    ],
    citations: [
      {
        claim:
          'A review of 25 trials found massage eased lower back pain compared with no care, but mostly in the short term, and rated the evidence low to very low quality.',
        source:
          'Furlan et al. (2015), Massage for low-back pain, Cochrane Database of Systematic Reviews',
        url: 'https://doi.org/10.1002/14651858.CD001929.pub3',
      },
      {
        claim:
          'A review of 47 trials found spinal manipulation gave similar short term pain relief to other recommended options for chronic lower back pain, with a small improvement in function, and mostly mild, short lived side effects.',
        source:
          'Rubinstein et al. (2019), systematic review and meta-analysis of spinal manipulative therapy for chronic low back pain, BMJ',
        url: 'https://www.bmj.com/content/364/bmj.l689',
      },
      {
        claim:
          'Manual therapy, meaning spinal manipulation, mobilisation or soft tissue techniques such as massage, should be considered for low back pain only as part of a package of care that includes exercise.',
        source: 'NICE guideline NG59, Low back pain and sciatica in over 16s, recommendation 1.2.8',
        url: 'https://www.nice.org.uk/guidance/ng59/chapter/Recommendations',
      },
    ],
    draft: false,
  },
  {
    // Schedule pc041, built via the persistence-content-builder skill. "migraine vs cluster
    // headache" measures 0/mo in Ubersuggest MY; the demand is the head term "cluster headache"
    // (2,900/mo, SD 51), so the title leads with it. Page one is all medical authorities and
    // a drug brand, none of which covers red flags or the dentist/ENT/"sinus" misdiagnosis
    // detour, which is what this post owns. Doctor first by design: it says plainly that
    // chiropractic does not treat cluster headache. Its table (cluster vs migraine vs sinus
    // infection) deliberately avoids repeating the migraine vs tension vs neck headache table
    // on /conditions/migraine, and links to it instead. Vertigo was cut from the scheduled
    // scope as a separate intent ("vertigo" 33,100/mo). No lastReviewed until Valerie reads it.
    slug: 'migraine-vs-cluster-headache',
    title: 'Cluster Headache vs Migraine: How to Tell Them Apart',
    description:
      'Cluster headache or migraine? How attack length, timing and eye or nose signs tell them apart, and when a doctor is the right first call.',
    datePublished: '2026-10-19',
    author: 'Persistence Chiropractic Care',
    linksTo: 'migraine',
    // Hero is an AI-generated flat illustration (Higgsfield Nano Banana 2 Lite, 2026-10-19) in the
    // tech neck style. Not a clinic photo, so no Cheras modifier in the alt text.
    heroImage: {
      src: '/img/blog-cluster-hero.webp',
      alt: 'Illustration of a man standing by a window at night pressing one hand over his eye, with a golden glow around that eye and temple',
    },
    keyTakeaways: [
      {
        q: 'What is the main difference between cluster headache and migraine?',
        a: 'Attack length and timing. A cluster headache attack usually lasts 15 minutes to 3 hours and often comes at the same time each day for weeks. A migraine attack usually lasts 4 hours to 3 days and has no fixed clock.',
      },
      {
        q: 'Is cluster headache as common as migraine?',
        a: 'No. Cluster headache affects roughly 1 in 1,000 people over a lifetime, mostly men, while migraine is far more common and affects more women than men.',
      },
      {
        q: 'How can I tell them apart during an attack?',
        a: 'Restlessness plus a red or watering eye or a blocked nostril on the side of the pain points towards cluster headache. Wanting to lie still in a dark, quiet room, often with nausea, points towards migraine.',
      },
      {
        q: 'Can a chiropractor help with cluster headache?',
        a: 'No. Chiropractic does not treat cluster headache. It is a neurological condition that needs a doctor, often with a neurologist involved, and the main options are prescribed.',
      },
      {
        q: 'When should I see a doctor?',
        a: 'For any headache that might be cluster headache. Go to an emergency department for a first ever drooping eyelid or smaller pupil, or a sudden, severe headache unlike any before.',
      },
    ],
    faqs: [
      {
        q: 'Is a cluster headache a type of migraine?',
        a: 'No. Cluster headache is its own primary headache disorder, grouped with a family of headaches that cause eye and nose changes on the same side as the pain. Some people have both conditions, which is one reason a proper diagnosis matters.',
      },
      {
        q: 'Are cluster headaches dangerous?',
        a: 'Cluster headache itself is not considered life threatening, but the pain is severe and a few serious conditions can look similar. That is why a new pattern of one sided headaches with eye changes deserves a doctor’s assessment rather than a guess.',
      },
      {
        q: 'Does alcohol trigger cluster headaches?',
        a: 'Often, during a bout. Alcohol is one of the best known triggers while attacks are active, yet the same drink usually has no effect during the months between bouts.',
      },
      {
        q: 'Can a neck problem cause cluster headache?',
        a: 'There is no good evidence that it does. A headache coming from the neck is a separate, steadier pattern that starts at the base of the skull and follows neck position, and that is the kind of headache a neck assessment looks at.',
      },
      {
        q: 'What should I tell my doctor about my headaches?',
        a: 'When each attack starts, how long it lasts, which side it is on, any eye or nose changes, how often it happens, and what you were doing beforehand, including alcohol. A short diary and a photo of your eye during an attack make that much easier.',
      },
    ],
    citations: [
      {
        claim:
          'Cluster headache is defined as attacks of severe, strictly one sided pain around the eye or temple lasting 15 to 180 minutes, occurring from once every other day to eight times a day, with same side eye or nose signs or restlessness. About 10 to 15% of people have the chronic form without remission periods.',
        source: 'International Classification of Headache Disorders, ICHD-3, 3.1 Cluster headache',
        url: 'https://ichd-3.org/3-trigeminal-autonomic-cephalalgias/3-1-cluster-headache/',
      },
      {
        claim:
          'Pooled population studies put the lifetime prevalence of cluster headache at about 124 per 100,000 people, roughly 1 in 1,000, with a male to female ratio of about 4.3.',
        source:
          'Fischera M et al. (2008), The incidence and prevalence of cluster headache: a meta-analysis of population-based studies, Cephalalgia',
        url: 'https://doi.org/10.1111/j.1468-2982.2008.01592.x',
      },
      {
        claim:
          'In a nationwide Dutch survey of 1,163 people with cluster headache, the median time to diagnosis was three years, and 34% had consulted a dentist and 33% an ENT specialist before the diagnosis was made.',
        source:
          'van Vliet JA et al. (2003), Features involved in the diagnostic delay of cluster headache, Journal of Neurology, Neurosurgery and Psychiatry',
        url: 'https://doi.org/10.1136/jnnp.74.8.1123',
      },
      {
        claim:
          'Of 2,991 patients with a history of self described or physician diagnosed "sinus" headache and no sign of infection, 88% met the criteria for migraine-type headache.',
        source:
          'Schreiber CP et al. (2004), Prevalence of migraine in patients with a history of self-reported or physician-diagnosed "sinus" headache, Archives of Internal Medicine',
        url: 'https://doi.org/10.1001/archinte.164.16.1769',
      },
      {
        claim:
          'A drooping eyelid or a smaller pupil in one eye for the first time needs emergency care, even in someone already diagnosed with cluster headaches.',
        source: 'NHS, Cluster headaches',
        url: 'https://www.nhs.uk/conditions/cluster-headaches/',
      },
    ],
    draft: false,
  },
  {
    // Month 1 content schedule leftover pc014, built via the persistence-content-builder
    // skill. Targets "when to see a chiropractor". Page one was US clinic blogs written to win
    // the patient for one side; this post's angle is the Malaysian picture (Act 775 vs Medical
    // Council vs Act 774, the Employment Act MC rule) and an honest "doctor first" list. It
    // states plainly that a chiropractor is not a medical doctor, consistent with the client's
    // "Reviewed by", not "Medically reviewed by", decision. Links up to chiropractic-care.
    slug: 'chiropractor-vs-doctor',
    title: 'Chiropractor vs Doctor: When to See Which in Malaysia',
    description:
      'When to see a chiropractor and when to see a doctor first in Malaysia: who does what, the signs that need a doctor, and how the two work together.',
    datePublished: '2026-10-12',
    author: 'Persistence Chiropractic Care',
    linksTo: 'chiropractic-care',
    // AI-generated flat illustration (Higgsfield, 2026-10-12), not a clinic photo.
    heroImage: {
      src: '/img/blog-chiro-vs-doctor-hero.webp',
      alt: 'Illustration of a woman with lower back pain deciding between two doors, one marked with a stethoscope and one with a spine',
    },
    keyTakeaways: [
      {
        q: 'Is a chiropractor a doctor in Malaysia?',
        a: 'No. Chiropractors train in a chiropractic degree and register under the Traditional and Complementary Medicine Act 2016 (Act 775). They are not medical doctors, and cannot prescribe medicine or issue an MC.',
      },
      {
        q: 'When should I see a chiropractor first?',
        a: 'For back, neck or joint pain that changes with how you move, sit or sleep, such as stiffness after desk work or pain on particular movements, with no warning signs.',
      },
      {
        q: 'When should I see a doctor first?',
        a: 'After an accident or fall, with spreading numbness or weakness, fever or feeling unwell, a sudden severe headache, any bladder or bowel change, or when you need medicine or an MC.',
      },
      {
        q: 'What if I am not sure who to see?',
        a: 'A GP is the safest first door. A chiropractor who finds something outside their scope should refer you to a doctor, and the two often work best together.',
      },
      {
        q: 'Do I need a referral to see a chiropractor?',
        a: 'No. You can book directly. If your assessment suggests you need a doctor or a scan first, a good chiropractor will tell you and help you arrange it.',
      },
    ],
    faqs: [
      {
        q: 'Can a chiropractor give me an MC for work?',
        a: 'No. Under the Employment Act 1955, paid sick leave is tied to certification by a registered medical practitioner, and chiropractors are not medical practitioners. If you need an MC, see a doctor.',
      },
      {
        q: 'Can a chiropractor order an X-ray?',
        a: 'Where an X-ray will change the plan, we send you for one at the radiology department of Sunway Medical Centre Velocity, a short walk from the clinic, and go through the results with you. It is not needed for everyone.',
      },
      {
        q: 'Can I see a chiropractor and a doctor at the same time?',
        a: 'Yes, and many people do. Tell each of them about the other, and bring any scan reports or letters with you, so neither is working with half the picture.',
      },
      {
        q: 'Is it safe to see a chiropractor while I am on medication?',
        a: 'Usually, but tell your chiropractor what you take. Blood thinning medication, long term steroids and some other conditions change what is appropriate, and the assessment takes them into account.',
      },
      {
        q: 'Should I see a chiropractor or a physiotherapist?',
        a: 'Both are reasonable for mechanical back and neck pain. Chiropractic focuses on how joints move, physiotherapy on exercise and rehabilitation, and at our clinic the two work together, so the assessment decides where to start.',
      },
    ],
    citations: [
      {
        claim:
          'Under the Traditional and Complementary Medicine (Recognized Practice Areas) Order 2017, chiropractic is a recognised practice area, and practitioners must apply to the T&CM Council for registration.',
        source: 'Thoo & Partners, "Registration of Traditional and Complementary Medicine Practitioners"',
        url: 'https://www.thoopartners.com/registration-of-traditional-and-complementary-medicine-practitioners/',
      },
      {
        claim:
          'Section 60F of the Employment Act 1955 ties paid sick leave to examination and certification by a registered medical practitioner.',
        source: 'Pelim, "Sick Leave under the Employment Act 1955"',
        url: 'https://pelim.my/sick-leave-under-the-employment-act-1955/',
      },
      {
        claim:
          'UK guidance suggests considering manual therapy, including spinal manipulation, for low back pain only as part of a package that includes exercise.',
        source: 'National Institute for Health and Care Excellence (NICE), guideline NG59',
        url: 'https://www.nice.org.uk/guidance/ng59/chapter/Recommendations',
      },
    ],
    // Reviewed by Valerie Na, confirmed by the user 2026-10-19.
    lastReviewed: '2026-10-19',
    draft: false,
  },
  {
    // Month 2 content schedule item pc031, built via the persistence-content-builder skill.
    // Targets "lower back pain exercises". Volume unmeasured (Ubersuggest MY returned no data;
    // disconnected when built). Page one is international publishers with one flat list each;
    // this post's angle is the split the evidence makes between a fresh flare (exercise adds
    // little over staying active) and recurring/chronic pain (exercise helps). None of its
    // seven exercises repeat /blog/sciatica-exercises, so the two posts do not compete; leg
    // symptoms are handed off there. Links up to /conditions/back-pain.
    // Images: AI-generated flat illustrations (Higgsfield Nano Banana 2, 2026-10-12), the
    // same woman and style as /blog/sciatica-exercises, generated with that post's press-up
    // frame as a style-only reference. Not clinic photos, so no Cheras modifier in alt text.
    slug: 'lower-back-pain-exercises',
    title: 'Lower Back Pain Exercises: For Flare-Ups and Desk Days',
    description:
      'Lower back pain exercises for a fresh flare-up and for a back that keeps coming back, what the research says about each, and when to stop. From Cheras.',
    datePublished: '2026-10-12',
    author: 'Persistence Chiropractic Care',
    linksTo: 'back-pain',
    heroImage: {
      src: '/img/blog-lower-back-hero.webp',
      alt: 'Illustration of an office worker rising from her chair with both hands on her lower back and a golden glow over the sore area',
    },
    keyTakeaways: [
      {
        q: 'Do lower back pain exercises help?',
        a: 'It depends on the stage. For a fresh flare, research finds structured exercise adds little over simply staying active. For back pain lasting more than about three months, a Cochrane review found exercise reduces pain by an amount people notice.',
      },
      {
        q: 'What should I do in the first days of a lower back pain flare?',
        a: 'Keep moving gently: short walks, knee rolls, pelvic tilts and cat-camel, in whatever range is comfortable. Bed rest tends to leave the back stiffer.',
      },
      {
        q: 'Which exercises help a back that keeps coming back?',
        a: 'Building endurance around the trunk and hips, with moves such as the dead bug, side plank from the knees and hip hinge, increased gradually over weeks rather than days.',
      },
      {
        q: 'When should I stop a lower back exercise?',
        a: 'If it causes sharp pain, sends pain into your leg, or leaves your back worse the next morning. A mild ache while moving is normally fine.',
      },
      {
        q: 'What helps lower back pain from sitting at a desk?',
        a: 'Breaking up the sitting. Every 30 to 45 minutes, stand, walk, do a few gentle back bends and hip hinges, then sit back down with your lower back supported.',
      },
    ],
    faqs: [
      {
        q: 'Should I rest or exercise with lower back pain?',
        a: 'For most lower back pain, staying gently active is better than bed rest, which tends to leave the back stiffer. Rest from whatever clearly makes it worse, but keep moving in the ways that feel comfortable.',
      },
      {
        q: 'How long until lower back pain exercises help?',
        a: 'A fresh flare often settles over a few weeks whatever exercise you do. For back pain that keeps returning, strength work usually needs several weeks of steady practice before the difference shows.',
      },
      {
        q: 'Is it normal for my back to ache after exercising?',
        a: 'A mild ache that settles within a few hours is common when you start moving a sore back again. Pain that is sharp, spreads into your leg, or is worse the next morning means that exercise should be eased off or left out.',
      },
      {
        q: 'Are sit-ups good for lower back pain?',
        a: 'Not usually the best choice. Repeated sit-ups bend the lower back over and over under load. Exercises such as the dead bug and side plank build the same trunk muscles while keeping the back steadier.',
      },
      {
        q: 'What if my lower back pain goes down my leg?',
        a: 'Pain travelling down the leg, especially past the knee or with tingling or numbness, suggests a nerve is involved, and some of these exercises may not suit it. Our sciatica exercises guide covers that pattern, and it is worth having assessed.',
      },
    ],
    citations: [
      {
        claim:
          'A Cochrane review of 249 trials found moderate certainty evidence that exercise reduces pain in chronic non specific low back pain by a clinically important amount compared with no exercise programme, usual care or placebo.',
        source: 'Hayden et al. (2021), Cochrane Database of Systematic Reviews',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8477273/',
      },
      {
        claim:
          'A systematic review of systematic reviews found exercise therapy may make little or no important difference to pain or disability in acute low back pain compared with other options, including advice to stay active.',
        source: 'Karlsson et al. (2020), Systematic Reviews',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7427286/',
      },
      {
        claim:
          'UK guidance advises keeping active for low back pain and recommends considering a structured exercise programme for a specific episode or flare-up.',
        source: 'National Institute for Health and Care Excellence (NICE), guideline NG59',
        url: 'https://www.nice.org.uk/guidance/ng59/chapter/Recommendations',
      },
    ],
    // Reviewed by Valerie Na, confirmed by the user 2026-10-19.
    lastReviewed: '2026-10-19',
    draft: false,
  },
  {
    // Month 2 content schedule item pc024, scheduled as a condition page and built as a blog
    // post by user decision (2026-10-03): the SERP is entirely informational (Physiopedia,
    // Yale, WebMD, a PMC review), and a condition page would split desk and phone neck pain
    // searches with /conditions/neck-pain, whose FAQ already calls tech neck "an informal
    // term, not a medical diagnosis". Targets "tech neck" (590/mo, SD 30, Ubersuggest
    // Malaysia) over the schedule's "text neck" (170/mo). Angle: what the research actually
    // shows, against competitors' unsourced "your head weighs 60 pounds" claims, which are
    // deliberately not repeated here. Hero and figures are AI-generated flat illustrations
    // (2026-10-03), chosen over photorealism to avoid the uncanny look and because arrows
    // can show direction of movement. Site palette: slate-blue arrows, a gold (not red) pain
    // glow per DESIGN.md's Diagnostic Signal Rule. The doorway frame is a stand-in by user
    // decision (2026-10-03, no credits to regenerate): the doorway is drawn face-on with the
    // figure in profile, and it shows hands on the frame where the steps say forearms. Swap
    // it for a render matching the steps (corrected prompt given 2026-10-03) when possible.
    slug: 'tech-neck',
    title: 'Tech Neck: What It Is and What Actually Helps',
    description:
      'Tech neck, or text neck, is neck and shoulder ache from long hours looking down at screens. What the research says, and what helps, from a Cheras clinic.',
    datePublished: '2026-10-03',
    author: 'Persistence Chiropractic Care',
    linksTo: 'neck-pain',
    heroImage: {
      src: '/img/blog-tech-neck-hero.webp',
      alt: 'Illustration of a man bent over his phone with a golden glow over the back of his neck and upper back, beside a dashed outline of an upright posture',
    },
    keyTakeaways: [
      {
        q: 'What is tech neck?',
        a: 'Tech neck, or text neck, is an informal name for the neck, shoulder and upper back ache that builds up from long hours looking down at a phone, tablet or laptop. It describes a pattern rather than being a medical diagnosis.',
      },
      {
        q: 'Does using a phone cause neck pain?',
        a: 'The evidence is weaker than most articles suggest. A systematic review found only limited evidence linking phone and tablet use with neck symptoms, and a study of young adults found no link between texting posture and neck pain.',
      },
      {
        q: 'What helps tech neck most?',
        a: 'Raising the screen towards eye level, changing position every 30 to 45 minutes, and a few simple exercises such as chin tucks and shoulder blade squeezes. Long periods of stillness seem to matter as much as the angle of your neck.',
      },
      {
        q: 'How is tech neck different from a pinched nerve?',
        a: 'Tech neck usually stays in the neck, shoulders and upper back. Pain, tingling, numbness or weakness travelling into one arm points more towards an irritated nerve and is worth having assessed.',
      },
      {
        q: 'When should I get tech neck checked?',
        a: 'If it has not eased after a week or two of better habits, keeps coming back, spreads into an arm, or comes with worsening headaches, or after a fall or road accident.',
      },
    ],
    faqs: [
      {
        q: 'Is tech neck permanent?',
        a: 'Usually not. For most people it is muscle and joint discomfort that eases as screen habits change and the neck gets moving again. Long standing stiffness can take longer to change, which is when an assessment and a structured exercise plan tend to be worth it.',
      },
      {
        q: 'Can tech neck give you a hump at the base of the neck?',
        a: 'A rounded upper back and a forward head are common in people who spend long hours at screens, and that can make the base of the neck look more prominent. A hump that is fixed and does not straighten when you stand tall, especially in older adults, can have other causes such as changes in the bones, and is worth having checked rather than assumed to be posture.',
      },
      {
        q: 'Do posture correctors help with tech neck?',
        a: 'A brace can remind you to sit up for a while, but it does not build the strength and endurance needed to hold a better position on your own. Regular movement breaks and exercises for the neck and upper back tend to be a better use of the money.',
      },
      {
        q: 'Can children get tech neck?',
        a: 'Children and teenagers use screens for long stretches too, and can get sore necks from it. Interestingly, research has not found the same link between a forward head and neck pain in teenagers that it has in adults. Screen breaks and holding devices higher are sensible habits at any age.',
      },
      {
        q: 'How long does tech neck take to ease?',
        a: 'Mild cases often settle within a week or two once the setup and habits change. If it has gone on for months, or keeps returning, it generally takes longer, and finding out what is driving it is a better next step than waiting.',
      },
    ],
    citations: [
      {
        claim:
          'A systematic review of 45 studies found limited evidence that mobile touch screen device use, including the amount of use and the positions used, is associated with musculoskeletal symptoms, mainly because of low quality studies.',
        source: 'Toh, Coenen, Howie & Straker (2017), PLOS ONE',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5546699/',
      },
      {
        claim:
          'A cross-sectional study of 150 young adults aged 18 to 21 found no association between neck posture while texting on a mobile phone and neck pain.',
        source: 'Damasceno et al. (2018), European Spine Journal',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29306972/',
      },
      {
        claim:
          'A systematic review and meta-analysis found adults with neck pain showed more forward head posture than adults without it, with forward head posture correlated with pain and disability in adults, but no such association for most neck pain measures in adolescents.',
        source: 'Mahmoud et al. (2019), Current Reviews in Musculoskeletal Medicine',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6942109/',
      },
    ],
    // Reviewed by Valerie Na, confirmed by the user 2026-10-03.
    lastReviewed: '2026-10-03',
    draft: false,
  },
  {
    // Month 2 content schedule item pc032, built via the persistence-content-builder skill.
    // Targets "sciatica exercises" (1,300/mo, SD 48, Ubersuggest Malaysia locId 2458). Page
    // one is all international publishers (NHS, HSS, Harvard, Healthline), none of which
    // match an exercise to the cause or give a stop rule; those two are this post's angle.
    // Links up to /conditions/sciatica, which targets "sciatica treatment" (no collision).
    // Hero and exercise figures are AI-generated flat illustrations (2026-10-03), the same
    // style as /blog/tech-neck: slate-blue arrows, a GOLD pain glow (DESIGN.md keeps red for
    // animated diagrams). They replaced an earlier photorealistic set. Not clinic photos, so
    // no alt text carries the Cheras modifier. The bird dog arrows were mirrored by hand (the
    // render pointed them inwards). The figure-4 section reuses the knee to chest
    // illustration by user decision (2026-10-03): no correct figure-4 render exists yet. Its
    // alt text describes what it shows, not the figure-4. See OPEN-ITEMS 14.
    slug: 'sciatica-exercises',
    title: 'Sciatica Exercises: 7 Stretches to Try at Home',
    description:
      'Seven sciatica exercises and stretches, which ones suit which cause, and the one sign that tells you to stop. From a chiropractic and physio clinic in Cheras.',
    datePublished: '2026-10-03',
    author: 'Persistence Chiropractic Care',
    linksTo: 'sciatica',
    heroImage: {
      src: '/img/blog-sciatica-hero.webp',
      alt: 'Illustration of an office worker rising from a chair with a hand on his lower back, a golden line tracing sciatic nerve pain down one leg',
    },
    keyTakeaways: [
      {
        q: 'Do sciatica exercises help?',
        a: 'For most people, gentle exercise and staying active help more than bed rest, though over weeks rather than in a single session. The NHS says sciatica usually gets better in a few weeks to a few months.',
      },
      {
        q: 'Is there one best sciatica stretch?',
        a: 'No. Sciatica can come from a disc, a tight buttock muscle or a narrowed spinal canal, and a stretch that eases one cause can aggravate another. Prone press-ups and knee to chest stretches, for example, pull in opposite directions.',
      },
      {
        q: 'Which sciatica exercises are worth starting with?',
        a: 'Walking little and often, plus two or three gentle moves such as a figure-4 stretch, a glute bridge or a seated nerve glide. Add more only once you know how your leg responds.',
      },
      {
        q: 'How do I know if a sciatica exercise is making it worse?',
        a: 'Watch where the leg pain goes. If symptoms spread further down the leg, or numbness and pins and needles increase, stop that exercise. Pain retreating towards the buttock or back is often a good sign.',
      },
      {
        q: 'When should I see a doctor instead of exercising?',
        a: 'Straight away with loss of bladder or bowel control, numbness around the groin, sciatica in both legs, worsening leg weakness, or fever or weight loss alongside new sciatica. Otherwise, get assessed if things have not improved after a few weeks.',
      },
    ],
    faqs: [
      {
        q: 'Should I stretch through sciatica pain?',
        a: 'No. Aim for a mild stretch, never sharp or spreading pain. Pushing through pain that travels further down the leg tends to irritate the nerve more, not less.',
      },
      {
        q: 'How often should I do sciatica exercises?',
        a: 'Twice a day is a sensible start, with short walks in between. Little and often generally suits an irritated nerve better than one long session.',
      },
      {
        q: 'Is walking good for sciatica?',
        a: 'Usually, yes. Short walks on flat ground keep you moving without loading the nerve for long. If walking itself brings the leg pain on, as can happen with a narrowed spinal canal, build in sitting breaks.',
      },
      {
        q: 'Which exercises should I avoid with sciatica?',
        a: 'It depends on the cause. Forward bends and long sitting often aggravate disc related sciatica, while back bends often aggravate a narrowed spinal canal. Any exercise that sends symptoms further down your leg is one to drop, whatever the cause.',
      },
      {
        q: 'How long before sciatica exercises start to help?',
        a: 'Many people notice a difference over a few weeks, but it varies with the cause and how long symptoms have been there. If there is no improvement after a few weeks, an assessment is a better next step than more of the same exercises.',
      },
    ],
    citations: [
      {
        claim:
          'UK guidance advises keeping active for low back pain with or without sciatica, and recommends considering a structured exercise programme for a specific episode or flare-up.',
        source: 'National Institute for Health and Care Excellence (NICE), guideline NG59',
        url: 'https://www.nice.org.uk/guidance/ng59/chapter/Recommendations',
      },
      {
        claim:
          'Sciatica usually gets better in a few weeks to a few months, though it can sometimes last longer, and the NHS advises starting gentle exercise as soon as you can.',
        source: 'NHS, "Sciatica"',
        url: 'https://www.nhs.uk/conditions/sciatica/',
      },
      {
        claim:
          'A systematic review found centralisation, where spinal pain retreats towards the spine with repeated movement, in about 40 percent of patients, and confirmed it as a positive prognostic factor in low back pain.',
        source: 'May, Runge & Aina (2018), Musculoskeletal Science and Practice',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30273918/',
      },
    ],
    // Reviewed by Valerie Na, confirmed by the user 2026-10-03.
    lastReviewed: '2026-10-03',
    draft: false,
  },
  {
    // Month 2 content schedule item pc030, built via the persistence-content-builder skill.
    // Targets "tit tar" (1,000/mo, SD 9, Ubersuggest Malaysia locId 2458) with "tit tar vs
    // chiropractic" as the secondary. The SERP is split between chiropractic clinics and tit
    // tar centres, each arguing for its own side; this post's angle is the fair version
    // nobody on that page wrote. /services/chiropractic-care answers "is chiropractic the same
    // as tit tar?" in one FAQ paragraph, shallow enough to coexist (same as gonstead-technique).
    // Deliberately no price comparison: the only tit tar prices on the SERP have no source.
    slug: 'tit-tar-vs-chiropractic',
    title: "Tit Tar (跌打) vs Chiropractic: What's Actually Different",
    description:
      'Tit tar and chiropractic both use hands-on joint work, but the training, registration and assessment differ. A fair comparison from a Cheras clinic.',
    datePublished: '2026-10-02',
    author: 'Persistence Chiropractic Care',
    linksTo: 'chiropractic-care',
    // Real clinic photography, reused from the chiropractic-care service page's mid-article
    // slot (lib/services.ts) rather than sourcing anything new.
    heroImage: {
      src: '/img/hero-consult-spine-model.webp',
      alt: 'Chiropractor explaining a spine model to a patient beside an X-ray at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    keyTakeaways: [
      {
        q: 'Is tit tar the same as chiropractic?',
        a: 'No. Tit tar (跌打) is the bone setting and injury branch of traditional Chinese medicine, with roots in the martial arts. Chiropractic is a separate profession with its own degree. Both use hands-on joint work, which is why they get confused.',
      },
      {
        q: 'How are tit tar and chiropractic regulated in Malaysia?',
        a: 'Both sit under the Traditional and Complementary Medicine Act 2016 (Act 775), but as different recognised practice areas: traditional Chinese medicine and chiropractic. Since 1 March 2021, practitioners in either area have had to apply to register with the T&CM Council.',
      },
      {
        q: 'Does the crack mean a bone went back into place?',
        a: 'Usually not. Imaging research links the sound to a gas cavity forming inside the joint as its surfaces separate. It says nothing about whether a bone moved back, or how good the session was.',
      },
      {
        q: 'What is the biggest practical difference between tit tar and chiropractic?',
        a: 'How the problem is worked out. Chiropractic assessment follows a set sequence of history, physical and neurological checks and, when needed, an X-ray before any adjustment. Tit tar assessment varies much more from one practitioner to the next.',
      },
      {
        q: 'When should I see a doctor instead of either?',
        a: 'After a fall where you cannot bear weight or the area looks out of shape, with spreading numbness or weakness, any change in bladder or bowel control, back pain with fever, or pain after a road accident. Those need ruling out before anyone manipulates a joint.',
      },
    ],
    faqs: [
      {
        q: 'Is tit tar safe?',
        a: 'It depends a great deal on who is doing it. Ask about their training and which practice area they are registered in, and tell them about any recent fall, osteoporosis or blood thinning medication. Firm manipulation over an undiagnosed fracture or fragile bone can cause harm, which is why a suspected fracture needs an X-ray first. The same caution applies to chiropractic.',
      },
      {
        q: 'Can I see a chiropractor after going for tit tar?',
        a: 'Yes, and many of our patients have. Tell us what was done and when, and mention any liniments or plasters you are still using. If an area is still bruised or very tender from a recent session, we may wait or work elsewhere first.',
      },
      {
        q: 'Is tit tar or chiropractic better for back pain?',
        a: 'We are not aware of good research comparing the two directly, so anyone claiming one is clearly better is going beyond the evidence. What tends to matter more is whether the cause of your back pain was properly worked out first, and whether the plan includes what you do between visits.',
      },
      {
        q: 'Do chiropractors use herbal liniments like dit da jow?',
        a: 'No. Chiropractic care uses adjustments, soft tissue work and exercise advice, not herbs or ointments. If you are using a liniment at home, that is fine to mention, and it does not stop you having a chiropractic assessment.',
      },
      {
        q: 'How do I check whether a tit tar practitioner or chiropractor is registered?',
        a: 'Ask for their T&CM Council registration number and which practice area it covers, traditional Chinese medicine or chiropractic. For a chiropractor, membership of the Association of Chiropractic Malaysia is a separate thing worth asking about too.',
      },
    ],
    citations: [
      {
        claim:
          'Under the Traditional and Complementary Medicine (Recognized Practice Areas) Order 2017, the recognised practice areas include traditional Chinese medicine and chiropractic as separate areas, and practitioners in any recognised area have had to apply to the T&CM Council for registration since 1 March 2021.',
        source: 'Thoo & Partners, "Registration of Traditional and Complementary Medicine Practitioners"',
        url: 'https://www.thoopartners.com/registration-of-traditional-and-complementary-medicine-practitioners/',
      },
      {
        claim:
          "A 2023 survey of adults in Malaysia's Klang Valley found that only 4.8 percent were aware of the Act that regulates chiropractic practice, despite almost half of respondents holding a university degree.",
        source: 'Wong, Haneline & Tan (2023), Journal of Chiropractic Humanities',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10562678/',
      },
      {
        claim:
          'Real-time MRI of finger joints showed the cracking sound coincides with a gas cavity forming as the joint surfaces separate, rather than the collapse of an existing bubble.',
        source: 'Kawchuk et al. (2015), PLOS ONE',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4398549/',
      },
    ],
    // Reviewed by Valerie Na, confirmed by the user 2026-10-03.
    lastReviewed: '2026-10-03',
    draft: false,
  },
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
    // Reviewed by Valerie Na, confirmed by the user 2026-10-03.
    lastReviewed: '2026-10-03',
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
      alt: 'Chiropractic room with adjustment tables at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
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
    // Reviewed by Valerie Na, confirmed by the user 2026-10-03.
    lastReviewed: '2026-10-03',
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
