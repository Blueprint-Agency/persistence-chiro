import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Shared primitives. Only things used in three or more places live here — everything
 * else stays inline in the page that needs it.
 */

/** The signature marker. Segment count is fixed at four; it's a mark, not a data display. */
export function Vertebrae({ className = '' }: { className?: string }) {
  return (
    <span className={`vertebrae ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

/** Section eyebrow: the vertebral marker plus a label. */
export function Eyebrow({
  children,
  tone = 'slate',
}: {
  children: ReactNode
  tone?: 'slate' | 'light'
}) {
  const color = tone === 'light' ? 'text-brand-slate-soft' : 'text-brand-slate'
  return (
    <p className={`flex items-center gap-3 ${color}`}>
      <Vertebrae />
      <span className="label">{children}</span>
    </p>
  )
}

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors'

/**
 * The gold CTA. Booking is external (SweetPew) so this is always an <a>, never a form —
 * there is no booking logic in this codebase and there shouldn't be.
 */
export function GoldButton({
  href,
  children,
  external = false,
}: {
  href: string
  children: ReactNode
  external?: boolean
}) {
  const className = `${BUTTON_BASE} bg-brand-gold text-ink hover:bg-[#d4b00d]`
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

/** Secondary CTA. Outlined so it never competes with the gold booking button. */
export function GhostButton({
  href,
  children,
  external = false,
  tone = 'slate',
}: {
  href: string
  children: ReactNode
  external?: boolean
  tone?: 'slate' | 'light'
}) {
  const className =
    tone === 'light'
      ? `${BUTTON_BASE} border border-white/30 text-white hover:bg-white/10`
      : `${BUTTON_BASE} border border-brand-slate/30 text-brand-slate hover:bg-brand-slate/5`
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

/** WhatsApp glyph. Inline SVG rather than an icon dependency for one mark. */
export function WhatsAppIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.42-9.4a9.36 9.36 0 0 1 9.4 9.41c0 5.18-4.22 9.4-9.4 9.4M20.5 3.49A11.8 11.8 0 0 0 12.04 0C5.48 0 .14 5.34.13 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.73 1.46h.01c6.56 0 11.9-5.34 11.9-11.9a11.8 11.8 0 0 0-3.44-8.42" />
    </svg>
  )
}

/** Check glyph for trust/benefit lists. */
export function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16m3.86-9.79a.75.75 0 0 0-1.22-.87l-3.24 4.53-1.6-1.6a.75.75 0 0 0-1.06 1.06l2.22 2.22a.75.75 0 0 0 1.14-.09z"
        clipRule="evenodd"
      />
    </svg>
  )
}
