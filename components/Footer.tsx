import Image from 'next/image'
import Link from 'next/link'

import { clinic, addressOneLine, hoursDisplay } from '@/lib/clinic'
import { mainNav } from '@/lib/nav'
import { WhatsAppButton, Vertebrae } from '@/components/ui'
import { waMessage } from '@/lib/whatsapp'

/**
 * NAP appears here on every page — this is the sitewide citation Google reads.
 * Every value comes from `clinic`; never hardcode an address or phone number here.
 */
export function Footer() {
  const nav = mainNav()

  return (
    <footer className="mt-auto bg-brand-slate-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            {/* All-white wordmark, supplied by the client. It replaces the colour logo on a
                white plate that used to sit here — the plate existed only because the pale
                blue and sage disappeared on the slate field, and a proper white cut is the
                right fix rather than a box around the wrong asset.

                `unoptimized` because this is an SVG: Next's image optimiser refuses SVG
                unless `dangerouslyAllowSVG` is set, and enabling that sitewide to serve one
                vector we authored is the wrong trade. There is nothing to optimise anyway.

                Header stays on the colour PNG — it sits on the cream ground, where the
                white cut would be invisible. */}
            <Image
              src="/img/logo-persistence-white.svg"
              alt="Persistence Chiropractic Care"
              width={3320}
              height={740}
              unoptimized
              className="h-9 w-auto"
            />

            <p className="mt-6 max-w-sm leading-relaxed text-white/70">
              Gonstead-technique chiropractic and physiotherapy in Cheras, Maluri. Dedicated to
              improving lives, one spine at a time.
            </p>

            {/* One conversion action, not two. This used to be a gold "Book" (SweetPew) beside
                an outlined "WhatsApp"; now that both lead to the same chat, showing them twice
                was just asking the same question twice. Call is the genuine alternative. */}
            {/* One CTA. The phone number is still a tappable NAP citation in the "Visit"
                column below — removing the button does not remove the number, which local
                SEO depends on appearing on every page. */}
            <div className="mt-7">
              <WhatsAppButton message={waMessage.general}>Book on WhatsApp</WhatsAppButton>
            </div>

            <ul className="mt-8 flex gap-5 text-sm text-white/70">
              <li>
                <a
                  href={clinic.socials.instagram}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={clinic.socials.facebook}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-white"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="flex items-center gap-3 label text-brand-slate-soft">
              <Vertebrae />
              Visit
            </h2>
            <address className="mt-5 not-italic leading-relaxed text-white/70">
              {addressOneLine}
            </address>
            <p className="mt-4">
              <a href={`tel:${clinic.phoneE164}`} className="font-semibold hover:underline">
                {clinic.phone}
              </a>
            </p>
            <p className="mt-1">
              <a href={`mailto:${clinic.email}`} className="text-white/70 hover:text-white">
                {clinic.email}
              </a>
            </p>
            <p className="mt-4">
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener"
                className="text-sm text-brand-slate-soft underline underline-offset-4 hover:text-white"
              >
                Open in Google Maps
              </a>
            </p>

            <h2 className="mt-9 flex items-center gap-3 label text-brand-slate-soft">
              <Vertebrae />
              Opening hours
            </h2>
            <dl className="mt-5 space-y-1.5 text-sm">
              {hoursDisplay.map((h) => (
                <div key={h.label} className="flex justify-between gap-4">
                  <dt className="text-white/60">{h.label}</dt>
                  <dd className="text-white/90">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="flex items-center gap-3 label text-brand-slate-soft">
              <Vertebrae />
              Explore
            </h2>
            <ul className="mt-5 space-y-2.5 text-white/70">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* /50 on the slate field computes to 4.35:1 — below AA for text this size. /70
            clears it at ~7:1 and still reads as the quietest line on the page. */}
        <div className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-7 text-xs text-white/70 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {clinic.name}. Chiropractic and physiotherapy in
            Cheras, Maluri, Kuala Lumpur.
          </p>
          <p>Registered chiropractors &middot; Association of Chiropractic Malaysia</p>
        </div>
      </div>
    </footer>
  )
}
