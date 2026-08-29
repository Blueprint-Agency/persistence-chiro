import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { conditionBySlugFor, publishedConditionsFor } from '@/lib/conditions'
import { serviceBySlugFor } from '@/lib/services'
import { practitionerBySlug } from '@/lib/clinic'
import { LOCALES, isLocale, pathFor, shortTitle } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import { qualifierCopyFrom } from '@/lib/qualifier-copy'
import { JsonLd } from '@/components/JsonLd'
import {
  breadcrumbSchema,
  medicalWebPageSchema,
  pageFaqSchema,
  reviewedMedicalWebPage,
} from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { CheckIcon, CtaBand, Eyebrow, WhatsAppButton, Vertebrae } from '@/components/ui'
import {
  KeyTakeaways,
  References,
  ReviewedBy,
  StickyCta,
  TrustBar,
} from '@/components/service'
import { ConditionHero } from '@/components/ConditionHero'
import { GoogleReviews } from '@/components/GoogleReviews'
import { ServiceQualifier } from '@/components/ServiceQualifier'
import { waMessage } from '@/lib/whatsapp'

const reviewer = practitionerBySlug('valerie-na')!

/**
 * Shared hero photograph for every condition page until per-condition photography exists.
 *
 * The reception rather than a clinical room on purpose. Someone arriving on a symptom page
 * from search is deciding whether this is a real place they could walk into, and the desk,
 * the brand mark and the seating answer that question in a way an empty adjustment room does
 * not. Set `heroImage` on an individual condition to override it.
 */
const CONDITION_HERO_FALLBACK = {
  src: '/img/clinic-reception.webp',
  alt: 'Reception desk at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
}

// Only published conditions get built, PER LOCALE — a draft page (or a slug simply
// absent from that locale's array) has no route, so it can't be crawled or indexed
// while its clinical copy is still missing in that language.
export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return []
  return publishedConditionsFor(params.locale).map((c) => ({ slug: c.slug }))
}

// params is a Promise in Next 15+ and still is in 16 — must be awaited.
type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale
  const condition = conditionBySlugFor(locale, slug)
  if (!condition) return {}

  return pageMetadata({
    title: condition.metaTitle,
    description: condition.metaDescription,
    path: `/conditions/${condition.slug}`,
    locale,
    availableIn: LOCALES.filter((l) => pathExistsIn(l, `/conditions/${condition.slug}`)),
    // Same contract as the service pages: `ogImage` is the pre-cropped 1200x630 JPEG, never
    // the hero itself, and the alt is reused from the hero. Falls back to the sitewide
    // shopfront card when a condition has no photography yet.
    image:
      condition.ogImage && condition.heroImage
        ? { url: condition.ogImage, width: 1200, height: 630, alt: condition.heroImage.alt }
        : undefined,
  })
}

