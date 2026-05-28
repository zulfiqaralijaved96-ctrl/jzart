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
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Clients Management</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <ClientsTable initialData={clients as any} />
      </div>
    </div>
  );
}
