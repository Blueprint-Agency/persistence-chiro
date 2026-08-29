import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import {
  bioFor,
  hasBioFor,
  indexablePractitionersFor,
  practitionerBySlug,
  publishedRegistrations,
} from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, personSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { LOCALES, isLocale, pathFor } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import {
  CtaBand,
  Eyebrow,
  GhostButton,
  WhatsAppButton,
  PageHero,
  Prose,
  RegistrationList,
  Vertebrae,
} from '@/components/ui'
import { waMessage } from '@/lib/whatsapp'

/**
 * One route per practitioner PER LOCALE their bio exists in. English always has all
 * three (the roster in `lib/clinic.ts`); `zh`/`ms` only get a slug once
 * `lib/practitioner-bios.zh.ts` / `.ms.ts` has a real, reviewed entry for it — see
 * `bioFor`/`hasBioFor` in `lib/clinic.ts`.
 */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return []
  return indexablePractitionersFor(params.locale).map((p) => ({ slug: p.slug }))
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale
  const p = practitionerBySlug(slug)
  if (!p || !hasBioFor(locale, slug)) return {}

  const title = `${p.name}, Chiropractor in Cheras, KL`
  const description = `${p.name}, ${p.role} at Persistence Chiropractic Care in Cheras, Maluri. ${
    p.credentials || 'Gonstead-technique chiropractic in Kuala Lumpur.'
  }`

  return pageMetadata({
    title,
    description,
    path: `/about/${p.slug}`,
    locale,
    availableIn: LOCALES.filter((l) => pathExistsIn(l, `/about/${p.slug}`)),
    // Deliberately the sitewide shopfront card, not p.photo: the headshots are portrait
    // 900x1125, and a 1.91:1 social crop of a face cuts it off at the chin.
  })
}

export default async function PractitionerPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const p = practitionerBySlug(slug)
  if (!p || !hasBioFor(locale, slug)) notFound()

  const registrations = publishedRegistrations(p)
  const bio = bioFor(locale, slug) ?? []
  const dict = await getDictionary(locale)

  return (
    <>
      <JsonLd data={personSchema(p)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.page.aboutBreadcrumbLabel, url: pathFor(locale, '/about') },
          { name: p.name, url: pathFor(locale, `/about/${p.slug}`) },
        ])}
      />

      <PageHero eyebrow={dict.page.aboutUsEyebrow} title={p.name} intro={p.role} />

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={p.photo}
                alt={`${p.name}, ${p.role} at Persistence Chiropractic Care in Cheras, Kuala Lumpur`}
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
                className="w-full object-cover"
              />
            </div>

            {/* Registration first, memberships second: a number a reader can look up on a
                public register outranks a society they'd have to take our word for.
                `publishedRegistrations` is empty for anyone the clinic hasn't confirmed —
                see the note on registrations in lib/clinic.ts. */}
            {registrations.length > 0 && (
              <div className="mt-6 rounded-3xl border border-line bg-white p-8 shadow-ambient">
                <Eyebrow>{dict.page.registrationLabel}</Eyebrow>
                <RegistrationList items={registrations} variant="panel" className="mt-5" />
              </div>
            )}

            {p.memberships.length > 0 && (
              <div className="mt-6 rounded-3xl border border-line bg-white p-8 shadow-ambient">
                <Eyebrow>{dict.page.membershipsLabel}</Eyebrow>
                <ul className="mt-5 space-y-2">
                  {p.memberships.map((m) => (
                    <li key={m} className="flex gap-2.5 text-ink-muted">
                      <Vertebrae className="mt-1.5 text-brand-gold" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            {p.credentials && (
              <>
                <Eyebrow>{dict.page.credentialsLabel}</Eyebrow>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">{p.credentials}</p>
              </>
            )}

            {bio.length > 0 && (
              <div className="mt-8">
                <Prose>
                  {bio.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </Prose>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <WhatsAppButton message={waMessage.practitioner(locale, p.name)}>
                {dict.page.bookWithName(p.name.replace(/^Dr\.?\s*/, 'Dr '))}
              </WhatsAppButton>
              <GhostButton href={pathFor(locale, '/about')}>{dict.page.backToTheTeam}</GhostButton>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        dict={dict}
        heading={dict.page.seeNameInCheras(p.name)}
        body={dict.page.ctaBandPractitionerBody}
        message={waMessage.practitioner(locale, p.name)}
      />
    </>
  )
}
