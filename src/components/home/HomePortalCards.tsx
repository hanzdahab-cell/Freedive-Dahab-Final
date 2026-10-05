import { ArrowRight, Compass, GraduationCap, Waves, Home as HomeIcon, Package as PackageIcon, Calendar as CalendarIcon, BookOpen } from 'lucide-react';
import { PageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface HomePortalCardsProps {
  onNavigate: (page: PageType) => void;
}

export function HomePortalCards({ onNavigate }: HomePortalCardsProps) {
  const { t, isRtl } = useLanguage();

  const cards: {
    page: PageType;
    title: string;
    tag: string;
    description: string;
    image: string;
    icon: any;
    accent: string;
  }[] = [
    {
      page: 'story',
      title: 'Our Story',
      tag: 'Pioneers & Heritage',
      description: 'Meet Lotta Ericson, Linda Paganelli & Waleed Ghatas — the 2003 pioneers of Freedive Dahab.',
      image: '/Lotta - freedive dahab.jpg?v=2',
      icon: BookOpen,
      accent: 'from-cyan-500/30 to-blue-600/30 border-cyan-400/40',
    },
    {
      page: 'courses',
      title: t.portal.courses.title,
      tag: t.portal.courses.tag,
      description: t.portal.courses.desc,
      image: '/assets/ssi_beginner_course_1789742298867-BfNu0gGo.jpg',
      icon: GraduationCap,
      accent: 'from-blue-600/30 to-cyan-500/30 border-cyan-400/40',
    },
    {
      page: 'training',
      title: t.portal.training.title,
      tag: t.portal.training.tag,
      description: t.portal.training.desc,
      image: '/assets/freediver_wall_panel_1789742356652-RTmR89Xx.jpg',
      icon: Waves,
      accent: 'from-cyan-600/30 to-teal-500/30 border-teal-400/40',
    },
    {
      page: 'accommodation',
      title: t.portal.accommodation.title,
      tag: t.portal.accommodation.tag,
      description: t.portal.accommodation.desc,
      image: '/assets/dahab_freedive_store_1789742281859-CGwc5zJ0.jpg',
      icon: HomeIcon,
      accent: 'from-amber-600/20 to-sky-500/20 border-amber-400/30',
    },
    {
      page: 'packages',
      title: t.portal.packages.title,
      tag: t.portal.packages.tag,
      description: t.portal.packages.desc,
      image: '/assets/sea_turtle_panel_1789742379171-CEDaJqo4.jpg',
      icon: PackageIcon,
      accent: 'from-indigo-600/30 to-purple-500/30 border-indigo-400/40',
    },
    {
      page: 'calendar',
      title: t.portal.calendar.title,
      tag: t.portal.calendar.tag,
      description: t.portal.calendar.desc,
      image: '/assets/reef_fish_panel_1789742341825-DFtwoDDy.jpg',
      icon: CalendarIcon,
      accent: 'from-cyan-700/40 to-blue-600/40 border-cyan-300/50',
    },
  ];

  return (
    <section id="courses" className="relative py-24 sm:py-32 px-6 bg-transparent border-t border-white/5 overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-cyan-500/[0.04] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-alata tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.portal.eyebrow}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas text-white tracking-[0.05em] leading-tight">
            {t.portal.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-alata font-normal leading-relaxed">
            {t.portal.subtitle}
          </p>
        </div>

        {/* 5-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const isWide = idx === 4; // Calendar card
            return (
              <div
                key={card.page}
                onClick={() => onNavigate(card.page)}
                className={`group relative rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 bg-[#030d1a] cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Background Image with Ambient Gradient Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-30 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#020813]/85 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 p-6 sm:p-8 flex items-start justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-alata text-cyan-300">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{card.tag}</span>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-cyan-500/20 border border-white/10 group-hover:border-cyan-400/40 flex items-center justify-center text-slate-400 group-hover:text-cyan-300 transition-all">
                    <ArrowRight className={`w-4 h-4 group-hover:translate-x-0.5 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-8 pt-0 space-y-3">
                  <h3 className="text-3xl sm:text-4xl font-bebas text-white group-hover:text-cyan-300 transition-colors tracking-wide">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-alata font-normal leading-relaxed">
                    {card.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-alata text-cyan-400 font-semibold uppercase tracking-wider group-hover:underline">
                    <span>{t.portal.exploreButton} {card.title}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
