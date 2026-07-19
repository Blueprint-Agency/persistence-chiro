import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { conditionBySlug, publishedConditions } from '@/lib/conditions'
import { modalityBySlug } from '@/lib/physiotherapy'
import { clinic } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { medicalWebPageSchema, faqSchema } from '@/lib/schema'
import { CtaBand, Eyebrow, GoldButton, PageHero, Vertebrae } from '@/components/ui'

// Only published conditions get built. A draft page has no route, so it can't be
// crawled or indexed while its clinical copy is still missing.
export function generateStaticParams() {
  return publishedConditions().map((c) => ({ slug: c.slug }))
}

// params is a Promise in Next 15+ and still is in 16 — must be awaited.
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const condition = conditionBySlug(slug)
  if (!condition) return {}

  return {
    title: condition.metaTitle,
    description: condition.metaDescription,
    alternates: { canonical: `/conditions/${condition.slug}` },
    openGraph: {
      title: condition.metaTitle,
      description: condition.metaDescription,
      url: `/conditions/${condition.slug}`,
    },
  }
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params
  const condition = conditionBySlug(slug)
  if (!condition || condition.draft) notFound()

  const related = condition.related.map(conditionBySlug).filter(Boolean)
  const treatedBy = condition.treatedBy.map(modalityBySlug).filter(Boolean)

  return (
    <>
      <JsonLd
        data={medicalWebPageSchema({
          name: condition.title,
          description: condition.metaDescription,
          url: `/conditions/${condition.slug}`,
        })}
      />
      {/* FAQ schema is only emitted when the answers actually render below — Google
          treats invisible FAQ markup as a violation. */}
      {condition.faqs.length > 0 && <JsonLd data={faqSchema(condition.faqs)} />}

      <PageHero
        eyebrow="Conditions"
        title={condition.title}
        intro={condition.metaDescription}
      />

      <article className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {condition.faqs.length > 0 && (
              <section>
                <Eyebrow>Frequently asked questions</Eyebrow>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight">
                  What patients ask us
                </h2>
                <div className="mt-8 divide-y divide-line border-y border-line">
                  {condition.faqs.map((faq) => (
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
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            {treatedBy.length > 0 && (
              <div className="rounded-3xl border border-line bg-white p-8">
                <Eyebrow>How we treat it</Eyebrow>
                <ul className="mt-5 space-y-2.5">
                  {treatedBy.map((m) => (
                    <li key={m!.slug}>
                      <Link
                        href={`/physiotherapy/${m!.slug}`}
                        className="flex items-start gap-2.5 text-ink-muted hover:text-brand-slate"
                      >
                        <Vertebrae className="mt-1.5 text-brand-gold" />
                        {m!.title.split(' in ')[0]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 rounded-3xl bg-brand-aqua/50 p-8">
              <h2 className="text-xl font-bold">Book an assessment</h2>
              <p className="mt-2 leading-relaxed text-ink-muted">
                Registered chiropractors in Cheras, Maluri. Open seven days.
              </p>
              <div className="mt-5">
                <GoldButton href={clinic.bookingUrl} external>
                  Book an appointment
                </GoldButton>
              </div>
            </div>

            {related.length > 0 && (
              <nav aria-label="Related conditions" className="mt-6 rounded-3xl border border-line p-8">
                <Eyebrow>Related</Eyebrow>
                <ul className="mt-5 space-y-2.5">
                  {related.map((c) => (
                    <li key={c!.slug}>
                      <Link
                        href={`/conditions/${c!.slug}`}
                        className="text-ink-muted hover:text-brand-slate"
                      >
                        {c!.title.split(' in ')[0]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
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