export default async function ConditionPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const condition = conditionBySlugFor(locale, slug)
  if (!condition || condition.draft) notFound()

  const dict = await getDictionary(locale)
  const shortName = shortTitle(locale, condition.title)

  const related = condition.related
    .map((s) => conditionBySlugFor(locale, s))
    .filter(Boolean)
  const helpedBy = condition.helpedBy.map((s) => serviceBySlugFor(locale, s)).filter(Boolean)

  return (
    <>
      <JsonLd
        data={medicalWebPageSchema({
          name: condition.title,
          description: condition.metaDescription,
          url: pathFor(locale, `/conditions/${condition.slug}`),
        })}
      />
      {/* FAQ schema is only emitted when the answers actually render below — Google
          treats invisible FAQ markup as a violation. */}
      {/* Same contract as the service routes: the short answers render here too, so they
          belong in the schema alongside the FAQ rather than only in prose. */}
      {(condition.faqs.length > 0 || (condition.keyTakeaways?.length ?? 0) > 0) && (
        <JsonLd data={pageFaqSchema(condition.keyTakeaways, condition.faqs)} />
      )}
      {/* reviewedBy + lastReviewed, the two E-E-A-T signals a YMYL page needs. Only emitted
          when the clinic has confirmed a review actually happened — see the warning on
          `lastReviewed` in lib/conditions.ts. */}
      {condition.lastReviewed && (
        <JsonLd
          data={reviewedMedicalWebPage({
            name: condition.title,
            description: condition.metaDescription,
            url: pathFor(locale, `/conditions/${condition.slug}`),
            lastReviewed: condition.lastReviewed,
            reviewer: {
              name: reviewer.name,
              role: reviewer.role,
              credentials: reviewer.credentials,
              slug: reviewer.slug,
            },
          })}
        />
      )}
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.page.conditionsEyebrow, url: pathFor(locale, '/conditions') },
          {
            name: shortName,
            url: pathFor(locale, `/conditions/${condition.slug}`),
          },
        ])}
      />

      {/* The hero carries `intro`, not metaDescription — the meta line is written for the
          SERP, this one is written for someone who has already arrived and is in pain.
          `heroImage` falls back to the shared reception photograph: conditions have no
          per-page photography yet, and a generic honest shot of the actual clinic beats the
          flat colour field that was here before. */}
      <ConditionHero
        dict={dict}
        title={condition.title}
        intro={condition.intro}
        image={condition.heroImage ?? CONDITION_HERO_FALLBACK}
        message={waMessage.condition(locale, shortName)}
      />

      <TrustBar dict={dict} />

      {/* Answer-engine extraction block, high, before the reader has to commit to reading. */}
      <KeyTakeaways dict={dict} items={condition.keyTakeaways} />

      <article className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-16">
            {/* Symptoms lead the page. Someone searching a symptom wants to know they're
                in the right place before they'll read an explanation of anything. */}
            {condition.symptoms.length > 0 && (
              <section>
                <Eyebrow>{dict.page.doesThisSoundLikeYou}</Eyebrow>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight">
                  {dict.page.commonSigns}
                </h2>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {condition.symptoms.map((s) => (
                    <li
                      key={s}
                      className="flex gap-3 rounded-2xl border border-line bg-white p-4"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-brand-gold" />
                      <span className="text-ink-muted">{s}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-ink-muted">{dict.page.symptomsDisclaimer}</p>
              </section>
            )}

            {condition.causes.length > 0 && (
              <section>
                <Eyebrow>{dict.page.whatContributesToIt}</Eyebrow>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight">
                  {dict.page.whyItHappens}
                </h2>
                <dl className="mt-8 divide-y divide-line border-y border-line">
                  {condition.causes.map((c) => (
                    <div key={c.heading} className="flex gap-5 py-6">
                      <Vertebrae className="mt-2 text-brand-gold" />
                      <div>
                        <dt className="text-xl font-bold text-ink">{c.heading}</dt>
                        <dd className="mt-2 leading-relaxed text-ink-muted">{c.body}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {condition.approach.length > 0 && (
              <section>
                <Eyebrow>{dict.page.howWeHelp}</Eyebrow>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight">
                  {dict.page.ourApproach}
                </h2>
                <ol className="mt-8 space-y-5">
                  {condition.approach.map((a, i) => (
                    <li
                      key={a.heading}
                      className="flex gap-5 rounded-3xl border border-line bg-white p-7 shadow-ambient"
                    >
                      <span
                        aria-hidden="true"
                        className="label flex-none pt-1 text-brand-gold-ink"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold">{a.heading}</h3>
                        <p className="mt-2 leading-relaxed text-ink-muted">{a.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Safety section. Rendered on the slate field rather than a red alert box —
                it needs to be impossible to miss without frightening someone whose back
                merely aches. Deliberately placed before the FAQs, not buried at the foot. */}
            {condition.redFlags.length > 0 && (
              <section className="rounded-3xl bg-brand-slate-deep p-8 text-white lg:p-10">
                <Eyebrow tone="light">{dict.page.whenToSeekUrgentCare}</Eyebrow>
                <h2 className="mt-5 text-2xl font-extrabold text-white">
                  {dict.page.seeADoctorFirst}
                </h2>
                <p className="mt-4 leading-relaxed text-white/70">{dict.page.urgentCareIntro}</p>
                <ul className="mt-6 space-y-3">
                  {condition.redFlags.map((f) => (
                    <li key={f} className="flex gap-3 text-white/85">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {condition.faqs.length > 0 && (
              <section>
                <Eyebrow>{dict.page.frequentlyAskedQuestions}</Eyebrow>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight">
                  {dict.page.whatPatientsAskUs}
                </h2>
                <div className="mt-8 divide-y divide-line border-y border-line">
                  {condition.faqs.map((faq) => (
                    <details key={faq.q} className="faq py-5">
                      <summary className="flex items-start justify-between gap-6 text-lg font-semibold text-ink">
                        {faq.q}
                        <span
                          aria-hidden="true"
                          className="faq-sign mt-1 flex-none text-2xl font-light leading-none text-brand-slate transition-transform"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-4 leading-relaxed text-ink-muted">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            {helpedBy.length > 0 && (
              <div className="rounded-3xl border border-line bg-white p-8 shadow-ambient">
                <Eyebrow>{dict.page.howWeHelp}</Eyebrow>
                <ul className="mt-5 space-y-2.5">
                  {helpedBy.map((m) => (
                    <li key={m!.slug}>
                      <Link
                        href={pathFor(locale, `/services/${m!.slug}`)}
                        className="flex items-start gap-2.5 text-ink-muted hover:text-brand-slate"
                      >
                        <Vertebrae className="mt-1.5 text-brand-gold" />
                        {shortTitle(locale, m!.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 rounded-3xl bg-brand-aqua/50 p-8">
              <h2 className="text-xl font-bold">{dict.page.bookAnAssessment}</h2>
              <p className="mt-2 leading-relaxed text-ink-muted">
                {dict.page.bookAnAssessmentBody}
              </p>
              <div className="mt-5">
                <WhatsAppButton message={waMessage.condition(locale, shortName)}>
                  {dict.header.enquireOnWhatsapp}
                </WhatsAppButton>
              </div>
            </div>

            {related.length > 0 && (
              <nav
                aria-label={dict.page.relatedConditionsAriaLabel}
                className="mt-6 rounded-3xl border border-line p-8"
              >
                <Eyebrow>{dict.page.relatedLabel}</Eyebrow>
                <ul className="mt-5 space-y-2.5">
                  {related.map((c) => (
                    <li key={c!.slug}>
                      <Link
                        href={pathFor(locale, `/conditions/${c!.slug}`)}
                        className="text-ink-muted hover:text-brand-slate"
                      >
                        {shortTitle(locale, c!.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={pathFor(locale, '/conditions')}
                  className="mt-5 inline-block text-sm font-semibold text-brand-slate underline underline-offset-4"
                >
                  {dict.page.allConditionsWeHelpWith}
                </Link>
              </nav>
            )}
          </aside>
        </div>
      </article>

      {/* ----------------------------------------------------------- Qualifier */}
      {/* Sits after the article rather than mid-grid: the symptom list is the recognition
          moment, but it lives inside the two-column layout and a full-width band cannot be
          cut into it without restructuring the page. A reader who has reached the end of the
          FAQs is warm enough, and this is the lowest-friction way to start a conversation. */}
      {condition.qualifierConcerns && condition.qualifierConcerns.length > 0 && (
        <section className="border-y border-line bg-brand-aqua/40">
          <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
            <ServiceQualifier
              copy={qualifierCopyFrom(dict, shortName)}
              concerns={condition.qualifierConcerns}
            />
          </div>
        </section>
      )}

      {/* Social proof. Chiropractors care for every condition in this collection, so unlike
          /services/physiotherapy there is no misrepresentation in naming them here. */}
      <GoogleReviews dict={dict} />

      {/* Provenance at the foot, matching the service pages: who checked the clinical copy
          and what it is sourced from are credentials rather than reading. Both render nothing
          until the data exists, so an unreviewed page makes no claim. */}
      <ReviewedBy locale={locale} dict={dict} date={condition.lastReviewed} />
      <References dict={dict} items={condition.citations} />

      <CtaBand dict={dict} message={waMessage.condition(locale, shortName)} />

      {/* The mobile conversion gap this template had: on a phone the only CTA was the aside,
          which scrolls away and never comes back. Someone in pain reading a symptom page is
          the visitor most worth catching. */}
      <StickyCta dict={dict} message={waMessage.condition(locale, shortName)} />
      <div aria-hidden="true" className="h-20 bg-brand-slate-deep lg:hidden" />
    </>
  )
}
