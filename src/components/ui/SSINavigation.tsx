import { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  ChevronDown,
  Menu,
  X,
  Compass,
  GraduationCap,
  Waves,
  Home,
  Package,
  Calendar,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Check,
} from 'lucide-react';
import { hydroAudio } from '../../utils/audio';
import { PageType, EventTypeId, Language } from '../../types';
import { LANGUAGES } from '../../utils/i18n';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { ssiCourses, instructorCourses } from '../../data/courses';

interface SSINavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenBooking: (courseId?: string) => void;
  currency?: 'EUR' | 'USD' | 'EGP';
  setCurrency?: (c: 'EUR' | 'USD' | 'EGP') => void;
  isTransparent?: boolean;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

interface DropdownItem {
  title: string;
  desc?: string;
  action: () => void;
  badge?: string;
  image?: string;
  group?: string;
}

interface NavSectionConfig {
  id: string;
  label: string;
  pageTarget: PageType;
  icon?: any;
  items: DropdownItem[];
}

// Map section DOM IDs to corresponding navSection IDs
const SECTION_TO_NAV: Record<string, string> = {
  home: 'home',
  certificates: 'story',
  philosophy: 'story',
  story: 'story',
  founders: 'story',
  timeline: 'story',
  courses: 'courses',
  'training-modules': 'training',
  training: 'training',
  safaris: 'experience',
  experience: 'experience',
  accommodation: 'accommodation',
  packages: 'packages',
  calendar: 'calendar',
  'dates-section': 'calendar',
  blog: 'blog',
  faq: 'faq',
};

