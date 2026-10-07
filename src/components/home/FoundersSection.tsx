import { Camera, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { PageType } from '../../types';

import lottaImage from '../../assets/images/founders/Lotta - freedive dahab.jpg';
import lindaImage from '../../assets/images/founders/linda-paganelli - freedive dahab.jpg';
import waleedImage from '../../assets/images/founders/waleed.jpg';

interface FoundersSectionProps {
  onNavigate?: (page: PageType) => void;
}

interface Founder {
  id: string;
  number: string;
  name: string;
  role: string;
  location: string;
  image: string;
  bio: string;
}

const founders: Founder[] = [
  {
    id: 'lotta',
    number: '01',
    name: 'LOTTA ERICSON',
    role: 'CO-FOUNDER · OWNER · MANAGER',
    location: 'DAHAB · SINCE 1998',
    image: lottaImage,
    bio: 'One of the pioneers of freediving in Dahab and co-founder of Freedive Dahab. Lotta has been part of the evolution of the Dahab freediving community since its early days.',
  },
  {
    id: 'linda',
    number: '02',
    name: 'LINDA PAGANELLI',
    role: 'CO-FOUNDER · PIONEER · FREEDIVER',
    location: 'ITALY → DAHAB → TENERIFE',
    image: lindaImage,
    bio: 'A pioneer of the early Dahab freediving scene and co-founder of Freedive Dahab. Linda has dedicated years to freediving, training and developing the sport internationally.',
  },
  {
    id: 'waleed',
    number: '03',
    name: 'WALEED GHATAS',
    role: 'CO-FOUNDER · SSI FREEDIVING INSTRUCTOR TRAINER',
    location: 'DAHAB · SINCE 2005',
    image: waleedImage,
    bio: 'Based in Dahab and deeply connected to the ocean, Waleed became an SSI Freediving Instructor Trainer and is one of the three current partners of Freedive Dahab.',
  },
];

export function FoundersSection({ onNavigate }: FoundersSectionProps = {}) {
  const [activeFounder, setActiveFounder] = useState<string | null>(null);

  return (
    <section
      id="founders"
      className="relative overflow-hidden bg-[#0E3453] px-6 py-24 sm:py-32"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-500/[0.04] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            The people behind Freedive Dahab
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            The Founders
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Freedive Dahab grew from the passion, experience and vision of
            three people who helped shape the freediving community in Dahab.
          </p>
        </div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {founders.map((founder, index) => {
            const isActive = activeFounder === founder.id;

            return (
              <article
                key={founder.id}
                onMouseEnter={() => setActiveFounder(founder.id)}
                onMouseLeave={() => setActiveFounder(null)}
                onClick={() =>
                  setActiveFounder(isActive ? null : founder.id)
                }
                className="group relative h-[560px] cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-[#0E3453] transition-all duration-700 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
                style={{
                  animationDelay: `${index * 120}ms`,
                }}
              >
                {/* REAL ORIGINAL IMAGE ONLY */}
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                  draggable={false}
                  loading="lazy"
                />

                {/* Image protection / readability overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-transparent to-transparent opacity-90" />

                {/* Top information */}
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-300">
                    {founder.number}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md">
                      <Camera className="h-3.5 w-3.5 text-white" />
                    </span>

                    <span className="rounded-full border border-white/20 bg-black/30 px-3 py-2 text-[9px] font-semibold tracking-[0.08em] text-white backdrop-blur-md">
                      {founder.location}
                    </span>
                  </div>
                </div>

                {/* Hover image movement */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="absolute inset-0 bg-cyan-400/[0.04]" />
                </div>

                {/* Founder information */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-6 sm:p-7 transition-all duration-700 ${
                    isActive
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-2 opacity-95'
                  }`}
                >
                  <div className="mb-3 h-px w-12 bg-cyan-400 transition-all duration-700 group-hover:w-20" />

                  <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {founder.name}
                  </h3>

                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                    {founder.role}
                  </p>

                  {/* Bio appears on hover/touch */}
                  <div
                    className={`overflow-hidden transition-all duration-700 ${
                      isActive
                        ? 'mt-4 max-h-40 opacity-100'
                        : 'mt-0 max-h-0 opacity-0'
                    }`}
                  >
                    <p className="max-w-xl text-sm leading-6 text-white/75">
                      {founder.bio}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onNavigate) onNavigate('story');
                      }}
                      className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      Discover their story
                      <ArrowUpRight className="h-3.5 w-3.5 text-cyan-300" />
                    </button>
                  </div>
                </div>

                {/* Animated corner detail */}
                <div className="absolute bottom-5 right-5 h-8 w-8 overflow-hidden rounded-full border border-white/10">
                  <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/10" />
                  <div className="absolute inset-[7px] rounded-full bg-cyan-400/60" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-6 text-slate-500 sm:text-sm">
            From the early days of freediving in Dahab to an international
            freediving community, their story is part of the story of
            Freedive Dahab.
          </p>

          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Freediving since 2003
          </div>
        </div>
      </div>

      <style>{`
        @keyframes founderPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.25);
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
}

export const FoundersPage = FoundersSection;
