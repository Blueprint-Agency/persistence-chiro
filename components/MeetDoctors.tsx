import Image from 'next/image'
import Link from 'next/link'

import { practitioners, publishedRegistrations, hasBioFor } from '@/lib/clinic'
import { type Locale, pathFor } from '@/lib/i18n'
import type { Dictionary } from '@/dictionaries/types'
import { Eyebrow, RegistrationList, Vertebrae } from '@/components/ui'

/**
 * "Meet your chiropractors" — the three registered practitioners who would actually look after
 * you. On a YMYL medical page, who is doing the work is a first-order trust question, and it
 * was previously answerable only by leaving the page.
 *
 * WHAT THIS DOES NOT DO: invent biographies. Every card shows the same verifiable fields and
 * links to the full profile, where the depth differs honestly rather than being padded here.
 * All three now have a real bio — the clinic supplied Kee Shan's and Rynn's on 2026-08-09 —
 * and all three carry a credentials line, Rynn's since the clinic sent his degrees on
 * 2026-09-01. The line stays conditional: a practitioner whose qualification we have not been
 * told simply omits it rather than having one invented. See lib/clinic.ts.
 *
 * Registration numbers show only for practitioners the clinic has confirmed — all three, since
 * 2026-08-09. The gate stays for whoever arrives next, for the reason set out in lib/clinic.ts:
 * a mis-assigned professional registration is worse than an absent one. Expect an uneven number
 * of lines per card; Rynn Hoh holds an MOH registration and no ACM one.
 */
export function MeetDoctors({
  locale,
  dict,
  heading,
}: {
  locale: Locale
  dict: Dictionary
  heading?: string
}) {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>{dict.page.meetYourChiropractors}</Eyebrow>
        <h2 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl">
          {heading ?? dict.page.theChiropractorsWhoWouldLookAfterYou}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {dict.page.threeRegisteredChiropractorsLine}
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practitioners.map((p) => {
            // A profile page only exists in this locale once `lib/practitioner-bios.zh.ts`/
            // `.ms.ts` has a real entry for it (see `hasBioFor`) — currently true for every
            // practitioner in English and none yet in zh/ms. Linking unconditionally to
            // `/about/${p.slug}` sent every zh/ms visitor to a 404; this card now degrades
            // to plain (unlinked) information instead, the same "don't link to a 404" rule
            // `WhereToGoNext`/`linkifyBody`/the press page already follow.
            const hasProfile = hasBioFor(locale, p.slug)
            const cardBody = (
              <>
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

                  {p.credentials.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {p.credentials.map((c) => (
                        <p key={c} className="text-sm leading-relaxed text-ink-muted">
                          {c}
                        </p>
                      ))}
                    </div>
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

                  {hasProfile && (
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate group-hover:gap-2.5">
                      {dict.page.readProfile}
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  )}
                </div>
              </>
            )

            return (
              <li key={p.slug}>
                {hasProfile ? (
                  <Link
                    href={pathFor(locale, `/about/${p.slug}`)}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-ambient transition-shadow hover:shadow-ambient-raise"
                  >
                    {cardBody}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-ambient">
                    {cardBody}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
