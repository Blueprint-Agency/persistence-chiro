import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { LOCALES, isLocale, pathFor } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import { CtaBand, PageHero, Vertebrae } from '@/components/ui'
import { waMessage } from '@/lib/whatsapp'

type Props = { params: Promise<{ locale: string }> }

// Publication titles/blurbs (`features` below) stay English-only in every locale: they are
// factual descriptions of what a real third-party English-language publication printed, not
// the clinic's own marketing copy — translating them would misrepresent what was actually
// published, the same reasoning that keeps practitioner names/credentials untranslated.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale

  const copy = {
    en: {
      title: 'Press & Publications',
      description:
        'Media features, interviews and publications about Persistence Chiropractic Care and our chiropractors in Cheras, Maluri, Kuala Lumpur.',
    },
    zh: {
      title: '媒体报导与刊物',
      description:
        'Persistence Chiropractic Care 与我们脊椎矫正师团队,在 Cheras, Maluri, Kuala Lumpur 获得的媒体报导、访问与刊物。',
    },
    ms: {
      title: 'Media & Penerbitan',
      description:
        'Liputan media, temu bual dan penerbitan tentang Persistence Chiropractic Care dan kiropraktor kami di Cheras, Maluri, Kuala Lumpur.',
    },
  }[locale]

  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: '/press',
    locale,
    availableIn: LOCALES.filter((l) => pathExistsIn(l, '/press')),
  })
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

export default async function PressPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = await getDictionary(locale)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: dict.page.pressBreadcrumbLabel, url: pathFor(locale, '/press') }])}
      />

      <PageHero
        eyebrow={dict.page.pressEyebrow}
        title={dict.page.pressAndPublications}
        intro={dict.page.pressIntro}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <ul className="grid gap-6 md:grid-cols-2">
          {features.map((f) => (
            <li
              key={f.title}
              className="flex flex-col rounded-3xl border border-line bg-white p-8 shadow-ambient lg:p-10"
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
          {dict.page.behindTheCoveragePrefix}
          {/* /about has no locale-dispatched content yet (see the multilingual plan's Track
              B), so this falls back to plain text on zh/ms rather than linking to a page
              that 404s — same pattern as `WhereToGoNext`/`linkifyBody`. */}
          {pathExistsIn(locale, '/about') ? (
            <Link
              href={pathFor(locale, '/about')}
              className="font-semibold text-brand-slate underline underline-offset-4"
            >
              {dict.page.thePractitionersLinkText}
            </Link>
          ) : (
            dict.page.thePractitionersLinkText
          )}
          {dict.page.orReadAbout}
          <Link
            href={pathFor(locale, '/services')}
            className="font-semibold text-brand-slate underline underline-offset-4"
          >
            {dict.page.theCareWeOfferLinkText}
          </Link>
          .
        </p>
      </section>

      <CtaBand dict={dict} message={waMessage.general(locale)} />
    </>
  )
}
