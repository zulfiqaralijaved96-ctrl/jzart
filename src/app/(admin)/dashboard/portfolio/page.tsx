import prisma from "@/lib/prisma";
import { PortfolioTable } from "@/components/admin/PortfolioTable";

export const dynamic = "force-dynamic";

export default async function PortfolioAdminPage() {
  const items = await prisma.portfolioItem.findMany({
    orderBy: { order: "asc" }
  });

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Portfolio Items
        </h1>
        {/* We will implement a modal Add button inside the client component */}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <PortfolioTable items={items} />
      </div>
    </div>
  );
}
