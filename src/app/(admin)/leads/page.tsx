import React from "react";
import prisma from "@/lib/prisma";
import LeadsTable from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Leads Management</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <LeadsTable initialData={leads} />
      </div>
    </div>
  );
}
