import { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Compass,
  CheckCircle2,
  Download,
  Share2,
  ExternalLink,
  Shield,
  Award,
  Sparkles,
  MapPin,
  Send,
  AlertCircle,
  HelpCircle,
  Users,
  Check,
} from 'lucide-react';
import {
  EventTypeDetail,
  EVENT_TYPES_DATA,
  SCHEDULE_2026_EVENTS,
  EventDateSchedule,
  createGoogleCalendarUrl,
  exportToIcs,
} from '../../data/calendarSchedule2026';
import { PageType, EventTypeId } from '../../types';

interface EventDetailPageProps {
  eventTypeId: EventTypeId;
  onNavigate: (page: PageType) => void;
  onOpenBooking: (courseId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

export function EventDetailPage({
  eventTypeId,
  onNavigate,
  onOpenBooking,
  currency,
}: EventDetailPageProps) {
  const event: EventTypeDetail =
    EVENT_TYPES_DATA[eventTypeId as keyof typeof EVENT_TYPES_DATA] ||
    EVENT_TYPES_DATA['beginner-week'];
  
  // Filter all 2026 schedule dates for this specific event type
  const eventDates: EventDateSchedule[] = SCHEDULE_2026_EVENTS.filter(
    (item) => item.eventTypeId === eventTypeId
  );

  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('all');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryWhatsapp, setInquiryWhatsapp] = useState('');
  const [inquiryDates, setInquiryDates] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;
    setInquirySubmitted(true);
  };

  const filteredDates = eventDates.filter((d) => {
    if (selectedMonthFilter === 'all') return true;
    return d.monthName.toLowerCase() === selectedMonthFilter.toLowerCase();
  });

  // Unique months available for this event
  const availableMonths = Array.from(new Set(eventDates.map((d) => d.monthName)));

