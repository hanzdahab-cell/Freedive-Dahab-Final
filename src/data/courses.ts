import { Course, TrainingPricingRow, SpecialtyCourse, InstructorCourse, EqualisationClass } from '../types';

export const ssiCourses: Course[] = [
  {
    id: "ssi-basic-freediver",
    slug: "ssi-basic-freediver",
    title: "SSI Basic Freediver",
    subtitle: "Your very first breath-hold experience — one gentle day",
    level: "Beginner",
    tier: 1,
    certification: "SSI Basic Freediver",
    durationDays: 1,
    priceEur: 150,
    maxDepthMeters: 5,
    prerequisites: "Swimming ability (100m), minimum age 10, signed medical questionnaire.",
    overview: "The perfect taste of freediving with zero pressure and full safety. In one relaxed day you will learn the fundamental breathing cycle, duck-dive mechanics, mask equalisation, and static apnea in the pool before trying your first calm dives in the shallow Lighthouse Bay.",
    highlights: [
      "One-day introduction — no certification prerequisites",
      "Pool static apnea and relaxation foundations",
      "First duck dives in the sheltered Lighthouse Bay",
      "Full equipment provided and SSI digital materials"
    ],
    included: [
      "All freediving equipment (wetsuit, mask, snorkel, bi-fins, weights)",
      "SSI Basic Freediver digital recognition card",
      "Breathing and relaxation mini-workshop",
      "Underwater photos of your first dives"
    ],
    scheduleSummary: "1 Day: Morning theory & breathing, pool session, afternoon shallow bay dives and debrief.",
    image: {
      url: "/courses/basic-freediver.jpg",
      alt: "SSI Basic Freediver course — freediver ascending with open hand toward the surface light"
    }
  },
  {
    id: "ssi-level-1",
    slug: "ssi-freediver-level-1",
    title: "SSI Freediver",
    subtitle: "Your initiation into depth and diaphragmatic calm",
    level: "Beginner",
    tier: 1,
    certification: "SSI Freediver International License",
    durationDays: 2.5,
    priceEur: 310,
    maxDepthMeters: 20,
    prerequisites: "Comfortable swimming 200m non-stop, minimum age 12, standard medical clearance.",
    overview: "Step into the silent world directly from our beachfront on Lighthouse Bay — no boat needed. As a certified SSI Freediving School, we teach you the science and art of breath-holding: the mammalian dive reflex that slows your heart rate, shifts blood toward your vital organs, and turns deep relaxation into your superpower. Freediving is a form of meditation — easy to learn, no fitness abilities required. You will feel like floating in space.",
    highlights: [
      "Freedive comfortably to 10–20 meters",
      "2–3 minute static breath-hold on your first tries",
      "Shore entry — dive line 100m from the school",
      "Warm, clear, calm water all year long",
      "Max student-to-instructor ratio of 3:1"
    ],
    included: [
      "SSI Standard Digital Manual (all languages)",
      "Digital SSI International Certification",
      "All freediving equipment (wetsuit, mask, snorkel, long fins, weights)",
      "Underwater photos of your first descents"
    ],
    scheduleSummary: "2.5 days (9am–4pm): breathing & theory mornings, water sessions, final exam on the last morning.",
    futurePerformances: {
      staticApnea: "2–3 min",
      depth: "10–20 m"
    },
    disciplines: [
      {
        name: "Theory & Breathing",
        tagline: "Trigger your inner dolphin",
        description: "Learn how the mammalian dive reflex works and how to train it: your heart rate slows, relaxation deepens, and blood shifts away from arms and legs to feed vital organs. Holding your breath becomes 100 times easier.",
        sessions: "1 breathing & relaxation session"
      },
      {
        name: "Static Apnea",
        tagline: "Stillness is the first skill",
        description: "Before moving, learn to hold your breath without movement — it's easier. With proper technique you could already hold 2–3 minutes on your very first try, sitting calm at the surface.",
        sessions: "1 static session"
      },
      {
        name: "Dynamic Apnea",
        tagline: "Distance before depth",
        description: "In the pool or the clear shallow bay: swim 30–40m horizontally and you can freedive 15–20m vertically — the exact same distance. The best discipline to learn finning, body position, safety skills and your long fins.",
        sessions: "2 dynamic sessions"
      },
      {
        name: "Depth Training",
        tagline: "The vertical line",
        description: "This is where it all comes together. Your instructor sets a vertical dive-line with a surface buoy in the bay as your visual reference and safety device — a little deeper on every try, technique corrected for maximum efficiency.",
        sessions: "3 open water sessions"
      }
    ],
    schedule: [
      {
        day: "Day 1",
        title: "Breathing & First Water",
        description: "1-hour breathing and relaxation class, dry breath-hold, first confined water session (60–90 min), lunch break, theory, then your first open water session."
      },
      {
        day: "Day 2",
        title: "Duck Dives & Deeper",
        description: "More theory followed by a second confined water session to learn duck diving. After lunch: the second open water session."
      },
      {
        day: "Day 3",
        title: "Final Exam & Wrap-up",
        description: "Half day: morning training session, final exam, and wrap-up around 12:00 — certified and ready for the ocean."
      }
    ],
    image: {
      url: "/courses/freediving-level-1.jpg",
      alt: "SSI Freediver Level 1 — freediver gliding weightlessly over a vivid Red Sea coral reef"
    }
  },
  {
    id: "ssi-level-2",
    slug: "ssi-advanced-freediver-level-2",
    title: "SSI Advanced Freediver",
    subtitle: "Mastering freefall, thoracic flexibility, and deep calm",
    level: "Intermediate",
    tier: 2,
    certification: "SSI Advanced Freediver",
    durationDays: 3,
    priceEur: 350,
    maxDepthMeters: 30,
    prerequisites: "SSI Level 1 or equivalent certification (AIDA 2 / PADI Freediver), comfortable at 16-20m.",
    overview: "Around 15–20 meters your body loses its buoyancy and gravity takes over — we call it the FREEFALL, the main skill of this course. Freedivers describe it as flying underwater or floating in space. You will also master Frenzel equalisation — instead of pushing air up with your belly, your tongue becomes a piston sending air into your ears — one of the most efficient and powerful techniques in the sport. And you will learn to stretch your ribcage, lungs and diaphragm to hold your breath longer and feel far more comfortable at depth.",
    highlights: [
      "Comfortable freedives to 25–30 meters",
      "3–4 minute static breath-hold",
      "Master the FREEFALL — flying underwater",
      "Frenzel equalisation, finally done right",
      "Ribcage, lung & diaphragm stretching workshops"
    ],
    included: [
      "SSI Standard Digital Manual (all languages)",
      "Digital SSI International Certification",
      "All depth equipment + long fins trial",
      "Training at Lighthouse Bay and the iconic Blue Hole"
    ],
    scheduleSummary: "3 days (9am–4pm): theory + static + CO2 tables in confined water, two deep open water sessions, final exam.",
    futurePerformances: {
      staticApnea: "3–4 min",
      depth: "25–30 m"
    },
    disciplines: [
      {
        name: "Freefall",
        tagline: "Gravity becomes your engine",
        description: "Learn to add just the right weight and enter the freefall shallow, where you feel comfortable — then carry it into your deeper dives. It saves enormous oxygen and makes the descent incredibly easier.",
        sessions: "All open water sessions"
      },
      {
        name: "Frenzel Equalisation",
        tagline: "Your tongue is the piston",
        description: "If you ever experienced ear pain after freediving or have to lift your head up every time you equalise, you must learn Frenzel. Simple to learn, oxygen-saving, and the gateway to every deeper depth.",
        sessions: "Daily clinics"
      },
      {
        name: "Static & CO2 Tables",
        tagline: "Make friends with contractions",
        description: "CO2 builds up, acidifies your blood, and speaks to you first as warmth in the lungs, then as diaphragm spasms — contractions. It is easy to train, physically and mentally, to cope with those signals calmly.",
        sessions: "1 static + table session"
      },
      {
        name: "Dynamic & Weighting",
        tagline: "Neutral buoyancy mastery",
        description: "Weighting, finning, streamlining and speed in confined water. When you find your neutral buoyancy, your body stays in mid-water without floating up or sinking down — vital for every deep dive.",
        sessions: "1 confined water session"
      }
    ],
    schedule: [
      {
        day: "Day 1",
        title: "Breathe-up & Buoyancy",
        description: "Breathing and breathe-up review, training-methods theory, static session with debriefing. After lunch: first open water session on buoyancy and free falling."
      },
      {
        day: "Day 2",
        title: "Frenzel & CO2 Tables",
        description: "Theory followed by CO2 tables dynamic in confined water. Second open water session: keep practicing free falling and learn Frenzel equalisation."
      },
      {
        day: "Day 3",
        title: "Deep Freefall & Exam",
        description: "Two open water sessions — morning and afternoon — with theory and exam in the break. Debriefing, wrap-up and celebration photos at the end of the day."
      }
    ],
    image: {
      url: "/courses/advanced-freediver-level-2.jpg",
      alt: "SSI Advanced Freediver — diver finning over shallow reef rocks in turquoise water"
    }
  },
  {
    id: "ssi-level-3",
    slug: "ssi-performance-freediver-level-3",
    title: "SSI Performance Freediver",
    subtitle: "The threshold of elite depth: Mouthfill and 40 meters",
    level: "Advanced",
    tier: 2,
    certification: "SSI Performance Freediver (Master Diver prerequisite)",
    durationDays: 4,
    priceEur: 475,
    maxDepthMeters: 40,
    prerequisites: "SSI Advanced Freediver or equivalent, 30m logged depth, React Right (or valid First Aid/CPR).",
    overview: "At around 30–40m your lungs reach residual volume — too compressed to push air up, and equalisation runs out. Sooner or later, almost everybody needs the legendary Mouthfill technique: the most talked-about skill in freediving, and far simpler than its reputation when broken into steps and trained both dry and in the water. Alongside it you will learn FRC exhale-diving, static coaching, dieting and mental preparation — this course gives you every tool needed to reach much greater depth.",
    highlights: [
      "Comfortable freedives to 35–40 meters",
      "4–5 minute static breath-hold",
      "Learn the legendary Mouthfill technique, step by step",
      "FRC exhale-diving — simulate a 30m dive in 10m",
      "Buddy & static coaching skills under Performance Instructors"
    ],
    included: [
      "SSI Standard Digital Manual (all languages)",
      "Digital SSI International Certification",
      "All depth line logistics + counterweight system",
      "Mouthfill & FRC dry-training tools",
      "HD video analysis of your deep dives"
    ],
    scheduleSummary: "4 days (9am–4pm): dry mouthfill masterclasses, FRC sessions, full-lung deep dives, max-attempt planning and final exam.",
    futurePerformances: {
      staticApnea: "4–5 min",
      depth: "35–40 m"
    },
    disciplines: [
      {
        name: "Mouthfill Equalisation",
        tagline: "Air for the deep",
        description: "Charge your mouth at 15–20m, then use your cheeks and tongue as a piston all the way down past residual volume. Practiced dry and in water until it becomes second nature.",
        sessions: "Daily masterclasses"
      },
      {
        name: "FRC Diving",
        tagline: "Simulate depth without going deep",
        description: "A passive exhale on the surface puts your lungs at neutral pressure — on FRC dives you simulate a 30m dive in 10 meters. The easiest, most convenient and safest way to train mouthfill, bloodshift and bradycardia.",
        sessions: "First 2 days"
      },
      {
        name: "Static Coaching",
        tagline: "50% of freediving is for your buddy",
        description: "Learn to coach other freedivers in static: motivate them to stay down longer and make sure they come up in time — and understand your own limits better while staying safe.",
        sessions: "1 coaching session"
      },
      {
        name: "Session Planning",
        tagline: "Think like a performance diver",
        description: "Plan and execute a real dynamic max-attempt session with your buddies: land preparation, warm-up timing, who gets cold first, who takes safety — executed together under our Performance Instructors.",
        sessions: "1 full session"
      }
    ],
    schedule: [
      {
        day: "Day 1",
        title: "Mouthfill Foundations",
        description: "Theory and dry mouthfill practice, then your first FRC sessions using mouthfill only — shallow dives from the surface to 10–20 meters."
      },
      {
        day: "Day 2",
        title: "FRC Adaptation",
        description: "Deeper FRC diving as your body adapts to pressure — bloodshift, bradycardia and spleen effect get stronger with every exhale dive. Static coaching session in between."
      },
      {
        day: "Day 3",
        title: "Full-Lung Deep Dives",
        description: "With the mouthfill mastered on FRC, you progress to full-lung dives — increasing your depth limits with ease during the remaining open water sessions."
      },
      {
        day: "Day 4",
        title: "Max Attempts & Exam",
        description: "Final open water session with planned max attempts, dynamic session planning with your buddies, theory exam and wrap-up."
      }
    ],
    image: {
      url: "/courses/performance-freediver-level-3.jpg",
      alt: "SSI Performance Freediver — monofin diver gliding through a shimmering bait ball in the deep blue"
    }
  }
];

