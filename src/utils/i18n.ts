import { Language, LanguageOption } from '../types';

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧', flagUrl: '/flags/en.svg', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية', flag: '🇦🇪', flagUrl: '/flags/ar.svg', dir: 'rtl' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸', flagUrl: '/flags/es.svg', dir: 'ltr' },
  { code: 'de', label: 'German', nativeName: 'Deutsch', flag: '🇩🇪', flagUrl: '/flags/de.svg', dir: 'ltr' },
];

export interface TranslationDictionary {
  labels: {
    home: string;
    courses: string;
    training: string;
    experience: string;
    accommodation: string;
    packages: string;
    calendar: string;
    blog: string;
    faq: string;
  };
  ui: {
    language: string;
    currency: string;
    bookCta: string;
    bookNow: string;
    sound: string;
    mute: string;
    exploreAll: string;
    quickBook: string;
    mostPopular: string;
    scheduled: string;
    fullDay: string;
    proAcademy: string;
    home: string;
  };
  dropdowns: {
    home: {
      sanctuaryTitle: string;
      sanctuaryDesc: string;
      heritageTitle: string;
      heritageDesc: string;
      reviewsTitle: string;
      reviewsDesc: string;
      startTitle: string;
      startDesc: string;
    };
    courses: {
      l1Title: string;
      l1Desc: string;
      l2Title: string;
      l2Desc: string;
      l3Title: string;
      l3Desc: string;
      specialtyTitle: string;
      specialtyDesc: string;
      itcTitle: string;
      itcDesc: string;
    };
    training: {
      buoyTitle: string;
      buoyDesc: string;
      buddyTitle: string;
      buddyDesc: string;
      campTitle: string;
      campDesc: string;
      eqTitle: string;
      eqDesc: string;
      apneaTitle: string;
      apneaDesc: string;
    };
    experience: {
      rasMohamedTitle: string;
      rasMohamedDesc: string;
      blueHoleTitle: string;
      blueHoleDesc: string;
      nightTitle: string;
      nightDesc: string;
      desertTitle: string;
      desertDesc: string;
    };
    accommodation: {
      seafrontTitle: string;
      seafrontDesc: string;
      ecoTitle: string;
      ecoDesc: string;
      suitesTitle: string;
      suitesDesc: string;
    };
    packages: {
      zeroToHeroTitle: string;
      zeroToHeroDesc: string;
      safariCampTitle: string;
      safariCampDesc: string;
      customTitle: string;
      customDesc: string;
    };
    calendar: {
      itcTitle: string;
      itcDesc: string;
      safariTitle: string;
      safariDesc: string;
      campTitle: string;
      campDesc: string;
      fullCalendarTitle: string;
      fullCalendarDesc: string;
    };
    blog: {
      blueHoleGuideTitle: string;
      blueHoleGuideDesc: string;
      eqGuideTitle: string;
      eqGuideDesc: string;
      packingTitle: string;
      packingDesc: string;
      safetyTitle: string;
      safetyDesc: string;
    };
    faq: {
      beginnersTitle: string;
      beginnersDesc: string;
      medicalTitle: string;
      medicalDesc: string;
      gearTitle: string;
      gearDesc: string;
      travelTitle: string;
      travelDesc: string;
    };
  };
  hero: {
    locationEyebrow: string;
    line1: string;
    line2: string;
    leadTitle: string;
    leadDesc: string;
    oneBreath: string;
    oneBreathDesc: string;
    calmWaters: string;
    calmWatersDesc: string;
    safety100: string;
    safety100Desc: string;
    exploreCourses: string;
    bookInquireNow: string;
    phase2Title: string;
    phase2Sub: string;
    phase2Desc: string;
    viewTraining: string;
    exploreStay: string;
    depthSurface: string;
    depth15m: string;
    depth30m: string;
  };
  intro: {
    tagline: string;
    enter: string;
  };
  descentStats: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    s1Label: string;
    s1Desc: string;
    s2Label: string;
    s2Desc: string;
    s3Label: string;
    s3Desc: string;
    s4Label: string;
    s4Desc: string;
    s5Label: string;
    s5Desc: string;
    s6Label: string;
    s6Desc: string;
  };
  courseChapters: {
    system: string;
    core: string;
    try: string;
    pro: string;
    numbersEyebrow: string;
    ratioLabel: string;
    countriesLabel: string;
  };
  certificates: {
    badge: string;
    title: string;
    subtitle: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
    verifyBtn: string;
    bookBtn: string;
  };
  story: {
    eyebrow: string;
    quote: string;
    quoteAuthor: string;
    established: string;
    subheading: string;
    titleLine1: string;
    titleLine2: string;
    desc1: string;
    desc2: string;
    ratioTitle: string;
    ratioDesc: string;
    itcTitle: string;
    itcDesc: string;
    ctaCourses: string;
    ctaRetreat: string;
    statsSectionTitle: string;
    statsSectionTitleAccent: string;
    statsSectionDesc: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    stat4Label: string;
  };
  portal: {
    eyebrow: string;
    title: string;
    subtitle: string;
    exploreButton: string;
    courses: {
      title: string;
      tag: string;
      desc: string;
    };
    training: {
      title: string;
      tag: string;
      desc: string;
    };
    accommodation: {
      title: string;
      tag: string;
      desc: string;
    };
    packages: {
      title: string;
      tag: string;
      desc: string;
    };
    calendar: {
      title: string;
      tag: string;
      desc: string;
    };
    experience: {
      title: string;
      tag: string;
      desc: string;
    };
  };
  pageHeaders: {
    courses: {
      title: string;
      subtitle: string;
      badge: string;
      ctaText: string;
    };
    training: {
      title: string;
      subtitle: string;
      badge: string;
      ctaText: string;
    };
    accommodation: {
      title: string;
      subtitle: string;
      badge: string;
      ctaText: string;
    };
    packages: {
      title: string;
      subtitle: string;
      badge: string;
      ctaText: string;
    };
    calendar: {
      title: string;
      subtitle: string;
      badge: string;
      ctaText: string;
    };
    experience: {
      title: string;
      subtitle: string;
      badge: string;
      ctaText: string;
    };
    blog: {
      title: string;
      subtitle: string;
      badge: string;
      ctaText: string;
    };
    faq: {
      title: string;
      subtitle: string;
      badge: string;
      ctaText: string;
    };
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  faqSection: {
    badge: string;
    title: string;
    subtitle: string;
    moreQuestions: string;
    contactSupport: string;
  };
  footer: {
    desc: string;
    certifiedCenter: string;
    allRightsReserved: string;
    academyCol: string;
    trainingCol: string;
    sanctuaryCol: string;
    contactCol: string;
    backToTop: string;
  };
  booking: {
    modalTitle: string;
    modalSubtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    offering: string;
    dates: string;
    experienceLevel: string;
    expNone: string;
    expL1: string;
    expL2: string;
    expMaster: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    whatsappDirect: string;
    close: string;
  };
  coursesSection: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    tabCore: string;
    tabSpecialty: string;
    tabInstructor: string;
    tabEqualisation: string;
    tabTraining: string;
    enrollNow: string;
    viewCurriculum: string;
    duration: string;
    depth: string;
    days: string;
    meters: string;
  };
  trainingSection: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    reserveBuoy: string;
    singleSession: string;
    pack5: string;
    pack10: string;
  };
}

