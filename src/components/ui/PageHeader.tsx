import { ShieldCheck } from 'lucide-react';
import { PageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenBooking?: () => void;
  ctaText?: string;
}

export function PageHeader({
  title,
  subtitle,
  badge = 'SSI Diamond Dive Center & ITC #720079',
  currentPage,
  onNavigate,
  onOpenBooking,
  ctaText = 'Book / Inquire',
}: PageHeaderProps) {
  const { isRtl } = useLanguage();
  const { t } = useTranslation();

  const localizedConfig = t(`pageHeaders.${currentPage}`, { returnObjects: true }) as any;
  const displayTitle = (typeof localizedConfig === 'object' && localizedConfig?.title) || title;
  const displaySubtitle = (typeof localizedConfig === 'object' && localizedConfig?.subtitle) || subtitle;
  const displayBadge = (typeof localizedConfig === 'object' && localizedConfig?.badge) || badge;
  const displayCta = (typeof localizedConfig === 'object' && localizedConfig?.ctaText) || ctaText;

  return (
    <div className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 px-6 bg-gradient-to-b from-[#0E3453] via-[#0E3453] to-[#0E3453] border-b border-white/10 overflow-hidden select-none">
      
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-cyan-500/[0.08] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[250px] bg-sky-600/[0.06] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">

        {/* Badge / Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-alata tracking-widest uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>{displayBadge}</span>
        </div>

        {/* Header Title & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bebas tracking-[0.06em] leading-tight">
              {(() => {
                const words = displayTitle.split(' ');
                if (words.length <= 1) return <span className="text-white">{displayTitle}</span>;
                const splitIndex = Math.ceil(words.length / 2);
                const firstPart = words.slice(0, splitIndex).join(' ');
                const secondPart = words.slice(splitIndex).join(' ');
                return (
                  <>
                    <span className="text-white">{firstPart} </span>
                    <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]">{secondPart}</span>
                  </>
                );
              })()}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-alata font-normal leading-relaxed max-w-2xl">
              {displaySubtitle}
            </p>
          </div>

          {onOpenBooking && (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-[#0E3453] font-semibold text-xs sm:text-sm font-alata tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] cursor-pointer"
              >
                {displayCta}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
