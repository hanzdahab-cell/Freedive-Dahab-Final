import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEW_SOURCES, reviews, ReviewPlatform } from '../../data/reviews';

/* ==========================================================================
   REVIEWS CAROUSEL — TripAdvisor & Google cards on white (footer section)
   Auto-advances, pauses on hover, arrows + dots, honors reduced motion.
   ========================================================================== */

export function PlatformMark({ platform }: { platform: ReviewPlatform }) {
  if (platform === 'tripadvisor') {
    // Simplified TripAdvisor owl: green disc + binocular eyes
    return (
      <span
        className="inline-flex w-6 h-6 rounded-full items-center justify-center shrink-0"
        style={{ backgroundColor: '#34E0A1' }}
        aria-label="TripAdvisor"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
          <circle cx="7.5" cy="12" r="3.2" stroke="#000" strokeWidth="1.6" />
          <circle cx="16.5" cy="12" r="3.2" stroke="#000" strokeWidth="1.6" />
          <circle cx="7.5" cy="12" r="1" fill="#000" />
          <circle cx="16.5" cy="12" r="1" fill="#000" />
          <path d="M3 9c2.4-2.2 5.6-3.4 9-3.4S18.6 6.8 21 9" stroke="#000" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  // Google "G"
  return (
    <span className="inline-flex w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center shrink-0" aria-label="Google">
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M21.6 12.23c0-.68-.06-1.36-.19-2.02H12v3.83h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.74 2.97-4.3 2.97-7.33Z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.05.95-3.39.95-2.6 0-4.8-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22Z"
        />
        <path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.52H3.07a10 10 0 0 0 0 8.96l3.33-2.58Z" />
        <path
          fill="#EA4335"
          d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.86-2.86A10 10 0 0 0 3.07 7.52l3.33 2.58c.8-2.36 3-4.12 5.6-4.12Z"
        />
      </svg>
    </span>
  );
}

function Rating({ value, platform }: { value: number; platform: ReviewPlatform }) {
  if (platform === 'tripadvisor') {
    // TripAdvisor bubbles
    return (
      <span className="inline-flex items-center gap-1" aria-label={`${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full border-[1.5px] border-[#00AA6C] ${i <= value ? 'bg-[#00AA6C]' : 'bg-transparent'}`}
          />
        ))}
      </span>
    );
  }
  // Google stars
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-3.5 h-3.5" aria-hidden="true">
          <path
            fill={i <= value ? '#FBBC05' : '#E2E8F0'}
            d="M10 1.6l2.5 5.2 5.7.7-4.2 4 1.1 5.7L10 14.5l-5.1 2.7 1.1-5.7-4.2-4 5.7-.7L10 1.6z"
          />
        </svg>
      ))}
    </span>
  );
}

export function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const pausedRef = useRef(false);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  // Measure how many scroll pages the track has and follow it while it scrolls
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setPages(Math.max(1, Math.round(track.scrollWidth / track.clientWidth + 0.49)));
    };
    const onScroll = () => {
      setPage(Math.round(track.scrollLeft / track.clientWidth));
    };
    measure();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Auto-advance unless the user is hovering, focused, or prefers reduced motion
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      const track = trackRef.current;
      if (!track || pausedRef.current) return;
      const next = (Math.round(track.scrollLeft / track.clientWidth) + 1) % Math.max(pages, 1);
      scrollToIndex(next * 1);
    }, 5200);
    return () => clearInterval(timer);
  }, [pages]);

  return (
    <section aria-label="Customer reviews" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#22628C] mb-2">
              Diver reviews
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E3453]">
              Rated excellent on TripAdvisor &amp; Google
            </h3>
          </div>
          <div className="flex items-center gap-4">
            {REVIEW_SOURCES.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-alata text-[#0E3453] hover:text-[#22628C] transition-colors"
              >
                <PlatformMark platform={s.platform} />
                <span className="inline-flex items-center gap-1">
                  Read all
                  <ArrowRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth custom-scrollbar pb-2"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          onFocus={() => (pausedRef.current = true)}
          onBlur={() => (pausedRef.current = false)}
          tabIndex={0}
          aria-roledescription="carousel"
        >
          {reviews.map((r, i) => (
            <article
              key={i}
              className="snap-start shrink-0 w-[86%] sm:w-[46%] lg:w-[31.5%] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(14,52,83,0.06)] flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <PlatformMark platform={r.platform} />
                <Rating value={r.rating} platform={r.platform} />
              </div>
              <p className="font-alata text-sm text-slate-600 leading-relaxed flex-1">“{r.text}”</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                {r.avatarUrl ? (
                  <img src={r.avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <span className="w-9 h-9 rounded-full bg-[#E3F1FA] text-[#22628C] text-xs font-bold flex items-center justify-center">
                    {r.name.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <div className="leading-tight">
                  <div className="text-xs font-semibold text-[#0E3453] font-alata">{r.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{r.date}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {pages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={() => scrollToIndex(Math.max(0, page - 1))}
              className="p-2 rounded-full border border-slate-200 text-[#0E3453] hover:border-[#22628C] transition-colors cursor-pointer"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to review page ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${i === page ? 'bg-[#22628C]' : 'bg-slate-300'}`}
              />
            ))}
            <button
              onClick={() => scrollToIndex(Math.min(pages - 1, page + 1))}
              className="p-2 rounded-full border border-slate-200 text-[#0E3453] hover:border-[#22628C] transition-colors cursor-pointer"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
