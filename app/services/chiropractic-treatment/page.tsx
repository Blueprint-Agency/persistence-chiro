import type { Metadata } from 'next'
import Image from 'next/image'

import { clinic } from '@/lib/clinic'
import { gonsteadIntro, gonsteadSteps } from '@/lib/gonstead'
import { serviceBySlug } from '@/lib/services'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, faqSchema, medicalProcedureSchema } from '@/lib/schema'
import { CtaBand, Eyebrow, GhostButton, PageHero } from '@/components/ui'

/**
 * Hand-built route rather than a /services/[slug] render — this page carries the Gonstead
 * six-step walkthrough, which is a bespoke layout rather than section blocks. Flagged
 * `dedicatedRoute: true` in services.ts so generateStaticParams skips it and the two
 * routes can't collide.
 *
 * Gonstead is deliberately NOT a separate page. A standalone /chiropractic and a
 * /services/chiropractic-treatment would mean the same thing to Google and split link
 * equity between them — unaffordable at DA 6. Gonstead is the differentiator that makes
 * this page worth ranking, so it lives inside it. If GSC later shows "gonstead" queries
 * earning impressions of their own, splitting it back out is the easier direction to go.
 */
const service = serviceBySlug('chiropractic-treatment')!

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: '/services/chiropractic-treatment' },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: '/services/chiropractic-treatment',
  },
}

export default function ChiropracticPage() {
  return (
    <>
      <JsonLd
        data={medicalProcedureSchema({
          name: service.title,
          description: service.metaDescription,
          url: '/services/chiropractic-treatment',
        })}
      />
      {/* Every answer below renders on the page, so the schema is legitimate. */}
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Services', url: '/services' },
          { name: 'Chiropractic Treatment', url: '/services/chiropractic-treatment' },
        ])}
      />

      <PageHero
        eyebrow="Our services"
        title="Chiropractic treatment in Cheras, Kuala Lumpur"
        intro={gonsteadIntro}
      />

      {/* ------------------------------------------------------ The six steps */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The method</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              The six steps of a Gonstead assessment
            </h2>
            <p className="mt-5 leading-relaxed text-ink-muted">
              Gonstead is a process of elimination. Each step narrows the search until only the
              segment actually causing your pain is left. We then adjust that one joint rather
              than the whole spine.
            </p>
            <div className="mt-8 overflow-hidden rounded-3xl">
              <Image
                src="/img/consultation-assessment.webp"
                alt="Gonstead chiropractor assessing spinal alignment before an adjustment in Cheras, Kuala Lumpur"
                width={1100}
                height={1400}
                sizes="(max-width: 1024px) 100vw, 420px"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Numbered because the steps genuinely run in sequence — each one depends on
              what the previous one ruled out. Not decoration. */}
          <ol className="divide-y divide-line border-y border-line">
            {gonsteadSteps.map((step, i) => (
              <li key={step.name} className="flex gap-6 py-7">
                <span
                  aria-hidden="true"
                  className="label flex-none pt-1.5 text-brand-gold-ink"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-bold">{step.name}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <GhostButton href="/what-to-expect">What to expect on your first visit</GhostButton>
          <GhostButton href="/services/physiotherapy">Compare with physiotherapy</GhostButton>
        </div>
      </section>

      {/* ------------------------------------------------------------------ FAQs */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>

            <div className="divide-y divide-line border-y border-line">
              {service.faqs.map((faq) => (
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
        </div>
      </section>

      <CtaBand
        heading="Book a Gonstead assessment"
        body="Registered chiropractors in Cheras, Maluri. Open seven days, right next to Sunway Velocity."
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
