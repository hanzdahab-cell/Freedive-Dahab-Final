import { ssiCourses, specialtyCourses, instructorCourses } from '../../data/courses';
import { PageType } from '../../types';
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FadeUp } from '../ui/MotionKit';

/* ==========================================================================
   COURSES — compact video intro (SSI badges) → course cards directly.
   The long chapter system, by-the-numbers depth infographic, and fixed
   chapter progress bar were removed per owner request (2026-10-12).
   ========================================================================== */

interface CoursesSectionProps {
  onOpenBooking: (courseId?: string) => void;
  onNavigate: (page: PageType) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

const SSI_BADGES = [
  { src: '/badges/ssi-freediving-center.png', alt: 'SSI Freediving Center — official partner badge' },
  { src: '/badges/ssi-instructor-training-center.png', alt: 'SSI Instructor Training Center — official badge' },
  { src: '/badges/ssi-mermaid-center.png', alt: 'SSI Mermaid Center — official partner badge' },
];

const INTRO_CHIPS = ['Beginners welcome', 'Age 10+', 'All gear included', 'Warm water year-round'];

/** Small section label between card groups (replaces the big chapter headings) */
function GroupHeading({ title, highlight }: { title: string; highlight?: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-8">
      <h3 className="font-bebas text-3xl sm:text-4xl text-white uppercase tracking-[0.05em] leading-none">
        {title}
        {highlight ? <span className="text-ocean-light"> {highlight}</span> : null}
      </h3>
      <span className="h-px flex-1 bg-ocean-pale/15" />
    </div>
  );
}

export function CoursesSection({ onOpenBooking, onNavigate, currency }: CoursesSectionProps) {
  const { t } = useTranslation();

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  const navigateToCourse = (slug: string) => {
    // App's navigateTo resets scroll to the surface through Lenis
    onNavigate(`course-${slug}` as PageType);
  };

  const tryFreediving = ssiCourses.find((c) => c.id === 'ssi-basic-freediver');
  const coreCourses = ssiCourses.filter((c) => c.id !== 'ssi-basic-freediver');

  // Categorized card collections
  const coreCards = tryFreediving ? [tryFreediving, ...coreCourses] : coreCourses;
  const specialtyCards = specialtyCourses.filter((c) => c.id !== 'master-freediver');
  const masterCourse = specialtyCourses.find((c) => c.id === 'master-freediver');

  return (
    <section id="courses" className="relative bg-[#0E3453] pb-36 sm:pb-40 film-grain">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-grid-fine opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 px-6">

        {/* ========================================================== */}
        {/* COMPACT VIDEO INTRO — short SSI introduction + badges      */}
        {/* ========================================================== */}
        <div className="pt-24 sm:pt-28 mb-16 sm:mb-20">
          <FadeUp className="relative rounded-2xl overflow-hidden border border-ocean-pale/15">
            {/* Background video */}
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-45"
              src="/videos/vortex-loop.mp4"
              poster="/videos/vortex-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081F35]/90 via-[#0E3453]/70 to-[#0E3453]/50 pointer-events-none" />

            <div className="relative z-10 px-6 sm:px-10 py-10 sm:py-14 space-y-6">
              <div className="flex items-center gap-3 text-xs font-alata tracking-[0.3em] uppercase text-ocean-light">
                <span className="w-2.5 h-2.5 rounded-full bg-ocean-light animate-pulse" />
                <span>{t('coursesSection.badge')}</span>
              </div>

              <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-[0.05em] leading-tight uppercase">
                {t('coursesSection.title')}{' '}
                <span className="text-ocean-light">{t('coursesSection.titleHighlight')}</span>
              </h2>

              <p className="text-ocean-pale/90 font-alata font-light max-w-2xl text-sm sm:text-base leading-relaxed">
                {t('coursesSection.subtitle')}
              </p>

              <div className="flex flex-wrap gap-2">
                {INTRO_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 rounded-full bg-white/[0.06] border border-ocean-pale/20 text-[11px] font-alata text-slate-200"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Small official SSI badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {SSI_BADGES.map((badge) => (
                  <span
                    key={badge.src}
                    className="inline-flex items-center rounded-lg bg-white/95 px-3 py-2 shadow-lg"
                  >
                    <img src={badge.src} alt={badge.alt} className="h-10 sm:h-12 w-auto object-contain" loading="lazy" />
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ========================================================== */}
        {/* CORE COURSE CARDS                                          */}
        {/* ========================================================== */}
        <div id="chapter-core" className="scroll-mt-28 mb-24 sm:mb-32">
          <GroupHeading title="SSI" highlight="Core Courses" />

          {/* Course cards — the full core path: Try + Level 1/2/3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {coreCards.map((course, idx) => (
              <FadeUp
                key={course.id}
                delay={idx * 0.12}
                onClick={() => navigateToCourse(course.slug)}
                className="group glass-panel rounded-2xl overflow-hidden border border-ocean-pale/10 hover:border-ocean-light/50 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081F35] via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-[#081F35]/70 backdrop-blur-md border border-ocean-pale/25 text-ocean-pale text-[10px] font-mono tracking-widest uppercase">
                        {course.level}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 text-right">
                      <span className="text-2xl font-serif font-bold text-white">
                        {formatPrice(course.priceEur)}
                      </span>
                      <span className="text-[10px] font-mono text-ocean-pale/70 block">ALL GEAR INCLUDED</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-ocean-pale transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                      {course.subtitle}
                    </p>

                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-ocean-pale/10 text-xs font-mono text-slate-300">
                      <div>
                        <span className="text-slate-500 block text-[10px]">{t('coursesSection.depth')}</span>
                        <span className="text-ocean-light font-bold">{course.maxDepthMeters} {t('coursesSection.meters')}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">{t('coursesSection.duration')}</span>
                        <span className="text-white font-bold">{course.durationDays} {t('coursesSection.days')}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      {course.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-ocean-light shrink-0 mt-0.5" />
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
                    className="flex-1 py-3 px-4 rounded-xl bg-ocean hover:bg-ocean-light text-white text-xs font-bold uppercase tracking-wider transition-all text-center"
                  >
                    {t('coursesSection.enrollNow')}
                  </button>
                  <button
                    onClick={() => navigateToCourse(course.slug)}
                    title="View course details"
                    aria-label={`View ${course.title} details`}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-ocean-pale/15 group-hover:border-ocean-light text-slate-400 group-hover:text-ocean-pale transition-all hover:bg-white/5 cursor-pointer"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] hidden lg:inline">
                      View course
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ========================================================== */}
        {/* CHAPTER 03 — SPECIALTY CLINICS                              */}
        {/* ========================================================== */}
        <div id="chapter-try" className="scroll-mt-28 mb-24 sm:mb-32">
          <GroupHeading title="Specialty" highlight="Clinics" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {specialtyCards.map((course, idx) => (
              <FadeUp
                key={course.id}
                delay={(idx % 4) * 0.08}
                onClick={() => navigateToCourse(course.slug)}
                className="group glass-panel rounded-2xl overflow-hidden border border-ocean-pale/10 hover:border-ocean-light/50 flex flex-col transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={course.image.url}
                    alt={course.image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081F35] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#081F35]/70 backdrop-blur-md border border-ocean-pale/25 text-ocean-pale text-[9px] font-mono tracking-widest uppercase">
                    {course.durationDays} day{course.durationDays > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="p-5 space-y-2.5 flex-1 flex flex-col">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-ocean-pale transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2 flex-1">
                    {course.shortDesc}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-2.5 border-t border-ocean-pale/10">
                    <span className="inline-flex items-center gap-1.5 text-ocean-light group-hover:text-ocean-pale transition-colors uppercase text-[10px] tracking-wider">
                      View course
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-ocean-pale font-bold">{formatPrice(course.priceEur)}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ========================================================== */}
        {/* CHAPTER 04 — MASTER & PRO ACADEMY                           */}
        {/* ========================================================== */}
        <div id="chapter-pro" className="scroll-mt-28">
          <GroupHeading title="Master & Pro" highlight="Academy" />

          {/* Master Freediver — feature card */}
          {masterCourse && (
            <FadeUp
              onClick={() => navigateToCourse(masterCourse.slug)}
              className="group glass-panel rounded-2xl overflow-hidden border border-ocean-light/20 hover:border-ocean-light/60 grid grid-cols-1 lg:grid-cols-2 transition-all duration-500 hover:-translate-y-1 cursor-pointer mb-10"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-[#081F35]">
                <img
                  src={masterCourse.image.url}
                  alt={masterCourse.image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081F35]/70 via-transparent to-transparent lg:bg-gradient-to-r" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#081F35]/70 backdrop-blur-md border border-ocean-pale/25 text-ocean-pale text-[10px] font-mono tracking-widest uppercase">
                  Apex Recreational Certification
                </span>
              </div>

              <div className="p-8 sm:p-10 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <h4 className="font-serif text-3xl sm:text-4xl font-bold text-white group-hover:text-ocean-pale transition-colors">
                    {masterCourse.title}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-light">
                    {masterCourse.shortDesc}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-300 pt-2">
                    <span>{masterCourse.durationDays} days</span>
                    <span className="text-ocean-pale font-bold">{formatPrice(masterCourse.priceEur)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking(masterCourse.id);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-ocean hover:bg-ocean-light text-white text-xs font-bold uppercase tracking-wider transition-all text-center"
                  >
                    Reserve Your Spot
                  </button>
                  <div className="p-3 rounded-xl border border-ocean-pale/15 group-hover:border-ocean-light text-slate-400 group-hover:text-ocean-pale transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </FadeUp>
          )}

          {/* Professional instructor path */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {instructorCourses.map((course, idx) => (
              <FadeUp
                key={course.id}
                delay={idx * 0.1}
                onClick={() => navigateToCourse(course.slug)}
                className="group glass-panel rounded-2xl overflow-hidden border border-ocean-pale/10 hover:border-ocean-light/50 flex flex-col transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={course.image.url}
                    alt={course.image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081F35] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#081F35]/70 backdrop-blur-md border border-ocean-pale/25 text-ocean-pale text-[9px] font-mono tracking-widest uppercase">
                    {course.durationWeeksOrDays}
                  </span>
                  {course.internshipOption && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-ocean/40 backdrop-blur-md border border-ocean-light/40 text-ocean-pale text-[9px] font-mono tracking-widest uppercase">
                      Internship
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-2.5 flex-1 flex flex-col">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-ocean-pale transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2 flex-1">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-2.5 border-t border-ocean-pale/10">
                    <span className="inline-flex items-center gap-1.5 text-ocean-light group-hover:text-ocean-pale transition-colors uppercase text-[10px] tracking-wider">
                      View course
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-ocean-pale font-bold">{formatPrice(course.priceEur)}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Tailored ask */}
          <FadeUp className="glass-panel rounded-2xl border border-ocean-pale/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="font-serif text-2xl font-bold text-white">
                Tailored programs & Specialty Instructor
              </h4>
              <p className="text-slate-300/90 font-alata text-sm max-w-xl leading-relaxed">
                Mouthfill masterclasses, competition preparation, mermaid programs, and our
                professional SSI Specialty Instructor ratings — tailored around your goals and
                scheduled on request.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="shrink-0 px-7 py-3.5 rounded-full bg-white text-[#0E3453] hover:bg-ocean-pale font-alata text-xs font-semibold uppercase tracking-[0.08em] transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <span>Ask Us Anything</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}
