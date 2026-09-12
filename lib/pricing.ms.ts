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
      {
        label: 'Penilaian awal fisioterapi, sesi pertama dan program senaman di rumah',
        price: 160,
      },
    ],
    who: 'Pesakit baharu yang sakitnya sudah lama dan belum pernah dinilai. Kiropraktor menilai dan melaras dahulu, kemudian fisioterapis mengambil alih bahagian kekuatan dan pergerakan.',
    image: {
      src: '/img/first-visit-consultation.webp',
      alt: 'Seorang pengamal menyokong leher pesakit semasa penilaian di Persistence Chiropractic di Cheras, Kuala Lumpur',
    },
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
    websiteExclusive: true,
    services: ['sports-massage', 'sports-injury-rehabilitation'],
    draft: false,
  },
]
