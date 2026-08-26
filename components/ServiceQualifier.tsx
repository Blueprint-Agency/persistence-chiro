'use client'

import { useState } from 'react'

import { Eyebrow, WhatsAppIcon } from '@/components/ui'
import type { Concern, ConcernIcon } from '@/lib/services'

/**
 * "Is this right for you?" qualifier → prefilled WhatsApp. The reader ticks the concerns
 * that apply and the WhatsApp link is built live from the selection, exactly like
 * PartnerEnquiry — a micro-commitment that turns a scanner into a warm enquiry.
 *
 * Client component for the same reason PartnerEnquiry is: the message is assembled in the
 * browser from the checkboxes. Nothing leaves the browser until the visitor opens WhatsApp.
 * It carries no diagnosis and makes no promise — it forwards what the reader chose so the
 * clinic can advise where to start.
 *
 * Uses wa.me with the clinic number (wa.link cannot carry a prefilled message).
 */

const WHATSAPP_NUMBER = '60182014088'

/**
 * Concern icons. Stroke-only, 24px grid, `currentColor` so they inherit the selected state.
 * Deliberately abstract — a literal illustration of "a muscle knot" would be either
 * medical-diagram cold or cartoonish, and neither belongs next to a checkbox.
 */
const ICONS: Record<ConcernIcon, React.ReactNode> = {
  // Two interlocking rings: something bound up.
  knot: (
    <>
      <circle cx="9" cy="12" r="4.6" />
      <circle cx="15" cy="12" r="4.6" />
    </>
  ),
  // A loop returning to itself: relief that keeps wearing off.
  recurring: (
    <>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M20.5 3.5V9h-5.5" />
    </>
  ),
  // Head and shoulders.
  neck: (
    <>
      <circle cx="12" cy="6.5" r="3.2" />
      <path d="M5 20c1.5-4.2 4-6.3 7-6.3s5.5 2.1 7 6.3" />
    </>
  ),
  // A dressing over an old site.
  injury: (
    <>
      <rect x="2.6" y="9" width="18.8" height="6" rx="3" transform="rotate(-32 12 12)" />
      <circle cx="12" cy="12" r="1.1" />
    </>
  ),
  // A fine needle with its hub.
  needle: (
    <>
      <path d="M3.5 20.5 11 13" />
      <path d="M13.4 10.6 20.5 3.5" />
      <path d="M10.6 8.9l4.5 4.5" />
    </>
  ),
  // An open question, not an objection.
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.4 9.4a2.7 2.7 0 1 1 3.5 2.6c-.7.2-1 .8-1 1.5v.4" />
      <circle cx="12" cy="17.2" r=".8" />
    </>
  ),
}

function ConcernGlyph({ name }: { name: ConcernIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 flex-none"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

const labelOf = (c: Concern) => (typeof c === 'string' ? c : c.label)
const iconOf = (c: Concern) => (typeof c === 'string' ? null : c.icon)

export function ServiceQualifier({
  serviceName,
  concerns,
}: {
  serviceName: string
  concerns: readonly Concern[]
}) {
  const [checked, setChecked] = useState<string[]>([])

  const toggle = (c: string) =>
    setChecked((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

  const lines = [
    `Hi Persistence Chiropractic, I'm considering ${serviceName} in Cheras.`,
    ...(checked.length ? ['This is what applies to me:', ...checked.map((c) => `• ${c}`)] : []),
    'Could you advise whether it is a good fit and where to start?',
  ]

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`

  return (
    <div>
      {/* The heading sits OUTSIDE the card, on the band, at the same display size as every
          other section heading on the page. It was a <legend> at text-xl inside the box,
          which made the highest-intent block on the page read as a form label rather than a
          section — the one place that should not be quiet. The fieldset keeps a legend for
          screen readers; it is just no longer doing the visual work. */}
      <Eyebrow>Is this right for you?</Eyebrow>
      <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
        Not sure if {serviceName} is right for you?
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-ink-muted">
        Tick anything that sounds like you. We will read it back honestly and tell you where
        to start, even if that is somewhere else.
      </p>

      <div className="mt-10 rounded-3xl border border-line bg-white p-8 shadow-ambient lg:p-10">
      <fieldset>
        <legend className="sr-only">Select the concerns that apply to you</legend>

        {/* list-none pl-0: defends against `.post-body ul` (globals.css) re-adding bullet
            markers when this renders inside a blog post via InlineQualifier — Tailwind's
            own preflight already zeroes list-style outside that scope, so this is a no-op
            on the service pages that also render this component. */}
        <ul className="grid list-none gap-3 pl-0 sm:grid-cols-2">
          {concerns.map((concern) => {
            const label = labelOf(concern)
            const icon = iconOf(concern)
            const on = checked.includes(label)
            return (
              <li key={label}>
                <label
                  className={`flex h-full cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed transition-colors ${
                    on
                      ? 'border-brand-slate bg-brand-slate/5 text-ink'
                      : 'border-line text-ink-muted hover:border-brand-slate/40'
                  }`}
                >
                  {/* The checkbox is the control; it stays real and focusable. The glyph is
                      decoration that inherits the selected colour, so the tick is never the
                      only thing signalling state. */}
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(label)}
                    className="mt-0.5 h-4 w-4 flex-none accent-brand-slate"
                  />
                  {icon && (
                    <span className={on ? 'text-brand-slate' : 'text-brand-slate/55'}>
                      <ConcernGlyph name={icon} />
                    </span>
                  )}
                  <span>{label}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>

      {/* Gold, like every other CTA on the site. This was WhatsApp green, which made the
          page's most important button the one colour the palette does not own. */}
      <a
        href={href}
        target="_blank"
        rel="noopener"
        /* no-underline: `.post-body a` (globals.css) underlines every link when this renders
           inside a blog post via InlineQualifier; a CTA button should never carry one. */
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-3.5 text-sm font-semibold text-ink no-underline transition-colors hover:bg-[#d4b00d]"
      >
        <WhatsAppIcon />
        Ask us on WhatsApp
      </a>
      <p className="mt-3 text-sm text-ink-muted">
        Opens WhatsApp with your answers filled in. Nothing is sent until you press send there.
      </p>
      </div>
    </div>
  )
}
