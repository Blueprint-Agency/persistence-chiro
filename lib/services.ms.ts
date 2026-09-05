/**
 * Bahasa Malaysia service pages. Same `Service` shape as `lib/services.ts`, keyed by the
 * same `slug` — see `lib/conditions.ms.ts` for the keyword-targeting rationale and
 * `lib/services.zh.ts` for the `dedicatedRoute` footgun this file shares.
 *
 * Same review contract as `lib/conditions.ms.ts`: adapted from the clinic-reviewed English
 * record, `lastReviewed` left unset and `draft: true` until a Malay-speaking reviewer has
 * checked the wording — this is a translation-accuracy gate, not a clinical-content one.
 */
import type { Service } from './services'

export const servicesMs: Service[] = [
  {
    slug: 'posture-correction',
    title: 'Pembetulan Postur di Cheras, Kuala Lumpur',
    metaTitle: 'Pembetulan Postur di Cheras, KL',
    metaDescription:
      'Penilaian dan pembetulan postur untuk pekerja pejabat di Cheras, Maluri. Postur duduk, susunan meja kerja dan senaman pembetulan, dengan jangkaan yang jujur.',
    targetKeyword: 'postur badan',
    intro:
      'Kerja postur untuk pekerja pejabat di Cheras. Kami menilai cara anda sebenarnya duduk dan bergerak, kemudian menggabungkan latihan kekuatan dengan perubahan praktikal pada susunan meja supaya kedudukan yang lebih baik menjadi sesuatu yang boleh dikekalkan, bukan sesuatu yang perlu sentiasa diingati.',
    heroImage: {
      src: '/img/posture-assessment.webp',
      alt: 'Kiropraktor memeriksa belakang atas dan postur seorang pesakit yang sedang duduk di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    ogImage: '/og/posture-assessment.jpg',
    midImage: {
      src: '/img/nervoscope-assessment.webp',
      alt: 'Nervoscope digunakan sepanjang tulang belakang pesakit di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    assurances: [
      'Postur dinilai, bukan diteka',
      'Perubahan meja kerja yang benar-benar boleh dikekalkan',
      'Buka 7 hari · Cheras, Maluri',
    ],
    outcomes: [
      {
        text: 'Ketegangan leher dan bahu yang bertambah sepanjang hari di meja',
        image: {
          src: '/img/posture-desk-tension.webp',
          alt: 'Ilustrasi otot leher dan bahu menyala pada seorang lelaki memicit lehernya di meja pada waktu petang',
        },
      },
      {
        text: 'Kepala condong ke hadapan atau bahu bongkok yang anda perasan',
        image: {
          src: '/img/posture-forward-head.webp',
          alt: 'Profil sisi seorang lelaki berdiri dengan kepala berada di hadapan garis rujukan merah menegak, bahu bongkok',
        },
      },
      {
        text: 'Kekakuan yang reda apabila bergerak dan kembali apabila duduk',
        image: {
          src: '/img/posture-sitting-stiffness.webp',
          alt: 'Ilustrasi sakit belakang bawah menyala pada seorang wanita meredakan belakangnya semasa bangun daripada meja',
        },
      },
      {
        text: 'Perubahan praktikal pada meja kerja yang benar-benar anda akan kekalkan',
        image: {
          src: '/img/posture-workstation.webp',
          alt: 'Lelaki melaraskan ketinggian monitor di meja pejabat rumah bersebelahan kerusi ergonomik',
        },
      },
      {
        text: 'Latihan kekuatan untuk menahan kedudukan yang lebih baik tanpa perlu memikirkannya',
        image: {
          src: '/img/posture-hold-position.webp',
          alt: 'Wanita menarik jalur rintangan di paras dada dalam sebuah bilik senaman yang terang',
        },
      },
    ],
    qualifierConcerns: [
      'Leher dan bahu saya sakit selepas seharian di meja',
      'Saya perasan kepala saya condong ke hadapan atau bahu membongkok',
      'Saya menjadi kaku apabila duduk lama',
      'Saya mahukan bantuan menyusun meja kerja saya',
      'Saya sudah cuba penyokong postur dan ia tidak membantu',
    ],
    citations: [
      {
        claim:
          'Penyelidikan fisioterapi terkini mempersoalkan idea satu postur "betul" yang tunggal dan sebaliknya menekankan pergerakan dan variasi.',
        source: 'O’Sullivan et al., research on posture and back pain',
        url: 'https://bjsm.bmj.com/content/54/12/698',
      },
      {
        claim:
          'Duduk statik berpanjangan dikaitkan dengan ketidakselesaan muskuloskeletal, dan rehat pergerakan yang kerap biasanya disyorkan.',
        source: 'Chartered Society of Physiotherapy guidance',
        url: 'https://www.csp.org.uk/public-patient/keeping-active-healthy',
      },
    ],
    fitCheck: {
      rightFor: [
        'Anda mahu tahu bahagian postur mana yang secara realistik boleh berubah dan mana yang tidak.',
        'Anda sanggup melakukan latihan kekuatan dan mobiliti berbanding bergantung pada penyokong.',
        'Anda mahukan perubahan meja kerja yang benar-benar boleh dikekalkan sepanjang hari bekerja.',
        'Anda mahu penilaian menentukan senaman yang sesuai untuk anda, bukan senarai generik.',
      ],
      notRightFor: [
        'Anda mahukan postur sempurna kekal yang bertahan tanpa sebarang usaha berterusan.',
        'Anda mahukan bilangan lawatan yang ditetapkan sebelum sesiapa menilai cara anda bergerak.',
        'Anda mahukan penyokong atau alat berbanding kerja kekuatan dan tabiat yang menahan kedudukan.',
        'Anda mempunyai lengkung struktur seperti skoliosis dan mahu ia dibalikkan. Jagaan boleh membantu keselesaan dan pergerakan; lengkung itu sendiri kekal seperti sedia ada.',
      ],
      note: 'Tiada satu pun daripada itu menjadikan anda pesakit yang sukar. Ia bermakna apa yang anda harapkan dan apa yang kerja postur boleh lakukan secara jujur adalah dua perkara berbeza, dan kami lebih suka memberitahu dengan jelas sebelum anda membayar apa-apa. Apa yang biasanya bertindak balas adalah keselesaan, daya tahan dan berapa lama anda boleh menahan kedudukan yang lebih baik sebelum ia terasa seperti usaha, dan lawatan pertama adalah untuk kami tentukan yang mana berkenaan dengan anda.',
    },
    sections: [
      {
        heading: 'Pembetulan postur di Cheras',
        body: 'Kerja postur untuk pekerja pejabat di Cheras. Kami menilai cara anda sebenarnya duduk dan bergerak, kemudian menggabungkan latihan kekuatan dengan perubahan praktikal pada meja kerja supaya kedudukan yang lebih baik menjadi sesuatu yang boleh dikekalkan. Kebanyakan yang kami jumpa untuk ini menghabiskan hari mereka di depan skrin.',
      },
      {
        heading: 'Penilaian postur',
        body: 'Kami melihat cara anda duduk, berdiri dan bergerak, bukan satu gambar sahaja. Cara anda bertahan sepanjang hari bekerja memberitahu kami lebih banyak daripada tiga puluh saat di klinik. Kami turut menyemak di mana kekuatan dan mobiliti kurang mencukupi.',
      },
      {
        heading: 'Kepala condong ke hadapan dan bahu bongkok',
        body: 'Corak yang paling kerap kami lihat pada pekerja pejabat adalah kepala yang condong ke hadapan dan bahu yang membongkok ke dalam, biasanya dengan belakang atas yang kaku di sebaliknya. Ia terbina sepanjang bertahun-tahun di depan skrin, bukan dalam semalaman. Yang penting adalah bahagian mana yang tegang, lemah, atau sekadar tabiat.',
      },
      {
        heading: 'Postur duduk dan susunan meja kerja',
        body: 'Perubahan praktikal pada ketinggian kerusi, kedudukan skrin dan susunan meja, berdasarkan cara anda sebenarnya bekerja. Kebanyakan aduan berkaitan meja berpunca daripada menahan satu kedudukan terlalu lama, jadi bergerak dengan kerap lebih penting daripada mencari postur yang sempurna.',
      },
      {
        heading: 'Senaman pembetulan',
        body: 'Latihan kekuatan dan mobiliti yang disasarkan untuk otot yang menahan kedudukan sepanjang hari. Tiada satu kaedah pun boleh mengubah postur dengan sendirinya, jadi senaman membawa kerja antara lawatan. Ia tidak perlu lama, cuma perlu kerap.',
      },
      {
        heading: 'Apa yang kerja postur boleh dan tidak boleh ubah',
        body: 'Untuk berterus terang: keselesaan dan daya tahan biasanya bertambah baik, dan menahan kedudukan yang lebih baik menjadi lebih mudah dari semasa ke semasa. Apa yang kami tidak boleh lakukan adalah menjanjikan untuk meluruskan struktur tetap atau postur kekal. Pengamal anda akan memberitahu apa yang realistik untuk anda.',
      },
    ],
    helpsWith: ['neck-pain', 'shoulder-imbalance', 'back-pain'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: 'Pendekatan fisioterapi kami' },
      { href: '/services/chiropractic-care', label: 'Bagaimana jagaan kiropraktik boleh membantu' },
      { href: '/what-to-expect', label: 'Apa yang dijangka pada lawatan pertama anda' },
    ],
    faqs: [
      {
        q: 'Bolehkah postur benar-benar dibetulkan?',
        a: 'Tidak seperti yang kebanyakan orang fikirkan. Keselesaan dan daya tahan selalunya bertambah baik, dan ramai mendapati mereka boleh menahan kedudukan yang lebih baik lebih lama sebelum ia mula terasa seperti usaha. Apa yang tiada jagaan boleh janjikan adalah membentuk semula struktur tetap secara kekal atau memberikan postur sempurna yang bertahan sendiri. Kami lebih suka berterus terang tentang itu dan fokus pada bahagian yang benar-benar bertindak balas, iaitu kekuatan, mobiliti dan tabiat, jadi pengamal anda akan memberitahu dengan jujur apa yang berkemungkinan berubah dalam kes anda dan apa yang tidak.',
      },
      {
        q: 'Saya duduk di meja sepanjang hari. Adakah itu puncanya?',
        a: 'Duduk berpanjangan adalah penyumbang lazim, walaupun jarang menjadi satu-satunya punca. Bagi kebanyakan aduan berkaitan meja, masalah datang daripada menahan mana-mana satu kedudukan terlalu lama berbanding satu postur yang salah, jadi bergerak dengan kerap selalunya lebih penting daripada mencari susunan yang sempurna. Kami gabungkan perubahan meja kerja praktikal dengan latihan kekuatan, kerana kedudukan yang boleh anda tahan sepanjang hari bekerja itulah yang penting.',
        links: [{ phrase: 'latihan kekuatan', href: '/services/physiotherapy' }],
      },
      {
        q: 'Senaman apa yang membantu postur kepala condong ke hadapan dan bahu bongkok?',
        a: 'Empat yang paling kerap disebut. Chin tuck, menarik dagu lurus ke belakang berbanding menundukkannya, melatih otot fleksor leher dalam yang menahan kepala di atas bahu. Regangan dada di ambang pintu membuka otot pektoral yang menarik bahu ke hadapan. Wall angels, menggerakkan lengan naik di dinding dengan belakang rata menempel padanya, meminta belakang atas melebar dan bilah bahu bergerak. Regangan trapezius atas meredakan ketegangan leher ke bahu yang terbina sepanjang hari di depan skrin. Ini adalah titik permulaan biasa, bukan preskripsi, dan yang mana berkenaan dengan anda, dalam susunan dan kekerapan yang bagaimana, itulah tujuan penilaian.',
        links: [{ phrase: 'tujuan penilaian', href: '/what-to-expect' }],
      },
      {
        q: 'Adakah kerusi saya yang menjadi punca?',
        a: 'Jarang dengan sendirinya. Masa yang dihabiskan dalam satu kedudukan selalunya lebih penting daripada kerusi, dan kerusi mahal yang anda duduk diam selama empat jam bukanlah penyelesaian. Betulkan susunan secara kasar, kemudian bergerak dengan kerap.',
      },
      {
        q: 'Adakah penyokong postur membantu?',
        a: 'Penyokong boleh bertindak sebagai peringatan, tetapi ia tidak membina kekuatan yang diperlukan untuk menahan kedudukan tanpanya, dan bergantung pada penyokong dalam jangka panjang bukanlah sesuatu yang kami sarankan tanpa penilaian. Tanya pengamal anda sebelum membelinya.',
      },
      {
        q: 'Berapa lama sebelum saya perasan perubahan?',
        a: 'Ia berbeza mengikut berapa lama corak itu telah berlaku dan sejauh mana anda konsisten dengan senaman. Ramai berasa lebih selesa dalam beberapa minggu, walaupun menahan kedudukan yang lebih baik tanpa perlu memikirkannya mengambil masa lebih lama. Kami menyemak sepanjang proses dan menyesuaikan pelan berbanding menjanjikan tempoh masa terlebih dahulu.',
      },
      {
        q: 'Perlukah saya kiropraktik atau fisioterapi untuk postur?',
        a: 'Ia bergantung kepada apa yang dijumpai semasa penilaian, dan kerja postur selalunya menggunakan kedua-duanya. Secara umum, jagaan kiropraktik menangani cara sendi yang kaku bergerak manakala fisioterapi membina kekuatan dan kawalan untuk menahan kedudukan yang lebih baik. Jika anda tidak pasti, hantar mesej kepada kami tentang kebimbangan utama anda dan kami akan tunjukkan titik permulaan yang betul.',
      },
      {
        q: 'Berapa kerap saya patut bangun jika saya duduk sepanjang hari?',
        a: 'Kira-kira setiap tiga puluh minit adalah nasihat biasa, dan berdiri seketika pun dikira. Intinya bukan pada angka, tetapi tiada kedudukan yang sepatutnya ditahan berjam-jam, dan rehat pendek yang kerap selalunya lebih baik daripada rehat panjang yang jarang. Menetapkan peringatan berulang berfungsi lebih baik bagi kebanyakan orang berbanding bergantung pada ingatan sendiri.',
      },
      {
        q: 'Saya bekerja dari rumah menggunakan laptop. Bolehkah anda membantu?',
        a: 'Ya, dan laptop adalah salah satu susunan paling lazim yang kami lihat. Titik permulaan biasa adalah mudah: bahagian atas skrin hampir paras mata supaya leher tidak tertunduk sepanjang hari, siku pada sudut kira-kira tepat dengan bahu diturunkan berbanding diangkat, kaki di lantai atau penyokong kaki, dan skrin kira-kira sepanjang lengan. Laptop menjadikan gabungan ini mustahil dengan sendirinya, kerana skrin dan papan kekunci mahu berada di dua tempat berbeza, jadi penyelesaiannya biasanya penyangga tambah papan kekunci berasingan, atau monitor luaran. Beritahu kami apa yang anda sebenarnya kerjakan dan di mana anda duduk, kerana nasihat yang dibina berdasarkan meja yang anda tidak ada tidak banyak gunanya.',
      },
    ],
    // Flipped for local preview only, at the user's request — still needs a Malay-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'physiotherapy',
    title: 'Fisioterapi di Cheras, Kuala Lumpur',
    metaTitle: 'Fisioterapi Berhampiran Cheras, KL',
    metaDescription:
      'Fisioterapi berhampiran Cheras, Maluri, sebelah Sunway Velocity. Penilaian dahulu, kemudian jagaan secara tangan dan senaman pemulihan. Buka 7 hari, tiada rujukan diperlukan.',
    targetKeyword: 'fisioterapi near me',
    intro:
      'Fisioterapi di Cheras, menggabungkan jagaan secara tangan dengan senaman pemulihan yang betul. Sebaik sahaja sendi bergerak dengan lebih bebas, kerja senaman bertujuan membina semula kekuatan dan kawalan yang membantu mengekalkannya begitu.',
    heroImage: {
      src: '/img/cupping-therapy.webp',
      alt: 'Terapi cupping dilakukan di belakang atas pesakit di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    ogImage: '/og/cupping-therapy.jpg',
    midImage: {
      src: '/img/therapy-neck.webp',
      alt: 'Ahli fisioterapi menjaga leher dan bahu pesakit yang sedang duduk di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    assurances: [
      'Penilaian sebelum sebarang pelan jagaan',
      'Senaman dibina khusus untuk masalah anda, bukan helaian umum',
      'Buka 7 hari · Cheras, Maluri',
    ],
    outcomes: [
      {
        text: 'Kesakitan atau kekakuan yang mengehadkan pergerakan anda sepanjang hari',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: 'Ilustrasi otot leher dan bahu yang menyala pada seorang lelaki yang memegang sisi lehernya',
        },
      },
      {
        text: 'Kecederaan atau kambuh baru-baru ini yang anda mahu dinilai dengan betul',
        image: {
          src: '/img/physio-recent-strain.webp',
          alt: 'Ilustrasi sakit belakang bawah yang menyala pada seorang lelaki berdiri di kaunter dapur dengan tangan di belakangnya',
        },
      },
      {
        text: 'Masalah lama yang sentiasa berulang',
        image: {
          src: '/img/physio-recurring.webp',
          alt: 'Klinisian meletakkan tangan di bahu seorang wanita yang sedang duduk semasa penilaian',
        },
      },
      {
        text: 'Kelemahan atau kawalan yang kurang baik selepas kecederaan atau tempoh rehat',
        image: {
          src: '/img/physio-weakness.webp',
          alt: 'Ilustrasi sakit pergelangan kaki yang menyala pada seorang wanita duduk di meja dengan kaki di lantai',
        },
      },
      {
        text: 'Senaman yang benar-benar sesuai dengan masalah anda, bukan helaian generik',
        image: {
          src: '/img/physio-tailored-exercise.webp',
          alt: 'Seorang wanita melakukan senaman jalur rintangan sementara seorang ahli terapi memegang hujung jalur yang satu lagi',
        },
      },
    ],
    qualifierConcerns: [
      'Saya ada kesakitan atau kekakuan yang mengehadkan aktiviti harian',
      'Masalah saya sentiasa berulang',
      'Saya mahukan senaman yang disesuaikan dengan isu khusus saya',
      'Saya sedang pulih daripada kecederaan dan rasa lemah atau tidak stabil',
      'Saya tidak pasti sama ada saya perlukan fisioterapi atau kiropraktik',
    ],
    comparison: {
      heading: 'Fisioterapi atau jagaan kiropraktik?',
      intro:
        'Jawapan sebenar bergantung kepada apa yang dijumpai semasa penilaian, dan ramai yang datang ke sini akhirnya menjalani kedua-duanya. Ini adalah gambaran kasar perbezaannya.',
      columns: ['Fisioterapi', 'Jagaan Kiropraktik'],
      rows: [
        {
          label: 'Fokus utama',
          a: 'Kekuatan, kawalan dan cara anda bergerak',
          b: 'Cara sendi tulang belakang yang tersekat bergerak',
        },
        {
          label: 'Lawatan pertama',
          a: 'Ujian pergerakan dan penilaian, kemudian jagaan secara tangan dan senaman pertama anda',
          b: 'Analisis Gonstead, segmen demi segmen, sebelum sebarang pelarasan',
        },
        {
          label: 'Alat utama',
          a: 'Terapi manual, mobilisasi sendi, senaman pemulihan',
          b: 'Pelarasan tangan yang tepat pada segmen yang dikenal pasti',
        },
        {
          label: 'Antara lawatan',
          a: 'Program senaman membawa sebahagian besar kerja',
          b: 'Biasanya kurang kerja di rumah, walaupun kami mungkin masih memberikan sesuatu',
        },
        {
          label: 'Selalunya sesuai untuk',
          a: 'Pemulihan selepas kecederaan, kelemahan, pergerakan yang sentiasa terjejas',
          b: 'Sendi yang rasa tersekat, atau masalah yang kembali ke tempat yang sama',
        },
      ],
      note: 'Tiada satu yang lebih baik secara mutlak. Jika anda tidak pasti yang mana anda perlukan, hantar mesej kepada kami tentang kebimbangan utama anda dan kami akan tunjukkan titik permulaan yang betul, bukan menempahkan anda ke mana-mana sahaja yang anda klik.',
    },
    citations: [
      {
        claim:
          'Garis panduan klinikal mengesyorkan kekal aktif dan jagaan berasaskan senaman bagi kebanyakan sakit belakang bawah tidak spesifik, berbanding rehat berpanjangan.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
      {
        claim:
          'Ahli fisioterapi di Malaysia beramal di bawah Kementerian Kesihatan dan rangka kerja profesion kesihatan bersekutu.',
        source: 'Allied Health Professions Act 2016, Malaysia',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10835829/',
      },
    ],
    fitCheck: {
      rightFor: [
        'Anda mahu tahu apa yang menyebabkan masalah, bukan sekadar di mana anda rasa sakit.',
        'Anda sanggup melakukan program senaman kecil dan khusus antara lawatan.',
        'Anda mahukan jagaan secara tangan dan pemulihan daripada satu tempat sahaja.',
        'Anda lebih suka dirujuk keluar berbanding diteruskan dengan jagaan yang tidak berkesan.',
      ],
      notRightFor: [
        'Anda mahukan sesi pasif sahaja, tanpa apa-apa untuk dilakukan antara lawatan. Senaman adalah sebahagian besar kerja.',
        'Anda mahukan bilangan sesi tetap yang dipersetujui sebelum sesiapa menilai anda.',
        'Anda mencari urutan santai atau sesi spa, bukan pemulihan klinikal.',
        'Masalah anda memerlukan imbasan atau pendapat perubatan dahulu. Fisioterapi tidak menangani patah tulang, jangkitan atau penyakit organ, dan kami akan merujuk anda keluar berbanding meneruskan.',
      ],
      note: 'Tiada satu pun daripada itu menjadikan anda pesakit yang sukar. Ia bermakna lawatan pertama di sini tidak akan memberikan apa yang anda cari, dan kami lebih suka memberitahu di awal berbanding di akhir. Jika apa yang anda mahukan adalah penilaian yang jujur dan pelan yang anda faham cukup untuk diikuti, itulah tepatnya lawatan pertama.',
    },
    sections: [
      {
        heading: 'Fisioterapi di Cheras',
        body: 'Fisioterapi di Cheras, di sebelah Maluri bersebelahan Sunway Velocity, dibuka tujuh hari seminggu. Tiada rujukan diperlukan dan anda boleh terus menempah. Lawatan pertama kebanyakannya adalah penilaian: kami melihat cara anda sebenarnya bergerak sebelum sebarang tindakan bermula, supaya kerja tertumpu kepada punca sebenar masalah, bukan sekadar bahagian yang sakit. Daripada itu kami gabungkan jagaan secara tangan dengan program senaman kecil bertujuan membina semula kekuatan dan kawalan yang membantu sendi kekal bergerak dengan bebas.',
      },
      {
        heading: 'Terapi manual yang tepat',
        body: 'Teknik secara tangan, termasuk mobilisasi sendi dan pelepasan miofasial, mengurangkan kesakitan dan memperbaiki pergerakan sendi. Ia berfungsi paling baik sebagai permulaan, bukan pelan penuh, menenangkan keadaan cukup untuk kerja aktif bermula.',
      },
      {
        heading: 'Penilaian pergerakan, gaya berjalan dan biomekanik',
        body: 'Pemerhatian terperinci terhadap postur, gaya berjalan dan cara anda bergerak semasa dibebankan, untuk mengenal pasti apa yang menyumbang, bukan sekadar di mana anda rasa sakit. Kesakitan di satu tempat selalunya berpunca daripada cara bahagian lain bergerak. Jika kasut atau ortotik menjadi faktor, kami turut menyemaknya.',
      },
      {
        heading: 'Program senaman pemulihan',
        body: 'Pelan progresif dibina berdasarkan keadaan, matlamat dan kehidupan harian anda. Kebanyakan perubahan berkekalan datang daripada senaman, jadi kami menetapkannya dengan betul berbanding memberikan helaian generik. Ia bermula kecil dan disesuaikan apabila anda semakin kuat.',
      },
      {
        heading: 'Apa yang berlaku semasa sesi fisioterapi pertama anda',
        body: 'Lawatan pertama kebanyakannya adalah penilaian: sejarah kesihatan anda, apa yang memburukkan dan meredakan keadaan, dan cara anda bergerak. Jagaan secara tangan biasanya menyusul, dengan senaman pertama untuk dibawa pulang. Ia mengambil masa kira-kira empat puluh lima minit hingga sejam.',
      },
      {
        heading: 'Fisioterapi atau kiropraktik, dan cara kami menggabungkannya',
        body: 'Secara umum, jagaan kiropraktik menangani cara sendi yang tersekat bergerak, fisioterapi pula menangani kekuatan dan kawalan di sekelilingnya. Ramai yang mendapat manfaat daripada kedua-duanya, ditambah jarum kering, di bawah satu bumbung di Cheras. Hantar mesej kepada kami tentang kebimbangan utama anda dan kami akan tunjukkan titik permulaan.',
      },
    ],
    helpsWith: [
      'back-pain',
      'slipped-disc',
      'neck-pain',
      'sciatica',
      'scoliosis',
      'hip-pain',
      'shoulder-imbalance',
    ],
    relatedLinks: [
      { href: '/services/chiropractic-care', label: 'Bandingkan dengan jagaan kiropraktik' },
      { href: '/services/sports-injury-rehabilitation', label: 'Kecederaan sukan dan pemulihan' },
      { href: '/services/dry-needling', label: 'Jarum Kering untuk otot yang sentiasa tegang' },
      { href: '/services/posture-correction', label: 'Pembetulan postur untuk pekerja pejabat' },
      { href: '/what-to-expect', label: 'Apa yang dijangka pada lawatan pertama anda' },
    ],
    practitionersWithheld:
      "Same gate as the English record — client instruction, 2026-08-08. The clinic's physiotherapists are still within probation and are not to be named yet, and chiropractors are not licensed to deliver physiotherapy. Remove once the clinic supplies the physiotherapist list.",
    faqs: [
      {
        q: 'Apa yang berlaku semasa penilaian fisioterapi?',
        a: 'Lawatan fisioterapi pertama kebanyakannya adalah penilaian. Kami mengambil sejarah kesihatan, bertanya apa yang memburukkan atau meredakan masalah dan apa yang anda perlu kembali lakukan, kemudian melihat cara anda sebenarnya bergerak, menguji bahagian yang terjejas dan menyemak sendi serta otot di sekelilingnya. Matlamatnya adalah mengenal pasti punca sebenar masalah, bukan sekadar di mana anda rasa sakit, kerana kesakitan di satu tempat selalunya berpunca daripada cara bahagian lain bergerak. Daripada itu kami terangkan apa yang dijumpai dengan bahasa mudah dan bersetuju dengan satu pelan, yang biasanya menggabungkan sedikit jagaan secara tangan dengan program senaman kecil dan khusus.',
        links: [{ phrase: 'Lawatan fisioterapi pertama', href: '/what-to-expect' }],
      },
      {
        q: 'Berapa lama sesi pertama?',
        a: 'Kira-kira empat puluh lima minit hingga sejam, dan kebanyakannya adalah penilaian berbanding jagaan secara tangan. Anda patut pulang dengan mengetahui apa yang kami rasa berlaku.',
      },
      {
        q: 'Adakah sesi fisioterapi pertama menyakitkan?',
        a: 'Ia tidak sepatutnya menyakitkan secara keterlaluan. Sesetengah ujian mungkin sekejap mencetuskan semula gejala biasa anda supaya kami dapat mengenal pasti masalah dengan tepat, tetapi ahli fisioterapi anda akan bekerja dalam had keselesaan anda dan akan berhenti jika anda minta. Kesakitan ringan sehari selepas itu boleh berlaku, terutamanya selepas jagaan secara tangan.',
      },
      {
        q: 'Berapa banyak sesi fisioterapi yang saya perlukan?',
        a: 'Ia bergantung kepada masalah, berapa lama ia telah berlaku dan bagaimana senaman berkembang, jadi kami tidak akan memberikan bilangan tetap pada lawatan pertama. Menilai lebih awal selalunya bermakna sesi yang lebih sedikit berbanding membiarkan masalah menjadi kronik. Kami menyemak dengan jujur sepanjang proses berbanding menjual pakej terlebih dahulu.',
      },
      {
        q: 'Perlukah saya rujukan doktor untuk berjumpa ahli fisioterapi?',
        a: 'Tiada rujukan diperlukan untuk menempah bersama kami. Jika kes anda memerlukan imbasan atau pendapat perubatan dahulu, kami akan memberitahu dan membantu anda mengaturnya berbanding meneruskan begitu sahaja.',
      },
      {
        q: 'Adakah saya akan diberikan senaman untuk dilakukan di rumah?',
        a: 'Ya, dalam kebanyakan kes. Senaman selalunya menjadi punca kepada perubahan yang berkekalan, jadi kami menetapkan program kecil yang khusus dan meningkatkannya apabila anda bertambah baik. Ia direka untuk disesuaikan dengan hari biasa anda, bukan mengambil alih waktu malam anda.',
      },
      {
        q: 'Bolehkah saya menjalani fisioterapi dan jagaan kiropraktik bersama?',
        a: 'Ya, dan ramai pesakit di sini melakukannya. Kedua-duanya menangani perkara yang berbeza, jadi menggabungkannya adalah lazim, bukan luar biasa: jagaan kiropraktik menangani cara sendi yang tersekat bergerak dan fisioterapi membina kekuatan serta kawalan di sekelilingnya, manakala jarum kering turut digunakan bersama mana-mana satu apabila otot menjadi punca masalah. Penilaian menentukan titik permulaan dan sama ada kedua-duanya berbaloi digunakan sekali, dan kami akan memberitahu jika kami rasa satu sahaja sudah mencukupi.',
        links: [{ phrase: 'jarum kering', href: '/services/dry-needling' }],
      },
      {
        q: 'Di manakah anda berada di Cheras, dan adakah tempat letak kereta?',
        a: 'Kami berada di Signature 2 dalam pembangunan Sunway Velocity di Maluri, di sebelah Cheras, Kuala Lumpur. Tempat letak kereta pusat membeli-belah adalah pilihan paling mudah jika anda memandu, dan stesen Maluri serta Cochrane kedua-duanya dalam jarak berjalan kaki jika anda menaiki keretapi. Maluri adalah stesen pertukaran, jadi laluan Ampang, Sri Petaling dan Kajang semuanya sampai ke sini. Alamat penuh dan pautan peta terdapat di bahagian bawah setiap halaman.',
      },
      {
        q: 'Adakah anda dibuka pada hujung minggu?',
        a: 'Ya, kami dibuka tujuh hari termasuk hari Ahad. Sabtu sehingga 8 malam dan Ahad sehingga 3 petang, yang biasanya waktu paling mudah untuk ditempah jika hari bekerja sukar. Isnin hingga Khamis kami dibuka sehingga 8 malam dan Jumaat sehingga 5 petang.',
        links: [{ phrase: 'dibuka tujuh hari', href: '/book-now' }],
      },
    ],
    // Flipped for local preview only, at the user's request — still needs a Malay-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'dry-needling',
    title: 'Jarum Kering di Cheras, Kuala Lumpur',
    metaTitle: 'Jarum Kering di Cheras, KL',
    metaDescription:
      'Jarum Kering di Cheras, Maluri untuk otot tegang, titik pencetus dan simpulan otot. Penilaian dahulu, jarum sekali guna, jangkaan yang jujur.',
    // "otot tegang" 110 carian/bulan, SD 12 (Ubersuggest, locId 2458) — istilah simptom
    // yang digunakan orang ramai, berbanding "jarum kering" (terjemahan literal dry
    // needling) yang mencatat 0 carian.
    targetKeyword: 'otot tegang',
    intro:
      'Jarum Kering di Cheras. Satu teknik neuromuskular yang menggunakan jarum halus sekali guna untuk mencapai titik pencetus dan jalur otot tegang yang sukar dilepaskan dengan tangan sahaja. Kami menggunakannya sebagai sebahagian daripada pelan yang lebih luas, bukan bersendirian, dan hanya apabila penilaian menunjukkan otot adalah punca utama masalah anda.',
    heroImage: {
      src: '/img/dry-needling.webp',
      alt: 'Pengamal bersarung tangan melakukan jarum kering pada belakang atas dan bahu pesakit di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    ogImage: '/og/dry-needling.jpg',
    midImage: {
      src: '/img/dry-needling-session.webp',
      alt: 'Pengamal bersarung tangan meletakkan jarum sekali guna ke titik pencetus di bahu pesakit di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    assurances: ['Jarum steril sekali guna, tidak pernah digunakan semula', 'Kami menilai dahulu sebelum menjarum', 'Buka 7 hari · Cheras, Maluri'],
    outcomes: [
      {
        text: 'Otot yang tegang dan menyimpul, tidak lega dengan regangan atau urutan',
        image: {
          src: '/img/dn-tight-knot.webp',
          alt: 'Ilustrasi simpulan otot yang menyala di leher dan belakang atas seseorang',
        },
      },
      {
        text: 'Ketegangan otot yang mendalam, berkaitan masalah leher, bahu atau pinggang bawah',
        image: {
          src: '/img/dn-deep-tension.webp',
          alt: 'Ilustrasi ketegangan otot mendalam yang menyala di pinggang bawah seseorang',
        },
      },
      {
        text: 'Titik pencetus yang terus merujuk sakit ke tempat yang sama',
        image: {
          src: '/img/dn-trigger-points.webp',
          alt: 'Ilustrasi titik pencetus di bahu seseorang, sakit dirujuk sepanjang lengan',
        },
      },
      {
        text: 'Otot yang kekal tegang dan terlalu aktif selepas kecederaan lama',
        image: {
          src: '/img/dn-old-injury.webp',
          alt: 'Ilustrasi otot sekitar lutut seseorang yang menyala selepas kecederaan lama',
        },
      },
    ],
    qualifierConcerns: [
      { label: 'Saya ada simpulan otot yang tidak mahu lega', icon: 'knot' },
      { label: 'Urutan membantu sehari, kemudian ketegangan kembali', icon: 'recurring' },
      { label: 'Leher atau bahu saya sentiasa terasa tegang', icon: 'neck' },
      { label: 'Kecederaan lama meninggalkan otot yang tegang dan terlalu aktif', icon: 'injury' },
      { label: 'Saya pernah menjalani jarum kering dan ia membantu', icon: 'needle' },
      { label: 'Saya gementar dengan jarum dan mahu bertanya dahulu', icon: 'question' },
    ],
    citations: [
      {
        claim: 'Titik pencetus miofasial ditakrifkan sebagai titik yang sangat sensitif dalam jalur ketat otot rangka.',
        source: 'McAphee et al. (2022), International Journal of Sports Physical Therapy',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9159711/',
      },
      {
        claim: 'Kajian mengenai jarum kering titik pencetus melaporkan kesan sampingan biasanya ringan dan sementara, seperti kesakitan atau lebam kecil.',
        source: 'Brady et al. (2014), Journal of Manual & Manipulative Therapy',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4101552/',
      },
      {
        claim: 'Di Malaysia, kiropraktik dan fisioterapi adalah amalan penjagaan kesihatan yang dikawal selia, dan pengamal dijangka memiliki kelayakan yang diiktiraf.',
        source: 'Ministry of Health Malaysia',
        url: 'https://www.moh.gov.my/en/corporate-info/division-information/traditional-and-complementary-medicine-division',
      },
    ],
    fitCheck: {
      rightFor: [
        'Satu otot kekal tegang walaupun sudah diregang dan diurut, dan anda mahu tahu sebabnya.',
        'Anda mahu jarum kering menjadi sebahagian daripada pelan, bersama senaman atau pelarasan.',
        'Anda mementingkan jarum steril sekali guna dan pengamal yang menyemak sejarah kesihatan anda dahulu.',
        'Anda lebih suka diberitahu ia tidak sesuai berbanding terus dijarum.',
      ],
      notRightFor: [
        'Anda mahu terus dijarum tanpa penilaian mengapa otot itu tegang.',
        'Anda mempunyai ketakutan yang kuat terhadap jarum. Kami lebih suka menggunakan pendekatan lain berbanding memujuk anda menerima ini.',
        'Anda mahu jarum kering secara bersendirian, tanpa senaman atau susulan antara sesi.',
        'Anda sebenarnya mencari akupunktur. Ia menggunakan jarum yang serupa tetapi memilih titik secara berbeza, dan bukan perkhidmatan yang kami tawarkan.',
      ],
      note: 'Jika mana-mana daripada itu berkenaan dengan anda, ia tidak bermakna kami tidak boleh membantu. Ia bermakna jarum kering mungkin bukan tempat kami akan mulakan, dan lawatan pertama adalah tepat untuk menentukan itu. Kami lebih suka menunjukkan pendekatan yang sesuai berbanding menjual apa yang anda minta semasa masuk.',
    },
    sections: [
      {
        heading: 'Jarum Kering di Cheras',
        body: 'Jarum Kering adalah teknik neuromuskular yang menggunakan jarum halus sekali guna untuk mencapai titik pencetus dan jalur otot tegang yang sukar dilepaskan dengan tangan sahaja. Kami menggunakannya sebagai sebahagian daripada pelan yang lebih luas, bukan bersendirian, dan hanya apabila penilaian menunjukkan otot adalah punca utama masalah.',
      },
      {
        heading: 'Apa sebenarnya jarum kering lakukan',
        body: 'Titik pencetus adalah simpulan ketat dan sensitif yang boleh merujuk sakit ke tempat lain. Jarum yang diletakkan padanya sering mencetuskan sentakan sekejap, tanda otot itu melepaskan. Berapa banyak ia membantu bergantung kepada apa yang mengekalkan otot itu tegang.',
      },
      {
        heading: 'Apa yang berlaku semasa satu sesi',
        body: 'Kami menilai dahulu, kemudian meletakkan jarum halus pada titik yang dijumpai. Jangkakan sentakan sekejap atau rasa berdenyut tumpul, bukan sakit tajam. Sesi mengambil masa lima belas hingga tiga puluh minit dan membentuk senaman atau kerja secara tangan yang digabungkan bersamanya.',
      },
      {
        heading: 'Selamatkah, dan apa yang perlu dijangka selepasnya',
        body: 'Jarum Kering secara umumnya sangat selamat di tangan yang terlatih, dengan jarum steril digunakan sekali sahaja. Kesakitan ringan atau lebam kecil untuk sehari atau lebih adalah lazim dan reda dengan sendirinya. Beritahu kami jika anda hamil, mengambil ubat pengencer darah, atau tidak selesa dengan jarum.',
      },
      {
        heading: 'Bagaimana ia sepadan dengan jagaan lain anda',
        body: 'Menjarum melegakan ketegangan tetapi tidak membetulkan tabiat atau kelemahan yang menyebabkan otot itu tegang. Di bawah satu bumbung di Cheras, kami menggabungkannya dengan jagaan kiropraktik dan fisioterapi. Penilaian menentukan titik permulaan.',
      },
      {
        heading: 'Berapa banyak sesi yang mungkin diperlukan',
        body: 'Ini bergantung kepada berapa lama masalah itu wujud, jadi kami tidak akan memberikan angka tetap terlebih dahulu. Sesetengah orang perasan perubahan dengan cepat, yang lain memerlukan sokongan selama beberapa minggu. Kami mengkaji semula secara jujur mengikut perkembangan, bukan menjual pakej.',
      },
    ],
    helpsWith: ['back-pain', 'neck-pain', 'shoulder-imbalance', 'sciatica'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: 'Bagaimana jarum kering sepadan dengan fisioterapi' },
      { href: '/services/chiropractic-care', label: 'Bandingkan dengan jagaan kiropraktik' },
      { href: '/what-to-expect', label: 'Apa yang dijangka pada lawatan pertama anda' },
    ],
    faqs: [
      {
        q: 'Perlukah saya rujukan untuk jarum kering?',
        a: 'Tidak. Anda boleh terus membuat temu janji dengan kami di Cheras. Kami menilai dahulu sebelum sebarang jarum digunakan, dan jika jarum kering bukan pendekatan yang sesuai untuk kes anda, kami akan memberitahu.',
      },
      {
        q: 'Berapa lama sesi pertama?',
        a: 'Sekitar empat puluh lima minit hingga satu jam, dan kebanyakannya adalah penilaian berbanding menjarum. Anda sepatutnya pulang dengan mengetahui apa yang kami rasa berlaku.',
      },
      {
        q: 'Adakah jarum kering sama dengan akupunktur?',
        a: 'Tidak. Jarum Kering adalah teknik berasaskan anatomi dari Barat: jarum filamen halus diletakkan terus ke titik pencetus miofasial, satu simpulan kecil yang sangat sensitif dalam jalur otot tegang, dengan tujuan melepaskan ketegangan itu. Tiada apa-apa disuntik, itulah asal perkataan "dry" (kering). Akupunktur menggunakan jarum yang serupa tetapi berasal dari perubatan tradisional Cina dan memilih titik sepanjang meridian berbanding mengikut anatomi otot. Di sini, ia adalah satu alat dalam pelan berpandukan penilaian, bukan terapi bersendirian.',
        links: [{ phrase: 'pelan berpandukan penilaian', href: '/what-to-expect' }],
      },
      {
        q: 'Adakah jarum kering menyakitkan?',
        a: 'Kebanyakan pesakit menggambarkannya sebagai sentakan sekejap atau rasa berdenyut tumpul berbanding sakit tajam. Kesakitan ringan selepas itu adalah lazim dan biasanya reda dalam sehari. Beritahu pengamal anda jika ia terasa lebih daripada tidak selesa, kerana teknik boleh diubah atau dihentikan.',
      },
      {
        q: 'Berapa banyak sesi jarum kering yang saya perlukan?',
        a: 'Ini bergantung kepada berapa lama otot itu telah tegang dan apa yang mengekalkannya sedemikian, jadi kami tidak akan mengesahkan satu angka pada lawatan pertama. Sesetengah orang perasan perubahan dengan cepat, yang lain memerlukan sokongan selama beberapa minggu bersama senaman. Kami mengkaji semula mengikut perkembangan, bukan menjual pakej tetap.',
      },
      {
        q: 'Adakah jarum selamat? Adakah ia digunakan semula?',
        a: 'Jarum tidak pernah digunakan semula. Kami menggunakan jarum steril sekali guna yang dibuang selepas satu sesi. Jarum Kering secara umumnya sangat selamat di tangan yang terlatih, walaupun kesakitan ringan atau lebam kecil selepasnya adalah mungkin dan normal.',
      },
      {
        q: 'Adakah jarum kering selamat? Ada kesan sampingan?',
        a: 'Ia secara umumnya dianggap selamat apabila dilakukan oleh pengamal terlatih menggunakan jarum steril sekali guna. Kesan selepas yang paling biasa adalah ringan dan singkat: kesakitan sementara di tempat jarum, dan kadangkala lebam kecil, biasanya reda dalam sehari dua. Anda boleh makan, minum, bekerja dan bersenam seperti biasa selepasnya. Kami menyemak sejarah kesihatan anda dahulu, kerana terdapat keadaan seperti kehamilan, ubat yang menjejaskan pembekuan darah, atau ketakutan kuat terhadap jarum, di mana kami akan memilih pendekatan lain. Kami biasanya menggabungkan satu sesi dengan senaman tertentu supaya otot mempunyai sebab untuk kekal lega.',
        links: [{ phrase: 'senaman tertentu', href: '/services/physiotherapy' }],
      },
      {
        q: 'Apa yang jarum kering boleh bantu?',
        a: 'Orang paling kerap datang kepada kami apabila satu otot kekal tegang walaupun sudah diregang dan diurut, apabila titik pencetus terus merujuk sakit ke tempat yang sama, atau apabila kecederaan lama meninggalkan otot yang tegang dan terlalu aktif. Ia biasa digunakan di sekitar leher, bahu dan pinggang bawah, dan bersama jagaan untuk keadaan seperti sciatica dan ketidakseimbangan bahu. Menjarum dapat menenangkan otot yang sensitif, tetapi dengan sendirinya ia tidak mengubah tabiat, kelemahan atau sekatan sendi yang membiarkannya tegang, itulah sebabnya kami menggabungkannya dengan jagaan kiropraktik apabila dapatan menunjukkan ke arah itu.',
        links: [
          { phrase: 'sciatica', href: '/conditions/sciatica' },
          { phrase: 'ketidakseimbangan bahu', href: '/conditions/shoulder-imbalance' },
          { phrase: 'jagaan kiropraktik', href: '/services/chiropractic-care' },
        ],
      },
      {
        q: 'Patutkah saya jarum kering atau pelarasan kiropraktik?',
        a: 'Ini bergantung kepada dapatan penilaian, dan kedua-duanya sering digunakan bersama berbanding sebagai alternatif. Secara umum, menjarum menangani otot yang tegang dan sensitif manakala pelarasan menangani cara sendi tulang belakang bergerak. Jika tidak pasti, mesej kami tentang kebimbangan utama anda dan kami akan tunjukkan titik permulaan yang betul.',
      },
    ],
    // Client request 2026-08-09, menu only and deliberately so: the page stays live, indexed
    // and bookable, and "(Coming Soon)" is a title for now. Same client instruction applies
    // per locale — see the English record.
    navBadge: '(Akan Datang)',
    // Flipped for local preview only, at the user's request — still needs a Malay-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'sports-injury-rehabilitation',
    title: 'Kecederaan Sukan & Pemulihan di Cheras, Kuala Lumpur',
    metaTitle: 'Jagaan Kecederaan Sukan di Cheras, KL',
    metaDescription:
      'Penilaian kecederaan sukan, pemulihan berperingkat dan kembali bersukan berdasarkan kriteria di Cheras, Maluri. Terseliuh, tercedera otot dan kecederaan penggunaan berlebihan, buka 7 hari.',
    // "kecederaan sukan" purata 170/mo (memuncak 720/mo semasa musim sukan sekolah pada
    // Julai), SD 14 (Ubersuggest, locId 2458) — jauh lebih baik daripada varian yang lebih
    // "tempatan" seperti "kecederaan sukan kl" (0/mo), mengikut corak yang sama seperti
    // rekod Inggeris: modifier kebangsaan berprestasi lebih baik daripada modifier bandar.
    targetKeyword: 'kecederaan sukan',
    intro:
      'Jagaan kecederaan sukan di Cheras. Kami menilai apa yang gagal dan mengapa, kemudian bekerja melalui pemulihan berperingkat bertujuan mengembalikan anda kepada sukan anda tanpa membawa kelemahan yang sama bersama.',
    heroImage: {
      src: '/img/rehab-ankle.webp',
      alt: 'Pengamal melekatkan pita kinesiologi pada bahagian bawah kaki pesakit di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    ogImage: '/og/rehab-ankle.jpg',
    midImage: {
      src: '/img/adjustment-hip.webp',
      alt: 'Kiropraktor bekerja pada pinggul pesakit di atas meja terapi di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    assurances: ['Dinilai sebelum diberikan pelan', 'Kembali bersukan secara berperingkat, bukan sekadar rehat', 'Buka 7 hari · Cheras, Maluri'],
    outcomes: [
      {
        text: 'Terseliuh, tercedera otot atau kecederaan penggunaan berlebihan yang mahu dinilai',
        image: {
          src: '/img/physio-weakness.webp',
          alt: 'Ilustrasi sakit buku lali yang menyala pada seorang wanita duduk di meja dengan kaki di lantai',
        },
      },
      {
        text: 'Sakit yang tercetus semasa atau selepas bersukan',
        image: {
          src: '/img/physio-recent-strain.webp',
          alt: 'Ilustrasi sakit pinggang bawah yang menyala pada seorang lelaki berdiri di kaunter dapur dengan tangan di belakangnya',
        },
      },
      {
        text: 'Kecederaan yang terus berulang apabila kembali berlatih',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: 'Ilustrasi otot leher dan bahu yang menyala pada seorang lelaki memegang sisi lehernya',
        },
      },
      {
        text: 'Pelan berperingkat kembali bersukan, bukan sekadar rehat',
        image: {
          src: '/img/sports-staged-return.webp',
          alt: 'Wanita mengimbangi di atas satu kaki di bantal goyang manakala seorang terapis menstabilkan tangannya',
        },
      },
      {
        text: 'Pemulihan yang diteruskan selepas pembedahan, dalam had yang ditetapkan pakar bedah anda',
        image: {
          src: '/img/sports-post-surgical.webp',
          alt: 'Klinisi membimbing seorang lelaki duduk melalui julat pergerakan bahu di bilik klinik',
        },
      },
    ],
    qualifierConcerns: [
      'Saya ada terseliuh, tercedera otot atau kecederaan penggunaan berlebihan',
      'Sakit tercetus semasa atau selepas bersukan',
      'Kecederaan saya terus berulang apabila kembali berlatih',
      'Saya mahu pelan yang jelas untuk kembali bersukan',
      'Saya sedang menjalani pemulihan selepas pembedahan',
      'Saya cedera pada hujung minggu dan bukan seorang atlet',
    ],
    citations: [
      {
        claim: 'Keputusan kembali bersukan paling baik dipandu oleh kriteria seperti kekuatan dan ujian fungsi berbanding masa sahaja, yang membantu mengurangkan risiko kecederaan berulang.',
        source: 'Ardern et al. (2016), Consensus statement on return to sport, British Journal of Sports Medicine',
        url: 'https://bjsm.bmj.com/content/50/14/853',
      },
      {
        claim: 'Bagi kebanyakan kecederaan tisu lembut, pergerakan awal yang dipandu dalam had kesakitan umumnya lebih digemari berbanding imobilisasi berpanjangan.',
        source: 'British Journal of Sports Medicine',
        url: 'https://bjsm.bmj.com/content/54/2/72',
      },
    ],
    fitCheck: {
      rightFor: [
        'Anda mahu keputusan kembali bersukan ditentukan oleh keupayaan kawasan itu, bukan kalendar.',
        'Anda bersedia melakukan latihan kekuatan berperingkat berbanding menunggu sakit hilang sendiri.',
        'Anda mahu terus berlatih di mana selamat, dengan bebanan diselaraskan berbanding dihentikan.',
        'Anda mahu jawapan jujur tentang kesediaan, walaupun bukan jawapan yang anda harapkan.',
      ],
      notRightFor: [
        'Anda mahu tarikh untuk kembali bersukan sebelum kawasan itu diuji di bawah bebanan.',
        'Anda mahu sakit reda tetapi mahu melangkau latihan kekuatan yang mengekalkannya reda.',
        'Anda mahu terus berlatih tepat seperti sebelumnya, tanpa sebarang perubahan bebanan atau pergerakan.',
        'Kecederaan mungkin memerlukan pakar bedah atau imbasan dahulu. Kami akan merujuk anda berbanding memulakan pemulihan begitu sahaja.',
      ],
      note: 'Tiada satu pun daripada itu menjadikan anda pesakit yang sukar, dan kebanyakannya hanyalah bunyi tergesa-gesa untuk kembali. Ia bermakna kami akan memberikan jawapan jujur tentang kesediaan berbanding mengesahkan satu tarikh, dan itulah bahagian yang menentukan sama ada kecederaan yang sama akan berulang dalam tiga bulan. Jika itu yang anda mahukan daripada sebuah klinik, lawatan pertama adalah permulaannya.',
    },
    sections: [
      {
        heading: 'Pemulihan kecederaan sukan di Cheras',
        body: 'Jagaan kecederaan sukan di Cheras. Kami menilai apa yang gagal dan mengapa, kemudian bekerja melalui pemulihan berperingkat bertujuan mengembalikan anda kepada sukan anda tanpa membawa kelemahan yang sama bersama. Ini merangkumi terseliuh, tercedera otot dan kecederaan penggunaan berlebihan, pada atlet dan pada mereka yang sekadar berlatih pada hujung minggu.',
      },
      {
        heading: 'Mencari apa yang gagal, dan mengapa',
        body: 'Kecederaan biasanya adalah hujung yang kelihatan daripada sesuatu yang sudah tidak kena: kelemahan, corak pergerakan, atau bebanan yang meningkat terlalu cepat. Kami menilai kawasan yang cedera dan cara anda bergerak di sekelilingnya. Mengapa ia berlaku membentuk selebihnya pelan.',
      },
      {
        heading: 'Pemulihan berperingkat, dari menenangkan kepada membebankan semula',
        body: 'Pemulihan bergerak melalui peringkat, bukan sekaligus. Pada peringkat awal kami melindungi kawasan itu dan mengekalkannya bergerak; apabila ia reda kami membina semula julat pergerakan, kemudian kekuatan, kemudian kepantasan dan ketangkasan yang dituntut sukan anda. Setiap peringkat perlu stabil sebelum yang seterusnya bermula.',
      },
      {
        heading: 'Kembali bersukan berdasarkan kriteria, bukan tarikh',
        body: 'Kami membenarkan anda kembali berdasarkan keupayaan kawasan itu, bukan berapa minggu telah berlalu. Ini bermakna menguji kekuatan, keseimbangan dan pergerakan khusus sukan, kemudian membebankan semula secara beransur-ansur. Kembali terlalu awal adalah sebab paling lazim kecederaan berulang.',
      },
      {
        heading: 'Sokongan pemulihan dan modaliti terapeutik',
        body: 'Selain kerja aktif, kami menggunakan terapi tambahan untuk melegakan sakit dan menyokong pemulihan tisu pada peringkat awal. Ini menjadikan pemulihan mungkin dilakukan, bukan menggantikannya. Apabila jarum kering atau jagaan secara tangan membantu, kami menggabungkannya di bawah satu bumbung.',
      },
      {
        heading: 'Kestabilan teras dan tulang belakang untuk ketahanan',
        body: 'Kerja bersasar untuk otot penstabil dalam yang menyokong tulang belakang dan mengawal batang tubuh di bawah bebanan. Kestabilan yang baik pada bahagian tengah menjadikan anggota badan lebih cekap dan keseluruhan sistem lebih tahan lasak, mengurangkan kemungkinan kecederaan berulang.',
      },
    ],
    helpsWith: ['back-pain', 'shoulder-imbalance', 'hip-pain'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: 'Pendekatan fisioterapi kami' },
      { href: '/services/dry-needling', label: 'Jarum Kering untuk ketegangan otot' },
      { href: '/what-to-expect', label: 'Apa yang dijangka pada lawatan pertama anda' },
    ],
    faqs: [
      {
        q: 'Perlukah saya rujukan?',
        a: 'Tiada rujukan diperlukan untuk membuat temu janji dengan kami di Cheras. Bawa sebarang laporan imbasan atau nota daripada doktor atau pakar bedah jika ada, kerana ia menjimatkan masa semasa penilaian.',
      },
      {
        q: 'Berapa lama sesi pertama?',
        a: 'Sekitar empat puluh lima minit hingga satu jam, kebanyakannya penilaian. Anda sepatutnya pulang dengan mengetahui apa yang kami rasa gagal dan bagaimana peringkat pertama pemulihan kelihatan.',
      },
      {
        q: 'Adakah saya akan berjumpa kiropraktor atau fisioterapis?',
        a: 'Mana-mana yang ditunjukkan oleh penilaian, dan selalunya kedua-duanya. Kedua-dua disiplin berada di bawah satu bumbung di sini, jadi anda tidak diarahkan berdasarkan siapa yang kebetulan lapang.',
      },
      {
        q: 'Berapa cepat selepas kecederaan saya patut dinilai?',
        a: 'Sebaik sahaja bengkak akut sudah reda cukup untuk menggerakkan kawasan itu, penilaian biasanya lebih bermaklumat. Jika anda tidak dapat menanggung berat pada anggota itu, atau terdapat kecacatan jelas atau bengkak teruk, pergi ke jabatan kecemasan dahulu berbanding membuat temu janji dengan kami.',
      },
      {
        q: 'Bilakah saya boleh kembali bersukan?',
        a: 'Ini bergantung kepada kecederaan, sukan, dan bagaimana pemulihan berkembang, jadi kami tidak akan memberikan tarikh pada lawatan pertama. Kami membuat keputusan berdasarkan apa yang kawasan itu boleh lakukan di bawah ujian berbanding simptom sahaja, kerana kembali sebelum tisu dapat menanggung bebanan adalah sebab paling lazim kecederaan berulang.',
      },
      {
        q: 'Bagaimana pemulihan kecederaan sukan berkembang?',
        a: 'Ia bergerak melalui peringkat berbanding sekaligus. Pada peringkat awal matlamatnya melindungi kawasan yang cedera dan mengekalkannya bergerak tanpa memburukkan keadaan. Apabila ia reda kami membina semula julat pergerakan, kemudian kekuatan, kemudian kepantasan, kawalan dan ketangkasan yang dituntut sukan anda. Setiap peringkat perlu stabil sebelum yang seterusnya bermula, dan sepantas mana anda berkembang bergantung kepada kecederaan dan bagaimana anda bertindak balas berbanding jadual tetap.',
      },
      {
        q: 'Kecederaan sukan mana yang paling kerap anda lihat?',
        a: 'Yang paling lazim adalah yang datang daripada bebanan berbanding perlanggaran: pelari dengan masalah lutut, tulang kering atau achilles, kecederaan gim di sekitar bahu dan pinggang bawah, serta terseliuh buku lali yang tidak pernah benar-benar reda selepas kali pertama. Sukan raket dan gelanggang membawa masalah bahu dan siku tersendiri. Sebahagian besar yang kami lihat adalah kecederaan berulang berbanding kecederaan baru, yang biasanya menunjukkan satu peringkat pemulihan yang terputus pada kali pertama. Kami juga melihat banyak sakit pinggang dan sakit pinggul yang tiada kaitan dengan sukan, dan pendekatan berperingkat di sebaliknya adalah sama.',
        links: [
          { phrase: 'sakit pinggang', href: '/conditions/back-pain' },
          { phrase: 'sakit pinggul', href: '/conditions/hip-pain' },
        ],
      },
      {
        q: 'Bolehkah saya terus berlatih semasa menjalani pemulihan?',
        a: 'Biasanya boleh, dengan apa yang anda lakukan dan berapa banyak diselaraskan berbanding dihentikan sepenuhnya. Rehat sepenuhnya jarang menjadi matlamat, kerana kehilangan keadaan fizikal mencipta masalahnya sendiri dan kebanyakan orang lebih baik apabila sesuatu terus membebankan bahagian lain badan. Apa yang berubah adalah pergerakan yang mencetuskan kecederaan, jumlahnya, dan kadangkala permukaan atau tempo. Menentukan apa yang boleh anda teruskan dengan selamat adalah sebahagian daripada penilaian berbanding renungan kemudian, dan apabila satu otot kekal berjaga-jaga, kami mungkin menggunakan jarum kering bersama latihan kekuatan.',
        links: [
          { phrase: 'penilaian', href: '/what-to-expect' },
          { phrase: 'jarum kering', href: '/services/dry-needling' },
        ],
      },
      {
        q: 'Adakah anda melayani bukan atlet, dan kecederaan hujung minggu atau kerja meja?',
        a: 'Ya. Pinggang yang terseliuh akibat mengangkat, lutut yang tercetus selepas berlari hujung minggu, atau kecederaan penggunaan berlebihan daripada kerja berulang, semuanya didekati dengan cara yang sama, dengan menilai apa yang berlaku dan membina semula kawasan itu dengan betul. Anda tidak perlu bertanding dalam apa-apa untuk dinilai.',
      },
      {
        q: 'Perlukah saya imbasan atau X-ray sebelum memulakan?',
        a: 'Biasanya tidak. Kebanyakan terseliuh dan tercedera otot didiagnosis daripada penilaian itu sendiri. Jika sesuatu menunjukkan kecederaan yang lebih serius memerlukan imbasan atau pendapat perubatan, kami akan memberitahu dan membantu anda mengaturkannya berbanding meneruskan begitu sahaja.',
      },
      {
        q: 'Bolehkah anda membantu pemulihan selepas pembedahan?',
        a: 'Selalunya boleh, sebaik sahaja pakar bedah anda bersetuju pemulihan boleh bermula dan dalam sebarang had yang mereka tetapkan. Kami bekerja mengikut protokol untuk prosedur anda dan meningkatkan bebanan mengikut apa yang tisu itu mampu. Bawa sebarang nota atau panduan daripada pasukan pembedahan anda pada lawatan pertama.',
      },
    ],
    // Flipped for local preview only, at the user's request — still needs a Malay-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'chiropractic-care',
    title: 'Jagaan Kiropraktik Gonstead di Cheras, Kuala Lumpur',
    metaTitle: 'Jagaan Kiropraktik di Cheras, KL',
    metaDescription:
      'Kiropraktik Gonstead di Cheras, Maluri. Penilaian tulang belakang segmen demi segmen dan pelarasan yang tepat untuk penjajaran tulang dan badan, bukan urutan umum.',
    // Setiap istilah kiropraktik langsung ("kiropraktor" sendiri) mencatat 0/mo. "urut sendi"
    // (20/mo, SD 20) adalah petunjuk bukan-sifar terbaik yang dijumpai — data nipis, sama
    // seperti keputusan sedia ada untuk `sports-injury-rehabilitation` (Ubersuggest, MY,
    // locId 2458). Kandungan tetap jujur tentang perbezaan dengan urutan biasa dalam FAQ.
    targetKeyword: 'urut sendi',
    intro:
      'Jagaan kiropraktik Gonstead di Cheras. Kami menilai tulang belakang segmen demi segmen sebelum sebarang pelarasan dilakukan, supaya kerja tertumpu pada segmen yang benar-benar mendorong masalah anda. Itu tidak semestinya di tempat anda merasakan sakit.',
    heroImage: {
      src: '/img/adjustment-back.webp',
      alt: 'Kiropraktor meletakkan kedua-dua tangan di pinggang bawah pesakit sebelum pelarasan di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    },
    ogImage: '/og/chiropractic-care.jpg',
    midImage: {
      src: '/img/consultation-assessment.webp',
      alt: 'Kiropraktor Gonstead menilai penjajaran tulang belakang sebelum pelarasan di Cheras, Kuala Lumpur',
    },
    assurances: [
      'Dinilai segmen demi segmen sebelum sebarang pelarasan',
      'Kami akan memberitahu jika jagaan kiropraktik bukan pendekatan yang betul',
      'Buka 7 hari · Cheras, Maluri',
    ],
    outcomes: [
      {
        text: 'Sakit belakang, leher atau sendi yang mahu dinilai segmen demi segmen',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: 'Ilustrasi otot leher dan bahu yang menyala pada seorang lelaki memegang sisi lehernya',
        },
      },
      {
        text: 'Masalah berulang yang ingin anda fahami, bukan sekadar disembunyikan',
        image: {
          src: '/img/hero-consult-xray.webp',
          alt: 'Kiropraktor menerangkan X-ray tulang belakang kepada pesakit di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
        },
      },
      {
        text: 'Pelarasan yang tepat, berbanding urutan umum',
        image: {
          src: '/img/adjustment-hip.webp',
          alt: 'Kiropraktor bekerja pada pinggul pesakit di atas meja terapi di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
        },
      },
      {
        text: 'Mahu tahu sama ada pendekatan Gonstead sesuai untuk kes anda',
        image: {
          src: '/img/hero-consult-spine-model.webp',
          alt: 'Kiropraktor menerangkan anatomi tulang belakang menggunakan model tulang belakang kepada pesakit di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
        },
      },
    ],
    qualifierConcerns: [
      'Saya ada sakit belakang, leher atau sendi',
      'Masalah saya terus berulang',
      'Saya mahu memahami punca sebenar',
      'Saya seorang atlet dan mahu menguruskan kecederaan atau meningkatkan prestasi',
      'Saya hamil atau membawa anak dan mahukan penilaian yang lembut',
      'Saya tiada masalah khusus tetapi berminat dengan jagaan kesihatan',
      'Saya ingin tahu sama ada jagaan kiropraktik sesuai untuk kes saya',
    ],
    citations: [
      {
        claim: 'Pengimejan rutin tidak disyorkan untuk sakit tulang belakang tidak spesifik dan hanya dinasihatkan apabila terdapat petunjuk klinikal tertentu.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
      {
        claim: 'Kiropraktik adalah amalan penjagaan kesihatan yang dikawal selia; di Malaysia pengamal berdaftar di bawah rangka kerja Kementerian Kesihatan.',
        source: 'Association of Chiropractic Malaysia; Ministry of Health Malaysia',
        url: 'https://www.moh.gov.my/en/corporate-info/division-information/traditional-and-complementary-medicine-division',
      },
    ],
    fitCheck: {
      rightFor: [
        'Anda mahu masalah dinilai segmen demi segmen sebelum sebarang pelarasan dilakukan.',
        'Anda lebih suka diberitahu dengan jujur apabila pelarasan bukan langkah yang sesuai pada hari itu.',
        'Anda mahu memahami apa yang menyebabkan masalah terus berulang, bukan sekadar meredakannya.',
        'Anda mahu pelarasan yang tepat pada segmen terlibat, berbanding urutan umum.',
      ],
      notRightFor: [
        'Anda mahu terus dilaras tanpa dinilai dahulu.',
        'Anda menjangkakan setiap lawatan berakhir dengan bunyi "krek", tidak kira apa dapatan penilaian.',
        'Anda mahu bilangan lawatan atau hasil dijanjikan sebelum kami melihat keadaan anda.',
        'Masalah anda bukan bersifat mekanikal. Kiropraktik tidak menangani jangkitan, patah tulang atau penyakit organ, dan kami akan merujuk anda berbanding melaras anda.',
      ],
      note: 'Tiada satu pun daripada itu menjadikan anda pesakit yang sukar. Ia bermakna lawatan pertama di sini tidak akan memberikan apa yang anda cari, dan kami lebih suka memberitahu sekarang berbanding di penghujung temu janji yang telah anda bayar. Jika apa yang anda mahukan ialah penilaian dahulu dan jawapan jujur tentang sama ada pelarasan adalah langkah yang sesuai, itulah tepat yang disediakan pada lawatan pertama.',
    },
    helpsWith: ['back-pain', 'slipped-disc', 'sciatica', 'neck-pain', 'scoliosis'],
    relatedLinks: [
      { href: '/what-to-expect', label: 'Apa yang dijangka pada lawatan pertama anda' },
      { href: '/services/physiotherapy', label: 'Bandingkan dengan fisioterapi' },
      { href: '/services/dry-needling', label: 'Jarum Kering di Cheras' },
    ],
    faqs: [
      {
        q: 'Adakah saya akan dilaras pada lawatan pertama?',
        a: 'Selalunya ya, tetapi tidak semestinya. Penilaian sentiasa dahulu, dan jika ia menunjukkan hari itu bukan hari yang sesuai untuk melaras anda, kami akan memberitahu berbanding tetap meneruskan.',
      },
      {
        q: 'Apa itu kaedah Gonstead?',
        a: 'Gonstead adalah teknik kiropraktik yang dibina di sekitar penilaian enam langkah yang terperinci sebelum sebarang pelarasan dilakukan. Ini termasuk penggunaan instrumen dan, apabila perlu, analisis X-ray. Tujuannya adalah untuk mengenal pasti dengan tepat segmen yang terlibat berbanding bekerja pada kawasan secara umum.',
      },
      {
        q: 'Perlukah saya X-ray sebelum jagaan kiropraktik?',
        a: 'X-ray memberikan kami gambaran yang lebih jelas tentang apa yang berlaku pada tulang belakang anda: bagaimana setiap segmen berada, dan sama ada terdapat sebarang patologi. Itulah yang membolehkan penilaian Gonstead menamakan segmen tertentu yang terlibat berbanding bekerja secara umum. Ia tidak wajib, walaupun begitu, dan kami selalunya tidak menggunakannya untuk wanita hamil dan kanak-kanak. Kiropraktor anda akan menerangkan sama ada pengimejan sesuai untuk kes anda dan sebabnya.',
      },
      {
        q: 'Adakah jagaan kiropraktik sama dengan urut tulang atau tit tar?',
        a: 'Tidak. Kiropraktik adalah profesion penjagaan kesihatan yang dikawal selia dengan latihan universiti formal, dan penilaian sentiasa dilakukan sebelum sebarang pelarasan. Urut tulang tradisional beroperasi secara berbeza dan tidak dikawal selia dengan cara yang sama. Kami menggalakkan anda bertanya kepada mana-mana pengamal tentang kelayakan mereka terlebih dahulu.',
      },
      {
        q: 'Bolehkah saya berjumpa kiropraktor semasa hamil?',
        a: 'Boleh, kehamilan adalah salah satu sebab paling lazim orang datang kepada kami, dan kami melaras sepanjang tempoh itu dengan kerap. Kami mengelakkan pengimejan semasa kehamilan melainkan terdapat sebab yang kukuh, dan penilaian serta kedudukan kedua-duanya berubah mengikut peredaran kehamilan. Beritahu kiropraktor anda berapa lama tempoh kehamilan anda pada lawatan pertama supaya pendekatan boleh ditetapkan dengan sewajarnya.',
      },
      {
        q: 'Adakah anda melayani kanak-kanak dan remaja?',
        a: 'Ya, klinik menjaga pesakit semua peringkat umur, dan kanak-kanak dinilai secara berbeza daripada orang dewasa berbanding diberikan versi kecil jagaan dewasa. Kami secara amnya tidak menggunakan X-ray untuk kanak-kanak. Ibu bapa atau penjaga kekal di dalam bilik sepanjang masa, dan kami akan menerangkan apa yang kami perhatikan sambil berjalan.',
      },
      {
        q: 'Apakah risiko dan kesan sampingan jagaan kiropraktik?',
        a: 'Pelarasan kiropraktik digunakan secara meluas untuk masalah tulang belakang dan sendi yang bersifat mekanikal, dan komplikasi serius dianggap jarang berlaku apabila jagaan mengikut penilaian yang betul. Kesan selepas yang berlaku biasanya singkat, paling kerap kesakitan atau kekakuan ringan untuk sehari dua. Penilaian juga menyaring sebilangan kecil situasi di mana pelarasan tidak sesuai, dan apabila ia menunjukkan fisioterapi lebih sesuai, kami akan memberitahu dengan jujur dan memulakan anda di sana.',
        links: [
          { phrase: 'penilaian yang betul', href: '/what-to-expect' },
          { phrase: 'fisioterapi', href: '/services/physiotherapy' },
        ],
      },
      {
        q: 'Bagaimana rasanya pelarasan, dan bagaimana jika saya gementar?',
        a: 'Kebanyakan orang menggambarkan tekanan sebentar diikuti oleh rasa lega berbanding kesakitan, dan bunyi "krek" yang sering menyertainya adalah gas yang bergerak dalam sendi berbanding tulang bergesel dengan tulang, bukan penanda sama ada ia berkesan. Beritahu kiropraktor anda jika apa-apa terasa lebih daripada tidak selesa, kerana sentuhan dan kekuatan kedua-duanya boleh diubah dan terdapat pendekatan kekuatan rendah untuk pesakit yang tidak mahu dilaras dengan cara biasa. Apabila penilaian menunjukkan ketegangan otot berbanding sekatan sendi, kami mungkin mencadangkan jarum kering bersama pelarasan atau menggantikannya.',
        links: [{ phrase: 'jarum kering', href: '/services/dry-needling' }],
      },
      {
        q: 'Adakah saya akan diminta membeli pakej atau komited kepada satu pelan?',
        a: 'Tidak. Tiada cara jujur untuk mengetahui bagaimana sesuatu kes akan berkembang sebelum kami menilai anda, jadi kami tidak akan mengesahkan bilangan lawatan pada lawatan pertama atau menjual pakej terlebih dahulu. Sesetengah orang datang untuk tempoh tertentu dan berhenti, yang lain memilih untuk datang sesekali sebaik sahaja masalah asal reda, dan kami lebih suka mengkaji semula mengikut perkembangan dan memberitahu anda apabila kami rasa anda tidak lagi memerlukan kami.',
        links: [{ phrase: 'lawatan pertama', href: '/what-to-expect' }],
      },
      {
        q: 'Di manakah lokasi tepat anda, dan bagaimana saya sampai ke sana?',
        a: 'Klinik terletak di Signature 2 dalam pembangunan Sunway Velocity di Maluri, di sebelah Cheras, Kuala Lumpur, dengan tempat letak kereta pusat membeli-belah jika anda memandu dan stesen Maluri serta Cochrane kedua-duanya dalam jarak berjalan kaki jika tidak. Maluri adalah stesen pertukaran, jadi laluan Ampang, Sri Petaling dan Kajang semuanya sampai ke sini. Kami dibuka tujuh hari: Isnin hingga Khamis dan Sabtu sehingga 8 malam, Jumaat sehingga 5 petang, dan Ahad sehingga 3 petang.',
        links: [{ phrase: 'dibuka tujuh hari', href: '/book-now' }],
      },
      {
        q: 'Apa yang berlaku jika jagaan kiropraktik bukan pendekatan yang sesuai untuk saya?',
        a: 'Kami akan memberitahu anda, dan kami tidak akan tetap melaras anda. Sebahagian daripada tujuan penilaian enam langkah adalah untuk mencari kes yang sepatutnya berada di tempat lain, sama ada bermakna fisioterapi di sini, pengimejan dahulu, atau pendapat perubatan yang kami bantu anda aturkan. Mengetahui bila sesuatu masalah bukan untuk kami uruskan adalah sebahagian daripada kerja ini, dan anda tidak dikenakan bayaran untuk jagaan yang kami rasa tidak anda perlukan.',
      },
    ],
    dedicatedRoute: true,
    // Flipped for local preview only, at the user's request — still needs a Malay-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    /**
     * Urut sukan. Targets `urut sukan` at 50/mo, SD 19 (Ubersuggest, Malaysia locId 2458,
     * pulled 2026-09-03, twelve months between 20 and 90 so the figure is real). NOT a
     * translation of the English target: `sports massage kl` is its own Latin-script query at
     * 170/mo and this page earns its own term. `urutan sukan` returned an identical volume,
     * difficulty and month-by-month series, so Ubersuggest is clustering the two; picking
     * either gets the same demand and `urut sukan` is the shorter, more spoken form.
     *
     * ⚠️ DISTINCT FROM `urut sendi`, which the Malay chiropractic record targets. Both contain
     * "urut" and the two pages sit close together in meaning, so keep this one about soft
     * tissue and training load, and leave joint work to that page. `content.test.ts` catches an
     * identical string; it cannot catch two pages drifting onto one intent.
     *
     * No "rawatan" or "merawat" anywhere, per AGENTS.md § Multilingual. Menilai, melaras and
     * pemulihan name the action instead. Same review contract as the rest of this file:
     * adapted from the clinic-reviewed English record, `lastReviewed` unset, not yet read by a
     * Malay-speaking reviewer.
     */
    slug: 'sports-massage',
    title: 'Urut Sukan di Cheras, Kuala Lumpur',
    metaTitle: 'Urut Sukan di Cheras, KL',
    metaDescription:
      'Urut sukan di Cheras, Maluri, dinilai sebelum bermula. Untuk ketegangan latihan, otot kaku di meja kerja dan kecederaan lama yang tidak reda. Buka tujuh hari.',
    targetKeyword: 'urut sukan',
    intro:
      'Urut sukan di Cheras untuk mereka yang berlatih, mereka yang duduk di meja sepanjang minggu, dan mereka yang masih membawa kecederaan lama yang tidak pernah reda sepenuhnya. Kami menilai dahulu sebelum bermula, supaya sesi itu digunakan pada tisu yang menjadi punca keluhan.',
    heroImage: {
      src: '/img/therapy-neck.webp',
      alt: 'Fisioterapis mengurut leher dan bahu pesakit yang sedang duduk di Persistence Chiropractic Care di Cheras, Kuala Lumpur',
    },
    midImage: {
      src: '/img/sports-massage-session.webp',
      alt: 'Ahli terapi menekan betis pesakit dengan kedua tangan semasa urut sukan',
    },
    assurances: [
      'Dinilai sebelum sebarang urutan bermula',
      'Sesi enam puluh minit',
      'Buka tujuh hari · Cheras, Maluri',
    ],
    /**
     * ⚠️ TEKS ALT TIDAK MEMBAWA NAMA TEMPAT: ini ilustrasi simptom yang dikongsi antara
     * halaman, bukan gambar klinik ini, pengamal ini atau pesakit ini. Tiada gambar urut sukan
     * yang sebenar buat masa ini, direkodkan dalam OPEN-ITEMS.md.
     */
    outcomes: [
      {
        text: 'Ketegangan otot yang berkumpul sepanjang minggu latihan',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: 'Ilustrasi otot leher dan bahu menyala pada seorang lelaki yang memegang sisi lehernya',
        },
      },
      {
        text: 'Bahagian bawah belakang yang kaku selepas lama duduk atau mengangkat berat',
        image: {
          src: '/img/physio-recent-strain.webp',
          alt: 'Ilustrasi sakit bawah belakang menyala pada seorang lelaki yang berdiri di kaunter dapur dengan tangan di belakangnya',
        },
      },
      {
        text: 'Kecederaan lama yang menjengah semula apabila beban latihan naik',
        image: {
          src: '/img/physio-weakness.webp',
          alt: 'Ilustrasi sakit buku lali menyala pada seorang wanita yang duduk di meja dengan kaki di atas lantai',
        },
      },
      {
        text: 'Persiapan sebelum acara, atau melegakan selepasnya',
        image: {
          src: '/img/sports-staged-return.webp',
          alt: 'Wanita mengimbangi diri dengan sebelah kaki di atas kusyen imbangan sambil ahli terapi memegang tangannya',
        },
      },
    ],
    qualifierConcerns: [
      'Otot saya kekal sakit antara sesi latihan',
      'Leher dan bahu saya kaku di meja kerja',
      'Kecederaan lama menjengah semula apabila saya berlatih',
      'Saya ada acara yang menjelang',
      'Saya tidak pasti sama ada saya perlukan urutan atau pemulihan',
      'Saya pernah buat urut spa dan ia tidak bertahan',
    ],
    citations: [
      {
        claim:
          'Kajian sistematik terbesar mengenai urut sukan tidak menemui bukti bahawa ia meningkatkan kekuatan, pecutan, lonjakan atau ketahanan, tetapi menemui peningkatan kecil yang bermakna secara statistik pada kelenturan dan pada kesakitan otot yang tertunda.',
        source:
          'Davis, Alabed and Chico (2020), Effect of sports massage on performance and recovery: a systematic review and meta-analysis, BMJ Open Sport & Exercise Medicine',
        url: 'https://bmjopensem.bmj.com/content/6/1/e000614',
      },
      {
        claim:
          'Satu meta analisis yang membandingkan kaedah pemulihan selepas senaman mendapati urutan paling berkesan antara kaedah yang dikaji untuk mengurangkan kesakitan otot tertunda dan rasa lesu.',
        source:
          'Dupuy et al. (2018), An Evidence-Based Approach for Choosing Post-exercise Recovery Techniques, Frontiers in Physiology',
        url: 'https://www.frontiersin.org/articles/10.3389/fphys.2018.00403/full',
      },
    ],
    comparison: {
      heading: 'Urut sukan atau urut spa',
      intro:
        'Kedua duanya sejam kerja tangan dan namanya berbunyi serupa, jadi eloklah kami nyatakan di mana bezanya. Satu menumpukan pada bagaimana anda rasa sepanjang jam itu. Satu lagi menumpukan pada apa yang meletakkan anda di atas katil itu.',
      columns: ['Urut sukan di sini', 'Urut spa'],
      rows: [
        {
          label: 'Siapa yang melakukannya',
          a: 'Kiropraktor atau fisioterapis, bergantung pada apa yang ditemui semasa penilaian.',
          b: 'Ahli urut, biasanya tanpa penilaian klinikal terlebih dahulu.',
        },
        {
          label: 'Apa yang berlaku dahulu',
          a: 'Anda dinilai. Bagaimana bahagian itu bergerak, dan apa yang membebankannya, sebelum sesiapa meletakkan tangan pada anda.',
          b: 'Anda memilih dari menu, biasanya mengikut tempoh dan tekanan.',
        },
        {
          label: 'Apa yang disasarkan sejam itu',
          a: 'Tisu yang benar menghadkan anda, dan sebab ia menjadi begitu.',
          b: 'Kelegaan umum dan ketegangan otot keseluruhan.',
        },
        {
          label: 'Apa yang anda bawa pulang',
          a: 'Jawapan sama ada urutan sahaja sudah cukup, dan apa lagi yang bahagian itu perlukan jika tidak.',
          b: 'Sejam yang lebih longgar dan tenang, dan anda tempah lagi bila terasa ingin.',
        },
      ],
      note: 'Tiada satu yang lebih baik daripada yang lain, dan kalau yang anda mahu ialah sejam yang tenang, spa itulah pilihan yang betul. Bezanya ialah untuk apa jam itu. Jika bahagian yang sama kaku semula dalam beberapa hari, soalan yang berguna ialah apa yang terus membebankannya, dan itu dijawab oleh penilaian, bukan oleh urutan itu sendiri.',
    },
    fitCheck: {
      rightFor: [
        'Anda mahu bahagian yang kaku dinilai sebelum sesiapa mengerjakannya.',
        'Anda mahu diberitahu terus sama ada urutan itu perkara yang betul untuk keadaan anda.',
        'Anda mahu kerja itu disasarkan pada apa yang latihan atau meja kerja anda sedang lakukan kepada anda.',
        'Anda sanggup mendengar bahawa bahagian itu lebih memerlukan kerja kekuatan daripada satu lagi sesi.',
      ],
      notRightFor: [
        'Anda mahu sejam yang melegakan tanpa penilaian dan tanpa ditanya apa apa.',
        'Anda mahu urutan menggantikan pemulihan yang sebenarnya diperlukan oleh kecederaan itu.',
        'Anda mahu jumlah sesi disepakati sebelum sesiapa melihat keadaan anda.',
        'Masalah itu mungkin memerlukan pendapat perubatan atau pengimejan dahulu. Kami akan merujuk anda dan bukan meneruskannya.',
      ],
      note: 'Tiada satu pun daripada itu menjadikan anda pesakit yang menyusahkan, dan yang pertama itu memang apa yang dimaksudkan oleh kebanyakan orang bila mereka kata mereka mahu urut. Maksudnya kami lebih rela menghantar anda ke tempat yang lebih sesuai daripada menjual sejam yang tidak akan bertahan. Kalau anda mahu ketegangan itu dilihat dengan betul, lawatan pertama tempat ia bermula.',
    },
    sections: [
      {
        heading: 'Urut sukan di Cheras, Kuala Lumpur',
        body: 'Urut sukan di Cheras, Maluri, untuk otot yang sudah berhenti melonggar dengan sendiri. Anda tidak perlu bermain apa apa sukan untuk menempahnya. Kebanyakan ketegangan yang kami lihat datang daripada minggu latihan, minggu di meja dan perjalanan jauh, bukan daripada padang, dan pendekatannya sama juga: cari apa yang membebankan bahagian itu, kemudian kerjakannya.',
      },
      {
        heading: 'Menilai sebelum sebarang urutan bermula',
        body: 'Tiada apa yang bermula sebelum kami melihat bagaimana bahagian itu bergerak, kerana otot yang kaku selalunya sedang melindungi sesuatu dan bukan menjadi puncanya. Itu juga menjawab soalan yang lebih berguna, sama ada urut sukan sesuai untuk anda sama sekali.',
      },
      {
        heading: 'Apa yang berlaku dalam satu sesi urut sukan',
        body: 'Enam puluh minit kerja tangan pada otot dan tisu di sekelilingnya, pada tekanan yang masih membolehkan anda bernafas dengan selesa. Kami beritahu apa yang sedang dikerjakan dan sebabnya sambil kami bekerja.',
      },
      {
        heading: 'Terapi gelombang kejutan bersama urut sukan',
        body: 'Ada tisu yang tidak bertindak balas kepada tangan sahaja, terutamanya tendon yang sudah berbulan bulan mengeluh. Terapi gelombang kejutan menghantar gelombang tekanan terfokus ke titik itu, dan kerap disusun dalam lawatan yang sama apabila penilaian menunjukkan ia sesuai.',
      },
      {
        heading: 'Apa yang urut sukan lakukan, dan apa yang tidak',
        body: 'Kajian terbesar mengenainya tidak menemui bukti bahawa urutan menjadikan anda lebih kuat atau lebih pantas, di samping peningkatan kecil tetapi nyata pada kelenturan dan pada kesakitan selepas latihan berat. Jadi ia berguna untuk otot yang sakit, kaku atau sedang melindungi, dan ia bukan peningkatan prestasi.',
      },
      {
        heading: 'Bila pemulihan lebih penting daripada satu lagi urutan',
        body: 'Jika bahagian yang sama kaku semula dalam beberapa hari selepas setiap sesi, lebih banyak urutan jarang menjadi jawapannya. Sesuatu masih membebankannya, dan itu tidak berubah di atas katil, jadi kami akan berterus terang dan mengarahkan anda kepada pemulihan berperingkat.',
      },
    ],
    helpsWith: ['back-pain', 'neck-pain', 'hip-pain', 'shoulder-imbalance'],
    relatedLinks: [
      { href: '/services/sports-injury-rehabilitation', label: 'Kecederaan sukan dan pemulihan' },
      { href: '/services/physiotherapy', label: 'Fisioterapi di Cheras' },
      { href: '/services/dry-needling', label: 'Jarum kering untuk otot yang kekal kaku' },
    ],
    faqs: [
      {
        q: 'Adakah urut sukan sama dengan urutan biasa?',
        a: 'Tidak. Kerja tangannya mungkin kelihatan serupa, tetapi urut sukan di sini dilakukan selepas penilaian dan disasarkan pada satu bahagian dengan satu sebab, bukan pada kelegaan umum. Ia juga dilakukan oleh kiropraktor atau fisioterapis dan bukan oleh ahli urut spa. Apabila sesuatu otot kekal kaku berbulan dan tidak melonggar dengan tangan, kami mungkin mencadangkan jarum kering bersamanya.',
        links: [{ phrase: 'jarum kering', href: '/services/dry-needling' }],
      },
      {
        q: 'Adakah urut sukan sakit?',
        a: 'Sebahagiannya boleh terasa tidak selesa, terutamanya pada tisu yang sudah lama melindungi, tetapi ia tidak sepatutnya melebihi apa yang anda mampu bernafas melaluinya. Tekanan ditetapkan mengikut tahap anda dan dilaraskan sambil kami bekerja, jadi beritahu bila ia terlalu kuat. Rasa lembut sehari selepasnya adalah biasa, seperti selepas sesi latihan yang berat, dan itu selalunya reda dengan sendiri.',
      },
      {
        q: 'Berapa kerap saya patut menempah urut sukan?',
        a: 'Ia bergantung pada apa yang ditemui semasa penilaian dan pada apa yang anda minta badan anda lakukan, jadi kami tidak akan meletakkan jadual di hadapan anda pada lawatan pertama. Seseorang dalam blok latihan berat mungkin mahukannya dengan tetap; seseorang yang ketegangannya datang daripada meja kerja selalunya lebih baik dengan sesi yang lebih sedikit serta perubahan pada cara dia duduk dan bergerak.',
      },
      {
        q: 'Patutkah saya buat urut sukan sebelum atau selepas acara?',
        a: 'Kedua duanya dilakukan, dan ia dua perkara berbeza. Kerja sebelum acara lebih singkat dan lebih ringan, bertujuan membuatkan anda bergerak dengan selesa dan bukan mengubah apa apa. Kerja selepas acara menyasarkan kesakitan dan kekakuan setelah usaha berat itu selesai. Yang tidak kami cadangkan ialah sesi yang berat sehari sebelum sesuatu yang penting bagi anda, kerana tisu boleh terasa lembut selepasnya.',
      },
      {
        q: 'Perlukah saya bermain sukan untuk menempah urut sukan?',
        a: 'Tidak, dan sebahagian besar mereka yang menempahnya tidak bermain apa apa sukan. Namanya menerangkan gaya kerja itu dan bukan untuk siapa ia. Ketegangan meja kerja pada leher dan bahu, bahagian bawah belakang yang kaku selepas perjalanan jauh, dan kekakuan umum daripada duduk sepanjang minggu semuanya sebab biasa untuk datang. Jika yang anda ada ialah kecederaan tertentu dan bukan ketegangan, kecederaan sukan dan pemulihan selalunya titik permulaan yang lebih baik.',
        links: [
          { phrase: 'kecederaan sukan dan pemulihan', href: '/services/sports-injury-rehabilitation' },
        ],
      },
      {
        q: 'Siapa yang akan melakukan urut sukan itu?',
        a: 'Sama ada kiropraktor atau fisioterapis, bergantung pada apa yang ditemui semasa penilaian dan apa yang bahagian itu perlukan. Kedua duanya pengamal berdaftar dan bukan ahli urut spa, dan orang yang menilai anda ialah orang yang melakukan kerja itu. Fisioterapis kami belum dinamakan di laman web ini, iaitu keputusan mengenai tempoh percubaan mereka dan bukan mengenai kelayakan mereka, dan anda dipersilakan bertanya tentang pendaftaran sesiapa yang anda jumpa.',
      },
    ],
    practitionersWithheld:
      'Sports massage and shockwave are delivered by either a chiropractor or a physiotherapist depending on the presentation (client, 2026-09-03), and the physiotherapists cannot be named while they are within their probation period. Naming only the chiropractors here would imply they are the only people who deliver this.',
    draft: false,
  },
]
