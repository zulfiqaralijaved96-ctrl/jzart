"use client";

import React, { useRef, useEffect } from "react";
import { BrandedImagePlaceholder } from "@/components/ui/BrandedImagePlaceholder";
import Image from "next/image";

interface CarouselItem {
  id: string;
  name?: string;
  client?: string;
  category?: string;
  imageUrl?: string;
  logoUrl?: string; // Support for PartnerLogo
  height?: number; // Added height attribute
}

export default function TrustedByCarousel({ items }: { items: CarouselItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * 2.5,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const displayItems = items.length > 0 ? [...items, ...items] : [1, 2, 3, 4, 5, 6];

  return (
    <div className="relative w-full">
      {/* Hide scrollbar globally via inline style tag */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-6 snap-x snap-mandatory hide-scroll w-full"
      >
        {displayItems.map((item: any, i: number) => (
          <div
            key={item.id ? `${item.id}-${i}` : i}
            className="w-[160px] sm:w-48 xl:w-56 aspect-[4/3] rounded-3xl overflow-hidden relative shadow-xl shrink-0 group z-10 snap-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            style={{
              backgroundColor: "var(--site-surface)",
              border: "1px solid var(--site-border)",
            }}
          >
            {(item.imageUrl || item.logoUrl) ? (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-[20%]">
                <div className="relative flex justify-center w-full" style={{ height: `${item.height || 48}px` }}>
                  <Image
                    src={item.imageUrl || item.logoUrl}
                    alt={item.name || "Client Logo"}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105 pointer-events-auto max-w-[80%] mx-auto"
                  />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <BrandedImagePlaceholder text={item.name || "Client"} />
              </div>
            )}
            {/* Dark gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-90 transition-opacity duration-300"
              style={{
                backgroundImage: `linear-gradient(to top, var(--site-bg-deep) 0%, color-mix(in srgb, var(--site-bg-deep) 30%, transparent) 50%, transparent 100%)`,
              }}
            />
            <div className="absolute bottom-6 left-6 right-6 font-sans">
              <span
                className="font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide drop-shadow-md"
                style={{ color: "var(--site-text)" }}
              >
                {item.name || "Sample"}
              </span>
              {(item.client || item.category) && (
                <span
                  className="block text-[10px] font-bold uppercase tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 drop-shadow-md"
                  style={{ color: "var(--site-accent-text)" }}
                >
                  {item.category || item.client}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
