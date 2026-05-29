"use client";

import React, { useState } from "react";

interface ReferenceGalleryProps {
  images: string[];
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80";

export default function ReferenceGallery({ images }: ReferenceGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  if (!images || images.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % images.length);
    }
  };

  const handleImageError = (idx: number) => {
    setFailedImages((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-2">
      <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block mb-3.5 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-sm text-orange-500">photo_library</span>
        Client-Uploaded Inspiration Reference Images ({images.length})
      </span>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((img, idx) => {
          const isFailed = failedImages[idx];
          const displaySrc = isFailed ? FALLBACK_IMAGE : img;

          return (
            <div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer block bg-slate-100 dark:bg-slate-900"
            >
              <img
                src={displaySrc}
                alt={`Inspiration Reference ${idx + 1}`}
                onError={() => handleImageError(idx)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 text-lg transition-opacity">zoom_in</span>
              </div>
              {isFailed && (
                <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-[9px] text-white px-2 py-1 rounded text-center font-bold">
                  Image Failed (Loaded Fallback)
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIdx(null)}
            className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors p-2 bg-slate-800/50 rounded-full"
            aria-label="Close lightbox"
          >
            <span className="material-symbols-outlined text-2xl md:text-3xl block">close</span>
          </button>

          {/* Navigation - Prev */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 text-white hover:text-orange-500 transition-colors p-2.5 bg-slate-800/50 rounded-full select-none"
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined text-2xl md:text-3xl block">chevron_left</span>
            </button>
          )}

          {/* Lightbox Image Container */}
          <div className="max-w-[85vw] max-h-[80vh] flex flex-col items-center gap-4">
            <img
              src={failedImages[selectedIdx] ? FALLBACK_IMAGE : images[selectedIdx]}
              alt={`Inspiration ${selectedIdx + 1}`}
              onError={() => handleImageError(selectedIdx)}
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-slate-800 shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="text-white text-xs font-semibold px-4 py-1.5 bg-slate-850/80 rounded-full backdrop-blur-sm border border-slate-700/50 font-mono tracking-wide">
              Image {selectedIdx + 1} of {images.length}
            </div>
          </div>

          {/* Navigation - Next */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 text-white hover:text-orange-500 transition-colors p-2.5 bg-slate-800/50 rounded-full select-none"
              aria-label="Next image"
            >
              <span className="material-symbols-outlined text-2xl md:text-3xl block">chevron_right</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
