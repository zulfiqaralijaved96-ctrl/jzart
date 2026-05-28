import React from "react";
import prisma from "@/lib/prisma";
import QuotesTable from "@/components/admin/QuotesTable";

export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  // Fetch quotes with lead and client names
  const quotes = await prisma.quote.findMany({
    include: {
      lead: { select: { name: true } },
      client: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Fetch leads and clients selectors for creating quotes
  const leads = await prisma.lead.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const clients = await prisma.client.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Quote Estimates Management</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <QuotesTable 
          items={quotes as any} 
          leads={leads} 
          clients={clients} 
        />
      </div>
    </div>
  );
}
