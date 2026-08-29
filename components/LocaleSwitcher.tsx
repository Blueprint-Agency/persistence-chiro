import Link from 'next/link'

import { LOCALES, type Locale, pathFor } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'

const LOCALE_LABEL: Record<Locale, string> = { en: 'EN', zh: '中文', ms: 'BM' }

/**
 * Links to each locale's homepage — deliberately NOT the exact equivalent of the current
 * page. Knowing the current page's own unprefixed path here would need either a client
 * component (a real, if small, JS cost sitewide) or reading the incoming request via
 * `next/headers` in the server-rendered layout that hosts this — and calling any Dynamic
 * API there opts the ENTIRE site out of static generation, which is exactly the tradeoff
 * this rebuild exists to avoid (see AGENTS.md: "Static render by default"). A same-page
 * switch can be revisited per-page once real zh/ms content exists and each page can pass
 * its own known path down explicitly.
 *
 * Only ever links to a locale whose homepage actually exists (`pathExistsIn`) — the same
 * check `generateMetadata` uses for `alternates.languages`, so the switcher and hreflang
 * can never disagree about what's live.
 */
export function LocaleSwitcher({ locale }: { locale: Locale }) {
  return (
    <ul className="flex shrink-0 items-center gap-3 whitespace-nowrap text-xs font-medium">
      {LOCALES.filter((l) => l === locale || pathExistsIn(l, '/')).map((l) => (
        <li key={l}>
          {l === locale ? (
            <span aria-current="true" className="text-white">
              {LOCALE_LABEL[l]}
            </span>
          ) : (
            <Link href={pathFor(l, '/')} hrefLang={l} className="text-white/60 hover:text-white">
              {LOCALE_LABEL[l]}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
