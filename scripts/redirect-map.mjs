/**
 * Emits `redirect-map.html` — the client-facing deliverable showing new vs legacy URLs.
 *
 * Generated from redirects.ts and the content modules rather than hand-written, because a
 * redirect map that disagrees with the shipped config is worse than no map at all: it gets
 * signed off, then the real behaviour differs. Re-run after touching redirects.ts.
 *
 *   node scripts/redirect-map.mjs
 */
import { writeFileSync } from 'node:fs'

import { redirects, LEGACY_POST_SLUGS, HELD_POST_SLUGS } from '../redirects.ts'
import { conditions } from '../lib/conditions.ts'
import { modalities } from '../lib/physiotherapy.ts'
import { posts } from '../lib/posts.ts'
import { practitioners, indexablePractitioners } from '../lib/clinic.ts'

const SITE = 'https://www.persistencechiropractic.com'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** A redirected row: new URL on the left, the legacy URL it absorbs on the right. */
const row = (newUrl, legacy, code = '301') =>
  `<tr><td><a href="${SITE}${esc(newUrl)}">${esc(newUrl)}</a></td><td class="arrow">&larr;</td>` +
  `<td class="old"><code>${esc(legacy)}</code></td><td class="code">${code}</td></tr>`

/** A new URL with no legacy equivalent — nothing redirects into it. */
const newRow = (newUrl, note = 'new') =>
  `<tr><td><a href="${SITE}${esc(newUrl)}">${esc(newUrl)}</a></td><td class="arrow">&mdash;</td>` +
  `<td class="isnew">${esc(note)}</td><td class="code"></td></tr>`

const table = (rows) =>
  `<table>\n<tr><th>New URL</th><th></th><th>Legacy URL</th><th>Code</th></tr>\n${rows.join('\n')}\n</table>`

const section = (title, rows, note) =>
  `<h2>${esc(title)}</h2>\n${note ? `<p class="note">${note}</p>\n` : ''}${table(rows)}`

// ---------------------------------------------------------------- data

const byDest = (dest) => redirects.filter((r) => r.destination === dest).map((r) => r.source)
const livePosts = posts.filter((p) => !p.draft)
const heldSet = new Set(HELD_POST_SLUGS)
const indexableSlugs = new Set(indexablePractitioners().map((p) => p.slug))

/** Legacy paths the rebuild keeps byte-identical — no redirect needed, and that's the point. */
const UNCHANGED = ['/', '/about-us', '/contact-us', '/what-to-expect', '/blog']

const sections = []

sections.push(
  section(
    'Unchanged paths',
    UNCHANGED.map((u) => row(u, u, 'n/a')),
    'Same path on Wix and on the new site. No redirect required — these keep their history by staying put.',
  ),
)

sections.push(
  section(
    'Pages redirected',
    [
      ...byDest('/conditions').map((s) => row('/conditions', s)),
      ...byDest('/press').map((s) => row('/press', s)),
      ...byDest('/about-us#partners').map((s) => row('/about-us#partners', s)),
      ...byDest('/contact-us').map((s) => row('/contact-us', s)),
      ...byDest('/').map((s) => row('/', s)),
    ],
    'Legacy pages whose content now lives at a different URL.',
  ),
)

sections.push(
  section(
    'Conditions',
    conditions.map((c) =>
      c.draft ? newRow(`/conditions/${c.slug}`, 'draft — not built') : newRow(`/conditions/${c.slug}`),
    ),
    'New symptom-intent pages. No Wix equivalent existed — the old site had no per-condition content, so nothing redirects in.',
  ),
)

sections.push(
  section(
    'Chiropractic & physiotherapy',
    [
      newRow('/chiropractic', 'new — Gonstead method, content lifted from /our-services'),
      newRow('/physiotherapy', 'new — hub'),
      ...modalities.map((m) => newRow(`/physiotherapy/${m.slug}`)),
    ],
    'The live site sold seven physio services with no dedicated pages; these four absorb all seven (three fold in, keeping their own headings).',
  ),
)

sections.push(
  section(
    'Team',
    practitioners.map((p) =>
      newRow(
        `/about-us/${p.slug}`,
        indexableSlugs.has(p.slug) ? 'new' : 'new — noindex, awaiting bio',
      ),
    ),
    'New per-practitioner pages. Two carry <code>robots: noindex</code> and are excluded from the sitemap until the clinic supplies real bios.',
  ),
)

sections.push(
  section(
    'Blog posts',
    livePosts.map((p) => row(`/blog/${p.slug}`, `/post/${p.slug}`)),
    `Slugs are preserved byte-identical; only the <code>/post/</code> prefix changes. Shipped as one wildcard rule (<code>/post/:slug &rarr; /blog/:slug</code>), listed here in full for sign-off.`,
  ),
)

sections.push(
  section(
    'Held posts',
    [...heldSet].map((s) => row('/blog', `/post/${s}`)),
    'These two need editorial work before republication, so <code>/blog/&lt;slug&gt;</code> does not exist for them. They redirect to the blog index rather than falling through the wildcard into a 404 — and their rules are ordered ahead of it.',
  ),
)

