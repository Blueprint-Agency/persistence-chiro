import type { Metadata } from 'next'
import Link from 'next/link'

import { clinic } from '@/lib/clinic'
import { publishedServices, servicesIntro } from '@/lib/services'
import { CtaBand, Eyebrow, PageHero, Vertebrae } from '@/components/ui'

/**
 * Services hub. One of the seven main pages in `seo-proposal.html`.
 *
 * Deliberately NOT targeting "physio cheras" — that keyword belongs to
 * /services/physiotherapy, which is the page that can actually answer it. A hub competing
 * with its own child for one term is the cannibalisation the architecture exists to
 * prevent. This page exists to route visitors and to pass link equity down.
 */
export const metadata: Metadata = {
  title: 'Our Services: Chiropractic & Physiotherapy in Cheras, KL',
  description:
    'Chiropractic treatment, dry needling, physiotherapy, sports injury rehabilitation and posture correction in Cheras, Maluri, Kuala Lumpur.',
  alternates: { canonical: '/services' },
}

export default function ServicesHub() {
  const services = publishedServices()

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Chiropractic and physiotherapy in Cheras, Kuala Lumpur"
        intro={servicesIntro}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            Chiropractic, physiotherapy and rehabilitation
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Chiropractic works on how a joint moves. Physiotherapy builds the strength and
            control around it. That second part is usually what keeps the problem from coming
            back six months later. Which you need depends on what the assessment finds.
          </p>
        </div>

        {services.length === 0 ? (
          <p className="mt-10 text-ink-muted">Service pages are being prepared.</p>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-shadow hover:shadow-xl hover:shadow-black/5 lg:p-10"
                >
                  <Vertebrae className="text-brand-gold" />
                  <h3 className="mt-5 text-xl font-bold">{s.title.split(' in ')[0]}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{s.metaDescription}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate group-hover:gap-2.5">
                    Read more
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <CtaBand
        heading="Not sure whether you need chiro or physio?"
        body="Tell us where the pain is, how long it's been there and what sets it off. We'll point you to the right one before you book."
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
