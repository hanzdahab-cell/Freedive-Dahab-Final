export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Instructor / Pro' | 'All Levels' | 'Open to Level 1+' | 'Certified Divers';

export interface ImageAsset {
  url: string;
  alt: string;
}

export interface CoursePerformance {
  staticApnea: string;
  depth: string;
}

export interface CourseDiscipline {
  name: string;
  tagline: string;
  description: string;
  sessions: string;
}

export interface CourseScheduleDay {
  day: string;
  title: string;
  description: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  level: CourseLevel;
  tier: number;
  certification: string;
  durationDays: number;
  priceEur: number;
  maxDepthMeters: number;
  prerequisites: string;
  overview: string;
  highlights: string[];
  included: string[];
  scheduleSummary: string;
  image: ImageAsset;
  futurePerformances?: CoursePerformance;
  disciplines?: CourseDiscipline[];
  schedule?: CourseScheduleDay[];
}

export interface TrainingPricingRow {
  location: string;
  description: string;
  depthRange: string;
  singleSessionEur: number;
  fivePackEur: number;
  tenPackEur: number;
  coachingPrivateAddonEur: number;
  includesTransport: boolean;
  includesBuoyAndWeights: boolean;
  notes: string;
}

export interface SpecialtyCourse {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  durationDays: number;
  priceEur: number;
  prerequisites: string;
  keySkills: string[];
  fullDesc: string;
  image: ImageAsset;
  featured?: boolean;
}

export interface InstructorCourse {
  id: string;
  slug: string;
  title: string;
  durationWeeksOrDays: string;
  priceEur: number;
  prerequisites: string;
  description: string;
  modules: string[];
  internshipOption: boolean;
  image: ImageAsset;
}

export interface EqualisationClinicFormat {
  format: string;
  duration: string;
  priceEur: number;
  description: string;
  includes: string[];
}

export interface EqualisationClass {
  title: string;
  leadCoach: string;
  formats: EqualisationClinicFormat[];
  overview: string;
  lindaPaganelliLegacy: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  priceEur: number;
  saveAmountEur: number;
  badge?: string;
  image: ImageAsset;
  includedList: string[];
}

export interface RoomType {
  id: string;
  title: string;
  subtitle: string;
  pricePerNightEur: { min: number; max: number };
  capacity: number;
  amenities: string[];
  images: string[];
  featured?: boolean;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  priceEur: number;
  image: ImageAsset;
  includes: string[];
  highlights: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTimeMin: number;
  image: ImageAsset;
  tags: string[];
  featured?: boolean;
}

export interface CalendarEvent {
  id: string;
  courseId: string;
  courseTitle: string;
  type: string;
  month: string;
  startDate: string;
  endDate: string;
  level: string;
  instructor: string;
  spotsTotal: number;
  spotsAvailable: number;
  location: string;
  priceEur: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'courses' | 'travel' | 'equipment' | 'general';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  course: string;
  rating: number;
}

export type EventTypeId =
  | 'beginner-week'
  | 'advanced-week'
  | 'training-week'
  | 'ras-mohamed'
  | 'zero-to-hero'
  | 'instructor-course';

export type PageType =
  | 'home'
  | 'courses'
  | 'training'
  | 'experience'
  | 'accommodation'
  | 'packages'
  | 'blog'
  | 'faq'
  | 'calendar'
  | 'story'
  | `event-${EventTypeId}`
  | `course-${string}`;

export type Language = 'en' | 'ar' | 'es' | 'de';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
  flag: string;
  flagUrl: string;
  dir: 'ltr' | 'rtl';
}

export interface SiteConfig {
  name: string;
  tagline: string;
  logo: {
    white: string;
    dark: string;
    alt: string;
  };
  navigation: { href: string; label: string; tag?: string }[];
  location: {
    address: string;
    town: string;
    coordinates: { lat: number; lng: number };
  };
  contact: {
    phone: string;
    whatsappFormatted: string;
    email: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
}
