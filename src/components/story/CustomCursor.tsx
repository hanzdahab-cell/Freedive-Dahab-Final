import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad), not touch screens
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    setIsPointer(true);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest('button, a, input, select, textarea, [role="button"], [data-cursor="pointer"]')
      );
      setIsHovered(isInteractive);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isPointer || !isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {/* Outer soft ring */}
      <motion.div
        className="rounded-full border border-cyan-400/80 bg-cyan-400/10 backdrop-blur-[1px] shadow-[0_0_12px_rgba(46,196,182,0.4)]"
        animate={{
          width: isHovered ? 48 : 22,
          height: isHovered ? 48 : 22,
          borderColor: isHovered ? '#2EC4B6' : 'rgba(255, 255, 255, 0.6)',
          backgroundColor: isHovered ? 'rgba(46, 196, 182, 0.15)' : 'rgba(255, 255, 255, 0.05)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_white]" />
    </motion.div>
  );
}
