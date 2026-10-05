import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyConfig } from '../../config/storyConfig';
import { ImageWithFallback } from './ImageWithFallback';
import { X, ChevronLeft, ChevronRight, Play, Sparkles, Volume2, ArrowRight } from 'lucide-react';

interface TiltState {
  rotateX: number;
  rotateY: number;
}

export function FoundersSection() {
  const founders = storyConfig.media.founders;
  const [selectedFounderId, setSelectedFounderId] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [tilt, setTilt] = useState<Record<string, TiltState>>({});
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const selectedFounder = founders.find((f) => f.id === selectedFounderId);

  // Keyboard navigation for modal (Esc to close, Left/Right to cycle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedFounderId) return;

      if (e.key === 'Escape') {
        setSelectedFounderId(null);
        setIsPlayingVideo(false);
      } else if (e.key === 'ArrowRight') {
        handleNextFounder();
      } else if (e.key === 'ArrowLeft') {
        handlePrevFounder();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFounderId]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedFounderId) {
      document.body.style.overflow = 'hidden';
      setCurrentSlideIndex(0);
      setIsPlayingVideo(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedFounderId]);

  const handleNextFounder = () => {
    if (!selectedFounderId) return;
    const currentIndex = founders.findIndex((f) => f.id === selectedFounderId);
    const nextIndex = (currentIndex + 1) % founders.length;
    setSelectedFounderId(founders[nextIndex].id);
    setCurrentSlideIndex(0);
    setIsPlayingVideo(false);
  };

  const handlePrevFounder = () => {
    if (!selectedFounderId) return;
    const currentIndex = founders.findIndex((f) => f.id === selectedFounderId);
    const prevIndex = (currentIndex - 1 + founders.length) % founders.length;
    setSelectedFounderId(founders[prevIndex].id);
    setCurrentSlideIndex(0);
    setIsPlayingVideo(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    // Disable 3D tilt on touch or reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt((prev) => ({
      ...prev,
      [id]: {
        rotateX: -y * 12,
        rotateY: x * 12,
      },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setTilt((prev) => ({
      ...prev,
      [id]: { rotateX: 0, rotateY: 0 },
    }));
  };

  return (
    <section
      id="founders"
      className="relative py-32 md:py-44 px-6 md:px-12 bg-gradient-to-b from-[#071B2B] via-[#0B2A3C] to-[#061826] overflow-hidden"
    >
      {/* Wave Transition Top */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none -translate-y-[98%]">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 md:h-16 text-[#071B2B]"
        >
          <path
            d="M0,40 C400,10 700,50 1100,20 C1280,10 1380,35 1440,40 L1440,60 L0,60 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#2EC4B6] mb-4"
          >
            <span className="w-6 h-[1px] bg-[#2EC4B6]" />
            <span>Founding Visionaries</span>
            <span aria-hidden="true">·</span>
            <span>Depth ~50 m</span>
            <span className="w-6 h-[1px] bg-[#2EC4B6]" />
          </motion.div>

          <h2 className="font-serif-display font-medium text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-6">
            Meet Our Founders
          </h2>

          <p className="font-inter text-slate-300 text-base sm:text-lg leading-relaxed font-light text-balance">
            Freedive Dahab was born out of passion, experience, and a vision shared by three incredible pioneers of freediving.
          </p>
        </div>

        {/* Three Tall Glass Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {founders.map((founder, index) => {
            const cardTilt = tilt[founder.id] || { rotateX: 0, rotateY: 0 };

            return (
              <motion.div
                key={founder.id}
                layoutId={`founder-card-${founder.id}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                onMouseMove={(e) => handleMouseMove(e, founder.id)}
                onMouseLeave={() => handleMouseLeave(founder.id)}
                onClick={() => setSelectedFounderId(founder.id)}
                style={{
                  perspective: 1000,
                }}
                className="group relative cursor-pointer focus-visible:outline-none"
              >
                <motion.div
                  animate={{
                    rotateX: cardTilt.rotateX,
                    rotateY: cardTilt.rotateY,
                  }}
                  transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                  className="relative h-[540px] rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.08] to-black/40 border border-white/10 group-hover:border-[#2EC4B6]/50 shadow-2xl transition-all duration-500 flex flex-col justify-end p-8"
                >
                  {/* Portrait Background with LayoutId */}
                  <motion.div
                    layoutId={`founder-img-${founder.id}`}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    <ImageWithFallback
                      src={founder.portrait}
                      alt={founder.alt}
                      hideIfMissing={false}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />

                    {/* Gradient scrims for high contrast text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061826] via-[#061826]/40 to-transparent" />
                    <div className="absolute inset-0 bg-radial-at-b from-[#2EC4B6]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </motion.div>

                  {/* Card Content Overlay */}
                  <div className="relative z-10 space-y-3">
                    <span className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-[#2EC4B6]">
                      {founder.depthFocus}
                    </span>

                    <h3 className="font-serif-display text-3xl font-medium text-white group-hover:text-cyan-200 transition-colors">
                      {founder.name}
                    </h3>

                    <p className="font-inter text-sm text-slate-300 font-light">
                      {founder.role}
                    </p>

                    {/* Tap to explore hint */}
                    <div className="pt-3 flex items-center gap-2 text-xs font-mono text-cyan-300/80 group-hover:text-cyan-300 transition-colors">
                      <span>Tap to explore story</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Shared Element Story Panel Modal */}
      <AnimatePresence>
        {selectedFounder && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedFounder.name} story panel`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none overflow-y-auto"
          >
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setSelectedFounderId(null)}
              className="fixed inset-0 bg-[#061826]/90 backdrop-blur-2xl"
            />

            {/* Modal Body Container with Shared Element Card */}
            <motion.div
              ref={modalRef}
              layoutId={`founder-card-${selectedFounder.id}`}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#091F30] border border-white/15 shadow-2xl text-left z-10 flex flex-col lg:flex-row my-auto"
            >
              {/* Top Controls: Close button + Stepper */}
              <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevFounder}
                  aria-label="Previous founder"
                  className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextFounder}
                  aria-label="Next founder"
                  className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFounderId(null)}
                  aria-label="Close story panel"
                  className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors cursor-pointer ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Left Column: Portrait & Media Showcase */}
              <div className="lg:w-1/2 relative min-h-[380px] lg:min-h-[600px] overflow-hidden bg-black/50">
                <motion.div
                  layoutId={`founder-img-${selectedFounder.id}`}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* If extra photos exist, show slide; otherwise portrait */}
                  {selectedFounder.extras && selectedFounder.extras.length > 0 && currentSlideIndex > 0 ? (
                    <ImageWithFallback
                      src={selectedFounder.extras[currentSlideIndex - 1]}
                      alt={`${selectedFounder.name} gallery ${currentSlideIndex}`}
                      hideIfMissing={false}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageWithFallback
                      src={selectedFounder.portrait}
                      alt={selectedFounder.alt}
                      hideIfMissing={false}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091F30] via-transparent to-transparent opacity-80" />
                </motion.div>

                {/* Extra Photos Carousel Dots if available */}
                {selectedFounder.extras && selectedFounder.extras.length > 0 && (
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCurrentSlideIndex(0)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          currentSlideIndex === 0
                            ? 'bg-[#2EC4B6] w-6'
                            : 'bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label="Portrait photo"
                      />
                      {selectedFounder.extras.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentSlideIndex(idx + 1)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            currentSlideIndex === idx + 1
                              ? 'bg-[#2EC4B6] w-6'
                              : 'bg-white/40 hover:bg-white/70'
                          }`}
                          aria-label={`Photo ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <span className="text-[11px] font-mono text-slate-300 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-md">
                      {currentSlideIndex + 1} / {selectedFounder.extras.length + 1}
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Bio Prose, Quote / Fun Fact, Video */}
              <div className="lg:w-1/2 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#2EC4B6]">
                    {selectedFounder.role}
                  </span>

                  <h3 className="font-serif-display text-4xl sm:text-5xl font-medium text-white">
                    {selectedFounder.name}
                  </h3>

                  {/* Verbatim Bio */}
                  <p className="font-inter text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                    {selectedFounder.bio}
                  </p>

                  {/* Optional Quote / Fun Fact Block (Stored in config, hidden if empty per rule) */}
                  {selectedFounder.quote && selectedFounder.quote.trim().length > 0 && (
                    <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#2EC4B6] block mb-2">
                        Philosophy & Quote
                      </span>
                      <blockquote className="font-serif-display text-lg text-white italic">
                        &ldquo;{selectedFounder.quote}&rdquo;
                      </blockquote>
                    </div>
                  )}

                  {selectedFounder.funFact && selectedFounder.funFact.trim().length > 0 && (
                    <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs font-inter text-cyan-200">
                      <span className="font-mono font-semibold uppercase mr-2">Fun Fact:</span>
                      {selectedFounder.funFact}
                    </div>
                  )}
                </div>

                {/* Optional Video Element (Controls, preload metadata, poster, plays on tap, no autoplay sound) */}
                {selectedFounder.video && (
                  <div className="pt-2 border-t border-white/10">
                    <span className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                      Story & In-Water Feature
                    </span>
                    <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-white/15">
                      <video
                        controls
                        preload="metadata"
                        poster={selectedFounder.videoPoster || selectedFounder.portrait}
                        className="w-full h-full object-cover"
                      >
                        <source src={selectedFounder.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
