import { ssiCourses, specialtyCourses, instructorCourses } from '../../data/courses';
import { PageType } from '../../types';
import { ArrowRight, CheckCircle, ChevronRight, BookOpen, Award, Users, Waves } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TextReveal, CountUp, FadeUp, useInView } from '../ui/MotionKit';
import { ChapterBar } from './ChapterBar';

/* ==========================================================================
   COURSES — Contra-report scrollytelling
   Four chapters (01 The System · 02 Core Courses · 03 Try Freediving ·
   04 Pro Academy) tracked by the fixed ChapterBar. Chapter headers stack an
   elegant serif-caps line over a huge display line; a 3D bar infographic
   compares the core course depths; numbers count up on view.
   ========================================================================== */

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

/** Contra-style extruded 3D bar comparing course depths */
function DepthBar({
  depthMeters,
  maxScale,
  label,
  delay,
}: {
  depthMeters: number;
  maxScale: number;
  label: string;
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const heightPct = Math.max((depthMeters / maxScale) * 100, 8);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 sm:gap-4">
      <div className="font-bebas text-4xl sm:text-5xl text-white leading-none tracking-[0.02em]">
        <CountUp end={depthMeters} suffix="m" />
      </div>
      <div className="relative w-16 sm:w-24 h-44 sm:h-56 flex items-end">
        <div
          className="bar3d"
          style={{
            height: inView ? `${heightPct}%` : '0%',
            transitionDelay: `${delay}ms`,
          }}
        >
          <div className="bar3d-front" />
          <div className="bar3d-top" />
          <div className="bar3d-side" />
        </div>
      </div>
      <div className="font-serif italic text-ocean-pale text-sm sm:text-base text-center leading-tight">
        {label}
      </div>
    </div>
  );
}

