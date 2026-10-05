import { useEffect, useRef } from 'react';

export function WaterCaustics({ depthRatio = 0 }: { depthRatio?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Only draw caustics in the surface / shallow zones
      // Caustics fade out as depth increases
      const opacity = Math.max(0, 1 - depthRatio * 3.5);
      if (opacity <= 0.01) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.globalAlpha = opacity * 0.16;

      // Draw flowing caustic network using wave curves
      const bands = 7;
      for (let i = 0; i < bands; i++) {
        ctx.beginPath();
        const yBase = (height / bands) * i;
        ctx.moveTo(0, yBase);

        for (let x = 0; x <= width; x += 40) {
          const wave1 = Math.sin(x * 0.008 + time + i * 1.2) * 28;
          const wave2 = Math.cos(x * 0.015 - time * 0.8 + i) * 16;
          const wave3 = Math.sin((x + yBase) * 0.004 + time * 1.5) * 10;
          ctx.lineTo(x, yBase + wave1 + wave2 + wave3);
        }

        ctx.strokeStyle = i % 2 === 0 ? '#2EC4B6' : '#FFFFFF';
        ctx.lineWidth = 14 + (i % 3) * 6;
        ctx.filter = 'blur(16px)';
        ctx.stroke();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [depthRatio]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full mix-blend-screen opacity-90 transition-opacity duration-500"
      />
      {/* CSS Mesh / Ray Gradient Fallback */}
      <div className="absolute inset-0 bg-radial-at-t from-cyan-400/15 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
