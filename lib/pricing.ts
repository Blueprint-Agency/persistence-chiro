/**
 * Published prices.
 *
 * Pricing was deliberately absent from this site until 2026-09-03, on volume grounds: every
 * pricing keyword measured between 0 and 50/mo in Malaysia. That finding has not changed and
 * this module does not overturn it — nothing here is expected to rank. It is a CONVERSION and
 * AEO decision, taken by the client: assistants get asked what a chiropractor costs in KL
 * constantly, competitors answer ("from RM150" sits in Ian The Chiro's title tag) and we did
 * not. See OPEN-ITEMS.md § 8.
 *
 * ONLY BUNDLES ARE PUBLISHED. The clinic has a full internal price list — shockwave at RM120
 * a session, RM340 for three, RM560 for five; sports massage RM120 an hour — and has asked
 * that none of it go on the site (client, 2026-09-03). Do not add standalone prices here
 * "for completeness"; the omission is the instruction.
 *
 * ⚠️ `compareAt` IS AN ARITHMETIC CLAIM, NOT A HEADLINE. It must equal the sum of `lines`,
 * and `content.test.ts` asserts exactly that. The client's own artwork shipped with a
 * "total worth RM650" over components adding to RM660, which is the kind of error nobody
 * spots by reading and everybody spots on an invoice. The clinic confirmed RM660 on
 * 2026-09-03. Change a line price and the total moves with it, or the test fails.
 *
 * ⚠️ The artwork also reads "Initial Consultation, Treatment". The banned word, on a graphic
 * a patient sees. Copy here is written from scratch rather than transcribed, and the poster
 * itself must never be dropped onto a page as an image — see AGENTS.md § Non-negotiables.
 */
import type { Locale } from './i18n.ts'
import { bundlesZh } from './pricing.zh.ts'
import { bundlesMs } from './pricing.ms.ts'

/** One component of a bundle, at the price it is sold for on its own. */
export type BundleLine = { label: string; price: number }

/**
 * Offers rendered as one row rather than one card each. The key doubles as the row's anchor
 * and as the dictionary suffix for its heading (`offersGroupYoga*`), so adding a group means
 * adding the key here, the three dictionary strings, and nothing else.
 */
export type BundleGroup = 'yoga' | 'house-call'

