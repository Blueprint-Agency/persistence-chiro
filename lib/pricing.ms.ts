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
    image: {
      src: '/img/first-visit-consultation.webp',
      alt: 'Seorang pengamal menyokong leher pesakit semasa penilaian di Persistence Chiropractic di Cheras, Kuala Lumpur',
    },
    services: ['chiropractic-care', 'physiotherapy'],
    draft: false,
  },
  {
    slug: 'shockwave-sports-massage',
    eyebrow: 'Laman web sahaja',
    name: 'Terapi gelombang kejutan dan urut sukan',
    price: 200,
    compareAt: 240,
    lines: [
      { label: 'Terapi gelombang kejutan, satu sesi', price: 120 },
      { label: 'Urut sukan, 60 minit', price: 120 },
    ],
    /**
     * NOT `rehab-ankle.webp`, which this bundle used until it started appearing on
     * `/services/sports-injury-rehabilitation` as well: that photograph is the hero of that
     * page, so the card would have shown the same frame twice on one screen.
     *
     * ⚠️ NO LOCAL MODIFIER IN THE ALT. Unlike the chiro and physio bundle's frame, this one is
     * not confirmed to be a photograph of this clinic, so the alt describes what is in the
     * frame and claims nothing about where it was taken. It is also still not a photograph of
     * shockwave or of sports massage, because none exists. See OPEN-ITEMS.md.
     */
    image: {
      src: '/img/sports-post-surgical.webp',
      alt: 'Pengamal membimbing seorang lelaki yang duduk melalui pergerakan bahu di dalam bilik klinik',
    },
    services: ['sports-massage', 'sports-injury-rehabilitation'],
    draft: false,
  },
]
