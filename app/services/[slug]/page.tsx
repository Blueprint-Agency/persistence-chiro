import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { serviceBySlug, templatedServices } from '@/lib/services'
import { conditionBySlug } from '@/lib/conditions'
import { clinic } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, faqSchema, medicalProcedureSchema } from '@/lib/schema'
import {
  CheckIcon,
  CtaBand,
  Eyebrow,
  GhostButton,
  GoldButton,
  Vertebrae,
  WhatsAppIcon,
} from '@/components/ui'
import { RatingBadge, StickyCta, TrustBar } from '@/components/service'
import { GoogleReviews } from '@/components/GoogleReviews'
import { ServiceQualifier } from '@/components/ServiceQualifier'

export function generateStaticParams() {
  return templatedServices().map((s) => ({ slug: s.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = serviceBySlug(slug)
  if (!service) return {}

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = serviceBySlug(slug)
  if (!service || service.draft) notFound()

  const treats = service.treats.map(conditionBySlug).filter(Boolean)

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
        })}
      />
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
              <div className="mt-8 flex flex-wrap gap-3">
                <GoldButton href={clinic.bookingUrl} external>
                  Book a consultation
                </GoldButton>
                <GhostButton href={clinic.whatsappUrl} external tone="light">
                  <WhatsAppIcon />
                  WhatsApp us
                </GhostButton>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
                <RatingBadge tone="light" />
                <span>Open seven days · Cheras, Maluri</span>
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

      {/* --------------------------------------------------- What we help with */}
      {(service.outcomes?.length || treats.length > 0) && (
        <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <Eyebrow>What we help with</Eyebrow>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                Reasons people come in for {shortName.toLowerCase()}
              </h2>
              {service.outcomes && service.outcomes.length > 0 && (
                <ul className="mt-8 space-y-3.5">
                  {service.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3 leading-relaxed text-ink-muted">
                      <CheckIcon className="mt-1 h-5 w-5 flex-none text-brand-slate" />
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {treats.length > 0 && (
              <div className="rounded-3xl border border-line bg-white p-8 lg:self-start">
                <Eyebrow>Conditions we commonly see</Eyebrow>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                  {treats.map((c) => (
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
                <Link
                  href="/services"
                  className="mt-5 inline-block text-sm font-semibold text-brand-slate underline underline-offset-4"
                >
                  All our services in Cheras
                </Link>
              </div>
            )}
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
                  We assess before we treat, then explain what we find in plain terms,
                  including the parts your care is unlikely to change.
                </p>
                <div className="mt-8">
                  <GoldButton href={clinic.bookingUrl} external>
                    Book a consultation
                  </GoldButton>
                </div>
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
      {service.qualifierConcerns && service.qualifierConcerns.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
          <ServiceQualifier serviceName={shortName.toLowerCase()} concerns={service.qualifierConcerns} />
        </section>
      )}

      {service.relatedLinks && service.relatedLinks.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 pb-4">
          <div className="flex flex-wrap gap-3">
            {service.relatedLinks.map((link) => (
              <GhostButton key={link.href} href={link.href}>
                {link.label}
              </GhostButton>
            ))}
          </div>
        </div>
      )}

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

      <CtaBand
        heading={`Book your ${shortName.toLowerCase()} consultation`}
        body="Registered chiropractors and physiotherapists in Cheras, Maluri. Open seven days, right next to Sunway Velocity."
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />

      <StickyCta />
      {/* Clears the fixed mobile bar so it never covers the footer. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </>
  )
}
