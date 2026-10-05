import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WaterCaustics } from '../story/WaterCaustics';
import { LetterReveal } from '../ui/LetterReveal';
import { PageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    markers: false,
  });
}

interface HeroSurfaceProps {
  onDescend: () => void;
  onOpenBooking: () => void;
  onNavigate?: (page: PageType) => void;
  currency?: 'EUR' | 'USD' | 'EGP';
  setCurrency?: (c: 'EUR' | 'USD' | 'EGP') => void;
}

export function HeroSurface({
  onDescend,
  onOpenBooking,
  onNavigate,
}: HeroSurfaceProps) {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();

  const containerRef = useRef<HTMLDivElement>(null);
  const targetPortalRef = useRef<HTMLDivElement>(null);
  const depthGaugeRef = useRef<HTMLElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Depth display calculation based on scroll progress (02M -> 32M)
  const currentDepth = Math.round(2 + scrollProgress * 30);
  const formattedDepth = currentDepth < 10 ? `0${currentDepth}` : `${currentDepth}`;

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Use GSAP Context for clean lifecycle management & React 19 safety
    const ctx = gsap.context(() => {
      const triggerElement = containerRef.current;
      const targetElement = targetPortalRef.current;

      if (!triggerElement || !targetElement) return;

      // ========================================================
      // 1. GSAP ScrollTrigger: ANIMATE FROM TO (Width 50% -> 100%)
      // ========================================================
      const isMobile = window.innerWidth < 640;
      const startWidth = isMobile ? '78%' : '50%';

      gsap.fromTo(
        targetElement,
        {
          width: startWidth,
          borderRadius: isMobile ? '24px' : '36px',
        },
        {
          width: '100%',
          borderRadius: '0px',
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            },
          },
        }
      );

      // ========================================================
      // 2. GSAP ScrollTrigger: ANIMATE FROM (Height / Scale Reveal)
      // ========================================================
      gsap.from(targetElement, {
        height: '92vh',
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top center',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // ========================================================
      // 3. GSAP ScrollTrigger: SLIDE IN FROM RIGHT (ToggleActions)
      // ========================================================
      if (depthGaugeRef.current) {
        gsap.from(depthGaugeRef.current, {
          opacity: 0,
          x: '80px',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: triggerElement,
            toggleActions: 'restart pause resume reset',
            start: 'top 80%',
          },
        });
      }

      // ========================================================
      // 4. GSAP ScrollTrigger: GRID / PHASE TITLE CHANGE (.is--active)
      // ========================================================
      const gridWrappers = triggerElement.querySelectorAll('.grid_wrapper');
      gridWrappers.forEach((wrapper, index) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
              setActiveStage(index);
              const items = document.querySelectorAll('.grid_text-item');
              items.forEach((item) => item.classList.remove('is--active'));
              items[index]?.classList.add('is--active');
            },
            onEnterBack: () => {
              setActiveStage(index);
              const items = document.querySelectorAll('.grid_text-item');
              items.forEach((item) => item.classList.remove('is--active'));
              items[index]?.classList.add('is--active');
            },
          },
        });
      });

      // Phase content cross-fades scrubbed with descent
      if (phase1Ref.current && phase2Ref.current && phase3Ref.current) {
        // Phase 1 fades out smoothly by 35% scroll
        gsap.to(phase1Ref.current, {
          opacity: 0,
          y: -40,
          pointerEvents: 'none',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top top',
            end: '38% top',
            scrub: 1,
          },
        });

        // Phase 2 fades in between 30% and 50%, fades out by 75%
        gsap.fromTo(
          phase2Ref.current,
          { opacity: 0, y: 50, pointerEvents: 'none' },
          {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            ease: 'none',
            scrollTrigger: {
              trigger: triggerElement,
              start: '28% top',
              end: '48% top',
              scrub: 1,
            },
          }
        );

        gsap.to(phase2Ref.current, {
          opacity: 0,
          y: -30,
          pointerEvents: 'none',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerElement,
            start: '62% top',
            end: '75% top',
            scrub: 1,
          },
        });

        // Phase 3 fades in from 70% to 95%
        gsap.fromTo(
          phase3Ref.current,
          { opacity: 0, y: 50, pointerEvents: 'none' },
          {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            ease: 'none',
            scrollTrigger: {
              trigger: triggerElement,
              start: '70% top',
              end: '92% top',
              scrub: 1,
            },
          }
        );
      }

      // Initial state: set first item active
      const firstItem = document.querySelector('.grid_text-item');
      firstItem?.classList.add('is--active');

      // Refresh ScrollTrigger calculations
      ScrollTrigger.refresh();
    }, containerRef);

    // Refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  const handleStartJourney = () => {
    if (onNavigate) {
      onNavigate('courses');
    } else {
      const el = document.getElementById('courses');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTalkToInstructor = () => {
    onOpenBooking();
  };

  return (
    <div
      ref={containerRef}
      id="home"
      className="trigger-class trigger-element relative w-full min-h-[250vh] sm:min-h-[280vh] bg-[#01060c] text-white select-none"
    >
      {/* ======================================================== */}
      {/* 3 SCROLLTRIGGER GRID WRAPPER ZONES FOR PHASE SWITCHING   */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between">
        <div className="grid_wrapper w-full h-[35%]" data-index="0" />
        <div className="grid_wrapper w-full h-[35%]" data-index="1" />
        <div className="grid_wrapper w-full h-[30%]" data-index="2" />
      </div>

      {/* ======================================================== */}
      {/* STICKY FULLSCREEN CINEMATIC DEPTH STAGE                  */}
      {/* ======================================================== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* ======================================================== */}
        {/* 1. EXPANDING CINEMATIC PORTAL (.target-class)             */}
        {/* GSAP fromTo: width 50% -> 100% with scrub: 1             */}
        {/* ======================================================== */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <div
            ref={targetPortalRef}
            className="target-class relative h-full w-full overflow-hidden shadow-[0_0_90px_rgba(0,0,0,0.85)] border border-cyan-400/20"
          >
            {/* High-Resolution Static Underwater Image */}
            <img
              src="/hero-freediving-course-level-one.jpg"
              alt="Freediver descending through a sunlit underwater canyon in Dahab"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out"
              style={{
                transform: `scale(${1 + scrollProgress * 0.12}) translateY(${scrollProgress * -20}px)`,
              }}
              loading="eager"
              referrerPolicy="no-referrer"
            />

            {/* Living water surface: animated caustic shimmer */}
            <WaterCaustics />

            {/* Dynamic Depth Gradient: Becomes richer blue as you descend */}
            <div
              className="absolute inset-0 transition-colors duration-500 ease-out"
              style={{
                backgroundColor: `rgba(1, 7, 14, ${0.22 + scrollProgress * 0.65})`,
              }}
            />

            {/* Caustic Surface Light Rays */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{ opacity: Math.max(1 - scrollProgress * 3.5, 0) }}
            >
              <div className="absolute top-0 left-1/4 w-3/4 h-96 bg-gradient-to-b from-cyan-300/10 via-sky-400/5 to-transparent blur-3xl transform -rotate-12" />
              <div className="absolute top-10 right-1/5 w-1/2 h-80 bg-gradient-to-b from-teal-200/10 to-transparent blur-2xl transform rotate-6" />
            </div>

            {/* Deep Coral Reef Seabed at Depth (Revealed at 20M-32M as you reach bottom) */}
            <div
              className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
              style={{
                opacity: Math.min(Math.max((scrollProgress - 0.45) / 0.5, 0), 0.8),
              }}
            >
              <img
                src="/deep-coral-reef.jpg"
                alt="Dahab Red Sea Deep Coral Reef at 32M depth"
                className="w-full h-full object-cover object-bottom filter contrast-110 brightness-95"
              />
              <div className="absolute inset-0 bg-[#010814]/30 mix-blend-multiply" />
            </div>

            {/* Deep Water Vignette & Soft Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#01060c]/85 via-transparent to-[#01060c]/60 pointer-events-none" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* ======================================================== */}
        {/* 3. CENTER STAGE: EDITORIAL CINEMATIC PHASES             */}
        {/* ======================================================== */}
        <div className="relative z-20 flex-1 flex flex-col justify-between max-w-6xl mx-auto px-4 sm:px-8 w-full pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 text-center">
          
          {/* -------------------------------------------------------- */}
          {/* PHASE 1: SURFACE & MAIN HOOK                             */}
          {/* Sentence 1 ABOVE the diver, Sentence 2 BELOW the diver   */}
          {/* Diver completely visible in center                       */}
          {/* -------------------------------------------------------- */}
          <div
            ref={phase1Ref}
            className="flex-1 flex flex-col justify-between items-center text-center h-full w-full will-change-transform"
          >
            {/* TOP ZONE: Eyebrow + Line 1 ABOVE THE DIVER (One Sentence) */}
            <div className="flex flex-col items-center pt-2 sm:pt-4">
              <p className="text-[10px] sm:text-xs font-alata font-normal tracking-[0.24em] text-cyan-200/90 uppercase mb-2 sm:mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {t('hero.locationEyebrow')}
              </p>

              {/* Line 1: Milestone sentence positioned above the diver */}
              <h1
                className="font-tidal text-xl sm:text-2xl md:text-3xl lg:text-[2rem] leading-snug uppercase tracking-[0.05em] font-normal text-slate-50 drop-shadow-[0_3px_20px_rgba(0,0,0,0.9)] text-balance max-w-2xl"
                style={{
                  fontFamily: isRtl ? "'Beiruti', sans-serif" : "'Tidal Astral Grotesk', 'Bebas Neue', sans-serif",
                }}
              >
                <LetterReveal
                  as="span"
                  text={t('hero.line1')}
                  className="inline-block"
                  delay={0.25}
                  stagger={0.028}
                  duration={0.8}
                  wholeLine={isRtl}
                />
              </h1>
            </div>

            {/* DIVER CLEARANCE WINDOW: 100% unobstructed opening for the diver to be fully seen */}
            <div
              className="flex-1 w-full min-h-[160px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[320px] pointer-events-none"
              aria-hidden="true"
            />

            {/* BOTTOM ZONE: Line 2 BELOW THE DIVER (One Sentence) + CTAs + Microcopy */}
            <div className="flex flex-col items-center pb-2 sm:pb-3 w-full">
              {/* Line 2: Milestone sentence positioned below the diver */}
              <div
                className="font-tidal text-base sm:text-lg md:text-xl lg:text-[1.35rem] leading-snug uppercase tracking-[0.05em] font-normal text-[#06b6d4] drop-shadow-[0_0_32px_rgba(6,182,212,0.65)] text-balance max-w-2xl mb-4 sm:mb-5"
                style={{
                  fontFamily: isRtl ? "'Beiruti', sans-serif" : "'Tidal Astral Grotesk', 'Bebas Neue', sans-serif",
                }}
              >
                <LetterReveal
                  as="span"
                  text={t('hero.line2')}
                  className="inline-block"
                  delay={0.7}
                  stagger={0.025}
                  duration={0.8}
                  wholeLine={isRtl}
                />
              </div>

              {/* CTAs */}
              <div
                className="animate-in fade-in duration-1000 flex flex-row items-center justify-center gap-3 sm:gap-5 mb-4 sm:mb-5"
                style={{ animationDelay: '650ms' }}
              >
                <button
                  onClick={handleStartJourney}
                  className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-[#01060c] font-alata text-xs font-semibold uppercase tracking-[0.1em] hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
                >
                  <span>{t('hero.exploreCourses')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleTalkToInstructor}
                  className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:border-cyan-400/60 text-slate-200 hover:text-white font-alata text-xs font-normal uppercase tracking-[0.1em] flex items-center gap-2 transition-all cursor-pointer hover:bg-white/[0.08]"
                >
                  <span>{t('hero.bookInquireNow')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300" />
                </button>
              </div>

              {/* Trust Microcopy */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-alata font-normal text-slate-300/80 tracking-wider">
                <span>3,500+ divers trained</span>
                <span className="text-cyan-400/50">·</span>
                <span>Small groups</span>
                <span className="text-cyan-400/50">·</span>
                <span>Beginners welcome</span>
                <span className="hidden sm:inline text-cyan-400/50">·</span>
                <span className="hidden sm:inline text-cyan-300/90 font-medium">SSI Diamond ITC #720079</span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* PHASE 2: POETIC IMMERSION (15M Descent Realm)            */}
          {/* -------------------------------------------------------- */}
          <div
            ref={phase2Ref}
            className="absolute inset-0 flex items-center justify-center text-center opacity-0 pointer-events-none px-6"
          >
            <div className="space-y-6 max-w-3xl mx-auto py-6">
              <span className="text-[11px] font-alata font-normal tracking-[0.24em] uppercase text-cyan-400/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                THE REALM BENEATH
              </span>

              {/* Bebas Neue Headline with White & Turquoise mix */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bebas text-white tracking-[0.06em] leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                “THE <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">DEEPER</span> YOU GO,
                <br />
                THE <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">QUIETER</span> IT BECOMES.”
              </h2>

              <p className="text-sm sm:text-base font-alata font-normal text-slate-300 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                That's where the journey begins.
              </p>

              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-alata text-slate-300 shadow-xl">
                  <span>Current Depth:</span>
                  <span className="font-bebas text-cyan-300 text-lg tracking-wider">{formattedDepth} M</span>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* PHASE 3: THE ACTION & PATHWAY (32M Depth Reached)        */}
          {/* -------------------------------------------------------- */}
          <div
            ref={phase3Ref}
            className="absolute inset-0 flex items-center justify-center text-center opacity-0 pointer-events-none px-6"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="text-[11px] font-alata font-normal tracking-[0.24em] uppercase text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                CHOOSE YOUR DEPTH
              </span>

              {/* Bebas Neue Headline with Turquoise accent */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bebas text-white tracking-[0.05em] leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                READY TO TAKE YOUR <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">FIRST BREATH</span> UNDERWATER?
              </h2>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleStartJourney}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#01060c] font-alata text-xs font-semibold uppercase tracking-[0.1em] hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xl hover:scale-105"
                >
                  <span>START YOUR JOURNEY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleTalkToInstructor}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 text-white font-alata text-xs font-normal uppercase tracking-[0.1em] flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-md"
                >
                  <span>TALK TO AN INSTRUCTOR</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-300" />
                </button>
              </div>

              {/* Pathway Breadcrumbs — Alata */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-alata text-slate-400 tracking-widest uppercase">
                <span className="hover:text-cyan-300 transition-colors cursor-pointer" onClick={handleStartJourney}>
                  BEGINNER
                </span>
                <span>→</span>
                <span className="hover:text-cyan-300 transition-colors cursor-pointer" onClick={handleStartJourney}>
                  INTERMEDIATE
                </span>
                <span>→</span>
                <span className="hover:text-cyan-300 transition-colors cursor-pointer" onClick={handleStartJourney}>
                  ADVANCED
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 4. BOTTOM BAR: SCROLL INVITATION & DEPTH STATUS          */}
        {/* ======================================================== */}
        <footer className="relative z-20 pb-6 sm:pb-8 px-6 sm:px-12 flex items-center justify-between text-slate-400 text-xs font-alata">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[11px] uppercase tracking-widest text-slate-400">
              Dahab, South Sinai, Egypt
            </span>
          </div>

          <div className="hidden sm:block text-[11px] font-alata text-slate-400">
            <span>{Math.round(scrollProgress * 100)}% Immersion</span>
          </div>
        </footer>

      </div>
    </div>
  );
}

// Named alias and default export for flexibility
export const HeroSection = HeroSurface;
export default HeroSurface;
