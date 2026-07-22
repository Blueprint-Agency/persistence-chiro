import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { serviceBySlug, templatedServices } from '@/lib/services'
import { conditionBySlug } from '@/lib/conditions'
import { clinic } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, medicalProcedureSchema } from '@/lib/schema'
import { CtaBand, Eyebrow, GoldButton, PageHero, Vertebrae } from '@/components/ui'

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

  // The first section IS the page's subject, so its heading would duplicate the h1.
  // Folded-in services (see the header comment in services.ts) keep theirs.
  const [lead, ...folded] = service.sections

  return (
    <>
      <JsonLd
        data={medicalProcedureSchema({
          name: service.title,
          description: service.metaDescription,
          url: `/services/${service.slug}`,
        })}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Services', url: '/services' },
          { name: service.title.split(' in ')[0], url: `/services/${service.slug}` },
        ])}
      />

      <PageHero eyebrow="Our services" title={service.title} intro={lead?.body} />

      <article className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {folded.length > 0 && (
              <div className="divide-y divide-line border-y border-line">
                {folded.map((s) => (
                  <section key={s.heading} className="py-7">
                    <h2 className="text-xl font-bold">{s.heading}</h2>
                    <p className="mt-3 leading-relaxed text-ink-muted">{s.body}</p>
                  </section>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            {treats.length > 0 && (
              <div className="rounded-3xl border border-line bg-white p-8">
                <Eyebrow>What we treat with it</Eyebrow>
                <ul className="mt-5 space-y-2.5">
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
              </div>
            )}

            <div className="mt-6 rounded-3xl bg-brand-aqua/50 p-8">
              <h2 className="text-xl font-bold">Book an assessment</h2>
              <p className="mt-2 leading-relaxed text-ink-muted">
                Chiropractic and physiotherapy in Cheras, Maluri. Open seven days.
              </p>
              <div className="mt-5">
                <GoldButton href={clinic.bookingUrl} external>
                  Book an appointment
                </GoldButton>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <CtaBand
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
