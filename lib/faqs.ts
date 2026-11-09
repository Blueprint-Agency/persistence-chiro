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

import { bundles, ringgit } from './pricing.ts'

export type Faq = { q: string; a: string }

/** The FAQ price answer is built from the pricing module so the two can never disagree. */
const newPatientBundle = bundles.find((b) => b.slug === 'chiro-physio')!

export const clinicFaqs: Faq[] = [
  {
    q: 'Is Chiropractic & Physiotherapy suitable for all ages?',
    a: 'We see patients of every age, from infants through to older adults, as well as teenagers and pregnant women. Our youngest patient was 4 months old and our eldest 96. Suitability still depends on the individual, and some presentations are not appropriate for adjustment, so an assessment always comes before anything is adjusted. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
  },
  /**
   * The four below were added 2026-11-09 (pc054) when the legacy first-visit post was merged
   * into this page. None of the ranking first-visit pages explained the cracking sound with
   * evidence or said how long soreness lasts. Worded so they do not repeat the homepage's
   * "Do chiropractic adjustments hurt?" or "What should I expect during my first visit?",
   * which would put identical FAQPage answers on two routes.
   */
  {
    q: 'Will I be adjusted on my first visit?',
    a: 'Usually, yes, but only once the assessment is done and only if it is appropriate. If the history, examination or X-ray suggests adjustment is not the right call, for example a recent fracture or a problem that belongs with a doctor, your chiropractor will explain why and refer you instead. You can also say you would rather wait, and nothing is adjusted without your agreement.',
  },
  {
    q: 'What is the cracking sound during an adjustment?',
    a: 'It is thought to come from a small gas cavity forming in the fluid inside the joint as the joint surfaces separate slightly, the same thing that happens when you crack your knuckles. Imaging studies of finger joints support this explanation. It is not bones grinding or anything breaking, and the sound on its own does not tell you whether an adjustment went well. Some adjustments make no sound at all.',
  },
  {
    q: 'Is it normal to feel sore after my first adjustment?',
    a: 'Yes, mild soreness is common, especially after the first few visits. A large study of chiropractic patients found that about half noticed some reaction, most often local soreness, mild or moderate in most cases. Most reactions appeared within a few hours and about three quarters had gone within 24 hours. Gentle walking, staying hydrated and the aftercare advice on this page usually help.',
  },
  {
    q: 'When is soreness after an adjustment not normal?',
    a: 'Call us if soreness is getting worse rather than better after two days, or if it is severe. Seek medical help straight away for new numbness, weakness, tingling in your arms or legs, a sudden severe headache, dizziness, slurred speech, trouble swallowing or changes to your vision, or any loss of bladder or bowel control. These are rare, but they are not ordinary post-adjustment soreness.',
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
    /**
     * The one price question on the site, and the reason pricing went up at all: assistants
     * are asked what a chiropractor costs in KL constantly and had nothing of ours to quote,
     * while a competitor carries "from RM150" in their title tag. It lives here rather than
     * on a page of its own because this answer reaches FAQPage schema, which is what an
     * assistant actually reads. Figures are NOT retyped — they come from lib/pricing.ts, so
     * a price change cannot leave a stale number sitting in an FAQ answer.
     */
    q: 'How much does a first visit cost?',
    a: `Our new patient bundle is ${ringgit(newPatientBundle.price)}, and it covers the chiropractic initial consultation and first adjustment, an X-ray, and a physiotherapy initial assessment with a home exercise programme to take away. Paid for separately those come to ${ringgit(newPatientBundle.compareAt)}. What you need after that depends on what the assessment finds, which is why we will not quote you a course of care before we have seen you. If you would rather book just one part of it, message us and we will tell you what that costs.`,
  },
  {
    q: 'What should I wear for my sessions?',
    a: 'We encourage our patients to wear non-restrictive clothing that is comfortable and easy to move in. Some examples such as loose-fitting clothing, shorts, yoga pants, or leggings would be best suited.',
  },
  {
    q: 'Can I ask for a particular chiropractor?',
    a: 'Yes, and it is easier to arrange if you say so when you book rather than on the day. Some patients have a preference about who they see, and asking for a woman is one of the more common ones. Message us with the days that suit you and we will tell you honestly who has room. If the person you asked for has nothing free at a time you can make, we will say so rather than quietly put you with someone else.',
  },
  {
    q: 'Can I bring someone into the room with me?',
    a: 'Yes. A partner, a parent or a friend, whoever you would feel easier having there. You do not need to give a reason, and it changes nothing about how the assessment runs. Mention it when you arrive so we can put an extra chair in the room.',
  },
]

/**
 * FAQs for /female-chiropractor. A separate array rather than more `clinicFaqs` entries
 * because they publish on a different route, and two routes emitting the same FAQPage
 * answer is the duplicate-markup case `content.test.ts` guards against.
 *
 * ⚠️ EVERY ANSWER HERE IS AVAILABILITY-HONEST BY DESIGN. Valerie Na is one female
 * chiropractor on a roster of three (see `practitioners` in lib/clinic.ts), so nothing on
 * this page may imply she can be booked on demand. A competitor with four women on staff
 * can promise that; this clinic cannot, and a page that implies otherwise turns into a
 * complaint at the front desk. Keep the framing "ask when you book, subject to her diary".
 *
 * ⚠️ NO "DR" TITLE. `lib/clinic.ts` uses none, deliberately: whether Malaysian
 * chiropractors may use it is contested, and the claim was dropped rather than cited when
 * `best-chiropractor-kuala-lumpur` was researched. The only "Dr Valerie" strings in this
 * repo are verbatim patient reviews in lib/reviews.ts, which are quotations, not our voice.
 */
