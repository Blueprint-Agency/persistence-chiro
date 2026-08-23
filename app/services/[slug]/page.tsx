import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { serviceBySlug, templatedServices } from '@/lib/services'
import { conditionBySlug } from '@/lib/conditions'
import { practitionerBySlug } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import {
  breadcrumbSchema,
  medicalProcedureSchema,
  faqSchema,
  reviewedMedicalWebPage,
} from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { CtaBand, Eyebrow, WhatsAppButton } from '@/components/ui'
import {
  ComparisonTable,
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

export function generateStaticParams() {
  return templatedServices().map((s) => ({ slug: s.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = serviceBySlug(slug)
  if (!service) return {}

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    // Service pages carry their own photography — a specific card outperforms the generic
    // shopfront. `ogImage` is the pre-cropped 1200x630 JPEG, never the hero itself.
    image:
      service.ogImage && service.heroImage
        ? { url: service.ogImage, width: 1200, height: 630, alt: service.heroImage.alt }
        : undefined,
  })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = serviceBySlug(slug)
  if (!service || service.draft) notFound()

  const helpsWith = service.helpsWith.map(conditionBySlug).filter((c) => c !== undefined)

  // The first section IS the page's subject, so it carries the hero intro; the rest become
  // the numbered "how it works" steps.
  const [lead, ...steps] = service.sections ?? []
  const shortName = service.title.split(' in ')[0]

  return (
    <>
      <JsonLd
        data={medicalProcedureSchema({
          name: service.title,
          description: service.metaDescription,
          url: `/services/${service.slug}`,
          howPerformed: lead?.body,
        })}
      />
      {/* reviewedBy + lastReviewed — the E-E-A-T signals for a YMYL page. */}
      {service.lastReviewed && (
        <JsonLd
          data={reviewedMedicalWebPage({
            name: service.title,
            description: service.metaDescription,
            url: `/services/${service.slug}`,
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
      {/* Both the short answers and the FAQ render on the page, so both belong in the
          schema. Carrying only `faqs` left half the Q&A on these routes invisible to anything
          that reads JSON-LD rather than prose. */}
      {service.faqs.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Services', url: '/services' },
          { name: shortName, url: `/services/${service.slug}` },
        ])}
      />

      {/* ------------------------------------------------------------------ Hero */}
      {/* Layout lives in <ServiceHero> so this route and the hand-built chiropractic one
          cannot drift apart. `attention` on the CTA is inside that component. */}
      <ServiceHero
        title={service.title}
        intro={lead?.body}
        image={service.heroImage}
        assurances={service.assurances}
        message={waMessage.service(service.title.split(' in ')[0])}
      />

      {/* ------------------------------------------------------ Social proof */}
      {/* SWAPPED WITH THE TRUST BAR AND KEY TAKEAWAYS, 2026-08-23, at the client's
          direction: a visitor arriving cold trusts what other patients say sooner than an
          accreditation logo they do not recognise, so the reviews take the slot directly
          under the hero and the credentials move down to sit with the practitioners.
          The hero's <RatingBadge> already shows the score; this is the evidence behind it. */}
      <GoogleReviews />

      {/* --------------------------------------------------- What we help with */}
      {/* Full width, four cards, one photograph each. This is the "is this me?" moment and it
          is scanned rather than read — a picture of the region gets recognised before the
          sentence under it does. The conditions list that used to sit alongside has moved to
          "Where to go next"; it is navigation, and it was competing with the one section on
          the page whose job is recognition.
          Renderer shared with the hand-built chiropractic route, which used to carry its own
          copy of this markup and silently dropped any photograph it was given. */}
      <OutcomeCards outcomes={service.outcomes} serviceName={shortName.toLowerCase()} />

      {/* ---------------------------------------------------------- Mid-page ask */}
      {/* The pages asked once in the hero and then not again until the CTA band at the foot,
          with only the mobile sticky bar in between, so a desktop reader who decided halfway
          down had nothing to click. This is the break between recognising the problem and
          being asked to fill in the qualifier. */}
      <InlineCta
        heading="Tell us what is going on"
        body="Start with the assessment. We will tell you what we find, what we would do about it, and whether this is the right approach for your case at all."
        message={waMessage.service(shortName)}
        secondary={{ href: '/what-to-expect', label: 'What happens on a first visit' }}
      />

      {/* -------------------------------------------------------- How it works */}
      {/* `mt-16` because <InlineCta> carries no vertical spacing of its own and this is a
          full-bleed band: without it the band's top border sits hard against the bottom edge
          of the CTA card. The chiropractic route does not need it because the section that
          follows its CTA is a padded container rather than a band. */}
      {steps.length > 0 && (
        <section className="mt-16 border-t border-line bg-white lg:mt-24">
          <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <Eyebrow>How it works</Eyebrow>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                  What {shortName.toLowerCase()} involves here
                </h2>
                <p className="mt-5 leading-relaxed text-ink-muted">
                  We assess before we begin, then explain what we find in plain terms,
                  including the parts your care is unlikely to change.
                </p>
                <div className="mt-8">
                  <WhatsAppButton message={waMessage.service(shortName)}>
                    Enquire on WhatsApp
                  </WhatsAppButton>
                </div>

                {service.midImage && (
                  <div className="mt-8 overflow-hidden rounded-3xl">
                    <Image
                      src={service.midImage.src}
                      alt={service.midImage.alt}
                      width={1400}
                      height={1000}
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <ol className="divide-y divide-line border-y border-line">
                {steps.map((step, i) => (
                  <li key={step.heading} className="flex gap-6 py-7">
                    <span
                      aria-hidden="true"
                      className="label flex-none pt-1.5 text-brand-gold-ink"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold">{step.heading}</h3>
                      <p className="mt-3 leading-relaxed text-ink-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}


      {/* ----------------------------------------------------------- Qualifier */}
      {/* AFTER the method, not before it, which is where the hand-built chiropractic route
          has run it since the client asked for that on 2026-08-09: the ask converts a reader
          while they still have the steps in mind, rather than making them commit before they
          have read what actually happens. The two routes disagreed on this until 2026-08-23;
          they now match, so a visitor moving between service pages meets the same page.

          The mid-page <InlineCta> above covers the earlier high-intent moment this slot used
          to serve, so nothing is lost by the later placement.
          Aqua ground so it reads as its own band between two it would otherwise blend into. */}
      {service.qualifierConcerns && service.qualifierConcerns.length > 0 && (
        <section className="border-y border-line bg-brand-aqua/40">
          <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
            <ServiceQualifier
              serviceName={shortName.toLowerCase()}
              concerns={service.qualifierConcerns}
            />
          </div>
        </section>
      )}


      {/* Physiotherapy only. The scannable version of the choice its FAQ answers in prose,
          and it sits after the qualifier so a reader who has just ticked their concerns can
          see the two disciplines side by side before being asked to decide. */}
      <ComparisonTable data={service.comparison} />

      {/* --------------------------------------------------- Who this is not for */}
      {/* The one block a competitor teardown (ianthechiro.my, 2026-08-23) had and we did not.
          Placed after the depth and before the team: it is the last honesty beat before the
          page starts asking for trust in named people and reviews. */}
      <FitCheck data={service.fitCheck} serviceName={shortName.toLowerCase()} />

      {/* `practitionersWithheld` carries the reason this is suppressed where it is. The team
          section is a first-order trust signal on a YMYL page, so it is only ever withheld
          when naming the people we CAN name would misrepresent who delivers the service. */}
      {!service.practitionersWithheld && <MeetDoctors />}

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

      {/* --------------------------------------------------------- Where to go next */}
      {/* Shared with the chiropractic route, which had no equivalent block at all until
          2026-08-23 and was the only service page that never linked back to /services. */}
      <WhereToGoNext helpsWith={helpsWith} relatedLinks={service.relatedLinks} />

      {/* Provenance, at the foot. Who reviewed the clinical copy and what it is sourced from
          are the two E-E-A-T signals a YMYL page needs, but they are credentials rather than
          reading — they belong where a reader checks the small print, not above the content
          they vouch for. */}
      <ReviewedBy date={service.lastReviewed} />
      <References items={service.citations} />

      <CtaBand
        heading={`Book your ${shortName.toLowerCase()} consultation`}
        body="Registered chiropractors and physiotherapists in Cheras, Maluri. Open seven days, right next to Sunway Velocity."
        message={waMessage.service(shortName)}
      />

      <StickyCta />
      {/* Clears the fixed mobile bar so it never covers the footer. Slate, not the page
          ground — as cream it read as an empty white band between the gold CTA and the
          footer; in the footer's own colour it is simply where the footer starts. */}
      <div aria-hidden="true" className="h-20 bg-brand-slate-deep lg:hidden" />
    </>
  )
}
