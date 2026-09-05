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
import type { Locale } from './i18n.ts'
import { servicesZh } from './services.zh.ts'
import { servicesMs } from './services.ms.ts'

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
   * "Reviewed by" byline AND the reviewedBy/lastReviewed schema — the two E-E-A-T
   * signals a YMYL medical page needs. Only set once the copy has actually been checked;
   * unset means no byline and no review date is claimed.
   */
  lastReviewed?: string
  /**
   * Side-by-side comparison of this service against another discipline offered here.
   *
   * Only earns its place where the clinic genuinely offers both and can therefore answer
   * the question without a conflict of interest — the physiotherapy/chiropractic decision
   * is the case it was built for. A comparison against something we do not offer would be
   * marketing rather than help, and `note` exists so the block cannot end on a winner.
   */
  comparison?: {
    heading: string
    intro: string
    columns: readonly [string, string]
    rows: readonly { label: string; a: string; b: string }[]
    /** The honest closer. Required, so the table always ends on "it depends". */
    note: string
  }
  /**
   * Citations: verifiable, cautiously worded facts attributed to a journal, clinical
   * guideline or regulator. Never a competitor, never an efficacy promise. 2–4 is plenty.
   */
  citations?: { claim: string; source: string; url?: string }[]
  /**
   * The two-column fit check: who this service suits, and who it does not.
   *
   * Adapted from a competitor teardown (ianthechiro.my, 2026-08-23), which is the one thing
   * their service template does better than ours. Every other trust block on this site
   * argues the clinic's case by describing what it does well; the right-hand column argues it
   * by turning work away, which a reader discounts far less. It is also the only place the
   * "assessment before contact" positioning can be stated as a refusal rather than a boast.
   *
   * BOTH COLUMNS ARE ABOUT EXPECTATIONS OF THE CLINIC, not about symptoms. That is what keeps
   * this block distinct from the two lists it sits near: `outcomes` is why people come in,
   * `qualifierConcerns` is what hurts. Writing symptoms here would publish the same list
   * three times on one route.
   *
   * RULES for `notRightFor`. Each item describes an EXPECTATION we will not meet, never a
   * judgement of the person holding it — "you want to be adjusted without being assessed" is
   * a mismatch, "you are the kind of patient who..." is a sneer. Nothing here may imply the
   * reader is wasting our time. Pair each one with its mirror in `rightFor` where you can:
   * read across the two columns and the same decision should be visible from both sides.
   *
   * `note` is required so the block cannot end on the refusal, exactly as `comparison.note`
   * stops that table ending on a winner. It is the sentence that says what to do instead.
   */
  fitCheck?: {
    /** Left column, ticked. What someone who suits this service wants from a clinic. */
    rightFor: readonly string[]
    /** Right column, crossed. Expectations a first visit here would not meet. */
    notRightFor: readonly string[]
    /** The closer. Required, so the block never ends on what we will not do. */
    note: string
  }
  /**
   * Service blocks, rendered by /services/[slug] as the hero intro (the first) and the
   * numbered "How it works" steps (the rest).
   *
   * OPTIONAL, because chiropractic-care has none. Its hand-built route renders the Gonstead
   * six-step walkthrough in that slot instead, and the three blocks that used to sit above it
   * were a contents list for it: block one named the six steps the section below enumerates,
   * block two paraphrased step six almost word for word. Removed 2026-08-23 at the client's
   * direction. The one sentence with no counterpart, the target-keyword line about bone and
   * body alignment, moved into that section's lead paragraph rather than going with it.
   *
   * A templated service without `sections` renders no hero intro and no steps, which is a
   * broken page — so leave it out only on a route that renders something else in its place.
   */
  sections?: { heading: string; body: string }[]
  /** Condition slugs this service is used for — the cross-link back into /conditions. */
  helpsWith: string[]
  /**
   * In-context internal links rendered as a button row under the sections — descriptive
   * anchor text into other services/pages. Optional; the chiropractic dedicated route
   * hard-codes its own equivalent. Keeps service pages internally linked without putting
   * markup inside the plain-text section bodies.
   */
  relatedLinks?: { href: string; label: string }[]
  /**
   * The FAQ, and since 2026-08-23 the only long-answer block on a service page.
   *
   * `longForm` used to sit above this with its own H2 per question, and it was deleted at
   * the client's direction because its question set had drifted onto the same ground as this
   * array and `keyTakeaways`: on two of the five services every single one of its questions
   * was already answered by one of the other two blocks, and physiotherapy answered its
   * location four separate times. Whatever those blocks said that this one did not has been
   * folded in here.
   *
   * `links` came with it. Each entry names a `phrase` that already appears in `a`, and the
   * renderer wraps that exact run of text in a link — descriptive anchor text that cannot
   * drift from the sentence around it, and the only in-prose internal linking on these pages.
   * The phrase must occur EXACTLY ONCE in the answer; `content.test.ts` asserts it.
   *
   * The plain `a` string is what reaches `FAQPage` schema, so markup never leaks into JSON-LD.
   */
  faqs: {
    q: string
    a: string
    links?: readonly { phrase: string; href: string }[]
  }[]
  /**
   * When set, `<MeetDoctors>` does NOT render on this page, and the string is the reason.
   *
   * A single field rather than a boolean plus a note, deliberately: the section cannot be
   * suppressed without someone writing down why, which is the same contract `holdReason`
   * has with `draft` in lib/posts.ts. `content.test.ts` asserts the reason is substantial.
   *
   * This exists because `practitioners` in lib/clinic.ts holds chiropractors only, and
   * `<MeetDoctors>` is hardcoded to "Meet your chiropractors". On a page selling a service
   * chiropractors are not licensed to deliver, that section does not merely look thin, it
   * implies the wrong profession provides the care.
   */
  practitionersWithheld?: string
  /**
   * True when the service has a hand-built route file instead of rendering through
   * app/services/[slug]/page.tsx. Only chiropractic-care does: it carries the
   * Gonstead six-step walkthrough, which is a bespoke layout rather than section blocks.
   * Excluded from generateStaticParams so the two routes can't collide at build time.
   */
  dedicatedRoute?: boolean
  /**
   * Marker appended to this service's row in the nav dropdown, and nowhere else.
   *
   * IT LABELS THE MENU. IT DOES NOT GATE THE PAGE. A service carrying this keeps a fully
   * live, indexed route with a working booking CTA, which is the confirmed intent for dry
   * needling (client, 2026-08-09: the page should be live and indexed, the badge is a title
   * for now). Do not add a `noindex`, pull the sitemap entry or soften the CTA to "match"
   * the badge — that would undo the decision.
   *
   * The field that actually withholds a service is `draft`, which pulls the page, the nav
   * row and the sitemap entry together. If a service ever genuinely is not bookable, reach
   * for that one, not this.
   *
   * Lives on the service rather than in lib/nav.ts on purpose: nav labels are derived from
   * the content modules so the two cannot disagree, and a slug matched by hand in the nav
   * would be the first thing to rot when a slug changes.
   */
  navBadge?: string
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
      // 152 characters. Was 161, one past what Google renders; "hands-on" went rather than
      // a local modifier or the "bone and body alignment" phrasing that carries the target
      // keyword. The page body still establishes that the adjustment is manual.
      'Gonstead chiropractic in Cheras, Maluri. Segment-by-segment spinal assessment and a precise adjustment for bone and body alignment, not a general crack.',
    targetKeyword: 'bone alignment near me',
    intro:
      'Gonstead chiropractic care in Cheras. We assess the spine segment by segment before anything is adjusted, so the work goes to whichever segment is actually driving your problem. That is not always where you feel it.',
    /**
     * The adjustment itself, and the only page on the site that leads with it.
     *
     * The homepage deliberately does NOT: a critique in .impeccable/ argues an adjustment
     * photo there contradicts the "thoroughness before contact" positioning, and it is right,
     * because a homepage visitor has not chosen anything yet. Someone reading
     * /services/chiropractic-care has. Hiding the hands-on work from them would read as
     * evasive, which is the same reasoning that put a real needle on the dry needling page.
     *
     * The frame helps: hands placed carefully on a gowned lower back, no dramatic thrust, so
     * it shows the "delivered precisely and skilfully by hand only" the sections claim rather
     * than the high velocity cracking a first timer is afraid of.
     */
    heroImage: {
      src: '/img/adjustment-back.webp',
      alt: 'Chiropractor placing both hands on a patient lower back before an adjustment at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    /** Pre-cropped 1200x630 from `heroImage`, same contract as the templated pages. */
    ogImage: '/og/chiropractic-care.jpg',
    /**
     * Was hardcoded into the six-step column in the route file, which made this the only
     * service whose second photograph lived outside the data module. Same image, same slot,
     * now declared where every other service declares it.
     */
    midImage: {
      src: '/img/consultation-assessment.webp',
      alt: 'Gonstead chiropractor assessing spinal alignment before an adjustment in Cheras, Kuala Lumpur',
    },
    /** Facts stated and justified further down, moved into the first viewport. */
    assurances: [
      'Assessed segment by segment before anything is adjusted',
      'We will say so if chiropractic is not the right approach',
      'Open seven days · Cheras, Maluri',
    ],
    /**
     * The flagship page was the only service whose outcomes were bare strings, so it was the
     * only one with no pictures in this section. That was invisible while the route had its
     * own text-only renderer; once both routes moved onto the shared <OutcomeCards> it read
     * as four failed image loads, which is how it was spotted (2026-08-23).
     *
     * PHOTOGRAPHS, NOT DIAGRAMS, and deliberately so. The rule on `Outcome` says a diagram
     * suits a card describing a SYMPTOM, because no honest photograph shows one. Every card
     * here leans on the PROCEDURE instead — assessed segment by segment, understood, adjusted
     * precisely, explained — and a real frame from this clinic is the truthful thing for that.
     *
     * None of these four appears anywhere else under /services/*, and none is the hero or the
     * mid-page shot on this route, so the page never shows the same photograph twice. Each alt
     * describes what is actually in the frame, never the concern the card sits under.
     */
    outcomes: [
      {
        /**
         * The one card of the four that names a SYMPTOM rather than a procedure, so it takes
         * the pain illustration rather than a clinic photograph — the rule on `Outcome`,
         * and the reason it exists: no honest frame of this clinic shows someone's neck
         * hurting, only a room with people in it. It first shipped with a nervoscope photo,
         * which illustrated the assessment in the second half of the sentence and left the
         * pain in the first half unrepresented.
         *
         * Shared with physiotherapy and sports injury, which is already how the pain
         * illustrations work across the service pages. Its alt carries no clinic name on
         * purpose: this is a generic illustration, not clinic imagery, and naming Cheras in
         * the alt of a stock frame would be a local-SEO signal we have not earned.
         */
        text: 'Back, neck or joint pain you want assessed segment by segment',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: 'Illustration of neck and shoulder muscles lit up on a man holding the side of his neck',
        },
      },
      {
        text: 'A recurring problem you would like to understand, not just mask',
        image: {
          src: '/img/hero-consult-xray.webp',
          alt: 'Chiropractor talking a patient through their spinal X-ray at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
        },
      },
      {
        text: 'A precise adjustment rather than a general crack',
        image: {
          src: '/img/adjustment-hip.webp',
          alt: 'Chiropractor working on a patient hip on a therapy table at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
        },
      },
      {
        text: 'Wanting to know whether the Gonstead approach suits your case',
        image: {
          src: '/img/hero-consult-spine-model.webp',
          alt: 'Chiropractor explaining spinal anatomy with a spine model to a patient at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
        },
      },
    ],
    /**
     * Ordered pain → specific population → no pain at all, ending on the catch-all. The
     * athlete and wellness rows were added 2026-08-09 at the client's request, and they are
     * the two that widen the page beyond people who are already hurting: the list previously
     * assumed a problem in four rows out of five, which quietly told a healthy visitor this
     * page was not for them.
     *
     * Both are phrased as what the READER wants, not as what care delivers. "I am an athlete
     * and want to manage an injury or perform better" is a person describing themselves;
     * "chiropractic improves athletic performance" would be an outcome claim, and this list
     * sits on a YMYL page. Keep any future row in the first voice.
     */
    qualifierConcerns: [
      'I have back, neck or joint pain',
      'My problem keeps returning',
      'I want to understand what is actually driving it',
      'I am an athlete and want to manage an injury or perform better',
      'I am pregnant or bringing a child and want a gentle assessment',
      'I do not have a specific problem but am interested in wellness care',
      'I am curious whether chiropractic suits my case',
    ],
    lastReviewed: '2026-07-26',
    /**
     * Chosen so that none of the five repeats an FAQ below. The FAQs already answer what
     * Gonstead is, whether an X-ray is needed and how chiropractic differs from bone setting,
     * and publishing the same answer twice on one route is the duplication the FAQ collision
     * test exists to prevent. These are the four questions a first time patient asks in the
     * room instead, plus the opening hours.
     */
    citations: [
      {
        claim:
          'Routine imaging is not recommended for non specific spinal pain and is advised only when there are specific clinical indications.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
      {
        claim:
          'Chiropractic is a regulated healthcare practice; in Malaysia practitioners register under the Ministry of Health framework.',
        source: 'Association of Chiropractic Malaysia; Ministry of Health Malaysia',
        url: 'https://www.moh.gov.my/en/corporate-info/division-information/traditional-and-complementary-medicine-division',
      },
    ],
    /**
     * The fit check. The last item on the right is a disclaimer under the AGENTS.md carve-out
     * — it says what chiropractic does NOT do, which is the case the carve-out exists for, so
     * the word "treat" stays. Rewriting it as "does not help with infection" would be both
     * vaguer and less protective.
     */
    fitCheck: {
      rightFor: [
        'You want the problem assessed segment by segment before anything is adjusted.',
        'You would rather be told honestly when adjusting is not the right call that day.',
        'You want to understand what keeps bringing a problem back, not just quiet it down.',
        'You want a precise adjustment to the segment involved rather than a general crack.',
      ],
      notRightFor: [
        'You want to be adjusted straight away, without being assessed first.',
        'You expect every visit to end with a click, whatever the assessment finds.',
        'You want a number of visits quoted, or an outcome promised, before we have seen you.',
        'Your problem is not mechanical. Chiropractic does not treat infection, fracture or disease of the organs, and we would refer you rather than adjust you.',
      ],
      note: 'None of that makes you a difficult patient. It means a first visit here would not give you what you came for, and we would rather say so now than at the end of an appointment you have paid for. If what you want is the assessment first and an honest answer about whether adjusting is the right call, that is exactly what a first visit is.',
    },
    helpsWith: ['back-pain', 'slipped-disc', 'sciatica', 'neck-pain', 'scoliosis'],
    /**
     * Were hardcoded as two <GhostButton>s inside the six-step section of the route file,
     * which meant the flagship page was the only service with no "Where to go next" block
     * and the only one that never linked back to /services. Declared here now, rendered by
     * the same block the templated routes use.
     */
    relatedLinks: [
      { href: '/what-to-expect', label: 'What to expect on your first visit' },
      { href: '/services/physiotherapy', label: 'Compare with physiotherapy' },
      { href: '/services/dry-needling', label: 'Dry needling in Cheras' },
    ],
    faqs: [
      {
        q: 'Will I be adjusted on my first visit?',
        a: 'Often, but not always. The assessment comes first, and if it points away from adjusting you that day we will say so rather than adjust anyway.',
      },
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
      {
        q: 'Can I see a chiropractor while pregnant?',
        a: 'Yes, pregnancy is one of the more common reasons people come to us, and we adjust through it regularly. We avoid imaging during pregnancy unless there is a compelling reason, and the assessment and the positioning both change as the pregnancy progresses. Tell your chiropractor how far along you are at the first visit so the approach can be set accordingly.',
      },
      {
        q: 'Do you see children and teenagers?',
        a: 'Yes, the clinic cares for patients of all ages, and children are assessed differently from adults rather than being given a smaller version of adult care. We generally go without an X-ray for children. A parent or guardian stays in the room throughout, and we will explain what we are looking at as we go.',
      },
      {
        q: 'What are the risks and side effects of chiropractic care?',
        a: 'Chiropractic adjustment is widely used for mechanical spine and joint problems, and serious complications are considered rare when care follows a proper assessment. The after effects that do occur are usually short lived, most often mild soreness or stiffness for a day or so. The assessment also screens for the small number of situations where adjusting would not be appropriate, and where it points at physiotherapy instead we will tell you honestly and start you there.',
        links: [
          { phrase: 'a proper assessment', href: '/what-to-expect' },
          { phrase: 'physiotherapy', href: '/services/physiotherapy' },
        ],
      },
      {
        q: 'What does an adjustment feel like, and what if I am nervous?',
        a: 'Most people describe brief pressure followed by a release rather than pain, and the popping sound that often comes with it is gas moving within the joint rather than bone grinding on bone, not a measure of whether it worked. Tell your chiropractor if anything feels worse than uncomfortable, because the contact and the force can both be adjusted and there are lower force approaches for patients who would rather not be adjusted in the usual way. Where the assessment points at muscle tension rather than joint restriction, we may suggest dry needling alongside the adjustment or in place of it.',
        links: [{ phrase: 'dry needling', href: '/services/dry-needling' }],
      },
      {
        q: 'Will I be asked to buy a package or commit to a plan?',
        a: 'No. There is no honest way to say how a case will progress before we have assessed you, so we will not quote a number of visits at the first visit or sell a course up front. Some people come for a defined stretch and stop, others choose to come occasionally once the original problem has settled, and we would rather review as we go and tell you when we think you no longer need us.',
        links: [{ phrase: 'the first visit', href: '/what-to-expect' }],
      },
      {
        q: 'Where exactly are you, and how do I get there?',
        a: 'The clinic is at Signature 2 in the Sunway Velocity development in Maluri, on the Cheras side of Kuala Lumpur, with mall parking if you drive and Maluri and Cochrane stations both within walking distance if you do not. Maluri is an interchange, so the Ampang, Sri Petaling and Kajang lines all reach us. We are open seven days: Monday to Thursday and Saturday until 8pm, Friday until 5pm, and Sunday until 3pm. You can check the opening hours and directions before you come.',
        links: [{ phrase: 'the opening hours and directions', href: '/locate-us' }],
      },
      {
        q: 'What happens if chiropractic is not the right approach for me?',
        a: 'We tell you, and we do not adjust you anyway. Part of what the six step assessment is for is finding the cases that belong somewhere else, whether that means physiotherapy here, imaging first, or a medical opinion we help you arrange. Knowing when a problem is not ours to treat is part of the job, and you are not charged for a course of care we do not think you need.',
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
      src: '/img/dry-needling-session.webp',
      alt: 'Gloved practitioner placing a single-use needle into a trigger point in a patient shoulder at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    /**
     * The three things someone hesitating over needles actually wants to know. Each is
     * already stated and justified in the sections below — this only moves them into the
     * first viewport, where the hesitation happens.
     */
    assurances: [
      'Sterile, single use needles, never reused',
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
    citations: [
      {
        claim:
          'Myofascial trigger points are described as hyperirritable spots within a taut band of skeletal muscle.',
        source: 'McAphee et al. (2022), International Journal of Sports Physical Therapy',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9159711/',
      },
      {
        claim:
          'Surveys of trigger point dry needling report that adverse events are usually minor and transient, such as soreness or minor bruising.',
        source: 'Brady et al. (2014), Journal of Manual & Manipulative Therapy',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4101552/',
      },
      {
        claim:
          'In Malaysia, chiropractic and physiotherapy are regulated healthcare practices, and practitioners are expected to hold recognised qualifications.',
        source: 'Ministry of Health Malaysia',
        url: 'https://www.moh.gov.my/en/corporate-info/division-information/traditional-and-complementary-medicine-division',
      },
    ],
    fitCheck: {
      rightFor: [
        'A muscle stays tight despite stretching and massage, and you want to know why.',
        'You want the needling to sit inside a plan, with exercise or adjustment alongside it.',
        'You want sterile single use needles and a practitioner who checks your history first.',
        'You would rather be told needling is not the answer than have it done anyway.',
      ],
      notRightFor: [
        'You want needling on request, without an assessment of why the muscle is tight in the first place.',
        'You have a strong fear of needles. We would rather use another approach than talk you into this one.',
        'You want the needling on its own, with no exercise or follow-up work between sessions.',
        'You are looking for acupuncture. It uses similar needles but selects points differently, and it is not what we offer.',
      ],
      note: 'If any of that is you, it does not mean we cannot help. It means dry needling is probably not where we would start, and a first visit is exactly where that gets decided. We would rather point you at the approach that suits than sell you the one you walked in asking for.',
    },
    sections: [
      {
        heading: 'Integrative dry needling',
        body: 'Dry needling is a neuromuscular technique that uses fine, single use needles to reach trigger points and tight bands of muscle that are difficult to release by hand alone. We use it as part of a wider plan rather than on its own, and only where the assessment points to muscle as the thing driving your problem.',
      },
      {
        heading: 'What dry needling actually does',
        body: 'A trigger point is a tight, irritable knot that can refer pain elsewhere. A needle placed into it often triggers a brief twitch, the muscle letting go. How much that helps depends on what is keeping the muscle tight.',
      },
      {
        heading: 'What a session involves',
        body: 'We assess first, then place fine needles into the points found. Expect a brief twitch or dull ache, not sharp pain. Sessions run fifteen to thirty minutes and shape the exercise or hands on work paired with it.',
      },
      {
        heading: 'Is it safe, and what to expect afterwards',
        body: 'Dry needling is generally very safe in trained hands, with sterile needles used once. Mild soreness or a small bruise for a day or so is common and settles on its own. Tell us if you are pregnant, on blood thinners, or needle-averse.',
      },
      {
        heading: 'How it works with the rest of your care',
        body: 'Needling eases tension but does not fix the habit or weakness that tightened the muscle. Under one roof in Cheras we pair it with chiropractic care and physiotherapy. The assessment decides where to start.',
      },
      {
        heading: 'How many sessions you might need',
        body: 'This depends on how long the problem has been there, so we will not quote a fixed number upfront. Some notice a change quickly, others need weeks of support. We review honestly as we go rather than sell a package.',
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
        q: 'Do I need a referral for dry needling?',
        a: 'No. You can book directly with us in Cheras. We assess before any needle is used, and if needling is not the right approach for your case we will tell you.',
      },
      {
        q: 'How long is a first session?',
        a: 'Around forty five minutes to an hour, and most of that is assessment rather than needling. You should leave knowing what we think is going on.',
      },
      {
        q: 'Is dry needling the same as acupuncture?',
        a: 'No. Dry needling is a Western, anatomy based technique: a fine filament needle is placed directly into a myofascial trigger point, a small hyperirritable knot within a taut band of muscle, with the aim of releasing that tension. Nothing is injected, which is where the word "dry" comes from. Acupuncture uses similar needles but comes from traditional Chinese medicine and selects points along meridians rather than by muscle anatomy. Here it is one tool within an assessment led plan, not a standalone therapy.',
        links: [{ phrase: 'an assessment led plan', href: '/what-to-expect' }],
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
        q: 'Is dry needling safe, and are there side effects?',
        a: 'It is generally considered safe when carried out by a trained practitioner using sterile, single use needles. The most common after effects are mild and short lived: temporary soreness at the site, and occasionally a small bruise, usually settling within a day or two. You can eat, drink, work and train normally afterwards. We check your history first, because there are situations, such as pregnancy, medications that affect bleeding, or a strong fear of needles, where we would choose a different approach. We usually pair a session with specific exercises so the muscle has a reason to stay released.',
        links: [{ phrase: 'specific exercises', href: '/services/physiotherapy' }],
      },
      {
        q: 'What does dry needling help with?',
        a: 'People most often come to us when a muscle stays tight despite stretching and massage, when trigger points keep referring pain to the same spot, or when an old injury has left a muscle guarded and overactive. It is commonly used around the neck, shoulders and lower back, and alongside care for problems such as sciatica and shoulder imbalance. Needling can calm an irritable muscle, but on its own it does not change the habit, weakness or joint restriction that let it tighten, which is why we combine it with chiropractic care where the findings point that way.',
        links: [
          { phrase: 'sciatica', href: '/conditions/sciatica' },
          { phrase: 'shoulder imbalance', href: '/conditions/shoulder-imbalance' },
          { phrase: 'chiropractic care', href: '/services/chiropractic-care' },
        ],
      },
      {
        q: 'Should I have dry needling or a chiropractic adjustment?',
        a: 'It depends on what the assessment finds, and the two are often used together rather than as alternatives. Broadly, needling addresses tight, irritable muscle while an adjustment addresses how a spinal joint moves. If you are unsure, message us your main concern and we will point you to the right starting point.',
      },
    ],
    // Client request 2026-08-09, menu only and deliberately so: the page stays live, indexed
    // and bookable, and "(Coming Soon)" is a title for now. See `navBadge` on the type.
    navBadge: '(Coming Soon)',
    draft: false,
  },
  {
    slug: 'physiotherapy',
    title: 'Physiotherapy in Cheras, Kuala Lumpur',
    metaTitle: 'Physio & Physiotherapy in Cheras, KL',
    metaDescription:
      'Physio in Cheras, Maluri, beside Sunway Velocity. Assessment first, then hands-on care and corrective exercise. Open seven days, no referral needed.',
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
    /**
     * Supplied images, replacing the five SVG diagrams — same job (show the symptom, not
     * the service), more immediacy. Sources are 2:1 and the card slot is 4:3, so a third of
     * the width is cut; "recurring" is cropped left because both figures sit hard against
     * that edge and a centre crop takes the clinician out of frame.
     *
     * ⚠️ ALT TEXT CARRIES NO LOCAL MODIFIER, for the same reason recorded on the dry
     * needling outcomes above: these are stock and composite images, not photographs of
     * this clinic, these practitioners or these patients. Describe the frame, nothing more.
     */
    outcomes: [
      {
        text: 'Pain or stiffness that limits how you move through the day',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: 'Illustration of neck and shoulder muscles lit up on a man holding the side of his neck',
        },
      },
      {
        text: 'A recent strain or flare-up you want assessed properly',
        image: {
          src: '/img/physio-recent-strain.webp',
          alt: 'Illustration of lower back pain lit up on a man standing at a kitchen counter with a hand on his back',
        },
      },
      {
        text: 'A long-standing problem that keeps returning',
        image: {
          src: '/img/physio-recurring.webp',
          alt: 'Clinician resting a hand on the shoulder of a seated woman during an assessment',
        },
      },
      {
        text: 'Weakness or poor control after an injury or time off',
        image: {
          src: '/img/physio-weakness.webp',
          alt: 'Illustration of ankle pain lit up on a woman seated at a desk with her feet on the floor',
        },
      },
      {
        text: 'Exercises that actually fit your problem, not a generic sheet',
        image: {
          src: '/img/physio-tailored-exercise.webp',
          alt: 'Woman working through a resistance band exercise while a therapist holds the other end of the band',
        },
      },
    ],
    qualifierConcerns: [
      'I have pain or stiffness that limits daily activities',
      'My problem keeps coming back',
      'I want exercises tailored to my specific issue',
      'I am recovering from an injury and feel weak or unsteady',
      'I am not sure whether I need physio or chiropractic',
    ],
    lastReviewed: '2026-07-26',
    /**
     * The four blockers plus the location answer, for the visitor who has not decided to
     * read yet. "physio cheras" is a NAVIGATIONAL term (260/mo, Malaysia) — someone
     * searching it is choosing a clinic to walk into, not researching physiotherapy, so
     * the answers that matter first are logistical rather than clinical.
     *
     * Every answer here is stated again in full further down the page. That is deliberate:
     * this block is the summary, not the only place a claim appears.
     */
    /**
     * The one comparison on the site we can make without a conflict of interest, because
     * both columns are offered here. It exists because no competitor page on this SERP
     * answers the question at all, and `note` keeps it from resolving into a winner.
     */
    comparison: {
      heading: 'Physiotherapy or chiropractic care?',
      intro:
        'The honest answer is that it depends on what the assessment finds, and plenty of people here end up having both. This is the rough shape of the difference.',
      columns: ['Physiotherapy', 'Chiropractic care'],
      rows: [
        {
          label: 'Works mainly on',
          a: 'Strength, control and how you move',
          b: 'How a restricted spinal joint moves',
        },
        {
          label: 'A first visit looks like',
          a: 'Movement testing and assessment, then hands on care and your first exercises',
          b: 'A Gonstead analysis, segment by segment, before anything is adjusted',
        },
        {
          label: 'Main tools',
          a: 'Manual therapy, joint mobilisation, corrective exercise',
          b: 'A precise hands on adjustment of the segment identified',
        },
        {
          label: 'Between visits',
          a: 'An exercise programme carries most of the work',
          b: 'Usually less to do at home, though we may still give you something',
        },
        {
          label: 'Often suits',
          a: 'Recovery after injury, weakness, movement that keeps breaking down',
          b: 'A joint that feels stuck, or a problem returning to the same spot',
        },
      ],
      note: 'Neither is better in the abstract. If you are not sure which you need, message us your main concern and we will point you to the right starting point rather than book you into whichever one you happened to click.',
    },
    citations: [
      {
        claim:
          'Clinical guidelines recommend staying active and using exercise based care for most non specific low back pain, rather than prolonged rest.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
      {
        claim:
          'Physiotherapists in Malaysia practise under the Ministry of Health and its allied health professions framework.',
        source: 'Allied Health Professions Act 2016, Malaysia',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10835829/',
      },
    ],
    fitCheck: {
      rightFor: [
        'You want to know what is driving the problem, not only where you feel it.',
        'You are willing to do a small, specific exercise programme between visits.',
        'You want hands on care and rehabilitation from one place rather than one or the other.',
        'You would rather be referred on than kept in a course of care that is not working.',
      ],
      notRightFor: [
        'You want a passive session only, with nothing to do between visits. The exercise is most of the work.',
        'You want a fixed number of sessions agreed before anyone has assessed you.',
        'You are looking for a relaxation massage or a spa session rather than clinical rehabilitation.',
        'Your problem needs imaging or a medical opinion first. Physiotherapy does not treat fracture, infection or disease of the organs, and we would refer you rather than press on.',
      ],
      note: 'None of that makes you a difficult patient. It means a first visit here would not give you what you came for, and we would rather say so at the start than at the end. If what you want is an honest assessment and a plan you understand well enough to follow, that is exactly what a first visit is.',
    },
    sections: [
      {
        heading: 'Physiotherapy in Cheras',
        /**
         * ANSWER FIRST. This string is the hero paragraph (the template takes `sections[0]`
         * as the lead), so it is the first 60 words a visitor and an answer engine both
         * read. It used to open by describing the approach; it now opens by settling the
         * two things a navigational searcher wants first, which are where we are and
         * whether they can just book.
         */
        body: 'Physio in Cheras, on the Maluri side beside Sunway Velocity, open seven days. No referral is needed and you can book directly. A first visit is mostly assessment: we look at how you actually move before anything begins, so the work goes to whatever is driving the problem rather than only the spot that hurts. From there we pair hands on care with a small exercise programme aimed at rebuilding the strength and control that help keep a joint moving freely.',
      },
      {
        heading: 'Precision manual therapy',
        body: 'Hands on techniques, including joint mobilisation and myofascial release, ease pain and improve how a joint moves. It works best as a way in, not the whole plan, settling things enough for the active work to begin.',
      },
      {
        heading: 'Movement, gait and biomechanical assessment',
        body: 'A detailed look at posture, gait and how you move under load, to find what is contributing, not just where you feel it. Pain in one place often traces back to how something else moves. Where footwear or orthotics matter, we check those too.',
      },
      {
        heading: 'Corrective exercise programming',
        body: 'Progressive plans built around your condition, goals and daily life. Most lasting change comes from the exercise, so we prescribe it properly rather than hand you a generic sheet. It starts small and adjusts as you get stronger.',
      },
      {
        heading: 'What your first physiotherapy session involves',
        body: 'The first visit is mostly assessment: your history, what aggravates and eases things, and how you move. Hands on care usually follows, with the first few exercises to take home. It runs about forty five minutes to an hour.',
      },
      {
        heading: 'Physiotherapy or chiropractic, and how we combine them',
        body: 'Broadly, chiropractic care works on how a restricted joint moves, physiotherapy on the strength and control around it. Many people benefit from both, plus dry needling, under one roof in Cheras. Message us your main concern and we will point you to a starting point.',
      },
    ],
    helpsWith: [
      'back-pain',
      'slipped-disc',
      'neck-pain',
      'sciatica',
      'scoliosis',
      'hip-pain',
      'shoulder-imbalance',
    ],
    relatedLinks: [
      { href: '/services/chiropractic-care', label: 'Compare with chiropractic care' },
      { href: '/services/sports-injury-rehabilitation', label: 'Sports injury and rehabilitation' },
      { href: '/services/dry-needling', label: 'Dry needling for muscle that stays tight' },
      { href: '/services/posture-correction', label: 'Posture correction for desk workers' },
      { href: '/what-to-expect', label: 'What to expect on your first visit' },
    ],
    practitionersWithheld:
      'Client instruction, 2026-08-08. The clinic\'s physiotherapists are still within their probation period and are not to be named on the site yet, and chiropractors are not licensed to deliver physiotherapy, so the three practitioners in lib/clinic.ts cannot stand in for them. Until then this page names no individual: a section headed "Meet your chiropractors" on a physiotherapy page implies the wrong profession provides the care, which is a worse problem than an absent team section. Remove this field once the clinic supplies the physiotherapist list and lib/clinic.ts can filter by role.',
    faqs: [
      {
        q: 'What happens in a physiotherapy assessment?',
        a: 'A first physiotherapy visit is mostly assessment. We take a history, ask what makes the problem better or worse and what you need to get back to, then look at how you actually move, test the affected area and check the joints and muscles around it. The aim is to work out what is driving the problem rather than only where you feel it, because pain in one place often traces back to how something else is moving. From there we explain what we found in plain terms and agree a plan, which usually pairs some hands on care with a small, specific exercise programme.',
        links: [{ phrase: 'A first physiotherapy visit', href: '/what-to-expect' }],
      },
      {
        q: 'How long is a first session?',
        a: 'Around forty five minutes to an hour, and most of that is assessment rather than hands on care. You should leave knowing what we think is going on.',
      },
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
        /**
         * Reworded from "Should I see a chiropractor or a physiotherapist?". The comparison
         * table above already answers that one, and a second copy inside FAQPage schema would
         * publish the same answer twice on one route. This asks the question the table leaves
         * open instead. (It used to be answered three times: a `keyTakeaways` entry said it
         * too, until that block was deleted from the service pages on 2026-08-23.)
         */
        q: 'Can I have physiotherapy and chiropractic care together?',
        a: 'Yes, and a good number of patients here do. The two work on different things, so combining them is common rather than unusual: chiropractic care addresses how a restricted joint moves and physiotherapy builds the strength and control around it, and dry needling sits alongside either where a muscle is the problem. The assessment decides where to start and whether both are worth using at all, and we will say so if we think one alone is enough.',
        links: [{ phrase: 'dry needling', href: '/services/dry-needling' }],
      },
      {
        q: 'Where in Cheras are you, and is there parking?',
        a: 'We are at Signature 2 in the Sunway Velocity development in Maluri, on the Cheras side of Kuala Lumpur. The mall car park is the easiest option if you drive, and Maluri and Cochrane stations are both within walking distance if you take the train. Maluri is an interchange, so the Ampang, Sri Petaling and Kajang lines all reach us. The full address and a map link sit in the footer of every page.',
      },
      {
        q: 'Are you open at weekends?',
        a: 'Yes, we are open seven days including Sunday. Saturday runs to 8pm and Sunday to 3pm, which is usually the easiest slot to get if weekdays are difficult. Monday to Thursday we are open until 8pm and Friday until 5pm.',
        links: [{ phrase: 'open seven days', href: '/locate-us' }],
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
    /**
     * KEPT ON PURPOSE AT 10 SEARCHES A MONTH. Client decision, 2026-08-08.
     *
     * The national modifier looks wrong on a single clinic site, and it is the obvious thing
     * to "fix" by swapping in a local one. Do not. Every variant was measured against the
     * Malaysia index first: `sports injury treatment kl` 0, `sports rehab kl` 0,
     * `sports physiotherapy kuala lumpur` 0, `sports injury clinic kuala lumpur` 10 (eleven
     * of twelve months at zero, so noise at the reporting floor), `sports injury near me` 20.
     * Localising this keyword costs volume rather than adding it, because the whole cluster
     * is empty rather than mislocalised.
     *
     * The only nearby term with real demand is `sports massage kl` (170/mo, difficulty 8,
     * commercial intent), and that is a different service, not a rewording of this one. If the
     * clinic ever offers sports massage, retargeting this page is the move; until then the
     * keyword stays and the page earns its place through internal linking rather than search.
     * Low volume is not low value here: sprains still walk in, they just arrive via
     * `physio cheras`, the Business Profile or a condition page.
     */
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
    /**
     * Photographs rather than the five SVG diagrams, matching physiotherapy and dry needling.
     * Only the last two are this page's own images; the first three are the physiotherapy
     * symptom frames, which show the same concerns and are reused deliberately rather than
     * commissioned twice.
     *
     * Row order does visual work: three lit-symptom frames (the problem), then two clinic
     * frames (what happens about it). The "keeps coming back" card takes the neck frame, not
     * the physiotherapy clinician-and-shoulder one — that shot and the post-surgical card
     * below are near-identical compositions and sat badly in the same row.
     *
     * ⚠️ ALT TEXT CARRIES NO LOCAL MODIFIER, for the same reason recorded on the dry
     * needling and physiotherapy outcomes: these are stock and composite images, not
     * photographs of this clinic, these practitioners or these patients.
     */
    outcomes: [
      {
        text: 'A sprain, strain or overuse injury you want assessed',
        image: {
          src: '/img/physio-weakness.webp',
          alt: 'Illustration of ankle pain lit up on a woman seated at a desk with her feet on the floor',
        },
      },
      {
        text: 'Pain that flares up during or after your sport',
        image: {
          src: '/img/physio-recent-strain.webp',
          alt: 'Illustration of lower back pain lit up on a man standing at a kitchen counter with a hand on his back',
        },
      },
      {
        text: 'An injury that keeps coming back when you return to training',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: 'Illustration of neck and shoulder muscles lit up on a man holding the side of his neck',
        },
      },
      {
        text: 'A staged plan back to your sport, not just rest',
        image: {
          src: '/img/sports-staged-return.webp',
          alt: 'Woman balancing on one leg on a wobble cushion while a therapist steadies her hands',
        },
      },
      {
        text: 'Rehabilitation to continue after surgery, within the limits your surgeon sets',
        image: {
          src: '/img/sports-post-surgical.webp',
          alt: 'Clinician guiding a seated man through shoulder range of movement in a clinic room',
        },
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
    citations: [
      {
        claim:
          'Return to sport decisions are best guided by criteria such as strength and functional testing rather than time alone, which helps reduce reinjury risk.',
        source: 'Ardern et al. (2016), Consensus statement on return to sport, British Journal of Sports Medicine',
        url: 'https://bjsm.bmj.com/content/50/14/853',
      },
      {
        claim:
          'For most soft tissue injuries, guided early movement within pain limits is generally preferred over prolonged immobilisation.',
        source: 'British Journal of Sports Medicine',
        url: 'https://bjsm.bmj.com/content/54/2/72',
      },
    ],
    fitCheck: {
      rightFor: [
        'You want the return to sport decided on what the area can do, not on the calendar.',
        'You are ready to do staged strength work rather than wait for the pain to pass.',
        'You want to keep training where it is safe to, with the load adjusted rather than stopped.',
        'You want an honest answer about readiness, even when it is not the one you hoped for.',
      ],
      notRightFor: [
        'You want a date for returning to sport before the area has been tested under load.',
        'You want the pain settled but would rather skip the strength work that keeps it settled.',
        'You want to keep training exactly as before, with nothing about the load or the movement changed.',
        'The injury may need a surgeon or imaging first. We would refer you rather than start rehabilitation regardless.',
      ],
      note: 'None of that makes you a difficult patient, and most of it is simply what being in a hurry to get back sounds like. It means we would give you an honest answer about readiness rather than sign off a date, which is the part that decides whether the same injury returns in three months. If that is what you want from a clinic, a first visit is where it starts.',
    },
    sections: [
      {
        heading: 'Sports injury rehabilitation in Cheras',
        body: 'Sports injury care in Cheras. We assess what failed and why, then work through staged rehabilitation aimed at getting you back to your sport without carrying the same weakness into it. That covers sprains, strains and overuse injuries, in athletes and in people who simply train at the weekend.',
      },
      {
        heading: 'Finding what failed, and why',
        body: 'An injury is usually the visible end of something already off: a weakness, a movement pattern, or load that climbed too fast. We assess the injured area and how you move around it. Why it happened shapes the rest of the plan.',
      },
      {
        heading: 'Staged rehabilitation, from settling down to loading up',
        body: 'Rehabilitation moves through stages, not all at once. Early on we protect the area and keep it moving; as it settles we rebuild range, then strength, then the speed and agility your sport demands. Each stage has to hold before the next starts.',
      },
      {
        heading: 'Returning to sport on criteria, not a date',
        body: 'We clear you to return on what the area can do, not how many weeks have passed. That means testing strength, balance and sport specific movement, then loading back up gradually. Returning too soon is the most common reason an injury comes back.',
      },
      {
        heading: 'Recovery support and therapeutic modalities',
        body: 'Alongside the active work, we use adjunct therapies to ease pain and support tissue recovery early on. These make the rehabilitation possible, not replace it. Where dry needling or hands on care helps, we combine them under the same roof.',
      },
      {
        heading: 'Core and spinal stability for durability',
        body: 'Targeted work for the deep stabilising muscles that support the spine and control the trunk under load. Good stability through the middle makes the limbs more efficient and the whole system more durable, lowering the chance of the injury coming back.',
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
        q: 'Do I need a referral?',
        a: 'No referral is needed to book with us in Cheras. Bring any scan reports or notes from a doctor or surgeon if you have them, because they save time at the assessment.',
      },
      {
        q: 'How long is a first session?',
        a: 'Around forty five minutes to an hour, most of it assessment. You should leave knowing what we think failed and what the first stage of rehabilitation looks like.',
      },
      {
        q: 'Will I see a chiropractor or a physiotherapist?',
        a: 'Whichever the assessment points to, and often both. Both disciplines are under one roof here, so you are not routed by who happens to be free.',
      },
      {
        q: 'How soon after an injury should I be assessed?',
        a: 'Once the acute swelling has settled enough to move the area, an assessment is usually more informative. If you cannot put weight through the limb, or there is obvious deformity or severe swelling, go to A&E first rather than booking with us.',
      },
      {
        q: 'When can I return to my sport?',
        a: 'That depends on the injury, the sport and how rehabilitation progresses, so we will not give you a date at the first visit. We base the decision on what the area can do under testing rather than on symptoms alone, because returning before the tissue tolerates the load is the most common reason an injury recurs.',
      },
      {
        q: 'How does sports injury rehabilitation progress?',
        a: 'It moves through stages rather than all at once. Early on the aim is to protect the injured area and keep it moving without aggravating it. As it settles we rebuild range of movement, then strength, then the speed, control and agility your sport demands. Each stage needs to hold before the next one begins, and how quickly you progress depends on the injury and how you respond rather than on a fixed timetable.',
      },
      {
        q: 'Which sports injuries do you see most often?',
        a: 'The most common are the ones that come from load rather than contact: runners with knee, shin or achilles complaints, gym injuries around the shoulder and lower back, and ankle sprains that never quite settled after the first one. Racket and court sports bring their own shoulder and elbow problems. A good share of what we see is a recurrence rather than a fresh injury, which usually points at a stage of rehabilitation that was cut short the first time round. We also see plenty of back pain and hip pain that has nothing to do with sport, and the staged approach behind it is the same.',
        links: [
          { phrase: 'back pain', href: '/conditions/back-pain' },
          { phrase: 'hip pain', href: '/conditions/hip-pain' },
        ],
      },
      {
        q: 'Can I keep training while I rehabilitate?',
        a: 'Usually yes, with what you do and how much of it adjusted rather than stopped altogether. Complete rest is rarely the aim, because losing condition creates its own problems and most people do better when something keeps loading the rest of the body. What changes is the movement that provokes the injury, the volume, and sometimes the surface or the tempo. Working out what you can safely keep doing is part of the assessment rather than an afterthought, and where a muscle has stayed guarded we may use dry needling alongside the strength work.',
        links: [
          { phrase: 'the assessment', href: '/what-to-expect' },
          { phrase: 'dry needling', href: '/services/dry-needling' },
        ],
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
    /**
     * BUILT 2026-09-03, after the clinic confirmed it offers sports massage as a standalone
     * service. Until then the only mention of the term on this site was the comment on
     * `sports-injury-rehabilitation` explaining why we could not use it.
     *
     * `sports massage kl` runs 170/mo at difficulty 8 with commercial intent, which makes it
     * the largest untapped keyword found anywhere in this project. It gets its own page rather
     * than a retarget of sports injury rehabilitation because the two are different intents:
     * one is somebody sore after a training week looking for hands on work, the other is
     * somebody injured looking for a rehabilitation plan. Folding them together would have
     * abandoned the clinical intent that page already owns, which is the cannibalisation the
     * architecture exists to prevent.
     *
     * THE SERP IS HALF SPAS. Positions 1, 4, 7 and 9 for this query are spas, reflexology and
     * a TripAdvisor listing; only three clinics rank on page one, and not one of them explains
     * the difference between what they do and what a spa does. That gap is the `comparison`
     * block below, and it is the main reason this page can compete without more authority than
     * the clinics already there.
     *
     * WE CANNOT NAME THE PRACTITIONER AND ALL THREE COMPETITORS DO. Renew names its therapist,
     * Benphysio names six, Your Physio names thirteen, and every one of them leans on that as
     * the trust signal. The physiotherapists here are still within probation and cannot be
     * named (see OPEN-ITEMS.md), so this page answers "who will be doing this" in the FAQ with
     * the profession and its registration instead of a name. Revisit when the names are freed.
     */
    slug: 'sports-massage',
    title: 'Sports Massage in Cheras, Kuala Lumpur',
    metaTitle: 'Sports Massage in Cheras, KL',
    metaDescription:
      'Sports massage in Cheras, Maluri, assessed before it starts. For training loads, desk tension and injuries that never quite settled. Open seven days.',
    targetKeyword: 'sports massage kl',
    intro:
      'Sports massage in Cheras for people who train, people who sit at a desk all week, and people carrying something that never quite settled. It begins with an assessment rather than a menu, so the session is spent on the tissue actually causing the complaint.',
    /**
     * Replaced `therapy-neck.webp` on 2026-09-03. That frame is a real photograph of this
     * clinic, but it shows a cervical hold, which on a sports massage page reads as an
     * adjustment rather than as massage. It remains the physiotherapy page's mid image, where
     * it is accurate.
     *
     * ⚠️ AI GENERATED, SO THE ALT CLAIMS NO LOCATION, and this is the most prominent instance
     * of that on the site: the hero is what an OG card would be cropped from, so the image
     * representing this page on WhatsApp or Facebook is not a photograph of this clinic. Do not
     * add the Cheras modifier here, and do not set `ogImage` from it without deciding that
     * question deliberately. Swap in real photography when the clinic can shoot it.
     *
     * Portrait 1080x1350, which is the `aspect-[4/5]` the hero uses from `lg` up. Mobile crops
     * it to 4/3 around the centre, where the hands and the calf sit.
     */
    heroImage: {
      src: '/img/sports-massage-hero.webp',
      alt: 'Therapist working with both hands along a patient calf on a padded table during a sports massage',
    },
    /**
     * The first image on this site that actually shows the service it sits next to. It replaced
     * a cupping photograph on 2026-09-03, which was the closest thing the library held until
     * this was commissioned.
     *
     * ⚠️ AI GENERATED, SO THE ALT CLAIMS NO LOCATION. It is not a photograph of this clinic,
     * these practitioners or these patients, and alt text that named Cheras would be a claim
     * about a room that does not exist. Every other real-clinic frame on the site carries the
     * local modifier; this one must not, and neither must its zh/ms counterparts. Replace it
     * with a real photograph when the clinic can shoot one, and add the modifier back then.
     *
     * The file is 1008x720, which is the same 1.4 ratio as the width={1400} height={1000} the
     * templated route hardcodes for this slot. Matching the RATIO is what avoids Next's
     * aspect-ratio warning, so there was no reason to upscale the frame to 1400 wide.
     */
    midImage: {
      src: '/img/sports-massage-session.webp',
      alt: 'Therapist working with both hands along a patient calf during a sports massage',
    },
    assurances: [
      'Assessed before any hands on work begins',
      'Sixty minute sessions',
      'Open seven days · Cheras, Maluri',
    ],
    /**
     * ⚠️ ALT TEXT CARRIES NO LOCAL MODIFIER, for the same reason recorded on the physiotherapy
     * and sports rehabilitation outcomes: these are the shared symptom illustrations, not
     * photographs of this clinic, these practitioners or these patients. No sports massage
     * photograph exists yet, which is why the hero reuses the soft tissue frame from the
     * physiotherapy page and this row reuses illustrations. Logged in OPEN-ITEMS.md.
     */
    outcomes: [
      {
        text: 'Muscle tension that builds up across a training week',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: 'Illustration of neck and shoulder muscles lit up on a man holding the side of his neck',
        },
      },
      {
        text: 'A lower back that tightens after long sitting or heavy lifting',
        image: {
          src: '/img/physio-recent-strain.webp',
          alt: 'Illustration of lower back pain lit up on a man standing at a kitchen counter with a hand on his back',
        },
      },
      {
        text: 'An old injury that still grumbles when the training load goes up',
        image: {
          src: '/img/physio-weakness.webp',
          alt: 'Illustration of ankle pain lit up on a woman seated at a desk with her feet on the floor',
        },
      },
      {
        text: 'Getting ready before an event, or settling down after one',
        image: {
          src: '/img/sports-staged-return.webp',
          alt: 'Woman balancing on one leg on a wobble cushion while a therapist steadies her hands',
        },
      },
    ],
    qualifierConcerns: [
      'My muscles stay sore between training sessions',
      'My neck and shoulders tighten up at a desk',
      'An old injury grumbles when I train',
      'I have an event coming up',
      'I am not sure whether I need massage or rehabilitation',
      'I have had a spa massage and it did not hold',
    ],
    citations: [
      {
        claim:
          'The largest review of sports massage to date found no evidence that it improves strength, sprint, jump or endurance performance, and small but statistically significant improvements in flexibility and delayed onset muscle soreness.',
        source:
          'Davis, Alabed and Chico (2020), Effect of sports massage on performance and recovery: a systematic review and meta-analysis, BMJ Open Sport & Exercise Medicine',
        url: 'https://bmjopensem.bmj.com/content/6/1/e000614',
      },
      {
        claim:
          'A meta-analysis comparing post exercise recovery techniques found massage the most effective of those studied for reducing delayed onset muscle soreness and perceived fatigue.',
        source:
          'Dupuy et al. (2018), An Evidence-Based Approach for Choosing Post-exercise Recovery Techniques, Frontiers in Physiology',
        url: 'https://www.frontiersin.org/articles/10.3389/fphys.2018.00403/full',
      },
    ],
    /**
     * The block this page was built around. Not one of the three clinics ranking for
     * `sports massage kl` explains this, and half the results on that page are spas, so the
     * reader arrives genuinely unsure which of the two they want. `note` keeps it from reading
     * as a page running down the alternative, which would be both unpleasant and untrue:
     * wanting a quiet hour is a perfectly good reason to book a spa.
     */
    comparison: {
      heading: 'Sports massage or a spa massage',
      intro:
        'Both are an hour of hands on work and the names sound interchangeable, so it is worth being plain about where they differ. One is aimed at how you feel while you are on the table. The other is aimed at what put you there.',
      columns: ['Sports massage here', 'A spa massage'],
      rows: [
        {
          label: 'Who does it',
          a: 'A chiropractor or a physiotherapist, depending on what the assessment finds.',
          b: 'A massage therapist, usually with no clinical assessment beforehand.',
        },
        {
          label: 'What happens first',
          a: 'You are assessed. How the area moves, and what has been loading it, before anyone puts hands on you.',
          b: 'You choose from a menu, usually by duration and pressure.',
        },
        {
          label: 'What the hour is aimed at',
          a: 'The tissue that is actually limiting you, and the reason it got that way.',
          b: 'General relaxation and overall muscle tension.',
        },
        {
          label: 'What you leave with',
          a: 'An answer on whether massage alone is enough, and what else the area needs if it is not.',
          b: 'A looser, calmer hour, and you book again when you feel like it.',
        },
      ],
      note: 'Neither one is better than the other, and if what you want is a quiet hour then a spa is the right call. The difference is what the hour is for. If the same area tightens back up within a few days, the useful question is what keeps loading it, and that is the part an assessment answers rather than the massage itself.',
    },
    fitCheck: {
      rightFor: [
        'You want the tight area assessed before anyone works on it.',
        'You want to be told plainly whether massage is the right thing for what you have.',
        'You want the work aimed at what your training or your desk is actually doing to you.',
        'You are willing to hear that the area needs strength work more than another session.',
      ],
      notRightFor: [
        'You want a relaxing hour with no assessment and no questions asked.',
        'You want massage to stand in for the rehabilitation an injury actually needs.',
        'You want a number of sessions agreed before anyone has looked at you.',
        'The problem may need a medical opinion or imaging first. We would refer you rather than work on it regardless.',
      ],
      note: 'None of that makes you a difficult patient, and the first one is simply what most people mean when they say they want a massage. It means we would rather send you somewhere better suited than sell you an hour that will not hold. If you want the tension looked at properly, a first visit is where that starts.',
    },
    sections: [
      {
        heading: 'Sports massage in Cheras, Kuala Lumpur',
        body: 'Sports massage in Cheras, Maluri, for muscle that has stopped letting go on its own. You do not have to play a sport to book one. Most of the tension we see comes from training weeks, desk weeks and long drives rather than from a pitch, and the approach is the same either way: work out what is loading the area, then work on it.',
      },
      {
        heading: 'Assessing before any hands on work begins',
        body: 'Nothing starts until we have looked at how the area moves, because tight muscle is often guarding something rather than causing it. That also settles whether a sports massage is the right thing for you at all.',
      },
      {
        heading: 'What a sports massage session involves',
        body: 'Sixty minutes of hands on work through the muscle and the tissue around it, at a pressure you can breathe through. We tell you what we are working on and why as we go.',
      },
      {
        heading: 'Shockwave therapy alongside sports massage',
        body: 'Some tissue does not respond to hands alone, particularly a tendon that has grumbled for months. Shockwave adds focused pressure waves at that spot, often in the same visit, where the assessment calls for it.',
      },
      {
        heading: 'What sports massage does, and what it does not',
        body: 'The largest review of sports massage found no evidence it makes you stronger or faster, and small real gains in flexibility and soreness. Useful for tight muscle, not a performance upgrade.',
      },
      {
        heading: 'When rehabilitation matters more than another massage',
        body: 'If the same area tightens back up within days of every session, something is still loading it. That does not change on a table, so we would point you at staged rehabilitation instead.',
      },
    ],
    helpsWith: ['back-pain', 'neck-pain', 'hip-pain', 'shoulder-imbalance'],
    relatedLinks: [
      { href: '/services/sports-injury-rehabilitation', label: 'Sports injury and rehabilitation' },
      { href: '/services/physiotherapy', label: 'Physiotherapy in Cheras' },
      { href: '/services/dry-needling', label: 'Dry needling for muscle that stays tight' },
    ],
    faqs: [
      {
        q: 'Is sports massage the same as a normal massage?',
        a: 'No. The hands on work can look similar, but a sports massage here follows an assessment and is aimed at a specific area for a specific reason rather than at general relaxation. It is also carried out by a chiropractor or a physiotherapist rather than by a spa therapist. Where a muscle has stayed tight for months and will not release under hands, we may suggest dry needling alongside it.',
        links: [{ phrase: 'dry needling', href: '/services/dry-needling' }],
      },
      {
        q: 'Does sports massage hurt?',
        a: 'Some of it can be uncomfortable, particularly over tissue that has been guarding for a long time, but it should never be more than you can breathe through. Pressure is set to your tolerance and adjusted as we go, so say when it is too much. It is common to feel a little tender for a day afterwards in the way you would after a hard session, and that usually settles on its own.',
      },
      {
        q: 'How often should I book a sports massage?',
        a: 'It depends on what the assessment finds and on what you are asking your body to do, so we will not put a schedule in front of you on the first visit. Someone in a heavy training block may want one regularly; someone whose tension comes from a desk often does better with fewer sessions and a change to how they sit and move. If the same area tightens back up within days every time, that is a sign the answer is not more frequent massage.',
      },
      {
        q: 'Should I have a sports massage before or after an event?',
        a: 'Both are done, and they are different things. Work before an event is shorter and lighter, aimed at getting you moving comfortably rather than at changing anything. Work after an event is aimed at the soreness and stiffness once the hard effort is over. What we would not suggest is a deep session the day before something you care about, because tissue can feel tender afterwards and that is not the state you want to start in.',
      },
      {
        q: 'Do I need to play a sport to book a sports massage?',
        a: 'No, and a good share of the people who book one do not. The name describes the style of work rather than who it is for. Desk tension through the neck and shoulders, a lower back that tightens after a long drive, and general stiffness from sitting all week are all common reasons to come in. If what you have is a specific injury rather than tension, sports injury rehabilitation is usually the better starting point.',
        links: [
          { phrase: 'sports injury rehabilitation', href: '/services/sports-injury-rehabilitation' },
        ],
      },
      {
        q: 'Who carries out the sports massage?',
        a: 'Either a chiropractor or a physiotherapist, depending on what the assessment finds and what the area needs. Both are registered practitioners rather than spa therapists, and the person who assesses you is the person who does the work. Our physiotherapists are not named on the site yet, which is a decision about their probation period rather than anything about their qualifications, and you are welcome to ask about the registration of whoever you see.',
      },
    ],
    /**
     * Set because BOTH professions deliver this one (client, 2026-09-03), and `practitioners`
     * in lib/clinic.ts holds chiropractors only. A block headed "Meet your chiropractors" on a
     * page a physiotherapist may well deliver would name the wrong half of the answer, which is
     * the same misrepresentation the physiotherapy page avoids. The FAQ answers the question
     * this section would otherwise answer, honestly and without a name.
     */
    practitionersWithheld:
      'Sports massage and shockwave are delivered by either a chiropractor or a physiotherapist depending on the presentation (client, 2026-09-03), and the physiotherapists cannot be named while they are within their probation period. Naming only the chiropractors here would imply they are the only people who deliver this.',
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
    /**
     * Photographs rather than the five SVG diagrams, which retires the last diagram set on
     * the site. Each was commissioned for the card it sits on, so unlike sports injury
     * nothing here is borrowed from another page.
     *
     * Row rhythm matches the other service pages: the two symptom frames carry the warm
     * glow, and the three that describe a shape or an answer — forward head, workstation,
     * strength work — deliberately do not.
     *
     * The forward-head frame keeps its red plumb line. A single panel showing where the head
     * sits relative to the line DESCRIBES the concern; it is the before/after pair in
     * `before-after-posture.webp` that would read as an outcome claim, which is why that
     * image is not used here.
     *
     * ⚠️ ALT TEXT CARRIES NO LOCAL MODIFIER, for the same reason recorded on the dry
     * needling, physiotherapy and sports injury outcomes: these are stock and composite
     * images, not photographs of this clinic, these practitioners or these patients.
     */
    outcomes: [
      {
        text: 'Neck and shoulder tension that builds up over a day at a desk',
        image: {
          src: '/img/posture-desk-tension.webp',
          alt: 'Illustration of neck and shoulder muscles lit up on a man squeezing his neck at a desk in the evening',
        },
      },
      {
        text: 'A forward head or rounded shoulders you have noticed',
        image: {
          src: '/img/posture-forward-head.webp',
          alt: 'Side profile of a standing man whose head sits forward of a red vertical reference line, with rounded shoulders',
        },
      },
      {
        text: 'Stiffness that eases when you move and returns when you sit',
        image: {
          src: '/img/posture-sitting-stiffness.webp',
          alt: 'Illustration of lower back pain lit up on a woman easing her back as she stands from a desk',
        },
      },
      {
        text: 'Practical workstation changes you will actually keep',
        image: {
          src: '/img/posture-workstation.webp',
          alt: 'Man adjusting the height of his monitor at a home office desk beside an ergonomic chair',
        },
      },
      {
        text: 'Strength work to hold a better position without thinking about it',
        image: {
          src: '/img/posture-hold-position.webp',
          alt: 'Woman pulling a resistance band apart at chest height in a bright exercise room',
        },
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
    /**
     * "sit posture correction" runs 390/mo in Malaysia at competition 0.07, the highest volume
     * and the softest competition of any service page here, and the intent leans informational
     * rather than navigational. So these answer what to actually DO, which is what that
     * searcher wants, and none of them repeats one of the five FAQs below.
     */
    citations: [
      {
        claim:
          'Contemporary physiotherapy research questions the idea of a single correct posture and emphasises movement and variation instead.',
        source: 'O’Sullivan et al., research on posture and back pain',
        url: 'https://bjsm.bmj.com/content/54/12/698',
      },
      {
        claim:
          'Prolonged static sitting is associated with musculoskeletal discomfort, and regular movement breaks are commonly advised.',
        source: 'Chartered Society of Physiotherapy guidance',
        url: 'https://www.csp.org.uk/public-patient/keeping-active-healthy',
      },
    ],
    fitCheck: {
      rightFor: [
        'You want to know which parts of your posture can realistically change and which cannot.',
        'You are willing to do strength and mobility work rather than rely on a brace.',
        'You want workstation changes you can actually keep up through a working day.',
        'You want the assessment to decide which exercises apply to you, not a generic list.',
      ],
      notRightFor: [
        'You want a permanently perfect posture that holds itself with no ongoing effort.',
        'You want a number of visits quoted before anyone has looked at how you actually move.',
        'You want a brace or a gadget instead of the strength and habit work that holds a position.',
        'You have a structural curve such as scoliosis and want it reversed. Care can help with comfort and movement; the curve itself stays as it is.',
      ],
      note: 'None of that makes you a difficult patient. It means what you are hoping for and what posture work can honestly do are two different things, and we would rather be plain about that before you pay for anything. What does tend to respond is comfort, endurance and how long you can hold a better position before it takes effort, and a first visit is where we work out which of those applies to you.',
    },
    sections: [
      {
        heading: 'Posture correction in Cheras',
        body: 'Posture work for desk workers in Cheras. We assess how you actually sit and move, then combine strength work with practical workstation changes so that a better position becomes sustainable instead of something you have to keep remembering. Most of the people we see for this spend their day at a screen.',
      },
      {
        heading: 'Postural assessment',
        body: 'We look at how you sit, stand and move, not a single photograph. How you hold up through a working day tells us more than thirty seconds in clinic. We also check where strength and mobility fall short.',
      },
      {
        heading: 'Forward head and rounded shoulders',
        body: 'The pattern we see most in desk workers is the head drifting forward and shoulders rounding in, usually with a stiff upper back behind it. It builds up over years at a screen, not overnight. What matters is which bits are tight, weak, or just habit.',
      },
      {
        heading: 'Sitting posture and workstation setup',
        body: 'Practical changes to chair height, screen position and desk setup, based on how you actually work. Most desk related complaints come from holding one position too long, so moving regularly matters more than finding the perfect posture.',
      },
      {
        heading: 'Corrective exercise',
        body: 'Targeted strength and mobility work for the muscles that hold a position over the day. No single approach changes posture alone, so the exercise carries the work between visits. It does not need to be long, just regular.',
      },
      {
        heading: 'What posture work can and cannot change',
        body: 'To be plain: comfort and endurance usually improve, and holding a better position gets easier over time. What we cannot do is promise to straighten a fixed structure or a permanent posture. Your practitioner will tell you what is realistic for you.',
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
        a: 'Not in the way most people mean it. Comfort and endurance often improve, and people tend to find they can hold a better position for longer before it starts to feel like effort. What no course of care can promise is to permanently reshape a fixed structure or hand you a perfect posture that holds itself. We would rather be plain about that and focus on the parts that genuinely respond, which are usually strength, mobility and habit, so your practitioner will tell you honestly what is likely to shift in your case and what is not.',
      },
      {
        q: 'I sit at a desk all day. Is that the cause?',
        a: 'Prolonged sitting is a common contributor, though rarely the only one. For most desk related complaints the trouble comes from holding any one position for too long rather than from a single wrong posture, so moving regularly tends to matter more than finding a perfect setup. We combine practical workstation changes with strength work, because the position you can hold through a working day is the one that counts.',
        links: [{ phrase: 'strength work', href: '/services/physiotherapy' }],
      },
      {
        q: 'Which exercises help with forward head posture and rounded shoulders?',
        a: 'Four come up most often. A chin tuck, drawing the chin straight back rather than tipping it down, works the deep neck flexors that hold the head over the shoulders. A doorway chest stretch opens the pectoral muscles that pull the shoulders forward. Wall angels, sliding the arms up a wall with the back flat against it, ask the upper back to extend and the shoulder blades to move. An upper trapezius stretch eases the neck to shoulder tension that builds through a day at a screen. These are common starting points rather than a prescription, and which of them apply to you, in what order and how often, is exactly what the assessment is for.',
        links: [{ phrase: 'what the assessment is for', href: '/what-to-expect' }],
      },
      {
        q: 'Is my chair to blame?',
        a: 'Rarely on its own. Time spent in one position tends to matter more than the chair, and an expensive chair you sit still in for four hours is not a fix. Get the setup roughly right, then move regularly.',
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
      {
        q: 'How often should I get up if I sit all day?',
        a: 'Roughly every thirty minutes is the usual advice, and standing for a moment counts. The point is not the number, it is that no position is meant to be held for hours, and a short break taken often tends to beat a long one taken rarely. Setting a recurring reminder works better for most people than relying on noticing.',
      },
      {
        q: 'I work from home on a laptop. Can you help with that?',
        a: 'Yes, and laptops are one of the most common setups we see. The usual starting points are simple: the top of the screen near eye level so the neck is not held in flexion all day, elbows at about a right angle with the shoulders down rather than shrugged, feet on the floor or a footrest, and the screen about an arm length away. A laptop makes that combination impossible on its own, because the screen and the keyboard want to be in two different places, so the fix is usually a stand plus a separate keyboard, or an external monitor. Tell us what you actually work on and where you sit, because advice built around a desk you do not have is not much use.',
      },
    ],
    draft: false,
  },
]

export const publishedServices = () => services.filter((s) => !s.draft)
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
/** Services rendered by app/services/[slug]/page.tsx — excludes hand-built routes. */
export const templatedServices = () => publishedServices().filter((s) => !s.dedicatedRoute)

/** Locale dispatch — see the matching comment in `lib/conditions.ts` for the rationale. */
const servicesByLocale: Record<Locale, Service[]> = {
  en: services,
  zh: servicesZh,
  ms: servicesMs,
}

export const servicesFor = (locale: Locale) => servicesByLocale[locale]
export const publishedServicesFor = (locale: Locale) => servicesFor(locale).filter((s) => !s.draft)
export const serviceBySlugFor = (locale: Locale, slug: string) =>
  servicesFor(locale).find((s) => s.slug === slug)
export const templatedServicesFor = (locale: Locale) =>
  publishedServicesFor(locale).filter((s) => !s.dedicatedRoute)