export type Bundle = {
  slug:
    | 'chiro-physio'
    | 'electromodalities-sports-massage'
    | 'physio-yoga'
    | 'yoga-drop-in'
    | 'yoga-pack-3'
    | 'yoga-pack-6'
    | 'house-call-3'
    | 'house-call-5'
  /** Small caps label above the heading — what kind of offer this is. */
  eyebrow: string
  /** The <h2>. */
  name: string
  /**
   * One or two sentences under the heading, for a bundle whose name does not say what is in
   * it. "Electromodalities" names a category, not a thing, so the card lists what the category
   * can include (client, 2026-09-12). "Can include", never "includes": which modality is used
   * is decided at the assessment, and a list read as a promise of all five would be a claim the
   * clinic is not making. Omit it when the name and the line items already say everything.
   */
  description?: string
  /** What the visitor pays. */
  price: number
  /**
   * The struck-through comparison. MUST equal the sum of `lines` — see the header warning.
   * This is a price-reduction claim and the clinic is the regulated party standing behind it,
   * so it may only ever be the total of prices the clinic genuinely charges separately.
   *
   * SET IT EQUAL TO `price` when the card is a single item at its own rate rather than a set
   * sold below the sum of its parts — the yoga drop in class is one. `BundleOffer` then drops
   * the struck total and the savings badge instead of printing "worth RM55, save RM0 (0% off)",
   * which is what a card with nothing to compare would otherwise say. Do not invent a higher
   * `compareAt` to make a card look like the others.
   */
  compareAt: number
  lines: readonly BundleLine[]
  /**
   * One or two sentences on who the offer is for, rendered under the card on /offers only.
   * It says who, never what will happen to them: no outcome, no promise, the same claim rule
   * every other published field follows.
   */
  who: string
  /**
   * The photograph filling the card's second column.
   *
   * ALT TEXT DESCRIBES THE FRAME, NEVER THE OFFER — same rule the service heroes follow. A
   * price card is the most tempting place on the site to write alt text that sells, and it is
   * the one place a screen-reader user would be told something the sighted reader cannot see.
   * Local modifier belongs in it (AGENTS.md § Non-negotiables), the sales pitch does not.
   */
  image: {
    src: string
    alt: string
    /**
     * `object-position` for the crop, when centring cuts the wrong thing. A grouped row's card
     * shows the photograph as a short wide banner, and a frame with its subjects in the upper
     * third loses their heads entirely to a centred crop — which is what both house call photos
     * did on the day they were carded.
     *
     * A property of the PHOTOGRAPH, not of the locale, so the same value has to be set on every
     * locale's copy of this record. `content.test.ts` asserts prices match across locales but
     * says nothing about this, so check by eye when you add a frame.
     */
    objectPosition?: string
  }
  /**
   * Service slugs this offer belongs to. Two jobs: the service page renders the card (unless
   * `offersPageOnly`), and /offers links each card to those pages under "Read more about".
   */
  services: readonly string[]
  /**
   * Offers that belong together on /offers. A group renders as one heading over a row of
   * compact cards instead of one full-width card each — the client asked for that on
   * 2026-09-22, once the three yoga prices made five full-width cards out of what a reader
   * reads as a single choice ("which yoga option?"). Ungrouped bundles keep the wide card.
   *
   * A group is a set of prices for ONE thing that a visitor picks between. Do not reach for
   * it to tidy a long page: the chiro and the sports bundles are separate decisions and each
   * still earns its own card and its own photograph.
   */
  group?: BundleGroup
  /**
   * True when the card belongs on /offers but NOT on its service page, because that page
   * already publishes the same figures another way. The yoga cards set it: the yoga page
   * carries the full `priceList` (fees, the Saturday timetable and private sessions), and a
   * bundle card above it would state the same three prices a second time and give the hero
   * two competing price links. `bundleForService` filters these out; /offers does not.
   */
  offersPageOnly?: boolean
  /**
   * True when the offer exists only for people who arrive through the website. BOTH bundles
   * are (client, 2026-09-03).
   *
   * This flag was removed earlier the same day and is deliberately back. The objection then was
   * duplication: the eyebrow already read "Website only", so a badge saying it again printed the
   * same two words twice. That objection died when the second bundle turned out to be
   * website-only as well, because the two facts a reader needs are no longer the same fact.
   * `eyebrow` now says WHAT KIND of bundle it is, which for the RM588 is an eligibility rule a
   * returning patient must not miss, and the badge says WHERE it is available. Different facts,
   * different slots, no duplication.
   *
   * Do not collapse them back into one line. Dropping "new patient" would invite a returning
   * patient to claim a first-visit price, and dropping the badge would hide the exclusivity that
   * is the whole commercial point: GSC shows the site holding positions 4-11 on its money
   * queries while taking near-zero clicks, because those are local-pack impressions where the
   * tap goes to the Business Profile. An offer that exists nowhere else is a reason to tap the
   * website. It is not a discount; it is a click.
   */
  websiteExclusive: boolean
  /** Same contract `draft` has in lib/posts.ts — withheld pages must say why. */
  draft: boolean
  holdReason?: string
}

/**
 * All figures are whole ringgit, so no decimals. If a price ever lands on sen, change this
 * one function rather than formatting at each call site.
 */
export const ringgit = (amount: number) => `RM${amount}`

/**
 * The saving as a whole percentage. Derived, never typed, and exported so the bundle card and
 * the hero button that points at it cannot end up advertising two different numbers.
 */
export const savingPercent = (bundle: Bundle) =>
  Math.round(((bundle.compareAt - bundle.price) / bundle.compareAt) * 100)

/**
 * The physiotherapy first visit, RM160, shared by the two bundles that contain it: the RM588
 * chiro-and-physio and the RM188 physio-and-yoga.
 *
 * ONE OBJECT, NOT TWO COPIES, on purpose. The RM188 card shipped on 2026-09-23 describing this
 * as "Physiotherapy initial assessment" because that is all the client wrote when they sent the
 * bundle; they confirmed the same day it is the same product the RM588 sells. Two hand-typed
 * copies of one line is exactly the drift `compareAt` is asserted against, except a wording
 * drift no arithmetic test can catch — a reader comparing the two cards would find the site
 * selling RM160 as two different things. Reference this; do not retype it.
 */
/**
 * The house call initial assessment, RM190, shared by both house call packages. One object for
 * the reason `physioFirstVisit` is one: two hand-typed copies of a line drift in wording while
 * every arithmetic guard stays green. The note that it includes the first hands-on session is
 * the clinic's own, from the `priceList` on lib/services.ts, and belongs wherever RM190 appears.
 */
