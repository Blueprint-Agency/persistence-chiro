import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import { indexablePractitioners, practitioners, publishedRegistrations } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, collectionPageSchema, personSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import {
  CtaBand,
  Eyebrow,
  GhostButton,
  PageHero,
  RegistrationList,
  Vertebrae,
} from '@/components/ui'

export const metadata: Metadata = pageMetadata({
  // "Kuala Lumpur" abbreviated to KL to clear the ~60 Google renders, matching what every
  // condition and service metaTitle already does. Both local modifiers are kept.
  title: 'Our Chiropractors in Cheras, KL',
  description:
    'Meet the registered chiropractors at Persistence Chiropractic Care in Cheras, Maluri. Founder Valerie Na, our team, credentials and board memberships.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      {practitioners.map((p) => (
        <JsonLd key={p.slug} data={personSchema(p)} />
      ))}
      {/* This page is an index of the three practitioner pages, exactly as /conditions and
          /services index theirs — it was the one hub emitting no CollectionPage, so the
          three Person nodes above sat on the page with nothing tying them into a set.
          `indexablePractitioners` rather than `practitioners`: a profile held back for want
          of a bio is noindex, and listing it here would advertise a page we asked Google not
          to index. */}
      <JsonLd
        data={collectionPageSchema({
          name: 'Our chiropractors in Cheras, Maluri',
          description:
            'The registered chiropractors practising the Gonstead method at Persistence Chiropractic Care in Cheras, Kuala Lumpur.',
          url: '/about',
          items: indexablePractitioners().map((p) => ({
            name: p.name,
            url: `/about/${p.slug}`,
          })),
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: 'About', url: '/about' }])} />

      <PageHero
        eyebrow="About us"
        title="Our chiropractors in Cheras, Maluri"
        intro="Three registered chiropractors practising the Gonstead method. All of us are trained to find the one segment causing your pain, rather than adjusting everything and hoping."
      />

      {/* ---------------------------------------------------------------- Team */}
      {/* The founder section that used to sit above this was removed: Valerie's bio now
          lives on her own page, and repeating it here made her the page's subject when
          the page's job is introducing all three. Every card links to its own page. */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>Our team</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          The chiropractors who will actually be looking after you.
        </h2>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practitioners.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/about/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-ambient transition-shadow hover:shadow-ambient-raise"
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

                  {/* Renders nothing for a practitioner whose numbers the clinic hasn't
                      confirmed — see the note on registrations in lib/clinic.ts. */}
                  <RegistrationList items={publishedRegistrations(p)} className="mt-4" />

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
      {/* The logo wall lives on /partner-with-us now; this is a teaser + link. /our-partners
          301s to /partner-with-us, so this anchor is for internal navigation only. */}
      <section id="partners" className="scroll-mt-24 border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Eyebrow>Partners</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Organisations we work alongside.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            From Sunway Medical Centre Velocity next door to brands like Shopee, Maxis and
            Panasonic, we run wellness talks, screenings and collaborations across Kuala Lumpur.
          </p>
          <div className="mt-8">
            <GhostButton href="/partner-with-us">See our partners &amp; partner with us</GhostButton>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Want to know which of us to see?"
        body="Tell us your main concern and we'll match you to the right practitioner before you book."
      />
    </>
  )
}
