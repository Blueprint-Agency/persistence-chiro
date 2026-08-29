import Link from 'next/link'
import type { ReactNode } from 'react'


import type { NavItem } from '@/lib/nav'
import { whatsappLink } from '@/lib/whatsapp'
import type { Dictionary } from '@/dictionaries/types'

/**
 * Shared primitives. Only things used in three or more places live here — everything
 * else stays inline in the page that needs it.
 */

/**
 * One nav row, internal or off-site.
 *
 * Exists because "Book Now" points at SweetPew while every other item is a route. Passing
 * an absolute URL to next/link renders a plain anchor but drops `target` and `rel`, so an
 * off-site booking link would open in the same tab with no `noopener` — losing the visitor's
 * place on the site and handing the opened page a reference to this window. The three places
 * that render `mainNav()` (desktop bar, mobile drawer, footer) all go through here so none
 * of them can get that wrong independently.
 */
export function NavLink({
  item,
  className,
  children,
}: {
  item: NavItem
  className?: string
  children: ReactNode
}) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={item.href} className={className}>
      {children}
    </Link>
  )
}

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

/**
 * Section eyebrow: the vertebral marker plus a label.
 *
 * `light` is for the deep field, `slate` for light grounds. Two further tones (`ink` and
 * `deep`) existed for the 2026 palette preview's mid-tone hero and went with it — at 11px
 * this is small text, so any new tone needs 4.5:1 against its actual band before it ships.
 */
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
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-colors'

/**
 * The gold CTA. Every conversion on this site is a WhatsApp conversation, so this is always
 * an <a> to wa.me and never a form — there is no booking logic in this codebase and there
 * shouldn't be.
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

/**
 * The site's one conversion button: gold pill, WhatsApp glyph, prefilled message.
 *
 * Gold rather than WhatsApp green on purpose. Gold is the brand's conversion colour and the
 * One Gold Decision Rule depends on it meaning "the action being asked for" — painting every
 * CTA on the site #25D366 would hand the palette to a third party. The glyph carries the
 * "this opens WhatsApp" signal instead, which is the part that actually needs communicating.
 *
 * `message` is the text pre-typed into the visitor's chat box. Pass one from `waMessage` so
 * the clinic can tell a hero tap from a slipped-disc page tap before anyone replies.
 */
export function WhatsAppButton({
  message,
  children,
  attention = false,
}: {
  message: string
  // No default: every call site passes localized text, and a default here would silently
  // ship English if a future call site on a zh/ms page ever forgot to pass one — see the
  // multilingual memory for the KeyTakeaways incident this mirrors.
  children: ReactNode
  /**
   * Adds the periodic pulse-and-wobble (see `.cta-attention` in globals.css).
   *
   * OPT IN, AND ONE PER PAGE. Off by default because this button appears in the header, the
   * CTA band and mid-page on nearly every route, and animating all of them at once would
   * turn the site into a carnival and make the motion mean nothing. Give it to the single
   * highest-intent CTA on a page, which on the service pages is the hero.
   */
  attention?: boolean
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener"
      className={`${BUTTON_BASE} bg-brand-gold text-ink hover:bg-[#d4b00d] ${
        attention ? 'cta-attention' : ''
      }`}
    >
      <WhatsAppIcon />
      {children}
    </a>
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

/**
 * Inner-page hero. The homepage builds its own (it carries the photo and the booking
 * CTAs); every other route uses this so the slate field, the eyebrow and the h1 sit in
 * the same place sitewide. `eyebrow` is the section the page belongs to, not a tagline —
 * it tells a visitor arriving from search where they've landed.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro?: string
  children?: ReactNode
}) {
  return (
    <section className="bg-brand-slate-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}

/**
 * The gold conversion band. Repeated at the foot of every content page — booking is the
 * only thing any of these pages is ultimately for.
 */
export function CtaBand({
  dict,
  heading,
  body,
  message,
}: {
  dict: Dictionary
  heading?: string
  body?: string
  // No default: a `waMessage.general` default here can't know the page's locale, and every
  // call site already has `locale` in scope to build one explicitly — see the multilingual
  // memory for the incident this mirrors (the WhatsApp message was English on every locale
  // for the whole session because of exactly this kind of unlocalized default).
  /** Prefilled WhatsApp text. Pass a `waMessage.*` builder so the band knows its page. */
  message: string
}) {
  return (
    <section className="bg-brand-gold">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between lg:py-14">
        <div>
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            {heading ?? dict.page.readyToStopWorkingAroundThePain}
          </h2>
          {/* /70 on gold computes to ~4.5:1 — right on the AA line. /80 clears it at ~5.9:1. */}
          <p className="mt-2 max-w-xl text-ink/80">{body ?? dict.page.ctaBandDefaultBody}</p>
        </div>
        <div className="flex-none">
          {/* Ink rather than gold: this button sits ON the gold band, so a gold fill would
              disappear. One action only — the call button that used to sit beside it asked
              the same question a second way. */}
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-slate-deep"
          >
            <WhatsAppIcon />
            {dict.page.whatsappUsShort}
          </a>
        </div>
      </div>
    </section>
  )
}

/** Standard content well. Keeps measure readable — long clinical prose at full width isn't. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-ink-muted [&_strong]:text-ink">
      {children}
    </div>
  )
}

/**
 * A practitioner's professional registration numbers — the ACM number and the MOH
 * Traditional & Complementary Medicine practitioner number.
 *
 * On a YMYL medical page these are the hardest trust signal available: unlike a bio, a
 * reader can take the number to the public register and check it. So they get a labelled
 * `<dl>` rather than a run-on line of codes — an unlabelled "CP-PPB2024/10096" is not
 * verifiable by anyone who doesn't already know what it is.
 *
 * Pass the practitioner through `publishedRegistrations()`; it returns nothing for anyone
 * whose numbers the clinic hasn't confirmed. See lib/clinic.ts.
 *
 * `variant="card"` uses the short body names to fit a team card; `"panel"` spells the
 * registering bodies out in full on the profile page.
 */
export function RegistrationList({
  items,
  variant = 'card',
  className = '',
}: {
  items: readonly { label: string; short: string; value: string }[]
  variant?: 'card' | 'panel'
  /** Spacing from whatever sits above. Passed in so an empty list contributes no margin. */
  className?: string
}) {
  if (items.length === 0) return null

  const card = variant === 'card'
  return (
    <dl className={`${card ? 'space-y-1' : 'space-y-4'} ${className}`}>
      {items.map((r) => (
        <div key={r.value} className={card ? 'flex flex-wrap gap-x-1.5 text-xs leading-relaxed' : ''}>
          <dt className={card ? 'text-ink-muted' : 'text-sm leading-snug text-ink-muted'}>
            {card ? r.short : r.label}
          </dt>
          <dd className={card ? 'font-semibold text-ink-muted' : 'mt-1 font-semibold text-ink'}>
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
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
