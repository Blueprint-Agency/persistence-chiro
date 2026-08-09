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
import { CheckIcon, CtaBand, Eyebrow, GhostButton, Vertebrae } from '@/components/ui'
import {
  KeyTakeaways,
  References,
  ReviewedBy,
  ServiceHero,
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
  // Identical to the templated route now that this page has a heroImage to derive the alt
  // from. `ogImage` is the pre-cropped 1200x630 JPEG, never the hero itself.
  image:
    service.ogImage && service.heroImage
      ? { url: service.ogImage, width: 1200, height: 630, alt: service.heroImage.alt }
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

      {/* Was the generic <PageHero>, which has no image slot, so the flagship money page was
          the only service page with no hero photograph. Now the same <ServiceHero> the
          templated routes use, which is also what keeps the two from drifting.
          `title` stays hand-written rather than taken from `service.title`: the data value is
          title case for the SERP, and this h1 has always read in sentence case. */}
      <ServiceHero
        title="Chiropractic care in Cheras, Kuala Lumpur"
        intro={gonsteadIntro}
        image={service.heroImage}
        assurances={service.assurances}
        message={waMessage.service('chiropractic care')}
      />

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
          after the method rather than behind the citations.

          MOVED ABOVE THE PHOTOGRAPHS 2026-08-09 at the client's request, which also puts it
          directly after the method here as it is on every templated page. The ask converts
          a reader while they still have the six steps in mind, instead of making them scroll
          past two outcome photographs first. */}
      {service.qualifierConcerns && service.qualifierConcerns.length > 0 && (
        <section className="border-y border-line bg-brand-aqua/40">
          <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
            <ServiceQualifier serviceName="chiropractic care" concerns={service.qualifierConcerns} />
          </div>
        </section>
      )}

      {/* ------------------------------------------------- Patient photographs */}
      {/* Still after the six steps, which is the placement that matters. Before the method is
          explained the pairs are just an assertion; after it, they illustrate the thing the
          reader has just been walked through. The qualifier now sits between the two.

          ⚠️ These are the only outcome claims anywhere on the site, and an image makes its
          claim silently — `lib/content.test.ts` reads copy and would wave through any
          photograph, however strong its implication. Two rules hold this section in bounds:

          1. THE DISCLAIMER SHIPS WITH THE IMAGES, as a figcaption, never a footnote
             elsewhere on the page.
          2. THE CAPTIONS DESCRIBE THE LINE, NOT A RESULT. Particularly the second pair. Its
             dashed line traces a lateral curve, and `conditions.ts` (scoliosis) says in
             reviewed copy that "straightening the curve is not something an adjustment does"
             and "the curve itself stays as it is". Read as curve correction, that photograph
             contradicts the clinic's own published position two clicks away; read as what the
             camera saw from behind on two days, it does not. The caption does that work and
             is not decorative — raised with the client 2026-08-08, included at their
             direction. Do not reword it towards "corrected", "straightened" or "improved". */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
          <Eyebrow>Patient photographs</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            What a change in posture can look like
          </h2>
          <p className="mt-5 leading-relaxed text-ink-muted">
            Two patients at our clinic in Cheras, photographed from behind during their care
            and shared with their permission. The line marks the same vertical in each pair,
            so the two photographs can be compared against something fixed.
          </p>

          <figure className="mt-10">
            {/* Both pairs on one row, at the client's request 2026-08-09. They stacked before,
                which made the section two full-width photographs tall on a laptop and pushed
                the disclaimer below the fold of the second one — the caption has to be visible
                with the images it qualifies, not scrolled to.

                Each file is already a composite: two photographs plus a Before/After band. So
                one row is four photographs wide and they are genuinely small at this measure.
                That is the trade the single row costs. Stacking returns at `sm`, where two
                composites side by side would be unreadable rather than merely small. */}
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  src: '/img/before-after-posture.webp',
                  alt: 'Back view of the same patient in two photographs at Persistence Chiropractic Care in Cheras, Kuala Lumpur, a vertical red line in each marking the position of the head and spine',
                },
                {
                  src: '/img/before-after-spinal-curve.webp',
                  alt: 'Back view of the same patient in two photographs at Persistence Chiropractic Care in Cheras, Kuala Lumpur, a dashed line in each following the line of the spine from the neck downwards',
                },
              ].map((pair) => (
                <div
                  key={pair.src}
                  className="overflow-hidden rounded-3xl border border-line shadow-ambient"
                >
                  <Image
                    src={pair.src}
                    alt={pair.alt}
                    width={1080}
                    height={1350}
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="w-full"
                  />
                </div>
              ))}
            </div>
            <figcaption className="mt-6 text-sm leading-relaxed text-ink-muted">
              Two people&rsquo;s photographs, not a prediction of yours. Each pair shows how
              someone stood in front of a camera on two different days, which is not the same
              thing as a measurement, and posture differs from person to person and from visit
              to visit. What we can tell you before we have assessed you is what we would look
              at, not what would change.
            </figcaption>
          </figure>
        </div>
      </section>

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
