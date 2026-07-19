/**
 * Condition pages — symptom-first intent ("back pain treatment KL").
 *
 * Shape is fixed (symptoms -> how we treat -> FAQ), so this is typed data rather than
 * MDX: it gives us FAQPage schema for free and stops the six pages drifting apart.
 * Blog prose stays MDX; this does not.
 *
 * `body` and `faqs` are the clinical copy that must come from the clinic — see
 * `proposed-site-architecture.md` § Content migration. Pages with `draft: true` are
 * excluded from the sitemap and nav until that copy lands, so we never ship a thin
 * indexed page.
 */

export type Condition = {
  slug: string
  /** <h1>. Must be unique across the site. */
  title: string
  /** <title>. Keep under ~60 chars so it isn't truncated in the SERP. */
  metaTitle: string
  metaDescription: string
  /** Primary keyword this page owns. No two pages may share one. */
  targetKeyword: string
  /** Slugs of conditions to cross-link. Two each, per the internal-linking rules. */
  related: string[]
  /** Physiotherapy modality slugs that treat this condition. */
  treatedBy: string[]

  /** Lead paragraph under the h1. Plain language — the reader is in pain, not studying. */
  intro: string
  /**
   * "Does this sound like you?" — the self-identification list. This is what a
   * symptom-intent searcher scans for first, so it comes before any explanation.
   */
  symptoms: string[]
  /** Common contributors. Descriptive only — this page does not diagnose anyone. */
  causes: { heading: string; body: string }[]
  /** What assessment and care actually involve here. */
  approach: { heading: string; body: string }[]
  /**
   * Symptoms that warrant urgent medical attention rather than a chiropractic
   * appointment. NON-NEGOTIABLE on every condition page: a clinic page that describes
   * symptoms without saying which ones are emergencies is unsafe, and the referral
   * language is already how the clinic describes its own practice in gonstead.ts.
   */
  redFlags: string[]
  faqs: { q: string; a: string }[]
  draft: boolean
}

