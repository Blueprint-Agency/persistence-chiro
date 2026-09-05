import Image from 'next/image'

import { publishedDirectionsFor, routeIcons, signageFor } from '@/lib/directions'
import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/dictionaries/types'
import { Eyebrow } from '@/components/ui'

/**
 * The "Locate Us" walkthroughs on /book-now — three photo routes into the clinic.
 *
 * A server component with no interactivity anywhere in it. The route picker is a row of
 * plain `#anchor` links and the images are ordinary lazy `next/image`s, so the whole thing
 * costs zero JavaScript on a page whose job is to load fast for someone standing outside
 * Sunway Velocity on mobile data, already lost. A carousel would have been the obvious
 * component to reach for and would have been exactly wrong.
 *
 * Every step renders the client's own square slide AS SUPPLIED, with the instruction repeated
 * as real text beside it. The slides have their wording baked into the pixels — invisible to
 * Google, invisible to a screen reader, unreadable at phone width — so the text is not a
 * duplicate of the image, it is the only machine-readable copy of the route. That is the
 * whole reason this page can rank for "how to get to persistence chiropractic" at all.
 */
/**
 * Route glyphs. The slug -> name map lives in lib/directions.ts (and is guarded by a test);
 * this only turns a name into a drawing.
 */
function RouteIcon({ slug }: { slug: string }) {
  const common = {
    viewBox: '0 0 24 24',
    className: 'h-7 w-7 text-brand-slate',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (routeIcons[slug]) {
    case 'car':
      return (
        <svg {...common}>
          <path d="M4 16v2.5M20 16v2.5M5.5 16h13a1.5 1.5 0 0 0 1.5-1.5v-2.2a2 2 0 0 0-.4-1.2l-2-2.7a2 2 0 0 0-1.6-.8H8a2 2 0 0 0-1.6.8l-2 2.7a2 2 0 0 0-.4 1.2v2.2A1.5 1.5 0 0 0 5.5 16Z" />
          <path d="M7.5 12.8h.01M16.5 12.8h.01" />
        </svg>
      )
    case 'walk':
      return (
        <svg {...common}>
          <circle cx="13" cy="4.2" r="1.7" />
          <path d="M11.4 21l1.4-5.6-2.4-2 .8-4.2-3 1.6-1 2.6" />
          <path d="M12.8 15.4l3 2 1.2 3.6M11.2 9.2l3.4-.6 2.2 2.6 2.4.6" />
        </svg>
      )
    case 'hospital':
      return (
        <svg {...common}>
          <path d="M4 20V9.5a1 1 0 0 1 .5-.87l7-4a1 1 0 0 1 1 0l7 4a1 1 0 0 1 .5.87V20" />
          <path d="M2.5 20h19" />
          <path d="M12 8.6v4.8M9.6 11h4.8" />
          <path d="M9.5 20v-3.6h5V20" />
        </svg>
      )
    default:
      return null
  }
}

export function FindUs({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const routes = publishedDirectionsFor(locale)
  if (routes.length === 0) return null

  return (
    <section id="find-us" className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>{dict.page.findUsEyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          {dict.page.findUsHeading}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {dict.page.findUsIntro}
        </p>

        {/*
          The route picker. Someone already on the way needs their one route, not all three.

          It was a row of small pills and it did not read as a choice — the eye took them for
          decoration under the paragraph and scrolled straight past into whichever route
          happened to be first. Cards fix that with the things a pill has no room for: an icon
          that says at a glance which is yours, the number of steps so the commitment is known
          before the tap, and an explicit "See the steps" with an arrow so the affordance is
          stated rather than implied.
        */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-ink">{dict.page.findUsPickRoute}</h3>
          <p className="mt-1 text-ink-muted">{dict.page.findUsPickRouteHint}</p>

          <nav aria-label={dict.page.findUsPickRoute}>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {routes.map((route) => (
                <li key={route.slug}>
                  <a
                    href={`#${route.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-background p-5 transition-colors hover:border-brand-slate hover:bg-brand-slate/5 focus-visible:border-brand-slate focus-visible:bg-brand-slate/5"
                  >
                    <RouteIcon slug={route.slug} />
                    <span className="mt-4 font-bold leading-snug text-ink">{route.title}</span>
                    <span className="mt-1 text-sm text-ink-muted">
                      {dict.page.stepCount(route.steps.length)}
                    </span>
                    {/* mt-auto pins this to the bottom so the three cards agree on a baseline
                        however many lines the title above it wraps to. */}
                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate">
                      {dict.page.seeTheSteps}
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 8h11M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 space-y-20">
          {routes.map((route) => (
            <article key={route.slug} id={route.slug} className="scroll-mt-28">
              <h3 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                {route.title}
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">{route.intro}</p>

              <ol className="mt-10 space-y-12">
                {route.steps.map((step, i) => (
                  <li
                    key={step.image}
                    className="grid items-center gap-6 md:grid-cols-2 md:gap-10"
                  >
                    <div className="overflow-hidden rounded-3xl border border-line bg-white">
                      <Image
                        src={`/img/find-us/${step.image}`}
                        alt={step.alt}
                        width={1080}
                        height={1080}
                        sizes="(max-width: 768px) 100vw, 460px"
                        className="h-auto w-full"
                      />
                    </div>
                    <div>
                      <p className="label text-brand-slate">{dict.page.stepLabel(i + 1)}</p>
                      <h4 className="mt-3 text-xl font-bold leading-snug text-ink">
                        {step.title}
                      </h4>
                      {step.detail && (
                        <p className="mt-3 leading-relaxed text-ink-muted">{step.detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        {/* The arrival check, not a step: two shopfronts, because the unit has frontage on
            both the corridor and the back under Tong Beauty Lab, and someone approaching from
            behind sees a door they have no reason to think is ours. */}
        <div className="mt-20 border-t border-line pt-12">
          <h3 className="text-2xl font-extrabold leading-tight text-ink">
            {dict.page.signageHeading}
          </h3>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2">
            {signageFor(locale).map((shot) => (
              <li key={shot.image}>
                <div className="overflow-hidden rounded-3xl border border-line bg-white">
                  <Image
                    src={`/img/find-us/${shot.image}`}
                    alt={shot.alt}
                    width={1080}
                    height={1080}
                    sizes="(max-width: 640px) 100vw, 460px"
                    className="h-auto w-full"
                  />
                </div>
                <h4 className="mt-4 text-lg font-bold text-ink">{shot.title}</h4>
                {shot.detail && (
                  <p className="mt-2 leading-relaxed text-ink-muted">{shot.detail}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
