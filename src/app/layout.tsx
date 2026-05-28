import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "JZ Arts - High-End Custom Mascot Costume Manufacturing",
  description: "Exquisite custom physical mascot costumes engineered with high-grade foam cores, advanced performer cooling, and ergonomic visibility. Built for brands, schools, sports franchises, malls, restaurants, and entertainment venues.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch global settings once per request
  const settings = await prisma.siteSettings.findFirst();
  const primaryColor = settings?.primaryColor || "#ea580c"; // new orange

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap"
          rel="stylesheet"
        />
        {/* Dynamic Theme Color Injection */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --site-accent: ${primaryColor};
              --site-accent-text: ${primaryColor};
            }
            [data-theme="light"] {
              --site-accent: ${primaryColor};
              --site-accent-text: ${primaryColor};
            }
          `
        }} />
        {/* No-flash theme script: reads localStorage before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('jzarts-theme');
                  var theme = (saved === 'light' || saved === 'dark') ? saved : 'dark';
                  document.documentElement.dataset.theme = theme;
                  localStorage.setItem('jzarts-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
