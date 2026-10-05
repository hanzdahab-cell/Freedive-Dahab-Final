import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface FreediveLogoProps {
  className?: string;
  size?: number;
  interactive?: boolean;
  magnetic?: boolean;
}

export function FreediveLogo({
  className = '',
  size = 46,
  interactive = true,
  magnetic = true,
}: FreediveLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const diver1Ref = useRef<SVGGElement>(null);
  const diver2Ref = useRef<SVGGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!interactive || !containerRef.current || !svgRef.current) return;

    const container = containerRef.current;
    const svg = svgRef.current;
    const glow = glowRef.current;
    const diver1 = diver1Ref.current;
    const diver2 = diver2Ref.current;
    const ring = ringRef.current;

    // Set 3D perspective transforms on container and svg
    gsap.set(container, { transformPerspective: 800, transformStyle: 'preserve-3d' });
    gsap.set(svg, { transformOrigin: '50% 50%' });

    // GSAP high-performance quickTo setters for buttery inertia (Emotion Agency style)
    const xTo = gsap.quickTo(container, 'x', { duration: 0.9, ease: 'power3.out' });
    const yTo = gsap.quickTo(container, 'y', { duration: 0.9, ease: 'power3.out' });

    const rotXTo = gsap.quickTo(svg, 'rotationX', { duration: 1.1, ease: 'power2.out' });
    const rotYTo = gsap.quickTo(svg, 'rotationY', { duration: 1.1, ease: 'power2.out' });
    const rotZTo = gsap.quickTo(svg, 'rotation', { duration: 1.4, ease: 'power2.out' });

    const skewXTo = gsap.quickTo(svg, 'skewX', { duration: 0.75, ease: 'power3.out' });
    const skewYTo = gsap.quickTo(svg, 'skewY', { duration: 0.75, ease: 'power3.out' });
    const scaleXTo = gsap.quickTo(svg, 'scaleX', { duration: 0.75, ease: 'power3.out' });
    const scaleYTo = gsap.quickTo(svg, 'scaleY', { duration: 0.75, ease: 'power3.out' });

    // Multi-layer depth parallax quickTo setters
    const diver1XTo = diver1 ? gsap.quickTo(diver1, 'x', { duration: 1.2, ease: 'power2.out' }) : null;
    const diver1YTo = diver1 ? gsap.quickTo(diver1, 'y', { duration: 1.2, ease: 'power2.out' }) : null;

    const diver2XTo = diver2 ? gsap.quickTo(diver2, 'x', { duration: 1.5, ease: 'power2.out' }) : null;
    const diver2YTo = diver2 ? gsap.quickTo(diver2, 'y', { duration: 1.5, ease: 'power2.out' }) : null;

    const glowXTo = glow ? gsap.quickTo(glow, 'x', { duration: 1.6, ease: 'power2.out' }) : null;
    const glowYTo = glow ? gsap.quickTo(glow, 'y', { duration: 1.6, ease: 'power2.out' }) : null;

    // Continuous idle breathing & ring rotation
    const idleRingTween = ring
      ? gsap.to(ring, {
          rotation: 360,
          duration: 32,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        })
      : null;

    // Mouse velocity & position tracking
    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 16);
      const vx = (e.clientX - lastX) / dt;
      const vy = (e.clientY - lastY) / dt;
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      // Screen-wide normalized offset (-1 to 1)
      const screenNormX = (e.clientX / window.innerWidth - 0.5) * 2;
      const screenNormY = (e.clientY / window.innerHeight - 0.5) * 2;

      // Proximity & magnetic pull calculation relative to logo center
      const rect = container.getBoundingClientRect();
      const logoCenterX = rect.left + rect.width / 2;
      const logoCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - logoCenterX;
      const deltaY = e.clientY - logoCenterY;
      const dist = Math.hypot(deltaX, deltaY);

      let targetX = 0;
      let targetY = 0;

      if (magnetic) {
        const magnetRadius = 220; // Proximity threshold in pixels
        if (dist < magnetRadius) {
          const power = Math.pow(1 - dist / magnetRadius, 1.8);
          // Attract logo towards cursor (up to 16px displacement)
          targetX = deltaX * 0.38 * power;
          targetY = deltaY * 0.38 * power;
        } else {
          // Subtle screen parallax drift when outside proximity
          targetX = screenNormX * 4;
          targetY = screenNormY * 4;
        }
      }

      // Apply fluid translation with inertia
      xTo(targetX);
      yTo(targetY);

      // 3D Tilt based on cursor position + velocity
      const tiltX = -screenNormY * 16 + vy * 3;
      const tiltY = screenNormX * 16 + vx * 3;
      const rotZ = screenNormX * 6 + vx * 1.5;

      rotXTo(Math.max(-28, Math.min(28, tiltX)));
      rotYTo(Math.max(-28, Math.min(28, tiltY)));
      rotZTo(Math.max(-18, Math.min(18, rotZ)));

      // Fluid squash, stretch, and skew based on velocity (Emotion Agency signature)
      const speed = Math.hypot(vx, vy);
      const clampedSpeed = Math.min(speed, 6);
      const stretch = 1 + clampedSpeed * 0.04;
      const squash = 1 - clampedSpeed * 0.025;

      const skewX = Math.max(-12, Math.min(12, -vx * 4));
      const skewY = Math.max(-12, Math.min(12, vy * 2));

      skewXTo(skewX);
      skewYTo(skewY);
      scaleXTo(stretch);
      scaleYTo(squash);

      // Multi-layer depth parallax (Diver 1 vs Diver 2 cross-lag)
      if (diver1XTo && diver1YTo) {
        diver1XTo(screenNormX * 3.5 + vx * 1.2);
        diver1YTo(screenNormY * 3.5 + vy * 1.2);
      }
      if (diver2XTo && diver2YTo) {
        diver2XTo(-screenNormX * 3.5 - vx * 1.2);
        diver2YTo(-screenNormY * 3.5 - vy * 1.2);
      }
      if (glowXTo && glowYTo) {
        glowXTo(screenNormX * 7);
        glowYTo(screenNormY * 7);
      }
    };

    const handleMouseLeave = () => {
      // Elastic spring back to neutral
      gsap.to(container, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.4)',
      });
      gsap.to(svg, {
        rotationX: 0,
        rotationY: 0,
        rotation: 0,
        skewX: 0,
        skewY: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.4)',
      });
      if (diver1) gsap.to(diver1, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)' });
      if (diver2) gsap.to(diver2, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)' });
      if (glow) gsap.to(glow, { x: 0, y: 0, duration: 1.2, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      idleRingTween?.kill();
    };
  }, [interactive, magnetic]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (svgRef.current) {
      gsap.to(svgRef.current, {
        scale: 1.15,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    }
  };

  const handleMouseOut = () => {
    setIsHovered(false);
    if (svgRef.current) {
      gsap.to(svgRef.current, {
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none ${className}`}
      style={{
        width: size,
        height: size,
        perspective: '800px',
      }}
    >
      {/* Dynamic Ambient Cyan Glow reacting to mouse & GSAP */}
      <div
        ref={glowRef}
        className={`absolute inset-0 rounded-full bg-cyan-400/25 blur-xl pointer-events-none transition-opacity duration-700 ${
          isHovered ? 'opacity-100 scale-150' : 'opacity-40 scale-100'
        }`}
      />

      {/* The Symmetrical Crossing Freedivers SVG (logo-white-small.png) */}
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 transition-all duration-300 ${
          isHovered
            ? 'drop-shadow-[0_0_18px_rgba(56,189,248,0.95)]'
            : 'drop-shadow-[0_0_7px_rgba(255,255,255,0.45)]'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Subtle breathing outer compass ring with dashes */}
        <circle
          ref={ringRef}
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(56, 189, 248, 0.35)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
        />

        {/* 
          DIVER 1 GROUP: Descending from Top-Right through center to Bottom-Left 
          Streamlined hydrodynamic arms, head, torso, waist, legs and long freediving bi-fin.
        */}
        <g ref={diver1Ref}>
          {/* Main Torso & Legs */}
          <path
            d="M 68 18 C 66 18, 64 21, 62 25 C 60 29, 57 36, 52 46 C 50 49, 49 51, 48 53 C 45 58, 41 65, 36 73 C 33 78, 30 83, 27 88 C 26 89.5, 24 88, 25 86 C 28 81, 32 74, 38 64 C 42 57, 45 52, 47 48 C 50 41, 55 31, 59 23 C 62 17, 65 15, 68 18 Z"
            fill="rgba(255, 255, 255, 0.96)"
            stroke="rgba(56, 189, 248, 0.8)"
            strokeWidth="0.75"
          />
          {/* Head & Streamlined Overhead Arms */}
          <circle cx="67" cy="18" r="2.2" fill="#ffffff" />
          <path
            d="M 67 18 L 72 13 C 73 12, 74 13, 73 14 L 68 20"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Long Hydrodynamic Bi-Fin Blade */}
          <path
            d="M 27 88 C 25 91, 22 94, 18 96 C 17 96.5, 17 95, 18 94 C 21 90, 24 85, 27 88 Z"
            fill="rgba(56, 189, 248, 0.95)"
          />
        </g>

        {/* 
          DIVER 2 GROUP: Descending from Top-Left through center to Bottom-Right 
          Creating the majestic crossing silhouette from logo-white-small.png
        */}
        <g ref={diver2Ref}>
          {/* Main Torso & Legs */}
          <path
            d="M 32 18 C 34 18, 36 21, 38 25 C 40 29, 43 36, 48 46 C 50 49, 51 51, 52 53 C 55 58, 59 65, 64 73 C 67 78, 70 83, 73 88 C 74 89.5, 76 88, 75 86 C 72 81, 68 74, 62 64 C 58 57, 55 52, 53 48 C 50 41, 45 31, 41 23 C 38 17, 35 15, 32 18 Z"
            fill="rgba(255, 255, 255, 0.96)"
            stroke="rgba(56, 189, 248, 0.8)"
            strokeWidth="0.75"
          />
          {/* Head & Streamlined Overhead Arms */}
          <circle cx="33" cy="18" r="2.2" fill="#ffffff" />
          <path
            d="M 33 18 L 28 13 C 27 12, 26 13, 27 14 L 32 20"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Long Hydrodynamic Bi-Fin Blade */}
          <path
            d="M 73 88 C 75 91, 78 94, 82 96 C 83 96.5, 83 95, 82 94 C 79 90, 76 85, 73 88 Z"
            fill="rgba(56, 189, 248, 0.95)"
          />
        </g>

        {/* Center Intersection Light Accent */}
        <circle cx="50" cy="50" r="1.6" fill="#38bdf8" className="animate-pulse" />
      </svg>
    </div>
  );
}
