import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { femaleChiropractorFaqs } from '@/lib/faqs'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { LOCALES, isLocale, pathFor } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { getDictionary } from '@/lib/dictionaries'
import { CtaBand, Eyebrow, PageHero, Vertebrae } from '@/components/ui'
import { waMessage } from '@/lib/whatsapp'

/**
 * /female-chiropractor — targets `female chiropractor` (and `female chiropractor near me`,
 * the only variant with a real Ubersuggest series: 10/mo, SD 26, CPC $1.21, paid difficulty
 * 68, Malaysia locId 2458, pulled 2026-09-08). Every other variant measured 0 with an empty
 * `monthly_searches` array, which on this index means "no data", not "no demand" (the same
 * reporting hole documented in OPEN-ITEMS.md section 4).
 *
 * ⚠️ ENGLISH ONLY, AND DELIBERATELY SO. `chiropractor perempuan`, `chiropractor wanita` and
 * `女脊医` all measured 0 with empty series, and unlike the migraine case there is no standard
 * clinical term with obvious demand hiding behind the zero. So this route is NOT in
 * STATIC_LOCALIZED_PATHS (lib/locale-availability.ts) and `availableIn` computes to ['en'],
 * which is what keeps hreflang and the language switcher honest. Add real reviewed zh/ms
 * copy before loosening the gate below, never a translation shipped to prove the plumbing.
 *
 * ⚠️ WHY THERE IS NO /male-chiropractor SIBLING. `male chiropractor` measures 0/mo and the
 * Malaysian SERP for it carries no clinic page at all: it returns Shutterstock, Adobe Stock,
 * a Lahore doctor directory and the Ontario Chiropractic Association. "Female" is a marked
 * term (people add it to depart from an assumed default); "male" is unmarked, so the modifier
 * adds nothing and the query is not asked. A competitor's single female page already ranks
 * position 13 for `male chiropractor` in Malaysia, so one page absorbs both strings anyway,
 * and a second page would target the same intent this one does, which one-page-one-intent
 * forbids. This was proposed and talked through with the user on 2026-09-08; the conclusion
 * is recorded here so it is not re-proposed as an obvious gap.
 */
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale) || rawLocale !== 'en') return {}

  return pageMetadata({
    title: 'Female Chiropractor in Cheras, Kuala Lumpur',
    description:
      'Valerie Na is the female chiropractor at Persistence Chiropractic Care in Cheras. What to expect in the room, and how to ask for her when you book.',
    path: '/female-chiropractor',
    locale: 'en',
    availableIn: LOCALES.filter((l) => pathExistsIn(l, '/female-chiropractor')),
  })
}

