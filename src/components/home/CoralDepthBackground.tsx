import { useEffect, useState } from 'react';

export function CoralDepthBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. SEAMLESS TOP BLEND FROM HERO DESCENT (Connects 32M into Coral Reef) */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0E3453] via-[#0E3453]/90 to-transparent z-10" />

      {/* 2. PRIMARY DEEP CORAL REEF LAYER (Top Half: Certificates, Philosophy & Story) */}
      <div 
        className="absolute top-0 left-0 right-0 h-[3200px] overflow-hidden"
        style={{
          transform: `translateY(${scrollY * -0.04}px)`,
        }}
      >
        <img
          src="/deep-coral-reef.jpg"
          alt="Dahab Red Sea Deep Coral Reef Seabed"
          className="w-full h-full object-cover object-top opacity-55 mix-blend-luminosity filter brightness-110 contrast-125 scale-105"
          loading="lazy"
        />
        {/* Soft color tint to restore Red Sea turquoise / oceanic deep blue */}
        <div className="absolute inset-0 bg-[#0E3453]/40 mix-blend-color" />
      </div>

      {/* 3. SECONDARY DEEP CORAL SEABED & DROP-OFF LAYER (Lower Half: Portals, Testimonials, FAQ) */}
      <div 
        className="absolute top-[2800px] left-0 right-0 bottom-0 overflow-hidden"
        style={{
          transform: `translateY(${scrollY * -0.03}px)`,
        }}
      >
        <img
          src="/coral-depth-seabed.jpg"
          alt="Red Sea Deep Coral Wall & Sea Fans"
          className="w-full h-full object-cover object-center opacity-50 mix-blend-luminosity filter brightness-105 contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0E3453]/40 mix-blend-color" />
      </div>

      {/* 4. UNIFIED DEEP OCEAN GRADIENTS FOR OPTIMAL TEXT CONTRAST */}
      {/* Smooth, atmospheric dark navy wash preserving coral visibility while maintaining 100% text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E3453]/75 via-[#0E3453]/80 to-[#0E3453]/88 z-10" />

      {/* 5. AMBIENT CAUSTIC LIGHT BEAMS & BIOLUMINESCENT DEPTH ACCENTS */}
      <div className="absolute inset-0 z-10">
        {/* Caustic ray 1: Top right filtering into certificates */}
        <div className="absolute top-20 right-1/4 w-[750px] h-[550px] bg-gradient-to-b from-cyan-400/12 via-teal-300/5 to-transparent blur-[140px] transform rotate-12 rounded-full" />
        
        {/* Caustic ray 2: Left center filtering into luxury story */}
        <div className="absolute top-[1100px] left-10 w-[700px] h-[600px] bg-gradient-to-b from-teal-400/10 via-cyan-500/5 to-transparent blur-[160px] transform -rotate-12 rounded-full" />
        
        {/* Caustic ray 3: Right center behind portal cards */}
        <div className="absolute top-[2200px] right-10 w-[850px] h-[650px] bg-gradient-to-b from-sky-400/10 via-cyan-400/5 to-transparent blur-[150px] rounded-full" />
        
        {/* Caustic ray 4: Bottom ambient glow behind testimonials & FAQ */}
        <div className="absolute top-[3400px] left-1/3 w-[900px] h-[700px] bg-gradient-to-b from-cyan-500/8 via-teal-400/5 to-transparent blur-[170px] rounded-full" />
      </div>

      {/* 6. FLOATING MARINE DEPTH PARTICLES (Plankton & Micro-bubbles) */}
      <div className="absolute inset-0 z-10 opacity-30">
        <div className="absolute top-40 left-[15%] w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px] animate-pulse" />
        <div className="absolute top-[600px] right-[20%] w-2 h-2 rounded-full bg-teal-200 blur-[1px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[1400px] left-[30%] w-1 h-1 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-[2100px] right-[12%] w-1.5 h-1.5 rounded-full bg-sky-300 blur-[0.5px] animate-pulse" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-[2900px] left-[18%] w-2 h-2 rounded-full bg-teal-300 blur-[1px] animate-pulse" style={{ animationDelay: '3.2s' }} />
        <div className="absolute top-[3700px] right-[28%] w-1 h-1 rounded-full bg-cyan-200 animate-pulse" style={{ animationDelay: '1.9s' }} />
      </div>

      {/* 7. BOTTOM FOOTER FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0E3453] to-transparent z-10" />
    </div>
  );
}
