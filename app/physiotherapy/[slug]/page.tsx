import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { modalityBySlug, publishedModalities } from '@/lib/physiotherapy'
import { conditionBySlug } from '@/lib/conditions'
import { clinic } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { medicalProcedureSchema } from '@/lib/schema'

export function generateStaticParams() {
  return publishedModalities().map((m) => ({ slug: m.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const modality = modalityBySlug(slug)
  if (!modality) return {}

  return {
    title: modality.metaTitle,
    description: modality.metaDescription,
    alternates: { canonical: `/physiotherapy/${modality.slug}` },
    openGraph: {
      title: modality.metaTitle,
      description: modality.metaDescription,
      url: `/physiotherapy/${modality.slug}`,
    },
  }
}

export default async function ModalityPage({ params }: Props) {
  const { slug } = await params
  const modality = modalityBySlug(slug)
  if (!modality || modality.draft) notFound()

  const treats = modality.treats.map(conditionBySlug).filter(Boolean)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={medicalProcedureSchema({
          name: modality.title,
          description: modality.metaDescription,
          url: `/physiotherapy/${modality.slug}`,
        })}
      />

      <h1 className="text-3xl font-semibold">{modality.title}</h1>

      {modality.sections.map((s, i) => (
        <section key={s.heading} className={i === 0 ? 'mt-6' : 'mt-10'}>
          {/* The first section IS the page's subject, so its heading would duplicate the
              h1 — skip it and lead with the copy. Folded-in services keep their heading. */}
          {i > 0 && <h2 className="text-2xl font-semibold">{s.heading}</h2>}
          <p className={`${i > 0 ? 'mt-2' : ''} text-lg text-ink-muted`}>{s.body}</p>
        </section>
      ))}

      {treats.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">What we treat with it</h2>
          <ul className="mt-4 space-y-2">
            {treats.map((c) => (
              <li key={c!.slug}>
                <Link href={`/conditions/${c!.slug}`} className="text-brand-slate underline">
                  {c!.title.split(' in ')[0]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12 rounded border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-xl font-semibold">Book an assessment</h2>
        <p className="mt-2 text-ink-muted">
          Chiropractic and physiotherapy in Cheras, Maluri. Open seven days.
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
    </article>
  )
}
