import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { practitionerBySlug } from '@/lib/clinic'
import { conditionBySlug } from '@/lib/conditions'
import { gonsteadIntro, gonsteadSteps } from '@/lib/gonstead'
import { serviceBySlug } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import {
  breadcrumbSchema,
  faqSchema,
  medicalProcedureSchema,
  reviewedMedicalWebPage,
} from '@/lib/schema'
import {
  CheckIcon,
  CtaBand,
  Eyebrow,
  GhostButton,
  WhatsAppButton,
  PageHero,
  Vertebrae,
} from '@/components/ui'
import {
  KeyTakeaways,
  RatingBadge,
  References,
  ReviewedBy,
  StickyCta,
  TrustBar,
} from '@/components/service'
import { GoogleReviews } from '@/components/GoogleReviews'
import { MeetDoctors } from '@/components/MeetDoctors'
import { ServiceQualifier } from '@/components/ServiceQualifier'
import { waMessage } from '@/lib/whatsapp'

const reviewer = practitionerBySlug('valerie-na')!

/**
 * Hand-built route rather than a /services/[slug] render — this page carries the Gonstead
 * six-step walkthrough, which is a bespoke layout rather than section blocks. Flagged
 * `dedicatedRoute: true` in services.ts so generateStaticParams skips it and the two
 * routes can't collide.
 *
 * Gonstead is deliberately NOT a separate page. A standalone /chiropractic and a
 * /services/chiropractic-care would mean the same thing to Google and split link
 * equity between them — unaffordable at DA 6. Gonstead is the differentiator that makes
 * this page worth ranking, so it lives inside it. If GSC later shows "gonstead" queries
 * earning impressions of their own, splitting it back out is the easier direction to go.
 */
const service = serviceBySlug('chiropractic-care')!

export const metadata: Metadata = pageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: '/services/chiropractic-care',
  // The templated pages derive this alt from `heroImage`. This route's hero is text only, so
  // there is no heroImage to borrow from and the alt is written here against the card itself.
  // Same rule as everywhere else: describe what is in the frame, never the service being sold.
  image: service.ogImage
    ? {
        url: service.ogImage,
        width: 1200,
        height: 630,
        alt: 'Chiropractor running a nervoscope down a patient spine at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
      }
    : undefined,
})

export default function ChiropracticPage() {
  return (
    <>
      <JsonLd
        data={medicalProcedureSchema({
          name: service.title,
          description: service.metaDescription,
          url: '/services/chiropractic-care',
        })}
      />
      {/* Every answer below renders on the page, so the schema is legitimate. */}
      <JsonLd data={faqSchema(service.faqs)} />
      {service.lastReviewed && (
        <JsonLd
          data={reviewedMedicalWebPage({
            name: service.title,
            description: service.metaDescription,
            url: '/services/chiropractic-care',
            lastReviewed: service.lastReviewed,
            reviewer: {
              name: reviewer.name,
              role: reviewer.role,
              credentials: reviewer.credentials,
              slug: reviewer.slug,
            },
          })}
        />
      )}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Services', url: '/services' },
          { name: 'Chiropractic Care', url: '/services/chiropractic-care' },
        ])}
      />

      <PageHero
        eyebrow="Our services"
        title="Chiropractic care in Cheras, Kuala Lumpur"
        intro={gonsteadIntro}
      >
        {/* `attention` on the hero CTA only, matching the templated service pages. */}
        <div className="flex flex-wrap gap-3">
          <WhatsAppButton attention message={waMessage.service('chiropractic care')}>
            Book on WhatsApp
          </WhatsAppButton>
        </div>
        {/* Reassurance sits with the button rather than nine paragraphs below it, matching the
            templated service pages. Facts only, and only facts this page substantiates. */}
        {service.assurances && service.assurances.length > 0 && (
          <ul className="mt-6 grid gap-2.5 text-sm text-white/75 sm:grid-cols-2 lg:grid-cols-3">
            {service.assurances.map((a) => (
              <li key={a} className="flex items-start gap-2.5">
                <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-brand-gold" />
                {a}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <RatingBadge tone="light" />
        </div>
      </PageHero>

      <TrustBar />

      {/* ------------------------------------------------------ Key takeaways */}
      <KeyTakeaways items={service.keyTakeaways} />

      {/* -------------------------------------------------- What we help with */}
      {/* `outcomes` and `sections` were both authored in services.ts and neither was rendered
          on this route: the templated page reads them, the hand-built one never did. That put
          three blocks of copy in the repo that no visitor and no crawler ever saw, including
          the "bone and body alignment" block, which is the phrasing this page's target keyword
          is built on. Both now render. */}
      {service.outcomes && service.outcomes.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Eyebrow>What we help with</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Reasons people come in for chiropractic care
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {service.outcomes.map((outcome) => {
              const text = typeof outcome === 'string' ? outcome : outcome.text
              return (
                <li
                  key={text}
                  className="flex items-start gap-3 rounded-3xl border border-line bg-white p-6 shadow-ambient"
                >
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-brand-slate" />
                  <p className="leading-relaxed text-ink-muted">{text}</p>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* ------------------------------------------------ The three main parts */}
      {service.sections.length > 0 && (
        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
            <Eyebrow>What it involves</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
              What chiropractic care here involves
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {service.sections.map((s) => (
                <div key={s.heading}>
                  <h3 className="text-xl font-bold">{s.heading}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

        <div className="mt-14 rounded-3xl border border-line bg-white p-8 shadow-ambient lg:p-10">
          <Eyebrow>Conditions we commonly see</Eyebrow>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {service.helpsWith.map(conditionBySlug).map(
              (c) =>
                c && (
                  <li key={c.slug}>
                    <Link
                      href={`/conditions/${c.slug}`}
                      className="flex items-start gap-2.5 text-ink-muted hover:text-brand-slate"
                    >
                      <Vertebrae className="mt-1.5 text-brand-gold" />
                      {c.title.split(' in ')[0]}
                    </Link>
                  </li>
                ),
            )}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------- Qualifier */}
      {/* Same placement as the templated service pages — high, on the aqua ground, right
          after the method rather than behind the citations. */}
      {service.qualifierConcerns && service.qualifierConcerns.length > 0 && (
        <section className="border-y border-line bg-brand-aqua/40">
          <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
            <ServiceQualifier serviceName="chiropractic care" concerns={service.qualifierConcerns} />
          </div>
        </section>
      )}

      {/* ----------------------------------------------------- Long-form depth */}
      {/* Also previously unrendered on this route. The safety block in particular was written,
          reviewed and then never shown, which on a YMYL page is the section most worth having. */}
      {service.longForm && service.longForm.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
          <div className="space-y-12">
            {service.longForm.map((block) => (
              <div key={block.heading}>
                <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
                  {block.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">{block.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <MeetDoctors />

      <GoogleReviews />

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

      {/* Provenance at the foot, matching the templated service pages. */}
      <ReviewedBy date={service.lastReviewed} />
      <References items={service.citations} />

      <CtaBand
        heading="Book a Gonstead assessment"
        body="Registered chiropractors in Cheras, Maluri. Open seven days, right next to Sunway Velocity."
        message={waMessage.service('chiropractic care')}
      />

      <StickyCta />
      {/* Clears the fixed mobile bar so it never covers the footer. Slate, not the page
          ground — as cream it read as an empty white band between the gold CTA and the
          footer; in the footer's own colour it is simply where the footer starts. */}
      <div aria-hidden="true" className="h-20 bg-brand-slate-deep lg:hidden" />
    </>
  )
}
