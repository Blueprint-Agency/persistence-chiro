/**
 * Condition pages — symptom-first intent ("back pain treatment KL").
 *
 * Shape is fixed (symptoms -> how we help -> FAQ), so this is typed data rather than
 * MDX: it gives us FAQPage schema for free and stops the six pages drifting apart.
 * Blog prose stays MDX; this does not.
 *
 * `body` and `faqs` are the clinical copy that must come from the clinic — see
 * `proposed-site-architecture.md` § Content migration. Pages with `draft: true` are
 * excluded from the sitemap and nav until that copy lands, so we never ship a thin
 * indexed page.
 */
import type { Locale } from './i18n.ts'
import type { ComparisonData } from './comparison.ts'
import { conditionsZh } from './conditions.zh.ts'
import { conditionsMs } from './conditions.ms.ts'

export type Condition = {
  slug: string
  /** <h1>. Must be unique across the site. */
  title: string
  /**
   * <title>, WITHOUT the brand. The root layout's title template appends
   * " | Persistence Chiropractic" — spelling it out here too renders it twice.
   * Keep to ~45 chars so the whole thing stays under ~60 in the SERP.
   */
  metaTitle: string
  metaDescription: string
  /** Primary keyword this page owns. No two pages may share one. */
  targetKeyword: string
  /** Slugs of conditions to cross-link. Two each, per the internal-linking rules. */
  related: string[]
  /**
   * Physiotherapy modality slugs that help with this condition.
   *
   * Named `helpedBy`, not `treatedBy`. The word is banned in published copy (see the
   * non-negotiable in AGENTS.md) and an identifier is where the banned verb creeps back in:
   * the next person writing the heading above this list reaches for the field name.
   */
  helpedBy: string[]

  /** Lead paragraph under the h1. Plain language — the reader is in pain, not studying. */
  intro: string
  /**
   * "Does this sound like you?" — the self-identification list. This is what a
   * symptom-intent searcher scans for first, so it comes before any explanation.
   */
  symptoms: string[]
  /** Common contributors. Descriptive only — this page does not diagnose anyone. */
  /**
   * `image` is optional: a small square illustration beside the cause (hip pain, 2026-10-12).
   * Give every cause on a page one or none, so the rows stay even.
   */
  causes: { heading: string; body: string; image?: { src: string; alt: string } }[]
  /** What assessment and care actually involve here. */
  approach: { heading: string; body: string }[]
  /**
   * Symptoms that warrant urgent medical attention rather than a chiropractic
   * appointment. NON-NEGOTIABLE on every condition page: a clinic page that describes
   * symptoms without saying which ones are emergencies is unsafe, and the referral
   * language is already how the clinic describes its own practice in gonstead.ts.
   */
  redFlags: string[]
  /**
   * `links` wraps a phrase of the answer in an internal link, the same contract as
   * `Service.faqs[].links`: the phrase must occur exactly once (content.test.ts checks it), and
   * a target not live in this locale renders as plain text.
   */
  faqs: { q: string; a: string; links?: readonly { phrase: string; href: string }[] }[]

  /**
   * "Telling them apart" table, for a page whose reader is often unsure which of two to four
   * neighbouring problems they have (disc in the back or the neck, migraine or a neck
   * headache). A column `href` links to the sibling page that covers that problem in full.
   *
   * Optional and English-first: a locale without it renders the page exactly as before.
   */
  comparison?: ComparisonData

  /**
   * ---------------------------------------------------------------------------------------
   * Parity fields with `Service`. All optional, so a condition that has not been filled in
   * yet degrades to exactly the page it rendered before rather than to a broken one.
   *
   * These exist because the condition template was a tier below the service template on both
   * trust and conversion: no rating, no reviews, no reviewer byline, no citations, no mobile
   * sticky CTA. Conditions are the SYMPTOM-INTENT entry points, which is the top of the
   * funnel, so the pages a person in pain lands on first were the weakest ones we had.
   * ---------------------------------------------------------------------------------------
   */

  /**
   * Answer-engine extraction block. Five self-contained pairs, none repeating an FAQ below,
   * since both would otherwise publish the same answer twice on one route.
   */
  keyTakeaways?: { q: string; a: string }[]
  /**
   * Verifiable, cautiously worded facts attributed to a journal, guideline or regulator.
   * Never a competitor, never an efficacy promise.
   */
  citations?: { claim: string; source: string; url?: string }[]
  /**
   * Concern checkboxes for the "Is this right for you?" qualifier, which builds a prefilled
   * WhatsApp message from what the reader ticks. Phrase each as a symptom or a situation,
   * never as a diagnosis.
   */
  qualifierConcerns?: readonly string[]
  /**
   * ISO date the clinical copy was ACTUALLY reviewed by the named practitioner. Drives the
   * "Reviewed by" byline and the reviewedBy/lastReviewed schema.
   *
   * ⚠️ DO NOT SET THIS TO MAKE THE BYLINE APPEAR. It is a factual claim that a named,
   * registered practitioner read this page on that date. Unset means no claim is made, which
   * is the correct state until the clinic confirms a review actually happened — the same
   * contract as `registrationsVerified` in lib/clinic.ts and `googleReviews.verified`.
   *
   * CONFIRMED 2026-08-08: the client confirmed Valerie Na has reviewed the clinical copy on
   * all eight condition pages, so all eight now carry that date and the byline and
   * reviewedBy schema render. If the copy on a page changes materially, the honest move is
   * to have it re-read and move the date, not to leave a stale one standing.
   */
  lastReviewed?: string
  /**
   * ⚠️ NOT RENDERED ON THE PAGE YET, and deliberately unset on all eight conditions.
   *
   * Conditions use `PageHero`, which is text only, so there is no hero slot to put a
   * photograph in. The pair is declared because the OG card needs a source and an alt, and
   * because giving conditions a real hero is the obvious next step; setting them before that
   * slot exists would put an image in the data that no visitor ever sees.
   *
   * Until then every condition falls back to the sitewide shopfront card in lib/seo.ts,
   * which is honest but generic. Alt must describe what is in the frame, never the condition.
   */
  heroImage?: { src: string; alt: string }
  /** Pre-cropped 1200x630 JPEG under public/og/, derived from `heroImage`. */
  ogImage?: string

  draft: boolean
}

