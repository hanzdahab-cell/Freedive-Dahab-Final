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
    instagram: 'https://www.instagram.com/freedive_dahab/',
    facebook: 'https://www.facebook.com/freedivedahab/',
    tripadvisor:
      'https://www.tripadvisor.com/Attraction_Review-g297547-d2536562-Reviews-Freedive_Dahab-Dahab_South_Sinai_Red_Sea_and_Sinai.html',
    googleMaps:
      'https://www.google.com/maps/place/Freedive+Dahab/@28.500013,34.5146068,17z/data=!4m12!1m2!2m1!1sfreedive+dahab+r!3m8!1s0x15ab4b2f95e43b47:0x959de4c6f4da9708!8m2!3d28.500013!4d34.5193704!9m1!1b1!16s%2Fg%2F1hc8wq6h4',
  }
};
