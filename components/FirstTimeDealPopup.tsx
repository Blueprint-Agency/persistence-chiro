'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { sendGTMEvent } from '@next/third-parties/google'

import { CTA_EVENTS, GA4_ID, GTM_ID } from '@/lib/analytics'

/**
 * "First time deal!" pop-up. Homepage only, once per browser session.
 *
 * Built 2026-09-10 at the client's request, modelled on a competitor's bundle pop-up with
 * one deliberate difference: NO PRICE and NO BUNDLE in the box. The client wants it to work
 * as a call to action that sends the visitor to /offers, where the cards carry the figures.
 * Keep it that way. A price typed here is a second copy of lib/pricing.ts that can drift.
 *
 * WHAT IT DOES NOT DO, on purpose:
 *   - It renders nothing on the server and nothing on first client paint. `open` starts
 *     false and only the timer flips it, so there is no hydration mismatch and no layout
 *     shift; the crawler never sees a modal sitting on top of the h1.
 *   - It does not fire on load. The Preloader (~1.4s) has to finish and the visitor gets a
 *     few seconds with the hero before anything jumps in front of it. Someone in pain
 *     comparing clinics is the whole audience; a modal at 0s reads as an ad, not an offer.
 *   - It does not nag. One showing per session, whether closed, ignored or clicked.
 *
 * Accessibility: role=dialog with a label and description, focus moves into the box on
 * open and back out on close, Tab cycles inside it, Escape and the veil both close it.
 * Motion lives in globals.css (.offer-popup*) and is flattened by the global
 * prefers-reduced-motion block like everything else.
 *
 * Copy comes from the dictionary (`dict.page.offerPopup*`) so zh/ms get their own wording
 * rather than a translation of the English; see AGENTS.md § Multilingual. "First time
 * deal!" is the client's phrase for the badge.
 */

const SESSION_KEY = 'pc-offer-popup'
const OPEN_DELAY_MS = 5000

export type FirstTimeDealCopy = {
  badge: string
  heading: string
  body: string
  cta: string
  later: string
  close: string
  imageAlt: string
}

export function FirstTimeDealPopup({ href, copy }: { href: string; copy: FirstTimeDealCopy }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const headingId = useId()
  const bodyId = useId()

  // Arm once per session. sessionStorage can throw in private modes, so every touch is
  // guarded and the popup simply shows if it cannot remember.
  useEffect(() => {
    let shown = false
    try {
      shown = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {}
    if (shown) return

    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {}
      returnFocusRef.current = document.activeElement as HTMLElement | null
      setOpen(true)
    }, OPEN_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    returnFocusRef.current?.focus?.()
  }, [])

  useEffect(() => {
    if (!open) return
    const node = dialogRef.current
    node?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !node) return
      const focusable = node.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || active === node)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  if (!open) return null

  // Internal link, so the delegated CtaTracking listener (which matches WhatsApp, tel and
  // maps hrefs) never sees it. Reported under its own event so the client can tell whether
  // the pop-up is actually sending anyone to /offers.
  const onCtaClick = () => {
    if (GTM_ID || GA4_ID) {
      sendGTMEvent({
        event: CTA_EVENTS.offerPopup,
        cta_location: window.location.pathname,
        cta_text: copy.cta,
      })
    }
    setOpen(false)
  }

  return (
    // Above the sticky header (z-50) and the mobile WhatsApp bar (z-40); below the
    // skip link (z-60), which must stay reachable whatever is on screen.
    <div className="fixed inset-0 z-[55] flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={close}
        className="offer-popup__veil absolute inset-0 bg-brand-slate-deep/60 backdrop-blur-[2px]"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={bodyId}
        tabIndex={-1}
        className="offer-popup relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-overlay outline-none sm:grid sm:max-w-2xl sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      >
        <div className="relative h-40 sm:h-full sm:min-h-[19rem]">
          <Image
            src="/img/hero-consult-spine-model.webp"
            alt={copy.imageAlt}
            fill
            sizes="(min-width: 640px) 300px, 100vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-ambient">
            {copy.badge}
          </span>
        </div>

        <div className="p-6 sm:p-8 sm:pr-14">
          <button
            type="button"
            onClick={close}
            aria-label={copy.close}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-muted shadow-ambient transition-colors hover:bg-brand-aqua hover:text-ink sm:right-4 sm:top-4"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>

          <h2 id={headingId} className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            {copy.heading}
          </h2>
          <p id={bodyId} className="mt-3 leading-relaxed text-ink-muted">
            {copy.body}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href={href}
              onClick={onCtaClick}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[#d4b00d]"
            >
              {copy.cta}
            </Link>
            <button
              type="button"
              onClick={close}
              className="text-sm font-semibold text-ink-muted underline-offset-4 hover:underline"
            >
              {copy.later}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
