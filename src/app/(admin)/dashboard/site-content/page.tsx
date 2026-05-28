import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import { SeedContentButton } from "./SeedContentButton";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default async function SiteContentPage() {
  const settings = await prisma.siteSettings.findFirst();

  async function updateSettings(formData: FormData) {
    "use server";
    
    const data = {
      heroBadge: formData.get("heroBadge") as string,
      heroTitle: formData.get("heroTitle") as string,
      heroSubtitle: formData.get("heroSubtitle") as string,
      heroImageUrl: formData.get("heroImageUrl") as string,
      studioTitle: formData.get("studioTitle") as string,
      studioLocation: formData.get("studioLocation") as string,
      studioImageUrl: formData.get("studioImageUrl") as string,
      finalRevealTitle: formData.get("finalRevealTitle") as string,
      finalRevealVideo: formData.get("finalRevealVideo") as string,
    };

    if (settings) {
      await prisma.siteSettings.update({
        where: { id: settings.id },
        data
      });
    } else {
      await prisma.siteSettings.create({ data });
    }

    revalidatePath("/");
    revalidatePath("/dashboard/site-content");
    redirect("/dashboard/site-content");
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Site Content
        </h1>
        <SeedContentButton />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">General Settings (Hero & Studio)</h2>
        
        <form action={updateSettings} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hero Badge Text</label>
              <input 
                name="heroBadge" 
                defaultValue={settings?.heroBadge} 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hero Title (HTML supported)</label>
              <textarea 
                name="heroTitle" 
                defaultValue={settings?.heroTitle} 
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm" 
              />
              <p className="text-xs text-slate-500 text-right">Use &lt;br/&gt; for new lines and &lt;span class="text-primary"&gt; for highlighted text.</p>
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hero Subtitle</label>
              <textarea 
                name="heroSubtitle" 
                defaultValue={settings?.heroSubtitle} 
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hero Image URL</label>
              <ImageUpload
                name="heroImageUrl"
                defaultValue={settings?.heroImageUrl}
              />
            </div>

            <div className="col-span-1 md:col-span-2 border-t border-slate-200 dark:border-slate-800 my-4 pt-4"></div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Studio Section Title (HTML supported)</label>
              <textarea 
                name="studioTitle" 
                defaultValue={settings?.studioTitle} 
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm" 
              />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Studio Location Text</label>
              <input 
                name="studioLocation" 
                defaultValue={settings?.studioLocation} 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Studio Image URL</label>
              <ImageUpload
                name="studioImageUrl"
                defaultValue={settings?.studioImageUrl}
              />
            </div>

             <div className="col-span-1 md:col-span-2 border-t border-slate-200 dark:border-slate-800 my-4 pt-4"></div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Final Reveal Title (HTML supported)</label>
              <textarea 
                name="finalRevealTitle" 
                defaultValue={settings?.finalRevealTitle} 
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm" 
              />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Final Image/Video URL</label>
              <ImageUpload
                name="finalRevealVideo"
                defaultValue={settings?.finalRevealVideo}
              />
            </div>

          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Save General Settings
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-xl font-semibold mb-2">Process Steps & Portfolio Items</h2>
        <p className="text-sm text-slate-500 mb-6">
          To keep this simple for now, the Process Steps and Portfolio Items 
          are generated via the Seed Script. To replace or add items, you can update the seed script or connect this to a full CRUD table view.
        </p>
        <p className="text-sm font-medium text-blue-500 mt-4">
          The homepage is now reading from the database! If you update the settings above and click Save, the homepage will instantly update.
        </p>
      </div>
    </div>
  );
}
