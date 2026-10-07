import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { storyConfig } from '../../config/storyConfig';
import { ImageWithFallback } from './ImageWithFallback';
import { ChevronRight, ChevronLeft, Calendar } from 'lucide-react';

interface TimelineSectionProps {
  onDepthChange?: (depth: number) => void;
}

export function TimelineSection({ onDepthChange }: TimelineSectionProps) {
  const milestones = storyConfig.media.timeline;
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const handleSelectMilestone = (index: number) => {
    setActiveMilestoneIndex(index);
    if (onDepthChange) {
      onDepthChange(milestones[index].depthMeters);
    }
  };

  const handleNext = () => {
    if (activeMilestoneIndex < milestones.length - 1) {
      handleSelectMilestone(activeMilestoneIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeMilestoneIndex > 0) {
      handleSelectMilestone(activeMilestoneIndex - 1);
    }
  };

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-[#0E3453] via-[#0E3453] to-[#0E3453] overflow-hidden"
    >
      {/* Wave Transition Top */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none -translate-y-[98%]">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 md:h-16 text-[#0E3453]"
        >
          <path
            d="M0,20 C360,50 720,0 1080,30 C1260,45 1380,25 1440,20 L1440,60 L0,60 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#2EC4B6] mb-3"
            >
              <span className="w-8 h-[1px] bg-[#2EC4B6]" />
              <span>Our Story</span>
              <span aria-hidden="true">·</span>
              <span>Depth ~25 m</span>
            </motion.div>
            <h2 className="font-serif-display font-medium text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              Milestones in the Abyss
            </h2>
          </div>

          {/* Stepper Controls (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeMilestoneIndex === 0}
              aria-label="Previous milestone"
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-slate-400 tabular-nums">
              0{activeMilestoneIndex + 1} / 0{milestones.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeMilestoneIndex === milestones.length - 1}
              aria-label="Next milestone"
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timeline Connecting Line Track (Desktop Horizontal) */}
        <div className="hidden md:block relative mb-12">
          {/* Background Rail */}
          <div className="h-[2px] w-full bg-white/10 rounded-full" />

          {/* Glowing Animated Progress Line */}
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#2EC4B6] via-cyan-300 to-[#2EC4B6] rounded-full shadow-[0_0_12px_#2EC4B6]"
            style={{
              width: `${(activeMilestoneIndex / (milestones.length - 1)) * 100}%`,
              transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Milestone Nodes */}
          <div className="absolute -top-3 left-0 right-0 flex justify-between">
            {milestones.map((m, idx) => {
              const isSelected = activeMilestoneIndex === idx;
              const isPassed = activeMilestoneIndex >= idx;

              return (
                <button
                  key={m.year}
                  type="button"
                  onClick={() => handleSelectMilestone(idx)}
                  className="group relative flex flex-col items-center cursor-pointer focus-visible:outline-none"
                >
                  {/* Glowing Node Dot */}
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-cyan-300 bg-[#2EC4B6] scale-125 shadow-[0_0_15px_#2EC4B6]'
                        : isPassed
                        ? 'border-[#2EC4B6] bg-[#0E3453]'
                        : 'border-white/20 bg-[#0E3453] group-hover:border-white/50'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-slate-900' : isPassed ? 'bg-[#2EC4B6]' : 'bg-transparent'
                      }`}
                    />
                  </span>

                  {/* Year Tag under node */}
                  <span
                    className={`mt-2 font-mono text-xs font-semibold tracking-wider transition-colors ${
                      isSelected
                        ? 'text-cyan-300 font-bold'
                        : isPassed
                        ? 'text-slate-300'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {m.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Cards Grid / Active Showcase */}
        {/* On Desktop: 6-card interactive grid with active highlighting */}
        <div
          ref={scrollTrackRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4"
        >
          {milestones.map((milestone, i) => {
            const isActive = activeMilestoneIndex === i;

            return (
              <motion.article
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => handleSelectMilestone(i)}
                className={`relative rounded-2xl p-6 transition-all duration-400 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-white/[0.09] to-white/[0.03] border-2 border-cyan-400/80 shadow-2xl shadow-cyan-950/60 scale-[1.02]'
                    : 'bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                }`}
              >
                {/* Optional Photo (Hides cleanly if missing per rule) */}
                {milestone.image && (
                  <ImageWithFallback
                    src={milestone.image}
                    alt={milestone.alt || milestone.event}
                    hideIfMissing={true}
                    containerClassName="w-full h-40 rounded-xl mb-5"
                  />
                )}

                <div>
                  {/* Top unboxed year & depth */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                    <span
                      className={`text-lg font-bold font-serif-display ${
                        isActive ? 'text-[#2EC4B6]' : 'text-white'
                      }`}
                    >
                      {milestone.year}
                    </span>
                    <span className="text-cyan-400/80 tracking-wider">
                      ~{milestone.depthMeters}m
                    </span>
                  </div>

                  {/* Fact statement (ONLY authorized facts) */}
                  <p className="font-inter text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                    {milestone.event}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Milestone 0{i + 1}</span>
                  {isActive && (
                    <span className="text-cyan-300 font-medium tracking-wider uppercase">Active</span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
