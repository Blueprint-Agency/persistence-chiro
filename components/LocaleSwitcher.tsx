'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LOCALES, type Locale, pathFor } from '@/lib/i18n'
import type { LocalizedPaths } from '@/lib/locale-availability'

const LOCALE_LABEL: Record<Locale, string> = { en: 'EN', zh: '中文', ms: 'BM' }

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
export function LocaleSwitcher({ locale, paths }: { locale: Locale; paths: LocalizedPaths }) {
  const path = unprefixed(usePathname())

  const targetFor = (l: Locale) => {
    if (l === 'en') return pathFor(l, path)
    return paths[l].includes(path) ? pathFor(l, path) : pathFor(l, '/')
  }

  return (
    <ul className="flex shrink-0 items-center gap-3 whitespace-nowrap text-xs font-medium">
      {LOCALES.filter((l) => l === locale || l === 'en' || paths[l].includes('/')).map((l) => (
        <li key={l}>
          {l === locale ? (
            <span aria-current="true" className="text-white">
              {LOCALE_LABEL[l]}
            </span>
          ) : (
            <Link href={targetFor(l)} hrefLang={l} className="text-white/60 hover:text-white">
              {LOCALE_LABEL[l]}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
