/**
 * Content integrity checks. Run: `npm test`
 *
 * These guard the two things that would quietly undo the SEO rebuild:
 *   1. two pages targeting the same keyword (cannibalisation — the whole reason the
 *      architecture splits conditions from services)
 *   2. an internal link pointing at a slug that doesn't exist
 *
 * Node 23 strips TS types natively, so no build step is needed to run this.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'

import { conditions, conditionsFor } from './conditions.ts'
import { services, servicesFor } from './services.ts'
import { posts, publishedPosts } from './posts.ts'
import {
  HELD_POST_SLUGS,
  LEGACY_PAGE_URLS,
  LEGACY_POST_SLUGS,
  redirects,
} from '../redirects.ts'
import { staticRoutes } from './routes.ts'
import { clinicFaqs, homeFaqs, aftercare, aftercareIntro } from './faqs.ts'
import { homeIntro } from './home.ts'
import { gonsteadIntro, gonsteadSteps } from './gonstead.ts'
import { clinic, founderBio, practitioners, publishedRegistrations } from './clinic.ts'
import { LOCALES, type Locale } from './i18n.ts'
import { bundles, bundlesFor } from './pricing.ts'
import { directionsFor, routeIcons } from './directions.ts'

const conditionSlugs = new Set(conditions.map((c) => c.slug))
const serviceSlugs = new Set(services.map((m) => m.slug))

/**
 * Promissory phrasing that must never reach published copy. Hoisted to module scope so the
 * structured-content guard and the new-blog-post guard share one list.
 */
const BANNED_CLAIMS: [RegExp, string][] = [
  [/\bfully safe\b/i, 'absolute safety guarantee'],
  [/\bproven results\b/i, 'efficacy guarantee'],
  [/\bpain[- ]free (life|living)\b/i, 'promises absence of pain'],
  [/\bcompletely heal\b/i, 'promises full resolution'],
  [/\bare painless\b/i, 'absolute claim about sensation'],
  [/\bflush toxins\b/i, 'unsupported physiological claim'],
  [/\bguarantee[ds]?\b/i, 'explicit guarantee'],
  [/\bwill (cure|fix|resolve|eliminate)\b/i, 'promises a cure'],
  [/\bmiracle\b/i, 'overstates efficacy'],
  [/\bensur(e|es|ing) (every patient|efficient|proper|all)\b/i, 'guarantees an outcome'],
]

/**
 * FAQPage schema is emitted on whichever route renders the answers — homeFaqs on `/`,
 * clinicFaqs on /what-to-expect. If the same Q&A appears in both, two routes publish
 * identical FAQPage markup, which is the duplicate-content case Google penalises.
 * Compare answers, not questions: the two arrays already carry near-identical wordings
 * of "what should I wear" that differ only in phrasing.
 */
test('no answer is published on two routes', () => {
  const normalise = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()
  const homeAnswers = new Set(homeFaqs.map((f) => normalise(f.a)))
  const collisions = clinicFaqs.filter((f) => homeAnswers.has(normalise(f.a))).map((f) => f.q)
  assert.deepEqual(collisions, [], `answer duplicated across routes: ${collisions.join(', ')}`)
})

/**
 * The clinic's hard rule: never promise that chiropractic cures, fixes or resolves a
 * condition. Suggesting a visit is fine; guaranteeing an outcome is not.
 *
 * This is a regulatory and trust question, not a style one, so it is enforced rather than
 * remembered — the Wix copy this site was migrated from was full of these claims and they
 * came back in through `faqs.ts` straight into FAQPage structured data, where Google can
 * surface them verbatim.
 *
 * SCOPE: the structured content in `lib/` here; new blog posts are covered by the separate
 * MDX guard below. The 14 migrated legacy posts are the one gap — they still carry claims
 * ("fixing the structure", "heal itself", "miracle workers") and are grandfathered until the
 * blog-rewrite work lands, so the MDX guard skips legacy slugs.
 */
