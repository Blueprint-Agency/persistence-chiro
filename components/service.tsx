import Image from 'next/image'
import Link from 'next/link'

import { clinic, googleReviews, practitionerBySlug } from '@/lib/clinic'
import { accreditations, testimonials } from '@/lib/home'
import { Eyebrow, Vertebrae, WhatsAppIcon } from '@/components/ui'

/** Founder + principal chiropractor reviews the clinical content on the money pages. */
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
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-3xl border border-line bg-white p-8">
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
          ))}
        </div>
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
 * "Medically reviewed by" byline — the core E-E-A-T signal for a YMYL page. Names a real
 * registered practitioner, links to their bio, and shows when the content was last checked.
 * Renders nothing without a date, so a page can't display a fabricated review date.
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
          Medically reviewed by{' '}
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
    <section aria-label="References" className="border-t border-line bg-white">
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
 */
export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={clinic.bookingUrl}
          target="_blank"
          rel="noopener"
          className="flex-1 rounded-full bg-brand-gold px-5 py-3 text-center text-sm font-semibold text-ink"
        >
          Book a consultation
        </a>
        <a
          href={clinic.whatsappUrl}
          target="_blank"
          rel="noopener"
          aria-label="Message us on WhatsApp"
          className="inline-flex flex-none items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
