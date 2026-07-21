import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { clinic, hasBio, practitionerBySlug, practitioners, registrationsVerified } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { personSchema } from '@/lib/schema'
import { CtaBand, Eyebrow, GhostButton, GoldButton, PageHero, Prose, Vertebrae } from '@/components/ui'

/** Every practitioner gets a route — the team cards on /about all link here. */
export function generateStaticParams() {
  return practitioners.map((p) => ({ slug: p.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = practitionerBySlug(slug)
  if (!p) return {}

  const title = `${p.name}, Chiropractor in Cheras, KL`
  const description = `${p.name}, ${p.role} at Persistence Chiropractic Care in Cheras, Maluri. ${
    p.credentials || 'Gonstead-technique chiropractic in Kuala Lumpur.'
  }`

  return {
    title,
    description,
    alternates: { canonical: `/about/${p.slug}` },
    openGraph: { title, description, url: `/about/${p.slug}`, images: [p.photo] },
    // Reachable, but not submitted for indexing until there's a real bio to index.
    // Derived from the bio itself so it can't drift — see lib/clinic.ts.
    ...(hasBio(p) ? {} : { robots: { index: false, follow: true } }),
  }
}

export default async function PractitionerPage({ params }: Props) {
  const { slug } = await params
  const p = practitionerBySlug(slug)
  if (!p) notFound()

  return (
    <>
      <JsonLd data={personSchema(p)} />

      <PageHero eyebrow="About us" title={p.name} intro={p.role} />

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={p.photo}
                alt={`${p.name}, ${p.role} at Persistence Chiropractic Care in Cheras, Kuala Lumpur`}
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
                className="w-full object-cover"
              />
            </div>

            {p.memberships.length > 0 && (
              <div className="mt-6 rounded-3xl border border-line bg-white p-8">
                <Eyebrow>Memberships</Eyebrow>
                <ul className="mt-5 space-y-2">
                  {p.memberships.map((m) => (
                    <li key={m} className="flex gap-2.5 text-ink-muted">
                      <Vertebrae className="mt-1.5 text-brand-gold" />
                      {m}
                    </li>
                  ))}
                </ul>

                {/* Registration numbers stay hidden until the clinic confirms the mapping —
                    see the warning on `registrationsVerified` in lib/clinic.ts. */}
                {registrationsVerified && p.registrations.length > 0 && (
                  <p className="mt-5 border-t border-line pt-5 text-xs text-ink-muted">
                    {p.registrations.join(' · ')}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            {p.credentials && (
              <>
                <Eyebrow>Credentials</Eyebrow>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">{p.credentials}</p>
              </>
            )}

            {p.bio.length > 0 && (
              <div className="mt-8">
                <Prose>
                  {p.bio.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </Prose>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <GoldButton href={clinic.bookingUrl} external>
                Book an appointment
              </GoldButton>
              <GhostButton href="/about">Back to the team</GhostButton>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        heading={`See ${p.name} in Cheras.`}
        body="Gonstead chiropractic next to Sunway Velocity. Open seven days."
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
