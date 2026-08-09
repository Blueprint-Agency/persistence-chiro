import Image from 'next/image'
import Link from 'next/link'

import { practitioners, publishedRegistrations } from '@/lib/clinic'
import { Eyebrow, RegistrationList, Vertebrae } from '@/components/ui'

/**
 * "Meet your chiropractors" — the three registered practitioners who would actually look after
 * you. On a YMYL medical page, who is doing the work is a first-order trust question, and it
 * was previously answerable only by leaving the page.
 *
 * WHAT THIS DOES NOT DO: invent biographies. Every card shows the same verifiable fields and
 * links to the full profile, where the depth differs honestly rather than being padded here.
 * All three now have a real bio — the clinic supplied Kee Shan's and Rynn's on 2026-08-09 —
 * but Rynn's `credentials` line is still blank because what we were given names no degree and
 * no university, and fabricating either for a registered healthcare practitioner is not an
 * option. The card simply omits the line; see lib/clinic.ts.
 *
 * Registration numbers show only for practitioners the clinic has confirmed — all three, since
 * 2026-08-09. The gate stays for whoever arrives next, for the reason set out in lib/clinic.ts:
 * a mis-assigned professional registration is worse than an absent one. Expect an uneven number
 * of lines per card; Rynn Hoh holds an MOH registration and no ACM one.
 */
export function MeetDoctors({ heading = 'The chiropractors who would look after you' }: { heading?: string }) {
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
      </div>
    </section>
  )
}
