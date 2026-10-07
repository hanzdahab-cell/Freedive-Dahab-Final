import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Timer, ArrowDownToLine, CalendarDays } from 'lucide-react';
import { Course } from '../../types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CourseInfographicProps {
  course: Course;
}

/** Parse the max number out of range strings like "2–3 min" or "10–20 m". */
function parseMax(range: string): number {
  const pair = range.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (pair) return parseInt(pair[2], 10);
  const single = range.match(/(\d+)/);
  return single ? parseInt(single[1], 10) : 0;
}

/** Hand-drawn squiggly wave, drawn on when scrolled into view (template motif). */
function Squiggle({ className = '', color = '#22d3ee' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 24" fill="none" className={className} aria-hidden="true">
      <path
        className="ci-wave-path"
        d="M2 12 Q 12 2, 22 12 T 42 12 T 62 12 T 82 12 T 102 12 T 122 12"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
      />
    </svg>
  );
}

/** Tiny hand-drawn fish that gently floats (template motif). */
function Fish({ className = '', color = '#67e8f9' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 32 16" fill="none" className={`ci-fish ${className}`} aria-hidden="true">
      <path d="M2 8c4-5.5 12-5.5 17 0-5 5.5-13 5.5-17 0Z" fill={color} opacity="0.85" />
      <path d="M19 8l10-5.5v11L19 8Z" fill={color} opacity="0.55" />
      <circle cx="7.5" cy="7" r="1.3" fill="#0E3453" />
    </svg>
  );
}

