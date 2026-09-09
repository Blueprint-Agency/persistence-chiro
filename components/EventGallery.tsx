import Image from 'next/image'

import type { EventImage } from '@/lib/events'

/**
 * The photo slot on a /partner-with-us event card. One image renders as a plain <Image>;
 * two crossfade on a 10s loop with NO JAVASCRIPT — the same stacked-images-plus-one-CSS-
 * keyframe technique as `HeroGallery`, and for the same reason: a carousel library for a
 * dozen decorative cards would be the most expensive dependency on the site.
 *
 * ⚠️ EXACTLY TWO SLIDES when animating. `.event-slide` in globals.css splits the loop into
 * two 5s slots; a third photo would need those percentages changed, so the component clamps
 * to two rather than let a data edit silently break the rotation. The first image is the
 * one shown under `prefers-reduced-motion`, so `lib/events.ts` leads with the strongest.
 *
 * Every slide is lazy: these cards sit well below the fold and none is an LCP candidate.
 */
const SLOT_SECONDS = 5

const imageClass = 'aspect-[4/3] w-full object-cover'
const sizes = '(max-width: 640px) 100vw, 360px'

export function EventGallery({ images }: { images: readonly EventImage[] }) {
  const shown = images.slice(0, 2)

  if (shown.length === 1) {
    const [img] = shown
    return (
      <div className="overflow-hidden rounded-3xl">
        <Image src={img.file} alt={img.alt} width={1100} height={825} sizes={sizes} className={imageClass} />
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
      {shown.map((img, i) => (
        <Image
          key={img.file}
          src={img.file}
          alt={img.alt}
          width={1100}
          height={825}
          sizes={sizes}
          className={`event-slide absolute inset-0 h-full ${imageClass}`}
          // Negative delay, as in HeroGallery: slide 0 is visible on first paint, slide 1 is
          // wound back half a loop so it surfaces at 5s. Positive delays would flash blank.
          style={{ animationDelay: `${-((shown.length - i) % shown.length) * SLOT_SECONDS}s` }}
        />
      ))}
    </div>
  )
}
