import prisma from "@/lib/prisma";
import { LogosTable } from "@/components/admin/LogosTable";

export const dynamic = "force-dynamic";

export default async function LogosAdminPage() {
  const items = await prisma.partnerLogo.findMany({
    orderBy: { order: "asc" }
  });

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Partner Logos
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <LogosTable items={items} />
      </div>
    </div>
  );
}
