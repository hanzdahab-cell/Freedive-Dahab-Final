import { activitiesData } from '../../data/activities';
import { Compass, Clock, Check, ArrowRight } from 'lucide-react';

interface ActivitiesSectionProps {
  onOpenBooking: (actId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

export function ActivitiesSection({ onOpenBooking, currency }: ActivitiesSectionProps) {
  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  return (
    <section id="safaris" className="relative py-32 px-6 bg-[#020617] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-cyan-400">
            <Compass className="w-4 h-4" />
            <span>RED SEA EXPEDITIONS & SAFARIS</span>
          </div>
          <h2 className="font-serif text-5xl sm:text-6xl font-bold text-white tracking-tight">
            Beyond the <span className="text-cyan-300 italic font-normal">Buoy</span>
          </h2>
          <p className="text-slate-400 text-base font-light">
            Complement your training with world-class boat safaris to Ras Mohamed National Park, 
            coastal drift dives along Dahab Canyon, and overnight Bedouin desert astronomy camps.
          </p>
        </div>

        {/* Safari Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activitiesData.map((act) => (
            <div
              key={act.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/40 flex flex-col justify-between group transition-all duration-500"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={act.image.url}
                    alt={act.image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {act.duration}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <span className="text-2xl font-serif font-bold text-white">
                      {formatPrice(act.priceEur)}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block text-right">ALL INCLUSIVE</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {act.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      Highlights:
                    </div>
                    {act.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => onOpenBooking(act.id)}
                  className="w-full py-3 rounded-xl bg-sky-950/60 hover:bg-cyan-500 hover:text-black border border-cyan-400/40 text-cyan-300 text-xs uppercase font-mono font-bold tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Expedition</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