export const trainingSessionsPricing: TrainingPricingRow[] = [
  {
    location: "Lighthouse Bay (Home Reef)",
    description: "Steps from our dive center terrace. Protected bay with calm waters, 0–45m depth right off the shore, no boat needed.",
    depthRange: "0m – 45m",
    singleSessionEur: 35,
    fivePackEur: 155,
    tenPackEur: 280,
    coachingPrivateAddonEur: 25,
    includesTransport: true,
    includesBuoyAndWeights: true,
    notes: "Ideal for daily consistency, equalisation fine-tuning, and relaxed technique work."
  },
  {
    location: "The Blue Hole (Depth Mecca)",
    description: "The world's freediving sanctuary. 92m vertical drop directly off the reef wall, zero current, 40m+ visibility, equipped with professional counterweights.",
    depthRange: "0m – 92m+",
    singleSessionEur: 50,
    fivePackEur: 220,
    tenPackEur: 390,
    coachingPrivateAddonEur: 30,
    includesTransport: true,
    includesBuoyAndWeights: true,
    notes: "Includes air-conditioned 4x4 return transfer from our center and National Park entrance coordination."
  }
];

export const specialtyCourses: SpecialtyCourse[] = [
  {
    id: "spec-advanced-pool",
    slug: "advanced-pool-freediver",
    title: "SSI Advanced Pool Freediver",
    shortDesc: "Refine dynamic apnea in the pool: longer DYN, cleaner turns, and efficient DNF technique.",
    durationDays: 2,
    priceEur: 190,
    prerequisites: "SSI Basic Freediver or Level 1 (or equivalent pool experience).",
    keySkills: [
      "Dynamic apnea (DYN) biomechanics over 50m+",
      "Streamlined push-offs and wall turn technique",
      "No-fins dynamics (DNF) coordination",
      "CO2 tolerance and recovery breathing drills"
    ],
    fullDesc: "The pool is the laboratory of freediving. Over two focused sessions in our Olympic pool you will extend your dynamic distance with cleaner hydrodynamics, master the energy-saving wall turn, and develop graceful no-fins dynamics — all under strict buddy-supervision protocols.",
    image: {
      url: "/courses/advanced-pool-freediver.jpg",
      alt: "SSI Advanced Pool Freediver — diver gliding weightlessly through sunlit pool water"
    },
    featured: true
  },
  {
    id: "spec-performance-pool",
    slug: "performance-pool-freediver",
    title: "SSI Performance Pool Freediver",
    shortDesc: "Competition-grade static and dynamic performance training with video analysis.",
    durationDays: 2,
    priceEur: 210,
    prerequisites: "Advanced Pool Freediver or SSI Level 1 with solid pool comfort.",
    keySkills: [
      "Static apnea (STA) progression toward 3:00+",
      "Monofin sprint and long-glide dynamics",
      "Warm-up and peak-performance table architecture",
      "Official-top protocol and white-card discipline"
    ],
    fullDesc: "Built for divers chasing numbers. Personalized performance tables, official-protocol rehearsals, and frame-by-frame video analysis push your static and dynamic limits safely — the exact methodology our athletes use before national competitions.",
    image: {
      url: "/courses/performance-pool-freediver.jpg",
      alt: "SSI Performance Pool Freediver — swimmer streamlined along the lane rope in crystal pool"
    }
  },
  {
    id: "spec-photo",
    slug: "underwater-photography",
    title: "Underwater Photography for Freedivers",
    shortDesc: "Master natural light, breath-hold stability, diver positioning, and camera settings in Dahab's legendary water clarity.",
    durationDays: 2,
    priceEur: 220,
    prerequisites: "SSI Level 1 or equivalent freediving certification.",
    keySkills: [
      "Buoyancy and zero-movement breath-hold framing",
      "Utilizing Dahab's caustic light rays and water refraction",
      "Directing your dive buddy/model underwater",
      "Lightroom color correction for blue-spectrum water"
    ],
    fullDesc: "Freediving photography is an art of supreme relaxation. Learn how to hover motionlessly beside the reef or beneath descending divers, capturing breathtaking natural light rays without bubbles scaring marine life.",
    image: {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      alt: "Underwater photographer framing sunlight beams through deep clear water"
    },
    featured: true
  },
  {
    id: "spec-monofin",
    slug: "monofin-technique",
    title: "Monofin Technique & Dolphin Kick",
    shortDesc: "Transform into pure aquatic propulsion with the fluid dolphin wave originating from your core.",
    durationDays: 2,
    priceEur: 210,
    prerequisites: "SSI Level 1 or equivalent.",
    keySkills: ["Core wave movement", "Ankle flexibility drills", "Glide phases", "Video biomechanics analysis"],
    fullDesc: "The monofin is the ultimate freediving tool. Under the guidance of our biomechanics specialists, learn how to generate immense power with minimal oxygen consumption by driving the kick from your chest and hips rather than knees.",
    image: {
      url: "/courses/monofin.jpg",
      alt: "SSI Monofin — freediver dolphin-kicking over a school of fish"
    }
  },
  {
    id: "spec-mouthfill",
    slug: "mouthfill-mastery",
    title: "Mouthfill Equalisation Clinic",
    shortDesc: "Unlock deep dives beyond your residual volume without thoracic stress.",
    durationDays: 2,
    priceEur: 240,
    prerequisites: "SSI Level 2 or 30m depth experience.",
    keySkills: ["Soft palate isolation", "Mouthfill charge at 15–20m", "Cheek & tongue piston dynamics", "Dry pressure gauge drills"],
    fullDesc: "The single biggest roadblock to diving past 30 meters is equalisation. This clinic breaks down the Mouthfill technique using pressure sensors, Otovent balloons, and specialized in-water drills coached by our deep specialists.",
    image: {
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
      alt: "Freediving coach instructing equalisation mechanics on land and water"
    },
    featured: true
  },
  {
    id: "spec-variable-weight",
    slug: "variable-weight-sled",
    title: "Variable Weight (VWT) Sled Diving",
    shortDesc: "Experience effortless deep descent via weighted sled and fin back to the surface on your own power.",
    durationDays: 2,
    priceEur: 230,
    prerequisites: "SSI Level 2 with verified 30m+ depth comfort.",
    keySkills: ["Sled braking control", "Rapid equalisation timing", "Deep turnaround mechanics", "Safety tether rigging"],
    fullDesc: "Variable weight allows you to descend with zero muscular exertion, dedicating 100% of your mental focus to equalisation and deep relaxation, before ascending under your own serene fin strokes.",
    image: {
      url: "/courses/variable-weight.jpg",
      alt: "SSI Variable Weight — freediver descending the deep Blue Hole line"
    }
  },
  {
    id: "spec-no-fins",
    slug: "no-fins-cnf",
    title: "Constant Weight No Fins (CNF)",
    shortDesc: "The purest, most challenging discipline: descend and ascend purely with your bare hands and breaststroke kick.",
    durationDays: 2,
    priceEur: 210,
    prerequisites: "SSI Level 1 or equivalent.",
    keySkills: ["Breaststroke coordination", "Glide deceleration physics", "Buoyancy trimming without fins", "Orientation along the line"],
    fullDesc: "CNF strips away all artificial propulsion. Discover how subtle adjustments in head tilt, arm sweep timing, and hip drive yield hypnotic, whisper-quiet deep descents.",
    image: {
      url: "/courses/no-fins-freediving.jpg",
      alt: "No-Fins Freediving — diver descending gracefully over the reef beneath a manta ray"
    }
  },
  {
    id: "spec-training-techniques",
    slug: "training-techniques",
    title: "Training Techniques & Dry-land Conditioning",
    shortDesc: "Build your customized CO2/O2 table progression, gym lung conditioning, and flexibility routines.",
    durationDays: 2,
    priceEur: 190,
    prerequisites: "SSI Level 1.",
    keySkills: ["CO2 & O2 table architecture", "Dry lung volume stretches", "Heart rate variability optimization", "Diet & hydration protocols"],
    fullDesc: "How champion freedivers stay conditioned even when away from the ocean. Learn how to program safe dry apnea training, neuro-respiratory adaptations, and recovery routines.",
    image: {
      url: "/courses/training-techniques.jpg",
      alt: "SSI Training Techniques — freediver practicing breathwork on a Dahab terrace"
    }
  },
  {
    id: "spec-react-right",
    slug: "react-right-first-aid",
    title: "SSI React Right (First Aid, CPR & O2)",
    shortDesc: "Comprehensive emergency response, AED operation, and emergency oxygen administration tailored to dive emergencies.",
    durationDays: 1,
    priceEur: 140,
    prerequisites: "None (Open to all divers and non-divers).",
    keySkills: ["Primary assessment & CPR", "Automated External Defibrillator (AED)", "Oxygen administration for barotrauma / blackout", "Dahab decompression chamber coordination"],
    fullDesc: "Essential medical knowledge for any serious diver or prospective instructor. Covers immediate hypoxic blackout recovery, neuro-evaluations, and coordination with local medical resources.",
    image: {
      url: "/courses/react-right.jpg",
      alt: "SSI React Right — emergency first response training"
    }
  },
  {
    id: "spec-free-immersion",
    slug: "free-immersion",
    title: "SSI Free Immersion (FIM)",
    shortDesc: "Dive the line with pure arm-pulls — no fins. The most meditative discipline and the fastest way to perfect equalization.",
    durationDays: 1,
    priceEur: 190,
    prerequisites: "SSI Level 1 (or equivalent) — comfortable with Frenzel equalization.",
    keySkills: [
      "Rope technique & breaststroke pull",
      "Head-down (inverted) Frenzel equalization",
      "Streamlined body position & hip drive",
      "Line safety & bottom-weight protocol"
    ],
    fullDesc: "Free Immersion (FIM) is the discipline of diving along the guide rope using arm strokes only — slow, silent, and elegant. Because the pace is calm and the line is always in your hand, it is the perfect discipline to perfect your equalization and body position. Most freedivers fall in love with depth here first.",
    image: {
      url: "/courses/free-immersion.jpg",
      alt: "SSI Free Immersion — freediver pulling down the line in deep blue water"
    }
  },
  {
    id: "spec-marine-ecology",
    slug: "marine-ecology",
    title: "SSI Marine Ecology",
    shortDesc: "Meet the Red Sea's residents — reef fish, corals, and the ecosystem that keeps them alive. A theory specialty for every ocean lover.",
    durationDays: 1,
    priceEur: 150,
    prerequisites: "None — open to everyone, no diving required.",
    keySkills: [
      "Coral reef ecosystems & food webs",
      "Fish identification — Red Sea endemic species",
      "Symbiosis, predators & defense strategies",
      "Conservation & how freedivers protect the reef"
    ],
    fullDesc: "The Red Sea is one of the most biodiverse seas on the planet — over 20% of its fish exist nowhere else on Earth. This SSI Marine Ecology program is classroom-based: no dives required, just curiosity. Learn how coral reefs work, who eats whom, and why Dahab's reefs deserve protection — taught by instructors who spend every day on this exact reef.",
    image: {
      url: "/courses/marine-ecology.jpg",
      alt: "SSI Marine Ecology — Red Sea hawkfish close-up on coral"
    }
  },
  {
    id: "master-freediver",
    slug: "master-freediver",
    title: "SSI Master Freediver",
    shortDesc: "The apex recreational certification — mouthfill, freefall, and deep rescue toward 30–40m, plus a personal training plan.",
    durationDays: 4,
    priceEur: 475,
    prerequisites: "SSI Level 2 (Advanced Freediver) or equivalent, React Right recommended, minimum age 16.",
    keySkills: [
      "Mouthfill equalization beyond residual volume",
      "Controlled freefall & relaxation past 30m",
      "Advanced rescue & blackout management",
      "CO2/O2 tables & personal training-plan design"
    ],
    fullDesc: "The SSI Master Freediver program is where recreational freediving becomes an art: warm-up tables, mouthfill equalization, controlled freefall, and deep rescue. You leave with a personal training plan and the confidence to keep progressing safely on your own — the gateway to the professional academy.",
    image: {
      url: "/courses/master-freediver.jpg",
      alt: "SSI Master Freediver — monofin freediver ascending between canyon walls in the Blue Hole"
    }
  }
];

