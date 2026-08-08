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

import { conditions } from './conditions.ts'
import { services } from './services.ts'
import { posts, publishedPosts } from './posts.ts'
import { HELD_POST_SLUGS, LEGACY_POST_SLUGS, redirects } from '../redirects.ts'
import { staticRoutes } from './routes.ts'
import { clinicFaqs, homeFaqs, aftercare, aftercareIntro } from './faqs.ts'
import { homeIntro } from './home.ts'
import { gonsteadIntro, gonsteadSteps } from './gonstead.ts'
import { founderBio, practitioners, publishedRegistrations } from './clinic.ts'

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
            ...m.sections.map((s) => s.body),
            // These user-facing fields carry prose too, so they must clear the same guard.
            // `outcomes` is a union: a bare string, or an object carrying the copy on `.text`
            // alongside an image or illustration. Spreading it raw stringified the object
            // forms to "[object Object]", so four of the five dry needling outcomes were
            // silently exempt from the guard. Normalise to the text before joining.
            ...(m.outcomes ?? []).map((o) => (typeof o === 'string' ? o : o.text)),
            ...(m.longForm ?? []).flatMap((l) => [l.heading, l.body]),
            ...(m.citations ?? []).map((c) => c.claim),
            ...m.faqs.flatMap((f) => [f.q, f.a]),
            ...(m.keyTakeaways ?? []).flatMap((k) => [k.q, k.a]),
            ...(m.comparison
              ? [
                  m.comparison.heading,
                  m.comparison.intro,
                  m.comparison.note,
                  ...m.comparison.rows.flatMap((r) => [r.label, r.a, r.b]),
                ]
              : []),
          ].join(' '),
        ] as [string, string],
    ),
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

test('no two pages target the same keyword', () => {
  const targets = [...conditions, ...services].map((p) => p.targetKeyword.toLowerCase())
  const dupes = targets.filter((t, i) => targets.indexOf(t) !== i)
  assert.deepEqual(dupes, [], `duplicate targetKeyword: ${dupes.join(', ')}`)
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
