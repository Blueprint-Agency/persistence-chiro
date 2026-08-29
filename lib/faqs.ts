/**
 * General clinic FAQs. Sourced from the live Wix site (extracted 2026-07-19), then
 * REWRITTEN 2026-07-21 to remove promissory medical claims.
 *
 * No longer verbatim, deliberately. The Wix copy guaranteed outcomes ("fully safe",
 * "painless", "completely heal") and this text is emitted as FAQPage schema on
 * /what-to-expect, so Google may surface it verbatim as a rich result. Claims the clinic
 * cannot stand behind must not go out under structured data. Hedging follows the house
 * style already established in `conditions.ts`: may / often / aims to / for most people,
 * and an explicit referral line where scope runs out.
 *
 * These are whole-clinic questions (safety, session length, what to wear) — not
 * condition-specific, so they live on /what-to-expect rather than being split across the
 * six condition pages.
 *
 * Each answer lives in exactly one place so FAQPage schema isn't emitted twice for the
 * same question. `content.test.ts` enforces that, and also guards against promissory
 * phrasing creeping back in.
 */

export type Faq = { q: string; a: string }

export const clinicFaqs: Faq[] = [
  {
    q: 'Is Chiropractic & Physiotherapy suitable for all ages?',
    a: 'We see patients of every age, from infants through to older adults, as well as teenagers and pregnant women. Our youngest patient was 4 months old and our eldest 96. Suitability still depends on the individual, and some presentations are not appropriate for adjustment, so an assessment always comes before anything is adjusted. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
  },
  {
    q: 'What are the benefits of getting a Chiropractic adjustment?',
    a: 'Adjustments aim to improve how well a restricted joint moves, and patients often report less discomfort and easier movement afterwards. How much changes, and how quickly, varies from person to person and depends on what is causing the problem in the first place. Your chiropractor will tell you what is realistic for your case after assessing you, rather than promising a particular result beforehand.',
  },
  {
    q: 'How long does a follow-up visit take?',
    a: "Most subsequent visits for Chiropractic take up around 15-30 minutes, and Physiotherapy follow up sessions take up around 45-60 minutes. It highly depends on the patient's current condition, so schedule your time well to avoid disappointments.",
  },
  {
    q: 'How many sessions will I need?',
    a: "There is no specific number of sessions for each individual, and we will not give you one at the first visit. It highly depends on the patient's current condition, recovery time and personal goals. Factors such as lifestyle, sitting posture and desk ergonomics also contribute to your recovery. Hence, patients might be expected to come back for more than 1 session. This is because after your first few adjustments, your muscle memory tends to bring your body back to its old patterns instead of creating new ones. Repeated adjustments will help your body to learn new patterns of mobility until the new ones can take over the old ones. Short term relief can come quickly, but changing your posture, spine's ability to move and muscle health will take time, months in fact.",
  },
  {
    q: 'Do I need Physiotherapy if my pain is not severe?',
    a: 'Physiotherapy is not only for severe injuries. Assessing a problem early often means it is easier to manage before it becomes chronic or recurring, and recovery tends to be more straightforward.',
  },
  {
    q: 'Will Physiotherapy be painful?',
    a: 'Physiotherapy should not cause excessive pain. Some mild discomfort may occur during assessment or exercise, but the work is always adjusted according to your tolerance and comfort level.',
  },
  {
    q: 'Do I still need Physiotherapy after Chiropractic care?',
    a: 'Chiropractic care aims to restore joint mobility and ease discomfort, while Physiotherapy focuses on strengthening muscles and improving movement control. For many patients the two approaches work well together, and your practitioner will advise whether both are appropriate for you.',
  },
  {
    q: 'Can I continue gym or sports during my care?',
    a: 'In many cases, yes. However, modifications may be required. Our practitioners guide patients on safe loading, exercise progression, and return-to-sport strategies.',
  },
  {
    q: 'What should I wear for my sessions?',
    a: 'We encourage our patients to wear non-restrictive clothing that is comfortable and easy to move in. Some examples such as loose-fitting clothing, shorts, yoga pants, or leggings would be best suited.',
  },
]

/**
 * Homepage FAQs. VERBATIM from the live homepage — a different five from `clinicFaqs`,
 * which is deliberate: these are the pre-booking questions ("where are you", "what
 * happens on my first visit"), so they belong on the page that has to convert.
 *
 * No question appears in both arrays, so FAQPage schema is never emitted twice for the
 * same text. `content.test.ts` enforces that.
 */
