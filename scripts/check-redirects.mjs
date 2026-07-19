/**
 * Verifies every legacy URL actually returns the status and destination the redirect map
 * promises. Config asserting 301 and a server emitting 301 are different claims — this
 * checks the second one.
 *
 * Start the server first (`npm run build && npm start`), then:
 *   node scripts/check-redirects.mjs [baseUrl]
 */
import { request } from 'node:http'

import { allLegacyUrls, redirects } from '../redirects.ts'

const base = new URL(process.argv[2] ?? 'http://localhost:3000')

const head = (path) =>
  new Promise((resolve) => {
    const req = request(
      { host: base.hostname, port: base.port, path, method: 'HEAD' },
      (res) => {
        res.resume()
        resolve({ status: res.statusCode, location: res.headers.location ?? '' })
      },
    )
    req.on('error', (e) => resolve({ status: 0, location: `ERR ${e.message}` }))
    req.end()
  })

/** What the config says should happen for a given legacy path. */
const expectedFor = (path) => {
  const exact = redirects.find((r) => r.source === path)
  if (exact) return exact.destination
  const slug = path.startsWith('/post/') ? path.slice('/post/'.length) : null
  return slug ? `/blog/${slug}` : null
}

const rows = []
for (const path of allLegacyUrls()) {
  const { status, location } = await head(path)
  const want = expectedFor(path)
  const got = location.replace(base.origin, '')
  rows.push({ path, status, got, want, ok: status === 301 && got === want })
}

const bad = rows.filter((r) => !r.ok)
for (const r of bad) console.log(`FAIL ${r.status} ${r.path} -> ${r.got}  (expected 301 -> ${r.want})`)

console.log(`\n${rows.length - bad.length}/${rows.length} legacy URLs return 301 to the expected destination`)
if (bad.length) process.exitCode = 1
