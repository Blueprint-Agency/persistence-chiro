/**
 * Service pages — modality-first, commercial intent ("dry needling near me").
 *
 * Replaces the old `physiotherapy.ts`. The proposal (`seo-proposal.html`, Cycle 1 Pages
 * tab) specifies five service pages under a single `/services/*` namespace rather than the
 * previous split between a standalone `/chiropractic` page and four `/physiotherapy/*`
 * modality pages. Seven live Wix services had already been folded to four; those four now
 * fold to five alongside chiropractic:
 *
 *   /chiropractic                      -> /services/chiropractic-care
 *   /physiotherapy                     -> /services/physiotherapy
 *   /physiotherapy/dry-needling        -> /services/dry-needling
 *   /physiotherapy/sports-rehab        -> /services/sports-injury-rehabilitation
 *   /physiotherapy/manual-therapy      -> folded into /services/physiotherapy
 *   /physiotherapy/rehab-programming   -> folded into /services/sports-injury-rehabilitation
 *   /conditions/sports-injury          -> folded into /services/sports-injury-rehabilitation
 *   (new)                              -> /services/posture-correction
 *
 * manual-therapy and rehab-programming have no slot in the proposal's five, and neither
 * had enough distinct search intent to justify keeping a thin page alive. Their section
 * copy folds in verbatim so nothing is lost — same approach as the original Wix fold-down.
 *
 * Sports injury moves from a *condition* to a *service*. The proposal lists it under
 * services and its eight conditions do not include it; keeping both would have put two
 * pages on one intent, which is the cannibalisation the architecture exists to prevent.
 *
 * CLAIM RULE: no page here may promise a cure, fix or guaranteed outcome. Enforced by
 * `content.test.ts`. See the hedging house style in `conditions.ts`.
 */

/**
 * A "reason people come in" card. Three shapes, in order of preference:
 *
 *   'plain string'                          text only
 *   { text, illustration: 'muscle-knot' }   a drawn diagram (see ConcernIllustration)
 *   { text, image: { src, alt } }           a photograph
 *
 * Prefer `illustration` when the card describes a SYMPTOM. No honest photograph shows a
 * symptom — it shows a room with people in it — so a photo there is always approximate,
 * whereas a diagram can say exactly what the sentence says.
 *
 * Reach for `image` when the card describes a place, a person or a procedure, where a real
 * photograph of this clinic is the truthful thing. Its alt text must then describe what is
 * actually in the frame, not the concern it sits under.
 */
export type Outcome =
  | string
  | { text: string; illustration: ConcernIllustrationName; image?: never }
  | { text: string; image: { src: string; alt: string }; illustration?: never }

import type { ConcernIllustrationName } from '@/components/ConcernIllustration'

/** Icons available to the qualifier checklist. Keep the set small and legible at 20px. */
export type ConcernIcon = 'knot' | 'recurring' | 'neck' | 'injury' | 'needle' | 'question'

/** A qualifier option. A bare string still works; an object adds an icon. */
export type Concern = string | { label: string; icon: ConcernIcon }

export type Service = {
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
  /** Lead paragraph under the h1. */
  intro: string
  /**
   * Hero and mid-page imagery. The four templated pages shipped with no images at all,
   * which read as a brochure; a photo carries the conversion layout. No service-specific
   * photos exist yet, so these reuse honest generic clinic/assessment shots — the alt text
   * must describe what is actually in the frame, never the service being sold.
   */
  heroImage?: { src: string; alt: string }
  /**
   * Pre-cropped 1200x630 JPEG social card under public/og/, derived from `heroImage`.
   * The hero itself must NOT be used directly: the source shots are 1.4:1 (and dry
   * needling is portrait), so Facebook and WhatsApp crop them unpredictably, and they
   * are WebP, which WhatsApp's preview fetcher still handles unreliably.
   * Omit and the page falls back to the sitewide shopfront card in lib/seo.ts.
   * Alt text is reused from `heroImage` — same rule, describe the frame, not the service.
   */
  ogImage?: string
  /**
   * Optional second photograph, rendered in the sticky "How it works" column. That column is
   * otherwise a heading, a sentence and a button next to a long numbered list — an image
   * gives it something to hold while the steps scroll past it.
   *
   * Same alt rule as the hero: describe what is in the frame, never the service being sold.
   */
  midImage?: { src: string; alt: string }
  /**
   * Short factual reassurances rendered beside the hero CTA — the things a visitor wants
   * settled before they will message anyone.
   *
   * FACTS ONLY, and only facts this page already substantiates further down. Never a
   * response-time promise the clinic has not agreed to, never an outcome. Three is the
   * ceiling; past that it stops being reassurance and becomes a feature list.
   *
   * Omit and the hero falls back to the generic hours-and-location line.
   */
  assurances?: string[]
  /**
   * Benefit-framed reasons people come in for this service. Describes the concern, never
   * promises an outcome (no-medical-promises rule) — "tension that builds up at a desk",
   * not "we fix your tension". Rendered as a scannable "what we help with" block.
   */
  outcomes?: readonly Outcome[]
  /**
   * Concern checkboxes for the "Is this right for you?" qualifier — the reader ticks what
   * applies and the component builds a prefilled WhatsApp message. Phrase each as a symptom
   * or situation, not a diagnosis.
   */
  qualifierConcerns?: readonly Concern[]
  /**
   * ISO date the clinical content was last reviewed by the practitioner. Drives the
   * "Medically reviewed by" byline AND the reviewedBy/lastReviewed schema — the two E-E-A-T
   * signals a YMYL medical page needs. Only set once the copy has actually been checked;
   * unset means no byline and no review date is claimed.
   */
  lastReviewed?: string
  /**
   * Long-form, keyword-targeted H2 sections rendered below the conversion layout. This is
   * where the depth lives — each heading should read like a real search query (e.g. "Is dry
   * needling safe?") and the body stays hedged, no promissory claims.
   */
  longForm?: { heading: string; body: string }[]
  /**
   * Citations: verifiable, cautiously worded facts attributed to a journal, clinical
   * guideline or regulator. Never a competitor, never an efficacy promise. 2–4 is plenty.
   */
  citations?: { claim: string; source: string; url?: string }[]
  /** Service blocks. First one is the page's primary service. */
  sections: { heading: string; body: string }[]
  /** Condition slugs this service is used for — the cross-link back into /conditions. */
  helpsWith: string[]
  /**
   * In-context internal links rendered as a button row under the sections — descriptive
   * anchor text into other services/pages. Optional; the chiropractic dedicated route
   * hard-codes its own equivalent. Keeps service pages internally linked without putting
   * markup inside the plain-text section bodies.
   */
  relatedLinks?: { href: string; label: string }[]
  faqs: { q: string; a: string }[]
  /**
   * True when the service has a hand-built route file instead of rendering through
   * app/services/[slug]/page.tsx. Only chiropractic-care does: it carries the
   * Gonstead six-step walkthrough, which is a bespoke layout rather than section blocks.
   * Excluded from generateStaticParams so the two routes can't collide at build time.
   */
  dedicatedRoute?: boolean
  draft: boolean
}

