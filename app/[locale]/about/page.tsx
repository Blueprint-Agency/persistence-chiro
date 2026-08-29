import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { indexablePractitioners, practitioners } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, collectionPageSchema, personSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { LOCALES, isLocale, pathFor } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import { CtaBand, Eyebrow, GhostButton, PageHero } from '@/components/ui'
import { MeetDoctors } from '@/components/MeetDoctors'
import { waMessage } from '@/lib/whatsapp'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale

  const copy = {
    // "Kuala Lumpur" abbreviated to KL to clear the ~60 Google renders, matching what every
    // condition and service metaTitle already does. Both local modifiers are kept.
    en: {
      title: 'Our Chiropractors in Cheras, KL',
      description:
        'Meet the registered chiropractors at Persistence Chiropractic Care in Cheras, Maluri. Founder Valerie Na, our team, credentials and board memberships.',
    },
    zh: {
      title: 'Cheras, KL 脊椎矫正师团队',
      description:
        '认识 Cheras, Maluri Persistence Chiropractic Care 的注册脊椎矫正师团队。创办人 Valerie Na、团队成员、专业资历与学会会员资格。',
    },
    ms: {
      title: 'Kiropraktor Kami di Cheras, KL',
      description:
        'Kenali kiropraktor berdaftar di Persistence Chiropractic Care, Cheras, Maluri. Pengasas Valerie Na, pasukan kami, kelayakan dan keahlian badan profesional.',
    },
  }[locale]

  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: '/about',
    locale,
    availableIn: LOCALES.filter((l) => pathExistsIn(l, '/about')),
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = await getDictionary(locale)

  return (
    <>
      {practitioners.map((p) => (
        <JsonLd key={p.slug} data={personSchema(p)} />
      ))}
      {/* This page is an index of the three practitioner pages, exactly as /conditions and
          /services index theirs — it was the one hub emitting no CollectionPage, so the
          three Person nodes above sat on the page with nothing tying them into a set.
          `indexablePractitioners` rather than `practitioners`: a profile held back for want
          of a bio is noindex, and listing it here would advertise a page we asked Google not
          to index. Localized: name/description reuse the same copy as `generateMetadata`
          above rather than duplicating a third near-identical translation. */}
      <JsonLd
        data={collectionPageSchema({
          name: `${dict.page.meetYourChiropractors} — Cheras, Maluri`,
          description: dict.page.threeRegisteredChiropractorsLine,
          url: pathFor(locale, '/about'),
          items: indexablePractitioners().map((p) => ({
            name: p.name,
            url: pathFor(locale, `/about/${p.slug}`),
          })),
        })}
      />
      <JsonLd
        data={breadcrumbSchema([{ name: dict.page.aboutBreadcrumbLabel, url: pathFor(locale, '/about') }])}
      />

      <PageHero
        eyebrow={dict.page.aboutUsEyebrow}
        title={dict.page.aboutHubTitle}
        intro={dict.page.aboutHubIntro}
      />

      {/* ---------------------------------------------------------------- Team */}
      {/* The founder section that used to sit above this was removed: Valerie's bio now
          lives on her own page, and repeating it here made her the page's subject when
          the page's job is introducing all three. Every card links to its own page.
          Now the same shared <MeetDoctors> the homepage and condition/service pages use,
          rather than a hand-duplicated copy of its markup — the duplicate had drifted to a
          smaller photo size (800x1000 vs 900x1125) and a different heading before this fix. */}
      <MeetDoctors locale={locale} dict={dict} />

      {/* ------------------------------------------------------------ Partners */}
      {/* The logo wall lives on /partner-with-us now; this is a teaser + link. /our-partners
          301s to /partner-with-us, so this anchor is for internal navigation only. */}
      <section id="partners" className="scroll-mt-24 border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Eyebrow>{dict.page.partnersEyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            {dict.page.organisationsWeWorkAlongside}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {dict.page.aboutPartnersIntro}
          </p>
          <div className="mt-8">
            <GhostButton href={pathFor(locale, '/partner-with-us')}>
              {dict.page.seeOurPartnersLinkText}
            </GhostButton>
          </div>
        </div>
      </section>

      <CtaBand
        dict={dict}
        heading={dict.page.wantToKnowWhichOfUsToSee}
        body={dict.page.wantToKnowWhichOfUsToSeeBody}
        message={waMessage.general(locale)}
      />
    </>
  )
}
