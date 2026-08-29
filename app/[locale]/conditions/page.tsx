import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { publishedConditionsFor } from '@/lib/conditions'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { LOCALES, isLocale, pathFor, shortTitle } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import { CtaBand, GhostButton, PageHero, Vertebrae } from '@/components/ui'
import { waMessage } from '@/lib/whatsapp'

type Props = { params: Promise<{ locale: string }> }

// FOUND BY A FINAL PRE-PREVIEW AUDIT, 2026-08-29: this generateMetadata hardcoded a single
// English title/description regardless of `locale` — the one metadata gap the earlier
// per-page localization passes missed, since the visible page body already used `dict` and
// looked fully localized. Every other route's generateMetadata branches on locale; this one
// now does too.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale

  const copy = {
    // 33 characters, which is the budget: `pageMetadata` appends a 27-character brand suffix
    // and Google renders about 60. "Kuala Lumpur" went rather than "Cheras" — the local pack
    // this page feeds is a Cheras one, and every child page carries KL in its own title.
    en: {
      title: 'Conditions We Help With in Cheras',
      description:
        'Back pain, slipped disc, sciatica, scoliosis, neck pain, migraine and hip pain, assessed with Gonstead chiropractic and physio in Cheras, Maluri.',
    },
    zh: {
      title: 'Cheras 症状照护 | 我们能协助的问题',
      description: '背痛、椎间盘突出、坐骨神经痛、脊柱侧弯、颈痛、头痛与髋痛,在 Cheras, Maluri 由 Gonstead 脊椎矫正与物理治疗评估与照护。',
    },
    ms: {
      title: 'Simptom Kami Bantu di Cheras',
      description:
        'Sakit belakang, slip disc, sciatica, skoliosis, sakit leher, migrain dan sakit pinggul, dinilai dengan kiropraktik Gonstead dan fisioterapi di Cheras, Maluri.',
    },
  }[locale]

  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: '/conditions',
    locale,
    availableIn: LOCALES.filter((l) => pathExistsIn(l, '/conditions')),
  })
}

export default async function ConditionsHub({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const conditions = publishedConditionsFor(locale)
  // A locale's hub doesn't exist until it has at least one real condition page —
  // otherwise it would be a hub linking to nothing, which is the same "thin page"
  // problem `draft` already prevents one level down. See the multilingual plan's
  // Track A2. Called at request/build time rather than gated via `generateStaticParams`
  // — this file has no dynamic segment of its own for that API to act on.
  if (locale !== 'en' && conditions.length === 0) notFound()
  const dict = await getDictionary(locale)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.page.conditionsEyebrow, url: pathFor(locale, '/conditions') },
        ])}
      />
      {conditions.length > 0 && (
        <JsonLd
          data={collectionPageSchema({
            name: dict.page.conditionsHubTitle,
            description: dict.page.conditionsHubIntro,
            url: pathFor(locale, '/conditions'),
            items: conditions.map((c) => ({
              name: shortTitle(locale, c.title),
              url: pathFor(locale, `/conditions/${c.slug}`),
            })),
          })}
        />
      )}

      <PageHero
        eyebrow={dict.page.conditionsEyebrow}
        title={dict.page.conditionsHubTitle}
        intro={dict.page.conditionsHubIntro}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        {conditions.length === 0 ? (
          // Honest empty state rather than a hub linking to nothing. Clears itself the
          // moment the first condition page has copy and flips draft: false.
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold">Condition pages are being prepared.</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              In the meantime, the two pages below cover how we assess and what we do. You can also
              message us with your symptoms and we&rsquo;ll tell you which applies to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GhostButton href={pathFor(locale, '/services/chiropractic-care')}>
                Our Gonstead approach
              </GhostButton>
              <GhostButton href={pathFor(locale, '/services/physiotherapy')}>
                Physiotherapy
              </GhostButton>
            </div>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {conditions.map((c) => (
              <li key={c.slug}>
                <Link
                  href={pathFor(locale, `/conditions/${c.slug}`)}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-ambient transition-shadow hover:shadow-ambient-raise lg:p-10"
                >
                  <Vertebrae className="text-brand-gold" />
                  <h2 className="mt-5 text-xl font-bold">{shortTitle(locale, c.title)}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{c.metaDescription}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate group-hover:gap-2.5">
                    {dict.page.readMore}
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <CtaBand dict={dict} message={waMessage.general(locale)} />
    </>
  )
}
