import prisma from "@/lib/prisma";
import { EventPackagesTable } from "@/components/admin/EventPackagesTable";

export const dynamic = "force-dynamic";

export default async function EventPackagesPage() {
  const items = await prisma.eventPackage.findMany({
    orderBy: { sortOrder: "asc" }
  });

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600">
          JZ Events Setup Packages
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <EventPackagesTable items={items} />
      </div>
    </div>
  );
}
