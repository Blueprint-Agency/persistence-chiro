/**
 * Service pages — modality-first, commercial intent ("dry needling near me").
 *
 * Replaces the old `physiotherapy.ts`. The proposal (`seo-proposal.html`, Cycle 1 Pages
 * tab) specifies five service pages under a single `/services/*` namespace rather than the
 * previous split between a standalone `/chiropractic` page and four `/physiotherapy/*`
 * modality pages. Seven live Wix services had already been folded to four; those four now
 * fold to five alongside chiropractic:
 *
 *   /chiropractic                      -> /services/chiropractic-treatment
 *   /physiotherapy                     -> /services/physiotherapy
 *   /physiotherapy/dry-needling        -> /services/dry-needling
 *   /physiotherapy/sports-rehab        -> /services/sports-injury-rehabilitation
 *   /physiotherapy/manual-therapy      -> folded into /services/physiotherapy
 *   /physiotherapy/rehab-programming   -> folded into /services/sports-injury-rehabilitation
 *   /conditions/sports-injury          -> folded into /services/sports-injury-rehabilitation
 *   (new)                              -> /services/posture-correction
 *
 * manual-therapy and rehab-programming have no slot in the proposal's five, and neither
 * had enough distinct search intent to justify keeping a thin page alive. Their section
 * copy folds in verbatim so nothing is lost — same approach as the original Wix fold-down.
 *
 * Sports injury moves from a *condition* to a *service*. The proposal lists it under
 * services and its eight conditions do not include it; keeping both would have put two
 * pages on one intent, which is the cannibalisation the architecture exists to prevent.
 *
 * CLAIM RULE: no page here may promise a cure, fix or guaranteed outcome. Enforced by
 * `content.test.ts`. See the hedging house style in `conditions.ts`.
 */

export type Service = {
  slug: string
  /** <h1>. Must be unique across the site. */
  title: string
  /** <title>. Keep under ~60 chars so it isn't truncated in the SERP. */
  metaTitle: string
  metaDescription: string
  /** Primary keyword this page owns. No two pages may share one. */
  targetKeyword: string
  /** Lead paragraph under the h1. */
  intro: string
  /**
   * Hero and mid-page imagery. The four templated pages shipped with no images at all,
   * which read as a brochure; a photo carries the conversion layout. No service-specific
   * photos exist yet, so these reuse honest generic clinic/assessment shots — the alt text
   * must describe what is actually in the frame, never the service being sold.
   */
  heroImage?: { src: string; alt: string }
  /**
   * Benefit-framed reasons people come in for this service. Describes the concern, never
   * promises an outcome (no-medical-promises rule) — "tension that builds up at a desk",
   * not "we fix your tension". Rendered as a scannable "what we help with" block.
   */
  outcomes?: string[]
  /**
   * Concern checkboxes for the "Is this right for you?" qualifier — the reader ticks what
   * applies and the component builds a prefilled WhatsApp message. Phrase each as a symptom
   * or situation, not a diagnosis.
   */
  qualifierConcerns?: string[]
  /** Service blocks. First one is the page's primary service. */
  sections: { heading: string; body: string }[]
  /** Condition slugs this service is used for — the cross-link back into /conditions. */
  treats: string[]
  /**
   * In-context internal links rendered as a button row under the sections — descriptive
   * anchor text into other services/pages. Optional; the chiropractic dedicated route
   * hard-codes its own equivalent. Keeps service pages internally linked without putting
   * markup inside the plain-text section bodies.
   */
  relatedLinks?: { href: string; label: string }[]
  faqs: { q: string; a: string }[]
  /**
   * True when the service has a hand-built route file instead of rendering through
   * app/services/[slug]/page.tsx. Only chiropractic-treatment does: it carries the
   * Gonstead six-step walkthrough, which is a bespoke layout rather than section blocks.
   * Excluded from generateStaticParams so the two routes can't collide at build time.
   */
  dedicatedRoute?: boolean
  draft: boolean
}