const houseCallAssessment = {
  label: 'Initial assessment, including the first hands-on session',
  price: 190,
} as const

const physioFirstVisit = {
  label: 'Physiotherapy initial assessment, first hands-on session and a home exercise programme',
  price: 160,
} as const

export const bundles: Bundle[] = [
  {
    slug: 'chiro-physio',
    eyebrow: 'New patient bundle',
    name: 'Chiropractic and physiotherapy, together',
    price: 588,
    compareAt: 660,
    lines: [
      { label: 'Chiropractic initial consultation and first adjustment', price: 310 },
      { label: 'X-ray', price: 190 },
      physioFirstVisit,
    ],
    who: 'New patients whose pain has been around a while and has never been assessed. The chiropractor assesses and adjusts first, then the physiotherapist takes over the strength and movement side.',
    image: {
      src: '/img/first-visit-consultation.webp',
      alt: 'A practitioner supporting a patient’s neck during an assessment at Persistence Chiropractic in Cheras, Kuala Lumpur',
    },
    websiteExclusive: true,
    services: ['chiropractic-care', 'physiotherapy'],
    draft: false,
  },
  {
    slug: 'electromodalities-sports-massage',
    eyebrow: 'Sports recovery bundle',
    /**
     * Renamed from "Shockwave therapy and sports massage" on 2026-09-12 at the client's request.
     * The session is no longer shockwave by definition: it is whichever modality the assessment
     * calls for, and shockwave is one of five. The price and the line total did not move.
     */
    name: 'Electromodalities and sports massage',
    description:
      'Electromodalities is the tool-assisted part of the session. Depending on what the assessment finds, it can include cupping, a heat pack, ultrasound, shockwave or taping.',
    price: 200,
    compareAt: 240,
    lines: [
      { label: 'Electromodalities, one session', price: 120 },
      { label: 'Sports massage, 60 minutes', price: 120 },
    ],
    who: 'People who train hard, or carry an old niggle that keeps coming back. It is for sore tendons and tight soft tissue, and you do not need to be a new patient.',
    /**
     * Shows one of the modalities being sold (shockwave), as of 2026-09-03. It replaced a
     * shoulder-mobility frame, which in turn replaced this page's own hero; neither depicted any
     * of them. Still the right frame after the 2026-09-12 rename: shockwave is on the list.
     *
     * ⚠️ AI GENERATED, SO THE ALT CLAIMS NO LOCATION. Not a photograph of this clinic, these
     * practitioners or these patients. Naming Cheras here would be a claim about a room that
     * does not exist, and this card sells something for money, which is the worst place on the
     * site to imply provenance it does not have. Swap in a real photograph when one exists.
     *
     * Portrait on purpose. The card crops with object-cover, so the tall frame fills the
     * desktop column and centre-crops to a wide strip on mobile, where the applicator and the
     * leg sit in the middle band.
     */
    image: {
      src: '/img/shockwave-session.webp',
      alt: 'Gloved clinician holding a shockwave applicator against a patient lower leg',
    },
    websiteExclusive: true,
    services: ['sports-massage', 'sports-injury-rehabilitation'],
    /**
     * LIVE from 2026-09-03, and the claim path is the WhatsApp message itself.
     *
     * This was held while the clinic had not said how a visitor claims a website-only price at
     * the counter. What resolved it is that the card's only CTA is a prefilled WhatsApp message
     * naming the bundle and the price (`waMessage.bundle`), which reaches the clinic BEFORE the
     * patient arrives and is itself the evidence they came through the site. So the page invents
     * no code, no voucher and no process the front desk has not agreed to.
     *
     * Terms per the client, 2026-09-03: **no expiry date, one per person.** Both are recorded
     * here and DELIBERATELY NOT RENDERED, at the client's direction the same day. Do not add
     * them back to the card as a helpful clarification; it has already been removed once. The
     * per-person cap is handled at the counter instead, which means the front desk has to know
     * the offer exists, and that is the one failure mode no markup on this page prevents.
     */
    draft: false,
  },
  /**
   * PHYSIO ASSESSMENT + ONE YOGA CLASS, RM188, added 2026-09-23 from the client's figures:
   * RM160 + RM55 = RM215, sold at RM188, "patient saves RM27". The arithmetic is theirs and
   * it checks out; `content.test.ts` holds it either way.
   *
   * A WIDE CARD, NOT A FOURTH COLUMN IN THE YOGA ROW, although the client called it a yoga
   * bundle. The row is one decision priced three ways (how often will I come to class?) and
   * this is a different decision entirely: it pairs two services from two disciplines, which
   * is exactly what the RM588 and the RM200 cards do. A fourth column would also orphan
   * itself on a three-up grid. It sits last of the wide cards so it leads into the yoga row.
   *
   * THE RM160 LINE MATCHES THE RM588 CARD'S WORD FOR WORD, and must keep matching. The client
   * wrote only "Physiotherapy Initial Assessment" when they sent this bundle, so it shipped
   * narrow on 2026-09-23 and was widened the same day once they confirmed it is the same RM160
   * product the RM588 card sells. One price, one scope, one sentence describing it: if that
   * sentence ever changes, change it in both places or the site sells RM160 as two things.
   *
   * THE TWO-MONTH TERM IS RENDERED, in `description`. That is not a reversal of the
   * "deliberately NOT rendered" terms on the RM588 and RM200 cards: those were "no expiry"
   * and "one per person", one of which is generous and the other enforced at the counter.
   * This one is a restriction the buyer has to plan around, the yoga packs on this same page
   * already print their validity periods, and a redemption window a patient discovers after
   * paying is the kind of surprise this site exists not to create.
   */
  {
    slug: 'physio-yoga',
    /**
     * An eligibility line, like "New patient bundle" is on the RM588. Confirmed twice by the
     * client on 2026-09-23, the second time settling who exactly it excludes: "yes for first
     * physio visit, a person can come for chiro treatment but never have physio + yoga will
     * qualify for this web-only promo".
     *
     * So it is NOT new-patients-only, and it must not drift into saying so. An existing
     * chiropractic patient qualifies; what has to be new is the physiotherapy and the yoga.
     * That is wider than the RM588's "New patient bundle" and is the whole point of this card
     * — it is the one offer the clinic's existing patients can still claim. `who` says it in
     * the reader's words, because a label alone cannot carry a condition this specific.
     */
    eyebrow: 'First physio visit',
    name: 'Physiotherapy assessment and a yoga class',
    description: 'Both parts to be used within two months of claiming the offer.',
    price: 188,
    compareAt: 215,
    lines: [
      physioFirstVisit,
      { label: 'One yoga class, Chair Yoga or Posture Core Yoga', price: 55 },
    ],
    who: 'Someone new to physiotherapy who also wants to try a class. The assessment comes first. Already seeing us for chiropractic does not rule you out, as long as the physiotherapy and the yoga are both new to you.',
    /**
     * A real photograph of this clinic, so the alt carries the local modifier. Shared with the
     * physiotherapy service page, which is the half of this bundle a visitor is least likely
     * to have seen. No yoga frame here: the assessment is the part that leads.
     */
    image: {
      src: '/img/therapy-neck.webp',
      alt: 'Physiotherapist working on a seated patient neck and shoulder at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    websiteExclusive: true,
    services: ['physiotherapy', 'yoga-classes'],
    /**
     * /services/physiotherapy would show the RM588 card anyway (`bundleForService` takes the
     * first match and chiro-physio is listed earlier), so nothing is lost there. The yoga page
     * is the one this would change: it would gain a wide bundle card and its hero button would
     * swap from "See class fees and times" to the bundle anchor, demoting the fee table that
     * page was built around. Rendering it there is a live option — ask the client — but it is
     * a bigger change than "put it on the offers page".
     */
    offersPageOnly: true,
    draft: false,
  },
  /**
   * THE THREE YOGA CARDS, added 2026-09-22 at the client's request ("include the yoga bundle
   * inside the offer page too"). One card per price on the client's 2026-09-12 price list, at
   * their direction: the drop in, the pack of three and the pack of six.
   *
   * NOT WEBSITE ONLY, confirmed with the client the same day. The packs came off a printed
   * price list at the clinic and a walk-in can buy them, so `websiteExclusive` is false and no
   * badge renders. That is also why /offers no longer calls itself "website-only offers" —
   * three of its five cards are not. Do not add the badge back to make the row look uniform.
   *
   * THE COMPARISON IS THE DROP IN FEE, which is the only honest one available: a pack of three
   * is three classes the clinic genuinely sells at RM55 each. The drop in card compares against
   * nothing, so its `compareAt` equals its `price` and the card renders without a saving.
   *
   * `offersPageOnly` keeps all three off /services/yoga-classes, which already publishes these
   * figures in its `priceList` along with the timetable and the private session line.
   *
   * Photographs are the client's own, of real classes in the clinic's yoga room, and the alt
   * text is lifted verbatim from the matching frames in lib/services.ts.
   */
  {
    slug: 'yoga-drop-in',
    eyebrow: 'Single class',
    name: 'Yoga drop in class',
    description:
      'One class, paid on the day. Chair Yoga and Posture Core Yoga alternate on Saturdays at 4:00pm, so message us to check which one is on before you come.',
    price: 55,
    compareAt: 55,
    lines: [{ label: 'One yoga class, Chair Yoga or Posture Core Yoga', price: 55 }],
    who: 'Anyone who wants to try a class before buying a pack, or who can only make the odd Saturday. No experience needed, and you do not have to be a patient of the clinic.',
    image: {
      src: '/img/yoga-chair-side-stretch.webp',
      alt: 'A smiling woman seated on a folding chair with her feet on yoga blocks, reaching one arm overhead in a side stretch, during a chair yoga class at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    websiteExclusive: false,
    services: ['yoga-classes'],
    offersPageOnly: true,
    group: 'yoga',
    draft: false,
  },
  {
    slug: 'yoga-pack-3',
    eyebrow: 'Pack of 3 classes',
    name: 'Yoga pack of three classes',
    description:
      'For one person, valid two months from the first class. Use it on Chair Yoga, Posture Core Yoga, or a mix of the two.',
    price: 138,
    compareAt: 165,
    lines: [{ label: 'Three drop in classes at RM55 each', price: 165 }],
    who: 'Someone ready to start but not ready to book out three months. One person only, so it does not stretch to a friend.',
    image: {
      src: '/img/yoga-class-side-angle.webp',
      alt: 'Students in a wide standing lunge with one arm reaching overhead, each beside a folding chair, during a yoga class at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    websiteExclusive: false,
    services: ['yoga-classes'],
    offersPageOnly: true,
    group: 'yoga',
    draft: false,
  },
  {
    slug: 'yoga-pack-6',
    eyebrow: 'Pack of 6 classes',
    name: 'Yoga pack of six classes',
    description:
      'Can be shared between two people, valid three months. Use it on Chair Yoga, Posture Core Yoga, or a mix of the two.',
    price: 248,
    compareAt: 330,
    lines: [{ label: 'Six drop in classes at RM55 each', price: 330 }],
    who: 'Regulars, and pairs who want to come together, since two people can use the one pack. It works out cheapest per class of the three.',
    image: {
      src: '/img/yoga-class-group.webp',
      alt: 'Seven smiling students posing for a group photo after a yoga class at Persistence Chiropractic Care in Cheras, Kuala Lumpur, with a silver yoga figurine and shelves of props behind them',
    },
    websiteExclusive: false,
    services: ['yoga-classes'],
    offersPageOnly: true,
    group: 'yoga',
    draft: false,
  },
  /**
   * THE TWO HOUSE CALL PACKAGES, added 2026-09-23 at the client's request — they sent a picture
   * of the electromodalities card and asked for the house call "in this format too". Until then
   * the house call was the one price on this page that was a bare link rather than a card, in
   * the "Also priced on this site" section, which is what they were really objecting to. That
   * section now has nothing left to list and stops rendering; its job moved to the "Read more
   * about" link under each row. This closes item 10.3 in OPEN-ITEMS.md, open since 2026-09-12.
   *
   * A GROUPED ROW, NOT TWO WIDE CARDS, though the card they pointed at is a wide one. Three and
   * five visits of the same service is one decision priced two ways, the same shape as the yoga
   * packs, and as wide cards they would be near-identical twins a full screen apart — same
   * photograph, same sentence, two numbers different. Side by side is where a three-versus-five
   * comparison belongs. Every claim the wide card makes is still on them.
   *
   * NOT WEBSITE-ONLY: this is the clinic's published rate card, not a web offer, so no badge.
   *
   * THE ROW'S INTRO CARRIES WHAT BOTH CARDS SHARE — female patients only, no travel charge
   * within 10 km, six weeks — so neither `who` has to repeat it. Female patients only is an
   * eligibility fact, not a detail: do not let it slide out of the intro.
   *
   * Per-visit fees (assessment RM190, follow-up RM180, travel) stay on the service page's
   * `priceList`, which is why these set `offersPageOnly`.
   */
  {
    slug: 'house-call-3',
    eyebrow: 'Package of 3 visits',
    name: 'Three house call visits',
    description: 'The initial assessment plus two follow-up visits, used within six weeks.',
    price: 510,
    compareAt: 550,
    lines: [
      houseCallAssessment,
      { label: 'Two follow-up rehab visits at RM180 each', price: 360 },
    ],
    who: 'Someone who wants rehab at home and would rather start with three visits than commit to five.',
    /**
     * ⚠️ AI GENERATED, SO THE ALT CLAIMS NO LOCATION — the same rule the house call page itself
     * follows. Not this clinic, these physiotherapists or these patients, and this card sells
     * something for money, which is the worst place on the site to imply provenance it does not
     * have. Alt text lifted verbatim from the matching frame in lib/services.ts.
     */
    image: {
      src: '/img/physio-house-call-hero.webp',
      alt: 'Physiotherapist standing behind a seated woman at home, hands on her shoulders, as she holds a resistance band out in front of her',
      // Subjects sit in the upper third; a centred banner crop takes both heads off.
      objectPosition: 'top',
    },
    websiteExclusive: false,
    services: ['physiotherapy-house-call'],
    offersPageOnly: true,
    group: 'house-call',
    draft: false,
  },
  {
    slug: 'house-call-5',
    eyebrow: 'Package of 5 visits',
    name: 'Five house call visits',
    description: 'The initial assessment plus four follow-up visits, used within six weeks.',
    price: 840,
    compareAt: 910,
    lines: [
      houseCallAssessment,
      { label: 'Four follow-up rehab visits at RM180 each', price: 720 },
    ],
    who: 'Someone with a longer-standing problem who already knows three visits will not be enough.',
    /** AI generated, so no location in the alt. See the note on the package of three. */
    image: {
      src: '/img/physio-house-call-rehab.webp',
      alt: 'Physiotherapist kneeling beside a woman on an exercise mat in a living room, guiding her through a bridge exercise',
      // Subjects sit in the upper third; a centred banner crop takes both heads off.
      objectPosition: 'top',
    },
    websiteExclusive: false,
    services: ['physiotherapy-house-call'],
    offersPageOnly: true,
    group: 'house-call',
    draft: false,
  },
]

const bundlesByLocale: Record<Locale, Bundle[]> = {
  en: bundles,
  zh: bundlesZh,
  ms: bundlesMs,
}

export const bundlesFor = (locale: Locale) => bundlesByLocale[locale]

export const publishedBundlesFor = (locale: Locale) =>
  bundlesFor(locale).filter((b) => !b.draft)

/**
 * The bundle a given service page renders, if any. Absent in a locale means the copy has not
 * been written there yet — the same gate every other content module uses.
 *
 * `offersPageOnly` cards are skipped: they belong to a service whose page already publishes
 * the same figures through its own `priceList`. See the flag on the type.
 */
export const bundleForService = (locale: Locale, serviceSlug: string) =>
  publishedBundlesFor(locale).find((b) => !b.offersPageOnly && b.services.includes(serviceSlug))

/** Every service slug carded on /offers, so that page does not link the same service twice. */
export const servicesWithBundleCard = (locale: Locale) =>
  new Set(publishedBundlesFor(locale).flatMap((b) => b.services))

/** What /offers lays out, in order: a wide card, or a row of them under one heading. */
export type OffersRow =
  | { kind: 'single'; bundle: Bundle }
  | { kind: 'group'; group: BundleGroup; bundles: Bundle[] }

/**
 * `publishedBundlesFor` folded into rows. A group takes the position of its FIRST member, so
 * where a row appears on the page is decided by the order of lib/pricing.ts and nowhere else.
 * Members do not have to be adjacent in the array, though keeping them together reads better.
 */
export const offersRowsFor = (locale: Locale): OffersRow[] => {
  const rows: OffersRow[] = []
  const groups = new Map<BundleGroup, Extract<OffersRow, { kind: 'group' }>>()
  for (const bundle of publishedBundlesFor(locale)) {
    if (!bundle.group) {
      rows.push({ kind: 'single', bundle })
      continue
    }
    const existing = groups.get(bundle.group)
    if (existing) {
      existing.bundles.push(bundle)
      continue
    }
    const row: Extract<OffersRow, { kind: 'group' }> = {
      kind: 'group',
      group: bundle.group,
      bundles: [bundle],
    }
    groups.set(bundle.group, row)
    rows.push(row)
  }
  return rows
}
