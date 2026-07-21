import Image from 'next/image'
import Link from 'next/link'

import { clinic } from '@/lib/clinic'
import { mainNav } from '@/lib/nav'
import { GoldButton, WhatsAppIcon } from '@/components/ui'

/**
 * Sitewide header. Deliberately a server component: the only interactive parts are the
 * submenus and the mobile drawer, and both are done with CSS focus-within and a native
 * <details>. Shipping a client bundle for a navigation menu would spend the Core Web
 * Vitals budget the whole rebuild depends on.
 *
 * The utility bar is here for local SEO as much as for users — phone, hours and location
 * are the first three things a "chiropractor near me" visitor checks, so they sit above
 * the fold on every route instead of only in the footer.
 */
export function Header() {
  const nav = mainNav()

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar. Hidden on small screens, where it would push the nav off the fold. */}
      <div className="hidden bg-brand-slate-deep text-white md:block">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-2 text-xs">
          <a href={clinic.mapsUrl} target="_blank" rel="noopener" className="hover:underline">
            Sunway Velocity, Cheras &middot; Kuala Lumpur
          </a>
          <span aria-hidden="true" className="text-white/30">
            |
          </span>
          <span className="text-brand-slate-soft">
            Open 7 days &middot; Mon to Thu, 10am to 8pm
          </span>
          <div className="ml-auto flex items-center gap-5">
            <a href={`tel:${clinic.phoneE164}`} className="font-semibold hover:underline">
              {clinic.phone}
            </a>
            <a
              href={clinic.whatsappUrl}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1.5 hover:underline"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-background/95 backdrop-blur">
        <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center gap-8 px-4 py-3">
          <Link href="/" className="flex-none">
            <Image
              src="/img/logo-persistence.png"
              alt="Persistence Chiropractic Care, Cheras Kuala Lumpur"
              width={480}
              height={107}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <ul className="ml-auto hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-brand-slate"
                >
                  {item.label}
                  {item.children && item.children.length > 0 && (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3.5 w-3.5 opacity-50"
                      aria-hidden="true"
                    >
                      <path d="M5.5 7.5 10 12l4.5-4.5z" />
                    </svg>
                  )}
                </Link>

                {/* CSS-only submenu. focus-within keeps it keyboard-reachable without JS. */}
                {item.children && item.children.length > 0 && (
                  <ul className="invisible absolute left-0 top-full w-64 rounded-xl border border-line bg-background p-2 opacity-0 shadow-lg shadow-black/5 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-brand-aqua hover:text-brand-slate"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <div className="hidden sm:block">
              <GoldButton href={clinic.bookingUrl} external>
                Book an appointment
              </GoldButton>
            </div>

            {/* Mobile menu. <details> is the whole implementation — no state, no bundle. */}
            <details className="lg:hidden">
              <summary
                className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-line text-ink"
                aria-label="Open menu"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
              </summary>

              <div className="absolute left-0 right-0 top-full max-h-[75vh] overflow-y-auto border-b border-line bg-background px-4 pb-6 pt-2 shadow-lg">
                <ul className="divide-y divide-line">
                  {nav.map((item) => (
                    <li key={item.href} className="py-1">
                      <Link href={item.href} className="block py-2.5 font-medium text-ink">
                        {item.label}
                      </Link>
                      {item.children && item.children.length > 0 && (
                        <ul className="pb-2 pl-4">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block py-1.5 text-sm text-ink-muted"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-col gap-2">
                  <GoldButton href={clinic.bookingUrl} external>
                    Book an appointment
                  </GoldButton>
                  <a
                    href={`tel:${clinic.phoneE164}`}
                    className="rounded-full border border-line py-3 text-center text-sm font-semibold text-brand-slate"
                  >
                    Call {clinic.phone}
                  </a>
                </div>
              </div>
            </details>
          </div>
        </nav>
      </div>
    </header>
  )
}
