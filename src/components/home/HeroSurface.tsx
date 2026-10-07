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

// Deterministic bubble field (stable between renders, no Math.random flicker)
const BUBBLES = Array.from({ length: 22 }, (_, i) => {
  const seed = (n: number) => ((Math.sin(i * 127.1 + n * 311.7) + 1) / 2);
  return {
    left: 3 + seed(1) * 94,
    size: 3 + seed(2) * 9,
    dur: 11 + seed(3) * 14,
    delay: -seed(4) * 22,
    drift: (seed(5) - 0.5) * 70,
    op: 0.22 + seed(6) * 0.4,
  };
});

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
      // 1. ScrollTrigger: full-bleed stage + scroll progress driver
      // (the portal is full-screen from the start — Convex style)
      // ========================================================
      const targetEl = targetElement as HTMLElement;
      targetEl.style.width = '100%';
      targetEl.style.borderRadius = '0px';

      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
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

      // Phase content cross-fades scrubbed with descent (two phases)
      if (phase1Ref.current && phase2Ref.current) {
        // Phase 1 fades out smoothly by 35% scroll
        gsap.to(phase1Ref.current, {
          opacity: 0,
          y: -40,
          pointerEvents: 'none',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top top',
            end: '35% top',
            scrub: 1,
          },
        });

        // Phase 2 fades in between 30% and 52%, holds, fades out near the end
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
              start: '30% top',
              end: '52% top',
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
            start: '82% top',
            end: '98% top',
            scrub: 1,
          },
        });
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
      className="trigger-class trigger-element relative w-full min-h-[200vh] sm:min-h-[220vh] bg-[#081F35] text-white select-none"
    >
        {/* ======================================================== */}
        {/* 2 SCROLLTRIGGER GRID WRAPPER ZONES FOR PHASE SWITCHING   */}
        {/* ======================================================== */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between">
          <div className="grid_wrapper w-full h-[50%]" data-index="0" />
          <div className="grid_wrapper w-full h-[50%]" data-index="1" />
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
            className="target-class relative h-full w-full overflow-hidden"
          >
            {/* Cinematic underwater vortex loop (the fish-school whirlpool) */}
            <video
              className="absolute inset-0 w-full h-full object-cover object-center"
              src="/videos/vortex-loop.mp4"
              poster="/videos/vortex-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Sunlight bursting through a swirling school of fish beneath the Red Sea surface"
              style={{
                transform: `scale(${1.06 + scrollProgress * 0.14}) translateY(${scrollProgress * -24}px)`,
              }}
            />

            {/* Brand grading: pull the footage into the two blues */}
            <div className="absolute inset-0 bg-[#0E3453]/45 mix-blend-multiply pointer-events-none" />
            <div
              className="absolute inset-0 mix-blend-color pointer-events-none"
              style={{ backgroundColor: 'rgba(34, 98, 140, 0.45)' }}
            />

            {/* Living water surface: animated caustic shimmer */}
            <WaterCaustics />

            {/* Dynamic Depth Gradient: Becomes richer blue as you descend */}
            <div
              className="absolute inset-0 transition-colors duration-500 ease-out pointer-events-none"
              style={{
                backgroundColor: `rgba(8, 31, 53, ${0.18 + scrollProgress * 0.62})`,
              }}
            />

            {/* God-rays: swaying surface light shafts */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500"
              style={{ opacity: Math.max(1 - scrollProgress * 2.2, 0.12) }}
            >
              <div
                className="light-ray absolute -top-24 left-[18%] w-56 h-[85vh] blur-2xl"
                style={{
                  '--ray-rot': '-14deg',
                  '--ray-dur': '9s',
                  '--ray-op': '0.5',
                  background:
                    'linear-gradient(180deg, rgba(169,210,236,0.28) 0%, rgba(169,210,236,0.05) 60%, transparent 100%)',
                } as React.CSSProperties}
              />
              <div
                className="light-ray absolute -top-24 left-[46%] w-72 h-[95vh] blur-3xl"
                style={{
                  '--ray-rot': '-7deg',
                  '--ray-dur': '12s',
                  '--ray-op': '0.38',
                  background:
                    'linear-gradient(180deg, rgba(242,248,252,0.22) 0%, rgba(169,210,236,0.04) 55%, transparent 100%)',
                } as React.CSSProperties}
              />
              <div
                className="light-ray absolute -top-24 right-[12%] w-48 h-[80vh] blur-2xl"
                style={{
                  '--ray-rot': '10deg',
                  '--ray-dur': '10s',
                  '--ray-op': '0.34',
                  background:
                    'linear-gradient(180deg, rgba(169,210,236,0.24) 0%, transparent 85%)',
                } as React.CSSProperties}
              />
            </div>

            {/* Rising bubble field */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              {BUBBLES.map((b, i) => (
                <span
                  key={i}
                  className="bubble"
                  style={{
                    left: `${b.left}%`,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    '--bubble-dur': `${b.dur}s`,
                    '--bubble-delay': `${b.delay}s`,
                    '--bubble-drift': `${b.drift}px`,
                    '--bubble-op': `${b.op}`,
                  } as React.CSSProperties}
                />
              ))}
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
              <div className="absolute inset-0 bg-[#0E3453]/30 mix-blend-multiply" />
            </div>

            {/* Deep Water Vignette & Soft Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081F35]/85 via-transparent to-[#081F35]/60 pointer-events-none" />
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

            {/* CENTER STAGE: brand logo floating in the vortex — buoyancy + rotating dashed ring + glow */}
            <div
              className="flex-1 w-full flex items-center justify-center pointer-events-none min-h-[150px] sm:min-h-[200px] md:min-h-[240px]"
              aria-hidden="true"
            >
              <div className="relative animate-ocean-buoyancy">
                <svg
                  viewBox="0 0 200 200"
                  className="spin-slow absolute -inset-5 sm:-inset-7 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)]"
                  fill="none"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="94"
                    stroke="rgba(169,210,236,0.4)"
                    strokeWidth="1"
                    strokeDasharray="2.5 9"
                  />
                </svg>
                <div className="absolute inset-0 blur-2xl bg-ocean/40 rounded-full scale-150" />
                <img
                  src="/logo-freedive-dahab.png"
                  alt=""
                  className="relative w-32 sm:w-44 md:w-52 drop-shadow-[0_10px_40px_rgba(8,31,53,0.9)]"
                  loading="eager"
                />
              </div>
            </div>

            {/* BOTTOM ZONE: Line 2 BELOW THE DIVER (One Sentence) + CTAs + Microcopy */}
            <div className="flex flex-col items-center pb-2 sm:pb-3 w-full">
              {/* Line 2: Milestone sentence positioned below the diver */}
              <div
                className="font-tidal text-base sm:text-lg md:text-xl lg:text-[1.35rem] leading-snug uppercase tracking-[0.05em] font-normal text-[#4E8CB8] drop-shadow-[0_0_32px_rgba(6,182,212,0.65)] text-balance max-w-2xl mb-4 sm:mb-5"
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
                  className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-[#0E3453] font-alata text-xs font-semibold uppercase tracking-[0.1em] hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
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
                <span>4,800+ certified freedivers</span>
                <span className="text-ocean-pale/50">·</span>
                <span>Small groups</span>
                <span className="text-ocean-pale/50">·</span>
                <span>Beginners welcome</span>
                <span className="hidden sm:inline text-ocean-pale/50">·</span>
                <span className="hidden sm:inline text-ocean-pale/90 font-medium">SSI Diamond ITC #720079</span>
              </div>

              {/* Convex-style scroll cue */}
              <div
                className="mt-6 sm:mt-8 flex flex-col items-center gap-2"
                style={{ opacity: Math.max(1 - scrollProgress * 5, 0) }}
              >
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] text-ocean-pale/80 font-alata">
                  Scroll to explore
                </span>
                <span className="relative block w-px h-10 bg-ocean-pale/20 overflow-hidden">
                  <span className="scroll-cue-line absolute inset-x-0 top-0 h-full bg-ocean-pale/90" />
                </span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* PHASE 2: POETIC IMMERSION (the descent realm)            */}
          {/* -------------------------------------------------------- */}
          <div
            ref={phase2Ref}
            className="absolute inset-0 flex items-center justify-center text-center opacity-0 pointer-events-none px-6"
          >
            <div className="space-y-6 max-w-3xl mx-auto py-6">
              <span className="text-[11px] font-alata font-normal tracking-[0.24em] uppercase text-cyan-400/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                THE REALM BENEATH
              </span>

              {/* Contra signature: serif italic emphasis inside bold display line */}
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bebas text-white tracking-[0.06em] leading-tight drop-shadow-[0_4px_24px_rgba(8,31,53,0.9)]">
                “THE <span className="font-serif italic normal-case text-ocean-pale drop-shadow-[0_0_24px_rgba(169,210,236,0.45)]">Deeper</span> YOU GO,
                <br />
                THE <span className="font-serif italic normal-case text-ocean-pale drop-shadow-[0_0_24px_rgba(169,210,236,0.45)]">Quieter</span> IT BECOMES.”
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
