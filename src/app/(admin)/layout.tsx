import React from "react";
import Link from "next/link";
import SignOutButton from "@/components/admin/SignOutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-4">
        <div className="text-2xl font-bold mb-8">JZ Arts CRM</div>
        <Link href="/dashboard" className="opacity-80 hover:opacity-100 transition-opacity">Dashboard</Link>
        <Link href="/leads" className="opacity-80 hover:opacity-100 transition-opacity">Leads</Link>
        <Link href="/clients" className="opacity-80 hover:opacity-100 transition-opacity">Clients</Link>
        <Link href="/quotes" className="opacity-80 hover:opacity-100 transition-opacity">Quotes</Link>
        <Link href="/projects" className="opacity-80 hover:opacity-100 transition-opacity mb-4">Projects</Link>
        
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-4 mb-2">CMS</div>
        <Link href="/dashboard/brand-settings" className="opacity-80 hover:opacity-100 transition-opacity text-blue-300">Brand Settings</Link>
        <Link href="/dashboard/site-content" className="opacity-80 hover:opacity-100 transition-opacity text-blue-300">Site Content</Link>
        <Link href="/dashboard/portfolio" className="opacity-80 hover:opacity-100 transition-opacity text-blue-300">Portfolio</Link>
        <Link href="/dashboard/process" className="opacity-80 hover:opacity-100 transition-opacity text-blue-300">Process Steps</Link>
        <Link href="/dashboard/logos" className="opacity-80 hover:opacity-100 transition-opacity text-blue-300">Partner Logos</Link>
        <SignOutButton />
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