export function SSINavigation({
  currentPage,
  onNavigate,
  onOpenBooking,
  currency = 'EUR',
  setCurrency,
  language: propLanguage,
  onLanguageChange,
}: SSINavigationProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // SCROLL-SPY STATE: Tracks which section is currently active based on viewport position
  const [activeNavId, setActiveNavId] = useState<string>(() => {
    if (currentPage === 'home') return 'home';
    if (currentPage.startsWith('event-')) return 'calendar';
    if (currentPage.startsWith('course-')) return 'courses';
    return currentPage;
  });

  // Global or local language state with react-i18next
  const langContext = useLanguage();
  const { t, i18n } = useTranslation();
  const activeLanguage = propLanguage || (i18n.language as Language) || langContext.language || 'en';
  const currentLangObj = LANGUAGES.find((l) => l.code === activeLanguage) || LANGUAGES[0];

  const handleLanguageSelect = (newLang: Language) => {
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
    i18n.changeLanguage(newLang);
    langContext.setLanguage(newLang);
    setIsLangMenuOpen(false);
  };

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync activeNavId when currentPage changes externally
  useEffect(() => {
    setActiveNavId(
      currentPage === 'home'
        ? 'home'
        : currentPage.startsWith('event-')
        ? 'calendar'
        : currentPage.startsWith('course-')
        ? 'courses'
        : currentPage
    );
  }, [currentPage]);

  // =========================================================================
  // SCROLL-SPY IMPLEMENTATION
  // Monitors viewport scroll position and updates active menu item dynamically
  // =========================================================================
  useEffect(() => {
    let ticking = false;

    const handleScrollSpy = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 1. Top of page threshold: activate top-most item
          if (window.scrollY < 90) {
            setActiveNavId(currentPage === 'home' ? 'home' : currentPage);
            ticking = false;
            return;
          }

          // 2. Bottom of page threshold: activate last visible section (e.g. FAQ)
          const isAtBottom =
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70;

          // 3. Detect all sections present in the DOM that map to navigation items
          const sectionKeys = Object.keys(SECTION_TO_NAV);
          const sections: { id: string; top: number; navId: string }[] = [];

          sectionKeys.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              const top = rect.top + window.scrollY;
              sections.push({ id, top, navId: SECTION_TO_NAV[id] });
            }
          });

          if (sections.length === 0) {
            ticking = false;
            return;
          }

          // Sort sections in ascending order by vertical document offset
          sections.sort((a, b) => a.top - b.top);

          if (isAtBottom) {
            setActiveNavId(sections[sections.length - 1].navId);
            ticking = false;
            return;
          }

          // 4. Calculate active section with header clearance offset (150px)
          const scrollRef = window.scrollY + 150;
          let currentNavId = sections[0].navId;

          for (let i = 0; i < sections.length; i++) {
            if (sections[i].top <= scrollRef) {
              currentNavId = sections[i].navId;
            } else {
              break;
            }
          }

          setActiveNavId(currentNavId);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    // Execute on initial render
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [currentPage]);

  // Keep active button visible in scrollContainerRef if horizontally constrained
  useEffect(() => {
    if (scrollContainerRef.current && activeNavId) {
      const activeBtn = scrollContainerRef.current.querySelector<HTMLElement>(
        `[data-nav-id="${activeNavId}"]`
      );
      if (activeBtn) {
        const container = scrollContainerRef.current;
        const btnRect = activeBtn.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        if (btnRect.left < contRect.left || btnRect.right > contRect.right) {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
      }
    }
  }, [activeNavId]);

  const toggleAudio = () => {
    const playing = hydroAudio.toggle();
    setIsAudioPlaying(playing);
  };

  const handleMouseEnter = (sectionId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(sectionId);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 450);
  };

  // Lenis owns scrollTop — always reset through it, or its rAF overwrites the jump
  const scrollToTopInstant = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  const handleNavigate = (page: PageType) => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    onNavigate(page);
    scrollToTopInstant();
  };

  // Click handler: every header item opens its own dedicated page.
  // When you are ALREADY on that page, glide to the section instead.
  const handleNavItemClick = (section: NavSectionConfig) => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);

    // If target is home and we are already on home, smooth scroll to top
    if (section.pageTarget === 'home' && currentPage === 'home') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setActiveNavId('home');
      return;
    }

    // Already on the target page → glide to the section on THIS page
    const targetEl = document.getElementById(section.id);
    if (targetEl && currentPage === section.pageTarget) {
      const headerOffset = 90;
      const targetY = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
      if (window.__lenis) {
        window.__lenis.scrollTo(targetY, { duration: 1.2 });
      } else {
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
      setActiveNavId(section.id);
      return;
    }

    // Otherwise navigate to the dedicated page (always lands at the surface/top)
    onNavigate(section.pageTarget);
    scrollToTopInstant();
  };

  const handleNavigateToEvent = (eventTypeId: EventTypeId) => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    onNavigate(`event-${eventTypeId}` as PageType);
    scrollToTopInstant();
  };

  const navSections: NavSectionConfig[] = [
    {
      id: 'home',
      label: t('labels.home'),
      pageTarget: 'home',
      icon: Home,
      items: [
        {
          title: t('dropdowns.home.sanctuaryTitle'),
          desc: t('dropdowns.home.sanctuaryDesc'),
          action: () => handleNavigate('home'),
        },
        {
          title: t('dropdowns.home.heritageTitle'),
          desc: t('dropdowns.home.heritageDesc'),
          action: () => handleNavigate('home'),
        },
        {
          title: t('dropdowns.home.reviewsTitle'),
          desc: t('dropdowns.home.reviewsDesc'),
          action: () => handleNavigate('home'),
        },
        {
          title: t('dropdowns.home.startTitle'),
          desc: t('dropdowns.home.startDesc'),
          action: () => onOpenBooking(),
          badge: t('ui.quickBook'),
        },
      ],
    },
    {
      id: 'story',
      label: 'Our Story',
      pageTarget: 'story',
      icon: BookOpen,
      items: [
        {
          title: 'Why Freedive Dahab?',
          desc: 'Our sanctuary, legacy & Lighthouse Bay roots',
          action: () => handleNavigate('story'),
        },
        {
          title: 'Meet Our Pioneers',
          desc: 'Lotta Ericson, Linda Paganelli & Waleed Ghatas',
          action: () => handleNavigate('story'),
        },
        {
          title: 'Our Freediving Journey',
          desc: 'Photo chronicle & community milestones',
          action: () => handleNavigate('story'),
        },
      ],
    },
    {
      id: 'courses',
      label: t('labels.courses'),
      pageTarget: 'courses',
      icon: GraduationCap,
      items: [
        ...ssiCourses.map((c) => ({
          title: c.title,
          desc: `${c.durationDays} day${c.durationDays > 1 ? 's' : ''} • ${c.maxDepthMeters}m • €${c.priceEur}`,
          image: c.image.url,
          action: () => handleNavigate(`course-${c.slug}` as PageType),
          badge: c.id === 'ssi-level-1' ? t('ui.mostPopular') : undefined,
          group: 'Recreational Courses',
        })),
        ...instructorCourses.map((c) => ({
          title: c.title,
          desc: `${c.durationWeeksOrDays} • €${c.priceEur}`,
          image: c.image.url,
          action: () => handleNavigate(`course-${c.slug}` as PageType),
          badge: c.id === 'ssi-itc' ? t('ui.proAcademy') : undefined,
          group: 'Professional Academy',
        })),
      ],
    },
    {
      id: 'training',
      label: t('labels.training'),
      pageTarget: 'training',
      icon: Waves,
      items: [
        {
          title: t('dropdowns.training.buoyTitle'),
          desc: t('dropdowns.training.buoyDesc'),
          action: () => handleNavigate('training'),
        },
        {
          title: t('dropdowns.training.buddyTitle'),
          desc: t('dropdowns.training.buddyDesc'),
          action: () => handleNavigate('training'),
        },
        {
          title: t('dropdowns.training.campTitle'),
          desc: t('dropdowns.training.campDesc'),
          action: () => handleNavigateToEvent('training-week'),
          badge: t('ui.scheduled'),
        },
        {
          title: t('dropdowns.training.eqTitle'),
          desc: t('dropdowns.training.eqDesc'),
          action: () => handleNavigate('training'),
        },
        {
          title: t('dropdowns.training.apneaTitle'),
          desc: t('dropdowns.training.apneaDesc'),
          action: () => handleNavigate('training'),
        },
      ],
    },
    {
      id: 'experience',
      label: t('labels.experience'),
      pageTarget: 'experience',
      icon: Compass,
      items: [
        {
          title: t('dropdowns.experience.rasMohamedTitle'),
          desc: t('dropdowns.experience.rasMohamedDesc'),
          action: () => handleNavigateToEvent('ras-mohamed'),
          badge: t('ui.fullDay'),
        },
        {
          title: t('dropdowns.experience.blueHoleTitle'),
          desc: t('dropdowns.experience.blueHoleDesc'),
          action: () => handleNavigate('experience'),
        },
        {
          title: t('dropdowns.experience.nightTitle'),
          desc: t('dropdowns.experience.nightDesc'),
          action: () => handleNavigate('experience'),
        },
        {
          title: t('dropdowns.experience.desertTitle'),
          desc: t('dropdowns.experience.desertDesc'),
          action: () => handleNavigate('experience'),
        },
      ],
    },
    {
      id: 'accommodation',
      label: t('labels.accommodation'),
      pageTarget: 'accommodation',
      icon: Home,
      items: [
        {
          title: t('dropdowns.accommodation.seafrontTitle'),
          desc: t('dropdowns.accommodation.seafrontDesc'),
          action: () => handleNavigate('accommodation'),
        },
        {
          title: t('dropdowns.accommodation.ecoTitle'),
          desc: t('dropdowns.accommodation.ecoDesc'),
          action: () => handleNavigate('accommodation'),
        },
        {
          title: t('dropdowns.accommodation.suitesTitle'),
          desc: t('dropdowns.accommodation.suitesDesc'),
          action: () => handleNavigate('accommodation'),
        },
      ],
    },
    {
      id: 'packages',
      label: t('labels.packages'),
      pageTarget: 'packages',
      icon: Package,
      items: [
        {
          title: t('dropdowns.packages.zeroToHeroTitle'),
          desc: t('dropdowns.packages.zeroToHeroDesc'),
          action: () => handleNavigateToEvent('zero-to-hero'),
        },
        {
          title: t('dropdowns.packages.safariCampTitle'),
          desc: t('dropdowns.packages.safariCampDesc'),
          action: () => handleNavigate('packages'),
        },
        {
          title: t('dropdowns.packages.customTitle'),
          desc: t('dropdowns.packages.customDesc'),
          action: () => onOpenBooking(),
        },
      ],
    },
    {
      id: 'calendar',
      label: t('labels.calendar'),
      pageTarget: 'calendar',
      icon: Calendar,
      items: [
        {
          title: t('dropdowns.calendar.itcTitle'),
          desc: t('dropdowns.calendar.itcDesc'),
          action: () => handleNavigateToEvent('instructor-course'),
          badge: '2026',
        },
        {
          title: t('dropdowns.calendar.safariTitle'),
          desc: t('dropdowns.calendar.safariDesc'),
          action: () => handleNavigateToEvent('ras-mohamed'),
        },
        {
          title: t('dropdowns.calendar.campTitle'),
          desc: t('dropdowns.calendar.campDesc'),
          action: () => handleNavigateToEvent('training-week'),
        },
        {
          title: t('dropdowns.calendar.fullCalendarTitle'),
          desc: t('dropdowns.calendar.fullCalendarDesc'),
          action: () => handleNavigate('calendar'),
        },
      ],
    },
    {
      id: 'blog',
      label: t('labels.blog'),
      pageTarget: 'blog',
      icon: BookOpen,
      items: [
        {
          title: t('dropdowns.blog.blueHoleGuideTitle'),
          desc: t('dropdowns.blog.blueHoleGuideDesc'),
          action: () => handleNavigate('blog'),
        },
        {
          title: t('dropdowns.blog.eqGuideTitle'),
          desc: t('dropdowns.blog.eqGuideDesc'),
          action: () => handleNavigate('blog'),
        },
        {
          title: t('dropdowns.blog.packingTitle'),
          desc: t('dropdowns.blog.packingDesc'),
          action: () => handleNavigate('blog'),
        },
        {
          title: t('dropdowns.blog.safetyTitle'),
          desc: t('dropdowns.blog.safetyDesc'),
          action: () => handleNavigate('blog'),
        },
      ],
    },
    {
      id: 'faq',
      label: t('labels.faq'),
      pageTarget: 'faq',
      icon: HelpCircle,
      items: [
        {
          title: t('dropdowns.faq.beginnersTitle'),
          desc: t('dropdowns.faq.beginnersDesc'),
          action: () => handleNavigate('faq'),
        },
        {
          title: t('dropdowns.faq.medicalTitle'),
          desc: t('dropdowns.faq.medicalDesc'),
          action: () => handleNavigate('faq'),
        },
        {
          title: t('dropdowns.faq.gearTitle'),
          desc: t('dropdowns.faq.gearDesc'),
          action: () => handleNavigate('faq'),
        },
        {
          title: t('dropdowns.faq.travelTitle'),
          desc: t('dropdowns.faq.travelDesc'),
          action: () => handleNavigate('faq'),
        },
      ],
    },
  ];

  const coursesMenu = navSections.find((s) => s.id === 'courses');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0E3453]/95 backdrop-blur-xl border-b border-white/[0.08] py-2 sm:py-2.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#0E3453]/95 via-[#0E3453]/60 to-transparent py-2.5 sm:py-3.5'
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        
        {/* ======================================================== */}
        {/* LEFT: Clean Logo without any effects (Prominent & Clear) */}
        {/* ======================================================== */}
        <button
          onClick={() => handleNavigate('home')}
          className="flex items-center shrink-0 cursor-pointer bg-transparent border-none p-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded transition-opacity hover:opacity-95"
          aria-label="Freedive Dahab Home"
        >
          <img
            src="/logo-freedive-dahab.png"
            alt="Freedive Dahab"
            className="h-16 sm:h-20 lg:h-24 w-auto object-contain transition-transform duration-200 hover:scale-105"
          />
        </button>

        {/* ======================================================== */}
        {/* CENTER: Modern Scrollable Header with Pop-up Lists       */}
        {/* ======================================================== */}
        <div className="hidden lg:flex items-center flex-1 max-w-5xl mx-2 overflow-visible">
          <div
            ref={scrollContainerRef}
            className="w-full overflow-visible flex items-center justify-center gap-1 py-1"
          >
            {navSections.map((section) => {
              const isCurrent =
                activeNavId === section.id ||
                (section.id === 'calendar' && (currentPage.startsWith('event-') || activeNavId === 'calendar')) ||
                activeNavId === section.pageTarget;
              const isOpen = openDropdown === section.id;

              return (
                <div
                  key={section.id}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(section.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    data-nav-id={section.id}
                    onClick={() => handleNavItemClick(section)}
                    className={`px-3 py-1.5 rounded-full text-xs font-alata font-normal tracking-[0.06em] flex items-center gap-1.5 whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'text-white bg-white/15 ring-1 ring-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                    } ${isOpen ? 'bg-white/[0.08] text-white' : ''}`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)] animate-pulse shrink-0" />
                    )}
                    <span className="uppercase tracking-[0.09em]">{section.label}</span>
                  </button>

                  {/* Pop-up List Dropdown Menu (Courses uses the header-level mega menu below) */}
                  {isOpen && section.id !== 'courses' && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in zoom-in-95 duration-150 font-alata"
                      onMouseEnter={() => handleMouseEnter(section.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-80 rounded-xl bg-[#0E3453]/98 backdrop-blur-2xl border border-white/10 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
                        
                        {/* Dropdown Header */}
                        <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between mb-1">
                          <span className="text-[11px] font-alata font-normal tracking-[0.16em] uppercase text-cyan-300/90">
                            {section.label}
                          </span>
                          <button
                            onClick={() => handleNavigate(section.pageTarget)}
                            className="text-[10px] font-alata text-slate-400 hover:text-white flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>{t('ui.exploreAll')}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        {/* List Items */}
                        <div className="space-y-0.5 max-h-[420px] overflow-y-auto custom-scrollbar">
                          {section.items.map((item, idx) => {
                            const showGroup =
                              item.group && item.group !== section.items[idx - 1]?.group;
                            return (
                              <div key={idx}>
                                {showGroup && (
                                  <div className="px-3 pt-2.5 pb-1 text-[9px] font-mono uppercase tracking-[0.22em] text-cyan-400/70">
                                    {item.group}
                                  </div>
                                )}
                                <button
                                  onClick={item.action}
                                  className="w-full text-left p-2.5 rounded-lg hover:bg-white/[0.07] transition-all flex items-start gap-3 group/item cursor-pointer"
                                >
                                  {item.image && (
                                    <img
                                      src={item.image}
                                      alt=""
                                      loading="lazy"
                                      className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-xs font-medium text-slate-200 group-hover/item:text-white transition-colors truncate">
                                        {item.title}
                                      </span>
                                      {item.badge && (
                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shrink-0">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    {item.desc && (
                                      <span className="text-[11px] text-slate-400 font-light line-clamp-1 group-hover/item:text-slate-300 block">
                                        {item.desc}
                                      </span>
                                    )}
                                  </div>
                                </button>
                              </div>
                            );
                          })}
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT: Language with Flags + Sound + Book CTA + Hamburger */}
        {/* ======================================================== */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Language Switcher with Circular Flags Badge Signs (Header Navbar) */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-black/45 border border-white/15 hover:border-cyan-400/50 text-[11px] font-mono text-slate-200 hover:text-white transition-all cursor-pointer backdrop-blur-md shadow-sm"
              aria-expanded={isLangMenuOpen}
              aria-label="Select language"
              title="Change language / تغيير اللغة / Cambiar idioma / Sprache ändern"
            >
              <img
                src={currentLangObj.flagUrl}
                alt={currentLangObj.label}
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full object-cover shadow-sm ring-1 ring-white/25 shrink-0"
              />
              <span className="font-semibold uppercase tracking-wider text-[11px] font-mono">
                {currentLangObj.code}
              </span>
              <ChevronDown
                className={`w-2.5 h-2.5 text-slate-400 transition-transform duration-200 ${
                  isLangMenuOpen ? 'rotate-180 text-cyan-300' : ''
                }`}
              />
            </button>

            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 rounded-xl bg-[#0E3453]/98 backdrop-blur-2xl border border-white/10 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/5 z-50 animate-in fade-in zoom-in-95 duration-150 font-alata">
                <div className="px-2.5 py-1 text-[10px] font-mono tracking-widest text-slate-400 uppercase border-b border-white/5 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-cyan-400" />
                    <span>{t('ui.language')}</span>
                  </span>
                  <span className="text-[9px] text-cyan-400/80 font-mono">i18n</span>
                </div>
                <div className="space-y-0.5">
                  {LANGUAGES.map((lang) => {
                    const isSelected = activeLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/15 text-cyan-300 font-semibold ring-1 ring-cyan-400/30'
                            : 'text-slate-300 hover:bg-white/[0.08] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={lang.flagUrl}
                            alt={lang.label}
                            className="w-5 h-5 rounded-full object-cover shadow-sm ring-1 ring-white/20 shrink-0"
                          />
                          <div className="flex flex-col text-left">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium leading-none">{lang.nativeName}</span>
                              <span className="text-[10px] text-cyan-400/80 font-mono uppercase font-semibold">
                                ({lang.code})
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 leading-tight mt-0.5">
                              {lang.label}
                            </span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sound Ambience Button */}
          <button
            onClick={toggleAudio}
            className="p-2 rounded-full border border-white/10 hover:border-white/20 bg-black/30 text-slate-300 hover:text-white transition-all hidden md:flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            title="Toggle meditative underwater sound"
            aria-label="Toggle underwater hydrophone sound"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="text-[10px] text-cyan-300 hidden xl:inline">{t('ui.sound')}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] text-slate-400 hidden xl:inline">{t('ui.mute')}</span>
              </>
            )}
          </button>

          {/* Start Journey / Book CTA Button */}
          <button
            onClick={() => onOpenBooking()}
            className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white text-[#0E3453] hover:bg-slate-100 font-alata text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-200 flex items-center gap-1.5 cursor-pointer hover:shadow-lg hover:scale-105"
          >
            <span>{t('ui.bookCta')}</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-black/40 text-slate-300 hover:text-white lg:hidden cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* ======================================================== */}
      {/* COURSES MEGA MENU — horizontal card layout with the      */}
      {/* original SSI card images at readable size. Rendered at   */}
      {/* header level so it centers in the viewport.              */}
      {/* ======================================================== */}
      {openDropdown === 'courses' && coursesMenu && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 font-alata"
          onMouseEnter={() => handleMouseEnter('courses')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="border-b border-white/10 bg-[#0E3453]/97 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.85)]">
            <div className="max-w-7xl mx-auto px-8 py-5">

              {/* Panel header */}
              <div className="px-1 pb-3 flex items-center justify-between">
                <span className="text-[11px] tracking-[0.16em] uppercase text-cyan-300/90">
                  {coursesMenu.label}
                </span>
                <button
                  onClick={() => handleNavigate(coursesMenu.pageTarget)}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5 cursor-pointer"
                >
                  <span>{t('ui.exploreAll')}</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Horizontal card rows, grouped like the template */}
              {['Recreational Courses', 'Professional Academy'].map((groupName) => (
                <div key={groupName} className="mb-3 last:mb-0">
                  <div className="px-1 pb-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-cyan-400/70">
                    {groupName}
                  </div>
                  <div
                    className={`grid gap-3 ${
                      groupName === 'Recreational Courses' ? 'grid-cols-4' : 'grid-cols-5'
                    }`}
                  >
                    {coursesMenu.items
                      .filter((item) => item.group === groupName)
                      .map((item, idx) => (
                        <button
                          key={idx}
                          onClick={item.action}
                          className="group/card text-left rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/60 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                          {/* Original SSI card artwork at full card width */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.title}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453]/60 via-transparent to-transparent" />
                            {item.badge && (
                              <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-mono bg-cyan-500/25 text-cyan-100 border border-cyan-400/40 backdrop-blur-sm">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="p-2.5 space-y-0.5">
                            <div className="text-xs font-medium text-slate-100 group-hover/card:text-cyan-200 transition-colors leading-tight line-clamp-2">
                              {item.title}
                            </div>
                            {item.desc && (
                              <div className="text-[10px] font-mono text-cyan-300/90">
                                {item.desc}
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MOBILE DRAWER: Scrollable with Accordion Pop-ups         */}
      {/* ======================================================== */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0E3453]/98 backdrop-blur-2xl border-b border-white/10 px-5 py-6 space-y-3 text-sm font-sans animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto">
          
          {/* Language Switcher on Mobile with Circular Flag Signs */}
          <div className="flex flex-col pb-3 border-b border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('ui.language')}:</span>
              </span>
              <span className="text-[11px] text-cyan-300 uppercase font-semibold flex items-center gap-1.5">
                <img
                  src={currentLangObj.flagUrl}
                  alt={currentLangObj.label}
                  className="w-4 h-4 rounded-full object-cover shadow-sm ring-1 ring-white/20"
                />
                <span>{currentLangObj.nativeName}</span>
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black/40 border border-white/10 rounded-xl p-1.5 text-xs font-mono">
              {LANGUAGES.map((lang) => {
                const isSelected = activeLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`p-2.5 rounded-lg text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border border-transparent'
                    }`}
                    title={`${lang.nativeName} (${lang.label})`}
                  >
                    <img
                      src={lang.flagUrl}
                      alt={lang.label}
                      className="w-5 h-5 rounded-full object-cover shadow-sm ring-1 ring-white/20 shrink-0"
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs text-slate-200 font-medium">{lang.nativeName}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">{lang.code}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nav Sections with Mobile Accordions */}
          {navSections.map((section) => {
            const isExpanded = expandedMobile === section.id;
            const isCurrent =
              activeNavId === section.id ||
              (section.id === 'calendar' && (currentPage.startsWith('event-') || activeNavId === 'calendar')) ||
              activeNavId === section.pageTarget;

            return (
              <div key={section.id} className="border-b border-white/5 pb-2">
                <div className="flex items-center justify-between py-2">
                  <button
                    onClick={() => handleNavItemClick(section)}
                    className={`text-left font-medium transition-colors flex items-center gap-2 ${
                      isCurrent ? 'text-cyan-300 font-semibold' : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)] animate-pulse" />
                    )}
                    <span>{section.label}</span>
                  </button>
                  <button
                    onClick={() => setExpandedMobile(isExpanded ? null : section.id)}
                    className="p-1.5 text-slate-400 hover:text-white"
                    aria-label={`Expand ${section.label}`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-cyan-300' : ''
                      }`}
                    />
                  </button>
                </div>

                {isExpanded && (
                  <div className="pl-3 pr-1 py-2 space-y-2 bg-white/[0.02] rounded-lg mb-2">
                    {section.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={item.action}
                        className="w-full text-left py-1.5 flex items-center justify-between text-xs text-slate-300 hover:text-cyan-300 cursor-pointer"
                      >
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick CTA on Mobile */}
          <div className="pt-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-white text-[#0E3453] font-semibold text-center flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-100"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('ui.bookNow')}</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
}