test('no promissory medical claims in published copy', () => {
  const banned = BANNED_CLAIMS

  const sources: [string, string][] = [
    ...conditions.flatMap((c) => [
      [`conditions/${c.slug}`, [c.title, c.metaDescription, c.intro, c.approach].join(' ')] as [
        string,
        string,
      ],
      ...c.faqs.map((f) => [`conditions/${c.slug} faq`, `${f.q} ${f.a}`] as [string, string]),
    ]),
    ...services.map(
      (m) =>
        [
          `services/${m.slug}`,
          [
            m.metaDescription,
            ...(m.sections ?? []).map((s) => s.body),
            // These user-facing fields carry prose too, so they must clear the same guard.
            // `outcomes` is a union: a bare string, or an object carrying the copy on `.text`
            // alongside an image or illustration. Spreading it raw stringified the object
            // forms to "[object Object]", so four of the five dry needling outcomes were
            // silently exempt from the guard. Normalise to the text before joining.
            ...(m.outcomes ?? []).map((o) => (typeof o === 'string' ? o : o.text)),
            ...(m.citations ?? []).map((c) => c.claim),
            ...m.faqs.flatMap((f) => [f.q, f.a]),
            ...(m.comparison
              ? [
                  m.comparison.heading,
                  m.comparison.intro,
                  m.comparison.note,
                  ...m.comparison.rows.flatMap((r) => [r.label, r.a, r.b]),
                ]
              : []),
            // The fit check is rendered prose like any other and has to clear the same guard.
            // Its left column is the block most likely to reach for "we guarantee we will
            // always..." phrasing, which the banned list catches.
            ...(m.fitCheck
              ? [...m.fitCheck.rightFor, ...m.fitCheck.notRightFor, m.fitCheck.note]
              : []),
          ].join(' '),
        ] as [string, string],
    ),
    // Posts' structured Q&A/citations (post.keyTakeaways / post.faqs / post.citations) live
    // in this file, not in the MDX body, so the separate "new blog posts carry no
    // promissory claims" test below — which only reads the raw .mdx file text — never sees
    // them. Scanning them here is what actually closes that gap.
    ...posts.flatMap((p) => [
      [`posts/${p.slug}`, [p.title, p.description].join(' ')] as [string, string],
      ...(p.keyTakeaways ?? []).map((t) => [`posts/${p.slug} keyTakeaway`, `${t.q} ${t.a}`] as [string, string]),
      ...(p.faqs ?? []).map((f) => [`posts/${p.slug} faq`, `${f.q} ${f.a}`] as [string, string]),
      ...(p.citations ?? []).map((c) => [`posts/${p.slug} citation`, c.claim] as [string, string]),
    ]),
    ...clinicFaqs.map((f) => [`clinicFaqs`, `${f.q} ${f.a}`] as [string, string]),
    ...homeFaqs.map((f) => [`homeFaqs`, `${f.q} ${f.a}`] as [string, string]),
    ['homeIntro', [homeIntro.heading, ...homeIntro.body].join(' ')],
    ['gonsteadIntro', gonsteadIntro],
    ...gonsteadSteps.map((s) => [`gonstead/${s.name}`, s.body] as [string, string]),
    ['founderBio', founderBio.join(' ')],
    ['aftercare', [aftercareIntro, ...aftercare.map((c) => c.body)].join(' ')],
  ]

  const hits: string[] = []
  for (const [where, text] of sources) {
    for (const [re, why] of banned) {
      const m = text.match(re)
      if (m) hits.push(`${where}: "${m[0]}" — ${why}`)
    }
  }
  assert.deepEqual(hits, [], `promissory claim(s):\n  ${hits.join('\n  ')}`)
})

/**
 * Same rule, applied to NEW blog posts (any published post whose slug is not a legacy Wix
 * slug). New posts come from the persistence-content-builder skill and must be clean from the
 * start. Legacy MDX is skipped: it predates the rule and is fixed by the separate rewrite.
 * Also flags em/en dashes, which the house style forbids in rendered copy.
 */
test('new blog posts carry no promissory claims or stray dashes', async () => {
  const { readFileSync } = await import('node:fs')
  const legacy = new Set<string>(LEGACY_POST_SLUGS)
  const hits: string[] = []
  for (const p of publishedPosts()) {
    if (legacy.has(p.slug)) continue
    const text = readFileSync(new URL(`../content/blog/${p.slug}.mdx`, import.meta.url), 'utf8')
    for (const [re, why] of BANNED_CLAIMS) {
      const m = text.match(re)
      if (m) hits.push(`blog/${p.slug}: "${m[0]}" — ${why}`)
    }
    if (/[—–]/.test(text)) hits.push(`blog/${p.slug}: contains an em/en dash`)
  }
  assert.deepEqual(hits, [], `new-post issue(s):\n  ${hits.join('\n  ')}`)
})

/**
 * `faqs[].links` names a phrase to wrap in a link. The renderer skips a phrase it cannot
 * find rather than throwing, so the page still builds and the visitor still reads the
 * paragraph — which means nothing at runtime would ever tell anyone the link had vanished.
 * This is what tells them.
 *
 * Exactly once, not at least once: two occurrences and the link lands on whichever one comes
 * first, which is a coin toss rather than an editorial decision.
 */
test('every in-prose link phrase occurs exactly once in its body', () => {
  const hits: string[] = []
  for (const locale of LOCALES) {
    for (const s of servicesFor(locale)) {
      for (const faq of s.faqs) {
        for (const link of faq.links ?? []) {
          const count = faq.a.split(link.phrase).length - 1
          if (count !== 1) {
            hits.push(`[${locale}] services/${s.slug} "${faq.q}": phrase "${link.phrase}" occurs ${count}x`)
          }
        }
      }
    }
  }
  assert.deepEqual(hits, [], `in-prose link problem(s):\n  ${hits.join('\n  ')}`)
})

/**
 * Every in-prose link target has to be a route the site actually publishes, for the same
 * reason the redirect table is tested: an internal link into a 404 wastes the crawl and
 * strands the reader.
 */
