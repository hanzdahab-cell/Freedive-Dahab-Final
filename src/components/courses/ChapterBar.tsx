import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/* ==========================================================================
   CHAPTER BAR — Contra-report style fixed bottom progress
   Watches the four course-page chapters via IntersectionObserver and
   highlights (inverts) the one you're reading. Click a chapter to glide there.
   ========================================================================== */

export const COURSE_CHAPTER_IDS = [
  'chapter-system',
  'chapter-core',
  'chapter-try',
  'chapter-pro',
] as const;

export function ChapterBar() {
  const { t } = useTranslation();
  const [active, setActive] = useState<string>(COURSE_CHAPTER_IDS[0]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sections = COURSE_CHAPTER_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      // A slim horizontal band around the viewport middle decides the active chapter
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));

    const showTimer = setTimeout(() => setVisible(true), 400);
    return () => {
      observer.disconnect();
      clearTimeout(showTimer);
    };
  }, []);

  const labels = [
    t('courseChapters.system'),
    t('courseChapters.core'),
    t('courseChapters.try'),
    t('courseChapters.pro'),
  ];

  return (
    <nav
      aria-label="Courses chapters"
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-700 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-[#081F35]/85 backdrop-blur-xl border-t border-ocean-pale/15">
        <div className="grid grid-cols-4">
          {COURSE_CHAPTER_IDS.map((id, idx) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => {
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`relative flex items-center justify-center gap-2 sm:gap-3 py-3.5 sm:py-4 px-1 sm:px-3 transition-colors duration-400 cursor-pointer group ${
                  isActive ? 'bg-foam text-[#0E3453]' : 'text-ocean-pale/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <span
                  className={`font-serif italic text-[11px] sm:text-sm ${
                    isActive ? 'text-ocean' : 'text-ocean-light'
                  }`}
                >
                  0{idx + 1}
                </span>
                <span className="hidden sm:block text-[11px] lg:text-xs uppercase tracking-[0.18em] font-alata truncate max-w-[16ch]">
                  {labels[idx]}
                </span>
                {/* Bottom accent */}
                <span
                  className={`absolute left-0 right-0 bottom-0 h-[3px] transition-colors duration-400 ${
                    isActive ? 'bg-ocean' : 'bg-transparent group-hover:bg-ocean-pale/30'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default ChapterBar;
