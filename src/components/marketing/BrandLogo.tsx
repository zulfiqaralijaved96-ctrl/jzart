"use client";

import React from "react";

interface BrandLogoProps {
  name: string;
  className?: string;
}

export default function BrandLogo({ name, className = "" }: BrandLogoProps) {
  const normName = name.toLowerCase().replace(/['’]/g, "").trim();

  // Unified viewBox "0 0 160 50" for clean consistent alignment and zero distortion
  switch (normName) {
    case "knorr":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5 C30 2, 70 2, 90 5 C110 8, 140 12, 150 25 C140 38, 110 42, 90 45 C70 48, 30 48, 10 45 Z" fill="#16a34a" />
          <path d="M25 8 C30 6, 70 6, 85 8" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          <text x="80" y="32" fontFamily="'Playfair Display', Georgia, serif" fontSize="20" fontWeight="bold" fontStyle="italic" fill="#ffffff" textAnchor="middle">Knorr</text>
        </svg>
      );
    case "walls":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Walls Interlocking Hearts */}
          <path d="M15 25 C5 12, 22 5, 27 15 C32 5, 49 12, 39 25 L27 37 Z" fill="#dc2626" />
          <path d="M22 23 C15 15, 27 10, 30 17 C33 10, 45 15, 38 23 L30 31 Z" fill="#ffffff" />
          <text x="50" y="32" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="900" fill="#dc2626">Wall's</text>
        </svg>
      );
    case "surfexcel":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Surf Excel Splat */}
          <circle cx="25" cy="25" r="10" fill="#f97316" />
          <path d="M25 15 L25 5 M25 35 L25 45 M15 25 L5 25 M35 25 L45 25 M18 18 L10 10 M32 32 L40 40 M32 18 L40 10 M18 32 L10 40" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
          <text x="50" y="27" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="900" fill="#2563eb">Surf</text>
          <text x="50" y="42" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="800" fill="#f97316">excel</text>
        </svg>
      );
    case "lu":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Biscuit scalloped border */}
          <rect x="35" y="8" width="90" height="34" rx="4" fill="#dc2626" />
          <rect x="39" y="12" width="82" height="26" rx="2" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="80" y="32" fontFamily="'Times New Roman', Times, serif" fontSize="22" fontWeight="bold" fill="#ffffff" textAnchor="middle" letterSpacing="4">LU</text>
        </svg>
      );
    case "rio":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="25" r="16" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
          <circle cx="30" cy="25" r="10" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
          <text x="56" y="34" fontFamily="system-ui, sans-serif" fontSize="28" fontWeight="900" fill="#2563eb" letterSpacing="1">RIO</text>
        </svg>
      );
    case "lifebuoy":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="25" r="18" fill="#dc2626" />
          <rect x="23" y="13" width="10" height="24" fill="#ffffff" />
          <rect x="16" y="20" width="24" height="10" fill="#ffffff" />
          <text x="56" y="33" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="900" fill="#dc2626" letterSpacing="-0.5">Lifebuoy</text>
        </svg>
      );
    case "tapal":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="8" width="130" height="34" fill="#b91c1c" rx="4" />
          <text x="80" y="33" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fontStyle="italic" fill="#ffffff" textAnchor="middle">Tapal</text>
        </svg>
      );
    case "lipton":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="18" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
          <rect x="15" y="18" width="55" height="14" fill="#dc2626" rx="2" transform="rotate(-5 42 25)" />
          <text x="42" y="29" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="900" fill="#ffffff" textAnchor="middle" transform="rotate(-5 42 25)">Lipton</text>
          <text x="78" y="33" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="800" fill="#ca8a04">Lipton</text>
        </svg>
      );
    case "dalda":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 30 Q 30 10 40 30" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="30" cy="18" r="4" fill="#eab308" />
          <text x="50" y="33" fontFamily="Georgia, serif" fontSize="22" fontWeight="black" fill="#16a34a">Dalda</text>
        </svg>
      );
    case "nestle":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bird Nest Nestlé icon */}
          <path d="M10 32 C15 32, 20 28, 25 32 C30 36, 12 36, 10 32 Z" fill="#475569" />
          <path d="M14 26 C15 23, 18 23, 19 26" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M21 26 C22 23, 25 23, 26 26" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
          <text x="35" y="33" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="#475569" letterSpacing="0.5">Nestlé</text>
        </svg>
      );
    case "pepsi":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pepsi globe */}
          <circle cx="28" cy="25" r="18" fill="#1e3a8a" />
          <path d="M12 21 C20 18, 36 32, 44 29 A18 18 0 0 0 12 21 Z" fill="#ffffff" />
          <path d="M12 21 C20 18, 36 32, 44 29 A18 18 0 0 1 12 21 Z" fill="#dc2626" />
          <text x="56" y="34" fontFamily="system-ui, sans-serif" fontSize="24" fontWeight="bold" fill="#1e3a8a" fontStyle="italic">pepsi</text>
        </svg>
      );
    case "cocacola":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cursive Coca-Cola signature script style representation */}
          <text x="80" y="34" fontFamily="'Playfair Display', Georgia, serif" fontSize="25" fontWeight="900" fontStyle="italic" fill="#dc2626" textAnchor="middle" letterSpacing="-1">Coca-Cola</text>
        </svg>
      );
    case "nationalfoods":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 25 Q 25 10 40 25 Q 25 40 10 25 Z" fill="#15803d" />
          <circle cx="25" cy="25" r="6" fill="#dc2626" />
          <text x="48" y="33" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="800" fill="#15803d">National</text>
        </svg>
      );
    case "shanfoods":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="8" width="34" height="34" fill="#dc2626" rx="4" />
          <path d="M 38 18 A 8 8 0 1 0 38 32 A 6 6 0 1 1 38 18 Z" fill="#ffffff" />
          <text x="58" y="33" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="#dc2626" letterSpacing="0.5">Shan</text>
        </svg>
      );
    case "candyland":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="25" r="10" fill="#ec4899" />
          <path d="M 20 25 L 20 40" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
          <path d="M 14 20 A 4 4 0 1 1 26 20" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <text x="36" y="33" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="900" fill="#ec4899" letterSpacing="-0.5">Candyland</text>
        </svg>
      );
    case "hilal":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 12 25 A 12 12 0 1 0 36 25 A 10 10 0 1 1 12 25 Z" fill="#2563eb" />
          <polygon points="34,16 36,22 42,22 37,25 39,31 34,27 29,31 31,25 26,22 32,22" fill="#fbbf24" />
          <text x="48" y="33" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="#2563eb">Hilal</text>
        </svg>
      );
    case "peekfreans":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12 L18 10 L24 15 L20 20 L12 12" fill="#b91c1c" />
          <text x="30" y="27" fontFamily="Georgia, serif" fontSize="15" fontWeight="900" fill="#b91c1c" letterSpacing="-0.5">Peek</text>
          <text x="30" y="41" fontFamily="Georgia, serif" fontSize="15" fontWeight="900" fill="#b91c1c" letterSpacing="-0.5">Freans</text>
        </svg>
      );
    case "colgate":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="140" height="30" fill="#dc2626" rx="4" />
          <text x="80" y="31" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="900" fontStyle="italic" fill="#ffffff" textAnchor="middle">Colgate</text>
        </svg>
      );
    case "dettol":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="25" r="16" fill="#16a34a" stroke="#ffffff" strokeWidth="1.5" />
          <rect x="25" y="14" width="6" height="22" fill="#ffffff" />
          <rect x="17" y="22" width="22" height="6" fill="#ffffff" />
          <text x="52" y="33" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="800" fill="#16a34a">Dettol</text>
        </svg>
      );
    case "ariel":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="25" cy="25" rx="16" ry="6" stroke="#16a34a" strokeWidth="2" fill="none" transform="rotate(30 25 25)" />
          <ellipse cx="25" cy="25" rx="16" ry="6" stroke="#16a34a" strokeWidth="2" fill="none" transform="rotate(-30 25 25)" />
          <circle cx="25" cy="25" r="5" fill="#dc2626" />
          <text x="48" y="33" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="900" fill="#16a34a" letterSpacing="-0.5">ARIEL</text>
        </svg>
      );
    case "sunsilk":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 12 12 Q 22 25 12 38" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" fill="none" />
          <text x="24" y="32" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="#000000" letterSpacing="-0.5" className="dark:fill-white">Sunsilk</text>
        </svg>
      );
    case "closeup":
      return (
        <svg viewBox="0 0 160 50" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="140" height="30" fill="#dc2626" rx="2" />
          <text x="80" y="31" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">CLOSEUP</text>
        </svg>
      );
    default:
      return (
        <div className={`w-full h-full flex items-center justify-center font-sans font-bold text-sm tracking-widest text-center px-4 ${className}`}
          style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)", color: "var(--site-text-muted)" }}>
          {name.toUpperCase()}
        </div>
      );
  }
}