test('every in-prose link points at a published route', () => {
  // The set a HREF STRING could ever validly name — English is the comprehensive source
  // of truth for which slugs exist at all (see AGENTS.md § Multilingual), so this checks
  // "is this a real route in some locale", not "does it exist in the CURRENT locale yet".
  // The latter is a runtime concern the page templates already handle gracefully
  // (`pathExistsIn` hides a link to a slug this locale hasn't published yet, rather than
  // 404ing) — this test exists to catch a typo'd/nonexistent slug, not a mid-rollout gap.
  const published = new Set<string>([
    ...staticRoutes,
    ...conditions.map((c) => `/conditions/${c.slug}`),
    ...services.map((m) => `/services/${m.slug}`),
  ])
  const hits: string[] = []
  for (const locale of LOCALES) {
    for (const s of servicesFor(locale)) {
      for (const faq of s.faqs) {
        for (const link of faq.links ?? []) {
          if (!published.has(link.href)) {
            hits.push(`[${locale}] services/${s.slug} "${faq.q}" -> ${link.href}`)
          }
        }
        if ((faq.links ?? []).some((l) => l.href === `/services/${s.slug}`)) {
          hits.push(`[${locale}] services/${s.slug} "${faq.q}" links to itself`)
        }
      }
      for (const link of s.relatedLinks ?? []) {
        if (!published.has(link.href)) {
          hits.push(`[${locale}] services/${s.slug}.relatedLinks -> ${link.href}`)
        }
        if (link.href === `/services/${s.slug}`) {
          hits.push(`[${locale}] services/${s.slug}.relatedLinks links to itself`)
        }
      }
    }
  }
  assert.deepEqual(hits, [], `broken internal link(s):\n  ${hits.join('\n  ')}`)
})

/**
 * The fit check exists to be honest about a mismatch, not to tell a reader off, so the
 * closing note is required by the type and has to be substantial rather than a token
 * sentence — same contract `practitionersWithheld` has with its reason string.
 *
 * The columns must BALANCE. They render side by side and are written to be read across, so
 * a page with five ticks against two crosses stops being an honest fit check and becomes a
 * sales pitch with a disclaimer stapled to it, which is the shape this block exists to avoid.
 */
test('every fit check is balanced and closes on a substantial note', () => {
  for (const locale of LOCALES) {
    for (const s of servicesFor(locale)) {
      if (!s.fitCheck) continue
      const { rightFor, notRightFor, note } = s.fitCheck
      assert.ok(
        notRightFor.length >= 3,
        `[${locale}] services/${s.slug}.fitCheck has fewer than 3 crosses; a one-line refusal reads as a caveat`,
      )
      assert.equal(
        rightFor.length,
        notRightFor.length,
        `[${locale}] services/${s.slug}.fitCheck columns are uneven (${rightFor.length} ticks vs ${notRightFor.length} crosses); they render side by side and are meant to be read across`,
      )
      // Chinese conveys far more per character than an alphabetic script, so the same
      // 120-character bar would be unreasonably long there — see AGENTS.md § Multilingual.
      const minLength = locale === 'zh' ? 45 : 120
      assert.ok(
        note.length > minLength,
        `[${locale}] services/${s.slug}.fitCheck.note is too short to say what to do instead`,
      )
    }
  }
})

/**
 * Both fit-check columns describe EXPECTATIONS OF THE CLINIC, which is what keeps the block
 * distinct from `outcomes` (why people come in) and `qualifierConcerns` (what hurts). If a
 * line is copied from either, one route publishes the same sentence three times.
 */
test('no fit-check line is duplicated from outcomes or the qualifier', () => {
  // `\p{L}`/`\p{N}` (Unicode letter/number), NOT `a-z` — a Latin-only strip reduces every
  // Chinese string to "", which would make every zh line look like a duplicate of every
  // other zh line instead of only genuine repeats.
  const norm = (t: string) =>
    t.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, '').replace(/\s+/g, ' ').trim()
  const hits: string[] = []
  for (const locale of LOCALES) {
    for (const s of servicesFor(locale)) {
      if (!s.fitCheck) continue
      const elsewhere = new Set([
        ...(s.outcomes ?? []).map((o) => norm(typeof o === 'string' ? o : o.text)),
        ...(s.qualifierConcerns ?? []).map((c) => norm(typeof c === 'string' ? c : c.label)),
      ])
      for (const line of [...s.fitCheck.rightFor, ...s.fitCheck.notRightFor]) {
        if (elsewhere.has(norm(line))) hits.push(`[${locale}] services/${s.slug}: "${line}"`)
      }
    }
  }
  assert.deepEqual(hits, [], `fit-check line(s) duplicated elsewhere on the page: ${hits.join('; ')}`)
})

/**
 * `pageFaqSchema` publishes BOTH rendered Q&A blocks on a route inside one FAQPage: the short
 * answers (`keyTakeaways`) and the FAQ proper (`faqs`). That is only legitimate while the two
 * say different things. If a takeaway drifts into repeating an FAQ, one page ships the same
 * question or the same answer twice inside a single FAQPage, which is the duplication the
 * split exists to avoid.
 *
 * Questions AND answers, because either alone can collide: two wordings of "is it safe" with
 * one answer is as duplicated as the same question asked twice.
 */
