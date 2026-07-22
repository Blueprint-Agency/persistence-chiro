import type { Metadata } from 'next'

import Link from 'next/link'

import { clinic } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { CtaBand, PageHero, Vertebrae } from '@/components/ui'

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
    date: 'July to September 2022',
    blurb: 'Big Pharmacy E-Newsletter features Persistence Chiropractic.',
    url: '',
  },
]

export default function PressPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Press', url: '/press' }])} />

      <PageHero
        eyebrow="Press"
        title="Press & publications"
        intro="Some of the prints and newsletters we've been featured in recently."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <ul className="grid gap-6 md:grid-cols-2">
          {features.map((f) => (
            <li
              key={f.title}
              className="flex flex-col rounded-3xl border border-line bg-white p-8 lg:p-10"
            >
              <Vertebrae className="text-brand-gold" />
              <p className="mt-5 label text-brand-slate">
                {f.publication} &middot; {f.date}
              </p>
              <h2 className="mt-3 text-xl font-bold leading-snug">
                {f.url ? (
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener"
                    className="hover:text-brand-slate"
                  >
                    {f.title}
                  </a>
                ) : (
                  f.title
                )}
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{f.blurb}</p>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-2xl leading-relaxed text-ink-muted">
          Behind the coverage is a small team of registered chiropractors. Meet{' '}
          <Link
            href="/about"
            className="font-semibold text-brand-slate underline underline-offset-4"
          >
            the practitioners
          </Link>{' '}
          or read about{' '}
          <Link
            href="/services"
            className="font-semibold text-brand-slate underline underline-offset-4"
          >
            the care we offer in Cheras
          </Link>
          .
        </p>
      </section>

      <CtaBand
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
