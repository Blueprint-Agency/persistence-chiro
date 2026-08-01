/**
 * REAL Google reviews for Persistence Chiropractic Care.
 *
 * Supplied by the client on 2026-08-01 from the clinic's own Business Profile, and captured
 * verbatim. This file replaces `sample-reviews.ts`, which held fabricated placeholders and
 * was deleted rather than emptied — a file named "sample" sitting next to a file named
 * "reviews" is an invitation to import the wrong one.
 *
 * ⚠️ VERBATIM MEANS VERBATIM. Do not tidy these.
 *
 * Five of them contain "treatment" and most carry a "Dr" title, both of which are banned in
 * the clinic's OWN copy (see AGENTS.md). That ban governs what the clinic says about itself.
 * These are quotations of what patients wrote, on a public listing, under their real names —
 * editing them to fit house style would misrepresent a named person's words, which is a
 * worse problem than the one it solves. Same carve-out as the academic citations in the blog
 * posts. Flagged to the client rather than silently applied.
 *
 * Reviewer names are as they appear publicly on Google. No emails, no anything else.
 *
 * TO ADD MORE: copy them from the Business Profile dashboard, verbatim, with the reviewer's
 * display name and an approximate date. Do not write one yourself, ever.
 */

export type Review = {
  /** Reviewer's public Google display name. */
  name: string
  /** Avatar background — Google-style coloured circle behind the initial. Brand palette. */
  color: string
  /**
   * Approximate review date, ISO.
   *
   * DERIVED from the relative label Google showed on 2026-08-01 ("3 weeks ago" and so on),
   * so each is accurate to within a few days — good enough for a "3 weeks ago" caption and
   * not presented as anything more precise. Stored as a date rather than as the label itself
   * so the caption is recomputed at build time; a hardcoded "3 weeks ago" is wrong within a
   * month and visibly stale within three.
   */
  date: string
  /** BCP-47 tag, when the review is not in English. Drives `lang` on the quote. */
  lang?: string
  body: string
}

export const reviews: Review[] = [
  {
    name: 'Hishamuddin Badaruddin',
    color: '#17364a',
    date: '2026-04-11',
    body: 'As a medical doctor, I myself, like my fellow doctors, am usually my very own worst patient. I came to see DC Valerie with a back pain which I should have sorted out weeks ago. I was in KL for a short day trip and decided to get treatment as I had the afternoon free. I initially contacted another chiropractic clinic who did not have any slots open but recommended Dr Valerie. Well Dr Valerie is knowledgeable - diagnosed my scoliosis and that my right shoulder pain was due to my mid-thoracic region and that my back pain was due to other issues. Highly recommended and worth it! Need several sessions and self awareness for posture and flexibility - and back strengthening.',
  },
  {
    /**
     * The only review naming Rynn Hoh, which is why it sits this high. The other six are
     * Valerie (four), Kee Shan (one) and the paediatric one, and a wall of reviews about a
     * single practitioner reads oddly for a three-chiropractor clinic.
     *
     * Verbatim, bar the four paragraph breaks joined into one run for the clamped card. It
     * says "treatment" twice and "Dr. Rynn", both banned in the clinic's own copy, and it
     * makes a stronger outcome statement than the rest ("instant relief"). That is the
     * patient's account of their own visit rather than a claim the clinic is making, and
     * rewriting a named person's public words to fit house style is the worse option.
     */
    name: 'Shamil Ataev',
    color: '#1c4c53',
    date: '2026-06-20',
    body: 'I cannot recommend Dr. Rynn enough! He\'s incredibly smart, warm, and welcoming, which instantly put me at ease. What really set Dr. Rynn apart was how amazing he was at explaining everything. He broke down exactly what was going on with my spine and walked me through the entire treatment plan so I never felt left in the dark. The best part? I was able to get my consultation and treatment done all on the same day. The adjustment itself was fantastic, and I felt instant relief in my lower back the moment it was done. It’s rare to find a practitioner who combines top-tier expertise with such a great bedside manner. If you are looking for a skilled, compassionate, and efficient chiropractor, do yourself a favor and see Dr. Rynn. I would highly recommend him to anyone and everyone!',
  },
  {
    /**
     * ⚠️ PUBLISHED ON THE CLIENT'S EXPLICIT INSTRUCTION, 2026-08-01, against my advice. Do
     * not remove it without asking them, and do not add anything like it without asking.
     *
     * Two things were put to them before it went in. It is an outcome claim about a child
     * ("has become more responsive") in the most heavily scrutinised corner of chiropractic
     * advertising anywhere. And republishing it has the clinic adopting a paediatric
     * specialism claim its own site never makes — there is no paediatric qualification on
     * Valerie's profile in clinic.ts, so nothing on the site substantiates the sentence.
     *
     * A verbatim quotation is still the clinic choosing to publish it on its own site. If
     * anyone ever queries it, this is a client decision and the clinic itself should have
     * signed it off, not only the agency.
     *
     * The author's paragraph break is the one thing not preserved — the two paragraphs are
     * joined with a space because the card clamps to four lines. No wording is altered, and
     * "Read more" goes to the full review on Google.
     */
    name: 'A C',
    color: '#5b4c06',
    date: '2026-07-11',
    body: 'We brought our daughter here for chiropractic adjustments, and we’ve seen encouraging progress. She has become more responsive, and it has honestly changed the way we think about pediatric chiropractic care. We’re so glad we followed their recommendation to see Dr. Valerie, who specializes in pediatric chiropractic. Thank you for your care and dedication!',
  },
  {
    name: 'Yit Yew Fei',
    color: '#2a6a73',
    date: '2026-07-11',
    lang: 'zh',
    body: '正规的chiropractic clinic不多，Persistence算一个。5 stars给Kee Shan，手法利落不啰嗦，几次调整下来肩颈松了很多。值得信赖的专业度。',
  },
  {
    name: 'Kah Mun Wong',
    color: '#2b5672',
    date: '2026-07-25',
    body: 'My back felt much better after receiving treatment from Dr Valerie. She is also very helpful in giving advice on workouts or ways to take care of my back. Highly recommended!',
  },
  {
    name: 'Wong Xi Rong',
    color: '#7d6407',
    date: '2026-07-18',
    body: 'Have been doing chiro session with Dr Valerie since 2022. She is very professional, trustable and understanding.',
  },
  {
    name: 'Zu En Chiang',
    color: '#4a7594',
    date: '2026-07-04',
    body: 'I have a great experience with Valerie, she is patient and professional. She took the time to explain my condition clearly, listened to my concerns, and made sure I felt comfortable before starting any treatment.',
  },
]

/**
 * "3 weeks ago", the way Google captions a review.
 *
 * Computed at BUILD time from `date`, so a redeploy refreshes every caption. It still ages
 * between deploys — a site left untouched for six months will understate every review's age
 * — which is a fair trade against hardcoded labels that are wrong within a month.
 *
 * `now` is injected rather than read inside, so this stays a pure function.
 */
export function relativeDate(iso: string, now: Date): string {
  const days = Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 86_400_000))
  if (days < 7) return days <= 1 ? 'this week' : `${days} days ago`
  const weeks = Math.round(days / 7)
  if (days < 56) return weeks === 1 ? 'a week ago' : `${weeks} weeks ago`
  const months = Math.round(days / 30)
  if (months < 12) return months === 1 ? 'a month ago' : `${months} months ago`
  const years = Math.round(days / 365)
  return years === 1 ? 'a year ago' : `${years} years ago`
}
