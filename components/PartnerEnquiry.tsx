'use client'

import { useState } from 'react'

import { WhatsAppIcon } from '@/components/ui'

/**
 * Partner-enquiry questionnaire → dynamic WhatsApp CTA.
 *
 * The one interactive component on the site, which is why it is a client component: the
 * WhatsApp link's prefilled text is built live from the answers. Everything else stays
 * static.
 *
 * It uses wa.me with the clinic's number rather than the wa.link short link elsewhere on
 * the site — wa.link cannot carry a prefilled message, wa.me can. Number is the clinic's
 * phoneE164 (+60182014088) with the plus stripped, per the wa.me format.
 *
 * All fields are optional so the button always works; empty lines are dropped from the
 * message. No data leaves the browser until the visitor chooses to open WhatsApp.
 */

const WHATSAPP_NUMBER = '60182014088'

const INTERESTS = [
  'Corporate wellness talk or workshop',
  'Health screening or event booth',
  'Product or brand collaboration',
  'Referral partnership',
  'Something else',
] as const

const SIZES = ['', 'Under 20', '20–50', '50–200', '200+'] as const

export function PartnerEnquiry() {
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [interest, setInterest] = useState<string>(INTERESTS[0])
  const [size, setSize] = useState<string>('')
  const [notes, setNotes] = useState('')

  const lines = [
    "Hi Persistence Chiropractic, I'd like to explore a partnership.",
    name && `• Name: ${name}`,
    org && `• Organisation: ${org}`,
    interest && `• Interested in: ${interest}`,
    size && `• Approx. people: ${size}`,
    notes && `• Notes: ${notes}`,
  ].filter(Boolean)

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`

  const field = 'mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-brand-slate focus:ring-2 focus:ring-brand-slate/20'
  const label = 'block text-sm font-semibold text-ink'

  return (
    <div className="rounded-3xl border border-line bg-white p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pe-name" className={label}>
            Your name
          </label>
          <input
            id="pe-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="pe-org" className={label}>
            Organisation
          </label>
          <input
            id="pe-org"
            type="text"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            autoComplete="organization"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="pe-interest" className={label}>
            What are you interested in?
          </label>
          <select
            id="pe-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={field}
          >
            {INTERESTS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pe-size" className={label}>
            Roughly how many people? <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <select
            id="pe-size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={field}
          >
            {SIZES.map((s) => (
              <option key={s || 'any'} value={s}>
                {s || 'Prefer not to say'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="pe-notes" className={label}>
          Anything else we should know? <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <textarea
          id="pe-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className={field}
        />
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <WhatsAppIcon />
        Send this on WhatsApp
      </a>
      <p className="mt-3 text-sm text-ink-muted">
        Opens WhatsApp with your answers filled in. Nothing is sent until you press send there.
      </p>
    </div>
  )
}
