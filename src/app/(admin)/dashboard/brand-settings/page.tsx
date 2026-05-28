import React from "react";
import prisma from "@/lib/prisma";
import { updateBrandSettings } from "@/app/actions/brand";

export const dynamic = "force-dynamic";

export default async function BrandSettingsPage() {
  const settings = await prisma.siteSettings.findFirst();

  async function handleAction(formData: FormData) {
    "use server";
    await updateBrandSettings(formData);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Brand Settings</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <form action={handleAction} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              name="siteName"
              defaultValue={settings?.siteName || "JZ Arts"}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900"
            />
            <p className="text-sm text-slate-500 mt-1">
              Used as the text fallback if no logo is provided, and for SEO tags.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Default Logo URL (Light Mode)
            </label>
            <input
              type="text"
              name="logoUrl"
              defaultValue={settings?.logoUrl || ""}
              placeholder="/uploads/logo.svg"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900"
            />
            <p className="text-sm text-slate-500 mt-1">
              Provide a valid image URL for the global navigation and footer logo (default).
            </p>
            <div className="mt-4 p-4 border border-slate-100 rounded-lg bg-slate-50 w-max">
              <span className="text-xs text-slate-400 block mb-2 uppercase tracking-wider">Preview</span>
              <img src={settings?.logoUrl || "/uploads/logo.svg"} alt="Logo Preview" className="h-10 w-auto object-contain" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Dark Mode Logo URL
            </label>
            <input
              type="text"
              name="logoUrlDark"
              defaultValue={settings?.logoUrlDark || ""}
              placeholder="/uploads/logo-dark.svg"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900"
            />
            <p className="text-sm text-slate-500 mt-1">
              Provide a white/inverse logo version to be used when the site is in dark mode.
            </p>
            <div className="mt-4 p-4 border border-slate-700 rounded-lg bg-slate-900 w-max">
              <span className="text-xs text-slate-400 block mb-2 uppercase tracking-wider">Preview (Dark Background)</span>
              <img src={settings?.logoUrlDark || "/uploads/logo-dark.svg"} alt="Dark Logo Preview" className="h-10 w-auto object-contain" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Logo Height (px)
            </label>
            <input
              type="number"
              name="logoHeight"
              defaultValue={settings?.logoHeight || 56}
              className="w-full max-w-[150px] px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
            />
            <p className="text-sm text-slate-500 mt-1">
              Controls the display height of the logo in the global navigation.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Primary Brand Color (Hex)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="primaryColor"
                defaultValue={settings?.primaryColor || "#ea580c"}
                className="w-12 h-12 rounded cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                name="primaryColorHex"
                defaultValue={settings?.primaryColor || "#ea580c"}
                className="w-full max-w-[150px] px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 uppercase"
              // Let the color picker handle the actual value, or sync them with JS if this were client component
              />
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Sets the main brand accent color across the front-end site (buttons, highlights, borders).
            </p>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
            >
              Save Brand Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
