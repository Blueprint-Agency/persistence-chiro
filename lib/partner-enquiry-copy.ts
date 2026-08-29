/**
 * Resolves `PartnerEnquiry`'s copy from the dictionary — same reason `qualifier-copy.ts`
 * exists: `PartnerEnquiry` is a `'use client'` component, and a `Dictionary` cannot cross
 * that boundary directly (it contains function values). Only the plain object this produces
 * can be passed as a prop.
 */
import type { Dictionary } from '../dictionaries/types'
import type { PartnerEnquiryCopy } from '@/components/PartnerEnquiry'

export function partnerEnquiryCopyFrom(dict: Dictionary): PartnerEnquiryCopy {
  return {
    greeting: dict.page.partnerEnquiryGreeting,
    yourName: dict.page.yourName,
    organisationLabel: dict.page.organisationLabel,
    whatAreYouInterestedIn: dict.page.whatAreYouInterestedIn,
    interests: [
      dict.page.interestTalkOrWorkshop,
      dict.page.interestScreeningOrBooth,
      dict.page.interestCollaboration,
      dict.page.interestReferralPartnership,
      dict.page.interestSomethingElse,
    ],
    roughlyHowManyPeople: dict.page.roughlyHowManyPeople,
    optionalLabel: dict.page.optionalLabel,
    preferNotToSay: dict.page.preferNotToSay,
    sizes: [dict.page.sizeUnder20, dict.page.size20To50, dict.page.size50To200, dict.page.size200Plus],
    anythingElseWeShouldKnow: dict.page.anythingElseWeShouldKnow,
    sendThisOnWhatsapp: dict.page.sendThisOnWhatsapp,
    opensWhatsappCaption: dict.page.partnerEnquiryOpensWhatsappCaption,
    nameFieldPrefix: dict.page.nameFieldPrefix,
    organisationFieldPrefix: dict.page.organisationFieldPrefix,
    interestedInFieldPrefix: dict.page.interestedInFieldPrefix,
    approxPeopleFieldPrefix: dict.page.approxPeopleFieldPrefix,
    notesFieldPrefix: dict.page.notesFieldPrefix,
  }
}
