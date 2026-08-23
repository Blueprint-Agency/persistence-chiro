import type { Metadata } from 'next'
import Image from 'next/image'

import { practitionerBySlug } from '@/lib/clinic'
import { conditionBySlug } from '@/lib/conditions'
import { gonsteadIntro, gonsteadSteps } from '@/lib/gonstead'
import { serviceBySlug } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import {
  breadcrumbSchema,
  medicalProcedureSchema,
  faqSchema,
  reviewedMedicalWebPage,
} from '@/lib/schema'
import { CtaBand, Eyebrow } from '@/components/ui'
import {
  InlineCta,
  Faqs,
  FitCheck,
  OutcomeCards,
  References,
  ReviewedBy,
  ServiceHero,
  StickyCta,
  TrustBar,
  WhereToGoNext,
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
 *
 * EVERYTHING THIS PAGE SHARES WITH THE TEMPLATED ROUTE NOW COMES FROM `@/components/service`.
 * A 2026-08-23 audit found four blocks that had been reimplemented here by hand and had
 * quietly drifted: the outcome cards silently dropped photographs, the long-form blocks
 * could not carry in-prose links, the internal-link block did not exist, and the
 * MedicalProcedure schema shipped without `howPerformed`. Only what is genuinely bespoke
 * belongs inline below: the three-column section grid, the six steps, and the patient
 * photographs.
 */
const service = serviceBySlug('chiropractic-care')!

const helpsWith = service.helpsWith.map(conditionBySlug).filter((c) => c !== undefined)

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
          // `gonsteadIntro` rather than a `sections` entry, because this route no longer
          // renders `sections` at all — and schema must describe what the page actually
          // says. This string IS on the page: it is the lead paragraph under the h1, and it
          // describes how the procedure is performed, which is what the field is for.
          howPerformed: gonsteadIntro,
        })}
      />
      {/* Both the short answers and the FAQ render on the page, so both belong in the
          schema. Carrying only `faqs` left half the Q&A on this route invisible to anything
          that reads JSON-LD rather than prose. */}
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

      {/* ------------------------------------------------------ Social proof */}
      {/* SWAPPED WITH THE TRUST BAR AND KEY TAKEAWAYS, 2026-08-23, at the client's
          direction: a visitor arriving cold trusts what other patients say sooner than an
          accreditation logo they do not recognise, so the reviews take the slot directly
          under the hero and the credentials move down to sit with the practitioners.
          The hero's <RatingBadge> already shows the score; this is the evidence behind it. */}
      <GoogleReviews />

      {/* -------------------------------------------------- What we help with */}
      {/* Shared renderer, so a photograph added to `outcomes` in services.ts appears here
          the same way it appears on the templated routes. The hand-rolled version this
          replaced read only `outcome.text` and would have dropped one silently. */}
      <OutcomeCards outcomes={service.outcomes} serviceName="chiropractic care" />

      {/* ---------------------------------------------------------- Mid-page ask */}
      {/* The page previously asked once in the hero and then not again until the CTA band at
          the foot, with only the mobile sticky bar in between. This is the break between
          recognising the problem and reading how the care works. */}
      <InlineCta
        heading="Tell us what is going on"
        body="Start with the assessment. We will tell you what we find, what we would do about it, and whether chiropractic is the right approach for your case at all."
        message={waMessage.service('chiropractic care')}
        secondary={{ href: '/what-to-expect', label: 'What happens on a first visit' }}
      />

      {/* ------------------------------------------------------ The six steps */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The method</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              The six steps of a Gonstead assessment
            </h2>
            {/* The closing sentence is rehomed from the deleted "Bone and body alignment"
                block. It was the only place this page's target keyword appeared in visible
                body copy — everywhere else it sits in the meta description, the schema or an
                image alt — and a money page whose keyword is absent from its own prose is the
                thin signal this rebuild exists to avoid. It is also the only line of that
                section that said anything the six steps below do not already say. */}
            <p className="mt-5 leading-relaxed text-ink-muted">
              Gonstead is a process of elimination: each step narrows the search until only the
              segment causing your pain is left, so we adjust that one joint rather than the
              whole spine. Where segments have become restricted, adjustment aims to improve
              bone and body alignment by improving how well they move. How much changes depends
              on the cause, and on how long it has been there.
            </p>
            {/* The photograph was hardcoded here and was the only service image living
                outside lib/services.ts. Same file, same slot, now read from `midImage`. */}
            {service.midImage && (
              <div className="mt-8 overflow-hidden rounded-3xl">
                <Image
                  src={service.midImage.src}
                  alt={service.midImage.alt}
                  width={1100}
                  height={1400}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Numbered because the steps genuinely run in sequence — each one depends on
              what the previous one ruled out. Not decoration. */}
          <ol className="divide-y divide-line border-y border-line">
            {gonsteadSteps.map((step, i) => (
              <li key={step.name} className="flex gap-6 py-7">
                <span aria-hidden="true" className="label flex-none pt-1.5 text-brand-gold-ink">
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
      </section>

      {/* ----------------------------------------------------------- Qualifier */}
      {/* AFTER the method. Client instruction, 2026-08-09: the ask should convert a reader
          while they still have the six steps in mind rather than making them scroll past the
          patient photographs first. The templated routes ran it before their steps until
          2026-08-23 and now match this, so the five service pages read the same way.

          The mid-page <InlineCta> above covers the earlier high-intent moment this slot used
          to serve, so nothing is lost by the later placement. */}
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
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
          <Eyebrow>Patient photographs</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            What a change in posture can look like
          </h2>
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
              {/* "Shared with their permission" was in the standing paragraph above these
                  images until it was removed 2026-08-23, and it appeared nowhere else on the
                  site. It is the only published statement that these two patients agreed to
                  their photographs being used, so it moved down here rather than going with
                  the paragraph. Do not drop it for length. */}
              Photographed from behind at our clinic in Cheras and shared with their
              permission. Two people&rsquo;s photographs, not a prediction of yours: each pair shows how
              someone stood in front of a camera on two different days, which is not the same
              thing as a measurement, and posture differs from person to person and from visit
              to visit. What we can tell you before we have assessed you is what we would look
              at, not what would change.
            </figcaption>
          </figure>
        </div>
      </section>


      {/* --------------------------------------------------- Who this is not for */}
      {/* The one block a competitor teardown (ianthechiro.my, 2026-08-23) had and we did not.
          Placed after the depth and before the team: it is the last honesty beat before the
          page starts asking for trust in named people and reviews. */}
      <FitCheck data={service.fitCheck} serviceName="chiropractic care" />

      <MeetDoctors />

      {/* ------------------------------------------------------- Credentials */}
      {/* The accreditations sit directly under the people who hold them, which reads better
          than floating them under the hero as a logo strip a cold visitor cannot place.

          The key-takeaways block used to follow this and was removed 2026-08-23: with
          `longForm` gone it left the page ending on two Q&A blocks back to back, and four of
          its five questions were already answered by an FAQ. The answers worth keeping moved
          into `faqs`. Cream ground because the FAQ below and <MeetDoctors/> above are both
          white, and this was the band that used to break that run. */}
      <TrustBar tone="cream" />

      {/* ------------------------------------------------------------------ FAQs */}
      {/* The page's ONLY long-answer block since `longForm` was deleted, so its questions
          carry `h3` and its answers carry the in-prose links. */}
      <Faqs faqs={service.faqs} />

      {/* ---------------------------------------------------- Where to go next */}
      {/* The conditions list used to sit inside the Gonstead section and the sibling links
          were two hardcoded ghost buttons, so this page had no internal-link block and never
          linked back to /services at all. Same component the templated routes use. */}
      <WhereToGoNext helpsWith={helpsWith} relatedLinks={service.relatedLinks} />

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
