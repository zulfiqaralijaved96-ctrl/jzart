"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const STAGES = [
  {
    id: "01",
    label: "Design",
    title: "Anatomical Blueprinting",
    description: "We translate character concepts into precise structural 3D blueprints, engineering perfect balance, optimized performer sightlines, and anatomical proportions before fabrication begins.",
    visualType: "blueprint",
  },
  {
    id: "02",
    label: "Structure",
    title: "Precision Foam Carving",
    description: "Using premium, high-density industrial foam, our master artisans hand-carve the core anatomy, sculpting custom ventilation channels and carving expressive physical traits directly into the head structure.",
    visualType: "foam-flat",
  },
  {
    id: "03",
    label: "Build",
    title: "Ergonomic Assembly",
    description: "The high-grade foam skeleton is reinforced and bonded with lightweight internal support rings, integrating our advanced Vis/Vent ventilation cooling system for maximum airflow and heat dissipation.",
    visualType: "foam-3d",
  },
  {
    id: "04",
    label: "Texture",
    title: "Premium Fabric Application",
    description: "We source and apply heavy-duty, commercial-grade athletic fabrics, custom-dyed faux furs, and wear-resistant textiles, ensuring extreme durability under intense physical performance.",
    visualType: "fabric",
  },
  {
    id: "05",
    label: "Detail",
    title: "Master Hand-Stitching",
    description: "Every seam is reinforced with high-tensile industrial stitching. Expressive physical eyes, custom details, and ergonomic harness straps are hand-crafted to secure a perfect fit for the performer.",
    visualType: "stitching",
  },
  {
    id: "06",
    label: "Finish",
    title: "The Engineered Reveal",
    description: "The high-performance physical custom mascot is complete—fully safety-tested, balanced for dynamic movements, and optimized for long-duration franchise and venue performances.",
    illustrationType: "animation"
  },
];