/** Contra-style chapter heading: serif-caps eyebrow over a huge display line */
function ChapterHeading({
  number,
  eyebrow,
  title,
  highlight,
}: {
  number: string;
  eyebrow: string;
  title: string;
  highlight?: string;
}) {
  return (
    <div className="space-y-4 mb-12 sm:mb-16">
      <div className="flex items-center gap-4">
        <span className="font-serif italic text-ocean-light text-xl sm:text-2xl">{number}</span>
        <span className="h-px flex-1 bg-ocean-pale/15" />
        <span className="font-serif italic uppercase tracking-[0.3em] text-ocean-pale text-xs sm:text-sm">
          <TextReveal>{eyebrow}</TextReveal>
        </span>
      </div>
      <h2 className="font-bebas text-white uppercase tracking-[0.04em] leading-[0.95] text-5xl sm:text-7xl md:text-8xl">
        <TextReveal stagger={0.05}>{title}</TextReveal>
        {highlight ? (
          <>
            {' '}
            <span className="text-ocean-light">
              <TextReveal stagger={0.05} delay={0.2}>
                {highlight}
              </TextReveal>
            </span>
          </>
        ) : null}
      </h2>
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
  const maxDepthScale = Math.max(...coreCourses.map((c) => c.maxDepthMeters), 1);

  // Categorized card collections
  const coreCards = tryFreediving ? [tryFreediving, ...coreCourses] : coreCourses;
  const specialtyCards = specialtyCourses.filter((c) => c.id !== 'master-freediver');
  const masterCourse = specialtyCourses.find((c) => c.id === 'master-freediver');

  return (
    <section id="courses" className="relative bg-[#0E3453] pb-36 sm:pb-40 film-grain">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-grid-fine opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 px-6">

        {/* Page intro header (kept from the previous design) */}
        <div className="pt-24 sm:pt-28 mb-20 sm:mb-24 pb-8 border-b border-ocean-pale/10">
          <div className="flex items-center gap-3 text-xs font-alata tracking-[0.3em] uppercase text-ocean-light mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-ocean-light animate-pulse" />
            <span>{t('coursesSection.badge')}</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-[0.05em] leading-tight uppercase">
            <TextReveal stagger={0.04}>{t('coursesSection.title')}</TextReveal>{' '}
            <span className="text-ocean-light">
              <TextReveal stagger={0.04} delay={0.25}>
                {t('coursesSection.titleHighlight')}
              </TextReveal>
            </span>
          </h2>
          <p className="text-ocean-pale/80 font-alata font-normal max-w-xl text-base sm:text-lg leading-relaxed mt-5">
            {t('coursesSection.subtitle')}
          </p>
        </div>

        {/* ========================================================== */}
        {/* CHAPTER 01 — THE SSI INTERNATIONAL SYSTEM                   */}
        {/* ========================================================== */}
        <div id="chapter-system" className="scroll-mt-28 mb-28 sm:mb-36">
          <ChapterHeading
            number="01"
            eyebrow={t('courseChapters.system')}
            title="LEARN THE"
            highlight="SYSTEM"
          />

          <FadeUp className="glass-panel rounded-2xl border border-ocean-pale/10 p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean/30 border border-ocean-light/40 text-ocean-pale text-[10px] font-mono uppercase tracking-[0.2em]">
                THE SSI INTERNATIONAL SYSTEM
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                A structured path from your <span className="italic text-ocean-pale">first breath</span> to professional depth
              </h3>
              <p className="text-slate-300/90 font-alata font-light text-sm sm:text-base leading-relaxed">
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
                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-ocean-pale/15 text-[11px] font-alata text-slate-300"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-center">
              {SSI_BRIEF_POINTS.map((point, idx) => (
                <FadeUp
                  key={point.title}
                  delay={idx * 0.1}
                  className="p-5 rounded-xl bg-[#081F35]/60 border border-ocean-pale/10 hover:border-ocean-light/40 transition-all duration-300"
                >
                  <point.icon className="w-5 h-5 text-ocean-light mb-3" />
                  <div className="text-sm font-alata font-semibold text-white mb-1">{point.title}</div>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed">{point.desc}</p>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* ========================================================== */}
        {/* CHAPTER 02 — OUR CORE COURSES + BY-THE-NUMBERS INFOGRAPHIC  */}
        {/* ========================================================== */}
        <div id="chapter-core" className="scroll-mt-28 mb-28 sm:mb-36">
          <ChapterHeading
            number="02"
            eyebrow={t('courseChapters.core')}
            title="OUR CORE"
            highlight="COURSES"
          />

          {/* By-the-numbers: 3D depth bars + ratio facts */}
          <FadeUp className="glass-panel rounded-2xl border border-ocean-pale/10 p-8 sm:p-10 mb-14">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
              <div className="lg:w-2/3 w-full">
                <p className="font-serif italic uppercase tracking-[0.28em] text-ocean-pale text-xs mb-8 text-center">
                  {t('courseChapters.numbersEyebrow')}
                </p>
                <div className="flex items-end justify-center gap-10 sm:gap-16 border-b border-ocean-pale/20 pb-0">
                  {coreCourses.map((course, idx) => (
                    <DepthBar
                      key={course.id}
                      depthMeters={course.maxDepthMeters}
                      maxScale={maxDepthScale}
                      label={course.title}
                      delay={idx * 180}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:w-1/3 w-full grid grid-cols-2 lg:grid-cols-1 gap-6">
                <div className="border-l-2 border-ocean-light/50 pl-4">
                  <div className="font-bebas text-5xl text-white leading-none">
                    <CountUp end={3} />:1
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-ocean-pale/80 font-alata mt-1">
                    {t('courseChapters.ratioLabel')}
                  </div>
                </div>
                <div className="border-l-2 border-ocean-light/50 pl-4">
                  <div className="font-bebas text-5xl text-white leading-none">
                    <CountUp end={130} suffix="+" />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-ocean-pale/80 font-alata mt-1">
                    {t('courseChapters.countriesLabel')}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

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
        <div id="chapter-try" className="scroll-mt-28 mb-28 sm:mb-36">
          <ChapterHeading
            number="03"
            eyebrow={t('courseChapters.try')}
            title="SPECIALTY"
            highlight="CLINICS"
          />

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
          <ChapterHeading
            number="04"
            eyebrow={t('courseChapters.pro')}
            title="MASTER & PRO"
            highlight="ACADEMY"
          />

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

      {/* Fixed bottom chapter progress (Contra-style) */}
      <ChapterBar />
    </section>
  );
}
