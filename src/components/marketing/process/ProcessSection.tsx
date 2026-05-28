"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import { ProcessIllustrationRenderer } from "./ProcessIllustrationRenderer";
import { BrandedImagePlaceholder } from "@/components/ui/BrandedImagePlaceholder";

const INTRO_STAGE = { 
  id: "00", 
  label: "Origin", 
  title: "The Blank Canvas", 
  description: "Before the cuts are made, a concept stands still. We begin with a pristine vision waiting to be engineered.", 
  illustrationType: "animation" 
};

const DEFAULT_STAGES = [
  { id: "01", label: "Design", title: "Anatomical Blueprinting", description: "We translate character concepts into precise structural 3D blueprints, engineering perfect balance, optimized performer sightlines, and anatomical proportions before fabrication begins.", illustrationType: "animation" },
  { id: "02", label: "Structure", title: "Precision Foam Carving", description: "Using premium, high-density industrial foam, our master artisans hand-carve the core anatomy, sculpting custom ventilation channels and carving expressive physical traits directly into the head structure.", illustrationType: "animation" },
  { id: "03", label: "Build", title: "Ergonomic Assembly", description: "The high-grade foam skeleton is reinforced and bonded with lightweight internal support rings, integrating our advanced Vis/Vent ventilation cooling system for maximum airflow and heat dissipation.", illustrationType: "animation" },
  { id: "04", label: "Texture", title: "Premium Fabric Application", description: "We source and apply heavy-duty, commercial-grade athletic fabrics, custom-dyed faux furs, and wear-resistant textiles, ensuring extreme durability under intense physical performance.", illustrationType: "animation" },
  { id: "05", label: "Detail", title: "Master Hand-Stitching", description: "Every seam is reinforced with high-tensile industrial stitching. Expressive physical eyes, custom details, and ergonomic harness straps are hand-crafted to secure a perfect fit for the performer.", illustrationType: "animation" },
  { id: "06", label: "Finish", title: "The Engineered Reveal", description: "The high-performance physical custom mascot is complete—fully safety-tested, balanced for dynamic movements, and optimized for long-duration franchise and venue performances.", illustrationType: "animation" },
];

/**
 * Mobile-specific visual sub-component that accepts a static progress value as a number.
 * This completely avoids hook violations in loops while rendering exact, high-fidelity SVG outlines!
 */