// Reusable SVG Illustration Components that morph based on scroll index
// Instead of separate containers, we will overlay them and control opacity/strokes via scroll progress
const SvgIllustrationEngine = ({ progress, activeDataLength }: { progress: any, activeDataLength: number }) => {
  // Helper to get active range for a stage (0-indexed)
  const getRange = (index: number) => {
    const step = 1 / activeDataLength;
    return [Math.max(0, index * step - 0.1), index * step, (index + 1) * step, Math.min(1, (index + 1) * step + 0.1)];
  };

  // Stage 0: Blueprint
  const stage0Range = getRange(0);
  const opacity0 = useTransform(progress, stage0Range, [0, 1, 1, 0]);
  const dash0 = useTransform(progress, [0, 1 / activeDataLength], [0, 1]);
  
  // Stage 1: Foam Flat
  const stage1Range = getRange(1);
  const opacity1 = useTransform(progress, stage1Range, [0, 1, 1, 0]);
  const y1 = useTransform(progress, [stage1Range[0], stage1Range[1]], [50, 0]);

  // Stage 2: Foam 3D (Assembly)
  const stage2Range = getRange(2);
  const opacity2 = useTransform(progress, stage2Range, [0, 1, 1, 0]);
  const scale2 = useTransform(progress, stage2Range, [0.8, 1, 1, 1.2]);

  // Stage 3: Fabric
  const stage3Range = getRange(3);
  const opacity3 = useTransform(progress, stage3Range, [0, 1, 1, 0]);
  const rotate3 = useTransform(progress, [stage3Range[0], stage3Range[1]], [45, 0]);

  // Stage 4: Stitching
  const stage4Range = getRange(4);
  const opacity4 = useTransform(progress, stage4Range, [0, 1, 1, 0]);
  const dash4 = useTransform(progress, [stage4Range[0], stage4Range[1]], [0, 1]);

  // Stage 5: Final
  const stage5Range = getRange(5);
  const opacity5 = useTransform(progress, [stage5Range[0], stage5Range[1]], [0, 1]); // stays 1 at end
  const scale5 = useTransform(progress, [stage5Range[0], stage5Range[1]], [0.9, 1]);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Dynamic Backgrounds that crossfade */}
      <motion.div style={{ opacity: opacity0 }} className="absolute inset-0 bg-slate-900/40" />
      <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 bg-yellow-900/20" />
      <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 bg-slate-200" />
      <motion.div style={{ opacity: opacity4, backgroundColor: 'var(--site-accent)' }} className="absolute inset-0" />
      
      {/* 01: Blueprint */}
      <motion.div style={{ opacity: opacity0 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(var(--blueprint-dot) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
         <svg viewBox="0 0 200 200" className="w-[80%] h-[80%]" style={{ filter: "drop-shadow(0 0 15px var(--site-accent-glow))" }}>
            <motion.circle cx="100" cy="100" r="70" fill="none" stroke="var(--site-accent)" strokeWidth="1" strokeDasharray="4 4" style={{ pathLength: dash0 }} />
            <motion.rect x="50" y="50" width="100" height="100" rx="30" fill="none" stroke="var(--blueprint-line)" strokeWidth="2" style={{ pathLength: dash0 }} />
            <motion.path d="M 80 130 Q 100 150 120 130" fill="none" stroke="var(--site-accent)" strokeWidth="2" style={{ pathLength: dash0 }}/>
         </svg>
      </motion.div>

      {/* 02: Foam Flat */}
      <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
        <motion.div style={{ y: y1 }} className="w-40 h-16 bg-gradient-to-br from-amber-100 to-amber-300 rounded-xl shadow-lg border-b-4 border-r-4 border-amber-400" />
        <div className="flex gap-4">
          <motion.div style={{ y: y1 }} className="w-16 h-32 bg-gradient-to-br from-amber-100 to-amber-300 rounded-3xl shadow-lg border-b-4 border-r-4 border-amber-400" />
          <motion.div style={{ y: y1, scale: scale2 }} className="w-32 h-32 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full shadow-lg border-b-8 border-r-8 border-amber-500" />
        </div>
      </motion.div>

      {/* 03: Foam 3D Assembly */}
      <motion.div style={{ opacity: opacity2 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <motion.div 
            style={{ scale: scale2 }}
            className="relative w-48 h-56 bg-gradient-to-br from-amber-200 to-amber-500 rounded-[3rem] flex items-center justify-center shadow-2xl"
         >
            <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-amber-700/30 rounded-full shadow-inner blur-[1px]" />
            <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-amber-700/30 rounded-full shadow-inner blur-[1px]" />
         </motion.div>
      </motion.div>

      {/* 04: Fabric */}
      <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/woven-light.png')] mix-blend-multiply" />
          <motion.div 
            style={{ rotate: rotate3, backgroundColor: "var(--site-accent)" }}
            className="absolute inset-0 origin-bottom-left border-8 border-blue-400/50 rounded-3xl"
          />
      </motion.div>

      {/* 05: Stitching */}
      <motion.div style={{ opacity: opacity4 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/woven-light.png')] mix-blend-multiply" />
         <svg viewBox="0 0 100 100" className="absolute w-full h-full drop-shadow-md">
            <motion.path d="M 30 10 Q 50 20 70 10" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="2 3" strokeLinecap="round" style={{ pathLength: dash4 }} />
            <motion.path d="M 20 30 C 40 50 60 50 80 30" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="2 3" strokeLinecap="round" style={{ pathLength: dash4 }} />
         </svg>
      </motion.div>

      {/* 06: Final Mascot Reveal */}
      <motion.div style={{ opacity: opacity5 }} className="absolute inset-0 pointer-events-none">
         <motion.div 
           style={{ scale: scale5, backgroundImage: "url('https://images.unsplash.com/photo-1542282811-943ef1a647d5?q=80&w=1000&auto=format&fit=crop')" }}
           className="w-full h-full bg-cover bg-center"
         >
           <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
         </motion.div>
      </motion.div>
    </div>
  );
};

export default function AnatomyOfCreation({ steps }: { steps?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressBarScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const activeData = STAGES.map((defaultStage, index) => {
    if (steps && steps[index]) {
      // Merge database step with default visualType if needed
      return {
        ...defaultStage, // fallback for visualType etc
        ...steps[index], // override with DB data (title, description, imageUrl, id)
      };
    }
    return defaultStage;
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ 
        height: `${activeData.length * 100}vh`,
        backgroundColor: "var(--site-bg-deep)", 
        color: "var(--site-text)" 
      }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">

        {/* Background Glow */}
        <div
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"
          style={{ backgroundColor: "var(--site-glow)" }}
        />

        <div className="w-full h-full max-w-7xl mx-auto flex flex-col items-start lg:items-stretch lg:justify-center relative z-10 px-6 pt-24 lg:pt-0">
          
          {/* Header Title within grid container */}
          <div className="w-full mb-12 lg:absolute lg:top-24 lg:left-6 z-50">
            <span className="t-accent-label">The JZ Method</span>
            <h2 className="t-display mt-2">The Anatomy of Creation</h2>
          </div>

          {/* Main Grid */}
          <div className="w-full lg:h-[70%] grid lg:grid-cols-2 lg:gap-16 relative">

            {/* Left: Interactive Visual Canvas */}
            <div className="relative w-full h-[35vh] lg:h-full flex items-center justify-center">
            <div
              className="w-full max-w-[500px] aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm"
              style={{
                backgroundColor: "color-mix(in srgb, var(--site-surface) 40%, transparent)",
                border: "1px solid var(--site-border)",
              }}
            >
              {/* Base SVG Animation Engine (Always mounted, crossfades internally) */}
              <SvgIllustrationEngine progress={scrollYProgress} activeDataLength={activeData.length} />

              {/* Custom Overlays for specific steps (Lottie, Video, Custom Image) */}
              <AnimatePresence>
                {activeData.map((stage: any, i: number) => {
                  const isCustom = stage.illustrationType && stage.illustrationType !== "animation";
                  if (!isCustom) return null;

                  const start = i / activeData.length;
                  const end = (i + 1) / activeData.length;
                  const opacity = useTransform(
                    scrollYProgress,
                    [start - 0.1, start, end - 0.1, end],
                    [0, 1, 1, i === activeData.length - 1 ? 1 : 0]
                  );

                  return (
                    <motion.div
                      key={`custom-${stage.id}`}
                      style={{ opacity }}
                      className="absolute inset-0 w-full h-full bg-[var(--site-surface)] z-10 flex items-center justify-center overflow-hidden"
                    >
                      {stage.illustrationType === "video" && stage.animationUrl ? (
                        <video src={stage.animationUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                      ) : stage.illustrationType === "lottie" && stage.animationUrl ? (
                         <iframe src={stage.animationUrl} className="w-full h-full border-none pointer-events-none" />
                      ) : stage.imageUrl ? (
                        <img src={stage.imageUrl} alt={stage.title} className="w-full h-full object-cover" />
                      ) : null}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Scrolling Text Content */}
          <div className="relative w-full h-[45vh] lg:h-full flex items-center pl-0 lg:pl-16">
            <div className="relative w-full">
              {activeData.map((stage: any, i: number) => {
                const start = i / activeData.length;
                const end = (i + 1) / activeData.length;

                const opacity = useTransform(
                  scrollYProgress,
                  [start - 0.05, start + 0.05, end - 0.1, end],
                  [0, 1, 1, 0]
                );
                const y = useTransform(
                  scrollYProgress,
                  [start - 0.1, start + 0.05, end - 0.1, end],
                  [50, 0, 0, -50]
                );

                return (
                  <motion.div
                    key={`text-${stage.id}`}
                    style={{ opacity, y }}
                    className={`absolute inset-0 flex flex-col justify-center ${i === 0 ? "relative" : "absolute top-0"}`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="t-step">{stage.stepNumber || stage.id}</span>
                      <span
                        className="t-accent-label py-2"
                        style={{ borderBottom: "1px solid color-mix(in srgb, var(--site-accent) 30%, transparent)" }}
                      >
                        {stage.stepNumber ? "Process Step" : stage.label}
                      </span>
                    </div>

                    <h3 className="t-heading mb-6 drop-shadow-md">{stage.title}</h3>

                    <p className="t-lead max-w-lg">
                      {stage.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        </div>

        {/* Progress Rail (Vertical) */}
        <div
          className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 h-[40vh] w-[2px] rounded-full overflow-hidden hidden md:block"
          style={{ backgroundColor: "var(--site-border)" }}
        >
          <motion.div
            className="w-full rounded-full origin-top"
            style={{ scaleY: progressBarScale, height: "100%", backgroundColor: "var(--site-accent)" }}
          />
        </div>

        {/* Step Indicators */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 h-[40vh] hidden md:flex flex-col justify-between items-end pr-4 pointer-events-none">
          {activeData.map((s: any, i: number) => {
            const start = i / activeData.length;
            const end = (i + 1) / activeData.length;
            const activeOpacity = useTransform(
              scrollYProgress,
              [start - 0.01, start, end - 0.01, end],
              [0.3, 1, 1, 0.3]
            );
            return (
              <motion.span
                key={`ind-${s.id}`}
                style={{ opacity: activeOpacity }}
                className="t-label transition-opacity duration-200"
              >
                0{i + 1}
              </motion.span>
            );
          })}
        </div>

      </div>
    </section>
  );
}

