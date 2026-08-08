import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { serviceBySlug, templatedServices } from '@/lib/services'
import { conditionBySlug } from '@/lib/conditions'
import { practitionerBySlug } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import {
  breadcrumbSchema,
  faqSchema,
  medicalProcedureSchema,
  reviewedMedicalWebPage,
} from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import {
  CheckIcon,
  CtaBand,
  Eyebrow,
  GhostButton,
  WhatsAppButton,
  Vertebrae,
} from '@/components/ui'
import {
  ComparisonTable,
  KeyTakeaways,
  RatingBadge,
  References,
  ReviewedBy,
  StickyCta,
  TrustBar,
} from '@/components/service'
import { GoogleReviews } from '@/components/GoogleReviews'
import { MeetDoctors } from '@/components/MeetDoctors'
import { ConcernIllustration } from '@/components/ConcernIllustration'
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

  const helpsWith = service.helpsWith.map(conditionBySlug).filter(Boolean)

  // The first section IS the page's subject, so it carries the hero intro; the rest become
  // the numbered "how it works" steps.
  const [lead, ...steps] = service.sections
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
      {/* Every answer below renders on the page, so the FAQPage schema is legitimate. */}
      {service.faqs.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Services', url: '/services' },
          { name: shortName, url: `/services/${service.slug}` },
        ])}
      />

      {/* ------------------------------------------------------------------ Hero */}
      <section className="bg-brand-slate-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow tone="light">Our services</Eyebrow>
              <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
                {service.title}
              </h1>
              {lead?.body && (
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                  {lead.body}
                </p>
              )}
              {/* One CTA. A second button beside it splits the decision without adding a
                  path — the phone number is still in the header bar and the footer for
                  anyone who wants it. */}
              {/* `attention` here and nowhere else on the page. The mid-page and CTA band
                  buttons stay still: the motion is a signal, and a signal repeated four times
                  down a page stops being one. */}
              <div className="mt-8">
                <WhatsAppButton
                  attention
                  message={waMessage.service(service.title.split(' in ')[0])}
                >
                  Book on WhatsApp
                </WhatsAppButton>
              </div>
              {/* Reassurance sits with the button, not nine paragraphs below it. These are
                  restatements of facts the page substantiates further down — the visitor
                  should not have to scroll to find out whether the needles are reused. */}
              {service.assurances && service.assurances.length > 0 ? (
                <ul className="mt-6 grid gap-2.5 text-sm text-white/75 sm:grid-cols-2 lg:grid-cols-1">
                  {service.assurances.map((a) => (
                    <li key={a} className="flex items-start gap-2.5">
                      <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-brand-gold" />
                      {a}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
                  <span>Open seven days · Cheras, Maluri</span>
                </div>
              )}

              <div className="mt-6">
                <RatingBadge tone="light" />
              </div>
            </div>

            {service.heroImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5]">
                <Image
                  src={service.heroImage.src}
                  alt={service.heroImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <TrustBar />

      {/* ------------------------------------------------------ Key takeaways */}
      {/* Directly under the trust bar, above the first thing that asks the reader to think.
          These are the blockers that stop a visitor before they read anything — can I just
          book, how long will it take, which discipline, are you open — and every one is
          answered again in full further down. Sitting them here costs one screen and saves
          a scroll for the answer engines that lift them verbatim. */}
      <KeyTakeaways items={service.keyTakeaways} />

      {/* --------------------------------------------------- What we help with */}
      {/* Full width, four cards, one photograph each. This is the "is this me?" moment and it
          is scanned rather than read — a picture of the region gets recognised before the
          sentence under it does. The conditions list that used to sit alongside has moved to
          "Where to go next"; it is navigation, and it was competing with the one section on
          the page whose job is recognition. */}
      {service.outcomes && service.outcomes.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Eyebrow>What we help with</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Reasons people come in for {shortName.toLowerCase()}
          </h2>

          {/* Column count follows the content: four outcomes fill one row of four, five fill
              3+2. Forcing five into a four-column grid leaves a single orphan card, which
              reads as a mistake rather than as a list. */}
          <ul
            className={`mt-12 grid gap-6 sm:grid-cols-2 ${
              service.outcomes.length % 4 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            }`}
          >
            {service.outcomes.map((outcome) => {
              const text = typeof outcome === 'string' ? outcome : outcome.text
              const image = typeof outcome === 'string' ? null : outcome.image
              const illustration = typeof outcome === 'string' ? null : outcome.illustration
              return (
                <li
                  key={text}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-ambient"
                >
                  {illustration ? (
                    <ConcernIllustration name={illustration} />
                  ) : (
                    image && (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1400}
                        height={1000}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    )
                  )}
                  <div className="flex flex-1 items-start gap-3 p-6">
                    <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-brand-slate" />
                    <p className="leading-relaxed text-ink-muted">{text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* ----------------------------------------------------------- Qualifier */}
      {/* Sits directly after "what we help with", not near the foot of the page.
          A visitor who has just recognised their own problem in the list above is at the
          highest-intent moment on the page; this used to sit eight sections down, behind
          three long-form essays and a citation list, which is a long way to ask someone to
          walk before being offered the easiest possible way to start a conversation.
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

      {/* -------------------------------------------------------- How it works */}
      {steps.length > 0 && (
        <section className="border-t border-line bg-white">
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
                    Book on WhatsApp
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

      {/* ----------------------------------------------------- Long-form depth */}
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

      {/* Sits immediately after the long-form block that raises the question in prose, so the
          table is the scannable version of the paragraph above it rather than a new topic. */}
      <ComparisonTable data={service.comparison} />

      <MeetDoctors />

      <GoogleReviews />

      {/* ----------------------------------------------------------------- FAQs */}
      {service.faqs.length > 0 && (
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
      )}

      {/* --------------------------------------------------------- Where to go next */}
      {/* The internal-link block: conditions this service helps with, plus the sibling pages.
          Real SEO value, low decision value — so it sits after the FAQ, where someone who
          has finished reading is choosing a next page rather than choosing whether to come in. */}
      {(helpsWith.length > 0 || (service.relatedLinks && service.relatedLinks.length > 0)) && (
        <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Eyebrow>Where to go next</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Related conditions and services
          </h2>

          {helpsWith.length > 0 && (
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {helpsWith.map((c) => (
                <li key={c!.slug}>
                  <Link
                    href={`/conditions/${c!.slug}`}
                    className="flex items-start gap-2.5 text-ink-muted hover:text-brand-slate"
                  >
                    <Vertebrae className="mt-1.5 text-brand-gold" />
                    {c!.title.split(' in ')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {service.relatedLinks && service.relatedLinks.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {service.relatedLinks.map((link) => (
                <GhostButton key={link.href} href={link.href}>
                  {link.label}
                </GhostButton>
              ))}
              <GhostButton href="/services">All our services in Cheras</GhostButton>
            </div>
          )}
        </section>
      )}

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
