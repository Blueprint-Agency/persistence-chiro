import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, offersPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { LOCALES, isLocale, pathFor, shortTitle, type Locale } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import {
  offersRowsFor,
  publishedBundlesFor,
  ringgit,
  servicesWithBundleCard,
  type Bundle,
  // Aliased: `BundleGroup` is also the component rendering a grouped row, imported below.
  type BundleGroup as BundleGroupKey,
} from '@/lib/pricing'
import { publishedServicesFor, serviceBySlugFor } from '@/lib/services'
import { BundleOffer } from '@/components/BundleOffer'
import { BundleGroup } from '@/components/BundleGroup'
import { PRICE_LIST_ANCHOR } from '@/components/PriceList'
import { CtaBand, Eyebrow, GhostButton, PageHero } from '@/components/ui'
import { waMessage } from '@/lib/whatsapp'

/**
 * /offers — every published offer in lib/pricing.ts on one page.
 *
 * Built 2026-09-09 at the client's request for "another section where the bundle and
 * packages will be in". Until then a price was reachable only from whichever service page
 * happened to carry its card, which meant the RM588 first-visit offer lived on two pages a
 * new visitor might never open. This page is the one the nav points at.
 *
 * WORDING. The nav label and this page's own chrome say "offer", because the client asked to
 * avoid "pricing", "promotion", "packages" and "bundle" in the menu bar. The cards keep their
 * original "bundle" wording, also at the client's request (2026-09-09). See lib/nav.ts.
 *
 * NOT ALL OF IT IS WEBSITE ONLY, since 2026-09-22. The page opened with two website-exclusive
 * bundles and said so in its h1, its intro and its meta title. The three yoga cards added that
 * day are sold at the counter too (client, same day), so all three of those lines were
 * rewritten to describe what the page holds rather than to promise exclusivity it no longer
 * has across the board. The two that ARE exclusive still say so, once, on their own badge.
 * Do not restore "website-only" to the page furniture while a non-exclusive card is on it.
 *
 * NOTHING HERE IS TYPED TWICE. The cards, the hero jump links, the "who it suits" line, the
 * service links under each card, the meta description's price list and the JSON-LD all read
 * `publishedBundlesFor(locale)`. Add or withdraw an offer in lib/pricing*.ts and this page
 * follows without an edit. The terms the client asked NOT to render (no expiry, one per
 * person) are still not rendered; see the notes in lib/pricing.ts before adding them.
 *
 * Not a ranking play. Every pricing keyword measured 0-50/mo in Malaysia and that finding
 * stands (lib/pricing.ts header). The page exists to convert and to give assistants one URL
 * that answers "how much does a chiropractor in KL cost", which is why the CollectionPage
 * schema carries the Offer nodes themselves rather than bare links.
 */

type Props = { params: Promise<{ locale: string }> }

/**
 * Title and the fixed half of the description. The description's second sentence lists each
 * offer with its price, derived below so a figure can never drift from the card.
 */
const copyFor = (locale: Locale) =>
  ({
    en: {
      title: 'Offers and Prices, Cheras KL: Chiro, Physio, Yoga',
      lead: 'Every offer and published price at Persistence Chiropractic Care in Cheras, Maluri, across chiropractic, physiotherapy and yoga classes.',
      close: 'Message us on WhatsApp to claim one.',
      alsoPriced: 'Also priced on this site',
      alsoPricedBody:
        'Not a set price: a service sold by the visit, with its fees published in full on its own page.',
      seeFees: 'See the fees',
    },
    zh: {
      title: 'Cheras, KL 优惠与收费:脊椎矫正、物理治疗、瑜伽',
      lead: 'Cheras, Maluri 的 Persistence Chiropractic Care 所有优惠与已公布的收费,涵盖脊椎矫正、物理治疗和瑜伽课程。',
      close: '通过 WhatsApp 联系我们即可领取。',
      alsoPriced: '本站其他已公布的收费',
      alsoPricedBody: '这不是配套价:按次收费的服务,收费在它自己的页面上完整公布。',
      seeFees: '查看收费',
    },
    ms: {
      title: 'Tawaran dan Harga, Cheras KL: Kiropraktik, Fisio, Yoga',
      lead: 'Setiap tawaran dan harga yang diterbitkan di Persistence Chiropractic Care, Cheras, Maluri, merangkumi kiropraktik, fisioterapi dan kelas yoga.',
      close: 'Mesej kami di WhatsApp untuk menuntutnya.',
      alsoPriced: 'Yuran lain yang diterbitkan di laman ini',
      alsoPricedBody:
        'Bukan harga pakej: perkhidmatan yang dicaj mengikut lawatan, dengan yurannya diterbitkan penuh di halamannya sendiri.',
      seeFees: 'Lihat yuran',
    },
  })[locale]

