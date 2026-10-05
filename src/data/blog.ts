import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: "breath-hold-fundamentals",
    slug: "breath-hold-fundamentals",
    title: "The Science of the Breath-Hold: What Actually Happens",
    excerpt: "Understanding the mammalian dive reflex, CO2 tolerance, and why diaphragmatic relaxation beats willpower every time.",
    content: "When your face contacts cold water, the trigeminal nerve fires, initiating the mammalian dive reflex (MDR). Your heart rate drops by up to 40% (bradycardia), peripheral blood vessels constrict (peripheral vasoconstriction) shunting oxygenated blood to the heart and brain, and spleen contraction releases fresh red blood cells into circulation. Learning to embrace the urge to breathe as a mere signal of hypercapnia rather than an emergency is the gateway to deep calm.",
    author: "Dr. Karim Mansour",
    authorRole: "SSI Instructor Trainer & Sports Physiologist",
    publishedAt: "2026-01-15",
    readTimeMin: 8,
    image: { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80", alt: "Freediver in relaxation phase before descent" },
    tags: ["physiology", "beginners", "breathing"],
    featured: true
  },
  {
    id: "mouthfill-deep-dive",
    slug: "mouthfill-deep-dive",
    title: "Mouthfill Mastery: The Gateway Past 30 Meters",
    excerpt: "Why mouthfill is the single most important skill for deep freediving, and how to build it safely from dry land.",
    content: "At 30 meters depth, the ambient pressure is 4 atmospheres, compressing your lung volume down to residual volume (RV). You can no longer draw air from your lungs into the mouth to equalize. The solution is Mouthfill: charging the oral cavity, cheeks, and pharynx with air at 15–20m, locking the soft palate and glottis, and using the tongue like a hydraulic piston to push air into the Eustachian tubes.",
    author: "Matteo Bianchi",
    authorRole: "Deep Specialist & Equalisation Coach",
    publishedAt: "2026-02-20",
    readTimeMin: 12,
    image: { url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80", alt: "Coach demonstrating mouthfill technique" },
    tags: ["technique", "advanced", "equalisation"]
  },
  {
    id: "dahab-blue-hole-guide",
    slug: "dahab-blue-hole-guide",
    title: "The Blue Hole: Complete Freediver's Guide",
    excerpt: "Everything you need to know about diving the world's most famous sinkhole: logistics, conditions, depth progression, and safety.",
    content: "The Dahab Blue Hole is a submarine sinkhole that plunges vertically to 92 meters directly off the shoreline. With zero currents, water temperature hovering at 24-28°C, and visibility often exceeding 40 meters, it offers arguably the most pristine freediving conditions on Earth. At 56m lies 'The Arch', a massive 26-meter tunnel connecting the sinkhole to the open Red Sea abyss.",
    author: "Tarek Hany",
    authorRole: "Head of ITC & Blue Hole Specialist",
    publishedAt: "2026-03-10",
    readTimeMin: 10,
    image: { url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80", alt: "Aerial view of Dahab Blue Hole" },
    tags: ["location", "blue-hole", "safety"],
    featured: true
  }
];
