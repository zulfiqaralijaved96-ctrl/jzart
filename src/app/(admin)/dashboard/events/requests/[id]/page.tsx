import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import ReferenceGallery from "./ReferenceGallery";

export const dynamic = "force-dynamic";

export default async function EventRequestDetailPage({
  params,
}: {
  params: any;
}) {
  const resolvedParams = await params;
  const request = await prisma.eventRequest.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!request) {
    notFound();
  }

  // Handle status update
  async function updateStatus(formData: FormData) {
    "use server";
    const status = formData.get("status") as string;
    await prisma.eventRequest.update({
      where: { id: resolvedParams.id },
      data: { status },
    });
    revalidatePath(`/dashboard/events/requests/${resolvedParams.id}`);
    revalidatePath("/dashboard/events/requests");
  }

  // Parse snap data
  let pkgSnapObj: any = null;
  try {
    pkgSnapObj = JSON.parse(request.selectedPackageSnapshot || "{}");
  } catch {}

  let themeSnapObj: any = null;
  try {
    themeSnapObj = JSON.parse(request.selectedThemeSnapshot || "{}");
  } catch {}

  let themeColorsArr: string[] = [];
  try {
    themeColorsArr = JSON.parse(request.selectedThemeColors || "[]");
  } catch {}

  let decorOptionsArr: string[] = [];
  try {
    decorOptionsArr = JSON.parse(request.selectedDecorOptions || "[]");
  } catch {}

  let addonsSnapArr: any[] = [];
  try {
    addonsSnapArr = JSON.parse(request.selectedAddonsSnapshot || "[]");
  } catch {}

  let uploadedRefsArr: string[] = [];
  try {
    if (request.referenceImageUrl) {
      const parsed = JSON.parse(request.referenceImageUrl);
      uploadedRefsArr = Array.isArray(parsed) ? parsed : [];
    }
  } catch {}

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 text-slate-800 dark:text-slate-100">
      {/* Top Navigation / Breadcrumbs */}
      <div className="mb-6">
        <Link
          href="/dashboard/events/requests"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 text-sm font-semibold transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to all requests
        </Link>
      </div>

      {/* Main Header / Status bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {request.eventRequestNumber}
            </span>
            <span className="bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-300 font-bold text-xs px-2.5 py-1 rounded-full uppercase">
              Event Request
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            Submitted on {new Date(request.createdAt).toLocaleString()} | WhatsApp Clicked:{" "}
            {request.whatsappOpenedAt ? new Date(request.whatsappOpenedAt).toLocaleString() : "No record"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Status Update Panel */}
          <form action={updateStatus} className="flex items-center gap-2 w-full sm:w-auto">
            <select
              name="status"
              defaultValue={request.status}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 cursor-pointer w-full sm:w-44"
            >
              <option value="SUBMITTED">Submitted</option>
              <option value="WHATSAPP_OPENED">WhatsApp Opened</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUOTED">Quoted</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Update
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Event Selections (2 cols wide) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Chosen Package */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center">
              <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">inventory_2</span>
                1. Chosen Package Plan
              </h2>
              {pkgSnapObj?.startingPrice && (
                <span className="text-sm font-bold text-orange-500">
                  Rs. {parseFloat(pkgSnapObj.startingPrice).toLocaleString()}
                </span>
              )}
            </div>
            {pkgSnapObj ? (
              <div className="p-6">
                <div className="flex gap-4">
                  {pkgSnapObj.coverImageUrl && (
                    <div
                      className="w-24 h-18 rounded bg-slate-100 dark:bg-slate-800 bg-cover bg-center shrink-0 border border-slate-200 dark:border-slate-700"
                      style={{ backgroundImage: `url('${pkgSnapObj.coverImageUrl}')` }}
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pkgSnapObj.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{pkgSnapObj.shortDescription}</p>
                  </div>
                </div>

                {/* Package inclusions */}
                {pkgSnapObj.includedItems && (
                  <div className="mt-6 bg-slate-50 dark:bg-slate-950 p-4 rounded-lg">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Inclusions Mapped at time of inquiry:
                    </h4>
                    <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                      {(() => {
                        let items = [];
                        try {
                          items = typeof pkgSnapObj.includedItems === "string" ? JSON.parse(pkgSnapObj.includedItems) : pkgSnapObj.includedItems;
                        } catch {}
                        return Array.isArray(items) ? items.map((inc: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-green-500 text-sm mt-0.5 select-none">check_circle</span>
                            {inc}
                          </li>
                        )) : <li className="text-slate-400 italic">No specific inclusions found.</li>;
                      })()}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-slate-500 italic">No package details snapshot stored.</div>
            )}
          </div>

          {/* Chosen Event Theme */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">palette</span>
                2. Event Theme & Customizations
              </h2>
            </div>
            {themeSnapObj ? (
              <div className="p-6">
                {themeSnapObj.isCustomTheme ? (
                  <div className="space-y-6 text-slate-800 dark:text-slate-105">
                    {/* Custom Theme Badge and Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-bold border border-amber-250/30">
                          <span className="material-symbols-outlined text-sm">stars</span>
                          Bespoke Custom Theme Request
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3.5">
                          {themeSnapObj.customThemeName || themeSnapObj.name}
                        </h3>
                      </div>
                      
                      {themeSnapObj.preferredMood && (
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-3 py-1.5 rounded-lg font-bold">
                          Mood: {themeSnapObj.preferredMood}
                        </span>
                      )}
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-slate-150 dark:border-slate-850">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Theme Description & Design Idea:
                      </span>
                      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-350">
                        {themeSnapObj.themeIdea || themeSnapObj.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                          Preferred Colors:
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 rounded-lg text-xs font-bold border border-orange-200/50">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block animate-pulse" />
                          {themeSnapObj.preferredColors || "Default"}
                        </span>
                      </div>

                      {themeSnapObj.specialCharacters && (
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                            Character Inspiration:
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold border border-indigo-200/50">
                            <span className="material-symbols-outlined text-xs">face</span>
                            {themeSnapObj.specialCharacters}
                          </span>
                        </div>
                      )}

                      {themeSnapObj.childAge && (
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                            Audience / Child Age:
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold">
                            <span className="material-symbols-outlined text-xs">child_care</span>
                            {themeSnapObj.childAge}
                          </span>
                        </div>
                      )}
                    </div>

                    {themeSnapObj.specialRequests && (
                      <div className="pt-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                          Special Decor Requests:
                        </span>
                        <p className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                          {themeSnapObj.specialRequests}
                        </p>
                      </div>
                    )}

                    {/* Previews Grid for uploaded files inside CRM Details Page */}
                    <ReferenceGallery images={uploadedRefsArr} />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex gap-4 mb-6">
                      {themeSnapObj.coverImageUrl && (
                        <div
                          className="w-24 h-18 rounded bg-slate-100 dark:bg-slate-800 bg-cover bg-center shrink-0 border border-slate-200 dark:border-slate-700"
                          style={{ backgroundImage: `url('${themeSnapObj.coverImageUrl}')` }}
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{themeSnapObj.name}</h3>
                        <p className="text-sm text-slate-500 mt-0.5">Category: <span className="font-medium text-slate-700 dark:text-slate-300">{themeSnapObj.category}</span></p>
                        <div className="flex gap-2 mt-2">
                          {themeSnapObj.bestAgeGroup && (
                            <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-semibold text-slate-600 dark:text-slate-400">
                              Age: {themeSnapObj.bestAgeGroup}
                            </span>
                          )}
                          {themeSnapObj.recommendedPackage && (
                            <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-semibold text-slate-600 dark:text-slate-400">
                              Recommended: {themeSnapObj.recommendedPackage}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                      {/* Balloon presets / selections */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                          Balloon Color Selections
                        </h4>
                        {themeColorsArr.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {themeColorsArr.map((preset: string, idx: number) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 rounded-lg text-xs font-bold border border-orange-200/50"
                              >
                                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block animate-pulse" />
                                {preset}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400 italic">No balloon color presets selected.</span>
                        )}
                      </div>

                      {/* Cake Consol options */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                          Cake Table & Setup Customization
                        </h4>
                        {decorOptionsArr.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {decorOptionsArr.map((opt: string, idx: number) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400 rounded-lg text-xs font-semibold border border-indigo-200/50"
                              >
                                <span className="material-symbols-outlined text-xs">widgets</span>
                                {opt}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400 italic">No decor customization choices selected.</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-slate-500 italic">No theme details snapshot stored.</div>
            )}
          </div>

          {/* Upgraded Add-ons list */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">add_circle</span>
                3. Upgraded Add-on Upgrades
              </h2>
            </div>
            <div className="p-6">
              {addonsSnapArr.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-4">
                  {addonsSnapArr.map((addon: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center pt-4 first:pt-0">
                      <div className="flex gap-3">
                        {addon.coverImageUrl && (
                          <div
                            className="w-12 h-12 rounded bg-slate-100 dark:bg-slate-800 bg-cover bg-center shrink-0 border border-slate-200 dark:border-slate-700"
                            style={{ backgroundImage: `url('${addon.coverImageUrl}')` }}
                          />
                        )}
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{addon.name}</h4>
                          <p className="text-xs text-slate-500">Category: {addon.category}</p>
                          <span className="text-[11px] font-semibold text-slate-400">Rs. {parseFloat(addon.startingPrice || "0").toLocaleString()} each</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded text-xs font-bold text-slate-700 dark:text-slate-300">
                          Qty: {addon.quantity}
                        </span>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">
                          Rs. {parseFloat((addon.startingPrice * addon.quantity).toString()).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-400 italic text-sm text-center py-4">No additional add-on items requested.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right column - Customer Details & Logistics (1 col wide) */}
        <div className="space-y-8">
          
          {/* Customer profile card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500">person</span>
              Client Profile
            </h3>
            <div className="mt-4 space-y-3.5 text-sm">
              <div>
                <div className="text-xs text-slate-400">Full Name</div>
                <div className="font-semibold text-slate-900 dark:text-white text-base mt-0.5">{request.customerName}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-400">Phone</div>
                  <div className="font-semibold text-orange-500 mt-0.5 cursor-pointer">{request.customerPhone}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Email</div>
                  <div className="font-semibold break-all text-slate-900 dark:text-white mt-0.5">{request.customerEmail}</div>
                </div>
              </div>
              {request.company && (
                <div>
                  <div className="text-xs text-slate-400">Company Name</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{request.company}</div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">Guest Count</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{request.guestCount || "TBD"}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Child's Age</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{request.childAge || "TBD"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Logistics Parameters checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500">local_shipping</span>
              Setup & Logistics
            </h3>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-150 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Delivery Area</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{request.deliveryArea || "TBD"}</span>
                </div>
                <span className="material-symbols-outlined text-orange-500">explore</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-400">City</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{request.city || "Karachi"}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Duration</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{request.eventDuration || "TBD"}</div>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Setup Location</span>
                  <span className="font-semibold bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 px-2 py-0.5 rounded text-[11px]">
                    {request.setupLocation || "INDOOR"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Setup Floor</span>
                  <span className="font-semibold text-slate-850 dark:text-slate-250">{request.setupFloor || "Ground"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Elevator Available</span>
                  <span className={`font-bold ${request.elevatorAvailable ? 'text-green-500' : 'text-slate-400'}`}>
                    {request.elevatorAvailable ? "YES" : "NO"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Parking Available</span>
                  <span className={`font-bold ${request.parkingAvailable ? 'text-green-500' : 'text-slate-400'}`}>
                    {request.parkingAvailable ? "YES" : "NO"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Setup Space Checked</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{request.setupSpaceAvailable || "YES"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Continuous Power Source</span>
                  <span className={`font-bold ${request.powerAvailable ? 'text-green-500' : 'text-slate-400'}`}>
                    {request.powerAvailable ? "YES" : "NO"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Access Notes & Client Comments */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500">edit_note</span>
              Access Notes & Comments
            </h3>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Logistics / Access notes:</span>
                <p className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-xs text-slate-600 dark:text-slate-450 mt-1 border border-slate-150 dark:border-slate-800 font-mono">
                  {request.accessNotes || "No specific access notes provided."}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Client Comments:</span>
                <p className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-xs text-slate-650 dark:text-slate-450 mt-1 border border-slate-150 dark:border-slate-800">
                  {request.notes || "No special comments."}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
