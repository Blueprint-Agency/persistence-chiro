import Image from 'next/image'

import { Eyebrow, Vertebrae, WhatsAppButton } from '@/components/ui'
import { RatingBadge } from '@/components/service'

/**
 * Centred hero for the condition pages, over a photograph with a parallax drift.
 *
 * WHY NOT EXTEND `PageHero`. That component is the hero for twelve routes — /about, /press,
 * /blog, /what-to-expect, the two index pages and the practitioner profiles — and none of
 * them wants a photographic background or a booking button. Widening it to serve one
 * template would put an image slot and a CTA on eleven pages that have no use for either.
 *
 * WHY CENTRED HERE AND LEFT-ALIGNED ON THE SERVICE PAGES. A service hero runs beside a
 * photograph in a two-column grid, so its text has a column to sit in. This one sits ON the
 * photograph, where a left-aligned block reads as though it has come loose from the frame.
 * Centred, it is obviously deliberate, and the measure stays readable because the well is
 * capped at 3xl rather than running the full width.
 *
 * THE SCRIM IS DOING ACCESSIBILITY WORK, not styling. brand-slate-deep at 85% keeps white
 * body copy clear of AA over a photograph that is bright in places (the reception shot has a
 * lit desk and a window wall). Lowering it further makes the picture prettier and the text
 * unreadable, which is the wrong trade on a page someone reads while in pain.
 */
export function ConditionHero({
  title,
  intro,
  message,
  image,
}: {
  title: string
  intro?: string
  message: string
  image?: { src: string; alt: string }
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-slate-deep text-white">
      {image && (
        <>
          {/*
           * The moving layer. Scaled beyond the section so the drift never exposes an edge;
           * see `.hero-parallax__layer` in globals.css for the motion itself.
           *
           * `aria-hidden` with an empty alt: the h1 immediately over it carries the meaning,
           * and a screen reader announcing a reception photograph before the name of the
           * condition someone came here about is noise. This is the one place the
           * local-modifier alt rule in AGENTS.md does not apply, because the image is
           * decorative rather than informative.
           */}
          <div className="hero-parallax__layer absolute inset-0 -z-10">
            <Image
              src={image.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-slate-deep/85" />
        </>
      )}

      <div className="mx-auto max-w-3xl px-4 py-20 text-center lg:py-28">
        {/* Eyebrow is a flex row by default, so it needs centring explicitly. */}
        <div className="flex justify-center">
          <Eyebrow tone="light">Conditions</Eyebrow>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
          {title}
        </h1>

        {intro && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>
        )}

        {/* The condition pages had no hero CTA at all: the only ask above the fold was a
            sidebar that scrolls away on a phone. One animated button per page, matching the
            service heroes. */}
        <div className="mt-8 flex justify-center">
          <WhatsAppButton attention message={message}>
            Book an assessment
          </WhatsAppButton>
        </div>

        <div className="mt-7 flex flex-col items-center gap-3">
          <RatingBadge tone="light" />
          <p className="flex items-center gap-2.5 text-sm text-white/70">
            <Vertebrae className="text-brand-gold" />
            Open seven days · Cheras, Maluri
          </p>
        </div>
      </div>
    </section>
  )
}
