import { Phone, Mail, MapPin, ArrowUp, Instagram, Facebook, Youtube } from 'lucide-react';
import { PageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigate?: (page: PageType) => void;
}

export function Footer({ onOpenBooking, onNavigate }: FooterProps) {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (page: PageType) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#01040f] text-slate-400 border-t border-white/10 pt-24 pb-16 px-6 overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Top Section: Big Brand Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="/logo-freedive-dahab.png"
                alt="Freedive Dahab"
                className="h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-white uppercase">
                  Freedive Dahab
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase">
                  SSI Diamond Instructor Training Center
                </span>
              </div>
            </div>
            
            <p className="font-sans font-light text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
              {t.footer.desc}
            </p>

            <div className="flex flex-wrap gap-3 text-xs font-sans text-slate-400">
              <span className="px-3 py-1 rounded bg-slate-900 border border-white/10 text-cyan-300">
                LAT 28°29&apos;N • LNG 34°30&apos;E
              </span>
              <span className="px-3 py-1 rounded bg-slate-900 border border-cyan-500/20 text-cyan-400 font-medium">
                {t.footer.certifiedCenter}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row justify-between gap-8">
            <div className="space-y-3 text-xs font-mono">
              <div className="text-white uppercase tracking-widest font-semibold">{t.footer.contactCol}</div>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Lighthouse Bay &amp; Blue Hole, Dahab, Egypt</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>info@freedivedahab.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>+20 100 123 4567</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
                >
                  Direct Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Freedive Dahab • {t.footer.allRightsReserved}
          </div>

          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors ml-4 pl-4 border-l border-white/10 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
