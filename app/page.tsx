import Link from 'next/link'
import type { Metadata } from 'next'

import { clinic } from '@/lib/clinic'
import { publishedConditions } from '@/lib/conditions'

/**
 * The homepage IS the Cheras page — there is deliberately no /areas/cheras. It already
 * ranks #16 for "chiro cheras" and holds most of the site's referring domains; a second
 * page would compete with it from zero. H1 must contain "Chiropractor in Cheras".
 * LocalBusiness JSON-LD is emitted once in the root layout.
 */
export const metadata: Metadata = {
  title: 'Chiropractor in Cheras (Maluri), Kuala Lumpur | Persistence Chiropractic',
  description:
    'Gonstead chiropractic and physiotherapy in Cheras, Maluri. Registered chiropractors treating back pain, slipped disc, sciatica and sports injury. Open seven days.',
  alternates: { canonical: '/' },
}

export default function Home() {
  const conditions = publishedConditions()

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-semibold">
          Chiropractor in Cheras (Maluri), Kuala Lumpur
        </h1>
        <p className="mt-6 text-lg text-ink-muted">
          Gonstead-technique chiropractic and physiotherapy at Sunway Velocity. Registered
          chiropractors, open seven days a week.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={clinic.bookingUrl}
            target="_blank"
            rel="noopener"
            className="rounded bg-brand-gold px-5 py-2.5 font-medium text-ink"
          >
            Book an appointment
          </a>
          <Link
            href="/contact-us"
            className="rounded border border-neutral-300 px-5 py-2.5 font-medium text-ink"
          >
            Directions &amp; hours
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-2xl font-semibold">What we treat</h2>
        {conditions.length === 0 ? (
          <p className="mt-4 text-ink-muted">Condition pages are being prepared.</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {conditions.map((c) => (
              <li key={c.slug}>
                <Link href={`/conditions/${c.slug}`} className="text-brand-slate underline">
                  {c.title.split(' in ')[0]}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex gap-6">
          <Link href="/chiropractic" className="text-brand-slate underline">
            Our Gonstead approach
          </Link>
          <Link href="/physiotherapy" className="text-brand-slate underline">
            Physiotherapy
          </Link>
        </div>
      </section>
    </>
  )
}
