"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  Layers, 
  Settings, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  Route, 
  Award, 
  Menu, 
  X 
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  signOutButton: React.ReactNode;
}

export default function AdminLayoutWrapper({ children, signOutButton }: AdminLayoutWrapperProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Leads", href: "/leads", icon: Users },
    { label: "Clients", href: "/clients", icon: Briefcase },
    { label: "Quotes", href: "/quotes", icon: FileText },
    { label: "Projects", href: "/projects", icon: Layers },
  ];

  const cmsItems = [
    { label: "Brand Settings", href: "/dashboard/brand-settings", icon: Settings },
    { label: "Site Content", href: "/dashboard/site-content", icon: FileSpreadsheet },
    { label: "Portfolio", href: "/dashboard/portfolio", icon: ImageIcon },
    { label: "Process Steps", href: "/dashboard/process", icon: Route },
    { label: "Partner Logos", href: "/dashboard/logos", icon: Award },
  ];

  const renderNavLinks = (items: typeof menuItems, onClick?: () => void) => {
    return items.map((item) => {
      const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
      const Icon = item.icon;
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClick}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 group relative
            ${isActive 
              ? "sidebar-active-link" 
              : "sidebar-inactive-link"
            }`}
        >
          <Icon size={18} className={`shrink-0 transition-colors ${isActive ? "text-white" : "opacity-60 group-hover:opacity-100"}`} />
          <span className="text-sm">{item.label}</span>
          
          {/* Active accent bar */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 w-1 h-5 rounded-r"
              style={{ backgroundColor: "var(--site-accent, #ea580c)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </Link>
      );
    });
  };

  return (
    <div className="admin-shell min-h-screen flex flex-col md:flex-row">
      
      {/* ── MOBILE HEADER ── */}
      <header className="md:hidden h-16 w-full admin-sidebar-bg border-b admin-border px-5 flex items-center justify-between z-40 fixed top-0 left-0 shadow-lg">
        <Link href="/dashboard" className="flex items-center gap-3">
          <img 
            src="/uploads/logo-dark.svg" 
            alt="JZ Arts" 
            className="h-8 w-auto object-contain"
            onError={(e) => { (e.target as HTMLImageElement).src = "/uploads/logo.svg"; }}
          />
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg admin-toggle-btn transition-colors outline-none"
          aria-label="Toggle Navigation Drawer"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex w-[260px] shrink-0 h-screen sticky top-0 admin-sidebar-bg border-r admin-border flex-col justify-between overflow-hidden">
        <div className="flex flex-col gap-6 overflow-y-auto hide-scrollbar p-5 pt-6 pb-4">
          
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 px-1 mb-2 group" target="_blank">
            <img 
              src="/uploads/logo-dark.svg" 
              alt="JZ Arts" 
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => { (e.target as HTMLImageElement).src = "/uploads/logo.svg"; }}
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest admin-label-accent">Admin Portal</span>
            </div>
          </Link>

          {/* CRM Navigation */}
          <div className="flex flex-col gap-1">
            <span className="admin-section-label px-4 mb-1.5">CRM Operations</span>
            {renderNavLinks(menuItems)}
          </div>

          {/* CMS Site Content Navigation */}
          <div className="flex flex-col gap-1">
            <span className="admin-section-label px-4 mb-1.5">Website Settings</span>
            {renderNavLinks(cmsItems)}
          </div>

        </div>

        {/* User Profile / Logout Action */}
        <div className="p-5 pt-4 border-t admin-border mt-auto shrink-0">
          {signOutButton}
        </div>
      </aside>

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />
            
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-72 h-full z-50 admin-sidebar-bg flex flex-col justify-between shadow-2xl md:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-6 p-5">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-3" target="_blank">
                    <img 
                      src="/uploads/logo-dark.svg" 
                      alt="JZ Arts" 
                      className="h-8 w-auto object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/uploads/logo.svg"; }}
                    />
                  </Link>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg admin-toggle-btn"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* CRM Navigation */}
                <div className="flex flex-col gap-1">
                  <span className="admin-section-label px-4 mb-1.5">CRM Operations</span>
                  {renderNavLinks(menuItems, () => setIsMobileMenuOpen(false))}
                </div>

                {/* CMS Site Content Navigation */}
                <div className="flex flex-col gap-1">
                  <span className="admin-section-label px-4 mb-1.5">Website Settings</span>
                  {renderNavLinks(cmsItems, () => setIsMobileMenuOpen(false))}
                </div>
              </div>

              {/* User Profile / Logout Action */}
              <div className="p-5 pt-4 border-t admin-border mt-8 shrink-0">
                {signOutButton}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN WORKSPACE CONTENT ── */}
      <main className="flex-1 w-full flex flex-col min-h-screen pt-16 md:pt-0 overflow-x-hidden admin-main-bg">
        <div className="flex-1 p-5 md:p-8 lg:p-10 max-w-7xl w-full mx-auto flex flex-col gap-6">
          {children}
        </div>
      </main>

    </div>
  );
}
