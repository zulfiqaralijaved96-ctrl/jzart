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
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group relative
            ${isActive 
              ? "text-white bg-blue-600/90 shadow-md shadow-blue-900/20" 
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
        >
          <Icon size={18} className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-white"} transition-colors`} />
          <span className="text-sm">{item.label}</span>
          
          {/* Subtle accent bar on active */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 w-1 h-6 rounded-r bg-white"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </Link>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* ── MOBILE HEADER ── */}
      <header className="md:hidden h-16 w-full bg-slate-900 border-b border-slate-850 px-6 flex items-center justify-between z-40 fixed top-0 left-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
            JZ
          </div>
          <span className="text-lg font-bold text-white tracking-wide">JZ Arts CRM</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 transition-colors outline-none"
          aria-label="Toggle Navigation Drawer"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex w-64 shrink-0 h-screen sticky top-0 bg-slate-900 border-r border-slate-850 flex-col p-6 text-white justify-between">
        <div className="flex flex-col gap-8 overflow-y-auto hide-scrollbar">
          
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
              JZ
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-wide block">JZ Arts</span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block -mt-1">ADMIN PORTAL</span>
            </div>
          </div>

          {/* CRM Navigation */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">Core CRM Operations</span>
            {renderNavLinks(menuItems)}
          </div>

          {/* CMS Site Content Navigation */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">Website Settings</span>
            {renderNavLinks(cmsItems)}
          </div>

        </div>

        {/* User Profile / Logout Action */}
        <div className="pt-6 border-t border-slate-850 mt-auto">
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
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
            />
            
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-72 h-full z-50 bg-slate-900 text-white flex flex-col justify-between p-6 shadow-2xl md:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-8">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                      JZ
                    </div>
                    <div>
                      <span className="text-base font-bold text-white tracking-wide block">JZ Arts</span>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block -mt-1">ADMIN PORTAL</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* CRM Navigation */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">Core CRM Operations</span>
                  {renderNavLinks(menuItems, () => setIsMobileMenuOpen(false))}
                </div>

                {/* CMS Site Content Navigation */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">Website Settings</span>
                  {renderNavLinks(cmsItems, () => setIsMobileMenuOpen(false))}
                </div>
              </div>

              {/* User Profile / Logout Action */}
              <div className="pt-6 border-t border-slate-850 mt-8">
                {signOutButton}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN WORKSPACE CONTENT ── */}
      <main className="flex-1 w-full flex flex-col min-h-screen pt-16 md:pt-0 overflow-x-hidden">
        <div className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto flex flex-col gap-8">
          {children}
        </div>
      </main>

    </div>
  );
}
