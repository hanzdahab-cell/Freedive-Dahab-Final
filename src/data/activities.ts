import { Activity } from '../types';

export const activitiesData: Activity[] = [
  {
    id: "ras-mohamed",
    title: "Ras Mohamed National Park Safari",
    description: "Full-day private boat expedition to the world-renowned Ras Mohamed marine sanctuary. Three world-class dive sites: Shark Reef, Yolanda Reef, and Jackfish Alley. Encounter reef sharks, massive schools of barracuda, napoleon wrasse, and pristine coral walls dropping to 800m.",
    duration: "Full Day (8:00 - 16:00)",
    priceEur: 85,
    image: { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80", alt: "Ras Mohamed coral reef with freedivers" },
    includes: [
      "Air-conditioned yacht with sun deck & shadow lounge",
      "Marine park entrance fees included",
      "Fresh breakfast, Bedouin BBQ lunch, fruits & refreshments",
      "Professional freediving guide & safety diver",
      "Snorkeling gear available (freediving gear bring your own)",
      "Dahab center round-trip VIP transfer"
    ],
    highlights: [
      "Shark Reef & Yolanda Reef - world top 10 dive sites",
      "Possible reef shark encounters at Shark Reef",
      "Yolanda wreck (historic cargo at 15-25m)",
      "Jackfish Alley - massive pelagic schools",
      "Crystal 30m+ visibility year-round"
    ]
  },
  {
    id: "gabriella-reef",
    title: "Gabriella Reef & Canyon Drift",
    description: "Morning drift freedive along Gabriella's pristine coral garden and the famous Dahab Canyon. Start at the coral garden (5-18m), drift with the gentle current through the Canyon's dramatic fissure (15-30m), exit at the Blue Hole saddle.",
    duration: "Half Day (8:30 - 12:30)",
    priceEur: 55,
    image: { url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80", alt: "Dahab Canyon entrance with light beams" },
    includes: [
      "Professional guide & safety diver",
      "One-way drift - boat pickup at Blue Hole",
      "Marine park fees included",
      "Light Bedouin snacks & fresh spring water",
      "Video highlights of your drift"
    ],
    highlights: [
      "Canyon's dramatic vertical fissure with light beams",
      "Gabriella's pristine hard coral garden",
      "Effortless drift with gentle north current",
      "Perfect for photography & video",
      "Suitable for Level 1+ certified divers"
    ]
  },
  {
    id: "night-freediving",
    title: "Night Freediving Experience",
    description: "Experience the Red Sea's nocturnal transformation. Bioluminescent plankton trails, hunting lionfish, sleeping parrotfish in protective mucus cocoons, and the eerie meditative beauty of the reef at night. Limited to 4 divers per guide.",
    duration: "Evening (19:30 - 21:30)",
    priceEur: 65,
    image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", alt: "Night freediving with bioluminescence trails" },
    includes: [
      "Powerful underwater dive torches (primary + backup)",
      "Professional night diving instructor guide",
      "Warm post-dive spiced Bedouin tea & dates on sea terrace",
      "Briefing on night tactile communication",
      "Underwater photos with bioluminescent sparkle"
    ],
    highlights: [
      "Bioluminescent plankton light shows on every fin stroke",
      "Active night predators: lionfish, octopus, cuttlefish",
      "Parrotfish in cocoon membranes",
      "Zero other divers - private reef stillness",
      "Unique low-light photography opportunities"
    ]
  },
  {
    id: "desert-sunset",
    title: "Sinai Desert Sunset & Stargazing",
    description: "4x4 mountain expedition into the Sinai canyons for an authentic Bedouin evening. Sunset over golden granite peaks, camel ride, stargazing under zero light pollution with astronomer guide, and underground slow-roasted Zarb dinner.",
    duration: "Evening (15:00 - 22:00)",
    priceEur: 75,
    image: { url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80", alt: "Bedouin camp in Sinai mountains at sunset" },
    includes: [
      "4x4 Land Cruiser transport from Dahab",
      "Camel ride at sunset over dunes",
      "Astronomer guide with green laser & telescope",
      "Authentic Bedouin feast (slow-cooked zarb, salads, fresh bread)",
      "Sinai sage tea & shisha lounge under the Milky Way",
      "Return to Dahab center by 22:00"
    ],
    highlights: [
      "Dramatic Sinai mountain landscapes",
      "Zero light pollution - pristine Milky Way galaxy view",
      "Authentic Bedouin hospitality & culture",
      "Perfect rest day activity for freedivers",
      "Great for non-diving companions"
    ]
  }
];