export const femaleChiropractorFaqs: Faq[] = [
  {
    q: 'Is Valerie the only female chiropractor at the clinic?',
    a: 'She is. Persistence has three chiropractors and Valerie Na is the woman among them, so a request to see a female chiropractor means a request to see her specifically. We would rather tell you that plainly than let you arrive expecting a choice of several.',
  },
  {
    q: 'Is Valerie always available?',
    a: 'No, and that is worth knowing before you plan around it. She runs the clinic as well as seeing patients, so her diary fills further ahead than her colleagues do. Tell us when you message which days and times work for you, and we will come back with what she genuinely has open rather than the soonest slot on the books.',
  },
  {
    q: 'Do I need to undress for a chiropractic assessment?',
    a: 'Usually not. Most assessments happen in loose clothing you can move in, and a gown is offered when a region needs to be seen directly, most often the back. You are told what is being looked at and why before it happens, you change privately, and anything not being assessed stays covered.',
  },
  {
    q: 'Why do people ask for a female chiropractor?',
    a: 'The reasons we hear most are modesty, faith or family expectations about being examined by a man, and sometimes an earlier appointment somewhere else that felt rushed or uncomfortable. Some people simply feel easier explaining their body to a woman. None of these needs justifying to us, and you will not be asked to explain it when you book.',
  },
  {
    q: 'Do you have a female physiotherapist?',
    a: 'Yes, we do have a physiotherapist. Message us and we will book you in.',
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
 * The first visit in order, from booking to the drive home. Added 2026-11-09 (pc054) from the
 * merged legacy first-visit post and the new patient bundle in lib/pricing.ts. Deliberately a
 * visit timeline rather than the Gonstead six steps, which live on /services/chiropractic-care
 * and are linked from here instead of repeated. English only until zh/ms copy is written: the
 * page renders the section only when the locale has one.
 */
export const firstVisitQuickAnswer =
  'A first chiropractic visit at our Cheras clinic takes about 30 to 60 minutes. Your chiropractor takes a full history, examines how your spine moves, arranges an X-ray if it is indicated, explains what they found, and adjusts only if it is appropriate. Wear loose clothes you can move in and bring any previous scans or reports.'

export const firstVisitTimelineTitle = {
  eyebrow: 'Step by step',
  heading: 'Your first chiropractic visit, from booking to going home',
}

export const firstVisitTimeline = [
  {
    heading: 'Before you arrive',
    body: 'Book online or on WhatsApp and tell us your main concern, and whether you are pregnant. Wear loose, comfortable clothing, and bring any previous X-rays, MRI scans or doctor’s reports, plus a list of medications you take.',
  },
  {
    heading: 'When you arrive',
    body: 'Come 5 to 10 minutes early to fill in a short health form without rushing. You are welcome to bring a partner, parent or friend into the room.',
  },
  {
    heading: 'History',
    body: 'Your chiropractor asks where it hurts, how it started, what makes it better or worse, and what it has stopped you doing, along with your general health and past injuries.',
  },
  {
    heading: 'Examination',
    body: 'They look at how you stand and move, take nervoscope readings along your spine, and feel each spinal and pelvic joint to find the ones not moving as they should. You stay in your clothes, and a gown is offered if your back needs to be seen.',
  },
  {
    heading: 'X-ray, where it is indicated',
    body: 'Many patients have a spinal X-ray to rule out anything that would change the plan and to show the joints themselves. It is not done for everyone, and it is avoided in pregnancy and for children unless there is a clear reason.',
  },
  {
    heading: 'Findings and a plan',
    body: 'Your chiropractor explains what they found in plain language, what is realistic, and what they suggest next. You can take time to think it over before booking anything further.',
  },
  {
    heading: 'Your first adjustment',
    body: 'If it is appropriate and you agree, you are adjusted, usually lying on a padded adjusting table or seated on an adjusting chair. You may hear a click. If the findings point elsewhere, you are referred rather than adjusted.',
  },
  {
    heading: 'Afterwards',
    body: 'Mild soreness for a day is common. The aftercare tips below cover what helps, and you can message us with any questions once you are home.',
  },
] as const

const firstVisitQuickAnswerByLocale: Record<Locale, string | null> = {
  en: firstVisitQuickAnswer,
  zh: null,
  ms: null,
}
const firstVisitTimelineByLocale: Record<Locale, readonly { heading: string; body: string }[]> = {
  en: firstVisitTimeline,
  zh: [],
  ms: [],
}
export const firstVisitQuickAnswerFor = (locale: Locale) => firstVisitQuickAnswerByLocale[locale]
export const firstVisitTimelineFor = (locale: Locale) => firstVisitTimelineByLocale[locale]
export const firstVisitTimelineTitleFor = (locale: Locale) =>
  locale === 'en' ? firstVisitTimelineTitle : null

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
