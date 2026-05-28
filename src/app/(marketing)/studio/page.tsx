import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { BrandedImagePlaceholder } from "@/components/ui/BrandedImagePlaceholder";

export const metadata: Metadata = {
  title: "Inside the Studio | JZ Arts Mascot Costume Manufacturing",
  description: "Take a look inside our premier custom mascot fabrication studio. Explore our foam carving, performer ventilation, and soft toy manufacturing processes in Manila, Philippines.",
};

export default async function StudioPage() {
  const settings = await prisma.siteSettings.findFirst();
  
  const studioTitle = settings?.studioTitle || "Over 20 Years of Mascot Craftsmanship";
  const studioLocation = settings?.studioLocation || "Our Workshop / Manila, Philippines";
  const studioImageUrl = settings?.studioImageUrl;

  const pillars = [
    {
      icon: "architecture",
      title: "Anatomy & Foam Sculpting",
      description: "Our artisans hand-carve high-density industrial foam, translating character design blueprints into perfectly balanced, expressive three-dimensional head and body shells."
    },
    {
      icon: "air",
      title: "Vis/Vent Cooling Airflow",
      description: "We engineer silent, high-efficiency performer cooling fans and hidden ventilation channels throughout the costume, reducing heat exhaustion in demanding show venues."
    },
    {
      icon: "visibility",
      title: "Ergonomic Performer Sightlines",
      description: "Sightlines are customized for each performer utilizing high-durability vision meshes, custom interior helmet harnesses, and weight-balanced shoulder distributions."
    },
    {
      icon: "palette",
      title: "Premium Materials & Textures",
      description: "We source commercial-grade athletic fabrics, custom-dyed faux furs, and tear-resistant synthetic textiles, guaranteeing extreme durability under high-impact conditions."
    }
  ];

  return (
    <div className="site-page min-h-screen pt-32 pb-24" style={{ backgroundColor: "var(--site-bg)" }}>
      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* Background Glow */}
        <div
          className="absolute top-1/4 left-1/2 w-[700px] h-[700px] rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ backgroundColor: "var(--site-glow-strong)" }}
        />

        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <span className="t-accent-label">The Workshop Experience</span>
          <h1 className="t-display text-4xl sm:text-5xl font-black mt-4 mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: studioTitle }} />
          <div className="w-16 h-1 bg-[var(--site-accent)] mx-auto mb-6 rounded-full" />
          <p className="t-lead text-lg sm:text-xl">
            JZ Arts blends traditional design craftsmanship with cutting-edge comfort engineering to manufacture the world&apos;s most high-durability, expressive custom mascot costumes and plush toys.
          </p>
        </div>

        {/* Hero Visual Card (Manila Workshop Showcase) */}
        <div className="relative group rounded-3xl overflow-hidden aspect-[16/9] shadow-2xl border border-[var(--site-border)] mb-20 z-10 bg-[var(--site-surface)]">
          {studioImageUrl ? (
            <Image 
              src={studioImageUrl} 
              alt="Mascot Manufacturing Studio Workshop" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-102"
              priority
            />
          ) : (
            <BrandedImagePlaceholder className="w-full h-full" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3 text-white">
            <span className="material-symbols-outlined text-2xl text-[var(--site-accent)]">location_on</span>
            <p className="font-bold tracking-wider uppercase text-xs sm:text-sm drop-shadow-md">{studioLocation}</p>
          </div>
        </div>

        {/* The 4 Pillars of Mascot Engineering */}
        <div className="mb-24 relative z-10">
          <div className="text-center mb-16">
            <span className="t-accent-label">JZ Engineering Standards</span>
            <h2 className="t-heading text-3xl font-black mt-2">The Four Pillars of Mascot Engineering</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {pillars.map((pillar, index) => (
              <div 
                key={index} 
                className="flex gap-6 p-8 rounded-3xl border border-[var(--site-border)] transition-all duration-300 hover:shadow-xl bg-[var(--site-surface)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--site-accent-soft)] border border-[var(--site-border-accent)]">
                  <span className="material-symbols-outlined text-2xl text-[var(--site-accent)]">{pillar.icon}</span>
                </div>
                <div>
                  <h3 className="t-subheading text-lg sm:text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="t-body text-sm sm:text-base leading-relaxed opacity-90">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative z-10 rounded-[3rem] p-12 sm:p-16 text-center border border-[var(--site-border-accent)] bg-[var(--site-accent-soft)]">
          <h2 className="t-display text-2xl sm:text-3xl font-black mb-6">Connect with JZ Master Craftsmen</h2>
          <p className="t-lead max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Have a custom mascot design, plush toy line, or product character you want to bring to life? Collaborate directly with our Manila engineering team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary px-8 py-4 rounded-full font-bold">
              Start Your Project
            </Link>
            <Link href="/portfolio" className="btn-secondary px-8 py-4 rounded-full font-bold">
              Explore Our Portfolio
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