test('no key takeaway repeats an FAQ on the same page', () => {
  // `\p{L}`/`\p{N}`, not `a-z0-9` — see the matching note on the fit-check test above.
  const norm = (t: string) =>
    t.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, '').replace(/\s+/g, ' ').trim()
  const hits: string[] = []
  // Conditions and posts. The service pages carried `keyTakeaways` until 2026-08-23; with it
  // deleted there, `faqs` is the single Q&A array on a service and nothing can collide.
  // Posts stay English-only (blog is out of multilingual scope); conditions loop every
  // locale that has any.
  const pages: [string, { q: string; a: string }[] | undefined, readonly { q: string; a: string }[]][] =
    [
      ...LOCALES.flatMap((locale) =>
        conditionsFor(locale).map(
          (c) =>
            [`[${locale}] conditions/${c.slug}`, c.keyTakeaways, c.faqs] as [
              string,
              { q: string; a: string }[] | undefined,
              readonly { q: string; a: string }[],
            ],
        ),
      ),
      ...posts.map((p) => [`posts/${p.slug}`, p.keyTakeaways, p.faqs ?? []] as [string, { q: string; a: string }[] | undefined, readonly { q: string; a: string }[]]),
    ]
  for (const [where, takeaways, faqs] of pages) {
    if (!takeaways) continue
    const faqQ = new Set(faqs.map((f) => norm(f.q)))
    const faqA = new Set(faqs.map((f) => norm(f.a)))
    for (const t of takeaways) {
      if (faqQ.has(norm(t.q))) hits.push(`${where}: question "${t.q}" is also an FAQ`)
      if (faqA.has(norm(t.a))) hits.push(`${where}: answer to "${t.q}" is also an FAQ answer`)
    }
  }
  assert.deepEqual(hits, [], `duplicate Q&A inside one FAQPage: ${hits.join('; ')}`)
})

/**
 * Recursively collects every string leaf value out of an arbitrarily nested object/array.
 * Used by the zh/ms banned-word sweep below so it does not depend on a hand-maintained list
 * of field names — a real "merawat" violation once shipped inside a `midImage.alt` that no
 * field list had ever been told to check (see the multilingual memory for the incident).
 * Non-prose values (slugs, URLs, image paths, icon names) are always plain ASCII/English, so
 * scanning them too costs nothing and cannot produce a false positive for a 治疗/rawat check.
 *
 * `targetKeyword` is skipped deliberately: per AGENTS.md § Multilingual it is the one field
 * allowed to carry the banned word ("the clinic still ranks for 'back pain treatment kl', it
 * just doesn't say it in rendered copy"), so scanning it would wrongly flag a legitimate,
 * never-rendered keyword.
 */
function collectStrings(value: unknown, out: string[] = [], key?: string): string[] {
  if (key === 'targetKeyword') return out
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) for (const v of value) collectStrings(v, out)
  else if (value && typeof value === 'object')
    for (const [k, v] of Object.entries(value)) collectStrings(v, out, k)
  return out
}

/**
 * The zh/ms equivalent of "no promissory medical claims", per AGENTS.md § Multilingual —
 * 治疗/治療 describing what the clinic does to a patient (as a verb, or as a generic noun
 * for "the care given"), and Malay "rawatan"/"merawat"/"dirawat"/etc., are banned the same
 * way English "treat/treatment" is.
 *
 * ⚠️ THE DISCLAIMER CARVE-OUT IS NOT IMPLEMENTED HERE. AGENTS.md § Non-negotiables allows the
 * banned word in a line that says what chiropractic does NOT do, because "does not help with
 * migraine" is vaguer and less protective than "does not treat migraine". That carve-out is
 * honoured in English by human judgement; this sweep has no way to tell a disclaimer from a
 * claim, so in zh/ms it bans the word outright. The zh and ms migraine pages, whose whole job
 * is that refusal, were therefore written around it (疗法 and "pengurusan perubatan" rather
 * than 治疗 and "rawatan"), which reads fine and cost nothing. Prefer rewording to widening
 * this list: AGENTS.md says the zh/ms lists are a draft pending client review, so extending
 * them is a question for the client rather than a decision for whoever is mid-task.
 *
 * A short, curated list of compounds is the approved exception — each one names a
 * profession or technique (物理治疗 = physiotherapy, 徒手治疗 = manual therapy, 治疗师 =
 * therapist), the same way English "physiotherapist" is allowed despite containing no
 * banned word by coincidence. Add to this list only for a genuine discipline/technique/
 * job-title name, never to wave through a new way of saying "we treat you".
 */
