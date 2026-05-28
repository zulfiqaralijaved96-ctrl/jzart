"use client";

import { useState } from "react";
import { createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from "@/app/actions/portfolio";
import { ImageUpload } from "./ImageUpload";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  clientName: string | null;
  category: string;
  industry: string | null;
  description: string | null;
  coverImage: string;
  thumbnailImage: string | null;
  galleryImages: string | null;
  featured: boolean;
  isPublished: boolean;
  year: string | null;
  tags: string | null;
  themeAccentOptional: string | null;
  order: number;
}

export function PortfolioTable({ items }: { items: PortfolioItem[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingItem) {
      await updatePortfolioItem(editingItem.id, formData);
    } else {
      await createPortfolioItem(formData);
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deletePortfolioItem(id);
    }
  };

  return (
    <>
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h2 className="font-semibold text-slate-800 dark:text-slate-200">All Items ({items.length})</h2>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          <span className="material-symbols-outlined text-sm">add</span> Add New
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-sm text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
              <th className="p-4 font-medium">Cover</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Category / Industry</th>
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
                    className="w-12 h-12 rounded bg-slate-200 bg-cover bg-center border border-slate-200 dark:border-slate-700"
                    style={{ backgroundImage: `url('${item.coverImage}')` }}
                  />
                </td>
                <td className="p-4">
                  <p className="font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                  {item.clientName && <p className="text-xs text-slate-500">{item.clientName}</p>}
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400">
                  <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium mr-2">
                    {item.category}
                  </span>
                  {item.industry && <span className="text-xs text-slate-500">{item.industry}</span>}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {item.featured && <span className="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded text-xs font-medium">Featured</span>}
                    {item.isPublished 
                      ? <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded text-xs font-medium">Live</span>
                      : <span className="px-2 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 rounded text-xs font-medium">Draft</span>
                    }
                  </div>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{item.order}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  No portfolio items found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-4xl my-auto border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 sticky top-0 z-10 rounded-t-2xl">
              <h3 className="text-xl font-bold">{editingItem ? "Edit Project" : "Add New Project"}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 bg-slate-200/50 dark:bg-slate-800 rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">
              {/* Media Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-100 dark:border-slate-800">Visuals</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Cover Image *</label>
                    <ImageUpload name="coverImage" defaultValue={editingItem?.coverImage} className="pb-2" />
                    <p className="text-xs text-slate-500">Primary image used in the main portfolio grid.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Thumbnail / Preview Image (Optional)</label>
                      <input 
                        name="thumbnailImage" 
                        defaultValue={editingItem?.thumbnailImage || ""} 
                        placeholder="URL for thumbnail (if different from cover)"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Gallery Images (JSON Array)</label>
                      <textarea 
                        name="galleryImages" 
                        defaultValue={editingItem?.galleryImages || ""} 
                        rows={4}
                        placeholder='["https://...image1.jpg", "https://...image2.jpg"]'
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono" 
                      />
                      <p className="text-xs text-slate-500">Add multiple image URLs separated by commas or as a JSON array for the project modal view.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-100 dark:border-slate-800">Project Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Title *</label>
                    <input 
                      required autoFocus
                      name="title" 
                      defaultValue={editingItem?.title} 
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Slug (URL string)</label>
                    <input 
                      name="slug" 
                      defaultValue={editingItem?.slug} 
                      placeholder="e.g. awesome-sports-mascot"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Description</label>
                    <textarea 
                      name="description" 
                      defaultValue={editingItem?.description || ""} 
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Client / Brand Name</label>
                    <input 
                      name="clientName" 
                      defaultValue={editingItem?.clientName || ""} 
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Year Completed</label>
                    <input 
                      name="year" 
                      defaultValue={editingItem?.year || ""} 
                      placeholder="e.g. 2024"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                </div>
              </div>

              {/* Taxonomy */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-100 dark:border-slate-800">Taxonomy & Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category *</label>
                    <select 
                      name="category"
                      defaultValue={editingItem?.category || "Corporate"}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Corporate">Corporate Mascots</option>
                      <option value="Food Brands">Food Brands</option>
                      <option value="Event Mascots">Event Mascots</option>
                      <option value="School Mascots">School Mascots</option>
                      <option value="Cartoon Characters">Cartoon Characters</option>
                      <option value="Custom Characters">Custom Characters</option>
                      <option value="Sports">Sports / Team Mascots</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Industry</label>
                    <input 
                      name="industry" 
                      defaultValue={editingItem?.industry || ""} 
                      placeholder="e.g. Technology, Education"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tags (comma separated)</label>
                    <input 
                      name="tags" 
                      defaultValue={editingItem?.tags || ""} 
                      placeholder="e.g. 3D, furry, animatronic"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Sort Order</label>
                    <input 
                      type="number"
                      name="order" 
                      defaultValue={editingItem?.order ?? items.length * 10} 
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                  
                  {/* Toggles */}
                  <div className="col-span-1 md:col-span-2 flex gap-8 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="isPublished"
                        defaultChecked={editingItem ? editingItem.isPublished : true}
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Published (Visible on site)</span>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="featured"
                        defaultChecked={editingItem ? editingItem.featured : false}
                        className="w-5 h-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Featured (Highlights visually in grid)</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-800 mt-8 sticky bottom-0 bg-white dark:bg-slate-900 pb-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  {editingItem ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
