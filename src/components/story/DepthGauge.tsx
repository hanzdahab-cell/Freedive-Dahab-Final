import React from 'react';
import { motion } from 'framer-motion';

interface DepthGaugeProps {
  currentDepth: number; // 0 to 100
  onNavigateToDepth: (depth: number, targetId: string) => void;
}

export function DepthGauge({ currentDepth, onNavigateToDepth }: DepthGaugeProps) {
  const roundedDepth = Math.round(currentDepth);

  const markers = [
    { label: 'Surface', depth: 0, id: 'hero' },
    { label: 'Story', depth: 10, id: 'story' },
    { label: 'Timeline', depth: 25, id: 'timeline' },
    { label: 'Pioneers', depth: 50, id: 'founders' },
    { label: 'The Deep', depth: 100, id: 'dive-deeper' },
  ];

  // Ticks at every 10m
  const ticks = Array.from({ length: 11 }, (_, i) => i * 10);

  return (
    <aside
      aria-label="Descent depth gauge"
      className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 flex items-center gap-3 select-none pointer-events-auto"
    >
      {/* Live Depth Pill (Desktop and Mobile) */}
      <motion.div
        className="flex flex-col items-end"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-baseline gap-0.5 px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md shadow-lg shadow-black/40 text-right">
          <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-cyan-300 tabular-nums">
            {roundedDepth}
          </span>
          <span className="font-mono text-[10px] text-slate-400">m</span>
        </div>

        {/* Ambient status label */}
        <span className="hidden lg:block text-[9px] font-mono uppercase tracking-widest text-slate-400 mt-1 mr-1">
          {roundedDepth < 15
            ? 'Surface Zone'
            : roundedDepth < 40
            ? 'Sunlit Reef'
            : roundedDepth < 70
            ? 'Twilight Blue'
            : 'Deep Abyss'}
        </span>
      </motion.div>

      {/* Vertical Gauge Track */}
      <div className="relative flex flex-col items-center h-56 md:h-72 w-5 justify-between py-1">
        {/* Background track line */}
        <div className="absolute top-0 bottom-0 w-[1.5px] bg-white/15 rounded-full" />

        {/* Active progress fill line */}
        <div
          className="absolute top-0 w-[2px] bg-gradient-to-b from-[#2EC4B6] via-[#4A90B8] to-cyan-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(46,196,182,0.8)]"
          style={{ height: `${Math.min(100, Math.max(0, currentDepth))}%` }}
        />

        {/* Moving bead cursor */}
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-cyan-300 border-2 border-[#061826] shadow-[0_0_10px_#2EC4B6] -translate-x-1/2 left-1/2 transition-all duration-150 ease-out pointer-events-none"
          style={{ top: `calc(${Math.min(100, Math.max(0, currentDepth))}% - 5px)` }}
        />

        {/* Ticks and interactive markers */}
        {ticks.map((tickVal) => {
          const marker = markers.find((m) => m.depth === tickVal);
          const isMarker = Boolean(marker);
          const isActive = Math.abs(currentDepth - tickVal) < 7;

          return (
            <button
              key={tickVal}
              type="button"
              onClick={() => {
                if (marker) {
                  onNavigateToDepth(marker.depth, marker.id);
                } else {
                  // Scroll to proportional position
                  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                  window.scrollTo({
                    top: (tickVal / 100) * scrollHeight,
                    behavior: 'smooth',
                  });
                }
              }}
              title={marker ? `${marker.label} (${tickVal}m)` : `${tickVal}m`}
              className="group relative flex items-center justify-center w-5 h-2 z-10 cursor-pointer focus:outline-none"
            >
              {/* Tick Mark Line */}
              <span
                className={`transition-all duration-300 ${
                  isMarker
                    ? 'w-3 h-[2px] bg-white/60 group-hover:w-4 group-hover:bg-cyan-300'
                    : 'w-1.5 h-[1px] bg-white/25 group-hover:w-2.5 group-hover:bg-white/60'
                } ${isActive ? '!bg-cyan-300 !w-4 shadow-[0_0_6px_#2EC4B6]' : ''}`}
              />

              {/* Tooltip on hover */}
              {isMarker && marker && (
                <span className="absolute right-7 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase text-slate-200 bg-slate-900/90 border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block backdrop-blur-md shadow-md">
                  {marker.label} · {marker.depth}m
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
