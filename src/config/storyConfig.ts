export interface MediaConfig {
  hero: {
    image: string;
    video?: string;
    poster?: string;
    alt: string;
  };
  founders: {
    id: string;
    name: string;
    role: string;
    portrait: string;
    alt: string;
    bio: string;
    extras: string[];
    video?: string;
    videoPreview?: string;
    videoPoster?: string;
    quote: string;
    funFact: string;
    depthFocus: string;
  }[];
  timeline: {
    year: string;
    title: string;
    event: string;
    depthMeters: number;
    image?: string;
    alt?: string;
  }[];
  gallery: {
    id: string;
    src: string;
    caption: string;
    category: 'all' | 'school' | 'events' | 'underwater' | 'classroom' | 'facilities';
    alt: string;
  }[];
  audio?: {
    src: string;
  };
}

export interface SiteConfig {
  title: string;
  tagline: string;
  navLinks: {
    label: string;
    href: string;
    depthTarget: number;
  }[];
  hero: {
    title: string;
    subtitle: string;
    scrollCue: string;
  };
  intro: {
    paragraphs: string[];
    highlights: {
      value: string;
      label: string;
      subtext?: string;
    }[];
    facilities: {
      name: string;
      icon: string;
    }[];
  };
  cta: {
    heading: string;
    subheading: string;
    buttons: {
      label: string;
      href: string;
      primary?: boolean;
    }[];
  };
  footer: {
    tagline: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    social: {
      name: string;
      url: string;
      icon: string;
    }[];
  };
}

