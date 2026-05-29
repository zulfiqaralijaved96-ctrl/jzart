import prisma from "@/lib/prisma";
import { EventThemesTable } from "@/components/admin/EventThemesTable";

export const dynamic = "force-dynamic";

export default async function EventThemesPage() {
  const items = await prisma.eventTheme.findMany({
    orderBy: { sortOrder: "asc" }
  });

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600">
          JZ Events Themes & Backdrops
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <EventThemesTable items={items} />
      </div>
    </div>
  );
}
