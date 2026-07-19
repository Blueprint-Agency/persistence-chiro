import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press & Publications',
  description:
    'Media features and publications about Persistence Chiropractic Care, Cheras, Kuala Lumpur.',
  alternates: { canonical: '/press' },
}

/**
 * Single page, no [slug] children — two items don't warrant an index/detail split.
 *
 * `url` should point at the ACTUAL publication. On the live Wix site both "Read More"
 * links go to internal pages instead, which is why the two legacy detail URLs 301 here.
 * Until the clinic supplies the real Going Places and Big Pharmacy URLs, these render as
 * plain text rather than dead links.
 */
const features = [
  {
    title: 'Going Places Magazine: Celebrating the Spirits of Malaysia',
    publication: 'Going Places',
    date: 'September 2023',
    blurb: 'The Spirit of Malaysia: Committed to Pain Free Living.',
    url: '',
  },
  {
    title: 'Big Pharmacy: Less Pain, More Gain with Regular Chiropractic Care',
    publication: 'Big Pharmacy E-Newsletter',
    date: 'July–September 2022',
    blurb: 'Big Pharmacy E-Newsletter features Persistence Chiropractic.',
    url: '',
  },
]

export default function PressPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Press &amp; Publications</h1>
      <p className="mt-4 text-lg text-ink-muted">
        We&apos;re in the news. Some of the prints and newsletters we&apos;ve been featured in
        recently.
      </p>

      <ul className="mt-8 space-y-8">
        {features.map((f) => (
          <li key={f.title}>
            <h2 className="text-lg font-medium">
              {f.url ? (
                <a href={f.url} target="_blank" rel="noopener" className="text-brand-slate underline">
                  {f.title}
                </a>
              ) : (
                f.title
              )}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {f.publication} · {f.date}
            </p>
            <p className="mt-2 text-ink-muted">{f.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
