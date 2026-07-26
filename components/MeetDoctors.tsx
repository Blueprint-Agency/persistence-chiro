import Image from 'next/image'
import Link from 'next/link'

import { practitioners, registrationsVerified } from '@/lib/clinic'
import { Eyebrow, Vertebrae } from '@/components/ui'

/**
 * "Meet your chiropractors" — the three registered practitioners who would actually treat
 * you. On a YMYL medical page, who is doing the work is a first-order trust question, and it
 * was previously answerable only by leaving the page.
 *
 * WHAT THIS DOES NOT DO: invent biographies. Only Dr. Valerie Na has published credentials
 * and a bio; the live about-us page carries nothing for the other two beyond role,
 * memberships and a registration number, and fabricating experience for a registered
 * healthcare practitioner is not an option. So every card shows the same verifiable fields
 * and links to the full profile — the depth differs there, honestly, rather than being
 * padded here.
 *
 * Registration numbers stay behind `registrationsVerified` for the reason set out in
 * lib/clinic.ts: two extractions disagreed about which number belongs to whom, and the live
 * page interleaves the cards so it cannot be settled by reading. A mis-assigned professional
 * registration is worse than an absent one.
 */
export function MeetDoctors({ heading = 'The chiropractors who would treat you' }: { heading?: string }) {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>Meet your chiropractors</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Three registered chiropractors, all trained in the Gonstead method and all members of
          the Gonstead Chiropractic Society Australia and the Association of Chiropractic
          Malaysia.
        </p>

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
                  width={900}
                  height={1125}
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
      </div>
    </section>
  )
}
