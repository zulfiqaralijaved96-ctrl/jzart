import Link from "next/link";

export function PortfolioHero() {
  return (
    <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden site-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <span 
          className="inline-block py-1 px-3 rounded-full text-xs font-semibold tracking-wider mb-6 border"
          style={{ 
            color: "var(--site-accent-text)", 
            backgroundColor: "var(--site-accent-soft)", 
            borderColor: "var(--site-border-accent)" 
          }}
        >
          THE ARCHIVE
        </span>
        
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl"
          style={{ color: "var(--site-text-hero)", fontFamily: "var(--site-heading-font)", letterSpacing: "var(--type-hero-tracking)" }}
        >
          Characters We Brought <span style={{ color: "var(--site-accent)" }} className="font-serif italic pr-2">to Life</span>
        </h1>
        
        <p 
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--site-text-muted)" }}
        >
          Over two decades of craftsmanship, engineering, and storytelling. Explore our premium mascot portfolio curated by industry and style.
        </p>
        
        <div 
          className="flex flex-wrap justify-center gap-8 mt-4 pt-8 border-t w-full max-w-2xl"
          style={{ borderColor: "var(--site-border-strong)" }}
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold tracking-tight" style={{ color: "var(--site-text)" }}>20+</span>
            <span className="text-sm font-medium uppercase tracking-widest mt-1" style={{ color: "var(--site-text-faint)" }}>Years</span>
          </div>
          <div className="hidden md:block w-px h-12" style={{ backgroundColor: "var(--site-border)" }}></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold tracking-tight" style={{ color: "var(--site-text)" }}>500+</span>
            <span className="text-sm font-medium uppercase tracking-widest mt-1" style={{ color: "var(--site-text-faint)" }}>Projects</span>
          </div>
          <div className="hidden md:block w-px h-12" style={{ backgroundColor: "var(--site-border)" }}></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold tracking-tight" style={{ color: "var(--site-text)" }}>Global</span>
            <span className="text-sm font-medium uppercase tracking-widest mt-1" style={{ color: "var(--site-text-faint)" }}>Clients</span>
          </div>
        </div>
      </div>
      
      {/* Background abstract elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{ backgroundColor: "var(--site-accent-glow)" }}></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[50%] rounded-full blur-[100px]" style={{ backgroundColor: "var(--site-border-strong)" }}></div>
      </div>
    </section>
  );
}
