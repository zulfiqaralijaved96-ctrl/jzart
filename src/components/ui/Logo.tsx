import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Logo() {
  const settings = await prisma.siteSettings.findFirst();
  const siteName = settings?.siteName || "JZ Arts";
  const logoUrl = settings?.logoUrl || "/uploads/logo.svg";
  const logoUrlDark = settings?.logoUrlDark || "/uploads/logo-dark.svg";
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {logoUrl ? (
        <>
          {/* Light Mode Logo */}
          <img
            src={logoUrl}
            alt={`${siteName} Logo`}
            className="w-auto object-contain transition-transform duration-300 group-hover:scale-105 show-in-light"
            style={{ height: "var(--site-logo-height, 56px)" }}
          />
          {/* Dark Mode Logo (Fallback to standard if dark not provided) */}
          <img
            src={logoUrlDark || logoUrl}
            alt={`${siteName} Logo Dark`}
            className="w-auto object-contain transition-transform duration-300 group-hover:scale-105 show-in-dark"
            style={{ height: "var(--site-logo-height, 56px)" }}
          />
        </>
      ) : (
        <>
          <div
            className="rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{ 
              backgroundColor: "var(--site-accent)",
              width: "var(--site-logo-height, 56px)",
              height: "var(--site-logo-height, 56px)"
            }}
          >
            <span className="material-symbols-outlined t-white text-2xl">architecture</span>
          </div>
          <span
            className="font-black tracking-tighter uppercase ml-2"
            style={{ 
              color: "var(--site-text)",
              fontSize: "calc(var(--site-logo-height, 56px) * 0.4)"
            }}
          >
            {siteName}
          </span>
        </>
      )}
    </Link>
  );
}
