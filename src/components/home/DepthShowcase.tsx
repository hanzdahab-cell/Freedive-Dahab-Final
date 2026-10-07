import { useState } from 'react';
import { Compass, Waves, CheckCircle2, ArrowRight, Shield } from 'lucide-react';

interface DepthLayer {
  depth: string;
  meters: number;
  title: string;
  tagline: string;
  pressure: string;
  physio: string;
  courseLink: string;
  courseTitle: string;
}

const DEPTH_LAYERS: DepthLayer[] = [
  {
    depth: "0m – 10m",
    meters: 10,
    title: "Surface Sanctuary & Diaphragm Breathe-Up",
    tagline: "Lighthouse Bay home reef steps from our private dive terrace",
    pressure: "1.0 – 2.0 Bar",
    physio: "Mammalian dive reflex initiated. Heart rate drops by up to 30% on initial facial immersion.",
    courseLink: "ssi-level-1",
    courseTitle: "SSI Freediver Level 1"
  },
  {
    depth: "10m – 20m",
    meters: 20,
    title: "The Drop-Off & SSI Level 1 Threshold",
    tagline: "Mastering the Frenzel equalisation tongue piston and hydrodynamic streamlining",
    pressure: "2.0 – 3.0 Bar",
    physio: "Lung volume compresses to 1/3 of total capacity. Positive buoyancy neutralizes around 10-12m.",
    courseLink: "ssi-level-1",
    courseTitle: "SSI Freediver Level 1"
  },
  {
    depth: "20m – 30m",
    meters: 30,
    title: "The Freefall Zone (Negative Buoyancy)",
    tagline: "Weightless flight into the cobalt abyss with zero propulsion needed",
    pressure: "3.0 – 4.0 Bar",
    physio: "The diver sinks effortlessly without kicking. Pure relaxation, thoracic stretching, and FRC dives.",
    courseLink: "ssi-level-2",
    courseTitle: "SSI Advanced Freediver Level 2"
  },
  {
    depth: "30m – 40m",
    meters: 40,
    title: "The Mouthfill & Elite Depth Realm",
    tagline: "Overcoming residual volume compression with soft palate locking",
    pressure: "4.0 – 5.0 Bar",
    physio: "Lungs compressed below residual volume. Air is held in the oral cavity for deep equalisation.",
    courseLink: "ssi-level-3",
    courseTitle: "SSI Performance Freediver Level 3"
  },
  {
    depth: "56m",
    meters: 56,
    title: "The Legendary Blue Hole Arch",
    tagline: "A 26-meter underwater tunnel opening into the 800m Red Sea drop-off",
    pressure: "6.6 Bar",
    physio: "Master-level depth realm reserved for trained deep specialists on counterweight systems.",
    courseLink: "spec-mouthfill",
    courseTitle: "Mouthfill Masterclass"
  },
  {
    depth: "92m",
    meters: 92,
    title: "The Abyss Floor: Total Stillness",
    tagline: "The base of the world's most famous submarine sinkhole",
    pressure: "10.2 Bar",
    physio: "Zero light, zero current. The absolute benchmark of global competitive freediving training.",
    courseLink: "ssi-itc",
    courseTitle: "SSI ITC & Master Residency"
  }
];

interface DepthShowcaseProps {
  onOpenBooking: (courseId?: string) => void;
}

export function DepthShowcase({ onOpenBooking }: DepthShowcaseProps) {
  const [selectedMeters, setSelectedMeters] = useState<number>(30);
  const activeLayer = DEPTH_LAYERS.find(l => l.meters === selectedMeters) || DEPTH_LAYERS[2];

  return (
    <section id="depth" className="relative py-32 px-6 bg-[#0E3453] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-alata tracking-[0.24em] uppercase text-cyan-400">
            <Compass className="w-4 h-4" />
            <span>TECHNICAL SPECIFICATION • DAHAB BLUE HOLE</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-[0.05em] leading-tight">
            THE 92-METER <br />
            <span className="text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.35)]">SUBMARINE SINKHOLE</span>
          </h2>
          <p className="text-slate-300 font-alata font-normal text-base sm:text-lg leading-relaxed">
            Unlike boat-dependent diving, Dahab provides shore-accessible depth up to 92 meters with zero 
            current and 40m+ visibility. Explore the physiological stages of the descent.
          </p>
        </div>

        {/* Interactive Depth Architecture (Driessen Precision Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Vertical Depth Selector Bar */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-alata uppercase tracking-widest text-slate-400 mb-4 px-2">
              Select Vertical Depth Zone
            </div>

            {DEPTH_LAYERS.map((layer) => {
              const isSelected = selectedMeters === layer.meters;
              return (
                <button
                  key={layer.meters}
                  onClick={() => setSelectedMeters(layer.meters)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-sky-950/40 border-cyan-400/60 shadow-[0_0_25px_rgba(34,211,238,0.2)] text-white'
                      : 'bg-slate-900/40 border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-12 text-center font-bebas text-2xl ${
                      isSelected ? 'text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'text-slate-500'
                    }`}>
                      {layer.meters}M
                    </span>
                    <div>
                      <div className="font-alata font-normal text-sm text-slate-200">{layer.title}</div>
                      <div className="text-[11px] font-alata text-slate-400">{layer.pressure}</div>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-transparent'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Architectural Detail Panel */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-8 sm:p-10 border border-cyan-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 font-bebas text-9xl text-cyan-400 pointer-events-none select-none">
              {activeLayer.meters}M
            </div>

            <div className="space-y-6 relative z-10">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-alata font-normal border border-cyan-400/40">
                  {activeLayer.depth}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-alata">
                  PRESSURE: {activeLayer.pressure}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 text-xs font-alata border border-emerald-500/30">
                  COUNTERWEIGHT READY
                </span>
              </div>

              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                {activeLayer.title}
              </h3>

              <p className="text-cyan-200/90 font-alata font-normal text-base sm:text-lg">
                &ldquo;{activeLayer.tagline}&rdquo;
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="text-xs uppercase font-alata tracking-widest text-slate-400">
                  PHYSIOLOGICAL PHENOMENON
                </div>
                <p className="text-slate-300 font-alata leading-relaxed text-sm sm:text-base">
                  {activeLayer.physio}
                </p>
              </div>

              {/* Safety & Protocol Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-alata">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Direct tether line with quick-release carabiner</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Trained safety diver meets candidate on ascent</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Dual counterweight retrieve in under 20 seconds</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>HD Sonar depth telemetry & 4K video debrief</span>
                </div>
              </div>

              {/* Target Course CTA */}
              <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <div className="text-[11px] font-alata uppercase text-slate-400">Recommended Certification</div>
                  <div className="text-white font-alata font-medium text-sm">{activeLayer.courseTitle}</div>
                </div>
                <button
                  onClick={() => onOpenBooking(activeLayer.courseLink)}
                  className="btn-luxury text-white text-xs px-6 py-3 font-alata uppercase tracking-wider"
                >
                  <span>RESERVE THIS DEPTH</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
