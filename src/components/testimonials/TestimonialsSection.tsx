import { testimonials } from '../../data/testimonials';
import { Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="relative py-32 px-6 bg-transparent border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="text-xs font-alata uppercase tracking-[0.3em] text-cyan-400">
            {t.testimonials.eyebrow}
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl font-normal text-white tracking-[0.05em] leading-tight">
            {t.testimonials.title}
          </h2>
          <p className="text-slate-300 font-alata font-normal text-base leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl p-8 border border-white/10 flex flex-col justify-between space-y-6 group hover:border-cyan-400/40 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex gap-1 text-cyan-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyan-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-cyan-400/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-serif font-bold text-white text-sm">{item.name}</div>
                  <div className="text-[11px] font-mono text-slate-400">{item.role}</div>
                  <div className="text-[10px] font-mono text-cyan-400">{item.course}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
