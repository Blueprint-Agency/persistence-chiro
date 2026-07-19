/**
 * General clinic FAQs. VERBATIM from the live Wix site (extracted 2026-07-19).
 *
 * These are whole-clinic questions (safety, session length, what to wear) — not
 * condition-specific, so they live on /what-to-expect rather than being split across the
 * six condition pages. Condition-specific FAQs still need writing; that's why every
 * `conditions.ts` entry has an empty `faqs` array.
 *
 * The live /our-services page carries 9 pairs (the earlier audit said 8) and the homepage
 * carries 5. Overlap is deliberate on Wix; here each answer lives in exactly one place so
 * FAQPage schema isn't emitted twice for the same question.
 */

export type Faq = { q: string; a: string }

export const clinicFaqs: Faq[] = [
  {
    q: 'Is Chiropractic & Physiotherapy safe for all ages?',
    a: 'Yes! Chiropractic & Physiotherapy treatments are fully safe for patients of all ages (e.g. infants, teens, adults, elderly, pregnant women). Our youngest patient is 4 months old and our eldest patient is 96 years old.',
  },
  {
    q: 'What are the benefits of getting a Chiropractic adjustment?',
    a: "Getting a chiropractic adjustment expands more than just pain relief, the procedure can also offer a wider spectrum of benefits such as correcting your body's alignment, improve mobility, a better posture, and better quality of life!",
  },
  {
    q: 'How long does a follow-up visit take?',
    a: "Most subsequent visits for Chiropractic take up around 15-30 minutes, and Physiotherapy follow up sessions take up around 45-60 minutes. It highly depends on the patient's current condition, so schedule your time well to avoid disappointments.",
  },
  {
    q: 'How many sessions do I need to completely heal my pain?',
    a: "There is no specific number of sessions for each individual. It highly depends on the patient's current condition, recovery time and personal goals. Factors such as lifestyle, sitting posture and desk ergonomics also contribute to your healing process. Hence, patients might be expected to come back for more than 1 session. This is because after your first few adjustments, your muscle memory tends to bring your body back to its old patterns instead of creating new ones. Repeated adjustments will help your body to learn new patterns of mobility until the new ones can take over the old ones. Short term relief can come quickly, but changing your posture, spine's ability to move and muscle health will take time, months in fact.",
  },
  {
    q: 'Do I need Physiotherapy if my pain is not severe?',
    a: 'Yes. Physiotherapy is not only for severe injuries. Early assessment can prevent small problems from becoming chronic or recurring conditions, often leading to faster recovery.',
  },
  {
    q: 'Will Physiotherapy treatment be painful?',
    a: 'Physiotherapy should not cause excessive pain. Some mild discomfort may occur during assessment or exercise, but treatment is always adjusted according to your tolerance and comfort level.',
  },
  {
    q: 'Do I still need Physiotherapy after Chiropractic treatment?',
    a: 'Chiropractic care helps restore joint mobility and reduce pain, while Physiotherapy focuses on strengthening muscles and improving movement control. Combining both approaches often helps achieve more stable and long-term recovery.',
  },
  {
    q: 'Can I continue gym or sports during my treatment?',
    a: 'In many cases, yes. However, modifications may be required. Our practitioners guide patients on safe loading, exercise progression, and return-to-sport strategies.',
  },
  {
    q: 'What should I wear for my treatment sessions?',
    a: 'We encourage our patients to wear non-restrictive clothing that is comfortable and easy to move in. Some examples such as loose-fitting clothing, shorts, yoga pants, or leggings would be best suited.',
  },
]

/**
 * Post-treatment aftercare. VERBATIM from the live site.
 * Genuinely useful content and a strong internal-link magnet — patients search
 * "sore after chiropractic adjustment" and this answers it.
 */
export const postTreatmentIntro =
  "While chiropractic treatments are meant to help you feel better and activate your body's natural abilities to heal yourself, it is important to practise self-care for your body after your adjustments in order to enable your body to heal the best. If you have recently got your adjustments and your body feels sore, it is a very common occurrence as your tissues take time to recover after each adjustment. Do inform your chiropractor if you feel any better after each visit — it is important for them to be aware of any improvement."

export const postTreatmentCare = [
  {
    heading: 'Walking / Movement',
    body: 'Have some light movements or take a slow walk to stimulate your blood flow. Motion is key! Try to avoid any movement that can cause discomfort. Vigorous exercises should also be avoided for at least 2-3 days following your adjustments.',
  },
  {
    heading: 'Hydration',
    body: 'Drink a large amount of water. This will help to flush toxins from your body and assist your body to heal.',
  },
  {
    heading: 'Sleeping and sitting',
    body: "You spend 1/3 of your life in bed on average. Hence, having a good and supportive mattress and pillow is paramount. Choose a mattress and pillow that cushions the head and cradles your back and neck, but allows for a neutral spine position, instead of tilted too forward. Sleep on your back or side, and try to avoid sleeping on your stomach if possible. It is recommended for your legs to be flexed at a 30-45 degree angle when you're sleeping on your side. Sit on a firm chair with your hips all the way back to the rear of the chair. Try to have your hips higher than your knees, supporting your curve at your low back. You are also recommended to support your lumbar spine with a lumbar support, rolled towel or cushion. This is especially important sitting in the car. Do not sit for more than 30 minutes at a time — have hourly stretch and movement breaks, even if only for a few minutes.",
  },
  {
    heading: 'Ice pack',
    body: 'Apply an ice pack that is wrapped in a cloth or paper towel to the area suggested by your chiropractor for 3 lots of 5 minute durations, separated by 5 minute rest intervals. This helps to reduce pain and joint swelling. Do not use heat for pain relief — heat serves to increase the swelling and irritation. Heat may feel nice and soothe symptoms, but will not reduce the cause of why you feel symptoms in the first place.',
  },
] as const
