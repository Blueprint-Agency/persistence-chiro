'use client'

import { useEffect } from 'react'

import { ctaEventFor, GA4_ID, GTM_ID } from '@/lib/analytics'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

/**
 * Fires a conversion event when a visitor clicks a booking, WhatsApp, phone or maps link.
 * This is what makes KPI 2 ("+10% monthly increment in CTA clicks") reportable.
 *
 * ONE delegated listener on the document, rather than handlers on each CTA. Every button
 * on this site is a plain `<a>` rendered by a server component; adding onClick props would
 * force `'use client'` onto the homepage, every condition page and every service page,
 * shipping their whole trees to the browser. Static-by-default and Core Web Vitals are
 * both non-negotiables in AGENTS.md, so this is the one client component on the site and
 * it renders no DOM at all.
 *
 * `closest('a')` handles clicks landing on an icon or span inside the link.
 *
 * Events go to `dataLayer` in both the GTM and direct-GA4 cases: gtag.js reads the same
 * queue, so a single push works for either wiring.
 */
export function CtaTracking() {
  useEffect(() => {
    if (!GTM_ID && !GA4_ID) return

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const link = target?.closest?.('a')
      if (!link) return

      const event = ctaEventFor(link.getAttribute('href'))
      if (!event) return

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event,
        // Where on the site the click happened — lets the client see whether the header
        // CTA, a condition page or the footer is actually converting.
        cta_location: window.location.pathname,
        cta_text: link.textContent?.trim().slice(0, 80) ?? '',
      })
    }

    // Capture phase: the click still navigates away immediately afterwards, and bubbling
    // to document can lose the event on an external link in some browsers.
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
