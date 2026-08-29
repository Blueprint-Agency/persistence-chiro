'use client'

/**
 * Prev/next controls for a horizontal card rail.
 *
 * The ONLY client component in the review section, and it exists because scrolling a
 * container cannot be done without JS. Everything else — the cards, the business panel, the
 * Google marks — is static markup rendered on the server.
 *
 * It is progressive enhancement, not a dependency: the rail is already scrollable by touch,
 * trackpad, its own styled scrollbar and the keyboard, so if this never hydrates the section
 * still works completely. That is why the buttons are rendered by JS-adjacent markup rather
 * than being the primary affordance.
 *
 * Hidden below `sm` on purpose. A phone user swipes, and two floating buttons over a card
 * that is 82% of the viewport wide would cover the review they are trying to read.
 */
export function RailArrows({
  targetId,
  previousLabel,
  nextLabel,
}: {
  targetId: string
  // No defaults: the sole caller always passes localized aria-labels, and a default here
  // would silently ship English if a future caller forgot — see the multilingual memory
  // for the KeyTakeaways incident this mirrors.
  previousLabel: string
  nextLabel: string
}) {
  const nudge = (direction: 1 | -1) => {
    const rail = document.getElementById(targetId)
    if (!rail) return
    // 0.8 of the visible width, so the card you were reading stays partly in frame and the
    // movement reads as continuous rather than as a page swap.
    rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: 'smooth' })
  }

  const base =
    'absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink-muted shadow-overlay transition-colors hover:text-ink sm:flex'

  return (
    <>
      <button
        type="button"
        aria-label={previousLabel}
        onClick={() => nudge(-1)}
        className={`${base} -left-3 lg:-left-5`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={() => nudge(1)}
        className={`${base} -right-3 lg:-right-5`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  )
}
