import React from "react";
import prisma from "@/lib/prisma";
import LeadsTable from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Leads Management</h1>
        <p className="text-sm text-slate-500 mt-1">Track and manage inbound mascot manufacturing inquiries.</p>
      </div>
      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <LeadsTable initialData={leads} />
      </div>
    </div>
  );
}
