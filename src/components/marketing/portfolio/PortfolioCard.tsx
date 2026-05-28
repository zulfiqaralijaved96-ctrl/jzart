"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BrandedImagePlaceholder } from "@/components/ui/BrandedImagePlaceholder";

// The shared PortfolioItem interface for the frontend
export interface PortfolioItemType {
  id: string;
  title: string;
  slug: string;
  clientName: string | null;
  category: string;
  industry: string | null;
  description: string | null;
  coverImage: string;
  thumbnailImage: string | null;
  galleryImages: string | null;
  featured: boolean;
  isPublished: boolean;
  year: string | null;
  tags: string | null;
  themeAccentOptional: string | null;
  order: number;
}

interface PortfolioCardProps {
  item: PortfolioItemType;
  onClick: (item: PortfolioItemType) => void;
  index: number;
}

export function PortfolioCard({ item, onClick, index }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Featured items can be larger in a masonry grid
  const isFeatured = item.featured;
  
  // Decide the image to show
  const displayImage = item.thumbnailImage || item.coverImage;

  return (
    <motion.div
      layoutId={`card-container-${item.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        ease: [0.21, 0.47, 0.32, 0.98], 
        delay: index * 0.05 
      }}
      className={`group relative overflow-hidden cursor-pointer site-surface
        ${isFeatured ? "col-span-1 md:col-span-2 row-span-2 rounded-[2rem]" : "col-span-1 row-span-1 rounded-3xl"} 
        shadow-sm hover:shadow-2xl transition-shadow duration-500`}
      style={{ backgroundColor: "var(--site-card)" }}
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image Layer */}
      {displayImage ? (
        <motion.div 
          className="w-full h-full min-h-[300px] md:min-h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url('${displayImage}')` }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ) : (
        <motion.div
          className="absolute inset-0 w-full h-full min-h-[300px] md:min-h-[400px] bg-cover bg-center"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0">
             <BrandedImagePlaceholder />
          </div>
        </motion.div>
      )}

      {/* Gradient Overlay for Text Readability */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: isHovered ? 0.85 : 0.6 }}
        transition={{ duration: 0.4 }}
      >
        <div className="transform translate-y-4 md:translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          {/* Metadata Badges */}
          <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white tracking-wide">
              {item.category}
            </span>
            {item.year && (
              <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-white/80 tracking-wide">
                {item.year}
              </span>
            )}
          </div>

          {/* Title */}
          <motion.h3 
            layoutId={`card-title-${item.id}`}
            className="text-2xl md:text-3xl font-bold text-white mb-1 leading-tight"
          >
            {item.title}
          </motion.h3>
          
          {/* Client/Industry */}
          {item.clientName && (
            <p className="text-white/70 text-sm font-medium">
              for {item.clientName}
            </p>
          )}

          {/* Hover Accents */}
          <div className="mt-4 h-[2px] w-0 group-hover:w-16 transition-all duration-500 ease-out" style={{ backgroundColor: "var(--site-accent)" }} />
        </div>
      </motion.div>
      
      {/* Featured Badge top right */}
      {isFeatured && (
        <div 
          className="absolute top-6 right-6 px-4 py-1.5 shadow-lg text-white text-xs font-bold tracking-widest uppercase rounded-full transform rotate-3"
          style={{ backgroundColor: "var(--site-accent)", color: "var(--color-white)" }}
        >
          Featured
        </div>
      )}
    </motion.div>
  );
}