  return (
    <div className="relative min-h-screen bg-[#020813] text-slate-100 pb-32">
      
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-cyan-600/[0.06] blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none" />

      {/* ======================================================== */}
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION                      */}
      {/* ======================================================== */}
      <div className="relative z-20 pt-28 sm:pt-32 pb-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-white/5">
        <button
          onClick={() => onNavigate('calendar')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-white/10 hover:border-cyan-400/40 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to 2026 Event Calendar</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Share this event page"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Page'}</span>
          </button>
          
          <button
            onClick={() => onOpenBooking(event.id)}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            Instant Registration
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. HERO SHOWCASE FOR EVENT                               */}
      {/* ======================================================== */}
      <section className="relative z-10 px-4 sm:px-8 py-10 sm:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Text, Badges, Key Metrics */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest font-semibold">
                {event.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                {event.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              {event.title}
            </h1>

            <p className="text-base sm:text-lg text-cyan-200/90 font-sans font-medium">
              {event.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-300 font-sans font-light leading-relaxed">
              {event.fullOverview}
            </p>

            {/* Quick Specs Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-[#040e1c] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>Duration</span>
                </span>
                <div className="font-serif font-bold text-white text-sm sm:text-base">
                  {event.durationText}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#040e1c] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <Compass className="w-3 h-3 text-cyan-400" />
                  <span>Depth Scope</span>
                </span>
                <div className="font-serif font-bold text-cyan-300 text-sm sm:text-base">
                  {event.maxDepth}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#040e1c] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-cyan-400" />
                  <span>License</span>
                </span>
                <div className="font-serif font-bold text-white text-xs sm:text-sm truncate" title={event.certification}>
                  {event.certification}
                </div>
              </div>

              <div className="col-span-2 sm:col-span-3 p-3.5 rounded-xl bg-[#040e1c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    Investment
                  </span>
                  <div className="font-serif text-2xl font-bold text-white flex items-baseline gap-2">
                    <span>{formatPrice(event.basePriceEur)}</span>
                    <span className="text-xs font-mono font-normal text-slate-400">/ diver all-inclusive</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="#dates-section"
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider font-semibold border border-white/10 transition-all text-center"
                  >
                    View 2026 Dates
                  </a>
                  <button
                    onClick={() => onOpenBooking(event.id)}
                    className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 text-center"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Immersive Image with Accent Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] group aspect-[4/3] lg:aspect-[4/5]">
              <img
                src={event.heroImage}
                alt={event.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#020813]/30 to-transparent" />
              
              {/* Bottom Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 text-xs font-sans space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-300 font-mono font-bold text-[11px] uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dahab Blue Hole &amp; Lighthouse Sanctuary</span>
                </div>
                <p className="text-slate-300 font-light text-[11px] leading-relaxed">
                  Direct water access, heated classroom briefings, otovent equalization biofeedback lab, and video debriefing lounge.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. SCHEDULED DATES (2026) FULL CALENDAR BREAKDOWN        */}
      {/* ======================================================== */}
      <section id="dates-section" className="relative z-10 px-4 sm:px-8 py-16 max-w-7xl mx-auto">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#030d1d] border border-cyan-500/20 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                <Calendar className="w-4 h-4" />
                <span>2026 Confirmed Departures &amp; Weeks</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Scheduled Dates for {event.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light">
                Choose an upcoming confirmed departure below. Each date includes full equipment, counter-ballast training, coaching, and international certification.
              </p>
            </div>

            {/* Month Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedMonthFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedMonthFilter === 'all'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                All Months ({eventDates.length})
              </button>
              {availableMonths.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonthFilter(m)}
                  className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    selectedMonthFilter === m
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  {m.substring(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Year-At-A-Glance Schedule Strings */}
          <div className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-3">
              Official 2026 Schedule Roster
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs font-mono">
              {event.scheduledDateStrings.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1 hover:border-cyan-400/30 transition-colors"
                >
                  <span className="text-cyan-400 font-bold uppercase tracking-wider">{item.month}:</span>
                  <span className="text-slate-200">{item.dates}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Event Date Cards / Schedule List */}
          <div className="space-y-3">
            {filteredDates.map((item) => {
              const isPast = item.status === 'past';
              const isCurrent = item.status === 'current';
              const googleCalUrl = createGoogleCalendarUrl(item);

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isCurrent
                      ? 'bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_25px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400/40'
                      : isPast
                      ? 'bg-black/30 border-white/5 opacity-60'
                      : 'bg-[#040e1d] border-white/10 hover:border-cyan-400/40 hover:bg-[#061429]'
                  }`}
                >
                  {/* Left: Date & Status */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border ${
                      isCurrent
                        ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                        : isPast
                        ? 'bg-slate-900 text-slate-500 border-white/5'
                        : 'bg-white/5 text-white border-white/10'
                    }`}>
                      <span className="text-[10px] font-mono uppercase tracking-widest">{item.monthName.substring(0, 3)}</span>
                      <span className="text-sm font-serif font-black">{item.durationDays}D</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-serif text-lg font-bold text-white">
                          {item.dateLabel}
                        </span>
                        
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-black font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                            Active Now
                          </span>
                        )}

                        {!isPast && !isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                            {item.spotsAvailable} spots open
                          </span>
                        )}

                        {isPast && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                            Session Completed
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 font-mono flex items-center gap-3">
                        <span>{item.location}</span>
                        <span>•</span>
                        <span>{formatPrice(item.priceEur)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Export to Calendar + Registration CTA */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                    
                    {/* Add to Google Calendar */}
                    <a
                      href={googleCalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 text-xs font-mono transition-colors"
                      title="Add to Google Calendar"
                    >
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">Google Cal</span>
                    </a>

                    {/* Download iCal (.ics) */}
                    <button
                      onClick={() => exportToIcs(item)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer"
                      title="Download Apple / Outlook iCal (.ics) file"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">iCal (.ics)</span>
                    </button>

                    {/* Registration CTA */}
                    <button
                      onClick={() => onOpenBooking(`${event.id}-${item.id}`)}
                      disabled={isPast}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                        isPast
                          ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-md shadow-cyan-500/20 cursor-pointer'
                      }`}
                    >
                      <span>{isPast ? 'Completed' : 'Book Date'}</span>
                    </button>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. CURRICULUM & WHAT'S INCLUDED                          */}
      {/* ======================================================== */}
      <section className="relative z-10 px-4 sm:px-8 py-10 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Day-by-Day Syllabus */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                STRUCTURED LEARNING
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Course Itinerary &amp; Modules
              </h3>
            </div>

            <div className="space-y-4">
              {event.courseCurriculum.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#030d1d] border border-white/10 space-y-2 hover:border-cyan-400/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                      {item.day}
                    </span>
                    <h4 className="font-serif font-bold text-white text-base">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed pl-1">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: What's Included & Requirements */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* What's Included */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#030d1d] border border-white/10 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ALL-INCLUSIVE PROMISE</span>
                </span>
                <h4 className="text-xl font-serif font-bold text-white">
                  What&apos;s Included In Your Package
                </h4>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
                {event.whatIsIncluded.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites & Equipment */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#040e1f] border border-white/10 space-y-4 text-xs font-sans">
              <h4 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Prerequisites &amp; Gear</span>
              </h4>
              
              <div className="space-y-2">
                <div className="text-slate-400 font-mono uppercase text-[10px]">Entry Requirements:</div>
                <p className="text-slate-300 font-light">{event.prerequisites}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="text-slate-400 font-mono uppercase text-[10px]">Equipment Provided:</div>
                <p className="text-slate-300 font-light">{event.equipment}</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CUSTOM DATE INQUIRY & CONTACT FORM (ON EVERY EVENT)    */}
      {/* ======================================================== */}
      <section className="relative z-10 px-4 sm:px-8 pt-10 pb-16 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#051329] to-[#020b18] border border-cyan-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono uppercase tracking-widest font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CUSTOM DATES ALL YEAR ROUND</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Don&apos;t See Dates That Match Your Schedule?
              </h3>

              <p className="text-xs sm:text-sm text-cyan-100/80 font-sans font-light leading-relaxed">
                &ldquo;This is only the calendar for our scheduled events. We run all other courses all year round on request, just let us know your dates!&rdquo;
              </p>
            </div>

            {inquirySubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-white">Inquiry Received!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans">
                  Thank you, <span className="text-white font-semibold">{inquiryName}</span>. Our Dahab sanctuary team will review your custom dates for <span className="text-cyan-300 font-semibold">{event.title}</span> and reply to <span className="text-white font-semibold">{inquiryEmail}</span> within 2 hours.
                </p>
                <button
                  onClick={() => setInquirySubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-xs font-mono uppercase text-slate-300 hover:text-white"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="max-w-2xl mx-auto space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@freediving.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      placeholder="e.g. +44 7123 456789"
                      value={inquiryWhatsapp}
                      onChange={(e) => setInquiryWhatsapp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 uppercase">Preferred Travel Dates</label>
                    <input
                      type="text"
                      placeholder="e.g. 15-22 November 2026"
                      value={inquiryDates}
                      onChange={(e) => setInquiryDates(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 uppercase">Your Goals / Questions</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your current experience, goals, accommodation needs, or specific questions..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Instant response within 2 hours • No spam guaranteed</span>
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Custom Dates</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
