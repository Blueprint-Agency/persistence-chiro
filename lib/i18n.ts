/**
 * Single source of truth for the site's locales.
 *
 * English stays unprefixed (`/conditions/back-pain`) to preserve every ranking and
 * backlink the English URLs already hold — `proxy.ts` rewrites unprefixed requests to
 * `/en/...` internally. Chinese and Malay are real path prefixes (`/zh/...`, `/ms/...`).
 *
 * Everything that needs the locale list, a BCP-47 tag, or an OpenGraph locale string
 * imports from here rather than re-declaring it — the same discipline this codebase
 * already applies to `SITE_URL` and NAP.
 */

export const LOCALES = ['en', 'zh', 'ms'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value)

/** BCP-47, for `<html lang>`, JSON-LD `inLanguage`, and `Intl`/`toLocaleDateString`. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: 'en-MY',
  zh: 'zh-MY',
  ms: 'ms-MY',
}

/** Underscore form Open Graph expects (`og:locale`). */
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_MY',
  zh: 'zh_MY',
  ms: 'ms_MY',
}

/** Root-relative path prefix. Empty for English — it is the unprefixed default. */
export const localePrefix = (locale: Locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`)

/**
 * Builds a root-relative, locale-prefixed path from an unprefixed one (`/conditions/x`).
 *
 * `path: '/'` is special-cased: naive concatenation gives `/zh` + `/` = `/zh/`, a trailing
 * slash no other route ever has to worry about, and the site's actual homepage URL is `/zh`
 * with none — Next.js 308-redirects the slash variant to the canonical one. FOUND BY A
 * FINAL PRE-PREVIEW AUDIT, 2026-08-29: `components/Header.tsx`'s logo link used
 * `pathFor(locale, '/')` and was sending every zh/ms page's logo click through an
 * unnecessary redirect hop. Fixed at the source rather than in each call site, since any
 * future caller passing `'/'` here would hit the identical bug.
 */
export const pathFor = (locale: Locale, path: string) =>
  path === '/' ? localePrefix(locale) || '/' : `${localePrefix(locale)}${path}`

/**
 * Pulls the short, no-locality form out of a `Condition`/`Service` `title` for reuse in
 * template sentences ("Reasons people come in for {name}"), matching the convention each
 * locale's data file writes titles in:
 *
 * - `en`: "X in Cheras, Kuala Lumpur" — title-locality, split on " in ".
 * - `ms`: "X di Cheras, Kuala Lumpur" — same shape, split on " di ".
 * - `zh`: "Cheras, Kuala Lumpur X" — LOCALITY FIRST, since that reads naturally in Chinese;
 *   the prefix is stripped instead of split.
 *
 * Never reuse the English `.split(' in ')[0]` pattern directly on a zh/ms title — that was
 * a real bug (a Chinese title has no " in " substring, so the whole locality+name string
 * leaked into "What {name} involves here" verbatim, producing a mixed-language heading).
 */
export function shortTitle(locale: Locale, title: string): string {
  if (locale === 'ms') return title.split(' di ')[0]
  if (locale === 'zh') return title.replace(/^Cheras,?\s*(Maluri,?\s*)?(Kuala Lumpur,?\s*)?/i, '').trim() || title
  return title.split(' in ')[0]
}