function MobileStepVisual({ progressValue, stage }: { progressValue: number; stage: any }) {
  const progress = useMotionValue(progressValue);
  const isCustom = stage.illustrationType && stage.illustrationType !== "animation";
  const assetUrl = stage.assetLight || stage.assetDark || stage.imageUrl;

  return (
    <div
      className="w-full max-w-[340px] aspect-square relative rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm mx-auto mt-6"
      style={{
        backgroundColor: "color-mix(in srgb, var(--site-surface) 40%, transparent)",
        border: "1px solid var(--site-border)",
      }}
    >
      {!isCustom ? (
        <ProcessIllustrationRenderer progress={progress} />
      ) : stage.illustrationType === "video" && assetUrl ? (
        <video src={assetUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
      ) : stage.illustrationType === "lottie" && assetUrl ? (
         <iframe src={assetUrl} className="w-full h-full border-none pointer-events-none" />
      ) : assetUrl ? (
        <img src={assetUrl} alt={stage.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full">
          <BrandedImagePlaceholder />
        </div>
      )}
    </div>
  );
}

export default function ProcessSection({ steps }: { steps?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress across the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressBarScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Merge DB data with default text if available
  const mappedSteps = DEFAULT_STAGES.map((defaultStage, index) => {
    if (steps && steps[index]) {
      return { ...defaultStage, ...steps[index] };
    }
    return defaultStage;
  });

  // Inject the new Step 0 for pacing and introductory stillness
  const activeData = [INTRO_STAGE, ...mappedSteps];

  return (
    <div className="relative">
      {/* Shared top anchor for the process section */}
      <div id="process" className="absolute -top-20 pointer-events-none" />

      {/* ── DESKTOP STICKY SCROLL VIEW ── */}
      <section
        ref={containerRef}
        className="hidden lg:block relative w-full"
        style={{ 
          // Tight pacing scroll height to eliminate giant empty zones
          height: `${activeData.length * 55}vh`,
          backgroundColor: "var(--site-bg-deep)", 
          color: "var(--site-text)" 
        }}
      >
        {/* Sticky Container locked below navbar height (5rem/80px) and utilizing remaining screen height */}
        <div className="sticky top-20 h-[calc(100vh-5rem)] w-full flex flex-col justify-center overflow-hidden">

          {/* Heavy Editorial Background Glow */}
          <div
            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            style={{ backgroundColor: "var(--site-glow)" }}
          />

          <div className="w-full h-full max-w-7xl mx-auto flex flex-col items-stretch justify-center relative z-10 px-6 py-8">
            
            {/* Header Title */}
            <div className="w-full mb-8 text-left pointer-events-none">
              <span className="t-accent-label">The JZ Method</span>
              <h2 className="t-display mt-2 text-3xl lg:text-4xl font-black">The Anatomy of Creation</h2>
            </div>

            {/* Dual-Column Layout Centered Vertically */}
            <div className="w-full grid grid-cols-2 gap-16 items-center flex-1">

              {/* LEFT: Process Sticky Visual */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className="w-full max-w-[460px] aspect-square relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm border border-[var(--site-border)]"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--site-surface) 40%, transparent)",
                  }}
                >
                  {/* Global SVG Component (Layered transformation across all steps) */}
                  <ProcessIllustrationRenderer progress={scrollYProgress} />

                  {/* Optional Custom asset overrides (e.g. Lottie JSON) driven by CMS */}
                  <AnimatePresence>
                    {activeData.map((stage: any, i: number) => {
                      const isCustom = stage.illustrationType && stage.illustrationType !== "animation";
                      if (!isCustom) return null;

                      const w = 1 / activeData.length;
                      const start = i * w;
                      const end = (i + 1) * w;
                      
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      const opacity = useTransform(
                        scrollYProgress,
                        [Math.max(0, start - 0.05), start, Math.max(0, end - 0.05), end],
                        [0, 1, 1, i === activeData.length - 1 ? 1 : 0]
                      );

                      const assetUrl = stage.assetLight || stage.assetDark || stage.imageUrl;

                      return (
                        <motion.div
                          key={`custom-${stage.id}`}
                          style={{ opacity }}
                          className="absolute inset-0 w-full h-full bg-[var(--site-surface)] z-10 flex items-center justify-center overflow-hidden"
                        >
                          {stage.illustrationType === "video" && assetUrl ? (
                            <video src={assetUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                          ) : stage.illustrationType === "lottie" && assetUrl ? (
                             <iframe src={assetUrl} className="w-full h-full border-none pointer-events-none" />
                          ) : assetUrl ? (
                            <img src={assetUrl} alt={stage.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full">
                              <BrandedImagePlaceholder />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* RIGHT: Scrolling Text Content */}
              <div className="relative w-full h-[320px] flex items-center pl-16">
                <div className="relative w-full h-full">
                  {activeData.map((stage: any, i: number) => {
                    const w = 1 / activeData.length;
                    const start = i * w;
                    const end = (i + 1) * w;

                    // Strict intervals: 5% fade in, 90% solid hold, 5% fade out
                    const fadeWin = w * 0.05;
                    
                    const p1 = Math.max(0, start);
                    const p2 = Math.min(1, Math.max(0, start + fadeWin));
                    const p3 = Math.max(0, Math.min(1, end - fadeWin));
                    const p4 = Math.min(1, end);

                    const opacityVals = [ i === 0 ? 1 : 0, 1, 1, i === activeData.length - 1 ? 1 : 0];
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const opacity = useTransform(scrollYProgress, [p1, p2, p3, p4], opacityVals);
                    
                    const yVals = [ i === 0 ? 0 : 20, 0, 0, i === activeData.length - 1 ? 0 : -20];
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const y = useTransform(scrollYProgress, [p1, p2, p3, p4], yVals);

                    return (
                      <motion.div
                        key={`text-${stage.id}`}
                        style={{ opacity, y }}
                        className="absolute inset-0 flex flex-col justify-center text-left pointer-events-none"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <span className="t-step text-6xl lg:text-7xl leading-none">{i === 0 ? "..." : (stage.stepNumber || stage.id)}</span>
                          <span
                            className="t-accent-label py-1.5"
                            style={{ borderBottom: "1px solid color-mix(in srgb, var(--site-accent) 30%, transparent)" }}
                          >
                            {i === 0 ? "Origin Stage" : (stage.stepNumber ? "Process Step" : stage.label)}
                          </span>
                        </div>

                        <h3 className="t-heading text-2xl lg:text-3xl mb-4 drop-shadow-md">{stage.title}</h3>

                        <p className="t-lead text-base lg:text-lg max-w-lg">
                          {stage.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Process Progress Rail (Vertical line tying it all together) */}
          <div
            className="absolute right-12 top-1/2 -translate-y-1/2 h-[40vh] w-[2px] rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--site-border)" }}
          >
            <motion.div
              className="w-full rounded-full origin-top"
              style={{ scaleY: progressBarScale, height: "100%", backgroundColor: "var(--site-accent)" }}
            />
          </div>

          {/* Number Indicators along rail */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 h-[40vh] flex flex-col justify-between items-end pr-4 pointer-events-none">
            {activeData.map((s: any, i: number) => {
              const w = 1 / activeData.length;
              const start = i * w;
              const end = (i + 1) * w;
              const fadeWin = w * 0.15;

              // eslint-disable-next-line react-hooks/rules-of-hooks
              const activeOpacity = useTransform(
                scrollYProgress,
                [Math.max(0, start), Math.max(0, start + fadeWin), Math.max(0, end - fadeWin), Math.max(0, end)],
                [0.3, 1, 1, 0.3]
              );
              return (
                <motion.span
                  key={`ind-${s.id}`}
                  style={{ opacity: activeOpacity }}
                  className="t-label transition-opacity duration-200"
                >
                  {i === 0 ? "00" : `0${i}`}
                </motion.span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MOBILE/TABLET NORMAL STATIC FLOW ── */}
      <section
        className="block lg:hidden w-full h-auto py-16 px-6 relative"
        style={{ 
          backgroundColor: "var(--site-bg-deep)", 
          color: "var(--site-text)",
          borderTop: "1px solid var(--site-border)",
          borderBottom: "1px solid var(--site-border)"
        }}
      >
        {/* Header Title */}
        <div className="w-full mb-12 text-center">
          <span className="t-accent-label">The JZ Method</span>
          <h2 className="t-display mt-2 text-3xl font-black">The Anatomy of Creation</h2>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: "var(--site-accent)" }} />
        </div>

        {/* Vertical timeline list */}
        <div className="max-w-2xl mx-auto flex flex-col gap-16 relative">
          {activeData.map((stage: any, i: number) => {
            // Distribute progress values across 0 to 1 so the vector SVGs draw their corresponding stage!
            const progressValue = i === 0 ? 0.05 : (i / (activeData.length - 1)) * 0.95 + 0.02;

            return (
              <div 
                key={`mobile-step-${stage.id}`}
                className="w-full flex flex-col rounded-3xl p-6 sm:p-8 border border-[var(--site-border)] shadow-md"
                style={{ 
                  backgroundColor: "color-mix(in srgb, var(--site-surface) 60%, transparent)",
                }}
              >
                {/* Step Info */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="t-step text-5xl font-black leading-none">{i === 0 ? "..." : (stage.stepNumber || stage.id)}</span>
                  <span
                    className="t-accent-label py-1"
                    style={{ borderBottom: "1px solid color-mix(in srgb, var(--site-accent) 30%, transparent)" }}
                  >
                    {i === 0 ? "Origin Stage" : (stage.stepNumber ? "Process Step" : stage.label)}
                  </span>
                </div>

                <h3 className="t-heading text-xl sm:text-2xl mb-3 drop-shadow-sm">{stage.title}</h3>
                <p className="t-body text-sm sm:text-base leading-relaxed opacity-90">{stage.description}</p>

                {/* Sub-component for rendering the SVG/Custom Media perfectly centered on mobile */}
                <MobileStepVisual progressValue={progressValue} stage={stage} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
