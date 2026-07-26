/**
 * Which deployment is this build for?
 *
 * Vercel exposes the domain a build will be served from at BUILD time, which is what we
 * need — every page here is statically generated, so there is no request to inspect later.
 *
 *   VERCEL_PROJECT_PRODUCTION_URL  the project's production domain. Becomes the custom
 *                                  domain as soon as one is attached, which is the property
 *                                  this module depends on.
 *   VERCEL_URL                     the per-deployment URL (branch previews).
 *   neither                        a local build.
 *
 * The point of doing it this way rather than with a feature flag: attaching
 * persistencechiropractic.com flips both behaviours below automatically. Nobody has to
 * remember anything on launch day, which is exactly when things get forgotten.
 */

/** The canonical public site. Anything else is a staging surface. */
const CANONICAL_HOSTS = ['persistencechiropractic.com', 'www.persistencechiropractic.com']

const deployHost = (
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  ''
).replace(/^https?:\/\//, '')

/** True on `*.vercel.app` — the client-preview surface, not the real site. */
export const isStagingDeployment =
  deployHost.endsWith('.vercel.app') && !CANONICAL_HOSTS.includes(deployHost)

/** True once the build is being served from the clinic's own domain. */
export const isCanonicalDeployment = CANONICAL_HOSTS.includes(deployHost)
