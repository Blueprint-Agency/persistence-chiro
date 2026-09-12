import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, offersPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { LOCALES, isLocale, pathFor, shortTitle, type Locale } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import { publishedBundlesFor, ringgit } from '@/lib/pricing'
import { publishedServicesFor, serviceBySlugFor } from '@/lib/services'
import { BundleOffer } from '@/components/BundleOffer'
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
      title: 'Website-Only Offers, Cheras KL',
      lead: 'Two offers you can only get by booking through the Persistence Chiropractic Care website in Cheras, Maluri.',
      close: 'Message us on WhatsApp to claim one.',
      alsoPriced: 'Also priced on this site',
      alsoPricedBody:
        'Not an offer, and not website-only: a service sold by the visit, with its fees published in full on its own page.',
      seeFees: 'See the fees',
    },
    zh: {
      title: 'Cheras, KL 官网专属优惠',
      lead: '两项只在 Cheras, Maluri 的 Persistence Chiropractic Care 官网预约才享有的优惠。',
      close: '通过 WhatsApp 联系我们即可领取。',
      alsoPriced: '本站其他已公布的收费',
      alsoPricedBody: '这不是优惠,也不限官网:按次收费的服务,收费在其页面上完整公布。',
      seeFees: '查看收费',
    },
    ms: {
      title: 'Tawaran Khas Laman Web, Cheras KL',
      lead: 'Dua tawaran yang hanya boleh didapati bila anda menempah melalui laman web Persistence Chiropractic Care di Cheras, Maluri.',
      close: 'Mesej kami di WhatsApp untuk menuntutnya.',
      alsoPriced: 'Yuran lain yang diterbitkan di laman ini',
      alsoPricedBody:
        'Bukan tawaran dan bukan khas laman web: perkhidmatan yang dicaj mengikut lawatan, dengan yurannya diterbitkan penuh di halamannya sendiri.',
      seeFees: 'Lihat yuran',
    },
  })[locale]

const describe = (locale: Locale) => {
  const copy = copyFor(locale)
  const list = publishedBundlesFor(locale)
    .map((b) => `${b.name} ${ringgit(b.price)}`)
    .join(locale === 'zh' ? ',' : ', ')
  return locale === 'zh' ? `${copy.lead}${list}。${copy.close}` : `${copy.lead} ${list}. ${copy.close}`
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
  const bundles = publishedBundlesFor(locale)
  // Services priced by the visit (`priceList` on lib/services.ts). Not offers, so they are
  // not cards here and not in the CollectionPage list; they get a link so this page stays the
  // one place every published price can be reached from. Empty in a locale where no such
  // service exists, and the section then does not render.
  const pricedServices = publishedServicesFor(locale).filter((s) => s.priceList)
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
        {/* One jump link per offer, labelled with the eyebrow and the price. Ghost rather than
            gold: the gold ask on this page is the WhatsApp button on each card, and a gold
            button up here would be a second ask before the reader has seen what it is for. */}
        <div className="flex flex-wrap gap-3">
          {bundles.map((b) => (
            <GhostButton key={b.slug} href={`#${b.slug}`} tone="light">
              {b.eyebrow} &middot; {ringgit(b.price)}
            </GhostButton>
          ))}
        </div>
      </PageHero>

      {/* ---------------------------------------------------------------- Offers */}
      {/* The cards come first: the visitor tapped "Offers" and this is what they came for. The
          claim steps follow, once there is something to claim. Each card is followed by who
          it suits and links to the service pages that explain the parts in depth, which is
          also how this page joins the internal-linking model rather than being a dead end. */}
      {bundles.map((bundle) => {
        const related = bundle.services
          .map((slug) => {
            const s = serviceBySlugFor(locale, slug)
            return s ? { slug, label: shortTitle(locale, s.title) } : null
          })
          .filter((s): s is { slug: string; label: string } => s !== null)

        return (
          <div key={bundle.slug} className="pt-16 lg:pt-24">
            <BundleOffer
              id={bundle.slug}
              dict={dict}
              bundle={bundle}
              message={waMessage.bundle(locale, bundle.name, ringgit(bundle.price))}
            />
            <div className="mx-auto mt-6 grid max-w-6xl gap-6 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
              <div>
                <p className="label text-brand-slate">{dict.page.offersWhoSuits}</p>
                <p className="mt-2 leading-relaxed text-ink-muted">{bundle.who}</p>
              </div>
              {related.length > 0 && (
                <p className="leading-relaxed text-ink-muted lg:text-right">
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
                </p>
              )}
            </div>
          </div>
        )
      })}

      {/* ------------------------------------------------------- Also priced */}
      {/* Added 2026-09-12 with the physiotherapy house call, the first service with a
          per-visit price list. A link rather than a card, deliberately: the cards on this page
          make a saving claim and carry a "website-only" badge, and a rate card that does
          neither would read as a third offer it is not. */}
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
