import { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  hideIfMissing?: boolean;
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  containerClassName = '',
  hideIfMissing = true,
  priority = false,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset state if src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  if (hasError && hideIfMissing) {
    return null;
  }

  return (
    <div
      className={`relative overflow-hidden ${containerClassName} ${
        !isLoaded ? 'bg-slate-900/40 backdrop-blur-sm' : ''
      }`}
    >
      {/* Blurred Low-Res / Ambient Shimmer Placeholder while loading */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-cyan-950/20 to-slate-900/40 animate-pulse backdrop-blur-md"
        />
      )}

      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md'
          } ${className}`}
        />
      )}
    </div>
  );
}
