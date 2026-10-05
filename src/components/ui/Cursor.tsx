import { useEffect, useState } from 'react';

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop/devices with fine pointer
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.cursor === 'hover'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: -12,
        top: -12,
      }}
    >
      <div
        className={`rounded-full transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-12 h-12 bg-sky-400/20 border border-sky-400/60 scale-125 -translate-x-3 -translate-y-3'
            : 'w-6 h-6 border border-white/50 bg-white/10'
        }`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
            isHovered ? 'bg-sky-400 scale-150' : 'bg-white'
          }`}
        />
      </div>
    </div>
  );
}
