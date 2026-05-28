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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Quote Estimates</h1>
        <p className="text-sm text-slate-500 mt-1">Create, track, and convert quotes for custom mascot projects.</p>
      </div>
      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <QuotesTable 
          items={quotes as any} 
          leads={leads} 
          clients={clients} 
        />
      </div>
    </div>
  );
}
