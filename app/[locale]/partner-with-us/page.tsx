import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { keyPartners, partners } from '@/lib/partners'
import { events } from '@/lib/events'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { LOCALES, isLocale, pathFor } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import { partnerEnquiryCopyFrom } from '@/lib/partner-enquiry-copy'
import { CtaBand, CheckIcon, Eyebrow, PageHero } from '@/components/ui'
import { PartnerEnquiry } from '@/components/PartnerEnquiry'
import { waMessage } from '@/lib/whatsapp'

type Props = { params: Promise<{ locale: string }> }

// `events`/`keyPartners`/`partners` (real corporate clients, past events, brand names) stay
// English-only in every locale — same reasoning as /press: these are factual records of
// real external organisations and things that actually happened, not the clinic's own
// marketing prose, so translating them would misrepresent what they are.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale

  const copy = {
    en: {
      // "& Partnerships" dropped to clear ~60 — it is the weakest term here and the page's
      // own h1 and body carry it. This is not a money page, so the local modifiers matter more.
      title: 'Corporate Wellness in Cheras, KL',
      description:
        'Work with Persistence Chiropractic in Cheras, Kuala Lumpur: corporate wellness talks, workshops, health screenings, event booths and brand collaborations.',
    },
    zh: {
      title: 'Cheras, KL 企业保健合作',
      description:
        '与 Cheras, Kuala Lumpur 的 Persistence Chiropractic 合作:企业保健讲座、工作坊、健康筛检、活动摊位与品牌合作。',
    },
    ms: {
      title: 'Kesihatan Korporat di Cheras, KL',
      description:
        'Bekerjasama dengan Persistence Chiropractic di Cheras, Kuala Lumpur: ceramah kesihatan korporat, bengkel, saringan kesihatan, gerai acara dan kerjasama jenama.',
    },
  }[locale]

  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: '/partner-with-us',
    locale,
    availableIn: LOCALES.filter((l) => pathExistsIn(l, '/partner-with-us')),
  })
}

export default async function PartnerWithUsPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = await getDictionary(locale)
  const reasons = [
    { title: dict.page.partnerReason1Title, body: dict.page.partnerReason1Body },
    { title: dict.page.partnerReason2Title, body: dict.page.partnerReason2Body },
    { title: dict.page.partnerReason3Title, body: dict.page.partnerReason3Body },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.page.partnerWithUsBreadcrumbLabel, url: pathFor(locale, '/partner-with-us') },
        ])}
      />

      <PageHero
        eyebrow={dict.page.partnershipsEyebrow}
        title={dict.page.partnerWithUs}
        intro={dict.page.partnerWithUsIntro}
      />

      {/* ------------------------------------------------------------- Why partner */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>{dict.page.whatWeDoTogether}</Eyebrow>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {reasons.map((r) => (
            <li key={r.title} className="rounded-3xl border border-line bg-white p-7 shadow-ambient">
              <CheckIcon className="h-6 w-6 text-brand-gold" />
              <h2 className="mt-4 text-lg font-bold">{r.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-muted">{r.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ----------------------------------------------------------------- Proof */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Eyebrow>{dict.page.talksScreeningsEventsEyebrow}</Eyebrow>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <li key={e.file} className="flex flex-col">
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src={e.file}
                    alt={e.alt}
                    width={1100}
                    height={825}
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 font-bold leading-snug">{e.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{e.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------------- Logo wall */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Eyebrow>{dict.page.partnersEyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            {dict.page.organisationsWeWorkAlongside}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {dict.page.partnersIntro}
          </p>

          {/* Logos carry their own aspect ratio (see lib/partners.ts), so each is capped on
              both axes and left to fill whichever it hits first — a wide wordmark spans the
              tile, a square mark reaches full height. No card around each logo: the client
              asked for the marks to sit on the page directly rather than inside a bordered box. */}
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {keyPartners.map((p) => (
              <li key={p.file} className="flex items-center justify-center p-5 sm:p-8">
                <Image
                  src={p.file}
                  alt={`${p.name} logo`}
                  width={p.w}
                  height={p.h}
                  sizes="(min-width: 640px) 300px, 45vw"
                  className="h-auto max-h-24 w-auto max-w-full object-contain sm:max-h-28"
                />
              </li>
            ))}
          </ul>

          <p className="mt-14 label text-brand-slate">{dict.page.weHaveAlsoWorkedWith}</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((p) => (
              <li key={p.file} className="flex items-center justify-center p-4 sm:p-6">
                <Image
                  src={p.file}
                  alt={`${p.name} logo`}
                  width={p.w}
                  height={p.h}
                  sizes="(min-width: 1024px) 230px, (min-width: 640px) 30vw, 45vw"
                  className="h-auto max-h-16 w-auto max-w-full object-contain sm:max-h-20"
                />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-muted">{dict.page.andManyMore}</p>
        </div>
      </section>

      {/* ------------------------------------------------------------- Enquiry */}
      <section className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
        <Eyebrow>{dict.page.startAConversation}</Eyebrow>
        <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
          {dict.page.tellUsWhatYouHaveInMind}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">
          {dict.page.startAConversationIntro}
        </p>
        <div className="mt-8">
          <PartnerEnquiry copy={partnerEnquiryCopyFrom(dict)} />
        </div>
      </section>

      <CtaBand
        dict={dict}
        heading={dict.page.prefersToJustMessageUs}
        body={dict.page.prefersToJustMessageUsBody}
        message={waMessage.partner(locale)}
      />
    </>
  )
}
