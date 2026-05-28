"use client";

import { useState } from "react";
import { createProcessStep, updateProcessStep, deleteProcessStep } from "@/app/actions/process";
import { ImageUpload } from "./ImageUpload";

interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  imageUrl: string;
  illustrationType: string;
  assetLight: string | null;
  assetDark: string | null;
  transitionStyle: string | null;
  backgroundStyle: string | null;
  order: number;
}

export function ProcessStepsTable({ items }: { items: ProcessStep[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProcessStep | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingItem) {
      await updateProcessStep(editingItem.id, formData);
    } else {
      await createProcessStep(formData);
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this step?")) {
      await deleteProcessStep(id);
    }
  };

  return (
    <>
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h2 className="font-semibold text-slate-800 dark:text-slate-200">Process Steps ({items.length})</h2>
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
              <th className="p-4 font-medium w-16">No.</th>
              <th className="p-4 font-medium">Image</th>
              <th className="p-4 font-medium w-1/4">Title</th>
              <th className="p-4 font-medium w-1/3">Description</th>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-bold text-slate-400">{item.stepNumber}</td>
                <td className="p-4">
                  <div 
                    className="w-16 h-16 rounded bg-slate-200 bg-cover bg-center border border-slate-200 dark:border-slate-700 flex items-center justify-center relative overflow-hidden group"
                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                  >
                    {!item.imageUrl && <span className="text-[10px] text-slate-400 font-medium z-10">{item.illustrationType}</span>}
                    {item.illustrationType !== "image" && (item.assetLight || item.assetDark) && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xl">play_circle</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4 font-medium text-slate-900 dark:text-slate-100">{item.title}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400 line-clamp-2">{item.description}</td>
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
                  No process steps found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30">
              <h3 className="text-xl font-bold">{editingItem ? "Edit Step" : "Add New Step"}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Image</label>
                  <ImageUpload name="imageUrl" defaultValue={editingItem?.imageUrl} className="pb-2" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Step Number (e.g. 01)</label>
                  <input 
                    required autoFocus
                    name="stepNumber" 
                    defaultValue={editingItem?.stepNumber} 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
                  <input 
                    required
                    name="title" 
                    defaultValue={editingItem?.title} 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Illustration Type</label>
                  <select 
                    name="illustrationType" 
                    defaultValue={editingItem?.illustrationType || "animation"} 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                  >
                    <option value="animation">System Animation (SVG/Morph)</option>
                    <option value="lottie">Lottie JSON Animation</option>
                    <option value="video">MP4/WebM Video</option>
                    <option value="image">Static Image</option>
                  </select>
                </div>
                
                <div className="space-y-4 col-span-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Animation Assets (Optional)</h4>
                  <p className="text-xs text-slate-500 mb-2">If Illustration Type is Lottie or Video, provide URLs here. Leave empty to use default System Animation SVG if set to animation.</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Asset (Light Theme)</label>
                      <input 
                        name="assetLight" 
                        defaultValue={editingItem?.assetLight || ""} 
                        placeholder="https://..."
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Asset (Dark Theme)</label>
                      <input 
                        name="assetDark" 
                        defaultValue={editingItem?.assetDark || ""} 
                        placeholder="https://..."
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 col-span-2">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Styling (Optional)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Transition Style</label>
                      <input 
                        name="transitionStyle" 
                        defaultValue={editingItem?.transitionStyle || ""} 
                        placeholder="e.g. morph, slide, fade"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Background Style</label>
                      <input 
                        name="backgroundStyle" 
                        defaultValue={editingItem?.backgroundStyle || ""} 
                        placeholder="e.g. blueprint, grid, none"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                  <textarea 
                    required rows={3}
                    name="description" 
                    defaultValue={editingItem?.description} 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Sort Order</label>
                  <input 
                    type="number"
                    name="order" 
                    defaultValue={editingItem?.order ?? items.length * 10} 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
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
                  {editingItem ? "Save Changes" : "Create Step"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
