/**
 * Bahasa Malaysia condition pages. Same `Condition` shape as `lib/conditions.ts`, keyed by
 * the same `slug` as the English and Chinese records — see `lib/conditions.zh.ts` for why.
 *
 * `targetKeyword` here targets real symptom-search terms ("sakit belakang", "sakit
 * leher", etc.) rather than a literal translation of the English "back pain treatment kl"
 * — live keyword pulls show near-zero volume for direct "kiropraktor" terms in Malaysia,
 * so BM copy is built around the pain/symptom language people actually search.
 *
 * Clinical facts (symptoms, causes, approach, red flags) are adapted from the matching
 * English record, which the clinic has already reviewed — this is a faithful localisation
 * of validated clinical content, not new clinical claims. `lastReviewed` is deliberately
 * left unset and `draft: true` is deliberately set: nobody has checked the MALAY WORDING
 * of a safety-critical red-flag list against the source, and that check has to happen
 * before this goes live, the same way an unconfirmed registration number never renders
 * (see `lib/clinic.ts`). Flip `draft` to `false` only after a Malay-speaking reviewer
 * (ideally the practitioner who reviewed the English original) has read this page.
 */
import type { Condition } from './conditions'

export const conditionsMs: Condition[] = [
  {
    slug: 'back-pain',
    title: 'Sakit Pinggang & Sakit Belakang di Cheras, Kuala Lumpur',
    metaTitle: 'Jagaan Sakit Pinggang di Cheras, KL',
    metaDescription:
      'Sakit pinggang dan sakit belakang bawah, dinilai di Cheras, Maluri. Kiropraktik Gonstead segmen demi segmen, pelarasan dan pemulihan oleh kiropraktor berdaftar.',
    // "sakit pinggang" (bukan "sakit belakang" secara literal) — pencarian sebenar di
    // Malaysia menunjukkan "sakit pinggang sebelah kiri"/"kanan" masing-masing 3,600 dan
    // 2,900 carian/bulan (Ubersuggest, locId 2458), jauh lebih tinggi daripada "sakit
    // belakang" am. "Pinggang" ialah istilah harian orang Malaysia untuk sakit belakang
    // bawah, dan itulah bahasa yang digunakan di seluruh halaman ini.
    targetKeyword: 'sakit pinggang',
    related: ['slipped-disc', 'sciatica'],
    helpedBy: ['physiotherapy', 'chiropractic-care'],

    intro:
      'Kebanyakan sakit pinggang dan sakit belakang adalah mekanikal. Sendi, cakera dan otot tulang belakang berhenti bergerak sebagaimana sepatutnya, dan tisu di sekelilingnya menjadi teriritasi. Ia sangat lazim, dan jarang bermakna sesuatu yang serius sedang berlaku. Kebanyakannya reda tanpa pembedahan. Namun ia tetap berbaloi untuk mengetahui dengan tepat apa yang berlaku berbanding hanya meneka.',
    symptoms: [
      'Sakit yang berdenyut di bahagian pinggang yang bertambah teruk sepanjang hari atau selepas duduk',
      'Sakit tajam pada pergerakan tertentu, seperti membongkok, memusing badan atau bangun daripada kerusi',
      'Kekakuan pada waktu pagi yang reda sebaik sahaja anda mula bergerak',
      'Sakit yang merebak ke punggung atau paha',
      'Kesukaran berdiri tegak, atau rasa pinggang anda "terkunci"',
      'Kekejangan otot pada satu sisi tulang belakang',
    ],
    causes: [
      {
        heading: 'Duduk terlalu lama',
        body: 'Berjam-jam duduk di meja membebankan pinggang secara berterusan dan menyebabkan otot yang menyokongnya "terpadam". Ini adalah penyumbang paling lazim yang kami lihat di Kuala Lumpur, dan ia bertindak balas dengan baik apabila digabungkan jagaan secara tangan dengan perubahan cara anda duduk.',
      },
      {
        heading: 'Mengangkat dan bebanan tiba-tiba',
        body: 'Mengangkat sesuatu yang berat secara janggal, atau sambil memusing badan, boleh menegangkan sendi dan tisu lembut pinggang bawah. Sakit selalunya muncul beberapa jam kemudian, bukan sejurus semasa mengangkat.',
      },
      {
        heading: 'Sekatan sendi',
        body: 'Apabila satu segmen tulang belakang berhenti bergerak dengan baik, segmen di atas dan bawahnya mengimbangi dengan bergerak lebih banyak. Lama-kelamaan sendi jiran ini menjadi teriritasi. Mengenal pasti segmen yang tersekat adalah tujuan penilaian Gonstead.',
      },
      {
        heading: 'Otot yang tidak terlatih',
        body: 'Sakit pinggang yang sentiasa berulang biasanya tiada kaitan dengan satu kecederaan sahaja. Selalunya otot penyokong tidak mempunyai daya tahan untuk menahan tulang belakang dalam kedudukan yang baik sepanjang hari bekerja, jadi tisu yang sama teriritasi semula setiap beberapa minggu.',
      },
    ],
    approach: [
      {
        heading: 'Kami kenal pasti segmen sebelum kami bekerja padanya',
        body: 'Lawatan pertama anda mengikut penilaian enam langkah Gonstead: sejarah kesihatan, visualisasi, penggunaan instrumen, palpasi, analisis X-ray jika perlu, dan barulah pelarasan dilakukan. Kami mahu tahu segmen mana yang menyebabkan sakit anda sebelum sebarang tindakan diambil. Melaras seluruh tulang belakang secara rambang bukanlah cara kami bekerja.',
      },
      {
        heading: 'Pelarasan, dilakukan dengan tangan',
        body: 'Sebaik sahaja segmen dikenal pasti, pelarasan dilakukan khusus padanya. Kiropraktor anda akan menerangkan apa yang dijumpai dan apa yang akan dilakukan sebelum sebarang tindakan diambil.',
      },
      {
        heading: 'Kemudian bahagian yang menghalang ia berulang',
        body: 'Pelarasan mengembalikan pergerakan kepada sendi, tetapi otot di sekelilingnya masih perlu menahan kedudukan itu sepanjang hari yang panjang. Apabila corak ini sentiasa berulang, kami gabungkan kiropraktik dengan pemulihan fisioterapi serta perubahan praktikal pada susunan meja dan bebanan harian anda.',
      },
    ],
    redFlags: [
      'Kehilangan kawalan pundi kencing atau usus, atau kebas di sekitar pangkal paha',
      'Kelemahan yang semakin teruk pada satu atau kedua-dua belah kaki',
      'Sakit pinggang selepas terjatuh teruk atau kemalangan',
      'Penurunan berat badan tanpa sebab, demam, atau sakit waktu malam yang mengejutkan anda daripada tidur',
      'Sejarah kanser, osteoporosis, atau penggunaan steroid jangka panjang bersama sakit pinggang baru',
    ],
    faqs: [
      {
        q: 'Berapa lama sakit pinggang mengambil masa untuk reda?',
        a: 'Ia bergantung kepada berapa lama anda mengalaminya, puncanya, dan apa yang anda lakukan antara lawatan. Kelegaan jangka pendek selalunya datang dengan cepat. Mengubah cara tulang belakang anda bergerak dan membina semula otot yang menyokongnya mengambil masa lebih lama, biasanya berbulan-bulan berbanding berminggu-minggu. Kiropraktor anda akan memberikan anggaran masa khusus untuk kes anda selepas penilaian pertama, bukan angka umum.',
      },
      {
        q: 'Perlukah saya X-ray untuk sakit pinggang?',
        a: 'X-ray memberikan kami gambaran yang lebih jelas tentang apa yang berlaku pada tulang belakang anda: kedudukan setiap segmen, keadaan cakera dan sendi, dan sama ada terdapat apa-apa yang patut mengubah pelan. Itulah yang menjadikan penilaian Gonstead khusus untuk pinggang anda berbanding generik. Namun ia tidak wajib untuk setiap pesakit, dan dielakkan bagi wanita hamil serta kanak-kanak melainkan terdapat sebab yang jelas. Kiropraktor anda akan menerangkan sama ada X-ray sesuai untuk kes anda.',
      },
      {
        q: 'Patutkah saya berehat atau terus bergerak?',
        a: 'Bagi kebanyakan sakit pinggang mekanikal, pergerakan lembut membantu lebih daripada rehat di katil. Berjalan ringan merangsang aliran darah dan menghalang kawasan itu daripada semakin kaku. Elakkan pergerakan yang jelas memburukkan keadaan, dan tangguhkan senaman berat selama beberapa hari selepas pelarasan.',
      },
      {
        q: 'Adakah kiropraktik selamat jika sakit pinggang saya teruk?',
        a: 'Tahap keterukan sahaja tidak menghalang jagaan kiropraktik, tetapi ia mengubah cara penilaian dijalankan. Sesetengah keadaan memerlukan imbasan atau rujukan perubatan dahulu, dan jika kiropraktor anda percaya penyedia kesihatan lain lebih sesuai membantu anda, anda akan dirujuk. Beritahu kami tentang sebarang trauma baru-baru ini, kebas, atau kelemahan semasa membuat temu janji.',
      },
    ],
    keyTakeaways: [
      {
        q: 'Apakah punca kebanyakan sakit pinggang?',
        a: 'Kebanyakannya mekanikal, bermakna ia berpunca daripada cara tulang belakang dibebankan dan digerakkan berbanding penyakit serius. Itulah sebabnya penilaian melihat pergerakan dahulu sebelum mencari apa-apa yang lain.',
      },
      {
        q: 'Perlukah saya rujukan untuk datang?',
        a: 'Tidak. Anda boleh terus menempah bersama kami di Cheras. Jika kes anda memerlukan imbasan atau pendapat perubatan dahulu, kami akan memberitahu dan membantu anda mengaturnya.',
      },
      {
        q: 'Apa yang berlaku pada lawatan pertama?',
        a: 'Kebanyakannya penilaian. Sejarah kesihatan, kemudian enam langkah Gonstead, kemudian penjelasan dalam bahasa mudah tentang apa yang dijumpai sebelum sebarang pelarasan dilakukan.',
      },
      {
        q: 'Perlukah saya kembali berkali-kali?',
        a: 'Kami tidak akan memberikan bilangan lawatan tetap atau menjual pakej pada temu janji pertama. Kami menyemak sepanjang proses dan memberitahu anda apabila kami rasa anda tidak lagi memerlukan kami.',
      },
      {
        q: 'Bilakah anda dibuka?',
        a: 'Tujuh hari seminggu, di Sunway Velocity, Maluri. Isnin hingga Khamis dan Sabtu sehingga 8 malam, Jumaat sehingga 5 petang, Ahad sehingga 3 petang.',
      },
    ],
    qualifierConcerns: [
      'Pinggang saya sakit selepas duduk atau berdiri lama',
      'Sakit itu sentiasa kembali setiap beberapa bulan',
      'Saya sukar membongkok, mengangkat atau bangun daripada kerusi',
      'Saya sudah lama mengalami sakit pinggang dan mahu ia dinilai dengan betul',
      'Saya tidak pasti sama ada saya perlukan kiropraktor atau ahli fisioterapi',
    ],
    citations: [
      {
        claim:
          'Sakit belakang bawah secara konsisten tersenarai sebagai punca utama tahun hidup dengan kehilangan keupayaan di seluruh dunia.',
        source: 'Global Burden of Disease Study, The Lancet',
        url: 'https://www.thelancet.com/journals/lanrhe/article/PIIS2665-9913(23)00098-X/fulltext',
      },
      {
        claim:
          'Garis panduan klinikal mengesyorkan kekal aktif dan jagaan berasaskan senaman bagi kebanyakan sakit belakang bawah tidak spesifik, berbanding rehat berpanjangan.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
    ],
    // Flipped for local preview only, at the user's request — still needs a Malay-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'neck-pain',
    title: 'Sakit Leher & Ketegangan di Cheras, Kuala Lumpur',
    metaTitle: 'Jagaan Sakit Leher di Cheras, KL',
    metaDescription:
      'Sakit leher, ketegangan dan "tech neck" dalam kalangan pekerja pejabat, dinilai di Cheras, Maluri. Kiropraktik Gonstead, dry needling dan panduan ergonomik praktikal.',
    targetKeyword: 'sakit leher',
    related: ['migraine', 'scoliosis'],
    helpedBy: ['dry-needling', 'physiotherapy'],

    intro:
      'Sakit leher dalam kalangan pekerja pejabat biasanya berpunca daripada bebanan, bukan kecederaan. Berjam-jam dengan kepala tertunduk ke arah skrin atau telefon memaksa sendi dan otot kecil di pangkal leher menahan kedudukan yang tidak sepatutnya ditahan seharian, dan akhirnya ia memberi reaksi. Ia terbina secara beransur-ansur dan sangat lazim berlaku. Kebanyakan kes bertindak balas dengan baik sebaik sahaja segmen yang terjejas dikenal pasti dan tabiat yang menyumbang kepadanya ditangani.',
    symptoms: [
      'Sakit di pangkal leher dan merentasi bahagian atas bahu yang bertambah teruk sepanjang hari bekerja',
      'Ketegangan yang berkurang semasa cuti atau hujung minggu dan kembali menjelang hari Selasa',
      'Sakit kepala yang bermula di belakang tengkorak dan merebak ke hadapan',
      'Keupayaan yang berkurang untuk memusingkan kepala sepenuhnya ke satu sisi, atau untuk melihat blind spot semasa memandu',
      'Belakang atas yang bongkok dan kepala yang berada di hadapan bahu dalam gambar',
      'Kesemutan atau rasa "geli-geli" ke bahagian bilah bahu atau lengan',
      'Bunyi berketuk atau berderit apabila leher digerakkan',
    ],
    causes: [
      {
        heading: 'Postur kepala condong ke hadapan yang berpanjangan',
        body: 'Semakin ke hadapan kepala berada, semakin banyak kerja yang perlu dilakukan oleh otot di belakang leher untuk menahannya. Skrin yang diletakkan di bawah paras mata, laptop yang digunakan tanpa penyangga, dan tempoh panjang menatap telefon semuanya menggalakkan kedudukan itu, dan tisu badan menyesuaikan diri dengan apa sahaja yang paling kerap diminta daripadanya.',
      },
      {
        heading: 'Bebanan statik, bukan pergerakan',
        body: 'Sendi memerlukan pergerakan untuk kekal sihat. Leher yang tidak bergerak berjam-jam akan menjadi tegang tidak kira sebaik mana postur anda. Susunan meja yang baik pun masih menyebabkan masalah jika anda tidak pernah bangun daripadanya.',
      },
      {
        heading: 'Sekatan sendi di bahagian atas leher',
        body: 'Apabila satu segmen leher berhenti bergerak dengan baik, segmen di sekelilingnya mengambil alih beban dan menjadi teriritasi. Sekatan di bahagian atas leher adalah punca lazim kepada sakit kepala yang sering menyertai sakit leher akibat kerja meja.',
      },
      {
        heading: 'Corak tidur dan tekanan',
        body: 'Bantal yang tidak menyokong dengan baik, tidur meniarap dengan kepala terpusing, dan ketegangan otot akibat tekanan yang berterusan — semuanya membebankan kawasan ini sepanjang malam, jadi ia tidak pernah benar-benar berehat.',
      },
    ],
    approach: [
      {
        heading: 'Kami kenal pasti segmen sebelum kami bekerja padanya',
        body: 'Lawatan pertama anda mengikut penilaian enam langkah Gonstead: sejarah kesihatan, visualisasi, penggunaan nervoscope, palpasi, analisis X-ray jika perlu, dan barulah pelarasan dilakukan. Visualisasi amat penting di sini, kerana paras kepala, telinga dan bahu anda memberitahu kami banyak perkara tentang cara anda membebankan leher sebelum kami menyentuh anda.',
      },
      {
        heading: 'Pelarasan, dilakukan dengan tangan',
        body: 'Sebaik sahaja kiropraktor anda mengenal pasti segmen yang tersekat, pelarasan dilakukan khusus padanya dan dengan tangan. Mereka akan menerangkan apa yang dijumpai dan apa yang akan dilakukan sebelum sebarang tindakan diambil. Jika kiropraktor anda merasakan penyedia kesihatan lain lebih sesuai membantu anda, anda akan dirujuk dengan sewajarnya.',
      },
      {
        heading: 'Menangani punca sebenar',
        body: 'Pelarasan mengembalikan pergerakan kepada leher yang tegang. Kesan ini boleh hilang dengan cepat jika anda kembali menghabiskan lapan jam sehari dalam kedudukan yang menyebabkan ketegangan itu. Selain kiropraktik, kami turut membincangkan perubahan praktikal pada ketinggian meja dan skrin serta rehat pergerakan. Apabila otot sekeliling menjadi faktor, bahagian fisioterapi kami menambah terapi manual atau dry needling serta program membina daya tahan otot leher dalam dan belakang atas.',
      },
    ],
    redFlags: [
      'Sakit leher selepas terjatuh, kemalangan kenderaan, atau sebarang hentaman pada kepala atau leher',
      'Kebas, kelemahan, atau kehilangan kekuatan genggaman pada tangan atau lengan',
      'Sakit kepala yang tiba-tiba dan sangat teruk, berbeza daripada yang pernah dialami sebelum ini',
      'Pening, gangguan penglihatan, kesukaran bercakap atau menelan, atau rasa tidak stabil semasa berjalan',
      'Demam, penurunan berat badan tanpa sebab, atau sakit waktu malam yang mengejutkan anda daripada tidur',
      'Kehilangan kawalan pundi kencing atau usus, atau kekok dan rasa tidak stabil pada kedua-dua belah tangan atau kaki',
    ],
    faqs: [
      {
        q: 'Apakah itu "tech neck"?',
        a: 'Ia adalah istilah tidak formal, bukan diagnosis perubatan. Ia menggambarkan sakit leher dan belakang atas yang sering menyertai tempoh panjang menunduk ke telefon atau skrin yang diletakkan terlalu rendah. Apa yang kami nilai adalah sama seperti sakit leher yang lain: segmen mana yang bergerak dengan tidak baik, dan apa dalam rutin harian anda yang mengekalkan keadaan itu.',
      },
      {
        q: 'Bolehkah kiropraktik membetulkan postur saya?',
        a: 'Tiada satu kaedah pun boleh mengubah postur dengan sendirinya, kerana postur sebahagian besarnya adalah satu set tabiat. Pelarasan boleh mengembalikan pergerakan kepada segmen yang tersekat, yang selalunya menjadikan kedudukan yang lebih baik lebih selesa untuk dikekalkan. Perubahan yang berkekalan datang daripada susunan meja anda dan daripada membina daya tahan otot yang menegakkan badan anda. Kiropraktor anda akan memberitahu anda dengan jujur apa yang berkemungkinan berubah dan apa yang tidak.',
      },
      {
        q: 'Adakah selamat untuk leher saya dilaras?',
        a: 'Pelarasan leher dilakukan dengan tangan dan hanya selepas penilaian penuh menetapkan apa yang sesuai untuk anda. Sesetengah keadaan tidak sesuai untuk pelarasan, dan penilaian itu wujud untuk mengesan perkara itu. Sesetengah gejala memerlukan semakan perubatan sebelum sebarang jagaan secara tangan dilakukan. Beritahu kami tentang sebarang trauma baru-baru ini, pening, kebas lengan atau sakit kepala teruk semasa membuat temu janji supaya kami dapat menyaring untuknya.',
      },
      {
        q: 'Bagaimana saya patut susun atur meja kerja saya?',
        a: 'Ringkasnya: bahagian atas skrin kira-kira paras mata, lengan bawah disokong, kaki rata di lantai, dan laptop dinaikkan ke atas penyangga dengan papan kekunci berasingan. Namun begitu, tiada susunan yang cukup baik untuk diduduki selama lapan jam berturut-turut. Berdiri dan bergerak setiap 30 hingga 45 minit. Kami akan menyemak susunan meja anda sendiri bersama anda semasa lawatan anda.',
      },
    ],
    keyTakeaways: [
      {
        q: 'Mengapa leher saya semakin sakit menjelang hujung hari?',
        a: 'Kerana ia adalah masalah bebanan, bukan kecederaan. Menahan kepala ke hadapan selama berjam-jam meminta sendi dan otot kecil melakukan kerja yang tidak sepatutnya ditahan, dan ia cenderung memberi reaksi lewat hari.',
      },
      {
        q: 'Berapa lama biasanya ia mengambil masa untuk reda?',
        a: 'Ia berbeza mengikut berapa lama ia telah berlaku dan apa yang menyumbang kepadanya, jadi kami tidak akan memberikan bilangan tetap pada lawatan pertama. Kes berkaitan kerja meja selalunya bertindak balas dengan baik sebaik sahaja segmen yang teriritasi dikenal pasti dan tabiat berubah.',
      },
      {
        q: 'Bolehkah ketegangan leher menjadi punca sakit kepala saya?',
        a: 'Kadang-kadang. Sakit kepala yang bermula di pangkal tengkorak dan merebak ke hadapan sering dikaitkan dengan bahagian atas leher. Migrain adalah masalah yang berbeza dan diuruskan secara perubatan, walaupun konsultasi boleh membantu membezakan antara kedua-duanya.',
      },
      {
        q: 'Adakah bantal leher atau penyokong leher membantu?',
        a: 'Bantal yang menyokong dengan baik amat berbaloi untuk diperoleh, kerana ia menghalang leher daripada terbeban sepanjang malam. Penyokong leher tidak membina daya tahan yang diperlukan untuk menahan sesuatu kedudukan, jadi kami tidak menggalakkan bergantung padanya.',
      },
      {
        q: 'Bilakah anda dibuka?',
        a: 'Tujuh hari seminggu, di Sunway Velocity, Maluri. Isnin hingga Khamis dan Sabtu sehingga 8 malam, Jumaat sehingga 5 petang, Ahad sehingga 3 petang.',
      },
    ],
    qualifierConcerns: [
      'Leher saya sakit menjelang hujung hari bekerja di meja',
      'Saya tidak boleh memusingkan kepala sepenuhnya ke satu sisi',
      'Saya mendapat sakit kepala yang bermula di pangkal tengkorak',
      'Saya rasa kesemutan ke bilah bahu atau lengan',
      'Saya mahukan bantuan menyusun atur meja dan skrin saya',
    ],
    citations: [
      {
        claim:
          'Sakit leher secara konsisten tersenarai antara punca utama tahun hidup dengan kehilangan keupayaan (years lived with disability) di seluruh dunia.',
        source: 'Global Burden of Disease Study, The Lancet',
        url: 'https://www.thelancet.com/journals/lanrhe/article/PIIS2665-9913(23)00321-1/fulltext',
      },
      {
        claim:
          'Garis panduan bagi sakit leher tidak spesifik secara umum menyokong kekal aktif, dengan terapi manual dan senaman digunakan bersama, bukan rehat berpanjangan.',
        source: 'NICE Clinical Knowledge Summaries, Neck pain',
        url: 'https://cks.nice.org.uk/topics/neck-pain-non-specific/',
      },
    ],
    // Flipped for local preview only, at the user's request — still needs a Malay-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'slipped-disc',
    title: 'Jagaan Slip Disc di Cheras, Kuala Lumpur',
    metaTitle: 'Jagaan Slip Disc di Cheras, KL',
    metaDescription:
      'Jagaan slip disc dan disc herniasi tanpa pembedahan di Cheras, Maluri. Penilaian Gonstead, analisis X-ray dan pelan berperingkat berdasarkan apa yang dijumpai.',
    // "slip disc" digunakan sebagaimana orang Malaysia sebenarnya mencari — "slip disc
    // boleh urut tak" 390 carian/bulan, SD 24 (Ubersuggest, locId 2458). Istilah Inggeris
    // ini kekal digunakan dalam Bahasa Malaysia sehari-hari, tidak diterjemahkan.
    targetKeyword: 'slip disc',
    related: ['back-pain', 'sciatica'],
    helpedBy: ['physiotherapy', 'chiropractic-care'],

    intro:
      '"Slip disc" adalah nama harian bagi cakera yang bengkak atau herniasi. Bahagian tengah yang lembut pada cakera tulang belakang tertolak keluar melawan gelang yang lebih keras di sekelilingnya, kadangkala cukup jauh untuk menekan saraf berdekatan. Tiada apa yang sebenarnya "tergelincir" daripada kedudukannya, itulah sebabnya istilah ini kedengaran lebih membimbangkan daripada yang sepatutnya. Banyak cakera pulih dengan masa dan bebanan yang betul, dan kebanyakan orang tidak memerlukan pembedahan. Pelan bergantung kepada segmen mana yang terlibat dan bagaimana saraf itu bertindak balas, dan itulah yang ditentukan pada temu janji pertama.',
    symptoms: [
      'Sakit pinggang dengan sakit, kesemutan atau kebas yang merebak ke punggung, kaki atau tapak kaki',
      'Sakit yang melonjak apabila anda batuk, bersin atau mengejan',
      'Rasa tercekau tajam apabila membongkok ke hadapan, atau sukar duduk lama',
      'Sakit leher dengan gejala yang merebak ke bahu, lengan atau tangan',
      'Kelemahan pada tapak kaki, buku lali atau genggaman pada satu sisi',
      'Gejala yang reda semasa baring dan kembali apabila berdiri atau duduk',
      'Rasa kesemutan pada satu jalur kulit yang jelas berbanding seluruh anggota badan',
    ],
    causes: [
      {
        heading: 'Postur tunduk yang berpanjangan',
        body: 'Duduk membongkok berjam-jam di meja, dalam kesesakan lalu lintas atau menatap telefon membebankan bahagian hadapan cakera dan menolak kandungannya ke belakang. Berulang selama bertahun-tahun, ini adalah latar belakang paling lazim kepada masalah cakera yang kami lihat di Kuala Lumpur.',
      },
      {
        heading: 'Mengangkat dengan belakang bongkok',
        body: 'Mengangkat sambil membongkok dan memusing meletakkan bebanan yang tinggi dan tidak sekata pada cakera. Kejadian itu sendiri mungkin terasa kecil pada masa itu, dengan gejala muncul beberapa jam atau sehari kemudian.',
      },
      {
        heading: 'Perubahan cakera berkaitan usia',
        body: 'Cakera kehilangan kandungan air dan ketinggian dari semasa ke semasa, yang mengurangkan daya tahannya terhadap bebanan. Ini adalah sebahagian normal proses penuaan dan tidak semestinya bermakna kesakitan. Ia bermakna sesuatu pergerakan meminta lebih daripada cakera berbanding sebelumnya.',
      },
      {
        heading: 'Sendi yang tersekat di atas dan bawah',
        body: 'Apabila segmen tulang belakang jiran berhenti bergerak dengan baik, segmen yang masih bergerak menanggung lebih banyak bebanan. Mengenal pasti segmen mana yang berhenti bergerak adalah sebahagian besar tujuan penilaian.',
      },
    ],
    approach: [
      {
        heading: 'Menentukan segmen mana yang terlibat',
        body: 'Lawatan pertama anda mengikut penilaian enam langkah Gonstead: sejarah kesihatan, visualisasi, penggunaan nervoscope, palpasi termasuk penilaian pergerakan penuh sendi tulang belakang dan pelvis, analisis X-ray jika perlu, dan barulah pelarasan dilakukan. X-ray digunakan untuk menyingkirkan patologi dan menilai cakera antara vertebra serta sendi, yang lebih penting apabila disyaki masalah cakera berbanding sakit pinggang mekanikal biasa.',
      },
      {
        heading: 'Jagaan bukan pembedahan, dilakukan secara khusus',
        body: 'Kami mulakan dengan jagaan konservatif. Sebaik sahaja segmen yang terlibat dikenal pasti, pelarasan dilakukan khusus padanya dan dengan tangan, dan kiropraktor anda akan menerangkan apa yang dijumpai dan apa yang akan dilakukan sebelum sebarang tindakan diambil. Jika keadaan memerlukan imbasan melebihi X-ray atau pendapat pakar, anda akan dirujuk dengan sewajarnya. Penilaian itu dibuat pada peringkat penilaian awal.',
      },
      {
        heading: 'Membina semula daya tahan tulang belakang',
        body: 'Selain jagaan kiropraktik, bahagian fisioterapi kami menangani cara anda duduk, membongkok dan mengangkat, serta membina daya tahan otot yang berkongsi bebanan dengan cakera. Ini mengambil masa lebih lama berbanding sesi di klinik, dan biasanya inilah yang menentukan sama ada masalah itu akan berulang.',
      },
    ],
    redFlags: [
      'Kehilangan kawalan pundi kencing atau usus, atau kebas di sekitar pangkal paha, punggung dan paha dalam',
      'Kelemahan pada kedua-dua belah kaki, atau kelemahan yang semakin teruk berbanding stabil',
      'Tapak kaki yang terseret atau tidak dapat diangkat dengan betul',
      'Sakit yang teruk dan berterusan yang tidak reda pada sebarang kedudukan, termasuk baring',
      'Gejala cakera selepas terjatuh teruk, kemalangan jalan raya atau trauma langsung',
      'Demam, penurunan berat badan tanpa sebab, atau sejarah kanser bersama sakit tulang belakang baru',
    ],
    faqs: [
      {
        q: 'Bolehkah kiropraktor membantu slip disc, atau saya perlukan pembedahan?',
        a: 'Kebanyakan kes slip disc diuruskan secara konservatif. Pembedahan umumnya dipertimbangkan apabila jagaan konservatif tidak membantu, atau apabila terdapat kelemahan saraf yang semakin teruk atau tanda bahaya. Pendapat pembedahan adalah langkah yang sah dan kadangkala perlu, dan dirujuk untuknya tidak bermakna sesuatu telah tersalah. Kiropraktor anda akan menilai kes anda dan merujuk anda dengan sewajarnya jika pakar lebih sesuai membantu anda.',
      },
      {
        q: 'Adakah selamat untuk dilaras jika saya ada disc herniasi?',
        a: 'Ia bergantung kepada keadaan. Itulah sebabnya penilaian dilakukan dahulu. Sesetengah kes cakera sesuai untuk pelarasan, yang lain memerlukan imbasan atau pendapat perubatan dahulu, dan pendekatan disesuaikan mengikutnya. Beritahu kami tentang sebarang kebas, kelemahan atau perubahan pundi kencing dan usus semasa membuat temu janji.',
      },
      {
        q: 'Perlukah saya MRI sebelum datang?',
        a: 'Biasanya tidak. Kami mulakan dengan penilaian Gonstead dan analisis X-ray jika perlu, yang mencukupi untuk memandu jagaan dalam kebanyakan kes. Jika keadaan anda menunjukkan MRI akan mengubah pelan, kiropraktor anda akan memberitahu dan mengatur rujukan yang sewajarnya.',
      },
      {
        q: 'Berapa lama slip disc mengambil masa untuk reda?',
        a: 'Pemulihan berbeza dengan ketara mengikut saiz herniasi, berapa lama gejala telah wujud, dan bagaimana tulang belakang dibebankan setiap hari. Sesetengah orang perasan perubahan dalam beberapa minggu, yang lain memerlukan berbulan-bulan kerja konsisten. Kiropraktor anda akan memberikan anggaran masa berdasarkan penilaian anda sendiri, bukan angka umum.',
      },
    ],
    keyTakeaways: [
      {
        q: 'Apa sebenarnya berlaku dalam slip disc?',
        a: 'Dinding luar cakera menjadi teriritasi atau bengkak, dan boleh menekan tisu saraf berdekatan. Tiada apa yang tergelincir daripada kedudukannya, walaupun namanya begitu, itulah sebabnya istilah perubatan adalah cakera herniasi atau prolaps.',
      },
      {
        q: 'Adakah slip disc bermakna pembedahan?',
        a: 'Bagi kebanyakan orang, tidak. Pembedahan umumnya dipertimbangkan apabila terdapat kelemahan saraf yang semakin teruk, tanda bahaya, atau gejala yang tidak reda dengan jagaan konservatif.',
      },
      {
        q: 'Adakah imbasan yang menunjukkan bengkak menjelaskan sakit saya?',
        a: 'Tidak dengan sendirinya. Bengkak cakera lazim dijumpai pada orang yang tiada sebarang gejala langsung, itulah sebabnya apa yang anda boleh dan tidak boleh lakukan lebih penting daripada perkataan dalam laporan.',
      },
      {
        q: 'Patutkah saya berehat?',
        a: 'Biasanya sedikit pergerakan lebih ditoleransi berbanding rehat sepenuhnya, tetapi pergerakan mana yang sesuai untuk anda bergantung kepada keadaan anda. Itulah tujuan penilaian.',
      },
      {
        q: 'Bilakah anda dibuka?',
        a: 'Tujuh hari seminggu, di Sunway Velocity, Maluri. Isnin hingga Khamis dan Sabtu sehingga 8 malam, Jumaat sehingga 5 petang, Ahad sehingga 3 petang.',
      },
    ],
    qualifierConcerns: [
      'Saya ada sakit pinggang dengan gejala yang merebak ke kaki',
      'Saya telah diberitahu saya ada slip disc atau disc herniasi',
      'Duduk atau membongkok ke hadapan memburukkan keadaan',
      'Saya mahu tahu sama ada pembedahan satu-satunya pilihan',
      'Saya ada laporan imbasan dan mahu ia diterangkan',
    ],
    citations: [
      {
        claim:
          'Dapatan imbasan seperti bengkak dan penonjolan cakera lazim dijumpai pada orang tanpa sebarang gejala, dan meningkat dengan usia.',
        source: 'Brinjikji et al. (2015), American Journal of Neuroradiology',
        url: 'https://www.ajnr.org/content/36/4/811',
      },
      {
        claim:
          'Jagaan bukan pembedahan adalah pendekatan pertama biasa bagi masalah cakera lumbar, dengan pembedahan dipertimbangkan untuk petunjuk tertentu seperti defisit neurologi yang semakin teruk.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
    ],
    // Flipped for local preview only, at the user's request — still needs a Malay-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'sciatica',
    title: 'Jagaan Sakit Saraf Kaki (Sciatica) di Cheras, Kuala Lumpur',
    metaTitle: 'Jagaan Sciatica di Cheras, KL',
    metaDescription:
      'Sakit saraf sciatic dinilai dan diuruskan dengan kiropraktik Gonstead dan pemulihan bersasar di Cheras, Maluri. Kiropraktor berdaftar, buka 7 hari.',
    // "sakit saraf kaki" 720 carian/bulan, SD 14 (Ubersuggest, locId 2458) — istilah harian
    // untuk sakit saraf yang merebak ke kaki, lebih kerap dicari berbanding "sciatica" itu
    // sendiri dalam Bahasa Malaysia.
    targetKeyword: 'sakit saraf kaki',
    related: ['slipped-disc', 'back-pain'],
    helpedBy: ['dry-needling', 'physiotherapy'],

    intro:
      'Sciatica adalah penerangan, bukan diagnosis. Ia menamakan sakit yang merebak sepanjang laluan saraf sciatic, dari pinggang bawah melalui punggung dan turun ke belakang kaki. Sesuatu sedang mengiritasi atau menekan saraf itu, dan penilaian perlu menentukan apa dan di mana. Puncanya biasanya mekanikal. Kebanyakan orang reda dengan jagaan konservatif dan tidak pernah memerlukan pembedahan.',
    symptoms: [
      'Sakit yang merebak dari pinggang bawah atau punggung ke belakang satu kaki',
      'Sakit yang terbakar, menembak atau seperti renjatan elektrik berbanding sakit yang berdenyut',
      'Kesemutan, rasa "geli-geli" atau kebas pada betis, tapak kaki atau jari kaki',
      'Gejala biasanya pada satu sisi sahaja',
      'Sakit yang bertambah teruk dengan duduk lama, memandu, batuk atau bersin',
      'Kelemahan pada kaki atau tapak kaki, atau tapak kaki yang terasa berat',
      'Sukar mencari kedudukan selesa pada waktu malam',
    ],
    causes: [
      {
        heading: 'Iritasi akar saraf oleh cakera',
        body: 'Cakera yang bengkak atau herniasi di pinggang bawah boleh menekan atau mengiritasi secara kimia akar saraf di tempat ia keluar dari tulang belakang. Ini adalah salah satu punca yang lebih lazim bagi sakit sciatic yang sebenar, dan itulah sebabnya pinggang bawah dinilai walaupun kaki yang sakit.',
      },
      {
        heading: 'Penyempitan laluan saraf',
        body: 'Perubahan berkaitan usia pada sendi dan cakera tulang belakang boleh mengurangkan ruang laluan saraf. Gejala dalam corak ini selalunya bertambah dengan berdiri atau berjalan dan reda apabila duduk atau membongkok ke hadapan.',
      },
      {
        heading: 'Otot gluteal yang tegang atau terlebih beban',
        body: 'Saraf sciatic melalui berhampiran otot dalam punggung. Apabila otot itu tegang secara kronik atau terlebih beban, ia boleh menyumbang kepada gejala yang mengikut laluan serupa, jadi pinggul dan pelvis turut diperiksa bersama tulang belakang.',
      },
      {
        heading: 'Duduk berpanjangan dan kedudukan pelvis',
        body: 'Berjam-jam duduk, terutamanya di atas dompet atau dengan satu kaki bersilang, membebankan pinggang bawah dan punggung secara tidak sekata. Ini jarang menyebabkan sciatica dengan sendirinya, tetapi selalunya mengekalkan iritasi yang sedia ada.',
      },
    ],
    approach: [
      {
        heading: 'Mengesan sakit kembali ke puncanya',
        body: 'Anda rasa di kaki, tetapi ia biasanya datang daripada tulang belakang atau pelvis. Lawatan pertama anda mengikut penilaian enam langkah Gonstead: sejarah kesihatan, visualisasi, penggunaan nervoscope, palpasi dengan penilaian pergerakan penuh sendi tulang belakang dan pelvis, analisis X-ray jika perlu, dan barulah pelarasan dilakukan. Kami mencari segmen atau sendi khusus yang terlibat.',
      },
      {
        heading: 'Pelarasan dan kerja tisu lembut bersama',
        body: 'Sebaik sahaja punca dikenal pasti, pelarasan dilakukan khusus padanya dan dengan tangan. Apabila otot gluteal atau pinggul yang tegang menjadi sebahagian daripada gambaran, bahagian fisioterapi kami mungkin menambah terapi manual atau dry needling untuk mengurangkan ketegangan tisu yang menyumbang kepada iritasi.',
      },
      {
        heading: 'Pergerakan, kemudian daya tahan',
        body: 'Gejala saraf cenderung bertindak balas kepada mengembalikan pergerakan dan kemudian secara progresif membina daya tahan berbanding rehat sahaja. Anda biasanya akan diberikan pergerakan khusus untuk dilakukan antara lawatan, bersama perubahan praktikal pada berapa lama anda duduk dan cara anda keluar masuk kerusi atau kereta.',
      },
    ],
    redFlags: [
      'Kehilangan kawalan pundi kencing atau usus, atau kebas di sekitar pangkal paha, punggung dan paha dalam',
      'Gejala sciatic pada kedua-dua belah kaki serentak',
      'Kelemahan yang semakin teruk, atau tapak kaki yang tidak dapat diangkat atau terseret semasa berjalan',
      'Sakit yang teruk yang tidak reda pada sebarang kedudukan, termasuk baring',
      'Gejala kaki selepas terjatuh teruk, kemalangan atau trauma langsung',
      'Demam, penurunan berat badan tanpa sebab, atau sejarah kanser bersama sakit sciatic baru',
    ],
    faqs: [
      {
        q: 'Berapa lama sciatica berlangsung?',
        a: 'Banyak episod sciatica bertambah baik dalam beberapa minggu, tetapi ia berbeza mengikut punca, berapa lama gejala telah wujud dan bagaimana tulang belakang dibebankan setiap hari. Gejala yang telah wujud selama berbulan-bulan umumnya mengambil masa lebih lama untuk berubah berbanding kambuh baru-baru ini. Kiropraktor anda akan memberikan anggaran masa berdasarkan penilaian anda sendiri, bukan angka umum.',
      },
      {
        q: 'Patutkah saya berehat atau terus bergerak dengan sciatica?',
        a: 'Bagi kebanyakan sciatica mekanikal, pergerakan lembut lebih ditoleransi berbanding rehat di katil yang berpanjangan, yang cenderung menjadikan kawasan itu lebih kaku. Berjalan pendek dan menukar kedudukan dengan kerap biasanya membantu lebih daripada kekal diam. Elakkan pergerakan yang jelas memburukkan gejala kaki, dan ikut panduan khusus yang diberikan selepas penilaian anda.',
      },
      {
        q: 'Adakah sciatica saya disebabkan oleh slip disc?',
        a: 'Kadangkala, walaupun tidak selalu. Cakera adalah salah satu daripada beberapa punca yang mungkin, dan penyumbang pinggul, pelvis dan sendi juga lazim. Menentukan yang mana berkenaan dengan anda adalah tugas penilaian. Kami tidak akan memberitahu puncanya tanpa memeriksa anda dahulu.',
      },
      {
        q: 'Perlukah saya suntikan atau pembedahan untuk sciatica?',
        a: 'Kebanyakan orang dengan sciatica diuruskan tanpa kedua-duanya. Suntikan dan pembedahan biasanya dipertimbangkan apabila jagaan konservatif tidak membantu, atau apabila terdapat kelemahan saraf yang semakin teruk atau tanda bahaya. Jika kiropraktor anda merasakan penyedia kesihatan lain lebih sesuai membantu anda, anda akan dirujuk dengan sewajarnya.',
      },
    ],
    keyTakeaways: [
      {
        q: 'Adakah sciatica satu diagnosis?',
        a: 'Tidak sebenarnya. Ia menerangkan corak gejala, sakit yang mengikut saraf sciatic turun ke kaki, berbanding menamakan punca. Menentukan apa yang mengiritasi saraf itu adalah tujuan menilainya.',
      },
      {
        q: 'Bilakah sakit kaki menjadi kecemasan?',
        a: 'Kehilangan kawalan pundi kencing atau usus, kebas di sekitar pangkal paha atau paha dalam, atau kelemahan kaki yang semakin teruk memerlukan bantuan perubatan kecemasan pada hari yang sama berbanding temu janji dengan kami.',
      },
      {
        q: 'Apa yang cenderung memburukkan keadaan dari hari ke hari?',
        a: 'Tempoh panjang duduk, membongkok ke hadapan dan memandu adalah punca lazim yang memburukkan keadaan. Yang mana berkenaan dengan anda membentuk apa yang kami cadangkan antara lawatan.',
      },
      {
        q: 'Adakah sakit kaki berita lebih buruk daripada sakit pinggang?',
        a: 'Tidak semestinya, tetapi ia mengubah apa yang kami saring, itulah sebabnya penilaian dilakukan sebelum sebarang jagaan secara tangan berbanding selepasnya.',
      },
      {
        q: 'Bilakah anda dibuka?',
        a: 'Tujuh hari seminggu, di Sunway Velocity, Maluri. Isnin hingga Khamis dan Sabtu sehingga 8 malam, Jumaat sehingga 5 petang, Ahad sehingga 3 petang.',
      },
    ],
    qualifierConcerns: [
      'Saya ada sakit yang merebak ke bawah kaki saya',
      'Duduk atau memandu memburukkan keadaan',
      'Saya ada rasa kesemutan atau kebas pada kaki atau tapak kaki saya',
      'Ia bermula selepas mengangkat atau pergerakan tiba-tiba',
      'Saya mahu ia dinilai sebelum saya mempertimbangkan suntikan atau pembedahan',
    ],
    citations: [
      {
        claim:
          'Sciatica menerangkan corak gejala berbanding diagnosis, dan mengenal pasti punca yang mendasarinya adalah yang memandu pengurusannya.',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
      {
        claim:
          'Cauda equina syndrome, ditandai dengan gangguan pundi kencing atau usus dan kebas kawasan pelana, adalah kecemasan pembedahan yang memerlukan penilaian segera.',
        source: 'NICE Clinical Knowledge Summaries, Sciatica',
        url: 'https://cks.nice.org.uk/topics/sciatica/',
      },
    ],
    // Flipped for local preview only, at the user's request — still needs a Malay-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'hip-pain',
    title: 'Jagaan Sakit Pinggul di Cheras, Kuala Lumpur',
    metaTitle: 'Jagaan Sakit Pinggul di Cheras, KL',
    metaDescription:
      'Penilaian dan jagaan untuk sakit pinggul, sakit pangkal paha dan masalah pinggang bawah bersama pinggul di Cheras, Maluri. Kiropraktik Gonstead dan pemulihan bersasar.',
    // "sakit pinggul" 210 carian/bulan, SD 12 (Ubersuggest, locId 2458) — SD rendah dan
    // carian tetap sepanjang tahun, menunjukkan permintaan simptom yang jelas.
    targetKeyword: 'sakit pinggul',
    related: ['back-pain', 'sciatica'],
    helpedBy: ['chiropractic-care', 'sports-injury-rehabilitation'],

    intro:
      'Sakit pinggul agak sukar dikesan puncanya, kerana pinggul, pelvis dan pinggang bawah berkongsi kawasan yang sama dan boleh saling merujuk sakit antara satu sama lain. Ramai yang datang yakin masalahnya di pinggul sedangkan sendi itu sendiri diperiksa dan didapati baik, atau sebaliknya yakin masalahnya di pinggang sedangkan pinggul yang sebenarnya menghadkan pergerakan mereka. Di mana anda rasa sakit hanyalah titik permulaan. Penilaian perlu menentukan struktur mana yang sebenarnya teriritasi dan corak bebanan yang mengekalkannya, kerana masalah sendi pinggul, masalah tendon gluteal dan masalah pinggang bawah tidak memerlukan pelan yang sama.',
    symptoms: [
      'Sakit dalam di pangkal paha atau bahagian depan pinggul, terutamanya semasa berdiri atau keluar dari kereta',
      'Sakit di bahagian luar pinggul yang bertambah teruk apabila baring di sisi itu pada waktu malam',
      'Sakit pinggang bawah yang merebak merentasi punggung dan ke pinggul pada satu sisi',
      'Kekakuan pada awal pagi, atau selepas duduk lama dalam mesyuarat atau memandu',
      'Sukar menaiki tangga, mencangkung, atau memakai stoking dan kasut pada satu sisi',
      'Rasa berbunyi "klik", tersekat-sekat atau geseran semasa pinggul bergerak',
    ],
    causes: [
      {
        heading: 'Duduk berpanjangan dan kedudukan pinggul',
        body: 'Berjam-jam duduk mengekalkan pinggul dalam kedudukan fleksi, memendekkan tisu di bahagian depannya dan membiarkan otot gluteal di belakang hampir tidak bekerja. Selama bertahun-tahun ini mengurangkan julat pergerakan pinggul dan memindahkan bebanan ke pinggang bawah. Itulah sebabnya sakit pinggang dan sakit pinggul sering muncul bersama pada pekerja pejabat.',
      },
      {
        heading: 'Terlebih beban tendon gluteal',
        body: 'Tendon di bahagian luar pinggul menanggung banyak bebanan semasa berdiri, berjalan dan kerja satu kaki. Apabila bebanan itu meningkat lebih cepat daripada tendon dapat menyesuaikan diri, ia menjadi mudah teriritasi. Inilah corak di sebalik kebanyakan sakit di luar pinggul yang sakit apabila dibaring, dan ia lebih bertindak balas kepada pembebanan berperingkat berbanding rehat.',
      },
      {
        heading: 'Sekatan sendi di pinggang bawah dan pelvis',
        body: 'Apabila satu segmen lumbar atau sendi sacroiliac berhenti bergerak dengan baik, pinggul pada sisi itu mengambil alih perbezaan tersebut. Kami menilai tulang belakang dan pelvis bersama pinggul secara standard atas sebab itu. Menangani pinggul sahaja selalunya membiarkan punca sebenar tidak disentuh.',
      },
      {
        heading: 'Perubahan sendi berkaitan usia',
        body: 'Rawan dan permukaan sendi berubah dengan usia, dan dapatan imbasan menjadi lebih lazim seiring usia sama ada terdapat kesakitan atau tidak. Dapatan pada imbasan menerangkan keadaan sendi. Ia tidak dengan sendirinya menjelaskan simptom, jadi kami membacanya bersama bagaimana pinggul sebenarnya bergerak dan apa yang mampu ditoleransinya.',
      },
    ],
    approach: [
      {
        heading: 'Membezakan pinggul, pinggang dan pelvis',
        body: 'Lawatan pertama anda mengikut penilaian enam langkah Gonstead: sejarah kesihatan, visualisasi paras pinggul, bahu dan lutut, penggunaan nervoscope, palpasi dengan penilaian pergerakan penuh sendi tulang belakang dan pelvis, analisis X-ray jika perlu, dan barulah pelarasan dilakukan. Selain itu, pinggul turut digerakkan melalui julatnya sendiri dan dibebankan pada kedudukan yang mencetuskan simptom anda, supaya kami dapat mengenal pasti struktur mana yang sebenarnya teriritasi.',
      },
      {
        heading: 'Pelarasan dan kerja secara tangan',
        body: 'Apabila sendi tulang belakang atau pelvis yang terhad menjadi sebahagian daripada gambaran, pelarasan dilakukan khusus padanya dan dengan tangan, dan kiropraktor anda akan menerangkan dapatan sebelum sebarang tindakan diambil. Apabila otot dan tendon sekeliling terbeban, bahagian fisioterapi kami menambah mobilisasi dan kerja tisu lembut untuk mengurangkan ketegangan yang menyumbang kepada sendi tersebut.',
      },
      {
        heading: 'Membebankan semula pinggul ke tahap toleransinya',
        body: 'Pinggul secara umumnya bertindak balas lebih baik kepada pembebanan berperingkat berbanding rehat, dan inilah biasanya bahagian kerja yang mengambil masa lebih lama. Program dimulakan dari julat pergerakan dan kawalan, seterusnya kepada kekuatan, dan bagi sesiapa yang kembali bersukan, kepada tuntutan khusus seperti berlari, menukar arah atau mengangkat. Apa yang anda lakukan antara lawatan selalunya lebih penting berbanding apa yang berlaku di meja penilaian.',
      },
      {
        heading: 'Mengetahui bila ia bukan untuk kami uruskan',
        body: 'Sesetengah keadaan pinggul memerlukan pendapat pakar ortopedik atau imbasan melebihi X-ray: sendi yang benar-benar telah haus, disyaki masalah labral atau tulang, atau pinggul yang tidak bertindak balas seperti yang dijangkakan oleh penilaian. Jika kiropraktor anda merasakan penyedia kesihatan lain lebih sesuai membantu anda, anda akan dirujuk dengan sewajarnya.',
      },
    ],
    redFlags: [
      'Tidak dapat menanggung berat pada kaki, atau sakit pinggul selepas terjatuh atau kemalangan jalan raya',
      'Kecacatan yang jelas, atau satu kaki yang kelihatan lebih pendek atau berpusing berbanding yang lain',
      'Sakit pinggul atau pangkal paha bersama demam, rasa tidak sihat secara umum, atau sendi yang panas dan bengkak',
      'Kebas atau kelemahan kaki yang semakin teruk, atau tapak kaki yang terseret semasa berjalan',
      'Kehilangan kawalan pundi kencing atau usus, atau kebas di sekitar pangkal paha dan paha dalam',
      'Sakit malam yang mengejutkan anda dari tidur, penurunan berat badan tanpa sebab, atau sejarah kanser bersama sakit pinggul baru',
      'Sakit pinggul pada seseorang dengan osteoporosis atau penggunaan steroid jangka panjang selepas terjatuh walaupun ringan',
    ],
    faqs: [
      {
        q: 'Adakah masalah saya di pinggul atau di pinggang bawah?',
        a: 'Selalunya kedua-duanya, dan membezakannya adalah salah satu sebab utama untuk dinilai berbanding meneka sendiri. Sakit di pangkal paha lebih kerap menunjukkan sendi pinggul; sakit merentasi punggung dan ke pinggang cenderung melibatkan tulang belakang atau pelvis. Tiada satu pun peraturan mutlak, jadi pemeriksaan menguji pinggul dan pinggang bawah secara berasingan untuk melihat mana yang mencetuskan semula simptom anda.',
      },
      {
        q: 'Perlukah saya X-ray atau imbasan untuk sakit pinggul?',
        a: 'Apabila imbasan digunakan, ia kerana ia memberikan gambaran lebih jelas tentang apa yang berlaku pada sendi dan tulang belakang di atasnya, yang menjadi asas penilaian Gonstead. Analisis X-ray digunakan apabila ia akan mengubah apa yang kami lakukan, seperti menyingkirkan patologi atau memperjelas keadaan sendi, dan ia dielakkan untuk wanita hamil dan kanak-kanak melainkan terdapat sebab yang jelas. Jika keadaan anda menunjukkan MRI atau pendapat pakar akan mengubah pelan, kiropraktor anda akan memberitahu dan mengatur rujukan.',
      },
      {
        q: 'Patutkah saya rehatkan pinggul atau terus bergerak?',
        a: 'Bagi kebanyakan sakit pinggul mekanikal, terus bergerak lebih ditoleransi berbanding rehat sepenuhnya. Rehat sepenuhnya cenderung menjadikan pinggul lebih kaku dan lemah. Mengubah suai biasanya lebih berkesan berbanding berhenti sepenuhnya: kurangkan kedudukan yang memburukkan keadaan dan kekalkan pergerakan yang anda mampu lakukan dengan selesa. Anda akan diberikan panduan khusus selepas penilaian anda, bukan arahan umum.',
      },
      {
        q: 'Saya diberitahu saya ada artritis pinggul. Ada gunanya saya datang?',
        a: 'Perubahan sendi pada imbasan tidak menentukan berapa banyak yang anda mampu lakukan. Ramai orang dengan dapatan sedemikian memperbaiki julat pergerakan, kekuatan dan keselesaan harian mereka melalui jagaan konservatif, dan itulah yang akan kami usahakan. Membalikkan perubahan itu sendiri bukan sesuatu yang ditawarkan. Apabila pinggul telah cukup teruk sehingga pendapat pembedahan menjadi langkah wajar seterusnya, kami akan memberitahu anda dengan jelas.',
      },
      {
        q: 'Berapa lama untuk berasa lebih baik?',
        a: 'Bergantung kepada struktur mana yang terlibat, berapa lama ia telah berlaku, dan bagaimana pinggul dibebankan setiap hari. Sakit pinggul berkaitan tendon khususnya cenderung diukur dalam bulan berbanding minggu. Kiropraktor anda akan memberikan anggaran masa berdasarkan penilaian anda sendiri, bukan angka umum.',
      },
    ],
    keyTakeaways: [
      {
        q: 'Di mana sakit sendi pinggul sebenar biasanya dirasai?',
        a: 'Paling kerap di pangkal paha berbanding di bahagian luar pinggul. Sakit di bahagian luar lebih kerap melibatkan tendon di situ, atau dirujuk dari pinggang bawah.',
      },
      {
        q: 'Apakah punca lazim pada orang dewasa?',
        a: 'Ia berbeza mengikut usia dan tahap aktiviti. Iritasi tendon di bahagian luar pinggul, perubahan sendi berkaitan usia, dan rujukan dari pinggang bawah adalah tiga yang paling kerap kami lihat.',
      },
      {
        q: 'Bolehkah saya terus berjalan?',
        a: 'Biasanya boleh, dalam had keselesaan. Rehat sepenuhnya cenderung mengakukan pinggul berbanding menenangkannya, walaupun berapa banyak yang patut dilakukan bergantung kepada punca sakit tersebut.',
      },
      {
        q: 'Perlukah saya rujukan untuk datang?',
        a: 'Tidak. Anda boleh terus membuat temu janji. Jika imbasan atau pendapat perubatan diperlukan dahulu, kami akan memberitahu dan membantu anda mengaturkannya berbanding meneruskan begitu sahaja.',
      },
      {
        q: 'Bilakah anda dibuka?',
        a: 'Tujuh hari seminggu, di Sunway Velocity, Maluri. Isnin hingga Khamis dan Sabtu sehingga 8 malam, Jumaat sehingga 5 petang, Ahad sehingga 3 petang.',
      },
    ],
    qualifierConcerns: [
      'Saya ada sakit di pangkal paha atau di bahagian luar pinggul saya',
      'Sakit apabila berjalan, menaiki tangga atau keluar dari kereta',
      'Saya tidak boleh baring di sisi itu pada waktu malam',
      'Saya tidak pasti sama ada ia pinggul atau pinggang bawah saya',
      'Saya diberitahu saya ada artritis pinggul',
    ],
    citations: [
      {
        claim:
          'Sakit yang datang dari sendi pinggul itu sendiri biasa dirasai di pangkal paha, manakala sakit di bahagian luar pinggul lebih kerap melibatkan tendon di sekitar greater trochanter.',
        source: 'British Journal of Sports Medicine',
        url: 'https://bjsm.bmj.com/content/47/10/649',
      },
      {
        claim:
          'Senaman disyorkan sebagai bahagian utama pengurusan osteoartritis pinggul, bersama pendidikan dan, apabila relevan, pengurusan berat badan.',
        source: 'NICE guideline NG226, Osteoarthritis in over 16s',
        url: 'https://www.nice.org.uk/guidance/ng226',
      },
    ],
    // Flipped for local preview only, at the user's request — still needs a Malay-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'shoulder-imbalance',
    title: 'Jagaan Sakit Bahu dan Ketegangan Postur di Cheras, Kuala Lumpur',
    metaTitle: 'Jagaan Sakit Bahu di Cheras, KL',
    metaDescription:
      'Jagaan untuk sakit bahu, bahu tidak sekata dan ketegangan postur di Cheras, Maluri. Penilaian, dry needling dan program pemulihan fokus postur.',
    // "sakit bahu" 480/mo, SD 12 (Ubersuggest, locId 2458) — istilah simptom umum yang
    // digunakan orang ramai apabila mencari, berbanding istilah literal "bahu tidak
    // seimbang" yang hanya mencatat 10/mo. Kandungan tetap fokus kepada punca ketidak-
    // seimbangan postur (bukan sekadar sakit bahu am), dan satu FAQ menjambatankan
    // istilah carian dengan topik sebenar halaman ini.
    targetKeyword: 'sakit bahu',
    related: ['neck-pain', 'back-pain'],
    helpedBy: ['dry-needling', 'posture-correction'],

    intro:
      'Hampir tiada siapa yang benar-benar simetri, dan satu bahu yang sedikit lebih tinggi daripada yang lain jarang memerlukan perhatian dengan sendirinya. Ia menjadi wajar dinilai apabila disertai simptom: sakit merentasi satu sisi leher dan bahu yang bertambah sepanjang hari bekerja, ketegangan yang tidak pernah benar-benar hilang, atau bahu yang tidak lagi bergerak dengan bebas seperti yang satu lagi. Kebanyakan yang orang gelar "bahu tidak seimbang" sebenarnya adalah corak bebanan. Satu sisi melakukan lebih kerja, untuk lebih lama, berbanding daya tahannya. Penilaian dapat menerangkan ini dengan tepat, dan cara anda bekerja serta bersenam boleh mengubahnya.',
    symptoms: [
      'Satu bahu atau tulang belikat kelihatan lebih tinggi, atau baju dan tali beg sentiasa tergelincir pada satu sisi',
      'Sakit merentasi bahagian atas satu bahu dan ke leher yang bertambah teruk sepanjang hari bekerja',
      'Ketegangan yang reda pada hujung minggu dan kembali menjelang Selasa petang',
      'Tulang belikat yang menonjol keluar atau bergerak berbeza daripada yang satu lagi apabila anda mengangkat lengan',
      'Capaian ke atas yang berkurang pada satu sisi, atau rasa tersekat separuh jalan semasa mengangkat lengan',
      'Kesemutan atau rasa "geli-geli" ke tulang belikat, lengan atau tangan',
    ],
    causes: [
      {
        heading: 'Bebanan harian yang tidak simetri',
        body: 'Tetikus pada satu sisi, beg yang sentiasa disandang di bahu yang sama, monitor yang tidak berpusat, anak yang didukung di satu pinggul. Tiada satu pun daripada ini memudaratkan dengan sendirinya. Diulang lapan jam sehari selama bertahun-tahun, ia meminta satu sisi menahan kedudukan yang tidak pernah diminta daripada yang satu lagi, dan tisu itu menyesuaikan diri dengan apa yang paling kerap diminta daripadanya.',
      },
      {
        heading: 'Sekatan di leher dan belakang atas',
        body: 'Tulang belikat terletak di atas sangkar rusuk, dan sangkar rusuk bergerak bersama tulang belakang toraks. Apabila segmen belakang tengah atau leher berhenti bergerak dengan baik, tulang belikat tidak dapat duduk atau bergerak sepatutnya, dan otot di sekelilingnya bekerja lebih keras untuk mengimbanginya.',
      },
      {
        heading: 'Daya tahan berbanding kekuatan',
        body: 'Otot yang menahan kedudukan tulang belikat biasanya bukan lemah dengan cara yang anda perasan semasa mengangkat sesuatu. Ia lebih cepat penat. Itulah sebabnya sakit itu muncul pada jam empat petang berbanding awal pagi, dan program yang dirangka lebih menumpukan kepada daya tahan berbanding bebanan berat.',
      },
      {
        heading: 'Ketidaksimetrian struktur yang mendasari',
        body: 'Sesetengah perbezaan paras bahu berkaitan dengan lengkung tulang belakang, rusuk atau perbezaan panjang kaki berbanding tabiat. Ini diterangkan, bukan dipersalahkan, dan apabila corak menunjukkan lengkung yang wajar diukur, ia dinilai dengan sewajarnya berbanding dianggap sahaja.',
      },
    ],
    approach: [
      {
        heading: 'Melihat keseluruhan rantaian di atas dan bawah bahu',
        body: 'Lawatan pertama anda mengikut penilaian enam langkah Gonstead: sejarah kesihatan, visualisasi paras kepala, bahu, pinggul dan lutut, penggunaan nervoscope, palpasi dengan penilaian pergerakan penuh sendi tulang belakang, analisis X-ray jika perlu, dan barulah pelarasan dilakukan. Visualisasi memainkan peranan besar di sini, kerana cara anda berdiri dan cara tulang belikat anda duduk memberitahu kami banyak perkara sebelum apa-apa disentuh.',
      },
      {
        heading: 'Melepaskan tisu yang menahan corak tersebut',
        body: 'Apabila otot di sekitar leher, tulang belikat dan belakang atas terbeban secara kronik, bahagian fisioterapi kami mungkin menggunakan dry needling dan kerja tisu lembut secara tangan untuk mengurangkan ketegangan tersebut. Bahagian ini cenderung mengubah rasa dengan agak cepat, walaupun dengan sendirinya ia biasanya tidak bertahan lama. Ia memudahkan kedudukan itu ditahan sementara kerja daya tahan menyusul.',
      },
      {
        heading: 'Mengubah corak itu sendiri',
        body: 'Kebanyakan perubahan datang daripada susun atur meja kerja anda, kekerapan anda bangun, dan program untuk otot leher dalam dan skapular. Tabiat lebih mengekalkan corak ini berbanding struktur. Kami akan berterus terang tentang apa yang berkemungkinan berubah: simptom dan keselesaan selalunya bertambah baik, dan sejauh mana ketidaksimetrian yang kelihatan berubah berbeza-beza mengikut individu.',
      },
      {
        heading: 'Apabila ketidaksimetrian memerlukan penilaian berbeza',
        body: 'Perbezaan paras bahu yang ketara, yang tidak pernah dialami pesakit sebelum ini, atau yang disertai rib hump atau lengkung tulang belakang yang kelihatan, adalah sebab untuk dinilai bagi kemungkinan skoliosis dengan sewajarnya, dan pada remaja yang masih membesar, itu adalah perkara ortopedik. Jika kiropraktor anda merasakan penyedia kesihatan lain lebih sesuai membantu anda, anda akan dirujuk dengan sewajarnya.',
      },
    ],
    redFlags: [
      'Sakit bahu atau leher selepas terjatuh, kemalangan kereta, atau hentaman langsung ke kepala, leher atau bahu',
      'Kebas, kelemahan, atau kehilangan kekuatan genggaman pada lengan atau tangan',
      'Ketidaksimetrian bahu yang muncul tiba-tiba atau semakin teruk secara jelas, terutamanya pada kanak-kanak atau remaja',
      'Pening, gangguan penglihatan, kesukaran bercakap atau menelan, atau rasa tidak stabil semasa berdiri',
      'Sakit bahu bersama rasa sesak dada, sesak nafas, berpeluh, atau sakit ke rahang atau lengan kiri. Dapatkan bantuan kecemasan segera',
      'Demam, penurunan berat badan tanpa sebab, atau sakit malam yang mengejutkan anda dari tidur',
      'Kekejangan atau ketidakstabilan yang melibatkan kedua-dua tangan atau kaki, atau kehilangan kawalan pundi kencing atau usus',
    ],
    faqs: [
      {
        q: 'Saya cari "sakit bahu" tapi masalah saya lebih kepada bahu yang tidak sekata, adakah ini halaman yang betul?',
        a: 'Ya. Banyak orang yang mencari sakit bahu sebenarnya mengalami corak bebanan tidak sekata, satu sisi bekerja lebih daripada yang lain sehingga otot di situ keletihan dan sakit. Halaman ini menerangkan corak itu secara khusus, termasuk bila ia berkaitan dengan postur dan tabiat harian, dan bila ia perlu dinilai sebagai sesuatu yang lain.',
      },
      {
        q: 'Adakah satu bahu lebih tinggi daripada yang lain satu masalah?',
        a: 'Tidak semestinya. Ketidaksimetrian ringan sangat lazim dan ramai yang mengalaminya tanpa sebarang simptom. Yang menjadikannya wajar dinilai adalah kesakitan, pergerakan terhad, atau ketidaksimetrian yang telah berubah. Jika anda tiada simptom dan tiada apa yang berubah, itu biasanya lebih meyakinkan berbanding sesuatu yang perlu ditindaki.',
      },
      {
        q: 'Bolehkah kiropraktik membetulkan bahu yang tidak sekata?',
        a: 'Kami lebih suka menetapkan jangkaan secara jujur di sini. Pelarasan dapat memulihkan pergerakan pada segmen leher dan belakang tengah yang terhad, dan kerja tisu lembut dapat mengurangkan tarikan otot yang menahan satu sisi lebih tinggi. Kedua-duanya selalunya membantu rasa dan pergerakan bahu. Sejauh mana perbezaan yang kelihatan berubah bergantung kepada puncanya, dan apabila puncanya struktur, ia mungkin tidak banyak berubah.',
      },
      {
        q: 'Adakah bahu tidak sekata bermakna saya ada skoliosis?',
        a: 'Kadangkala, tetapi tidak selalu. Perbezaan paras bahu biasanya berpunca daripada bebanan otot berbanding lengkung tulang belakang. Apabila corak menunjukkan kemungkinan lengkung, seperti rib hump semasa membongkok ke hadapan, deviasi tulang belakang yang kelihatan, atau remaja yang masih membesar, kami menilainya dengan sewajarnya, termasuk analisis X-ray jika perlu.',
      },
      {
        q: 'Apa itu dry needling dan adakah ia sakit?',
        a: 'Ia menggunakan jarum halus untuk mencapai jalur otot yang tegang secara langsung, sesuatu yang sukar dicapai melalui kulit dengan tangan sahaja. Kebanyakan orang menggambarkannya sebagai sakit sekejap atau rasa berdenyut berbanding sakit tajam, dan sesetengah berasa sedikit pedih untuk sehari selepasnya. Ia adalah salah satu pilihan antara beberapa lagi, digunakan apabila penilaian menunjukkan ketegangan otot adalah bahagian penting dalam gambaran keseluruhan.',
      },
      {
        q: 'Bagaimana saya elakkan ia berulang?',
        a: 'Kebanyakannya dengan mengubah punca asal, itulah sebabnya susun atur meja kerja dan program daya tahan bukan sekadar tambahan pilihan. Kerja secara tangan mengurangkan bebanan pada tisu yang teriritasi, dan tisu itu terus terbeban semula sebaik sahaja anda duduk kembali pada kedudukan yang sama. Secara praktikal: pusatkan monitor anda, tukar-tukar bahu yang menyandang beg, dan berdiri serta bergerak setiap 30 hingga 45 minit.',
      },
    ],
    keyTakeaways: [
      {
        q: 'Sejauh mana lazimnya perbezaan kecil ini?',
        a: 'Sangat lazim. Kebanyakan orang sedikit tidak simetri, dan perbezaan yang kelihatan dalam gambar bukan dengan sendirinya tanda sesuatu yang tidak kena.',
      },
      {
        q: 'Bilakah ia wajar dinilai?',
        a: 'Apabila ia disertai sakit atau kekakuan, apabila anda perasan ia berubah, atau apabila ia muncul pada kanak-kanak atau remaja semasa lonjakan pertumbuhan.',
      },
      {
        q: 'Apa punca lazimnya?',
        a: 'Tabiat dan bebanan lebih kerap berbanding struktur. Membawa beg pada satu sisi, tangan dominan, skrin yang tidak berpusat, atau satu segmen kaku yang kurang bekerja berbanding sisi yang lain.',
      },
      {
        q: 'Apa yang secara realistiknya boleh berubah?',
        a: 'Keselesaan, dan kemudahan menahan kedudukan yang sekata, selalunya bertambah baik. Perbezaan struktur yang tetap adalah perkara lain, dan pengamal anda akan memberitahu dengan jelas yang mana berkenaan dengan anda.',
      },
      {
        q: 'Bilakah anda dibuka?',
        a: 'Tujuh hari seminggu, di Sunway Velocity, Maluri. Isnin hingga Khamis dan Sabtu sehingga 8 malam, Jumaat sehingga 5 petang, Ahad sehingga 3 petang.',
      },
    ],
    qualifierConcerns: [
      'Satu bahu saya duduk lebih tinggi daripada yang lain',
      'Leher atau bahu saya sakit pada satu sisi',
      'Saya perasan dalam gambar',
      'Saya membawa beg atau bekerja pada satu sisi sepanjang hari',
      'Saya mahu tahu sama ada ia bermakna skoliosis',
    ],
    citations: [
      {
        claim:
          'Ketidaksimetrian postur ringan lazim dalam populasi umum dan bukan dengan sendirinya petunjuk penyakit yang mendasari.',
        source:
          'Twarowska-Grybalow & Truszczyńska-Baszak (2023), International Journal of Environmental Research and Public Health',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10048875/',
      },
      {
        claim:
          'Saringan untuk skoliosis idiopatik remaja mencari ketidaksimetrian batang tubuh dan rusuk semasa membongkok ke hadapan, bukan sekadar paras bahu.',
        source: 'Scoliosis Research Society',
        url: 'https://www.srs.org/Patients/Diagnosis-And-Treatment/Diagnosing-Scoliosis',
      },
    ],
    // Flipped for local preview only, at the user's request — still needs a Malay-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'scoliosis',
    title: 'Skoliosis di Cheras, Kuala Lumpur',
    metaTitle: 'Penilaian Skoliosis di Cheras, KL',
    metaDescription:
      'Penilaian skoliosis di Cheras, Maluri. Kami menilai lengkungan dan pergerakan, dan merujuk kepada pakar apabila itu yang diperlukan. Buka tujuh hari.',
    /**
     * ⚠️ TIADA DATA, BUKAN TIADA PERMINTAAN. Ubersuggest (locId 2458, 2026-09-03) memulangkan 0
     * untuk `skoliosis` dan juga untuk `tulang belakang bengkok`, kedua duanya dengan
     * `monthly_searches` yang kosong. Itu lubang data yang sama seperti yang direkodkan dalam
     * OPEN-ITEMS.md perkara 4, di mana `neck pain` memulangkan 0 sementara
     * `stiffness neck pain` memulangkan 1,600. `skoliosis` ialah istilah klinikal yang memang
     * digunakan orang, jadi 0 di sini tidak boleh dipercayai. Sahkan dengan GSC apabila data
     * bahasa Malaysia mula terkumpul, dan jangan tukar istilah semata mata kerana angka itu.
     */
    targetKeyword: 'skoliosis',
    related: ['back-pain', 'shoulder-imbalance'],
    helpedBy: ['chiropractic-care', 'physiotherapy'],

    intro:
      'Skoliosis ialah lengkungan sisi pada tulang belakang, dan pada kebanyakan kes remaja tiada sebab yang dapat dikenal pasti. Kami perlu berterus terang tentang satu perkara dari awal: jagaan kiropraktik tidak meluruskan lengkungan itu. Apa yang boleh dinilai ialah bagaimana tulang belakang bergerak, dari mana rasa tidak selesa itu datang, dan sama ada lengkungan itu memerlukan pemantauan pakar. Bagi kanak kanak yang masih membesar, itulah soalan yang paling penting.',
    symptoms: [
      'Satu bahu kelihatan lebih tinggi daripada sebelah lagi',
      'Pinggang atau garis pinggul yang tidak sama rata',
      'Satu bahagian belakang menonjol lebih apabila membongkok ke depan',
      'Rasa lenguh atau cepat lesu selepas duduk atau berdiri lama',
      'Baju yang kelihatan senget walaupun ukurannya betul',
    ],
    causes: [
      {
        heading: 'Idiopatik, iaitu tiada sebab yang dikenal pasti',
        body: 'Ini bentuk yang paling biasa pada remaja. Ia bukan disebabkan beg sekolah yang berat, postur yang buruk atau tidur pada satu sisi, walaupun ketiga tiga itu kerap dipersalahkan.',
      },
      {
        heading: 'Lengkungan yang berkembang semasa pertumbuhan',
        body: 'Lengkungan paling berkemungkinan berubah semasa pertumbuhan pesat. Itulah sebabnya usia dan tahap pertumbuhan lebih penting daripada darjah lengkungan itu sendiri apabila memutuskan langkah seterusnya.',
      },
      {
        heading: 'Perubahan pada usia lanjut',
        body: 'Pada orang dewasa yang lebih tua, perubahan pada sendi dan diskus boleh menghasilkan lengkungan yang terbentuk kemudian, dan keluhannya biasanya tentang keselesaan dan pergerakan, bukan tentang bentuk.',
      },
    ],
    approach: [
      {
        heading: 'Menilai dahulu, dan berkata terus jika ia bukan bidang kami',
        body: 'Kami memeriksa pergerakan tulang belakang, kesimetrian dan bagaimana lengkungan itu berkelakuan apabila anda bergerak. Jika penemuan itu menunjukkan lengkungan yang perlu dipantau oleh pakar, kami akan menyatakannya dan membantu anda ke sana.',
      },
      {
        heading: 'Menangani keselesaan dan pergerakan, bukan bentuk',
        body: 'Apa yang boleh kami bantu ialah sendi yang kaku, otot yang bekerja berlebihan dan rasa tidak selesa yang datang daripada keduanya. Itu perkara yang berbeza daripada mengubah lengkungan, dan kami tidak akan mencampurkan keduanya.',
      },
      {
        heading: 'Kekuatan dan tabiat harian',
        body: 'Kerja kekuatan pada teras dan pinggul, serta cara anda duduk dan mengangkat, boleh menjadikan hari hari lebih selesa. Ia tidak mengubah lengkungan itu dan kami tidak mendakwa sebaliknya.',
      },
    ],
    redFlags: [
      'Lengkungan yang jelas bertambah dalam beberapa bulan',
      'Lengkungan pada kanak kanak yang masih membesar dan belum pernah dinilai oleh pakar',
      'Sakit malam yang membangunkan anda dari tidur',
      'Kelemahan, kebas atau perubahan pada kawalan kencing atau najis',
      'Sesak nafas yang dikaitkan dengan bentuk tulang belakang',
    ],
    keyTakeaways: [
      {
        q: 'Bolehkah kiropraktik meluruskan skoliosis?',
        a: 'Tidak. Tiada jagaan manual yang meluruskan lengkungan struktur. Apa yang boleh dinilai dan dibantu ialah pergerakan dan keselesaan, dan itu dua perkara yang berbeza.',
      },
      {
        q: 'Bilakah pendapat pakar diperlukan?',
        a: 'Apabila lengkungan muncul semasa pertumbuhan atau menunjukkan tanda bertambah. Dalam kes begitu pemantauan pakar ialah perkara yang betul, dan kami akan merujuk anda.',
      },
      {
        q: 'Adakah beg sekolah berat menyebabkannya?',
        a: 'Tidak. Pada kebanyakan skoliosis remaja tiada sebab yang dapat dikenal pasti, itulah maksud istilah idiopatik.',
      },
    ],
    qualifierConcerns: [
      'Satu bahu saya kelihatan lebih tinggi',
      'Saya diberitahu tulang belakang saya bengkok',
      'Anak saya baru dikenal pasti mempunyai lengkungan',
      'Belakang saya cepat lenguh selepas duduk lama',
    ],
    faqs: [
      {
        q: 'Bolehkah pelarasan kiropraktik membetulkan lengkungan skoliosis saya?',
        a: 'Tidak, dan sesiapa yang berkata boleh sedang menjanjikan sesuatu yang tidak dapat ditunaikan. Lengkungan itu struktur. Apa yang boleh dinilai dan dibantu ialah sendi yang kaku dan otot yang bekerja berlebihan di sekelilingnya, yang bagi sebahagian orang menjadikan hari harian lebih selesa. Bentuk tulang belakang bukan yang berubah.',
      },
      {
        q: 'Anak saya mempunyai skoliosis. Patutkah kami datang ke sini dahulu?',
        a: 'Bagi kanak kanak yang masih membesar, pemantauan pakar ialah keutamaan, kerana lengkungan paling berkemungkinan berubah dalam tempoh itu. Kami boleh menilai pergerakan dan keselesaan, tetapi kami tidak akan menggantikan penilaian ortopedik dan kami akan berkata begitu terus.',
      },
      {
        q: 'Adakah saya perlu X-ray?',
        a: 'Kadang kadang. Darjah lengkungan dan sama ada ia berubah hanya boleh dilihat pada imej, jadi jika soalan itu penting untuk keputusan anda, imej diperlukan. Jika penilaian klinikal sudah menjawab apa yang perlu dijawab, kami tidak akan menghantar anda pergi mengambilnya tanpa sebab.',
      },
      {
        q: 'Adakah skoliosis bermakna saya akan sakit belakang sepanjang hayat?',
        a: 'Tidak semestinya. Banyak orang dengan lengkungan ringan hidup tanpa keluhan yang bermakna, dan banyak orang tanpa lengkungan pula mengalami sakit belakang. Lengkungan itu satu penemuan, bukan ramalan.',
      },
      {
        q: 'Apa yang berlaku pada lawatan pertama?',
        a: 'Kami bertanya tentang sejarahnya, memeriksa pergerakan dan kesimetrian tulang belakang, dan menjalankan pemeriksaan saraf jika perlu. Anda akan pulang mengetahui sama ada ini sesuatu yang kami boleh bantu, sesuatu yang perlu dipantau oleh pakar, atau kedua duanya.',
      },
    ],
    citations: [
      {
        claim:
          'Pada kebanyakan skoliosis remaja tiada sebab asas yang dapat dikenal pasti, dan itulah sebabnya ia digambarkan sebagai idiopatik.',
        source: 'Scoliosis Research Society',
        url: 'https://www.srs.org/Patients/Conditions/Scoliosis/Idiopathic-Scoliosis',
      },
      {
        claim:
          'Penilaian pakar dinasihatkan bagi lengkungan yang muncul semasa pertumbuhan atau yang menunjukkan tanda bertambah.',
        source: 'Janicki & Alman (2007), Paediatrics & Child Health',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2532872/',
      },
    ],
    draft: false,
  },
  {
    /**
     * ⚠️ TUGAS HALAMAN INI IALAH MENYATAKAN APA YANG KAMI TIDAK LAKUKAN.
     *
     * `migrain` ialah 27,100/mo, SD 41, CPC 1.18 (Ubersuggest, locId 2458, 2026-09-03), iaitu
     * kata kunci TERBESAR dalam keseluruhan projek ini, dalam mana mana bahasa. Ia juga satu
     * satunya keadaan yang klinik ini secara jelas tidak mendakwa boleh bantu. Kedua dua
     * perkara itu benar pada masa yang sama, dan angka itu tidak mengubah jawapannya.
     *
     * Satu perkara jujur yang halaman ini boleh tawarkan ialah menilai sama ada sebahagian
     * daripada sakit kepala itu datang daripada sendi dan otot leher atas, iaitu perkara yang
     * berbeza dan agak biasa. Apabila penemuan menunjuk kepada doktor, halaman ini berkata
     * begitu.
     *
     * Perkataan "rawatan" dielakkan sepenuhnya walaupun AGENTS.md membenarkannya dalam
     * penafian, kerana sapuan bahasa Malaysia dalam `content.test.ts` tidak melaksanakan
     * pengecualian itu dan meluaskan senarai itu perlu ditanya kepada klien dahulu. "Pengurusan
     * perubatan" menyampaikan perkara yang sama tanpa perkataan itu.
     */
    slug: 'migraine',
    title: 'Migrain dan Sakit Kepala Berpunca Leher di Cheras, Kuala Lumpur',
    metaTitle: 'Migrain & Penilaian Leher di Cheras, KL',
    metaDescription:
      'Pengurusan perubatan migrain adalah bidang doktor. Kami menilai sama ada sebahagian sakit kepala anda datang daripada leher atas. Cheras, Maluri.',
    /** `migrain` 27,100/mo, SD 41 (Ubersuggest, locId 2458, 2026-09-03). Terbesar dalam projek. */
    targetKeyword: 'migrain',
    related: ['neck-pain'],
    helpedBy: ['chiropractic-care'],

    intro:
      'Bukan setiap sakit kepala yang berat itu migrain, dan bukan setiap migrain ada kaitan dengan leher. Membezakan yang mana satu anda hadapi memang itulah tujuan satu konsultasi. Migrain sendiri ialah keadaan neurologi, dan pengurusan perubatannya adalah bidang doktor, jadi kiropraktik bukan penyelesaian untuknya. Apa yang boleh kami nilai ialah sama ada sebahagian daripada apa yang anda rasa datang daripada sendi dan otot leher atas, iaitu punca sakit kepala yang berasingan dan agak biasa. Jika penilaian itu menunjuk kepada doktor anda dan bukan kepada kami, kami akan berkata begitu terus dan membantu anda ke sana.',
    symptoms: [
      'Sakit kepala yang mula di leher atau belakang kepala sebelum merebak ke depan',
      'Bertambah selepas memusing kepala atau menunduk lama',
      'Berulang pada sisi yang sama, pada kedudukan yang agak tetap',
      'Disertai leher kaku atau ketegangan pada bahu dan leher',
      'Tekanan pada leher atas membangkitkan rasa sakit kepala yang anda kenali',
    ],
    causes: [
      {
        heading: 'Sendi dan otot leher atas',
        body: 'Apabila sendi leher atas dan otot di sekelilingnya terganggu, sakitnya boleh dirasai di kepala. Dalam pengelasan antarabangsa ia sejenis sakit kepala yang berasingan daripada migrain.',
      },
      {
        heading: 'Migrain itu sendiri',
        body: 'Migrain ialah penyakit sistem saraf, kerap dengan sensitif kepada cahaya, rasa mual dan pola serangan tertentu. Diagnosis dan ubatnya adalah bidang doktor, bukan bidang kami.',
      },
      {
        heading: 'Kedua duanya sekali',
        body: 'Seseorang boleh mempunyai migrain dan sakit kepala berpunca leher pada masa yang sama. Itulah sebabnya ia mudah bercampur apabila dinilai sendiri, dan tujuan penilaian ialah memisahkan keduanya.',
      },
    ],
    approach: [
      {
        heading: 'Membezakan dahulu, kemudian memutuskan',
        body: 'Kami melihat pola sakit kepala anda, pergerakan leher, dan sama ada leher atas boleh membangkitkan rasa sakit yang anda kenali. Kesimpulannya mungkin "ini bukan bidang kami", dan itu pun jawapan yang berguna.',
      },
      {
        heading: 'Bahagian yang datang dari leher, kami bantu',
        body: 'Jika penilaian menunjuk kepada leher atas, pelarasan tepat dan jagaan manual pada segmen yang terhad boleh dimasukkan. Kami akan terangkan apa yang dijangka dan apa yang tidak, dan kami tidak menjanjikan sakit kepala itu akan hilang.',
      },
      {
        heading: 'Bahagian yang bukan milik kami, kami rujuk',
        body: 'Ubat migrain, pelan pencegahan dan pemeriksaan lanjut adalah bidang doktor. Kami akan menulis penemuan kami supaya anda boleh membawanya, dan bukan menahan anda di sini untuk mencuba lagi.',
      },
    ],
    redFlags: [
      'Sakit kepala mendadak yang anda gambarkan sebagai paling teruk pernah dialami',
      'Disertai demam dan leher kaku',
      'Bermula selepas kecederaan pada kepala',
      'Disertai kehilangan penglihatan, kesukaran bertutur atau kelemahan sebelah badan',
      'Sakit kepala baharu yang muncul selepas usia 50 tahun',
      'Jelas bertambah apabila batuk, meneran atau bertukar kedudukan',
    ],
    keyTakeaways: [
      {
        q: 'Bolehkah kiropraktik menghilangkan migrain?',
        a: 'Tidak. Migrain ialah keadaan neurologi dan pengurusan perubatannya adalah bidang doktor. Apa yang boleh kami buat ialah menilai sama ada sebahagian sakit kepala anda datang daripada leher atas.',
      },
      {
        q: 'Apa bezanya sakit kepala berpunca leher dengan migrain?',
        a: 'Sakit kepala berpunca leher datang daripada struktur pada leher dan dikelaskan secara berasingan. Migrain ialah penyakit sistem saraf itu sendiri. Kedua duanya boleh wujud bersama, dan itulah sebabnya penilaian diperlukan.',
      },
      {
        q: 'Jadi perlukah saya datang?',
        a: 'Jika sakit kepala anda jelas berkait dengan pergerakan leher atau kedudukan menunduk, penilaian itu berguna. Jika penemuan menunjuk kepada doktor, kami akan berkata begitu dan membantu anda ke sana.',
      },
    ],
    qualifierConcerns: [
      'Sakit kepala saya mula di leher atau belakang kepala',
      'Ia bertambah selepas menunduk atau memusing kepala',
      'Saya juga ada ketegangan bahu dan leher',
      'Saya tidak pasti sama ada ini migrain atau masalah leher',
    ],
    faqs: [
      {
        q: 'Bolehkah anda menghentikan migrain saya daripada berulang?',
        a: 'Tidak, dan kami tidak akan berkata begitu. Diagnosis dan ubat migrain adalah bidang doktor. Apa yang kami nilai ialah berapa banyak daripada apa yang anda rasa datang daripada sendi dan otot leher atas. Bahagian itu bidang kami, yang lain bukan.',
      },
      {
        q: 'Bagaimana saya tahu sakit kepala saya berkait dengan leher?',
        a: 'Beberapa petunjuk: ia mula di leher atau belakang kepala, berubah dengan kedudukan kepala, berulang pada sisi yang sama, dan tekanan pada leher atas membangkitkan rasa yang anda kenali. Penilaian melihat semua itu bersama dan bukan satu petunjuk sahaja.',
      },
      {
        q: 'Saya sudah berjumpa doktor. Perlukah saya datang juga?',
        a: 'Kedua duanya tidak bertentangan. Doktor menguruskan migrain itu sendiri, kami melihat sama ada leher menyumbang sebahagian lagi. Bawa diagnosis dan senarai ubat anda, dan kami akan menilai dalam kerangka itu.',
      },
      {
        q: 'Apa yang berlaku pada lawatan pertama?',
        a: 'Kami bertanya tentang pola sakit kepala dan sejarah anda, memeriksa pergerakan leher dan leher atas, dan menjalankan pemeriksaan yang perlu untuk menolak keadaan yang memerlukan perhatian segera. Sebelum pulang anda akan tahu siapa yang patut menangani ini.',
      },
      {
        q: 'Bila saya patut terus berjumpa doktor atau ke kecemasan?',
        a: 'Sakit kepala mendadak yang paling teruk pernah anda alami, disertai demam dan leher kaku, bermula selepas kecederaan kepala, disertai masalah penglihatan atau pertuturan atau kelemahan sebelah badan, dan sakit kepala baharu selepas usia 50 tahun. Dalam keadaan itu dapatkan bantuan perubatan dahulu dan jangan datang kepada kami dahulu.',
      },
    ],
    citations: [
      {
        claim:
          'Sakit kepala berpunca leher dikelaskan sebagai gangguan sakit kepala yang berasingan dan dikaitkan dengan struktur pada leher.',
        source: 'International Classification of Headache Disorders, ICHD-3',
        url: 'https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/',
      },
      {
        claim:
          'Gangguan sakit kepala adalah antara gangguan sistem saraf yang paling biasa di seluruh dunia.',
        source: 'World Health Organization',
        url: 'https://www.who.int/news-room/fact-sheets/detail/headache-disorders',
      },
    ],
    draft: false,
  },
  {
    slug: 'pinched-nerve',
    title: 'Sakit Saraf Tangan & Kebas Tangan di Cheras, Kuala Lumpur',
    metaTitle: 'Jagaan Sakit Saraf Tangan di Cheras, KL',
    metaDescription:
      'Sakit saraf tangan dan kebas tangan yang berpunca dari leher, dinilai di Cheras, Maluri. Kesemutan, kebas atau lemah ke lengan dan tangan diperiksa sebelum sebarang pelarasan.',
    // sakit saraf tangan 260/mo, SD 35 (Ubersuggest, locId 2458, 2026-09-12), the same shape as
    // the sciatica page's "sakit saraf kaki". The literal translations, "saraf tersepit" and
    // "saraf terjepit", both measure 0, and so does "kebas tangan" as a head term; its long
    // tails ("petua tradisional hilangkan kebas tangan" 590/mo) are remedy searches, not people
    // looking for an assessment, so "kebas tangan" sits in the title rather than as the target.
    targetKeyword: 'sakit saraf tangan',
    related: ['neck-pain', 'slipped-disc'],
    helpedBy: ['chiropractic-care', 'physiotherapy'],

    intro:
      'Sakit saraf tangan dan kebas tangan selalunya bermula di leher: akar saraf tertekan atau teriritasi ketika ia keluar dari tulang belakang, dan nama klinikalnya ialah radikulopati servikal. Apa yang mengelirukan ialah gejala biasanya muncul di tempat lain daripada masalahnya. Saraf tersepit di leher, tetapi rasa terbakar, kesemutan atau lemah dirasai di bahu, lengan atau tangan, dan kadangkala leher itu sendiri hampir tidak sakit langsung. Kebanyakan orang pulih tanpa pembedahan. Tugas penilaian ialah menentukan saraf yang mana, di paras mana, dan apa yang menekannya.',
    symptoms: [
      'Sakit terbakar, menjalar atau seperti renjatan elektrik dari leher ke bahu, lengan atau tangan',
      'Kesemutan atau kebas pada jari tertentu, bukan seluruh tangan',
      'Lemah pada lengan, atau genggaman yang terlepas ketika mengangkat sesuatu',
      'Gejala pada satu sisi sahaja',
      'Sakit yang berkurang apabila tangan yang terjejas diletakkan di atas kepala',
      'Gejala tercetus apabila kepala dipusing atau dicondongkan ke sisi yang sakit',
      'Sakit leher yang lebih ringan berbanding gejala pada lengan',
      'Tidur terganggu oleh lengan, bukan oleh leher',
    ],
    causes: [
      {
        heading: 'Bahan cakera menekan akar saraf',
        body: 'Cakera yang membonjol atau terkeluar di leher boleh menekan akar saraf, atau mengiritasinya secara kimia, pada titik ia keluar dari tulang belakang. Ini gambaran yang lebih lazim pada orang dewasa muda, dan sebab itulah leher diperiksa dengan teliti walaupun tangan yang mengganggu anda.',
      },
      {
        heading: 'Laluan saraf yang menyempit',
        body: 'Perubahan berkaitan usia pada sendi kecil dan cakera leher beransur-ansur mengurangkan ruang yang dilalui setiap akar saraf. Gejala corak ini cenderung terbina perlahan-lahan dan bukan muncul semalaman, dan selalunya tercetus apabila kepala ditahan dalam satu kedudukan untuk tempoh yang lama.',
      },
      {
        heading: 'Kedudukan dan bebanan leher yang berpanjangan',
        body: 'Berjam-jam dengan kepala di hadapan bahu membebankan leher bawah secara berterusan. Ini jarang menyepit saraf dengan sendirinya, tetapi ia penemuan latar yang lazim, dan biasanya bahagian yang paling boleh dikawal oleh pesakit sendiri.',
      },
      {
        heading: 'Saraf yang teriritasi lebih jauh di sepanjang laluannya',
        body: 'Bukan setiap gejala lengan bermula di leher. Saraf yang sama boleh tertekan lebih jauh di laluannya, di bahu, siku atau pergelangan tangan, dan itu menghasilkan corak yang berbeza. Jari yang mana terlibat, dan pergerakan mana yang mencetuskannya, adalah sebahagian besar cara kedua-duanya dibezakan semasa pemeriksaan.',
      },
    ],
    approach: [
      {
        heading: 'Mencari saraf yang mana, dan di mana ia tersepit',
        body: 'Lawatan pertama anda mengikut penilaian enam langkah Gonstead: sejarah kesihatan, visualisasi, penggunaan nervoscope, palpasi, dan analisis X-ray jika perlu. Bagi keadaan ini kiropraktor anda menambah ujian neurologi, memeriksa refleks, kekuatan otot dan deria di kawasan yang dibekalkan oleh setiap akar saraf. Bahagian itu lebih penting di sini berbanding kebanyakan keadaan lain, kerana masalah saraf meninggalkan corak yang akan terlepas dalam pemeriksaan leher biasa.',
      },
      {
        heading: 'Pelarasan apabila penilaian menyokongnya',
        body: 'Jika pemeriksaan menunjukkan segmen yang tersekat menyumbang kepada gambaran itu, pelarasan dibuat khusus pada paras tersebut dan dengan tangan, dan kiropraktor anda akan menerangkan apa yang dijumpai sebelum sebarang tindakan. Sesetengah keadaan tidak sesuai untuk pelarasan, dan penilaian wujud untuk mengesan perkara itu. Jika penyedia kesihatan lain lebih sesuai membantu anda, anda akan dirujuk dengan sewajarnya.',
      },
      {
        heading: 'Membina semula apa yang hilang pada lengan',
        body: 'Apabila kekuatan atau daya tahan telah berkurang pada lengan atau otot leher dalam, bahagian fisioterapi kami menambah program berperingkat untuk membinanya semula, bersama kerja mobiliti saraf apabila penilaian menyokongnya. Ini biasanya separuh yang lebih perlahan, dan separuh yang paling bergantung kepada apa yang anda lakukan antara lawatan.',
      },
      {
        heading: 'Mengubah apa yang terus membebankannya',
        body: 'Mengembalikan pergerakan kepada segmen yang kaku tidak bertahan lama jika leher kembali kepada kedudukan yang mengiritasinya selama lapan jam lagi sehari. Ketinggian meja dan skrin, tabiat telefon, cara anda tidur dan berapa kerap anda bangun semuanya dibincangkan, kerana itulah yang menentukan sama ada penambahbaikan itu kekal.',
      },
    ],
    redFlags: [
      'Kelemahan yang semakin teruk, atau lengan atau tangan yang tidak dapat digunakan dengan betul',
      'Gejala pada kedua-dua lengan pada masa yang sama',
      'Kekok pada tangan, kesukaran dengan butang atau tulisan tangan, atau tidak stabil semasa berjalan',
      'Kehilangan kawalan pundi kencing atau usus',
      'Gejala leher atau lengan selepas terjatuh, kemalangan jalan raya, atau hentaman pada kepala atau leher',
      'Demam, penurunan berat badan tanpa sebab, atau sakit yang mengejutkan anda setiap malam',
      'Sakit leher teruk secara tiba-tiba dengan pening, gangguan penglihatan, atau kesukaran bercakap atau menelan',
    ],
    faqs: [
      {
        q: 'Adakah saraf tersepit sama dengan slip disc?',
        a: 'Kedua-duanya berkaitan tetapi tidak sama. Slip disc menggambarkan cakera itu sendiri yang membonjol atau terkeluar. Saraf tersepit menggambarkan apa yang boleh berlaku seterusnya, jika bahan cakera itu atau laluan yang menyempit menekan akar saraf. Anda boleh mempunyai perubahan cakera pada imbasan tanpa sebarang gejala saraf, dan anda boleh mempunyai gejala saraf daripada punca selain cakera. Yang mana satu anda hadapi ialah apa yang pemeriksaan selesaikan.',
      },
      {
        q: 'Bagaimana saya tahu sama ada kebas tangan saya datang dari leher atau pergelangan tangan?',
        a: 'Coraknya biasanya memberitahu. Saraf yang tertekan di leher cenderung menghasilkan gejala yang mengikut satu jalur menuruni lengan dan melibatkan jari tertentu, dan selalunya tercetus oleh pergerakan leher. Saraf yang tertekan di pergelangan tangan cenderung kekal di tangan, dan selalunya lebih teruk pada waktu malam atau ketika menggenggam. Ada pertindihan yang sebenar, dan sesetengah orang mempunyai kedua-duanya sekali gus, jadi kami menguji kedua-duanya dan bukan mengandaikan.',
      },
      {
        q: 'Adakah pelarasan akan memburukkan saraf yang tersepit?',
        a: 'Ia bergantung sepenuhnya kepada gambaran yang ada, sebab itulah penilaian datang dahulu dan sebab itulah bukan setiap leher dilaras. Apabila ada tanda bahawa saraf tunjang dan bukan satu akar saraf yang terlibat, atau apabila kelemahan semakin teruk, jagaan secara tangan bukan langkah pertama yang betul dan anda akan dihantar untuk semakan perubatan. Beritahu kami tentang sebarang kelemahan, kekok atau trauma baru-baru ini semasa menempah, supaya kami dapat menyaringnya dengan betul.',
      },
      {
        q: 'Perlukah saya buat MRI sebelum datang?',
        a: 'Tidak. Bawa jika anda sudah ada, bersama sebarang laporan, kerana ia menjimatkan kerja berulang. Kebanyakan orang tidak memerlukan pengimejan lanjutan pada permulaan, dan imbasan semata-mata memberitahu kami kurang daripada yang anda jangka tanpa pemeriksaan di sebelahnya. Perubahan cakera muncul pada imbasan ramai orang yang tiada sebarang gejala, jadi penemuan itu hanya bermakna dalam konteks.',
      },
      {
        q: 'Berapa lama biasanya ia mengambil masa untuk reda?',
        a: 'Ia berbeza mengikut punca, berapa lama ia telah berlaku, dan sebanyak mana saraf itu dibebankan dari hari ke hari, jadi kami tidak akan memberikan angka sebelum memeriksa anda. Gejala yang ada selama beberapa minggu biasanya berkelakuan berbeza daripada gejala yang ada selama setahun. Kiropraktor anda akan memberikan gambaran realistik berdasarkan penemuan anda sendiri dan bukan angka umum.',
      },
    ],
    keyTakeaways: [
      {
        q: 'Apakah itu saraf tersepit di leher?',
        a: 'Akar saraf yang tertekan atau teriritasi ketika keluar dari tulang belakang di leher. Nama klinikalnya ialah radikulopati servikal.',
      },
      {
        q: 'Mengapa saya rasa di tangan dan bukan di leher?',
        a: 'Kerana saraf membawa isyarat keluar dari tempat ia tersepit. Leher ialah tempat masalahnya, lengan dan tangan ialah tempat ia dirasai, dan leher itu sendiri mungkin hampir tidak sakit.',
      },
      {
        q: 'Adakah saraf tersepit sentiasa bermakna pembedahan?',
        a: 'Tidak. Kebanyakan orang bertambah baik dari masa ke masa tanpanya, dan jagaan bukan pembedahan ialah titik permulaan yang biasa. Kelemahan yang semakin teruk ialah penemuan yang mengubah perkara itu, sebab itulah ia disaring.',
      },
      {
        q: 'Adakah penting jari yang mana menjadi kebas?',
        a: 'Sangat penting. Setiap akar saraf membekalkan satu jalur kulit tertentu dan otot tertentu, jadi jari yang terlibat membantu menunjukkan parasnya dan bukan sekadar perincian sampingan.',
      },
      {
        q: 'Bilakah anda dibuka?',
        a: 'Tujuh hari seminggu, di Sunway Velocity, Maluri. Isnin hingga Khamis dan Sabtu sehingga 8 malam, Jumaat sehingga 5 petang, Ahad sehingga 3 petang.',
      },
    ],
    qualifierConcerns: [
      'Saya rasa kesemutan atau kebas pada lengan atau tangan',
      'Genggaman saya terasa lebih lemah daripada dahulu',
      'Sakitnya lebih teruk di lengan berbanding di leher',
      'Memusingkan kepala mencetuskan gejala menuruni lengan',
      'Saya mahu tahu sama ada ini datang dari leher saya',
    ],
    citations: [
      {
        claim:
          'Kebanyakan orang dengan saraf tersepit di leher bertambah baik dari masa ke masa, dan pendekatan pertama secara umumnya bukan pembedahan.',
        source: 'OrthoInfo, American Academy of Orthopaedic Surgeons',
        url: 'https://www.orthoinfo.org/en/diseases--conditions/cervical-radiculopathy-pinched-nerve/',
      },
      {
        claim:
          'Akar saraf C7 ialah paras yang paling kerap terlibat dalam radikulopati servikal, merangkumi lebih separuh kes, dengan C6 kira-kira satu perempat.',
        source: 'Cervical Radiculopathy, StatPearls, National Library of Medicine',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK441828/',
      },
    ],
    // Same standing as every other ms record: adapted from clinic-reviewed English copy, not
    // yet read by a Malay-speaking reviewer. Flip to `true` if that review is required first.
    draft: false,
  },
  {
    slug: 'tension-headache',
    title: 'Sakit Kepala Belakang & Tegang di Cheras, Kuala Lumpur',
    metaTitle: 'Jagaan Sakit Kepala Belakang di Cheras, KL',
    metaDescription:
      'Sakit kepala belakang dan sakit kepala tegang dinilai di Cheras, Maluri. Tekanan seperti diikat, bezanya dengan migrain, dan apa yang pemeriksaan leher boleh beritahu anda.',
    // sakit kepala belakang 1,000/mo, SD 19 (Ubersuggest, locId 2458, 2026-09-12): the headache
    // this page describes, starting at the base of the skull. "sakit kepala" (8,100/mo) is every
    // headache there is, and the migraine page already owns the biggest slice of that intent
    // ("migrain", 27,100/mo). The literal translations measure 90 each ("sakit kepala tegang",
    // "sakit kepala tension"); "kerap sakit kepala dan tengkuk" 140 and "sakit kepala bagian
    // belakang bawah dekat leher" 320 confirm the back-of-head, near-the-neck angle is the one
    // people actually type. "sakit tengkuk" (880/mo, SD 8) is a NECK term and belongs to the
    // neck-pain record if anyone revisits that target; it is not used here.
    targetKeyword: 'sakit kepala belakang',
    related: ['neck-pain', 'migraine'],
    helpedBy: ['dry-needling', 'physiotherapy'],

    intro:
      'Sakit kepala belakang yang tegang, seperti diikat, ialah sakit kepala yang paling lazim: rasa tertekan dan ketat di kedua-dua belah kepala, sering digambarkan seperti memakai topi yang terlalu ketat, tanpa denyutan dan loya yang menandakan migrain. Ia sakit kepala yang paling ramai alami, dan sebab itulah ia sering dipandang ringan. Kebanyakan orang mengambil ubat tahan sakit dan meneruskan hari, dan untuk sakit kepala sekali-sekala itu perkara yang munasabah. Ia patut diperiksa lebih dekat apabila sakit kepala datang hampir setiap minggu, apabila ia mengikut hari bekerja anda, atau apabila ubat tahan sakit telah diam-diam menjadi tabiat harian. Apa yang kami boleh nilai ialah sama ada otot dan sendi leher serta belakang atas adalah sebahagian daripada apa yang terus mencetuskannya.',
    symptoms: [
      'Sakit menekan atau mengetatkan di kedua-dua belah kepala, bukan satu sisi',
      'Rasa ketat seperti diikat di sekeliling dahi, pelipis atau belakang kepala',
      'Sakit ringan hingga sederhana yang tumpul, bukan berdenyut',
      'Sakit yang tidak bertambah teruk apabila anda menaiki tangga atau bergerak',
      'Tiada loya atau muntah bersamanya',
      'Rasa sakit apabila ditekan pada otot di pangkal tengkorak, leher dan bahu',
      'Sakit kepala yang terbina sepanjang hari bekerja dan reda pada hujung minggu',
      'Sukar menumpukan perhatian, dan rasa tertekan dan bukan sakit yang tajam',
    ],
    causes: [
      {
        heading: 'Bebanan berterusan pada otot leher dan bahu',
        body: 'Otot yang ditahan pada tahap pengecutan rendah selama berjam-jam menjadi sakit dan memindahkan sakit ke kepala. Skrin yang terlalu rendah, laptop tanpa penyangga, tempoh panjang di telefon dan memandu dalam kesesakan semuanya meminta otot di pangkal tengkorak bekerja berterusan tanpa pernah benar-benar melepaskan.',
      },
      {
        heading: 'Pergerakan terhad di bahagian atas leher',
        body: 'Apabila satu segmen di bahagian atas leher berhenti bergerak dengan baik, otot di sekelilingnya bekerja lebih keras untuk mengimbangi dan kekal terbeban. Ini penemuan yang kerap pada orang yang sakit kepalanya bermula di belakang tengkorak, walaupun ia bukan keseluruhan cerita dengan sendirinya.',
      },
      {
        heading: 'Tekanan, tidur dan mengetap gigi',
        body: 'Tidur yang tidak lena, bantal yang tidak menyokong dan tabiat mengetap gigi secara ringan mengekalkan otot di sekeliling tengkorak dan rahang dalam ketegangan sepanjang malam, jadi kawasan itu tidak pernah mendapat tempoh rehat yang sebenar. Ini jarang menjelaskan sakit kepala sepenuhnya, tetapi sangat kerap wujud bersama apa sahaja yang lain berlaku.',
      },
      {
        heading: 'Ubat tahan sakit yang diambil terlalu kerap',
        body: 'Yang ini mengejutkan ramai orang. Mengambil ubat sakit kepala pada lebih banyak hari daripada tidak boleh, dalam tempoh berbulan-bulan, menjadikan sakit kepala lebih kerap dan bukan kurang. Ia corak yang diiktiraf dengan namanya sendiri, sakit kepala akibat penggunaan ubat berlebihan. Kami bukan orang yang tepat untuk melaraskan ubat anda, tetapi jika coraknya sepadan, ia patut dibangkitkan dengan doktor atau ahli farmasi anda dan bukan dibiarkan tanpa diperiksa.',
      },
    ],
    approach: [
      {
        heading: 'Menentukan sakit kepala jenis apa sebenarnya ini',
        body: 'Lawatan pertama anda sebahagian besarnya ialah pengambilan sejarah: di mana sakitnya, bagaimana rasanya, apa yang mencetuskannya, apa yang datang bersamanya, dan apa yang anda telah cuba. Sakit kepala tegang, migrain dan sakit kepala yang datang dari leher boleh bertindih, dan ramai orang mempunyai lebih daripada satu pada satu masa. Menetapkan diagnosis sakit kepala ialah tugas doktor anda. Apa yang kami tentukan ialah sama ada ada sumbangan mekanikal yang berbaloi ditangani.',
      },
      {
        heading: 'Memeriksa leher dan belakang atas',
        body: 'Itu diikuti dengan baki penilaian enam langkah Gonstead: visualisasi, penggunaan nervoscope, palpasi dengan penilaian pergerakan penuh leher dan belakang atas, dan analisis X-ray jika perlu. Kiropraktor anda mencari segmen yang tersekat dan otot yang sakit dan terlebih bekerja yang begitu kerap menyertainya.',
      },
      {
        heading: 'Apa yang jagaan libatkan apabila leher menyumbang',
        body: 'Apabila penilaian menunjukkan segmen yang tersekat, pelarasan dibuat khusus padanya dan dengan tangan, dan kiropraktor anda akan menerangkan apa yang dijumpai dahulu. Apabila otot di sekeliling adalah sebahagian besar daripadanya, bahagian fisioterapi kami mungkin menambah terapi manual atau dry needling untuk titik sakit di pangkal tengkorak dan merentasi bahu, bersama program membina daya tahan otot leher dalam. Kami menyasarkan pergerakan yang lebih baik dan kurang bebanan berterusan pada tisu itu. Apa yang ia ubah tentang sakit kepala itu sendiri berbeza dari seorang ke seorang.',
      },
      {
        heading: 'Bahagian yang berlaku di luar klinik',
        body: 'Ketinggian meja dan skrin, berapa kerap anda bangun, bantal anda, dan berapa banyak kafein dan air yang diambil sepanjang hari bekerja semuanya menyumbang. Anda biasanya akan diminta menyimpan rekod ringkas bila sakit kepala berlaku dan apa yang berlaku sebelumnya, kerana corak sakit kepala sangat sukar dinilai daripada ingatan dan ia selalunya perkara paling berguna yang dibawa pesakit ke lawatan kedua.',
      },
    ],
    redFlags: [
      'Sakit kepala yang tiba-tiba dan teruk yang mencapai kemuncak dalam beberapa saat atau minit',
      'Sakit kepala paling teruk dalam hidup anda, atau yang jelas berbeza daripada mana-mana yang pernah anda alami',
      'Sakit kepala dengan demam, leher kaku, atau ruam',
      'Sakit kepala dengan kelemahan, kebas, keliru, kesukaran bercakap, atau kehilangan penglihatan',
      'Sebarang sakit kepala selepas hentaman pada kepala, terjatuh, atau kemalangan jalan raya',
      'Sakit kepala baharu yang bermula selepas usia 50 tahun, atau yang semakin teruk dalam tempoh beberapa hari dan minggu',
      'Sakit kepala yang lebih teruk ketika berbaring, batuk atau meneran, atau yang mengejutkan anda daripada tidur',
      'Sakit kepala bersama sejarah kanser, sistem imun yang lemah, atau penurunan berat badan tanpa sebab',
    ],
    faqs: [
      {
        q: 'Apa bezanya sakit kepala tegang dengan migrain?',
        a: 'Sakit kepala tegang biasanya dirasai di kedua-dua belah sebagai tekanan ketat yang berterusan, ringan hingga sederhana, dan tidak bertambah teruk apabila anda bergerak. Migrain lebih kerap satu sisi dan berdenyut, cenderung lebih teruk dengan aktiviti, dan biasanya membawa loya atau sensitif kepada cahaya dan bunyi. Itu pembahagian buku teks, dan kehidupan sebenar lebih bercelaru, kerana sesetengah orang mengalami kedua-duanya. Migrain ialah keadaan neurologi dan pengurusan perubatannya terletak pada doktor.',
      },
      {
        q: 'Bolehkah leher yang tegang benar-benar menyebabkan sakit kepala?',
        a: 'Otot dan sendi di leher dan belakang atas boleh memindahkan sakit ke kepala, dan itu diiktiraf dengan baik. Sama ada itulah yang mendorong sakit kepala anda secara khusus ialah soalan untuk pemeriksaan dan bukan sesuatu untuk diandaikan. Sesetengah ciri menunjuk ke arah itu, seperti sakit yang bermula di pangkal tengkorak, rasa sakit pada otot-otot itu apabila ditekan, dan sakit kepala yang mengikut hari bekerja anda, tetapi tiada satu pun daripadanya muktamad dengan sendirinya.',
      },
      {
        q: 'Adakah kiropraktik akan menghentikan sakit kepala saya?',
        a: 'Kami tidak boleh memberitahu anda begitu, dan anda patut berhati-hati dengan sesiapa yang berkata begitu. Apabila segmen leher yang tersekat dan otot yang terbeban menyumbang, mengembalikan pergerakan dan mengurangkan bebanan itu selalunya mengubah berapa banyak sakit kepala yang orang alami. Ia bergantung kepada gambaran yang ada, dan sesetengah orang tidak perasan banyak perbezaan. Kiropraktor anda akan memberitahu dengan jujur apa yang mereka jangka dan apa yang tidak.',
      },
      {
        q: 'Saya ambil ubat tahan sakit hampir setiap hari. Adakah itu masalah?',
        a: 'Ia patut diperiksa. Ubat sakit kepala yang diambil pada lebih banyak hari daripada tidak boleh, dalam tempoh berbulan-bulan, menyuburkan kitaran di mana sakit kepala menjadi lebih kerap. Ia mempunyai nama yang diiktiraf, sakit kepala akibat penggunaan ubat berlebihan. Menukar atau menghentikan ubat bukan keputusan kami dan tidak patut dilakukan secara mendadak atas kata-kata kami. Bawa senarai apa yang anda ambil dan berapa kerap ke lawatan pertama anda, dan bangkitkan corak itu dengan doktor atau ahli farmasi yang membekalkannya.',
      },
      {
        q: 'Apa yang patut saya bawa ke lawatan pertama?',
        a: 'Senarai sebarang ubat yang anda ambil, termasuk apa-apa yang dibeli tanpa preskripsi, dan jika anda mampu, rekod kasar beberapa minggu lepas: bila sakit kepala datang, berapa lama ia bertahan, dan apa yang anda lakukan sebelumnya. Jika anda pernah menjalani pengimejan atau berjumpa doktor tentang sakit kepala itu, bawa laporannya.',
      },
    ],
    keyTakeaways: [
      {
        q: 'Bagaimana rasanya sakit kepala tegang?',
        a: 'Rasa tertekan dan ketat yang tumpul di kedua-dua belah kepala, sering digambarkan seperti diikat. Ia ringan hingga sederhana, tidak berdenyut, dan biasanya tidak datang dengan loya.',
      },
      {
        q: 'Apa yang mencetuskan sakit kepala tegang?',
        a: 'Paling kerap bebanan berterusan: berjam-jam dengan kepala di hadapan bahu, skrin yang terlalu rendah, tidur yang tidak lena dan mengetap gigi. Tekanan jarang bertindak sendirian tetapi sangat kerap wujud bersama.',
      },
      {
        q: 'Patutkah saya berjumpa seseorang tentang sakit kepala yang saya alami hampir setiap minggu?',
        a: 'Ia berbaloi diperiksa. Sakit kepala sekali-sekala yang diuruskan dengan ubat tahan sakit adalah munasabah. Sakit kepala hampir setiap minggu, atau yang mengikut hari bekerja anda, berbaloi diperiksa dengan betul.',
      },
      {
        q: 'Adakah kiropraktik tempat yang betul untuk bermula bagi sakit kepala?',
        a: 'Bergantung kepada jenisnya. Kami boleh menilai sama ada leher dan belakang atas menyumbang. Mendiagnosis gangguan sakit kepala ialah tugas doktor anda, dan kami akan berkata begitu jika itu langkah seterusnya yang betul.',
      },
      {
        q: 'Bilakah anda dibuka?',
        a: 'Tujuh hari seminggu, di Sunway Velocity, Maluri. Isnin hingga Khamis dan Sabtu sehingga 8 malam, Jumaat sehingga 5 petang, Ahad sehingga 3 petang.',
      },
    ],
    qualifierConcerns: [
      'Saya rasa tekanan seperti diikat di sekeliling kepala hampir setiap minggu',
      'Sakit kepala saya bertambah teruk sepanjang hari bekerja',
      'Otot di pangkal tengkorak saya sakit apabila ditekan',
      'Saya mengambil ubat tahan sakit untuk sakit kepala hampir setiap hari',
      'Saya mahu tahu sama ada leher saya sebahagian daripada masalah',
    ],
    citations: [
      {
        claim:
          'Sakit kepala jenis tegang diklasifikasikan sebagai gangguan sakit kepala tersendiri, berasingan daripada migrain.',
        source: 'International Classification of Headache Disorders, ICHD-3',
        url: 'https://ichd-3.org/2-tension-type-headache/',
      },
      {
        claim:
          'Sakit kepala jenis tegang digambarkan sebagai tekanan atau ketat, sering seperti diikat di sekeliling kepala, dan sakit kepala jenis tegang episodik dilaporkan oleh lebih 70 peratus sesetengah populasi.',
        source: 'World Health Organization, Headache disorders',
        url: 'https://www.who.int/news-room/fact-sheets/detail/headache-disorders',
      },
      {
        claim:
          'Sakit kepala akibat penggunaan ubat berlebihan disebabkan oleh penggunaan ubat sakit kepala yang kronik dan berlebihan, dan mungkin menjejaskan sehingga 5 peratus sesetengah populasi.',
        source: 'World Health Organization, Headache disorders',
        url: 'https://www.who.int/news-room/fact-sheets/detail/headache-disorders',
      },
    ],
    // Same standing as every other ms record: adapted from clinic-reviewed English copy, not
    // yet read by a Malay-speaking reviewer. Flip to `true` if that review is required first.
    draft: false,
  },
  {
    slug: 'whiplash',
    title: 'Kecederaan Whiplash Selepas Kemalangan di Cheras, Kuala Lumpur',
    metaTitle: 'Jagaan Kecederaan Whiplash di Cheras, KL',
    metaDescription:
      'Whiplash dinilai di Cheras, Maluri. Dapatkan pemeriksaan perubatan dahulu, kemudian penilaian berperingkat dan pemulihan leher setelah kecederaan serius diketepikan.',
    // Direct translation, per the client's rule of 2026-09-12. "whiplash" on its own (720/mo)
    // is the film and the aespa song in Malaysia; "sakit leher selepas kemalangan" and
    // "kecederaan leher" measure 0 (Ubersuggest, locId 2458, 2026-09-12). No better keyword
    // exists, so the target keeps the English word Malaysians use for the injury.
    targetKeyword: 'kecederaan whiplash',
    related: ['neck-pain', 'pinched-nerve'],
    helpedBy: ['physiotherapy', 'sports-injury-rehabilitation'],

    intro:
      'Whiplash ialah kecederaan leher yang berlaku selepas kepala dihumban dengan pantas ke hadapan dan ke belakang, paling kerap dalam perlanggaran dari belakang, walaupun terjatuh atau rempuhan kuat melakukan perkara yang sama. Baca satu baris ini sebelum yang lain di halaman ini: jika anda baru sahaja terlibat dalam kemalangan, dapatkan penilaian perubatan dahulu. Patah tulang atau kecederaan saraf tunjang bukan sesuatu yang ditangani oleh kiropraktor, dan ia perlu diketepikan sebelum sesiapa meletakkan tangan pada leher anda. Setelah itu dilakukan, kebanyakan whiplash ialah masalah tisu lembut dan sendi yang reda dalam tempoh beberapa minggu hingga beberapa bulan, dan itulah peringkat di mana penilaian dan pemulihan di sini berbaloi.',
    symptoms: [
      'Sakit dan kekakuan leher yang sering bermula beberapa jam selepas kemalangan dan bukan serta-merta',
      'Keupayaan yang berkurang untuk memusing atau mencondongkan kepala',
      'Sakit kepala, paling kerap bermula di pangkal tengkorak',
      'Sakit merentasi bahu dan ke belakang atas',
      'Rasa sakit pada otot leher apabila ditekan',
      'Kesemutan atau kebas ke lengan atau tangan',
      'Pening, keletihan, atau sukar menumpukan perhatian pada hari-hari selepasnya',
      'Tidur terganggu, dan kebimbangan tentang memandu atau menjadi penumpang',
    ],
    causes: [
      {
        heading: 'Mekanisme itu sendiri',
        body: 'Badan ditahan oleh tali pinggang keledar manakala kepala terus bergerak, jadi leher dibawa dengan pantas melangkaui julat normalnya dan kembali semula. Itu boleh meregangkan otot dan ligamen, mengiritasi sendi kecil di belakang leher, dan dalam perlanggaran yang lebih kuat melibatkan cakera atau akar saraf. Kelajuan kurang penting daripada yang orang sangka, dan perlanggaran kelajuan rendah masih boleh menghasilkan gejala sebenar.',
      },
      {
        heading: 'Permulaan yang tertangguh',
        body: 'Lazimnya mengambil masa beberapa jam untuk gejala muncul, dan kadangkala sehari dua. Adrenalin di tempat kejadian menutup banyak perkara. Sebab itulah berasa sihat di tepi jalan bukan bukti bahawa tiada apa yang berlaku, dan sebab itulah penilaian susulan beberapa hari kemudian adalah wajar walaupun pemeriksaan awal tiada masalah.',
      },
      {
        heading: 'Menahan dan tidak menggunakan',
        body: 'Leher yang sakit ditahan tidak bergerak, dan leher yang ditahan tidak bergerak menjadi kaku dan hilang kekuatan. Dalam beberapa minggu ini menjadi sebahagian daripada masalah dengan sendirinya, berasingan daripada kecederaan asal. Ia salah satu sebab mengapa kembali kepada pergerakan normal secara perlahan-lahan, dan bukan berehat sepenuhnya, adalah apa yang dinasihatkan oleh panduan semasa.',
      },
      {
        heading: 'Bahagian yang bukan sekadar tisu',
        body: 'Tidur yang tidak lena, kebimbangan tentang leher, dan keresahan tentang memandu adalah lazim selepas perlanggaran dan ia benar-benar mempengaruhi cara pemulihan berjalan. Ia bukan tanda bahawa sakit itu khayalan. Ia tindak balas normal terhadap terlibat dalam kemalangan, dan berbaloi dinamakan dan bukan diabaikan.',
      },
    ],
    approach: [
      {
        heading: 'Penilaian perubatan datang dahulu, dan kami akan berkata begitu',
        body: 'Jika anda belum diperiksa selepas kemalangan, itulah langkah pertama, bukan temu janji di sini. Patah tulang, terkehel dan kecederaan saraf tunjang memerlukan pengimejan dan pendapat perubatan, dan tiada penilaian whiplash baru-baru ini yang bertanggungjawab bermula tanpa perkara itu ditangani. Jika anda tiba di sini dan apa-apa dalam sejarah atau pemeriksaan menimbulkan kebimbangan itu, anda akan dihantar ke tempat lain dan bukan dilaras, dan kami lebih rela merujuk anda daripada menangani sesuatu yang bukan urusan kami untuk diuruskan.',
      },
      {
        heading: 'Menggredkan apa yang sebenarnya berlaku',
        body: 'Whiplash lazimnya digambarkan dalam gred, daripada tiada aduan langsung, kepada sakit leher tanpa tanda fizikal, kepada sakit leher dengan pergerakan berkurang dan rasa sakit apabila ditekan, kepada sakit leher dengan tanda neurologi seperti refleks berubah atau kelemahan, dan akhirnya kepada patah tulang atau terkehel. Di mana anda berada mengubah apa yang sesuai, jadi pemeriksaan menentukan itu sebelum apa-apa lagi diputuskan.',
      },
      {
        heading: 'Mengembalikan pergerakan, secara beransur-ansur',
        body: 'Bagi gred yang sesuai dengan jagaan konservatif, kerjanya ialah membuat leher bergerak semula tanpa mencetuskannya. Bergantung kepada apa yang pemeriksaan jumpai, itu boleh melibatkan jagaan secara tangan yang lembut, kerja tisu lembut dan dry needling untuk otot yang telah terkunci, dan program berperingkat melalui bahagian fisioterapi kami. Pelarasan digunakan apabila penilaian menyokongnya, dan kiropraktor anda akan menerangkan apa yang dijumpai dan apa yang mereka bercadang lakukan sebelum sebarang tindakan.',
      },
      {
        heading: 'Kembali kepada aktiviti normal',
        body: 'Panduan semasa untuk whiplash lebih menggalakkan meneruskan aktiviti harian berbanding merehatkan leher, dan menasihatkan supaya tidak bergantung pada kolar, yang cenderung meninggalkan leher lebih kaku. Program anda membina semula toleransi secara berperingkat, termasuk perkara yang orang diam-diam elakkan selepas itu, seperti memeriksa bahu ketika memandu. Kebanyakan orang pulih dalam tempoh beberapa minggu hingga beberapa bulan, dan sesetengahnya mengambil masa lebih lama.',
      },
    ],
    redFlags: [
      'Sebarang kecederaan leher yang belum dinilai secara perubatan, terutamanya selepas perlanggaran kelajuan tinggi',
      'Hilang kesedaran pada bila-bila masa, atau keliru, muntah atau mengantuk yang semakin teruk',
      'Sakit atau rasa sakit yang teruk apabila ditekan di garis tengah tulang belakang itu sendiri',
      'Kelemahan, kebas atau kesemutan pada lengan atau kaki',
      'Kekok pada tangan, tidak stabil semasa berjalan, atau kehilangan kawalan pundi kencing atau usus',
      'Pening, gangguan penglihatan, kesukaran bercakap atau menelan, atau pertuturan tidak jelas',
      'Sakit kepala teruk yang semakin buruk dan bukan reda pada hari-hari selepas kemalangan',
    ],
    faqs: [
      {
        q: 'Patutkah saya ke hospital selepas kemalangan kereta, atau terus berjumpa kiropraktor?',
        a: 'Dapatkan penilaian perubatan dahulu. Patah tulang, terkehel dan kecederaan saraf tunjang bukan perkara yang jagaan konservatif tujukan, dan ia memerlukan pengimejan dan doktor untuk mengetepikannya. Setelah itu dilakukan dan anda telah dibenarkan, penilaian di sini untuk bahagian sendi dan otot kecederaan itu ialah langkah seterusnya yang munasabah. Jika anda datang kepada kami dahulu dan apa-apa yang membimbangkan muncul, kami akan menghantar anda ke tempat yang sepatutnya.',
      },
      {
        q: 'Saya rasa sihat di tempat kejadian dan sakit dua hari kemudian. Adakah itu normal?',
        a: 'Sangat normal. Lazimnya mengambil masa beberapa jam untuk gejala muncul, kadangkala sehari dua, kerana adrenalin pada masa itu menutup banyak perkara. Berasa sihat di tepi jalan bukan bukti bahawa tiada apa yang berlaku. Jika gejala baharu muncul pada hari-hari selepasnya, terutamanya apa-apa yang berkaitan saraf, dapatkan semakan dan bukan menunggu sahaja.',
      },
      {
        q: 'Patutkah saya memakai kolar leher?',
        a: 'Panduan semasa menasihatkan supaya tidak bergantung padanya. Kolar menahan leher tidak bergerak tepat pada ketika pergerakan lembut adalah apa yang membantu, dan leher yang ditahan tidak bergerak cenderung menjadi kaku dan hilang kekuatan. Jika doktor telah secara khusus menyuruh anda memakainya, ikut itu, kerana mereka ada sebabnya. Jika tidak, matlamatnya ialah terus bergerak dalam had keselesaan.',
      },
      {
        q: 'Berapa lama masa yang diambil untuk pulih daripada whiplash?',
        a: 'Ia biasanya bertambah baik dalam tempoh beberapa minggu hingga beberapa bulan, walaupun sesetengah orang mengalami gejala lebih lama, dan cara leher dibebankan sebelum kemalangan membuat perbezaan. Kami tidak akan meletakkan angka pada pemulihan anda sebelum memeriksa anda. Apa yang kami boleh beritahu selepas penilaian ialah peringkat mana anda berada dan bagaimana rupa beberapa minggu seterusnya yang wajar.',
      },
      {
        q: 'Bolehkah anda menyediakan laporan untuk tuntutan insurans atau undang-undang?',
        a: 'Tanya kami secara langsung dan bukan mengandaikan sama ada boleh atau tidak, kerana apa yang kami boleh sediakan bergantung kepada apa yang diminta dan oleh siapa. Apa sahaja yang kami tulis hanya mencerminkan apa yang dijumpai semasa pemeriksaan di sini. Simpan rekod anda sendiri juga: tarikh kemalangan, bila gejala bermula, dan sebarang penilaian perubatan yang anda telah jalani.',
      },
    ],
    keyTakeaways: [
      {
        q: 'Apakah itu whiplash?',
        a: 'Kecederaan leher akibat kepala dihumban dengan pantas ke hadapan dan ke belakang, paling kerap dalam perlanggaran dari belakang. Ia meregangkan otot dan ligamen dan boleh mengiritasi sendi leher.',
      },
      {
        q: 'Apa perkara pertama yang perlu dilakukan selepas kemalangan?',
        a: 'Dapatkan penilaian perubatan, sebelum sebarang jagaan secara tangan. Patah tulang dan kecederaan saraf tunjang memerlukan pengimejan dan doktor untuk diketepikan, dan itu perlu berlaku dahulu.',
      },
      {
        q: 'Mengapa leher saya hanya mula sakit keesokan harinya?',
        a: 'Kerana gejala lazimnya mengambil masa beberapa jam, kadangkala sehari dua, untuk muncul. Adrenalin menutup banyak perkara di tempat kejadian, jadi berasa sihat pada masa itu tidak membuktikan apa-apa.',
      },
      {
        q: 'Adakah merehatkan leher perkara yang betul untuk dilakukan?',
        a: 'Secara amnya tidak. Panduan lebih menggalakkan meneruskan aktiviti harian dalam had keselesaan berbanding berehat, dan menasihatkan supaya tidak bergantung pada kolar, kerana leher yang ditahan tidak bergerak menjadi kaku dan lemah.',
      },
      {
        q: 'Bilakah anda dibuka?',
        a: 'Tujuh hari seminggu, di Sunway Velocity, Maluri. Isnin hingga Khamis dan Sabtu sehingga 8 malam, Jumaat sehingga 5 petang, Ahad sehingga 3 petang.',
      },
    ],
    qualifierConcerns: [
      'Saya terlibat dalam kemalangan dan leher saya kaku dan sakit',
      'Gejala saya bermula sehari dua selepas kemalangan',
      'Saya tidak boleh memusingkan kepala dengan betul untuk memeriksa blind spot',
      'Saya mengalami sakit kepala yang bermula selepas perlanggaran',
      'Saya telah dibenarkan secara perubatan dan mahu leher dinilai',
    ],
    citations: [
      {
        claim:
          'Gejala whiplash boleh mengambil masa beberapa jam untuk bermula, dan ia biasanya bertambah baik dalam tempoh dua hingga tiga bulan, walaupun sesetengah orang mengalami gejala lebih lama.',
        source: 'NHS, Whiplash',
        url: 'https://www.nhs.uk/conditions/whiplash/',
      },
      {
        claim:
          'Panduan NHS untuk whiplash menasihatkan supaya meneruskan aktiviti harian dan menasihatkan supaya tidak menggunakan pendakap atau kolar leher sebagai sokongan.',
        source: 'NHS, Whiplash',
        url: 'https://www.nhs.uk/conditions/whiplash/',
      },
      {
        claim:
          'Penggredan gangguan berkaitan whiplash daripada gred 0 hingga gred IV berasal daripada monograf Quebec Task Force yang diterbitkan dalam Spine pada 1995.',
        source: 'Spitzer WO and others, Spine, 1995',
        url: 'https://pubmed.ncbi.nlm.nih.gov/7604354/',
      },
    ],
    // Same standing as every other ms record: adapted from clinic-reviewed English copy, not
    // yet read by a Malay-speaking reviewer. Flip to `true` if that review is required first.
    draft: false,
  },
]
