import { useState, useEffect, useRef } from 'react';
import { Award, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface LuxuryStoryProps {
  onOpenBooking: () => void;
}

function DynamicCounter({ end, suffix = '', duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          const startTime = performance.now();
          const frame = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(ease * end);
            setCount(current);
            if (progress < 1) {
              requestAnimationFrame(frame);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(frame);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [end, duration, started]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function LuxuryStory({ onOpenBooking }: LuxuryStoryProps) {
  const { t } = useLanguage();

  const stats = [
    {
      num: 24,
      suffix: "+",
      label: t.story.stat1Label,
      desc: "Pioneering freediving on the Lighthouse reef since 2002.",
    },
    {
      num: 12,
      suffix: "",
      label: t.story.stat2Label,
      desc: "From Try Freedive to Master & International Instructor ITC.",
    },
    {
      num: 570,
      suffix: "+",
      label: t.story.stat3Label,
      desc: "Graduates now teaching in over 35 countries globally.",
    },
    {
      num: 4800,
      suffix: "+",
      label: t.story.stat4Label,
      desc: "100% individual coach attention and personal milestones.",
    },
    {
      num: 100,
      suffix: "%",
      label: "Safety Record",
      desc: "24 years with zero decompression accidents on our lines.",
    },
    {
      num: 92,
      suffix: "m",
      label: "Blue Hole Access",
      desc: "Daily private training lines in Dahab",
    },
  ];

  return (
    <section id="philosophy" className="relative py-32 md:py-44 px-6 bg-transparent overflow-hidden border-t border-white/5">
      
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Top Editorial Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="w-12 h-px bg-cyan-400" />
          <span className="text-xs uppercase font-alata tracking-[0.3em] text-cyan-300">
            {t.story.eyebrow}
          </span>
        </div>

        {/* 2-Column High-Contrast Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image with Film Grain & Luxury Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative group overflow-hidden rounded-2xl aspect-[4/5] border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85"
                alt="Freediving instructor descending in Dahab Blue Hole"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
              
              {/* Floating Architectural Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="text-xs font-alata tracking-widest text-cyan-400 uppercase mb-1">
                  {t.story.established}
                </div>
                <div className="font-bebas text-2xl text-white tracking-wide">
                  &ldquo;{t.story.quote}&rdquo;
                </div>
                <div className="text-xs font-alata text-slate-400 mt-1">
                  — {t.story.quoteAuthor}
                </div>
              </div>
            </div>

            {/* Subtle decorative offset border */}
            <div className="absolute -inset-4 border border-cyan-500/20 rounded-3xl -z-10 hidden sm:block pointer-events-none" />
          </div>

          {/* Right Column: High-End Editorial Copy */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-cyan-400 text-xs uppercase tracking-[0.3em] font-alata font-normal block">
                {t.story.subheading}
              </span>
              <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-white tracking-[0.05em]">
                {t.story.titleLine1} <br />
                <span className="text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]">{t.story.titleLine2}</span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-slate-300 font-alata font-normal leading-relaxed">
              {t.story.desc1}
            </p>

            <p className="text-base text-slate-400 font-alata font-normal leading-relaxed">
              {t.story.desc2}
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-alata text-xs uppercase tracking-wider">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{t.story.ratioTitle}</span>
                </div>
                <p className="text-xs font-alata text-slate-400 leading-relaxed">
                  {t.story.ratioDesc}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-alata text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>{t.story.itcTitle}</span>
                </div>
                <p className="text-xs font-alata text-slate-400 leading-relaxed">
                  {t.story.itcDesc}
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a 
                href="#courses"
                className="btn-luxury text-white text-center font-alata uppercase tracking-widest text-xs"
              >
                {t.story.ctaCourses}
              </a>
              <button
                onClick={onOpenBooking}
                className="px-6 py-4 rounded-full border border-white/10 hover:border-cyan-400 text-xs font-alata uppercase tracking-[0.2em] text-slate-300 hover:text-white transition-all text-center"
              >
                {t.story.ctaRetreat}
              </button>
            </div>

          </div>
        </div>

        {/* SECTION 3: 24 YEARS SHAPING CONFIDENT WORLD-CLASS FREEDIVERS */}
        <div className="mt-28 pt-16 border-t border-white/10">
          
          {/* Section Heading & Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.05em] leading-tight">
              {t.story.statsSectionTitle} <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">{t.story.statsSectionTitleAccent}</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-alata font-normal leading-relaxed max-w-2xl mx-auto">
              {t.story.statsSectionDesc}
            </p>
          </div>

          {/* 6 Dynamic Counting Stat Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="text-left space-y-3 p-6 sm:p-7 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-cyan-400/40 hover:bg-slate-900/60 transition-all duration-300 shadow-xl group"
              >
                <div className="font-bebas text-5xl sm:text-6xl text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                  <DynamicCounter end={stat.num} suffix={stat.suffix} />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-alata font-medium">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 font-alata leading-relaxed">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
