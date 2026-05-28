"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PortfolioItemType } from "./PortfolioCard";
import { BrandedImagePlaceholder } from "@/components/ui/BrandedImagePlaceholder";

interface PortfolioDetailModalProps {
  item: PortfolioItemType | null;
  onClose: () => void;
}

export function PortfolioDetailModal({ item, onClose }: PortfolioDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  
  // Prevent body scroll when open
  useEffect(() => {
    setMounted(true);
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  if (!mounted) return null;

  // Parse gallery images
  let galleryImages: string[] = [];
  if (item?.galleryImages) {
    try {
      galleryImages = JSON.parse(item.galleryImages);
    } catch (e) {
      console.error("Failed to parse gallery images");
    }
  }

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 backdrop-blur-xl pointer-events-auto"
            style={{ backgroundColor: "var(--site-overlay-mid)" }}
          />

          {/* Modal Container */}
          <motion.div
            layoutId={`card-container-${item.id}`}
            className="relative w-full max-w-6xl max-h-[90vh] md:h-[85vh] rounded-b-none md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto mt-auto md:mt-0"
            style={{ backgroundColor: "var(--site-surface)" }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
            >
              <span className="material-symbols-outlined block">close</span>
            </button>

            {/* Left side: Scrollable Image Gallery */}
            <div 
              className="w-full md:w-2/3 h-[50vh] md:h-full overflow-y-auto hide-scrollbar scroll-smooth"
              style={{ backgroundColor: "var(--site-bg-alt)" }}
            >
              {/* Hero Cover */}
              {item.coverImage ? (
                <div 
                  className="w-full h-[50vh] md:h-full bg-cover bg-center shrink-0" 
                  style={{ backgroundImage: `url('${item.coverImage}')` }}
                />
              ) : (
                <div className="w-full h-[50vh] md:h-full shrink-0">
                  <BrandedImagePlaceholder />
                </div>
              )}
              
              {/* Additional Gallery Images */}
              {galleryImages.map((imgUrl, i) => (
                imgUrl ? (
                  <div 
                    key={i}
                    className="w-full h-[50vh] md:h-full bg-cover bg-center shrink-0" 
                    style={{ backgroundImage: `url('${imgUrl}')` }}
                  />
                ) : (
                  <div key={i} className="w-full h-[50vh] md:h-full shrink-0">
                    <BrandedImagePlaceholder />
                  </div>
                )
              ))}
            </div>

            {/* Right side: Editorial Content */}
            <div 
              className="w-full md:w-1/3 h-[40vh] md:h-full overflow-y-auto p-8 md:p-12 border-l"
              style={{ backgroundColor: "var(--site-surface)", borderColor: "var(--site-border)" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col h-full"
              >
                {/* Meta Header */}
                <div className="flex gap-2 mb-6 flex-wrap">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                    style={{ backgroundColor: "var(--site-card)", color: "var(--site-text)" }}
                  >
                    {item.category}
                  </span>
                  {item.year && (
                    <span 
                      className="px-3 py-1 border rounded-full text-xs font-semibold tracking-wider uppercase"
                      style={{ backgroundColor: "var(--site-bg-alt)", borderColor: "var(--site-border)", color: "var(--site-text-faint)" }}
                    >
                      {item.year}
                    </span>
                  )}
                  {item.industry && (
                    <span 
                      className="px-3 py-1 text-xs font-medium uppercase tracking-wider py-1"
                      style={{ color: "var(--site-text-faint)" }}
                    >
                      {item.industry}
                    </span>
                  )}
                </div>

                <motion.h2 
                  layoutId={`card-title-${item.id}`}
                  className="text-3xl md:text-4xl font-bold mb-2 leading-tight"
                  style={{ color: "var(--site-text)" }}
                >
                  {item.title}
                </motion.h2>

                {item.clientName && (
                  <p 
                    className="font-serif italic text-lg mb-8"
                    style={{ color: "var(--site-accent-text)" }}
                  >
                    for {item.clientName}
                  </p>
                )}

                {item.description && (
                  <div 
                    className="leading-relaxed space-y-4 mb-10 w-full prose dark:prose-invert"
                    style={{ color: "var(--site-text-muted)" }}
                  >
                    {/* Basic newline splitting to paragraphs */}
                    {item.description.split('\n').filter(Boolean).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
                
                {item.tags && (
                  <div 
                    className="mt-auto pt-6 border-t"
                    style={{ borderColor: "var(--site-border)" }}
                  >
                    <p 
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: "var(--site-text-faint)" }}
                    >
                      Tags & Elements
                    </p>
                    <div className="flex flex-wrap gap-2">
                       {item.tags.split(',').map((tag, i) => (
                         <span 
                           key={i} 
                           className="text-xs font-medium border px-2 py-1 rounded"
                           style={{ color: "var(--site-text-faint)", backgroundColor: "var(--site-card)", borderColor: "var(--site-border)" }}
                         >
                           {tag.trim()}
                         </span>
                       ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
