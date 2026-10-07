import { useTranslation } from 'react-i18next';
import { TextReveal, CountUp, FadeUp } from '../ui/MotionKit';

/* ==========================================================================
   DESCENT STATS — Contra-report style statement numbers
   Elegant serif-caps eyebrow stacked over a huge bold headline, then a grid
   of giant count-up figures with hairline dividers, all in the two brand
   blues. Copy comes from i18n (descentStats.*).
   ========================================================================== */

interface StatDef {
  value: number;
  suffix?: string;
  labelKey: string;
  descKey: string;
}

const STATS: StatDef[] = [
  { value: 24, suffix: '+', labelKey: 's1Label', descKey: 's1Desc' },
  { value: 12, labelKey: 's2Label', descKey: 's2Desc' },
  { value: 570, suffix: '+', labelKey: 's3Label', descKey: 's3Desc' },
  { value: 4800, suffix: '+', labelKey: 's4Label', descKey: 's4Desc' },
  { value: 100, suffix: '%', labelKey: 's5Label', descKey: 's5Desc' },
  { value: 92, suffix: 'm', labelKey: 's6Label', descKey: 's6Desc' },
];

export function DescentStats() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-[#081F35] border-y border-ocean-pale/10 film-grain">
      {/* Slow deep-water glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,98,140,0.28) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
        {/* Contra-style chapter header: serif italic caps over huge bold line */}
        <div className="mb-16 sm:mb-20">
          <p className="font-serif italic text-ocean-pale tracking-[0.3em] text-xs sm:text-sm uppercase mb-4">
            <TextReveal>{t('descentStats.eyebrow')}</TextReveal>
          </p>
          <h2 className="font-bebas text-white leading-[0.95] tracking-[0.03em] text-6xl sm:text-7xl md:text-8xl uppercase">
            <TextReveal stagger={0.06}>{t('descentStats.title')}</TextReveal>{' '}
            <span className="text-ocean-light">
              <TextReveal stagger={0.06} delay={0.25}>
                {t('descentStats.titleHighlight')}
              </TextReveal>
            </span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-ocean-pale/10">
          {STATS.map((stat, idx) => (
            <FadeUp
              key={stat.labelKey}
              delay={(idx % 3) * 0.12}
              className="group relative border-b border-r border-ocean-pale/10 p-8 sm:p-10 hover:bg-[#0B2C4A] transition-colors duration-500"
            >
              {/* Giant count-up figure */}
              <div className="font-bebas text-6xl sm:text-7xl xl:text-8xl leading-none text-white tracking-[0.02em] mb-5">
                <CountUp end={stat.value} suffix={stat.suffix ?? ''} />
              </div>

              {/* Serif italic label — the Contra signature */}
              <div className="font-serif italic text-ocean-pale text-lg sm:text-xl mb-2 leading-snug">
                {t(`descentStats.${stat.labelKey}`)}
              </div>

              {/* Supporting line */}
              <p className="text-[13px] sm:text-sm text-slate-300/80 font-alata font-light leading-relaxed max-w-[26ch]">
                {t(`descentStats.${stat.descKey}`)}
              </p>

              {/* Corner glow on hover */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at top right, rgba(169,210,236,0.18), transparent 70%)',
                  }}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DescentStats;
