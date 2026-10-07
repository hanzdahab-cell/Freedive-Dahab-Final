import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LetterRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
  /** Seconds before the animation starts (after trigger fires when triggerOnView). */
  delay?: number;
  /** Seconds between each letter. */
  stagger?: number;
  /** Seconds each letter takes to land. */
  duration?: number;
  /** Wait until the element scrolls into view instead of animating on mount. */
  triggerOnView?: boolean;
  /** Animate the whole line as one unit — required for RTL scripts (Arabic letters must stay connected). */
  wholeLine?: boolean;
}

/**
 * Letter-by-letter slide-up reveal (adapted from the classic anime.js
 * "tricks" text animations) — implemented natively with GSAP.
 * Letters rise from below and fade in, word-wrapped so nothing breaks mid-word.
 */
export function LetterReveal({
  text,
  className = '',
  style,
  as = 'div',
  delay = 0,
  stagger = 0.04,
  duration = 0.85,
  triggerOnView = false,
  wholeLine = false,
}: LetterRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Whole-line mode (RTL): no letter splitting — Arabic shaping must stay intact
      if (wholeLine) {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: 'power4.out',
            ...(triggerOnView
              ? { scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
              : {}),
          }
        );
        return;
      }

      const letters = el.querySelectorAll('.lr-letter');
      if (!letters.length) return;

      const tween: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        duration,
        ease: 'power4.out',
        stagger,
        delay,
        overwrite: 'auto',
      };
      if (triggerOnView) {
        tween.scrollTrigger = { trigger: el, start: 'top 90%', once: true };
      }
      gsap.fromTo(letters, { yPercent: 110, opacity: 0 }, tween);

      // Safety net: never leave letters hidden if a trigger misfires
      const totalMs = (delay + letters.length * stagger + duration + 2.5) * 1000;
      const safety = setTimeout(() => {
        gsap.set(letters, { opacity: 1, yPercent: 0 });
      }, totalMs);
      return () => clearTimeout(safety);
    }, el);

    return () => ctx.revert();
  }, [text, delay, stagger, duration, triggerOnView, wholeLine]);

  const Tag = as as any;
  const words = wholeLine ? null : text.split(' ');

  return (
    <Tag ref={ref} className={className} style={style}>
      {wholeLine
        ? text
        : words!.map((word, wi) => (
            <span key={wi}>
              <span className="lr-word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {word.split('').map((ch, li) => (
                  <span
                    key={li}
                    className="lr-letter"
                    style={{ display: 'inline-block', willChange: 'transform, opacity' }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
              {/* Space lives BETWEEN the inline-block words — a trailing space
                  inside an inline-block collapses to zero width */}
              {wi < words!.length - 1 ? ' ' : null}
            </span>
          ))}
    </Tag>
  );
}
