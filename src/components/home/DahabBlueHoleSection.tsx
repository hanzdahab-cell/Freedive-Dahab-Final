import { ArrowRight, MapPin, Waves, Thermometer, Eye } from 'lucide-react';
import { PageType } from '../../types';
import { LetterReveal } from '../ui/LetterReveal';

interface DahabBlueHoleSectionProps {
  onNavigate: (page: PageType) => void;
}

const GALLERY = [
  {
    src: '/hero-lighthouse-bay.jpg',
    caption: 'Lighthouse Bay — our home reef',
    alt: 'Lighthouse Bay in Dahab with calm turquoise water and mountain horizon',
  },
  {
    src: '/deep-coral-reef.jpg',
    caption: 'The Red Sea coral walls',
    alt: 'Deep coral reef wall in the Red Sea off Dahab',
  },
  {
    src: '/coral-depth-seabed.jpg',
    caption: 'Dahab underwater sanctuaries',
    alt: 'Coral seabed and underwater seascape in Dahab',
  },
];

export function DahabBlueHoleSection({ onNavigate }: DahabBlueHoleSectionProps) {
  return (
    <section id="dahab-blue-hole" className="relative py-24 sm:py-32 px-6 bg-transparent border-t border-white/5 overflow-hidden select-none">

      {/* Ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[320px] bg-cyan-500/[0.07] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[250px] bg-sky-600/[0.05] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-14">

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-alata tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Dahab · Red Sea · South Sinai</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-[0.05em] leading-[1.05]">
            <LetterReveal as="span" text="DAHAB &" triggerOnView stagger={0.03} className="inline-block" />
            {' '}
            <LetterReveal
              as="span"
              text="THE BLUE HOLE"
              triggerOnView
              delay={0.3}
              stagger={0.03}
              className="inline-block text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]"
            />
          </h2>
          <p className="text-slate-300 font-alata font-light text-base sm:text-lg leading-relaxed">
            A small Bedouin town on the Gulf of Aqaba that became the freediving capital of the
            world. Right on our doorstep: the legendary <span className="text-cyan-300 font-normal">Blue Hole</span> —
            a 92-meter vertical underwater sinkhole framed by coral — and the calm, sheltered
            shallows of <span className="text-cyan-300 font-normal">Lighthouse Bay</span>, where every
            freediver's story begins.
          </p>

          {/* Quick facts */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-2">
              <Waves className="w-3.5 h-3.5 text-cyan-400" /> 92m Blue Hole drop
            </span>
            <span className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-cyan-400" /> 20–30m visibility
            </span>
            <span className="flex items-center gap-2">
              <Thermometer className="w-3.5 h-3.5 text-cyan-400" /> 21–28°C all year
            </span>
          </div>
        </div>

        {/* Photo row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY.map((photo, idx) => (
            <figure
              key={idx}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 shadow-xl transition-all duration-500 hover:-translate-y-1.5 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-transparent to-transparent" />
              </div>
              <figcaption className="absolute bottom-4 left-4 right-4 text-xs font-alata text-slate-200 tracking-wide uppercase">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button
            onClick={() => onNavigate('experience')}
            className="px-8 py-3.5 rounded-full bg-ocean hover:bg-ocean-light text-white text-xs font-bold uppercase tracking-[0.12em] transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>Explore Expeditions & Safaris</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
