"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandedImagePlaceholder } from "@/components/ui/BrandedImagePlaceholder";
import Image from "next/image";

interface PortfolioItem {
  id: string;
  name?: string | null;
  title?: string | null;
  client?: string | null;
  clientName?: string | null;
  category: string;
  coverImage?: string | null;
}

export default function PortfolioSection({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState("All Work");

  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category).filter(Boolean));
    return ["All Work", ...Array.from(cats)];
  }, [items]);

  const filteredItems = filter === "All Work" ? items : items.filter((item) => item.category === filter);

  return (
    <section className="py-32" id="portfolio" style={{ backgroundColor: "var(--site-bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="t-heading mb-4">The Hall of Characters</h2>
            <p className="t-body">Diverse creations for world-class brands across all industries.</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 whitespace-nowrap hide-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={filter === cat ? "btn-primary px-6 py-2.5 rounded-full transition-all" : "filter-btn px-6 py-2.5 rounded-full transition-all hover:bg-white/10"}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden"
                style={{ backgroundColor: "var(--site-card)", border: "1px solid var(--site-border)" }}
              >
                {item.coverImage ? (
                   <Image
                     src={item.coverImage}
                     alt={item.title || item.name || "Portfolio Item"}
                     fill
                     className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                   />
                 ) : (
                   <BrandedImagePlaceholder className="w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
                 )}
                 <div
                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end pointer-events-none"
                   style={{ backgroundImage: `linear-gradient(to top, var(--site-bg-alt) 30%, color-mix(in srgb, var(--site-bg-alt) 40%, transparent), transparent)` }}
                 >
                   <h4 className="t-subheading translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title || item.name || "Character"}</h4>
                   {(item.clientName || item.client) && <p className="t-small translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{item.clientName || item.client}</p>}
                   <p className="t-accent-label mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">{item.category}</p>
                 </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
