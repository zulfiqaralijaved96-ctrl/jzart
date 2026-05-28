import React from "react";
import { Image as ImageIcon } from "lucide-react";

interface BrandedImagePlaceholderProps {
  className?: string;
  text?: string;
}

export function BrandedImagePlaceholder({ 
  className = "", 
  text = "Mascot Project Image Coming Soon" 
}: BrandedImagePlaceholderProps) {
  return (
    <div 
      className={`relative flex flex-col items-center justify-center w-full h-full p-6 text-center overflow-hidden ${className}`}
      style={{ 
        backgroundColor: "var(--site-surface)", 
        border: "1px dashed var(--site-border-accent)",
      }}
    >
      {/* Subtle Glow Background */}
      <div 
        className="absolute inset-0 opacity-10 blur-2xl pointer-events-none"
        style={{ backgroundColor: "var(--site-accent)" }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 opacity-70">
        <div 
          className="p-3 rounded-full"
          style={{ backgroundColor: "var(--site-bg-alt)" }}
        >
          <ImageIcon className="w-6 h-6" style={{ color: "var(--site-accent)" }} />
        </div>
        
        <p className="t-small font-medium tracking-wide">
          {text}
        </p>
      </div>
    </div>
  );
}
