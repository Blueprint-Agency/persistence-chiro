import Image from 'next/image'

import { clinic, googleReviews } from '@/lib/clinic'
import { sampleReviews, sampleReviewSummary, USE_SAMPLE_REVIEWS } from '@/lib/sample-reviews'
import { Eyebrow } from '@/components/ui'
import { ServiceTestimonials } from '@/components/service'
import { RailArrows } from '@/components/RailArrows'
import { isStagingDeployment } from '@/lib/deployment'

/**
 * Google-review styled social proof section.
 *
 * ⚠️ THE SAMPLE REVIEWS IN lib/sample-reviews.ts ARE FABRICATED AND CANNOT REACH
 * PRODUCTION. The guard is structural, not a flag someone has to remember to flip: the
 * placeholder branch is gated on NODE_ENV, so `next build` never takes it. In production
 * this falls back to `ServiceTestimonials` — the clinic's real, migrated patient quotes —
 * so the page keeps its social proof and none of it is invented.
 *
 * Publishing invented patient reviews on a registered healthcare practice's site is an
 * advertising and professional-conduct risk, which is why this is enforced in code rather
 * than documented in a comment. See PRODUCT.md, "Unverified is unpublished".
 *
 * TO SHIP REAL GOOGLE REVIEWS: replace `sampleReviews` / `sampleReviewSummary` with real
 * data pulled from the Business Profile, then delete this gate and render unconditionally.
 *
 * Static server component: the whole thing is markup, no client JS.
 */

/** Google's four-colour wordmark, done in text so it stays a few bytes and scales cleanly. */
function GoogleWordmark() {
  return (
    <span className="text-lg font-medium tracking-tight" aria-label="Google">
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC05' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
    </span>
  )
}

/** The multicolour Google "G" mark that sits in the corner of each review card. */
function GoogleGlyph({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

/** A row of five stars in Google's amber. */
function Stars({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={className} style={{ fill: '#FBBC04' }}>
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  )
}

/**
 * The blue "verified" tick Google puts beside a review's stars.
 *
 * Google blue (#4285F4) is already licensed to this site under the Platform Mark Exception
 * in DESIGN.md — it is one of the four wordmark colours. No new foreign colour enters here.
 */
function VerifiedTick({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M12 1.5l2.6 1.9 3.2-.1 1 3 2.7 1.7-1 3 1 3-2.7 1.7-1 3-3.2-.1L12 22.5l-2.6-1.9-3.2.1-1-3L2.5 16l1-3-1-3 2.7-1.7 1-3 3.2.1z"
      />
      <path
        fill="#fff"
        d="M10.9 15.4l-3-3 1.2-1.2 1.8 1.8 4.1-4.1 1.2 1.2z"
      />
    </svg>
  )
}

function Avatar({ name, color }: { name: string; color: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-base font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {name.charAt(0)}
    </span>
  )
}

export function GoogleReviews() {
  // Fabricated data may render in exactly two places: local development, and the
  // *.vercel.app staging domain used to show the client a layout.
  //
  // It can never render on persistencechiropractic.com, because `isStagingDeployment` is
  // derived from the domain Vercel will serve the build from — attaching the real domain
  // turns this off by itself. That is the whole reason it is not a feature flag.
  const previewSampleData =
    USE_SAMPLE_REVIEWS && (process.env.NODE_ENV !== 'production' || isStagingDeployment)
  if (!previewSampleData) return <ServiceTestimonials />

  const summary = sampleReviewSummary
  const reviews = sampleReviews

  return (
    <section aria-label="Reviews" className="border-t border-line bg-brand-aqua/40">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>From our patients in Cheras</Eyebrow>
        <h2 className="mt-5 mb-8 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          What people say after being seen here
        </h2>

        {/* Business panel beside the rail, the way an embedded Google widget arranges it:
            who is being reviewed on the left, the reviews themselves on the right. It stacks
            to a row above the cards below `lg`, where a 16rem column would leave the rail
            too narrow to show a card and a half. */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[15rem_1fr] lg:items-center lg:gap-12">
          <div className="flex items-center gap-5 lg:block">
            <Image
              src="/img/clinic-reception.webp"
              alt="Reception at Persistence Chiropractic Care, Sunway Velocity, Cheras Kuala Lumpur"
              width={800}
              height={550}
              sizes="240px"
              className="h-20 w-20 flex-none rounded-2xl object-cover lg:h-28 lg:w-full"
            />
            <div className="lg:mt-5">
              <p className="text-base font-bold leading-snug text-ink">{clinic.name}</p>
              <Stars className="mt-2 h-4 w-4" />
              <p className="mt-2 text-sm text-ink-muted">
                {summary.count} <GoogleWordmark /> reviews
              </p>
              <a
                href={googleReviews.url}
                target="_blank"
                rel="noopener"
                className="mt-4 inline-flex items-center justify-center rounded-full border border-brand-slate/30 px-5 py-2.5 text-sm font-semibold text-brand-slate transition-colors hover:bg-brand-slate/5"
              >
                Write a review
              </a>
            </div>
          </div>

          {/**
           * The rail itself. `relative` so the arrows can hang off its edges.
           *
           * ⚠️ `min-w-0` IS LOAD-BEARING — do not remove it. A grid item defaults to
           * `min-width: auto`, which means it refuses to shrink below the intrinsic width of
           * its contents. With eight 19rem cards inside, the `1fr` track grew to fit all of
           * them, pushed the 72rem container past the viewport, and gave the whole DOCUMENT a
           * horizontal scrollbar — the rail never scrolled because it was never narrower than
           * its content. `min-w-0` lets the track shrink so the overflow happens inside the
           * `<ul>`, which is the only place it should.
           */}
          <div className="relative min-w-0">
            <ul
              id="google-review-rail"
              tabIndex={0}
              aria-label="Google reviews"
              className="rail -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-5 lg:mx-0 lg:px-0"
            >
              {reviews.map((r) => (
                <li
                  key={r.name}
                  className="w-[82%] flex-none snap-start sm:w-[21rem] lg:w-[19rem]"
                >
                  <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-ambient">
                    <div className="flex items-center gap-3">
                      <Avatar name={r.name} color={r.color} />
                      <figcaption className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {r.name}
                        </span>
                        <span className="block text-xs text-ink-muted">{r.when}</span>
                      </figcaption>
                      <GoogleGlyph />
                    </div>
                    <p className="mt-4 flex items-center gap-1.5">
                      <Stars className="h-4 w-4" />
                      <VerifiedTick />
                    </p>
                    {/* Clamped to four lines so every card is the same height and the rail
                        scans. The overflow is not hidden from the visitor — "Read more" goes
                        to the listing, which is where the full review actually lives. */}
                    <blockquote className="mt-3 line-clamp-4 text-sm leading-relaxed text-ink-muted">
                      {r.body}
                    </blockquote>
                    <a
                      href={googleReviews.url}
                      target="_blank"
                      rel="noopener"
                      className="mt-4 inline-block text-sm font-semibold text-brand-slate underline underline-offset-4"
                    >
                      Read more
                    </a>
                  </figure>
                </li>
              ))}
            </ul>
            <RailArrows targetId="google-review-rail" />
          </div>
        </div>
      </div>
    </section>
  )
}
