import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyConfig } from '../../config/storyConfig';
import { ImageWithFallback } from './ImageWithFallback';
import { X, ChevronLeft, ChevronRight, ZoomIn, Eye } from 'lucide-react';

type CategoryFilter = 'all' | 'school' | 'events' | 'underwater' | 'classroom' | 'facilities';

interface FilterOption {
  id: CategoryFilter;
  label: string;
}

const filters: FilterOption[] = [
  { id: 'all', label: 'All Photos' },
  { id: 'school', label: 'School & Facilities' },
  { id: 'events', label: 'Events & Groups' },
  { id: 'underwater', label: 'Underwater' },
  { id: 'classroom', label: 'Classroom' },
];

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const galleryItems = storyConfig.media.gallery;

  const filteredItems = galleryItems.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'school') {
      return item.category === 'school' || item.category === 'facilities';
    }
    return item.category === activeFilter;
  });

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  // Preload neighboring images when lightbox opens or index changes
  useEffect(() => {
    if (lightboxIndex === null) return;
    const preload = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    const nextIdx = (lightboxIndex + 1) % filteredItems.length;
    const prevIdx = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    preload(filteredItems[nextIdx].src);
    preload(filteredItems[prevIdx].src);
  }, [lightboxIndex, filteredItems]);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setZoomLevel(1);
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  // Body scroll lock
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const handleNextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    setZoomLevel(1);
  };

  const handlePrevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    setZoomLevel(1);
  };

  return (
    <section
      id="gallery"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-[#0E3453] via-[#0E3453] to-[#0E3453] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#2EC4B6] mb-3"
            >
              <span className="w-8 h-[1px] bg-[#2EC4B6]" />
              <span>Our Freediving Journey</span>
              <span aria-hidden="true">·</span>
              <span>Depth ~75 m</span>
            </motion.div>

            <h2 className="font-serif-display font-medium text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              Life Along The Reef
            </h2>
          </div>

          {/* Filter Pills with Layout Animation */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            {filters.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-inter font-medium transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive ? 'text-slate-900' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 rounded-full bg-[#2EC4B6] shadow-[0_0_10px_rgba(46,196,182,0.6)]"
                      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Masonry / Bento Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setLightboxIndex(index)}
                className={`group relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/10 hover:border-[#2EC4B6]/50 shadow-xl cursor-pointer ${
                  index % 5 === 0 ? 'sm:col-span-2 sm:row-span-2 h-[420px]' : 'h-[280px]'
                }`}
              >
                {/* Image with graceful handling */}
                <ImageWithFallback
                  src={item.src}
                  alt={item.alt}
                  hideIfMissing={false}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Slide-Up Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#2EC4B6] block mb-1">
                      {item.category}
                    </span>
                    <p className="font-inter text-sm font-medium text-white line-clamp-2">
                      {item.caption || 'Add caption'}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Immersive Lightbox Modal */}
      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setLightboxIndex(null);
                setZoomLevel(1);
              }}
              className="fixed inset-0 bg-black/92 backdrop-blur-2xl"
            />

            {/* Top Toolbar */}
            <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between text-white">
              <span className="text-xs font-mono tracking-widest text-slate-400">
                0{lightboxIndex + 1} / 0{filteredItems.length}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => (z === 1 ? 1.5 : 1))}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                  title="Toggle zoom"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLightboxIndex(null);
                    setZoomLevel(1);
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Prev & Next Buttons */}
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image & Caption */}
            <div className="relative z-20 max-w-5xl max-h-[80vh] flex flex-col items-center">
              <div
                className="overflow-hidden rounded-2xl max-h-[70vh] flex items-center justify-center transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={activeItem.src}
                  alt={activeItem.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl"
                />
              </div>

              {/* Caption */}
              <p className="mt-4 font-inter text-sm sm:text-base text-slate-200 text-center max-w-xl font-light">
                {activeItem.caption || 'Add caption'}
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
