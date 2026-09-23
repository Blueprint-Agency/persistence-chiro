import Image from 'next/image'

import type { Dictionary } from '@/dictionaries/types'
import { ringgit, savingPercent, type Bundle } from '@/lib/pricing'
import { Eyebrow, WhatsAppButton } from '@/components/ui'

/**
 * A row of related offers under one heading — the compact sibling of `BundleOffer`.
 *
 * Built 2026-09-22 at the client's request, for the three yoga class prices. Those three are
 * not three offers a reader weighs against each other the way the RM588 bundle and the sports
 * bundle are; they are one decision ("how often will I come?") priced three ways, and three
 * full-width cards made a page of five that scrolled for a very long time. One heading, three
 * columns, and the comparison a visitor is actually making happens side by side instead of a
 * thousand pixels apart.
 *
 * WHAT IT KEEPS FROM THE WIDE CARD, because these are the same commercial claims:
 *   - The line items still add up in front of the reader, and the struck total still sits
 *     under them behind a heavier rule. Narrower column, same receipt.
 *   - The saving is still a figure AND a percentage, both derived from `price`/`compareAt`.
 *   - A card whose `compareAt` equals its `price` still drops the struck total and the badge
 *     rather than printing "Save RM0". The yoga drop in is that card.
 *   - One gold element per card, the WhatsApp ask. The savings badge stays slate.
 *   - No manufactured urgency, no countdown, no "only N left".
 *
 * WHAT IT DROPS, on purpose: the "website only" badge is not rendered here, because a grouped
 * row is for offers that share a heading and these do not carry the flag. If a website-only
 * offer ever joins a group, add the badge back rather than letting it go unsaid.
 *
 * `id` per card is NOT decorative. `offerNode` in lib/schema.ts points each Offer's `url` at
 * `/offers#<slug>`, so every slug must remain an anchor on this page whichever shape it is
 * rendered in. The row itself also carries the group key as an id, which is what the hero
 * jump link targets.
 *
 * Static, like everything else on this page. No client boundary.
 */
export function BundleGroup({
  dict,
  id,
  heading,
  intro,
  bundles,
  messageFor,
  children,
}: {
  dict: Dictionary
  /** The row's anchor, i.e. the group key. */
  id: string
  heading: string
  intro: string
  bundles: Bundle[]
  /** Prefilled WhatsApp text for one card. Built by the route, same helper the wide card uses. */
  messageFor: (bundle: Bundle) => string
  /** Rendered under the row — the "read more about" links, which are one per row, not per card. */
  children?: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 scroll-mt-28">
      {/* No eyebrow over this heading. The page hero already carries "Offers" in small caps a
          screen above, and a second one here labelled the row with the same word the page is
          called. The h2 says what the row is; that is the label. */}
      <div className="max-w-2xl">
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{heading}</h2>
        <p className="mt-4 leading-relaxed text-ink-muted">{intro}</p>
      </div>

      {/* Two from `sm`, stacked on a phone, and at `lg` as many columns as there are cards up
          to three — a two-card row left an empty third column when the house call packages
          arrived, which read as a card that had failed to load. Full literal class strings per
          branch, never a template-built prefix: Tailwind's scanner needs "lg:grid-cols-2" to
          appear verbatim in source. A fourth card would wrap to a second line; if a group ever
          grows that big, decide deliberately rather than letting it wrap.

          `items-stretch` plus the `mt-auto` on each card's footer is what keeps the asks on one
          baseline when one card's description runs a line longer than its neighbour's. */}
      <ul
        className={`mt-10 grid items-stretch gap-6 sm:grid-cols-2 ${
          bundles.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
        }`}
      >
        {bundles.map((bundle) => (
          <BundleCard key={bundle.slug} dict={dict} bundle={bundle} message={messageFor(bundle)} />
        ))}
      </ul>

      {children}
    </section>
  )
}