test('no verb-form banned word in zh/ms published copy', () => {
  const APPROVED_ZH_COMPOUNDS = ['物理治疗', '物理治療', '徒手治疗', '徒手治療', '治疗师', '治療師']
  const stripApprovedZhCompounds = (t: string) =>
    APPROVED_ZH_COMPOUNDS.reduce((acc, phrase) => acc.replaceAll(phrase, ''), t)
  const hits: string[] = []

  const zhSources: [string, string][] = []
  const msSources: [string, string][] = []
  for (const locale of LOCALES) {
    if (locale === 'en') continue
    const bucket = locale === 'zh' ? zhSources : msSources
    for (const c of conditionsFor(locale)) {
      bucket.push([`conditions/${c.slug}`, collectStrings(c).join(' ')])
    }
    for (const s of servicesFor(locale)) {
      bucket.push([`services/${s.slug}`, collectStrings(s).join(' ')])
    }
    // Bundle copy is published prose like any other and was not covered until pricing
    // shipped (2026-09-03). A price card is exactly where "rawatan" would slip back in.
    for (const b of bundlesFor(locale)) {
      bucket.push([`pricing/${b.slug}`, collectStrings(b).join(' ')])
    }
    // The Locate Us walkthroughs on /book-now (2026-09-05). Directions copy looks harmless,
    // but one of the three routes is the walk to the hospital's radiology counter, and
    // "rawatan pengimejan" / 影像治疗 is precisely how that step wants to be written. The
    // sweep reaches the `alt` strings too, which is where the last real violation hid.
    for (const r of directionsFor(locale)) {
      bucket.push([`directions/${r.slug}`, collectStrings(r).join(' ')])
    }
  }

  for (const [where, text] of zhSources) {
    if (/治疗|治療/.test(stripApprovedZhCompounds(text))) {
      hits.push(`zh ${where}: contains 治疗/治療 as more than the "物理治疗" compound`)
    }
  }
  for (const [where, text] of msSources) {
    if (/\brawat\w*/i.test(text)) {
      hits.push(`ms ${where}: contains a "rawat" root (rawatan/merawat/dirawat/...)`)
    }
  }
  assert.deepEqual(hits, [], `banned word(s):\n  ${hits.join('\n  ')}`)
})

/**
 * A zh/ms slug with no English counterpart is almost always a typo, not a deliberate
 * locale-only page — the content model assumes English is the comprehensive source of
 * truth for which slugs exist at all (see AGENTS.md § Multilingual). Catching it here is
 * cheaper than discovering it as an orphaned page nothing links to.
 */
test('every non-draft zh/ms slug has an English counterpart', () => {
  const enConditionSlugs = new Set(conditions.map((c) => c.slug))
  const enServiceSlugs = new Set(services.map((s) => s.slug))
  const hits: string[] = []
  for (const locale of LOCALES) {
    if (locale === 'en') continue
    for (const c of conditionsFor(locale)) {
      if (!c.draft && !enConditionSlugs.has(c.slug)) {
        hits.push(`conditions.${locale}: "${c.slug}" has no English counterpart`)
      }
    }
    for (const s of servicesFor(locale)) {
      if (!s.draft && !enServiceSlugs.has(s.slug)) {
        hits.push(`services.${locale}: "${s.slug}" has no English counterpart`)
      }
    }
  }
  assert.deepEqual(hits, [], hits.join('\n  '))
})

test('no two pages target the same keyword', () => {
  // Per locale, not pooled across locales — the English and Malay records for the same
  // slug legitimately target different keywords (that is the whole point of localising
  // rather than translating; see AGENTS.md § Multilingual), so cross-locale differences
  // are not the collision this test exists to catch.
  const hits: string[] = []
  for (const locale of LOCALES) {
    const targets = [...conditionsFor(locale), ...servicesFor(locale)].map((p) =>
      p.targetKeyword.toLowerCase(),
    )
    const dupes = targets.filter((t, i) => targets.indexOf(t) !== i)
    if (dupes.length) hits.push(`[${locale}] ${dupes.join(', ')}`)
  }
  assert.deepEqual(hits, [], `duplicate targetKeyword: ${hits.join('; ')}`)
})

test('slugs are unique within each collection', () => {
  assert.equal(conditionSlugs.size, conditions.length, 'duplicate condition slug')
  assert.equal(serviceSlugs.size, services.length, 'duplicate service slug')
})

test('condition cross-links resolve', () => {
  for (const c of conditions) {
    for (const slug of c.related) {
      assert.ok(conditionSlugs.has(slug), `${c.slug}.related -> missing condition "${slug}"`)
      assert.notEqual(slug, c.slug, `${c.slug}.related links to itself`)
    }
    for (const slug of c.helpedBy) {
      assert.ok(serviceSlugs.has(slug), `${c.slug}.helpedBy -> missing service "${slug}"`)
    }
  }
})

test('service cross-links resolve', () => {
  for (const s of services) {
    for (const slug of s.helpsWith) {
      assert.ok(conditionSlugs.has(slug), `${s.slug}.treats -> missing condition "${slug}"`)
    }
  }
})

