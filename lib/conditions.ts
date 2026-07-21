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
    treatedBy: ['physiotherapy', 'chiropractic-treatment'],

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
    treatedBy: ['physiotherapy', 'chiropractic-treatment'],

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
    treatedBy: ['dry-needling', 'physiotherapy'],

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
    related: ['neck-pain', 'back-pain'],
    treatedBy: ['physiotherapy'],

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
    slug: 'neck-pain',
    title: 'Neck Pain and Stiffness in Cheras, Kuala Lumpur',
    metaTitle: 'Neck Pain & Stiffness Treatment in KL | Persistence',
    metaDescription:
      'Neck pain, tech neck and posture correction for desk workers in Cheras, Maluri. Gonstead chiropractic plus ergonomic guidance.',
    targetKeyword: 'stiffness neck pain',
    related: ['back-pain', 'scoliosis'],
    treatedBy: ['dry-needling', 'physiotherapy'],

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
    slug: 'migraine',
    title: 'Migraine and Headache Care in Cheras, Kuala Lumpur',
    metaTitle: 'Migraine & Headache Care in KL | Persistence Chiro',
    metaDescription:
      'Assessment for migraine and neck-related headaches in Cheras, Maluri. We look at the cervical contribution and refer for medical management where needed.',
    targetKeyword: 'migraine headache',
    related: ['neck-pain', 'shoulder-imbalance'],
    treatedBy: ['chiropractic-treatment', 'physiotherapy'],

    intro:
      'Not every bad headache is a migraine, and not every migraine has anything to do with the neck. That distinction matters more here than almost anywhere else on this site, because it decides who should be treating you. Migraine is a neurological condition — it is managed medically, and chiropractic care does not treat it. What chiropractic can look at is whether some part of what you are feeling is coming from the joints and muscles of the upper neck, which is a separate and reasonably common source of head pain. Working out which of those you are dealing with is what the assessment is for, and if the answer is that you need a doctor rather than us, we will say so.',
    symptoms: [
      'Head pain that begins at the base of the skull and wraps forward towards the temple or eye',
      'Headache consistently on the same side, alongside neck stiffness or a restricted turn',
      'Head pain that is provoked by sustained desk work, driving, or a particular neck position',
      'Throbbing or pulsing pain with nausea, or sensitivity to light and sound',
      'Visual disturbance, tingling or speech changes in the half hour before the pain arrives',
      'Headaches that arrive with no neck involvement at all and follow their own pattern',
    ],
    causes: [
      {
        heading: 'Neurological migraine',
        body: 'True migraine involves changes in the brain and its nerves rather than in the neck. Triggers, patterns and management sit with a doctor or neurologist, and medication is often part of that. We include it here because people commonly arrive assuming their headaches are muscular when the pattern suggests otherwise.',
      },
      {
        heading: 'Cervicogenic headache',
        body: 'Head pain that originates in the joints, discs or muscles of the upper neck and is felt in the head. It usually stays on one side, tends to be provoked by neck position or movement, and often comes with reduced neck range. This is the presentation chiropractic assessment is relevant to.',
      },
      {
        heading: 'Sustained forward head posture',
        body: 'Hours with the head held forward of the shoulders asks the muscles at the base of the skull to work continuously. That tissue can refer pain into the head, and it is a frequent background finding in desk workers who describe daily late-afternoon headaches.',
      },
      {
        heading: 'Sleep, stress and jaw clenching',
        body: 'An unsupportive pillow, poor sleep and low-grade clenching keep the muscles around the skull and jaw loaded overnight. These rarely explain a headache on their own, but they often sit alongside whatever else is going on and make it harder to settle.',
      },
    ],
    approach: [
      {
        heading: 'Working out what kind of headache this is',
        body: 'Your first visit is largely history taking — where the pain starts, what brings it on, what it comes with, how long it lasts, and what has already been tried. That is followed by the rest of the Gonstead six-step assessment: visualisation, nervoscope instrumentation, palpation with a full-motion assessment of the neck and upper back, and X-ray analysis where indicated. The purpose is to establish whether there is a cervical contribution at all, not to arrive at a headache diagnosis.',
      },
      {
        heading: 'Where the neck is involved',
        body: 'If the assessment points to restricted segments in the upper neck, the adjustment is specific to those segments and delivered by hand, and your chiropractor will explain what they found before anything happens. Where the surrounding muscle is a factor, our physiotherapy side may add manual therapy and a programme for the deep neck and upper back. The goal is better neck movement and less load on that tissue — any effect on the headaches themselves follows from that, and it varies from person to person.',
      },
      {
        heading: 'Where it is migraine, we refer',
        body: 'If your pattern looks neurological rather than mechanical, the appropriate step is medical management, and we will say so plainly rather than book you a course of care. Chiropractic does not treat migraine and we would rather not imply otherwise. Some people have both — a genuine migraine disorder and a neck that is adding to their overall headache burden — and in that case working alongside your doctor is reasonable.',
      },
      {
        heading: 'What you track between visits',
        body: 'You will usually be asked to keep a simple record: when the headaches happen, how long they last, what preceded them, and what you were doing. Headache patterns are difficult to judge from memory, and this is often the single most useful thing a patient brings to a second appointment.',
      },
    ],
    redFlags: [
      'A sudden, severe headache that reaches full intensity within seconds or minutes — a thunderclap headache',
      'The worst headache of your life, or a headache clearly unlike any you have had before',
      'Headache with fever, neck stiffness, or a rash',
      'Headache with weakness, numbness, confusion, difficulty speaking, or loss of vision',
      'Any headache following a blow to the head, a fall, or a road accident',
      'A new headache beginning after the age of 50, or one that is steadily worsening over days and weeks',
      'Headache that is worse on lying down, coughing or straining, or that wakes you from sleep',
      'Headache alongside a history of cancer, a compromised immune system, or unexplained weight loss',
    ],
    faqs: [
      {
        q: 'Can a chiropractor treat my migraine?',
        a: 'No — migraine is a neurological condition and its management belongs with a doctor or neurologist. What we can assess is whether part of your head pain is coming from the joints and muscles of the upper neck, which is a different problem that happens to feel similar. If the assessment says your headaches are migrainous, we will tell you that and refer you appropriately rather than treat.',
      },
      {
        q: 'How do I know if my headache is coming from my neck?',
        a: 'Some features point that way — pain that starts at the base of the skull, stays on one side, is provoked by neck position or sustained desk work, and comes with reduced neck movement. None of those is conclusive on its own, and there is real overlap with migraine. That is exactly why the assessment exists; we would not tell you the source without examining you first.',
      },
      {
        q: 'Will neck adjustments stop my headaches?',
        a: 'We cannot tell you that, and you should be cautious of anyone who does. Where a restricted neck segment is contributing, restoring movement to it often changes how much head pain people get — but it depends on the presentation, and some people notice little difference. Your chiropractor will tell you honestly what they expect and what they do not.',
      },
      {
        q: 'Is it safe to have my neck adjusted if I get headaches?',
        a: 'It depends on the presentation, which is why the assessment comes first. Certain symptoms need medical review before any hands-on care — sudden severe headache, dizziness, visual or speech changes, or any recent head or neck trauma. Tell us about those when you book so we can screen for them properly.',
      },
      {
        q: 'Should I stop my migraine medication?',
        a: 'That is not our decision to make, and nothing we do should be taken as a reason to change it. Medication decisions sit with the doctor who prescribed it. Bring a list of what you are taking to your first visit so we have the full picture.',
      },
    ],
    draft: false,
  },
  {
    slug: 'hip-pain',
    title: 'Hip Pain Treatment in Cheras, Kuala Lumpur',
    metaTitle: 'Hip Pain Treatment in Cheras, KL | Persistence Chiro',
    metaDescription:
      'Assessment and care for hip pain, groin ache and lower back and hip complaints in Cheras, Maluri. Gonstead chiropractic plus targeted rehabilitation.',
    targetKeyword: 'lower back ache hip pain',
    related: ['back-pain', 'sciatica'],
    treatedBy: ['chiropractic-treatment', 'sports-injury-rehabilitation'],

    intro:
      'Hip pain is awkward to pin down because the hip, the pelvis and the lower back all share the same neighbourhood and refer pain into each other. People often arrive certain the problem is their hip when the joint itself examines well, or convinced it is their back when the hip is what is limiting them. Where you feel it is a starting point, not an answer. The useful work is establishing which structure is actually irritated and what pattern of loading keeps it that way, because the plan for a hip joint problem, a gluteal tendon problem and a lower back problem are not the same plan.',
    symptoms: [
      'A deep ache in the groin or the front of the hip, particularly on standing up or getting out of a car',
      'Pain on the outside of the hip that is worse lying on that side at night',
      'Lower back ache that spreads across the buttock and into the hip on one side',
      'Stiffness first thing in the morning, or after sitting through a long meeting or drive',
      'Difficulty with stairs, squatting, or putting on socks and shoes on one side',
      'A clicking, catching or grinding sensation as the hip moves through its range',
    ],
    causes: [
      {
        heading: 'Prolonged sitting and hip position',
        body: 'Long hours seated hold the hip in flexion, shorten the tissue at the front of it and let the gluteal muscles behind it do very little. Over years this reduces how much range the hip has available and shifts load into the lower back — which is why back ache and hip pain so often arrive together in desk workers.',
      },
      {
        heading: 'Gluteal tendon overload',
        body: 'The tendons on the outside of the hip take a lot of load during standing, walking and single-leg work. When that load rises faster than the tendon adapts, it becomes irritable. This is the pattern behind most outside-of-hip pain that hurts to lie on, and it tends to respond to graded loading rather than rest.',
      },
      {
        heading: 'Joint restriction in the lower back and pelvis',
        body: 'When a lumbar segment or a sacroiliac joint stops moving well, the hip on that side takes up the difference. Assessing the spine and pelvis alongside the hip is standard here for that reason — treating the hip alone often leaves the driver untouched.',
      },
      {
        heading: 'Age-related joint change',
        body: 'Cartilage and joint surfaces change with time, and imaging findings become more common with age whether or not there is pain. Such findings describe the joint rather than explain the symptom, so they are read alongside how the hip actually moves and what it tolerates.',
      },
    ],
    approach: [
      {
        heading: 'Separating hip from back from pelvis',
        body: 'Your first visit follows the Gonstead six-step assessment — history taking, visualisation of the level of hips, shoulders and knees, nervoscope instrumentation, palpation with a full-motion assessment of the spinal and pelvic joints, X-ray analysis where indicated, and only then an adjustment. Alongside that, the hip is taken through its own range and loaded in the positions that provoke your symptoms, so we can tell which structure is the irritable one.',
      },
      {
        heading: 'Adjustment and hands-on work',
        body: 'Where restricted spinal or pelvic joints are part of the picture, the adjustment is specific to them and delivered by hand, and your chiropractor will explain what they found before anything happens. Where the surrounding muscle and tendon are loaded, our physiotherapy side adds mobilisation and soft-tissue work to reduce the tension feeding into the joint.',
      },
      {
        heading: 'Loading the hip back to tolerance',
        body: 'Hips generally do better with graded loading than with rest, and this is usually the slower half of the work. Programming progresses from range and control through to strength and, for anyone returning to sport, the specific demands of running, changing direction or lifting. What you do between visits tends to matter more here than what happens on the table.',
      },
      {
        heading: 'Knowing when it is not ours to treat',
        body: 'Some hip presentations need an orthopaedic opinion or imaging beyond X-ray — a joint that is genuinely worn out, a suspected labral or bony problem, or a hip that is not responding as the assessment predicted. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
    ],
    redFlags: [
      'Inability to bear weight on the leg, or hip pain following a fall or road accident',
      'Obvious deformity, or a leg that looks shorter or rotated compared with the other',
      'Hip or groin pain with fever, feeling generally unwell, or a hot and swollen joint',
      'Progressive numbness or weakness in the leg, or a foot that drags when you walk',
      'Loss of bladder or bowel control, or numbness around the groin and inner thighs',
      'Night pain that wakes you, unexplained weight loss, or a history of cancer alongside new hip pain',
      'Hip pain in someone with osteoporosis or on long-term steroids after even a minor fall',
    ],
    faqs: [
      {
        q: 'Is my problem my hip or my lower back?',
        a: 'Often it is genuinely both, and telling them apart is one of the main reasons to be assessed rather than to guess. Groin pain more commonly points to the hip joint; pain across the buttock and into the back tends to involve the spine or pelvis. Neither is a rule, so the examination tests the hip and the lower back separately to see which reproduces your symptoms.',
      },
      {
        q: 'Do I need an X-ray or a scan for hip pain?',
        a: 'Not always. X-ray analysis is used where it will change what we do — ruling out pathology or clarifying joint condition — and it is avoided for pregnant women and children unless there is a clear reason. If your presentation suggests an MRI or a specialist opinion would alter the plan, your chiropractor will say so and arrange the referral.',
      },
      {
        q: 'Should I rest my hip or keep moving it?',
        a: 'For most mechanical hip pain, staying moving is better tolerated than resting completely, and complete rest tends to leave the hip stiffer and weaker. What usually helps is modifying rather than stopping — reducing the aggravating positions while keeping the movement you can do comfortably. You will be given specific guidance after your assessment rather than a general instruction.',
      },
      {
        q: 'I have been told I have hip arthritis. Is there any point coming in?',
        a: 'Joint change on imaging does not decide how much you can do. Many people with those findings improve their range, strength and day-to-day comfort with conservative care, and that is what we would be working on — not on reversing the changes themselves. Where a hip is advanced enough that a surgical opinion is the sensible next step, we will tell you that plainly.',
      },
      {
        q: 'How long will it take to feel better?',
        a: 'It depends on which structure is involved, how long it has been going on, and how the hip is loaded day to day. Tendon-related hip pain in particular tends to be measured in months rather than weeks. Your practitioner will give you a timeline based on your own assessment rather than a general figure.',
      },
    ],
    draft: false,
  },
  {
    slug: 'shoulder-imbalance',
    title: 'Shoulder Imbalance and Postural Strain in Cheras, Kuala Lumpur',
    metaTitle: 'Shoulder & Neck Pain Care in KL | Persistence Chiro',
    metaDescription:
      'Care for uneven shoulders, shoulder and neck pain and postural strain in Cheras, Maluri. Assessment, dry needling and a posture-focused programme.',
    targetKeyword: 'shoulder and neck pain',
    related: ['neck-pain', 'back-pain'],
    treatedBy: ['dry-needling', 'posture-correction'],

    intro:
      'Almost nobody is perfectly symmetrical, and a shoulder sitting slightly higher than the other is not in itself a problem to be treated. It becomes worth looking at when it comes with symptoms — an ache across one side of the neck and shoulder that builds through the working day, tightness that never fully clears, or a shoulder that no longer moves as freely as the other one. Usually what people describe as shoulder imbalance is a loading pattern rather than a structural fault: one side is doing more work, for more hours, than it has the endurance for. That is something an assessment can describe accurately, and something the way you work and train can change.',
    symptoms: [
      'One shoulder or shoulder blade visibly sitting higher, or clothes and bag straps sliding off one side',
      'An ache across the top of one shoulder and into the neck that worsens through the working day',
      'Tightness that eases at the weekend and has returned by Tuesday afternoon',
      'A shoulder blade that wings out or moves differently from the other when you raise your arm',
      'Reduced overhead reach on one side, or a catch partway through raising the arm',
      'Tingling or pins and needles into the shoulder blade, arm or hand',
    ],
    causes: [
      {
        heading: 'Asymmetric daily loading',
        body: 'A mouse on one side, a bag always on the same shoulder, a monitor set off-centre, a child carried on one hip. None of these does harm in isolation; repeated for eight hours a day over years, they ask one side to hold a position the other never has to, and the tissue adapts to what it is asked to do most.',
      },
      {
        heading: 'Restriction in the neck and upper back',
        body: 'The shoulder blade sits on the ribcage, and the ribcage moves with the thoracic spine. When mid-back or neck segments stop moving properly, the shoulder blade cannot sit or travel the way it should, and the muscles around it work harder to compensate.',
      },
      {
        heading: 'Endurance rather than strength',
        body: 'The muscles holding the shoulder blade in position are not usually weak in a way you would notice lifting something. They fatigue. That is why the ache appears at four in the afternoon rather than first thing, and why the programme is built around endurance rather than heavy loading.',
      },
      {
        heading: 'Underlying structural asymmetry',
        body: 'Some shoulder-level differences relate to a spinal curve, a rib or a leg-length difference rather than to habit. These are described rather than blamed, and where the pattern suggests a curve worth measuring, that is assessed properly rather than assumed either way.',
      },
    ],
    approach: [
      {
        heading: 'Looking at the whole chain, not just the high shoulder',
        body: 'Your first visit follows the Gonstead six-step assessment — history taking, visualisation of the level of head, shoulders, hips and knees, nervoscope instrumentation, palpation with a full-motion assessment of the spinal joints, X-ray analysis where indicated, and only then an adjustment. Visualisation carries weight here, because how you stand and how the shoulder blades sit tells us a good deal before anything has been touched.',
      },
      {
        heading: 'Releasing the tissue that is holding the pattern',
        body: 'Where the muscles around the neck, shoulder blade and upper back are chronically loaded, our physiotherapy side may use dry needling and hands-on soft-tissue work to reduce that tension. This part tends to change how things feel fairly quickly, and on its own it usually does not last — it makes the position easier to hold while the endurance work catches up.',
      },
      {
        heading: 'Then the part that changes the pattern',
        body: 'Posture is a habit as much as a structure, so the lasting work is in your desk setup, how often you move, and a programme for the deep neck and scapular muscles. We will be honest about what is likely to change: symptoms and comfort often do, and how much a visible asymmetry shifts varies a great deal from person to person.',
      },
      {
        heading: 'When the asymmetry needs a different assessment',
        body: 'A shoulder-level difference that is marked, that a patient did not previously have, or that comes with a rib hump or a visible spinal curve is a reason to assess for scoliosis properly, and in a growing adolescent that is an orthopaedic matter. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
      },
    ],
    redFlags: [
      'Shoulder or neck pain following a fall, car accident, or a direct blow to the head, neck or shoulder',
      'Numbness, weakness, or loss of grip strength in an arm or hand',
      'A shoulder asymmetry that has appeared suddenly or is visibly worsening, especially in a child or adolescent',
      'Dizziness, visual disturbance, difficulty speaking or swallowing, or unsteadiness on your feet',
      'Shoulder pain with chest tightness, breathlessness, sweating, or pain into the jaw or left arm — seek emergency care',
      'Fever, unexplained weight loss, or night pain that wakes you',
      'Clumsiness or unsteadiness affecting both hands or legs, or loss of bladder or bowel control',
    ],
    faqs: [
      {
        q: 'Is one shoulder being higher than the other a problem?',
        a: 'Not necessarily. Mild asymmetry is extremely common and plenty of people have it with no symptoms at all. What makes it worth assessing is pain, restricted movement, or an asymmetry that has changed. If you have no symptoms and nothing has changed, that is usually reassuring rather than something to treat.',
      },
      {
        q: 'Can chiropractic correct uneven shoulders?',
        a: 'We would rather set expectations honestly here. Adjustments can restore movement to restricted neck and mid-back segments, and soft-tissue work can reduce the muscular pull holding one side up — both of which often help how the shoulder feels and moves. How much a visible difference changes depends on what is driving it, and where the cause is structural, it may not change much at all.',
      },
      {
        q: 'Does uneven shoulders mean I have scoliosis?',
        a: 'Sometimes, but far from always. Shoulder-level differences are more often about muscular loading than about a spinal curve. Where the presentation suggests a curve — a rib hump on bending forward, a visible spinal deviation, or an adolescent still growing — that is assessed properly, including X-ray analysis where indicated, rather than guessed at.',
      },
      {
        q: 'What is dry needling and will it hurt?',
        a: 'It uses a fine needle to reach a tight band of muscle directly, which is difficult to achieve through the skin by hand alone. Most people describe a brief ache or a twitch rather than sharp pain, and some feel a little sore for a day afterwards. It is one option among several, used where the assessment suggests muscle tension is a meaningful part of the picture.',
      },
      {
        q: 'How do I stop it coming back?',
        a: 'Mostly by changing what caused it, which is why the desk setup and the endurance programme are not optional extras. Treatment reduces the load on tissue that is irritated; it cannot out-run eight hours a day of the position that irritated it. Practically: centre your monitor, alternate which shoulder carries your bag, and stand and move every 30 to 45 minutes.',
      },
    ],
    draft: false,
  },
]

export const publishedConditions = () => conditions.filter((c) => !c.draft)
export const conditionBySlug = (slug: string) => conditions.find((c) => c.slug === slug)
