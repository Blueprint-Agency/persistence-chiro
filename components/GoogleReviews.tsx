import { googleReviews } from '@/lib/clinic'
import { sampleReviews, sampleReviewSummary, USE_SAMPLE_REVIEWS } from '@/lib/sample-reviews'
import { Eyebrow } from '@/components/ui'
import { ServiceTestimonials } from '@/components/service'

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
  // Fabricated data is a design-preview affordance for `next dev` only. Any production
  // build — which is the only thing that reaches a patient — gets the real quotes.
  const previewSampleData = USE_SAMPLE_REVIEWS && process.env.NODE_ENV !== 'production'
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

        {/* Summary header — mirrors a Google Business Profile ratings block. */}
        <div className="flex flex-col gap-6 rounded-3xl border border-line bg-white p-8 shadow-ambient sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <GoogleGlyph className="h-10 w-10" />
            <div>
              <p className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold leading-none text-ink">
                  {summary.rating.toFixed(1)}
                </span>
                <Stars className="h-5 w-5" />
              </p>
              <p className="mt-1.5 text-sm text-ink-muted">
                Based on {summary.count} <GoogleWordmark /> reviews
              </p>
            </div>
          </div>
          <a
            href={googleReviews.url}
            target="_blank"
            rel="noopener"
            className="inline-flex flex-none items-center justify-center rounded-full border border-brand-slate/30 px-6 py-3 text-sm font-semibold text-brand-slate transition-colors hover:bg-brand-slate/5"
          >
            Write a review
          </a>
        </div>

        {/* Individual review cards, on a horizontal rail — eight of these stacked in a grid
            was three screens of scrolling before a visitor reached anything else. */}
        <ul
          tabIndex={0}
          aria-label="Google reviews"
          className="rail -mx-4 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-5 lg:mx-0 lg:px-0"
        >
          {reviews.map((r) => (
            <li key={r.name} className="w-[82%] flex-none snap-start sm:w-[24rem] lg:w-[22rem]">
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-ambient">
                <div className="flex items-center gap-3">
                  <Avatar name={r.name} color={r.color} />
                  <figcaption className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">{r.name}</span>
                    <span className="block text-xs text-ink-muted">{r.when}</span>
                  </figcaption>
                  <GoogleGlyph />
                </div>
                <Stars className="mt-4 h-4 w-4" />
                <blockquote className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {r.body}
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
