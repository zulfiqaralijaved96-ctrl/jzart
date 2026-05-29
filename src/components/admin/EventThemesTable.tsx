"use client";

import { useState } from "react";
import { createEventTheme, updateEventTheme, deleteEventTheme } from "@/app/actions/events";
import { ImageUpload } from "./ImageUpload";

interface EventTheme {
  id: string;
  name: string;
  slug: string;
  publicSafeName: string | null;
  category: string;
  description: string | null;
  colorPalette: string | null;
  bestAgeGroup: string | null;
  recommendedPackage: string | null;
  coverImageUrl: string | null;
  galleryImages: string | null;
  tags: string | null;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  fullDescription: string | null;
  selectableColors: string | null;
  decorOptions: string | null;
  balloonColorOptions: string | null;
}

export function EventThemesTable({ items }: { items: EventTheme[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventTheme | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Checkbox mapping
    formData.set("isFeatured", formData.get("isFeatured") ? "true" : "false");
    formData.set("isActive", formData.get("isActive") ? "true" : "false");

    if (editingItem) {
      await updateEventTheme(editingItem.id, formData);
    } else {
      await createEventTheme(formData);
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event theme?")) {
      await deleteEventTheme(id);
    }
  };

  const formatListForInput = (jsonStr: string | null) => {
    if (!jsonStr) return "";
    try {
      const parsed = JSON.parse(jsonStr);
      return Array.isArray(parsed) ? parsed.join(", ") : "";
    } catch {
      return jsonStr;
    }
  };

  return (
    <>
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h2 className="font-semibold text-slate-800 dark:text-slate-200">Event Themes ({items.length})</h2>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">add</span> Add New Theme
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-sm text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
              <th className="p-4 font-medium">Image</th>
              <th className="p-4 font-medium">Theme Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Age Group</th>
              <th className="p-4 font-medium">Colors</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div 
                    className="w-16 h-12 rounded bg-slate-100 dark:bg-slate-800 bg-cover bg-center border border-slate-200 dark:border-slate-700 flex items-center justify-center"
                    style={{ backgroundImage: item.coverImageUrl ? `url('${item.coverImageUrl}')` : "none" }}
                  >
                    {!item.coverImageUrl && (
                      <span className="text-[10px] text-slate-400 p-2 block text-center">No Cover</span>
                    )}
                  </div>
                </td>
                <td className="p-4 font-medium text-slate-900 dark:text-slate-100">
                  <div>{item.name}</div>
                  {item.publicSafeName && <div className="text-xs text-brand-orange font-semibold">{item.publicSafeName}</div>}
                  <div className="text-xs text-slate-400 font-mono">{item.slug}</div>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{item.category}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{item.bestAgeGroup}</td>
                <td className="p-4">
                  <div className="flex gap-1.5">
                    {(() => {
                      try {
                        const colors = JSON.parse(item.colorPalette || "[]");
                        return Array.isArray(colors) ? colors.map((col, idx) => (
                          <div key={idx} className="w-4 h-4 rounded-full border border-slate-350 shadow-sm shrink-0" style={{ backgroundColor: col }} title={col} />
                        )) : null;
                      } catch {
                        return null;
                      }
                    })()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${item.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'}`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {item.isFeatured && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium w-fit bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                        ★ Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{item.sortOrder}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors mr-2 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">
                  No themed backdrops found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-8">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30">
              <h3 className="text-xl font-bold">{editingItem ? "Edit Event Theme" : "Add New Event Theme"}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Theme Cover Image</label>
                <ImageUpload name="coverImageUrl" defaultValue={editingItem?.coverImageUrl || ""} bucket="jz-events-assets" folder="themes" className="pb-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Internal Code Name (e.g. Dinosaur Theme)</label>
                  <input 
                    required autoFocus
                    name="name" 
                    defaultValue={editingItem?.name} 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Public Safe Name</label>
                  <input 
                    name="publicSafeName" 
                    defaultValue={editingItem?.publicSafeName || ""} 
                    placeholder="e.g. Prehistoric Dino Expedition"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                  <input 
                    required
                    name="category" 
                    defaultValue={editingItem?.category} 
                    placeholder="e.g. Safari & Animals"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Slug (URL path)</label>
                  <input 
                    name="slug" 
                    defaultValue={editingItem?.slug} 
                    placeholder="e.g. dinosaur-safari-setup"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Best Age Group</label>
                  <input 
                    name="bestAgeGroup" 
                    defaultValue={editingItem?.bestAgeGroup || ""} 
                    placeholder="e.g. 2 - 8 Years"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Recommended Package</label>
                  <input 
                    name="recommendedPackage" 
                    defaultValue={editingItem?.recommendedPackage || ""} 
                    placeholder="e.g. Premium Birthday Setup"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Sort Order</label>
                  <input 
                    type="number"
                    name="sortOrder" 
                    defaultValue={editingItem?.sortOrder ?? items.length * 10} 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Theme Colors Hex Codes (Separate with commas)</label>
                <input 
                  name="colorPalette" 
                  defaultValue={formatListForInput(editingItem?.colorPalette || "")} 
                  placeholder="#15803d, #eab308, #ffffff"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100 text-xs font-mono" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Theme Description (Short)</label>
                <textarea 
                  name="description" 
                  defaultValue={editingItem?.description || ""} 
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100 resize-none" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Theme Full Description (Detailed)</label>
                <textarea 
                  name="fullDescription" 
                  defaultValue={editingItem?.fullDescription || ""} 
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100 resize-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Selectable Balloon Presets (separated by commas)</label>
                  <input 
                    name="selectableColors" 
                    defaultValue={formatListForInput(editingItem?.selectableColors || "")} 
                    placeholder="Pink + Gold, Pastel Blue + Silver, Jungle Safari"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100 text-xs" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Cake Consol & Decor Options (separated by commas)</label>
                  <input 
                    name="decorOptions" 
                    defaultValue={formatListForInput(editingItem?.decorOptions || "")} 
                    placeholder="Acrylic Cake Console, Golden Arch Stand, Standard cake plinth"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100 text-xs" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Custom Balloon Color Palette Options (Hex codes separated by commas)</label>
                <input 
                  name="balloonColorOptions" 
                  defaultValue={formatListForInput(editingItem?.balloonColorOptions || "")} 
                  placeholder="#f472b6, #38bdf8, #facc15"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100 text-xs font-mono" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tags (Separate with commas)</label>
                  <input 
                    name="tags" 
                    defaultValue={editingItem?.tags || ""} 
                    placeholder="safari, dino, colorful"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
              </div>

              <div className="flex gap-6 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-350 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    name="isActive" 
                    defaultChecked={editingItem ? editingItem.isActive : true} 
                    className="h-4 w-4 rounded accent-blue-600"
                  />
                  Active (Show on Site)
                </label>

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-350 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    name="isFeatured" 
                    defaultChecked={editingItem ? editingItem.isFeatured : false} 
                    className="h-4 w-4 rounded accent-blue-600"
                  />
                  Featured Theme
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-305 font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
                >
                  {editingItem ? "Save Changes" : "Create Theme"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
