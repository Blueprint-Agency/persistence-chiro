'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LOCALES, LOCALE_LABEL, type Locale, pathFor } from '@/lib/i18n'
import type { LocalizedPaths } from '@/lib/locale-availability'

/**
 * Strips the locale segment off whatever `usePathname` returns, giving the unprefixed
 * path every other helper in this codebase reasons about.
 *
 * English pages are prerendered at their internal `/en/...` path but reached through
 * `proxy.ts`'s rewrite at the unprefixed URL, so on those pages the server sees
 * `/en/conditions/back-pain` and the browser sees `/conditions/back-pain`. Normalising
 * both to the same string is what keeps the rendered links byte-identical on either side,
 * which is the whole hydration-mismatch mitigation — nothing here needs a post-mount
 * `useEffect` swap.
 */
const LOCALE_PREFIX = new RegExp(`^/(${LOCALES.join('|')})(?=/|$)`)
const unprefixed = (pathname: string) => pathname.replace(LOCALE_PREFIX, '') || '/'

/**
 * Links to the *same page* in each other locale when that page exists there, and to that
 * locale's homepage when it does not (a zh/ms page still in `draft`, the English-only blog).
 *
 * A client component on purpose. The alternative that keeps this a server component is
 * reading the request URL via `next/headers` from the layout that hosts the Header, and
 * calling any Dynamic API there opts the ENTIRE site out of static generation (AGENTS.md:
 * "Static render by default" — it happened once and was reverted). `usePathname` costs a
 * few hundred bytes of client JS, and `MobileNavClose` already pays for the hook.
 *
 * `paths` comes from `localizedPaths()` in `lib/locale-availability.ts`, computed by the
 * server-rendered Header and passed down, so the content data files never enter the
 * browser bundle and the switcher can never point at a locale that would 404 — it is the
 * same `pathExistsIn` check `generateMetadata` uses for hreflang.
 */
/**
 * `dark` sits in the slate utility bar (md and up). `light` sits in the mobile menu drawer,
 * because the utility bar is hidden below md and phones would otherwise have no switcher.
 * The light variant uses 44px pill targets since it is tapped, not clicked. `stack` is the
 * dropdown behind the globe pill in the phone header.
 */
const TONE = {
  dark: {
    list: 'items-center gap-3 text-xs',
    current: 'text-white',
    link: 'text-white/60 hover:text-white',
  },
  light: {
    list: 'items-center gap-2 text-sm',
    current:
      'flex h-11 min-w-11 items-center justify-center rounded-full bg-brand-slate px-4 text-white',
    link: 'flex h-11 min-w-11 items-center justify-center rounded-full border border-line px-4 text-ink hover:border-brand-slate hover:text-brand-slate',
  },
  // The dropdown under the globe pill in the phone header: one full-width row per language.
  stack: {
    list: 'flex-col items-stretch gap-1 text-sm',
    current: 'flex h-11 items-center rounded-lg bg-brand-aqua px-3 text-brand-slate',
    link: 'flex h-11 items-center rounded-lg px-3 text-ink hover:bg-brand-aqua hover:text-brand-slate',
  },
} as const

export function LocaleSwitcher({
  locale,
  paths,
  tone = 'dark',
  label,
}: {
  locale: Locale
  paths: LocalizedPaths
  tone?: keyof typeof TONE
  label?: string
}) {
  const path = unprefixed(usePathname())
  const style = TONE[tone]

  const targetFor = (l: Locale) => {
    if (l === 'en') return pathFor(l, path)
    return paths[l].includes(path) ? pathFor(l, path) : pathFor(l, '/')
  }

  return (
    <ul
      aria-label={label}
      className={`flex shrink-0 whitespace-nowrap font-medium ${style.list}`}
    >
      {LOCALES.filter((l) => l === locale || l === 'en' || paths[l].includes('/')).map((l) => (
        <li key={l}>
          {l === locale ? (
            <span aria-current="true" className={style.current}>
              {LOCALE_LABEL[l]}
            </span>
          ) : (
            <Link href={targetFor(l)} hrefLang={l} className={style.link}>
              {LOCALE_LABEL[l]}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
