import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EventRequestsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const params = await searchParams;
  const q = (params?.q as string) || "";
  const status = (params?.status as string) || "";

  // Fetch all requests matching search criteria
  const requests = await prisma.eventRequest.findMany({
    where: {
      AND: [
        q ? {
          OR: [
            { eventRequestNumber: { contains: q, mode: "insensitive" } },
            { customerName: { contains: q, mode: "insensitive" } },
            { customerPhone: { contains: q, mode: "insensitive" } },
            { customerEmail: { contains: q, mode: "insensitive" } },
          ]
        } : {},
        status ? { status } : {}
      ]
    },
    orderBy: { createdAt: "desc" }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "WHATSAPP_OPENED":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "CONTACTED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "QUOTED":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "CONFIRMED":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "CANCELLED":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300";
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600">
            JZ Events Inquiries & Requests
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Track Shopify-style checkout event requests, customer configurations, and follow up via WhatsApp.
          </p>
        </div>
      </div>

      {/* Filter panel */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <form method="GET" className="flex-1 w-full flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search by Reference ID, Name, Phone, Email..."
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-orange-500 outline-none text-sm text-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="w-full sm:w-48">
            <select
              name="status"
              defaultValue={status}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-orange-500 outline-none text-sm text-slate-950 dark:text-slate-100 cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="WHATSAPP_OPENED">WhatsApp Opened</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUOTED">Quoted</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer shrink-0"
            >
              Filter
            </button>
            <Link
              href="/dashboard/events/requests"
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium px-4 py-2 rounded-lg text-sm transition-colors text-center shrink-0"
            >
              Reset
            </Link>
          </div>
        </form>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
                <th className="p-4 font-semibold">Reference ID</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Event Parameters</th>
                <th className="p-4 font-semibold">Estimated Quote</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Inquired On</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              {requests.map((request) => {
                let pkgName = "Custom Package";
                try {
                  const pkgSnap = JSON.parse(request.selectedPackageSnapshot || "{}");
                  pkgName = pkgSnap.name || pkgName;
                } catch {}

                let themeName = "Custom Theme";
                try {
                  const themeSnap = JSON.parse(request.selectedThemeSnapshot || "{}");
                  themeName = themeSnap.name || themeName;
                } catch {}

                return (
                  <tr key={request.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-slate-900 dark:text-slate-100 font-mono text-sm">
                        {request.eventRequestNumber}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-900 dark:text-slate-100">{request.customerName}</div>
                      <div className="text-xs text-slate-500">{request.customerPhone}</div>
                      <div className="text-xs text-slate-400">{request.customerEmail}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs font-semibold text-orange-500">{pkgName}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{themeName}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {request.eventDate ? new Date(request.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "TBD"} @ {request.eventTime || "TBD"}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                      Rs. {parseFloat(request.estimatedTotal?.toString() || "0").toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${getStatusBadge(request.status)}`}>
                        {request.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {new Date(request.createdAt).toLocaleDateString()} {new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/dashboard/events/requests/${request.id}`}
                        className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/20 text-orange-500 border border-slate-200 dark:border-slate-700 hover:border-orange-500 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xs">visibility</span>
                        Review
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    No matching event requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
