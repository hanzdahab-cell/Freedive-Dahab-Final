import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Waves, Compass, Activity, Eye, Zap, RefreshCw } from 'lucide-react';

interface DivePortalProps {
  onOpenBooking?: (courseId?: string) => void;
}

export function DivePortal({ onOpenBooking }: DivePortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [depthPercent, setDepthPercent] = useState<number>(0);
  const [isHoveringPortal, setIsHoveringPortal] = useState<boolean>(false);
  const [autoDiving, setAutoDiving] = useState<boolean>(false);

  // Depth in meters calculated from percentage (0m to 92m)
  const currentDepth = Math.round(depthPercent * 0.92);
  const ambientPressure = (1 + currentDepth / 10).toFixed(1);
  const waterTemp = Math.max(21, (27 - currentDepth * 0.06)).toFixed(1);

  // Determine stage of dive based on depth
  const getDiveZone = (m: number) => {
    if (m < 5) return { name: "Surface Breathe-Up", state: "Diaphragmatic Relaxation", color: "text-cyan-300" };
    if (m < 15) return { name: "Reef Drop-Off", state: "Mammalian Dive Reflex Active", color: "text-sky-300" };
    if (m < 25) return { name: "SSI Level 1 Zone", state: "Neutral Buoyancy Threshold", color: "text-blue-300" };
    if (m < 40) return { name: "Freefall Sanctuary", state: "Negative Buoyancy • Zero Finning", color: "text-indigo-300" };
    if (m < 60) return { name: "The Blue Hole Arch (56m)", state: "Mouthfill Equalisation Chamber", color: "text-violet-300" };
    return { name: "The Midnight Abyss Floor (92m)", state: "Total Sensory Stillness", color: "text-purple-300" };
  };

  const zone = getDiveZone(currentDepth);

  // Scroll-driven calculation for desktop & mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || autoDiving) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far container has progressed through viewport
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const progress = -rect.top / totalScrollable;
      const clamped = Math.max(0, Math.min(1, progress));
      setDepthPercent(Math.round(clamped * 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoDiving]);

  // Automated cinematic descent demo
  const triggerAutoDive = () => {
    setAutoDiving(true);
    let start: number | null = null;
    const duration = 5000; // 5 seconds
    const initial = depthPercent;
    const target = depthPercent > 80 ? 0 : 100;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      // Smooth easeInOutCubic
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setDepthPercent(Math.round(initial + (target - initial) * eased));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setAutoDiving(false);
      }
    };

    requestAnimationFrame(step);
  };

  // Radius for the circular mask:
  // Starts as a focused circle (e.g. 18% on mobile, 25% on desktop) and smoothly expands to swallow the viewport (120%)
  const baseRadius = 22;
  const maxRadius = 135;
  const currentRadius = baseRadius + (depthPercent / 100) * (maxRadius - baseRadius);

  return (
    <section 
      id="portal" 
      ref={containerRef}
      className="relative min-h-[180vh] md:min-h-[220vh] w-full bg-[#0E3453] text-white"
    >
      {/* Sticky Fullscreen Dive Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        
        {/* ======================================================== */}
        {/* LAYER 1 (UNDERNEATH): Deep Midnight Ocean View (The Abyss) */}
        {/* ======================================================== */}
        <div className="absolute inset-0 z-0 bg-[#0E3453]">
          <img
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2400&q=90"
            alt="Freedivers in the deep blue abyss looking up toward sunlight"
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out"
            style={{
              transform: `scale(${1 + depthPercent * 0.003}) translateY(${depthPercent * 0.1}px)`,
            }}
            referrerPolicy="no-referrer"
          />
          
          {/* Deep Ocean Midnight Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E3453]/70 via-transparent to-[#0E3453]/90" />

          {/* Bioluminescent Particles & Caustic Sparkles */}
          <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* LAYER 2 (TOP MASK): Bright Surface View Masked by Circular Iris */}
        {/* ======================================================== */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-300 ease-out"
          style={{
            clipPath: `circle(${currentRadius}% at 50% 50%)`,
            opacity: Math.max(0, 1 - (depthPercent - 65) / 35), // Gradually fades out as depth approaches 100%
          }}
        >
          {/* Bright Sunlit Surface Water & Diver */}
          <img
            src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=2400&q=90"
            alt="Sunlit surface freedivers and crystal turquoise waters"
            className="w-full h-full object-cover"
            style={{
              transform: `scale(${1.15 - depthPercent * 0.0015})`,
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-cyan-950/20 mix-blend-multiply" />
          
          {/* Surface Water Caustic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453]/80 via-transparent to-transparent" />
        </div>

        {/* ======================================================== */}
        {/* CIRCULAR PORTAL RING (The Iris Frame) */}
        {/* ======================================================== */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center transition-opacity duration-500"
          style={{
            opacity: depthPercent > 90 ? 0 : 1,
          }}
        >
          <div 
            className="rounded-full border border-cyan-400/40 shadow-[0_0_50px_rgba(34,211,238,0.25)] flex items-center justify-center transition-all duration-300"
            style={{
              width: `${currentRadius * 2}vmax`,
              height: `${currentRadius * 2}vmax`,
              maxWidth: '180vw',
              maxHeight: '180vw',
            }}
          >
            <div className="w-full h-full rounded-full border border-dashed border-white/20 animate-[spin_60s_linear_infinite]" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* HUD TELEMETRY & CONTROLS (Top Header) */}
        {/* ======================================================== */}
        <div className="relative z-30 pt-20 px-6 max-w-7xl mx-auto w-full flex justify-between items-start">
          
          {/* Left: Depth Zone Telemetry */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-alata tracking-widest text-cyan-300 uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>THE DIVE PORTAL • SOTD FLOW</span>
            </div>
            <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.05em] leading-tight">
              {depthPercent < 50 ? (
                <>
                  DESCENDING THE <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">ABYSS</span>
                </>
              ) : (
                <>
                  IN THE DEEP <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">MIDNIGHT</span>
                </>
              )}
            </h2>
            <div className={`text-sm font-alata tracking-wide ${zone.color} transition-colors duration-500`}>
              Phase: {zone.name} — <span className="text-slate-300 font-alata">{zone.state}</span>
            </div>
          </div>

          {/* Right: Quick Descent Simulator Button */}
          <button
            onClick={triggerAutoDive}
            disabled={autoDiving}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md hover:border-cyan-400 text-xs font-alata text-cyan-200 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoDiving ? 'animate-spin text-cyan-400' : ''}`} />
            <span className="hidden sm:inline">{depthPercent > 80 ? 'Return to Surface' : 'Cinematic Descent'}</span>
            <span className="sm:hidden">{depthPercent > 80 ? 'Surface' : 'Descend'}</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* CENTER HUD: Massive Depth Meter & Sensation Typography */}
        {/* ======================================================== */}
        <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 my-auto">
          
          {/* Big Digital Depth Readout */}
          <div className="relative inline-flex items-baseline justify-center">
            <span className="font-bebas text-8xl sm:text-9xl md:text-[11rem] text-white tracking-wider leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              {currentDepth}
            </span>
            <span className="font-bebas text-4xl sm:text-5xl md:text-6xl text-cyan-400 ml-2 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              M
            </span>
          </div>

          <div className="mt-2 text-xs sm:text-sm font-alata tracking-[0.2em] uppercase text-slate-300 flex items-center gap-3">
            <span>PRESS: {ambientPressure} BAR</span>
            <span className="text-cyan-400">•</span>
            <span>TEMP: {waterTemp}°C</span>
            <span className="text-cyan-400">•</span>
            <span>DAHAB BLUE HOLE</span>
          </div>

          {/* Dynamic Editorial Guidance depending on depth */}
          <p className="max-w-xl mx-auto mt-6 text-sm sm:text-base md:text-lg text-slate-300 font-alata font-normal leading-relaxed drop-shadow-md">
            {depthPercent < 30 ? (
              "The surface noise dissolves into absolute silence. Equalize smoothly using Frenzel tongue piston pressure as the pressure builds gently."
            ) : depthPercent < 70 ? (
              "Passing 25 meters: negative buoyancy takes over. Stop kicking. You are now entering pure weightless freefall toward the Blue Hole arch."
            ) : (
              "The abyss embraces you in midnight stillness. Heart rate slowed, mammalian dive reflex fully engaged, mind resting in meditative presence."
            )}
          </p>

          {/* If reached depth, offer instant course CTA */}
          {depthPercent > 80 && onOpenBooking && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={() => onOpenBooking('ssi-level-3')}
                className="btn-luxury text-white px-8 py-3 text-xs font-alata tracking-[0.2em] uppercase"
              >
                MASTER THIS DEPTH (LEVEL 3 & PRO)
              </button>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* BOTTOM TELEMETRY BAR & INTERACTIVE SLIDER (Mobile & Desktop) */}
        {/* ======================================================== */}
        <div className="relative z-30 pb-8 px-6 max-w-5xl mx-auto w-full">
          <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
            
            <div className="flex justify-between items-center text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white">INTERACTIVE DESCENT SCRUBBER</span>
              </div>
              <span className="text-cyan-300 font-mono font-bold">{depthPercent}% IMMERSION</span>
            </div>

            {/* Depth Slider / Scrubber */}
            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={depthPercent}
                onChange={(e) => setDepthPercent(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              />
            </div>

            {/* Key Depth Marks */}
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 px-1 pt-1">
              <button onClick={() => setDepthPercent(0)} className="hover:text-cyan-300 transition-colors">
                0m Surface
              </button>
              <button onClick={() => setDepthPercent(22)} className="hover:text-cyan-300 transition-colors">
                20m Level 1
              </button>
              <button onClick={() => setDepthPercent(33)} className="hover:text-cyan-300 transition-colors">
                30m Freefall
              </button>
              <button onClick={() => setDepthPercent(43)} className="hover:text-cyan-300 transition-colors">
                40m Level 3
              </button>
              <button onClick={() => setDepthPercent(61)} className="hover:text-cyan-300 transition-colors">
                56m Arch
              </button>
              <button onClick={() => setDepthPercent(100)} className="hover:text-cyan-300 transition-colors">
                92m Floor
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
