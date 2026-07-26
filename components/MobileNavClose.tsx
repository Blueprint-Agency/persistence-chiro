'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Closes the mobile navigation drawer after a visitor picks something from it.
 *
 * The drawer is a native `<details>`, which is the right call — it costs no bundle and works
 * without JS. But `<details open>` is DOM state, and Next's client-side navigation never
 * unmounts the header, so tapping a link swapped the page *underneath* a menu that stayed
 * open on top of it. On a phone that reads as a broken tap: the visitor cannot see that
 * anything happened.
 *
 * Handled here rather than with onClick props on every link, for the same reason
 * `CtaTracking` exists: adding a handler to the nav would force `'use client'` onto the
 * header and drag its tree into the browser. This renders no DOM and attaches two listeners.
 *
 * Three ways it closes:
 *   1. a link inside the drawer is clicked — including a link to the page you are already
 *      on, which produces no route change at all;
 *   2. the route changes by any other means (back/forward, a redirect);
 *   3. Escape, or a tap outside the drawer — what a sheet is expected to do.
 */
const DRAWER = 'details[data-mobile-nav]'

function closeAll() {
  document.querySelectorAll<HTMLDetailsElement>(DRAWER).forEach((d) => {
    d.open = false
  })
}

export function MobileNavClose() {
  const pathname = usePathname()

  // Back/forward and any navigation the click handler did not originate.
  useEffect(closeAll, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target?.closest) return

      const drawer = target.closest<HTMLDetailsElement>(DRAWER)

      // Inside the drawer: only a link dismisses it. The <summary> is inside too, and it
      // must keep its native toggle behaviour.
      if (drawer) {
        if (target.closest('a')) drawer.open = false
        return
      }

      closeAll()
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll()
    }

    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return null
}
