import React from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import SiteHeader from "@/components/marketing/SiteHeader";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.siteSettings.findFirst();
  const logoHeight = settings?.logoHeight || 56;

  return (
    <div className="site-page flex flex-col min-h-screen" style={{ "--site-logo-height": `${logoHeight}px` } as React.CSSProperties}>

      {/* ── Navbar ── */}
      <SiteHeader logo={<Logo />} />

      {/* ── Page Content ── */}
      <main className="flex-1 w-full flex flex-col pt-0">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-20"
        style={{ backgroundColor: "var(--site-bg-deep)", borderTop: "1px solid var(--site-border)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">

            {/* Brand */}
            <div className="col-span-2">
              <div className="mb-6">
                <Logo />
              </div>
              <p className="t-body max-w-sm">
                Masters of mascot craftsmanship since 2004. We blend traditional techniques with modern materials to create the world&apos;s most recognizable characters.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h5 className="t-subheading mb-6">Explore</h5>
              <ul className="space-y-4">
                {[
                  { label: "Our Studio",              href: "/studio" },
                  { label: "Manufacturing Process",   href: "/#process" },
                  { label: "Character Portfolio",     href: "/portfolio" },
                  { label: "Contact Us",              href: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="t-subheading mb-6">Contact</h5>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 t-body">
                  <span className="material-symbols-outlined text-base t-accent">mail</span>
                  info@jzarts.com
                </li>
                <li className="flex items-center gap-2 t-body">
                  <span className="material-symbols-outlined text-base t-accent">location_on</span>
                  Manila, Philippines
                </li>
              </ul>
              <div className="flex gap-4 mt-8">
                {["share", "videocam"].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="hover-accent-bg w-10 h-10 rounded-full flex items-center justify-center t-white"
                  >
                    <span className="material-symbols-outlined text-xl">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: "1px solid var(--site-border)" }}
          >
            <p className="t-label">© {new Date().getFullYear()} JZ Arts Manufacturing. All Rights Reserved.</p>
            <div className="flex gap-8">
              {["Privacy Policy", "Terms of Service"].map((label) => (
                <a key={label} href="#" className="hover-text t-label">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
