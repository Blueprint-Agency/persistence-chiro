import Image from 'next/image'
import Link from 'next/link'

import { googleReviews, practitionerBySlug } from '@/lib/clinic'
import { accreditations, testimonials } from '@/lib/home'
import { CheckIcon, Eyebrow, Vertebrae, WhatsAppButton, WhatsAppIcon } from '@/components/ui'
import { whatsappLink, waMessage } from '@/lib/whatsapp'

/** The founding chiropractor reviews the clinical content on the money pages. */
const reviewer = practitionerBySlug('valerie-na')!

/**
 * Conversion primitives for the service pages. Kept out of ui.tsx because they are specific
 * to the /services/* layout (social proof, trust bar, mobile sticky CTA, qualifier) rather
 * than sitewide primitives.
 *
 * All CTAs stay plain `<a>` elements with the same booking / wa.me / tel hrefs used
 * elsewhere, so the single delegated listener in CtaTracking picks them up with no extra
 * wiring — the site stays static-by-default and only the qualifier ships JS.
 */

/**
 * Google rating badge. Renders NOTHING unless `googleReviews.verified` is true, so a
 * fabricated or stale number can never ship — the number has to be read off the live
 * listing and the flag flipped by hand. See lib/clinic.ts.
 */
export function RatingBadge({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  if (!googleReviews.verified) return null
  const muted = tone === 'light' ? 'text-white/70' : 'text-ink-muted'
  const strong = tone === 'light' ? 'text-white' : 'text-ink'
  return (
    <a
      href={googleReviews.url}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center gap-2 text-sm"
    >
      <span aria-hidden="true" className="text-base tracking-tight text-brand-gold">
        ★★★★★
      </span>
      <span className={strong}>
        <b className="font-bold">{googleReviews.rating.toFixed(1)}</b>
      </span>
      <span className={muted}>
        from {googleReviews.count} Google reviews
      </span>
    </a>
  )
}

/**
 * Trust bar: accreditation logos plus a one-line credential statement. The logos are the
 * same trimmed exports the homepage uses. No efficacy claim here, only who we are.
 */
export function TrustBar() {
  return (
    <section aria-label="Accreditations" className="border-y border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <p className="max-w-sm text-sm font-semibold leading-relaxed text-ink">
          Registered chiropractors and physiotherapists in Cheras, Maluri. Open seven days,
          right beside Sunway Velocity.
        </p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {accreditations.map((a) => (
            <li key={a.src} className="flex-none">
              <Image
                src={a.src}
                alt={a.alt}
                width={a.width}
                height={a.height}
                className="h-10 w-auto object-contain opacity-80 grayscale"
                sizes="120px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/**
 * Patient testimonials, reused verbatim from the homepage data (real, migrated reviews).
 * The "read more" link points at the real Google Business Profile listing.
 */
export function ServiceTestimonials() {
  return (
    <section className="border-t border-line bg-brand-aqua/40">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>From our patients in Cheras</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          What people say after being seen here
        </h2>
        {/* Horizontal rail rather than a stacked grid. Reviews are the longest block on a
            service page and pushed the FAQ and the ask a long way down; side-by-side they
            cost one screen instead of three, and a partially visible next card is a clearer
            "there are more" signal than a scrollbar.
            `tabIndex` makes the rail keyboard-scrollable, which a plain overflow container
            is not. Negative margin lets cards bleed to the viewport edge while the first one
            still lines up with the heading.

            With one review there is nothing to scroll, so the rail stops being a rail: no
            focusable scroll container to tab into and no snap points, since offering a
            keyboard user a scrollable region with one item wastes a tab stop. The card also
            widens, because a 24rem card next to a lot of empty band looks like the rest
            failed to load. All of it restores itself when a second review is approved. */}
        {(() => {
          const isRail = testimonials.length > 1
          return (
        <ul
          tabIndex={isRail ? 0 : undefined}
          aria-label="Patient reviews"
          className={
            isRail
              ? 'rail -mx-4 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-5 lg:mx-0 lg:px-0'
              : 'mt-10 flex gap-6'
          }
        >
          {testimonials.map((t) => (
            <li
              key={t.name}
              className={
                isRail
                  ? 'w-[82%] flex-none snap-start sm:w-[26rem] lg:w-[24rem]'
                  : 'w-full max-w-2xl'
              }
            >
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-ambient">
                <Vertebrae className="text-brand-gold" />
                <blockquote className="mt-5 flex-1 space-y-3 leading-relaxed text-ink-muted">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  {t.detail && <p>{t.detail}</p>}
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 text-sm font-semibold text-ink">
                  {t.name}
                  <span className="font-normal text-ink-muted"> · patient review, Cheras</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
          )
        })()}
        <a
          href={googleReviews.url}
          target="_blank"
          rel="noopener"
          className="mt-8 inline-block text-sm font-semibold text-brand-slate underline underline-offset-4"
        >
          Read more reviews on Google
        </a>
      </div>
    </section>
  )
}

/**
 * The service page hero: text column, photograph beside it on desktop.
 *
 * SHARED SO THE TWO ROUTES CANNOT DRIFT. app/services/[slug] built this inline and
 * app/services/chiropractic-care used the generic `PageHero`, which has no image slot, so the
 * flagship money page was the one service page with no hero photograph at all. Rather than
 * give PageHero an image (it is also the hero for /about, /press, /conditions and others, none
 * of which wants one), the layout lives here and both service routes call it.
 *
 * `attention` is passed through to the CTA rather than hardcoded, because the prop's contract
 * is one animated button per page and the hero is the page's decision about where that goes.
 */
export function ServiceHero({
  title,
  intro,
  image,
  assurances,
  message,
  cta = 'Enquire on WhatsApp',
}: {
  title: string
  intro?: string
  image?: { src: string; alt: string }
  assurances?: readonly string[]
  message: string
  cta?: string
}) {
  return (
    <section className="bg-brand-slate-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow tone="light">Our services</Eyebrow>
            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>
            )}
            {/* One CTA. A second button beside it splits the decision without adding a path —
                the phone number is still in the header bar and the footer for anyone who
                wants it. */}
            <div className="mt-8">
              <WhatsAppButton attention message={message}>
                {cta}
              </WhatsAppButton>
            </div>
            {/* Reassurance sits with the button, not nine paragraphs below it. These restate
                facts the page substantiates further down — the visitor should not have to
                scroll to find out whether the needles are reused. */}
            {assurances && assurances.length > 0 ? (
              <ul className="mt-6 grid gap-2.5 text-sm text-white/75 sm:grid-cols-2 lg:grid-cols-1">
                {assurances.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-brand-gold" />
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
                <span>Open seven days · Cheras, Maluri</span>
              </div>
            )}

            <div className="mt-6">
              <RatingBadge tone="light" />
            </div>
          </div>

          {image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * Key takeaways: the answer-engine extraction block, rendered high on the page.
 *
 * A definition list rather than a card grid, because that is what it is — and because an
 * extractor reading the markup gets an unambiguous question/answer pairing out of dt/dd
 * that a stack of divs does not give it. The gold rule down the left is the only decoration;
 * this block is scanned in about four seconds and anything more competes with the hero.
 */
export function KeyTakeaways({ items }: { items?: { q: string; a: string }[] }) {
  if (!items || items.length === 0) return null
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:py-16">
        <Eyebrow>Key takeaways</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          The short answers
        </h2>
        <dl className="mt-10 grid gap-x-12 gap-y-7 md:grid-cols-2">
          {items.map((t) => (
            <div key={t.q} className="border-l-2 border-brand-gold pl-5">
              <dt className="font-bold leading-snug text-ink">{t.q}</dt>
              <dd className="mt-2 leading-relaxed text-ink-muted">{t.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/**
 * Side-by-side comparison of two disciplines the clinic actually offers.
 *
 * The table scrolls inside its own container rather than letting the page scroll sideways —
 * a full row of prose will not fit a phone at a readable size, and a body that pans
 * horizontally is the bug that had to be fixed out of the review rail.
 *
 * `note` renders after the table and is not optional in the type: a comparison that stops at
 * the last row invites the reader to total up the columns and pick a winner, which is not
 * what an assessment led clinic can honestly tell them to do.
 */
export function ComparisonTable({
  data,
}: {
  data?: {
    heading: string
    intro: string
    columns: readonly [string, string]
    rows: readonly { label: string; a: string; b: string }[]
    note: string
  }
}) {
  if (!data) return null
  return (
    <section className="border-t border-line bg-brand-aqua/40">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>Choosing between them</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          {data.heading}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{data.intro}</p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-brand-slate/20">
                <th scope="col" className="w-[22%] py-4 pr-6">
                  <span className="sr-only">What is being compared</span>
                </th>
                {data.columns.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="w-[39%] py-4 pr-6 text-base font-bold text-ink"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data.rows.map((row) => (
                <tr key={row.label} className="align-top">
                  <th
                    scope="row"
                    className="py-5 pr-6 text-sm font-semibold leading-snug text-brand-slate"
                  >
                    {row.label}
                  </th>
                  <td className="py-5 pr-6 leading-relaxed text-ink-muted">{row.a}</td>
                  <td className="py-5 pr-6 leading-relaxed text-ink-muted">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 max-w-2xl leading-relaxed text-ink-muted">{data.note}</p>
      </div>
    </section>
  )
}

/**
 * "Reviewed by" byline — the core E-E-A-T signal for a YMYL page. Names a real registered
 * practitioner, links to their bio, and shows when the content was last checked. Renders
 * nothing without a date, so a page can't display a fabricated review date.
 *
 * NOT "Medically reviewed by". Client instruction, 2026-08-01: that phrasing belongs to
 * registered medical practitioners, and the reviewer here is a chiropractor. Same reasoning
 * that removed "Dr" from the practitioner names. The E-E-A-T signal is unaffected — what
 * Google reads is the named person, their credentials, the link to their profile and the
 * `reviewedBy`/`lastReviewed` schema, none of which depends on the word "medically".
 */
export function ReviewedBy({ date }: { date?: string }) {
  if (!date) return null
  const formatted = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return (
    <div className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4">
        <Image
          src={reviewer.photo}
          alt={reviewer.name}
          width={44}
          height={44}
          className="h-11 w-11 flex-none rounded-full object-cover"
        />
        <p className="text-sm leading-snug text-ink-muted">
          Reviewed by{' '}
          <Link
            href={`/about/${reviewer.slug}`}
            className="font-semibold text-ink underline underline-offset-2 hover:text-brand-slate"
          >
            {reviewer.name}
          </Link>
          , {reviewer.role}
          <span className="block text-ink-muted/80">
            {reviewer.credentials} · Last reviewed {formatted}
          </span>
        </p>
      </div>
    </div>
  )
}

/**
 * Citations block. Verifiable, cautiously worded facts attributed to journals, guidelines
 * or regulators — the sourcing signal medical raters look for. Never a competitor, never an
 * efficacy promise. Renders nothing when a page has no citations.
 */
export function References({
  items,
}: {
  items?: { claim: string; source: string; url?: string }[]
}) {
  if (!items || items.length === 0) return null
  return (
    /* Cream ground: this now sits directly under the ReviewedBy byline, which is white, and
       two white bands in a row would read as one undifferentiated block. */
    <section aria-label="References" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Eyebrow>References</Eyebrow>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-ink-muted">
          {items.map((c) => (
            <li key={c.source}>
              {c.claim}{' '}
              <cite className="font-medium not-italic text-ink">
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener nofollow"
                    className="underline underline-offset-2 hover:text-brand-slate"
                  >
                    {c.source}
                  </a>
                ) : (
                  c.source
                )}
              </cite>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/**
 * Mobile sticky booking bar. The header is sticky on desktop, but on a phone the booking
 * CTA otherwise scrolls out of reach for the length of a service page. Hidden on lg where
 * the header CTA and the sidebar cover it. Sits above the iOS home indicator.
 *
 * Gold, always. This is the primary booking action for the site's primary visitor, so it is
 * the last pill on the site allowed to go soft.
 */
export function StickyCta({ message = waMessage.general }: { message?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 shadow-overlay-up backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {/* One full-width target. This bar exists for a thumb, and the widest possible tap
            area is the whole point of it. */}
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-gold px-5 py-3 text-center text-sm font-semibold text-ink"
        >
          <WhatsAppIcon />
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  )
}