export const homeFaqs: Faq[] = [
  {
    q: 'Where is Persistence Chiropractic Care located?',
    a: 'Our chiropractic center is based in Cheras, Kuala Lumpur. Located right next to Sunway Medical Center Velocity and Sunway Velocity.',
  },
  {
    q: 'What should I expect during my first visit?',
    a: "Your first visit will include a full health history and symptom review, followed by a physical assessment such as posture, movement, range of motion, and joint/muscle testing (and spinal checks when relevant). Your practitioner will then explain what's happening, share the working diagnosis, and outline a personalised care plan and timeline. First visits run about 30 to 60 minutes; follow-ups are 20 to 45 minutes depending on the case. Bring any previous reports, scans or MRI/X-ray results if you have them. If you're not sure whether to start with chiropractic or physiotherapy, text us your main concern and we'll advise you.",
  },
  {
    q: 'Do I need an X-Ray before starting my chiropractic care?',
    a: 'An X-Ray gives us a clearer picture of what is actually happening in your spine: how each segment sits, how the discs and joints look, and whether anything is present that would change the plan. That detail is what lets a Gonstead assessment be specific about the segment involved rather than working in general terms. It is not mandatory for everyone, and it is avoided for pregnant women and children unless there is a clear reason. If you are unsure, message us before your visit and we will talk it through.',
  },
  // "What should I wear" is deliberately absent: `clinicFaqs` already carries it with the
  // same answer, and it renders on /what-to-expect. Duplicating it here would put
  // identical FAQPage schema on two routes.
  {
    q: 'Do chiropractic adjustments hurt?',
    a: 'Most patients find adjustments comfortable. You may hear or feel a click, and some slight discomfort is common, especially around a recent injury. You should not feel intense pain, and if you do, tell your chiropractor straight away so the technique can be adjusted.',
  },
]

/**
 * Aftercare between visits. VERBATIM from the live site, bar the banned word.
 * Genuinely useful content and a strong internal-link magnet — patients search
 * "sore after chiropractic adjustment" and this answers it.
 */
export const aftercareIntro =
  'Chiropractic care supports your body’s own recovery, and what you do between visits matters too. Soreness after a recent adjustment is common and settles as your tissues adjust. Tell us how you felt at each visit, better or worse.'

export const aftercare = [
  {
    heading: 'Walking / Movement',
    body: 'Have some light movements or take a slow walk to stimulate your blood flow. Motion is key! Try to avoid any movement that can cause discomfort. Vigorous exercises should also be avoided for at least 2-3 days following your adjustments.',
  },
  {
    heading: 'Hydration',
    body: 'Drink plenty of water. Staying well hydrated supports recovery and can help with the soreness some patients notice after an adjustment.',
  },
  {
    heading: 'Sleeping and sitting',
    body: 'Choose a supportive mattress and pillow that keep your spine neutral, and sleep on your back or side rather than your stomach. When sitting, keep your hips back in the chair with lumbar support, and get up for a stretch every 30 minutes.',
  },
  {
    heading: 'Ice pack',
    body: 'Apply an ice pack wrapped in cloth for 3 rounds of 5 minutes, with 5 minute rests between. This helps settle pain and swelling. Avoid heat on a freshly irritated joint, and check with your chiropractor if you are unsure.',
  },
] as const

/**
 * Locale dispatch for the /what-to-expect and homepage content — see the matching comment
 * in `lib/conditions.ts` for the rationale.
 */
import type { Locale } from './i18n'
import { clinicFaqsZh, homeFaqsZh, aftercareIntroZh, aftercareZh } from './faqs.zh.ts'
import { clinicFaqsMs, homeFaqsMs, aftercareIntroMs, aftercareMs } from './faqs.ms.ts'

const clinicFaqsByLocale: Record<Locale, Faq[]> = {
  en: clinicFaqs,
  zh: clinicFaqsZh,
  ms: clinicFaqsMs,
}
const homeFaqsByLocale: Record<Locale, Faq[]> = {
  en: homeFaqs,
  zh: homeFaqsZh,
  ms: homeFaqsMs,
}
const aftercareIntroByLocale: Record<Locale, string> = {
  en: aftercareIntro,
  zh: aftercareIntroZh,
  ms: aftercareIntroMs,
}
const aftercareByLocale: Record<Locale, readonly { heading: string; body: string }[]> = {
  en: aftercare,
  zh: aftercareZh,
  ms: aftercareMs,
}

export const clinicFaqsFor = (locale: Locale) => clinicFaqsByLocale[locale]
export const homeFaqsFor = (locale: Locale) => homeFaqsByLocale[locale]
export const aftercareIntroFor = (locale: Locale) => aftercareIntroByLocale[locale]
export const aftercareFor = (locale: Locale) => aftercareByLocale[locale]
