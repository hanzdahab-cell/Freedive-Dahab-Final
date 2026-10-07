import { useCallback, useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { hydroAudio } from '../../utils/audio';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

/* ==========================================================================
   CINEMATIC INTRO — Convex-style navy loading screen
   Logo inside a slowly-drawn thin ring, one tagline line in the user's
   editorial font, "click anywhere to dive in". Clicking starts the ambient
   hydro-audio engine and dives into the site. Shown once per browser session.
   ========================================================================== */

const INTRO_SEEN_KEY = 'fd-intro-seen';

export function CinematicIntro() {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();

  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
    } catch {
      seen = false;
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!seen && !reduce) {
      setRender(true);
      // Let the first paint settle before fading the overlay in
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    if (seen && !reduce) {
      // Brief fade-away so returning to home still feels cinematic but short
      setRender(true);
      setVisible(true);
      setEntered(true);
      const timeout = setTimeout(() => setRender(false), 60);
      return () => clearTimeout(timeout);
    }
  }, []);

  // Lock page scroll while the intro is on screen
  useEffect(() => {
    if (!render || entered) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [render, entered]);

  const enter = useCallback(() => {
    if (entered) return;
    setEntered(true);
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      /* private mode — intro just replays next time */
    }
    if (!hydroAudio.running) {
      hydroAudio.start();
    }
    window.setTimeout(() => setRender(false), 1250);
  }, [entered]);

  if (!render) return null;

  return (
    <div
      onClick={enter}
      role="button"
      tabIndex={0}
      aria-label={t('intro.enter')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') enter();
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer select-none bg-[#0E3453] transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${entered ? 'intro-overlay-exit pointer-events-none' : ''}`}
    >
      {/* Deep-water radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(34,98,140,0.32) 0%, rgba(14,52,83,0.15) 45%, rgba(8,31,53,0.75) 100%)',
        }}
      />
      {/* Faint caustic light from above */}
      <div
        className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[70vh] pointer-events-none blur-3xl light-ray"
        style={{
          '--ray-rot': '0deg',
          '--ray-dur': '8s',
          '--ray-op': '0.5',
          background:
            'radial-gradient(ellipse 50% 100% at 50% 0%, rgba(169,210,236,0.22) 0%, transparent 70%)',
        } as React.CSSProperties}
      />
      <div className="film-grain absolute inset-0 pointer-events-none" />

      {/* Logo + drawing ring */}
      <div
        className={`relative flex items-center justify-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
          entered ? 'scale-[1.6] opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <svg
          viewBox="0 0 300 300"
          className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] -rotate-90"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="150"
            cy="150"
            r="140"
            stroke="rgba(169,210,236,0.55)"
            strokeWidth="1"
            className="intro-ring"
          />
        </svg>
        <svg
          viewBox="0 0 300 300"
          className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] -rotate-90"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="150"
            cy="150"
            r="112"
            stroke="rgba(169,210,236,0.14)"
            strokeWidth="1"
            strokeDasharray="2 7"
          />
        </svg>
        <img
          src="/logo-freedive-dahab.png"
          alt="Freedive Dahab"
          className="w-28 sm:w-36 drop-shadow-[0_6px_30px_rgba(8,31,53,0.8)]"
          loading="eager"
        />
      </div>

      {/* Tagline */}
      <p
        className="intro-fade-up mt-10 px-6 max-w-md text-center font-tidal text-base sm:text-lg leading-relaxed tracking-[0.04em] text-ocean-pale/95 uppercase"
        style={{
          fontFamily: isRtl
            ? "'Beiruti', sans-serif"
            : "'Tidal Astral Grotesk', sans-serif",
          animationDelay: '0.9s',
        }}
      >
        {t('intro.tagline')}
      </p>

      {/* Click-to-enter cue */}
      <div
        className="intro-fade-up absolute bottom-10 sm:bottom-12 flex items-center gap-3 text-ocean-pale/90"
        style={{ animationDelay: '1.6s' }}
      >
        <Volume2 className="w-4 h-4" strokeWidth={1.5} />
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.32em] font-alata cta-pulse">
          {t('intro.enter')}
        </span>
      </div>
    </div>
  );
}

export default CinematicIntro;
