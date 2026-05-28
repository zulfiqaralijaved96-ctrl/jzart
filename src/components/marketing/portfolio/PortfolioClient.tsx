"use client";

import { useState } from "react";
import { PortfolioItemType } from "./PortfolioCard";
import { PortfolioHero } from "./PortfolioHero";
import { PortfolioFilters } from "./PortfolioFilters";
import { PortfolioGrid } from "./PortfolioGrid";
import { PortfolioDetailModal } from "./PortfolioDetailModal";
import { PortfolioCTA } from "./PortfolioCTA";

interface PortfolioClientProps {
  initialItems: PortfolioItemType[];
  categories: string[];
}

export function PortfolioClient({ initialItems, categories }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState("All Work");
  const [selectedItem, setSelectedItem] = useState<PortfolioItemType | null>(null);

  // Filter items based on active category
  const filteredItems = activeCategory === "All Work" 
    ? initialItems 
    : initialItems.filter(item => item.category === activeCategory);

  return (
    <>
      <PortfolioHero />
      
      <PortfolioFilters 
        categories={categories} 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />
      
      <PortfolioGrid 
        items={filteredItems} 
        onOpenModal={(item) => setSelectedItem(item)} 
      />
      
      <PortfolioCTA />

      {/* Renders if an item is clicked */}
      <PortfolioDetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
}
