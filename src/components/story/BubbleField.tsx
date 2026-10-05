import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  baseSpeed: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobblePhase: number;
  alpha: number;
}

export function BubbleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create 28 lightweight bubbles (fewer than 40 particles as requested)
    const BUBBLE_COUNT = 28;
    const bubbles: Bubble[] = Array.from({ length: BUBBLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1.2,
      baseSpeed: Math.random() * 0.7 + 0.3,
      wobbleSpeed: Math.random() * 0.03 + 0.015,
      wobbleAmp: Math.random() * 1.5 + 0.5,
      wobblePhase: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.25 + 0.1,
    }));

    let lastScrollY = window.scrollY;
    let scrollSpeedBoost = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      // Gently boost bubble speed when descending
      scrollSpeedBoost = Math.min(3, Math.max(0, delta * 0.05));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Decay scroll boost smoothly
      scrollSpeedBoost *= 0.94;

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.wobblePhase += b.wobbleSpeed;
        const wobbleX = Math.sin(b.wobblePhase) * b.wobbleAmp;

        b.y -= b.baseSpeed + scrollSpeedBoost;
        b.x += wobbleX * 0.5;

        // Wrap around when exiting top
        if (b.y < -20) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }
        if (b.x < -10) b.x = width + 10;
        if (b.x > width + 10) b.x = -10;

        // Draw bubble with glass highlight
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180, 240, 255, ${b.alpha * 1.5})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.fillStyle = `rgba(120, 220, 240, ${b.alpha * 0.5})`;
        ctx.fill();

        // Tiny glint
        ctx.beginPath();
        ctx.arc(
          b.x - b.radius * 0.35,
          b.y - b.radius * 0.35,
          Math.max(0.5, b.radius * 0.3),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 2})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
    />
  );
}