test('every legacy blog post is covered by a redirect', () => {
  const postRule = redirects.find((r) => r.source === '/post/:slug')
  assert.ok(postRule, 'no /post/:slug redirect rule')
  assert.equal(postRule.destination, '/blog/:slug')
  assert.equal(postRule.statusCode, 301, 'post redirect must be a permanent 301, not temporary')
  // The wildcard only works because slugs are preserved byte-identical. If a slug is ever
  // renamed it needs its own explicit rule, so assert the list is non-empty and clean.
  assert.ok(LEGACY_POST_SLUGS.length === 14, 'expected 14 legacy posts')
  for (const s of LEGACY_POST_SLUGS) {
    assert.match(s, /^[a-z0-9-]+$/, `legacy slug "${s}" has characters the wildcard won't pass through`)
  }
})

/**
 * DEPLOY GATE, and the one this file was missing.
 *
 * Every other redirect test here checks redirect SHAPE — that each rule is a literal 301,
 * that its destination is a real route, that draft posts precede the wildcard. None of them
 * checked COVERAGE: that every URL Wix actually serves has a rule at all. The blog side was
 * safe by construction (one wildcard covers every /post/ slug); the page side was a
 * hand-maintained list, and /about-us and /contact-us sat missing from it until an audit on
 * 2026-08-10 reconciled the two by hand.
 *
 * A legacy page URL is covered when EITHER a redirect claims it, OR the rebuild publishes
 * the same path. Both are fine; a URL matching neither 404s on cutover and throws away that
 * page's crawl history.
 */
test('every legacy page URL is either redirected or still published', () => {
  const redirected = new Set(redirects.map((r) => r.source))
  const published = new Set(staticRoutes)

  const orphaned = LEGACY_PAGE_URLS.filter(
    (url) => !redirected.has(url) && !published.has(url),
  )

  assert.deepEqual(
    orphaned,
    [],
    `legacy Wix URL(s) would 404 on launch — add a redirect in redirects.ts:\n  ${orphaned.join('\n  ')}`,
  )
})

/**
 * The mirror of the test above. A redirect whose source the rebuild ALSO publishes as a
 * route can never fire — Next matches redirects before routes, so the rule would silently
 * shadow a live page. /book-now and /what-to-expect keep their Wix paths deliberately, so
 * this is a real hazard rather than a hypothetical one.
 */
test('no redirect shadows a route the site publishes', () => {
  const published = new Set(staticRoutes)
  for (const r of redirects) {
    assert.ok(
      !published.has(r.source),
      `redirect ${r.source} -> ${r.destination} shadows a live route of the same path`,
    )
  }
})

/**
 * Every rule must be a literal 301. `permanent: true` would emit 308, which Google treats
 * the same but which contradicts the signed-off redirect map and surprises anyone auditing
 * response headers. A 302/307 would pass no equity at all.
 */
test('every redirect is a 301', () => {
  for (const r of redirects) {
    assert.equal(r.statusCode, 301, `${r.source} is not a 301 — got ${JSON.stringify(r.statusCode)}`)
    assert.ok(!('permanent' in r), `${r.source} sets both statusCode and permanent; Next allows only one`)
  }
})

test('every legacy post slug has an index entry', () => {
  const known = new Set(posts.map((p) => p.slug))
  for (const slug of LEGACY_POST_SLUGS) {
    assert.ok(known.has(slug), `legacy post "${slug}" is missing from lib/posts.ts`)
  }
})

test('legacy post slugs stay byte-identical; new posts claim no /post/ redirect', () => {
  const legacy = new Set<string>(LEGACY_POST_SLUGS)
  const postRedirects = new Set(
    redirects.filter((r) => r.source.startsWith('/post/')).map((r) => r.source),
  )
  for (const p of posts) {
    // Legacy Wix posts keep their exact slug (the /post/:slug wildcard passes it through);
    // 'every legacy post slug has an index entry' asserts none were dropped or renamed.
    // New SEO posts are allowed — they had no Wix URL, so there must be NO /post/<slug>
    // redirect pretending they did, which would 301 a crawler into a page that never existed.
    if (legacy.has(p.slug)) continue
    assert.ok(
      !postRedirects.has(`/post/${p.slug}`),
      `new post "${p.slug}" has a /post/ redirect but was never a legacy Wix URL`,
    )
  }
})

/**
 * DEPLOY GATE. The /post/:slug wildcard is live, so every legacy post URL 301s to
 * /blog/<slug>. A draft post has no such page, so it MUST have an explicit redirect
 * ahead of the wildcard — otherwise we 301 a crawler into a 404 and throw away that
 * post's history, which is strictly worse than leaving the old URL alone.
 */
test('every held-back post has an explicit redirect ahead of the wildcard', () => {
  const drafts = posts.filter((p) => p.draft).map((p) => p.slug).sort()
  assert.deepEqual(
    [...HELD_POST_SLUGS].sort(),
    drafts,
    'HELD_POST_SLUGS in redirects.ts is out of sync with draft posts in lib/posts.ts',
  )

  const wildcardIndex = redirects.findIndex((r) => r.source === '/post/:slug')
  for (const slug of drafts) {
    const i = redirects.findIndex((r) => r.source === `/post/${slug}`)
    assert.ok(i !== -1, `draft post "${slug}" has no explicit redirect — would 301 into a 404`)
    assert.ok(i < wildcardIndex, `redirect for "${slug}" must precede the /post/:slug wildcard`)
  }
})

