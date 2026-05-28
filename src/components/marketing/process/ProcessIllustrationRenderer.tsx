"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

export function ProcessIllustrationRenderer({ 
  progress, 
}: { 
  progress: MotionValue<number>;
}) {
  const step = 1 / 7;
  // Use a very fast 5% transition window (5% of a step) to guarantee stages don't overlap into visual mud.
  const fade = step * 0.05; 

  // --------------------------------------------------------------------------------
  // ABSOLUTE STAGE ISOLATION
  // Each stage is a completely isolated <motion.g> layer that only exists during its step interval.
  // --------------------------------------------------------------------------------

  // STEP 0 [0 - 1/7]: Origin / Blank Canvas
  const opacity0 = useTransform(progress, [0, step - fade, step], [1, 1, 0]);
  
  // STEP 1 [1/7 - 2/7]: Drafting (Pattern Creation)
  const opacity1 = useTransform(progress, [step, step + fade, step * 2 - fade, step * 2], [0, 1, 1, 0]);
  const draw1 = useTransform(progress, [step + fade, step * 1.5], [0, 1]); // animate drawing over first half
  
  // STEP 2 [2/7 - 3/7]: Foam Cutting (Static Exploded Parts)
  // Exploded outward to prove it's cut. No movement.
  const opacity2 = useTransform(progress, [step * 2, step * 2 + fade, step * 3 - fade, step * 3], [0, 1, 1, 0]);

  // STEP 3 [3/7 - 4/7]: Foam Assembly (Parts slide together)
  const opacity3 = useTransform(progress, [step * 3, step * 3 + fade, step * 4 - fade, step * 4], [0, 1, 1, 0]);
  const slide3 = useTransform(progress, [step * 3 + fade, step * 3.3], [30, 0]); // slide inwards

  // STEP 4 [4/7 - 5/7]: Fabric Application (Unified silhouette, smooth color transition)
  const opacity4 = useTransform(progress, [step * 4, step * 4 + fade, step * 5 - fade, step * 5], [0, 1, 1, 0]);
  const color4 = useTransform(progress, [step * 4 + fade, step * 4.3], ["#e2e8f0", "#ea580c"]);

  // STEP 5 [5/7 - 6/7]: Details (Hand Stitching + Facial Features)
  const opacity5 = useTransform(progress, [step * 5, step * 5 + fade, step * 6 - fade, step * 6], [0, 1, 1, 0]);
  const draw5 = useTransform(progress, [step * 5 + fade, step * 5.3], [0, 1]);

  // STEP 6 [6/7 - 1]: Final Character Reveal
  const opacity6 = useTransform(progress, [step * 6, step * 6 + fade, 1, 1], [0, 1, 1, 1]);
  const float6 = useTransform(progress, [step * 6, 1], [0, -10]);

  // Global background
  const bg = useTransform(
    progress, 
    [0, step * 3, step * 6], 
    ["#0f0f12", "#1a1a1e", "#0f0f12"]
  );

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
      
      {/* Universal Grid (Fades out after Step 1 is done) */}
      <motion.div 
        style={{ opacity: useTransform(progress, [0, step * 2 - fade, step * 2], [0.3, 0.3, 0]) }} 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-20" 
          style={{ backgroundImage: "linear-gradient(var(--site-text) 1px, transparent 1px), linear-gradient(90deg, var(--site-text) 1px, transparent 1px)", backgroundSize: "40px 40px", backgroundPosition: "center center" }} 
        />
        <svg viewBox="0 0 400 400" className="absolute w-[120%] h-[120%] opacity-20">
          <circle cx="200" cy="200" r="140" fill="none" stroke="var(--site-text)" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="180" fill="none" stroke="var(--site-accent)" strokeWidth="0.5" />
          <line x1="200" y1="0" x2="200" y2="400" stroke="var(--site-text)" strokeWidth="1" strokeDasharray="2 10" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="var(--site-text)" strokeWidth="1" strokeDasharray="2 10" />
        </svg>
      </motion.div>

      {/* MASTER CANVAS coordinates: Head centered around (100, 140) */}
      <svg viewBox="0 0 200 240" className="w-full h-full p-4 sm:p-6 lg:p-8 drop-shadow-2xl z-10 overflow-visible">
        
        {/* =========================================
            STEP 0: INTRO - THE BLANK CANVAS (Detailed Blueprint)
            ========================================= */}
        <motion.g style={{ opacity: opacity0 }}>
          {/* Detailed grid block base for the workspace */}
          <rect x="25" y="40" width="150" height="180" fill="none" stroke="var(--site-text)" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.3" />
          <line x1="25" y1="130" x2="175" y2="130" stroke="var(--site-text)" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.3" />
          <line x1="100" y1="40" x2="100" y2="220" stroke="var(--site-text)" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.3" />

          {/* Faint skull outlie */}
          <path d="M 50 140 C 50 80, 150 80, 150 140 C 150 190, 120 205, 100 205 C 80 205, 50 190, 50 140 Z" fill="color-mix(in srgb, var(--site-text) 5%, transparent)" stroke="var(--site-text)" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />
          {/* Faint ears */}
          <circle cx="55" cy="80" r="24" fill="none" stroke="var(--site-text)" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />
          <circle cx="145" cy="80" r="24" fill="none" stroke="var(--site-text)" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />
          
           {/* Center target lock */}
           <circle cx="100" cy="140" r="10" fill="none" stroke="var(--site-text)" strokeWidth="0.5" opacity="0.5" />
           <circle cx="100" cy="140" r="2" fill="var(--site-text)" opacity="0.5" />
        </motion.g>

        {/* =========================================
            STEP 1: PATTERN CREATION (Drafting lines)
            ========================================= */}
        <motion.g style={{ opacity: opacity1 }}>
           <motion.path 
            d="M 50 140 C 50 80, 150 80, 150 140 C 150 190, 120 205, 100 205 C 80 205, 50 190, 50 140 Z" 
            fill="none" stroke="var(--site-accent)" strokeWidth="2" strokeLinecap="round" style={{ pathLength: draw1 }}
           />
           <motion.circle cx="55" cy="80" r="24" fill="none" stroke="var(--site-accent)" strokeWidth="1.5" style={{ pathLength: draw1 }} />
           <motion.circle cx="145" cy="80" r="24" fill="none" stroke="var(--site-accent)" strokeWidth="1.5" style={{ pathLength: draw1 }} />
           
           <motion.circle cx="100" cy="160" r="28" fill="none" stroke="#60a5fa" strokeOpacity={0.8} strokeWidth="1" style={{ pathLength: draw1 }} />
           <motion.line x1="45" y1="140" x2="155" y2="140" stroke="#60a5fa" strokeDasharray="4 4" style={{ pathLength: draw1 }} />
           <motion.line x1="100" y1="60" x2="100" y2="205" stroke="#60a5fa" strokeDasharray="4 4" style={{ pathLength: draw1 }} />
           
           <motion.rect x="96" y="56" width="8" height="8" fill="none" stroke="var(--site-accent)" strokeWidth="1.5" style={{ scale: draw1 }} />
           <motion.circle cx="75" cy="130" r="4" fill="none" stroke="var(--site-accent)" strokeWidth="2" style={{ scale: draw1 }} />
           <motion.circle cx="125" cy="130" r="4" fill="none" stroke="var(--site-accent)" strokeWidth="2" style={{ scale: draw1 }} />
        </motion.g>

        {/* =========================================
            STEP 2: FOAM CUTTING (Exploded Static Parts)
            ========================================= */}
        <motion.g style={{ opacity: opacity2 }}>
          {/* Left Block (X shifted out aggressively) */}
          <g transform="translate(-40, 0)">
            <circle cx="55" cy="80" r="24" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
            <path d="M 100 85 C 70 80, 50 100, 50 140 C 50 190, 80 205, 100 205 L 100 85 Z" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" strokeLinejoin="round" />
          </g>
          {/* Right Block (X shifted out aggressively) */}
          <g transform="translate(40, 0)">
            <circle cx="145" cy="80" r="24" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
            <path d="M 100 85 C 130 80, 150 100, 150 140 C 150 190, 120 205, 100 205 L 100 85 Z" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" strokeLinejoin="round" />
          </g>
          {/* Muzzle (Y shifted down aggressively) */}
          <g transform="translate(0, 30)">
            <path d="M 72 155 C 72 135, 128 135, 128 155 C 128 185, 112 195, 100 195 C 88 195, 72 185, 72 155 Z" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" strokeLinejoin="round" />
          </g>
        </motion.g>

        {/* =========================================
            STEP 3: FOAM ASSEMBLY (Parts Slide To Center)
            ========================================= */}
        <motion.g style={{ opacity: opacity3 }}>
          <motion.g style={{ x: useTransform(slide3, s => -s) }}>
            <circle cx="55" cy="80" r="24" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
            <path d="M 100 85 C 70 80, 50 100, 50 140 C 50 190, 80 205, 100 205 L 100 85 Z" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" strokeLinejoin="round" className="drop-shadow-sm" />
          </motion.g>
          <motion.g style={{ x: slide3 }}>
            <circle cx="145" cy="80" r="24" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
            <path d="M 100 85 C 130 80, 150 100, 150 140 C 150 190, 120 205, 100 205 L 100 85 Z" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" strokeLinejoin="round" className="drop-shadow-sm" />
          </motion.g>
          <motion.g style={{ y: useTransform(slide3, s => s * 0.75) }}>
            <path d="M 72 155 C 72 135, 128 135, 128 155 C 128 185, 112 195, 100 195 C 88 195, 72 185, 72 155 Z" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" strokeLinejoin="round" style={{ filter: "drop-shadow(0px 8px 10px rgba(0,0,0,0.25))" }} />
          </motion.g>
        </motion.g>

        {/* =========================================
            STEP 4: FABRIC APPLICATION (Seamless silhouette)
            ========================================= */}
        <motion.g style={{ opacity: opacity4 }}>
           <defs>
             <pattern id="felt-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
               <circle cx="2" cy="2" r="1.5" fill="black" opacity="0.04" />
               <circle cx="7" cy="7" r="1.5" fill="black" opacity="0.04" />
               <path d="M 0 10 L 10 0" stroke="black" strokeWidth="0.5" opacity="0.02" />
             </pattern>
           </defs>
           
           <motion.g style={{ filter: "drop-shadow(0px 15px 25px rgba(0,0,0,0.15))" }}>
             <motion.circle cx="55" cy="80" r="24" style={{ fill: color4 }} />
             <motion.circle cx="145" cy="80" r="24" style={{ fill: color4 }} />
             <motion.path d="M 50 140 C 50 83, 150 83, 150 140 C 150 190, 120 205, 100 205 C 80 205, 50 190, 50 140 Z" style={{ fill: color4 }} />
             <motion.path d="M 72 155 C 72 135, 128 135, 128 155 C 128 185, 112 195, 100 195 C 88 195, 72 185, 72 155 Z" fill="rgba(255,255,255,0.75)" />
             
             {/* Texture overlays */}
             <circle cx="55" cy="80" r="24" fill="url(#felt-pattern)" />
             <circle cx="145" cy="80" r="24" fill="url(#felt-pattern)" />
             <path d="M 50 140 C 50 83, 150 83, 150 140 C 150 190, 120 205, 100 205 C 80 205, 50 190, 50 140 Z" fill="url(#felt-pattern)" />
           </motion.g>
        </motion.g>

        {/* =========================================
            STEP 5: STITCHING & CRAFT DETAILS
            ========================================= */}
        <motion.g style={{ opacity: opacity5 }}>
           {/* Static Fabric Base (copied from Step 4, fully colored) */}
           <motion.g style={{ filter: "drop-shadow(0px 15px 25px rgba(0,0,0,0.15))" }}>
             <circle cx="55" cy="80" r="24" fill="var(--site-accent)" />
             <circle cx="145" cy="80" r="24" fill="var(--site-accent)" />
             <path d="M 50 140 C 50 83, 150 83, 150 140 C 150 190, 120 205, 100 205 C 80 205, 50 190, 50 140 Z" fill="var(--site-accent)" />
             <path d="M 72 155 C 72 135, 128 135, 128 155 C 128 185, 112 195, 100 195 C 88 195, 72 185, 72 155 Z" fill="rgba(255,255,255,0.75)" />
           </motion.g>

           {/* Animated Stitching */}
           <motion.line x1="100" y1="85" x2="100" y2="140" stroke="white" strokeWidth="1.5" strokeDasharray="3 5" style={{ pathLength: draw5 }} />
           <motion.path d="M 75 155 C 75 140, 125 140, 125 155" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="3 5" style={{ pathLength: draw5 }} />
           
           {/* Animated Features */}
           <motion.g style={{ scale: draw5, transformOrigin: "100px 130px" }}>
             <circle cx="75" cy="130" r="10" fill="#1e293b" />
             <circle cx="72" cy="127" r="3" fill="white" opacity="0.9" />
             <circle cx="125" cy="130" r="10" fill="#1e293b" />
             <circle cx="122" cy="127" r="3" fill="white" opacity="0.9" />
             <path d="M 90 152 Q 100 146 110 152 L 105 162 Q 100 166 95 162 Z" fill="#0f172a" />
             <path d="M 95 154 Q 100 151 105 154 L 103 158 Q 100 160 97 158 Z" fill="white" opacity="0.4" />
             <circle cx="55" cy="80" r="12" fill="color-mix(in srgb, var(--site-bg-alt) 70%, transparent)" />
             <circle cx="145" cy="80" r="12" fill="color-mix(in srgb, var(--site-bg-alt) 70%, transparent)" />
           </motion.g>
        </motion.g>

        {/* =========================================
            STEP 6: FINAL CHARACTER (Living Mascot / High Polish)
            ========================================= */}
        <motion.g style={{ opacity: opacity6, y: float6, transformOrigin: "100px 140px" }}>
          
          <defs>
            {/* Soft global ambient light gradient to make the shape look 3D */}
            <radialGradient id="rim-light" cx="30%" cy="20%" r="90%">
               <stop offset="0%" stopColor="white" stopOpacity="0.45" />
               <stop offset="50%" stopColor="transparent" stopOpacity="0" />
               <stop offset="100%" stopColor="black" stopOpacity="0.65" />
            </radialGradient>
            
            {/* Eye reflection glint */}
            <linearGradient id="eye-glint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="50%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            
            <filter id="inner-shadow">
               <feOffset dx="0" dy="8"/>
               <feGaussianBlur stdDeviation="6" result="offset-blur"/>
               <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
               <feFlood floodColor="black" floodOpacity="0.6" result="color"/>
               <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
               <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
            </filter>
          </defs>

          {/* Core Shape + Base Texture Overlay */}
          <motion.g style={{ filter: "drop-shadow(0px 30px 40px rgba(0,0,0,0.35))" }}>
            {/* Outer Silhouette */}
            <circle cx="55" cy="80" r="24" fill="var(--site-accent)" />
            <circle cx="145" cy="80" r="24" fill="var(--site-accent)" />
            <path d="M 50 140 C 50 83, 150 83, 150 140 C 150 190, 120 205, 100 205 C 80 205, 50 190, 50 140 Z" fill="var(--site-accent)" />
            <path d="M 72 155 C 72 135, 128 135, 128 155 C 128 185, 112 195, 100 195 C 88 195, 72 185, 72 155 Z" fill="rgba(255,255,255,0.85)" />
            
            {/* Deep 3D Sphere Shading overlays */}
            <circle cx="55" cy="80" r="24" fill="url(#rim-light)" style={{ mixBlendMode: "overlay" }} />
            <circle cx="145" cy="80" r="24" fill="url(#rim-light)" style={{ mixBlendMode: "overlay" }} />
            <path d="M 50 140 C 50 83, 150 83, 150 140 C 150 190, 120 205, 100 205 C 80 205, 50 190, 50 140 Z" fill="url(#rim-light)" style={{ mixBlendMode: "overlay" }} />
            <path d="M 72 155 C 72 135, 128 135, 128 155 C 128 185, 112 195, 100 195 C 88 195, 72 185, 72 155 Z" fill="url(#rim-light)" style={{ mixBlendMode: "overlay" }} />
            
            {/* Crisp outer rim highlight to emulate studio backlighting */}
            <path d="M 50 140 C 50 83, 150 83, 150 140 C 150 190, 120 205, 100 205 C 80 205, 50 190, 50 140 Z" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" style={{ mixBlendMode: 'overlay', filter: 'blur(1px)' }} />
          </motion.g>

          {/* Premium Completed Facial Features */}
          <g>
             {/* Dynamic Eyes with glossy reflections */}
             <circle cx="75" cy="130" r="11" fill="#0f172a" style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.5))" }} />
             <circle cx="75" cy="130" r="11" fill="url(#eye-glint)" />
             <circle cx="71" cy="126" r="4" fill="white" opacity="0.95" /> 
             <circle cx="80" cy="134" r="1.5" fill="white" opacity="0.6" /> 
             
             <circle cx="125" cy="130" r="11" fill="#0f172a" style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.5))" }} />
             <circle cx="125" cy="130" r="11" fill="url(#eye-glint)" />
             <circle cx="121" cy="126" r="4" fill="white" opacity="0.95" />
             <circle cx="130" cy="134" r="1.5" fill="white" opacity="0.6" />
             
             {/* Premium 3D Nose */}
             <path d="M 88 152 Q 100 145 112 152 L 106 163 Q 100 167 94 163 Z" fill="#020617" style={{ filter: "drop-shadow(0px 6px 8px rgba(0,0,0,0.3))" }} />
             <path d="M 94 154 Q 100 151 106 154 L 103 158 Q 100 160 97 158 Z" fill="white" opacity="0.7" style={{ filter: "blur(0.5px)" }} />
             
             {/* Proper Inner Ears with plush depth shadowing */}
             <circle cx="55" cy="80" r="14" fill="color-mix(in srgb, var(--site-bg-alt) 85%, transparent)" filter="url(#inner-shadow)" />
             <path d="M 46 80 Q 55 68 64 80" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
             
             <circle cx="145" cy="80" r="14" fill="color-mix(in srgb, var(--site-bg-alt) 85%, transparent)" filter="url(#inner-shadow)" />
             <path d="M 136 80 Q 145 68 154 80" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
             
             {/* Friendly, resolved character smile */}
             <path d="M 82 174 Q 100 188 118 174" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" style={{ filter: "drop-shadow(0px 2px 2px rgba(255,255,255,0.3))" }} />
             <path d="M 100 163 L 100 174" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          </g>
        </motion.g>

      </svg>
      
      {/* Dynamic Floor Shadow beneath Final Character */}
      <motion.div 
        className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-black/50 blur-2xl rounded-[100%] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: useTransform(progress, [step * 6, step * 6 + fade, 1, 1], [0, 1, 1, 1]) }}
      />

    </div>
  );
}
