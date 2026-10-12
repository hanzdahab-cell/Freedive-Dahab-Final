/**
 * Review sources + review cards for the footer carousel.
 *
 * The platform links below are the center's REAL, verified pages:
 *   - TripAdvisor: attraction page for Freedive Dahab (Dahab, South Sinai)
 *   - Google:      Maps place page with the review section (1b1 param opens reviews)
 *
 * IMPORTANT: the `reviews` array entries below are PLACEHOLDERS showing the
 * card design. Replace the text/name/date fields with real review excerpts
 * copied from the two linked pages before going live — publishing invented
 * customer quotes is a legal risk (fake reviews). Avatars fall back to
 * initials when no photo URL is given.
 */

export type ReviewPlatform = 'tripadvisor' | 'google';

export interface ReviewSource {
  platform: ReviewPlatform;
  label: string;
  url: string;
}

export const REVIEW_SOURCES: ReviewSource[] = [
  {
    platform: 'tripadvisor',
    label: 'TripAdvisor — Freedive Dahab',
    url: 'https://www.tripadvisor.com/Attraction_Review-g297547-d2536562-Reviews-Freedive_Dahab-Dahab_South_Sinai_Red_Sea_and_Sinai.html',
  },
  {
    platform: 'google',
    label: 'Google — Freedive Dahab reviews',
    url: 'https://www.google.com/maps/place/Freedive+Dahab/@28.500013,34.5146068,17z/data=!4m12!1m2!2m1!1sfreedive+dahab+r!3m8!1s0x15ab4b2f95e43b47:0x959de4c6f4da9708!8m2!3d28.500013!4d34.5193704!9m1!1b1!16s%2Fg%2F1hc8wq6h4',
  },
];

export interface Review {
  platform: ReviewPlatform;
  name: string;
  rating: number; // 1–5
  date: string;
  text: string;
  avatarUrl?: string;
}

// TODO(owner): replace these three placeholder cards with real review excerpts
// from the TripAdvisor / Google pages linked above (keep the shape identical).
export const reviews: Review[] = [
  {
    platform: 'tripadvisor',
    name: 'TripAdvisor traveler',
    rating: 5,
    date: 'Replace with real review',
    text: 'Placeholder card — paste a real TripAdvisor review excerpt here (from the linked page), with the reviewer name and date.',
  },
  {
    platform: 'google',
    name: 'Google reviewer',
    rating: 5,
    date: 'Replace with real review',
    text: 'Placeholder card — paste a real Google review excerpt here (from the linked Maps page), with the reviewer name and date.',
  },
  {
    platform: 'tripadvisor',
    name: 'TripAdvisor traveler',
    rating: 5,
    date: 'Replace with real review',
    text: 'Placeholder card — one more real review excerpt. Keep 4–6 cards total for the best carousel rhythm.',
  },
];
