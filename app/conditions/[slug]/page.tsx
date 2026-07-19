import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { conditionBySlug, publishedConditions } from '@/lib/conditions'
import { modalityBySlug } from '@/lib/physiotherapy'
import { clinic } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { medicalWebPageSchema, faqSchema } from '@/lib/schema'

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
    <article className="mx-auto max-w-3xl px-4 py-12">
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

      <h1 className="text-3xl font-semibold">{condition.title}</h1>
      <p className="mt-4 text-lg text-ink-muted">{condition.metaDescription}</p>

      {condition.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
          <dl className="mt-4 space-y-6">
            {condition.faqs.map((faq) => (
              <div key={faq.q}>
                <dt className="font-medium text-ink">{faq.q}</dt>
                <dd className="mt-1 text-ink-muted">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {treatedBy.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">How we treat it</h2>
          <ul className="mt-4 space-y-2">
            {treatedBy.map((m) => (
              <li key={m!.slug}>
                <Link href={`/physiotherapy/${m!.slug}`} className="text-brand-slate underline">
                  {m!.title.split(' in ')[0]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12 rounded border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-xl font-semibold">Book an assessment</h2>
        <p className="mt-2 text-ink-muted">
          Registered chiropractors in Cheras, Maluri. Open seven days.
        </p>
        <a
          href={clinic.bookingUrl}
          target="_blank"
          rel="noopener"
          className="mt-4 inline-block rounded bg-brand-gold px-5 py-2.5 font-medium text-ink"
        >
          Book an appointment
        </a>
      </section>

      {related.length > 0 && (
        <nav aria-label="Related conditions" className="mt-12 border-t border-neutral-200 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Related
          </h2>
          <ul className="mt-3 space-y-1">
            {related.map((c) => (
              <li key={c!.slug}>
                <Link href={`/conditions/${c!.slug}`} className="text-brand-slate underline">
                  {c!.title.split(' in ')[0]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </article>
  )
}
