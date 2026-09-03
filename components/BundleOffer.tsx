import Image from 'next/image'

import type { Dictionary } from '@/dictionaries/types'
import { ringgit, type Bundle } from '@/lib/pricing'
import { Eyebrow, WhatsAppButton } from '@/components/ui'

/**
 * The bundle card. The only place a price appears on this site.
 *
 * Placed after the method rather than before it on every route that carries it: a price read
 * before the reader knows what happens in the room is a number with nothing attached to it. By
 * the time they reach this block they have seen the assessment steps, so the figure answers a
 * question they are already asking.
 *
 * LEFT COLUMN READS AS A RECEIPT, top to bottom: what it is, what is in it, what those parts
 * cost separately, what they come to, what you actually pay. Reworked 2026-09-03 from a version
 * where the price, the struck total and the saving all sat on one baseline in three competing
 * type styles, which gave a reader no order to read them in.
 *
 * Three deliberate choices in that hierarchy:
 *
 * 1. THE LINE ITEMS ADD UP IN FRONT OF THE READER. Each component shows its own price and the
 *    struck total sits under them in the same column, behind a heavier rule, so the comparison
 *    can be checked rather than taken on trust. It is a price-reduction claim and the clinic is
 *    the party standing behind it; `content.test.ts` holds the same arithmetic.
 * 2. THE SAVING IS STATED AS BOTH A FIGURE AND A PERCENTAGE, derived rather than typed, because
 *    a percentage is the number people compare offers with and RM40 alone does not say whether
 *    that is generous. Both come off `price` and `compareAt`, so neither can drift.
 * 3. NO MANUFACTURED URGENCY. No countdown, no "ends soon", no stock counter. The offer has no
 *    expiry (client, 2026-09-03) and inventing a deadline on a healthcare page would be a lie.
 *    What is genuinely scarce is where it exists, and the eyebrow says so once. Do not add a
 *    second "website only" badge next to it; that duplication is what this rewrite removed.
 *
 * ⚠️ THE CLIENT'S POSTER IS NOT AN OPTION HERE. The artwork this content came from reads
 * "Initial Consultation, Treatment", the banned word on a graphic a patient sees, and it carries
 * the RM650 total the clinic has since corrected to RM660. Rebuilt as markup for both reasons,
 * and because a JPEG of a price list is invisible to the assistants pricing exists to answer.
 * Do not "simplify" it back to an <Image>. The photograph is a photograph; every figure is text.
 *
 * Static by design. No motion, no client boundary: this renders inside statically generated
 * service pages and a client island to animate a price would cost Core Web Vitals for nothing.
 */
export function BundleOffer({
  dict,
  bundle,
  message,
}: {
  dict: Dictionary
  bundle: Bundle
  message: string
}) {
  const saving = bundle.compareAt - bundle.price
  // Derived, never typed. 40 off 240 reads as 17%, and the figure moves if a price does.
  const percent = Math.round((saving / bundle.compareAt) * 100)

  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-ambient lg:grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col p-8 lg:p-10">
          <Eyebrow>{bundle.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            {bundle.name}
          </h2>

          {/* Not an eyebrow. The card already has one above the heading, and a second run of
              small caps here gave the column two competing labels instead of a hierarchy. */}
          <p className="mt-8 text-sm font-semibold">{dict.page.bundleIncluded}</p>

          <ul className="mt-3 divide-y divide-line border-t border-line">
            {bundle.lines.map((line) => (
              <li key={line.label} className="flex items-baseline justify-between gap-6 py-4">
                <span className="leading-relaxed text-ink-muted">{line.label}</span>
                <span className="flex-none text-sm font-semibold tabular-nums">
                  {ringgit(line.price)}
                </span>
              </li>
            ))}
          </ul>

          {/* The sum, in the same column as the parts it is the sum of. The heavier rule is what
              makes the block read as a total rather than as one more line item. */}
          <div className="flex items-baseline justify-between gap-6 border-t-2 border-ink/15 py-4">
            <span className="label text-ink-muted">{dict.page.bundleWorth}</span>
            <s className="flex-none text-sm font-semibold tabular-nums text-ink-muted">
              {ringgit(bundle.compareAt)}
            </s>
          </div>

          {/* `mt-auto` pins the ask to the foot of the column, so the card does not look cut
              short on whichever page has the shorter list. */}
          <div className="mt-auto pt-8">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <p className="text-5xl font-extrabold leading-none tracking-tight tabular-nums sm:text-6xl">
                {ringgit(bundle.price)}
              </p>
              {/* SLATE, NOT GOLD. Gold on this site means "the action being asked for", which is
                  why <FitCheck> keeps it out of both its columns. A gold savings badge sat
                  beside the gold WhatsApp button and the two competed, so the card read as
                  having two asks and the real one lost. Slate is the site's informational
                  voice, it clears AA on white at 7.8:1, and it leaves exactly one gold element
                  in the card. Do not put a second accent hue in here either: a red or green
                  SALE flag would break the one-accent palette and read as retail pressure on a
                  page about someone's back. */}
              <span className="label rounded-full bg-brand-slate px-4 py-2 text-white">
                {dict.page.bundleSave(ringgit(saving), `${percent}%`)}
              </span>
            </div>
            <div className="mt-7">
              <WhatsAppButton message={message}>{dict.header.enquireOnWhatsapp}</WhatsAppButton>
            </div>
          </div>
        </div>

        {/* Fixed height on mobile so the card does not open as a tower of photograph before the
            offer is read; full height beside the copy from `lg` up, where the left column sets
            the row height.

            `fill` RATHER THAN width/height ON PURPOSE. This slot is a crop, not a placed image,
            and a hardcoded intrinsic size meant only photographs that happened to be 1400x1000
            could go in it without tripping Next's aspect-ratio warning. That constraint had
            already forced one image swap; with `fill` any frame in the library is eligible and
            the box decides the shape. */}
        <div className="relative order-first h-56 sm:h-72 lg:order-none lg:h-auto">
          <Image
            src={bundle.image.src}
            alt={bundle.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
