import { RoomType } from '../types';

export const roomTypes: RoomType[] = [
  {
    id: "sea-view-suite",
    title: "Sea View Suite",
    subtitle: "Private balcony overlooking Lighthouse Bay",
    pricePerNightEur: { min: 40, max: 55 },
    capacity: 2,
    amenities: [
      "King-size bed with premium linens",
      "Private balcony with direct sea view",
      "En-suite bathroom with rain shower",
      "Air conditioning & ceiling fan",
      "High-speed fiber WiFi (100Mbps+)",
      "Mini-fridge & electric kettle",
      "In-room safe & blackout curtains",
      "Daily housekeeping"
    ],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true
  },
  {
    id: "garden-room",
    title: "Garden Room",
    subtitle: "Tranquil garden setting, steps from the sea",
    pricePerNightEur: { min: 30, max: 40 },
    capacity: 2,
    amenities: [
      "Queen-size bed or twin singles",
      "Garden view with private patio",
      "En-suite bathroom with shower",
      "Air conditioning & ceiling fan",
      "High-speed fiber WiFi (100Mbps+)",
      "Mini-fridge & electric kettle",
      "In-room safe & blackout curtains",
      "Daily housekeeping"
    ],
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "shared-dorm",
    title: "Freediver Shared Lodge",
    subtitle: "Budget-friendly, community atmosphere",
    pricePerNightEur: { min: 25, max: 30 },
    capacity: 1,
    amenities: [
      "Single bed with privacy curtain",
      "Shared bathroom facilities with rain showers",
      "Air conditioning & personal locker",
      "High-speed fiber WiFi (100Mbps+)",
      "Reading light & power outlet",
      "Access to communal terrace & kitchen",
      "Daily cleaning & towel service"
    ],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "family-suite",
    title: "Family & Team Penthouse",
    subtitle: "Two bedrooms, private rooftop terrace with panoramic bay view",
    pricePerNightEur: { min: 65, max: 85 },
    capacity: 4,
    amenities: [
      "Master bedroom: king bed | Second room: twin singles",
      "Large private panoramic terrace with sea view",
      "Two en-suite marble bathrooms",
      "Air conditioning throughout",
      "High-speed fiber WiFi (100Mbps+)",
      "Mini-fridge, espresso machine, dining lounge",
      "In-room safe & blackout curtains",
      "Daily housekeeping"
    ],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true
  }
];
