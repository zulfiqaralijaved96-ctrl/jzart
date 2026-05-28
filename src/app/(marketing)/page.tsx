import React from "react";
import prisma from "@/lib/prisma";
import TrustedByCarousel from "@/components/marketing/TrustedByCarousel";
import ProcessSection from "@/components/marketing/process/ProcessSection";
import PortfolioSection from "@/components/marketing/portfolio/PortfolioSection";
import { BrandedImagePlaceholder } from "@/components/ui/BrandedImagePlaceholder";
import BrandLogo from "@/components/marketing/BrandLogo";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const settings = await prisma.siteSettings.findFirst();
  const partnerLogosWall = await prisma.partnerLogo.findMany({ where: { section: "WALL" }, orderBy: { order: "asc" } });
  const partnerLogosHero = await prisma.partnerLogo.findMany({ where: { section: "HERO" }, orderBy: { order: "asc" } });
  const portfolioItems = await prisma.portfolioItem.findMany({ orderBy: { order: "asc" } });
  const processSteps = await prisma.processStep.findMany({ orderBy: { order: "asc" } });

  const heroBadge = settings?.heroBadge || "Premium Mascot Fabricators";
  const heroTitle = settings?.heroTitle || 'High-End Custom Mascots<br/>Built for<br/><span class="t-accent">Maximum Performance</span>';
  const heroSubtitle = settings?.heroSubtitle || "Exquisite physical mascot manufacturing featuring high-grade foam carving, custom-engineered ventilation, and ergonomic comfort. Built for ultimate durability and high-impact brand presence.";
  const heroImageUrl = settings?.heroImageUrl;

  const studioTitle = settings?.studioTitle || "Over 20 Years of<br/>Fabrication & Foam Carving";
  const studioLocation = settings?.studioLocation || "Our Workshop / Manila, Philippines";
  const studioImageUrl = settings?.studioImageUrl;

  const finalRevealTitle = settings?.finalRevealTitle || "The Engineered Character<br/>Comes to Life";
  const finalRevealVideo = settings?.finalRevealVideo;

  return (
    <div className="site-page pb-20 pt-20">

      {/* ── HERO ── */}
      <section
        className="relative pt-24 pb-16 lg:pt-32 lg:pb-32 overflow-hidden min-h-[75vh]"
        style={{ backgroundColor: "var(--site-bg-deep)" }}
      >
        <div className="max-w-[1400px] w-full mx-auto px-6 relative">

          {/* Background Glow */}
          <div
            className="absolute top-1/2 left-1/4 w-[800px] h-[800px] rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"
            style={{ backgroundColor: "var(--site-glow-strong)" }}
          />

          {/* Main Hero Content (Structured Flex Row) */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center relative z-40 w-full mb-8 lg:mb-0">
            
            {/* Left Column (Text) */}
            <div className="w-full lg:w-[50%] flex flex-col relative z-40 pb-8 lg:pb-20">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit mb-8 shadow-sm"
                style={{ backgroundColor: "var(--site-accent-soft)", border: "1px solid var(--site-border-accent)" }}
              >
                <span
                  className="flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: "var(--site-accent)", boxShadow: "0 0 8px var(--site-accent-glow)" }}
                />
                <span className="t-accent-label">{heroBadge}</span>
              </div>

              {/* Title */}
              <h1
                className="t-hero mb-8 pr-4"
                dangerouslySetInnerHTML={{ __html: heroTitle }}
              />

              {/* Subtitle */}
              <p className="t-lead max-w-xl mb-4 lg:mb-12">{heroSubtitle}</p>
            </div>

            {/* Mobile Hero Image */}
            <div className="lg:hidden w-full aspect-[4/5] mt-4 mb-8 rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] relative z-40 border border-[var(--site-border)] transition-transform duration-500" style={{ backgroundColor: "var(--site-surface)" }}>
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="Mobile Hero" fill className="object-cover" />
              ) : (
                <BrandedImagePlaceholder />
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none" />
            </div>

            {/* Desktop Floating Hero Image (Highest z-index, part of physical document flow) */}
            <div
              className="hidden lg:block w-[42%] aspect-[3.6/5] z-50 rounded-[2.5rem] overflow-hidden group pointer-events-auto transition-transform hover:-translate-y-2 duration-500 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative border border-[var(--site-border)]"
              style={{ backgroundColor: "var(--site-surface)" }}
            >
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="Hero Mascot" fill className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]" />
              ) : (
                <BrandedImagePlaceholder />
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.5rem] pointer-events-none" />
            </div>

          </div>

          {/* Trusted By Row (Vertical Tuck) */}
          {/* Z-20 ensures it slides strictly underneath the Desktop Image (z-50) */}
          {/* Minimal negative margin to ensure cards only hint at an intersection without being hidden */}
          <div className="w-full relative z-20 mt-8 md:-mt-2 lg:-mt-8 xl:-mt-10 pt-8 lg:pt-10 border-t border-[var(--site-border)]">
            <h3 className="t-label mb-8">Trusted By</h3>
            
            {/* Carousel wrapper with edge bleed on mobile */}
            <div className="-mx-6 px-6 lg:mx-0 lg:px-0 [mask-image:linear-gradient(to_right,white_95%,transparent)]">
              <TrustedByCarousel items={partnerLogosHero} />
            </div>
          </div>

        </div>
      </section>

      {/* ── CRAFTSMANSHIP ── */}
      <section className="py-32" style={{ backgroundColor: "var(--site-bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2
              className="t-display mb-6"
              dangerouslySetInnerHTML={{ __html: studioTitle }}
            />
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: "var(--site-accent)" }} />
          </div>
          <div
            className="relative group rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
            style={{ border: "1px solid var(--site-border)", boxShadow: "var(--shadow-card)", backgroundColor: "var(--site-surface)" }}
          >
            <div className="absolute inset-0 z-10"
              style={{ backgroundImage: `linear-gradient(to top, var(--site-bg-alt), transparent, transparent)` }} />
            {studioImageUrl ? (
              <Image src={studioImageUrl} alt="Craftsmanship Studio" fill className="object-cover" />
            ) : (
              <BrandedImagePlaceholder className="w-full h-full" />
            )}
            <div className="absolute bottom-8 left-8 z-20">
              <p className="t-label">{studioLocation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <ProcessSection steps={processSteps} />

      {/* ── FINAL REVEAL ── */}
      <section className="py-32 relative overflow-hidden" style={{ backgroundColor: "var(--site-bg-alt)" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "var(--site-accent-soft)" }} />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2
            className="t-display mb-12"
            dangerouslySetInnerHTML={{ __html: finalRevealTitle }}
          />
          <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
            {finalRevealVideo ? (
              <div className="w-full aspect-video"
                style={{ backgroundImage: `url('${finalRevealVideo}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "var(--site-surface)" }} />
            ) : (
              <div className="w-full aspect-video">
                <BrandedImagePlaceholder />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
              <button className="btn-primary w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="material-symbols-outlined text-4xl">play_arrow</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <PortfolioSection items={portfolioItems} />

      {/* ── BRAND WALL ── */}
      <section
        className="py-20"
        style={{ borderTop: "1px solid var(--site-border)", borderBottom: "1px solid var(--site-border)", backgroundColor: "var(--site-bg-alt)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <p className="t-label text-center mb-12">Proudly Serving Industry Leaders</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center opacity-30 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-700">
            {partnerLogosWall.length > 0 ? partnerLogosWall.map((logo: any) => (
              <div key={logo.id} className="relative mx-auto flex justify-center items-center w-full" style={{ height: `${logo.height || 48}px` }}>
                {logo.logoUrl === "placeholder" ? (
                  <BrandLogo name={logo.name} className="max-w-[85%] max-h-[85%] hover:scale-110 transition-transform" />
                ) : (
                  <Image src={logo.logoUrl} alt={logo.name} fill className="object-contain hover:scale-110 transition-transform" />
                )}
              </div>
            )) : (
              <div className="col-span-full text-center opacity-50 text-sm">Our partners are currently being updated.</div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 relative overflow-hidden" id="contact" style={{ backgroundColor: "var(--site-bg-alt)" }}>
        <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
          <div className="grid grid-cols-6 gap-2 rotate-12 -translate-y-20 absolute -inset-20">
            {[...portfolioItems, ...portfolioItems].map((item: any, i: number) => (
              <div key={i} className="aspect-square rounded-lg opacity-20 relative overflow-hidden"
                style={{ backgroundColor: "var(--site-surface)" }}>
                {item.coverImage ? (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.coverImage}')` }} />
                ) : (
                  <div className="absolute inset-0">
                    <BrandedImagePlaceholder />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div
            className="p-12 md:p-20 rounded-[3rem] backdrop-blur-xl"
            style={{ backgroundColor: "var(--site-accent-soft)", border: "1px solid var(--site-border-accent)" }}
          >
            <h2 className="t-display mb-8">
              Ready to Build Your <br />Custom Mascot?
            </h2>
            <p className="t-lead max-w-lg mx-auto mb-10">
              From advanced foam carving to built-in performer ventilation systems, let's engineer a high-durability, premium physical mascot costume for your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary px-10 py-5 rounded-full text-center">
                Get a Custom Quote
              </Link>
              <Link href="#process" className="btn-secondary px-10 py-5 rounded-full text-center">
                View our Process
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
