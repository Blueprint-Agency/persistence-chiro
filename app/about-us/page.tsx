import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import { clinic, practitioners, registrationsVerified } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { personSchema } from '@/lib/schema'
import { CtaBand, Eyebrow, PageHero, Vertebrae } from '@/components/ui'

export const metadata: Metadata = {
  title: 'About Our Chiropractors in Cheras, Kuala Lumpur',
  description:
    'Meet the chiropractors at Persistence Chiropractic Care in Cheras, Maluri — founder Dr. Valerie Na, credentials, and professional memberships.',
  alternates: { canonical: '/about-us' },
}

export default function AboutPage() {
  return (
    <>
      {practitioners.map((p) => (
        <JsonLd key={p.slug} data={personSchema(p)} />
      ))}

      <PageHero
        eyebrow="About us"
        title="Behind every adjustment is a team that treats spines, not symptoms."
        intro="Three registered chiropractors practising the Gonstead method in Cheras, Maluri — trained to find the one segment causing your pain rather than adjusting everything and hoping."
      />

      {/* ---------------------------------------------------------------- Team */}
      {/* The founder section that used to sit above this was removed: Valerie's bio now
          lives on her own page, and repeating it here made her the page's subject when
          the page's job is introducing all three. Every card links to its own page. */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>Our team</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          The chiropractors who will actually be treating you.
        </h2>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practitioners.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/about-us/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-xl hover:shadow-black/5"
              >
                <Image
                  src={p.photo}
                  alt={`${p.name}, ${p.role} at Persistence Chiropractic Care in Cheras, Kuala Lumpur`}
                  width={800}
                  height={1000}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold group-hover:text-brand-slate">{p.name}</h3>
                  <p className="mt-1 text-sm text-brand-slate">{p.role}</p>

                  {p.credentials && (
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.credentials}</p>
                  )}

                  {p.memberships.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                      {p.memberships.map((m) => (
                        <li key={m} className="flex gap-2.5 text-sm text-ink-muted">
                          <Vertebrae className="mt-1 text-brand-gold" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Registration numbers stay hidden until the clinic confirms the mapping —
                      see the warning on `registrationsVerified` in lib/clinic.ts. */}
                  {registrationsVerified && p.registrations.length > 0 && (
                    <p className="mt-3 text-xs text-ink-muted">{p.registrations.join(' · ')}</p>
                  )}

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate group-hover:gap-2.5">
                    Read profile
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------ Partners */}
      {/* /our-partners 301s to this anchor — it must exist or the redirect lands nowhere useful. */}
      <section id="partners" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 lg:py-24">
        <Eyebrow>Partners</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          Clinics and organisations we work alongside.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Partner logos from the previous site are in <code>assets/images</code> — 43 of them,
          pending selection and optimisation into <code>public/</code>.
        </p>
      </section>

      <CtaBand
        heading="Want to know which of us to see?"
        body="Tell us your main concern and we'll match you to the right practitioner before you book."
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