/**
 * Same contract `holdReason` has with `draft`: a suppressed team section must say why it is
 * suppressed, or the next person to read the file assumes it was an oversight and puts the
 * chiropractors back onto a physiotherapy page. That specific mistake is the one this field
 * exists to prevent, so the reason is enforced rather than trusted.
 */
test('a withheld practitioner section states why', () => {
  for (const s of services) {
    if (s.practitionersWithheld === undefined) continue
    assert.ok(
      s.practitionersWithheld.length > 40,
      `services/${s.slug} withholds practitioners with no substantive reason`,
    )
  }
})

test('held-back posts state why they are held', () => {
  for (const p of posts.filter((p) => p.draft)) {
    assert.ok(
      p.holdReason && p.holdReason.length > 20,
      `post "${p.slug}" is draft with no holdReason — it will be forgotten`,
    )
  }
})

test('every published post has a body to render', async () => {
  // Import lazily: post-content.ts pulls in .mdx, which plain Node can't parse.
  // Assert the mapping keys instead, which is what would actually 404 at runtime.
  const { readdirSync } = await import('node:fs')
  const files = new Set(
    readdirSync(new URL('../content/blog', import.meta.url)).map((f) => f.replace(/\.mdx$/, '')),
  )
  for (const p of publishedPosts()) {
    assert.ok(files.has(p.slug), `published post "${p.slug}" has no content/blog/${p.slug}.mdx`)
  }
})

test('published posts link to a page that exists', () => {
  const targets = new Set([
    ...conditions.map((c) => c.slug),
    ...services.map((m) => m.slug),
  ])
  for (const p of publishedPosts()) {
    assert.ok(targets.has(p.linksTo), `post "${p.slug}" links to unknown page "${p.linksTo}"`)
  }
})

/**
 * Publishing a professional registration number against the wrong practitioner is the one
 * error on this site that could be reported to a registering body. Every render path —
 * team cards, profile page, Person schema — goes through `publishedRegistrations`, so this
 * guards the gate itself rather than each caller.
 */
test('unconfirmed registration numbers never publish', () => {
  for (const p of practitioners) {
    if (p.registrationsVerified) continue
    assert.equal(
      publishedRegistrations(p).length,
      0,
      `${p.name} has unverified registrations that would render`,
    )
  }
})

test('no redirect points at a route that does not exist', () => {
  const known = new Set([...staticRoutes, '/blog/:slug'])
  for (const r of redirects) {
    const dest = r.destination.split('#')[0]
    assert.ok(known.has(dest), `redirect ${r.source} -> ${dest}, which is not a known route`)
  }
})


/**
 * `compareAt` is the struck-through "total worth" on a bundle card — a price-reduction claim
 * the clinic is the regulated party behind, not a headline someone chose because it looked
 * like a saving. It must be the sum of the components at the prices they are sold for alone.
 *
 * This test exists because the client's own artwork shipped with "TOTAL WORTH RM650" printed
 * over components adding to RM660. Nobody catches that by reading; everybody catches it on an
 * invoice. The clinic confirmed RM660 on 2026-09-03.
 */
test('a bundle total is the sum of its components', () => {
  const wrong: string[] = []
  for (const locale of LOCALES) {
    for (const b of bundlesFor(locale)) {
      const sum = b.lines.reduce((total, line) => total + line.price, 0)
      if (sum !== b.compareAt) wrong.push(`${locale} ${b.slug}: lines sum to ${sum}, compareAt says ${b.compareAt}`)
      if (b.price > b.compareAt) wrong.push(`${locale} ${b.slug}: price ${b.price} exceeds compareAt ${b.compareAt}`)
    }
  }
  assert.deepEqual(wrong, [], `bundle arithmetic: ${wrong.join('; ')}`)
})

/**
 * Prices are facts. The wording around them is translated; the figures are not, and a bundle
 * that costs RM588 in English and something else in Malay is a different price rather than a
 * translation slip. Same reasoning as the byte-identical NAP rule.
 */
test('bundle prices are identical in every locale', () => {
  const mismatched: string[] = []
  for (const locale of LOCALES) {
    if (locale === 'en') continue
    for (const b of bundlesFor(locale)) {
      const source = bundles.find((e) => e.slug === b.slug)
      if (!source) {
        mismatched.push(`${locale} ${b.slug}: no English record with this slug`)
        continue
      }
      if (b.price !== source.price || b.compareAt !== source.compareAt) {
        mismatched.push(`${locale} ${b.slug}: ${b.price}/${b.compareAt} vs en ${source.price}/${source.compareAt}`)
      }
      const prices = (x: typeof b) => x.lines.map((l) => l.price).join(',')
      if (prices(b) !== prices(source)) {
        mismatched.push(`${locale} ${b.slug}: line prices ${prices(b)} vs en ${prices(source)}`)
      }
    }
  }
  assert.deepEqual(mismatched, [], `bundle price drift: ${mismatched.join('; ')}`)
})