export const servicesIntro =
  'Chiropractic care, physiotherapy and targeted rehabilitation under one roof in Cheras. Which one suits you depends on what the assessment finds. A fair number of patients end up having both, and we will tell you where to start on your first visit.'

export const services: Service[] = [
  {
    slug: 'chiropractic-care',
    title: 'Chiropractic Care in Cheras, Kuala Lumpur',
    metaTitle: 'Chiropractic Care in Cheras, KL',
    metaDescription:
      'Gonstead chiropractic in Cheras, Maluri. Segment-by-segment spinal assessment and a precise hands-on adjustment for bone and body alignment, not a general crack.',
    targetKeyword: 'bone alignment near me',
    intro:
      'Gonstead chiropractic care in Cheras. We assess the spine segment by segment before anything is adjusted, so the work goes to whichever segment is actually driving your problem. That is not always where you feel it.',
    outcomes: [
      'Back, neck or joint pain you want assessed segment by segment',
      'A recurring problem you would like to understand, not just mask',
      'A precise adjustment rather than a general crack',
      'Wanting to know whether the Gonstead approach suits your case',
    ],
    qualifierConcerns: [
      'I have back, neck or joint pain',
      'My problem keeps returning',
      'I want to understand what is actually driving it',
      'I am curious whether chiropractic suits my case',
      'I am pregnant or bringing a child and want a gentle assessment',
    ],
    lastReviewed: '2026-07-26',
    longForm: [
      {
        heading: 'Is chiropractic care safe?',
        body: 'Chiropractic adjustment is widely used for mechanical spine and joint problems, and serious complications are considered rare when care follows a proper assessment. As with any hands-on care there can be short lived after effects, most often mild soreness or stiffness for a day or so. The assessment exists partly to screen for the small number of situations where adjustment would not be appropriate, which is why we work through it before deciding what, if anything, to adjust. We will always tell you honestly if we think chiropractic is not the right approach for your case.',
      },
    ],
    citations: [
      {
        claim:
          'Routine imaging is not recommended for non specific spinal pain and is advised only when there are specific clinical indications.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
      },
      {
        claim:
          'Chiropractic is a regulated healthcare practice; in Malaysia practitioners register under the Ministry of Health framework.',
        source: 'Association of Chiropractic Malaysia; Ministry of Health Malaysia',
      },
    ],
    sections: [
      {
        heading: 'Gonstead spinal assessment',
        body: 'A full six-step analysis: history, visualisation, instrumentation, palpation, X-ray analysis where indicated, and only then adjustment. Working through it in that order narrows the search down before any force is applied.',
      },
      {
        heading: 'Hands-on spinal adjustment',
        body: 'Adjustments are delivered precisely and skilfully by hand only, targeted at the specific segment identified during assessment. What one patient gets is rarely what the next one gets, because the assessments come out differently.',
      },
      {
        heading: 'Bone and body alignment',
        body: 'Where segments have become restricted, adjustment aims to improve how well they move. How much changes, and over what period, depends on what is causing the restriction and how long it has been there.',
      },
    ],
    helpsWith: ['back-pain', 'slipped-disc', 'sciatica', 'neck-pain', 'scoliosis'],
    faqs: [
      {
        q: 'What is the Gonstead method?',
        a: 'Gonstead is a chiropractic technique built around a detailed six-step assessment before any adjustment is made. That includes instrumentation and, where indicated, X-ray analysis. The aim is to identify precisely which segment is involved rather than working on the region generally.',
      },
      {
        q: 'Do I need an X-ray before chiropractic care?',
        a: 'An X-ray gives us a clearer picture of what is happening in your spine: how each segment sits, and whether there is any pathology present. That is what lets the Gonstead assessment name the specific segment involved instead of working in general terms. It is not mandatory, though, and we often go without one for pregnant women and children. Your chiropractor will explain whether imaging is appropriate in your case and why.',
      },
      {
        q: 'Is chiropractic the same as bone setting or tit tar?',
        a: 'No. Chiropractic is a regulated healthcare profession with formal university training, and assessment comes before anything is adjusted. Traditional bone setting works differently and is not regulated in the same way. We would encourage you to ask any practitioner about their qualifications beforehand.',
      },
    ],
    dedicatedRoute: true,
    draft: false,
  },
  {
    slug: 'dry-needling',
    title: 'Integrative Dry Needling in Cheras, Kuala Lumpur',
    metaTitle: 'Dry Needling in Cheras, KL',
    metaDescription:
      'Integrative dry needling in Cheras, Maluri for deep muscle tension, trigger points and muscle knots. Assessment first, single-use needles, honest expectations.',
    targetKeyword: 'dry needling near me',
    intro:
      'Dry needling in Cheras. A neuromuscular technique that uses fine needles to reach trigger points and bands of muscular tension which are difficult to release by hand alone.',
    /**
     * The clinic's own dry needling photograph, not a stand-in. Someone searching
     * "dry needling near me" already knows what a needle is — hiding the technique behind a
     * generic consultation shot reads as evasive, and the gloves and single-use needles
     * visible here are the exact trust signal the page's safety copy is making in words.
     */
    heroImage: {
      src: '/img/dry-needling.webp',
      alt: 'Gloved practitioner performing dry needling on a patient upper back and shoulder at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    ogImage: '/og/dry-needling.jpg',
    midImage: {
      src: '/img/posture-assessment.webp',
      alt: 'Practitioner examining a seated patient upper back during assessment at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    /**
     * The three things someone hesitating over needles actually wants to know. Each is
     * already stated and justified in the sections below — this only moves them into the
     * first viewport, where the hesitation happens.
     */
    assurances: [
      'Sterile, single use needles — never reused',
      'We assess before we needle',
      'Open seven days · Cheras, Maluri',
    ],
    /**
     * Supplied pain-visualisation images: a person with the affected muscle group overlaid
     * and the painful area lit. They do the same job the SVG diagrams did — showing a
     * symptom rather than a service — with more immediacy.
     *
     * ⚠️ ALT TEXT CARRIES NO LOCAL MODIFIER, unlike every other image on the site. These are
     * illustrative composites, not photographs of this clinic, these practitioners or these
     * patients. Writing "at Persistence Chiropractic Care in Cheras" under one would be a
     * false claim about a real place — the same rule that keeps the fabricated reviews out
     * of production. Describe the illustration, and nothing more.
     */
    outcomes: [
      {
        text: 'Tight, knotted muscles that do not release with stretching or massage',
        image: {
          src: '/img/dn-tight-knot.webp',
          alt: 'Illustration of knotted muscle highlighted across a person neck and upper back',
        },
      },
      {
        text: 'Deep muscular tension linked to neck, shoulder or lower back trouble',
        image: {
          src: '/img/dn-deep-tension.webp',
          alt: 'Illustration of deep muscular tension highlighted in a person lower back',
        },
      },
      {
        text: 'Trigger points that keep referring pain to the same spot',
        image: {
          src: '/img/dn-trigger-points.webp',
          alt: 'Illustration of trigger points in a person shoulder referring pain down the arm',
        },
      },
      {
        text: 'Muscles that stay guarded and overactive after an old injury',
        image: {
          src: '/img/dn-old-injury.webp',
          alt: 'Illustration of the muscles around a knee highlighted after an old injury',
        },
      },
    ],
    qualifierConcerns: [
      { label: 'I have a muscle knot that will not release', icon: 'knot' },
      { label: 'Massage helps for a day, then the tightness comes back', icon: 'recurring' },
      { label: 'My neck or shoulders feel constantly tense', icon: 'neck' },
      { label: 'An old injury left a muscle feeling tight and overactive', icon: 'injury' },
      { label: 'I have had dry needling before and it helped', icon: 'needle' },
      { label: 'I am nervous about needles and want to ask first', icon: 'question' },
    ],
    lastReviewed: '2026-07-26',
    longForm: [
      {
        heading: 'What is dry needling, and how is it different from acupuncture?',
        body: 'Dry needling is a Western, anatomy based technique. A fine filament needle is placed directly into a myofascial trigger point, which is a small, hyperirritable knot within a taut band of muscle, with the aim of releasing that tension. Nothing is injected, which is where the word "dry" comes from. Acupuncture can use similar needles, but it comes from traditional Chinese medicine and selects points along meridians rather than by muscle anatomy. Even when the needles look alike, the two are aiming at different things. At our clinic in Cheras we use dry needling as one tool within an assessment led plan, not a standalone therapy.',
      },
      {
        heading: 'Is dry needling safe, and what should I expect afterwards?',
        body: 'Dry needling is generally considered safe when it is carried out by a trained practitioner using sterile, single use needles. The most common after effects are mild and short lived: temporary soreness at the site, and occasionally a small bruise, usually settling within a day or two. More significant reactions are uncommon. We check your history first, because there are situations, such as pregnancy, medications that affect bleeding, or a strong fear of needles, where we would choose a different approach. You can eat, drink and move normally afterwards, and we usually pair the session with specific exercises so the muscle has a reason to stay released.',
      },
      {
        heading: 'What does dry needling help with?',
        body: 'People most often come to us for dry needling when a muscle stays tight despite stretching and massage, when trigger points keep referring pain to the same spot, or when an old injury has left a muscle guarded and overactive. It is commonly used around the neck, shoulders and lower back, and alongside care for problems such as sciatica and shoulder imbalance. It is worth being realistic. Needling can help calm an irritable muscle, but on its own it does not change the habit, weakness or joint restriction that let the muscle tighten in the first place. That is why the assessment matters, and why we combine it with chiropractic care and physiotherapy where the findings point that way.',
      },
    ],
    citations: [
      {
        claim:
          'Myofascial trigger points are described as hyperirritable spots within a taut band of skeletal muscle.',
        source: 'Travell & Simons, Myofascial Pain and Dysfunction: The Trigger Point Manual',
      },
      {
        claim:
          'Surveys of trigger point dry needling report that adverse events are usually minor and transient, such as soreness or minor bruising.',
        source: 'Brady et al. (2014), Journal of Manual & Manipulative Therapy',
      },
      {
        claim:
          'In Malaysia, chiropractic and physiotherapy are regulated healthcare practices, and practitioners are expected to hold recognised qualifications.',
        source: 'Ministry of Health Malaysia',
      },
    ],
    sections: [
      {
        heading: 'Integrative dry needling',
        body: 'Dry needling is a neuromuscular technique that uses fine, single use needles to reach trigger points and tight bands of muscle that are difficult to release by hand alone. We use it as part of a wider plan rather than on its own, and only where the assessment points to muscle as the thing driving your problem.',
      },
      {
        heading: 'What dry needling actually does',
        body: 'A trigger point is a small, irritable knot within a tight band of muscle that can refer pain to other areas. A fine needle placed into that point often produces a brief involuntary twitch, which is the muscle letting go. The aim is to ease the tension, settle the local irritation and give the muscle room to move more normally again. How much it helps, and for how long, varies from person to person and depends on what is keeping the muscle tight in the first place.',
      },
      {
        heading: 'What a session involves',
        body: 'We assess the area first to work out which muscles are involved, then place fine needles into the points identified. Most patients describe a brief twitch or a dull ache rather than sharp pain. A session usually takes fifteen to thirty minutes depending on how much ground we are covering, and the needling is only part of it. What we find often shapes the exercise or hands on work we pair it with.',
      },
      {
        heading: 'Is it safe, and what to expect afterwards',
        body: 'Dry needling is generally very safe when it is carried out by a trained practitioner. We use sterile, single use needles that are disposed of after one session and never reused. Mild soreness, and occasionally a small bruise, for a day or so afterwards is common and settles on its own. Tell your practitioner if you are pregnant, take blood thinners or have a strong fear of needles, because there are situations where we would choose not to needle and use another approach instead.',
      },
      {
        heading: 'How it works with the rest of your care',
        body: 'Needling releases tension, but on its own it does not change the habit or weakness that let the muscle tighten, which is why we rarely use it alone. Under one roof in Cheras we combine it with chiropractic care and physiotherapy, and the assessment decides where to start. For some people needling comes first to calm things down, and for others the strength work matters more.',
      },
      {
        heading: 'How many sessions you might need',
        body: 'This depends on how long the problem has been there and what is driving it, so we will not give you a fixed number at the first visit. Some people notice a change quickly, while others need the muscle work supported over several weeks alongside exercise. We would rather review honestly as we go than sell you a package up front.',
      },
    ],
    helpsWith: ['back-pain', 'neck-pain', 'shoulder-imbalance', 'sciatica'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: 'How dry needling fits with physiotherapy' },
      { href: '/services/chiropractic-care', label: 'Compare with chiropractic care' },
      { href: '/what-to-expect', label: 'What to expect on your first visit' },
    ],
    faqs: [
      {
        q: 'Is dry needling the same as acupuncture?',
        a: 'They use similar needles but come from different traditions. Dry needling is based on Western anatomy and targets specific trigger points in muscle, whereas acupuncture follows traditional Chinese meridian theory and works on points chosen on a different basis. The needles look alike, but what we are aiming at is not the same.',
      },
      {
        q: 'Does dry needling hurt?',
        a: 'Most patients report a brief twitch response or a dull ache rather than sharp pain. Mild soreness afterwards is common and usually settles within a day. Tell your practitioner if anything feels worse than uncomfortable, because the technique can be adjusted or stopped.',
      },
      {
        q: 'How many sessions of dry needling will I need?',
        a: 'It depends on how long the muscle has been tight and what is keeping it that way, so we will not commit to a number on your first visit. Some people notice a change quickly, while others need the work supported over several weeks alongside exercise. We review as we go rather than sell a fixed package.',
      },
      {
        q: 'Are the needles safe, and are they reused?',
        a: 'Needles are never reused. We use sterile, single use needles that are disposed of after one session. Dry needling is generally very safe in trained hands, though mild soreness or a small bruise afterwards is possible and normal.',
      },
      {
        q: 'Should I have dry needling or a chiropractic adjustment?',
        a: 'It depends on what the assessment finds, and the two are often used together rather than as alternatives. Broadly, needling addresses tight, irritable muscle while an adjustment addresses how a spinal joint moves. If you are unsure, message us your main concern and we will point you to the right starting point.',
      },
    ],
    draft: false,
  },
  {
    slug: 'physiotherapy',
    title: 'Physiotherapy in Cheras, Kuala Lumpur',
    metaTitle: 'Physio & Physiotherapy in Cheras, KL',
    metaDescription:
      'Physio and physiotherapy in Cheras, Maluri. Hands-on manual therapy, movement assessment and corrective exercise, alongside chiropractic care under one roof.',
    targetKeyword: 'physio cheras',
    intro:
      'Physiotherapy in Cheras, pairing hands-on care with corrective exercise. Once a joint is moving more freely, the exercise work aims to rebuild the strength and control that help keep it that way.',
    heroImage: {
      src: '/img/cupping-therapy.webp',
      alt: 'Cupping therapy applied across a patient upper back at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    ogImage: '/og/cupping-therapy.jpg',
    midImage: {
      src: '/img/therapy-neck.webp',
      alt: 'Physiotherapist working on a seated patient neck and shoulder at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    /** Facts this page already substantiates, moved into the first viewport. */
    assurances: [
      'Assessment before any care plan',
      'Exercises built for your problem, not a handout',
      'Open seven days · Cheras, Maluri',
    ],
    outcomes: [
      { text: 'Pain or stiffness that limits how you move through the day', illustration: 'limited-range' },
      { text: 'A recent strain or flare-up you want assessed properly', illustration: 'flare-up' },
      { text: 'A long-standing problem that keeps returning', illustration: 'recurring' },
      { text: 'Weakness or poor control after an injury or time off', illustration: 'weakness' },
      { text: 'Exercises that actually fit your problem, not a generic sheet', illustration: 'tailored-plan' },
    ],
    qualifierConcerns: [
      'I have pain or stiffness that limits daily activities',
      'My problem keeps coming back',
      'I want exercises tailored to my specific issue',
      'I am recovering from an injury and feel weak or unsteady',
      'I am not sure whether I need physio or chiropractic',
    ],
    lastReviewed: '2026-07-26',
    longForm: [
      {
        heading: 'What happens in a physiotherapy assessment?',
        body: 'A first physiotherapy visit is mostly assessment. We take a history, ask what makes the problem better or worse and what you need to get back to, then look at how you actually move, test the affected area and check the joints and muscles around it. The aim is to work out what is driving the problem rather than only where you feel it, because pain in one place often traces back to how something else is moving. From there we explain what we have found in plain terms and agree a plan, which usually pairs some hands on care with a small, specific exercise programme.',
      },
      {
        heading: 'Physiotherapy or chiropractic: which do you need?',
        body: 'Broadly, chiropractic care works on how a restricted joint moves, while physiotherapy builds the strength and control around it, and a good number of people benefit from both. Neither is better in the abstract; it depends on what the assessment finds. Because we offer chiropractic care, physiotherapy and dry needling under one roof in Cheras, we can start wherever the findings point and adjust as things change, rather than fitting you to whatever a single discipline happens to offer.',
      },
    ],
    citations: [
      {
        claim:
          'Clinical guidelines recommend staying active and using exercise based care for most non specific low back pain, rather than prolonged rest.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
      },
      {
        claim:
          'Physiotherapists in Malaysia practise under the Ministry of Health and its allied health professions framework.',
        source: 'Allied Health Professions Act 2016, Malaysia',
      },
    ],
    sections: [
      {
        heading: 'Physiotherapy in Cheras',
        body: 'Physiotherapy in Cheras, pairing hands on care with corrective exercise. We assess how you move before we begin, so the work goes to whatever is actually driving the problem rather than only the spot that hurts. Once a joint is moving more freely, the exercise aims to rebuild the strength and control that help keep it that way.',
      },
      {
        heading: 'Precision manual therapy',
        body: 'Refined hands on techniques, including joint mobilisation and myofascial release, aimed at improving how a joint moves and easing pain with precision. Manual therapy tends to work best as a way in rather than the whole plan. It can settle things enough that the active work becomes possible, and what we use depends on what the assessment finds.',
      },
      {
        heading: 'Movement, gait and biomechanical assessment',
        body: 'A detailed look at posture, gait and how you move under load, so we can identify what is contributing to the problem rather than only where you feel it. Pain in one place often traces back to how something else is moving, and working on the sore spot alone tends to let it return. Where footwear or orthotics are relevant, we look at those too.',
      },
      {
        heading: 'Corrective exercise programming',
        body: 'Progressive plans built around your condition, goals and daily life. Most of the lasting change tends to come from the exercise, which is why we prescribe it properly rather than hand you a generic sheet. The programme starts small, and we adjust it as you get stronger so it stays matched to what you can actually manage between visits.',
      },
      {
        heading: 'What your first physiotherapy session involves',
        body: 'The first visit is mostly assessment. We ask about your history, what aggravates and eases the problem and what you need to get back to, then examine how you move and test the area. Hands on care usually follows, along with the first few exercises to take home. A session generally runs around forty five minutes to an hour, and you should leave understanding what we think is going on and what the plan is.',
      },
      {
        heading: 'Physiotherapy or chiropractic, and how we combine them',
        body: 'Broadly, chiropractic care works on how a restricted joint moves, while physiotherapy works on the strength and control around it. Neither is better in the abstract, and many people benefit from both. Under one roof in Cheras we also offer dry needling, and the assessment decides where to start. If you are not sure which you need, message us your main concern and we will point you to the right starting point.',
      },
    ],
    helpsWith: ['back-pain', 'slipped-disc', 'neck-pain', 'sciatica', 'scoliosis'],
    relatedLinks: [
      { href: '/services/chiropractic-care', label: 'Compare with chiropractic care' },
      { href: '/services/sports-injury-rehabilitation', label: 'Sports injury and rehabilitation' },
      { href: '/what-to-expect', label: 'What to expect on your first visit' },
    ],
    faqs: [
      {
        q: 'Is the first physiotherapy session painful?',
        a: 'It should not be excessively painful. Some tests may briefly reproduce your familiar symptoms so we can pin down the problem, but your physiotherapist works within your comfort level and will stop if you ask. Mild soreness for a day afterwards can happen, particularly after hands on work.',
      },
      {
        q: 'How many physiotherapy sessions will I need?',
        a: 'It depends on the problem, how long it has been there and how the exercise progresses, so we will not give you a fixed number at the first visit. Assessing early often means fewer sessions than leaving a problem to become chronic. We review honestly as we go rather than sell a package up front.',
      },
      {
        q: 'Do I need a doctor referral to see a physiotherapist?',
        a: 'No referral is needed to book with us. If your case needs imaging or a medical opinion first, we will tell you and help you arrange it rather than press on regardless.',
      },
      {
        q: 'Will I get exercises to do at home?',
        a: 'Yes, in most cases. The exercise is where a lot of the lasting change tends to come from, so we prescribe a small, specific programme and progress it as you improve. It is designed to fit into a normal day rather than take over your evening.',
      },
      {
        q: 'Should I see a chiropractor or a physiotherapist?',
        a: 'It depends what the assessment finds. Broadly, chiropractic care works on how a restricted joint moves and physiotherapy works on the strength and control around it, and many patients benefit from both. If you are unsure, message us your main concern and we will point you to the right starting point.',
      },
    ],
    draft: false,
  },
  {
    slug: 'sports-injury-rehabilitation',
    title: 'Sports Injury & Rehabilitation in Cheras, Kuala Lumpur',
    metaTitle: 'Sports Injury Care in Cheras, KL',
    metaDescription:
      'Sports injury assessment, staged rehabilitation and criteria-based return to sport in Cheras, Maluri. Sprains, strains and overuse injuries, open seven days.',
    targetKeyword: 'sports injury treatment malaysia',
    intro:
      'Sports injury care in Cheras. We assess what failed and why, then work through staged rehabilitation aimed at getting you back to your sport without carrying the same weakness into it.',
    heroImage: {
      src: '/img/rehab-ankle.webp',
      alt: 'Practitioner applying kinesiology tape to a patient lower leg at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    ogImage: '/og/rehab-ankle.jpg',
    midImage: {
      src: '/img/adjustment-hip.webp',
      alt: 'Chiropractor working on a patient hip on a therapy table at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    assurances: [
      'Assessed before you are given a plan',
      'Staged return to your sport, not just rest',
      'Open seven days · Cheras, Maluri',
    ],
    outcomes: [
      { text: 'A sprain, strain or overuse injury you want assessed', illustration: 'sprain' },
      { text: 'Pain that flares up during or after your sport', illustration: 'flare-up' },
      { text: 'An injury that keeps coming back when you return to training', illustration: 'recurring' },
      { text: 'A staged plan back to your sport, not just rest', illustration: 'staged-return' },
      {
        text: 'Rehabilitation to continue after surgery, within the limits your surgeon sets',
        illustration: 'bounded-limit',
      },
    ],
    qualifierConcerns: [
      'I have a sprain, strain or overuse injury',
      'Pain flares up during or after my sport',
      'My injury keeps returning when I go back to training',
      'I want a clear plan for returning to my sport',
      'I am rehabbing after surgery',
      'I injured myself at the weekend and I am not an athlete',
    ],
    lastReviewed: '2026-07-26',
    longForm: [
      {
        heading: 'How does sports injury rehabilitation progress?',
        body: 'Rehabilitation moves through stages rather than all at once. Early on the aim is to protect the injured area and keep it moving without aggravating it. As it settles we rebuild range of movement, then strength, then the speed, control and agility your sport demands. Each stage needs to hold before the next one begins, and how quickly you progress depends on the injury and how you respond rather than on a fixed timetable.',
      },
      {
        heading: 'When is it safe to return to sport?',
        body: 'We prefer to base a return on what the area can do under testing, not simply on the pain having eased. That usually means checking strength, balance and sport specific movement, and building the training load back up gradually. Returning before the tissue tolerates the load is one of the most common reasons an injury comes back, so we would rather be honest about readiness than rush a date.',
      },
    ],
    citations: [
      {
        claim:
          'Return to sport decisions are best guided by criteria such as strength and functional testing rather than time alone, which helps reduce reinjury risk.',
        source: 'Ardern et al. (2016), Consensus statement on return to sport, British Journal of Sports Medicine',
      },
      {
        claim:
          'For most soft tissue injuries, guided early movement within pain limits is generally preferred over prolonged immobilisation.',
        source: 'British Journal of Sports Medicine',
      },
    ],
    sections: [
      {
        heading: 'Sports injury rehabilitation in Cheras',
        body: 'Sports injury care in Cheras. We assess what failed and why, then work through staged rehabilitation aimed at getting you back to your sport without carrying the same weakness into it. That covers sprains, strains and overuse injuries, in athletes and in people who simply train at the weekend.',
      },
      {
        heading: 'Finding what failed, and why',
        body: 'An injury is usually the visible end of something that was already off, whether that is a weakness, a movement pattern or a training load that climbed too fast. We assess the injured area and the way you move around it, because working on the sore tissue alone tends to let the same thing happen again. Understanding why it went is what shapes the rest of the plan.',
      },
      {
        heading: 'Staged rehabilitation, from settling down to loading up',
        body: 'Rehabilitation moves through stages rather than all at once. Early on the aim is to protect the area and keep it moving without aggravating it. As it settles we rebuild range, then strength, then the speed, control and agility your sport actually demands. Each stage has to hold before the next one starts, and how quickly you move through them depends on the injury and how you respond.',
      },
      {
        heading: 'Returning to sport on criteria, not a date',
        body: 'We would rather clear you to return on what the area can do than on how many weeks have passed. That means testing strength, balance and sport specific movement, and building the load back up gradually, rather than pronouncing you ready because the pain has gone. Returning before the tissue tolerates the load is the single most common reason an injury comes back.',
      },
      {
        heading: 'Recovery support and therapeutic modalities',
        body: 'Alongside the active work we use adjunct therapies to help manage pain and support tissue recovery through the early stages. These are there to make the rehabilitation possible, not to replace it. Where dry needling or hands on care is useful for the muscular side of things, we combine them under the same roof.',
      },
      {
        heading: 'Core and spinal stability for durability',
        body: 'Targeted work for the deep stabilising muscles that support the spine and control the trunk under load. Good stability through the middle tends to make the limbs more efficient and the whole system more durable, which is part of how we aim to lower the chance of the injury recurring once you are back.',
      },
    ],
    helpsWith: ['back-pain', 'shoulder-imbalance', 'hip-pain'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: 'Our physiotherapy approach' },
      { href: '/services/dry-needling', label: 'Dry needling for muscle tension' },
      { href: '/what-to-expect', label: 'What to expect on your first visit' },
    ],
    faqs: [
      {
        q: 'How soon after an injury should I be assessed?',
        a: 'Once the acute swelling has settled enough to move the area, an assessment is usually more informative. If you cannot put weight through the limb, or there is obvious deformity or severe swelling, go to A&E first rather than booking with us.',
      },
      {
        q: 'When can I return to my sport?',
        a: 'That depends on the injury, the sport and how rehabilitation progresses, so we will not give you a date at the first visit. We base the decision on what the area can do under testing rather than on symptoms alone, because returning before the tissue tolerates the load is the most common reason an injury recurs.',
      },
      {
        q: 'Do you see non-athletes, and weekend or desk injuries?',
        a: 'Yes. A tweaked back from lifting, a knee that flares up on a weekend run or an overuse strain from repetitive work are all approached the same way, by assessing what happened and rebuilding the area properly. You do not have to compete at anything to be seen.',
      },
      {
        q: 'Do I need a scan or X-ray before starting?',
        a: 'Not usually. Most sprains and strains are diagnosed from the assessment itself. If something suggests a more serious injury that needs imaging or a medical opinion, we will tell you and help you arrange it rather than press on regardless.',
      },
      {
        q: 'Can you help with rehabilitation after surgery?',
        a: 'Often, yes, once your surgeon is happy for rehabilitation to begin and within any restrictions they have set. We work to the protocol for your procedure and progress the loading as the tissue allows. Bring any notes or guidance from your surgical team to the first visit.',
      },
    ],
    draft: false,
  },
  {
    slug: 'posture-correction',
    title: 'Posture Correction in Cheras, Kuala Lumpur',
    metaTitle: 'Posture Correction in Cheras, KL',
    metaDescription:
      'Posture assessment and correction for desk workers in Cheras, Maluri. Sitting posture, workstation setup and corrective exercise, with honest expectations.',
    targetKeyword: 'sit posture correction',
    intro:
      'Posture work for desk workers in Cheras. We assess how you actually sit and move, then combine strength work with practical workstation changes so that a better position becomes sustainable instead of something you have to keep remembering.',
    heroImage: {
      src: '/img/posture-assessment.webp',
      alt: 'Chiropractor examining a seated patient upper back and posture at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    ogImage: '/og/posture-assessment.jpg',
    midImage: {
      src: '/img/nervoscope-assessment.webp',
      alt: 'Close up of a nervoscope being run along a patient spine at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    assurances: [
      'Posture assessed, not guessed at',
      'Workstation changes you can actually keep',
      'Open seven days · Cheras, Maluri',
    ],
    outcomes: [
      { text: 'Neck and shoulder tension that builds up over a day at a desk', illustration: 'desk-tension' },
      { text: 'A forward head or rounded shoulders you have noticed', illustration: 'forward-head' },
      { text: 'Stiffness that eases when you move and returns when you sit', illustration: 'recurring' },
      { text: 'Practical workstation changes you will actually keep', illustration: 'workstation' },
      {
        text: 'Strength work to hold a better position without thinking about it',
        illustration: 'hold-position',
      },
    ],
    qualifierConcerns: [
      'My neck and shoulders ache after a day at a desk',
      'I have noticed my head sitting forward or shoulders rounding',
      'I stiffen up when I sit for long periods',
      'I want help setting up my workstation',
      'I have tried a posture brace and it did not hold',
    ],
    lastReviewed: '2026-07-26',
    longForm: [
      {
        heading: 'Can posture really be changed?',
        body: 'It depends what you mean by changed. Comfort and endurance often improve, and people tend to find they can hold a better position for longer before it starts to feel like effort. What no course of care can promise is to permanently reshape a fixed structure or hand you a perfect posture that holds itself. We would rather be plain about that, and focus on the parts that genuinely respond, which are usually strength, mobility and habit.',
      },
      {
        heading: 'Is sitting at a desk the cause of my posture problems?',
        body: 'Prolonged sitting is a common contributor, though rarely the only one. For most desk related complaints, the trouble comes from holding any one position for too long rather than from a single wrong posture, so moving regularly tends to matter more than finding a perfect setup. We combine practical workstation changes with strength work, because the position you can hold through a working day is the one that counts.',
      },
    ],
    citations: [
      {
        claim:
          'Contemporary physiotherapy research questions the idea of a single correct posture and emphasises movement and variation instead.',
        source: 'O’Sullivan et al., research on posture and back pain',
      },
      {
        claim:
          'Prolonged static sitting is associated with musculoskeletal discomfort, and regular movement breaks are commonly advised.',
        source: 'Chartered Society of Physiotherapy guidance',
      },
    ],
    sections: [
      {
        heading: 'Posture correction in Cheras',
        body: 'Posture work for desk workers in Cheras. We assess how you actually sit and move, then combine strength work with practical workstation changes so that a better position becomes sustainable instead of something you have to keep remembering. Most of the people we see for this spend their day at a screen.',
      },
      {
        heading: 'Postural assessment',
        body: 'We look at how you sit, stand and move rather than at a single photograph. Posture is as much habit as structure, so the position you hold through a working day tells us more than the one you can manage for thirty seconds in a clinic. We also look at where your strength and mobility fall short, because those are usually what pulls you back into the old position.',
      },
      {
        heading: 'Forward head and rounded shoulders',
        body: 'The pattern we see most in desk workers is the head drifting forward and the shoulders rounding in, often with a stiff upper back behind it. It tends to build up over years at a screen rather than appear overnight. Naming it is the easy part. What matters is working out which bits are tight, which are weak and which are simply habit, because the mix is different for each person.',
      },
      {
        heading: 'Sitting posture and workstation setup',
        body: 'Practical changes to chair height, screen position and desk setup, based on where you actually work. With most of the desk related complaints we see, the trouble comes from holding any one position for too long, so moving regularly tends to matter more than finding a single perfect posture. Small changes you will actually keep beat an ideal setup you abandon by lunchtime.',
      },
      {
        heading: 'Corrective exercise',
        body: 'Targeted strength and mobility work for the muscles that hold a position over a working day. No single approach changes posture on its own, so the exercise is what carries the work between visits. It does not need to be long, but it does need to be regular, and we adjust it as you get stronger.',
      },
      {
        heading: 'What posture work can and cannot change',
        body: 'We would rather be plain about this. Comfort and endurance often improve, and people tend to find they can hold a better position for longer before it starts to feel like effort. What we cannot do is promise to straighten out a fixed structure or hand you a permanent posture from a course of visits. Your practitioner will tell you what is realistic in your case and what is not.',
      },
    ],
    helpsWith: ['neck-pain', 'shoulder-imbalance', 'back-pain'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: 'Our physiotherapy approach' },
      { href: '/services/chiropractic-care', label: 'How chiropractic care can help' },
      { href: '/what-to-expect', label: 'What to expect on your first visit' },
    ],
    faqs: [
      {
        q: 'Can posture actually be corrected?',
        a: 'Not in the way most people mean it. Comfort often improves, and patients tend to find they can hold a better position for longer before it starts to feel like work. Your practitioner will tell you honestly what is likely to shift in your case and what is not.',
      },
      {
        q: 'I sit at a desk all day. Is that the cause?',
        a: 'Prolonged sitting is a common contributor, though rarely the only one. Movement breaks generally matter more than any single "correct" position. The body copes with most positions reasonably well until you stay in one of them for hours.',
      },
      {
        q: 'Will a posture brace help?',
        a: 'Braces can act as a reminder, but they do not build the strength needed to hold a position without one, and relying on a brace long-term is not something we would recommend without assessment. Ask your practitioner before buying one.',
      },
      {
        q: 'How long before I notice a change?',
        a: 'It varies with how long the pattern has been there and how consistent you are with the exercise. Many people feel more comfortable within a few weeks, though holding a better position without thinking about it takes longer. We review as we go and adjust the plan rather than promise a timeline up front.',
      },
      {
        q: 'Do I need chiropractic or physiotherapy for posture?',
        a: 'It depends what the assessment finds, and posture work often draws on both. Broadly, chiropractic care addresses how stiff joints move while physiotherapy builds the strength and control to hold a better position. If you are unsure, message us your main concern and we will point you to the right starting point.',
      },
    ],
    draft: false,
  },
]

export const publishedServices = () => services.filter((s) => !s.draft)
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
/** Services rendered by app/services/[slug]/page.tsx — excludes hand-built routes. */
export const templatedServices = () => publishedServices().filter((s) => !s.dedicatedRoute)
