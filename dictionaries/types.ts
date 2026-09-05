/** Sitewide UI chrome — nav labels, footer, header microcopy. Not page content. */
export type Dictionary = {
  nav: {
    services: string
    conditions: string
    whatToExpect: string
    about: string
    ourTeam: string
    press: string
    partnerWithUs: string
    blog: string
    bookNow: string
    /**
     * Points at /locate-us, which is the NAP/hours/map/directions page. `bookNow` above points
     * OFF-SITE to SweetPew, so without this row the page carrying the address had no nav link
     * at all — a visitor tapping "Book Now" left the site before ever seeing where the clinic
     * is. See the note on `mainNav` in lib/nav.ts.
     */
    locateUs: string
  }
  header: {
    openSevenDays: string
    whatsapp: string
    enquireOnWhatsapp: string
    menu: string
    skipToContent: string
  }
  footer: {
    tagline: string
    visit: string
    openingHours: string
    explore: string
    openInGoogleMaps: string
    copyrightSuffix: string
    registeredChiropractors: string
  }
  /**
   * Reusable chrome shared by the condition/service page templates — eyebrows, section
   * headings, button labels, boilerplate CTA copy. NOT page content: `Condition`/`Service`
   * records still own their own intro/symptoms/faqs/etc. This is the surrounding furniture
   * that used to be hardcoded English directly in `components/service.tsx` and the page
   * templates, which is why a zh/ms page went live with English headings until this existed
   * — see the multilingual plan and AGENTS.md § Multilingual.
   */
  page: {
    ourServices: string
    openSevenDaysLocation: string
    openSevenDaysNoReferral: string
    howItWorks: string
    /** "What {name} involves here" — `name` is `shortTitle(locale, service.title)`. */
    whatInvolvesHere: (name: string) => string
    weAssessBeforeWeBegin: string
    notSureWhatYouNeed: string
    notSureWhatYouNeedBody: string
    firstVisitLabel: string
    /** Bundle card chrome — see lib/pricing.ts. */
    bundleIncluded: string
    /** Precedes the struck-through total, e.g. "Total worth ~~RM660~~". */
    bundleWorth: string
    /**
     * The saving, as a figure AND a percentage: "Save RM40 (17% off)". Both are derived from
     * `price` and `compareAt` in the card, never typed into the data, so neither can drift.
     */
    bundleSave: (amount: string, percent: string) => string
    /** Badge for an offer available only to visitors who arrive through the site. */
    bundleWebsiteOnly: string
    /** The bundle card's own CTA. Deliberately not the sitewide WhatsApp label. */
    bundleClaim: string
    /** Hero button pointing down at the bundle: "Get 17% off bundle deal". */
    bundleHeroCta: (percent: string) => string
    whatWeHelpWith: string
    /** "Reasons people come in for {name}". */
    reasonsPeopleComeInFor: (name: string) => string
    beingStraightWithYou: string
    /** "Who {name} is for, and who it is not". */
    whoIsForAndWhoIsNot: (name: string) => string
    goodFitIf: string
    notRightFitIf: string
    choosingBetweenThem: string
    whereToGoNext: string
    relatedConditionsAndServices: string
    allOurServicesInCheras: string
    questions: string
    frequentlyAskedQuestions: string
    reviewedByLabel: string
    lastReviewedLabel: string
    referencesLabel: string
    registeredPractitionersLine: string
    /** "Book your {name} consultation". */
    bookYourConsultation: (name: string) => string
    registeredOpenSevenDays: string
    whatsappUsToBook: string
    whatsappUsShort: string
    readyToStopWorkingAroundThePain: string
    ctaBandDefaultBody: string
    // Condition-page-specific chrome:
    conditionsEyebrow: string
    keyTakeawaysEyebrow: string
    theShortAnswers: string
    doesThisSoundLikeYou: string
    commonSigns: string
    symptomsDisclaimer: string
    whatContributesToIt: string
    whyItHappens: string
    howWeHelp: string
    ourApproach: string
    whenToSeekUrgentCare: string
    seeADoctorFirst: string
    urgentCareIntro: string
    whatPatientsAskUs: string
    bookAnAssessment: string
    bookAnAssessmentBody: string
    relatedLabel: string
    allConditionsWeHelpWith: string
    meetYourChiropractors: string
    theChiropractorsWhoWouldLookAfterYou: string
    threeRegisteredChiropractorsLine: string
    readProfile: string
    // Practitioner bio page (app/[locale]/about/[slug]/page.tsx):
    aboutUsEyebrow: string
    registrationLabel: string
    membershipsLabel: string
    credentialsLabel: string
    /** "Book with {name}" — name has already had "Dr." normalised to "Dr ". */
    bookWithName: (name: string) => string
    backToTheTeam: string
    /** "See {name} in Cheras." — CtaBand heading on the practitioner bio page. */
    seeNameInCheras: (name: string) => string
    ctaBandPractitionerBody: string
    aboutBreadcrumbLabel: string
    // GoogleReviews:
    fromOurPatientsInCheras: string
    whatPeopleSayAfterBeingSeenHere: string
    writeAReview: string
    readMoreReviews: string
    googleReviewsSuffix: string
    // ServiceQualifier:
    isThisRightForYou: string
    /** "Not sure if {name} is right for you?" */
    notSureIfIsRightForYou: (name: string) => string
    tickAnythingBody: string
    selectConcernsAriaLabel: string
    askUsOnWhatsapp: string
    opensWhatsappCaption: string
    /** The prefilled WhatsApp message lines: greeting, "here's what applies to me" label,
     * closing question. `name` is the service/condition short name. */
    qualifierGreeting: (name: string) => string
    qualifierAppliesToMe: string
    qualifierClosingQuestion: string
    readMore: string
    // /conditions and /services hub pages:
    conditionsHubTitle: string
    conditionsHubIntro: string
    servicesHubTitle: string
    servicesHubIntro: string
    whatWeDo: string
    chiropracticPhysiotherapyRehab: string
    chiropracticPhysioBody: string
    notSureChiroOrPhysio: string
    tellUsWherePainIs: string
    // Hand-built chiropractic-care route (app/[locale]/services/chiropractic-care/page.tsx):
    theMethodEyebrow: string
    whatHappensDuringAssessment: string
    bookAGonsteadAssessment: string
    bookAGonsteadAssessmentBody: string
    /**
     * "Patient photographs" block — shared verbatim between the chiropractic-care route and
     * the homepage (both show the same before/after posture composites), so it lives here
     * rather than being duplicated as two near-identical dict entries.
     */
    patientPhotographsEyebrow: string
    whatAChangeInPostureCanLookLike: string
    patientPhotographsCaption: string
    beforeAfterPostureAlt: string
    beforeAfterSpinalCurveAlt: string
    // /locate-us (app/[locale]/locate-us/page.tsx):
    bookNowBreadcrumbLabel: string
    contactEyebrow: string
    contactAndDirections: string
    contactIntro: string
    phoneLabel: string
    emailLabel: string
    whatsappAppointmentsNote: string
    /** Chrome around the "Locate Us" walkthroughs. The steps themselves live in lib/directions*.ts. */
    findUsEyebrow: string
    findUsHeading: string
    findUsIntro: string
    /**
     * The route picker above the walkthroughs. Three routes is a choice, and a choice has to
     * announce itself — the first build showed them as bare pills and read as decoration.
     */
    findUsPickRoute: string
    findUsPickRouteHint: string
    /** "6 steps" on a route card. Takes the step count. */
    stepCount: (n: number) => string
    seeTheSteps: string
    /** "Step 3" above each instruction. Takes the 1-based number. */
    stepLabel: (n: number) => string
    openInWaze: string
    /** Heading over the two shopfront photos at the foot of the walkthroughs. */
    signageHeading: string
    /** "Not sure where to start? Browse " — followed by a link to /services. */
    notSureWhereToStartPrefix: string
    /** " or the " — between the two in-prose links to /services and /conditions. */
    orThe: string
    conditionsWeHelpWithLinkText: string
    /** ", or message us your main concern and we will point you to the right one." */
    notSureWhereToStartSuffix: string
    // /what-to-expect (app/[locale]/what-to-expect/page.tsx):
    whatToExpectBreadcrumbLabel: string
    whatToExpectEyebrow: string
    whatHappensOnYourFirstVisit: string
    recoveryTakesTimeIntro: string
    yourFirstVisitEyebrow: string
    theAssessmentComesFirst: string
    /** "Your first appointment follows the " — followed by a link to the Gonstead assessment. */
    firstVisitAssessmentPrefix: string
    gonsteadSixStepLinkText: string
    /** ": history, visualisation, instrumentation, palpation, X-ray analysis, and only then an adjustment." */
    firstVisitAssessmentSuffix: string
    arriveEarlyNote: string
    afterYourAdjustmentEyebrow: string
    lookingAfterYourBackAfterwards: string
    readyToBook: string
    readyToBookBody: string
    firstVisitConsultationAlt: string
    nervoscopeAlt: string
    // /press (app/[locale]/press/page.tsx):
    pressBreadcrumbLabel: string
    pressEyebrow: string
    pressAndPublications: string
    pressIntro: string
    /** "Behind the coverage is a small team of registered chiropractors. Meet " */
    behindTheCoveragePrefix: string
    thePractitionersLinkText: string
    orReadAbout: string
    theCareWeOfferLinkText: string
    // /partner-with-us (app/[locale]/partner-with-us/page.tsx):
    partnerWithUsBreadcrumbLabel: string
    partnershipsEyebrow: string
    partnerWithUs: string
    partnerWithUsIntro: string
    whatWeDoTogether: string
    partnerReason1Title: string
    partnerReason1Body: string
    partnerReason2Title: string
    partnerReason2Body: string
    partnerReason3Title: string
    partnerReason3Body: string
    talksScreeningsEventsEyebrow: string
    partnersEyebrow: string
    organisationsWeWorkAlongside: string
    partnersIntro: string
    weHaveAlsoWorkedWith: string
    andManyMore: string
    startAConversation: string
    tellUsWhatYouHaveInMind: string
    startAConversationIntro: string
    prefersToJustMessageUs: string
    prefersToJustMessageUsBody: string
    // PartnerEnquiry (components/PartnerEnquiry.tsx) — a client component, so these are
    // resolved server-side into a plain object via `partnerEnquiryCopyFrom(dict)` (same
    // reason `ServiceQualifier` takes a resolved `copy` prop rather than raw `dict`).
    partnerEnquiryGreeting: string
    yourName: string
    organisationLabel: string
    whatAreYouInterestedIn: string
    interestTalkOrWorkshop: string
    interestScreeningOrBooth: string
    interestCollaboration: string
    interestReferralPartnership: string
    interestSomethingElse: string
    roughlyHowManyPeople: string
    optionalLabel: string
    preferNotToSay: string
    sizeUnder20: string
    size20To50: string
    size50To200: string
    size200Plus: string
    anythingElseWeShouldKnow: string
    sendThisOnWhatsapp: string
    partnerEnquiryOpensWhatsappCaption: string
    /** WhatsApp message field prefixes: "• Name: ", "• Organisation: ", etc. */
    nameFieldPrefix: string
    organisationFieldPrefix: string
    interestedInFieldPrefix: string
    approxPeopleFieldPrefix: string
    notesFieldPrefix: string
    // /about hub (app/[locale]/about/page.tsx):
    aboutHubTitle: string
    aboutHubIntro: string
    /** Partners teaser intro — a shorter variant of /partner-with-us's own `partnersIntro`. */
    aboutPartnersIntro: string
    seeOurPartnersLinkText: string
    wantToKnowWhichOfUsToSee: string
    wantToKnowWhichOfUsToSeeBody: string
    // Homepage (app/[locale]/page.tsx):
    homeHeroEyebrow: string
    homeH1: string
    homeHeroLead: string
    homeAssessmentNote: string
    homeFactOpenSevenDays: string
    homeFactRegistered: string
    homeFactWalkToHospital: string
    whyPersistenceEyebrow: string
    meetTheTeamLinkText: string
    learnMore: string
    whereToStartEyebrow: string
    chiropracticOrPhysiotherapy: string
    carePathsIntro: string
    chiropracticCardTitle: string
    chiropracticCardBody: string
    howGonsteadWorks: string
    physiotherapyCardTitle: string
    physiotherapyCardBody: string
    explorePhysiotherapy: string
    patientPhotographsHomeIntro: string
    howChiropracticCareWorksLinkText: string
    /** "Still unsure? " — followed by a WhatsApp link. */
    stillUnsurePrefix: string
    messageUsOnWhatsappLinkText: string
    /** " and tell us your main concern. We'll advise whether to start with chiropractic or physiotherapy." */
    stillUnsureSuffix: string
    fromTheClinicEyebrow: string
    spineNotesHeading: string
    allArticlesLinkText: string
    rightNextToSunwayVelocity: string
    directionsAndContact: string
    receptionAlt: string
    beforeYouBookEyebrow: string
    heroSlideSpineModelAlt: string
    heroSlideXrayAlt: string
    heroSlideLightboxAlt: string
    heroSlideNervoscopeAlt: string
    // aria-labels (screen-reader only, but still per-locale — see AGENTS.md § Multilingual):
    mainNavAriaLabel: string
    reviewsAriaLabel: string
    googleReviewsRailAriaLabel: string
    previousReviewsAriaLabel: string
    moreReviewsAriaLabel: string
    accreditationsAriaLabel: string
    relatedConditionsAriaLabel: string
  }
}
