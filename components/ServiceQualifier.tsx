'use client'

import { useState } from 'react'

import { WhatsAppIcon } from '@/components/ui'

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

export function ServiceQualifier({
  serviceName,
  concerns,
}: {
  serviceName: string
  concerns: string[]
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
    <div className="rounded-3xl border border-line bg-white p-8 lg:p-10">
      <fieldset>
        <legend className="text-xl font-bold">Not sure if it is right for you?</legend>
        <p className="mt-2 leading-relaxed text-ink-muted">
          Tick anything that sounds like you. We will read it back honestly and tell you where
          to start, even if that is somewhere else.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {concerns.map((c) => {
            const on = checked.includes(c)
            return (
              <li key={c}>
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed transition-colors ${
                    on
                      ? 'border-brand-slate bg-brand-slate/5 text-ink'
                      : 'border-line text-ink-muted hover:border-brand-slate/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(c)}
                    className="mt-0.5 h-4 w-4 flex-none accent-brand-slate"
                  />
                  {c}
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>

      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <WhatsAppIcon />
        Ask us on WhatsApp
      </a>
      <p className="mt-3 text-sm text-ink-muted">
        Opens WhatsApp with your answers filled in. Nothing is sent until you press send there.
      </p>
    </div>
  )
}
