/**
 * Malay bundle copy. Same `Bundle` shape as `lib/pricing.ts`, keyed by the same `slug`.
 *
 * Prices are facts and never change between locales — only the wording around them does, so
 * `price`, `compareAt` and every `lines[].price` must match the English record exactly.
 * `content.test.ts` asserts it, because a bundle that costs RM588 in English and something
 * else in Malay is not a translation error, it is a different price.
 *
 * No "rawatan"/"merawat" — the Malay half of the banned-word rule, per AGENTS.md
 * § Multilingual. "Menilai", "melaras" and "pemulihan" say the thing that is actually done.
 *
 * Same review contract as the other ms files: adapted from the English record, not yet read
 * by a Malay-speaking reviewer. Unlike the service pages, this one carries a commercial
 * claim, so flag it for review before any spend points at these pages.
 */
import type { Bundle } from './pricing'

/**
 * The RM160 physiotherapy first visit, shared by the RM588 and RM188 bundles. One object rather
 * than two copies, for the reason spelled out on `physioFirstVisit` in lib/pricing.ts.
 */
const physioFirstVisit = {
  label: 'Penilaian awal fisioterapi, sesi pertama dan program senaman di rumah',
  price: 160,
} as const

/**
 * The RM190 house call initial assessment, shared by both packages. One object rather than two
 * copies, for the reason spelled out on `houseCallAssessment` in lib/pricing.ts.
 */
const houseCallAssessment = {
  label: 'Penilaian awal, termasuk sesi pertama secara langsung',
  price: 190,
} as const

