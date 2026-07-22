import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { conditionBySlug, publishedConditions } from '@/lib/conditions'
import { serviceBySlug } from '@/lib/services'
import { clinic } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, medicalWebPageSchema, faqSchema } from '@/lib/schema'
import { CheckIcon, CtaBand, Eyebrow, GoldButton, PageHero, Vertebrae } from '@/components/ui'

// Only published conditions get built. A draft page has no route, so it can't be
// crawled or indexed while its clinical copy is still missing.
export function generateStaticParams() {
  return publishedConditions().map((c) => ({ slug: c.slug }))
}

// params is a Promise in Next 15+ and still is in 16 — must be awaited.
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const condition = conditionBySlug(slug)
  if (!condition) return {}

  return {
    title: condition.metaTitle,
    description: condition.metaDescription,
    alternates: { canonical: `/conditions/${condition.slug}` },
    openGraph: {
      title: condition.metaTitle,
      description: condition.metaDescription,
      url: `/conditions/${condition.slug}`,
    },
  }
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params
  const condition = conditionBySlug(slug)
  if (!condition || condition.draft) notFound()

  const related = condition.related.map(conditionBySlug).filter(Boolean)
  const treatedBy = condition.treatedBy.map(serviceBySlug).filter(Boolean)

  return (
    <>
      <JsonLd
        data={medicalWebPageSchema({
          name: condition.title,
          description: condition.metaDescription,
          url: `/conditions/${condition.slug}`,
        })}
      />
      {/* FAQ schema is only emitted when the answers actually render below — Google
          treats invisible FAQ markup as a violation. */}
      {condition.faqs.length > 0 && <JsonLd data={faqSchema(condition.faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Conditions', url: '/conditions' },
          { name: condition.title.split(' in ')[0], url: `/conditions/${condition.slug}` },
        ])}
      />

      {/* The hero carries `intro`, not metaDescription — the meta line is written for the
          SERP, this one is written for someone who has already arrived and is in pain. */}
      <PageHero eyebrow="Conditions" title={condition.title} intro={condition.intro} />

      <article className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-16">
            {/* Symptoms lead the page. Someone searching a symptom wants to know they're
                in the right place before they'll read an explanation of anything. */}
            {condition.symptoms.length > 0 && (
              <section>
                <Eyebrow>Does this sound like you?</Eyebrow>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight">
                  Common signs
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
                <p className="mt-5 text-sm text-ink-muted">
                  This list describes the condition in general. It is not a diagnosis. Only an
                  in-person assessment can tell you what is causing your symptoms.
                </p>
              </section>
            )}

            {condition.causes.length > 0 && (
              <section>
                <Eyebrow>What contributes to it</Eyebrow>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight">
                  Why it happens
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
                <Eyebrow>How we treat it</Eyebrow>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight">
                  Our approach
                </h2>
                <ol className="mt-8 space-y-5">
                  {condition.approach.map((a, i) => (
                    <li
                      key={a.heading}
                      className="flex gap-5 rounded-3xl border border-line bg-white p-7"
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
                <Eyebrow tone="light">When to seek urgent care</Eyebrow>
                <h2 className="mt-5 text-2xl font-extrabold text-white">
                  See a doctor first if you have any of these
                </h2>
                <p className="mt-4 leading-relaxed text-white/70">
                  These need a medical assessment before you begin chiropractic care. If any
                  apply to you, contact a doctor or go to the nearest emergency department.
                </p>
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
                <Eyebrow>Frequently asked questions</Eyebrow>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight">
                  What patients ask us
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
            {treatedBy.length > 0 && (
              <div className="rounded-3xl border border-line bg-white p-8">
                <Eyebrow>How we treat it</Eyebrow>
                <ul className="mt-5 space-y-2.5">
                  {treatedBy.map((m) => (
                    <li key={m!.slug}>
                      <Link
                        href={`/services/${m!.slug}`}
                        className="flex items-start gap-2.5 text-ink-muted hover:text-brand-slate"
                      >
                        <Vertebrae className="mt-1.5 text-brand-gold" />
                        {m!.title.split(' in ')[0]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 rounded-3xl bg-brand-aqua/50 p-8">
              <h2 className="text-xl font-bold">Book an assessment</h2>
              <p className="mt-2 leading-relaxed text-ink-muted">
                Registered chiropractors in Cheras, Maluri. Open seven days.
              </p>
              <div className="mt-5">
                <GoldButton href={clinic.bookingUrl} external>
                  Book an appointment
                </GoldButton>
              </div>
            </div>

            {related.length > 0 && (
              <nav aria-label="Related conditions" className="mt-6 rounded-3xl border border-line p-8">
                <Eyebrow>Related</Eyebrow>
                <ul className="mt-5 space-y-2.5">
                  {related.map((c) => (
                    <li key={c!.slug}>
                      <Link
                        href={`/conditions/${c!.slug}`}
                        className="text-ink-muted hover:text-brand-slate"
                      >
                        {c!.title.split(' in ')[0]}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/conditions"
                  className="mt-5 inline-block text-sm font-semibold text-brand-slate underline underline-offset-4"
                >
                  All conditions we treat in Cheras
                </Link>
              </nav>
            )}
          </aside>
        </div>
      </article>

      <CtaBand
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
