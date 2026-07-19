import Link from 'next/link'
import { clinic, addressOneLine, hoursDisplay } from '@/lib/clinic'

/**
 * NAP appears here on every page — this is the sitewide citation Google reads.
 * Every value comes from `clinic`; never hardcode an address or phone number here.
 */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-[#212121]">{clinic.name}</h2>
          <address className="mt-2 not-italic leading-relaxed text-[#414141]">
            {addressOneLine}
          </address>
          <p className="mt-2">
            <a href={`tel:${clinic.phoneE164}`} className="text-[#2B5672]">
              {clinic.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${clinic.email}`} className="text-[#2B5672]">
              {clinic.email}
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-[#212121]">Opening Hours</h2>
          <dl className="mt-2 space-y-1 text-[#414141]">
            {hoursDisplay.map((h) => (
              <div key={h.label} className="flex justify-between gap-4">
                <dt>{h.label}</dt>
                <dd>{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="font-semibold text-[#212121]">Visit</h2>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/contact-us" className="text-[#2B5672]">
                Directions &amp; contact
              </Link>
            </li>
            <li>
              <a href={clinic.mapsUrl} target="_blank" rel="noopener" className="text-[#2B5672]">
                Open in Google Maps
              </a>
            </li>
            <li>
              <a href={clinic.whatsappUrl} target="_blank" rel="noopener" className="text-[#2B5672]">
                WhatsApp us
              </a>
            </li>
            <li>
              <a
                href={clinic.socials.instagram}
                target="_blank"
                rel="noopener"
                className="text-[#2B5672]"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-neutral-500">
        © {new Date().getFullYear()} {clinic.name}. Chiropractic and physiotherapy in Cheras,
        Maluri, Kuala Lumpur.
      </p>
    </footer>
  )
}
