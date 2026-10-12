import { Phone, Mail, MapPin, ArrowUp, Instagram, Facebook } from 'lucide-react';
import { PageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { ReviewsCarousel, PlatformMark } from '../footer/ReviewsCarousel';
import { siteConfig } from '../../data/site';

/* ==========================================================================
   FOOTER — "Footer 30" adaptation
   White content area (info | thin line | page links | animated sea panel),
   then the reviews carousel, then the signature three-layer blue wave band
   with the copyright inside it and a circular back-to-top button.
   ========================================================================== */

interface FooterProps {
  onOpenBooking: () => void;
  onNavigate?: (page: PageType) => void;
}

const FOOTER_LINKS: { label: string; page: PageType }[] = [
  { label: 'Freedive Dahab', page: 'home' },
  { label: 'SSI Courses', page: 'courses' },
  { label: 'Trainings', page: 'training' },
  { label: 'Packages', page: 'packages' },
];

function Fish({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 28" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M14 14c6-8 18-11 30-8 6 1.5 11 4.5 14 8-3 3.5-8 6.5-14 8-12 3-24 0-30-8Z" />
      <path d="M14 14 2 6c1.5 5 1.5 11 0 16l12-8Z" />
      <circle cx="46" cy="12" r="1.6" fill="#0E3453" />
    </svg>
  );
}

export function Footer({ onOpenBooking, onNavigate }: FooterProps) {
  const { t } = useLanguage();

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigate = (page: PageType) => {
    if (onNavigate) onNavigate(page);
    else scrollToTop();
  };

  return (
    <footer className="relative bg-white text-[#0E3453]">
      {/* ========================================================== */}
      {/* WHITE CONTENT AREA — info | thin line | links | sea panel  */}
      {/* ========================================================== */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">

          {/* LEFT — our info (extreme opposite side from the sea) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-4">
              <img
                src="/logo-freedive-dahab.png"
                alt="Freedive Dahab"
                className="h-14 w-auto object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xl font-bold tracking-wide uppercase">Freedive Dahab</span>
                <span className="text-[10px] font-mono tracking-[0.22em] text-[#22628C] uppercase">
                  SSI Diamond Instructor Training Center
                </span>
              </div>
            </div>

            <p className="font-alata text-sm text-slate-500 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            <ul className="space-y-2.5 text-sm font-alata text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#22628C] shrink-0 mt-0.5" />
                <span>
                  Lighthouse Bay &amp; Blue Hole, Dahab
                  <span className="block text-xs text-slate-400">South Sinai, Red Sea, Egypt</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#22628C] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#22628C] transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#22628C] shrink-0" />
                <a href="tel:+201008452911" className="hover:text-[#22628C] transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>

            {/* Social — real accounts */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram — @freedive_dahab"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#0E3453] hover:border-[#22628C] hover:text-[#22628C] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook — Freedive Dahab"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#0E3453] hover:border-[#22628C] hover:text-[#22628C] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.tripadvisor}
                target="_blank"
                rel="noreferrer"
                aria-label="TripAdvisor — Freedive Dahab reviews"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#22628C] transition-colors"
              >
                <PlatformMark platform="tripadvisor" />
              </a>
              <a
                href={siteConfig.social.googleMaps}
                target="_blank"
                rel="noreferrer"
                aria-label="Freedive Dahab on Google Maps"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#22628C] transition-colors"
              >
                <PlatformMark platform="google" />
              </a>
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex px-6 py-2.5 rounded-full bg-[#22628C] hover:bg-[#1B5175] text-white text-xs font-semibold uppercase tracking-[0.08em] font-alata transition-all cursor-pointer hover:shadow-lg"
            >
              Direct Inquiry
            </button>
          </div>

          {/* THIN LINE divider */}
          <div className="hidden lg:block w-px bg-slate-200" aria-hidden="true" />

          {/* MIDDLE — the four page links */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#22628C] mb-4">
              Explore
            </div>
            <ul>
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="group w-full text-left py-3 border-b border-slate-100 last:border-0 flex items-center justify-between font-alata text-sm text-slate-600 hover:text-[#22628C] transition-colors cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowUp className="w-3.5 h-3.5 -rotate-45 text-slate-300 group-hover:text-[#22628C] transition-colors" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT — animated sea & fish panel (ocean blue) */}
          <div
            className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[240px] lg:min-h-full bg-gradient-to-b from-[#22628C] via-[#1B5175] to-[#0E3453]"
            role="img"
            aria-label="Animated Red Sea scene with fish swimming above the reef"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              src="/videos/vortex-loop.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453]/70 via-transparent to-[#22628C]/30 pointer-events-none" />

            {/* Swimming fish (CSS animation, reduced-motion aware) */}
            <Fish className="footer-fish w-14 text-[#A9D2EC]/50" style={{ top: '18%', animationDuration: '26s', animationDelay: '-4s' }} />
            <Fish className="footer-fish w-9 text-[#A9D2EC]/35" style={{ top: '38%', animationDuration: '34s', animationDelay: '-16s', transform: 'scaleX(-1)' }} />
            <Fish className="footer-fish w-20 text-[#CFE8F8]/30" style={{ top: '62%', animationDuration: '40s', animationDelay: '-9s' }} />
            <Fish className="footer-fish w-6 text-[#A9D2EC]/40" style={{ top: '76%', animationDuration: '22s', animationDelay: '-21s' }} />

            <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-[0.22em] uppercase text-white/70">
              Lighthouse Bay · Red Sea
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS — TripAdvisor & Google carousel (white section) */}
      <ReviewsCarousel />

      {/* ========================================================== */}
      {/* THREE-LAYER WAVE BAND — copyright inside, round top btn    */}
      {/* ========================================================== */}
      <div className="relative h-36 sm:h-44">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5175] via-[#22628C] to-[#4E8CB8]" />

        {/* Layered swells, lightest at the back */}
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="fd-wave-front" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1B5175" />
              <stop offset="55%" stopColor="#22628C" />
              <stop offset="100%" stopColor="#4E8CB8" />
            </linearGradient>
          </defs>
          <path
            fill="#A9D2EC"
            opacity="0.4"
            d="M0,96 C180,40 380,18 560,48 C740,78 920,118 1100,98 C1280,78 1360,52 1440,70 L1440,180 L0,180 Z"
          />
          <path
            fill="#4E8CB8"
            opacity="0.55"
            d="M0,122 C200,70 380,58 560,88 C740,118 920,140 1100,112 C1280,84 1370,84 1440,102 L1440,180 L0,180 Z"
          />
          <path
            fill="url(#fd-wave-front)"
            d="M0,142 C220,102 420,90 640,114 C860,138 1060,148 1240,130 C1350,119 1400,116 1440,124 L1440,180 L0,180 Z"
          />
        </svg>

        {/* Copyright inside the wave band, bottom-left */}
        <div className="absolute bottom-4 left-6 text-[11px] font-alata text-white/85">
          © {new Date().getFullYear()} Freedive Dahab · {t.footer.allRightsReserved}
        </div>

        {/* Circular back-to-top, bottom-right */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="absolute bottom-5 right-6 w-11 h-11 rounded-full border border-white/50 text-white flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
