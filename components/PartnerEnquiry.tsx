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

/**
 * Resolved, locale-specific copy — see `lib/partner-enquiry-copy.ts`'s
 * `partnerEnquiryCopyFrom(dict)`. `interests` and `sizes` are plain string arrays rather
 * than a `Record`/enum, because the component only ever needs to display and echo them
 * back verbatim into the WhatsApp message; it never branches on which one was picked.
 */
export type PartnerEnquiryCopy = {
  greeting: string
  yourName: string
  organisationLabel: string
  whatAreYouInterestedIn: string
  interests: readonly [string, string, string, string, string]
  roughlyHowManyPeople: string
  optionalLabel: string
  preferNotToSay: string
  sizes: readonly [string, string, string, string]
  anythingElseWeShouldKnow: string
  sendThisOnWhatsapp: string
  opensWhatsappCaption: string
  nameFieldPrefix: string
  organisationFieldPrefix: string
  interestedInFieldPrefix: string
  approxPeopleFieldPrefix: string
  notesFieldPrefix: string
}

export function PartnerEnquiry({ copy }: { copy: PartnerEnquiryCopy }) {
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [interest, setInterest] = useState<string>(copy.interests[0])
  const [size, setSize] = useState<string>('')
  const [notes, setNotes] = useState('')

  const lines = [
    copy.greeting,
    name && `• ${copy.nameFieldPrefix}: ${name}`,
    org && `• ${copy.organisationFieldPrefix}: ${org}`,
    interest && `• ${copy.interestedInFieldPrefix}: ${interest}`,
    size && `• ${copy.approxPeopleFieldPrefix}: ${size}`,
    notes && `• ${copy.notesFieldPrefix}: ${notes}`,
  ].filter(Boolean)

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`

  const field = 'mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-brand-slate focus:ring-2 focus:ring-brand-slate/20'
  const label = 'block text-sm font-semibold text-ink'

  return (
    <div className="rounded-3xl border border-line bg-white p-8 shadow-ambient lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pe-name" className={label}>
            {copy.yourName}
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
            {copy.organisationLabel}
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
            {copy.whatAreYouInterestedIn}
          </label>
          <select
            id="pe-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={field}
          >
            {copy.interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pe-size" className={label}>
            {copy.roughlyHowManyPeople}{' '}
            <span className="font-normal text-ink-muted">({copy.optionalLabel})</span>
          </label>
          <select
            id="pe-size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={field}
          >
            <option value="">{copy.preferNotToSay}</option>
            {copy.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="pe-notes" className={label}>
          {copy.anythingElseWeShouldKnow}{' '}
          <span className="font-normal text-ink-muted">({copy.optionalLabel})</span>
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
        {copy.sendThisOnWhatsapp}
      </a>
      <p className="mt-3 text-sm text-ink-muted">{copy.opensWhatsappCaption}</p>
    </div>
  )
}
