import { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  Download,
  CalendarCheck,
  Grid,
  List,
  CheckCircle2,
  ExternalLink,
  Compass,
  Award,
} from 'lucide-react';
import {
  MONTHS_2026,
  SCHEDULE_2026_EVENTS,
  EVENT_TYPES_DATA,
  EventDateSchedule,
  createGoogleCalendarUrl,
  exportToIcs,
} from '../../data/calendarSchedule2026';
import { PageType, EventTypeId } from '../../types';

interface CalendarSectionProps {
  onOpenBooking: (courseId?: string) => void;
  onNavigate?: (page: PageType) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

type CategoryFilter =
  | 'All'
  | 'Beginner'
  | 'Advanced'
  | 'Training'
  | 'Ras Mohamed trip'
  | 'Zero to Hero'
  | 'Instructor Course';

export function CalendarSection({ onOpenBooking, onNavigate, currency }: CalendarSectionProps) {
  // Default to September 2026 (the current simulated active month)
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(8); // 8 = September (0-indexed)
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'calendar'>('cards');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number | null>(null);

  const currentMonth = MONTHS_2026[selectedMonthIndex];

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  const handlePrevMonth = () => {
    setSelectedMonthIndex((prev) => (prev > 0 ? prev - 1 : 11));
    setSelectedCalendarDay(null);
  };

  const handleNextMonth = () => {
    setSelectedMonthIndex((prev) => (prev < 11 ? prev + 1 : 0));
    setSelectedCalendarDay(null);
  };

  // Filter events for current month and active category
  const currentMonthEvents = useMemo(() => {
    return SCHEDULE_2026_EVENTS.filter((ev) => {
      const matchMonth = ev.monthNum === currentMonth.num;
      const matchCategory = selectedCategory === 'All' || ev.category === selectedCategory;
      return matchMonth && matchCategory;
    });
  }, [currentMonth.num, selectedCategory]);

  // Overall count across all of 2026 per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: SCHEDULE_2026_EVENTS.length };
    SCHEDULE_2026_EVENTS.forEach((e) => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Category badge colors
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Advanced':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      case 'Training':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Ras Mohamed trip':
        return 'bg-teal-500/10 text-teal-300 border-teal-500/30';
      case 'Zero to Hero':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      case 'Instructor Course':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
    }
  };

  const categories: CategoryFilter[] = [
    'All',
    'Beginner',
    'Advanced',
    'Training',
    'Ras Mohamed trip',
    'Zero to Hero',
    'Instructor Course',
  ];

  // Dedicated Event Pages quick list
  const eventTypesList = Object.values(EVENT_TYPES_DATA);