export const instructorCourses: InstructorCourse[] = [
  {
    id: "ssi-basic-instructor",
    slug: "ssi-basic-freediving-instructor",
    title: "SSI Basic Freediving Instructor",
    durationWeeksOrDays: "6 Days",
    priceEur: 750,
    prerequisites: "SSI Level 2 (or equivalent), React Right within 24 months, minimum age 18, 40+ logged sessions.",
    description: "Your entry into professional freediving education. This program qualifies you to teach the SSI Basic Freediver and pool programs and to assist on open-water courses — the classic first step for gap-year divers, dive-center staff, and ocean enthusiasts turning pro.",
    modules: [
      "SSI teaching system & academic presentations",
      "Pool session leadership and student supervision",
      "Assisting open-water Level 1 courses with real students",
      "Standards, digital SSI ecosystem & professional ethics",
      "Instructor final evaluation"
    ],
    internshipOption: true,
    image: {
      url: "/courses/basic-freediving-instructor.jpg",
      alt: "SSI Basic Freediving Instructor — freediver reaching toward the surface light in deep blue"
    }
  },
  {
    id: "ssi-itc",
    slug: "ssi-freediving-instructor-itc",
    title: "SSI Freediving Instructor Course (ITC)",
    durationWeeksOrDays: "10 Days",
    priceEur: 1250,
    prerequisites: "SSI Level 3 (or equivalent 40m+ diver), React Right within 24 months, 100+ logged sessions, min age 18.",
    description: "As an official SSI Instructor Training Center since 2003, Freedive Dahab has trained over 450 instructors teaching worldwide. Our ITC teaches pedagogical psychology, in-water candidate coaching, risk prevention, and business mechanics.",
    modules: [
      "In-depth academic lecturing & student learning styles",
      "In-water demonstration quality technique",
      "Dynamic rescue from 25 meters + 50m surface tow",
      "Stamina swim tests: 400m in under 8:30 min",
      "Commercial center operation and digital SSI ecosystem"
    ],
    internshipOption: true,
    image: {
      url: "/courses/freediving-instructor-itc.jpg",
      alt: "SSI Freediving Instructor Training Course — instructor gliding over a Red Sea wreck"
    }
  },
  {
    id: "ssi-advanced-instructor",
    slug: "ssi-advanced-instructor",
    title: "SSI Advanced Freediving Instructor",
    durationWeeksOrDays: "4 Days",
    priceEur: 650,
    prerequisites: "SSI Freediving Instructor with at least 30 certified Level 1 students, or equivalent experience.",
    description: "Qualify to teach SSI Level 2 (Advanced Freediver) to 30 meters depth, Specialty courses, and lead deep training line setups.",
    modules: [
      "Advanced equalization diagnostics coaching",
      "Safe management of deep freefall training",
      "FRC coaching methodologies",
      "Rescue from 30m depth"
    ],
    internshipOption: false,
    image: {
      url: "/courses/advanced-freediving-instructor.jpg",
      alt: "SSI Advanced Freediving Instructor — diver finning over the shallow reef near the surface"
    }
  }
];

