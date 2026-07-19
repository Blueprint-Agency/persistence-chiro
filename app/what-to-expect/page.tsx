import type { Metadata } from 'next'
import Link from 'next/link'

import { clinic } from '@/lib/clinic'
import { clinicFaqs, postTreatmentCare, postTreatmentIntro } from '@/lib/faqs'
import { JsonLd } from '@/components/JsonLd'
import { faqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'What to Expect on Your First Chiropractic Visit',
  description:
    'What happens on a first visit to Persistence Chiropractic Care in Cheras, Maluri — assessment, X-rays, aftercare, and answers to the questions patients ask most.',
  alternates: { canonical: '/what-to-expect' },
}

export default function WhatToExpectPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Every answer below renders on the page, so the schema is legitimate. */}
      <JsonLd data={faqSchema(clinicFaqs)} />

      <h1 className="text-3xl font-semibold">What to Expect</h1>
      <p className="mt-4 text-lg text-ink-muted">
        Healing is a process, not an event. Persistence is the key.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Your first visit</h2>
        <p className="mt-2 text-ink-muted">
          Your first appointment follows the{' '}
          <Link href="/chiropractic" className="text-brand-slate underline">
            Gonstead six-step assessment
          </Link>
          {' '}— history, visualisation, instrumentation, palpation, X-ray analysis, and only
          then an adjustment.
        </p>
        {/* TODO(content): the live site has a separate 4-step first-visit walkthrough in
            content-migration/what-to-expect.md. It overlaps heavily with the Gonstead six
            steps — the clinic should decide which framing to keep rather than shipping both. */}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">After your adjustment</h2>
        <p className="mt-2 leading-relaxed text-ink-muted">{postTreatmentIntro}</p>
        <dl className="mt-6 space-y-6">
          {postTreatmentCare.map((item) => (
            <div key={item.heading}>
              <dt className="font-medium text-ink">{item.heading}</dt>
              <dd className="mt-1 leading-relaxed text-ink-muted">{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
        <dl className="mt-6 space-y-6">
          {clinicFaqs.map((faq) => (
            <div key={faq.q}>
              <dt className="font-medium text-ink">{faq.q}</dt>
              <dd className="mt-1 leading-relaxed text-ink-muted">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 rounded border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-xl font-semibold">Ready to book?</h2>
        <a
          href={clinic.bookingUrl}
          target="_blank"
          rel="noopener"
          className="mt-4 inline-block rounded bg-brand-gold px-5 py-2.5 font-medium text-ink"
        >
          Book an appointment
        </a>
      </section>
    </div>
  )
}
