import prisma from "@/lib/prisma";
import { ProcessStepsTable } from "@/components/admin/ProcessStepsTable";

export const dynamic = "force-dynamic";

export default async function ProcessAdminPage() {
  const items = await prisma.processStep.findMany({
    orderBy: { order: "asc" }
  });

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Process Steps
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <ProcessStepsTable items={items} />
      </div>
    </div>
  );
}