  return (
    <section className="relative bg-[#0E3453] text-slate-100 py-12 sm:py-16 px-4 sm:px-8">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-cyan-600/[0.04] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">

        {/* ======================================================== */}
        {/* TOP NOTICE BANNER (AS REQUIRED BY USER)                  */}
        {/* ======================================================== */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-[#0E3453] to-cyan-950/70 border border-cyan-400/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                YEAR-ROUND FLEXIBILITY NOTE
              </span>
              <p className="text-sm sm:text-base font-serif italic text-white leading-snug">
                &ldquo;This is only the calendar for our scheduled events. We run all other courses all year round on request, just let us know your dates!&rdquo;
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-light text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-cyan-500/25 cursor-pointer text-center"
          >
            Custom Date Inquiry
          </button>
        </div>

        {/* ======================================================== */}
        {/* DEDICATED EVENT TYPE SHORTCUTS BAR                       */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dedicated Event Hubs (Click for detailed syllabus &amp; 2026 dates)</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {eventTypesList.map((et) => (
              <button
                key={et.id}
                onClick={() => onNavigate && onNavigate(`event-${et.id}` as PageType)}
                className="p-3 rounded-xl bg-[#0E3453] hover:bg-[#0E3453] border border-white/10 hover:border-cyan-400/40 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider block">
                    {et.category}
                  </span>
                  <div className="font-serif font-bold text-white text-xs sm:text-sm group-hover:text-cyan-300 transition-colors mt-0.5 line-clamp-1">
                    {et.title}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2 pt-2 border-t border-white/5">
                  <span>{formatPrice(et.basePriceEur)}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-cyan-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2026 MONTH NAVIGATION & CYCLING STRIP                    */}
        {/* ======================================================== */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0E3453] border border-white/10 space-y-6">
          
          {/* Header with Month Selector & View Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevMonth}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                title="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-baseline gap-2.5">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {currentMonth.name}
                </h3>
                <span className="font-mono text-cyan-400 text-base sm:text-lg font-bold">
                  2026
                </span>
                {currentMonth.name === 'September' && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono text-[10px] uppercase font-bold tracking-wider">
                    Current Season
                  </span>
                )}
              </div>

              <button
                onClick={handleNextMonth}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                title="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View Mode Toggle: Cards vs Calendar Grid */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'cards'
                      ? 'bg-ocean text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List View</span>
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'calendar'
                      ? 'bg-ocean text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Calendar Grid</span>
                </button>
              </div>
            </div>

          </div>

          {/* 12-Month Quick Selector Tabs */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 pt-2 border-t border-white/5">
            {MONTHS_2026.map((m, idx) => {
              const isSelected = idx === selectedMonthIndex;
              const hasEvents = SCHEDULE_2026_EVENTS.some((e) => e.monthNum === m.num);
              const isCurrentSim = m.name === 'September';

              return (
                <button
                  key={m.num}
                  onClick={() => {
                    setSelectedMonthIndex(idx);
                    setSelectedCalendarDay(null);
                  }}
                  className={`py-2 px-1 rounded-xl text-center font-mono text-xs transition-all relative cursor-pointer ${
                    isSelected
                      ? 'bg-ocean text-white font-bold shadow-md shadow-cyan-500/25'
                      : isCurrentSim
                      ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <span className="block">{m.short}</span>
                  {hasEvents && (
                    <span
                      className={`w-1 h-1 rounded-full mx-auto mt-1 ${
                        isSelected ? 'bg-black' : 'bg-cyan-400'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* EVENT CATEGORY FILTER PILLS                              */}
          {/* ======================================================== */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" />
              <span>Filter:</span>
            </span>

            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-ocean text-white font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-black/30 text-black' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ======================================================== */}
        {/* VIEW 1: DETAILED EVENT CARDS VIEW                        */}
        {/* ======================================================== */}
        {viewMode === 'cards' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span>
                Showing {currentMonthEvents.length} scheduled events for {currentMonth.name} 2026
                {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
              </span>
              <span>All departures include SSI gear, buoy lines &amp; certification</span>
            </div>

            {currentMonthEvents.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#0E3453] border border-white/10 text-center space-y-4">
                <CalendarIcon className="w-12 h-12 text-slate-500 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-white">
                  No scheduled {selectedCategory} events in {currentMonth.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-md mx-auto">
                  We run private and tailored courses every single day on request! Contact our team to book your preferred dates.
                </p>
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-2.5 rounded-xl bg-ocean hover:bg-ocean-light text-white font-mono text-xs font-bold uppercase tracking-wider"
                >
                  Request Custom Dates in {currentMonth.name}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentMonthEvents.map((item) => {
                  const eventDetail = EVENT_TYPES_DATA[item.eventTypeId];
                  const isCurrent = item.status === 'current';
                  const isPast = item.status === 'past';
                  const googleCalUrl = createGoogleCalendarUrl(item);

                  return (
                    <div
                      key={item.id}
                      className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                        isCurrent
                          ? 'bg-[#0E3453] border-cyan-400/60 shadow-[0_0_30px_rgba(56,189,248,0.2)] ring-1 ring-cyan-400/30'
                          : isPast
                          ? 'bg-[#0E3453] border-white/5 opacity-70'
                          : 'bg-[#0E3453] border-white/10 hover:border-cyan-400/40 hover:bg-[#0E3453]'
                      }`}
                    >
                      {/* Top Row: Date Pill & Status */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${getCategoryColor(
                              item.category
                            )}`}
                          >
                            {item.category}
                          </span>

                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-ocean-light text-white font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                              Active Now
                            </span>
                          )}

                          {!isPast && !isCurrent && (
                            <span className="text-[11px] font-mono text-emerald-400 font-bold">
                              {item.spotsAvailable} spots open
                            </span>
                          )}

                          {isPast && (
                            <span className="text-[10px] font-mono text-slate-500 uppercase">
                              Past Event
                            </span>
                          )}
                        </div>

                        {/* Title & Date */}
                        <div>
                          <div className="text-xl font-serif font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {item.eventTitle}
                          </div>
                          <div className="font-mono text-sm text-cyan-300 font-semibold mt-1">
                            {item.dateLabel}
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 font-sans font-light line-clamp-2 leading-relaxed">
                          {eventDetail?.description || 'SSI certified training immersion in Dahab.'}
                        </p>

                        {/* Specs */}
                        <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 border-t border-white/5">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{item.durationDays} Days</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="truncate">{item.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom: Price, Link to Detail Page & Export Tools */}
                      <div className="pt-5 mt-4 border-t border-white/10 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-slate-400">All-Inclusive</span>
                            <div className="font-serif text-xl font-bold text-white">
                              {formatPrice(item.priceEur)}
                            </div>
                          </div>

                          {/* Link to Dedicated Page */}
                          <button
                            onClick={() => onNavigate && onNavigate(`event-${item.eventTypeId}` as PageType)}
                            className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-white transition-colors cursor-pointer group/link"
                          >
                            <span>Full Details</span>
                            <ArrowRight className="w-3 h-3 group-link-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          {/* Google Calendar export */}
                          <a
                            href={googleCalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors flex items-center gap-1"
                            title="Add to Google Calendar"
                          >
                            <CalendarCheck className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="hidden sm:inline">Google</span>
                          </a>

                          {/* iCal export */}
                          <button
                            onClick={() => exportToIcs(item)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                            title="Download iCal file"
                          >
                            <Download className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="hidden sm:inline">iCal</span>
                          </button>

                          {/* Instant Booking */}
                          <button
                            onClick={() => onOpenBooking(`${item.eventTypeId}-${item.id}`)}
                            disabled={isPast}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all text-center ${
                              isPast
                                ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                                : 'bg-ocean hover:bg-ocean-light text-white shadow-md shadow-cyan-500/20 cursor-pointer'
                            }`}
                          >
                            {isPast ? 'Completed' : 'Book Seat'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: INTERACTIVE MONTHLY CALENDAR GRID VIEW           */}
        {/* ======================================================== */}
        {viewMode === 'calendar' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0E3453] border border-white/10 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h4 className="font-serif text-xl font-bold text-white">
                  {currentMonth.name} 2026 Interactive Calendar
                </h4>
                <p className="text-xs text-slate-400 font-sans">
                  Click any active day block to reveal scheduled departures and click into their dedicated pages.
                </p>
              </div>
            </div>

            {/* Day of week headers */}
            <div className="grid grid-cols-7 gap-2 text-center font-mono text-xs uppercase text-slate-400 font-semibold">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: currentMonth.days }).map((_, dIdx) => {
                const dayNum = dIdx + 1;
                const dayStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
                const dateIso = `2026-${currentMonth.num < 10 ? `0${currentMonth.num}` : currentMonth.num}-${dayStr}`;
                
                // Find events active on this date
                const dayEvents = SCHEDULE_2026_EVENTS.filter((e) => {
                  return dateIso >= e.startIso && dateIso <= e.endIso;
                });

                const isSelectedDay = selectedCalendarDay === dayNum;
                const hasEvents = dayEvents.length > 0;

                return (
                  <div
                    key={dayNum}
                    onClick={() => hasEvents && setSelectedCalendarDay(dayNum)}
                    className={`min-h-[85px] sm:min-h-[105px] p-2 rounded-xl border transition-all flex flex-col justify-between ${
                      hasEvents ? 'cursor-pointer hover:border-cyan-400/50' : 'cursor-default opacity-40'
                    } ${
                      isSelectedDay
                        ? 'bg-cyan-950/60 border-cyan-400 ring-2 ring-cyan-400/40'
                        : hasEvents
                        ? 'bg-[#0E3453] border-white/10'
                        : 'bg-black/20 border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={`font-bold ${hasEvents ? 'text-white' : 'text-slate-600'}`}>
                        {dayNum}
                      </span>
                      {hasEvents && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      )}
                    </div>

                    {/* Mini event tags */}
                    <div className="space-y-1 mt-1">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className="px-1.5 py-0.5 rounded text-[9px] font-mono truncate bg-cyan-500/20 text-cyan-200 border border-cyan-400/30"
                          title={`${ev.eventTitle}: ${ev.dateLabel}`}
                        >
                          {ev.eventTitle}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[9px] font-mono text-cyan-400 font-bold pl-1">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Day Details Panel */}
            {selectedCalendarDay && (
              <div className="p-5 rounded-2xl bg-[#0E3453] border border-cyan-400/40 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="font-serif font-bold text-white text-lg">
                    Events Active on {currentMonth.name} {selectedCalendarDay}, 2026
                  </div>
                  <button
                    onClick={() => setSelectedCalendarDay(null)}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Close Day
                  </button>
                </div>

                {(() => {
                  const dayStr = selectedCalendarDay < 10 ? `0${selectedCalendarDay}` : `${selectedCalendarDay}`;
                  const dateIso = `2026-${currentMonth.num < 10 ? `0${currentMonth.num}` : currentMonth.num}-${dayStr}`;
                  const activeOnDay = SCHEDULE_2026_EVENTS.filter(
                    (e) => dateIso >= e.startIso && dateIso <= e.endIso
                  );

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {activeOnDay.map((e) => (
                        <div
                          key={e.id}
                          className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2"
                        >
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${getCategoryColor(
                              e.category
                            )}`}
                          >
                            {e.category}
                          </span>
                          <h5 className="font-serif font-bold text-white text-base">
                            {e.eventTitle}
                          </h5>
                          <div className="text-xs font-mono text-cyan-300">
                            {e.dateLabel} ({e.durationDays} Days)
                          </div>
                          <div className="pt-2 flex items-center justify-between">
                            <button
                              onClick={() => onNavigate && onNavigate(`event-${e.eventTypeId}` as PageType)}
                              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>Dedicated Page</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onOpenBooking(e.id)}
                              className="px-3 py-1 rounded-lg bg-ocean text-white text-xs font-mono font-bold uppercase cursor-pointer"
                            >
                              Book
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
