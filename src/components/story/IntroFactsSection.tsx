import { motion } from 'framer-motion';
import { storyConfig } from '../../config/storyConfig';
import { Wind, Layers, Sun, Droplets, Wifi, Shield } from 'lucide-react';

const facilityIconMap: Record<string, React.ElementType> = {
  'Air-conditioned classroom': Wind,
  'Equipment room': Layers,
  'Sunny terrace': Sun,
  'Beachside showers': Droplets,
  'Free Wi-Fi': Wifi,
};

export function IntroFactsSection() {
  const { paragraphs, highlights, facilities } = storyConfig.site.intro;

  return (
    <section
      id="story"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-[#061826] via-[#0B2A3C] to-[#081F30] overflow-hidden"
    >
      {/* Top Wave Divider */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none -translate-y-[99%]">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 md:h-20 text-[#061826] preserve-3d"
        >
          <path
            d="M0,32 C320,70 480,10 720,40 C960,70 1120,20 1440,32 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Subtle depth lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        {/* Depth Tag & Section Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#2EC4B6] mb-12"
        >
          <span className="w-8 h-[1px] bg-[#2EC4B6]" />
          <span>The Sanctuary</span>
          <span aria-hidden="true">·</span>
          <span>Depth ~10 m</span>
        </motion.div>

        {/* 2-Column Split: Verbatim Narrative on Left, Animated Highlight Tiles on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative paragraphs revealed on scroll */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-serif-display font-medium text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-snug">
              A Living Sanctuary <br />
              <span className="text-[#2EC4B6]">Built for Comfort & Community</span>
            </h2>

            <div className="space-y-6 text-slate-300 font-inter text-base sm:text-lg leading-relaxed font-light">
              {paragraphs.map((text, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-0 md:pl-2"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Facilities Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            >
              <span className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
                Facility Amenities & Grounds
              </span>
              <div className="flex flex-wrap gap-2.5">
                {facilities.map((fac) => {
                  const Icon = facilityIconMap[fac.name] || Shield;
                  return (
                    <div
                      key={fac.name}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#2EC4B6]/40 transition-colors backdrop-blur-sm group"
                    >
                      <Icon className="w-4 h-4 text-[#2EC4B6] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-inter text-slate-200">{fac.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Animated Highlight Tiles (Only facts from copy) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 pt-2">
            {highlights.map((tile, i) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl hover:border-[#2EC4B6]/40 transition-all group overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -bottom-10 w-28 h-28 rounded-full bg-[#2EC4B6]/10 blur-2xl group-hover:bg-[#2EC4B6]/20 transition-all pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl font-serif-display font-semibold text-white tracking-wide mb-1 group-hover:text-[#2EC4B6] transition-colors">
                    {tile.value}
                  </div>
                  <div className="text-sm font-inter font-medium text-cyan-300/90 mb-2">
                    {tile.label}
                  </div>
                  {tile.subtext && (
                    <div className="text-xs font-inter text-slate-400 leading-normal">
                      {tile.subtext}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
