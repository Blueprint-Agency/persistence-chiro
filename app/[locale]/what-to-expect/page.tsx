import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { clinicFaqsFor, aftercareFor, aftercareIntroFor } from '@/lib/faqs'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { LOCALES, isLocale, pathFor } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import { CtaBand, Eyebrow, PageHero, Vertebrae } from '@/components/ui'
import { waMessage } from '@/lib/whatsapp'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale

  const copy = {
    en: {
      title: 'First Chiropractic Visit: What to Expect',
      description:
        'What happens on a first visit to Persistence Chiropractic Care in Cheras, Maluri. Assessment, X-rays, aftercare, and answers to the questions patients ask most.',
    },
    zh: {
      title: '第一次脊椎矫正会诊须知',
      description:
        'Cheras, Maluri 的 Persistence Chiropractic Care 第一次会诊会经历什么。评估、X-ray、护理后须知,以及病患最常问的问题。',
    },
    ms: {
      title: 'Lawatan Kiropraktik Pertama: Apa Yang Dijangka',
      description:
        'Apa yang berlaku pada lawatan pertama ke Persistence Chiropractic Care di Cheras, Maluri. Penilaian, X-ray, jagaan selepas, dan jawapan kepada soalan yang paling kerap ditanya pesakit.',
    },
  }[locale]

  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: '/what-to-expect',
    locale,
    availableIn: LOCALES.filter((l) => pathExistsIn(l, '/what-to-expect')),
  })
}

export default async function WhatToExpectPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = await getDictionary(locale)
  const clinicFaqs = clinicFaqsFor(locale)
  const aftercare = aftercareFor(locale)
  const aftercareIntro = aftercareIntroFor(locale)

  return (
    <>
      {/* Every answer below renders on the page, so the schema is legitimate. */}
      <JsonLd data={faqSchema(clinicFaqs)} />
      {/* Single-item trail, matching /blog, /press and /locate-us: this is a top-level page,
          and the convention here is that every non-home route states where it sits. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.page.whatToExpectBreadcrumbLabel, url: pathFor(locale, '/what-to-expect') },
        ])}
      />

      <PageHero
        eyebrow={dict.page.whatToExpectEyebrow}
        title={dict.page.whatHappensOnYourFirstVisit}
        intro={dict.page.recoveryTakesTimeIntro}
      />

      {/* ------------------------------------------------------- Your first visit */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>{dict.page.yourFirstVisitEyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              {dict.page.theAssessmentComesFirst}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              {dict.page.firstVisitAssessmentPrefix}
              <Link
                href={pathFor(locale, '/services/chiropractic-care')}
                className="font-semibold text-brand-gold-ink underline underline-offset-4"
              >
                {dict.page.gonsteadSixStepLinkText}
              </Link>
              {dict.page.firstVisitAssessmentSuffix}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              {dict.page.arriveEarlyNote}
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/img/first-visit-consultation.webp"
              alt={dict.page.firstVisitConsultationAlt}
              width={1400}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 480px"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Aftercare */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>{dict.page.afterYourAdjustmentEyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                {dict.page.lookingAfterYourBackAfterwards}
              </h2>
              <p className="mt-5 leading-relaxed text-ink-muted">{aftercareIntro}</p>

              {/* The clinic's own nervoscope — the instrument named in the Instrumentation
                  step. A photo of the actual kit says "we measure this" better than a
                  stock clinic-room shot. */}
              <div className="mt-8 overflow-hidden rounded-3xl">
                <Image
                  src="/img/gonstead-nervoscope.webp"
                  alt={dict.page.nervoscopeAlt}
                  width={1100}
                  height={1400}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="w-full object-cover"
                />
              </div>
            </div>

            <dl className="divide-y divide-line border-y border-line">
              {aftercare.map((item) => (
                <div key={item.heading} className="flex gap-5 py-7">
                  <Vertebrae className="mt-2 text-brand-gold" />
                  <div>
                    <dt className="text-xl font-bold text-ink">{item.heading}</dt>
                    <dd className="mt-3 leading-relaxed text-ink-muted">{item.body}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ FAQs */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>{dict.page.questions}</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              {dict.page.frequentlyAskedQuestions}
            </h2>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {clinicFaqs.map((faq) => (
              <details key={faq.q} className="faq py-5">
                <summary className="flex items-start justify-between gap-6 text-lg font-semibold text-ink">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="faq-sign mt-1 flex-none text-2xl font-light leading-none text-brand-slate transition-transform"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-ink-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        dict={dict}
        heading={dict.page.readyToBook}
        body={dict.page.readyToBookBody}
        message={waMessage.firstVisit(locale)}
      />
    </>
  )
}
