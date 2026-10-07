import {
  CSSProperties,
  ElementType,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';

/* ==========================================================================
   MOTION KIT — Contra-style scroll-triggered motion primitives
   - useInView: one-shot IntersectionObserver hook
   - TextReveal: masked word-by-word / line reveal (sliding mask)
   - CountUp: eased number count-up when it enters the viewport
   - FadeUp: safe fade/slide entrance (fill-mode both, never stays hidden)
   All primitives respect prefers-reduced-motion via CSS and show content
   immediately when reduced motion is requested (see index.css).
   ========================================================================== */

export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

interface TextRevealProps {
  children: string;
  as?: ElementType;
  className?: string;
  /** Seconds between each word */
  stagger?: number;
  /** Seconds before the first word starts */
  delay?: number;
  /** Reveal once when scrolled into view (default). false = reveal immediately */
  triggerOnView?: boolean;
  style?: CSSProperties;
}

/**
 * Masked word-by-word reveal: each word slides up from behind its own
 * overflow mask — the Contra report text motion.
 */
export function TextReveal({
  children,
  as: Tag = 'span',
  className = '',
  stagger = 0.045,
  delay = 0,
  triggerOnView = true,
  style,
}: TextRevealProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.2);
  const revealed = triggerOnView ? inView : true;
  const words = children.split(/\s+/).filter(Boolean);

  return (
    <Tag
      ref={ref}
      className={`${className} ${revealed ? 'is-revealed' : ''}`}
      style={style}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="reveal-mask" aria-hidden="true">
          <span
            className="reveal-line"
            style={{ transitionDelay: `${delay + i * stagger}s` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

interface CountUpProps {
  end: number;
  className?: string;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Start counting only when scrolled into view (default true) */
  triggerOnView?: boolean;
}

/** Eased count-up number, Contra-infographic style. */
export function CountUp({
  end,
  className = '',
  durationMs = 1900,
  prefix = '',
  suffix = '',
  decimals = 0,
  triggerOnView = true,
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const started = triggerOnView ? inView : true;
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(end);
      return;
    }

    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / durationMs, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(end * eased);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [started, end, durationMs]);

  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  /** Seconds of transition delay (for staggering grids) */
  delay?: number;
  as?: ElementType;
  style?: CSSProperties;
  onClick?: () => void;
}

/** Fade/slide entrance triggered on scroll. Content can never stay hidden. */
export function FadeUp({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  style,
  onClick,
}: FadeUpProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <Tag
      ref={ref}
      onClick={onClick}
      className={`fade-up ${inView ? 'is-revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </Tag>
  );
}
