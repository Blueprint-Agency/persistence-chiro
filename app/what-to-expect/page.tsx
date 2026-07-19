import type { Metadata } from 'next'
import Link from 'next/link'

import { clinic } from '@/lib/clinic'
import { clinicFaqs, postTreatmentCare, postTreatmentIntro } from '@/lib/faqs'
import { JsonLd } from '@/components/JsonLd'
import { faqSchema } from '@/lib/schema'
import { CtaBand, Eyebrow, PageHero, Vertebrae } from '@/components/ui'

export const metadata: Metadata = {
  title: 'What to Expect on Your First Chiropractic Visit',
  description:
    'What happens on a first visit to Persistence Chiropractic Care in Cheras, Maluri — assessment, X-rays, aftercare, and answers to the questions patients ask most.',
  alternates: { canonical: '/what-to-expect' },
}

export default function WhatToExpectPage() {
  return (
    <>
      {/* Every answer below renders on the page, so the schema is legitimate. */}
      <JsonLd data={faqSchema(clinicFaqs)} />

      <PageHero
        eyebrow="What to expect"
        title="Healing is a process, not an event."
        intro="Persistence is the key — and knowing what happens before you walk in makes the first visit a lot easier."
      />

      {/* ------------------------------------------------------- Your first visit */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow>Your first visit</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            We assess before we adjust.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Your first appointment follows the{' '}
            <Link
              href="/chiropractic"
              className="font-semibold text-brand-gold-ink underline underline-offset-4"
            >
              Gonstead six-step assessment
            </Link>{' '}
            — history, visualisation, instrumentation, palpation, X-ray analysis, and only then
            an adjustment.
          </p>
          {/* TODO(content): the live site has a separate 4-step first-visit walkthrough in
              content-migration/what-to-expect.md. It overlaps heavily with the Gonstead six
              steps — the clinic should decide which framing to keep rather than shipping both. */}
        </div>
      </section>

      {/* ------------------------------------------------------------- Aftercare */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>After your adjustment</Eyebrow>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                What you do next matters as much as the adjustment.
              </h2>
              <p className="mt-5 leading-relaxed text-ink-muted">{postTreatmentIntro}</p>
            </div>

            <dl className="divide-y divide-line border-y border-line">
              {postTreatmentCare.map((item) => (
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
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              Frequently asked questions
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
        heading="Ready to book?"
        body="Registered chiropractors in Cheras, Maluri. Open seven days, right next to Sunway Velocity."
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
