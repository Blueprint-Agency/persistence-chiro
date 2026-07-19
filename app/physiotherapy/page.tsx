import type { Metadata } from 'next'
import Link from 'next/link'

import { clinic } from '@/lib/clinic'
import { publishedModalities, physiotherapyIntro } from '@/lib/physiotherapy'
import { CtaBand, Eyebrow, PageHero, Vertebrae } from '@/components/ui'

// Targets "physio cheras" (260/mo, SD 19) — flagged in seo-strategy.md as unclaimed by
// any chiropractor in the area.
export const metadata: Metadata = {
  title: 'Physiotherapy in Cheras, Maluri, Kuala Lumpur',
  description:
    'Dry needling, manual therapy, sports rehabilitation and individualised rehab programming in Cheras, Maluri. Physiotherapy alongside chiropractic care.',
  alternates: { canonical: '/physiotherapy' },
}

export default function PhysiotherapyHub() {
  const modalities = publishedModalities()

  return (
    <>
      <PageHero
        eyebrow="Physiotherapy"
        title="Physiotherapy in Cheras, Kuala Lumpur"
        intro={physiotherapyIntro}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            Treatment that ends with you not needing us.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Chiropractic restores how a joint moves. Physiotherapy builds the strength and
            control that keeps it moving — which is the part that stops the same injury coming
            back six months later.
          </p>
        </div>

        {modalities.length === 0 ? (
          <p className="mt-10 text-ink-muted">Physiotherapy pages are being prepared.</p>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {modalities.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/physiotherapy/${m.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-shadow hover:shadow-xl hover:shadow-black/5 lg:p-10"
                >
                  <Vertebrae className="text-brand-gold" />
                  <h3 className="mt-5 text-xl font-bold">{m.title.split(' in ')[0]}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{m.metaDescription}</p>
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
        body="Tell us your main concern — pain area, how long, what triggers it — and we'll point you to the right one before you book."
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