function BundleCard({
  dict,
  bundle,
  message,
}: {
  dict: Dictionary
  bundle: Bundle
  message: string
}) {
  const saving = bundle.compareAt - bundle.price
  // See `compareAt` on the Bundle type: equal to `price` means there is nothing to compare,
  // and a card that says "Save RM0 (0% off)" is worse than a card that says nothing.
  const hasSaving = saving > 0

  return (
    <li
      id={bundle.slug}
      className="flex scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-ambient"
    >
      {/* A 4:3 BOX, NOT A FIXED-HEIGHT BAND. It was `h-40`, which on a card 380px wide is a
          3.5:1 letterbox that threw away about two thirds of the picture: the client saw the
          house call photographs reduced to a strip and said so. Every photograph these rows
          use is between 4:3 and 1.4:1, so a 4:3 box shows the 4:3 ones whole and takes a sliver
          off the sides of the rest.

          A ratio rather than pixels so the image grows with its column: taller in a two-card
          row, shorter in a three-card one, and proportionate on a phone. Check the ratio of any
          new photograph against this box before adding it to a row. */}
      <div className="relative aspect-[4/3]">
        <Image
          src={bundle.image.src}
          alt={bundle.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
          className="object-cover"
          // Per-photograph, from the record, because the right crop depends on where the
          // subjects sit in the frame and no class can know that. See `objectPosition` on
          // the Bundle type. Inline rather than a Tailwind class: the value is data, and
          // Tailwind can only emit classes it can see spelled out in source.
          style={bundle.image.objectPosition ? { objectPosition: bundle.image.objectPosition } : undefined}
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <Eyebrow>{bundle.eyebrow}</Eyebrow>
        <h3 className="mt-4 text-xl font-bold leading-snug text-ink">{bundle.name}</h3>
        {bundle.description && (
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{bundle.description}</p>
        )}

        <p className="mt-6 text-sm font-semibold">{dict.page.bundleIncluded}</p>
        {/* `divide-y` only draws BETWEEN rows, so a one-line list on a card with no total row
            under it (the drop in) ended with an open bottom edge while its neighbours were
            closed by the heavier total rule. Close it explicitly in that case. */}
        <ul
          className={`mt-2 divide-y divide-line border-t border-line ${
            hasSaving ? '' : 'border-b'
          }`}
        >
          {bundle.lines.map((line) => (
            <li key={line.label} className="flex items-baseline justify-between gap-4 py-3">
              <span className="text-sm leading-relaxed text-ink-muted">{line.label}</span>
              <span className="flex-none text-sm font-semibold tabular-nums">
                {ringgit(line.price)}
              </span>
            </li>
          ))}
        </ul>
        {hasSaving && (
          <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink/15 py-3">
            <span className="label text-ink-muted">{dict.page.bundleWorth}</span>
            <s className="flex-none text-sm font-semibold tabular-nums text-ink-muted">
              {ringgit(bundle.compareAt)}
            </s>
          </div>
        )}

        {/* Who it suits sits INSIDE the card here. On the wide cards it runs underneath in its
            own column, which does not survive a three-up grid: three loose paragraphs below
            three cards leave a reader matching paragraph to card by position. */}
        <p className="mt-5 text-sm leading-relaxed text-ink-muted">
          <span className="label mr-2 text-brand-slate">{dict.page.offersWhoSuits}</span>
          {bundle.who}
        </p>

        <div className="mt-auto pt-6">
          {/* STACKED, not side by side like the wide card. At three columns the badge sits
              beside a four-digit-wide price on one card and wraps under it on the next, off a
              few pixels of difference, and a row of three where one is misaligned looks like
              a bug. Below the price it is the same shape every time. */}
          <div className="flex flex-col items-start gap-3">
            <p className="text-4xl font-extrabold leading-none tracking-tight tabular-nums">
              {ringgit(bundle.price)}
            </p>
            {hasSaving && (
              <span className="label rounded-full bg-brand-slate px-3 py-1.5 text-white">
                {dict.page.bundleSave(ringgit(saving), `${savingPercent(bundle)}%`)}
              </span>
            )}
          </div>
          <div className="mt-5">
            <WhatsAppButton message={message}>{dict.page.bundleClaim}</WhatsAppButton>
          </div>
        </div>
      </div>
    </li>
  )
}