export const storyConfig: {
  media: MediaConfig;
  site: SiteConfig;
} = {
  media: {
    hero: {
      image: '/hero-lighthouse-bay.jpg',
      video: '/hero-video.mp4',
      poster: '/hero-poster.jpg',
      alt: 'Lighthouse Bay Dahab calm azure surface and mountain horizon',
    },
    founders: [
      {
        id: 'lotta',
        name: 'Lotta Ericson',
        role: 'Pioneer & School Director',
        portrait: '/lotta-portrait.jpg',
        alt: 'Lotta Ericson - Pioneer and Freediving World Record Holder',
        bio: "Lotta Ericson is not only the heart behind Freedive Dahab but also a living legend in the sport. As a former freediving world record holder and developer of freediving education systems, Lotta launched Freedive Dahab in 2003. Under her leadership, it became the world's first SSI Freediving Instructor Training Center, certifying thousands of freedivers across all levels. Lotta's vision continues to inspire a global community united by love and respect for the ocean.",
        extras: ['/lotta-1.jpg', '/lotta-2.jpg'],
        video: '/lotta-video.mp4',
        videoPreview: '',
        videoPoster: '/lotta-portrait.jpg',
        quote: '',
        funFact: '',
        depthFocus: 'Pioneer & System Architect',
      },
      {
        id: 'linda',
        name: 'Linda Paganelli',
        role: 'Elite Freediver & Storyteller',
        portrait: '/linda-portrait.jpg',
        alt: 'Linda Paganelli - World Championship Silver Medalist and Storyteller',
        bio: "Linda Paganelli, our Italian freediving champion, has been competing since 2005 and made a powerful comeback in 2022 by winning a silver medal at the CMAS Freediving World Championship. As the oldest woman competing at elite levels, Linda defies limits every day. Her passion for training hard and sharing inspiring stories proves it's never too late to follow your dreams. Linda's journey motivates freedivers of all ages to pursue personal excellence and embrace adventure.",
        extras: ['/linda-1.jpg', '/linda-2.jpg'],
        video: '/linda-video.mp4',
        videoPreview: '',
        videoPoster: '/linda-portrait.jpg',
        quote: '',
        funFact: '',
        depthFocus: 'Elite Mastery & Storyteller',
      },
      {
        id: 'waleed',
        name: 'Waleed Ghatas',
        role: 'Instructor Trainer & Ocean Advocate',
        portrait: '/waleed-portrait.jpg',
        alt: 'Waleed Ghatas - SSI Instructor Trainer & Blue Hole Coach',
        bio: "Waleed Ghatas found his calling in Dahab's Blue Hole, captivated by the ocean's peace and beauty. Starting freediving in 2012 and teaching since 2015, Waleed has certified hundreds of recreational and professional freedivers, including national record holders. His dedication is to make freediving in Dahab not just a sport, but a soothing and transformative experience for body and mind. Waleed's coaching empowers countless divers to connect deeply with the underwater world.",
        extras: ['/waleed-1.jpg', '/waleed-2.jpg'],
        video: '/waleed-video.mp4',
        videoPreview: '',
        videoPoster: '/waleed-portrait.jpg',
        quote: '',
        funFact: '',
        depthFocus: 'Blue Hole & Mentorship',
      },
    ],
    timeline: [
      {
        year: '2003',
        title: 'Foundation of Freedive Dahab',
        event: 'Lotta Ericson co-founds Freedive Dahab',
        depthMeters: 18,
        image: '/timeline-2003.jpg',
        alt: 'Founding of Freedive Dahab in 2003',
      },
      {
        year: '2005',
        title: 'Competitive Ascent',
        event: 'Linda Paganelli begins competing',
        depthMeters: 26,
        image: '/timeline-2005.jpg',
        alt: 'Linda Paganelli competitive journey begins',
      },
      {
        year: '2010',
        title: 'World-First Milestone',
        event: "Freedive Dahab becomes the world's first SSI Freediving Instructor Training Center",
        depthMeters: 36,
        image: '/timeline-2010.jpg',
        alt: 'Freedive Dahab first SSI Freediving Instructor Training Center',
      },
      {
        year: '2012',
        title: 'The Blue Hole Calling',
        event: "Waleed Ghatas starts freediving in Dahab's Blue Hole",
        depthMeters: 48,
        image: '/timeline-2012.jpg',
        alt: 'Waleed Ghatas freediving in Blue Hole',
      },
      {
        year: '2015',
        title: 'Mentorship & Pedagogy',
        event: 'Waleed begins teaching',
        depthMeters: 62,
        image: '/timeline-2015.jpg',
        alt: 'Waleed begins teaching freediving in Dahab',
      },
      {
        year: '2022',
        title: 'World Championship Silver',
        event: 'Linda wins silver at the CMAS Freediving World Championship',
        depthMeters: 74,
        image: '/timeline-2022.jpg',
        alt: 'Linda Paganelli wins silver at CMAS World Championship',
      },
    ],
    gallery: [
      {
        id: 'gal-01',
        src: '/gallery-01.jpg',
        caption: 'Training along the Lighthouse reef lines',
        category: 'underwater',
        alt: 'Freediver descending along training line in Dahab',
      },
      {
        id: 'gal-02',
        src: '/gallery-02.jpg',
        caption: 'The sunny rooftop terrace at our Lighthouse centre',
        category: 'school',
        alt: 'Sunny terrace lounge at Freedive Dahab centre',
      },
      {
        id: 'gal-03',
        src: '/gallery-03.jpg',
        caption: 'Air-conditioned classroom diaphragmatic breathing session',
        category: 'classroom',
        alt: 'Classroom physiology and equalisation training workshop',
      },
      {
        id: 'gal-04',
        src: '/gallery-04.jpg',
        caption: 'SSI Instructor Training Course candidate briefing',
        category: 'events',
        alt: 'Freediving instructor candidates during ocean briefing',
      },
      {
        id: 'gal-05',
        src: '/gallery-05.jpg',
        caption: 'Equipment room with custom depth rigs and suits',
        category: 'facilities',
        alt: 'Spacious freediving gear and equipment room',
      },
      {
        id: 'gal-06',
        src: '/gallery-06.jpg',
        caption: 'Morning meditation and mobility by the Red Sea',
        category: 'events',
        alt: 'Morning mobility session on the Dahab coastline',
      },
      {
        id: 'gal-07',
        src: '/gallery-07.jpg',
        caption: 'Blue Hole depth exploration in tranquil stillness',
        category: 'underwater',
        alt: 'Freediver weightless in Dahab Blue Hole arch',
      },
      {
        id: 'gal-08',
        src: '/gallery-08.jpg',
        caption: 'Beachside freshwater showers after line training',
        category: 'facilities',
        alt: 'Beachside shower area at Freedive Dahab',
      },
    ],
    audio: {
      src: '/ambient-ocean.mp3',
    },
  },
  site: {
    title: 'Our Story – Freedive Dahab',
    tagline: 'Pioneers of the Deep since 2003',
    navLinks: [
      { label: 'Story', href: '#story', depthTarget: 10 },
      { label: 'Timeline', href: '#timeline', depthTarget: 25 },
      { label: 'Pioneers', href: '#founders', depthTarget: 50 },
      { label: 'Gallery', href: '#gallery', depthTarget: 75 },
      { label: 'Dive Deeper', href: '#dive-deeper', depthTarget: 100 },
    ],
    hero: {
      title: 'Why Freedive Dahab?',
      subtitle: 'From the sunlit turquoise shallows of Lighthouse Bay to the sacred stillness of the deep Blue Hole.',
      scrollCue: 'Scroll to dive ↓',
    },
    intro: {
      paragraphs: [
        'Discover why Freedive Dahab is a world-renowned destination for freediving enthusiasts of all levels. Founded in 2003, Freedive Dahab holds the title of being one of the very first freediving centres globally and the first SSI Freediving Instructor Training Center in the world since 2010.',
        "Located near the beautiful Lighthouse Bay at the heart of Dahab, our centre offers more than just training. With a spacious air-conditioned classroom, a large equipment room, a sunny terrace, and beachside showers, Freedive Dahab is built for comfort and community. Whether you're joining us in summer or winter, you'll feel right at home, with free Wi-Fi to keep you connected.",
        'We offer a variety of immersive events and packages, from beginner levels to professional instructor training, specialized private coaching, and even competitions. Our welcoming environment inspires thousands of freedivers every year to deepen their connection with the ocean, improve their skills, and take on new challenges.',
      ],
      highlights: [
        {
          value: '2003',
          label: 'Founded',
          subtext: 'One of the very first freediving centres globally',
        },
        {
          value: '2010',
          label: 'First SSI Instructor Training Center',
          subtext: 'Pioneered world-standard pro education',
        },
        {
          value: 'Lighthouse Bay',
          label: 'Dahab, Egypt',
          subtext: 'Heart of Dahab directly beside the reef',
        },
        {
          value: 'Beginner → Instructor',
          label: 'All Levels',
          subtext: 'From first breath to professional certifications',
        },
      ],
      facilities: [
        { name: 'Air-conditioned classroom', icon: 'Sparkles' },
        { name: 'Equipment room', icon: 'Layers' },
        { name: 'Sunny terrace', icon: 'Sun' },
        { name: 'Beachside showers', icon: 'Droplets' },
        { name: 'Free Wi-Fi', icon: 'Wifi' },
      ],
    },
    cta: {
      heading: 'Dive Deeper',
      subheading:
        "Whether you're a beginner or aiming to become an instructor, our school offers a welcoming community, expert guidance, and a place where your freediving dreams can take flight.",
      buttons: [
        {
          label: 'Courses & Packages',
          href: '#courses',
          primary: true,
        },
        {
          label: 'Events',
          href: '#events',
          primary: false,
        },
        {
          label: 'Contact Us',
          href: '#contact',
          primary: false,
        },
      ],
    },
    footer: {
      tagline: 'Freedive Dahab – Inspiring Freediving since 2003.',
      email: 'info@freedivedahab.com',
      phone: '+20 100 845 2911',
      whatsapp: '+20 100 845 2911',
      address: 'Lighthouse Bay, Dahab, South Sinai, Egypt',
      social: [
        {
          name: 'Instagram',
          url: 'https://instagram.com/freedivedahab_official',
          icon: 'Instagram',
        },
        {
          name: 'Facebook',
          url: 'https://facebook.com/freedivedahab',
          icon: 'Facebook',
        },
        {
          name: 'YouTube',
          url: 'https://youtube.com/@freedivedahab',
          icon: 'Youtube',
        },
        {
          name: 'WhatsApp',
          url: 'https://wa.me/201008452911',
          icon: 'MessageCircle',
        },
      ],
    },
  },
};
