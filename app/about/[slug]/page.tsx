import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { hasBio, practitionerBySlug, practitioners, publishedRegistrations } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, personSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import {
  CtaBand,
  Eyebrow,
  GhostButton,
  WhatsAppButton,
  PageHero,
  Prose,
  RegistrationList,
  Vertebrae,
} from '@/components/ui'
import { waMessage } from '@/lib/whatsapp'

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

  return pageMetadata({
    title,
    description,
    path: `/about/${p.slug}`,
    // Deliberately the sitewide shopfront card, not p.photo: the headshots are portrait
    // 900x1125, and a 1.91:1 social crop of a face cuts it off at the chin.

    // Reachable, but not submitted for indexing until there's a real bio to index. Derived
    // from the bio itself so it can't drift — see lib/clinic.ts. All three currently pass.
    noindex: !hasBio(p),
  })
}

export default async function PractitionerPage({ params }: Props) {
  const { slug } = await params
  const p = practitionerBySlug(slug)
  if (!p) notFound()

  const registrations = publishedRegistrations(p)

  return (
    <>
      <JsonLd data={personSchema(p)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'About', url: '/about' },
          { name: p.name, url: `/about/${p.slug}` },
        ])}
      />

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

            {/* Registration first, memberships second: a number a reader can look up on a
                public register outranks a society they'd have to take our word for.
                `publishedRegistrations` is empty for anyone the clinic hasn't confirmed —
                see the note on registrations in lib/clinic.ts. */}
            {registrations.length > 0 && (
              <div className="mt-6 rounded-3xl border border-line bg-white p-8 shadow-ambient">
                <Eyebrow>Registration</Eyebrow>
                <RegistrationList items={registrations} variant="panel" className="mt-5" />
              </div>
            )}

            {p.memberships.length > 0 && (
              <div className="mt-6 rounded-3xl border border-line bg-white p-8 shadow-ambient">
                <Eyebrow>Memberships</Eyebrow>
                <ul className="mt-5 space-y-2">
                  {p.memberships.map((m) => (
                    <li key={m} className="flex gap-2.5 text-ink-muted">
                      <Vertebrae className="mt-1.5 text-brand-gold" />
                      {m}
                    </li>
                  ))}
                </ul>
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
              <WhatsAppButton message={waMessage.practitioner(p.name)}>
                Book with {p.name.replace(/^Dr\.?\s*/, 'Dr ')}
              </WhatsAppButton>
              <GhostButton href="/about">Back to the team</GhostButton>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        heading={`See ${p.name} in Cheras.`}
        body="Gonstead chiropractic next to Sunway Velocity. Open seven days."
        message={waMessage.practitioner(p.name)}
      />
    </>
  )
}
