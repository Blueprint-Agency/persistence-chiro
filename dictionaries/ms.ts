import type { Dictionary } from './types'

/**
 * Bahasa Malaysia UI chrome. "rawatan"/"merawat" are avoided throughout — the same
 * banned-word rule as English "treat/treatment" — in favour of naming the action
 * (bantu, jaga, nilai) or the discipline itself (fisioterapi, kiropraktik).
 *
 * ⚠️ SCAFFOLDING COPY, NOT CLIENT-REVIEWED — see the matching note in `dictionaries/zh.ts`.
 */
const ms: Dictionary = {
  nav: {
    services: 'Perkhidmatan',
    conditions: 'Simptom & Masalah',
    whatToExpect: 'Apa Yang Dijangka',
    about: 'Tentang Kami',
    ourTeam: 'Pasukan Kami',
    press: 'Liputan Media',
    partnerWithUs: 'Bekerjasama Dengan Kami',
    blog: 'Info Kesihatan',
    bookNow: 'Tempah Sekarang',
  },
  header: {
    openSevenDays: 'Buka 7 hari seminggu',
    whatsapp: 'WhatsApp',
    enquireOnWhatsapp: 'Tanya di WhatsApp',
    menu: 'Menu',
    skipToContent: 'Langkau ke kandungan',
  },
  footer: {
    tagline:
      'Kiropraktik teknik Gonstead dan fisioterapi di Cheras, Maluri. Komited membantu anda bergerak dan hidup dengan lebih selesa.',
    visit: 'Lokasi',
    openingHours: 'Waktu operasi',
    explore: 'Pautan pantas',
    openInGoogleMaps: 'Buka di Google Maps',
    copyrightSuffix: 'Kiropraktik dan fisioterapi di Cheras, Maluri, Kuala Lumpur.',
    registeredChiropractors: 'Kiropraktor berdaftar · Ahli Persatuan Kiropraktik Malaysia',
  },
  page: {
    ourServices: 'Perkhidmatan kami',
    openSevenDaysLocation: 'Buka 7 hari seminggu · Cheras, Maluri',
    openSevenDaysNoReferral: 'Buka 7 hari seminggu · Cheras, Maluri · tiada rujukan diperlukan',
    howItWorks: 'Bagaimana ia berfungsi',
    whatInvolvesHere: (name) => `Apa yang terlibat dalam ${name.toLowerCase()} di sini`,
    weAssessBeforeWeBegin:
      'Kami menilai sebelum memulakan, kemudian menerangkan apa yang kami jumpai dalam bahasa mudah, termasuk bahagian yang jagaan anda tidak mungkin ubah.',
    notSureWhatYouNeed: "Tidak pasti apa yang anda perlukan? Beritahu kami keadaan anda",
    notSureWhatYouNeedBody:
      'Mulakan dengan penilaian. Kami akan beritahu apa yang kami jumpai, apa yang akan kami lakukan, dan sama ada ini pendekatan yang betul untuk kes anda.',
    firstVisitLabel: 'Apa yang berlaku pada lawatan pertama',
    whatWeHelpWith: 'Apa yang kami bantu',
    reasonsPeopleComeInFor: (name) => `Sebab orang datang untuk ${name.toLowerCase()}`,
    beingStraightWithYou: 'Berterus terang dengan anda',
    whoIsForAndWhoIsNot: (name) => `Siapa yang sesuai dengan ${name.toLowerCase()}, dan siapa yang tidak`,
    goodFitIf: 'Ini mungkin sesuai untuk anda jika…',
    notRightFitIf: 'Ini mungkin tidak sesuai untuk anda jika…',
    choosingBetweenThem: 'Memilih antara kedua-duanya',
    whereToGoNext: 'Ke mana seterusnya',
    relatedConditionsAndServices: 'Simptom dan perkhidmatan berkaitan',
    allOurServicesInCheras: 'Semua perkhidmatan kami di Cheras',
    questions: 'Soalan',
    frequentlyAskedQuestions: 'Soalan lazim',
    reviewedByLabel: 'Disemak oleh',
    lastReviewedLabel: 'Kali terakhir disemak',
    referencesLabel: 'Rujukan',
    registeredPractitionersLine:
      'Kiropraktor dan ahli fisioterapi berdaftar di Cheras, Maluri. Buka 7 hari, bersebelahan Sunway Velocity.',
    bookYourConsultation: (name) => `Tempah konsultasi ${name.toLowerCase()} anda`,
    registeredOpenSevenDays:
      'Kiropraktor dan ahli fisioterapi berdaftar di Cheras, Maluri. Buka 7 hari, bersebelahan Sunway Velocity.',
    whatsappUsToBook: 'WhatsApp kami untuk menempah',
    whatsappUsShort: 'WhatsApp kami',
    readyToStopWorkingAroundThePain: 'Bersedia untuk berhenti "bertahan" dengan kesakitan itu?',
    ctaBandDefaultBody:
      'Hantar mesej kepada kiropraktor Gonstead kami hari ini. Buka 7 hari, bersebelahan Sunway Velocity.',
    conditionsEyebrow: 'Simptom & Masalah',
    keyTakeawaysEyebrow: 'Rumusan utama',
    theShortAnswers: 'Jawapan ringkas',
    doesThisSoundLikeYou: 'Adakah ini kedengaran seperti anda?',
    commonSigns: 'Tanda-tanda biasa',
    symptomsDisclaimer:
      'Senarai ini menerangkan keadaan secara umum. Ia bukan diagnosis. Hanya penilaian bersemuka dapat memberitahu punca sebenar gejala anda.',
    whatContributesToIt: 'Apa yang menyumbang kepadanya',
    whyItHappens: 'Mengapa ia berlaku',
    howWeHelp: 'Bagaimana kami membantu',
    ourApproach: 'Pendekatan kami',
    whenToSeekUrgentCare: 'Bila perlu mendapatkan bantuan kecemasan',
    seeADoctorFirst: 'Jumpa doktor dahulu jika anda mengalami mana-mana berikut',
    urgentCareIntro:
      'Ini memerlukan penilaian perubatan sebelum anda memulakan jagaan kiropraktik. Jika mana-mana berkenaan dengan anda, hubungi doktor atau pergi ke jabatan kecemasan terdekat.',
    whatPatientsAskUs: 'Apa yang pesakit tanya kami',
    bookAnAssessment: 'Tempah penilaian',
    bookAnAssessmentBody: 'Kiropraktor berdaftar di Cheras, Maluri. Buka 7 hari.',
    relatedLabel: 'Berkaitan',
    allConditionsWeHelpWith: 'Semua simptom yang kami bantu di Cheras',
    meetYourChiropractors: 'Kenali kiropraktor kami',
    theChiropractorsWhoWouldLookAfterYou: 'Kiropraktor yang akan menjaga anda',
    threeRegisteredChiropractorsLine:
      'Tiga kiropraktor berdaftar, semuanya dilatih dalam kaedah Gonstead dan merupakan ahli Gonstead Chiropractic Society Australia serta Persatuan Kiropraktik Malaysia.',
    readProfile: 'Lihat profil',
    aboutUsEyebrow: 'Tentang kami',
    registrationLabel: 'Pendaftaran',
    membershipsLabel: 'Keahlian',
    credentialsLabel: 'Kelayakan',
    bookWithName: (name) => `Tempah dengan ${name}`,
    backToTheTeam: 'Kembali ke pasukan',
    seeNameInCheras: (name) => `Jumpa ${name} di Cheras.`,
    ctaBandPractitionerBody: 'Kiropraktik Gonstead bersebelahan Sunway Velocity. Buka tujuh hari.',
    aboutBreadcrumbLabel: 'Tentang Kami',
    fromOurPatientsInCheras: 'Daripada pesakit kami di Cheras',
    whatPeopleSayAfterBeingSeenHere: 'Apa yang mereka kata selepas datang ke sini',
    writeAReview: 'Tulis ulasan',
    readMoreReviews: 'Baca lagi',
    googleReviewsSuffix: 'ulasan',
    isThisRightForYou: 'Adakah ini sesuai untuk anda?',
    notSureIfIsRightForYou: (name) => `Tidak pasti sama ada ${name.toLowerCase()} sesuai untuk anda?`,
    tickAnythingBody:
      'Tandakan mana-mana yang kedengaran seperti anda. Kami akan membaca semula dengan jujur dan memberitahu anda tempat untuk bermula, walaupun jawapannya di tempat lain.',
    selectConcernsAriaLabel: 'Pilih kebimbangan yang berkenaan dengan anda',
    askUsOnWhatsapp: 'Tanya kami di WhatsApp',
    opensWhatsappCaption:
      'Membuka WhatsApp dengan jawapan anda diisi. Tiada apa dihantar sehingga anda menekan hantar di sana.',
    qualifierGreeting: (name) =>
      `Hai Persistence Chiropractic, saya sedang mempertimbangkan ${name} di Cheras.`,
    qualifierAppliesToMe: 'Ini yang berkenaan dengan saya:',
    qualifierClosingQuestion: 'Bolehkah anda nasihatkan sama ada ia sesuai dan di mana untuk bermula?',
    readMore: 'Baca lagi',
    conditionsHubTitle: 'Simptom yang kami bantu',
    conditionsHubIntro: 'Jagaan kiropraktik dan fisioterapi di Cheras, Maluri, Kuala Lumpur.',
    servicesHubTitle: 'Kiropraktik dan fisioterapi di Cheras, Kuala Lumpur',
    servicesHubIntro:
      'Jagaan kiropraktik, fisioterapi dan pemulihan yang disasarkan di bawah satu bumbung di Cheras. Yang mana sesuai untuk anda bergantung kepada apa yang dijumpai semasa penilaian. Ramai pesakit akhirnya menjalani kedua-duanya, dan kami akan tunjukkan titik permulaan pada lawatan pertama anda.',
    whatWeDo: 'Apa yang kami lakukan',
    chiropracticPhysiotherapyRehab: 'Kiropraktik, fisioterapi dan pemulihan',
    chiropracticPhysioBody:
      'Kiropraktik menangani cara sendi bergerak. Fisioterapi membina kekuatan dan kawalan di sekelilingnya. Bahagian kedua itu biasanya yang mengelakkan masalah kembali enam bulan kemudian. Yang mana anda perlukan bergantung kepada apa yang dijumpai semasa penilaian.',
    notSureChiroOrPhysio: 'Tidak pasti sama ada anda perlukan kiropraktik atau fisioterapi?',
    tellUsWherePainIs:
      'Beritahu kami di mana kesakitan itu, berapa lama ia berlaku dan apa yang mencetuskannya. Kami akan tunjukkan pilihan yang betul sebelum anda menempah.',
    theMethodEyebrow: 'Kaedah',
    whatHappensDuringAssessment: 'Apa yang berlaku semasa penilaian',
    bookAGonsteadAssessment: 'Tempah penilaian Gonstead',
    bookAGonsteadAssessmentBody:
      'Kiropraktor berdaftar di Cheras, Maluri. Buka tujuh hari, bersebelahan Sunway Velocity.',
    patientPhotographsEyebrow: 'Gambar pesakit',
    whatAChangeInPostureCanLookLike: 'Bagaimana rupa perubahan postur',
    patientPhotographsCaption:
      'Digambar dari belakang di klinik kami di Cheras dan dikongsi dengan kebenaran mereka. Gambar dua orang, bukan ramalan untuk anda: setiap pasangan menunjukkan bagaimana seseorang berdiri di depan kamera pada dua hari berbeza, yang bukan sama seperti satu ukuran, dan postur berbeza dari seorang ke seorang serta dari satu lawatan ke lawatan seterusnya. Apa yang boleh kami beritahu sebelum menilai anda ialah apa yang akan kami perhatikan, bukan apa yang akan berubah.',
    beforeAfterPostureAlt:
      'Pandangan belakang pesakit yang sama dalam dua gambar di Persistence Chiropractic Care, Cheras, Kuala Lumpur, satu garis merah menegak pada setiap gambar menandakan kedudukan kepala dan tulang belakang',
    beforeAfterSpinalCurveAlt:
      'Pandangan belakang pesakit yang sama dalam dua gambar di Persistence Chiropractic Care, Cheras, Kuala Lumpur, satu garis putus-putus pada setiap gambar mengikuti lengkung tulang belakang dari leher ke bawah',
    bookNowBreadcrumbLabel: 'Tempah Sekarang',
    contactEyebrow: 'Hubungi Kami',
    contactAndDirections: 'Hubungi kami & arah tuju',
    contactIntro:
      'Bersebelahan Sunway Velocity dan Sunway Medical Centre, Cheras. Buka tujuh hari seminggu.',
    phoneLabel: 'Telefon',
    emailLabel: 'E-mel',
    whatsappAppointmentsNote:
      'Kami menerima temu janji melalui WhatsApp dan telefon, tujuh hari seminggu. Mesej kami kebimbangan utama anda dan kami akan sahkan masa yang sesuai.',
    notSureWhereToStartPrefix: 'Tidak pasti nak mula dari mana? Lihat ',
    orThe: ' atau ',
    conditionsWeHelpWithLinkText: 'simptom yang kami bantu',
    notSureWhereToStartSuffix:
      ', atau mesej kami kebimbangan utama anda dan kami akan tunjukkan pilihan yang betul.',
    whatToExpectBreadcrumbLabel: 'Apa Yang Dijangka',
    whatToExpectEyebrow: 'Apa yang dijangka',
    whatHappensOnYourFirstVisit: 'Apa yang berlaku pada lawatan pertama anda',
    recoveryTakesTimeIntro:
      'Pemulihan mengambil masa. Mengetahui apa yang akan berlaku sebelum anda masuk menjadikan lawatan pertama jauh lebih mudah.',
    yourFirstVisitEyebrow: 'Lawatan pertama anda',
    theAssessmentComesFirst: 'Penilaian sentiasa dahulu',
    firstVisitAssessmentPrefix: 'Temu janji pertama anda mengikut ',
    gonsteadSixStepLinkText: 'penilaian enam langkah Gonstead',
    firstVisitAssessmentSuffix:
      ': sejarah kesihatan, visualisasi, penggunaan instrumen, palpasi, analisis X-ray, dan barulah pelarasan.',
    arriveEarlyNote:
      'Jika ini kali pertama anda ke sini, sila tiba 5 hingga 10 minit awal supaya ada masa untuk melengkapkan sebarang dokumen tanpa tergesa-gesa.',
    afterYourAdjustmentEyebrow: 'Selepas pelarasan anda',
    lookingAfterYourBackAfterwards: 'Menjaga belakang anda selepas itu',
    readyToBook: 'Bersedia untuk menempah?',
    readyToBookBody:
      'Kiropraktor berdaftar di Cheras, Maluri. Buka tujuh hari, bersebelahan Sunway Velocity.',
    firstVisitConsultationAlt:
      'Kiropraktor menilai leher pesakit semasa konsultasi pertama di Persistence Chiropractic Care, Cheras Kuala Lumpur',
    nervoscopeAlt:
      'Nervoscope digunakan untuk mengukur suhu kulit di kedua-dua belah tulang belakang di Persistence Chiropractic Care, Cheras Kuala Lumpur',
    pressBreadcrumbLabel: 'Media',
    pressEyebrow: 'Media',
    pressAndPublications: 'Media & penerbitan',
    pressIntro: 'Sebahagian daripada penerbitan dan surat berita yang memaparkan kami baru-baru ini.',
    behindTheCoveragePrefix:
      'Di sebalik liputan ini terdapat pasukan kecil kiropraktor berdaftar. Kenali ',
    thePractitionersLinkText: 'pengamal kami',
    orReadAbout: ' atau baca tentang ',
    theCareWeOfferLinkText: 'jagaan yang kami tawarkan di Cheras',
    partnerWithUsBreadcrumbLabel: 'Bekerjasama Dengan Kami',
    partnershipsEyebrow: 'Kerjasama',
    partnerWithUs: 'Bekerjasama dengan kami',
    partnerWithUsIntro:
      'Kami mengadakan sesi kesihatan korporat, saringan kesihatan dan kerjasama jenama dari klinik kami di Cheras, Maluri. Jika organisasi anda ingin bekerjasama, beritahu kami sedikit maklumat dan kami akan hubungi anda melalui WhatsApp.',
    whatWeDoTogether: 'Apa yang kami lakukan bersama',
    partnerReason1Title: 'Kesihatan korporat yang diingati',
    partnerReason1Body:
      'Ceramah dan bengkel praktikal tentang postur, ergonomik dan kesihatan pekerja pejabat, dijalankan di pejabat anda atau di klinik kami. Sesi praktikal yang benar-benar digunakan pasukan anda, bukan sekadar slaid.',
    partnerReason2Title: 'Saringan kesihatan dan gerai acara',
    partnerReason2Body:
      'Saringan tulang belakang dan penilaian postur untuk acara syarikat, pelancaran dan hari komuniti di seluruh Kuala Lumpur.',
    partnerReason3Title: 'Kerjasama jenama dan produk',
    partnerReason3Body:
      'Kami pernah bekerjasama dengan jenama dari Sunway Medical Centre Velocity hingga Shopee, Maxis dan Panasonic untuk aktivasi dan kandungan kesihatan.',
    talksScreeningsEventsEyebrow: 'Ceramah, saringan dan acara yang telah kami jalankan',
    partnersEyebrow: 'Rakan kongsi',
    organisationsWeWorkAlongside: 'Organisasi yang kami bekerjasama.',
    partnersIntro:
      'Dari Sunway Medical Centre Velocity yang bersebelahan hinggalah kepada jenama dan acara yang kami sokong di seluruh Kuala Lumpur.',
    weHaveAlsoWorkedWith: 'Kami juga pernah bekerjasama dengan',
    andManyMore: '…dan banyak lagi.',
    startAConversation: 'Mulakan perbualan',
    tellUsWhatYouHaveInMind: 'Beritahu kami apa yang anda fikirkan.',
    startAConversationIntro:
      'Beberapa soalan ringkas, kemudian ia membuka WhatsApp dengan jawapan anda sedia untuk dihantar. Tiada borang untuk dikejar, tiada perlu menunggu e-mel.',
    prefersToJustMessageUs: 'Lebih suka terus mesej kami?',
    prefersToJustMessageUsBody:
      'Hubungi klinik terus melalui WhatsApp atau telefon. Kami sedia berbincang tentang bagaimana rupa kerjasama ini nanti.',
    partnerEnquiryGreeting: 'Hai Persistence Chiropractic, saya ingin meneroka kerjasama.',
    yourName: 'Nama anda',
    organisationLabel: 'Organisasi',
    whatAreYouInterestedIn: 'Apa yang anda minati?',
    interestTalkOrWorkshop: 'Ceramah atau bengkel kesihatan korporat',
    interestScreeningOrBooth: 'Saringan kesihatan atau gerai acara',
    interestCollaboration: 'Kerjasama produk atau jenama',
    interestReferralPartnership: 'Kerjasama rujukan',
    interestSomethingElse: 'Sesuatu yang lain',
    roughlyHowManyPeople: 'Anggaran berapa ramai orang?',
    optionalLabel: 'pilihan',
    preferNotToSay: 'Lebih suka tidak nyatakan',
    sizeUnder20: 'Bawah 20',
    size20To50: '20 hingga 50',
    size50To200: '50 hingga 200',
    size200Plus: '200+',
    anythingElseWeShouldKnow: 'Ada apa-apa lagi yang kami perlu tahu?',
    sendThisOnWhatsapp: 'Hantar ini melalui WhatsApp',
    partnerEnquiryOpensWhatsappCaption:
      'Membuka WhatsApp dengan jawapan anda sudah diisi. Tiada apa dihantar sehingga anda tekan hantar di sana.',
    nameFieldPrefix: 'Nama',
    organisationFieldPrefix: 'Organisasi',
    interestedInFieldPrefix: 'Berminat dengan',
    approxPeopleFieldPrefix: 'Anggaran bilangan orang',
    notesFieldPrefix: 'Nota',
    aboutHubTitle: 'Kiropraktor kami di Cheras, Maluri',
    aboutHubIntro:
      'Tiga kiropraktor berdaftar mengamalkan kaedah Gonstead. Kami semua dilatih untuk mencari satu segmen yang menyebabkan kesakitan anda, berbanding melaras semuanya sambil berharap.',
    aboutPartnersIntro:
      'Dari Sunway Medical Centre Velocity yang bersebelahan hinggalah jenama seperti Shopee, Maxis dan Panasonic, kami mengadakan ceramah kesihatan, saringan dan kerjasama di seluruh Kuala Lumpur.',
    seeOurPartnersLinkText: 'Lihat rakan kongsi kami & bekerjasama dengan kami',
    wantToKnowWhichOfUsToSee: 'Mahu tahu siapa yang patut anda jumpa?',
    wantToKnowWhichOfUsToSeeBody:
      'Beritahu kami kebimbangan utama anda dan kami akan padankan anda dengan pengamal yang sesuai sebelum anda menempah.',
    homeHeroEyebrow: 'Kiropraktik & fisioterapi Gonstead · Cheras, Maluri',
    homeH1: 'Kiropraktor dan Ahli Fisioterapi di Cheras, di bawah satu bumbung.',
    homeHeroLead:
      'Kiropraktik dan Fisioterapi bebas dadah, secara tangan, di Cheras. Jagaan diperibadikan berdasarkan apa yang penilaian anda sebenarnya tunjukkan.',
    homeAssessmentNote:
      'Lawatan pertama anda bermula dengan penilaian. Tiada apa dilaras sehingga kami telah memeriksa anda.',
    homeFactOpenSevenDays: 'Buka 7 hari seminggu',
    homeFactRegistered: 'Kiropraktor & Ahli Fisioterapi Berdaftar',
    homeFactWalkToHospital: '3 minit berjalan kaki ke Sunway Medical Centre Velocity',
    whyPersistenceEyebrow: 'Kenapa Persistence',
    meetTheTeamLinkText: 'Kenali pasukan kami',
    learnMore: 'Ketahui lebih lanjut',
    whereToStartEyebrow: 'Dari mana hendak mula',
    chiropracticOrPhysiotherapy: 'Kiropraktik atau Fisioterapi?',
    carePathsIntro:
      'Kiropraktik menangani cara sendi anda bergerak. Fisioterapi membina kekuatan di sekelilingnya. Kebanyakan pesakit hanya memerlukan salah satu daripada kedua-duanya, dan kami akan memberitahu yang mana pada lawatan pertama anda.',
    chiropracticCardTitle: 'Kiropraktik',
    chiropracticCardBody:
      'Kaedah Gonstead adalah pemeriksaan segmen demi segmen. Ia mencari sendi tertentu yang menyebabkan kesakitan anda, berbanding melaras keseluruhan tulang belakang sambil berharap.',
    howGonsteadWorks: 'Bagaimana Gonstead berfungsi',
    physiotherapyCardTitle: 'Fisioterapi',
    physiotherapyCardBody:
      'Jagaan secara tangan bersama kerja bebanan dan pemulihan yang menghalang kecederaan yang sama berulang. Apa yang kami tangani bergantung kepada apa yang anda perlukan untuk kembali kepadanya.',
    explorePhysiotherapy: 'Terokai Fisioterapi',
    patientPhotographsHomeIntro:
      'Dua daripada pesakit kami, digambar dari belakang pada dua hari berbeza. Garisan itu menandakan apa yang kami perhatikan semasa menilai postur: di mana kepala berada berbanding bahu, dan bagaimana tulang belakang berjalan dari leher ke bawah.',
    howChiropracticCareWorksLinkText: 'Bagaimana jagaan kiropraktik berfungsi',
    stillUnsurePrefix: 'Masih tidak pasti? ',
    messageUsOnWhatsappLinkText: 'Mesej kami di WhatsApp',
    stillUnsureSuffix:
      ' dan beritahu kami kebimbangan utama anda. Kami akan menasihatkan sama ada hendak mula dengan kiropraktik atau fisioterapi.',
    fromTheClinicEyebrow: 'Daripada klinik',
    spineNotesHeading: 'Nota tulang belakang, ditulis oleh kiropraktor kami.',
    allArticlesLinkText: 'Semua artikel',
    rightNextToSunwayVelocity: 'Bersebelahan Sunway Velocity, Cheras.',
    directionsAndContact: 'Arah tuju & hubungi kami',
    receptionAlt: 'Kaunter penerimaan di Persistence Chiropractic Care, Sunway Velocity, Cheras Kuala Lumpur',
    beforeYouBookEyebrow: 'Sebelum anda menempah',
    heroSlideSpineModelAlt:
      'Kiropraktor menerangkan anatomi tulang belakang menggunakan model tulang belakang kepada pesakit di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    heroSlideXrayAlt:
      'Kiropraktor menerangkan X-ray tulang belakang kepada pesakit di Persistence Chiropractic Care, Cheras, Kuala Lumpur',
    heroSlideLightboxAlt:
      'Kiropraktor menunjukkan dapatan pada kotak cahaya X-ray tulang belakang di Cheras, Maluri, Kuala Lumpur',
    heroSlideNervoscopeAlt:
      'Kiropraktor Gonstead menggunakan nervoscope di sepanjang tulang belakang pesakit semasa penilaian di Cheras, Kuala Lumpur',
    mainNavAriaLabel: 'Navigasi utama',
    reviewsAriaLabel: 'Ulasan',
    googleReviewsRailAriaLabel: 'Ulasan Google',
    previousReviewsAriaLabel: 'Ulasan sebelumnya',
    moreReviewsAriaLabel: 'Lebih banyak ulasan',
    accreditationsAriaLabel: 'Akreditasi',
    relatedConditionsAriaLabel: 'Simptom berkaitan',
  },
}

export default ms
