import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { storyConfig } from '../../config/storyConfig';
import { WaterCaustics } from './WaterCaustics';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToNext: () => void;
}

export function HeroSection({ onScrollToNext }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: background moves slower than foreground text
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const [videoError, setVideoError] = useState(false);
  const [imgError, setImgError] = useState(false);

  const words = storyConfig.site.hero.title.split(' ');

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-6 pt-32 pb-16 overflow-hidden select-none"
    >
      {/* Background Media Container with Ken Burns Zoom & Parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none overflow-hidden"
      >
        {/* If video available and no error */}
        {storyConfig.media.hero.video && !videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={storyConfig.media.hero.poster || storyConfig.media.hero.image}
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover scale-105 motion-safe:animate-[kenBurns_25s_ease-in-out_infinite_alternate]"
          >
            <source src={storyConfig.media.hero.video} type="video/mp4" />
          </video>
        ) : !imgError ? (
          <img
            src={storyConfig.media.hero.image}
            alt={storyConfig.media.hero.alt}
            onError={() => setImgError(true)}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 motion-safe:animate-[kenBurns_25s_ease-in-out_infinite_alternate]"
          />
        ) : (
          /* Graceful organic sea gradient fallback if neither file is loaded */
          <div className="w-full h-full bg-gradient-to-b from-[#114B5F] via-[#0B2A3C] to-[#061826]" />
        )}

        {/* Soft sunlit turquoise and deep ocean vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2EC4B6]/20 via-[#0B2A3C]/75 to-[#061826] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061826] via-transparent to-black/30" />
      </motion.div>

      {/* Animated Water-light Caustics Overlay */}
      <WaterCaustics depthRatio={0} />

      {/* Surface Sun Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[350px] bg-gradient-to-b from-[#2EC4B6]/25 via-cyan-400/10 to-transparent blur-3xl pointer-events-none"
      />

      {/* Top Spacer */}
      <div className="w-full" />

      {/* Main Focal Text Anchor with Word-by-Word Mask Animation */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Subtle unboxed metadata kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 text-xs md:text-sm font-mono tracking-[0.25em] uppercase text-cyan-300 mb-6"
        >
          <span>Lighthouse Bay</span>
          <span aria-hidden="true">·</span>
          <span>Red Sea Sanctuary</span>
          <span aria-hidden="true">·</span>
          <span>Depth 0 m</span>
        </motion.div>

        {/* Headline with Word Mask Animation */}
        <h1 className="font-serif-display font-medium text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-[1.05] text-balance mb-8">
          {words.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.35 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block bg-gradient-to-b from-white via-slate-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-sm"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-inter text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light text-balance"
        >
          {storyConfig.site.hero.subtitle}
        </motion.p>
      </motion.div>

      {/* "Scroll to dive ↓" Cue with Gentle Bounce */}
      <motion.button
        type="button"
        onClick={onScrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-20 group flex flex-col items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full px-4 py-2 mt-8 text-slate-400 hover:text-cyan-300 transition-colors"
      >
        <span className="font-mono text-xs uppercase tracking-widest">
          {storyConfig.site.hero.scrollCue}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:border-cyan-400/50 group-hover:bg-cyan-950/30 transition-all"
        >
          <ChevronDown className="w-4 h-4 text-cyan-300" />
        </motion.div>
      </motion.button>
    </section>
  );
}
