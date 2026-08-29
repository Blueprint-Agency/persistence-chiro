import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { publishedServicesFor } from '@/lib/services'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { LOCALES, isLocale, pathFor, shortTitle } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import { CtaBand, Eyebrow, PageHero, Vertebrae } from '@/components/ui'
import { waMessage } from '@/lib/whatsapp'

/**
 * Services hub. One of the seven main pages in `seo-proposal.html`.
 *
 * Deliberately NOT targeting "physio cheras" — that keyword belongs to
 * /services/physiotherapy, which is the page that can actually answer it. A hub competing
 * with its own child for one term is the cannibalisation the architecture exists to
 * prevent. This page exists to route visitors and to pass link equity down.
 */
type Props = { params: Promise<{ locale: string }> }

// FOUND BY A FINAL PRE-PREVIEW AUDIT, 2026-08-29: this generateMetadata hardcoded a single
// English title/description regardless of `locale` — see the matching note on
// app/[locale]/conditions/page.tsx, the same gap, same fix.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale

  const copy = {
    en: {
      title: 'Chiropractic & Physiotherapy Services, Cheras',
      description:
        'Chiropractic care, dry needling, physiotherapy, sports injury rehabilitation and posture correction under one roof in Cheras, Maluri, Kuala Lumpur.',
    },
    zh: {
      title: 'Cheras 脊椎矫正与物理治疗服务',
      description: '脊椎矫正护理、dry needling、物理治疗、运动伤害康复与姿势调整,同一屋檐下即可完成,地点在 Cheras, Maluri, Kuala Lumpur。',
    },
    ms: {
      title: 'Perkhidmatan Kiropraktik & Fisioterapi, Cheras',
      description:
        'Jagaan kiropraktik, dry needling, fisioterapi, pemulihan kecederaan sukan dan pembetulan postur di bawah satu bumbung di Cheras, Maluri, Kuala Lumpur.',
    },
  }[locale]

  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: '/services',
    locale,
    availableIn: LOCALES.filter((l) => pathExistsIn(l, '/services')),
  })
}

export default async function ServicesHub({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const services = publishedServicesFor(locale)
  // Same "no hub linking to nothing" rule as /conditions — see the multilingual plan's
  // Track A2.
  if (locale !== 'en' && services.length === 0) notFound()
  const dict = await getDictionary(locale)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: dict.page.ourServices, url: pathFor(locale, '/services') }])}
      />
      {services.length > 0 && (
        <JsonLd
          data={collectionPageSchema({
            name: dict.page.servicesHubTitle,
            description: dict.page.servicesHubIntro,
            url: pathFor(locale, '/services'),
            items: services.map((s) => ({
              name: shortTitle(locale, s.title),
              url: pathFor(locale, `/services/${s.slug}`),
            })),
          })}
        />
      )}

      <PageHero
        eyebrow={dict.page.ourServices}
        title={dict.page.servicesHubTitle}
        intro={dict.page.servicesHubIntro}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow>{dict.page.whatWeDo}</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            {dict.page.chiropracticPhysiotherapyRehab}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            {dict.page.chiropracticPhysioBody}
          </p>
        </div>

        {services.length === 0 ? (
          <p className="mt-10 text-ink-muted">Service pages are being prepared.</p>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={pathFor(locale, `/services/${s.slug}`)}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-ambient transition-shadow hover:shadow-ambient-raise lg:p-10"
                >
                  <Vertebrae className="text-brand-gold" />
                  <h3 className="mt-5 text-xl font-bold">{shortTitle(locale, s.title)}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{s.metaDescription}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate group-hover:gap-2.5">
                    {dict.page.readMore}
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <CtaBand
        dict={dict}
        heading={dict.page.notSureChiroOrPhysio}
        body={dict.page.tellUsWherePainIs}
        message={waMessage.general(locale)}
      />
    </>
  )
}
