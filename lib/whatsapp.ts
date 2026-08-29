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
 *
 * ⚠️ LOCALE-AWARE, per `Locale`, NOT via `Dictionary`. Every function here takes `locale` as
 * its first argument rather than living inside `dictionaries/*.ts`, because `lib/schema.ts`
 * needs the general message from inside `localBusinessSchema(locale)`, which only ever has
 * a bare `Locale`, never a resolved `Dictionary`. Threading a `Dictionary` through there for
 * one string was not worth it.
 *
 * Until 2026-08-28 every message here was a hardcoded English literal, used verbatim on
 * every zh/ms page all session — a real, sitewide localization gap. It shipped invisibly
 * because it only ever surfaces inside an `href` attribute (a WhatsApp deep link), never as
 * rendered page text, so it survived every curl+grep spot check for hardcoded chrome that
 * only looked at visible text nodes. See the multilingual memory for the incident.
 */

import { clinic } from './clinic'
import type { Locale } from './i18n'

/** wa.me wants the E.164 digits with no plus and no separators. */
const WHATSAPP_NUMBER = clinic.phoneE164.replace(/\D/g, '')

/** Build a WhatsApp deep link with `message` pre-typed into the chat box. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

const HELLO: Record<Locale, string> = {
  en: 'Hi Persistence Chiropractic',
  zh: '您好 Persistence Chiropractic',
  ms: 'Hai Persistence Chiropractic',
}

/**
 * Condition titles are written for the SERP and end in a service word — "Slipped Disc
 * Care", "Migraine and Headache Care" in English; the zh/ms records follow the same
 * convention with their own trailing word ("...护理", "...Jagaan ..."). A visitor does not
 * say "I've been dealing with slipped disc care", so the trailing noun is stripped before
 * the sentence is built, per locale.
 */
const CONDITION_SUFFIX: Record<Locale, RegExp> = {
  en: /\s+(treatment|care|relief|therapy)$/i,
  zh: /(护理|治疗|疗法)$/,
  ms: /\s*(jagaan|rawatan)$/i,
}

/**
 * Contextual openers. Keep them short — WhatsApp truncates the preview, and a visitor who
 * has to scroll their own message before sending is more likely to bail.
 */
export const waMessage = {
  /** Header, footer, and anywhere with no more specific context. */
  general: (locale: Locale) => {
    const hello = HELLO[locale]
    if (locale === 'zh') return `${hello},我想预约看诊。`
    if (locale === 'ms') return `${hello}, saya ingin menempah temu janji.`
    return `${hello}, I'd like to book an appointment.`
  },

  /** Homepage hero — the visitor has seen nothing but the fold yet. */
  home: (locale: Locale) => {
    const hello = HELLO[locale]
    if (locale === 'zh') return `${hello},我在你们的网站上看到这里,想预约看诊。`
    if (locale === 'ms') return `${hello}, saya jumpa laman web anda dan ingin menempah temu janji.`
    return `${hello}, I'd like to book an appointment. I found you on your website.`
  },

  /** A condition page: "back pain", "slipped disc". */
  condition: (locale: Locale, condition: string) => {
    const hello = HELLO[locale]
    const stripped = condition.replace(CONDITION_SUFFIX[locale], '').trim()
    if (locale === 'zh') return `${hello},我想预约看诊。我目前有${stripped}的问题。`
    if (locale === 'ms')
      return `${hello}, saya ingin menempah temu janji. Saya mengalami masalah ${stripped.toLowerCase()}.`
    return `${hello}, I'd like to book an appointment. I've been dealing with ${stripped.toLowerCase()}.`
  },

  /** A service/modality page: "dry needling", "physiotherapy". */
  service: (locale: Locale, service: string) => {
    const hello = HELLO[locale]
    if (locale === 'zh') return `${hello},我想询问${service}并预约看诊。`
    if (locale === 'ms') return `${hello}, saya ingin bertanya tentang ${service.toLowerCase()} dan menempah temu janji.`
    return `${hello}, I'd like to ask about ${service.toLowerCase()} and book an appointment.`
  },

  /** A practitioner page. Name is passed through as written — it is a fact, never translated. */
  practitioner: (locale: Locale, name: string) => {
    const hello = HELLO[locale]
    if (locale === 'zh') return `${hello},我想预约 ${name}。`
    if (locale === 'ms') return `${hello}, saya ingin menempah temu janji dengan ${name}.`
    return `${hello}, I'd like to book an appointment with ${name}.`
  },

  /** Blog post — lower intent, so this one asks rather than books. Blog is English-only. */
  article: (locale: Locale, title: string) =>
    `${HELLO[locale]}, I read your article "${title}" and I'd like to ask about booking an appointment.`,

  /** The what-to-expect / first-visit page. */
  firstVisit: (locale: Locale) => {
    const hello = HELLO[locale]
    if (locale === 'zh') return `${hello},我想预约第一次看诊。可以告诉我会经历什么吗?`
    if (locale === 'ms')
      return `${hello}, saya ingin menempah lawatan pertama. Bolehkah anda beritahu apa yang akan berlaku?`
    return `${hello}, I'd like to book a first appointment. Could you tell me what to expect?`
  },

  /** Partner / corporate enquiries. */
  partner: (locale: Locale) => {
    const hello = HELLO[locale]
    if (locale === 'zh') return `${hello},我想洽谈与贵诊所合作的事宜。`
    if (locale === 'ms') return `${hello}, saya ingin bercakap tentang bekerjasama dengan klinik anda.`
    return `${hello}, I'd like to talk about partnering with your clinic.`
  },
}
