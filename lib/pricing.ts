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

export type Bundle = {
  slug: 'chiro-physio' | 'shockwave-sports-massage'
  /** Small caps label above the heading — what kind of offer this is. */
  eyebrow: string
  /** The <h2>. */
  name: string
  /** What the visitor pays. */
  price: number
  /**
   * The struck-through comparison. MUST equal the sum of `lines` — see the header warning.
   * This is a price-reduction claim and the clinic is the regulated party standing behind it,
   * so it may only ever be the total of prices the clinic genuinely charges separately.
   */
  compareAt: number
  lines: readonly BundleLine[]
  /**
   * The photograph filling the card's second column.
   *
   * ALT TEXT DESCRIBES THE FRAME, NEVER THE OFFER — same rule the service heroes follow. A
   * price card is the most tempting place on the site to write alt text that sells, and it is
   * the one place a screen-reader user would be told something the sighted reader cannot see.
   * Local modifier belongs in it (AGENTS.md § Non-negotiables), the sales pitch does not.
   */
  image: { src: string; alt: string }
  /** Service slugs whose page renders this bundle. */
  services: readonly string[]
  /**
   * NO `websiteExclusive` FLAG. The exclusivity lives in `eyebrow` copy and nowhere else.
   *
   * There was a boolean here until 2026-09-03, and its only consumer was a gold "Website only"
   * badge beside the price. Since the eyebrow above the heading already read "Website only", the
   * card printed the same two words twice, which is what the rewrite removed. One offer, one
   * statement of where it exists.
   *
   * The exclusivity is still the commercially interesting part of the shockwave bundle and the
   * reason it was worth building: GSC shows the site sitting at positions 4-11 on its money
   * queries and taking near-zero clicks from them, because those are local-pack impressions
   * where the tap goes to the Business Profile. An offer that exists nowhere else is a reason to
   * tap the website. It is not a discount; it is a click. Say it in the eyebrow, once.
   */
  /** Same contract `draft` has in lib/posts.ts — withheld pages must say why. */
  draft: boolean
  holdReason?: string
}

/**
 * All figures are whole ringgit, so no decimals. If a price ever lands on sen, change this
 * one function rather than formatting at each call site.
 */
export const ringgit = (amount: number) => `RM${amount}`

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
      {
        label: 'Physiotherapy initial assessment, first hands-on session and a home exercise programme',
        price: 160,
      },
    ],
    image: {
      src: '/img/first-visit-consultation.webp',
      alt: 'A practitioner supporting a patient’s neck during an assessment at Persistence Chiropractic in Cheras, Kuala Lumpur',
    },
    services: ['chiropractic-care', 'physiotherapy'],
    draft: false,
  },
  {
    slug: 'shockwave-sports-massage',
    eyebrow: 'Website only',
    name: 'Shockwave therapy and sports massage',
    price: 200,
    compareAt: 240,
    lines: [
      { label: 'Shockwave therapy, one session', price: 120 },
      { label: 'Sports massage, 60 minutes', price: 120 },
    ],
    /**
     * NOT `rehab-ankle.webp`, which this bundle used until it started appearing on
     * `/services/sports-injury-rehabilitation` as well: that photograph is the hero of that
     * page, so the card would have shown the same frame twice on one screen.
     *
     * ⚠️ NO LOCAL MODIFIER IN THE ALT. Unlike the chiro and physio bundle's frame, this one is
     * not confirmed to be a photograph of this clinic, so the alt describes what is in the
     * frame and claims nothing about where it was taken. It is also still not a photograph of
     * shockwave or of sports massage, because none exists. See OPEN-ITEMS.md.
     */
    image: {
      src: '/img/sports-post-surgical.webp',
      alt: 'Clinician guiding a seated man through shoulder range of movement in a clinic room',
    },
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
 */
export const bundleForService = (locale: Locale, serviceSlug: string) =>
  publishedBundlesFor(locale).find((b) => b.services.includes(serviceSlug))