export default async function FemaleChiropractorPage({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  // See the header note: no reviewed zh/ms copy exists for this page yet.
  if (rawLocale !== 'en') notFound()
  const locale = rawLocale
  const dict = await getDictionary(locale)

  return (
    <>
      {/* Every answer below renders on the page, so the schema is legitimate. */}
      <JsonLd data={faqSchema(femaleChiropractorFaqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Female Chiropractor', url: pathFor(locale, '/female-chiropractor') },
        ])}
      />

      <PageHero
        eyebrow="Seeing a woman"
        title="Female chiropractor in Cheras, Kuala Lumpur"
        intro="If you would rather be assessed by a woman, that is Valerie Na. She founded the clinic, she practises the Gonstead method, and she is one of three chiropractors here."
      />

      {/* --------------------------------------------------- Who she is */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>Who you would be seeing</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              Meet Valerie Na, our female chiropractor in Cheras
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Valerie Na is the founder and director of Persistence Chiropractic Care and the
              clinic&rsquo;s female chiropractor. She studied chiropractic at RMIT University in
              Melbourne, holding a double degree in Applied Science (Chiropractic) and Health
              Science, and she practises the Gonstead method the whole clinic is built around.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              She is one of three chiropractors here. Kee Shan Lim and Rynn Hoh are the other two,
              and both are men. We would rather put that plainly than write about &ldquo;our female
              chiropractors&rdquo; and leave you to discover at the front desk that there is one.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              You can{' '}
              <Link
                href={pathFor(locale, '/about/valerie-na')}
                className="font-semibold text-brand-gold-ink underline underline-offset-4"
              >
                read her full background and registrations
              </Link>{' '}
              before you decide.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/img/valerie-na.webp"
              alt="Valerie Na, female chiropractor and founder of Persistence Chiropractic Care in Cheras, Kuala Lumpur"
              width={1100}
              height={1400}
              sizes="(max-width: 1024px) 100vw, 480px"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Why people ask */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>The question behind the question</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              Why patients ask for a female chiropractor
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Most people never say why, and nobody here will ask. The reasons that come up most
              are modesty, faith or family expectations about being examined by a man, and
              sometimes an appointment somewhere else that felt rushed or that nobody explained.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              For plenty of people it is simpler than any of that. Describing where your body hurts
              is an awkward conversation to have with a stranger, and some find it a little less
              awkward with a woman. That is reason enough.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              We mention all this because the request is common and it still tends to arrive
              apologetically, usually halfway through booking. It does not need an apology or an
              explanation attached to it.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ In the room */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Before you book</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              What happens in the room, and what you can ask for
            </h2>
            <p className="mt-5 leading-relaxed text-ink-muted">
              Knowing this in advance is usually what settles the question, whoever you end up
              seeing. There is more of it on{' '}
              <Link
                href={pathFor(locale, '/what-to-expect')}
                className="font-semibold text-brand-gold-ink underline underline-offset-4"
              >
                what to expect on a first visit
              </Link>
              .
            </p>
          </div>

          <dl className="divide-y divide-line border-y border-line">
            {[
              {
                heading: 'You usually stay in your own clothes',
                body: 'Most of an assessment happens in loose clothing you can move in. A gown is offered when a region needs to be seen directly, most often the back, and you change privately.',
              },
              {
                heading: 'Nothing is uncovered without being explained first',
                body: 'You are told what is being looked at and why before it happens. Anything not being assessed stays covered.',
              },
              {
                heading: 'You can bring someone in with you',
                body: 'A partner, a parent or a friend. You do not need to give a reason, and it changes nothing about how the assessment runs.',
              },
              {
                heading: 'You can stop at any point',
                body: 'Saying you would rather not do a particular part is a normal thing to say, not an awkward one. The assessment carries on around it.',
              },
              {
                heading: 'The assessment comes before anything is adjusted',
                body: 'Nothing is adjusted on a first visit until it has been assessed, and some presentations are not suitable for adjustment at all. If another provider would help you more, you will be referred.',
              },
            ].map((item) => (
              <div key={item.heading} className="flex gap-5 py-7">
                <Vertebrae className="mt-2 text-brand-gold" />
                <div>
                  <dt className="text-xl font-bold text-ink">{item.heading}</dt>
                  <dd className="mt-3 leading-relaxed text-ink-muted">{item.body}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------ How to ask */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Booking</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              How to ask for a female chiropractor when you book
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Say so when you book rather than on the day. Message us on WhatsApp, tell us you
              would like to see Valerie, and include the days and times that actually work for
              you. We will come back with what she has open.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              She runs the clinic as well as seeing patients, so her diary fills further ahead than
              her colleagues&rsquo; do. If she has nothing free at a time you can make, we will
              tell you when she next does rather than quietly putting you with someone you did not
              ask for.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Gonstead */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>The method</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            What Gonstead care with a female chiropractor involves
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            The same as it does with anyone else here. Gonstead is a specific way of working out
            which segment is involved before anything is adjusted, and it leans on assessment
            rather than adjusting broadly along the spine and hoping the right level is caught.
            Valerie works the same six steps her colleagues do.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            If you want the detail, the{' '}
            <Link
              href={pathFor(locale, '/services/chiropractic-care')}
              className="font-semibold text-brand-gold-ink underline underline-offset-4"
            >
              six-step Gonstead walkthrough
            </Link>{' '}
            sets out what each stage is for, and{' '}
            <Link
              href={pathFor(locale, '/locate-us')}
              className="font-semibold text-brand-gold-ink underline underline-offset-4"
            >
              where to find the clinic
            </Link>{' '}
            covers parking and the walk in from Sunway Velocity.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ FAQs */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                Asking for a female chiropractor
              </h2>
            </div>

            <div className="divide-y divide-line border-y border-line">
              {femaleChiropractorFaqs.map((faq) => (
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
          </div>
        </div>
      </section>

      <CtaBand
        dict={dict}
        heading="Ask to see Valerie"
        body="Message us with the days that suit you and we will tell you what she has open."
        message={waMessage.practitioner(locale, 'Valerie Na')}
      />
    </>
  )
}
