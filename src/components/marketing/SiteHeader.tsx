"use client";

import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface SiteHeaderProps {
  logo: React.ReactNode;
}

export default function SiteHeader({ logo }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300"
      style={{ backgroundColor: "var(--site-nav-bg)", borderBottom: "1px solid var(--site-border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        {logo}

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link className="nav-link" href="/#process">The Process</Link>
          <Link className="nav-link" href="/#portfolio">Portfolio</Link>
          <Link className="nav-link" href="/contact">Studio</Link>
          <Link className="btn-primary px-6 py-2.5 rounded-full" href="/contact">
            Start Your Project
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button 
            style={{ color: "var(--site-nav-text)" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined">{isMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div 
          className="md:hidden top-20 left-0 w-full shadow-lg" 
          style={{ 
            backgroundColor: "var(--site-nav-bg)", 
            borderBottom: "1px solid var(--site-border)", 
            borderTop: "1px solid var(--site-border)" 
          }}
        >
          <div className="flex flex-col p-6 gap-6">
            <Link className="nav-link text-lg font-medium" href="/#process" onClick={() => setIsMenuOpen(false)}>The Process</Link>
            <Link className="nav-link text-lg font-medium" href="/#portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
            <Link className="nav-link text-lg font-medium" href="/contact" onClick={() => setIsMenuOpen(false)}>Studio</Link>
            <Link className="btn-primary py-3 rounded-full text-center mt-2 font-bold" href="/contact" onClick={() => setIsMenuOpen(false)}>
              Start Your Project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
