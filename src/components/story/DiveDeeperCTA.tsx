import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { storyConfig } from '../../config/storyConfig';
import { ArrowUpRight } from 'lucide-react';

interface MagneticButtonProps {
  label: string;
  href: string;
  primary?: boolean;
}

function MagneticButton({ label, href, primary }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples((prev) => [...prev, { x, y, id: Date.now() }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => Date.now() - r.id < 600));
    }, 600);
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      className={`relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-inter font-medium tracking-wide uppercase overflow-hidden transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 ${
        primary
          ? 'bg-[#2EC4B6] text-slate-950 font-semibold shadow-[0_0_25px_rgba(46,196,182,0.5)] hover:shadow-[0_0_40px_rgba(46,196,182,0.8)] hover:bg-cyan-300'
          : 'bg-white/[0.04] text-white border border-white/20 hover:border-cyan-300/60 hover:bg-white/[0.08]'
      }`}
    >
      {/* Ripple Animation */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/40 pointer-events-none animate-[ripple_0.6s_ease-out_forwards]"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <span className="relative z-10">{label}</span>
      <ArrowUpRight
        className={`w-4 h-4 relative z-10 transition-transform ${
          primary ? 'text-slate-950' : 'text-cyan-300'
        }`}
      />
    </motion.a>
  );
}

export function DiveDeeperCTA() {
  const { heading, subheading, buttons } = storyConfig.site.cta;

  return (
    <section
      id="dive-deeper"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-[#0E3453] via-[#114B5F] to-[#2EC4B6]/30 text-center"
    >
      {/* Surface Light Returning Radiant Glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-[450px] bg-gradient-to-t from-[#2EC4B6]/35 via-[#F3E9D8]/15 to-transparent blur-3xl pointer-events-none"
      />

      {/* Subtle Sand / Foam Horizon Light */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F3E9D8]/10 via-[#2EC4B6]/10 to-transparent pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Depth Milestone / Surface Return Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-cyan-200 mb-6"
        >
          <span className="w-8 h-[1px] bg-cyan-300" />
          <span>Surface & Ascent</span>
          <span aria-hidden="true">·</span>
          <span>Depth 100 m</span>
          <span className="w-8 h-[1px] bg-cyan-300" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-display font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-8"
        >
          {heading}
        </motion.h2>

        {/* Verbatim Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-inter text-slate-200 text-lg sm:text-xl md:text-2xl leading-relaxed font-light max-w-3xl mx-auto mb-14 text-balance"
        >
          {subheading}
        </motion.p>

        {/* Three Large Magnetic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {buttons.map((btn) => (
            <MagneticButton
              key={btn.label}
              label={btn.label}
              href={btn.href}
              primary={btn.primary}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
