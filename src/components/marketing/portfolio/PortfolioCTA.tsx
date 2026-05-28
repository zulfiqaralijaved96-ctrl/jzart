"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function PortfolioCTA() {
  return (
    <section className="relative w-full py-32 overflow-hidden text-center transition-colors" style={{ backgroundColor: "var(--site-bg-deep)" }}>
      <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span 
            className="inline-block py-1 px-3 rounded-full text-xs font-semibold tracking-wider mb-6 border"
            style={{ 
              color: "var(--site-accent-text)", 
              backgroundColor: "var(--site-accent-soft)", 
              borderColor: "var(--site-border-accent)" 
            }}
          >
            NEXT STEPS
          </span>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" style={{ color: "var(--site-text-hero)" }}>
            Ready to <span className="font-serif italic mr-2" style={{ color: "var(--site-accent)" }}>Create</span> Your Mascot?
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
            Bring your brand's personality into the physical world. Request a quote or schedule a consultation with our master craftspeople today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 btn-primary rounded-full transition-all hover:scale-105"
            >
              Get a Free Quote
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[150px]" style={{ backgroundColor: "var(--site-accent-glow)" }}></div>
      </div>
    </section>
  );
}
