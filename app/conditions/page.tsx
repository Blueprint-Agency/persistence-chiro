import type { Metadata } from 'next'
import Link from 'next/link'
import { publishedConditions } from '@/lib/conditions'

export const metadata: Metadata = {
  title: 'Conditions We Treat in Cheras, Kuala Lumpur',
  description:
    'Back pain, slipped disc, sciatica, scoliosis, neck pain and sports injury — treated with Gonstead chiropractic and physiotherapy in Cheras, Maluri.',
  alternates: { canonical: '/conditions' },
}

export default function ConditionsHub() {
  const conditions = publishedConditions()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Conditions We Treat</h1>
      <p className="mt-4 text-lg text-ink-muted">
        Chiropractic and physiotherapy care in Cheras, Maluri, Kuala Lumpur.
      </p>

      {conditions.length === 0 ? (
        // Honest empty state rather than a hub linking to nothing. Clears itself the
        // moment the first condition page has copy and flips draft: false.
        <p className="mt-8 text-ink-muted">Condition pages are being prepared.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {conditions.map((c) => (
            <li key={c.slug}>
              <Link href={`/conditions/${c.slug}`} className="text-brand-slate underline">
                <h2 className="inline text-lg font-medium">{c.title.split(' in ')[0]}</h2>
              </Link>
              <p className="mt-1 text-sm text-ink-muted">{c.metaDescription}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
