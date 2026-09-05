import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { clinic, addressOneLine, hoursDisplayFor, wazeUrl } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, contactPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { LOCALES, isLocale, pathFor } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import { CtaBand, Eyebrow, GhostButton, WhatsAppButton, PageHero } from '@/components/ui'
import { FindUs } from '@/components/FindUs'
import { waMessage } from '@/lib/whatsapp'

type Props = { params: Promise<{ locale: string }> }

// Competitors rank with their contact pages in this SERP (Excellence sits #12 for
// "chiropractor cheras" with theirs), so this page gets real metadata, not a stub.
// A utility/NAP page rather than a symptom or service page, so its title is written
// naturally per locale rather than validated against a specific Ubersuggest keyword —
// the same approach the English title already took.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale

  const copy = {
    en: {
      title: 'Book a Chiropractor in Cheras, Maluri',
      description:
        'Find Persistence Chiropractic Care at Sunway Velocity, Cheras. Parking, the walk from Sunway Velocity Mall step by step, opening hours, phone and WhatsApp. Open seven days.',
    },
    zh: {
      title: 'Cheras, Maluri 预约脊椎矫正护理',
      description:
        'Cheras, Sunway Velocity 的 Persistence Chiropractic Care 怎么走。停车、从 Sunway Velocity Mall 步行路线、营业时间、电话与 WhatsApp。每周七天营业。',
    },
    ms: {
      title: 'Tempah Kiropraktor di Cheras, Maluri',
      description:
        'Cari Persistence Chiropractic Care di Sunway Velocity, Cheras. Tempat letak kereta, laluan berjalan dari Sunway Velocity Mall, waktu operasi, telefon dan WhatsApp. Buka tujuh hari.',
    },
  }[locale]

  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: '/book-now',
    locale,
    availableIn: LOCALES.filter((l) => pathExistsIn(l, '/book-now')),
  })
}

export default async function ContactPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = await getDictionary(locale)
  const hoursDisplay = hoursDisplayFor(locale)

  return (
    <>
      <JsonLd data={contactPageSchema({ url: pathFor(locale, '/book-now') })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.page.bookNowBreadcrumbLabel, url: pathFor(locale, '/book-now') },
        ])}
      />

      {/* The shopfront, not a stock interior: this page's whole job is helping someone
          recognise the door, so the hero shows them the door. */}
      <PageHero
        eyebrow={dict.page.contactEyebrow}
        title={dict.page.contactAndDirections}
        intro={dict.page.contactIntro}
        backgroundImage="/img/clinic-exterior.webp"
      >
        <div className="flex flex-wrap gap-3">
          <WhatsAppButton message={waMessage.general(locale)}>{dict.header.enquireOnWhatsapp}</WhatsAppButton>
          {/* Same-page jump, not a route change — the walkthroughs are further down this
              page. Ghost rather than gold so it never competes with the one conversion. */}
          <GhostButton href="#find-us" tone="light">
            {dict.nav.locateUs}
          </GhostButton>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/img/clinic-front-desk.webp"
              alt="Reception desk at Persistence Chiropractic Care, Sunway Velocity, Cheras Kuala Lumpur"
              width={1400}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <Eyebrow>{dict.footer.visit}</Eyebrow>
            <address className="mt-5 not-italic text-xl leading-relaxed text-ink">
              {addressOneLine}
            </address>

            <dl className="mt-7 space-y-3">
              <div className="flex gap-4">
                <dt className="w-24 flex-none text-sm text-ink-muted">{dict.page.phoneLabel}</dt>
                <dd>
                  <a
                    href={`tel:${clinic.phoneE164}`}
                    className="font-semibold text-brand-slate hover:underline"
                  >
                    {clinic.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-24 flex-none text-sm text-ink-muted">{dict.page.emailLabel}</dt>
                <dd>
                  <a
                    href={`mailto:${clinic.email}`}
                    className="text-brand-slate hover:underline"
                  >
                    {clinic.email}
                  </a>
                </dd>
              </div>
            </dl>

            <h2 className="mt-10 flex items-center gap-3 label text-brand-slate">
              {dict.footer.openingHours}
            </h2>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {hoursDisplay.map((h) => (
                <div key={h.label} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-ink-muted">{h.label}</dt>
                  <dd className="font-semibold text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>

            {/* Both, not just Google. The clinic's own how-to-find-us slides lead with
                "we're on Waze", and a large share of Malaysian drivers navigate with it —
                a Maps-only page sends them back out to search for the clinic a second time. */}
            <div className="mt-8 flex flex-wrap gap-3">
              <GhostButton href={clinic.mapsUrl} external>
                {dict.footer.openInGoogleMaps}
              </GhostButton>
              <GhostButton href={wazeUrl} external>
                {dict.page.openInWaze}
              </GhostButton>
            </div>

            {/* Online booking (SweetPew) was retired 2026-07-26 — every appointment now starts
                as a WhatsApp message. That also removed the site's single biggest LCP risk: a
                third-party booking script on the page that has to rank for
                "chiropractor cheras" + directions. */}
            <p className="mt-8 text-sm text-ink-muted">{dict.page.whatsappAppointmentsNote}</p>

            <p className="mt-6 leading-relaxed text-ink-muted">
              {dict.page.notSureWhereToStartPrefix}
              <Link
                href={pathFor(locale, '/services')}
                className="font-semibold text-brand-slate underline underline-offset-4"
              >
                {dict.page.ourServices}
              </Link>
              {dict.page.orThe}
              <Link
                href={pathFor(locale, '/conditions')}
                className="font-semibold text-brand-slate underline underline-offset-4"
              >
                {dict.page.conditionsWeHelpWithLinkText}
              </Link>
              {dict.page.notSureWhereToStartSuffix}
            </p>
          </div>
        </div>
      </section>

      <FindUs locale={locale} dict={dict} />

      <CtaBand dict={dict} message={waMessage.general(locale)} />
    </>
  )
}
