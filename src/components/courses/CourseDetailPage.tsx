import { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Award,
  Waves,
  CheckCircle,
  Shield,
  ChevronRight,
  Sparkles,
  Users,
  Share2,
  Check,
} from 'lucide-react';
import { PageType, Course, SpecialtyCourse, InstructorCourse } from '../../types';
import { ssiCourses, specialtyCourses, instructorCourses } from '../../data/courses';
import { CourseInfographic } from './CourseInfographic';

interface CourseDetailPageProps {
  courseSlug: string;
  onNavigate: (page: PageType) => void;
  onOpenBooking: (courseId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

export function CourseDetailPage({
  courseSlug,
  onNavigate,
  onOpenBooking,
  currency,
}: CourseDetailPageProps) {
  const [copied, setCopied] = useState(false);

  const course =
    ssiCourses.find((c) => c.slug === courseSlug) ||
    specialtyCourses.find((c) => c.slug === courseSlug) ||
    instructorCourses.find((c) => c.slug === courseSlug);

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // ============================== NOT FOUND ==============================
  if (!course) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-20 bg-[#0E3453]">
        <div className="text-center space-y-6 max-w-md animate-in fade-in zoom-in-95 duration-300">
          <Waves className="w-14 h-14 text-cyan-400/60 mx-auto" />
          <h1 className="font-serif text-4xl font-bold text-white">Course not found</h1>
          <p className="text-slate-400 font-light">
            The course you are looking for has drifted into deeper waters. Explore our full
            curriculum instead.
          </p>
          <button
            onClick={() => onNavigate('courses')}
            className="px-8 py-3.5 rounded-xl bg-ocean hover:bg-ocean-light text-white text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Courses</span>
          </button>
        </div>
      </div>
    );
  }

  const isCore = 'overview' in course;
  const isSpecialty = 'keySkills' in course;
  const isInstructor = 'modules' in course;

  const durationLabel =
    'durationDays' in course ? `${course.durationDays} Day${course.durationDays > 1 ? 's' : ''}` : course.durationWeeksOrDays;

  const depthLabel = 'maxDepthMeters' in course ? `${course.maxDepthMeters}m max depth` : null;

  const collection: (Course | SpecialtyCourse | InstructorCourse)[] =
    isCore ? ssiCourses : isSpecialty ? specialtyCourses : instructorCourses;

  const related = collection.filter((c) => c.slug !== course.slug).slice(0, 3);

  const skillsList = isCore
    ? (course as Course).highlights
    : isSpecialty
    ? (course as SpecialtyCourse).keySkills
    : (course as InstructorCourse).modules;

  const subtitleText = isCore
    ? (course as Course).subtitle
    : isSpecialty
    ? (course as SpecialtyCourse).shortDesc
    : null;

  const skillsTitle = isCore
    ? 'Course Highlights'
    : isSpecialty
    ? 'Key Skills You Will Develop'
    : 'Core Modules & Examination';

  const description = isCore
    ? (course as Course).overview
    : isSpecialty
    ? `${(course as SpecialtyCourse).shortDesc}\n\n${(course as SpecialtyCourse).fullDesc}`
    : (course as InstructorCourse).description;

  const includedList: string[] | null = 'included' in course ? (course as Course).included : null;

  const levelBadge =
    'level' in course
      ? (course as Course).level
      : isInstructor
      ? 'Instructor / Pro'
      : 'Specialty';

  const handleNavigateToCourse = (slug: string) => {
    // App's navigateTo resets scroll to the surface through Lenis
    onNavigate(`course-${slug}` as PageType);
  };

  return (
    <div className="relative bg-[#0E3453] text-slate-100 min-h-screen">
      {/* ========================================================== */}
      {/* HERO                                                        */}
      {/* ========================================================== */}
      <div className="relative h-[72vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={course.image.url}
          alt={course.image.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-[#0E3453]/40 to-[#0E3453]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E3453]/70 via-transparent to-transparent" />

        {/* Top actions */}
        <div className="absolute top-24 sm:top-28 left-6 right-6 max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('courses')}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-slate-200 hover:text-white hover:border-cyan-400/60 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>All Courses</span>
          </button>
          <button
            onClick={handleShare}
            title="Copy link to this course"
            className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-slate-200 hover:text-cyan-300 hover:border-cyan-400/60 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-cyan-300" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
          <div className="max-w-7xl mx-auto space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-[10px] font-mono uppercase tracking-[0.2em]">
                {levelBadge}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-slate-200 text-[10px] font-mono uppercase tracking-[0.2em]">
                SSI International Certification
              </span>
              {isInstructor && (course as InstructorCourse).internshipOption && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-[10px] font-mono uppercase tracking-[0.2em]">
                  Teaching Internship Included
                </span>
              )}
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight drop-shadow-lg max-w-4xl">
              {course.title}
            </h1>

            {subtitleText && (
              <p className="text-slate-300 text-sm sm:text-lg font-light max-w-2xl leading-relaxed">
                {subtitleText}
              </p>
            )}

            {/* Meta chips */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {durationLabel}
              </span>
              {depthLabel && (
                <span className="flex items-center gap-2">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  {depthLabel}
                </span>
              )}
              {isCore && (
                <span className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  {(course as Course).certification}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* BODY                                                        */}
      {/* ========================================================== */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="absolute inset-0 architectural-grid-fine opacity-10 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT: Description & curriculum */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.05em] flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                About this course
              </h2>
              {description.split('\n\n').map((para, i) => (
                <p key={i} className="text-slate-300 font-light text-sm sm:text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Skills / highlights / modules */}
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: '120ms' }}>
              <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.05em] flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                {skillsTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsList.map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
                  >
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-day schedule (core courses with a full plan in the data) */}
            {isCore && (course as Course).schedule && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: '160ms' }}>
                <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.05em] flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  Day by day
                </h2>
                <div className="space-y-3">
                  {(course as Course).schedule!.map((day, i) => (
                    <div
                      key={i}
                      className="p-5 sm:p-6 rounded-xl bg-slate-900/50 border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono uppercase tracking-[0.2em]">
                          {day.day}
                        </span>
                        <span className="text-sm font-semibold text-white">{day.title}</span>
                      </div>
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {day.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Motion infographic — adapted from the hand-drawn diving template */}
            {isCore && (course as Course).disciplines && (course as Course).futurePerformances && (
              <div className="animate-in fade-in duration-700">
                <CourseInfographic course={course as Course} />
              </div>
            )}

            {/* Included (core) or schedule */}
            {includedList && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: '200ms' }}>
                <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.05em] flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-400" />
                  What's included
                </h2>
                <div className="space-y-2.5">
                  {includedList.map((inc, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span className="font-light">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isCore && !(course as Course).schedule && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-cyan-950/30 border border-cyan-400/25 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: '260ms' }}>
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400 mb-2">
                  Typical day structure
                </div>
                <p className="text-slate-200 text-sm font-light leading-relaxed">
                  {(course as Course).scheduleSummary}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: Booking panel */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: '160ms' }}>
              <div className="glass-panel rounded-2xl border border-cyan-400/30 p-7 space-y-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">
                      All-inclusive price
                    </div>
                    <div className="text-4xl font-serif font-bold text-cyan-300 pt-1">
                      {formatPrice(course.priceEur)}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-[10px] tracking-tight shadow-lg shadow-cyan-500/30">
                    SSI
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking(course.id)}
                  className="w-full py-4 rounded-xl bg-ocean hover:bg-ocean-light text-white text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isInstructor ? 'Apply Now' : 'Reserve Your Spot'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="space-y-3 pt-2 border-t border-white/10">
                  {[
                    { icon: Shield, text: 'Official SSI certification & digital materials' },
                    { icon: Users, text: 'Small groups — max 3:1 student-to-instructor' },
                    { icon: Waves, text: 'Lighthouse Bay & Blue Hole training locations' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3 text-[11px] text-slate-300">
                      <row.icon className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-light">{row.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              {course.prerequisites && (
                <div className="glass-panel rounded-2xl border border-white/10 p-6 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">
                    Prerequisites
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {course.prerequisites}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* RELATED COURSES                                             */}
        {/* ========================================================== */}
        {related.length > 0 && (
          <div className="relative z-10 mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.05em]">
                Continue your <span className="text-cyan-300">journey</span>
              </h2>
              <button
                onClick={() => onNavigate('courses')}
                className="text-xs font-mono uppercase tracking-wider text-cyan-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                All courses
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <button
                  key={rel.id}
                  onClick={() => handleNavigateToCourse(rel.slug)}
                  className="group text-left rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 bg-slate-900/40 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={rel.image.url}
                      alt={rel.image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-transparent to-transparent" />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {rel.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>
                        {'durationDays' in rel
                          ? `${rel.durationDays} days`
                          : rel.durationWeeksOrDays}
                      </span>
                      <span className="text-cyan-300 font-bold">{formatPrice(rel.priceEur)}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
