import { Fragment, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { googleReviews, practitionerBySlug } from '@/lib/clinic'
import { accreditations } from '@/lib/home'
import type { Outcome } from '@/lib/services'
import { type Locale, pathFor, shortTitle } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import type { Dictionary } from '@/dictionaries/types'
import { ConcernIllustration } from '@/components/ConcernIllustration'
import {
  CheckIcon,
  Eyebrow,
  GhostButton,
  Vertebrae,
  WhatsAppButton,
  WhatsAppIcon,
} from '@/components/ui'
import { whatsappLink } from '@/lib/whatsapp'

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
export function RatingBadge({
  dict,
  tone = 'light',
}: {
  dict: Dictionary
  tone?: 'light' | 'dark'
}) {
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
      {/* Reuses the same "{count} Google {suffix}" pattern <GoogleReviews> already
          established, rather than inventing a new dictionary key for a "from" prefix. */}
      <span className={muted}>
        {googleReviews.count} Google {dict.page.googleReviewsSuffix}
      </span>
    </a>
  )
}

/**
 * Trust bar: accreditation logos plus a one-line credential statement. The logos are the
 * same trimmed exports the homepage uses. No efficacy claim here, only who we are.
 */
export function TrustBar({
  dict,
  tone = 'white',
}: {
  dict: Dictionary
  tone?: 'white' | 'cream'
}) {
  return (
    /* `tone` exists for the same reason <KeyTakeaways> has one: the condition pages run this
       directly under the hero where white is right, while the service pages moved it down
       between <MeetDoctors/> and the FAQ, both of which are white. Three white bands in a row
       read as one slab however many hairlines sit between them. Deleting <KeyTakeaways/> from
       the service pages removed the cream band that used to break that run. */
    <section
      aria-label={dict.page.accreditationsAriaLabel}
      className={`border-y border-line ${tone === 'white' ? 'bg-white' : ''}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <p className="max-w-sm text-sm font-semibold leading-relaxed text-ink">
          {dict.page.registeredPractitionersLine}
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
  dict,
  title,
  intro,
  image,
  assurances,
  message,
  cta,
}: {
  dict: Dictionary
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
            <Eyebrow tone="light">{dict.page.ourServices}</Eyebrow>
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
                {cta ?? dict.header.enquireOnWhatsapp}
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
                <span>{dict.page.openSevenDaysLocation}</span>
              </div>
            )}

            <div className="mt-6">
              <RatingBadge dict={dict} tone="light" />
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
export function KeyTakeaways({
  dict,
  items,
  tone = 'white',
}: {
  dict: Dictionary
  items?: { q: string; a: string }[]
  /**
   * Which ground the band sits on. `white` is the original and stays the default, because
   * the condition pages run this directly under the hero where white is right.
   *
   * The service pages pass `cream`. They moved this block down next to <MeetDoctors/>,
   * <TrustBar/> and the FAQ, all three of which are white, and four white bands in a row
   * read as one undifferentiated slab however many hairlines sit between them.
   */
  tone?: 'white' | 'cream'
}) {
  if (!items || items.length === 0) return null
  return (
    <section className={`border-b border-line ${tone === 'white' ? 'bg-white' : ''}`}>
      <div className="mx-auto max-w-6xl px-4 py-14 lg:py-16">
        <Eyebrow>{dict.page.keyTakeawaysEyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          {dict.page.theShortAnswers}
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
 * Wraps each `phrase` in `body` with a link to its `href`, leaving the rest as plain text.
 *
 * Exists so `faqs[].a` can stay a plain string in lib/services.ts — the banned-claim
 * guard in content.test.ts scans those bodies with a regex, and markup inside them would
 * both break that scan and let anchor text drift away from the sentence around it.
 *
 * A phrase that is not found is skipped rather than thrown on: the page still renders, and
 * `content.test.ts` is what fails the build, which keeps a copy edit from taking the site
 * down while still making the mistake impossible to ship unnoticed.
 */
function linkifyBody(
  locale: Locale,
  body: string,
  links?: readonly { phrase: string; href: string }[],
): ReactNode {
  if (!links || links.length === 0) return body

  // A target that doesn't exist yet in this locale is left as plain text rather than a
  // link — same "skip rather than 404" contract the doc comment above already promises
  // for a phrase that isn't found, extended to a phrase that's found but whose page isn't
  // live in this locale yet (see the multilingual plan's Track A2 draft-gating).
  const live = links.filter((l) => pathExistsIn(locale, l.href))
  if (live.length === 0) return body

  // Longest phrase first, so a phrase containing another cannot be eaten by it.
  const ordered = [...live].sort((a, b) => b.phrase.length - a.phrase.length)
  let parts: ReactNode[] = [body]

  for (const { phrase, href } of ordered) {
    const next: ReactNode[] = []
    let linked = false
    for (const part of parts) {
      if (linked || typeof part !== 'string') {
        next.push(part)
        continue
      }
      const at = part.indexOf(phrase)
      if (at === -1) {
        next.push(part)
        continue
      }
      next.push(
        part.slice(0, at),
        <Link
          key={href}
          href={pathFor(locale, href)}
          className="font-medium text-brand-slate underline underline-offset-2 hover:text-ink"
        >
          {phrase}
        </Link>,
        part.slice(at + phrase.length),
      )
      linked = true
    }
    parts = next
  }

  return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>)
}

/**
 * The FAQ list. Shared by both service routes so the markup cannot drift between them.
 *
 * THE QUESTION IS AN `h3`, not bare text in the `<summary>`. `<summary>` takes heading
 * content, so this is valid, and it matters because deleting `longForm` took every
 * question-shaped `h2` off these pages with it. These questions read like real searches
 * ("Do I need an X-ray before chiropractic care?"); leaving them as unmarked text would hand
 * a crawler ten paragraphs with no structure and one `h2` saying "Frequently asked questions".
 *
 * `h3` rather than `h2` because the section's own `h2` is their parent, so the outline stays
 * correct: one `h1`, section `h2`s, questions beneath the section that holds them.
 */
export function Faqs({
  locale,
  dict,
  faqs,
}: {
  locale: Locale
  dict: Dictionary
  faqs: readonly { q: string; a: string; links?: readonly { phrase: string; href: string }[] }[]
}) {
  if (faqs.length === 0) return null
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>{dict.page.questions}</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              {dict.page.frequentlyAskedQuestions}
            </h2>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq py-5">
                <summary className="flex items-start justify-between gap-6">
                  <h3 className="text-lg font-semibold text-ink">{faq.q}</h3>
                  <span
                    aria-hidden="true"
                    className="faq-sign mt-0.5 flex-none text-2xl font-light leading-none text-brand-slate transition-transform"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-ink-muted">
                  {linkifyBody(locale, faq.a, faq.links)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * "Reasons people come in" cards. ONE renderer, used by both service routes.
 *
 * The hand-built chiropractic route used to read only `outcome.text`, so any photograph or
 * illustration added to that service would have vanished with no error and no test failure.
 * The `Outcome` union is only honoured if there is a single place that honours it.
 */
export function OutcomeCards({
  dict,
  outcomes,
  serviceName,
}: {
  dict: Dictionary
  outcomes?: readonly Outcome[]
  serviceName: string
}) {
  if (!outcomes || outcomes.length === 0) return null

  /**
   * Does ANY card carry a picture? This decides the whole layout, and getting it wrong is
   * what made the shared renderer look broken on its first outing.
   *
   * The four-across grid exists to sit narrow photographs side by side. Give it cards with
   * no media and it produces four thin columns of text under a heading, each with the empty
   * band where a photo would be, which reads as "the images failed to load" rather than as a
   * list — reported on /services/chiropractic-care, the one service whose outcomes are all
   * bare strings. So a media-less set gets the two-column text layout that page had before
   * it moved onto this component, and a mixed set counts as media (one missing picture among
   * three is a content gap to fill, not a reason to drop the layout for the other three).
   */
  const hasMedia = outcomes.some((o) => typeof o !== 'string' && (o.image || o.illustration))

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
      <Eyebrow>{dict.page.whatWeHelpWith}</Eyebrow>
      <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
        {dict.page.reasonsPeopleComeInFor(serviceName)}
      </h2>

      {/* With pictures, the column count follows the content: four outcomes fill one row of
          four, five fill 3+2. Forcing five into a four-column grid leaves a single orphan
          card, which reads as a mistake rather than as a list.
          Without pictures, two columns — text wants a readable measure, not a photo slot. */}
      <ul
        className={
          hasMedia
            ? `mt-12 grid gap-6 sm:grid-cols-2 ${
                outcomes.length % 4 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
              }`
            : 'mt-10 grid gap-6 sm:grid-cols-2'
        }
      >
        {outcomes.map((outcome) => {
          const text = typeof outcome === 'string' ? outcome : outcome.text
          const image = typeof outcome === 'string' ? null : outcome.image
          const illustration = typeof outcome === 'string' ? null : outcome.illustration
          return (
            <li
              key={text}
              className={
                hasMedia
                  ? 'flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-ambient'
                  : 'flex items-start gap-3 rounded-3xl border border-line bg-white p-6 shadow-ambient'
              }
            >
              {hasMedia ? (
                <>
                  {illustration ? (
                    <ConcernIllustration name={illustration} />
                  ) : (
                    image && (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1400}
                        height={1000}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    )
                  )}
                  <div className="flex flex-1 items-start gap-3 p-6">
                    <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-brand-slate" />
                    <p className="leading-relaxed text-ink-muted">{text}</p>
                  </div>
                </>
              ) : (
                <>
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-brand-slate" />
                  <p className="leading-relaxed text-ink-muted">{text}</p>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/**
 * Mid-page conversion card.
 *
 * The service pages asked for the booking once in the hero and then not again until the
 * foot, with only the mobile sticky bar in between, so a desktop reader who decided halfway
 * down had nothing to click without scrolling to one end or the other. This sits at the
 * break between recognising the problem and reading how the care works, which is where the
 * decision actually happens.
 *
 * No `attention` on the button. That pulse belongs to the single highest-intent CTA on a
 * page and the hero already has it; two of them would make the animation mean nothing.
 *
 * ⚠️ NO VERTICAL SPACING OF ITS OWN. It sits inside the rhythm of whatever surrounds it: the
 * padded container above supplies the gap over the card, and whatever follows must supply the
 * gap under it. A padded container does that for free; a full-bleed band does not, and its
 * top border lands hard against the card. Add `mt-16 lg:mt-24` to the band, as the templated
 * route does for its "How it works" section.
 */
export function InlineCta({
  dict,
  heading,
  body,
  message,
  secondary,
}: {
  dict: Dictionary
  heading?: string
  body?: string
  message: string
  secondary?: { href: string; label: string }
}) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="rounded-3xl border border-line bg-white p-8 shadow-ambient lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-10">
        <div className="max-w-xl">
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            {heading ?? dict.page.notSureWhatYouNeed}
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            {body ?? dict.page.notSureWhatYouNeedBody}
          </p>
          <p className="mt-3 text-sm text-ink-muted/80">{dict.page.openSevenDaysNoReferral}</p>
        </div>
        <div className="mt-7 flex flex-wrap gap-3 lg:mt-0 lg:flex-none lg:flex-col">
          <WhatsAppButton message={message}>{dict.header.enquireOnWhatsapp}</WhatsAppButton>
          {secondary && <GhostButton href={secondary.href}>{secondary.label}</GhostButton>}
        </div>
      </div>
    </section>
  )
}

/**
 * The fit check: who this service suits on the left, who it does not on the right.
 *
 * Every other trust block on a service page argues the clinic's case by describing what it
 * does well. The right-hand column argues it by turning work away, which a reader discounts
 * far less, and it is the only place the "assessed before adjusted" positioning can be
 * stated as a refusal rather than as a boast.
 *
 * Two columns rather than one list of refusals, at the client's direction 2026-08-23. A lone
 * crossed list is a page telling a visitor what it will not do for them and nothing else;
 * side by side, each cross has a tick opposite it and the reader picks a side instead of
 * being warned off. The pairs are written to read across, so keep them in matching order.
 *
 * `note` is not optional in the type and renders under both columns, so the block can never
 * end on the refusal. Same contract `ComparisonTable` has with its own `note`.
 *
 * NO RED, and no green. The cross is the muted slate this site uses for secondary marks,
 * because the right-hand column is honesty rather than error, and a red column would read as
 * a warning about the reader. Gold stays out of both: it means "the action being asked for"
 * everywhere else on the site and this block asks for nothing.
 */
export function FitCheck({
  dict,
  data,
  serviceName,
}: {
  dict: Dictionary
  data?: { rightFor: readonly string[]; notRightFor: readonly string[]; note: string }
  serviceName: string
}) {
  if (!data) return null
  /**
   * Each `mark` is the FINISHED 24px element, not an icon to be wrapped.
   *
   * `CheckIcon` already draws its own filled circle with the tick knocked out of it, so the
   * badge span this used to put behind both marks gave the tick column two concentric
   * circles. The cross needs the span because `CrossIcon` is a bare X; the tick must not
   * have it. Anything added here has to arrive as its own circle at the same 24px.
   */
  const columns = [
    {
      key: 'fit',
      heading: dict.page.goodFitIf,
      items: data.rightFor,
      mark: <CheckIcon className="mt-0.5 h-6 w-6 flex-none text-brand-slate" />,
    },
    {
      key: 'not',
      heading: dict.page.notRightFitIf,
      items: data.notRightFor,
      mark: (
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-slate/10 text-brand-slate/70"
        >
          <CrossIcon className="h-3.5 w-3.5" />
        </span>
      ),
    },
  ]
  return (
    <section className="border-y border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>{dict.page.beingStraightWithYou}</Eyebrow>
        {/* Not "Is X right for you?" — <ServiceQualifier> already owns that question a few
            sections up, and two headings asking the same thing on one page is the collision
            the one-page-one-intent rule exists to prevent. */}
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          {dict.page.whoIsForAndWhoIsNot(serviceName)}
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {columns.map((col) => (
            <div
              key={col.key}
              className="rounded-3xl border border-line bg-white p-8 shadow-ambient lg:p-9"
            >
              <h3 className="text-lg font-bold text-ink">{col.heading}</h3>
              <ul className="mt-6 space-y-4">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    {col.mark}
                    <span className="leading-relaxed text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-brand-gold pl-5 leading-relaxed text-ink">
          {data.note}
        </p>
      </div>
    </section>
  )
}

/** The counterpart to CheckIcon. Muted slate, never red: this is honesty, not an error. */
function CrossIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

/**
 * The internal-link block: conditions this service is used for, plus the sibling pages.
 *
 * Real SEO value, low decision value, so it sits after the FAQ where someone who has
 * finished reading is choosing a next page rather than choosing whether to come in.
 *
 * Shared by both service routes. The hand-built chiropractic page never had one at all: its
 * conditions list was buried inside the Gonstead section and its two sibling links were
 * hardcoded ghost buttons, which left the flagship page as the weakest internal-link hub on
 * the site and the only service that never linked back to /services.
 */
export function WhereToGoNext({
  locale,
  dict,
  helpsWith,
  relatedLinks,
}: {
  locale: Locale
  dict: Dictionary
  helpsWith: { slug: string; title: string }[]
  /** Root-relative, UNPREFIXED hrefs (`/services/dry-needling`) — this component prefixes
   * and locale-gates them itself, the same way `Faqs`' in-prose links do. */
  relatedLinks?: readonly { href: string; label: string }[]
}) {
  const liveLinks = (relatedLinks ?? []).filter((l) => pathExistsIn(locale, l.href))
  const hasLinks = liveLinks.length > 0
  if (helpsWith.length === 0 && !hasLinks) return null
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
      <Eyebrow>{dict.page.whereToGoNext}</Eyebrow>
      <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
        {dict.page.relatedConditionsAndServices}
      </h2>

      {helpsWith.length > 0 && (
        <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {helpsWith.map((c) => (
            <li key={c.slug}>
              <Link
                href={pathFor(locale, `/conditions/${c.slug}`)}
                className="flex items-start gap-2.5 text-ink-muted hover:text-brand-slate"
              >
                <Vertebrae className="mt-1.5 text-brand-gold" />
                {/* NOT `c.title.split(' in ')[0]` — see the note in lib/nav.ts on why that
                    breaks for zh's locality-first title shape. */}
                {shortTitle(locale, c.title)}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        {hasLinks &&
          liveLinks.map((link) => (
            <GhostButton key={link.href} href={pathFor(locale, link.href)}>
              {link.label}
            </GhostButton>
          ))}
        <GhostButton href={pathFor(locale, '/services')}>{dict.page.allOurServicesInCheras}</GhostButton>
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
  dict,
  data,
}: {
  dict: Dictionary
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
        <Eyebrow>{dict.page.choosingBetweenThem}</Eyebrow>
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
export function ReviewedBy({
  locale,
  dict,
  date,
}: {
  locale: Locale
  dict: Dictionary
  date?: string
}) {
  if (!date) return null
  // `Intl`/`toLocaleDateString` locale, not the BCP-47 `<html lang>` tag — they happen to
  // share values here (LOCALE_TAG), but this is a distinct concern (date formatting).
  const formatted = new Date(date).toLocaleDateString(
    { en: 'en-GB', zh: 'zh-MY', ms: 'ms-MY' }[locale],
    { day: 'numeric', month: 'long', year: 'numeric' },
  )
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
          {dict.page.reviewedByLabel}{' '}
          <Link
            href={pathFor(locale, `/about/${reviewer.slug}`)}
            className="font-semibold text-ink underline underline-offset-2 hover:text-brand-slate"
          >
            {reviewer.name}
          </Link>
          , {reviewer.role}
          <span className="block text-ink-muted/80">
            {reviewer.credentials} · {dict.page.lastReviewedLabel} {formatted}
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
  dict,
  items,
}: {
  dict: Dictionary
  items?: { claim: string; source: string; url?: string }[]
}) {
  if (!items || items.length === 0) return null
  return (
    /* Cream ground: this now sits directly under the ReviewedBy byline, which is white, and
       two white bands in a row would read as one undifferentiated block. */
    <section aria-label={dict.page.referencesLabel} className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Eyebrow>{dict.page.referencesLabel}</Eyebrow>
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
export function StickyCta({
  dict,
  message,
}: {
  dict: Dictionary
  // No default — see the matching note on <CtaBand> in components/ui.tsx.
  message: string
}) {
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
          {dict.header.enquireOnWhatsapp}
        </a>
      </div>
    </div>
  )
}
