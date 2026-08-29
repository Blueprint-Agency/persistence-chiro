/**
 * Malay translation of the Gonstead six-step walkthrough. Same clinical content as
 * `lib/gonstead.ts` — no new claims, adapted for natural Malay phrasing. See
 * `lib/gonstead.zh.ts` for the same note on gating.
 */

export const gonsteadIntroMs =
  'Kami mengamalkan kaedah Gonstead kerana ia menyeluruh. Ia melibatkan analisis terperinci kesihatan keseluruhan tulang belakang dan mana-mana segmen terhad yang mungkin menyumbang kepada kesakitan anda. Tujuannya adalah untuk menentukan dengan tepat di mana masalah itu berada sebelum sebarang pelarasan dilakukan, supaya kerja tertumpu pada segmen yang benar-benar memerlukannya.'

export const gonsteadStepsMs = [
  {
    name: 'Sejarah Kesihatan',
    body: 'Kami bertanya di mana masalah itu berada, apa yang menjadikannya lebih baik atau lebih teruk, dan apa yang tidak lagi dapat anda lakukan kerananya. Sejarah kesihatan menyempitkan carian sebelum apa-apa disentuh.',
  },
  {
    name: 'Visualisasi',
    body: 'Kami memerhatikan cara anda berdiri dan bergerak: lengkung tulang belakang anda, dan sama ada kepala, bahu, pinggul dan lutut anda berada pada paras yang sama. Cara anda berjalan menyempitkannya lagi.',
  },
  {
    name: 'Penggunaan Instrumen',
    body: 'Nervoscope membaca suhu kulit di sepanjang kedua-dua belah tulang belakang anda. Saraf tulang belakang mengawal aliran darah ke kulit, jadi perbezaan antara kedua-dua belah menunjukkan paras yang terlibat.',
  },
  {
    name: 'Palpasi',
    body: 'Kiropraktor anda merasai sepanjang tulang belakang untuk bengkak, kesakitan dan otot yang tegang, kemudian menggerakkan setiap sendi tulang belakang dan pelvis untuk mencari yang tidak bergerak sepatutnya.',
  },
  {
    name: 'Analisis X-Ray',
    body: 'Apabila perlu, X-ray menyingkirkan patologi dan menunjukkan cakera serta sendi itu sendiri. Jika ia menunjukkan sesuatu yang sepatutnya diuruskan oleh penyedia lain, kami akan merujuk anda berbanding melaras anda.',
  },
  {
    name: 'Pelarasan',
    body: 'Barulah kami melaras. Semua yang telah dikumpulkan menentukan segmen mana yang diproses dan bagaimana, dan pelarasan dilakukan dengan tepat dan mahir secara tangan sahaja.',
  },
] as const

/**
 * The closing paragraph in the sticky column below the six steps on the chiropractic-care
 * route — page-specific prose, not part of the shared `gonsteadIntro`.
 */
export const gonsteadClosingNoteMs =
  'Gonstead adalah proses penyingkiran secara berperingkat: setiap langkah menyempitkan carian sehingga hanya segmen yang benar-benar menyebabkan kesakitan anda yang tinggal, supaya kami melaras segmen itu sahaja berbanding keseluruhan tulang belakang. Apabila segmen menjadi terhad, pelarasan bertujuan membantu penjajaran tulang dan badan dengan memperbaiki cara ia bergerak. Berapa banyak yang berubah bergantung kepada puncanya, dan berapa lama ia telah berlaku.'
