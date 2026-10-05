import { packagesData } from '../../data/packages';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PackagesSectionProps {
  onOpenBooking: (pkgId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

export function PackagesSection({ onOpenBooking, currency }: PackagesSectionProps) {
  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  return (
    <section id="packages" className="relative py-32 px-6 bg-[#020617] border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-alata tracking-[0.3em] uppercase text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <span>ELITE ALL-INCLUSIVE IMMERSIONS</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-[0.05em] leading-tight">
            RESIDENCIES & <span className="text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]">EXPEDITION PACKAGES</span>
          </h2>
          <p className="text-slate-300 font-alata font-normal text-base sm:text-lg leading-relaxed">
            Curated combinations of SSI certifications, daily coached Blue Hole depth sessions, 
            oceanfront Sea Lodge accommodation, and VIP airport logistics.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 group"
            >
              <div>
                {/* Header Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={pkg.image.url}
                    alt={pkg.image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                  
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-cyan-500 text-black text-[10px] font-mono font-bold tracking-widest uppercase shadow-lg">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4 text-right">
                    <span className="text-3xl font-serif font-bold text-white block">
                      {formatPrice(pkg.priceEur)}
                    </span>
                    {pkg.saveAmountEur > 0 && (
                      <span className="text-[10px] font-mono text-emerald-400 tracking-wider">
                        SAVE {formatPrice(pkg.saveAmountEur)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Package Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>DURATION: {pkg.duration}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {pkg.subtitle}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      Package Inclusions:
                    </div>
                    {pkg.includedList.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => onOpenBooking(pkg.id)}
                  className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>Book This Package</span>
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