// ---------------------------------------------------------------- summary

// Page rules only — the held-post rules are /post/* URLs, already inside LEGACY_POST_SLUGS.
const redirectedLegacy = redirects.filter((r) => !r.source.includes(':') && !r.source.startsWith('/post/')).length
// LEGACY_POST_SLUGS already contains the two held slugs; adding HELD separately double-counts them.
const totalLegacy = redirectedLegacy + LEGACY_POST_SLUGS.length
const newUrls =
  UNCHANGED.length +
  4 + // /conditions /chiropractic /physiotherapy /press
  conditions.filter((c) => !c.draft).length +
  modalities.filter((m) => !m.draft).length +
  practitioners.length +
  livePosts.length

const summary = `<h2>Summary</h2>
<table>
<tr><th>Metric</th><th>Count</th></tr>
<tr><td>New site URLs (built)</td><td><b>${newUrls}</b></td></tr>
<tr><td>&nbsp;&nbsp;&bull; submitted in sitemap</td><td>${newUrls - (practitioners.length - indexableSlugs.size)}</td></tr>
<tr><td>&nbsp;&nbsp;&bull; reachable but noindex</td><td>${practitioners.length - indexableSlugs.size}</td></tr>
<tr><td>Legacy URLs redirected</td><td>${totalLegacy}</td></tr>
<tr><td>&nbsp;&nbsp;&bull; pages</td><td>${redirectedLegacy}</td></tr>
<tr><td>&nbsp;&nbsp;&bull; blog posts</td><td>${LEGACY_POST_SLUGS.length}</td></tr>
<tr><td>Legacy URLs dropped (404)</td><td class="old">0</td></tr>
</table>`

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>persistencechiropractic.com — New vs Legacy URL structure (redirect map)</title>
<style>
  body { font: 14px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace; max-width: 980px; margin: 2rem auto; padding: 0 1.5rem; color: #1a1a1a; }
  h1 { font-size: 1.1rem; }
  h2 { font-size: 0.95rem; margin: 2rem 0 0.5rem; }
  small { color: #888; font-weight: normal; }
  table { border-collapse: collapse; width: 100%; margin: 0.4rem 0 0; font-size: 0.82rem; table-layout: fixed; }
  th, td { text-align: left; padding: 4px 10px; border-bottom: 1px solid #eee; vertical-align: top; overflow-wrap: anywhere; }
  th:nth-child(1), td:nth-child(1) { width: 46%; }
  td.arrow { width: 1.5rem; }
  td.code { width: 3rem; }
  th { color: #888; font-weight: 600; border-bottom: 1px solid #ccc; }
  td.old { color: #a33; }
  td.isnew { color: #178f4e; }
  td.arrow { color: #bbb; text-align: center; }
  code { color: inherit; }
  a { color: #0b57d0; text-decoration: none; }
  a:hover { text-decoration: underline; }
  .code { color: #888; font-size: 0.78rem; white-space: nowrap; }
  .note { color: #888; font-size: 0.78rem; max-width: 760px; margin: 0.2rem 0 0.4rem; }
  .warn { border-left: 3px solid #e8c111; padding: 0.6rem 0 0.6rem 0.9rem; margin: 1.2rem 0; color: #555; font-size: 0.8rem; }
  @media (prefers-color-scheme: dark) {
    body { background: #111; color: #ddd; }
    th, td { border-color: #2a2a2a; } th { border-color: #444; color: #999; }
    small, .note { color: #777; }
    td.old { color: #e88; } td.isnew { color: #4ecb83; } td.arrow { color: #555; }
    a { color: #7aa7ff; } .warn { color: #aaa; }
  }
</style>
</head>
<body>
<h1>persistencechiropractic.com <small>&mdash; new vs legacy URL structure &amp; redirects</small></h1>

${summary}

<div class="warn">
<b>Every rule is a literal 301.</b> Set via Next's <code>statusCode</code> rather than the
<code>permanent: true</code> shorthand, which would emit 308. Google consolidates signals identically for
either, but 301 is what this document promises and what a header audit will show.
</div>

<div class="warn">
<b>The legacy inventory is known-incomplete.</b> <code>/big-pharmacy-less-pain-more-gain-with-regular-chiropractic</code>
is live today but absent from the Wix sitemap &mdash; it was found only by following a link. There may be further
orphaned pages the sitemap never listed. A full crawl of the live site is needed before launch, or those URLs 404.
</div>

${sections.join('\n\n')}

<div class="warn">
<b>Redirects require a Node or edge host.</b> <code>redirects()</code> is unsupported under
<code>output: 'export'</code>. If the site moves to a pure static export, every rule above must be
regenerated as host-level config (<code>vercel.json</code>, Netlify <code>_redirects</code>, nginx).
</div>

<p class="note">Generated from <code>redirects.ts</code> by <code>scripts/redirect-map.mjs</code>. Do not edit this file by hand &mdash; re-run the script.</p>
</body>
</html>
`

writeFileSync('redirect-map.html', html)
console.log(
  `redirect-map.html written — ${newUrls} new URLs, ${totalLegacy} legacy URLs redirected, 0 dropped`,
)
