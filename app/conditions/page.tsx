import type { Metadata } from 'next'
import Link from 'next/link'

import { clinic } from '@/lib/clinic'
import { publishedConditions } from '@/lib/conditions'
import { CtaBand, GhostButton, PageHero, Vertebrae } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Conditions We Treat in Cheras, Kuala Lumpur',
  description:
    'Back pain, slipped disc, sciatica, scoliosis, neck pain and sports injury. Treated with Gonstead chiropractic and physiotherapy in Cheras, Maluri.',
  alternates: { canonical: '/conditions' },
}

export default function ConditionsHub() {
  const conditions = publishedConditions()

  return (
    <>
      <PageHero
        eyebrow="Conditions"
        title="Conditions we treat"
        intro="Chiropractic and physiotherapy care in Cheras, Maluri, Kuala Lumpur."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        {conditions.length === 0 ? (
          // Honest empty state rather than a hub linking to nothing. Clears itself the
          // moment the first condition page has copy and flips draft: false.
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold">Condition pages are being prepared.</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              In the meantime, the two pages below cover how we assess and treat. You can also
              message us with your symptoms and we&rsquo;ll tell you which applies to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GhostButton href="/services/chiropractic-treatment">Our Gonstead approach</GhostButton>
              <GhostButton href="/services/physiotherapy">Physiotherapy</GhostButton>
            </div>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {conditions.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/conditions/${c.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-shadow hover:shadow-xl hover:shadow-black/5 lg:p-10"
                >
                  <Vertebrae className="text-brand-gold" />
                  <h2 className="mt-5 text-xl font-bold">{c.title.split(' in ')[0]}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{c.metaDescription}</p>
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
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