export const bundlesMs: Bundle[] = [
  {
    slug: 'chiro-physio',
    eyebrow: 'Pakej pesakit baharu',
    name: 'Kiropraktik dan fisioterapi bersama',
    price: 588,
    compareAt: 660,
    lines: [
      { label: 'Konsultasi awal kiropraktik dan pelarasan pertama', price: 310 },
      { label: 'X-ray', price: 190 },
      physioFirstVisit,
    ],
    who: 'Pesakit baharu yang sakitnya sudah lama dan belum pernah dinilai. Kiropraktor menilai dan melaras dahulu, kemudian fisioterapis mengambil alih bahagian kekuatan dan pergerakan.',
    image: {
      src: '/img/first-visit-consultation.webp',
      alt: 'Seorang pengamal menyokong leher pesakit semasa penilaian di Persistence Chiropractic di Cheras, Kuala Lumpur',
    },
    group: 'website-only',
    websiteExclusive: true,
    services: ['chiropractic-care', 'physiotherapy'],
    draft: false,
  },
  {
    slug: 'electromodalities-sports-massage',
    eyebrow: 'Pakej pemulihan sukan',
    /**
     * Renamed 2026-09-12 with the English record ("electromodalities"). "Modaliti fisioterapi"
     * rather than a coined "elektromodaliti": bekam and taping are on the list and neither is
     * electrical, and "modaliti" alone means nothing to a patient. Draft, unreviewed.
     */
    name: 'Modaliti fisioterapi dan urut sukan',
    description:
      'Modaliti fisioterapi ialah bahagian sesi yang menggunakan alat. Bergantung pada apa yang ditemui semasa penilaian, ia boleh merangkumi bekam, pek haba, ultrasound, gelombang kejutan atau taping.',
    price: 200,
    compareAt: 240,
    lines: [
      { label: 'Modaliti fisioterapi, satu sesi', price: 120 },
      { label: 'Urut sukan, 60 minit', price: 120 },
    ],
    who: 'Mereka yang berlatih keras, atau ada kecederaan lama yang asyik berulang. Untuk tendon yang sakit dan tisu lembut yang tegang, dan tidak perlu jadi pesakit baharu.',
    /**
     * Shows one of the modalities being sold (shockwave), as of 2026-09-03. It replaced a
     * shoulder-mobility frame, which in turn replaced this page's own hero; neither depicted any
     * of them. Still the right frame after the 2026-09-12 rename: shockwave is on the list.
     *
     * ⚠️ AI GENERATED, SO THE ALT CLAIMS NO LOCATION. Not a photograph of this clinic, these
     * practitioners or these patients. Naming Cheras here would be a claim about a room that
     * does not exist, and this card sells something for money, which is the worst place on the
     * site to imply provenance it does not have. Swap in a real photograph when one exists.
     *
     * Portrait on purpose. The card crops with object-cover, so the tall frame fills the
     * desktop column and centre-crops to a wide strip on mobile, where the applicator and the
     * leg sit in the middle band.
     */
    image: {
      src: '/img/shockwave-session.webp',
      alt: 'Pengamal bersarung tangan memegang aplikator gelombang kejutan pada bahagian bawah kaki pesakit',
    },
    group: 'website-only',
    websiteExclusive: true,
    services: ['sports-massage', 'sports-injury-rehabilitation'],
    draft: false,
  },
  /**
   * Physio assessment + one yoga class, RM188, added 2026-09-23 with the English record — see
   * its comment for why this is a wide card rather than a fourth column in the yoga row, why
   * the RM160 line is narrower than the RM588 card's, and why the two-month term renders.
   *
   * The RM160 line is the same sentence this file's RM588 record uses, per the client's
   * 2026-09-23 confirmation that it is the same product. Keep the two identical.
   *
   * No "rawatan"/"merawat": "penilaian" and "kelas" say what is actually on offer. Unreviewed,
   * like every other ms record, and this one carries a price.
   */
  {
    slug: 'physio-yoga',
    eyebrow: 'Lawatan fisioterapi pertama',
    name: 'Penilaian fisioterapi dan satu kelas yoga',
    description: 'Kedua-dua bahagian perlu digunakan dalam masa dua bulan selepas menuntut tawaran ini.',
    price: 188,
    compareAt: 215,
    lines: [
      physioFirstVisit,
      { label: 'Satu kelas yoga, Chair Yoga atau Posture Core Yoga', price: 55 },
    ],
    who: 'Sesiapa yang baru dengan fisioterapi dan juga mahu mencuba satu kelas yoga. Penilaian dahulu. Sudah datang kepada kami untuk kiropraktik tidak menghalang anda, asalkan fisioterapi dan yoga kedua-duanya baharu bagi anda.',
    image: {
      src: '/img/therapy-neck.webp',
      alt: 'Fisioterapis mengendalikan leher dan bahu pesakit yang sedang duduk di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    group: 'website-only',
    websiteExclusive: true,
    services: ['physiotherapy', 'yoga-classes'],
    offersPageOnly: true,
    draft: false,
  },
  /**
   * The three yoga cards, added 2026-09-22 with the English records — see their comment in
   * lib/pricing.ts for why there are three, why none of them is website only and why the drop
   * in card carries no saving.
   *
   * Class names stay in English ("Chair Yoga", "Posture Core Yoga"), the same call the ms yoga
   * page made: they are the names on the client's flyer and what a Malaysian searcher types.
   * No "rawatan"/"merawat" here; a yoga class is not something done to a patient. Unreviewed,
   * like every other ms record.
   */
  {
    slug: 'yoga-drop-in',
    eyebrow: 'Kelas tunggal',
    name: 'Kelas yoga satu sesi',
    description:
      'Satu kelas, dibayar pada hari itu. Chair Yoga dan Posture Core Yoga berselang-seli setiap Sabtu jam 4:00 petang, jadi mesej kami untuk semak kelas mana yang berjalan sebelum anda datang.',
    price: 55,
    compareAt: 55,
    lines: [{ label: 'Satu kelas yoga, Chair Yoga atau Posture Core Yoga', price: 55 }],
    who: 'Sesiapa yang mahu cuba satu kelas dahulu sebelum membeli pakej, atau yang hanya lapang pada Sabtu tertentu. Tidak perlu pengalaman, dan anda tidak perlu menjadi pesakit klinik.',
    image: {
      src: '/img/yoga-chair-side-stretch.webp',
      alt: 'Seorang wanita tersenyum duduk di atas kerusi lipat dengan kaki di atas blok yoga, mengangkat satu tangan ke atas kepala dalam regangan sisi, semasa kelas chair yoga di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    websiteExclusive: false,
    services: ['yoga-classes'],
    offersPageOnly: true,
    group: 'yoga',
    draft: false,
  },
  {
    slug: 'yoga-pack-3',
    eyebrow: 'Pakej 3 kelas',
    name: 'Pakej yoga tiga kelas',
    description:
      'Untuk satu orang, sah dua bulan dari kelas pertama. Boleh digunakan untuk Chair Yoga, Posture Core Yoga atau campuran kedua-duanya.',
    price: 138,
    compareAt: 165,
    lines: [{ label: 'Tiga kelas tunggal pada RM55 sekelas', price: 165 }],
    who: 'Sesiapa yang sudah sedia untuk bermula tetapi belum mahu menempah tiga bulan ke hadapan. Untuk satu orang sahaja, jadi ia tidak boleh dikongsi dengan rakan.',
    image: {
      src: '/img/yoga-class-side-angle.webp',
      alt: 'Pelajar dalam kedudukan lunge lebar dengan satu tangan mencapai ke atas kepala, masing-masing di sebelah kerusi lipat, semasa kelas yoga di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    websiteExclusive: false,
    services: ['yoga-classes'],
    offersPageOnly: true,
    group: 'yoga',
    draft: false,
  },
  {
    slug: 'yoga-pack-6',
    eyebrow: 'Pakej 6 kelas',
    name: 'Pakej yoga enam kelas',
    description:
      'Boleh dikongsi antara dua orang, sah tiga bulan. Boleh digunakan untuk Chair Yoga, Posture Core Yoga atau campuran kedua-duanya.',
    price: 248,
    compareAt: 330,
    lines: [{ label: 'Enam kelas tunggal pada RM55 sekelas', price: 330 }],
    who: 'Mereka yang datang tetap, dan pasangan atau rakan yang mahu datang bersama, kerana dua orang boleh menggunakan pakej yang sama. Ini yang paling murah sekelas antara ketiga-tiganya.',
    image: {
      src: '/img/yoga-class-group.webp',
      alt: 'Tujuh pelajar tersenyum bergambar bersama selepas kelas yoga di Persistence Chiropractic Care, Cheras, Kuala Lumpur, dengan patung yoga perak dan rak alatan di belakang mereka',
    },
    websiteExclusive: false,
    services: ['yoga-classes'],
    offersPageOnly: true,
    group: 'yoga',
    draft: false,
  },
  /**
   * The two house call packages, added 2026-09-23 with the English records — see their comment
   * in lib/pricing.ts for why they are a grouped row rather than two wide cards, and why the
   * female-patients-only and six-week facts live in the row's intro instead of on each card.
   *
   * No "rawatan"/"merawat": "penilaian", "lawatan" and "pemulihan" name what is actually done.
   * Unreviewed, like every other ms record, and these carry prices.
   */
  {
    slug: 'house-call-3',
    eyebrow: 'Pakej 3 lawatan',
    name: 'Tiga lawatan ke rumah',
    description: 'Penilaian awal berserta dua lawatan susulan, digunakan dalam masa enam minggu.',
    price: 510,
    compareAt: 550,
    lines: [
      houseCallAssessment,
      { label: 'Dua lawatan susulan pemulihan pada RM180 setiap satu', price: 360 },
    ],
    who: 'Sesiapa yang mahu pemulihan di rumah dan lebih selesa bermula dengan tiga lawatan berbanding terus lima.',
    image: {
      src: '/img/physio-house-call-hero.webp',
      alt: 'Ahli fisioterapi berdiri di belakang seorang wanita yang duduk di rumah, tangan di bahunya, sementara wanita itu memegang jalur rintangan di hadapannya',
      // Subjects sit in the upper third. Near-neutral now the card's box is 4:3 like the
      // file, and kept as insurance: it is what stopped a shallower crop beheading them.
      objectPosition: 'top',
    },
    websiteExclusive: false,
    services: ['physiotherapy-house-call'],
    offersPageOnly: true,
    group: 'house-call',
    draft: false,
  },
  {
    slug: 'house-call-5',
    eyebrow: 'Pakej 5 lawatan',
    name: 'Lima lawatan ke rumah',
    description: 'Penilaian awal berserta empat lawatan susulan, digunakan dalam masa enam minggu.',
    price: 840,
    compareAt: 910,
    lines: [
      houseCallAssessment,
      { label: 'Empat lawatan susulan pemulihan pada RM180 setiap satu', price: 720 },
    ],
    who: 'Sesiapa dengan masalah yang sudah lama dan sedia tahu tiga lawatan tidak mencukupi.',
    image: {
      src: '/img/physio-house-call-rehab.webp',
      alt: 'Ahli fisioterapi melutut di sebelah seorang wanita di atas tikar senaman di ruang tamu, membimbingnya melakukan senaman bridge',
      // Subjects sit in the upper third. Near-neutral now the card's box is 4:3 like the
      // file, and kept as insurance: it is what stopped a shallower crop beheading them.
      objectPosition: 'top',
    },
    websiteExclusive: false,
    services: ['physiotherapy-house-call'],
    offersPageOnly: true,
    group: 'house-call',
    draft: false,
  },
]
