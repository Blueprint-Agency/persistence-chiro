import type { Metadata } from 'next'
import Link from 'next/link'
import { publishedModalities, physiotherapyIntro } from '@/lib/physiotherapy'

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
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Physiotherapy in Cheras, Kuala Lumpur</h1>
      <p className="mt-4 text-lg text-ink-muted">{physiotherapyIntro}</p>

      {modalities.length === 0 ? (
        <p className="mt-8 text-ink-muted">Physiotherapy pages are being prepared.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {modalities.map((m) => (
            <li key={m.slug}>
              <Link href={`/physiotherapy/${m.slug}`} className="text-brand-slate underline">
                <h2 className="inline text-lg font-medium">{m.title.split(' in ')[0]}</h2>
              </Link>
              <p className="mt-1 text-sm text-ink-muted">{m.metaDescription}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
