import React from "react";
import prisma from "@/lib/prisma";
import SeedButton from "@/components/admin/SeedButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const totalLeads = await prisma.lead.count();
  const activeProjects = await prisma.project.count({
    where: { NOT: { status: "COMPLETED" } }
  });
  const pendingQuotes = await prisma.quote.count({
    where: { status: "SENT" }
  });
  const totalClients = await prisma.client.count();

  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });

  const stats = [
    { label: "Total Leads", value: totalLeads, icon: "group", color: "bg-amber-50 text-amber-600 border-amber-200", href: "/leads" },
    { label: "Active Projects", value: activeProjects, icon: "engineering", color: "bg-blue-50 text-blue-600 border-blue-200", href: "/projects" },
    { label: "Pending Quotes", value: pendingQuotes, icon: "request_quote", color: "bg-purple-50 text-purple-600 border-purple-200", href: "/quotes" },
    { label: "Client Accounts", value: totalClients, icon: "business", color: "bg-emerald-50 text-emerald-600 border-emerald-200", href: "/clients" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of your mascot manufacturing operations.</p>
        </div>
        <SeedButton />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${stat.color}`}>
                <span className="material-symbols-outlined text-xl">{stat.icon}</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                <div className="text-2xl font-black mt-0.5 text-slate-800 group-hover:text-blue-600 transition-colors">{stat.value}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Leads Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-slate-800">Recent Inquiries</h2>
          <Link href="/leads" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
            View All Leads →
          </Link>
        </div>

        {recentLeads.length > 0 ? (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Mascot Type</th>
                  <th className="pb-3 pr-4">Budget</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 pr-4 font-semibold text-slate-900">{lead.name}</td>
                    <td className="py-3 pr-4 text-slate-600">{lead.email}</td>
                    <td className="py-3 pr-4">{lead.mascotType || "—"}</td>
                    <td className="py-3 pr-4">{lead.budget || "—"}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                        ${lead.status === 'NEW' ? 'bg-amber-100 text-amber-800' : 
                          lead.status === 'CONTACTED' ? 'bg-cyan-100 text-cyan-800' :
                          lead.status === 'QUALIFIED' ? 'bg-blue-100 text-blue-800' : 
                          lead.status === 'QUOTED' ? 'bg-purple-100 text-purple-800' : 
                          lead.status === 'WON' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-500 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-sm">
            <span className="material-symbols-outlined text-4xl block mx-auto mb-3 text-slate-300">inbox</span>
            No leads found. Inbound contact inquiries will appear here automatically.
          </div>
        )}
      </div>
    </div>
  );
}