export const equalisationClass: EqualisationClass = {
  title: "Equalisation Masterclass: Frenzel & Mouthfill Architecture",
  leadCoach: "Master Equalisation Specialists inspired by Linda Paganelli",
  formats: [
    {
      format: "Online Clinic",
      duration: "3 x 90-min Live 1-on-1 Zoom sessions + Custom Video Analysis",
      priceEur: 140,
      description: "Diagnose your soft palate, tongue locks, and glottis control from anywhere in the world before you travel to Dahab.",
      includes: [
        "Otovent pressure diagnostics kit mailed or digital alternative",
        "HD endoscopic anatomical video breakdown",
        "Personalized daily 15-minute dry-drill routine",
        "Direct WhatsApp video check-ins for 30 days"
      ]
    },
    {
      format: "In-Person Dahab Masterclass",
      duration: "2 Days intensive land & open-water coaching",
      priceEur: 220,
      description: "Hands-on camera diagnostics, pressure gauges, and dedicated ocean dives with instantaneous feedback at Lighthouse Bay.",
      includes: [
        "Land Otovent pressure gauge measurement",
        "2 Depth line sessions with in-water audio/visual feedback",
        "Reverse-packing and residual volume exercises",
        "Overcoming mental blocks and head-down failure points"
      ]
    }
  ],
  overview: "Equalisation is 90% of depth progression. Rather than forcing your ears or guessing why you get stuck at 12m or 25m, we deconstruct the exact mechanics of the glottis, soft palate, tongue piston, and Eustachian tubes.",
  lindaPaganelliLegacy: "Freedive Dahab's coaching methodology draws upon the pioneering equalisation research and pedagogical mastery introduced to Dahab by Italian record holder Linda Paganelli, transforming hundreds of previously 'stuck' divers into relaxed 40m+ freedivers."
};
