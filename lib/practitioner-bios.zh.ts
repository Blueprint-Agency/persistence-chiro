/**
 * Chinese practitioner bios, keyed by the same `slug` used in `lib/clinic.ts`'s
 * `practitioners` roster. Empty until real, reviewed copy exists — `bioFor('zh', slug)`
 * in `lib/clinic.ts` returns `undefined` for a missing entry, which is what keeps
 * `/zh/about/<slug>` out of `generateStaticParams` rather than shipping a thin page.
 */
export const practitionerBiosZh: Record<string, readonly string[]> = {}