export const conditions: Condition[] = [
  {
    slug: 'back-pain',
    title: 'Back Pain Treatment in Cheras, Kuala Lumpur',
    metaTitle: 'Back Pain Treatment in Cheras, KL | Persistence Chiropractic',
    metaDescription:
      'Gonstead chiropractic care for lower and upper back pain in Cheras, Maluri. Assessment, adjustment and rehab from registered chiropractors.',
    targetKeyword: 'back pain treatment kl',
    related: ['slipped-disc', 'sciatica'],
    treatedBy: ['manual-therapy', 'rehab-programming'],

    intro:
      'Most back pain is mechanical — the joints, discs and muscles of the spine are not moving the way they should, and the surrounding tissue is irritated as a result. It is extremely common, it is usually treatable without surgery, and it rarely means something is seriously wrong. What it does mean is worth finding out precisely, rather than guessing.',
    symptoms: [
      'A dull ache low in the back that worsens through the day or after sitting',
      'Sharp pain on a specific movement — bending, twisting, standing up from a chair',
      'Stiffness in the morning that eases once you start moving',
      'Pain that spreads into the buttock or thigh',
      'Difficulty standing straight, or a sense that your back is "locked"',
      'Muscle spasm on one side of the spine',
    ],
    causes: [
      {
        heading: 'Prolonged sitting',
        body: 'Long hours at a desk load the lower back continuously and let the muscles that support it switch off. This is the single most common contributor we see in Kuala Lumpur, and it responds well to a combination of treatment and changes to how you sit.',
      },
      {
        heading: 'Lifting and sudden loading',
        body: 'Lifting something heavy, awkwardly, or while twisting can strain the joints and soft tissue of the lower back. The pain often arrives hours later rather than at the moment of lifting.',
      },
      {
        heading: 'Joint restriction',
        body: 'When one spinal segment stops moving properly, the segments above and below compensate by moving more. Over time those neighbouring joints become irritated. Finding the restricted segment is what the Gonstead assessment is for.',
      },
      {
        heading: 'Deconditioning',
        body: 'Back pain that keeps returning is often less about a single injury and more about the supporting muscles lacking the endurance to hold the spine in a good position through a full day.',
      },
    ],
    approach: [
      {
        heading: 'We find the segment before we treat it',
        body: 'Your first visit follows the Gonstead six-step assessment — history, visualisation, instrumentation, palpation, X-ray analysis where indicated, and only then an adjustment. The point is to identify which specific joint is causing your pain rather than adjusting the whole spine and hoping.',
      },
      {
        heading: 'Adjustment, delivered by hand',
        body: 'Once the segment is identified, the adjustment is specific to it. Your chiropractor will explain what they found and what they intend to do before anything happens.',
      },
      {
        heading: 'Then the part that stops it returning',
        body: 'Treatment restores movement; strength keeps it. Where the pattern is a recurring one, we pair chiropractic with physiotherapy-led rehabilitation and practical changes to your desk setup and daily loading.',
      },
    ],
    redFlags: [
      'Loss of bladder or bowel control, or numbness around the groin and inner thighs',
      'Progressive weakness in one or both legs',
      'Back pain following a significant fall or accident',
      'Unexplained weight loss, fever, or night pain that wakes you',
      'A history of cancer, osteoporosis, or long-term steroid use alongside new back pain',
    ],
    faqs: [
      {
        q: 'How long does back pain take to settle?',
        a: 'It depends on how long you have had it, what is causing it, and what you do between visits. Short-term relief often comes quickly, but changing how your spine moves and rebuilding the muscle that supports it takes longer — often months rather than weeks. Your chiropractor will give you a timeline specific to your case after the first assessment rather than a generic number.',
      },
      {
        q: 'Do I need an X-ray for back pain?',
        a: 'Not always. X-rays help us see how each spinal segment is positioned, rule out pathology, and assess the discs and joints — but they are not mandatory for every patient, and are avoided for pregnant women and children unless there is a clear reason. Your chiropractor will explain why an X-ray is or is not indicated in your case.',
      },
      {
        q: 'Should I rest or keep moving?',
        a: 'For most mechanical back pain, gentle movement helps more than bed rest. Light walking stimulates blood flow and stops the area stiffening further. Avoid movements that clearly aggravate it, and hold off on vigorous exercise for a few days after an adjustment.',
      },
      {
        q: 'Is chiropractic safe if my back pain is severe?',
        a: 'Severity alone does not rule out chiropractic care, but it does change the assessment. Some presentations need imaging or a medical referral first, and if your chiropractor believes another healthcare provider would serve you better, you will be referred. Tell us about any recent trauma, numbness, or weakness when you book.',
      },
    ],
    draft: false,
  },
  {
    slug: 'slipped-disc',
    title: 'Slipped Disc Treatment in Cheras, Kuala Lumpur',
    metaTitle: 'Slipped Disc Treatment in KL | Persistence Chiropractic',
    metaDescription:
      'Non-surgical slipped disc (herniated disc) care in Cheras, Maluri. Gonstead assessment, X-ray analysis and a staged treatment plan.',
    targetKeyword: 'slipped disc treatment malaysia',
    related: ['back-pain', 'sciatica'],
    treatedBy: ['manual-therapy', 'rehab-programming'],

    intro:
      '"Slipped disc" is the everyday name for a disc that has bulged or herniated — the soft centre of a spinal disc pushing outward against the tougher ring around it, sometimes far enough to press on a nearby nerve. Nothing has actually slipped out of place, which is why the term can sound more alarming than it is. Many discs settle with time and the right loading, and most people never need surgery. What matters is knowing which level is involved and how the nerve is behaving, so the plan fits your spine rather than a general description of the condition.',
    symptoms: [
      'Back pain with pain, tingling or numbness travelling into the buttock, leg or foot',
      'Pain that spikes when you cough, sneeze or strain',
      'A sharp catch when bending forward, or difficulty sitting for long',
      'Neck pain with symptoms running into the shoulder, arm or hand',
      'Weakness in a foot, ankle or grip on one side',
      'Symptoms that ease when lying down and return on standing or sitting',
      'Pins and needles in a defined band of skin rather than the whole limb',
    ],
    causes: [
      {
        heading: 'Sustained flexion',
        body: 'Sitting bent forward for hours — at a desk, in traffic, over a phone — loads the front of the disc and pushes its contents backward. Repeated over years, this is the most common background to a disc problem we see in Kuala Lumpur.',
      },
      {
        heading: 'Lifting with a rounded back',
        body: 'Lifting while bent and twisted places a high, uneven load on the disc. The event itself may feel minor at the time, with symptoms arriving hours or a day later.',
      },
      {
        heading: 'Age-related disc change',
        body: 'Discs lose water content and height over time, which reduces their tolerance to load. This is a normal part of ageing and does not on its own mean pain — but it does change how much a given movement asks of the disc.',
      },
      {
        heading: 'Restricted joints above and below',
        body: 'When neighbouring spinal segments stop moving well, the segment that still moves takes more of the load. Identifying which levels have stopped moving is a large part of what the assessment is for.',
      },
    ],
    approach: [
      {
        heading: 'Establishing which level is involved',
        body: 'Your first visit follows the Gonstead six-step assessment — history taking, visualisation, instrumentation with the nervoscope, palpation including a full-motion assessment of the spinal and pelvic joints, X-ray analysis where indicated, and only then an adjustment. X-rays are used to rule out pathology and assess the intervertebral discs and joints, which matters more with a suspected disc problem than with ordinary mechanical back pain.',
      },
      {
        heading: 'Non-surgical care, delivered specifically',
        body: 'Our positioning is conservative care first. Once the involved segment is identified, the adjustment is specific to it and delivered by hand, and your chiropractor will explain what they found and what they intend to do before anything happens. Where the presentation calls for imaging beyond X-ray or a specialist opinion, you will be referred appropriately — that decision is part of the assessment, not a last resort.',
      },
      {
        heading: 'Loading the spine back to tolerance',
        body: 'Alongside chiropractic care, our physiotherapy side works on how you sit, hinge and lift, and builds tolerance in the muscles that share load with the disc. This tends to be the slower half of the work and the half that decides whether the problem keeps recurring.',
      },
    ],
    redFlags: [
      'Loss of bladder or bowel control, or numbness around the groin, buttocks and inner thighs',
      'Weakness in both legs, or weakness that is getting worse rather than staying steady',
      'A foot that drags or that you cannot lift properly',
      'Severe, unrelenting pain that is not eased by any position, including lying down',
      'Disc symptoms following a significant fall, road accident or direct trauma',
      'Fever, unexplained weight loss, or a history of cancer alongside new spinal pain',
    ],
    faqs: [
      {
        q: 'Can a chiropractor treat a slipped disc, or do I need surgery?',
        a: 'Many disc presentations are managed conservatively, and surgery is generally considered when conservative care has not helped, or when there is progressive nerve weakness or a red-flag presentation. A surgical opinion is a legitimate and sometimes necessary path — it is not a failure. Your chiropractor will assess your case and refer you appropriately if a specialist would serve you better.',
      },
      {
        q: 'Is chiropractic adjustment safe with a herniated disc?',
        a: 'It depends on the presentation, which is precisely why the assessment comes before any treatment. Some disc cases are suitable for adjustment, others need imaging or a medical opinion first, and the approach is adapted accordingly. Tell us about any numbness, weakness or bladder and bowel changes when you book.',
      },
      {
        q: 'Do I need an MRI before coming in?',
        a: 'Not usually. We start with the Gonstead assessment and X-ray analysis where indicated, which is enough to guide care in many cases. If your presentation suggests an MRI would change the plan, your chiropractor will say so and arrange the appropriate referral.',
      },
      {
        q: 'How long does a slipped disc take to settle?',
        a: 'Recovery varies a great deal with the size of the herniation, how long symptoms have been present, and how the spine is loaded day to day. Some people notice change within weeks, others need months of consistent work. Your chiropractor will give you a timeline based on your own assessment rather than a general figure.',
      },
    ],
    draft: false,
  },
  {
    slug: 'sciatica',
    title: 'Sciatica Treatment in Cheras, Kuala Lumpur',
    metaTitle: 'Sciatica Treatment in Cheras, KL | Persistence Chiropractic',
    metaDescription:
      'Sciatic nerve pain relief through Gonstead chiropractic and targeted rehab. Registered chiropractors in Cheras, Maluri.',
    targetKeyword: 'sciatica treatment',
    related: ['slipped-disc', 'back-pain'],
    treatedBy: ['dry-needling', 'manual-therapy'],

    intro:
      'Sciatica is not a diagnosis in itself — it is the name for pain that travels along the path of the sciatic nerve, from the lower back through the buttock and down the back of the leg. Something is irritating or compressing that nerve, and the useful question is what, and where. It is a common problem, it is usually mechanical, and for most people it settles with conservative care rather than surgery. Finding the source is what makes the difference between chasing the leg pain and treating what is causing it.',
    symptoms: [
      'Pain running from the lower back or buttock down the back of one leg',
      'Burning, shooting or electric pain rather than a dull ache',
      'Tingling, pins and needles or numbness in the calf, foot or toes',
      'Symptoms usually on one side only',
      'Pain that worsens with prolonged sitting, driving, coughing or sneezing',
      'Weakness in the leg or foot, or a foot that feels heavy',
      'Difficulty finding a comfortable position at night',
    ],
    causes: [
      {
        heading: 'Disc irritation of the nerve root',
        body: 'A bulging or herniated disc in the lower back can press on or chemically irritate a nerve root where it exits the spine. This is one of the more common sources of true sciatic pain, and it is why the lower back is assessed even when the leg is what hurts.',
      },
      {
        heading: 'Narrowing of the nerve pathway',
        body: 'Age-related changes to the spinal joints and discs can reduce the space the nerve passes through. Symptoms in this pattern often build with standing or walking and ease when sitting or leaning forward.',
      },
      {
        heading: 'Tight or overworked gluteal muscles',
        body: 'The sciatic nerve passes close to the deep muscles of the buttock. Where those muscles are chronically tight or overloaded, they can contribute to symptoms that follow a similar path — which is why the hip and pelvis are examined alongside the spine.',
      },
      {
        heading: 'Prolonged sitting and pelvic position',
        body: 'Long hours seated, particularly on a wallet or with one leg crossed, load the lower back and buttock unevenly. This rarely causes sciatica on its own, but it commonly keeps an existing irritation going.',
      },
    ],
    approach: [
      {
        heading: 'Tracing the pain back to its source',
        body: 'The leg is where you feel it; the spine and pelvis are usually where it comes from. Your first visit follows the Gonstead six-step assessment — history taking, visualisation, nervoscope instrumentation, palpation with a full-motion assessment of the spinal and pelvic joints, X-ray analysis where indicated, and only then an adjustment. The aim is to identify the specific level or joint involved rather than treating the whole spine.',
      },
      {
        heading: 'Adjustment and soft tissue work together',
        body: 'Once the source is identified, the adjustment is specific to it and delivered by hand. Where tight gluteal or hip musculature is part of the picture, our physiotherapy side may add manual therapy or dry needling to reduce the tissue tension contributing to the irritation.',
      },
      {
        heading: 'Movement, then tolerance',
        body: 'Nerve symptoms tend to respond to restoring movement and then progressively rebuilding tolerance rather than to rest alone. You will usually be given specific movements to do between visits, along with practical changes to how long you sit and how you get in and out of a chair or car.',
      },
    ],
    redFlags: [
      'Loss of bladder or bowel control, or numbness around the groin, buttocks and inner thighs',
      'Sciatic symptoms down both legs at once',
      'Progressive weakness, or a foot you cannot lift or that drags when you walk',
      'Severe pain that no position relieves, including lying down',
      'Leg symptoms after a significant fall, accident or direct trauma',
      'Fever, unexplained weight loss, or a history of cancer alongside new sciatic pain',
    ],
    faqs: [
      {
        q: 'How long does sciatica last?',
        a: 'Many episodes of sciatica improve over a number of weeks, but it varies with the cause, how long symptoms have been present and how the spine is loaded each day. Symptoms that have been present for months generally take longer to change than a recent flare. Your chiropractor will give you a timeline based on your own assessment rather than a general figure.',
      },
      {
        q: 'Should I rest or keep moving with sciatica?',
        a: 'For most mechanical sciatica, gentle movement is better tolerated than prolonged bed rest, which tends to leave the area stiffer. Short walks and regular changes of position usually help more than staying still. Avoid movements that clearly worsen the leg symptoms, and follow the specific guidance you are given after your assessment.',
      },
      {
        q: 'Is my sciatica caused by a slipped disc?',
        a: 'Sometimes, but not always — a disc is one of several possible sources, and hip, pelvic and joint contributors are common too. That is exactly what the assessment is designed to work out. We would not tell you the cause without examining you first.',
      },
      {
        q: 'Do I need an injection or surgery for sciatica?',
        a: 'Most people with sciatica are managed without either. Injections and surgery are typically considered where conservative care has not helped, or where there is progressive nerve weakness or a red-flag presentation. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
    ],
    draft: false,
  },
  {
    slug: 'scoliosis',
    title: 'Scoliosis Care in Cheras, Kuala Lumpur',
    metaTitle: 'Scoliosis Treatment in KL | Persistence Chiropractic',
    metaDescription:
      'Scoliosis assessment and chiropractic management in Cheras, Maluri. Postural analysis, X-ray review and conditioning programmes.',
    targetKeyword: 'scoliosis treatment malaysia',
    related: ['neck-pain-posture', 'back-pain'],
    treatedBy: ['rehab-programming'],

    intro:
      'Scoliosis is a sideways curvature of the spine, often with an element of rotation. Many curves are mild, are discovered by chance, and never cause significant trouble; others bring stiffness, muscular fatigue and pain, particularly through the working day. It is important to be straightforward about what chiropractic care does here — we work on how comfortably and how well your spine moves, not on straightening the curve itself. Curve magnitude and progression are matters for orthopaedic assessment, and where that is what you need, we will say so.',
    symptoms: [
      'One shoulder, shoulder blade or hip sitting visibly higher than the other',
      'A rib hump or asymmetry that becomes obvious when bending forward',
      'Clothes hanging unevenly, or a waistline that looks asymmetrical',
      'Aching or muscular fatigue on one side of the back after standing or sitting for long',
      'Stiffness through the mid or lower back, particularly at the end of the day',
      'A sense of leaning to one side, or uneven weight through the feet',
    ],
    causes: [
      {
        heading: 'Idiopathic scoliosis',
        body: 'The majority of scoliosis has no identified cause. It most often becomes apparent during the adolescent growth spurt, which is also when monitoring matters most, because a growing spine can change more quickly than a mature one.',
      },
      {
        heading: 'Structural differences',
        body: 'Some curves relate to how the vertebrae themselves formed, or to differences in leg length or pelvic position. These are described rather than blamed — the assessment is about understanding what your spine is working with.',
      },
      {
        heading: 'Muscular imbalance around the curve',
        body: 'A curved spine loads the muscles on either side unevenly. Over time one side works harder and fatigues sooner, which is often what people actually feel as their scoliosis, rather than the curve itself.',
      },
      {
        heading: 'Daily loading patterns',
        body: 'Prolonged sitting, carrying consistently on one side, and long hours in a fixed position do not cause scoliosis, but they can add to the discomfort a curve already produces.',
      },
    ],
    approach: [
      {
        heading: 'Assessment before anything else',
        body: 'Your first visit follows the Gonstead six-step assessment — history taking, visualisation of the spinal curves and the level of head, shoulders, hips and knees, nervoscope instrumentation, palpation with a full-motion assessment of the spinal and pelvic joints, X-ray analysis where indicated, and only then an adjustment. With scoliosis, the visualisation and X-ray steps carry particular weight, because they establish what kind of curve we are dealing with before any care begins.',
      },
      {
        heading: 'Care aimed at comfort and movement',
        body: 'Chiropractic care here works on the joints that have become restricted and the tissue that is being overloaded — the goal is easier movement and less discomfort, not a change in the curve. Adjustments are specific and delivered by hand. We would rather be clear about this than imply an outcome chiropractic does not deliver.',
      },
      {
        heading: 'Conditioning, and knowing when to refer',
        body: 'Our physiotherapy side builds a conditioning programme for the muscles supporting your spine, along with practical guidance on sitting, carrying and daily loading. Where a curve is significant, progressing, or in a growing adolescent, orthopaedic assessment is the appropriate step — bracing and surgical decisions sit with a specialist. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
    ],
    redFlags: [
      'A curve in a child or adolescent that is visibly worsening, especially during a growth spurt — this needs orthopaedic assessment, not chiropractic care alone',
      'Breathlessness, reduced exercise tolerance, or chest discomfort associated with a large curve',
      'New or progressive numbness, tingling or weakness in the arms or legs',
      'Loss of bladder or bowel control, or numbness around the groin and inner thighs',
      'A curve that appears suddenly, or alongside fever, unexplained weight loss or night pain',
      'Severe pain out of proportion to the curve, or pain following a fall or accident',
    ],
    faqs: [
      {
        q: 'Can chiropractic straighten my scoliosis?',
        a: 'No — and we would rather be plain about that. Chiropractic care here is aimed at joint movement, muscular balance and comfort, not at correcting the curve itself. Changing curve magnitude is the domain of orthopaedic management, including bracing and, in some cases, surgery.',
      },
      {
        q: 'My teenager has been told they have scoliosis. What should we do?',
        a: 'An adolescent curve should be assessed and monitored by an orthopaedic specialist, because curves can change while a child is still growing and the treatment decisions at that stage are theirs to make. Chiropractic and physiotherapy can play a supporting role for comfort and conditioning alongside that care. We are happy to assess and to refer appropriately.',
      },
      {
        q: 'Will I need an X-ray?',
        a: 'X-ray analysis is often useful with scoliosis, as it shows how the spine is positioned and helps rule out other pathology. It is not automatic for every patient, and it is avoided for pregnant women and children unless there is a clear reason. Your chiropractor will explain why an X-ray is or is not indicated in your case.',
      },
      {
        q: 'Is exercise safe with scoliosis?',
        a: 'For most people, staying active is helpful, and general conditioning tends to be better tolerated than avoiding movement. What is appropriate depends on your curve and your symptoms, so the programme is set after assessment rather than from a template. If you are under orthopaedic care or wearing a brace, bring that guidance with you.',
      },
    ],
    draft: false,
  },
  {
    slug: 'neck-pain-posture',
    title: 'Neck Pain & Posture Correction in Cheras, Kuala Lumpur',
    metaTitle: 'Neck Pain & Posture Correction in KL | Persistence Chiropractic',
    metaDescription:
      'Neck pain, tech neck and posture correction for desk workers in Cheras, Maluri. Gonstead chiropractic plus ergonomic guidance.',
    targetKeyword: 'neck pain treatment kuala lumpur',
    related: ['back-pain', 'scoliosis'],
    treatedBy: ['dry-needling', 'manual-therapy'],

    intro:
      'Neck pain in office workers is usually a loading problem rather than an injury. Hours spent with the head tilted forward towards a screen or phone asks the small joints and muscles at the base of the neck to hold a position they were never meant to hold all day, and eventually they complain. It builds gradually, it is very common, and in most cases it responds well once the irritated segment is found and the habits feeding it are addressed.',
    symptoms: [
      'An ache at the base of the neck and across the top of the shoulders that worsens through the working day',
      'Tightness that eases on holiday or at the weekend and returns by Tuesday',
      'Headaches that begin at the back of the skull and wrap forward',
      'Reduced ability to turn your head fully to one side, or to check your blind spot when driving',
      'A rounded upper back and head that sits forward of your shoulders in photographs',
      'Tingling or pins and needles into the shoulder blade or arm',
      'Clicking or grinding when you roll your neck',
    ],
    causes: [
      {
        heading: 'Sustained forward head posture',
        body: 'The further forward the head sits, the more work the muscles at the back of the neck do to hold it up. Screens set below eye level, laptops used without a stand, and long stretches on a phone all encourage that position, and the tissue adapts to whatever it is asked to do most.',
      },
      {
        heading: 'Static loading rather than movement',
        body: 'Joints are nourished by movement. A neck held still for hours stiffens regardless of how good the posture is — which is why a well-set-up desk still causes trouble if you never leave it.',
      },
      {
        heading: 'Joint restriction in the upper neck',
        body: 'When a segment of the neck stops moving properly, the ones around it take up the slack and become irritated. Restriction high in the neck is a common contributor to the headaches that accompany desk-related neck pain.',
      },
      {
        heading: 'Sleep and stress patterns',
        body: 'An unsupportive pillow, sleeping on your front with the head turned, and the low-grade muscle guarding that comes with stress all keep the area loaded overnight, so it never gets a genuine rest period.',
      },
    ],
    approach: [
      {
        heading: 'We find the segment before we treat it',
        body: 'Your first visit follows the Gonstead six-step assessment — history, visualisation, instrumentation with the nervoscope, palpation, X-ray analysis where indicated, and only then an adjustment. Visualisation matters particularly here: the level of your head, ears and shoulders tells us a great deal about how you are loading your neck before we have touched you.',
      },
      {
        heading: 'Adjustment, delivered by hand',
        body: 'Once your chiropractor has identified which segment is restricted, the adjustment is specific to it and delivered by hand. They will explain what they found and what they intend to do before anything happens. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
      {
        heading: 'Changing what caused it',
        body: 'Treatment restores movement in a stiff neck; it cannot out-run eight hours a day of the position that stiffened it. Alongside chiropractic we cover practical desk and screen height changes, movement breaks, and where the surrounding muscle is a factor, physiotherapy-led work such as manual therapy or dry needling and a programme to build endurance in the deep neck and upper back muscles.',
      },
    ],
    redFlags: [
      'Neck pain following a fall, car accident, or any blow to the head or neck',
      'Numbness, weakness, or loss of grip strength in an arm or hand',
      'A sudden, severe headache unlike any you have had before',
      'Dizziness, visual disturbance, difficulty speaking or swallowing, or unsteadiness on your feet',
      'Fever, unexplained weight loss, or night pain that wakes you',
      'Loss of bladder or bowel control, or clumsiness and unsteadiness affecting both hands or legs',
    ],
    faqs: [
      {
        q: 'What is "tech neck"?',
        a: 'It is an informal term, not a medical diagnosis. It describes the neck and upper back pain that tends to accompany long hours looking down at a phone or a screen set too low. What we assess is the same as for any neck pain: which segments are moving poorly, and what in your day is keeping them that way.',
      },
      {
        q: 'Can chiropractic fix my posture?',
        a: 'Posture is a habit as much as a structure, so no single treatment changes it on its own. Adjustments can restore movement to segments that have become restricted, which often makes a better position more comfortable to hold, but the lasting change comes from your desk setup and from building endurance in the muscles that hold you upright. Your chiropractor will tell you honestly what is likely to change and what is not.',
      },
      {
        q: 'Is it safe to have my neck adjusted?',
        a: 'Neck adjustments are done by hand and only after the full assessment has established what is appropriate for you. Some presentations are not suitable for adjustment, which is exactly what the assessment is for, and certain symptoms need medical review first — tell us about any recent trauma, dizziness, arm numbness or severe headache when you book so we can screen for it.',
      },
      {
        q: 'How should I set up my desk?',
        a: 'The short version: top of the screen roughly at eye level, forearms supported, feet flat, and a laptop raised onto a stand with a separate keyboard. The more important part is that no setup is good enough to sit in for eight unbroken hours — stand and move every 30 to 45 minutes. We will go through your specific setup with you during your visit.',
      },
    ],
    draft: false,
  },
  {
    slug: 'sports-injury',
    title: 'Sports Injury Treatment in Cheras, Kuala Lumpur',
    metaTitle: 'Sports Injury Chiropractic in KL | Persistence Chiropractic',
    metaDescription:
      'Sports injury assessment, treatment and return-to-play rehab in Cheras, Maluri. Chiropractic and physiotherapy under one roof.',
    targetKeyword: 'sports injury chiropractic',
    related: ['back-pain', 'neck-pain-posture'],
    treatedBy: ['sports-rehab', 'dry-needling'],

    intro:
      'Sports injuries fall into two groups: the ones that happen in a moment — a rolled ankle, a pulled hamstring, a bad landing — and the ones that creep up over weeks of training, where something aches a little more each session until you cannot ignore it. Both need the same thing: an accurate picture of what is injured and how much load it can currently tolerate, then a staged plan that gets you back to your sport rather than just out of pain. Returning too early is the most common reason an injury becomes a recurring one.',
    symptoms: [
      'Pain that appears at a specific point in a movement — push-off, landing, overhead reach',
      'An ache that starts partway into training and settles with rest, then returns earlier each session',
      'Swelling, warmth or bruising around a joint after an incident',
      'A joint that feels unstable, or that you no longer trust to take full load',
      'Loss of range — you cannot fully straighten, bend, or rotate the way the other side does',
      'Stiffness the morning after training that takes longer to clear than it used to',
      'Compensating: limping, favouring one side, or changing your technique to avoid a position',
    ],
    causes: [
      {
        heading: 'Training load rising faster than tissue adapts',
        body: 'Tendons, bone and muscle all strengthen in response to load, but slowly. A sudden jump in distance, intensity or frequency — a new programme, a race build-up, returning after a break — outpaces that adaptation, and the overuse injuries follow.',
      },
      {
        heading: 'Acute trauma',
        body: 'Sprains, strains and contusions from a tackle, an awkward landing or a change of direction. These are usually obvious at the time, and the important early question is whether anything more serious than soft tissue is involved.',
      },
      {
        heading: 'Restriction elsewhere in the chain',
        body: 'The body works as a chain, and a joint that is not moving well makes its neighbours work harder. A stiff mid-back changes how the shoulder loads overhead; restricted ankle movement changes how the knee absorbs landing. This is often why an injury keeps returning to the same spot despite the spot itself being treated.',
      },
      {
        heading: 'Incomplete recovery from a previous injury',
        body: 'Pain settles well before strength and control come back. Returning to sport at that point leaves a strength deficit the rest of the body has to cover, which is a reliable way to injure the same tissue or the joint above it again.',
      },
    ],
    approach: [
      {
        heading: 'Assessment first — the injury and the chain around it',
        body: 'For the chiropractic side, your visit follows the Gonstead six-step assessment: history, visualisation, instrumentation, palpation, X-ray analysis where indicated, and only then an adjustment. The history matters especially in sport — what you play, how much you train, what movement provokes it. We assess the injured area and the joints above and below it, because the restriction driving a problem often is not where the pain is.',
      },
      {
        heading: 'Chiropractic and physiotherapy together',
        body: 'Having both under one roof means the same injury can be approached from both directions without you repeating your story. Adjustments address restricted joints; the physiotherapy side covers hands-on soft-tissue work, dry needling where the muscle is a factor, and loading the injured tissue appropriately. Which of these you need depends on what the assessment finds. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
      {
        heading: 'Return-to-play progression, not just pain relief',
        body: 'Being pain-free at rest is the start of rehabilitation, not the end of it. Your programme progresses in stages — restoring range, then rebuilding strength, then adding speed, change of direction and the specific demands of your sport — with each stage having criteria to meet before the next begins. The aim is that you return able to tolerate what your sport actually asks of you.',
      },
    ],
    redFlags: [
      'Inability to bear weight on the limb, or to take more than a few steps after the injury',
      'Obvious deformity — a joint or limb that looks out of place or misshapen',
      'Suspected fracture: severe focal bone pain, a crack or snap heard at the time, or point tenderness directly over bone',
      'Rapid or severe swelling immediately after an injury, particularly with heavy bruising',
      'Numbness, pins and needles, coldness, or a limb that has changed colour below the injury',
      'A head knock with confusion, memory loss, persistent headache, vomiting or loss of consciousness',
    ],
    faqs: [
      {
        q: 'Should I see a chiropractor or a physiotherapist for a sports injury?',
        a: 'You do not have to decide before you arrive. We offer both, and the assessment determines which is appropriate — often it is a combination, with chiropractic addressing restricted joints and physiotherapy handling soft tissue and the loading programme. If your case would be better served elsewhere, you will be referred.',
      },
      {
        q: 'How soon after an injury should I come in?',
        a: 'For an acute injury, once you have ruled out anything needing urgent medical attention — see the red flags above — earlier is generally better, because it lets us guide what you should and should not be doing in the first week. For a niggle that has been building over weeks, come before it forces you to stop training rather than after.',
      },
      {
        q: 'When can I go back to training?',
        a: 'That depends on the tissue involved, how it responds, and the demands of your sport, so we will not give you a date at the first visit. What we will give you is the criteria you need to meet at each stage, so the decision is based on what you can actually do rather than on how many weeks have passed.',
      },
      {
        q: 'Do I have to stop training completely?',
        a: 'Usually not. Full rest tends to cost you fitness and does little for the injured tissue, so the more common approach is modifying what you do — keeping the training that does not provoke symptoms while the injured area is loaded progressively. Your practitioner will be specific about what to keep and what to shelve.',
      },
    ],
    draft: false,
  },
]

export const publishedConditions = () => conditions.filter((c) => !c.draft)
export const conditionBySlug = (slug: string) => conditions.find((c) => c.slug === slug)
