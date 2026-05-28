import React from "react";
import prisma from "@/lib/prisma";
import ClientsTable from "@/components/admin/ClientsTable";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      projects: true,
      _count: {
        select: { projects: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Clients Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage corporate client accounts and linked projects.</p>
      </div>
      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <ClientsTable initialData={clients as any} />
      </div>
    </div>
  );
}
