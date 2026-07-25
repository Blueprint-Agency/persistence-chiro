'use client'

import { useEffect, useState } from 'react'

/**
 * Backbone preloader. Four vertebral segments — the brand's spine mark — pulse top to
 * bottom, then the page is revealed *through* the bones: a white sheet with bone-shaped
 * holes covers the page, and the opaque slate bones (glued over their windows) zoom up and
 * fade so the page is uncovered only as they turn transparent. Everywhere the bones aren't
 * stays white until the closing fade. The bones are opaque the whole pulse, so no page text
 * shows before the zoom begins.
 *
 * The motion and reveal live in globals.css (.preloader*); this component only:
 *   - supplies the bone-hole mask geometry (below) to the sheet,
 *   - plays only when the homepage is the session's entry page — not on in-app
 *     navigations to home from another page (see shouldPlay),
 *   - locks scroll while the overlay is up,
 *   - skips the replay after the first view in a browser session,
 *   - unmounts once the CSS reveal has finished.
 *
 * Rendered as the first child of <body>, so it SSRs into the initial HTML and covers the
 * page from first paint — no flash of content before the animation.
 */

// Four bones; the dark-to-light taper is set by :nth-child colour in globals.css.
const BONES = [0, 1, 2, 3]

/**
 * The mask: a 4000×4000 white field with four bone-shaped holes centred at (2000, 2000).
 * Where the SVG is transparent (the bones) the sheet is punched through and the page shows.
 * Bone px here match .preloader__bone so the pulsing bones sit exactly over the windows;
 * the holes are a touch smaller so the slate always fully covers them during the pulse.
 * Centres line up with the four flex bones (26px tall, 10px gap → 36px pitch).
 */
const HOLE_W = 68
const HOLE_H = 22
const HOLE_RX = 8
const HOLE_CENTERS = [1946, 1982, 2018, 2054] // stack of 4, 36px pitch, centred on 2000
const holeRects = HOLE_CENTERS.map(
  (cy) =>
    `<rect x='${2000 - HOLE_W / 2}' y='${cy - HOLE_H / 2}' width='${HOLE_W}' height='${HOLE_H}' rx='${HOLE_RX}' fill='black'/>`,
).join('')
const MASK_SVG =
  `<svg xmlns='http://www.w3.org/2000/svg' width='4000' height='4000'>` +
  `<defs><mask id='b'><rect width='4000' height='4000' fill='white'/>${holeRects}</mask></defs>` +
  `<rect width='4000' height='4000' fill='white' mask='url(#b)'/></svg>`
const MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(MASK_SVG)}")`

// Pulse (0.85s × 2, staggered) then reveal (zoom 1.9→2.8s, fade to 2.85s).
const REVEAL_MS = 2950
const SESSION_KEY = 'pc-preloaded'

/**
 * Whether to play this mount. On the server we return true so the overlay ships in the
 * static HTML (no flash of content for a genuine homepage entry). In the browser it plays
 * only when ALL hold:
 *   - motion is allowed,
 *   - it hasn't already played this session,
 *   - the homepage was the *entry* page — a real document load of "/", not an in-app
 *     navigation to home from another page. The Navigation Timing entry's name is the URL
 *     the document loaded at; on a client-side route change it stays the original entry URL,
 *     so arriving at home via a link reads a non-"/" path here and is skipped.
 *
 * Computed in the state initializer (not just an effect) so that on an internal navigation
 * to home the overlay is never rendered even for one frame.
 */
function shouldPlay(): boolean {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (sessionStorage.getItem(SESSION_KEY)) return false
  const nav = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined
  const entryPath = nav ? new URL(nav.name).pathname : window.location.pathname
  return entryPath === '/'
}

export function Preloader() {
  const [done, setDone] = useState(() => !shouldPlay())

  useEffect(() => {
    if (done) return

    sessionStorage.setItem(SESSION_KEY, '1')
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => setDone(true), REVEAL_MS)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = prevOverflow
    }
  }, [done])

  if (done) return null

  return (
    <div className="preloader" aria-hidden="true">
      <div
        className="preloader__sheet"
        style={{ WebkitMaskImage: MASK_URL, maskImage: MASK_URL }}
      />
      <div className="preloader__spine">
        {BONES.map((i) => (
          <span
            key={i}
            className="preloader__bone"
            style={{ animationDelay: `${i * 0.14}s` }}
          />
        ))}
      </div>
    </div>
  )
}