export const conditions: Condition[] = [
  {
    slug: 'back-pain',
    title: 'Lower and Upper Back Pain Care in Cheras, Kuala Lumpur',
    metaTitle: 'Lower & Upper Back Pain Care in Cheras, KL',
    metaDescription:
      'Lower back ache after sitting, or stiffness between the shoulder blades? Back pain assessment and care in Cheras, Maluri, with Gonstead chiropractic and rehab.',
    // Refreshed 2026-10-03 (schedule pc033). GSC: this page earned no impressions in 90 days
    // while the homepage ranked 3 to 6 for "back pain", "back pain treatment near me" and
    // "back treatment". The homepage is left to keep those; this page is the in-depth one.
    // Upper back folded in rather than split out (pc021 dropped): no measured demand for
    // "upper back pain" in Malaysia and no GSC queries for it.
    targetKeyword: 'back pain treatment kl',
    related: ['slipped-disc', 'sciatica', 'hip-pain', 'shoulder-imbalance', 'spinal-stenosis', 'spondylolisthesis'],
    helpedBy: ['physiotherapy', 'chiropractic-care'],

    intro:
      'Most back pain is mechanical. The joints, discs and muscles of the spine stop moving the way they should, and the tissue around them gets irritated. That is as true of a lower back that aches after a day in the chair as of an upper back that stiffens between the shoulder blades after hours on a laptop. It is very common, and it rarely means something is seriously wrong. Most of it settles without surgery. It is still worth finding out precisely what is going on rather than guessing at it.',
    symptoms: [
      'A dull ache low in the back that worsens through the day or after sitting',
      'Sharp pain on one particular movement, such as bending, twisting or standing up from a chair',
      'Stiffness in the morning that eases once you start moving',
      'Pain that spreads into the buttock or thigh',
      'Difficulty standing straight, or a sense that your back is "locked"',
      'Muscle spasm on one side of the spine',
      'Stiffness or a burning ache between the shoulder blades after long hours at a screen',
    ],
    causes: [
      {
        heading: 'Prolonged sitting',
        body: 'Long hours at a desk load the lower back continuously and let the muscles that support it switch off. This is the single most common contributor we see in Kuala Lumpur, and it responds well to a combination of hands-on care and changes to how you sit.',
      },
      {
        heading: 'Lifting and sudden loading',
        body: 'Lifting something heavy, awkwardly, or while twisting can strain the joints and soft tissue of the lower back. The pain often arrives hours later rather than at the moment of lifting.',
      },
      {
        heading: 'Joint restriction',
        body: 'When one spinal segment stops moving properly, the segments above and below compensate by moving more. Over time those neighbouring joints become irritated. Finding the restricted segment is what the Gonstead assessment is for.',
      },
      {
        heading: 'Upper back stiffness from screen work',
        body: 'The middle of the spine, between the shoulder blades, is built to rotate and extend, and long hours hunched over a laptop or phone ask it to do neither. The joints there stiffen, the muscles between the shoulder blades tire, and the ache often travels up into the neck. It is assessed segment by segment in the same way as the lower back.',
      },
      {
        heading: 'Deconditioning',
        body: 'Back pain that keeps returning usually has little to do with one injury. More often the supporting muscles lack the endurance to hold the spine in a decent position through a full working day, so the same tissue gets irritated again every few weeks.',
      },
    ],
    approach: [
      {
        heading: 'We find the segment before we work on it',
        body: 'Your first visit follows the Gonstead six-step assessment: history, visualisation, instrumentation, palpation, X-ray analysis where indicated, and only then an adjustment. We want to know which specific joint is producing your pain before anything is adjusted. Adjusting the whole spine and hoping is not how this works.',
      },
      {
        heading: 'Adjustment, delivered by hand',
        body: 'Once the segment is identified, the adjustment is specific to it. Your chiropractor will explain what they found and what they intend to do before anything happens.',
      },
      {
        heading: 'Then the part that stops it returning',
        body: 'An adjustment restores movement to a joint, but the muscle around it still has to be able to hold that position through a long day. Where the pattern is a recurring one, we pair chiropractic with physiotherapy-led rehabilitation and practical changes to your desk setup and daily loading.',
      },
    ],
    redFlags: [
      'Loss of bladder or bowel control, or numbness around the groin and inner thighs',
      'Progressive weakness in one or both legs',
      'Back pain following a significant fall or accident',
      'Unexplained weight loss, fever, or night pain that wakes you',
      'A history of cancer, osteoporosis, or long-term steroid use alongside new back pain',
      'Upper back pain together with chest pain, shortness of breath or sweating',
    ],
    faqs: [
      {
        q: 'How long does back pain take to settle?',
        a: 'It depends on how long you have had it, what is causing it, and what you do between visits. Short-term relief often comes quickly. Changing how your spine moves and rebuilding the muscle that supports it takes longer, usually months rather than weeks. Your chiropractor will give you a timeline specific to your case after the first assessment rather than a generic number.',
      },
      {
        q: 'Do I need an X-ray for back pain?',
        a: 'An X-ray gives us a clearer picture of what is happening in your spine: how each segment is positioned, how the discs and joints look, and whether anything is present that should change the plan. That is what makes the Gonstead assessment specific to your back rather than general. It is not mandatory for every patient, though, and it is avoided for pregnant women and children unless there is a clear reason. Your chiropractor will explain why an X-ray is or is not indicated in your case.',
      },
      {
        q: 'Should I rest or keep moving?',
        a: 'For most mechanical back pain, gentle movement helps more than bed rest. Light walking stimulates blood flow and stops the area stiffening further. Avoid movements that clearly aggravate it, and hold off on vigorous exercise for a few days after an adjustment.',
      },
      {
        q: 'Is upper back pain different from lower back pain?',
        a: 'Often, yes. Lower back pain tends to come from long sitting, bending and lifting, and can spread into the buttock or leg. Upper back pain, between the shoulder blades, is more often tied to hours at a screen and usually travels up into the neck and shoulders instead. Upper back pain that comes with chest pain or shortness of breath is a different matter and needs a doctor first.',
      },
      {
        q: 'Why does my upper back ache after a day on my laptop or phone?',
        a: 'Hours of looking down keep the joints between the shoulder blades still and the muscles around them working without a break. Raising the screen and moving every half hour usually helps. Our post on tech neck covers the setup and four simple exercises.',
        links: [{ phrase: 'tech neck', href: '/blog/tech-neck' }],
      },
      {
        q: 'Is it just back pain, or could it be a slipped disc?',
        a: 'Most back pain is not a disc problem. A disc becomes more likely when the pain shoots down one leg past the knee, or comes with tingling, numbness or weakness in the leg. Our slipped disc page goes through those signs, and the assessment is what tells them apart.',
        links: [{ phrase: 'slipped disc page', href: '/conditions/slipped-disc' }],
      },
      {
        q: 'Is chiropractic safe if my back pain is severe?',
        a: 'Severity alone does not rule out chiropractic care, but it does change the assessment. Some presentations need imaging or a medical referral first, and if your chiropractor believes another healthcare provider would serve you better, you will be referred. Tell us about any recent trauma, numbness, or weakness when you book.',
      },
    ],
    keyTakeaways: [
      {
        q: 'What causes most back pain?',
        a: 'Most is mechanical, meaning it comes from how the spine is being loaded and moved rather than from serious disease. That is why the assessment looks at movement before it looks for anything else.',
      },
      {
        q: 'Do I need a referral to come in?',
        a: 'No. You can book directly with us in Cheras. If your case needs imaging or a medical opinion first, we will tell you and help you arrange it.',
      },
      {
        q: 'What happens on a first visit?',
        a: 'Mostly assessment. History, then the Gonstead six steps, then an explanation in plain terms of what we found before anything is adjusted.',
      },
      {
        q: 'Will I have to keep coming back?',
        a: 'We will not quote a number of visits or sell a package at the first appointment. We review as we go and tell you when we think you no longer need us.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'My lower back aches after sitting or standing for a while',
      'The pain keeps coming back every few months',
      'I struggle to bend, lift or get out of a chair',
      'I have had back pain for months and want it assessed properly',
      'I am not sure whether I need a chiropractor or a physiotherapist',
    ],
    citations: [
      {
        claim:
          'Low back pain is consistently ranked the single leading cause of years lived with disability worldwide.',
        source: 'Global Burden of Disease Study, The Lancet',
        url: 'https://www.thelancet.com/journals/lanrhe/article/PIIS2665-9913(23)00098-X/fulltext',
      },
      {
        claim:
          'Clinical guidelines recommend staying active and using exercise based care for most non specific low back pain, rather than prolonged rest.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
    ],
    comparison: {
      heading: 'Lower back pain, upper back pain, sciatica or a slipped disc?',
      intro:
        'Back pain falls into a few common patterns, and each is looked after a little differently. This is a rough guide to which one you might be dealing with, and the linked columns go to the page that covers it in full.',
      columns: [
        'Lower back pain',
        'Upper back pain',
        { label: 'Sciatica', href: '/conditions/sciatica' },
        { label: 'Slipped disc', href: '/conditions/slipped-disc' },
      ],
      rows: [
        {
          label: 'Where you feel it',
          cells: [
            'Across the lower back, sometimes into the buttock',
            'Between the shoulder blades, often up into the neck',
            'Buttock and down the back of one leg, often past the knee',
            'Lower back or neck, often with pain into one leg or arm',
          ],
        },
        {
          label: 'Often linked to',
          cells: [
            'Long sitting, bending and lifting',
            'Long hours at a laptop or phone',
            'An irritated nerve, from a disc, a tight buttock muscle or a narrowed canal',
            'Repeated bending or a sudden lift',
          ],
        },
        {
          label: 'Tingling or numbness',
          cells: [
            'Usually none',
            'Usually none',
            'Common, in the calf, foot or toes',
            'Common when a nerve is involved',
          ],
        },
        {
          label: 'What to do first',
          cells: [
            'Keep moving gently, and book in if it is not easing after a week or two',
            'Change your screen setup and move more; book in if it keeps returning',
            'Book an assessment, sooner if a leg is weak or numb',
            'Book an assessment, and see a doctor the same day for any bladder or bowel change',
          ],
        },
      ],
      note: 'Real backs overlap. A stiff lower back and sciatica often arrive together, and a disc is one of the things that can cause sciatica. The table tells you where to start reading; the assessment is what tells them apart.',
    },
    lastReviewed: '2026-10-03',
    draft: false,
  },
  {
    slug: 'slipped-disc',
    title: 'Slipped Disc in the Lumbar Region and Neck, Cheras KL',
    metaTitle: 'Slipped Disc (Lower Back & Neck) Care, Cheras KL',
    metaDescription:
      'Bulging, prolapsed or herniated disc in your lower back or neck? Non-surgical assessment and care in Cheras, Maluri, with X-ray and a staged plan.',
    /**
     * Was `slipped disc treatment malaysia`, which measures 0/mo. `slipped disc lumbar region`
     * (590/mo, difficulty 10) is the tracked KPI keyword in kpi-keyword-map.md. The content
     * schedule's `slipped disc remedy` (1,000/mo, difficulty 50, informational) is left for a
     * blog post: a home-remedy searcher is not looking for a clinic page. Decided 2026-10-01.
     */
    targetKeyword: 'slipped disc lumbar region',
    related: ['back-pain', 'sciatica', 'pinched-nerve'],
    helpedBy: ['physiotherapy', 'chiropractic-care'],

    intro:
      '"Slipped disc" is the everyday name for a disc that has bulged or herniated. The soft centre of a spinal disc pushes outward against the tougher ring around it, sometimes far enough to press on a nearby nerve. Nothing has actually slipped out of place, which is why the term sounds more alarming than it needs to. Most happen in the lumbar region, the lower back, where the spine carries the most load, and most of the rest in the neck. Many discs settle with time and the right loading, and most people never need surgery. The plan depends on which level is involved and how the nerve is behaving, so that is what the first appointment sets out to establish.',
    symptoms: [
      'Back pain with pain, tingling or numbness travelling into the buttock, leg or foot',
      'Pain that spikes when you cough, sneeze or strain',
      'A sharp catch when bending forward, or difficulty sitting for long',
      'Neck pain with symptoms running into the shoulder, arm or hand',
      'Weakness in a foot, ankle or grip on one side',
      'Symptoms that ease when lying down and return on standing or sitting',
      'Pins and needles in a defined band of skin rather than the whole limb',
    ],
    causes: [
      {
        heading: 'Sustained flexion',
        body: 'Sitting bent forward for hours at a desk, in traffic or over a phone loads the front of the disc and pushes its contents backward. Repeated over years, this is the most common background to a disc problem we see in Kuala Lumpur.',
      },
      {
        heading: 'Lifting with a rounded back',
        body: 'Lifting while bent and twisted places a high, uneven load on the disc. The event itself may feel minor at the time, with symptoms arriving hours or a day later.',
      },
      {
        heading: 'Age-related disc change',
        body: 'Discs lose water content and height over time, which reduces their tolerance to load. This is a normal part of ageing and does not by itself mean pain. It does mean a given movement asks more of the disc than it once did.',
      },
      {
        heading: 'Restricted joints above and below',
        body: 'When neighbouring spinal segments stop moving well, the segment that still moves takes more of the load. Identifying which levels have stopped moving is a large part of what the assessment is for.',
      },
    ],
    approach: [
      {
        heading: 'Establishing which level is involved',
        body: 'Your first visit follows the Gonstead six-step assessment: history taking, visualisation, instrumentation with the nervoscope, palpation including a full-motion assessment of the spinal and pelvic joints, X-ray analysis where indicated, and only then an adjustment. X-rays are used to rule out pathology and assess the intervertebral discs and joints, which matters more with a suspected disc problem than with ordinary mechanical back pain.',
      },
      {
        heading: 'Non-surgical care, delivered specifically',
        body: 'We start with conservative care. Once the involved segment is identified, the adjustment is specific to it and delivered by hand, and your chiropractor will explain what they found and what they intend to do before anything happens. Where the presentation calls for imaging beyond X-ray or a specialist opinion, you will be referred appropriately. That judgement is made at the assessment stage.',
      },
      {
        heading: 'Loading the spine back to tolerance',
        body: 'Alongside chiropractic care, our physiotherapy side works on how you sit, hinge and lift, and builds tolerance in the muscles that share load with the disc. This is slower going than the work on the table, and it is usually what decides whether the problem keeps coming back.',
      },
    ],
    redFlags: [
      'Loss of bladder or bowel control, or numbness around the groin, buttocks and inner thighs',
      'Weakness in both legs, or weakness that is getting worse rather than staying steady',
      'A foot that drags or that you cannot lift properly',
      'Severe, unrelenting pain that is not eased by any position, including lying down',
      'Disc symptoms following a significant fall, road accident or direct trauma',
      'Fever, unexplained weight loss, or a history of cancer alongside new spinal pain',
    ],
    faqs: [
      {
        q: 'Can a chiropractor help with a slipped disc, or do I need surgery?',
        a: 'Many disc presentations are managed conservatively. Surgery is generally considered when conservative care has not helped, or when there is progressive nerve weakness or a red-flag presentation. A surgical opinion is a legitimate and sometimes necessary step, and being sent for one does not mean anything has gone wrong. Your chiropractor will assess your case and refer you appropriately if a specialist would serve you better.',
      },
      {
        q: 'Is chiropractic adjustment safe with a herniated disc?',
        a: 'It depends on the presentation, which is why the assessment comes first. You may read that a disc should never be adjusted, or that any twisting technique is unsafe. The reality is less absolute. A Gonstead adjustment is specific to one segment and delivered by hand, the position is chosen for the case in front of us, and some disc presentations are better served by leaving the involved level alone, or by imaging or a medical opinion before anything else. X-ray, where indicated, helps rule out other causes before any adjustment. Tell us about any numbness, weakness or bladder and bowel changes when you book.',
      },
      {
        q: 'Bulging, protruding, prolapsed or herniated: what does my scan report mean?',
        a: 'These words describe how far the disc material has pushed outward. A bulge spreads a little beyond its usual edge all round, a protrusion or herniation pushes further out at one point, and an extrusion means material has broken through the outer wall. "Prolapsed" and "slipped" are everyday names for the same group. The word on the report matters less than how the nerve is behaving, and our post on bulging disc vs herniated disc goes through the terms in more detail.',
        links: [
          { phrase: 'bulging disc vs herniated disc', href: '/blog/bulging-disc-vs-herniated-disc' },
        ],
      },
      {
        q: 'What can I do at home for a slipped disc?',
        a: 'Stay as active as you comfortably can, and break up long spells of sitting every 30 minutes or so. Notice which positions ease the leg or arm symptoms and which bring them on: lying on your back with your knees bent, or on your side with a pillow between your knees, suits many people. Hold off on heavy lifting and long forward bending until it settles. If the symptoms keep spreading further down the leg or arm, or any weakness appears, book in rather than waiting it out.',
      },
      {
        q: 'Do I need an MRI before coming in?',
        a: 'Not usually. We start with the Gonstead assessment and X-ray analysis where indicated, which is enough to guide care in many cases. If your presentation suggests an MRI would change the plan, your chiropractor will say so and arrange the appropriate referral.',
      },
      {
        q: 'How long does a slipped disc take to settle?',
        a: 'Recovery varies a great deal with the size of the herniation, how long symptoms have been present, and how the spine is loaded day to day. Some people notice change within weeks, others need months of consistent work. Your chiropractor will give you a timeline based on your own assessment rather than a general figure.',
      },
    ],
    keyTakeaways: [
      {
        q: 'What is actually happening in a slipped disc?',
        a: 'The outer wall of a disc becomes irritated or bulges, and can press on nearby nerve tissue. Nothing slips out of place, despite the name, which is why the medical term is a herniated or prolapsed disc.',
      },
      {
        q: 'Does a slipped disc mean surgery?',
        a: 'For most people, no. Surgery is generally considered where there is progressive nerve weakness, a red flag presentation, or symptoms that have not settled with conservative care.',
      },
      {
        q: 'Does a scan showing a bulge explain my pain?',
        a: 'Not on its own. Disc bulges are commonly found in people with no symptoms at all, which is why what you can and cannot do matters more than the wording on a report.',
      },
      {
        q: 'Should I be resting?',
        a: 'Usually some movement is better tolerated than complete rest, but which movements suit you depends on your presentation. That is what the assessment is for.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'I have back pain with a symptom running into my leg',
      'I have been told I have a slipped or herniated disc',
      'Sitting or bending forward makes it worse',
      'I want to know whether surgery is my only option',
      'I have a scan report and would like it explained',
    ],
    citations: [
      {
        claim:
          'Imaging findings such as disc bulges and protrusions are commonly present in people without any symptoms, and increase with age.',
        source: 'Brinjikji et al. (2015), American Journal of Neuroradiology',
        url: 'https://www.ajnr.org/content/36/4/811',
      },
      {
        claim:
          'Non surgical care is the usual first approach for lumbar disc problems, with surgery considered for specific indications such as progressive neurological deficit.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
      {
        claim:
          'Herniated discs most often occur in the lower back, and most people feel better within a few weeks or months without surgery.',
        source: 'American Academy of Orthopaedic Surgeons, OrthoInfo',
        url: 'https://orthoinfo.aaos.org/en/diseases--conditions/herniated-disk-in-the-lower-back/',
      },
    ],
    comparison: {
      heading: 'Slipped disc in the lumbar region or the neck: how they differ',
      intro:
        'The disc problem is the same in both places. Where it sits changes where you feel it, what aggravates it and which nerve is involved, which is why the assessment starts by finding the level.',
      columns: ['Lumbar region (lower back)', { label: 'Neck', href: '/conditions/pinched-nerve' }],
      rows: [
        {
          label: 'Where the disc usually is',
          cells: [
            'Most often the lowest two levels of the lower back, where the spine carries the most load',
            'Most often the lower half of the neck',
          ],
        },
        {
          label: 'Where you feel it',
          cells: [
            'Low back pain, often with pain, tingling or numbness into the buttock, leg or foot',
            'Neck pain, often with pain, tingling or numbness into the shoulder blade, arm or hand',
          ],
        },
        {
          label: 'What tends to aggravate it',
          cells: [
            'Long sitting, bending forward, lifting, coughing or sneezing',
            'Looking down for long periods, sustained desk work, some head turns',
          ],
        },
        {
          label: 'Weakness to watch for',
          cells: [
            'A foot that drags, or difficulty lifting the toes or ankle',
            'A weaker grip, or dropping things from one hand',
          ],
        },
        {
          label: 'When it is urgent',
          cells: [
            'Bladder or bowel changes, or numbness around the groin: seek emergency care',
            'Clumsiness or unsteadiness in both hands or both legs: seek medical care promptly',
          ],
        },
      ],
      note: 'A table cannot tell you which level is involved, or whether your symptoms come from a disc at all. Plenty of leg and arm pain has other causes, and sorting that out is what the assessment is for.',
    },
    lastReviewed: '2026-10-03',
    draft: false,
  },
  {
    slug: 'sciatica',
    title: 'Sciatica and Sciatic Nerve Pain Care in Cheras, Kuala Lumpur',
    metaTitle: 'Sciatica & Sciatic Nerve Pain Care in Cheras, KL',
    metaDescription:
      'Sciatic nerve pain down the leg? Sciatica assessment and care in Cheras, KL, with Gonstead chiropractic and physiotherapy. Open seven days.',
    // Refreshed 2026-10-03 from GSC page queries (90 days, 411 impressions): "sciatica
    // treatment kl" (81, pos 35) is the strongest local term the page was already earning,
    // with a "sciatic nerve ..." cluster (kuala lumpur, physiotherapy, compression) its old
    // title never named. "sciatica exercises" belongs to /blog/sciatica-exercises, not here.
    targetKeyword: 'sciatica treatment kl',
    related: ['slipped-disc', 'hip-pain', 'back-pain', 'spinal-stenosis'],
    helpedBy: ['dry-needling', 'physiotherapy'],

    intro:
      'Sciatica is a description rather than a diagnosis. It names sciatic nerve pain that travels along the path of the sciatic nerve, from the lower back through the buttock and down the back of the leg. Something is irritating or compressing that nerve, and the assessment has to work out what and where. The cause is usually mechanical. Most people settle with conservative care and never need surgery.',
    symptoms: [
      'Pain running from the lower back or buttock down the back of one leg',
      'Burning, shooting or electric pain rather than a dull ache',
      'Tingling, pins and needles or numbness in the calf, foot or toes',
      'Symptoms usually on one side only',
      'Pain that worsens with prolonged sitting, driving, coughing or sneezing',
      'Weakness in the leg or foot, or a foot that feels heavy',
      'Difficulty finding a comfortable position at night',
    ],
    causes: [
      {
        heading: 'Disc irritation of the nerve root',
        body: 'A bulging or herniated disc in the lower back can press on or chemically irritate a nerve root where it exits the spine. This is one of the more common sources of true sciatic pain, and it is why the lower back is assessed even when the leg is what hurts.',
      },
      {
        heading: 'Narrowing of the nerve pathway',
        body: 'Age-related changes to the spinal joints and discs can reduce the space the nerve passes through. Symptoms in this pattern often build with standing or walking and ease when sitting or leaning forward.',
      },
      {
        heading: 'Tight or overworked gluteal muscles',
        body: 'The sciatic nerve passes close to the deep muscles of the buttock. Where those muscles are chronically tight or overloaded, they can contribute to symptoms that follow a similar path, so the hip and pelvis are examined alongside the spine.',
      },
      {
        heading: 'Prolonged sitting and pelvic position',
        body: 'Long hours seated, particularly on a wallet or with one leg crossed, load the lower back and buttock unevenly. This rarely causes sciatica on its own, but it commonly keeps an existing irritation going.',
      },
    ],
    approach: [
      {
        heading: 'Tracing the pain back to its source',
        body: 'You feel it in the leg, but it usually comes from the spine or the pelvis. Your first visit follows the Gonstead six-step assessment: history taking, visualisation, nervoscope instrumentation, palpation with a full-motion assessment of the spinal and pelvic joints, X-ray analysis where indicated, and only then an adjustment. We are looking for the specific level or joint involved.',
      },
      {
        heading: 'Adjustment and soft tissue work together',
        body: 'Once the source is identified, the adjustment is specific to it and delivered by hand. Where tight gluteal or hip musculature is part of the picture, our physiotherapy side may add manual therapy or dry needling to reduce the tissue tension contributing to the irritation.',
      },
      {
        heading: 'Movement, then tolerance',
        body: 'Nerve symptoms tend to respond to restoring movement and then progressively rebuilding tolerance rather than to rest alone. You will usually be given specific movements to do between visits, along with practical changes to how long you sit and how you get in and out of a chair or car.',
      },
    ],
    redFlags: [
      'Loss of bladder or bowel control, or numbness around the groin, buttocks and inner thighs',
      'Sciatic symptoms down both legs at once',
      'Progressive weakness, or a foot you cannot lift or that drags when you walk',
      'Severe pain that no position relieves, including lying down',
      'Leg symptoms after a significant fall, accident or direct trauma',
      'Fever, unexplained weight loss, or a history of cancer alongside new sciatic pain',
    ],
    faqs: [
      {
        q: 'How long does sciatica last?',
        a: 'Many episodes of sciatica improve over a number of weeks, but it varies with the cause, how long symptoms have been present and how the spine is loaded each day. Symptoms that have been present for months generally take longer to change than a recent flare. Your chiropractor will give you a timeline based on your own assessment rather than a general figure.',
      },
      {
        q: 'Should I rest or keep moving with sciatica?',
        a: 'For most mechanical sciatica, gentle movement is better tolerated than prolonged bed rest, which tends to leave the area stiffer. Short walks and regular changes of position usually help more than staying still. Avoid movements that clearly worsen the leg symptoms, and follow the specific guidance you are given after your assessment.',
      },
      {
        q: 'Is my sciatica caused by a slipped disc?',
        a: 'Sometimes, though not always. A disc is one of several possible sources, and hip, pelvic and joint contributors are common too. Working out which one applies to you is the job of the assessment. We would not tell you the cause without examining you first.',
      },
      {
        q: 'Should I see a doctor, a specialist or a chiropractor for sciatica?',
        a: 'It depends on what comes with the leg pain. Any of the red flags above, such as bladder changes, numbness around the groin or a leg getting weaker, need a doctor or the emergency department the same day. For mechanical sciatica without those signs, a chiropractor or physiotherapist is a reasonable first stop, and we will refer you to a doctor or an orthopaedic specialist if the assessment points that way.',
      },
      {
        q: 'Is physiotherapy or chiropractic better for sciatica?',
        a: 'They tend to work best together rather than as rivals. Chiropractic care looks after spinal and pelvic joints that are not moving well, and physiotherapy builds the exercise programme and rebuilds tolerance for sitting, walking and lifting. Both are under one roof here, so the assessment decides which comes first. Our guide to sciatica exercises shows the kind of home programme physiotherapy starts from.',
        links: [{ phrase: 'sciatica exercises', href: '/blog/sciatica-exercises' }],
      },
      {
        q: 'Can a tight piriformis muscle cause sciatica?',
        a: 'It can contribute. The piriformis is a deep buttock muscle the sciatic nerve runs close to, and when it is tight or overloaded it can produce a deep buttock ache with pain down the leg that looks a lot like sciatica from the spine. Telling the two apart matters because they are looked after differently, which is why the hip and pelvis are examined alongside the lower back.',
      },
      {
        q: 'Do I need an injection or surgery for sciatica?',
        a: 'Most people with sciatica are managed without either. Injections and surgery are typically considered where conservative care has not helped, or where there is progressive nerve weakness or a red-flag presentation. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
    ],
    keyTakeaways: [
      {
        q: 'Is sciatica a diagnosis?',
        a: 'Not really. It describes a symptom pattern, pain following the sciatic nerve down the leg, rather than naming a cause. Working out what is irritating the nerve is the point of assessing it.',
      },
      {
        q: 'When is leg pain an emergency?',
        a: 'Loss of bladder or bowel control, numbness around the groin or inner thighs, or weakness in a leg that is getting worse need same day medical attention rather than an appointment with us.',
      },
      {
        q: 'What tends to make it worse day to day?',
        a: 'Long periods sitting, bending forward and driving are the common aggravators. Which of them applies to you shapes what we suggest between visits.',
      },
      {
        q: 'Is leg pain worse news than back pain?',
        a: 'Not necessarily, but it does change what we screen for, which is why the assessment comes before any hands on care rather than after it.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'I have pain running down my leg',
      'Sitting or driving makes it worse',
      'I have pins and needles or numbness in my leg or foot',
      'It started after lifting or a sudden movement',
      'I want it assessed before I consider an injection or surgery',
    ],
    citations: [
      {
        claim:
          'Sciatica describes a symptom pattern rather than a diagnosis, and identifying the underlying cause is what guides management.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
      {
        claim:
          'Cauda equina syndrome, indicated by bladder or bowel disturbance and saddle numbness, is a surgical emergency requiring immediate assessment.',
        source: 'NICE Clinical Knowledge Summaries, Sciatica',
        url: 'https://cks.nice.org.uk/topics/sciatica/',
      },
    ],
    comparison: {
      heading: 'Sciatica, hip pain or lower back pain?',
      intro:
        'Pain in the lower back, buttock and leg can come from a few different places, and each is looked after a little differently. This is a rough guide to which one you might be dealing with, and the linked columns go to the page that covers it in full.',
      columns: [
        'Sciatica',
        { label: 'Hip pain', href: '/conditions/hip-pain' },
        { label: 'Lower back pain', href: '/conditions/back-pain' },
      ],
      rows: [
        {
          label: 'Where you feel it',
          cells: [
            'Buttock and down the back or side of one leg, often past the knee',
            'Groin, the front or side of the hip, sometimes the buttock',
            'Across the lower back, sometimes into the buttock',
          ],
        },
        {
          label: 'What the pain is like',
          cells: [
            'Burning, shooting or electric',
            'A deep ache, often catching with certain movements',
            'An ache or stiffness, sometimes a sharp catch',
          ],
        },
        {
          label: 'Tingling or numbness',
          cells: [
            'Common, in the calf, foot or toes',
            'Usually none',
            'Usually none',
          ],
        },
        {
          label: 'What tends to set it off',
          cells: [
            'Sitting, driving, bending, coughing or sneezing',
            'Walking, stairs, getting in and out of a car, lying on that side',
            'Long sitting or standing, bending and lifting',
          ],
        },
      ],
      note: 'Real cases overlap. A stiff lower back often comes with some buttock pain, and hip problems can refer pain down the thigh. The table tells you where to start reading; the assessment is what tells them apart.',
    },
    lastReviewed: '2026-10-03',
    draft: false,
  },
  {
    slug: 'scoliosis',
    title: 'Scoliosis Care in Cheras, Kuala Lumpur',
    metaTitle: 'Scoliosis Care in Cheras, KL',
    metaDescription:
      'Scoliosis assessment and chiropractic management in Cheras, Maluri. Postural analysis, X-ray review and conditioning programmes for teens and adults.',
    // Refreshed 2026-10-12 (schedule pc034): scoliosis vs pelvic curve vs uneven shoulders
    // table with body maps, cause illustrations, a posture FAQ and a link to shoulder
    // imbalance. Not linked to the legacy scoliosis post, whose migrated Wix copy has not been
    // checked against the promissory-claims rules. Title and targetKeyword unchanged: GSC was
    // disconnected.
    targetKeyword: 'scoliosis treatment malaysia',
    related: ['shoulder-imbalance', 'back-pain', 'neck-pain'],
    helpedBy: ['physiotherapy', 'chiropractic-care'],

    intro:
      'Scoliosis is a sideways curvature of the spine, often with an element of rotation. Many curves are mild, get discovered by chance and never cause much trouble. Others bring stiffness, muscular fatigue and pain, particularly through the working day. We should be straightforward about what chiropractic care does here. We work on how well and how comfortably your spine moves. Straightening the curve is not something an adjustment does. Curve magnitude and progression are matters for orthopaedic assessment, and where that is what you need, we will say so.',
    symptoms: [
      'One shoulder, shoulder blade or hip sitting visibly higher than the other',
      'A rib hump or asymmetry that becomes obvious when bending forward',
      'Clothes hanging unevenly, or a waistline that looks asymmetrical',
      'Aching or muscular fatigue on one side of the back after standing or sitting for long',
      'Stiffness through the mid or lower back, particularly at the end of the day',
      'A sense of leaning to one side, or uneven weight through the feet',
    ],
    causes: [
      {
        heading: 'Idiopathic scoliosis',
        image: { src: '/img/scoliosis-cause-teen.webp', alt: 'Illustration of a teenage girl bending forward at the waist with her arms hanging down, the position used for a scoliosis forward bend check' },
        body: 'The majority of scoliosis has no identified cause. It most often becomes apparent during the adolescent growth spurt, which is also when monitoring matters most, because a growing spine can change more quickly than a mature one.',
      },
      {
        heading: 'Structural differences',
        image: { src: '/img/scoliosis-cause-xray.webp', alt: 'Illustration of a spine X-ray on a lightbox showing a sideways S-shaped curve' },
        body: 'Some curves relate to how the vertebrae themselves formed, or to differences in leg length or pelvic position. We describe these rather than blame them. The point of the assessment is to understand what your spine is working with.',
      },
      {
        heading: 'Muscular imbalance around the curve',
        image: { src: '/img/scoliosis-cause-muscle.webp', alt: 'Illustration of a woman seen from behind with a golden glow along the muscles on one side of her spine' },
        body: 'A curved spine loads the muscles on either side unevenly. Over time one side works harder and fatigues sooner, which is often what people actually feel as their scoliosis, rather than the curve itself.',
      },
      {
        heading: 'Daily loading patterns',
        image: { src: '/img/scoliosis-cause-loading.webp', alt: 'Illustration of a woman walking with a heavy bag on one shoulder and a golden glow on that side of her back' },
        body: 'Prolonged sitting, carrying consistently on one side, and long hours in a fixed position do not cause scoliosis, but they can add to the discomfort a curve already produces.',
      },
    ],
    approach: [
      {
        heading: 'Assessment before anything else',
        body: 'Your first visit follows the Gonstead six-step assessment: history taking, visualisation of the spinal curves and the level of head, shoulders, hips and knees, nervoscope instrumentation, palpation with a full-motion assessment of the spinal and pelvic joints, X-ray analysis where indicated, and only then an adjustment. With scoliosis, the visualisation and X-ray steps carry particular weight, because they establish what kind of curve we are dealing with before any care begins.',
      },
      {
        heading: 'Care aimed at comfort and movement',
        body: 'Chiropractic care here works on the joints that have become restricted and on the tissue that is being overloaded. What we are after is easier movement and less discomfort. The curve itself stays as it is. Adjustments are specific and delivered by hand. We would rather be clear about this than imply an outcome chiropractic does not deliver.',
      },
      {
        heading: 'Conditioning, and knowing when to refer',
        body: 'Our physiotherapy side builds a conditioning programme for the muscles supporting your spine, along with practical guidance on sitting, carrying and daily loading. Where a curve is significant, progressing, or in a growing adolescent, orthopaedic assessment is the appropriate step. Bracing and surgical decisions sit with a specialist. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
    ],
    redFlags: [
      'A curve in a child or adolescent that is visibly worsening, especially during a growth spurt. This needs orthopaedic assessment, not chiropractic care alone',
      'Breathlessness, reduced exercise tolerance, or chest discomfort associated with a large curve',
      'New or progressive numbness, tingling or weakness in the arms or legs',
      'Loss of bladder or bowel control, or numbness around the groin and inner thighs',
      'A curve that appears suddenly, or alongside fever, unexplained weight loss or night pain',
      'Severe pain out of proportion to the curve, or pain following a fall or accident',
    ],
    faqs: [
      {
        q: 'Can chiropractic straighten my scoliosis?',
        a: 'No. We would rather be plain about that. Chiropractic care here is aimed at joint movement, muscular balance and comfort. Correcting the curve itself is not within what it does. Changing curve magnitude is the domain of orthopaedic management, including bracing and, in some cases, surgery.',
      },
      {
        q: 'My teenager has been told they have scoliosis. What should we do?',
        a: 'An adolescent curve should be assessed and monitored by an orthopaedic specialist, because curves can change while a child is still growing and the decisions at that stage are theirs to make. Chiropractic and physiotherapy can play a supporting role for comfort and conditioning alongside that care. We are happy to assess and to refer appropriately.',
      },
      {
        q: 'Is it scoliosis or just bad posture?',
        a: 'They can look alike from behind, because both can leave one shoulder or hip sitting higher. The usual first check is bending forward at the waist: true scoliosis rotates the spine, so a rib or lower back prominence shows on one side, which slouching does not produce. Uneven shoulders with a straight spine are covered on our shoulder imbalance page, and an X-ray is what confirms a curve and measures it.',
        links: [{ phrase: 'shoulder imbalance page', href: '/conditions/shoulder-imbalance' }],
      },
      {
        q: 'Will I need an X-ray?',
        a: 'X-ray analysis gives a clear picture of what the curve is actually doing: where it sits, how the spine is positioned around it, and whether anything else is present. With scoliosis that detail matters more than most, and it is what the Gonstead assessment works from. It is not automatic for every patient, and it is avoided for pregnant women and children unless there is a clear reason. Your chiropractor will explain why an X-ray is or is not indicated in your case.',
      },
      {
        q: 'Is exercise safe with scoliosis?',
        a: 'For most people, staying active is helpful, and general conditioning tends to be better tolerated than avoiding movement. What is appropriate depends on your curve and your symptoms, so the programme is set after assessment rather than from a template. If you are under orthopaedic care or wearing a brace, bring that guidance with you.',
      },
    ],
    keyTakeaways: [
      {
        q: 'What is scoliosis?',
        a: 'A sideways curve of the spine with an element of rotation. It most often appears during adolescent growth, and in the majority of cases no cause is ever identified.',
      },
      {
        q: 'Does a curve always get worse?',
        a: 'No. Many curves stay stable, particularly once growth has finished. Monitoring over time is how that is established rather than assumed in either direction.',
      },
      {
        q: 'What can care here actually help with?',
        a: 'Comfort, movement and the muscular symptoms that often sit alongside a curve. Changing the curve itself is a separate question and belongs with a specialist.',
      },
      {
        q: 'Who else should be involved?',
        a: 'Curves that are larger or progressing are managed by an orthopaedic or spinal specialist, and bracing decisions sit with them. We will refer where that is appropriate.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'I have been told I have a curve in my spine',
      'My child or teenager has been referred for a scoliosis check',
      'I have noticed uneven shoulders or hips',
      'My back aches alongside the curve',
      'I want to understand what monitoring involves',
    ],
    citations: [
      {
        claim:
          'In most adolescent scoliosis no underlying cause is identified, which is why it is described as idiopathic.',
        source: 'Scoliosis Research Society',
        url: 'https://www.srs.org/Patients/Conditions/Scoliosis/Idiopathic-Scoliosis',
      },
      {
        claim:
          'The forward bending test looks for asymmetry in the contours of the back caused by the rotation of the spine, and a significant leg length difference can tilt the pelvis and produce a spinal curve.',
        source: 'Janicki & Alman (2007), Paediatrics & Child Health',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2532872/',
      },
      {
        claim:
          'Specialist assessment is advised for curves that present during growth or that show signs of progressing.',
        source: 'Janicki & Alman (2007), Paediatrics & Child Health',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2532872/',
      },
    ],
    comparison: {
      heading: 'Scoliosis, a curve from the pelvis, or uneven shoulders?',
      intro:
        'Uneven shoulders or hips can come from a true scoliosis, from a pelvis that sits tilted, or from muscle tension with a straight spine, and each is looked after differently. This is a rough guide to which one you might be seeing. The dotted line in each picture is the spine.',
      // Body maps: one AI-generated back-view figure (Higgsfield, 2026-10-12) edited so only
      // the spine line and shoulders change. Not clinic photos.
      columns: [
        {
          label: 'Scoliosis',
          image: {
            src: '/img/scoliosis-map-structural.webp',
            alt: 'Illustration of a woman seen from behind with a dotted line showing her spine curving sideways in an S shape',
          },
        },
        {
          label: 'Curve from a tilted pelvis',
          image: {
            src: '/img/scoliosis-map-pelvis.webp',
            alt: 'Illustration of a woman seen from behind with a dotted line showing her spine leaning in one long C-shaped curve',
          },
        },
        {
          label: 'Uneven shoulders',
          href: '/conditions/shoulder-imbalance',
          image: {
            src: '/img/scoliosis-map-shoulder.webp',
            alt: 'Illustration of a woman seen from behind with a straight dotted spine line and a golden glow over one tense, raised shoulder',
          },
        },
      ],
      rows: [
        {
          label: 'What the spine is doing',
          cells: [
            'Curving sideways, often in an S shape, and rotating',
            'Leaning in one long curve above a pelvis that sits higher on one side',
            'Straight; one shoulder is held higher by muscle tension or habit',
          ],
        },
        {
          label: 'Bending forward',
          cells: [
            'A rib or lower back prominence shows on one side',
            'Usually little or no prominence',
            'No prominence',
          ],
        },
        {
          label: 'Usually noticed',
          cells: [
            'Often during the teenage growth spurt',
            'At any age, sometimes alongside a leg length difference',
            'At any age, often with desk work or one-sided carrying',
          ],
        },
        {
          label: 'What to do first',
          cells: [
            'A growing child needs an orthopaedic check; adults, an assessment and X-ray',
            'Book an assessment of the pelvis, hips and legs',
            'Book an assessment, and look at how you sit and carry',
          ],
        },
      ],
      note: 'Only an examination and, where needed, an X-ray tell these apart for certain. A curve can also sit alongside muscle tension. The table tells you where to start; the assessment is what tells them apart.',
    },
    // Refresh re-reviewed by Valerie Na, confirmed by the user 2026-10-19.
    lastReviewed: '2026-10-19',
    draft: false,
  },
  {
    slug: 'neck-pain',
    title: 'Neck Pain and Stiffness Care in Cheras, Kuala Lumpur',
    metaTitle: 'Stiff Neck & Neck Pain Care in Cheras, KL',
    metaDescription:
      'Stiff neck after a desk day, or woke up unable to turn your head? Neck pain assessment and care in Cheras, Maluri, with Gonstead chiropractic and dry needling.',
    targetKeyword: 'stiffness neck pain',
    // The hub of the neck cluster: every sibling a neck pain reader might actually have.
    related: ['pinched-nerve', 'whiplash', 'tension-headache', 'migraine'],
    helpedBy: ['dry-needling', 'physiotherapy'],

    intro:
      'Neck pain in office workers is usually a loading problem rather than an injury. Hours spent with the head tilted forward towards a screen or a phone ask the small joints and muscles at the base of the neck to hold a position they were never meant to hold all day, and eventually they complain about it. It builds gradually and it is very common. Most cases respond well once the irritated segment is found and the habits feeding it are dealt with.',
    symptoms: [
      'An ache at the base of the neck and across the top of the shoulders that worsens through the working day',
      'Tightness that eases on holiday or at the weekend and returns by Tuesday',
      'Headaches that begin at the back of the skull and wrap forward',
      'Reduced ability to turn your head fully to one side, or to check your blind spot when driving',
      'Waking up with a stiff neck that will not turn one way',
      'A rounded upper back and head that sits forward of your shoulders in photographs',
      'Tingling or pins and needles into the shoulder blade or arm',
      'Clicking or grinding when you roll your neck',
    ],
    causes: [
      {
        heading: 'Sustained forward head posture',
        body: 'The further forward the head sits, the more work the muscles at the back of the neck do to hold it up. Screens set below eye level, laptops used without a stand, and long stretches on a phone all encourage that position, and the tissue adapts to whatever it is asked to do most.',
      },
      {
        heading: 'Static loading rather than movement',
        body: 'Joints are nourished by movement. A neck held still for hours stiffens regardless of how good the posture is. A well-set-up desk still causes trouble if you never get up from it.',
      },
      {
        heading: 'Joint restriction in the upper neck',
        body: 'When a segment of the neck stops moving properly, the ones around it take up the slack and become irritated. Restriction high in the neck is a common contributor to the headaches that accompany desk-related neck pain.',
      },
      {
        heading: 'Sleep and stress patterns',
        body: 'An unsupportive pillow, sleeping on your front with the head turned, and the low-grade muscle guarding that comes with stress all keep the area loaded overnight, so it never gets a genuine rest period.',
      },
    ],
    approach: [
      {
        heading: 'We find the segment before we work on it',
        body: 'Your first visit follows the Gonstead six-step assessment: history, visualisation, instrumentation with the nervoscope, palpation, X-ray analysis where indicated, and only then an adjustment. Visualisation matters particularly here, because the level of your head, ears and shoulders tells us a great deal about how you are loading your neck before we have touched you.',
      },
      {
        heading: 'Adjustment, delivered by hand',
        body: 'Once your chiropractor has identified which segment is restricted, the adjustment is specific to it and delivered by hand. They will explain what they found and what they intend to do before anything happens. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
      {
        heading: 'Changing what caused it',
        body: 'Adjustments restore movement to a stiff neck. That gets undone fairly quickly if you spend another eight hours a day in the position that stiffened it. Alongside chiropractic we cover practical desk and screen height changes and movement breaks. Where the surrounding muscle is a factor, our physiotherapy side adds manual therapy or dry needling and a programme to build endurance in the deep neck and upper back muscles.',
      },
    ],
    redFlags: [
      'Neck pain following a fall, car accident, or any blow to the head or neck',
      'Numbness, weakness, or loss of grip strength in an arm or hand',
      'A sudden, severe headache unlike any you have had before',
      'Dizziness, visual disturbance, difficulty speaking or swallowing, or unsteadiness on your feet',
      'Fever, unexplained weight loss, or night pain that wakes you',
      'Loss of bladder or bowel control, or clumsiness and unsteadiness affecting both hands or legs',
    ],
    faqs: [
      {
        q: 'What is "tech neck"?',
        a: 'It is an informal term, not a medical diagnosis. It describes the neck and upper back pain that tends to accompany long hours looking down at a phone or a screen set too low. What we assess is the same as for any neck pain: which segments are moving poorly, and what in your day is keeping them that way.',
      },
      {
        q: 'Can chiropractic fix my posture?',
        a: 'No single approach changes posture on its own, because posture is largely a set of habits. Adjustments can restore movement to segments that have become restricted, which often makes a better position more comfortable to hold. The lasting change comes from your desk setup and from building endurance in the muscles that hold you upright. Your chiropractor will tell you honestly what is likely to change and what is not.',
      },
      {
        q: 'Is it safe to have my neck adjusted?',
        a: 'Neck adjustments are done by hand and only after the full assessment has established what is appropriate for you. Some presentations are not suitable for adjustment, and the assessment is there to catch that. Certain symptoms need medical review before any hands-on care. Tell us about any recent trauma, dizziness, arm numbness or severe headache when you book so we can screen for it.',
      },
      {
        q: 'How should I set up my desk?',
        a: 'The short version: top of the screen roughly at eye level, forearms supported, feet flat, and a laptop raised onto a stand with a separate keyboard. No setup is good enough to sit in for eight unbroken hours, though. Stand and move every 30 to 45 minutes. We will go through your own setup with you during your visit.',
      },
      {
        q: 'I woke up with a stiff neck. What should I do?',
        a: 'Keep it moving gently within what is comfortable rather than holding it still, and a warm or cold pack for short spells may help. Most of these settle within days to a few weeks. Avoid driving until you can turn your head far enough to check your blind spot. If it has not started easing within a week or two, keeps coming back, or arrives with arm symptoms, a fever or a severe headache, it is worth having it looked at.',
      },
    ],
    /**
     * `stiffness neck pain` runs 1,600/mo in Malaysia at difficulty 22, the largest keyword
     * on the site with the softest competition against it, so this is the first condition
     * filled in on the extended template.
     *
     * None of the five repeats an FAQ above: those already answer tech neck, whether posture
     * can be fixed, adjustment safety and desk setup. These are the four questions left over,
     * plus the opening hours.
     */
    keyTakeaways: [
      {
        q: 'Why is my neck worse by the end of the day?',
        a: 'Because it is a loading problem rather than an injury. Holding the head forward for hours asks small joints and muscles to do a job they were not built to hold, and they tend to complain late in the day.',
      },
      {
        q: 'How long does it usually take to settle?',
        a: 'It varies with how long it has been there and what is feeding it, so we will not quote a number at a first visit. Desk related cases often respond well once the irritated segment is found and the habits change.',
      },
      {
        q: 'Can neck stiffness be behind my headaches?',
        a: 'Sometimes. Headaches that begin at the base of the skull and wrap forward are often traced to the upper neck. Migraine is a different problem and managed medically, though a consultation can help tell the two apart.',
      },
      {
        q: 'Do neck pillows or braces help?',
        a: 'A supportive pillow is worth getting right, because it stops the neck being loaded overnight. A brace does not build the endurance needed to hold a position, so we would not suggest relying on one.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'My neck aches by the end of a day at a desk',
      'I cannot turn my head fully to one side',
      'I get headaches that start at the base of my skull',
      'I have tingling into my shoulder blade or arm',
      'I want help setting up my desk and screen',
    ],
    citations: [
      {
        claim:
          'Neck pain is consistently ranked among the leading causes of years lived with disability worldwide.',
        source: 'Global Burden of Disease Study, The Lancet',
        url: 'https://www.thelancet.com/journals/lanrhe/article/PIIS2665-9913(23)00321-1/fulltext',
      },
      {
        claim:
          'Guidance for non specific neck pain generally favours staying active, with manual therapy and exercise used alongside it rather than prolonged rest.',
        source: 'NICE Clinical Knowledge Summaries, Neck pain',
        url: 'https://cks.nice.org.uk/topics/neck-pain-non-specific/',
      },
      {
        claim:
          'Most neck pain lasts only a few weeks, and keeping the neck moving is generally advised over wearing a collar.',
        source: 'NHS, Neck pain',
        url: 'https://www.nhs.uk/symptoms/neck-pain-and-stiff-neck/',
      },
    ],
    comparison: {
      heading: 'Stiff neck, pinched nerve, whiplash or a headache from the neck?',
      intro:
        'Neck pain tends to fall into a few common patterns, and each is looked after a little differently. This is a rough guide to which one you might be dealing with, and each column links to the page that covers it in full.',
      columns: [
        'Stiff or aching neck',
        { label: 'Pinched nerve', href: '/conditions/pinched-nerve' },
        { label: 'Whiplash', href: '/conditions/whiplash' },
        { label: 'Headache from the neck', href: '/conditions/migraine' },
      ],
      rows: [
        {
          label: 'How it usually starts',
          cells: [
            'Gradually over a working week, or overnight from an awkward sleeping position',
            'Often gradually, sometimes after a sudden movement or a lift',
            'After a sudden jolt, most often a road accident or a fall',
            'Builds through the day, often alongside a stiff neck',
          ],
        },
        {
          label: 'Where you feel it',
          cells: [
            'Base of the neck and across the tops of the shoulders',
            'Neck, then into the shoulder blade, arm or hand on one side',
            'Neck and upper back, sometimes with headache or dizziness',
            'Base of the skull, spreading towards the temple or eye, usually on one side',
          ],
        },
        {
          label: 'Arm symptoms',
          cells: [
            'Usually none',
            'Typical: pain, tingling, numbness or weakness in one arm',
            'Sometimes',
            'Usually none',
          ],
        },
        {
          label: 'What to do first',
          cells: [
            'Keep it moving gently, and book in if it is not easing after a week or two',
            'Book an assessment, sooner if there is weakness or numbness',
            'Get a medical check after any accident, then an assessment',
            'Book an assessment, and see a doctor first for any sudden or severe headache',
          ],
        },
      ],
      note: 'Real necks do not always fit one column. A stiff neck and a headache often arrive together, and whiplash can irritate a nerve. The table tells you where to start reading; the assessment is what tells the patterns apart.',
    },
    lastReviewed: '2026-10-03',
    draft: false,
  },
  {
    slug: 'migraine',
    title: 'Migraine Headache and Neck Headache in Cheras, Kuala Lumpur',
    metaTitle: 'Migraine or Neck Headache? Assessment, Cheras KL',
    metaDescription:
      'Migraine, tension headache or one coming from your neck? A headache assessment in Cheras, Maluri that helps work out which, and when your doctor is the right call.',
    targetKeyword: 'migraine headache',
    related: ['neck-pain', 'tension-headache', 'shoulder-imbalance'],
    helpedBy: ['chiropractic-care', 'physiotherapy'],

    intro:
      'Not every bad headache is a migraine, and not every migraine has anything to do with the neck. Working out which one you are dealing with is exactly what a consultation is for, and you are welcome to come and find out. Migraine itself is a neurological condition whose medical management belongs with a doctor, so chiropractic is not the direct treatment for it. What we can assess is whether part of what you are feeling is coming from the joints and muscles of the upper neck, which is a separate and reasonably common source of head pain. If the assessment points to your doctor rather than to us, we will say so plainly and help you get there.',
    symptoms: [
      'Head pain that begins at the base of the skull and wraps forward towards the temple or eye',
      'Headache consistently on the same side, alongside neck stiffness or a restricted turn',
      'Head pain that is provoked by sustained desk work, driving, or a particular neck position',
      'Throbbing or pulsing pain with nausea, or sensitivity to light and sound',
      'Visual disturbance, tingling or speech changes in the half hour before the pain arrives',
      'Headaches that arrive with no neck involvement at all and follow their own pattern',
    ],
    causes: [
      {
        heading: 'Neurological migraine',
        body: 'True migraine involves changes in the brain and its nerves rather than in the neck. Triggers, patterns and management sit with a doctor or neurologist, and medication is often part of that. We include it here because people commonly arrive assuming their headaches are muscular when the pattern suggests otherwise.',
      },
      {
        heading: 'Cervicogenic headache',
        body: 'Head pain that originates in the joints, discs or muscles of the upper neck and is felt in the head. It usually stays on one side, tends to be provoked by neck position or movement, and often comes with reduced neck range. This is the presentation chiropractic assessment is relevant to.',
      },
      {
        heading: 'Sustained forward head posture',
        body: 'Hours with the head held forward of the shoulders asks the muscles at the base of the skull to work continuously. That tissue can refer pain into the head, and it is a frequent background finding in desk workers who describe daily late-afternoon headaches.',
      },
      {
        heading: 'Sleep, stress and jaw clenching',
        body: 'An unsupportive pillow, poor sleep and low-grade clenching keep the muscles around the skull and jaw loaded overnight. These rarely explain a headache on their own, but they often sit alongside whatever else is going on and make it harder to settle.',
      },
    ],
    approach: [
      {
        heading: 'Working out what kind of headache this is',
        body: 'Your first visit is largely history taking. Where the pain starts, what brings it on, what it comes with, how long it lasts, and what you have already tried. That is followed by the rest of the Gonstead six-step assessment: visualisation, nervoscope instrumentation, palpation with a full-motion assessment of the neck and upper back, and X-ray analysis where indicated. We are establishing whether there is a cervical contribution at all. Arriving at a headache diagnosis is a job for your doctor.',
      },
      {
        heading: 'Where the neck is involved',
        body: 'If the assessment points to restricted segments in the upper neck, the adjustment is specific to those segments and delivered by hand, and your chiropractor will explain what they found before anything happens. Where the surrounding muscle is a factor, our physiotherapy side may add manual therapy and a programme for the deep neck and upper back. We are aiming at better neck movement and less load on that tissue. Any effect on the headaches themselves follows from that, and it varies from person to person.',
      },
      {
        heading: 'Where it is migraine, we work alongside your doctor',
        body: 'If your pattern looks neurological rather than mechanical, the appropriate step is medical management, and we will say so plainly rather than book you a course of care. Chiropractic is not the treatment for migraine and we would rather not imply otherwise. Plenty of people have both, though: a genuine migraine disorder and a neck adding to the overall headache burden. In that case working alongside your doctor is reasonable, and a consultation is a sensible way to find out whether it applies to you.',
      },
      {
        heading: 'What you track between visits',
        body: 'You will usually be asked to keep a simple record: when the headaches happen, how long they last, what preceded them, and what you were doing. Headache patterns are difficult to judge from memory, and this is often the single most useful thing a patient brings to a second appointment.',
      },
    ],
    redFlags: [
      'A sudden, severe headache that reaches full intensity within seconds or minutes (a thunderclap headache)',
      'The worst headache of your life, or a headache clearly unlike any you have had before',
      'Headache with fever, neck stiffness, or a rash',
      'Headache with weakness, numbness, confusion, difficulty speaking, or loss of vision',
      'Any headache following a blow to the head, a fall, or a road accident',
      'A new headache beginning after the age of 50, or one that is steadily worsening over days and weeks',
      'Headache that is worse on lying down, coughing or straining, or that wakes you from sleep',
      'Headache alongside a history of cancer, a compromised immune system, or unexplained weight loss',
      'A new or severe headache during pregnancy or in the weeks after giving birth',
    ],
    faqs: [
      {
        q: 'Can a chiropractor help with my migraine?',
        a: 'Not directly. Migraine is a neurological condition and its management belongs with a doctor or neurologist, so it is not what chiropractic sets out to treat. A consultation is still worth having, because it can work out whether part of your head pain is coming from the joints and muscles of the upper neck, which is a different problem that happens to feel similar. If the assessment says your headaches are migrainous, we will tell you and help you get to the right person.',
      },
      {
        q: 'How do I know if my headache is coming from my neck?',
        a: 'Some features point that way: pain that starts at the base of the skull, stays on one side, is provoked by neck position or sustained desk work, and comes with reduced neck movement. None of those is conclusive on its own, and there is real overlap with migraine. So the sorting happens at the assessment. We would not tell you the source without examining you first.',
      },
      {
        q: 'Will neck adjustments stop my headaches?',
        a: 'We cannot tell you that, and you should be cautious of anyone who does. Where a restricted neck segment is contributing, restoring movement to it often changes how much head pain people get. It depends on the presentation though, and some people notice little difference. Your chiropractor will tell you honestly what they expect and what they do not.',
      },
      {
        q: 'Is it safe to have my neck adjusted if I get headaches?',
        a: 'It depends on the presentation, so the assessment comes first. Certain symptoms need medical review before any hands-on care: sudden severe headache, dizziness, visual or speech changes, or any recent head or neck trauma. Tell us about those when you book so we can screen for them properly.',
      },
      {
        q: 'Should I stop my migraine medication?',
        a: 'That is not our decision to make, and nothing we do should be taken as a reason to change it. Medication decisions sit with the doctor who prescribed it. Bring a list of what you are taking to your first visit so we have the full picture.',
      },
      {
        q: 'Can taking painkillers often make headaches worse?',
        a: 'It can. Medication overuse headache is a recognised condition in which regular use of headache medicines, on 10 or 15 or more days a month for over three months depending on the medicine, keeps the headaches going. If you are taking something for headaches on most days, raise it with your doctor rather than cutting down on your own.',
      },
    ],
    /**
     * Written to the reframed positioning (client instruction, 2026-08-08): the page invites
     * people to come and find out rather than turning them away, while the one boundary line
     * in the approach section still states that chiropractic is not the treatment for
     * migraine. So none of these promises anything about migraine itself; they answer the
     * questions that decide whether a consultation is worth someone's time.
     */
    keyTakeaways: [
      {
        q: 'What is the difference between migraine and a neck headache?',
        a: 'Migraine is a neurological condition. A cervicogenic headache starts in the joints and muscles of the upper neck and is felt in the head. They can feel similar, and some people have both.',
      },
      {
        q: 'Is it worth coming in if I already have a migraine diagnosis?',
        a: 'It can be, if you also have neck symptoms. Plenty of people have both, and a consultation can tell you whether the neck is adding to the overall headache burden.',
      },
      {
        q: 'What will the first visit involve?',
        a: 'Mostly history taking, then the Gonstead assessment. We are establishing whether there is a neck contribution at all, not arriving at a headache diagnosis, which is your doctor’s job.',
      },
      {
        q: 'What should I bring?',
        a: 'A list of your medication, and if you can, a simple record of when the headaches happen and what came before them. Patterns are hard to judge from memory.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'My headaches start at the base of my skull',
      'My headaches are worse after a day at a desk',
      'I have a migraine diagnosis and neck pain as well',
      'I want to know whether my neck is involved',
      'I am not sure whether to see a doctor or a chiropractor',
    ],
    citations: [
      {
        claim:
          'Cervicogenic headache is classified as a distinct headache disorder attributed to structures in the neck.',
        source: 'International Classification of Headache Disorders, ICHD-3',
        url: 'https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/',
      },
      {
        claim:
          'Headache disorders are among the most common disorders of the nervous system worldwide.',
        source: 'World Health Organization',
        url: 'https://www.who.int/news-room/fact-sheets/detail/headache-disorders',
      },
      {
        claim:
          'Medication overuse headache is classified as headache on 15 or more days a month that develops from regular overuse of acute headache medication for more than three months.',
        source: 'International Classification of Headache Disorders, ICHD-3, 8.2',
        url: 'https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/',
      },
    ],
    comparison: {
      heading: 'Migraine, tension headache or a headache from the neck?',
      intro:
        'These three account for most of the recurring headaches people bring to a first visit, and they can feel alike. This is the textbook split, and the tension headache column links to its own page.',
      columns: [
        'Migraine',
        { label: 'Tension headache', href: '/conditions/tension-headache' },
        'Headache from the neck',
      ],
      rows: [
        {
          label: 'Where it is felt',
          cells: [
            'Often one side of the head, though it can be both',
            'Both sides, like a band or a tight hat',
            'One side, starting at the base of the skull and spreading forward',
          ],
        },
        {
          label: 'What it feels like',
          cells: [
            'Throbbing or pulsing, moderate to severe',
            'A dull, steady pressure, mild to moderate',
            'A steady ache that tracks with the neck',
          ],
        },
        {
          label: 'What comes with it',
          cells: [
            'Nausea, sensitivity to light and sound, sometimes a visual aura beforehand',
            'Usually nothing else',
            'Neck stiffness or a restricted turn on the same side',
          ],
        },
        {
          label: 'What brings it on',
          cells: [
            'Varies from person to person: sleep, hormones, missed meals, stress. Moving about makes it worse',
            'Stress, long screen days, tired muscles',
            'Neck positions, sustained desk work or driving',
          ],
        },
        {
          label: 'Who looks after it',
          cells: [
            'Your doctor or a neurologist',
            'Often managed at home; we can assess whether the neck and upper back are adding to it',
            'A neck assessment is relevant here, and this is where chiropractic fits',
          ],
        },
      ],
      note: 'Plenty of people have more than one kind, and the patterns overlap. A diagnosis of migraine belongs with your doctor. What a consultation here can do is check whether your neck is part of the picture.',
    },
    lastReviewed: '2026-10-03',
    draft: false,
  },
  {
    slug: 'hip-pain',
    title: 'Hip Pain Care in Cheras, Kuala Lumpur',
    metaTitle: 'Hip Pain Care in Cheras, KL',
    metaDescription:
      'Assessment and care for hip pain, groin ache and combined lower back and hip complaints in Cheras, Maluri. Gonstead chiropractic plus targeted rehab.',
    // Refreshed 2026-10-12 (schedule pc036): "hip pain vs sciatica" comparison table and FAQ.
    // Title and targetKeyword deliberately unchanged: Search Console was disconnected, and a
    // refresh retargets only from the page's own GSC queries. Revisit once it is back.
    targetKeyword: 'lower back ache hip pain',
    related: ['back-pain', 'sciatica'],
    helpedBy: ['chiropractic-care', 'sports-injury-rehabilitation'],

    intro:
      'Hip pain is awkward to pin down, because the hip, the pelvis and the lower back share the same neighbourhood and refer pain into each other. People often arrive certain the problem is their hip when the joint itself examines well, or convinced it is their back when the hip is what limits them. Where you feel it is only a starting point. The assessment has to establish which structure is actually irritated and what pattern of loading keeps it that way, because a hip joint problem, a gluteal tendon problem and a lower back problem do not get the same plan.',
    symptoms: [
      'A deep ache in the groin or the front of the hip, particularly on standing up or getting out of a car',
      'Pain on the outside of the hip that is worse lying on that side at night',
      'Lower back ache that spreads across the buttock and into the hip on one side',
      'Stiffness first thing in the morning, or after sitting through a long meeting or drive',
      'Difficulty with stairs, squatting, or putting on socks and shoes on one side',
      'A clicking, catching or grinding sensation as the hip moves through its range',
    ],
    causes: [
      {
        heading: 'Prolonged sitting and hip position',
        image: { src: '/img/hip-cause-sitting.webp', alt: 'Illustration of a woman sitting at a desk working on a laptop, with a golden glow at her hip' },
        body: 'Long hours seated hold the hip in flexion, shorten the tissue at the front of it and let the gluteal muscles behind it do very little. Over years this reduces how much range the hip has available and shifts load into the lower back. Back ache and hip pain arrive together in desk workers for that reason.',
      },
      {
        heading: 'Gluteal tendon overload',
        image: { src: '/img/hip-cause-tendon.webp', alt: 'Illustration of a woman stepping up a stair on one leg, with a golden glow on the outside of her hip' },
        body: 'The tendons on the outside of the hip take a lot of load during standing, walking and single-leg work. When that load rises faster than the tendon adapts, it becomes irritable. This is the pattern behind most outside-of-hip pain that hurts to lie on, and it tends to respond to graded loading rather than rest.',
      },
      {
        heading: 'Joint restriction in the lower back and pelvis',
        image: { src: '/img/hip-cause-restriction.webp', alt: 'Illustration of a woman seen from behind, with a golden glow across her lower back and the base of her spine' },
        body: 'When a lumbar segment or a sacroiliac joint stops moving well, the hip on that side takes up the difference. We assess the spine and pelvis alongside the hip as standard for that reason. Working on the hip alone often leaves the driver untouched.',
      },
      {
        heading: 'Age-related joint change',
        image: { src: '/img/hip-cause-age.webp', alt: 'Illustration of an older woman walking with a hand near the front of her hip, where a golden glow shows the hip joint' },
        body: 'Cartilage and joint surfaces change with time, and imaging findings become more common with age whether or not there is pain. A finding on a scan describes the joint. It does not on its own explain the symptom, so we read it alongside how the hip actually moves and what it tolerates.',
      },
    ],
    approach: [
      {
        heading: 'Separating hip from back from pelvis',
        body: 'Your first visit follows the Gonstead six-step assessment: history taking, visualisation of the level of hips, shoulders and knees, nervoscope instrumentation, palpation with a full-motion assessment of the spinal and pelvic joints, X-ray analysis where indicated, and only then an adjustment. Alongside that, the hip is taken through its own range and loaded in the positions that provoke your symptoms, so we can tell which structure is the irritable one.',
      },
      {
        heading: 'Adjustment and hands-on work',
        body: 'Where restricted spinal or pelvic joints are part of the picture, the adjustment is specific to them and delivered by hand, and your chiropractor will explain what they found before anything happens. Where the surrounding muscle and tendon are loaded, our physiotherapy side adds mobilisation and soft-tissue work to reduce the tension feeding into the joint.',
      },
      {
        heading: 'Loading the hip back to tolerance',
        body: 'Hips generally do better with graded loading than with rest, and this is usually the slower half of the work. Programming progresses from range and control through to strength and, for anyone returning to sport, the specific demands of running, changing direction or lifting. What you do between visits tends to matter more here than what happens on the table.',
      },
      {
        heading: 'Knowing when it is not ours to treat',
        body: 'Some hip presentations need an orthopaedic opinion or imaging beyond X-ray: a joint that is genuinely worn out, a suspected labral or bony problem, or a hip that is not responding the way the assessment predicted. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
    ],
    redFlags: [
      'Inability to bear weight on the leg, or hip pain following a fall or road accident',
      'Obvious deformity, or a leg that looks shorter or rotated compared with the other',
      'Hip or groin pain with fever, feeling generally unwell, or a hot and swollen joint',
      'Progressive numbness or weakness in the leg, or a foot that drags when you walk',
      'Loss of bladder or bowel control, or numbness around the groin and inner thighs',
      'Night pain that wakes you, unexplained weight loss, or a history of cancer alongside new hip pain',
      'Hip pain in someone with osteoporosis or on long-term steroids after even a minor fall',
    ],
    faqs: [
      {
        q: 'Is my problem my hip or my lower back?',
        a: 'Often it is genuinely both, and telling them apart is one of the main reasons to be assessed rather than to guess. Groin pain more commonly points to the hip joint; pain across the buttock and into the back tends to involve the spine or pelvis. Neither is a rule, so the examination tests the hip and the lower back separately to see which reproduces your symptoms.',
      },
      {
        q: 'Is it hip pain or sciatica?',
        a: 'Hip pain from the joint itself usually sits in the groin, and pain from the tendons sits on the outside of the hip. Sciatica is different: it tends to run from the buttock down the back of the leg, often past the knee, and can bring tingling or numbness in the calf or foot. A deep buttock ache can belong to either, which is why the hip and the lower back are examined together. Our sciatica page covers that pattern in more detail.',
        links: [{ phrase: 'sciatica page', href: '/conditions/sciatica' }],
      },
      {
        q: 'Do I need an X-ray or a scan for hip pain?',
        a: 'Where imaging is used, it is because it gives a clearer picture of what is happening in the joint and in the spine above it, which is what the Gonstead assessment works from. X-ray analysis is used where it will change what we do, such as ruling out pathology or clarifying the state of the joint, and it is avoided for pregnant women and children unless there is a clear reason. If your presentation suggests an MRI or a specialist opinion would alter the plan, your chiropractor will say so and arrange the referral.',
      },
      {
        q: 'Should I rest my hip or keep moving it?',
        a: 'For most mechanical hip pain, staying moving is better tolerated than resting completely. Complete rest tends to leave the hip stiffer and weaker. Modifying usually works better than stopping altogether: reduce the positions that aggravate it and keep the movement you can do comfortably. You will be given specific guidance after your assessment rather than a general instruction.',
      },
      {
        q: 'I have been told I have hip arthritis. Is there any point coming in?',
        a: 'Joint change on imaging does not decide how much you can do. Many people with those findings improve their range, strength and day-to-day comfort with conservative care, and that is what we would be working on. Reversing the changes themselves is not on the table. Where a hip is advanced enough that a surgical opinion is the sensible next step, we will tell you that plainly.',
      },
      {
        q: 'How long will it take to feel better?',
        a: 'It depends on which structure is involved, how long it has been going on, and how the hip is loaded day to day. Tendon-related hip pain in particular tends to be measured in months rather than weeks. Your practitioner will give you a timeline based on your own assessment rather than a general figure.',
      },
    ],
    keyTakeaways: [
      {
        q: 'Where is true hip joint pain usually felt?',
        a: 'Most often in the groin rather than on the outside of the hip. Pain on the outside more commonly involves the tendons there, or is being referred from the lower back.',
      },
      {
        q: 'What are the common causes in adults?',
        a: 'It varies with age and activity. Tendon irritation around the outside of the hip, joint changes that come with age, and referral from the lower back are the three we see most.',
      },
      {
        q: 'Can I keep walking on it?',
        a: 'Usually yes, within comfort. Complete rest tends to stiffen a hip rather than settle it, though how much to do depends on what is driving the pain.',
      },
      {
        q: 'Do I need a referral to come in?',
        a: 'No. You can book directly. If imaging or a medical opinion is needed first, we will tell you and help you arrange it rather than press on regardless.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'I have pain in my groin or on the outside of my hip',
      'It hurts to walk, climb stairs or get out of a car',
      'I cannot lie on that side at night',
      'I am not sure whether it is my hip or my lower back',
      'I have been told I have hip arthritis',
    ],
    citations: [
      {
        claim:
          'Pain arising from the hip joint itself is commonly felt in the groin, whereas pain on the outside of the hip more often involves the tendons around the greater trochanter.',
        source: 'British Journal of Sports Medicine',
        url: 'https://bjsm.bmj.com/content/47/10/649',
      },
      {
        claim:
          'Exercise is recommended as a core part of managing hip osteoarthritis, alongside education and, where relevant, weight management.',
        source: 'NICE guideline NG226, Osteoarthritis in over 16s',
        url: 'https://www.nice.org.uk/guidance/ng226',
      },
    ],
    comparison: {
      heading: 'Hip joint, outer hip, sciatica or your lower back?',
      intro:
        'Pain around the hip can come from the joint, the tendons on the outside of the hip, an irritated nerve or the lower back, and each is looked after a little differently. This is a rough guide to which one you might be dealing with, and the linked columns go to the page that covers it in full.',
      // Body maps: the same AI-generated figure in every column (Higgsfield, 2026-10-12), only
      // the gold glow moves, so the pictures compare at a glance. Not clinic photos.
      columns: [
        {
          label: 'Hip joint',
          image: {
            src: '/img/hip-map-joint.webp',
            alt: 'Illustration of the hips and legs of a woman in side view, with a golden glow at the front of the hip, in the groin crease',
          },
        },
        {
          label: 'Outer hip (tendon)',
          image: {
            src: '/img/hip-map-outer.webp',
            alt: 'Illustration of the hips and legs of a woman in side view, with a golden glow on the outside of the hip',
          },
        },
        {
          label: 'Sciatica',
          href: '/conditions/sciatica',
          image: {
            src: '/img/hip-map-sciatica.webp',
            alt: 'Illustration of the hips and legs of a woman in side view, with a golden line running from the lower back through the buttock and down the back of the leg',
          },
        },
        {
          label: 'From the lower back',
          href: '/conditions/back-pain',
          image: {
            src: '/img/hip-map-lower-back.webp',
            alt: 'Illustration of the hips and legs of a woman in side view, with a golden glow across the lower back and the top of the buttock',
          },
        },
      ],
      rows: [
        {
          label: 'Where you feel it',
          cells: [
            'Deep in the groin or the front of the hip',
            'On the outside of the hip, over the bony point',
            'Buttock and down the back of the leg, often past the knee',
            'Lower back, spreading across the buttock and into the hip',
          ],
        },
        {
          label: 'What tends to set it off',
          cells: [
            'Getting out of a car, putting on socks, squatting',
            'Lying on that side at night, stairs, standing on one leg',
            'Sitting, driving, bending, coughing or sneezing',
            'Long sitting or standing, bending and lifting',
          ],
        },
        {
          label: 'Tingling or numbness',
          cells: [
            'Usually none',
            'Usually none',
            'Common, in the calf, foot or toes',
            'Usually none',
          ],
        },
        {
          label: 'What to do first',
          cells: [
            'Keep moving within comfort, and book in if it is not easing after a couple of weeks',
            'Ease off lying on that side and long stairs, and book in if it lingers',
            'Book an assessment, sooner if a leg is weak or numb',
            'Keep moving gently, and book in if it is not easing after a week or two',
          ],
        },
      ],
      note: 'Real hips overlap. Back and hip problems often arrive together, and a deep buttock ache can belong to any of these. The table tells you where to start reading; the assessment is what tells them apart.',
    },
    // Refresh re-reviewed by Valerie Na, confirmed by the user 2026-10-19.
    lastReviewed: '2026-10-19',
    draft: false,
  },
  {
    slug: 'shoulder-imbalance',
    title: 'Shoulder Imbalance and Postural Strain in Cheras, Kuala Lumpur',
    metaTitle: 'Shoulder Pain & Uneven Shoulders in Cheras',
    metaDescription:
      'Care for uneven shoulders, shoulder pain and postural strain in Cheras, Maluri. Assessment, dry needling and a posture-focused rehabilitation programme.',
    // Was 'shoulder and neck pain', which /conditions/neck-pain already owns — two pages
    // competing for one query is the cannibalisation the one-page-one-intent rule exists
    // to prevent. This page's h1 and body are about imbalance, so the keyword follows them.
    targetKeyword: 'uneven shoulders',
    related: ['neck-pain', 'back-pain'],
    helpedBy: ['dry-needling', 'posture-correction'],

    intro:
      'Almost nobody is perfectly symmetrical, and a shoulder sitting slightly higher than the other rarely needs attention on its own. It becomes worth looking at once symptoms come with it: an ache across one side of the neck and shoulder that builds through the working day, tightness that never fully clears, or a shoulder that no longer moves as freely as the other one. Most of what people call shoulder imbalance is a loading pattern. One side is doing more work, for more hours, than it has the endurance for. An assessment can describe that accurately, and how you work and train can change it.',
    symptoms: [
      'One shoulder or shoulder blade visibly sitting higher, or clothes and bag straps sliding off one side',
      'An ache across the top of one shoulder and into the neck that worsens through the working day',
      'Tightness that eases at the weekend and has returned by Tuesday afternoon',
      'A shoulder blade that wings out or moves differently from the other when you raise your arm',
      'Reduced overhead reach on one side, or a catch partway through raising the arm',
      'Tingling or pins and needles into the shoulder blade, arm or hand',
    ],
    causes: [
      {
        heading: 'Asymmetric daily loading',
        body: 'A mouse on one side, a bag always on the same shoulder, a monitor set off-centre, a child carried on one hip. None of these does harm in isolation. Repeated for eight hours a day over years, they ask one side to hold a position the other never has to, and the tissue adapts to what it is asked to do most.',
      },
      {
        heading: 'Restriction in the neck and upper back',
        body: 'The shoulder blade sits on the ribcage, and the ribcage moves with the thoracic spine. When mid-back or neck segments stop moving properly, the shoulder blade cannot sit or travel the way it should, and the muscles around it work harder to compensate.',
      },
      {
        heading: 'Endurance rather than strength',
        body: 'The muscles holding the shoulder blade in position are not usually weak in a way you would notice lifting something. They fatigue instead. That is why the ache turns up at four in the afternoon rather than first thing, and the programme is built around endurance more than heavy loading.',
      },
      {
        heading: 'Underlying structural asymmetry',
        body: 'Some shoulder-level differences relate to a spinal curve, a rib or a leg-length difference rather than to habit. These are described rather than blamed, and where the pattern suggests a curve worth measuring, that is assessed properly rather than assumed either way.',
      },
    ],
    approach: [
      {
        heading: 'Looking at the whole chain above and below the shoulder',
        body: 'Your first visit follows the Gonstead six-step assessment: history taking, visualisation of the level of head, shoulders, hips and knees, nervoscope instrumentation, palpation with a full-motion assessment of the spinal joints, X-ray analysis where indicated, and only then an adjustment. Visualisation carries weight here, because how you stand and how the shoulder blades sit tells us a good deal before anything has been touched.',
      },
      {
        heading: 'Releasing the tissue that is holding the pattern',
        body: 'Where the muscles around the neck, shoulder blade and upper back are chronically loaded, our physiotherapy side may use dry needling and hands-on soft-tissue work to reduce that tension. This part tends to change how things feel fairly quickly, though on its own it does not usually last. It makes the position easier to hold while the endurance work catches up.',
      },
      {
        heading: 'Changing the pattern itself',
        body: 'Most of the change comes from your desk setup, how often you get up, and a programme for the deep neck and scapular muscles. Habits hold this pattern in place more than structure does. We will be honest about what is likely to shift: symptoms and comfort often do, and how much a visible asymmetry moves varies a great deal from person to person.',
      },
      {
        heading: 'When the asymmetry needs a different assessment',
        body: 'A shoulder-level difference that is marked, that a patient did not previously have, or that comes with a rib hump or a visible spinal curve is a reason to assess for scoliosis properly, and in a growing adolescent that is an orthopaedic matter. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
    ],
    redFlags: [
      'Shoulder or neck pain following a fall, car accident, or a direct blow to the head, neck or shoulder',
      'Numbness, weakness, or loss of grip strength in an arm or hand',
      'A shoulder asymmetry that has appeared suddenly or is visibly worsening, especially in a child or adolescent',
      'Dizziness, visual disturbance, difficulty speaking or swallowing, or unsteadiness on your feet',
      'Shoulder pain with chest tightness, breathlessness, sweating, or pain into the jaw or left arm. Seek emergency care',
      'Fever, unexplained weight loss, or night pain that wakes you',
      'Clumsiness or unsteadiness affecting both hands or legs, or loss of bladder or bowel control',
    ],
    faqs: [
      {
        q: 'Is one shoulder being higher than the other a problem?',
        a: 'Not necessarily. Mild asymmetry is extremely common and plenty of people have it with no symptoms at all. What makes it worth assessing is pain, restricted movement, or an asymmetry that has changed. If you have no symptoms and nothing has changed, that is usually reassuring rather than something to act on.',
      },
      {
        q: 'Can chiropractic correct uneven shoulders?',
        a: 'We would rather set expectations honestly here. Adjustments can restore movement to restricted neck and mid-back segments, and soft-tissue work can reduce the muscular pull holding one side up. Both often help how the shoulder feels and moves. How much a visible difference changes depends on what is driving it, and where the cause is structural it may not change much at all.',
      },
      {
        q: 'Does uneven shoulders mean I have scoliosis?',
        a: 'Sometimes, but far from always. Shoulder-level differences usually come down to muscular loading rather than a spinal curve. Where the presentation suggests a curve, such as a rib hump on bending forward, a visible spinal deviation, or an adolescent who is still growing, we assess for it properly, including X-ray analysis where indicated.',
      },
      {
        q: 'What is dry needling and will it hurt?',
        a: 'It uses a fine needle to reach a tight band of muscle directly, which is difficult to achieve through the skin by hand alone. Most people describe a brief ache or a twitch rather than sharp pain, and some feel a little sore for a day afterwards. It is one option among several, used where the assessment suggests muscle tension is a meaningful part of the picture.',
      },
      {
        q: 'How do I stop it coming back?',
        a: 'Mostly by changing what caused it, which is why the desk setup and the endurance programme are not optional extras. Hands-on work takes load off irritated tissue, and the tissue goes straight back under load as soon as you sit down in the same position again. In practice: centre your monitor, alternate which shoulder carries your bag, and stand and move every 30 to 45 minutes.',
      },
    ],
    keyTakeaways: [
      {
        q: 'How common is a small difference?',
        a: 'Very. Most people are slightly asymmetric, and a difference you can see in a photograph is not on its own a sign that something is wrong.',
      },
      {
        q: 'When is it worth having assessed?',
        a: 'When it comes with pain or stiffness, when you have noticed it changing, or when it appears in a child or teenager during a growth spurt.',
      },
      {
        q: 'What usually causes it?',
        a: 'Habit and loading more often than structure. Carrying a bag on one side, a dominant arm, a screen set off centre, or one stiff segment doing less work than the other side.',
      },
      {
        q: 'What can realistically change?',
        a: 'Comfort, and how easily you hold a level position, often improve. A fixed structural difference is another matter, and your practitioner will say plainly which one you have.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'One of my shoulders sits higher than the other',
      'My neck or shoulder aches on one side',
      'I noticed it in photographs',
      'I carry a bag or work on one side all day',
      'I want to know whether it means scoliosis',
    ],
    citations: [
      {
        claim:
          'Mild postural asymmetry is common in the general population and is not by itself an indication of underlying disease.',
        source: 'Twarowska-Grybalow & Truszczyńska-Baszak (2023), International Journal of Environmental Research and Public Health',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10048875/',
      },
      {
        claim:
          'Screening for adolescent idiopathic scoliosis looks for trunk and rib asymmetry on forward bending rather than shoulder height alone.',
        source: 'Scoliosis Research Society',
        url: 'https://www.srs.org/Patients/Diagnosis-And-Treatment/Diagnosing-Scoliosis',
      },
    ],
    lastReviewed: '2026-08-08',
    draft: false,
  },
  {
    slug: 'pinched-nerve',
    title: 'Pinched Nerve in the Neck, Cheras, Kuala Lumpur',
    metaTitle: 'Pinched Nerve in the Neck Care, Cheras KL',
    metaDescription:
      'Pinched nerve in the neck assessed in Cheras, Maluri. Tingling, numbness or weakness into the arm and hand, examined before anything is adjusted.',
    targetKeyword: 'pinched nerve in neck',
    related: ['neck-pain', 'slipped-disc', 'carpal-tunnel-syndrome'],
    helpedBy: ['chiropractic-care', 'physiotherapy'],

    intro:
      'A pinched nerve in the neck is what most people call it when a nerve root is compressed or irritated as it leaves the spine. The clinical name is cervical radiculopathy. What makes it confusing is that the symptom usually turns up somewhere other than the problem: the nerve is pinched in the neck, but the burning, tingling or weakness is felt in the shoulder, arm or hand, and sometimes the neck itself barely hurts at all. Most people improve without surgery. The job of the assessment is to work out which nerve, at which level, and what is pressing on it.',
    symptoms: [
      'Burning, shooting or electric pain running from the neck into the shoulder, arm or hand',
      'Pins and needles or numbness in particular fingers rather than the whole hand',
      'Weakness in the arm, or a grip that gives way when you carry something',
      'Symptoms on one side only',
      'Pain that eases when you rest the affected hand on top of your head',
      'Symptoms set off by turning or tilting your head towards the painful side',
      'Neck ache that is milder than the arm symptoms it arrives with',
      'Sleep broken by the arm rather than by the neck',
    ],
    causes: [
      {
        heading: 'Disc material pressing on a nerve root',
        body: 'A bulging or herniated disc in the neck can press on a nerve root, or irritate it chemically, at the point where it leaves the spine. This is the more common picture in younger adults, and it is why the neck is examined carefully even when the hand is the part that bothers you.',
      },
      {
        heading: 'Narrowing of the opening the nerve passes through',
        body: 'Age-related changes to the small joints and discs of the neck gradually reduce the space each nerve root travels through. Symptoms in this pattern tend to build slowly rather than arrive overnight, and they are often provoked by holding the head in one position for a long stretch.',
      },
      {
        heading: 'Sustained neck position and loading',
        body: 'Long hours with the head held forward of the shoulders load the lower neck continuously. That rarely pinches a nerve on its own, but it is a common background finding, and it is usually the part of the picture a patient has most control over.',
      },
      {
        heading: 'A nerve irritated further along its path',
        body: 'Not every arm symptom starts at the neck. The same nerve can be compressed further along its route, at the shoulder, the elbow or the wrist, and that produces a different pattern. Which fingers are involved, and which movements provoke it, is a large part of how the two are told apart during the examination.',
      },
    ],
    approach: [
      {
        heading: 'Finding which nerve, and where it is being pinched',
        body: 'Your first visit follows the Gonstead six-step assessment: history, visualisation, instrumentation with the nervoscope, palpation, and X-ray analysis where indicated. On this presentation your chiropractor adds neurological testing, checking reflexes, muscle strength and sensation across the areas each nerve root supplies. That part matters more here than on most pages, because a nerve problem leaves a pattern that a general neck examination on its own would miss.',
      },
      {
        heading: 'Adjustment where the assessment supports it',
        body: 'If the examination points to a restricted segment contributing to the picture, the adjustment is specific to that level and delivered by hand, and your chiropractor will explain what they found before anything happens. Some presentations are not suitable for adjustment, and the assessment exists to catch that. If another healthcare provider would serve you better, you will be referred appropriately.',
      },
      {
        heading: 'Rebuilding what the arm has lost',
        body: 'Where strength or endurance has dropped in the arm or the deep neck muscles, our physiotherapy side adds a graded programme to rebuild it, along with nerve mobility work where the assessment supports it. This is generally the slower half of the process, and the half that depends most on what you do between visits.',
      },
      {
        heading: 'Changing what keeps loading it',
        body: 'Restoring movement to a stiff segment does not hold for long if the neck goes back to the position that irritated it for another eight hours a day. Desk and screen height, phone habits, how you sleep and how often you get up all get covered, because they are what decides whether an improvement lasts.',
      },
    ],
    redFlags: [
      'Weakness that is getting worse, or an arm or hand you cannot use properly',
      'Symptoms in both arms at the same time',
      'Clumsiness in the hands, difficulty with buttons or handwriting, or unsteadiness on your feet',
      'Loss of bladder or bowel control',
      'Neck or arm symptoms following a fall, a road accident, or a blow to the head or neck',
      'Fever, unexplained weight loss, or pain that wakes you every night',
      'Sudden severe neck pain with dizziness, visual disturbance, or difficulty speaking or swallowing',
    ],
    faqs: [
      {
        q: 'Is a pinched nerve the same thing as a slipped disc?',
        a: 'They are related but not the same. A slipped disc describes the disc itself bulging or herniating. A pinched nerve describes what can happen next, if that disc material or a narrowed opening presses on a nerve root. You can have a disc change on a scan with no nerve symptoms at all, and you can have nerve symptoms from a cause other than a disc. Which one you are dealing with is what the examination sorts out.',
      },
      {
        q: 'How do I know whether my arm symptoms come from my neck or my wrist?',
        a: 'The pattern usually gives it away. A nerve compressed at the neck tends to produce symptoms that follow one strip down the arm and involve particular fingers, and it is often provoked by neck movement. A nerve compressed at the wrist tends to stay in the hand, and is often worse at night or when gripping. There is genuine overlap, and some people have both at once, so we test for both rather than assuming.',
        links: [{ phrase: 'compressed at the wrist', href: '/conditions/carpal-tunnel-syndrome' }],
      },
      {
        q: 'Will an adjustment make a pinched nerve worse?',
        a: 'It depends entirely on the presentation, which is why the assessment comes first and why not every neck gets adjusted. Where there are signs that the spinal cord rather than a single nerve root is involved, or where weakness is progressing, hands-on care is not the right first step and you will be sent for medical review instead. Tell us about any weakness, clumsiness or recent trauma when you book, so we can screen for it properly.',
      },
      {
        q: 'Do I need an MRI before I come in?',
        a: 'No. Bring one if you already have it, along with any report, because it saves repeating work. Most people do not need advanced imaging to begin with, and a scan on its own tells us less than you would expect without the examination alongside it. Disc changes show up on scans of plenty of people who have no symptoms whatsoever, so the findings only mean something in context.',
      },
      {
        q: 'How long does it usually take to settle?',
        a: 'It varies with the cause, how long it has been there, and how much the nerve is loaded day to day, so we will not quote you a number before examining you. Symptoms present for a few weeks generally behave differently from symptoms present for a year. Your chiropractor will give you a realistic picture based on your own findings rather than a general figure.',
      },
    ],
    keyTakeaways: [
      {
        q: 'What is a pinched nerve in the neck?',
        a: 'A nerve root compressed or irritated as it leaves the spine in the neck. The clinical name for it is cervical radiculopathy.',
      },
      {
        q: 'Why do I feel it in my hand and not my neck?',
        a: 'Because a nerve carries signals away from the place it is pinched. The neck is where the problem sits, the arm and hand are where it is felt, and the neck itself may hardly hurt.',
      },
      {
        q: 'Does a pinched nerve always mean surgery?',
        a: 'No. Most people improve over time without it, and non-surgical care is the usual starting point. Weakness that is getting worse is the finding that changes that, which is why it is screened for.',
      },
      {
        q: 'Does it matter which fingers go numb?',
        a: 'It matters a great deal. Each nerve root supplies a particular strip of skin and particular muscles, so the fingers involved help point to the level rather than being an incidental detail.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'I have tingling or numbness in my arm or hand',
      'My grip feels weaker than it used to be',
      'The pain is worse in my arm than in my neck',
      'Turning my head sets off symptoms down my arm',
      'I want to know whether this is coming from my neck',
    ],
    citations: [
      {
        claim:
          'Most people with a pinched nerve in the neck improve over time, and the first approach is generally non-surgical.',
        source: 'OrthoInfo, American Academy of Orthopaedic Surgeons',
        url: 'https://www.orthoinfo.org/en/diseases--conditions/cervical-radiculopathy-pinched-nerve/',
      },
      {
        claim:
          'The C7 nerve root is the level most often involved in cervical radiculopathy, accounting for more than half of cases, with C6 accounting for roughly a quarter.',
        source: 'Cervical Radiculopathy, StatPearls, National Library of Medicine',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK441828/',
      },
    ],
    // Reviewed by Valerie Na, confirmed by the user 2026-10-03.
    lastReviewed: '2026-10-03',
    draft: false,
  },
  {
    slug: 'tension-headache',
    title: 'Tension Headache Care in Cheras, Kuala Lumpur',
    metaTitle: 'Tension Headache Care in Cheras, KL',
    metaDescription:
      'Tension headache assessment in Cheras, Maluri. The band-like pressure kind, how it differs from migraine, and what a neck examination can tell you.',
    targetKeyword: 'tension headache treatment',
    related: ['neck-pain', 'migraine'],
    helpedBy: ['dry-needling', 'physiotherapy'],

    intro:
      'A tension headache is the common one: a dull, pressing tightness on both sides of the head, often described as a band or a tight hat, without the throbbing and the nausea that mark out a migraine. It is the most widely experienced headache there is, which is exactly why it gets dismissed. Most people manage it with a painkiller and carry on, and for an occasional headache that is a reasonable thing to do. It is worth a closer look when the headaches arrive most weeks, when they track your working day, or when the painkillers have quietly become a daily habit. What we can assess is whether the muscles and joints of the neck and upper back are part of what keeps setting them off.',
    symptoms: [
      'Pressing or tightening pain on both sides of the head rather than one',
      'A band-like tightness around the forehead, temples or the back of the head',
      'Mild to moderate pain that is dull rather than throbbing',
      'Pain that does not get worse when you walk up stairs or move about',
      'No nausea or vomiting with it',
      'Tenderness in the muscles at the base of the skull, the neck and the shoulders',
      'Headaches that build through the working day and ease at the weekend',
      'Difficulty concentrating, and a sense of pressure rather than sharp pain',
    ],
    causes: [
      {
        heading: 'Sustained loading of the neck and shoulder muscles',
        body: 'Muscles held at a low level of contraction for hours become tender and refer pain into the head. A screen set too low, a laptop used without a stand, long stretches on a phone and driving in traffic all ask the muscles at the base of the skull to work continuously without ever fully letting go.',
      },
      {
        heading: 'Restricted movement in the upper neck',
        body: 'When a segment of the upper neck stops moving well, the muscles around it work harder to compensate and stay loaded. This is a frequent finding in people whose headaches begin at the back of the skull, though it is not the whole story on its own.',
      },
      {
        heading: 'Stress, sleep and jaw clenching',
        body: 'Poor sleep, an unsupportive pillow and low-grade clenching keep the muscles around the skull and jaw under tension overnight, so the area never gets a genuine rest period. These rarely explain a headache entirely, but they very often sit alongside whatever else is going on.',
      },
      {
        heading: 'Painkillers taken too often',
        body: 'This one surprises people. Taking headache medication on more days than not can, over months, make headaches more frequent rather than less. It is a recognised pattern with its own name, medication-overuse headache. We are not the right people to adjust your medication, but if the pattern fits, it is worth raising with your doctor or pharmacist rather than leaving unexamined.',
      },
    ],
    approach: [
      {
        heading: 'Working out which headache this actually is',
        body: 'Your first visit is largely history taking: where the pain sits, what it feels like, what brings it on, what it arrives with, and what you have already tried. Tension headache, migraine and headache coming from the neck can overlap, and plenty of people have more than one at a time. Arriving at a headache diagnosis is a job for your doctor. What we are establishing is whether there is a mechanical contribution worth addressing.',
      },
      {
        heading: 'Examining the neck and upper back',
        body: 'That is followed by the rest of the Gonstead six-step assessment: visualisation, nervoscope instrumentation, palpation with a full-motion assessment of the neck and upper back, and X-ray analysis where indicated. Your chiropractor is looking for restricted segments and for the tender, overworked muscle that so often accompanies them.',
      },
      {
        heading: 'What care involves where the neck is contributing',
        body: 'Where the assessment points to restricted segments, the adjustment is specific to them and delivered by hand, and your chiropractor will explain what they found first. Where the surrounding muscle is a significant part of it, our physiotherapy side may add manual therapy or dry needling for the tender points at the base of the skull and across the shoulders, alongside a programme to build endurance in the deep neck muscles. We are aiming at better movement and less sustained load on that tissue. What that changes about the headaches themselves varies from person to person.',
      },
      {
        heading: 'The part that happens outside the clinic',
        body: 'Desk and screen height, how often you get up, your pillow, and how much caffeine and water go through a working day all feed into this. You will usually be asked to keep a simple record of when the headaches happen and what came before them, because headache patterns are very hard to judge from memory and it is often the most useful thing a patient brings to a second visit.',
      },
    ],
    redFlags: [
      'A sudden, severe headache that reaches full intensity within seconds or minutes',
      'The worst headache of your life, or one clearly unlike any you have had before',
      'Headache with fever, neck stiffness, or a rash',
      'Headache with weakness, numbness, confusion, difficulty speaking, or loss of vision',
      'Any headache following a blow to the head, a fall, or a road accident',
      'A new headache beginning after the age of 50, or one steadily worsening over days and weeks',
      'Headache that is worse on lying down, coughing or straining, or that wakes you from sleep',
      'Headache alongside a history of cancer, a compromised immune system, or unexplained weight loss',
    ],
    faqs: [
      {
        q: 'How is a tension headache different from a migraine?',
        a: 'A tension headache is usually felt on both sides as a steady pressing tightness, is mild to moderate, and does not get worse when you move about. A migraine is more often one sided and throbbing, tends to be worse with activity, and commonly brings nausea or sensitivity to light and sound. That is the textbook split, and real life is messier, since some people get both. Migraine is a neurological condition and its medical management belongs with a doctor.',
      },
      {
        q: 'Can a tight neck really cause a headache?',
        a: 'Muscles and joints in the neck and upper back can refer pain into the head, and that is well recognised. Whether it is what is driving your headaches specifically is a question for the examination rather than something to assume. Some features point that way, such as pain starting at the base of the skull, tenderness in those muscles, and headaches that track your working day, but none of them is conclusive on its own.',
      },
      {
        q: 'Will chiropractic stop my headaches?',
        a: 'We cannot tell you that, and you should be wary of anyone who does. Where restricted neck segments and overloaded muscle are contributing, restoring movement and reducing that load often changes how much head pain people get. It depends on the presentation, and some people notice little difference. Your chiropractor will tell you honestly what they expect and what they do not.',
      },
      {
        q: 'I take painkillers most days. Is that a problem?',
        a: 'It is worth looking at. Headache medication taken on more days than not can, over months, feed a cycle where headaches become more frequent. It has a recognised name, medication-overuse headache. Changing or stopping medication is not our decision to make and should not be done abruptly on our say-so. Bring a list of what you take and how often to your first visit, and raise the pattern with the doctor or pharmacist who supplies it.',
      },
      {
        q: 'What should I bring to a first visit?',
        a: 'A list of any medication you take, including anything over the counter, and if you can manage it, a rough record of the last few weeks: when the headaches came, how long they lasted, and what you were doing beforehand. If you have had imaging or seen a doctor about the headaches, bring the report.',
      },
    ],
    keyTakeaways: [
      {
        q: 'What does a tension headache feel like?',
        a: 'A dull, pressing tightness on both sides of the head, often described as a band. It is mild to moderate, it does not throb, and it does not usually come with nausea.',
      },
      {
        q: 'What brings tension headaches on?',
        a: 'Most often sustained loading: hours with the head forward of the shoulders, a screen set too low, poor sleep and clenching. Stress rarely acts alone but very often sits alongside.',
      },
      {
        q: 'Should I see someone about a headache I get most weeks?',
        a: 'It is worth a look. An occasional headache managed with a painkiller is reasonable. Headaches most weeks, or ones that track your working day, are worth examining properly.',
      },
      {
        q: 'Is chiropractic the right place to start for a headache?',
        a: 'It depends what kind it is. We can assess whether the neck and upper back are contributing. Diagnosing a headache disorder is your doctor’s job, and we will say so if that is the right next step.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'I get a band-like pressure around my head most weeks',
      'My headaches get worse as the working day goes on',
      'The muscles at the base of my skull are tender',
      'I am taking painkillers for headaches most days',
      'I want to know whether my neck is part of the problem',
    ],
    citations: [
      {
        claim:
          'Tension-type headache is classified as a headache disorder in its own right, separate from migraine.',
        source: 'International Classification of Headache Disorders, ICHD-3',
        url: 'https://ichd-3.org/2-tension-type-headache/',
      },
      {
        claim:
          'Tension-type headaches are described as pressure or tightness, often like a band around the head, and episodic tension-type headache is reported by more than 70 per cent of some populations.',
        source: 'World Health Organization, Headache disorders',
        url: 'https://www.who.int/news-room/fact-sheets/detail/headache-disorders',
      },
      {
        claim:
          'Medication-overuse headache is caused by chronic and excessive use of medication taken for headache, and may affect up to 5 per cent of some populations.',
        source: 'World Health Organization, Headache disorders',
        url: 'https://www.who.int/news-room/fact-sheets/detail/headache-disorders',
      },
    ],
    // Reviewed by Valerie Na, confirmed by the user 2026-10-03.
    lastReviewed: '2026-10-03',
    draft: false,
  },
  {
    slug: 'whiplash',
    title: 'Whiplash and Neck Injury Care in Cheras, Kuala Lumpur',
    metaTitle: 'Whiplash & Neck Injury Care, Cheras KL',
    metaDescription:
      'Whiplash assessed in Cheras, Maluri. Get checked medically first, then graded assessment and rehabilitation for the neck once serious injury is ruled out.',
    targetKeyword: 'whiplash injury',
    related: ['neck-pain', 'pinched-nerve'],
    helpedBy: ['physiotherapy', 'sports-injury-rehabilitation'],

    intro:
      'Whiplash is the neck injury that follows the head being thrown quickly forwards and back, most often in a rear-end collision, though a fall or a heavy tackle does the same thing. Read one line before the rest of this page: if you have just been in an accident, get assessed medically first. A fracture or an injury to the spinal cord is not something a chiropractor treats, and it has to be ruled out before anyone puts hands on your neck. Once that has been done, most whiplash is a soft tissue and joint problem that settles over weeks to a few months, and that is the stage where assessment and rehabilitation here are worth having.',
    symptoms: [
      'Neck pain and stiffness that often begins hours after the accident rather than immediately',
      'Reduced ability to turn or tilt the head',
      'Headache, most commonly starting at the base of the skull',
      'Pain across the shoulders and into the upper back',
      'Tenderness through the neck muscles when pressed',
      'Tingling or numbness into an arm or hand',
      'Dizziness, fatigue, or difficulty concentrating in the days afterwards',
      'Disturbed sleep, and anxiety about driving or being a passenger',
    ],
    causes: [
      {
        heading: 'The mechanism itself',
        body: 'The body is restrained by the seatbelt while the head keeps moving, so the neck is taken rapidly beyond its normal range and back again. That can strain the muscles and ligaments, irritate the small joints at the back of the neck, and in more forceful collisions involve the discs or the nerve roots. Speed matters less than people assume, and low-speed collisions can still produce genuine symptoms.',
      },
      {
        heading: 'Delayed onset',
        body: 'It commonly takes several hours for symptoms to appear, and sometimes a day or two. Adrenaline at the scene masks a great deal. This is why feeling fine at the roadside is not evidence that nothing happened, and why a follow-up assessment a few days later is sensible even when the initial check was clear.',
      },
      {
        heading: 'Guarding and disuse',
        body: 'A painful neck gets held still, and a neck held still stiffens and loses strength. Over a few weeks this becomes part of the problem in its own right, separate from the original injury. It is one of the reasons that gently returning to normal movement, rather than resting completely, is what current guidance advises.',
      },
      {
        heading: 'The parts that are not just tissue',
        body: 'Poor sleep, worry about the neck, and anxiety about driving are common after a collision and they genuinely affect how recovery goes. They are not a sign that the pain is imaginary. They are a normal response to being in an accident, and worth naming rather than ignoring.',
      },
    ],
    approach: [
      {
        heading: 'Medical assessment comes first, and we will say so',
        body: 'If you have not yet been checked after an accident, that is the first step, not an appointment here. Fracture, dislocation and spinal cord injury need imaging and a medical opinion, and no responsible assessment of a recent whiplash begins without that having been dealt with. If you arrive here and anything in the history or examination raises those concerns, you will be sent on rather than adjusted, and we would rather refer you than treat something that is not ours to manage.',
      },
      {
        heading: 'Grading what actually happened',
        body: 'Whiplash is commonly described in grades, from no complaint at all through neck pain with no physical signs, to neck pain with reduced movement and tenderness, to neck pain with neurological signs such as altered reflexes or weakness, and finally to fracture or dislocation. Where you sit changes what is appropriate, so the examination establishes that before anything else is decided.',
      },
      {
        heading: 'Restoring movement, gradually',
        body: 'For the grades that suit conservative care, the work is to get the neck moving again without provoking it. Depending on what the examination finds, that can involve gentle hands-on care, soft tissue work and dry needling for muscle that has locked down, and a graded programme through our physiotherapy side. Adjustment is used where the assessment supports it, and your chiropractor will explain what they found and what they intend before anything happens.',
      },
      {
        heading: 'Getting back to normal activity',
        body: 'Current guidance for whiplash favours keeping up everyday activities rather than resting the neck, and advises against relying on a collar, which tends to leave the neck stiffer. Your programme builds tolerance back up in stages, including the things people quietly avoid afterwards, such as shoulder checks when driving. Most people recover over weeks to a few months, and some take longer.',
      },
    ],
    redFlags: [
      'Any neck injury not yet assessed medically, especially after a high-speed collision',
      'Loss of consciousness at any point, or confusion, vomiting or worsening drowsiness',
      'Severe pain or tenderness over the midline of the spine itself',
      'Weakness, numbness or pins and needles in the arms or legs',
      'Clumsiness in the hands, unsteadiness on your feet, or loss of bladder or bowel control',
      'Dizziness, visual disturbance, difficulty speaking or swallowing, or slurred speech',
      'A severe headache that is worsening rather than settling in the days after the accident',
    ],
    faqs: [
      {
        q: 'Should I go to hospital after a car accident, or straight to a chiropractor?',
        a: 'Get medically assessed first. Fracture, dislocation and spinal cord injury are not things conservative care is for, and they need imaging and a doctor to rule out. Once that has been done and you have been cleared, an assessment here for the joint and muscle side of the injury is a reasonable next step. If you come to us first and anything concerning turns up, we will send you on.',
      },
      {
        q: 'I felt fine at the scene and sore two days later. Is that normal?',
        a: 'Very. It commonly takes several hours for symptoms to appear, sometimes a day or two, because adrenaline at the time masks a lot. Feeling fine at the roadside is not evidence that nothing happened. If new symptoms turn up in the days afterwards, particularly anything neurological, get reviewed rather than waiting it out.',
      },
      {
        q: 'Should I wear a neck collar?',
        a: 'Current guidance advises against relying on one. A collar holds the neck still at exactly the point when gentle movement is what helps, and necks that are kept still tend to stiffen and lose strength. If a doctor has specifically told you to wear one, follow that, since they will have a reason. Otherwise the aim is to keep moving within comfort.',
      },
      {
        q: 'How long does whiplash take to recover from?',
        a: 'It usually improves over a period of weeks to a few months, though some people have symptoms for longer, and how the neck was loaded before the accident makes a difference. We will not put a number on your recovery before examining you. What we can tell you after an assessment is what stage you are at and what the sensible next few weeks look like.',
      },
      {
        q: 'Can you provide a report for an insurance or legal claim?',
        a: 'Ask us directly rather than assuming either way, because what we can provide depends on what is being requested and by whom. Whatever we do write reflects only what was found on examination here. Keep your own records too: the date of the accident, when symptoms started, and any medical assessment you have had.',
      },
    ],
    keyTakeaways: [
      {
        q: 'What is whiplash?',
        a: 'A neck injury from the head being thrown rapidly forwards and back, most often in a rear-end collision. It strains muscles and ligaments and can irritate the joints of the neck.',
      },
      {
        q: 'What is the first thing to do after an accident?',
        a: 'Get assessed medically, before any hands-on care. Fracture and spinal cord injury need imaging and a doctor to exclude, and that has to happen first.',
      },
      {
        q: 'Why did my neck only start hurting the next day?',
        a: 'Because symptoms commonly take several hours, sometimes a day or two, to appear. Adrenaline masks a great deal at the scene, so feeling fine at the time proves little.',
      },
      {
        q: 'Is resting the neck the right thing to do?',
        a: 'Generally no. Guidance favours keeping up everyday activity within comfort over resting, and advises against leaning on a collar, because a neck held still stiffens and weakens.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'I was in an accident and my neck is stiff and sore',
      'My symptoms started a day or two after the accident',
      'I cannot turn my head properly to check my blind spot',
      'I have headaches that began after the collision',
      'I have been cleared medically and want the neck assessed',
    ],
    citations: [
      {
        claim:
          'Symptoms of whiplash can take several hours to begin, and it usually improves within two to three months, though some people have symptoms for longer.',
        source: 'NHS, Whiplash',
        url: 'https://www.nhs.uk/conditions/whiplash/',
      },
      {
        claim:
          'NHS guidance for whiplash advises continuing everyday activities and advises against using a neck brace or collar for support.',
        source: 'NHS, Whiplash',
        url: 'https://www.nhs.uk/conditions/whiplash/',
      },
      {
        claim:
          'The grading of whiplash-associated disorders from grade 0 to grade IV comes from the Quebec Task Force monograph published in Spine in 1995.',
        source: 'Spitzer WO and others, Spine, 1995',
        url: 'https://pubmed.ncbi.nlm.nih.gov/7604354/',
      },
    ],
    // Reviewed by Valerie Na, confirmed by the user 2026-10-03.
    lastReviewed: '2026-10-03',
    draft: false,
  },
  {
    slug: 'spinal-stenosis',
    title: 'Lumbar Spinal Stenosis Care in Cheras, Kuala Lumpur',
    metaTitle: 'Lumbar Spinal Stenosis Care in Cheras, KL',
    metaDescription:
      'Legs heavy or tingling when you walk, easier when you sit or lean forward? Lumbar spinal stenosis assessment and conservative care in Cheras, Maluri.',
    // Built 2026-10-19 (schedule pc019). Ubersuggest MY: "spinal stenosis" measures 0/mo,
    // "lumbar spinal stenosis" 480/mo (SD 15). "neurogenic claudication" (170) is named in the
    // intro and "stenosis of the neck" (210) is answered by an FAQ that links pinched nerve.
    // The Malaysian SERP is mostly hospitals and spine surgeons, so this page is the plain
    // conservative-first one, honest about where surgery fits. Not yet reviewed by Valerie, so
    // lastReviewed is deliberately unset.
    targetKeyword: 'lumbar spinal stenosis',
    related: ['sciatica', 'slipped-disc', 'spondylolisthesis'],
    helpedBy: ['physiotherapy', 'chiropractic-care'],

    intro:
      'Lumbar spinal stenosis means the space the nerves run through in the lower back has narrowed. It usually builds slowly with age, as the ligament inside the spinal canal thickens, the small joints at the back of the spine enlarge and a disc bulges a little. The pattern it produces has a name, neurogenic claudication: legs that ache, feel heavy or tingle after a fairly predictable walking distance, and ease once you sit down or lean forward. Narrowing on a scan is common in people with no symptoms at all, so the scan alone does not decide what happens next. Many people manage spinal stenosis without surgery, some need a surgical opinion, and the assessment is how we work out which applies to you.',
    symptoms: [
      'Legs that ache, feel heavy or tingle after walking a certain distance',
      'Relief within a few minutes of sitting down or bending forward',
      'Walking is easier leaning on a shopping trolley, and cycling is easier than walking',
      'Standing still in a queue brings the leg symptoms on',
      'Lower back stiffness that is milder than what you feel in the legs',
      'Symptoms in one leg or in both',
      'A walking distance that has been shrinking over months',
    ],
    causes: [
      {
        heading: 'Thickening of the ligament inside the spinal canal',
        image: { src: '/img/sten-cause-ligament.webp', alt: 'Illustration of three lower back vertebrae in side view with the spinal canal cut away, a thickened ligament at the back of the canal and a golden glow where it narrows around the nerves' },
        body: 'A ligament runs along the back of the spinal canal. Over the years it thickens and loses some of its elasticity, and when you stand upright it folds inward into the space the nerves need. This is one reason symptoms come on with standing and walking rather than sitting.',
      },
      {
        heading: 'Arthritis in the facet joints of the lower back',
        image: { src: '/img/sten-cause-facet.webp', alt: 'Illustration of three lower back vertebrae seen from behind, with the small joints at the back enlarged by bone spurs and a golden glow around them' },
        body: 'The small joints at the back of each vertebra wear and enlarge with age, sometimes forming bone spurs. They sit right beside the openings the nerve roots pass through, so as they grow they can crowd the nerves on one or both sides.',
      },
      {
        heading: 'A bulging disc narrowing the canal further',
        image: { src: '/img/sten-cause-disc.webp', alt: 'Illustration of two lower back vertebrae in side view with the disc between them bulging backward towards a nerve, marked by a golden glow' },
        body: 'Discs lose height and bulge a little with age. On their own they rarely cause stenosis, but a bulge at the front of a canal that is already crowded by ligament and joint changes can be what tips the space from tight to symptomatic.',
      },
      {
        heading: 'A vertebra slipped forward',
        image: { src: '/img/sten-cause-slip.webp', alt: 'Illustration of a column of lower back vertebrae in side view, with one vertebra shifted forward over the one below and a golden glow at the step' },
        body: 'When one vertebra has shifted forward on the one below, a condition called spondylolisthesis, the canal at that level is narrowed by the step. The two often turn up together in people over 50, which is why the assessment looks at both.',
      },
    ],
    approach: [
      {
        heading: 'Telling spinal stenosis apart from a circulation problem',
        body: 'Your first visit follows the Gonstead six-step assessment: history, visualisation, instrumentation with the nervoscope, palpation, and X-ray analysis where indicated. On this presentation your chiropractor adds a neurological examination of reflexes, strength and sensation in the legs, checks the pulses in your feet, and looks at how posture and walking change your symptoms. Poor circulation in the legs can produce a very similar walking pattern, and it needs a doctor rather than us.',
      },
      {
        heading: 'Manual care as part of an exercise plan',
        body: 'Where the assessment supports it, restricted segments above and below the narrowed level may be adjusted by hand, and some presentations are not adjusted at all. Adjustment does not widen a narrowed canal. Its job is to help the spine move better so the exercise work is easier to do, and guidelines recommend manual care for back pain only alongside exercise, which is how we use it.',
      },
      {
        heading: 'Walking tolerance as the measure of progress',
        body: 'Our physiotherapy side builds a programme around positions that open the canal: bending forward, cycling and walking in intervals with planned sitting breaks, along with strength work for the hips and trunk. How far you can walk before the legs tire is re-tested over time, because it says more about stenosis than how the back feels on a given day.',
      },
      {
        heading: 'Knowing when spinal stenosis is not ours to treat',
        body: 'Weakness that is getting worse, any change in bladder or bowel control, or a walking distance that keeps shrinking despite consistent work all mean a referral to an orthopaedic or neurosurgical specialist. A surgical opinion is a legitimate step for spinal stenosis, and we will tell you plainly if we think you need one.',
      },
    ],
    redFlags: [
      'Loss of bladder or bowel control, or numbness around the groin, buttocks and inner thighs',
      'Weakness in a leg that is getting worse, or a foot that drags when you walk',
      'Leg symptoms that suddenly get much worse in both legs',
      'Calf pain on walking with cold, pale or discoloured feet, pain in the legs at rest, or sores on the feet that do not heal',
      'Clumsy hands, difficulty with buttons or handwriting, or unsteadiness on your feet',
      'Fever, unexplained weight loss, or a history of cancer alongside new back or leg pain',
      'New back pain after a fall in someone with osteoporosis',
    ],
    faqs: [
      {
        q: 'Can a chiropractor help with spinal stenosis?',
        a: 'Partly, and it is worth being honest about which part. A narrowed canal is a structural change, and no adjustment makes it wider. What the evidence does support is a combined programme of manual care and exercise, which has been shown to improve symptoms and function in the short term for many people with lumbar spinal stenosis. The goal is that you can walk further and stand longer, and the assessment tells us whether you are a good fit for that or would be better served by a specialist.',
      },
      {
        q: 'Do I need surgery for lumbar spinal stenosis?',
        a: 'Not necessarily. In one large trial of people over 50 who were already candidates for surgery, those given physiotherapy had similar physical function at two years to those who had decompression surgery. The same trial is also a reminder of its limits: 57% of the physiotherapy group crossed over to surgery during the study. Surgery is a reasonable choice when weakness is progressing, when bladder or bowel control changes, or when walking keeps getting harder despite consistent conservative care.',
      },
      {
        q: 'Why can I walk further when I lean on a shopping trolley?',
        a: 'Bending forward opens up the spinal canal and the openings the nerves pass through, and standing upright narrows them again. Leaning on a trolley, pushing a pram or riding a bicycle keeps you slightly bent, so the nerves get more room. It is a useful sign during the assessment, and something to use on purpose day to day rather than fight against.',
      },
      {
        q: 'What exercises help spinal stenosis?',
        a: 'Movements that bend the lower back forward tend to suit stenosis better than ones that arch it backward. Knee to chest stretches, cycling and walking in short stretches with sitting breaks are common starting points, along with strength work for the hips and trunk. Our guide to sciatica exercises has a column for a narrowed spinal canal showing which of its exercises tend to suit it. Drop anything that sends symptoms further down your legs.',
        links: [{ phrase: 'sciatica exercises', href: '/blog/sciatica-exercises' }],
      },
      {
        q: 'Can spinal stenosis happen in the neck?',
        a: 'Yes. Stenosis of the neck behaves differently from the lower back version. Narrowing that presses on a single nerve root tends to send pain or tingling into one arm, which is covered on our page on a pinched nerve in the neck. Narrowing that presses on the spinal cord itself shows up as clumsy hands, trouble with buttons or handwriting, and unsteady walking, and that needs prompt medical review rather than an appointment with us.',
        links: [{ phrase: 'pinched nerve in the neck', href: '/conditions/pinched-nerve' }],
      },
      {
        q: 'My MRI report says severe stenosis. Will it keep getting worse?',
        a: 'Not necessarily. How narrow a canal looks on a scan and how much it bothers you do not line up closely, and narrowing is found in a large share of people over 60 who have no symptoms at all. Many people with lumbar spinal stenosis stay stable for years. What matters more is how far you can walk, whether there is any weakness, and how that changes over time, which is what we track.',
      },
      {
        q: 'Is spinal stenosis the same as a slipped disc?',
        a: 'No. A slipped disc is disc material bulging or herniating, which is more common between 30 and 50 and tends to hurt with sitting and bending. Spinal stenosis is a narrowing of the whole canal from several changes at once, more common after 50, and it tends to hurt with standing and walking. A disc bulge can be one part of the narrowing, so the two do overlap, and our slipped disc page covers the disc side in full.',
        links: [{ phrase: 'slipped disc page', href: '/conditions/slipped-disc' }],
      },
    ],
    keyTakeaways: [
      {
        q: 'What is lumbar spinal stenosis?',
        a: 'A narrowing of the space the nerves run through in the lower back, usually from age-related thickening of ligament, enlarged joints and disc bulging rather than a single injury.',
      },
      {
        q: 'What is neurogenic claudication?',
        a: 'The typical pattern of lumbar spinal stenosis: aching, heaviness or tingling in the legs that comes on with standing or walking and eases with sitting or bending forward.',
      },
      {
        q: 'Is it dangerous?',
        a: 'Usually not. Most people stay stable, but bladder or bowel changes, numbness around the groin or a leg that is getting weaker need same day medical care.',
      },
      {
        q: 'Will my spine be adjusted?',
        a: 'Only where the assessment supports it. Some levels are left alone, some presentations are not adjusted at all, and exercise does most of the work either way.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'My legs get heavy or tingle when I walk',
      'Sitting down or leaning forward eases it',
      'I can walk less far than I used to',
      'I have been told I have spinal stenosis',
      'I want to know whether I need surgery',
    ],
    citations: [
      {
        claim:
          'A combined programme of manual therapy and exercise had moderate quality evidence of short term improvement in symptoms and function for lumbar spinal stenosis with neurogenic claudication, while most other non operative options had low quality evidence.',
        source: 'Ammendolia et al. (2022), BMJ Open, updated systematic review',
        url: 'https://doi.org/10.1136/bmjopen-2021-057724',
      },
      {
        claim:
          'Among surgical candidates aged 50 and over, decompression surgery and physical therapy produced similar physical function at two years, although 57% of the physical therapy group crossed over to surgery.',
        source: 'Delitto et al. (2015), Annals of Internal Medicine',
        url: 'https://doi.org/10.7326/M14-1420',
      },
      {
        claim:
          'Acquired narrowing of the lumbar spinal canal was common on CT in a community sample and increased with age, with relative stenosis found in 47% of people aged 60 to 69.',
        source: 'Kalichman et al. (2009), The Spine Journal, Framingham Study',
        url: 'https://doi.org/10.1016/j.spinee.2009.03.005',
      },
      {
        claim:
          'Manual therapy for low back pain with or without sciatica should be considered only as part of a package of care that includes exercise.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
    ],
    comparison: {
      heading: 'Lumbar spinal stenosis, slipped disc, sciatica or a circulation problem?',
      intro:
        'Leg pain that comes on with walking has a few possible sources, and one of them is not in the spine at all. This is a rough guide to which you might be dealing with, and the linked columns go to the page that covers it in full.',
      columns: [
        'Lumbar spinal stenosis',
        { label: 'Slipped disc', href: '/conditions/slipped-disc' },
        { label: 'Sciatica', href: '/conditions/sciatica' },
        'Poor circulation in the legs',
      ],
      rows: [
        {
          label: 'Who it usually affects',
          cells: [
            'Mostly people over 50',
            'Most often adults between 30 and 50',
            'Any adult, depending on the cause',
            'Mostly older adults, especially smokers or people with diabetes',
          ],
        },
        {
          label: 'What brings it on',
          cells: [
            'Standing and walking',
            'Sitting, bending forward, coughing or sneezing',
            'Sitting, driving or bending',
            'Walking, especially uphill or fast',
          ],
        },
        {
          label: 'What eases it',
          cells: [
            'Sitting down or leaning forward',
            'Lying down, or short walks',
            'Changing position',
            'Standing still, with no need to sit or bend',
          ],
        },
        {
          label: 'Where you feel it',
          cells: [
            'Buttocks, thighs and legs, often both sides',
            'Lower back, often with pain into one leg',
            'Buttock and down the back of one leg',
            'Calves most often, sometimes thighs or buttocks',
          ],
        },
        {
          label: 'Who to see first',
          cells: [
            'A chiropractor or physiotherapist, unless a red flag is present',
            'A chiropractor or physiotherapist, unless a red flag is present',
            'A chiropractor or physiotherapist, unless a red flag is present',
            'A doctor',
          ],
        },
      ],
      note: 'Real cases overlap. Stenosis can cause sciatica, and a slipped disc can be part of the narrowing. The table tells you where to start reading; the assessment, including checking the pulses in your feet, is what tells them apart.',
    },
    draft: false,
  },
  {
    slug: 'spondylolisthesis',
    title: 'Spondylolisthesis (Slipped Vertebra) Care in Cheras, Kuala Lumpur',
    metaTitle: 'Spondylolisthesis & Slipped Vertebra Care, KL',
    metaDescription:
      'Told a vertebra has slipped forward? Spondylolisthesis assessment, X-ray review and exercise-led care in Cheras, Maluri, with referral when a slip needs it.',
    // Built 2026-10-19 (schedule pc020). Ubersuggest MY: "spondylolisthesis" measures 0/mo and
    // "spondylolisthesis cervical" (6,600) / "lumbosacral spondylolisthesis" (2,400) look like
    // Google grouping buckets, so neither is targeted. "spondylolisthesis treatment" (50/mo, SD 36)
    // is the measured local commercial term; "spondylolysis" (590) and "grades" (140) are covered
    // by the table and FAQs. Clinical wording on adjustment is the SAFE version the user chose
    // 2026-10-19 pending Valerie's review; lastReviewed is deliberately unset.
    targetKeyword: 'spondylolisthesis treatment',
    related: ['spinal-stenosis', 'back-pain', 'slipped-disc'],
    helpedBy: ['physiotherapy', 'chiropractic-care'],

    intro:
      'Spondylolisthesis means one vertebra has shifted forward on the one below it, most often low in the back. It is a bone that has moved, not a disc, which is why the everyday name is a slipped vertebra rather than a slipped disc. The two common kinds look quite different. Degenerative spondylolisthesis comes from wear in the disc and joints and usually shows up after 50. Isthmic spondylolisthesis starts with a small stress crack in the back of the vertebra, called spondylolysis, often from sport in the teenage years. Many slips are small and stable, and plenty are found by chance on an X-ray taken for something else. Low grade slips are usually managed without surgery. The assessment works out whether the slip is actually the source of your pain and whether it is stable.',
    symptoms: [
      'A low back ache that is worse when standing or arching backward and easier when sitting or bending forward',
      'Hamstrings that feel unusually tight',
      'Pain, tingling or heaviness into the buttocks or legs when walking',
      'Back pain in a teenager that gets worse with sport, such as gymnastics, badminton, fast bowling or weightlifting',
      'A feeling that the lower back gives way or catches',
      'Stiffness after standing for a long time',
    ],
    causes: [
      {
        heading: 'Wear in the disc and joints (degenerative spondylolisthesis)',
        image: { src: '/img/spondy-cause-wear.webp', alt: 'Illustration of a man in his sixties standing in side profile with one hand on his lower back, where a golden glow sits' },
        body: 'As a disc loses height and the facet joints behind it wear, the segment can loosen enough for one vertebra to drift forward a little. This is the most common kind in adults, more common in women, and usually at the second lowest level of the lower back.',
      },
      {
        heading: 'A stress crack from repeated arching (isthmic spondylolisthesis)',
        image: { src: '/img/spondy-cause-stress.webp', alt: 'Illustration of a teenage badminton player arching back to smash a shuttle, with a golden glow at her lower back' },
        body: 'Sports that bend the lower back backward again and again load a thin bridge of bone at the back of the vertebra. Over time it can crack, which is spondylolysis, and if the crack separates the vertebra can slip forward. It usually affects the lowest level of the lower back.',
      },
      {
        heading: 'Growth spurts in teenagers',
        image: { src: '/img/spondy-cause-teen.webp', alt: 'Illustration of a tall teenage boy holding a basketball under one arm and pressing his other hand to his lower back, where a golden glow sits' },
        body: 'A slip linked to a stress crack is most likely to progress during a period of rapid growth, which is why back pain in an active teenager is taken seriously rather than put down to growing pains.',
      },
      {
        heading: 'Injury or the shape of the spine from birth',
        image: { src: '/img/spondy-cause-injury.webp', alt: 'Illustration of a man sitting on the bottom step of a staircase after a fall, one hand on his lower back, where a golden glow sits' },
        body: 'Less often, a slip follows a significant injury, or the vertebrae have been shaped in a way that allows it since birth. These are uncommon, and they are part of what imaging is used to rule in or out.',
      },
    ],
    approach: [
      {
        heading: 'Finding out whether the slip is the source, and whether it is stable',
        body: 'Your first visit follows the Gonstead six-step assessment: history, visualisation, instrumentation with the nervoscope, palpation, and X-ray analysis where indicated, with a neurological examination of the legs added on this presentation. Where further imaging is needed, or a scan you already have needs to be read alongside the examination, we arrange or review it. A high grade slip, signs that the segment is unstable, or nerve signs that are getting worse mean a referral to an orthopaedic or spine specialist.',
      },
      {
        heading: 'What an adjustment does and does not do with spondylolisthesis',
        body: 'The assessment decides whether any adjustment is appropriate. The slipped level itself is not forced back into place, and an adjustment does not reposition a vertebra that has moved forward. Where the assessment supports it, neighbouring levels that have become restricted may be adjusted by hand, and some presentations are not adjusted at all.',
      },
      {
        heading: 'Trunk strength and how you load the slipped level',
        body: 'Our physiotherapy side leads the longer part of the work: deep trunk and hip strength, hamstring flexibility, and changing habits that keep the lower back arched for long periods, such as standing with the hips pushed forward. For athletes, the return to sport is graded rather than all at once.',
      },
      {
        heading: 'A teenager with a suspected stress crack',
        body: 'If spondylolysis is suspected in a young athlete, imaging and a medical opinion come first, along with a break from the sport that provokes it. A brace is sometimes used early on to let a recent crack settle. We coordinate with the doctor and help with the return to sport afterwards, rather than adjusting through a fresh stress fracture.',
      },
    ],
    redFlags: [
      'Loss of bladder or bowel control, or numbness around the groin, buttocks and inner thighs',
      'Weakness in a leg that is getting worse, or a foot that drags when you walk',
      'Leg symptoms in both legs that are getting worse',
      'A teenager with back pain from sport that has lasted more than two to three weeks, or that wakes them at night',
      'A child or teenager whose walk or posture has changed, with very tight hamstrings',
      'Back pain after a significant fall, road accident or direct blow',
      'Fever, unexplained weight loss, or a history of cancer alongside new back pain',
    ],
    faqs: [
      {
        q: 'Can a chiropractor fix spondylolisthesis?',
        a: 'No, and we would rather be plain about that. An adjustment does not move a slipped vertebra back into place, and nobody should promise you that it does. What care aims at is the pain, the stiffness around the slipped level and the strength of the muscles that support it. Many people with a low grade slip manage well this way, and the assessment tells us whether you are likely to be one of them.',
      },
      {
        q: 'Is it safe to have a chiropractic adjustment with spondylolisthesis?',
        a: 'It depends on the grade of the slip and whether the segment is stable, which is why the assessment comes before anything else. The slipped level itself is not forced back into place. Neighbouring levels that have become restricted may be adjusted where the assessment supports it, some presentations are not adjusted at all, and high grade or unstable slips are referred to a specialist. Tell us about any leg weakness, numbness or bladder changes when you book.',
      },
      {
        q: 'What do the grades of spondylolisthesis mean?',
        a: 'The grade describes how far the vertebra has slipped forward, as a share of the width of the bone below. Grade 1 is under 25%, grade 2 is 25 to 50%, and grades 3 and 4 are over 50%. Low grade slips, grades 1 and 2, are by far the most common and are usually managed without surgery. High grade slips are more likely to press on nerves and to need a surgical opinion.',
      },
      {
        q: 'Will my spondylolisthesis get worse over time?',
        a: 'Most slips change little. In a long term study of degenerative spondylolisthesis, about a third of slips progressed, and whether a slip progressed had no clear link to how much it hurt. The body also tends to stiffen a loose segment with age, which can steady it. New or worsening leg symptoms are the thing to watch, more than the measurement on a report.',
      },
      {
        q: 'Is a slipped vertebra the same as a slipped disc?',
        a: 'No. In spondylolisthesis a whole vertebra has shifted forward. A slipped disc is the soft disc between two vertebrae bulging or herniating, while the bones stay where they are. They feel different too: a disc problem tends to hurt with sitting and bending forward, while a slipped vertebra tends to hurt with standing and arching back. Our page on a slipped disc covers the disc side in full.',
        links: [{ phrase: 'page on a slipped disc', href: '/conditions/slipped-disc' }],
      },
      {
        q: 'My teenager has back pain from sport. Could it be spondylolysis?',
        a: 'It could be. Spondylolysis is one of the more common causes of persistent low back pain in active teenagers, especially in sports that arch the back repeatedly. Pain that lasts more than a couple of weeks, gets worse with arching, or comes with tight hamstrings is worth having imaged by a doctor first. Once a stress fracture has been ruled out or has settled, we can help with strength and the return to sport.',
      },
      {
        q: 'What exercises are safe with spondylolisthesis?',
        a: 'Exercises that build the deep trunk and hip muscles without arching the lower back are the usual starting point, along with gentle hamstring stretches. Repeated back bends and heavy overhead lifting tend to load the slipped level, so leave those out until you have been assessed. Our post on lower back pain exercises has a strength stage that suits many people with a stable slip, but skip any exercise in it that arches your back.',
        links: [{ phrase: 'lower back pain exercises', href: '/blog/lower-back-pain-exercises' }],
      },
      {
        q: 'Can spondylolisthesis cause spinal stenosis?',
        a: 'Yes. When a vertebra shifts forward, it narrows the canal at that level, and the two often turn up together in people over 50. The leg pattern then matches spinal stenosis, with heavy or tingling legs on walking that ease with sitting or leaning forward.',
        links: [{ phrase: 'spinal stenosis', href: '/conditions/spinal-stenosis' }],
      },
    ],
    keyTakeaways: [
      {
        q: 'What is spondylolisthesis?',
        a: 'One vertebra shifted forward on the one below, most often in the lower back. It is a bone that has moved, not a disc that has bulged.',
      },
      {
        q: 'Does a slip on my X-ray explain my back pain?',
        a: 'Not always. Slips and stress cracks are found in many adults who have no back pain, so the examination decides whether the slip is the source of yours.',
      },
      {
        q: 'Which kind is most common?',
        a: 'In adults over 50, degenerative spondylolisthesis from wear in the disc and joints. In active teenagers, the isthmic kind that starts with a stress crack.',
      },
      {
        q: 'When is surgery considered?',
        a: 'Usually for a high grade slip, nerve symptoms that keep getting worse, or pain that has not settled with a good period of conservative care.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'I have been told a vertebra has slipped',
      'Standing or arching my back makes it worse',
      'My legs ache or tingle when I walk',
      'My teenager has back pain from sport',
      'I want to know whether I need surgery',
    ],
    citations: [
      {
        claim:
          'On CT of an unselected adult community sample, spondylolysis was found in 11.5% of people, and no significant association was found between spondylolysis or spondylolisthesis and low back pain.',
        source: 'Kalichman et al. (2009), Spine, Framingham Study',
        url: 'https://doi.org/10.1097/BRS.0b013e31818edcfd',
      },
      {
        claim:
          'In a study of degenerative spondylolisthesis, slippage progressed in 30% of patients, and progression did not correlate with symptoms.',
        source: 'Matsunaga et al. (1990), Spine',
        url: 'https://doi.org/10.1097/00007632-199011010-00021',
      },
      {
        claim:
          'Spondylolysis and spondylolisthesis are common causes of low back pain in children and adolescents, particularly in sports that stress the lower back, and most low grade cases improve with nonsurgical care. High grade slips, over 50%, are more likely to need surgery.',
        source: 'OrthoInfo, American Academy of Orthopaedic Surgeons',
        url: 'https://orthoinfo.aaos.org/en/diseases--conditions/spondylolysis-and-spondylolisthesis/',
      },
      {
        claim:
          'Spondylolisthesis is most common in the lower back, is often worse when standing or walking and eased by sitting or bending forward, and physiotherapy is among the usual first approaches.',
        source: 'NHS, Spondylolisthesis',
        url: 'https://www.nhs.uk/conditions/spondylolisthesis/',
      },
    ],
    comparison: {
      heading: 'Spondylolisthesis, spondylolysis, slipped disc or spinal stenosis?',
      intro:
        'These four get confused because the names sound alike and they can turn up together. This is a rough guide to how they differ, and the linked columns go to the page that covers each in full.',
      columns: [
        'Spondylolisthesis',
        'Spondylolysis',
        { label: 'Slipped disc', href: '/conditions/slipped-disc' },
        { label: 'Spinal stenosis', href: '/conditions/spinal-stenosis' },
      ],
      rows: [
        {
          label: 'What has happened',
          cells: [
            'A vertebra has shifted forward on the one below',
            'A stress crack in the back of a vertebra, with no shift yet',
            'Disc material bulging or herniating between two vertebrae',
            'The canal the nerves run through has narrowed',
          ],
        },
        {
          label: 'Who it usually affects',
          cells: [
            'Adults over 50, or teenagers and young adults who play sport',
            'Active teenagers, especially in sports that arch the back',
            'Most often adults between 30 and 50',
            'Mostly people over 50',
          ],
        },
        {
          label: 'What tends to aggravate it',
          cells: [
            'Standing for long and arching backward',
            'Arching backward and twisting in sport',
            'Sitting, bending forward, coughing or sneezing',
            'Standing and walking',
          ],
        },
        {
          label: 'Usual first step',
          cells: [
            'Assessment, with imaging reviewed or arranged where needed',
            'A doctor and imaging first in a young athlete',
            'Assessment, with imaging only if it would change the plan',
            'Assessment, including a check for a circulation problem',
          ],
        },
      ],
      note: 'They overlap. A slipped vertebra can narrow the canal, and a stress crack is often how an isthmic slip begins. Imaging read alongside the examination is what tells them apart.',
    },
    draft: false,
  },
  {
    slug: 'carpal-tunnel-syndrome',
    title: 'Carpal Tunnel Syndrome Care in Cheras, Kuala Lumpur',
    metaTitle: 'Carpal Tunnel Syndrome Care, Cheras KL',
    metaDescription:
      'Carpal tunnel syndrome assessed in Cheras, Maluri. Night numbness, tingling fingers or a weak grip checked at the wrist and the neck before any care begins.',
    // 18,100/mo in Ubersuggest MY (2026-10-19), SD 37. pinched-nerve owns the neck side of
    // arm and hand symptoms; this page owns the wrist side, and the two link to each other.
    targetKeyword: 'carpal tunnel syndrome',
    related: ['pinched-nerve', 'neck-pain'],
    helpedBy: ['physiotherapy', 'chiropractic-care'],

    intro:
      'Carpal tunnel syndrome is the median nerve being squeezed where it passes through a narrow channel at the front of the wrist. It usually shows up as tingling or numbness in the thumb, index and middle fingers and half of the ring finger, and it is often at its worst at night. Tingling hands are common, though, and not every case turns out to be carpal tunnel. The same fingers can go numb from a nerve pinched in the neck, so the assessment checks both before deciding where the problem sits. Mild and moderate cases are usually managed without surgery to begin with. Constant numbness or a thumb muscle that is wasting is a reason for a hand surgeon to have a look, not for more sessions with us.',
    symptoms: [
      'Tingling or numbness in the thumb, index and middle fingers, with the little finger left out',
      'Waking at night with a numb hand and needing to shake it out',
      'Symptoms set off by holding a phone, a steering wheel or a mouse with the wrist bent',
      'Dropping things, or fumbling with buttons and small objects',
      'An ache in the wrist that can spread up into the forearm',
      'A grip that tires sooner than it used to',
      'A flattened, softer area at the base of the thumb',
    ],
    causes: [
      {
        heading: 'Pressure inside a narrow wrist tunnel',
        image: { src: '/img/cts-cause-tunnel.webp', alt: 'Illustration of a hand seen from the palm side, with a nerve running from the forearm under a band across the wrist into the fingers and a golden glow where it passes under the band' },
        body: 'The carpal tunnel is a tight channel of small wrist bones roofed by a ligament, and the median nerve shares it with nine tendons. There is little spare room. Bending the wrist fully in either direction raises the pressure inside it, which is why a wrist curled under a pillow at night so often sets symptoms off.',
      },
      {
        heading: 'Repeated gripping and sustained wrist positions',
        image: { src: '/img/cts-cause-grip.webp', alt: 'Illustration of a woman at a desk using a computer mouse with her wrist bent upward, and a golden glow at her wrist' },
        body: 'Long hours with the wrist held bent on a mouse or phone, forceful gripping, and vibrating tools all load the tunnel. None of these on its own means you will develop carpal tunnel syndrome, and plenty of people do them for years without trouble. Where symptoms have started, though, they are usually part of what keeps them going, and they are the part you can change.',
      },
      {
        heading: 'Pregnancy, diabetes and other health factors',
        image: { src: '/img/cts-cause-pregnancy.webp', alt: 'Illustration of a pregnant woman sitting on the edge of her bed at night in pyjamas, shaking out her hand, with a golden glow on her fingers' },
        body: 'Fluid retention in pregnancy can crowd the tunnel, and symptoms often ease after the baby arrives. Diabetes, thyroid imbalance and rheumatoid arthritis are also associated with carpal tunnel syndrome. If one of these applies to you, it is worth your doctor knowing about the hand symptoms too.',
      },
      {
        heading: 'When the wrist is not the source at all',
        image: { src: '/img/cts-cause-neck.webp', alt: 'Illustration of a man in side profile with a golden glow running from the side of his neck down his arm into his hand' },
        body: 'A nerve root irritated in the neck, or a nerve squeezed at the elbow, can produce tingling in some of the same fingers. That is why the neck is examined as well as the wrist, and why a hand that tingles is not assumed to be carpal tunnel until the pattern says so.',
      },
    ],
    approach: [
      {
        heading: 'Working out whether it is the wrist, the neck or both',
        body: 'Your first visit follows the Gonstead six-step assessment: history, visualisation, instrumentation, palpation, and X-ray analysis where indicated. For hand symptoms we add neurological testing of sensation, strength and reflexes, provocation tests at the wrist, and a screen of the neck. Which fingers are involved, and which positions bring the symptoms on, tells us a good deal about where the nerve is being squeezed.',
      },
      {
        heading: 'Settling the night symptoms first',
        body: 'Night waking is often the most disruptive part. A splint that keeps the wrist straight while you sleep is a common first suggestion, and we will be plain that the evidence for splints is modest. Sleeping position, and how much the wrist is bent through the evening, get looked at alongside it.',
      },
      {
        heading: 'Physiotherapy for the wrist, hand and forearm',
        body: 'Our physiotherapy side may use nerve and tendon gliding exercises, hands on work for the forearm and wrist, and a graded programme for grip and hand endurance. Your desk, mouse and phone habits are reviewed as well, because the wrist goes straight back into the same positions as soon as you leave the clinic.',
      },
      {
        heading: 'The neck, and when to see a hand surgeon',
        body: 'If the examination finds a restricted segment in the neck contributing to the picture, an adjustment is used only where the assessment supports it. That is about the neck, and it is not a way of releasing the wrist. Where numbness has become constant, the thumb muscle is wasting, or symptoms are not changing, we will refer you to a doctor or hand surgeon, who may arrange nerve conduction studies. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
    ],
    redFlags: [
      'Wasting or flattening of the muscle at the base of the thumb',
      'Numbness that has become constant rather than coming and going',
      'Weakness in the hand that is getting worse, or dropping things more and more often',
      'Symptoms in both hands together with clumsiness or unsteady walking',
      'Sudden symptoms after a wrist injury or fall, or a hand that turns swollen, cold or pale',
      'Arm or hand symptoms with chest pain, breathlessness or sweating. Seek emergency care',
    ],
    faqs: [
      {
        q: 'Is carpal tunnel syndrome a pinched nerve?',
        a: 'In a sense, yes. It is the median nerve under pressure at the wrist. What most people mean by a pinched nerve is a nerve root irritated where it leaves the spine in the neck, which is covered on our page on a pinched nerve in the neck. The two can feel alike in the hand, which is exactly why we examine both places.',
        links: [{ phrase: 'pinched nerve in the neck', href: '/conditions/pinched-nerve' }],
      },
      {
        q: 'Can a problem in my neck cause carpal tunnel symptoms?',
        a: 'Possibly, and the honest answer is that nobody knows quite how often. A real share of people with carpal tunnel syndrome also have neck pain or nerve root findings in the neck. The idea that a nerve squeezed in two places becomes more sensitive at both, sometimes called double crush, is popular but unproven. Checking the neck as well as the wrist is still worthwhile, because it changes what the plan should focus on.',
      },
      {
        q: 'Do wrist splints help carpal tunnel syndrome?',
        a: 'Modestly, at best. A large review of the research could not say for certain whether splints help, and any improvement it found was small. There is some low certainty evidence that wearing one at night does better than doing nothing. Because a splint is cheap and unlikely to do harm, it is a reasonable thing to try while the rest of the plan gets going.',
      },
      {
        q: 'Will I need surgery for carpal tunnel?',
        a: 'Most mild and moderate cases try non surgical care first. That changes when numbness has become constant, when the muscle at the base of the thumb is wasting, or when testing shows significant nerve changes, because a nerve under pressure for too long may not fully recover. In those situations we will point you to a hand surgeon rather than keep going here.',
      },
      {
        q: 'My hands go numb at night during pregnancy. Is that carpal tunnel?',
        a: 'It often is. Fluid retention in pregnancy can crowd the wrist tunnel, and night tingling in the thumb and first fingers is a common pattern, particularly later in pregnancy. It frequently eases after delivery. Mention it to your obstetrician, and a neutral wrist splint at night is one of the gentler things to try in the meantime.',
      },
      {
        q: 'Do I need a nerve conduction test before coming in?',
        a: 'No. Most people do not need one to start with. A nerve conduction study is useful when the picture is unclear, when symptoms are severe or constant, or when surgery is being considered, and in those cases we will refer you to a doctor who can arrange it. Bring any results you already have.',
      },
    ],
    keyTakeaways: [
      {
        q: 'What is carpal tunnel syndrome?',
        a: 'The median nerve under pressure as it passes through a narrow channel at the front of the wrist, giving tingling, numbness or pain in the hand.',
      },
      {
        q: 'Which fingers does it affect?',
        a: 'Usually the thumb, index and middle fingers and half of the ring finger. The little finger is normally left out, which helps tell it apart from other nerve problems.',
      },
      {
        q: 'Is every tingling hand carpal tunnel?',
        a: 'No. In one population study, about one adult in seven reported tingling or numbness in these fingers, and far fewer had carpal tunnel syndrome confirmed on examination and testing.',
      },
      {
        q: 'When does it need a doctor quickly?',
        a: 'When numbness becomes constant, the muscle at the base of the thumb looks flatter, or the hand is getting weaker. Those signs point to a nerve under sustained pressure.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'My fingers tingle or go numb, especially at night',
      'I wake up and have to shake my hand out',
      'My grip feels weaker or I drop things',
      'I use a mouse, phone or tools for hours a day',
      'I want to know whether it is my wrist or my neck',
    ],
    citations: [
      {
        claim:
          'Hand symptoms in the median nerve area are common, while confirmed carpal tunnel syndrome is less so: 14.4% of adults surveyed reported them, and 2.7% had carpal tunnel syndrome confirmed on both examination and nerve conduction testing.',
        source: 'Atroshi I and others, JAMA, 1999',
        url: 'https://pubmed.ncbi.nlm.nih.gov/10411196/',
      },
      {
        claim:
          'The evidence on splinting for carpal tunnel syndrome is limited and any benefit may be small, with low certainty evidence favouring night splints over no intervention.',
        source: 'Splinting for carpal tunnel syndrome, Cochrane Database of Systematic Reviews, 2023',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36848651/',
      },
      {
        claim:
          'Long-standing carpal tunnel syndrome with constant numbness and wasting of the thumb muscles may need surgery to prevent irreversible damage. Pregnancy, diabetes, rheumatoid arthritis and thyroid imbalance are associated with the condition.',
        source: 'OrthoInfo, American Academy of Orthopaedic Surgeons',
        url: 'https://www.orthoinfo.org/en/diseases--conditions/carpal-tunnel-syndrome/',
      },
      {
        claim:
          'Many people with carpal tunnel syndrome also have neck pain or cervical nerve root findings, but the double crush hypothesis remains controversial, although examining more than one site may still be valuable.',
        source: 'Russell BS, Chiropractic & Osteopathy, 2008',
        url: 'https://pubmed.ncbi.nlm.nih.gov/18426564/',
      },
    ],
    comparison: {
      heading: 'Carpal tunnel, a pinched nerve in the neck, or an overworked elbow?',
      intro:
        'Tingling and aching in the hand and forearm can start at the wrist, the neck or the elbow, and each is looked after differently. This is a rough guide to which one you might be dealing with, and the linked column goes to the page that covers it in full.',
      columns: [
        { label: 'Carpal tunnel (wrist)' },
        { label: 'Pinched nerve in the neck', href: '/conditions/pinched-nerve' },
        { label: 'Elbow and forearm overuse' },
      ],
      rows: [
        {
          label: 'Where you feel it',
          cells: [
            'Thumb, index and middle fingers, on the palm side',
            'A strip running from the neck down the arm into particular fingers',
            'The outside of the elbow and the top of the forearm',
          ],
        },
        {
          label: 'What it feels like',
          cells: [
            'Mostly tingling and numbness',
            'Burning or shooting pain, often with tingling',
            'An ache and tenderness, with little numbness',
          ],
        },
        {
          label: 'What sets it off',
          cells: [
            'A bent wrist, gripping, and lying in bed at night',
            'Turning or tilting the head',
            'Gripping and lifting with the palm facing down',
          ],
        },
        {
          label: 'Neck pain alongside it',
          cells: ['Usually not', 'Often, though it can be mild', 'No'],
        },
        {
          label: 'At night',
          cells: [
            'Wakes you with a numb hand you need to shake out',
            'Arm pain that eases with the hand resting on your head',
            'Rarely a problem',
          ],
        },
      ],
      note: 'Some people have a wrist problem and a neck problem at the same time, which is why both get tested rather than one being assumed.',
    },
    draft: false,
  },
  {
    slug: 'frozen-shoulder',
    title: 'Frozen Shoulder (Adhesive Capsulitis) Care in Cheras, Kuala Lumpur',
    metaTitle: 'Frozen Shoulder Physiotherapy in Cheras, KL',
    metaDescription:
      'Frozen shoulder (adhesive capsulitis) assessed in Cheras, Maluri. Physiotherapy for pain and stiffness, with an honest picture of how it tends to progress.',
    // "frozen shoulder" measures 0 in Ubersuggest MY (sparse index); its merged form "frozen
    // shoulder and treatment" measures 1,000/mo, and "adhesive capsulitis" 720/mo sits in the h1.
    // The broadened shoulder pain page (pc053) should carry only a linked "Frozen shoulder"
    // comparison column, not its own frozen shoulder section, so the two never compete.
    targetKeyword: 'frozen shoulder treatment',
    related: ['shoulder-imbalance', 'neck-pain'],
    helpedBy: ['physiotherapy', 'sports-injury-rehabilitation'],

    intro:
      'Frozen shoulder, or adhesive capsulitis, is the capsule around the shoulder joint thickening and tightening until the arm stops moving freely. The telltale sign is that the arm stays stiff even when someone else tries to move it for you, and that is what sets it apart from most other shoulder pain. It is most common between about 40 and 60, more common in women, and far more common in people with diabetes. It generally improves over time without surgery, though that can take a long while and the pace varies a great deal from one person to the next. Care here aims at managing the pain and keeping as much movement as each stage allows, not at a fixed timetable.',
    symptoms: [
      'A deep ache in the shoulder that is often worse at night or when lying on that side',
      'Being unable to reach behind your back, to a back pocket or a bra strap',
      'Difficulty reaching overhead or out to the side',
      'The arm will not turn outward, even when someone else moves it for you',
      'Stiffness that has crept in over weeks, often with no injury to explain it',
      'A sharp catch of pain at the end of a reach',
      'Being in your 40s to 60s, or living with diabetes or a thyroid condition',
    ],
    causes: [
      {
        heading: 'A thickened, tight shoulder capsule',
        image: { src: '/img/fs-cause-capsule.webp', alt: 'Illustration of a shoulder joint seen from the front, with a thickened capsule wrapped tightly around the ball and socket and a golden glow around it' },
        body: 'The shoulder joint sits inside a capsule of connective tissue that normally has plenty of slack. In frozen shoulder that capsule becomes inflamed, then thickens and tightens, so the joint has less room to move in every direction. It is the capsule that limits you, rather than weak muscle or a torn tendon.',
      },
      {
        heading: 'Diabetes and thyroid conditions',
        image: { src: '/img/fs-cause-diabetes.webp', alt: 'Illustration of a woman sitting at a table checking her blood sugar with a small glucose meter, with a golden glow on her shoulder' },
        body: 'People with diabetes are around five times more likely to develop frozen shoulder, and it tends to be stiffer and slower to ease in them. Thyroid conditions are also linked. If you have diabetes, talk to your doctor about how well controlled it is, because that is part of the picture as well.',
      },
      {
        heading: 'A period of holding the arm still',
        image: { src: '/img/fs-cause-still.webp', alt: 'Illustration of a woman standing with her arm resting in a sling, and a golden glow on that shoulder' },
        body: 'Frozen shoulder sometimes follows an injury, surgery or an illness that kept the arm still for a while. Keeping the shoulder gently moving within comfort during recovery from something else is one of the few things that may lower the chance of it developing.',
      },
      {
        heading: 'Often no clear reason at all',
        image: { src: '/img/fs-cause-unclear.webp', alt: 'Illustration of a woman reaching up to a high kitchen shelf, with a golden glow on her shoulder' },
        body: 'In many people it simply starts, with no injury and no obvious trigger. That can be frustrating to hear. It does not mean anything was done wrong, and it does not change how the shoulder is looked after.',
      },
    ],
    approach: [
      {
        heading: 'Confirming it is frozen shoulder, not the rotator cuff or your neck',
        body: 'Your first visit starts with a history and an examination of how the shoulder moves on its own and when it is moved for you, which is the key test. The neck is screened too, because pain referred from the neck can sit in the shoulder. X-ray analysis is used only where it would change the plan, mainly to rule out arthritis in the joint.',
      },
      {
        heading: 'Calming the painful stage',
        body: 'When the shoulder is at its most painful, forcing it tends to make things worse. Care at this stage is gentle range of movement within comfort, advice on sleeping positions and supporting the arm at night, and keeping the rest of the arm, neck and upper back moving.',
      },
      {
        heading: 'Restoring movement as the shoulder stiffens and eases',
        body: 'As the pain settles, our physiotherapy side moves towards joint mobilisation, stretching and strengthening matched to what the shoulder will tolerate, plus a short home programme you do most days. Progress is often slow and uneven, and we will tell you honestly how your shoulder is responding rather than promise a date.',
      },
      {
        heading: 'When a doctor should be involved',
        body: 'If night pain is severe or movement is not changing, a doctor may offer a steroid injection or hydrodilatation, where the joint capsule is stretched with fluid. The research suggests an injection may ease pain more than physiotherapy alone in the early months, and we will refer you to a doctor for it rather than hold on to you. If your practitioner feels another healthcare provider would better help you, you will be referred appropriately.',
      },
    ],
    redFlags: [
      'Shoulder pain with chest tightness, breathlessness, sweating, or pain into the jaw or left arm. Seek emergency care',
      'Shoulder pain after a fall or injury, especially if you cannot lift the arm at all',
      'A hot, red or swollen shoulder, or shoulder pain with a fever',
      'Unexplained weight loss, a history of cancer, or constant pain at night that nothing eases',
      'Numbness, tingling or weakness spreading down the arm into the hand',
      'Sudden loss of the ability to raise the arm',
    ],
    faqs: [
      {
        q: 'Will my frozen shoulder go away on its own?',
        a: 'Usually it improves, but slowly. Most frozen shoulders get better over time without surgery, though full recovery can take up to around three years, and some people keep a degree of stiffness afterwards. Care cannot promise to shorten that, and anyone who quotes you a fixed number of weeks is guessing. What it aims at is less pain and more usable movement along the way.',
      },
      {
        q: 'Can physiotherapy help a frozen shoulder?',
        a: 'It may help with pain and movement, and it is the approach most guidance starts with, but the honest picture is that the research is limited. A large review found that physiotherapy on its own may not ease pain as much as a steroid injection in the short term. That is why we combine an exercise programme with a referral to a doctor when pain is severe, so you get the benefit of both.',
      },
      {
        q: 'Should I push through the pain when stretching a frozen shoulder?',
        a: 'No, particularly in the early painful stage. Stretching hard into pain tends to flare the shoulder and set you back. Gentle movement within comfort suits the painful stage, and firmer stretching comes later once the shoulder will tolerate it. Your physiotherapist will tell you which stage you are in and adjust the programme as it changes.',
      },
      {
        q: 'Does diabetes cause frozen shoulder?',
        a: 'It does not cause it directly, but the link is strong. People with diabetes are around five times more likely to develop frozen shoulder, and roughly one in seven people with diabetes has it at some point. It can also be stiffer and slower to ease. If you have diabetes, keep your doctor in the loop about the shoulder and about your blood sugar control.',
      },
      {
        q: 'Is it frozen shoulder or a rotator cuff problem?',
        a: 'The quickest clue is whether someone else can move your arm further than you can. With a rotator cuff problem the joint itself is free, so the arm usually goes further when moved for you. With frozen shoulder the capsule is tight, so it is stiff whoever moves it, especially when turning the arm outward. The examination confirms which one it is.',
      },
      {
        q: 'Who looks after frozen shoulder at your clinic?',
        a: 'Mostly our registered physiotherapists, since exercise and mobilisation make up most of the care, with a chiropractor screening the neck where the pain pattern suggests it is involved. Our physiotherapist profiles are not published yet, so if you would like to know more before booking, ask us on WhatsApp. You can read how we work on our physiotherapy page.',
        links: [{ phrase: 'physiotherapy page', href: '/services/physiotherapy' }],
      },
    ],
    keyTakeaways: [
      {
        q: 'What is frozen shoulder?',
        a: 'A thickening and tightening of the capsule around the shoulder joint, also called adhesive capsulitis, that causes pain and a steady loss of movement.',
      },
      {
        q: 'Who tends to get it?',
        a: 'Mostly people between about 40 and 60, women more than men, and people with diabetes or a thyroid condition far more than others.',
      },
      {
        q: 'What are the stages of frozen shoulder?',
        a: 'Usually described as freezing, when pain builds and movement drops, frozen, when pain eases but stiffness stays, and thawing, when movement slowly returns. How long each lasts varies widely.',
      },
      {
        q: 'What is the telltale sign?',
        a: 'Movement is lost even when someone else moves the arm for you, especially turning it outward. Most other shoulder problems still allow that passive movement.',
      },
      {
        q: 'When are you open?',
        a: 'Seven days a week, at Sunway Velocity in Maluri. Monday to Thursday and Saturday until 8pm, Friday until 5pm, Sunday until 3pm.',
      },
    ],
    qualifierConcerns: [
      'My shoulder has slowly stiffened over weeks or months',
      'I cannot reach behind my back or overhead',
      'The ache is worse at night or when I lie on that side',
      'I have diabetes or a thyroid condition',
      'I want to know whether it is frozen shoulder or something else',
    ],
    citations: [
      {
        claim:
          'Frozen shoulder generally gets better over time without surgery, although full recovery may take up to three years, and physical therapy focused on shoulder flexibility is the main recommended approach. It occurs much more often in people with diabetes.',
        source: 'OrthoInfo, American Academy of Orthopaedic Surgeons',
        url: 'https://www.orthoinfo.org/en/diseases--conditions/frozen-shoulder/',
      },
      {
        claim:
          'People with diabetes were about five times more likely than controls to have adhesive capsulitis, with an estimated prevalence of 13.4% among people with diabetes.',
        source: 'Zreik NH, Malik RA & Charalambous CP, Muscles, Ligaments and Tendons Journal, 2016',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27331029/',
      },
      {
        claim:
          'Manual therapy and exercise combined may not be as effective as a glucocorticoid injection in the short term, and higher quality trials are needed.',
        source: 'Page MJ and others, Cochrane Database of Systematic Reviews, 2014',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25157702/',
      },
    ],
    comparison: {
      heading: 'Frozen shoulder, a rotator cuff problem, or pain from your neck?',
      intro:
        'A painful, stiff shoulder can come from the joint capsule, the rotator cuff tendons, the neck or simply a long day at a desk, and each is looked after a little differently. This is a rough guide, and the linked columns go to the page that covers that pattern in full.',
      columns: [
        { label: 'Frozen shoulder' },
        { label: 'Rotator cuff problem' },
        { label: 'Pain from the neck', href: '/conditions/pinched-nerve' },
        { label: 'Desk shoulder ache', href: '/conditions/shoulder-imbalance' },
      ],
      rows: [
        {
          label: 'Can someone else move your arm?',
          cells: [
            'No, it is stiff whoever moves it',
            'Yes, usually further than you can yourself',
            'Yes, the shoulder moves freely',
            'Yes, though it may feel tight',
          ],
        },
        {
          label: 'Where it hurts',
          cells: [
            'Deep in the shoulder and the upper arm',
            'The outside of the upper arm, worst partway through raising it',
            'From the neck into the shoulder and down the arm',
            'Across the top of the shoulder and into the neck',
          ],
        },
        {
          label: 'At night',
          cells: [
            'Often worse, especially lying on that side',
            'Lying on that side hurts',
            'Arm symptoms can break your sleep',
            'Usually settles overnight',
          ],
        },
        {
          label: 'Tingling into the hand',
          cells: ['No', 'No', 'Often', 'Sometimes'],
        },
        {
          label: 'How it tends to behave',
          cells: [
            'Slow, over months and sometimes years',
            'Varies with how the shoulder is loaded',
            'Varies with what is irritating the nerve',
            'Builds through the working day, eases at weekends',
          ],
        },
      ],
      note: 'These overlap, and more than one can be present at once. The examination, especially how the arm moves when someone else moves it, is what tells them apart.',
    },
    draft: false,
  },
]

export const publishedConditions = () => conditions.filter((c) => !c.draft)
export const conditionBySlug = (slug: string) => conditions.find((c) => c.slug === slug)

/**
 * Locale dispatch. English keeps the bare exports above untouched — nothing that already
 * imports `conditions`/`publishedConditions`/`conditionBySlug` needs to change. `zh`/`ms`
 * are separate full arrays of the same shape (see `lib/conditions.zh.ts`), not extra
 * fields bolted onto this file's records, so a locale can be authored and reviewed
 * independently and `draft` means "live in *this* locale" without any type change.
 */
const conditionsByLocale: Record<Locale, Condition[]> = {
  en: conditions,
  zh: conditionsZh,
  ms: conditionsMs,
}

export const conditionsFor = (locale: Locale) => conditionsByLocale[locale]
export const publishedConditionsFor = (locale: Locale) =>
  conditionsFor(locale).filter((c) => !c.draft)
export const conditionBySlugFor = (locale: Locale, slug: string) =>
  conditionsFor(locale).find((c) => c.slug === slug)
