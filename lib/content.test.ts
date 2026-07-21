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
import { clinicFaqs, homeFaqs, postTreatmentCare, postTreatmentIntro } from './faqs.ts'
import { homeIntro } from './home.ts'
import { gonsteadIntro, gonsteadSteps } from './gonstead.ts'
import { founderBio } from './clinic.ts'

const conditionSlugs = new Set(conditions.map((c) => c.slug))
const serviceSlugs = new Set(services.map((m) => m.slug))

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
 * SCOPE: the structured content in `lib/` only. `content/blog/*.mdx` is NOT yet covered —
 * the 14 migrated posts still carry claims ("fixing the structure", "heal itself",
 * "miracle workers") and rewriting them is outstanding work. Add `mdx` to the sources
 * below once that lands; the assertion is written to make that a one-line change.
 */
test('no promissory medical claims in published copy', () => {
  const banned: [RegExp, string][] = [
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
        [`services/${m.slug}`, [m.metaDescription, ...m.sections.map((s) => s.body)].join(' ')] as [
          string,
          string,
        ],
    ),
    ...clinicFaqs.map((f) => [`clinicFaqs`, `${f.q} ${f.a}`] as [string, string]),
    ...homeFaqs.map((f) => [`homeFaqs`, `${f.q} ${f.a}`] as [string, string]),
    ['homeIntro', [homeIntro.heading, ...homeIntro.body].join(' ')],
    ['gonsteadIntro', gonsteadIntro],
    ...gonsteadSteps.map((s) => [`gonstead/${s.name}`, s.body] as [string, string]),
    ['founderBio', founderBio.join(' ')],
    ['postTreatment', [postTreatmentIntro, ...postTreatmentCare.map((c) => c.body)].join(' ')],
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
    for (const slug of c.treatedBy) {
      assert.ok(serviceSlugs.has(slug), `${c.slug}.treatedBy -> missing service "${slug}"`)
    }
  }
})

test('service cross-links resolve', () => {
  for (const s of services) {
    for (const slug of s.treats) {
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

test('post slugs match the legacy slugs byte-for-byte', () => {
  const legacy = new Set<string>(LEGACY_POST_SLUGS)
  for (const p of posts) {
    assert.ok(
      legacy.has(p.slug),
      `post "${p.slug}" is not a legacy slug — if renamed it needs its own redirect rule, ` +
        `because /post/:slug -> /blog/:slug passes the slug through unchanged`,
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

test('no redirect points at a route that does not exist', () => {
  const known = new Set([...staticRoutes, '/blog/:slug'])
  for (const r of redirects) {
    const dest = r.destination.split('#')[0]
    assert.ok(known.has(dest), `redirect ${r.source} -> ${dest}, which is not a known route`)
  }
})
