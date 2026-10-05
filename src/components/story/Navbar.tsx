import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { storyConfig } from '../../config/storyConfig';

interface NavbarProps {
  scrollProgress: number; // 0 to 1
  activeSection: string;
  onNavigate: (targetId: string) => void;
}

export function Navbar({ scrollProgress, activeSection, onNavigate }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at very top
      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 10) {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = storyConfig.site.navLinks;

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    onNavigate(targetId);
  };

  return (
    <>
      {/* Top Turquoise Scroll Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#2EC4B6] via-cyan-300 to-[#2EC4B6] z-50 origin-left shadow-[0_0_8px_#2EC4B6]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Floating Glass Pill Navbar Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -90,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-40 px-4 md:px-8 max-w-5xl mx-auto flex items-center justify-between pointer-events-none"
      >
        {/* Floating Pill Container */}
        <div className="w-full flex items-center justify-between px-4 md:px-6 py-2.5 rounded-full bg-slate-950/65 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/40 pointer-events-auto">
          {/* Zone 1: Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center gap-2 group cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full py-1 pr-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#2EC4B6] shadow-[0_0_8px_#2EC4B6] group-hover:scale-125 transition-transform" />
            <span className="font-serif-display text-sm md:text-base font-semibold tracking-wide text-white group-hover:text-cyan-300 transition-colors">
              Freedive Dahab
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Main story navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-inter font-medium"
          >
            {navItems.map((item, index) => {
              const targetId = item.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <div key={item.label} className="flex items-center">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isActive
                        ? 'text-cyan-300 bg-white/10 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                  {index < navItems.length - 1 && (
                    <span className="text-white/20 select-none text-[10px]">·</span>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Zone 3: Action / Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleLinkClick('#dive-deeper')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-900 bg-[#2EC4B6] hover:bg-cyan-300 transition-all shadow-[0_0_12px_rgba(46,196,182,0.4)] hover:shadow-[0_0_18px_rgba(46,196,182,0.7)] cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Dive Deeper</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#061826]/95 flex flex-col justify-center px-8 md:hidden"
          >
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#2EC4B6] font-mono">
                The Descent Navigation
              </span>

              <nav className="flex flex-col space-y-4">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className="flex items-center justify-between py-2 text-2xl font-serif-display font-medium text-slate-100 hover:text-[#2EC4B6] transition-colors border-b border-white/5"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-slate-400 tabular-nums">
                      ~{item.depthTarget}m
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleLinkClick('#dive-deeper')}
                  className="w-full py-3.5 rounded-xl bg-[#2EC4B6] text-slate-900 font-medium text-sm text-center shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
                >
                  <span>Begin The Descent</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
