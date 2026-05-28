"use client";

import { useState } from "react";
import { PortfolioCard, PortfolioItemType } from "./PortfolioCard";

interface PortfolioGridProps {
  items: PortfolioItemType[];
  onOpenModal: (item: PortfolioItemType) => void;
}

export function PortfolioGrid({ items, onOpenModal }: PortfolioGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="w-full py-32 flex flex-col items-center justify-center text-center px-4">
        <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--site-text)" }}>No Projects Found</h3>
        <p style={{ color: "var(--site-text-muted)" }}>There are currently no projects matching this category.</p>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-24 pb-32 transition-colors" style={{ backgroundColor: "var(--site-bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CSS Grid Masonry approximation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[400px]">
          {items.map((item, index) => (
            <PortfolioCard 
              key={item.id} 
              item={item} 
              index={index} 
              onClick={onOpenModal} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
