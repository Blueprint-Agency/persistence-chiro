import type { Dictionary } from '@/dictionaries/types'
import type { Service } from '@/lib/services'
import { ringgit } from '@/lib/pricing'
import { Eyebrow, WhatsAppButton } from '@/components/ui'

/**
 * A per-visit price list. The second place a price appears on this site, after the bundle
 * card, and for a different shape of offer: a service sold by the visit, with packages that
 * are simply several visits paid together. See `priceList` on the `Service` type for why
 * this is not a `Bundle`.
 *
 * Sits in the same slot <BundleOffer> takes on the service route, after the method and before
 * the qualifier, for the same reason: a price read before the reader knows what happens in
 * the visit is a number with nothing attached to it.
 *
 * READS AS A RATE CARD, not a receipt. The bundle card adds its parts up in front of the
 * reader because it makes a saving claim; this block makes none. Each row is the full price of
 * that visit, so there is nothing to total and nothing to strike through. The one figure that
 * cannot be fixed, travel beyond the free radius, is a `value` row rather than a price, and
 * `note` under the table says how it gets settled. No manufactured urgency, for the reason
 * recorded on the bundle card.
 *
 * Static by design. No client boundary, no motion.
 */

/** Exported so the hero button and the schema anchor cannot drift from this section's id. */
export const PRICE_LIST_ANCHOR = 'fees'

export function PriceList({
  dict,
  data,
  message,
}: {
  dict: Dictionary
  data: NonNullable<Service['priceList']>
  message: string
}) {
  return (
    /* `scroll-mt-28` keeps the card clear of the sticky header when the hero button lands. */
    <section id={PRICE_LIST_ANCHOR} className="mx-auto max-w-6xl px-4 scroll-mt-28">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-ambient lg:grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col p-8 lg:p-10">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">{data.heading}</h2>
          <p className="mt-5 leading-relaxed text-ink-muted">{data.intro}</p>
          {/* `mt-auto` pins the ask and the closer to the foot of the column so the card does
              not look cut short beside the longer list. */}
          <div className="mt-auto pt-8">
            <WhatsAppButton message={message}>{dict.header.enquireOnWhatsapp}</WhatsAppButton>
            <p className="mt-6 text-sm leading-relaxed text-ink-muted">{data.note}</p>
          </div>
        </div>

        {/* Aqua tint, the same one the qualifier band uses, so the figures read as a separate
            panel from the prose the way the bundle card's photograph does. */}
        <div className="border-t border-line bg-brand-aqua/40 p-8 lg:border-l lg:border-t-0 lg:p-10">
          {data.groups.map((group, i) => (
            <div key={group.heading} className={i > 0 ? 'mt-8' : undefined}>
              <p className="label text-brand-slate">{group.heading}</p>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {group.rows.map((row) => (
                  <li key={row.label} className="flex items-baseline justify-between gap-6 py-4">
                    <div>
                      <p className="font-semibold">{row.label}</p>
                      {row.note && (
                        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{row.note}</p>
                      )}
                    </div>
                    <span className="flex-none text-lg font-extrabold tabular-nums">
                      {row.price !== undefined ? ringgit(row.price) : row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
