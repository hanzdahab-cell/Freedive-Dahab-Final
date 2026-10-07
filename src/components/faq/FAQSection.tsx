import { useState } from 'react';
import { faqItems } from '../../data/faq';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function FAQSection() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(f => f.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'booking', label: 'Booking & Payments' },
    { id: 'courses', label: 'Courses & Certification' },
    { id: 'travel', label: 'Travel & Dahab' },
    { id: 'equipment', label: 'Gear & Equipment' },
  ];

  return (
    <section id="faq" className="relative py-32 px-6 bg-transparent border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-cyan-400">
            <HelpCircle className="w-4 h-4" />
            <span>{t.faqSection.badge}</span>
          </div>
          <h2 className="font-serif text-5xl sm:text-6xl font-bold text-white tracking-tight">
            {t.faqSection.title}
          </h2>
          <p className="text-slate-400 font-light text-base">
            {t.faqSection.subtitle}
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeCategory === cat.id
                    ? 'bg-ocean text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-panel rounded-xl overflow-hidden border border-white/10 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
