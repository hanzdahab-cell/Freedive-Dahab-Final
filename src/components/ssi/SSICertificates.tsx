import { PageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export interface SSICertificatesProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: PageType) => void;
}

export function SSICertificates({ onOpenBooking, onNavigate }: SSICertificatesProps) {
  const { t } = useLanguage();

  const badges = [
    {
      id: 'freediving-center',
      title: t.certificates?.card1Title || 'SSI Freediving Center',
      desc: t.certificates?.card1Desc || 'Official SSI Partner — certified instructors, dedicated depth buoys, and world-standard freediving education.',
      src: '/badges/ssi-freediving-center.png',
      alt: 'SSI Official Partner — Freediving Center badge',
    },
    {
      id: 'mermaid-center',
      title: t.certificates?.card2Title || 'SSI Mermaid Center',
      desc: t.certificates?.card2Desc || 'Official SSI Partner — magical mermaid programs, monofin technique, and underwater artistry for all ages.',
      src: '/badges/ssi-mermaid-center.png',
      alt: 'SSI Official Partner — Mermaid Center badge',
    },
    {
      id: 'instructor-training-center',
      title: t.certificates?.card3Title || 'SSI Freediving Instructor Training Center',
      desc: t.certificates?.card3Desc || 'Official SSI Partner — our pro academy trains and certifies the next generation of freediving instructors.',
      src: '/badges/ssi-instructor-training-center.png',
      alt: 'SSI Official Partner — Freediving Instructor Training Center badge',
    },
  ];

  return (
    <section id="certificates" className="relative py-20 md:py-28 px-6 bg-transparent overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 architectural-grid opacity-5 pointer-events-none" />

      {/* Header */}
      <div className="relative max-w-4xl mx-auto text-center mb-16 md:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-xs tracking-wider uppercase font-alata mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.certificates?.badge || 'SSI Official Partner • Facility #720079 • ISO 24801 & 24802'}</span>
        </div>
        <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white tracking-wider mb-4 uppercase">
          {t.certificates?.title || 'International Gold Standard of Freediving Education'}
        </h2>
        <p className="font-alata text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {t.certificates?.subtitle || 'An authorized SSI Freediving School in the heart of Dahab — dedicated instructor trainers, professional counter-ballast buoys, and a 100% safety record since 2003.'}
        </p>
      </div>

      {/* ============================================================
          DYNAMIC SSI PARTNERSHIP BADGES

          IMPORTANT:
          The badge images themselves remain completely untouched.

          All animation happens around the official artwork:
          - container reveal
          - background glow
          - connecting line
          - hover interaction
          - supporting text
      ============================================================ */}

      <div className="relative mx-auto max-w-6xl">

        {/* Animated connection line */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            left-[12%] right-[12%] top-[105px]
            hidden h-px overflow-hidden
            lg:block
          "
        >
          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
            "
          />

          <div
            className="
              absolute top-0 h-px w-32
              bg-gradient-to-r
              from-transparent
              via-red-400/70
              to-transparent
              animate-[badgeLine_5s_ease-in-out_infinite]
            "
          />
        </div>

        {/* Badge grid */}
        <div
          className="
            grid grid-cols-1
            gap-x-8 gap-y-16
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-6
            xl:gap-x-10
          "
        >
          {badges.map((badge, index) => (
            <article
              key={badge.id}
              className="
                group relative flex min-w-0
                flex-col items-center text-center
              "
            >

              {/* Ambient glow behind badge */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute
                  left-1/2 top-1/2
                  h-40 w-40
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-red-500/[0.025]
                  blur-3xl
                  transition-all
                  duration-700
                  group-hover:bg-red-500/[0.08]
                  group-hover:scale-125
                "
              />

              {/* Badge stage */}
              <div
                className="
                  relative z-10
                  flex min-h-[230px]
                  w-full items-center justify-center
                  px-4
                  transition-transform
                  duration-700
                  ease-out
                  motion-safe:group-hover:-translate-y-2
                "
              >
                {/* Small orbit ring */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute
                    h-[215px] w-[215px]
                    rounded-full
                    border border-white/[0.025]
                    transition-all
                    duration-700
                    group-hover:border-red-400/20
                    group-hover:scale-110
                  "
                />

                {/* Moving light around the badge */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute
                    h-[220px] w-[220px]
                    rounded-full
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                    motion-safe:animate-[badgeOrbit_7s_linear_infinite]
                  "
                >
                  <div
                    className="
                      absolute left-1/2 top-0
                      h-1.5 w-1.5
                      -translate-x-1/2
                      rounded-full
                      bg-red-400
                      shadow-[0_0_12px_rgba(248,113,113,0.8)]
                    "
                  />
                </div>

                {/* OFFICIAL BADGE — DO NOT MODIFY */}
                <img
                  src={badge.src}
                  alt={badge.alt}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="
                    relative z-20
                    block h-auto w-full
                    max-w-[210px]
                    object-contain
                    sm:max-w-[220px]
                    lg:max-w-[205px]
                    xl:max-w-[220px]
                  "
                />
              </div>

              {/* Small numbered indicator */}
              <div
                className="
                  relative z-20 mt-3
                  flex h-6 w-6
                  items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/[0.025]
                  font-mono text-[9px]
                  text-slate-500
                  transition-all duration-500
                  group-hover:border-red-400/40
                  group-hover:text-red-400
                "
              >
                0{index + 1}
              </div>

              {/* Caption */}
              <div
                className="
                  relative z-20 mt-4
                  max-w-[240px]
                  space-y-2
                  transition-transform
                  duration-500
                  group-hover:translate-y-[-2px]
                "
              >
                <h3
                  className="
                    font-alata
                    text-sm font-semibold
                    text-white
                    transition-colors
                    duration-300
                    sm:text-base
                    group-hover:text-red-400
                  "
                >
                  {badge.title}
                </h3>

                <p
                  className="
                    font-alata
                    text-xs
                    leading-relaxed
                    text-slate-400
                    transition-colors
                    duration-300
                    group-hover:text-slate-300
                  "
                >
                  {badge.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA Actions */}
      <div className="relative mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => onOpenBooking ? onOpenBooking() : onNavigate?.('courses')}
          className="btn-luxury inline-flex items-center gap-2 group w-full sm:w-auto cursor-pointer"
        >
          <span>{t.certificates?.bookBtn || 'Enroll in Certified Course'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-cyan-400" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('courses')}
          className="px-6 py-3 rounded-lg border border-white/10 hover:border-white/30 text-xs uppercase tracking-widest text-slate-300 hover:text-white transition-all w-full sm:w-auto font-alata cursor-pointer"
        >
          {t.certificates?.verifyBtn || 'Verify Facility Status'}
        </button>
      </div>
    </section>
  );
}

export default SSICertificates;
