/**
 * Bahasa Malaysia "Locate Us" walkthroughs. Same shape and same `slug`s as `lib/directions.ts`.
 *
 * ⚠️ FIRST-PASS DRAFT, NOT CLIENT-REVIEWED — the same standing as the ms dictionary. Logged
 * in OPEN-ITEMS.md.
 *
 * The "rawat" root is banned in ms copy (AGENTS.md, enforced by lib/content.test.ts) and it
 * would be an easy one to reach for on the imaging route — "rawatan pengimejan". It says
 * "imbasan X-ray" and "kaunter radiologi" instead, which is what the hospital's own signage
 * says anyway.
 */
import type { DirectionRoute, DirectionStep } from './directions.ts'

export const directionsMs: readonly DirectionRoute[] = [
  {
    slug: 'driving',
    title: 'Memandu ke sini dan tempat letak kereta',
    intro:
      'Kebanyakan orang datang begini. Letak kereta di bawah bangunan, naik ke tingkat G, dan anda sudah berada di koridor kami.',
    steps: [
      {
        title: 'Masuk tempat letak kereta melalui Entry E atau Entry F',
        detail:
          'Kedua-duanya menuju parkir Signature 2. Kami berada di Signature 2, bukan di dalam mall, jadi ikut papan tanda Signature 2 dan bukan pintu masuk mall.',
        image: 'drive-01-parking-entry.webp',
        alt: 'Palang masuk tempat letak kereta Entry E di Signature 2, Sunway Velocity, dan penanda dinding Signature 2 di tanjakan',
      },
      {
        title: 'Naik lif ke tingkat G',
        detail:
          'Direktori di lobi lif menyenaraikan G sebagai Offices dan Shops. Parkir berada di B1 hingga B3, jadi anda naik, bukan turun.',
        image: 'drive-02-lift-ground-floor.webp',
        alt: 'Direktori lobi lif tempat letak kereta di Signature 2 Sunway Velocity menunjukkan tingkat G untuk pejabat dan kedai',
      },
      {
        title: 'Jalan di koridor ke arah VO6',
        detail:
          'Menuju ke bahagian pintu hadapan blok. Anda betul apabila kedai mamak Nurin berada di seberang jalan. Sebaris dengan NSK.',
        image: 'drive-03-corridor-vo6.webp',
        alt: 'Koridor tingkat bawah di Signature 2 menuju blok VO6, dengan kedai mamak Nurin kelihatan di seberang jalan',
      },
      {
        title: 'Anda sudah sampai',
        detail:
          'Dinding hijau, kaunter biru. Masuk dan beritahu kaunter hadapan; tiada tempat lain untuk mendaftar sebelum itu.',
        image: 'drive-04-reception.webp',
        alt: 'Kaunter penyambut tetamu dan dinding hijau di Persistence Chiropractic Care, Sunway Velocity, Cheras Kuala Lumpur',
      },
    ],
  },
  {
    slug: 'from-the-mall',
    title: 'Berjalan dari Sunway Velocity Mall',
    intro:
      'Untuk anda yang datang dari mall, LRT, atau turun di pintu mall. Enam pusingan, setiap satu ada tandanya.',
    steps: [
      {
        title: 'Menuju ke pintu NanJing',
        detail:
          'Verrona Hills di sebelah kiri, Tous Les Jours di sebelah kanan. Pasangan kedai itulah pintunya; ada beberapa pintu lain, dan ini yang anda cari.',
        image: 'mall-01-nanjing-entrance.webp',
        alt: 'Kedai roti Verrona Hills dan kafe Tous Les Jours di kiri kanan pintu NanJing dalam Sunway Velocity Mall',
      },
      {
        title: 'Keluar dan terus berjalan di Nanjing Street',
        detail: 'Jalan terbuka dengan tanglung merah. Cari huruf #NANJING STREET di hujungnya.',
        image: 'mall-02-nanjing-street.webp',
        alt: 'Nanjing Street di Sunway Velocity, tanglung merah di atas dan papan tanda Nanjing Street di hujung jalan',
      },
      {
        title: 'Di hujung, turun satu tingkat dengan eskalator',
        detail:
          'Papan tanda "I love Sunway College" ada di sebelah kanan. Eskalator pula di sebelah kiri. Turun satu tingkat sahaja.',
        image: 'mall-03-escalator-down.webp',
        alt: 'Hujung Nanjing Street menunjukkan papan tanda Sunway College di kanan dan eskalator turun di kiri',
      },
      {
        title: 'Belok kiri di Peng Chu dan terus berjalan',
        detail: 'Peng Chu ialah restoran steamboat dengan pasu bunga di hadapannya. Selepas itu anda masuk laluan berbumbung.',
        image: 'mall-04-turn-left-peng-chu.webp',
        alt: 'Bahagian hadapan restoran Peng Chu di Sunway Velocity dengan laluan berbumbung terus di sebelahnya',
      },
      {
        title: 'Teruskan ke VO6 dan belok kanan di hujung',
        detail:
          'Kedai mamak Nurin akan kelihatan di seberang jalan. Bila nampak, belok kiri. Tinggal satu lot lagi.',
        image: 'mall-05-towards-vo6.webp',
        alt: 'Koridor membelok ke arah blok VO6 di Signature 2, dengan kedai mamak Nurin di seberang jalan di bawah',
      },
      {
        title: 'Anda sudah sampai',
        detail: 'Cari tulisan biru Persistence Chiropractic di atas pintu kaca.',
        image: 'mall-06-shopfront.webp',
        alt: 'Bahagian hadapan dan kaunter Persistence Chiropractic Care di VO6-G-02, Signature 2, Sunway Velocity, Cheras',
      },
    ],
  },
  {
    slug: 'to-sunway-medical',
    title: 'Ke Sunway Medical Centre Velocity untuk imbasan X-ray',
    intro:
      'Jika kami hantar anda untuk imbasan, inilah laluan dari pintu kami ke kaunter radiologi. Anda tidak perlu memandu.',
    steps: [
      {
        title: 'Belok kiri keluar dari pintu kami dan jalan sampai hujung',
        detail: 'Ikut kaki lima berbumbung; ia memanjang sepanjang blok.',
        image: 'smcv-01-turn-left-out.webp',
        alt: 'Laluan berbumbung di luar Persistence Chiropractic Care di Signature 2, anak panah menunjuk ke kiri sepanjang blok',
      },
      {
        title: 'Belok kiri sekali lagi di simpang',
        detail: 'Terus berjalan selepas selekoh. Menara hospital sudah kelihatan di hadapan.',
        image: 'smcv-02-junction-left.webp',
        alt: 'Simpang di hujung blok Signature 2 membelok ke kiri menuju Sunway Medical Centre Velocity',
      },
      {
        title: 'Ikut papan tanda Emergency berwarna merah',
        detail: 'Ia tergantung di bawah jambatan penghubung, sebelum Tower B.',
        image: 'smcv-03-emergency-sign.webp',
        alt: 'Papan tanda arah Emergency merah di bawah jambatan penghubung bersebelahan Tower B, Sunway Medical Centre Velocity',
      },
      {
        title: 'Masuk melalui pintu Kecemasan Tower B',
        detail:
          'Di dalam, papan tanda dinding menunjuk Emergency ke kanan dan Radiology ke kiri. Anda ke Radiology, sebelah kiri.',
        image: 'smcv-04-tower-b-entrance.webp',
        alt: 'Pintu masuk Kecemasan di Tower B, Sunway Medical Centre Velocity, dan papan tanda Radiology di dalam',
      },
      {
        title: 'Daftar di kaunter radiologi dan tunggu giliran',
        detail: 'Bawa borang yang kami beri. Bawa balik imej itu kepada kami selepas selesai.',
        image: 'smcv-05-radiology-reception.webp',
        alt: 'Kaunter pendaftaran radiologi di Tower B, Sunway Medical Centre Velocity',
      },
    ],
  },
]

export const signageMs: readonly DirectionStep[] = [
  {
    title: 'Pintu hadapan',
    detail: 'Di koridor, tulisan biru atas papan putih, di atas pintu kaca.',
    image: 'signage-front-door.webp',
    alt: 'Papan tanda hadapan Persistence Chiropractic Care di atas pintu kaca di Signature 2, Sunway Velocity, Cheras',
  },
  {
    title: 'Pintu belakang',
    detail: 'Sebelah lagi lot yang sama, di bawah Tong Beauty Lab. Pintu yang sama, masuk sahaja.',
    image: 'signage-back-door.webp',
    alt: 'Papan tanda belakang Persistence Chiropractic Care di bawah Tong Beauty Lab di Signature 2, Sunway Velocity, Cheras',
  },
]
