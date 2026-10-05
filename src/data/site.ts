import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: 'Freedive Dahab',
  tagline: 'Red Sea 3D Descent & SSI Instructor Training Center',
  logo: {
    white: '/logo-white.png',
    dark: '/logo-dark.png',
    alt: 'Freedive Dahab'
  },
  navigation: [
    { href: '#home', label: 'Descent' },
    { href: '#portal', label: 'The Portal', tag: '3D Mask' },
    { href: '#philosophy', label: 'Philosophy' },
    { href: '#courses', label: 'Courses', tag: 'SSI Academy' },
    { href: '#depth', label: 'Depth Mecca', tag: '92m' },
    { href: '#packages', label: 'Residencies' },
    { href: '#accommodation', label: 'Sea Lodge' },
    { href: '#safaris', label: 'Safaris' },
    { href: '#journal', label: 'Journal' },
    { href: '#faq', label: 'FAQ' }
  ],
  location: {
    address: 'Lighthouse Bay, Dahab',
    town: 'Dahab, South Sinai, Egypt',
    coordinates: { lat: 28.4955, lng: 34.5135 }
  },
  contact: {
    phone: '+20 100 845 2911',
    whatsappFormatted: '+20 100 845 2911',
    email: 'info@freedivedahab.com'
  },
  social: {
    instagram: 'https://instagram.com/freedivedahab_official',
    facebook: 'https://facebook.com/freedivedahab',
    youtube: 'https://youtube.com/@freedivedahab',
    tiktok: 'https://tiktok.com/@freedivedahab'
  }
};
