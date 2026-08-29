/**
 * Resolves `ServiceQualifier`'s copy from the dictionary — kept in its own plain (non
 * `'use client'`) module so a Server Component can call it eagerly without any ambiguity
 * about crossing the client boundary. `ServiceQualifier` itself is a client component, and
 * a dictionary function value (e.g. `qualifierGreeting`) cannot be passed to it as a prop —
 * only the already-resolved strings this produces can.
 */
import type { Dictionary } from '../dictionaries/types'
import type { ServiceQualifierCopy } from '@/components/ServiceQualifier'

export function qualifierCopyFrom(dict: Dictionary, serviceName: string): ServiceQualifierCopy {
  return {
    isThisRightForYou: dict.page.isThisRightForYou,
    notSureIfIsRightForYou: dict.page.notSureIfIsRightForYou(serviceName),
    tickAnythingBody: dict.page.tickAnythingBody,
    selectConcernsAriaLabel: dict.page.selectConcernsAriaLabel,
    askUsOnWhatsapp: dict.page.askUsOnWhatsapp,
    opensWhatsappCaption: dict.page.opensWhatsappCaption,
    greeting: dict.page.qualifierGreeting(serviceName),
    appliesToMe: dict.page.qualifierAppliesToMe,
    closingQuestion: dict.page.qualifierClosingQuestion,
  }
}