export type NavI18n = TranslationDictionary;

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  // =========================================================================
  // ENGLISH
  // =========================================================================
  en: {
    labels: {
      home: 'Home',
      courses: 'Courses',
      training: 'Training',
      experience: 'Experience',
      accommodation: 'Accommodation',
      packages: 'Packages',
      calendar: 'Calendar',
      blog: 'Blog',
      faq: 'FAQ',
    },
    ui: {
      language: 'Language',
      currency: 'Currency',
      bookCta: 'Book / Inquire',
      bookNow: 'Book / Inquire Now',
      sound: 'SOUND',
      mute: 'MUTE',
      exploreAll: 'Explore all',
      quickBook: 'Quick Book',
      mostPopular: 'Most Popular',
      scheduled: 'Scheduled',
      fullDay: 'Full Day',
      proAcademy: 'Pro Academy',
      home: 'Home',
    },
    dropdowns: {
      home: {
        sanctuaryTitle: 'Sanctuary Overview',
        sanctuaryDesc: 'Explore the Blue Hole & Dahab freediving sanctuary',
        heritageTitle: 'Dahab Heritage Since 2003',
        heritageDesc: 'Over 20 years of depth education & community',
        reviewsTitle: 'Diver Stories & Reviews',
        reviewsDesc: 'Testimonials from complete beginners to 100m+ athletes',
        startTitle: 'Start Your Journey',
        startDesc: 'Get in touch with an instructor today',
      },
      courses: {
        l1Title: 'SSI Level 1 Freediver (20m)',
        l1Desc: 'The foundational 3-day course for beginners',
        l2Title: 'SSI Level 2 Advanced (30m)',
        l2Desc: 'Freefall technique, thoracic relaxation & Frenzel',
        l3Title: 'SSI Level 3 Deep Master (40m+)',
        l3Desc: 'Deep Mouthfill, RV diving & mental discipline',
        specialtyTitle: 'Specialty Courses & Clinics',
        specialtyDesc: 'Monofin, No-Fins, Variable Weight & Safety',
        itcTitle: 'SSI Instructor Course (ITC)',
        itcDesc: 'Become a certified international SSI Freediving Instructor',
      },
      training: {
        buoyTitle: 'Coached Depth Buoy Sessions',
        buoyDesc: 'Daily Blue Hole training lines with professional coaches',
        buddyTitle: 'Independent Buddy Line Training',
        buddyDesc: 'Buoy, weights & safety lanyard setup for certified divers',
        campTitle: 'Training Week Immersions',
        campDesc: '7-day intensive depth coaching & video feedback',
        eqTitle: 'Equalization Clinics',
        eqDesc: 'Overcome sticky equalisation and transition to Frenzel',
        apneaTitle: 'Dry Apnea & Stretching Classes',
        apneaDesc: 'Thoracic flexibility, diaphragm stretches & relaxation',
      },
      experience: {
        rasMohamedTitle: 'Ras Mohamed Marine Park Safari',
        rasMohamedDesc: 'World-famous coral wall drop-offs & pelagic marine life',
        blueHoleTitle: 'Blue Hole & Canyon Safaris',
        blueHoleDesc: 'Guided underwater reef exploration at legendary Dahab sites',
        nightTitle: 'Night Apnea & Bioluminescence',
        nightDesc: 'Glide through shimmering luminescent waters under the stars',
        desertTitle: 'Desert Stargazing & Bedouin Dinners',
        desertDesc: 'Relaxation evenings in the serene Sinai mountains',
      },
      accommodation: {
        seafrontTitle: 'Seafront Sanctuary Rooms',
        seafrontDesc: 'Steps away from the water in Dahab Lighthouse Bay',
        ecoTitle: 'Diver Eco Lodge & Cabins',
        ecoDesc: 'Peaceful, budget-friendly rooms designed for divers',
        suitesTitle: 'Private Suites & Apartments',
        suitesDesc: 'Spacious beachside living with kitchens and terraces',
      },
      packages: {
        zeroToHeroTitle: 'Zero to Hero Residency',
        zeroToHeroDesc: '4 to 6-week complete pathway to 40m+ Master Freediver',
        safariCampTitle: 'Depth & Safari Expedition',
        safariCampDesc: 'Combine Blue Hole depth training with Red Sea boat safaris',
        customTitle: 'Custom Group & Private Packages',
        customDesc: 'Tailor-made itineraries for friends, clubs, or couples',
      },
      calendar: {
        itcTitle: 'March 2026 - SSI Instructor Course',
        itcDesc: '10-day professional international instructor examination',
        safariTitle: 'April 2026 - Liveaboard Safari',
        safariDesc: '7 nights diving the Red Sea pinnacles and shipwrecks',
        campTitle: 'Autumn Depth Camp 2026',
        campDesc: 'Targeted high-performance depth week in October',
        fullCalendarTitle: 'View Full 2026 Calendar',
        fullCalendarDesc: 'Full schedule of dedicated weeks, dates & open seats',
      },
      blog: {
        blueHoleGuideTitle: 'The Complete Blue Hole Guide',
        blueHoleGuideDesc: 'Weather, water temperatures, gear checklist & travel tips',
        eqGuideTitle: 'The Art of Deep Equalization',
        eqGuideDesc: 'Mastering Frenzel, hands-free & deep Mouthfill mechanics',
        packingTitle: 'Dahab Travel Checklist',
        packingDesc: 'Wetsuit thicknesses, carbon fins & packing essentials',
        safetyTitle: 'Ocean Safety & Lanyard Protocols',
        safetyDesc: 'How counter-ballast systems and safety divers protect depth',
      },
      faq: {
        beginnersTitle: 'Beginners & First-Time Divers',
        beginnersDesc: 'Do I need to be a deep swimmer? What are prerequisites?',
        medicalTitle: 'Safety, Insurance & Medical Info',
        medicalDesc: 'Medical questionnaire requirements & dive safety standards',
        gearTitle: 'Equipment & Rental Gear',
        gearDesc: 'Wetsuit thicknesses, carbon vs. plastic fins & custom gear',
        travelTitle: 'Dahab Travel, Visas & Transfers',
        travelDesc: 'Sharm el-Sheikh airport transfers and visa regulations',
      },
    },
    hero: {
      locationEyebrow: 'DAHAB · RED SEA · FREEDIVING SINCE 2003',
      line1: 'FIRST FREEDIVING CENTER IN DAHAB — SINCE 2003',
      line2: 'FIRST SSI FREEDIVING INSTRUCTOR TRAINING CENTER IN THE WORLD — SINCE 2010',
      leadTitle: "You don't need to be a deep diver to begin.",
      leadDesc: "Start with one calm breath in Dahab's sheltered waters. Progress with confidence at your own natural pace.",
      oneBreath: 'One Breath',
      oneBreathDesc: 'Effortless relaxation & calming focus',
      calmWaters: 'Calm Waters',
      calmWatersDesc: 'Warm, protected Red Sea clarity',
      safety100: '100% Safe',
      safety100Desc: 'World-certified SSI instructors',
      exploreCourses: 'Explore Courses',
      bookInquireNow: 'Book / Inquire Now',
      phase2Title: 'YOUR SANCTUARY IN DAHAB',
      phase2Sub: 'The Blue Hole & Lighthouse Bay',
      phase2Desc: 'From your first 5-meter descent to 100m+ depth exploration. Experience world-class buoy lines, counter-ballast safety, and personal coaching.',
      viewTraining: 'View Training Programs',
      exploreStay: 'Explore Accommodation',
      depthSurface: 'SURFACE',
      depth15m: '15M',
      depth30m: '30M+',
    },
    intro: {
      tagline: 'The journey to your deeper self begins with a single breath.',
      enter: 'Click anywhere to dive in',
    },
    descentStats: {
      eyebrow: 'Since 2003 · The first freediving school in Dahab',
      title: 'OUR LEGACY',
      titleHighlight: 'IN NUMBERS',
      s1Label: 'Years in Dahab',
      s1Desc: 'Pioneering freediving on the Lighthouse reef since 2002.',
      s2Label: 'Courses & Programs',
      s2Desc: 'From Try Freediving to Master and International Instructor ITC.',
      s3Label: 'Instructor Graduates',
      s3Desc: 'Now teaching in over 35 countries around the world.',
      s4Label: 'Certified Freedivers',
      s4Desc: 'With 100% individual coach attention and personal milestones.',
      s5Label: 'Safety Record',
      s5Desc: '24 years, zero decompression accidents on our lines.',
      s6Label: 'Deepest Sanctuary Dive',
      s6Desc: 'Blue Hole access with daily private training lines in Dahab.',
    },
    courseChapters: {
      system: 'The SSI System',
      core: 'Core Courses',
      try: 'Specialty Clinics',
      pro: 'Master & Pro',
      numbersEyebrow: 'How deep each course takes you',
      ratioLabel: 'Max students per instructor',
      countriesLabel: 'Countries recognize SSI',
    },
    certificates: {
      badge: 'SSI Official Partner • Facility #720079 • ISO 24801 & 24802',
      title: 'International Gold Standard of Freediving Education',
      subtitle: 'An authorized SSI Freediving School in the heart of Dahab — dedicated instructor trainers, professional counter-ballast buoys, and a 100% safety record since 2003.',
      card1Title: 'SSI Freediving Center',
      card1Desc: 'Official SSI Partner — certified instructors, dedicated depth buoys, and world-standard freediving education.',
      card2Title: 'SSI Mermaid Center',
      card2Desc: 'Official SSI Partner — magical mermaid programs, monofin technique, and underwater artistry for all ages.',
      card3Title: 'SSI Freediving Instructor Training Center',
      card3Desc: 'Official SSI Partner — our pro academy trains and certifies the next generation of freediving instructors.',
      verifyBtn: 'Verify Facility Status',
      bookBtn: 'Enroll in Certified Course',
    },
    story: {
      eyebrow: 'THE FREEDIVING PHILOSOPHY • DAHAB SANCTUARY',
      quote: 'Silence is not the absence of sound, but the presence of depth.',
      quoteAuthor: 'SSI ITC Center & Training Legacy',
      established: 'ESTABLISHED 2003 • DAHAB',
      subheading: 'Pure Depth & Meditative Control',
      titleLine1: 'BEYOND THE',
      titleLine2: 'SURFACE.',
      desc1: 'Freediving is not an adrenaline sport; it is an internal symphony of stillness. In the sheltered warmth of Lighthouse Bay and the legendary vertical abyss of the Blue Hole, we cultivate the fine art of breath, the exact physiology of pressure, and the sublime quiet of the underwater realm.',
      desc2: 'Our pedagogical philosophy discards aggressive pushing. Instead, we teach the biological secrets of the mammalian dive reflex, soft palate isolation, and diaphragmatic relaxation. Whether you are taking your first certified breath down to 20 meters or training for international SSI Instructor licensure, every descent is guarded with surgical precision.',
      ratioTitle: 'Max 3:1 Ratio',
      ratioDesc: 'We never mass-produce certifications. A strict maximum of 3 students guarantees intimate safety and video analysis on every dive.',
      itcTitle: 'SSI ITC Center',
      itcDesc: 'Over 450 professional instructors trained since 2003. Recognized internationally as Egypt’s leading SSI instructor academy.',
      ctaCourses: 'DISCOVER OUR COURSES',
      ctaRetreat: 'REQUEST CUSTOM RETREAT',
      statsSectionTitle: '24 YEARS SHAPING CONFIDENT,',
      statsSectionTitleAccent: 'WORLD-CLASS FREEDIVERS',
      statsSectionDesc: 'South Sinai’s premier SSI Instructor Training Center right on the Lighthouse promenade. Built on safety, equalisation science, and life-changing student milestones.',
      stat1Label: 'Years in Dahab',
      stat2Label: 'Certified Freedivers',
      stat3Label: 'Safety Record',
      stat4Label: 'Deepest Sanctuary Dive',
    },
    portal: {
      eyebrow: 'SANCTUARY DIMENSIONS',
      title: 'EXPLORE EVERY DIMENSION',
      subtitle: 'From introductory certifications to elite 40m+ line training, oceanfront sanctuary accommodation, and Red Sea desert safaris.',
      exploreButton: 'Explore Dimension',
      courses: {
        title: 'SSI Courses',
        tag: 'Level 1 to Instructor',
        desc: 'Internationally recognized certifications from your first depth dive to professional Diamond ITC academy.',
      },
      training: {
        title: 'Freediving Training',
        tag: 'Blue Hole Line & EQ Lab',
        desc: 'Counter-ballast depth buoys, Frenzel/Mouthfill equalisation clinics, pool tables, and 1-on-1 master video analysis.',
      },
      accommodation: {
        title: 'Accommodation',
        tag: 'Sanctuary Suites & Villas',
        desc: 'Beachfront recovery suites, desert garden villas, gear drying lockers, and oceanfront yoga shala.',
      },
      packages: {
        title: 'Experiences Packages',
        tag: 'All-Inclusive Expeditions',
        desc: 'Curated 7 to 28-day retreats combining depth training, camel safaris, accommodation, and equipment.',
      },
      calendar: {
        title: 'Calendar Schedule',
        tag: 'Live Season Schedule',
        desc: 'Explore upcoming expedition dates, course tickets, available spots, and reserve your place in advance.',
      },
      experience: {
        title: 'Experiences & Safaris',
        tag: 'Red Sea Expeditions',
        desc: 'Ras Mohamed marine park drop-offs, Blue Hole arch safaris, bioluminescent night dives, and desert camps.',
      },
    },
    pageHeaders: {
      courses: {
        title: 'SSI Freediving Courses',
        subtitle: 'Structured international curriculum from introductory diaphragmatic mechanics and pool technique to elite 40m+ Mouthfill and professional SSI Instructor examination.',
        badge: 'SSI Diamond ITC Facility #720079 • ISO 24801 & 24802',
        ctaText: 'Enroll in a Course',
      },
      training: {
        title: 'Freediving Training & Coaching',
        subtitle: 'Dedicated counter-ballast depth buoys at the Blue Hole, precision equalization clinics, pool tables, and 1-on-1 master underwater 4K video analysis.',
        badge: 'Dahab Blue Hole & Lighthouse Sanctuary Base',
        ctaText: 'Reserve Depth Buoy',
      },
      accommodation: {
        title: 'Sanctuary Accommodation & Living',
        subtitle: 'Step from your room directly into the turquoise training bay. Enjoy oceanfront suites, desert garden eco-villas, gear drying rooms, and high-speed fiber internet.',
        badge: 'Sea Lodge • Lighthouse Bay Dahab • Nomad Friendly',
        ctaText: 'Check Availability',
      },
      packages: {
        title: 'Expeditions & Experiences Packages',
        subtitle: 'All-inclusive freediving residencies combining certified SSI courses, coached Blue Hole line training, oceanfront accommodation, and Red Sea desert safaris.',
        badge: 'All-Inclusive Immersions • 7 to 28 Days',
        ctaText: 'Book Package',
      },
      calendar: {
        title: 'Expedition & Course Calendar',
        subtitle: 'Live schedule of upcoming certified SSI courses, depth camps, equalization clinics, and camel safaris in Dahab. Check remaining spots and book directly.',
        badge: 'Live 2026 Season Schedule • Instant Seat Reservation',
        ctaText: 'Custom Date Request',
      },
      experience: {
        title: 'Red Sea Expeditions & Safaris',
        subtitle: 'Immerse yourself in world-class boat expeditions to Ras Mohamed National Park, the legendary Dahab Blue Hole arch, bioluminescent night dives, and Bedouin desert camps.',
        badge: 'Red Sea Marine Sanctuary Expeditions',
        ctaText: 'Inquire for Safari',
      },
      blog: {
        title: 'Freediving Journal & Archive',
        subtitle: 'Physiological science, deep equalization mechanics, equipment breakdowns, and dispatches from the Red Sea depths.',
        badge: 'Dahab Deep Archive',
        ctaText: 'Join an Academy',
      },
      faq: {
        title: 'Frequently Answered Questions',
        subtitle: 'Everything you need to know about traveling to Dahab, medical clearance, beginner prerequisites, and safety standards.',
        badge: 'Practical Advice & Logistics',
        ctaText: 'Ask an Instructor',
      },
    },
    testimonials: {
      eyebrow: 'VOICES FROM THE BLUE',
      title: 'DIVER EXPERIENCES & STORIES',
      subtitle: 'From complete first-timers to competitive 100m athletes, hear how Dahab’s waters transformed their relationship with breath and depth.',
    },
    faqSection: {
      badge: 'CLARITY & LOGISTICS',
      title: 'FREQUENTLY ANSWERED QUESTIONS',
      subtitle: 'Clear, transparent answers about safety, equipment, medical requirements, and visiting Dahab.',
      moreQuestions: 'Have more specific questions?',
      contactSupport: 'Chat Directly with an Instructor on WhatsApp',
    },
    footer: {
      desc: 'The premier freediving training center and SSI Instructor Training Center in Dahab, Egypt. Pioneering diaphragmatic relaxation, equalisation mechanics, and deep line training on the Red Sea Blue Hole since 2002.',
      certifiedCenter: 'SSI ITC FACILITY #720079',
      allRightsReserved: 'All rights reserved. Professional SSI Freediving Education.',
      academyCol: 'SSI Courses',
      trainingCol: 'Training & Buoys',
      sanctuaryCol: 'Sanctuary & Stays',
      contactCol: 'Dahab Base & Contact',
      backToTop: 'Back to Top',
    },
    booking: {
      modalTitle: 'Start Your Freediving Journey',
      modalSubtitle: 'Direct reservation & personalized inquiry with our senior SSI instructor team in Dahab.',
      fullName: 'Your Full Name',
      fullNamePlaceholder: 'e.g. Sarah Miller',
      email: 'Email Address',
      emailPlaceholder: 'sarah@example.com',
      phone: 'WhatsApp / Phone (with country code)',
      phonePlaceholder: '+44 7700 900077',
      offering: 'Select Course, Training, or Package',
      dates: 'Estimated Arrival Date',
      experienceLevel: 'Current Freediving Experience',
      expNone: 'Complete Beginner (Never freedived)',
      expL1: 'Level 1 Certified (10m - 20m)',
      expL2: 'Level 2 / Advanced (20m - 30m)',
      expMaster: 'Level 3 / Deep Master (30m - 40m+)',
      notes: 'Special Requests, Equalization Goals, or Notes',
      notesPlaceholder: 'Tell us about your equalisation comfort, preferred dates, or questions...',
      submit: 'Send Reservation Request',
      whatsappDirect: 'Chat Instantly on WhatsApp',
      close: 'Close',
    },
    coursesSection: {
      badge: 'OFFICIAL SSI ACADEMY • SOUTH SINAI',
      title: 'ACADEMIC',
      titleHighlight: 'PRECISION',
      subtitle: 'Structured architectural curriculum from introductory diaphragmatic mechanics to elite 40m+ Mouthfill and international SSI Instructor examination.',
      tabCore: 'Core Levels',
      tabSpecialty: 'Specialty Clinics',
      tabInstructor: 'Instructor ITC',
      tabEqualisation: 'Equalisation',
      tabTraining: 'Line Sessions',
      enrollNow: 'Enroll in Course',
      viewCurriculum: 'View Syllabus',
      duration: 'Duration',
      depth: 'Max Depth',
      days: 'Days',
      meters: 'Meters',
    },
    trainingSection: {
      badge: 'DAHAB BLUE HOLE & LIGHTHOUSE SANCTUARY BASE',
      title: 'DEPTH',
      titleHighlight: 'TRAINING & COACHING',
      subtitle: 'Dedicated counter-ballast depth buoys at the Blue Hole, precision equalization clinics, pool tables, and 1-on-1 master underwater 4K video analysis.',
      reserveBuoy: 'Reserve Depth Buoy',
      singleSession: 'Single Session',
      pack5: '5-Session Pack',
      pack10: '10-Session Pack',
    },
  },

  // =========================================================================
  // ARABIC (العربية) - With Authentic Terminology & Classical Eloquence
  // =========================================================================
  ar: {
    labels: {
      home: 'الرئيسية',
      courses: 'الدورات',
      training: 'التدريب',
      experience: 'التجارب والرحلات',
      accommodation: 'الإقامة',
      packages: 'الباقات',
      calendar: 'الجدول السنوي',
      blog: 'المقالات',
      faq: 'الأسئلة الشائعة',
    },
    ui: {
      language: 'اللغة',
      currency: 'العملة',
      bookCta: 'احجز / استفسر',
      bookNow: 'احجز واستفسر الآن',
      sound: 'صوت',
      mute: 'كتم',
      exploreAll: 'استكشف الكل',
      quickBook: 'حجز سريع',
      mostPopular: 'الأكثر طلباً',
      scheduled: 'محدد الموعد',
      fullDay: 'يوم كامل',
      proAcademy: 'أكاديمية المحترفين',
      home: 'الرئيسية',
    },
    dropdowns: {
      home: {
        sanctuaryTitle: 'نظرة عامة على الملاذ',
        sanctuaryDesc: 'استكشف ملاذ الغوص الحر في دهب والثقب الأزرق',
        heritageTitle: 'تراث دهب منذ عام 2003',
        heritageDesc: 'أكثر من 20 عاماً من تعليم الأعماق والمجتمع المترابط',
        reviewsTitle: 'قصص وتجارب الغواصين',
        reviewsDesc: 'آراء وتقييمات من المبتدئين وحتى أبطال الأعماق 100م+',
        startTitle: 'ابدأ رحلتك الآن',
        startDesc: 'تواصل مباشرة مع أحد مدربينا المعتمدين اليوم',
      },
      courses: {
        l1Title: 'المستوى الأول SSI للمبتدئين (20م)',
        l1Desc: 'الدورة التأسيسية الشاملة لمدة 3 أيام للغواصين الجدد',
        l2Title: 'المستوى الثاني المتقدم SSI (30م)',
        l2Desc: 'تقنية السقوط الحر، واسترخاء القفص الصدري، ومعادلة فرينزل',
        l3Title: 'المستوى الثالث خبير الأعماق (40م+)',
        l3Desc: 'تقنية ماوثفيل العميقة، وغوص الحجم المتبقي والانضباط الذهني',
        specialtyTitle: 'الدورات والورش التخصصية',
        specialtyDesc: 'الزعانف الأحادية، والغوص بدون زعانف، والوزن المتغير والسلامة',
        itcTitle: 'دورة إعداد مدربي الغوص الحر (ITC)',
        itcDesc: 'كن مدرب غوص حر دولي معتمد من منظمة SSI',
      },
      training: {
        buoyTitle: 'جلسات العوامات الموجهة في الأعماق',
        buoyDesc: 'خطوط تدريب يومية في الثقب الأزرق مع مدربين محترفين',
        buddyTitle: 'تدريب الزميل المستقل على الحبل',
        buddyDesc: 'تجهيزات العوامة والأوزان وحبل الأمان للغواصين المعتمدين',
        campTitle: 'معسكرات التدريب المكثفة',
        campDesc: 'تدريب مخصص للأعماق لمدة 7 أيام مع تحليل الفيديو الاحترافي',
        eqTitle: 'عيادات وورش معادلة الضغط',
        eqDesc: 'تجاوز صعوبات المعادلة والانتقال السلس لمعادلة فرينزل',
        apneaTitle: 'حصص كتم النفس الجاف وتمدد العضلات',
        apneaDesc: 'مرونة القفص الصدري وتمدد الحجاب الحاجز والاسترخاء التام',
      },
      experience: {
        rasMohamedTitle: 'رحلة سفاري محمية رأس محمد',
        rasMohamedDesc: 'جدران مرجانية عالمية شهيرة وكائنات بحرية نادرة',
        blueHoleTitle: 'رحلات استكشاف الثقب الأزرق والكانيون',
        blueHoleDesc: 'غوص حر إرشادي واستكشاف الشعاب المرجانية الأسطورية في دهب',
        nightTitle: 'الغوص الحر الليلي والبريق الحيوي',
        nightDesc: 'انزلق في مياه متلألئة تحت أضواء النجوم الساحرة',
        desertTitle: 'تأمل النجوم في الصحراء والعشاء البدوي',
        desertDesc: 'أمسيات استرخاء هادئة بين سحر جبال سيناء المهيبة',
      },
      accommodation: {
        seafrontTitle: 'غرف الملاذ المطلة مباشرة على البحر',
        seafrontDesc: 'على بُعد خطوات معدودة من مياه خليج اللايتهاوس',
        ecoTitle: 'نزل وأكواخ الغواصين البيئية',
        ecoDesc: 'غرف هادئة ومريحة مصممة خصيصاً لاحتياجات الغواصين',
        suitesTitle: 'أجنحة وشقق خاصة مستقلة',
        suitesDesc: 'إقامة شاطئية فسيحة ومجهزة بمطبخ وتراس بإطلالة بانورامية',
      },
      packages: {
        zeroToHeroTitle: 'برنامج من البداية إلى الاحتراف',
        zeroToHeroDesc: 'مسار تدريبي شامل من 4 إلى 6 أسابيع للوصول لعمق 40م+',
        safariCampTitle: 'باقة تدريب الأعماق وسفاري البحر',
        safariCampDesc: 'اجمع بين تدريب الثقب الأزرق ورحلات يخوت البحر الأحمر',
        customTitle: 'باقات مخصصة للمجموعات والأفراد',
        customDesc: 'برامج مصممة خصيصاً تناسب أصدقائك أو ناديك الرياضي',
      },
      calendar: {
        itcTitle: 'مارس 2026 - دورة إعداد مدربي SSI',
        itcDesc: 'اختبارات وإعداد المدربين الدوليين لمدة 10 أيام مكثفة',
        safariTitle: 'أبريل 2026 - سفاري يخوت البحر الأحمر',
        safariDesc: '7 ليالٍ في أعماق الشعاب المرجانية وحطام السفن الغارقة',
        campTitle: 'معسكر الأعماق الخريفي 2026',
        campDesc: 'أسبوع تدريب عالي الأداء في شهر أكتوبر',
        fullCalendarTitle: 'عرض جدول عام 2026 بالكامل',
        fullCalendarDesc: 'الجدول الكامل للأسابيع التدريبية والمقاعد المتاحة',
      },
      blog: {
        blueHoleGuideTitle: 'دليل الثقب الأزرق الشامل في دهب',
        blueHoleGuideDesc: 'أحوال الطقس، درجات حرارة المياه، وقائمة تجهيز المعدات',
        eqGuideTitle: 'فن معادلة الضغط للأعماق',
        eqGuideDesc: 'إتقان معادلة فرينزل، والمعادلة بدون أيدي، وتكنيك الماوثفيل',
        packingTitle: 'قائمة أغراض السفر إلى دهب',
        packingDesc: 'سماكة البدل، زعانف الكربون، والمعدات الأساسية للغوص الحر',
        safetyTitle: 'بروتوكولات الأمان وحبال السلامة في البحر',
        safetyDesc: 'كيف تحمي أنظمة الموازنة المضادة وغواصو الأمان سلامة الأعماق',
      },
      faq: {
        beginnersTitle: 'المبتدئون والغواصون الجدد',
        beginnersDesc: 'هل أحتاج لأن أكون سباحاً ماهراً؟ وما هي المتطلبات الأساسية؟',
        medicalTitle: 'السلامة والتأمين والمعلومات الطبية',
        medicalDesc: 'متطلبات الاستبيان الطبي ومعايير السلامة والأمان للغوص الحر',
        gearTitle: 'المعدات وتأجير أدوات الغوص',
        gearDesc: 'سماكة البدل، مقارنة زعانف الكربون بالبلاستيك، ومقاسات المعدات',
        travelTitle: 'السفر إلى دهب، التأشيرات والتوصيل',
        travelDesc: 'الانتقالات من مطار شرم الشيخ الدولي وإجراءات الدخول',
      },
    },
    hero: {
      locationEyebrow: 'دهب · البحر الأحمر · مركز الغوص الحر منذ 2003',
      line1: 'أول مركز للغوص الحر في دهب — منذ 2003',
      line2: 'أول مركز تدريب مدربي غوص حر معتمد من SSI في العالم — منذ 2010',
      leadTitle: 'لست بحاجة لأن تكون غواصاً محترفاً لتبدأ.',
      leadDesc: 'ابدأ بنَفَسٍ واحد هادئ في مياه دهب المحمية، وتقدم بثقة وأمان وفق وتيرتك الطبيعية.',
      oneBreath: 'نَفَس واحد',
      oneBreathDesc: 'استرخاء عميق وتركيز ذهني فائق',
      calmWaters: 'مياه هادئة',
      calmWatersDesc: 'دفء ونقاء منقطع النظير في البحر الأحمر',
      safety100: 'أمان 100%',
      safety100Desc: 'مدربون دوليون معتمدون بأعلى المعايير',
      exploreCourses: 'استكشف الدورات',
      bookInquireNow: 'احجز واستفسر الآن',
      phase2Title: 'ملاذك الخاص في دهب',
      phase2Sub: 'الثقب الأزرق وخليج اللايتهاوس',
      phase2Desc: 'من نزولك الأول لعمق 5 أمتار وحتى استكشاف أعماق تفوق 100 متر. تمتع بخطوط عوامات تدريب عالمية، وأنظمة موازنة مضادة، وتدريب شخصي دقيق.',
      viewTraining: 'عرض برامج التدريب',
      exploreStay: 'استكشف أماكن الإقامة',
      depthSurface: 'السطح',
      depth15m: '15م',
      depth30m: '30م+',
    },
    intro: {
      tagline: 'الرحلة نحو أعماقك تبدأ بنَفَس واحد.',
      enter: 'اضغط في أي مكان للغوص',
    },
    descentStats: {
      eyebrow: 'منذ 2003 · أول مدرسة غوص حر في دهب',
      title: 'إرثنا',
      titleHighlight: 'بالأرقام',
      s1Label: 'عامًا في دهب',
      s1Desc: 'ريادة الغوص الحر على شعاب المنارة منذ 2002.',
      s2Label: 'دورة وبرنامجًا تدريبيًا',
      s2Desc: 'من تجربة الغوص الحر حتى المدرب الدولي المعتمد.',
      s3Label: 'خريج مدربين',
      s3Desc: 'يدرّسون اليوم في أكثر من 35 دولة حول العالم.',
      s4Label: 'غواص حر معتمد',
      s4Desc: 'مع اهتمام فردي كامل من المدربين وتحقيق أهداف شخصية.',
      s5Label: 'سجل السلامة',
      s5Desc: '24 عامًا دون أي حوادث تخفيف ضغط على حبالنا.',
      s6Label: 'أعمق غوص في المحمية',
      s6Desc: 'وصول إلى ثقب الأزرق وحبال تدريب خاصة يوميًا في دهب.',
    },
    courseChapters: {
      system: 'نظام SSI',
      core: 'الدورات الأساسية',
      try: 'البرامج التخصصية',
      pro: 'الماستر والمحترفين',
      numbersEyebrow: 'إلى أي عمق يأخذك كل دور',
      ratioLabel: 'حد أقصى للطلاب لكل مدرب',
      countriesLabel: 'دولة تعترف بشهادات SSI',
    },
    certificates: {
      badge: 'شريك SSI رسمي • منشأة #720079 • معايير ISO 24801 و 24802',
      title: 'المعيار الذهبي الدولي في تعليم الغوص الحر',
      subtitle: 'مدرسة غوص حر معتمدة من SSI في قلب دهب — نخبة من مدربي المدربين، وعوامات تدريب احترافية بنظام الموازنة المضادة، وسجل أمان تام بنسبة 100% منذ عام 2003.',
      card1Title: 'مركز غوص حر SSI',
      card1Desc: 'شريك SSI رسمي — مدربون معتمدون وعوامات أعماق متخصصة وتعليم بمعايير عالمية.',
      card2Title: 'مركز حورية البحر SSI',
      card2Desc: 'شريك SSI رسمي — برامج حورية البحر الساحرة، وتقنيات الزعنفة الواحدة، وفنون الحركة تحت الماء لجميع الأعمار.',
      card3Title: 'مركز تدريب مدربي الغوص الحر SSI',
      card3Desc: 'شريك SSI رسمي — أكاديميتنا المهنية تُعدّ وتُخرّج الجيل القادم من مدربي الغوص الحر.',
      verifyBtn: 'تحقق من اعتماد المركز',
      bookBtn: 'سجل في دورة معتمدة',
    },
    story: {
      eyebrow: 'فلسفة الغوص الحر • ملاذ دهب',
      quote: 'الصمت ليس غياباً للصوت، بل هو حضور العمق وسكينته.',
      quoteAuthor: 'مركز تدريب مدربي SSI وتاريخ عريق',
      established: 'تأسس عام 2003 • دهب',
      subheading: 'عمق خالص وسيطرة تأملية هادئة',
      titleLine1: 'ما وراء',
      titleLine2: 'سطح المياه.',
      desc1: 'الغوص الحر ليس رياضة أدرينالين أو اندفاع، بل هو سيمفونية داخلية من السكون والسكينة. في دفء خليج اللايتهاوس وفي الأعماق العمودية للثقب الأزرق الأسطوري، نصقل معاً فن التنفّس الدقيق، والفيزيولوجيا الحيوية للضغط، والهدوء الاستثنائي في عالم ما تحت الماء.',
      desc2: 'ترتكز فلسفتنا التعليمية على نبذ الإجهاد أو الضغط النفسي. بدلاً من ذلك، نكشف الأسرار البيولوجية لمنعكس الغوص لدى الثدييات، والتحكم باللهاة الرخوة، واسترخاء الحجاب الحاجز. سواء كنت تأخذ أول أنفاسك المعتمدة لعمق 20 متراً أو تتدرب لنيل رخصة مدرب دولي من SSI، فإن كل نزول يحظى بحماية ورعاية فائقة.',
      ratioTitle: 'حد أقصى 3 طلاب لكل مدرب',
      ratioDesc: 'نحن لا نصدر شهادات بالجملة، بل نلتزم بحد أقصى 3 طلاب لضمان الأمان الفردي التام والتحليل بالفيديو لكل غطسة.',
      itcTitle: 'مركز تدريب مدربين SSI ITC',
      itcDesc: 'قمنا بتخريج أكثر من 450 مدرباً محترفاً منذ عام 2003، ونفخر بكوننا الأكاديمية الرائدة لإعداد المدربين في مصر والشرق الأوسط.',
      ctaCourses: 'استكشف دوراتنا المعتمدة',
      ctaRetreat: 'اطلب برنامجاً خاصاً',
      statsSectionTitle: '24 عاماً في صقل وإعداد',
      statsSectionTitleAccent: 'غواصين واثقين بمعايير عالمية',
      statsSectionDesc: 'المركز الرائد لتدريب مدربي الغوص الحر في جنوب سيناء على ممشى اللايتهاوس مباشرة. تاريخ مبني على السلامة، وعلم المعادلة، ولحظات التحول الفارقة لطلابنا.',
      stat1Label: 'عاماً من التميز في دهب',
      stat2Label: 'غواصاً حراً معتمداً',
      stat3Label: 'سجل أمان وسلامة تام',
      stat4Label: 'أعمق نزول في ملاذنا',
    },
    portal: {
      eyebrow: 'أبعاد الملاذ',
      title: 'استكشف جميع أبعاد الملاذ',
      subtitle: 'من دورات المبتدئين المعتمدة وحتى تدريب الأعماق المتقدم لعمق 40م+، وأماكن الإقامة الشاطئية، ورحلات سفاري البحر الأحمر.',
      exploreButton: 'استكشف هذا البعد',
      courses: {
        title: 'دورات الغوص الحر SSI',
        tag: 'من المستوى الأول للمدربين',
        desc: 'شهادات دولية معتمدة تبدأ من أول غطسة عميقة وصولاً لأكاديمية إعداد المدربين المحترفين.',
      },
      training: {
        title: 'تدريب الأعماق التخصصي',
        tag: 'حبال الثقب الأزرق ومختبر المعادلة',
        desc: 'عوامات بموازنة مضادة، وعيادات معادلة فرينزل والماوثفيل، وتحليل الأداء بالفيديو بدقة عالية.',
      },
      accommodation: {
        title: 'الإقامة الشاطئية المريحة',
        tag: 'أجنحة وفيلات الملاذ',
        desc: 'أجنحة شاطئية للاسترخاء، وفيلات بحدائق صحراوية، وخزائن تجفيف المعدات، وصالة يوغا مطلة على البحر.',
      },
      packages: {
        title: 'الباقات والإقامات المتكاملة',
        tag: 'رحلات شاملة لكل التجهيزات',
        desc: 'معسكرات إقامة وتدريب من 7 إلى 28 يوماً تجمع تدريب الأعماق، وسفاري الجمال، والإقامة والمعدات.',
      },
      calendar: {
        title: 'الجدول السنوي المباشر',
        tag: 'مواعيد الموسم الحالية',
        desc: 'استعرض مواعيد الرحلات والدورات القادمة، واكتشف المقاعد المتبقية واحجز مكانك مقدماً.',
      },
      experience: {
        title: 'التجارب ورحلات السفاري',
        tag: 'استكشاف البحر الأحمر',
        desc: 'رحلات يخوت لمحمية رأس محمد، وقوس الثقب الأزرق، والغوص الليلي بالبريق الحيوي، والمخيمات البدوية.',
      },
    },
    pageHeaders: {
      courses: {
        title: 'دورات الغوص الحر المعتمدة من SSI',
        subtitle: 'منهاج دولي منظم من تقنيات التنفّس بالحجاب الحاجز ومهارات المسبح وحتى معادلة الماوثفيل لعمق 40م+ وإعداد المدربين الدوليين.',
        badge: 'مركز تدريب مدربين ماسي SSI #720079 • معايير ISO 24801 و 24802',
        ctaText: 'سجل في إحدى الدورات',
      },
      training: {
        title: 'تدريب وتوجيه الغوص الحر للأعماق',
        subtitle: 'عوامات تدريب مجهزة بنظام الموازنة المضادة في الثقب الأزرق، وورش معادلة الضغط، وتحليل الفيديو تحت الماء بجودة 4K.',
        badge: 'قاعدة الثقب الأزرق وخليج اللايتهاوس في دهب',
        ctaText: 'احجز عوامة تدريب للأعماق',
      },
      accommodation: {
        title: 'إقامة الملاذ والحياة الشاطئية',
        subtitle: 'انطلق من باب غرفتك مباشرة إلى مياه التدريب الفيروزية. أجنحة بحرية، وفيلات صديقة للبيئة، وإنترنت فايبر فائق السرعة.',
        badge: 'نزل البحر • خليج اللايتهاوس دهب • بيئة مثالية للعمل عن بعد',
        ctaText: 'تحقق من توافر الغرف',
      },
      packages: {
        title: 'باقات التجارب والإقامات المتكاملة',
        subtitle: 'إقامات غوص حر شاملة تجمع دورات SSI المعتمدة، وتدريب الثقب الأزرق الموجه، والإقامة الشاطئية، وسفاري البحر الأحمر.',
        badge: 'معسكرات تدريب وإقامة شاملة • من 7 إلى 28 يوماً',
        ctaText: 'احجز الباقة الآن',
      },
      calendar: {
        title: 'جدول الرحلات والدورات التدريبية',
        subtitle: 'مواعيد حية للدورات المعتمدة، ومعسكرات الأعماق، وورش معادلة الضغط، وسفاري الجمال في دهب. احجز مقعدك مباشرة.',
        badge: 'جدول موسم 2026 المباشر • حجز المقاعد متاح فوراً',
        ctaText: 'طلب موعد مخصص',
      },
      experience: {
        title: 'رحلات واستكشافات البحر الأحمر',
        subtitle: 'عش تجربة رحلات اليخوت لمحمية رأس محمد، واستكشف قوس الثقب الأزرق، والغوص الليلي الساحر، والمخيمات البدوية الجبلية.',
        badge: 'رحلات استكشاف المحميات البحرية بالبحر الأحمر',
        ctaText: 'استفسر عن رحلات السفاري',
      },
      blog: {
        title: 'أرشيف ومقالات الغوص الحر',
        subtitle: 'العلوم الفيزيولوجية، وميكانيكا معادلة الضغط للأعماق، وشروحات المعدات، ومستجدات أعماق البحر الأحمر.',
        badge: 'أرشيف دهب للأعماق',
        ctaText: 'انضم إلى الأكاديمية',
      },
      faq: {
        title: 'الأسئلة الشائعة والمعلومات العملية',
        subtitle: 'كل ما تحتاج لمعرفته حول السفر إلى دهب، والإقرار الطبي، والمتطلبات المسبقة، ومعايير السلامة والأمان.',
        badge: 'إرشادات عملية ومعلومات لوجستية',
        ctaText: 'تحدث مع مدرب متخصص',
      },
    },
    testimonials: {
      eyebrow: 'أصوات من الأعماق',
      title: 'تجارب وقصص الغواصين',
      subtitle: 'من المبتدئين في غطستهم الأولى وحتى أبطال الأعماق المتنافسين لعمق 100م، اقرأ كيف غيرت مياه دهب علاقتهم بالتنفّس والعمق.',
    },
    faqSection: {
      badge: 'الوضوح والمعلومات اللوجستية',
      title: 'الأسئلة الأكثر شيوعاً',
      subtitle: 'إجابات واضحة وشفافة حول الأمان، والمعدات، والمتطلبات الطبية، وزيارة دهب.',
      moreQuestions: 'هل لديك أسئلة واستفسارات إضافية؟',
      contactSupport: 'تواصل مباشرة مع أحد مدربينا عبر واتساب',
    },
    footer: {
      desc: 'المركز الرائد لتدريب الغوص الحر وتأهيل المدربين الدوليين من منظمة SSI في دهب، مصر. رواد استرخاء الحجاب الحاجز، وميكانيكا المعادلة، وتدريب الأعماق في الثقب الأزرق منذ عام 2002.',
      certifiedCenter: 'مركز تدريب مدربين معتمد #720079',
      allRightsReserved: 'جميع الحقوق محفوظة. تعليم احترافي معتمد للغوص الحر SSI.',
      academyCol: 'دورات SSI',
      trainingCol: 'التدريب والعوامات',
      sanctuaryCol: 'الملاذ والإقامة',
      contactCol: 'مقر دهب والتواصل',
      backToTop: 'العودة للأعلى',
    },
    booking: {
      modalTitle: 'ابدأ رحلتك في الغوص الحر',
      modalSubtitle: 'حجز مباشر واستفسار مخصص مع نخبة مدربي SSI المعتمدين في دهب.',
      fullName: 'الاسم الكامل',
      fullNamePlaceholder: 'مثال: أحمد عبد الله',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'ahmed@example.com',
      phone: 'رقم الهاتف / واتساب (مع رمز الدولة)',
      phonePlaceholder: '+20 100 123 4567',
      offering: 'اختر الدورة، التدريب، أو الباقة المطلوبة',
      dates: 'تاريخ الوصول المتوقع',
      experienceLevel: 'مستوى خبرتك الحالي في الغوص الحر',
      expNone: 'مبتدئ تماماً (لم أجرب الغوص الحر من قبل)',
      expL1: 'حاصل على المستوى الأول (10م - 20م)',
      expL2: 'مستوى متقدم (20م - 30م)',
      expMaster: 'مستوى خبير أعماق (30م - 40م+)',
      notes: 'أي طلبات خاصة، أهداف لمعادلة الضغط، أو ملاحظات',
      notesPlaceholder: 'أخبرنا عن سهولة معادلة الضغط لديك، مواعيدك المفضلة، أو أي استفسار...',
      submit: 'إرسال طلب الحجز',
      whatsappDirect: 'محادثة فورية عبر واتساب',
      close: 'إغلاق',
    },
    coursesSection: {
      badge: 'أكاديمية SSI الرسمية • جنوب سيناء',
      title: 'الدقة',
      titleHighlight: 'الأكاديمية',
      subtitle: 'منهاج تدريبي منظم من آليات التنفس بالحجاب الحاجز للمبتدئين وحتى تقنيات ماوثفيل للغوص لما بعد 40 متراً واختبارات مدربي SSI العالمية.',
      tabCore: 'المستويات الأساسية',
      tabSpecialty: 'عيادات تخصصية',
      tabInstructor: 'تدريب المدربين',
      tabEqualisation: 'معادلة الضغط',
      tabTraining: 'جلسات الحبل',
      enrollNow: 'التسجيل في الدورة',
      viewCurriculum: 'عرض المنهاج',
      duration: 'المدة',
      depth: 'أقصى عمق',
      days: 'أيام',
      meters: 'متر',
    },
    trainingSection: {
      badge: 'قاعدة الثقب الأزرق والمنارة بدهب',
      title: 'تدريب',
      titleHighlight: 'الأعماق والمهارات',
      subtitle: 'عوامات أعماق مجهزة بأنظمة الثقل المعاكس في الثقب الأزرق، وورش معادلة ضغط دقيقة، وتحليل فيديو تحت الماء بدقة 4K.',
      reserveBuoy: 'احجز عوامة العمق',
      singleSession: 'جلسة فردية',
      pack5: 'باقة 5 جلسات',
      pack10: 'باقة 10 جلسات',
    },
  },

  // =========================================================================
  // SPANISH (Español) - Elegant and Precise Freediving Castilian
  // =========================================================================
  es: {
    labels: {
      home: 'Inicio',
      courses: 'Cursos',
      training: 'Entrenamiento',
      experience: 'Experiencias',
      accommodation: 'Alojamiento',
      packages: 'Paquetes',
      calendar: 'Calendario',
      blog: 'Blog',
      faq: 'Preguntas',
    },
    ui: {
      language: 'Idioma',
      currency: 'Moneda',
      bookCta: 'Reservar / Consultar',
      bookNow: 'Reservar / Consultar Ahora',
      sound: 'SONIDO',
      mute: 'SILENCIO',
      exploreAll: 'Explorar todo',
      quickBook: 'Reserva Rápida',
      mostPopular: 'Más Popular',
      scheduled: 'Programado',
      fullDay: 'Día Completo',
      proAcademy: 'Academia Pro',
      home: 'Inicio',
    },
    dropdowns: {
      home: {
        sanctuaryTitle: 'El Santuario de Dahab',
        sanctuaryDesc: 'Explora el Blue Hole y el santuario de apnea en Dahab',
        heritageTitle: 'Legado en Dahab Desde 2003',
        heritageDesc: 'Más de 20 años de formación en profundidad y comunidad',
        reviewsTitle: 'Historias de Apneístas',
        reviewsDesc: 'Testimonios desde principiantes absolutos hasta atletas de 100m+',
        startTitle: 'Comienza Tu Viaje',
        startDesc: 'Ponte en contacto con un instructor certificado hoy',
      },
      courses: {
        l1Title: 'SSI Nivel 1 Freediver (20m)',
        l1Desc: 'El curso fundamental de 3 días para principiantes',
        l2Title: 'SSI Nivel 2 Avanzado (30m)',
        l2Desc: 'Técnica de caída libre, relajación torácica y ecualización Frenzel',
        l3Title: 'SSI Nivel 3 Deep Master (40m+)',
        l3Desc: 'Mouthfill profundo, buceo a volumen residual y enfoque mental',
        specialtyTitle: 'Cursos de Especialidad y Clínicas',
        specialtyDesc: 'Monoaleta, Sin Aletas, Peso Variable y Seguridad Avanzada',
        itcTitle: 'Curso de Instructores SSI (ITC)',
        itcDesc: 'Conviértete en Instructor Internacional Certificado de Apnea SSI',
      },
      training: {
        buoyTitle: 'Sesiones Guiadas de Profundidad',
        buoyDesc: 'Líneas de boya diarias en el Blue Hole con entrenadores expertos',
        buddyTitle: 'Entrenamiento Independiente en Compañía',
        buddyDesc: 'Boya, plomos y sistema de seguridad lanyard para certificados',
        campTitle: 'Semanas de Entrenamiento Intensivo',
        campDesc: '7 días de coaching profundo con análisis de vídeo subacuático',
        eqTitle: 'Clínicas de Ecualización',
        eqDesc: 'Supera bloqueos de compensación y domina el método Frenzel',
        apneaTitle: 'Apnea en Seco y Estiramientos',
        apneaDesc: 'Flexibilidad torácica, estiramiento del diafragma y relajación',
      },
      experience: {
        rasMohamedTitle: 'Safari Marino en Ras Mohamed',
        rasMohamedDesc: 'Famosas paredes de coral verticales y avistamiento de fauna pelágica',
        blueHoleTitle: 'Safaris en el Blue Hole y Canyon',
        blueHoleDesc: 'Exploración guiada de arrecifes en los sitios legendarios de Dahab',
        nightTitle: 'Apnea Nocturna y Bioluminiscencia',
        nightDesc: 'Deslízate por aguas centelleantes y luminiscentes bajo las estrellas',
        desertTitle: 'Observación de Estrellas y Cena Beduina',
        desertDesc: 'Mágicas veladas de serenidad en las montañas del Sinaí',
      },
      accommodation: {
        seafrontTitle: 'Habitaciones Frente al Mar',
        seafrontDesc: 'A escasos pasos del agua en la bahía de Lighthouse Dahab',
        ecoTitle: 'Eco Lodge y Cabañas para Buceadores',
        ecoDesc: 'Habitaciones serenas y económicas diseñadas para apneístas',
        suitesTitle: 'Suites Privadas y Apartamentos',
        suitesDesc: 'Espaciosos alojamientos costeros con cocina y terrazas con vistas',
      },
      packages: {
        zeroToHeroTitle: 'Residencia Cero a Héroe',
        zeroToHeroDesc: 'Programa de 4 a 6 semanas para convertirte en Master de 40m+',
        safariCampTitle: 'Expedición de Profundidad y Safari',
        safariCampDesc: 'Combina el Blue Hole con safaris en barco por el Mar Rojo',
        customTitle: 'Paquetes Privados y para Grupos',
        customDesc: 'Itinerarios a medida para amigos, clubes o parejas',
      },
      calendar: {
        itcTitle: 'Marzo 2026 - Curso de Instructores SSI',
        itcDesc: 'Examen e instrucción profesional internacional de 10 días',
        safariTitle: 'Abril 2026 - Vida a Bordo en el Mar Rojo',
        safariDesc: '7 noches recorriendo los arrecifes y pecios más impresionantes',
        campTitle: 'Campamento de Profundidad Otoño 2026',
        campDesc: 'Semana de alto rendimiento en octubre',
        fullCalendarTitle: 'Ver Calendario Completo 2026',
        fullCalendarDesc: 'Horario completo de fechas programadas y plazas abiertas',
      },
      blog: {
        blueHoleGuideTitle: 'Guía Completa del Blue Hole',
        blueHoleGuideDesc: 'Clima, temperaturas del agua, equipo necesario y consejos de viaje',
        eqGuideTitle: 'El Arte de la Ecualización Profunda',
        eqGuideDesc: 'Dominio de Frenzel, manos libres y mecánica de Mouthfill',
        packingTitle: 'Lista de Equipaje para Dahab',
        packingDesc: 'Grosor de trajes, aletas de carbono y consejos de material',
        safetyTitle: 'Seguridad en el Océano y Protocolos Lanyard',
        safetyDesc: 'Cómo los sistemas de contrapeso y buceadores de seguridad salvan vidas',
      },
      faq: {
        beginnersTitle: 'Principiantes y Primerizos',
        beginnersDesc: '¿Necesito saber nadar a nivel profesional? ¿Cuáles son los requisitos?',
        medicalTitle: 'Seguridad, Seguros e Información Médica',
        medicalDesc: 'Cuestionario médico y estándares de seguridad para apnea',
        gearTitle: 'Equipo y Alquiler de Material',
        gearDesc: 'Grosores de neopreno, aletas de carbono vs. plástico y tallas',
        travelTitle: 'Viajes a Dahab, Visados y Traslados',
        travelDesc: 'Traslados desde el aeropuerto de Sharm el-Sheikh y visados',
      },
    },
    hero: {
      locationEyebrow: 'DAHAB · MAR ROJO · SANTUARIO DE APNEA DESDE 2003',
      line1: 'PRIMER CENTRO DE APNEA EN DAHAB — DESDE 2003',
      line2: 'PRIMER CENTRO DE FORMACIÓN DE INSTRUCTORES SSI DEL MUNDO — DESDE 2010',
      leadTitle: 'No necesitas ser un buceador profundo para comenzar.',
      leadDesc: 'Comienza con una respiración calmada en las aguas protegidas de Dahab. Avanza con confianza a tu propio ritmo natural.',
      oneBreath: 'Una Respiración',
      oneBreathDesc: 'Relajación profunda y calma absoluta',
      calmWaters: 'Aguas Calmas',
      calmWatersDesc: 'Claridad cálida y protegida del Mar Rojo',
      safety100: '100% Seguro',
      safety100Desc: 'Instructores SSI certificados internacionalmente',
      exploreCourses: 'Explorar Cursos',
      bookInquireNow: 'Reservar / Consultar Ahora',
      phase2Title: 'TU SANTUARIO EN DAHAB',
      phase2Sub: 'El Blue Hole y la Bahía de Lighthouse',
      phase2Desc: 'Desde tu primer descenso de 5 metros hasta la exploración de profundidades superiores a 100 metros. Disfruta de líneas de boya de clase mundial, seguridad con contrapeso y entrenamiento personalizado.',
      viewTraining: 'Ver Programas de Entrenamiento',
      exploreStay: 'Ver Alojamientos',
      depthSurface: 'SUPERFICIE',
      depth15m: '15M',
      depth30m: '30M+',
    },
    intro: {
      tagline: 'El viaje hacia tu yo más profundo comienza con un solo aliento.',
      enter: 'Haz clic en cualquier lugar para sumergirte',
    },
    descentStats: {
      eyebrow: 'Desde 2003 · La primera escuela de apnea en Dahab',
      title: 'NUESTRO LEGADO',
      titleHighlight: 'EN NÚMEROS',
      s1Label: 'Años en Dahab',
      s1Desc: 'Pioneros de la apnea en el arrecife Lighthouse desde 2002.',
      s2Label: 'Cursos y programas',
      s2Desc: 'Desde Try Freediving hasta Instructor Internacional ITC.',
      s3Label: 'Instructores graduados',
      s3Desc: 'Ahora enseñan en más de 35 países del mundo.',
      s4Label: 'Apneistas certificados',
      s4Desc: 'Con atención individual del entrenador y metas personales.',
      s5Label: 'Récord de seguridad',
      s5Desc: '24 años sin accidentes de descompresión en nuestras líneas.',
      s6Label: 'Inmersión más profunda',
      s6Desc: 'Acceso al Blue Hole con líneas privadas de entrenamiento diarias en Dahab.',
    },
    courseChapters: {
      system: 'El sistema SSI',
      core: 'Cursos principales',
      try: 'Especialidades',
      pro: 'Master y Pro',
      numbersEyebrow: 'Hasta dónde te lleva cada curso',
      ratioLabel: 'Máx. estudiantes por instructor',
      countriesLabel: 'Países reconocen SSI',
    },
    certificates: {
      badge: 'Partner Oficial SSI • Instalación #720079 • Normas ISO 24801 y 24802',
      title: 'El Estándar Internacional de Oro en Formación de Apnea',
      subtitle: 'Escuela de apnea autorizada por SSI en el corazón de Dahab — entrenadores de instructores, boyas de contrapeso profesionales y un récord de seguridad del 100% desde 2003.',
      card1Title: 'SSI Freediving Center',
      card1Desc: 'Partner Oficial SSI — instructores titulados, boyas de profundidad y formación de estándar mundial.',
      card2Title: 'SSI Mermaid Center',
      card2Desc: 'Partner Oficial SSI — programas de sirena, técnica de monoaleta y arte submarino para todas las edades.',
      card3Title: 'SSI Freediving Instructor Training Center',
      card3Desc: 'Partner Oficial SSI — nuestra academia profesional forma y certifica a la próxima generación de instructores de apnea.',
      verifyBtn: 'Verificar Centro SSI',
      bookBtn: 'Inscribirme en un Curso Certificado',
    },
    story: {
      eyebrow: 'FILOSOFÍA DE APNEA • EL SANTUARIO DE DAHAB',
      quote: 'El silencio no es la ausencia de sonido, sino la presencia de la profundidad.',
      quoteAuthor: 'Centro SSI ITC y Legado Histórico',
      established: 'FUNDADO EN 2003 • DAHAB',
      subheading: 'Profundidad Pura y Control Meditativo',
      titleLine1: 'MÁS ALLÁ DE LA',
      titleLine2: 'SUPERFICIE.',
      desc1: 'La apnea no es un deporte de adrenalina; es una sinfonía interna de quietud. En la calidez protegida de Lighthouse Bay y el abismo vertical del legendario Blue Hole, cultivamos el sutil arte de la respiración, la fisiología exacta de la presión y la sublime paz del mundo subacuático.',
      desc2: 'Nuestra filosofía docente rechaza la exigencia agresiva. Enseñamos los secretos biológicos del reflejo de inmersión mamífero, el aislamiento del paladar blando y la relajación diafragmática. Ya sea tu primera respiración certificada hasta 20 metros o la preparación para instructor profesional SSI, cada descenso se cuida con precisión quirúrgica.',
      ratioTitle: 'Máximo 3:1 Alumnos por Instructor',
      ratioDesc: 'No producimos certificaciones en masa. Un máximo estricto de 3 alumnos garantiza seguridad personalizada y análisis en vídeo de cada inmersión.',
      itcTitle: 'Centro de Formación de Instructores SSI',
      itcDesc: 'Más de 450 instructores profesionales formados desde 2003. Reconocida como la academia de instructores SSI líder en Egipto y Oriente Medio.',
      ctaCourses: 'DESCUBRE NUESTROS CURSOS',
      ctaRetreat: 'SOLICITAR RETIRO A MEDIDA',
      statsSectionTitle: '24 AÑOS FORMANDO APNEÍSTAS',
      statsSectionTitleAccent: 'CONFIADOS Y DE CLASE MUNDIAL',
      statsSectionDesc: 'El centro líder en formación de instructores del Sinaí, ubicado directamente en el paseo de Lighthouse. Creado sobre pilares de seguridad, ciencia de ecualización e hitos que transforman vidas.',
      stat1Label: 'Años en Dahab',
      stat2Label: 'Apneístas Certificados',
      stat3Label: 'Récord de Seguridad',
      stat4Label: 'Inmersión Más Profunda',
    },
    portal: {
      eyebrow: 'DIMENSIONES DEL SANTUARIO',
      title: 'EXPLORA CADA DIMENSIÓN',
      subtitle: 'Desde cursos certificados para principiantes hasta entrenamiento profundo de 40m+, estancias junto al mar y safaris por el desierto del Mar Rojo.',
      exploreButton: 'Explorar Dimensión',
      courses: {
        title: 'Cursos de Apnea SSI',
        tag: 'Nivel 1 a Instructor',
        desc: 'Certificaciones internacionales desde tu primera inmersión hasta la academia profesional de formación de instructores.',
      },
      training: {
        title: 'Entrenamiento de Profundidad',
        tag: 'Líneas del Blue Hole y Laboratorio EQ',
        desc: 'Boyas con sistema de contrapeso, clínicas de Frenzel y Mouthfill, tablas de piscina y análisis de vídeo 4K.',
      },
      accommodation: {
        title: 'Alojamiento en el Santuario',
        tag: 'Suites y Villas Costeras',
        desc: 'Suites frente al mar, villas en jardines desérticos, taquillas para secar equipo y sala de yoga.',
      },
      packages: {
        title: 'Paquetes y Residencias',
        tag: 'Expediciones con Todo Incluido',
        desc: 'Retiros intensivos de 7 a 28 días combinando profundidad, safaris en camello, alojamiento y equipo completo.',
      },
      calendar: {
        title: 'Calendario en Vivo',
        tag: 'Horarios de Temporada 2026',
        desc: 'Descubre próximas fechas de expediciones, cursos programados y plazas disponibles para reservar por anticipado.',
      },
      experience: {
        title: 'Experiencias y Safaris',
        tag: 'Expediciones en el Mar Rojo',
        desc: 'Safaris en barco en Ras Mohamed, arco del Blue Hole, apnea nocturna con bioluminiscencia y campamentos beduinos.',
      },
    },
    pageHeaders: {
      courses: {
        title: 'Cursos Certificados de Apnea SSI',
        subtitle: 'Plan de estudios internacional estructurado desde la mecánica diafragmática y técnica en piscina hasta Mouthfill a más de 40m y examen de instructor.',
        badge: 'Instalación SSI Diamond ITC #720079 • Normas ISO 24801 y 24802',
        ctaText: 'Inscribirme en un Curso',
      },
      training: {
        title: 'Entrenamiento y Coaching de Apnea',
        subtitle: 'Boyas dedicadas con sistema de contrapeso en el Blue Hole, clínicas de ecualización, tablas dinámicas y análisis subacuático 4K.',
        badge: 'Base en el Blue Hole y Lighthouse Bay de Dahab',
        ctaText: 'Reservar Boya de Profundidad',
      },
      accommodation: {
        title: 'Alojamiento y Vida en el Santuario',
        subtitle: 'Sal de tu habitación directamente a las aguas turquesas de entrenamiento. Suites con vistas al mar, villas ecológicas e internet de fibra de alta velocidad.',
        badge: 'Sea Lodge • Bahía Lighthouse Dahab • Ideal para Nómadas Digitales',
        ctaText: 'Verificar Disponibilidad',
      },
      packages: {
        title: 'Paquetes de Experiencias y Residencias',
        subtitle: 'Inmersiones completas que integran cursos certificados SSI, entrenamiento guiado en el Blue Hole, alojamiento frente a la playa y safaris.',
        badge: 'Inmersiones Todo Incluido • De 7 a 28 Días',
        ctaText: 'Reservar Paquete',
      },
      calendar: {
        title: 'Calendario de Cursos y Expediciones',
        subtitle: 'Calendario en tiempo real con cursos programados, semanas de profundidad, clínicas y safaris en Dahab. Reserva tu plaza directamente.',
        badge: 'Calendario Temporada 2026 en Vivo • Reserva Inmediata',
        ctaText: 'Solicitar Fechas Personalizadas',
      },
      experience: {
        title: 'Expediciones y Safaris en el Mar Rojo',
        subtitle: 'Embárcate en expediciones en barco al Parque Nacional Ras Mohamed, el legendario arco del Blue Hole, apnea nocturna y cenas en el desierto.',
        badge: 'Expediciones al Santuario Marino del Mar Rojo',
        ctaText: 'Consultar por un Safari',
      },
      blog: {
        title: 'Diario y Archivo de Apnea',
        subtitle: 'Fisiología respiratoria, mecánica de ecualización profunda, comparativa de materiales y crónicas desde las profundidades del Mar Rojo.',
        badge: 'Archivo Profundo de Dahab',
        ctaText: 'Unirme a la Academia',
      },
      faq: {
        title: 'Preguntas Frecuentes y Logística',
        subtitle: 'Todo lo que necesitas saber sobre viajar a Dahab, cuestionarios médicos, requisitos para principiantes y normas de seguridad.',
        badge: 'Consejos Prácticos y Logística',
        ctaText: 'Consultar con un Instructor',
      },
    },
    testimonials: {
      eyebrow: 'VOCES DESDE EL AZUL',
      title: 'HISTORIAS Y TESTIMONIOS',
      subtitle: 'Desde practicantes en su primer día hasta atletas internacionales de 100m, descubre cómo las aguas de Dahab transformaron su relación con el aire y la profundidad.',
    },
    faqSection: {
      badge: 'CLARIDAD Y LOGÍSTICA',
      title: 'PREGUNTAS FRECUENTES',
      subtitle: 'Respuestas claras y directas sobre seguridad, equipamiento, requisitos médicos y consejos de viaje a Dahab.',
      moreQuestions: '¿Tienes alguna consulta específica?',
      contactSupport: 'Habla directamente con un instructor por WhatsApp',
    },
    footer: {
      desc: 'El centro premier de entrenamiento y formación de instructores SSI en Dahab, Egipto. Pioneros en relajación diafragmática, mecánica de ecualización y entrenamiento profundo en el Blue Hole desde 2002.',
      certifiedCenter: 'INSTALACIÓN SSI ITC #720079',
      allRightsReserved: 'Todos los derechos reservados. Formación Profesional de Apnea SSI.',
      academyCol: 'Cursos SSI',
      trainingCol: 'Entrenamiento y Boyas',
      sanctuaryCol: 'Santuario y Estancias',
      contactCol: 'Base Dahab y Contacto',
      backToTop: 'Volver Arriba',
    },
    booking: {
      modalTitle: 'Inicia Tu Viaje en la Apnea',
      modalSubtitle: 'Reserva directa y consulta personalizada con nuestro equipo de instructores senior en Dahab.',
      fullName: 'Nombre Completo',
      fullNamePlaceholder: 'ej. Carlos Mendoza',
      email: 'Correo Electrónico',
      emailPlaceholder: 'carlos@example.com',
      phone: 'Teléfono / WhatsApp (con prefijo)',
      phonePlaceholder: '+34 600 123 456',
      offering: 'Selecciona Curso, Entrenamiento o Paquete',
      dates: 'Fecha Estimada de Llegada',
      experienceLevel: 'Experiencia Actual en Apnea',
      expNone: 'Principiante Absoluto (Nunca he hecho apnea)',
      expL1: 'Certificado Nivel 1 (10m - 20m)',
      expL2: 'Nivel 2 / Avanzado (20m - 30m)',
      expMaster: 'Nivel 3 / Master Profundo (30m - 40m+)',
      notes: 'Objetivos de Ecualización, Solicitudes o Notas',
      notesPlaceholder: 'Cuéntanos sobre tu compensación, fechas preferidas o cualquier duda...',
      submit: 'Enviar Solicitud de Reserva',
      whatsappDirect: 'Chatear Inmediatamente por WhatsApp',
      close: 'Cerrar',
    },
    coursesSection: {
      badge: 'ACADEMIA OFICIAL SSI • SINAÍ DEL SUR',
      title: 'PRECISIÓN',
      titleHighlight: 'ACADÉMICA',
      subtitle: 'Currículo estructurado desde mecánica diafragmática inicial hasta Mouthfill de élite para +40m y examen internacional de instructores SSI.',
      tabCore: 'Niveles Principales',
      tabSpecialty: 'Clínicas Especializadas',
      tabInstructor: 'Instructor ITC',
      tabEqualisation: 'Compensación',
      tabTraining: 'Sesiones de Línea',
      enrollNow: 'Inscribirse en el Curso',
      viewCurriculum: 'Ver Plan de Estudios',
      duration: 'Duración',
      depth: 'Profundidad Máx.',
      days: 'Días',
      meters: 'Metros',
    },
    trainingSection: {
      badge: 'BASE BLUE HOLE Y LIGHTHOUSE DAHAB',
      title: 'ENTRENAMIENTO',
      titleHighlight: 'DE PROFUNDIDAD Y COACHING',
      subtitle: 'Boyas de profundidad con contrapeso dedicadas en el Blue Hole, clínicas de ecualización, y análisis de video subacuático 4K.',
      reserveBuoy: 'Reservar Boya de Profundidad',
      singleSession: 'Sesión Individual',
      pack5: 'Paquete de 5 Sesiones',
      pack10: 'Paquete de 10 Sesiones',
    },
  },

  // =========================================================================
  // GERMAN (Deutsch) - Precise, Authoritative, and Natural
  // =========================================================================
  de: {
    labels: {
      home: 'Startseite',
      courses: 'Kurse',
      training: 'Training',
      experience: 'Erlebnisse',
      accommodation: 'Unterkunft',
      packages: 'Pakete',
      calendar: 'Kalender',
      blog: 'Blog',
      faq: 'FAQ',
    },
    ui: {
      language: 'Sprache',
      currency: 'Währung',
      bookCta: 'Buchen / Anfragen',
      bookNow: 'Jetzt Buchen / Anfragen',
      sound: 'TON',
      mute: 'STUMM',
      exploreAll: 'Alles entdecken',
      quickBook: 'Schnellbuchung',
      mostPopular: 'Sehr beliebt',
      scheduled: 'Geplant',
      fullDay: 'Ganztägig',
      proAcademy: 'Pro Akademie',
      home: 'Startseite',
    },
    dropdowns: {
      home: {
        sanctuaryTitle: 'Übersicht des Tauchreviers',
        sanctuaryDesc: 'Entdecke das Blue Hole und Dahabs Freitauch-Heiligtum',
        heritageTitle: 'Dahabs Tradition Seit 2003',
        heritageDesc: 'Über 20 Jahre Tiefenausbildung und familiäre Gemeinschaft',
        reviewsTitle: 'Erfahrungsberichte & Bewertungen',
        reviewsDesc: 'Erfolgsgeschichten von Einsteigern bis hin zu 100m+ Athleten',
        startTitle: 'Beginne Deine Reise',
        startDesc: 'Kontaktiere noch heute unsere zertifizierten Tauchlehrer',
      },
      courses: {
        l1Title: 'SSI Level 1 Freediver (20m)',
        l1Desc: 'Der 3-tägige Grundkurs für Einsteiger ohne Vorkenntnisse',
        l2Title: 'SSI Level 2 Advanced (30m)',
        l2Desc: 'Freifall-Technik, Brustkorb-Entspannung und Frenzel-Druckausgleich',
        l3Title: 'SSI Level 3 Deep Master (40m+)',
        l3Desc: 'Tiefer Mouthfill, RV-Tauchgänge und mentale Tiefendisziplin',
        specialtyTitle: 'Spezialkurse & Workshops',
        specialtyDesc: 'Monoflosse, No-Fins, Variables Gewicht und Sicherung',
        itcTitle: 'SSI Instructor Course (ITC)',
        itcDesc: 'Werde zertifizierter internationaler SSI Freediving Instructor',
      },
      training: {
        buoyTitle: 'Gecoachte Tiefenbojen-Einheiten',
        buoyDesc: 'Tägliche Bojenleinen im Blue Hole mit professionellen Trainern',
        buddyTitle: 'Unabhängiges Buddy-Leinentraining',
        buddyDesc: 'Boje, Blei und Lanyard-Sicherung für zertifizierte Freitaucher',
        campTitle: 'Intensive Trainingswochen',
        campDesc: '7 Tage gezieltes Tiefencoaching mit detaillierter Videoanalyse',
        eqTitle: 'Druckausgleichs-Kliniken',
        eqDesc: 'Druckausgleichs-Blockaden lösen und Frenzel sicher beherrschen',
        apneaTitle: 'Trockenapnoe & Stretching',
        apneaDesc: 'Thorax-Beweglichkeit, Zwerchfell-Dehnung und Tiefenentspannung',
      },
      experience: {
        rasMohamedTitle: 'Ras Mohamed Nationalpark Safari',
        rasMohamedDesc: 'Weltberühmte Steilwände und beeindruckende Großfischbegegnungen',
        blueHoleTitle: 'Blue Hole & Canyon Safaris',
        blueHoleDesc: 'Geführte Rifferkundungen an Dahabs legendären Tauchplätzen',
        nightTitle: 'Nachtapnoe & Biolumineszenz',
        nightDesc: 'Gleite durch magisch leuchtendes Plankton unter dem Sternenhimmel',
        desertTitle: 'Sternenbeobachtung & Beduinen-Abendessen',
        desertDesc: 'Magische, ruhige Abende in den Bergen des Sinai',
      },
      accommodation: {
        seafrontTitle: 'Zimmer Direkt Am Meer',
        seafrontDesc: 'Nur wenige Schritte vom Wasser in der Lighthouse Bay',
        ecoTitle: 'Taucher-Eco-Lodge & Hütten',
        ecoDesc: 'Ruhige, preiswerte Zimmer perfekt für Freitaucher',
        suitesTitle: 'Private Suiten & Apartments',
        suitesDesc: 'Großzügige Strandunterkünfte mit Küche und Meerblick-Terrasse',
      },
      packages: {
        zeroToHeroTitle: 'Zero-to-Hero Komplettpaket',
        zeroToHeroDesc: '4 bis 6 Wochen vom Einsteiger bis zum 40m+ Master-Freitaucher',
        safariCampTitle: 'Tiefen- & Safari-Expedition',
        safariCampDesc: 'Kombiniert Blue Hole Training mit Bootssafaris im Roten Meer',
        customTitle: 'Individuelle Privatreisen & Gruppen',
        customDesc: 'Maßgeschneiderte Programme für Freunde, Vereine oder Paare',
      },
      calendar: {
        itcTitle: 'März 2026 - SSI Tauchlehrer-Kurs',
        itcDesc: '10 Tage intensive Ausbildung zum internationalen Freitauchlehrer',
        safariTitle: 'April 2026 - Tauchsafari-Schiff',
        safariDesc: '7 Nächte an den tiefsten Riffen und Wracks des Roten Meeres',
        campTitle: 'Herbst-Tiefentrainingscamp 2026',
        campDesc: 'Leistungsorientierte Tiefenwoche im Oktober',
        fullCalendarTitle: 'Kompletten Jahresplan 2026 ansehen',
        fullCalendarDesc: 'Alle festen Termine, Spezialkurse und offenen Plätze',
      },
      blog: {
        blueHoleGuideTitle: 'Der Komplette Blue Hole Führer',
        blueHoleGuideDesc: 'Wetterbedingungen, Wassertemperaturen und Packliste für Dahab',
        eqGuideTitle: 'Frenzel-Druckausgleich Meistern',
        eqGuideDesc: 'Schritt-für-Schritt Übungen für Tiefen jenseits von 20 Metern',
        packingTitle: 'Packliste für Deine Dahab-Reise',
        packingDesc: 'Neoprenstärke, Reiseflossen, Blei und essenzielle Ausrüstung',
        safetyTitle: 'Ozeansicherheit & Buddy-Protokolle',
        safetyDesc: 'Gegenballast-Systeme und Lanyards für maximale Sicherheit',
      },
      faq: {
        beginnersTitle: 'Voraussetzungen für Einsteiger',
        beginnersDesc: 'Brauche ich Vorerfahrung oder überragende Schwimmfitness?',
        medicalTitle: 'Ärztliche Tauchtauglichkeit & Sicherheit',
        medicalDesc: 'RSTC-Fragebogen, Asthma und Gehörgangs-Druckausgleich',
        gearTitle: 'Ausrüstungsverleih & Größen',
        gearDesc: 'Masken, lange Carbonflossen, Anzüge und Tauchcomputer inklusive',
        travelTitle: 'Anreise nach Dahab, Visum & Transfers',
        travelDesc: 'Transfers vom Flughafen Sharm El Sheikh und Einreisebestimmungen',
      },
    },
    hero: {
      locationEyebrow: 'DAHAB · ROTES MEER · FREITAUCHEN SEIT 2003',
      line1: 'ERSTE FREEDIVING CENTER IN DAHAB — SEIT 2003',
      line2: 'ERSTES SSI INSTRUCTOR TRAINING CENTER DER WELT — SEIT 2010',
      leadTitle: 'Du musst kein Tieftaucher sein, um zu beginnen.',
      leadDesc: 'Starte mit einem ruhigen Atemzug in Dahabs geschützten Buchten. Entwickle dich mit Vertrauen in deinem natürlichen Tempo.',
      oneBreath: 'Ein Atemzug',
      oneBreathDesc: 'Mühelose Entspannung und innere Ruhe',
      calmWaters: 'Ruhiges Wasser',
      calmWatersDesc: 'Warmes, kristallklares Wasser im Roten Meer',
      safety100: '100% Sicherheit',
      safety100Desc: 'International zertifizierte SSI-Tauchlehrer',
      exploreCourses: 'Kurse Entdecken',
      bookInquireNow: 'Jetzt Buchen / Anfragen',
      phase2Title: 'DEIN ZUFLUCHTSORT IN DAHAB',
      phase2Sub: 'Das Blue Hole & die Lighthouse Bay',
      phase2Desc: 'Von deinem ersten 5-Meter-Abstieg bis zu Tiefen über 100 Meter. Erlebe erstklassige Bojenleinen, Gegenballast-Sicherheit und persönliches Coaching.',
      viewTraining: 'Trainingsprogramme ansehen',
      exploreStay: 'Unterkünfte entdecken',
      depthSurface: 'OBERFLÄCHE',
      depth15m: '15M',
      depth30m: '30M+',
    },
    intro: {
      tagline: 'Die Reise zu deinem tieferen Ich beginnt mit einem einzigen Atemzug.',
      enter: 'Klicke irgendwo, um abzutauchen',
    },
    descentStats: {
      eyebrow: 'Seit 2003 · Die erste Freediving-Schule in Dahab',
      title: 'TIEFE',
      titleHighlight: 'IN ZAHLEN',
      s1Label: 'Jahre in Dahab',
      s1Desc: 'Freediving-Pionier am Lighthouse-Riff seit 2002.',
      s2Label: 'Kurse & Programme',
      s2Desc: 'Vom Try Freediving bis zum internationalen Instructor ITC.',
      s3Label: 'Ausbildete Instructors',
      s3Desc: 'Unterrichten heute in über 35 Ländern weltweit.',
      s4Label: 'Zertifizierte Freediver',
      s4Desc: 'Mit 100 % individueller Betreuung und persönlichen Meilensteinen.',
      s5Label: 'Sicherheitsbilanz',
      s5Desc: '24 Jahre ohne Dekompressionsunfälle an unseren Leinen.',
      s6Label: 'Tiefster Sanctuary-Tauchgang',
      s6Desc: 'Blue-Hole-Zugang mit täglichen privaten Trainingsleinen in Dahab.',
    },
    courseChapters: {
      system: 'Das SSI-System',
      core: 'Kernkurse',
      try: 'Spezialkurse',
      pro: 'Master & Pro',
      numbersEyebrow: 'Wie tief dich jeder Kurs bringt',
      ratioLabel: 'Max. Schüler pro Instructor',
      countriesLabel: 'Länder erkennen SSI an',
    },
    certificates: {
      badge: 'SSI Offizieller Partner • Zentrum #720079 • ISO 24801 & 24802',
      title: 'Der internationale Goldstandard der Freitauchausbildung',
      subtitle: 'Eine von SSI autorisierte Freediving School im Herzen von Dahab — Instructor Trainer, professionelle Gegenballast-Bojen und 100% Sicherheitsbilanz seit 2003.',
      card1Title: 'SSI Freediving Center',
      card1Desc: 'Offizieller SSI-Partner — zertifizierte Tauchlehrer, Tiefenbojen und weltweiter Ausbildungsstandard.',
      card2Title: 'SSI Mermaid Center',
      card2Desc: 'Offizieller SSI-Partner — bezaubernde Mermaid-Programme, Monoflossentechnik und Unterwasserartistik für jedes Alter.',
      card3Title: 'SSI Freediving Instructor Training Center',
      card3Desc: 'Offizieller SSI-Partner — unsere Pro-Akademie bildet die nächste Generation von Freitauchlehrern aus und zertifiziert sie.',
      verifyBtn: 'Center-Status Prüfen',
      bookBtn: 'Für Zertifikatskurs Anmelden',
    },
    story: {
      eyebrow: 'DIE FREITAUCH-PHILOSOPHIE • DAHAB SANCTUARY',
      quote: 'Stille ist nicht die Abwesenheit von Klang, sondern die Gegenwart von Tiefe.',
      quoteAuthor: 'SSI ITC Ausbildungszentrum & Tradition',
      established: 'GEGRÜNDET 2003 • DAHAB',
      subheading: 'Reine Tiefe & Meditative Kontrolle',
      titleLine1: 'JENSEITS DER',
      titleLine2: 'OBERFLÄCHE.',
      desc1: 'Freitauchen ist kein Adrenalinsport; es ist eine innere Symphonie der Stille. In der geschützten Wärme der Lighthouse Bay und am vertikalen Abgrund des legendären Blue Hole kultivieren wir die feine Kunst des Atems, die Physiologie des Druckausgleichs und die erhabene Ruhe der Unterwasserwelt.',
      desc2: 'Unsere Lehrmethode verzichtet auf aggressiven Leistungsdruck. Stattdessen vermitteln wir die biologischen Geheimnisse des Tauchreflexes, die Gaumensegel-Isolation und die Zwerchfellentspannung. Egal ob dein erster Kurs auf 20 Meter führt oder du zum SSI Instructor ausgebildet wirst: Jeder Tauchgang wird chirurgisch präzise gesichert.',
      ratioTitle: 'Maximal 3:1 Betreuungsschlüssel',
      ratioDesc: 'Wir bilden keine Massen ab. Maximal 3 Schüler pro Lehrer garantieren individuelle Sicherheit und detaillierte Videoanalysen.',
      itcTitle: 'SSI Instructor Training Center',
      itcDesc: 'Über 450 professionelle Tauchlehrer seit 2003 ausgebildet. International anerkannt als Ägyptens führende SSI-Instruktoren-Akademie.',
      ctaCourses: 'UNSERE KURSE ENTDECKEN',
      ctaRetreat: 'INDIVIDUELLE ANFRAGE',
      statsSectionTitle: '24 JAHRE ERFAHRUNG IN DER FORMUNG',
      statsSectionTitleAccent: 'SELBSTBEWUSSTER FREITAUCHER',
      statsSectionDesc: 'Südsinais führendes SSI Instructor Training Center direkt an der Strandpromenade. Basierend auf kompromissloser Sicherheit, Druckausgleichswissenschaft und lebensverändernden Momenten.',
      stat1Label: 'Jahre in Dahab',
      stat2Label: 'Zertifizierte Freitaucher',
      stat3Label: 'Sicherheitsbilanz',
      stat4Label: 'Tiefster Tauchgang',
    },
    portal: {
      eyebrow: 'SANCTUARY DIMENSIONEN',
      title: 'ENTDECKE JEDE DIMENSION',
      subtitle: 'Von Einsteigerkursen bis hin zu gecoachtem 40m+ Leinentraining, Unterkünften direkt am Meer und Wüstensafaris am Roten Meer.',
      exploreButton: 'Bereich Erkunden',
      courses: {
        title: 'SSI Freitauchkurse',
        tag: 'Level 1 bis Instructor',
        desc: 'International anerkannte Zertifikate vom ersten Tiefentauchgang bis zur professionellen Diamond ITC Akademie.',
      },
      training: {
        title: 'Freitauch-Tiefentraining',
        tag: 'Blue Hole Leinen & EQ Labor',
        desc: 'Gegenballast-Bojen, Frenzel- und Mouthfill-Kliniken, Pool-Tabellen und 1-zu-1 4K-Videoanalyse.',
      },
      accommodation: {
        title: 'Sanctuary Unterkünfte',
        tag: 'Suiten & Villen am Meer',
        desc: 'Erholungs-Suiten direkt am Wasser, Wüstengarten-Villen, Trockenräume für Tauchausrüstung und Yoga-Shala.',
      },
      packages: {
        title: 'Erlebnispakete & Camps',
        tag: 'All-Inclusive Expeditionen',
        desc: 'Kuratiertes 7- bis 28-Tage-Retreat mit Tiefentraining, Kamelsafaris, Unterkunft und Leihmaterial.',
      },
      calendar: {
        title: 'Jahreskalender 2026',
        tag: 'Live Saisonplan',
        desc: 'Erfahre alle bevorstehenden Expeditionstermine, Spezialkurse und sichere dir deinen Platz im Voraus.',
      },
      experience: {
        title: 'Erlebnisse & Safaris',
        tag: 'Rotes Meer Expeditionen',
        desc: 'Ras Mohamed Steilwände, Blue Hole Bogen-Safaris, Nachtapnoe mit Biolumineszenz und Beduinen-Camps.',
      },
    },
    pageHeaders: {
      courses: {
        title: 'SSI Freitauchkurse & Zertifizierungen',
        subtitle: 'Strukturierte internationale Ausbildung von Zwerchfellmechanik und Pooltechnik bis hin zu 40m+ Mouthfill und professioneller SSI-Tauchlehrerprüfung.',
        badge: 'SSI Diamond ITC Tauchbasis #720079 • ISO 24801 & 24802',
        ctaText: 'Jetzt für Kurs Anmelden',
      },
      training: {
        title: 'Freitauch-Training & Tiefencoaching',
        subtitle: 'Eigene Gegenballast-Tiefenbojen am Blue Hole, gezielte Druckausgleichskliniken, Tabellen und individuelle 4K-Unterwasservideoanalysen.',
        badge: 'Basis am Dahab Blue Hole & in der Lighthouse Bay',
        ctaText: 'Tiefenboje Reservieren',
      },
      accommodation: {
        title: 'Sanctuary Unterkünfte & Wohnen',
        subtitle: 'Tritt von deinem Zimmer direkt in die türkisblaue Trainingsbucht. Suiten am Meer, Eco-Villen und Highspeed-Glasfaser-Internet.',
        badge: 'Sea Lodge • Lighthouse Bay Dahab • Ideal für Digital Nomads',
        ctaText: 'Verfügbarkeit Prüfen',
      },
      packages: {
        title: 'Expeditionen & All-Inclusive Pakete',
        subtitle: 'Komplettpakete aus zertifizierten SSI-Kursen, gecoachtem Blue Hole Leinentraining, Strandunterkunft und Safaris.',
        badge: 'All-Inclusive Immersions • 7 bis 28 Tage',
        ctaText: 'Paket Buchen',
      },
      calendar: {
        title: 'Expeditions- und Kurskalender',
        subtitle: 'Live-Terminübersicht für SSI-Kurse, Tiefencamps, Druckausgleichs-Workshops und Wüstensafaris. Sichere dir deinen Platz direkt.',
        badge: 'Live Saisonplan 2026 • Sofortige Platzreservierung',
        ctaText: 'Wunschtermin Anfragen',
      },
      experience: {
        title: 'Rotes Meer Expeditionen & Safaris',
        subtitle: 'Erlebe Bootsausflüge in den Ras Mohamed Nationalpark, Tauchgänge am legendären Blue Hole Bogen, Nachtapnoe und Wüstencamps.',
        badge: 'Meeresschutzgebiet-Expeditionen am Roten Meer',
        ctaText: 'Safari Anfragen',
      },
      blog: {
        title: 'Freitauch-Journal & Wissensarchiv',
        subtitle: 'Physiologie, tiefe Druckausgleichsmechanik, Ausrüstungsberichte und Neuigkeiten aus den Tiefen des Roten Meeres.',
        badge: 'Dahab Deep Archive',
        ctaText: 'Der Akademie Beitreten',
      },
      faq: {
        title: 'Häufig Gestellte Fragen & Logistik',
        subtitle: 'Alles Wissenswerte über deine Reise nach Dahab, ärztliche Tauchtauglichkeit, Einstiegsvoraussetzungen und Sicherheitsstandards.',
        badge: 'Praktische Ratschläge & Reisehinweise',
        ctaText: 'Einen Tauchlehrer Fragen',
      },
    },
    testimonials: {
      eyebrow: 'STIMMEN AUS DER TIEFE',
      title: 'ERFAHRUNGEN & ERFOLGSGESCHICHTEN',
      subtitle: 'Von absoluten Einsteigern bis hin zu 100m-Wettkampfathleten: Erfahre, wie Dahabs Gewässer ihre Beziehung zum Atem verändert haben.',
    },
    faqSection: {
      badge: 'KLARHEIT & LOGISTIK',
      title: 'HÄUFIG GESTELLTE FRAGEN',
      subtitle: 'Transparente Antworten zu Sicherheit, Ausrüstung, medizinischen Voraussetzungen und Anreise nach Dahab.',
      moreQuestions: 'Hast du noch spezielle Fragen?',
      contactSupport: 'Direkt mit einem Tauchlehrer auf WhatsApp schreiben',
    },
    footer: {
      desc: 'Das führende Freitauch-Ausbildungszentrum und SSI Instructor Training Center in Dahab, Ägypten. Pioniere für Zwerchfellentspannung, Druckausgleichsmechanik und Leinentraining am Blue Hole seit 2002.',
      certifiedCenter: 'SSI ITC BASIS #720079',
      allRightsReserved: 'Alle Rechte vorbehalten. Professionelle SSI Freitauchausbildung.',
      academyCol: 'SSI Kurse',
      trainingCol: 'Training & Bojen',
      sanctuaryCol: 'Sanctuary & Wohnen',
      contactCol: 'Dahab Basis & Kontakt',
      backToTop: 'Nach Oben',
    },
    booking: {
      modalTitle: 'Starte Deine Freitauch-Reise',
      modalSubtitle: 'Direkte Buchung und persönliche Beratung durch unser Senior-Tauchlehrer-Team in Dahab.',
      fullName: 'Dein Vollständiger Name',
      fullNamePlaceholder: 'z.B. Markus Weber',
      email: 'E-Mail-Adresse',
      emailPlaceholder: 'markus@example.com',
      phone: 'WhatsApp / Telefon (mit Ländervorwahl)',
      phonePlaceholder: '+49 170 1234567',
      offering: 'Kurs, Training oder Paket Auswählen',
      dates: 'Voraussichtliches Anreisedatum',
      experienceLevel: 'Aktuelle Freitauch-Erfahrung',
      expNone: 'Absoluter Anfänger (Noch nie freigewandert)',
      expL1: 'Level 1 Zertifiziert (10m - 20m)',
      expL2: 'Level 2 / Fortgeschritten (20m - 30m)',
      expMaster: 'Level 3 / Deep Master (30m - 40m+)',
      notes: 'Besondere Wünsche, Druckausgleichs-Ziele oder Fragen',
      notesPlaceholder: 'Erzähle uns über deine Druckausgleichserfahrung, Wunschtermine oder Fragen...',
      submit: 'Reservierungsanfrage Senden',
      whatsappDirect: 'Direkt per WhatsApp Chatten',
      close: 'Schließen',
    },
    coursesSection: {
      badge: 'OFFIZIELLE SSI AKADEMIE • SÜD-SINAI',
      title: 'AKADEMISCHE',
      titleHighlight: 'PRÄZISION',
      subtitle: 'Strukturierter internationaler Lehrplan von Zwerchfell-Mechanik bis zu Elite-Mouthfill auf über 40m und internationale SSI-Tauchlehrer-Prüfungen.',
      tabCore: 'Grundstufen',
      tabSpecialty: 'Spezialkurse',
      tabInstructor: 'Tauchlehrer ITC',
      tabEqualisation: 'Druckausgleich',
      tabTraining: 'Leinensessions',
      enrollNow: 'Jetzt Einschreiben',
      viewCurriculum: 'Lehrplan Ansehen',
      duration: 'Dauer',
      depth: 'Max. Tiefe',
      days: 'Tage',
      meters: 'Meter',
    },
    trainingSection: {
      badge: 'DAHAB BLUE HOLE & LIGHTHOUSE BASIS',
      title: 'TIEFEN',
      titleHighlight: 'TRAINING & COACHING',
      subtitle: 'Spezielle Tiefenbojen mit Gegengewichtssystem am Blue Hole, Frenzel- und Mouthfill-Kliniken und 4K-Unterwasservideo-Analyse.',
      reserveBuoy: 'Tiefenboje Reservieren',
      singleSession: 'Einzelsession',
      pack5: '5er-Karten-Paket',
      pack10: '10er-Karten-Paket',
    },
  },
};

export const NAV_TRANSLATIONS = TRANSLATIONS;
