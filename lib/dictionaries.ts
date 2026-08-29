import 'server-only'
import type { Locale } from './i18n'
import type { Dictionary } from '../dictionaries/types'

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('../dictionaries/en').then((m) => m.default),
  zh: () => import('../dictionaries/zh').then((m) => m.default),
  ms: () => import('../dictionaries/ms').then((m) => m.default),
}

/** Sitewide UI-chrome strings for a locale. Page/content copy lives in lib/*.ts instead. */
export const getDictionary = (locale: Locale) => dictionaries[locale]()
