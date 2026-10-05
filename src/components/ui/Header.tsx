import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import gsap from 'gsap';
import { hydroAudio } from '../../utils/audio';
import { FreediveLogo } from './FreediveLogo';

interface HeaderProps {
  onOpenBooking: () => void;
  currency?: 'EUR' | 'USD' | 'EGP';
  setCurrency?: (c: 'EUR' | 'USD' | 'EGP') => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const brandLinkRef = useRef<HTMLAnchorElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal sticky header once user scrolls down past the hero surface
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP magnetic fluid follow for the Header brand
  useEffect(() => {
    if (!brandLinkRef.current || !brandTextRef.current) return;

    const brand = brandLinkRef.current;
    const text = brandTextRef.current;

    const xTextTo = gsap.quickTo(text, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTextTo = gsap.quickTo(text, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = brand.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist < 180) {
        const pull = Math.pow(1 - dist / 180, 1.6);
        xTextTo(dx * 0.18 * pull);
        yTextTo(dy * 0.18 * pull);
      } else {
        xTextTo(0);
        yTextTo(0);
      }
    };

    const handleMouseLeave = () => {
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    brand.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      brand.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const toggleAudio = () => {
    const isPlaying = hydroAudio.toggle();
    setIsAudioPlaying(isPlaying);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-black/20 backdrop-blur-md border-b border-white/5 shadow-lg opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 -translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between pointer-events-auto">
          
          {/* GSAP-Powered Interactive Magnetic Logo & Brand */}
          <a
            ref={brandLinkRef}
            href="#home"
            className="flex items-center gap-3.5 group relative select-none"
          >
            <FreediveLogo size={40} interactive={true} magnetic={true} />
            <div ref={brandTextRef} className="flex flex-col">
              <span className="font-serif tracking-[0.2em] text-sm font-bold text-white uppercase group-hover:text-cyan-300 transition-colors">
                Freedive Dahab
              </span>
            </div>
          </a>

          {/* Desktop Navigation (Home, Courses, Calendar, Packages, Accommodation, Freediving with dropdown, Blog) */}
          <nav className="hidden md:flex items-center gap-6 xl:gap-7 text-xs font-mono uppercase tracking-wider text-slate-300">
            <a href="#home" className="hover:text-cyan-300 transition-colors">Home</a>
            <a href="#courses" className="hover:text-cyan-300 transition-colors">Courses</a>
            <a href="#calendar" className="hover:text-cyan-300 transition-colors">Calendar</a>
            <a href="#packages" className="hover:text-cyan-300 transition-colors">Packages</a>
            <a href="#accommodation" className="hover:text-cyan-300 transition-colors">Accommodation</a>
            
            {/* Freediving with hover list */}
            <div className="relative group/hd">
              <a href="#courses" className="flex items-center gap-1 hover:text-cyan-300 transition-colors py-1">
                <span>Freediving</span>
                <span className="text-[9px] text-cyan-400">▾</span>
              </a>
              <div className="absolute left-0 top-full hidden group-hover/hd:block z-50 min-w-[210px] bg-[#141b26]/98 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-2 px-1 animate-in fade-in duration-150">
                {[
                  { label: 'SSI COURSES', href: '#courses' },
                  { label: 'TRAINING', href: '#courses' },
                  { label: 'SPECIALTIES', href: '#courses' },
                  { label: 'MASTER PROGRAM', href: '#courses' },
                  { label: 'INSTRUCTOR', href: '#courses' },
                  { label: 'EQUALISATION CLASS', href: '#courses' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-3 py-1.5 text-[11px] font-sans font-bold tracking-wider text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded transition-all"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <a href="#blog" className="hover:text-cyan-300 transition-colors">Blog</a>
          </nav>

          {/* Actions & Audio Toggle */}
          <div className="flex items-center gap-4">
            
            {/* Ambient Hydrophone Audio Toggle */}
            <button
              onClick={toggleAudio}
              className="p-2 rounded-full border border-white/10 hover:border-cyan-400/60 bg-slate-900/40 text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5 text-xs font-mono"
              title={isAudioPlaying ? "Mute underwater ambience" : "Listen to deep hydrophone soundscape"}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="hidden sm:inline text-[10px] text-cyan-300">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline text-[10px] text-slate-400">AMBIENCE</span>
                </>
              )}
            </button>

            {/* Book Now Button */}
            <button
              onClick={onOpenBooking}
              className="btn-luxury text-white text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <span>BOOK NOW</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-white/10 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl p-6 flex flex-col justify-between md:hidden animate-in fade-in duration-200">
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FreediveLogo size={32} />
              <span className="font-serif text-lg font-bold text-white">Freedive Dahab</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-lg font-serif text-slate-200 overflow-y-auto max-h-[60vh] py-2">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Home</a>
            <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Courses</a>
            <a href="#calendar" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Calendar</a>
            <a href="#packages" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Packages</a>
            <a href="#accommodation" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Accommodation</a>
            <div className="pl-3 border-l border-cyan-400/30 flex flex-col gap-2 py-1">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Freediving</span>
              <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="text-sm text-slate-300 hover:text-cyan-300">SSI Courses</a>
              <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="text-sm text-slate-300 hover:text-cyan-300">Training & Specialties</a>
              <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="text-sm text-slate-300 hover:text-cyan-300">Instructor & Equalisation</a>
            </div>
            <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Blog</a>
          </nav>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 rounded-xl bg-cyan-500 text-black font-bold uppercase tracking-wider text-xs"
            >
              Reserve Program Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
