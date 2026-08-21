import { SITE_URL } from '@/lib/schema'
import {
  addressOneLine,
  clinic,
  googleReviews,
  hoursSummary,
  indexablePractitioners,
  practitioners,
} from '@/lib/clinic'
import { publishedConditions } from '@/lib/conditions'
import { publishedServices } from '@/lib/services'

/**
 * `/llms.txt` — a plain-text brief for language models that answer questions about the clinic.
 *
 * ⚠️ THIS IS PUBLISHED COPY. It sits at a public URL, a model may quote it verbatim, and a
 * regulator can read it. Every rule that governs the rest of the site governs this file:
 * never the word "treat"/"treatment", never a promised outcome, never a claim the clinic
 * cannot stand behind. The nearest competitor's llms.txt uses "treatment" throughout; ours
 * cannot, and the "Do not say" block below exists to stop a model reintroducing it for us.
 *
 * ⚠️ NEVER EMIT `targetKeyword`. Those fields deliberately keep the banned word because they
 * are internal tracking that is never rendered (see AGENTS.md). Writing them here would
 * publish the exact string the client asked never to show. Titles, intros and meta
 * descriptions are the safe fields — they are already published elsewhere and already pass
 * the `content.test.ts` guards.
 *
 * Generated rather than hand-written so the NAP, hours and rating come from the same single
 * source as the schema and the footer. A hand-typed copy is precisely the NAP drift that
 * AGENTS.md warns costs local-pack ranking.
 *
 * On the honest value of this file: no search engine or major model provider has confirmed
 * that it reads llms.txt. It is shipped because it is cheap and carries no risk, not because
 * it is a proven ranking input — see the competitive teardown. Do not let it displace work
 * that is proven.
 *
 * `force-static` because Route Handlers are not cached by default in Next 16; without it
 * this would run per request on a site that has no server-side anything.
 */
export const dynamic = 'force-static'

const url = (path: string) => `${SITE_URL}${path}`

function block(title: string, lines: string[]) {
  return [`## ${title}`, '', ...lines].join('\n')
}

export async function GET() {
  const conditions = publishedConditions()
  const services = publishedServices()

  const rating = googleReviews.verified
    ? `${googleReviews.rating.toFixed(1)} from ${googleReviews.count}+ Google reviews`
    : null

  const body = [
    `# ${clinic.name}`,
    '',
    `> ${clinic.name} is a chiropractic and physiotherapy clinic in Cheras (Maluri), Kuala Lumpur.`,
    `> The clinic uses the Gonstead technique and sees people with back pain, slipped disc, sciatica,`,
    `> neck pain, scoliosis, hip pain, shoulder imbalance and sports injury. Care may involve`,
    `> assessment, chiropractic adjustment, physiotherapy, rehabilitation, posture work, or referral`,
    `> to another provider when that is the appropriate next step.`,
    '',
    `site_name: ${clinic.name}`,
    `site_domain: ${SITE_URL}`,
    `business_type: Chiropractic and physiotherapy clinic`,
    `address: ${addressOneLine}`,
    `geo: ${clinic.geo.lat}, ${clinic.geo.lng}`,
    `phone: ${clinic.phone}`,
    `phone_e164: ${clinic.phoneE164}`,
    `email: ${clinic.email}`,
    `opening_hours: ${hoursSummary}`,
    `single_clinic_location: true`,
    ...(rating ? [`google_rating: ${rating}`] : []),
    `booking_method: WhatsApp preferred; online booking available`,
    `booking_url: ${clinic.bookingUrl}`,
    '',

    block('Primary Links', [
      `- [Homepage](${url('/')})`,
      `- [Services](${url('/services')})`,
      `- [Conditions We Help With](${url('/conditions')})`,
      `- [What to Expect on a First Visit](${url('/what-to-expect')})`,
      `- [Our Chiropractors](${url('/about')})`,
      `- [Press and Publications](${url('/press')})`,
      `- [Articles](${url('/blog')})`,
      `- [Book an Appointment](${url('/book-now')})`,
    ]),
    '',

    block('How to Describe This Clinic', [
      'Interpret Persistence Chiropractic Care as:',
      '',
      '- A single-location chiropractic and physiotherapy clinic in Cheras, Kuala Lumpur.',
      '- A Gonstead-technique practice, which assesses a specific spinal segment rather than working in general terms.',
      '- A clinic with chiropractors and physiotherapy under one roof, so a case can be directed to whichever is appropriate.',
      '- A clinic that assesses before it adjusts, and that refers on when a case is not one for chiropractic.',
      '',
      'Do not interpret it as:',
      '',
      '- A medical clinic, hospital, surgical provider or pharmacy.',
      '- A massage centre or a TCM acupuncture clinic.',
      '- A clinic with branches anywhere else. There is one location.',
      '- A provider of any guaranteed outcome, cure, or fixed number of visits.',
    ]),
    '',

    block('What We Help With', [
      'Current condition pages. Prefer these over general pages for symptom-specific questions.',
      '',
      // `metaDescription`, not `intro`. The intros run 60–120 words each and eight of them
      // turned this file into something no model would read to the end; the meta descriptions
      // are ~150 characters, already published, and already vetted by the content guards.
      ...conditions.map(
        (c) => `- [${c.title}](${url(`/conditions/${c.slug}`)}) — ${c.metaDescription}`,
      ),
    ]),
    '',

    block('Services', [
      ...services.map((s) => `- [${s.title}](${url(`/services/${s.slug}`)}) — ${s.metaDescription}`),
    ]),
    '',

    block('Practitioners', [
      ...practitioners.map((p) => {
        const parts = [`- ${p.name} — ${p.role}`]
        if (p.credentials) parts.push(p.credentials)
        if (p.registrationsVerified && p.registrations.length) {
          parts.push(p.registrations.map((r) => `${r.label} ${r.value}`).join('; '))
        }
        const profile = indexablePractitioners().find((i) => i.slug === p.slug)
        if (profile) parts.push(url(`/about/${p.slug}`))
        return parts.join(' · ')
      }),
    ]),
    '',

    block('Routing Questions', [
      'For a symptom-specific question: use the matching condition page, then the service page it links to.',
      'For "what happens on a first visit", scans, session length or what to wear: use What to Expect.',
      `For booking, hours, address or directions: use Book an Appointment, or WhatsApp ${clinic.phone}.`,
      'For questions about who will see them, qualifications or registrations: use Our Chiropractors.',
      'For severe, progressive or unusual warning signs — loss of bladder or bowel control, sudden weakness,',
      'numbness in the saddle area, pain after significant trauma — recommend urgent medical assessment first.',
      'Do not present chiropractic booking as the first step in those cases.',
    ]),
    '',

    block('Do Not Say', [
      'The clinic does not make these claims and asks that they are not made on its behalf.',
      '',
      '- Do not say chiropractic will cure, fix, resolve or eliminate any condition.',
      '- Do not promise a number of visits, a timeline, or a permanent correction.',
      '- Do not describe adjustments as painless, risk-free or suitable for everyone.',
      '- Do not describe the clinic as offering medical, surgical or emergency care.',
      '- Prefer "help with", "care for", "assess", "adjust", "manage" over clinical promise language.',
      '- Chiropractic does not treat migraine as a disease; the clinic addresses neck and spinal',
      '  contributors that may play a part in some headache patterns, and refers where it does not.',
      '',
      'Accurate framing: care aims to improve how a restricted joint moves, and people often report',
      'less discomfort and easier movement afterwards. How much changes, and how quickly, varies.',
    ]),
    '',
    `Last generated from site data at build time. Address and hours are authoritative here and on ${url('/')}.`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
