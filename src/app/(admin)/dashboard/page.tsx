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

  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-850">Dashboard Overview</h1>
        <SeedButton />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-semibold text-gray-550 uppercase tracking-wider">Total Leads</div>
          <div className="text-4xl font-black mt-2 text-gray-800">{totalLeads}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-semibold text-gray-550 uppercase tracking-wider">Active Projects</div>
          <div className="text-4xl font-black mt-2 text-gray-800">{activeProjects}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-semibold text-gray-550 uppercase tracking-wider">Quotes Pending</div>
          <div className="text-4xl font-black mt-2 text-gray-800">{pendingQuotes}</div>
        </div>
      </div>

      {/* Recent Leads Panel */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Inquiries</h2>
          <Link href="/leads" className="text-sm font-semibold text-blue-600 hover:text-blue-800">
            View All Leads →
          </Link>
        </div>

        {recentLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Mascot Type</th>
                  <th className="pb-3">Budget</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-slate-700">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 font-semibold text-slate-900">{lead.name}</td>
                    <td className="py-3">{lead.email}</td>
                    <td className="py-3">{lead.mascotType || "—"}</td>
                    <td className="py-3">{lead.budget || "—"}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                        ${lead.status === 'NEW' ? 'bg-amber-100 text-amber-800' : 
                          lead.status === 'CONTACTED' ? 'bg-cyan-100 text-cyan-800' :
                          lead.status === 'QUALIFIED' ? 'bg-blue-100 text-blue-800' : 
                          lead.status === 'QUOTED' ? 'bg-purple-100 text-purple-800' : 
                          lead.status === 'WON' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400 text-sm">
            No leads found. Inbound contact inquiries will appear here automatically.
          </div>
        )}
      </div>
    </div>
  );
}