export const servicesIntro =
  'Chiropractic care, physiotherapy and targeted rehabilitation under one roof in Cheras. Which one suits you depends on what the assessment finds. A fair number of patients end up having both, and we will tell you where to start on your first visit.'

export const services: Service[] = [
  {
    slug: 'chiropractic-treatment',
    title: 'Chiropractic Treatment in Cheras, Kuala Lumpur',
    metaTitle: 'Chiropractic Treatment in Cheras, KL | Persistence',
    metaDescription:
      'Gonstead chiropractic in Cheras, Maluri. Detailed spinal assessment and precise hands-on adjustment for bone and body alignment.',
    targetKeyword: 'bone alignment near me',
    intro:
      'Gonstead chiropractic care in Cheras. We assess the spine segment by segment before anything is adjusted, so treatment goes to whichever segment is actually driving your problem. That is not always where you feel it.',
    outcomes: [
      'Back, neck or joint pain you want assessed segment by segment',
      'A recurring problem you would like to understand, not just mask',
      'A precise adjustment rather than a general crack',
      'Wanting to know whether the Gonstead approach suits your case',
    ],
    qualifierConcerns: [
      'I have back, neck or joint pain',
      'My problem keeps returning',
      'I want to understand what is actually driving it',
      'I am curious whether chiropractic suits my case',
      'I am pregnant or bringing a child and want a gentle assessment',
    ],
    sections: [
      {
        heading: 'Gonstead spinal assessment',
        body: 'A full six-step analysis: history, visualisation, instrumentation, palpation, X-ray analysis where indicated, and only then adjustment. Working through it in that order narrows the search down before any force is applied.',
      },
      {
        heading: 'Hands-on spinal adjustment',
        body: 'Adjustments are delivered precisely and skilfully by hand only, targeted at the specific segment identified during assessment. What one patient gets is rarely what the next one gets, because the assessments come out differently.',
      },
      {
        heading: 'Bone and body alignment',
        body: 'Where segments have become restricted, adjustment aims to improve how well they move. How much changes, and over what period, depends on what is causing the restriction and how long it has been there.',
      },
    ],
    treats: ['back-pain', 'slipped-disc', 'sciatica', 'neck-pain', 'scoliosis'],
    faqs: [
      {
        q: 'What is the Gonstead method?',
        a: 'Gonstead is a chiropractic technique built around a detailed six-step assessment before any adjustment is made. That includes instrumentation and, where indicated, X-ray analysis. The aim is to identify precisely which segment is involved rather than treating the region generally.',
      },
      {
        q: 'Do I need an X-ray before chiropractic treatment?',
        a: 'Not always. X-rays help identify how each spinal segment sits and can rule out pathologies, but they are not mandatory, and we often go without one for pregnant women and children. Your chiropractor will explain whether imaging is appropriate in your case and why.',
      },
      {
        q: 'Is chiropractic the same as bone setting or tit tar?',
        a: 'No. Chiropractic is a regulated healthcare profession with formal university training, and assessment comes before treatment. Traditional bone setting works differently and is not regulated in the same way. We would encourage you to ask any practitioner about their qualifications before treatment.',
      },
    ],
    dedicatedRoute: true,
    draft: false,
  },
  {
    slug: 'dry-needling',
    title: 'Integrative Dry Needling in Cheras, Kuala Lumpur',
    metaTitle: 'Dry Needling in Cheras, KL | Persistence Chiropractic',
    metaDescription:
      'Integrative dry needling in Cheras, Maluri to release deep muscle tension and trigger points. Assessment first, single use needles, honest expectations.',
    targetKeyword: 'dry needling near me',
    intro:
      'Dry needling in Cheras. A neuromuscular technique that uses fine needles to reach trigger points and bands of muscular tension which are difficult to release by hand alone.',
    heroImage: {
      src: '/img/first-visit-consultation.webp',
      alt: 'A practitioner talking through an assessment before treatment at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    outcomes: [
      'Tight, knotted muscles that do not release with stretching or massage',
      'Deep muscular tension linked to neck, shoulder or lower back trouble',
      'Trigger points that keep referring pain to the same spot',
      'Muscles that stay guarded and overactive after an old injury',
    ],
    qualifierConcerns: [
      'I have a muscle knot that will not release',
      'Massage helps for a day, then the tightness comes back',
      'My neck or shoulders feel constantly tense',
      'An old injury left a muscle feeling tight and overactive',
      'I have had dry needling before and it helped',
      'I am nervous about needles and want to ask first',
    ],
    sections: [
      {
        heading: 'Integrative dry needling',
        body: 'Dry needling is a neuromuscular technique that uses fine, single use needles to reach trigger points and tight bands of muscle that are difficult to release by hand alone. We use it as part of a treatment plan rather than on its own, and only where the assessment points to muscle as the thing driving your problem.',
      },
      {
        heading: 'What dry needling actually does',
        body: 'A trigger point is a small, irritable knot within a tight band of muscle that can refer pain to other areas. A fine needle placed into that point often produces a brief involuntary twitch, which is the muscle letting go. The aim is to ease the tension, settle the local irritation and give the muscle room to move more normally again. How much it helps, and for how long, varies from person to person and depends on what is keeping the muscle tight in the first place.',
      },
      {
        heading: 'What a session involves',
        body: 'We assess the area first to work out which muscles are involved, then place fine needles into the points identified. Most patients describe a brief twitch or a dull ache rather than sharp pain. A session usually takes fifteen to thirty minutes depending on how much we are treating, and the needling is only part of it. What we find often shapes the exercise or hands on work we pair it with.',
      },
      {
        heading: 'Is it safe, and what to expect afterwards',
        body: 'Dry needling is generally very safe when it is carried out by a trained practitioner. We use sterile, single use needles that are disposed of after one session and never reused. Mild soreness, and occasionally a small bruise, for a day or so afterwards is common and settles on its own. Tell your practitioner if you are pregnant, take blood thinners or have a strong fear of needles, because there are situations where we would choose not to needle and use another approach instead.',
      },
      {
        heading: 'How it works with the rest of your treatment',
        body: 'Needling releases tension, but on its own it does not change the habit or weakness that let the muscle tighten, which is why we rarely use it alone. Under one roof in Cheras we combine it with chiropractic care and physiotherapy, and the assessment decides where to start. For some people needling comes first to calm things down, and for others the strength work matters more.',
      },
      {
        heading: 'How many sessions you might need',
        body: 'This depends on how long the problem has been there and what is driving it, so we will not give you a fixed number at the first visit. Some people notice a change quickly, while others need the muscle work supported over several weeks alongside exercise. We would rather review honestly as we go than sell you a package up front.',
      },
    ],
    treats: ['back-pain', 'neck-pain', 'shoulder-imbalance', 'sciatica'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: 'How dry needling fits with physiotherapy' },
      { href: '/services/chiropractic-treatment', label: 'Compare with chiropractic care' },
      { href: '/what-to-expect', label: 'What to expect on your first visit' },
    ],
    faqs: [
      {
        q: 'Is dry needling the same as acupuncture?',
        a: 'They use similar needles but come from different traditions. Dry needling is based on Western anatomy and targets specific trigger points in muscle, whereas acupuncture follows traditional Chinese meridian theory and treats points chosen on a different basis. The needles look alike, but what we are aiming at is not the same.',
      },
      {
        q: 'Does dry needling hurt?',
        a: 'Most patients report a brief twitch response or a dull ache rather than sharp pain. Mild soreness afterwards is common and usually settles within a day. Tell your practitioner if anything feels worse than uncomfortable, because the technique can be adjusted or stopped.',
      },
      {
        q: 'How many sessions of dry needling will I need?',
        a: 'It depends on how long the muscle has been tight and what is keeping it that way, so we will not commit to a number on your first visit. Some people notice a change quickly, while others need the work supported over several weeks alongside exercise. We review as we go rather than sell a fixed package.',
      },
      {
        q: 'Are the needles safe, and are they reused?',
        a: 'Needles are never reused. We use sterile, single use needles that are disposed of after one session. Dry needling is generally very safe in trained hands, though mild soreness or a small bruise afterwards is possible and normal.',
      },
      {
        q: 'Should I have dry needling or a chiropractic adjustment?',
        a: 'It depends on what the assessment finds, and the two are often used together rather than as alternatives. Broadly, needling addresses tight, irritable muscle while an adjustment addresses how a spinal joint moves. If you are unsure, message us your main concern and we will point you to the right starting point.',
      },
    ],
    draft: false,
  },
  {
    slug: 'physiotherapy',
    title: 'Physiotherapy in Cheras, Kuala Lumpur',
    metaTitle: 'Physio in Cheras, KL | Persistence Chiropractic',
    metaDescription:
      'Physiotherapy in Cheras, Maluri. Hands on manual therapy, movement assessment and corrective exercise, alongside chiropractic care under one roof.',
    targetKeyword: 'physio cheras',
    intro:
      'Physiotherapy in Cheras, pairing hands-on treatment with corrective exercise. Once a joint is moving more freely, the exercise work aims to rebuild the strength and control that help keep it that way.',
    heroImage: {
      src: '/img/consultation-assessment.webp',
      alt: 'A practitioner assessing a patient posture and movement at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    outcomes: [
      'Pain or stiffness that limits how you move through the day',
      'A recent strain or flare-up you want assessed properly',
      'A long-standing problem that keeps returning',
      'Weakness or poor control after an injury or time off',
      'Exercises that actually fit your problem, not a generic sheet',
    ],
    qualifierConcerns: [
      'I have pain or stiffness that limits daily activities',
      'My problem keeps coming back',
      'I want exercises tailored to my specific issue',
      'I am recovering from an injury and feel weak or unsteady',
      'I am not sure whether I need physio or chiropractic',
    ],
    sections: [
      {
        heading: 'Physiotherapy in Cheras',
        body: 'Physiotherapy in Cheras, pairing hands on treatment with corrective exercise. We assess how you move before we treat, so the work goes to whatever is actually driving the problem rather than only the spot that hurts. Once a joint is moving more freely, the exercise aims to rebuild the strength and control that help keep it that way.',
      },
      {
        heading: 'Precision manual therapy',
        body: 'Refined hands on techniques, including joint mobilisation and myofascial release, aimed at improving how a joint moves and easing pain with precision. Manual therapy tends to work best as a way in rather than the whole plan. It can settle things enough that the active work becomes possible, and what we use depends on what the assessment finds.',
      },
      {
        heading: 'Movement, gait and biomechanical assessment',
        body: 'A detailed look at posture, gait and how you move under load, so we can identify what is contributing to the problem rather than only where you feel it. Pain in one place often traces back to how something else is moving, and treating the sore spot alone tends to let it return. Where footwear or orthotics are relevant, we look at those too.',
      },
      {
        heading: 'Corrective exercise programming',
        body: 'Progressive plans built around your condition, goals and daily life. Most of the lasting change tends to come from the exercise, which is why we prescribe it properly rather than hand you a generic sheet. The programme starts small, and we adjust it as you get stronger so it stays matched to what you can actually manage between visits.',
      },
      {
        heading: 'What your first physiotherapy session involves',
        body: 'The first visit is mostly assessment. We ask about your history, what aggravates and eases the problem and what you need to get back to, then examine how you move and test the area. Hands on treatment usually follows, along with the first few exercises to take home. A session generally runs around forty five minutes to an hour, and you should leave understanding what we think is going on and what the plan is.',
      },
      {
        heading: 'Physiotherapy or chiropractic, and how we combine them',
        body: 'Broadly, chiropractic care works on how a restricted joint moves, while physiotherapy works on the strength and control around it. Neither is better in the abstract, and many people benefit from both. Under one roof in Cheras we also offer dry needling, and the assessment decides where to start. If you are not sure which you need, message us your main concern and we will point you to the right starting point.',
      },
    ],
    treats: ['back-pain', 'slipped-disc', 'neck-pain', 'sciatica', 'scoliosis'],
    relatedLinks: [
      { href: '/services/chiropractic-treatment', label: 'Compare with chiropractic care' },
      { href: '/services/sports-injury-rehabilitation', label: 'Sports injury and rehabilitation' },
      { href: '/what-to-expect', label: 'What to expect on your first visit' },
    ],
    faqs: [
      {
        q: 'Is the first physiotherapy session painful?',
        a: 'It should not be excessively painful. Some tests may briefly reproduce your familiar symptoms so we can pin down the problem, but your physiotherapist works within your comfort level and will stop if you ask. Mild soreness for a day afterwards can happen, particularly after hands on work.',
      },
      {
        q: 'How many physiotherapy sessions will I need?',
        a: 'It depends on the problem, how long it has been there and how the exercise progresses, so we will not give you a fixed number at the first visit. Assessing early often means fewer sessions than leaving a problem to become chronic. We review honestly as we go rather than sell a package up front.',
      },
      {
        q: 'Do I need a doctor referral to see a physiotherapist?',
        a: 'No referral is needed to book with us. If your case needs imaging or a medical opinion first, we will tell you and help you arrange it rather than press on regardless.',
      },
      {
        q: 'Will I get exercises to do at home?',
        a: 'Yes, in most cases. The exercise is where a lot of the lasting change tends to come from, so we prescribe a small, specific programme and progress it as you improve. It is designed to fit into a normal day rather than take over your evening.',
      },
      {
        q: 'Should I see a chiropractor or a physiotherapist?',
        a: 'It depends what the assessment finds. Broadly, chiropractic care works on how a restricted joint moves and physiotherapy works on the strength and control around it, and many patients benefit from both. If you are unsure, message us your main concern and we will point you to the right starting point.',
      },
    ],
    draft: false,
  },
  {
    slug: 'sports-injury-rehabilitation',
    title: 'Sports Injury & Rehabilitation in Cheras, Kuala Lumpur',
    metaTitle: 'Sports Injury Treatment in Cheras, KL | Persistence',
    metaDescription:
      'Sports injury assessment, staged rehabilitation and criteria based return to sport in Cheras, Maluri. Sprains, strains and overuse injuries.',
    targetKeyword: 'sports injury treatment malaysia',
    intro:
      'Sports injury care in Cheras. We assess what failed and why, then work through staged rehabilitation aimed at getting you back to your sport without carrying the same weakness into it.',
    heroImage: {
      src: '/img/hero-adjustment.webp',
      alt: 'Hands-on treatment at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    outcomes: [
      'A sprain, strain or overuse injury you want assessed',
      'Pain that flares up during or after your sport',
      'An injury that keeps coming back when you return to training',
      'A staged plan back to your sport, not just rest',
      'Rehabilitation to continue after surgery, within the limits your surgeon sets',
    ],
    qualifierConcerns: [
      'I have a sprain, strain or overuse injury',
      'Pain flares up during or after my sport',
      'My injury keeps returning when I go back to training',
      'I want a clear plan for returning to my sport',
      'I am rehabbing after surgery',
      'I injured myself at the weekend and I am not an athlete',
    ],
    sections: [
      {
        heading: 'Sports injury rehabilitation in Cheras',
        body: 'Sports injury care in Cheras. We assess what failed and why, then work through staged rehabilitation aimed at getting you back to your sport without carrying the same weakness into it. That covers sprains, strains and overuse injuries, in athletes and in people who simply train at the weekend.',
      },
      {
        heading: 'Finding what failed, and why',
        body: 'An injury is usually the visible end of something that was already off, whether that is a weakness, a movement pattern or a training load that climbed too fast. We assess the injured area and the way you move around it, because treating the sore tissue alone tends to let the same thing happen again. Understanding why it went is what shapes the rest of the plan.',
      },
      {
        heading: 'Staged rehabilitation, from settling down to loading up',
        body: 'Rehabilitation moves through stages rather than all at once. Early on the aim is to protect the area and keep it moving without aggravating it. As it settles we rebuild range, then strength, then the speed, control and agility your sport actually demands. Each stage has to hold before the next one starts, and how quickly you move through them depends on the injury and how you respond.',
      },
      {
        heading: 'Returning to sport on criteria, not a date',
        body: 'We would rather clear you to return on what the area can do than on how many weeks have passed. That means testing strength, balance and sport specific movement, and building the load back up gradually, rather than pronouncing you ready because the pain has gone. Returning before the tissue tolerates the load is the single most common reason an injury comes back.',
      },
      {
        heading: 'Recovery support and therapeutic modalities',
        body: 'Alongside the active work we use adjunct therapies to help manage pain and support tissue recovery through the early stages. These are there to make the rehabilitation possible, not to replace it. Where dry needling or hands on treatment is useful for the muscular side of things, we combine them under the same roof.',
      },
      {
        heading: 'Core and spinal stability for durability',
        body: 'Targeted work for the deep stabilising muscles that support the spine and control the trunk under load. Good stability through the middle tends to make the limbs more efficient and the whole system more durable, which is part of how we aim to lower the chance of the injury recurring once you are back.',
      },
    ],
    treats: ['back-pain', 'shoulder-imbalance', 'hip-pain'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: 'Our physiotherapy approach' },
      { href: '/services/dry-needling', label: 'Dry needling for muscle tension' },
      { href: '/what-to-expect', label: 'What to expect on your first visit' },
    ],
    faqs: [
      {
        q: 'How soon after an injury should I be assessed?',
        a: 'Once the acute swelling has settled enough to move the area, an assessment is usually more informative. If you cannot put weight through the limb, or there is obvious deformity or severe swelling, go to A&E first rather than booking with us.',
      },
      {
        q: 'When can I return to my sport?',
        a: 'That depends on the injury, the sport and how rehabilitation progresses, so we will not give you a date at the first visit. We base the decision on what the area can do under testing rather than on symptoms alone, because returning before the tissue tolerates the load is the most common reason an injury recurs.',
      },
      {
        q: 'Do you treat non-athletes, and weekend or desk injuries?',
        a: 'Yes. A tweaked back from lifting, a knee that flares up on a weekend run or an overuse strain from repetitive work are all treated the same way, by assessing what happened and rebuilding the area properly. You do not have to compete at anything to be seen.',
      },
      {
        q: 'Do I need a scan or X-ray before starting?',
        a: 'Not usually. Most sprains and strains are diagnosed from the assessment itself. If something suggests a more serious injury that needs imaging or a medical opinion, we will tell you and help you arrange it rather than press on regardless.',
      },
      {
        q: 'Can you help with rehabilitation after surgery?',
        a: 'Often, yes, once your surgeon is happy for rehabilitation to begin and within any restrictions they have set. We work to the protocol for your procedure and progress the loading as the tissue allows. Bring any notes or guidance from your surgical team to the first visit.',
      },
    ],
    draft: false,
  },
  {
    slug: 'posture-correction',
    title: 'Posture Correction in Cheras, Kuala Lumpur',
    metaTitle: 'Posture Correction in Cheras, KL | Persistence',
    metaDescription:
      'Posture assessment and correction for desk workers in Cheras, Maluri. Sitting posture, workstation setup and corrective exercise, with honest expectations.',
    targetKeyword: 'sit posture correction',
    intro:
      'Posture work for desk workers in Cheras. We assess how you actually sit and move, then combine strength work with practical workstation changes so that a better position becomes sustainable instead of something you have to keep remembering.',
    heroImage: {
      src: '/img/gonstead-nervoscope.webp',
      alt: 'A spinal assessment using instrumentation at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
    },
    outcomes: [
      'Neck and shoulder tension that builds up over a day at a desk',
      'A forward head or rounded shoulders you have noticed',
      'Stiffness that eases when you move and returns when you sit',
      'Practical workstation changes you will actually keep',
      'Strength work to hold a better position without thinking about it',
    ],
    qualifierConcerns: [
      'My neck and shoulders ache after a day at a desk',
      'I have noticed my head sitting forward or shoulders rounding',
      'I stiffen up when I sit for long periods',
      'I want help setting up my workstation',
      'I have tried a posture brace and it did not hold',
    ],
    sections: [
      {
        heading: 'Posture correction in Cheras',
        body: 'Posture work for desk workers in Cheras. We assess how you actually sit and move, then combine strength work with practical workstation changes so that a better position becomes sustainable instead of something you have to keep remembering. Most of the people we see for this spend their day at a screen.',
      },
      {
        heading: 'Postural assessment',
        body: 'We look at how you sit, stand and move rather than at a single photograph. Posture is as much habit as structure, so the position you hold through a working day tells us more than the one you can manage for thirty seconds in a clinic. We also look at where your strength and mobility fall short, because those are usually what pulls you back into the old position.',
      },
      {
        heading: 'Forward head and rounded shoulders',
        body: 'The pattern we see most in desk workers is the head drifting forward and the shoulders rounding in, often with a stiff upper back behind it. It tends to build up over years at a screen rather than appear overnight. Naming it is the easy part. What matters is working out which bits are tight, which are weak and which are simply habit, because the mix is different for each person.',
      },
      {
        heading: 'Sitting posture and workstation setup',
        body: 'Practical changes to chair height, screen position and desk setup, based on where you actually work. With most of the desk related complaints we see, the trouble comes from holding any one position for too long, so moving regularly tends to matter more than finding a single perfect posture. Small changes you will actually keep beat an ideal setup you abandon by lunchtime.',
      },
      {
        heading: 'Corrective exercise',
        body: 'Targeted strength and mobility work for the muscles that hold a position over a working day. No single treatment changes posture on its own, so the exercise is what carries the work between visits. It does not need to be long, but it does need to be regular, and we adjust it as you get stronger.',
      },
      {
        heading: 'What posture work can and cannot change',
        body: 'We would rather be plain about this. Comfort and endurance often improve, and people tend to find they can hold a better position for longer before it starts to feel like effort. What we cannot do is promise to straighten out a fixed structure or hand you a permanent posture from a course of visits. Your practitioner will tell you what is realistic in your case and what is not.',
      },
    ],
    treats: ['neck-pain', 'shoulder-imbalance', 'back-pain'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: 'Our physiotherapy approach' },
      { href: '/services/chiropractic-treatment', label: 'How chiropractic care can help' },
      { href: '/what-to-expect', label: 'What to expect on your first visit' },
    ],
    faqs: [
      {
        q: 'Can posture actually be corrected?',
        a: 'Not in the way most people mean it. Comfort often improves, and patients tend to find they can hold a better position for longer before it starts to feel like work. Your practitioner will tell you honestly what is likely to shift in your case and what is not.',
      },
      {
        q: 'I sit at a desk all day. Is that the cause?',
        a: 'Prolonged sitting is a common contributor, though rarely the only one. Movement breaks generally matter more than any single "correct" position. The body copes with most positions reasonably well until you stay in one of them for hours.',
      },
      {
        q: 'Will a posture brace help?',
        a: 'Braces can act as a reminder, but they do not build the strength needed to hold a position without one, and relying on a brace long-term is not something we would recommend without assessment. Ask your practitioner before buying one.',
      },
      {
        q: 'How long before I notice a change?',
        a: 'It varies with how long the pattern has been there and how consistent you are with the exercise. Many people feel more comfortable within a few weeks, though holding a better position without thinking about it takes longer. We review as we go and adjust the plan rather than promise a timeline up front.',
      },
      {
        q: 'Do I need chiropractic or physiotherapy for posture?',
        a: 'It depends what the assessment finds, and posture work often draws on both. Broadly, chiropractic care addresses how stiff joints move while physiotherapy builds the strength and control to hold a better position. If you are unsure, message us your main concern and we will point you to the right starting point.',
      },
    ],
    draft: false,
  },
]

export const publishedServices = () => services.filter((s) => !s.draft)
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
/** Services rendered by app/services/[slug]/page.tsx — excludes hand-built routes. */
export const templatedServices = () => publishedServices().filter((s) => !s.dedicatedRoute)