/** Simple coral silhouette for the corners of the section (template motif). */
function Coral({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 120" fill="none" className={className} aria-hidden="true">
      <path
        d="M40 118V70M40 88c-10-4-16-14-16-26M40 96c10-4 17-14 17-28M40 70c-6-8-6-20 0-30M40 62c6-9 7-19 2-28"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CourseInfographic({ course }: CourseInfographicProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const rulerFillRef = useRef<HTMLDivElement>(null);

  const perf = course.futurePerformances;
  const disciplines = course.disciplines ?? [];
  const schedule = course.schedule ?? [];

  const staticMax = perf ? parseMax(perf.staticApnea) : 0;
  const staticUnit = perf?.staticApnea.match(/min/i) ? 'min' : '';
  const depthMax = perf ? parseMax(perf.depth) : course.maxDepthMeters;
  const durationTarget = course.durationDays;

  const rulerPct = Math.min(100, (course.maxDepthMeters / 45) * 100);
  const showFreefall = course.maxDepthMeters >= 25;

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      // Count-up performance numbers
      scope.querySelectorAll<HTMLElement>('.ci-count').forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const decimals = Number.isInteger(target) ? 0 : 1;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          snap: { v: decimals ? 0.1 : 1 },
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });

      // Draw-on squiggly waves
      scope.querySelectorAll<SVGPathElement>('.ci-wave-path').forEach((path) => {
        gsap.fromTo(
          path,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: path, start: 'top 92%', once: true },
          }
        );
      });

      // Stat cards entrance
      gsap.from(scope.querySelectorAll('.ci-stat'), {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: scope.querySelector('.ci-stats-row'), start: 'top 82%', once: true },
      });

      // Depth ruler fill
      if (rulerFillRef.current) {
        gsap.fromTo(
          rulerFillRef.current,
          { width: '0%' },
          {
            width: `${rulerPct}%`,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: rulerFillRef.current, start: 'top 88%', once: true },
          }
        );
      }

      // Discipline capsules entrance (staggered like the template steps)
      const steps = scope.querySelector('.ci-steps');
      if (steps) {
        gsap.from(steps.querySelectorAll('.ci-step'), {
          y: 52,
          opacity: 0,
          scale: 0.96,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: steps, start: 'top 78%', once: true },
        });
      }

      // Schedule timeline entrance
      const days = scope.querySelector('.ci-days');
      if (days) {
        gsap.from(days.querySelectorAll('.ci-day'), {
          x: -28,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.14,
          scrollTrigger: { trigger: days, start: 'top 80%', once: true },
        });
      }

      // Floating fish loop
      gsap.to(scope.querySelectorAll('.ci-fish'), {
        y: -9,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.6,
      });
    }, scope);

    return () => ctx.revert();
  }, [rulerPct]);

  const stats = [
    {
      icon: Timer,
      target: staticMax,
      unit: staticUnit,
      label: 'Static breath-hold',
      hint: 'Your future surface performance',
    },
    {
      icon: ArrowDownToLine,
      target: depthMax,
      unit: 'm',
      label: 'Target depth',
      hint: 'Along the dive line, no boat',
    },
    {
      icon: CalendarDays,
      target: durationTarget,
      unit: 'days',
      label: 'Course duration',
      hint: '9am to 4pm daily',
    },
  ];

  return (
    <div ref={scopeRef} className="relative overflow-hidden">
      {/* ============================================================ */}
      {/* YOUR JOURNEY TO DEPTH — adapted from the hand-drawn diving    */}
      {/* infographic template: descending step capsules, squiggly      */}
      {/* waves, fish & coral, tailored to the Freedive Dahab theme.    */}
      {/* ============================================================ */}

      {/* Header */}
      <div className="relative text-center space-y-3 mb-12">
        <Squiggle className="w-24 mx-auto text-cyan-400/80" />
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400">
          Your future performances
        </div>
        <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white tracking-[0.05em]">
          From first breath to <span className="text-cyan-300">new depth</span>
        </h2>
      </div>

      {/* Stats row with count-ups */}
      <div className="ci-stats-row grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="ci-stat glass-panel rounded-2xl border border-white/10 hover:border-cyan-400/40 p-6 text-center space-y-2 transition-all duration-500"
          >
            <stat.icon className="w-5 h-5 text-cyan-400 mx-auto" />
            <div className="flex items-baseline justify-center gap-1.5">
              <span
                className="ci-count font-bebas text-5xl sm:text-6xl text-white leading-none"
                data-target={stat.target}
              >
                0
              </span>
              <span className="font-mono text-sm text-cyan-300 font-bold">{stat.unit}</span>
            </div>
            <div className="text-xs font-alata uppercase tracking-[0.2em] text-slate-200">
              {stat.label}
            </div>
            <div className="text-[11px] text-slate-500 font-light">{stat.hint}</div>
          </div>
        ))}
      </div>

      {/* Depth ruler */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6 mb-14 space-y-3">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
          <span>Surface</span>
          <span className="text-cyan-300">{course.maxDepthMeters}m certification depth</span>
        </div>
        <div className="relative h-3 rounded-full bg-white/[0.06] overflow-visible">
          <div
            ref={rulerFillRef}
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.55)]"
            style={{ width: '0%' }}
          />
          {showFreefall && (
            <div
              className="absolute -top-1.5 h-6 w-px bg-amber-300/80"
              style={{ left: `${(15 / 45) * 100}%` }}
              title="Freefall zone"
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono uppercase tracking-widest text-amber-300 whitespace-nowrap">
                freefall ~15m
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-between text-[9px] font-mono text-slate-500">
          {[0, 10, 20, 30, 40].map((m) => (
            <span key={m}>{m}m</span>
          ))}
        </div>
      </div>

      {/* Discipline capsules — the template's descending steps */}
      <div className="ci-steps relative mb-16">
        <Fish className="absolute w-8 -top-6 right-[8%] opacity-70" />
        <Fish className="absolute w-5 top-[38%] left-[4%] opacity-50" color="#38bdf8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
          {disciplines.map((d, idx) => (
            <div
              key={d.name}
              className="ci-step relative"
              style={{ ['--stair' as string]: idx } as React.CSSProperties}
            >
              <div
                className="h-full rounded-[2.2rem] border border-white/12 bg-gradient-to-b from-white/[0.05] to-transparent p-6 pt-7 text-center flex flex-col items-center gap-3 transition-all duration-500 hover:border-cyan-400/40 hover:-translate-y-1.5"
                style={{ marginTop: undefined }}
              >
                {/* Squiggle connector above each following step */}
                {idx > 0 && (
                  <Squiggle
                    className="w-16 mb-1 opacity-80 hidden lg:block"
                    color={idx % 2 === 0 ? '#fbbf24' : '#22d3ee'}
                  />
                )}

                {/* Step ring marker — alternating solid/outline like the template */}
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full font-bebas text-xl tracking-wider ${
                    idx % 2 === 0
                      ? 'bg-cyan-400 text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.45)]'
                      : 'border-2 border-cyan-300/70 text-cyan-300'
                  }`}
                >
                  0{idx + 1}
                </div>

                <h3 className="font-serif text-lg font-bold text-white">{d.name}</h3>
                <p className="text-[11px] font-serif italic text-cyan-200/90 -mt-2">{d.tagline}</p>
                <p className="text-xs text-slate-400 font-light leading-relaxed flex-1">
                  {d.description}
                </p>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[9px] font-mono uppercase tracking-wider text-cyan-300">
                  {d.sessions}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Day-by-day schedule timeline */}
      {schedule.length > 0 && (
        <div className="ci-days relative">
          <div className="flex items-center gap-3 mb-6">
            <Squiggle className="w-16 text-amber-300/80" color="#fbbf24" />
            <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-[0.05em]">
              Day by day
            </h3>
          </div>

          <ol className="relative space-y-6 border-l border-white/10 pl-6 ml-2">
            {schedule.map((day) => (
              <li key={day.day} className="ci-day relative">
                <span className="absolute -left-[31px] top-1.5 flex h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <div className="glass-panel rounded-xl border border-white/10 p-5 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono uppercase tracking-wider">
                      {day.day}
                    </span>
                    <span className="text-sm font-semibold text-white font-alata">{day.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {day.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Coral corners */}
      <Coral className="absolute w-14 bottom-0 left-0 text-cyan-500/10 pointer-events-none" />
      <Coral className="absolute w-10 bottom-6 right-2 text-sky-400/10 pointer-events-none" />
    </div>
  );
}
