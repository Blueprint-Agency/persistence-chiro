import Image from 'next/image'

/**
 * Auto-advancing hero gallery. Crossfades four clinic photographs on a 24s loop.
 *
 * NO JAVASCRIPT. The whole thing is four stacked <Image>s and one CSS keyframe (see
 * `.hero-slide` in globals.css), which keeps this a server component and keeps the Core Web
 * Vitals budget the rebuild depends on. A carousel library here would be the single most
 * expensive dependency on the site, for a decoration.
 *
 * How the timing works: every slide runs the SAME 24s animation, staggered by a NEGATIVE
 * animation-delay so each one is already mid-flight on first paint. That is what avoids the
 * usual CSS-carousel flash — with positive delays the first slide starts at opacity 0 and
 * the hero is blank for a beat, which would also wreck LCP.
 *
 * ⚠️ EXACTLY FOUR SLIDES. The keyframe percentages in globals.css divide the loop into four
 * 6s slots. Changing the slide count means changing those percentages too; the component
 * clamps to four so a fifth photo can never silently break the rotation.
 *
 * Only the first slide is `priority` — it is the LCP candidate. The rest stay lazy so they
 * do not compete with it for bandwidth on a Malaysian mobile connection.
 *
 * Reduced motion: globals.css freezes this to the first slide only. The gallery is
 * decorative; nothing in it is information a visitor can miss.
 */

export type HeroSlide = { src: string; alt: string }

const SLOT_SECONDS = 6

export function HeroGallery({ slides }: { slides: readonly HeroSlide[] }) {
  const shown = slides.slice(0, 4)

  return (
    <div className="hero-gallery relative h-[300px] overflow-hidden rounded-[2rem] sm:h-[380px] lg:h-[520px] lg:rounded-[3rem] lg:rounded-tl-[9rem]">
      {shown.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          width={1600}
          height={1067}
          priority={i === 0}
          loading={i === 0 ? undefined : 'lazy'}
          sizes="(max-width: 1024px) 100vw, 560px"
          className="hero-slide absolute inset-0 h-full w-full object-cover"
          /**
           * -((n - i) % n) * 6s. Slide 0 gets 0s and is visible immediately; the rest are
           * wound backwards so they surface at 6s, 12s and 18s.
           */
          style={{
            animationDelay: `${-((shown.length - i) % shown.length) * SLOT_SECONDS}s`,
          }}
        />
      ))}
    </div>
  )
}
