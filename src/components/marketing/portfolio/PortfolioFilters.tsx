"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface PortfolioFiltersProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function PortfolioFilters({ categories, activeCategory, onSelectCategory }: PortfolioFiltersProps) {
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  
  // Ensure "All Work" is always the first option
  const allCategories = ["All Work", ...categories.filter(c => c !== "All Work")];

  return (
    <div 
      className="sticky top-[72px] z-40 w-full backdrop-blur-md border-y py-4 transition-all"
      style={{ 
        backgroundColor: "color-mix(in srgb, var(--site-bg) 85%, transparent)",
        borderColor: "var(--site-border-strong)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start overflow-x-auto hide-scrollbar gap-2 pb-1">
          {allCategories.map((category) => {
            const isActive = activeCategory === category;
            const isHovered = hoveredFilter === category;
            
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                onMouseEnter={() => setHoveredFilter(category)}
                onMouseLeave={() => setHoveredFilter(null)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap outline-none transition-colors duration-200`}
                style={{
                  color: isActive ? "var(--site-bg)" : (isHovered ? "var(--site-text)" : "var(--site-text-muted)"),
                  backgroundColor: (!isActive && isHovered) ? "var(--site-surface)" : "transparent"
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ backgroundColor: "var(--site-text)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
