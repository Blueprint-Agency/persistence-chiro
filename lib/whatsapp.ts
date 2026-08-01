/**
 * WhatsApp is the only conversion path on this site.
 *
 * Every CTA opens a WhatsApp chat with a message already typed for the visitor, phrased for
 * wherever they tapped it. That matters more than it sounds: the visitor is usually in pain
 * and on a phone, and "what do I even say" is real friction at the exact moment they have
 * decided to act. A prefilled first line removes it, and it also tells the clinic what the
 * enquiry is about before anyone replies.
 *
 * ⚠️ MUST use wa.me, not the wa.link short link in `clinic.whatsappUrl`.
 * wa.link cannot carry a prefilled message; wa.me can. This is the same reason
 * `PartnerEnquiry` and `ServiceQualifier` already build their own wa.me hrefs.
 *
 * Messages are written in the visitor's voice, not the clinic's — the visitor is the one
 * sending them. They state a concern and ask for an appointment; they never assert what
 * treatment is needed or what outcome is expected. See the claim rule in AGENTS.md.
 */

import { clinic } from './clinic'

/** wa.me wants the E.164 digits with no plus and no separators. */
const WHATSAPP_NUMBER = clinic.phoneE164.replace(/\D/g, '')

/** Build a WhatsApp deep link with `message` pre-typed into the chat box. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

const HELLO = 'Hi Persistence Chiropractic'

/**
 * Contextual openers. Keep them short — WhatsApp truncates the preview, and a visitor who
 * has to scroll their own message before sending is more likely to bail.
 */
export const waMessage = {
  /** Header, footer, and anywhere with no more specific context. */
  general: `${HELLO}, I'd like to book an appointment.`,

  /** Homepage hero — the visitor has seen nothing but the fold yet. */
  home: `${HELLO}, I'd like to book an appointment. I found you on your website.`,

  /**
   * A condition page: "back pain", "slipped disc".
   *
   * Condition titles are written for the SERP and end in a service word — "Slipped Disc
   * Care", "Migraine and Headache Care". A visitor does not say "I've been dealing with
   * slipped disc care", so the trailing noun is stripped before the sentence is built.
   */
  condition: (condition: string) =>
    `${HELLO}, I'd like to book an appointment. I've been dealing with ${condition
      .toLowerCase()
      .replace(/\s+(treatment|care|relief|therapy)$/, '')}.`,

  /** A service/modality page: "dry needling", "physiotherapy". */
  service: (service: string) =>
    `${HELLO}, I'd like to ask about ${service.toLowerCase()} and book an appointment.`,

  /** A practitioner page. Name is passed through as written. */
  practitioner: (name: string) =>
    `${HELLO}, I'd like to book an appointment with ${name}.`,

  /** Blog post — lower intent, so this one asks rather than books. */
  article: (title: string) =>
    `${HELLO}, I read your article "${title}" and I'd like to ask about booking an appointment.`,

  /** The what-to-expect / first-visit page. */
  firstVisit: `${HELLO}, I'd like to book a first appointment. Could you tell me what to expect?`,

  /** Partner / corporate enquiries. */
  partner: `${HELLO}, I'd like to talk about partnering with your clinic.`,
} as const

/** Convenience: the generic link, for the many places that need no context. */
export const whatsappGeneral = whatsappLink(waMessage.general)
