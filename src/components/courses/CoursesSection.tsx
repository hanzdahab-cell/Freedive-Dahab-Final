import { ssiCourses } from '../../data/courses';
import { PageType } from '../../types';
import { ArrowRight, CheckCircle, ChevronRight, BookOpen, Award, Users, Waves } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LetterReveal } from '../ui/LetterReveal';

interface CoursesSectionProps {
  onOpenBooking: (courseId?: string) => void;
  onNavigate: (page: PageType) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

const SSI_BRIEF_POINTS = [
  {
    icon: BookOpen,
    title: 'Digital manual — all languages',
    desc: 'Study theory at your own pace in the SSI app before and during your course.',
  },
  {
    icon: Award,
    title: 'International certification',
    desc: 'A lifetime digital SSI card recognized by dive centers in over 130 countries.',
  },
  {
    icon: Users,
    title: 'Max 3:1 student ratio',
    desc: 'Small groups guarantee personal coaching, safety, and video feedback on every dive.',
  },
  {
    icon: Waves,
    title: 'Lighthouse Bay & Blue Hole',
    desc: 'Shore-entry training on our home reef, and depth sessions at the world-famous Blue Hole.',
  },
];

export function CoursesSection({ onOpenBooking, onNavigate, currency }: CoursesSectionProps) {
  const { t } = useTranslation();

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  const navigateToCourse = (slug: string) => {
    onNavigate(`course-${slug}` as PageType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tryFreediving = ssiCourses.find((c) => c.id === 'ssi-basic-freediver');
  const coreCourses = ssiCourses.filter((c) => c.id !== 'ssi-basic-freediver');

  return (
    <section id="courses" className="relative py-32 px-6 bg-[#020617] border-t border-white/5">

      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-grid-fine opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-alata tracking-[0.3em] uppercase text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>{t('coursesSection.badge')}</span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-[0.05em] leading-tight">
              {t('coursesSection.title')}{' '}
              <span className="text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]">
                {t('coursesSection.titleHighlight')}
              </span>
            </h2>
            <p className="text-slate-300 font-alata font-normal max-w-xl text-base sm:text-lg leading-relaxed">
              {t('coursesSection.subtitle')}
            </p>
          </div>
        </div>

        {/* ========================================================== */}
        {/* 1) BRIEF: THE SSI INTERNATIONAL SYSTEM                      */}
        {/* ========================================================== */}
        <div className="glass-panel rounded-2xl border border-white/10 p-8 sm:p-10 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in duration-700">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono uppercase tracking-[0.2em]">
              THE SSI INTERNATIONAL SYSTEM
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              A structured path from your <span className="text-cyan-300">first breath</span> to professional depth
            </h3>
            <p className="text-slate-300 font-alata font-light text-sm sm:text-base leading-relaxed">
              Every SSI course pairs the digital academic manual — available in all languages —
              with calm, progressive in-water sessions at Lighthouse Bay and the Blue Hole.
              You train with high-grade equipment, learn the science of breath-holding, and
              finish with a lifetime international certification. No fitness background needed:
              freediving is a form of meditation, and we teach it that way.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Beginners welcome', 'Age 10+', 'All gear included', 'Warm water year-round'].map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-alata text-slate-300"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-center">
            {SSI_BRIEF_POINTS.map((point, idx) => (
              <div
                key={point.title}
                className="p-5 rounded-xl bg-slate-900/50 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <point.icon className="w-5 h-5 text-cyan-400 mb-3" />
                <div className="text-sm font-alata font-semibold text-white mb-1">{point.title}</div>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================== */}
        {/* 2) OUR CORE COURSES                                         */}
        {/* ========================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs font-alata tracking-[0.3em] uppercase text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>THE CERTIFICATION PATH</span>
            </div>
            <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-[0.05em]">
              <LetterReveal as="span" text="OUR CORE COURSES" triggerOnView stagger={0.025} className="inline-block" />
            </h3>
          </div>
          <p className="text-slate-400 font-alata text-sm max-w-md">
            Three progressive certifications — each one opens deeper water and a calmer mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
          {coreCourses.map((course, idx) => (
            <div
              key={course.id}
              onClick={() => navigateToCourse(course.slug)}
              className="group glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 cursor-pointer animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div>
                {/* Card Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={course.image.url}
                    alt={course.image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-cyan-300 text-[10px] font-mono tracking-widest uppercase">
                      {course.level}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 text-right">
                    <span className="text-2xl font-serif font-bold text-white">
                      {formatPrice(course.priceEur)}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block">ALL GEAR INCLUDED</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                    {course.subtitle}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs font-mono text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[10px]">{t('coursesSection.depth')}</span>
                      <span className="text-cyan-400 font-bold">{course.maxDepthMeters} {t('coursesSection.meters')}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">{t('coursesSection.duration')}</span>
                      <span className="text-white font-bold">{course.durationDays} {t('coursesSection.days')}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {course.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="p-6 sm:p-8 pt-0 flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBooking(course.id);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider transition-all text-center"
                >
                  {t('coursesSection.enrollNow')}
                </button>
                <div
                  className="p-3 rounded-xl border border-white/15 group-hover:border-cyan-400 text-slate-400 group-hover:text-cyan-300 transition-all"
                  title="View course details"
                >
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================== */}
        {/* 3) TRY FREEDIVING                                           */}
        {/* ========================================================== */}
        {tryFreediving && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs font-alata tracking-[0.3em] uppercase text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-300" />
                  <span>NO EXPERIENCE NEEDED</span>
                </div>
                <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-[0.05em]">
                  <LetterReveal as="span" text="TRY FREEDIVING" triggerOnView stagger={0.035} className="inline-block" />
                </h3>
              </div>
              <p className="text-slate-400 font-alata text-sm max-w-md sm:ml-auto">
                One gentle day to discover breath-hold — the perfect first taste before any certification.
              </p>
            </div>

            <div
              onClick={() => navigateToCourse(tryFreediving.slug)}
              className="group glass-panel rounded-2xl overflow-hidden border border-amber-300/20 hover:border-amber-300/60 grid grid-cols-1 lg:grid-cols-2 transition-all duration-500 hover:-translate-y-1 cursor-pointer animate-in fade-in slide-in-from-bottom-6 duration-700"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] overflow-hidden bg-slate-950">
                <img
                  src={tryFreediving.image.url}
                  alt={tryFreediving.image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent lg:bg-gradient-to-r" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] font-mono tracking-widest uppercase">
                  {tryFreediving.level}
                </span>
              </div>

              <div className="p-8 sm:p-10 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <h4 className="font-serif text-3xl sm:text-4xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {tryFreediving.title}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-light">
                    {tryFreediving.overview}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-300 pt-2">
                    <span>{tryFreediving.durationDays} day</span>
                    <span>{tryFreediving.maxDepthMeters}m depth</span>
                    <span className="text-amber-300 font-bold">{formatPrice(tryFreediving.priceEur)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking(tryFreediving.id);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-300 hover:bg-amber-200 text-black text-xs font-bold uppercase tracking-wider transition-all text-center"
                  >
                    Book Your First Day
                  </button>
                  <div className="p-3 rounded-xl border border-white/15 group-hover:border-amber-300 text-slate-400 group-hover:text-amber-300 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ========================================================== */}
        {/* 4) SPECIALTIES & PRO ACADEMY — on request                   */}
        {/* ========================================================== */}
        <div className="mt-24 glass-panel rounded-2xl border border-white/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="font-serif text-2xl font-bold text-white">
              Specialty Clinics & the Instructor Academy
            </h4>
            <p className="text-slate-400 font-alata text-sm max-w-xl leading-relaxed">
              Underwater photography, monofin technique, Mouthfill masterclasses, equalisation
              clinics, and our professional SSI Instructor programs — tailored around your goals
              and scheduled on request.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="shrink-0 px-7 py-3.5 rounded-full bg-white text-[#020811] hover:bg-slate-100 font-alata text-xs font-semibold uppercase tracking-[0.08em] transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>Ask Us Anything</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