/** Same contract `draft` has with `holdReason` in lib/posts.ts: withheld means say why. */
test('a withheld bundle records its reason', () => {
  for (const b of bundles.filter((e) => e.draft)) {
    assert.ok(
      (b.holdReason ?? '').length > 40,
      `${b.slug} is draft with no substantial holdReason`,
    )
  }
})

/**
 * The Locate Us walkthroughs on /book-now.
 *
 * Both halves of this matter for the same reason: a visitor reading these steps is lost, on
 * mobile data, standing in a mall. A step whose photo 404s is worse than no photo, and a
 * locale whose route stops three steps early strands them mid-walk.
 */
test('every direction step points at an image that exists', async () => {
  const { readdirSync } = await import('node:fs')
  const files = new Set(readdirSync(new URL('../public/img/find-us', import.meta.url)))
  for (const locale of LOCALES) {
    for (const route of directionsFor(locale)) {
      for (const step of route.steps) {
        assert.ok(
          files.has(step.image),
          `${locale} directions/${route.slug}: no public/img/find-us/${step.image}`,
        )
        assert.ok(step.alt.length > 20, `${locale} directions/${route.slug}: thin alt for ${step.image}`)
      }
    }
  }
})

test('every locale walks the same routes, step for step', () => {
  const shape = (locale: Locale) =>
    directionsFor(locale).map((r) => `${r.slug}:${r.steps.length}`)
  for (const locale of LOCALES) {
    if (locale === 'en') continue
    assert.deepEqual(
      shape(locale),
      shape('en'),
      `${locale} directions diverge from English — a route or a step is missing`,
    )
  }
})

/**
 * The unit number is a LETTER O: "VO6-G-02". This has flipped between letter and digit twice
 * (2026-08-01 to the digit, 2026-09-05 back to the letter) because the two glyphs are
 * indistinguishable in most UI faces, and each flip touched five files that had to move
 * together. The address is the single string every page's LocalBusiness schema and every
 * external citation is built from, so a half-applied flip is a NAP inconsistency across the
 * whole site — the exact failure lib/clinic.ts's header warns costs local-pack ranking.
 *
 * This asserts the spelling in one place and then bans the other one everywhere, which is the
 * part a find-and-replace gets wrong: it is the file someone forgets that does the damage.
 * If the client ever confirms the digit, change `clinic.address.street` and the `DIGIT` regex
 * below together, and re-read the history note in lib/clinic.ts first.
 */
test('the unit number is a letter O everywhere, or nowhere', async () => {
  assert.match(
    clinic.address.street,
    /^VO6-G-02\b/,
    'clinic.address.street no longer starts with the letter-O unit number',
  )

  const { readdirSync, readFileSync, statSync } = await import('node:fs')
  const DIGIT = /V06/
  const root = new URL('..', import.meta.url)
  const skip = new Set(['node_modules', '.next', '.git', 'assets', 'public', 'out'])

  const offenders: string[] = []
  const walk = (dir: URL, prefix = '') => {
    for (const entry of readdirSync(dir)) {
      if (skip.has(entry) || entry.startsWith('.')) continue
      const child = new URL(`${entry}${statSync(new URL(entry, dir)).isDirectory() ? '/' : ''}`, dir)
      if (statSync(child).isDirectory()) walk(child, `${prefix}${entry}/`)
      // Prose and source only. JSON is excluded because lockfile integrity hashes throw
      // random "V06" substrings, and the address is never written into one anyway.
      else if (/\.(ts|tsx|md|mdx)$/.test(entry)) {
        // This file names the banned spelling on purpose, to ban it.
        if (`${prefix}${entry}` === 'lib/content.test.ts') continue
        for (const [i, line] of readFileSync(child, 'utf8').split('\n').entries()) {
          // lib/clinic.ts's history note quotes the old spelling deliberately.
          if (DIGIT.test(line) && !/Changed to `V06`/.test(line)) {
            offenders.push(`${prefix}${entry}:${i + 1}`)
          }
        }
      }
    }
  }
  walk(root)

  assert.deepEqual(
    offenders,
    [],
    `digit-zero "V06" found — the unit number is a letter O:\n  ${offenders.join('\n  ')}`,
  )
})

/**
 * The route cards on /book-now draw their glyph from a slug->icon map in components/FindUs.tsx
 * rather than from the data files, so a route added later renders a card with an empty space
 * where the icon should be. That is the kind of gap nobody files a bug for — the card still
 * works, it just looks broken. Fail the build instead.
 */
test('every direction route has a card icon', () => {
  for (const route of directionsFor('en')) {
    assert.ok(routeIcons[route.slug], `route "${route.slug}" has no entry in routeIcons`)
  }
})