/**
 * The price span, derived rather than typed, so it cannot drift from the cards.
 *
 * It used to enumerate every offer by name and price. That read well over two cards and ran to
 * roughly three hundred characters over five, which is a description no engine will show and
 * no assistant needs — the CollectionPage JSON-LD below carries every Offer node with its own
 * price, which is the surface that actually answers "how much does a chiropractor in KL cost".
 * The description now gives the span and leaves the itemisation to the markup.
 */
const describe = (locale: Locale) => {
  const copy = copyFor(locale)
  const prices = publishedBundlesFor(locale).map((b) => b.price)
  const span = {
    en: `From ${ringgit(Math.min(...prices))} to ${ringgit(Math.max(...prices))}.`,
    zh: `收费从 ${ringgit(Math.min(...prices))} 到 ${ringgit(Math.max(...prices))}。`,
    ms: `Dari ${ringgit(Math.min(...prices))} hingga ${ringgit(Math.max(...prices))}.`,
  }[locale]
  return locale === 'zh' ? `${copy.lead}${span}${copy.close}` : `${copy.lead} ${span} ${copy.close}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale

  return pageMetadata({
    title: copyFor(locale).title,
    description: describe(locale),
    path: '/offers',
    locale,
    availableIn: LOCALES.filter((l) => pathExistsIn(l, '/offers')),
  })
}

export default async function OffersPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = await getDictionary(locale)
  // Wide cards and grouped rows, in the order lib/pricing.ts lists them. See `offersRowsFor`.
  const rows = offersRowsFor(locale)

  /** "Read more about X · Y", from a set of service slugs. Shared by both row shapes. */
  const relatedLinks = (slugs: string[]) => {
    const related = [...new Set(slugs)]
      .map((slug) => {
        const s = serviceBySlugFor(locale, slug)
        return s ? { slug, label: shortTitle(locale, s.title) } : null
      })
      .filter((s): s is { slug: string; label: string } => s !== null)
    if (related.length === 0) return null
    return (
      <>
        {dict.page.offersLearnMore}{' '}
        {related.map((s, i) => (
          <span key={s.slug}>
            {i > 0 && (locale === 'zh' ? '、' : ' · ')}
            <Link
              href={pathFor(locale, `/services/${s.slug}`)}
              className="font-semibold text-brand-gold-ink underline underline-offset-4"
            >
              {s.label}
            </Link>
          </span>
        ))}
      </>
    )
  }

  const claimMessage = (b: Bundle) => waMessage.bundle(locale, b.name, ringgit(b.price))

  /**
   * Heading and standfirst per grouped row. One entry per `BundleGroup` key, so adding a group
   * to lib/pricing.ts without its copy is a type error here rather than a blank heading in
   * production. The row's own cards come from the bundles; only these two strings are page copy.
   */
  const groupCopy: Record<BundleGroupKey, { heading: string; intro: string }> = {
    'website-only': {
      heading: dict.page.offersGroupWebsiteOnlyTitle,
      intro: dict.page.offersGroupWebsiteOnlyIntro,
    },
    yoga: { heading: dict.page.offersGroupYogaTitle, intro: dict.page.offersGroupYogaIntro },
    'house-call': {
      heading: dict.page.offersGroupHouseCallTitle,
      intro: dict.page.offersGroupHouseCallIntro,
    },
  }
  // Services priced by the visit (`priceList` on lib/services.ts). Not offers, so they are
  // not cards here and not in the CollectionPage list; they get a link so this page stays the
  // one place every published price can be reached from. Empty in a locale where no such
  // service exists, and the section then does not render.
  //
  // A service that already has a card up the page is excluded: yoga classes has both a
  // `priceList` (the fee table and the Saturday timetable, on its own page) and three cards
  // here, and listing it in both places would put the same RM55 on this page twice under two
  // different headings. The card's "Read more about" link still reaches the full table.
  const carded = servicesWithBundleCard(locale)
  const pricedServices = publishedServicesFor(locale).filter(
    (s) => s.priceList && !carded.has(s.slug),
  )
  const copy = copyFor(locale)

  const steps = [
    { title: dict.page.offersStep1Title, body: dict.page.offersStep1Body },
    { title: dict.page.offersStep2Title, body: dict.page.offersStep2Body },
    { title: dict.page.offersStep3Title, body: dict.page.offersStep3Body },
  ]

  return (
    <>
      <JsonLd
        data={offersPageSchema({
          locale,
          name: copyFor(locale).title,
          description: describe(locale),
        })}
      />
      {/* Single-item trail, matching every other top-level page. */}
      <JsonLd
        data={breadcrumbSchema([{ name: dict.nav.offers, url: pathFor(locale, '/offers') }])}
      />

      <PageHero
        eyebrow={dict.page.offersEyebrow}
        title={dict.page.offersTitle}
        intro={dict.page.offersIntro}
      >
        {/* One jump link per ROW, not per card. A grouped row gets a single chip carrying its
            heading and its lowest price, because three chips reading "Single class RM55",
            "Pack of 3 RM138", "Pack of 6 RM248" made a reader choose before they had seen
            what they were choosing between, and the row itself is where that comparison
            belongs. Ghost rather than gold: the gold ask on this page is the WhatsApp button
            on each card, and a gold button up here would be a second ask before the reader
            has seen what it is for. */}
        <div className="flex flex-wrap gap-3">
          {rows.map((row) =>
            row.kind === 'single' ? (
              <GhostButton key={row.bundle.slug} href={`#${row.bundle.slug}`} tone="light">
                {row.bundle.eyebrow} &middot; {ringgit(row.bundle.price)}
              </GhostButton>
            ) : (
              <GhostButton key={row.group} href={`#${row.group}`} tone="light">
                {groupCopy[row.group].heading} &middot;{' '}
                {dict.page.offersFrom(ringgit(Math.min(...row.bundles.map((b) => b.price))))}
              </GhostButton>
            ),
          )}
        </div>
      </PageHero>

      {/* ---------------------------------------------------------------- Offers */}
      {/* The cards come first: the visitor tapped "Offers" and this is what they came for. The
          claim steps follow, once there is something to claim. Every row ends with links to
          the service pages that explain the parts in depth, which is also how this page joins
          the internal-linking model rather than being a dead end.

          TWO SHAPES, one list. A standalone offer keeps the full-width card with its own
          photograph and its "who it suits" paragraph alongside. A group renders as one heading
          over a row of compact cards, because its members are one decision priced several ways
          rather than several offers — see components/BundleGroup.tsx. */}
      {rows.map((row) => {
        if (row.kind === 'group') {
          const links = relatedLinks(row.bundles.flatMap((b) => [...b.services]))
          return (
            <div key={row.group} className="pt-16 lg:pt-24">
              <BundleGroup
                dict={dict}
                id={row.group}
                heading={groupCopy[row.group].heading}
                intro={groupCopy[row.group].intro}
                bundles={row.bundles}
                messageFor={claimMessage}
              >
                {links && <p className="mt-8 leading-relaxed text-ink-muted">{links}</p>}
              </BundleGroup>
            </div>
          )
        }

        const { bundle } = row
        const links = relatedLinks([...bundle.services])
        return (
          <div key={bundle.slug} className="pt-16 lg:pt-24">
            <BundleOffer
              id={bundle.slug}
              dict={dict}
              bundle={bundle}
              message={claimMessage(bundle)}
            />
            <div className="mx-auto mt-6 grid max-w-6xl gap-6 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
              <div>
                <p className="label text-brand-slate">{dict.page.offersWhoSuits}</p>
                <p className="mt-2 leading-relaxed text-ink-muted">{bundle.who}</p>
              </div>
              {links && <p className="leading-relaxed text-ink-muted lg:text-right">{links}</p>}
            </div>
          </div>
        )
      })}

      {/* ------------------------------------------------------- Also priced */}
      {/* Added 2026-09-12 with the physiotherapy house call, the first service with a
          per-visit price list. A link rather than a card, deliberately: every card above is a
          set sold for one figure, and a per-visit rate card sitting among them would read as
          another one. The contrast used to be drawn as "not website-only" too; that stopped
          being the difference on 2026-09-22, when the yoga cards arrived and were not
          website-only either. */}
      {pricedServices.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl px-4 lg:mt-24">
          <Eyebrow>{copy.alsoPriced}</Eyebrow>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">{copy.alsoPricedBody}</p>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {pricedServices.map((s) => (
              <li
                key={s.slug}
                className="flex flex-col rounded-3xl border border-line bg-white p-8 shadow-ambient"
              >
                <h2 className="text-xl font-bold">{shortTitle(locale, s.title)}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{s.priceList!.summary}</p>
                <div className="mt-6">
                  <GhostButton href={`${pathFor(locale, `/services/${s.slug}`)}#${PRICE_LIST_ANCHOR}`}>
                    {copy.seeFees}
                  </GhostButton>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------------------------------------------------------- How to claim */}
      {/* Three steps, and the third is the only one that says anything about the counter: the
          offer is noted on the booking before the visitor arrives. That is exactly the claim
          path recorded in lib/pricing.ts (the prefilled WhatsApp message reaches the clinic
          first), so the page invents no code, voucher or process the front desk has not
          agreed to. Do not add a fourth step about showing something at reception. */}
      <section className="mt-16 border-y border-line bg-white lg:mt-24">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>{dict.page.howItWorks}</Eyebrow>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                {dict.page.offersHowHeading}
              </h2>
            </div>
            <ol className="divide-y divide-line border-y border-line">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-6 py-7">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-slate text-sm font-bold tabular-nums text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand
        dict={dict}
        heading={dict.page.offersCtaHeading}
        body={dict.page.offersCtaBody}
        message={waMessage.general(locale)}
      />
    </>
  )
}
