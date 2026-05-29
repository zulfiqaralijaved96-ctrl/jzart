"use client";

import { useState } from "react";
import { createEventAddon, updateEventAddon, deleteEventAddon } from "@/app/actions/events";
import { ImageUpload } from "./ImageUpload";

interface EventAddon {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string | null;
  fullDescription: string | null;
  startingPrice: any;
  priceLabel: string | null;
  quantityAllowed: boolean;
  coverImageUrl: string | null;
  galleryImages: string | null;
  compatiblePackages: string | null;
  tags: string | null;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  minQuantity: number;
  maxQuantity: number;
  buttonLabel: string | null;
}

export function EventAddonsTable({ items }: { items: EventAddon[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventAddon | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Checkbox mapping
    formData.set("isFeatured", formData.get("isFeatured") ? "true" : "false");
    formData.set("isActive", formData.get("isActive") ? "true" : "false");
    formData.set("quantityAllowed", formData.get("quantityAllowed") ? "true" : "false");

    if (editingItem) {
      await updateEventAddon(editingItem.id, formData);
    } else {
      await createEventAddon(formData);
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event addon?")) {
      await deleteEventAddon(id);
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
        <h2 className="font-semibold text-slate-800 dark:text-slate-200">Event Add-ons ({items.length})</h2>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">add</span> Add New Add-on
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-sm text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
              <th className="p-4 font-medium">Image</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price Info</th>
              <th className="p-4 font-medium">Qty Selection</th>
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
                  <div className="text-xs text-slate-400 font-mono">{item.slug}</div>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{item.category}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">{item.priceLabel || "Request Quote"}</span>
                  {item.startingPrice > 0 && <span className="text-xs block text-slate-400">Base: Rs. {parseFloat(item.startingPrice.toString()).toLocaleString()}</span>}
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${item.quantityAllowed ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-slate-105 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {item.quantityAllowed ? "Allowed" : "Checkbox Only"}
                  </span>
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
                  No event add-ons found. Add one to get started.
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
              <h3 className="text-xl font-bold">{editingItem ? "Edit Event Add-on" : "Add New Event Add-on"}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Cover Image</label>
                <ImageUpload name="coverImageUrl" defaultValue={editingItem?.coverImageUrl || ""} bucket="jz-events-assets" folder="addons" className="pb-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Add-on Name</label>
                  <input 
                    required autoFocus
                    name="name" 
                    defaultValue={editingItem?.name} 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Slug (URL path)</label>
                  <input 
                    name="slug" 
                    defaultValue={editingItem?.slug} 
                    placeholder="e.g. standard-bouncy-castle"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-855 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
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
                    placeholder="e.g. Jumping Castles"
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Starting Price (Number)</label>
                  <input 
                    type="number"
                    name="startingPrice" 
                    defaultValue={editingItem?.startingPrice ? parseFloat(editingItem.startingPrice.toString()) : 0} 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Price Display Label</label>
                  <input 
                    name="priceLabel" 
                    defaultValue={editingItem?.priceLabel || ""} 
                    placeholder="e.g. Rs. 15,000 or Request Quote"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Min Quantity</label>
                  <input 
                    type="number"
                    name="minQuantity" 
                    defaultValue={editingItem?.minQuantity ?? 0} 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Max Quantity</label>
                  <input 
                    type="number"
                    name="maxQuantity" 
                    defaultValue={editingItem?.maxQuantity ?? 100} 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Add Button Label</label>
                  <input 
                    name="buttonLabel" 
                    defaultValue={editingItem?.buttonLabel || ""} 
                    placeholder="e.g. Add Extra Inflatable"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100 text-sm" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Short Description</label>
                <textarea 
                  name="shortDescription" 
                  defaultValue={editingItem?.shortDescription || ""} 
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100 resize-none" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Description</label>
                <textarea 
                  name="fullDescription" 
                  defaultValue={editingItem?.fullDescription || ""} 
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100 resize-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Compatible Event Packages Slugs (Separate with commas)</label>
                  <input 
                    name="compatiblePackages" 
                    defaultValue={formatListForInput(editingItem?.compatiblePackages || "")} 
                    placeholder="basic-birthday, premium-birthday"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tags (Separate with commas)</label>
                  <input 
                    name="tags" 
                    defaultValue={editingItem?.tags || ""} 
                    placeholder="inflatable, entertainment, generator"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 focus:ring-2 focus:ring-blue-500 outline-none text-slate-950 dark:text-slate-100" 
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-6 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
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
                  Featured Add-on
                </label>

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-350 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    name="quantityAllowed" 
                    defaultChecked={editingItem ? editingItem.quantityAllowed : false} 
                    className="h-4 w-4 rounded accent-blue-600"
                  />
                  Allow Quantity Selector
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
                  {editingItem ? "Save Changes" : "Create Add-on"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
