"use client";

import { useState } from "react";
import { createPartnerLogo, updatePartnerLogo, deletePartnerLogo } from "@/app/actions/logos";
import { ImageUpload } from "./ImageUpload";

interface PartnerLogo {
  id: string;
  name: string;
  logoUrl: string;
  section: string;
  height: number;
  order: number;
}

export function LogosTable({ items }: { items: PartnerLogo[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PartnerLogo | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingItem) {
      await updatePartnerLogo(editingItem.id, formData);
    } else {
      await createPartnerLogo(formData);
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this logo?")) {
      await deletePartnerLogo(id);
    }
  };

  return (
    <>
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h2 className="font-semibold text-slate-800 dark:text-slate-200">Logos ({items.length})</h2>
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
              <th className="p-4 font-medium">Logo</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Section</th>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div 
                    className="w-16 h-12 rounded bg-slate-800 bg-contain bg-no-repeat bg-center border border-slate-200 dark:border-slate-700 p-2"
                    style={{ backgroundImage: `url('${item.logoUrl}')` }}
                  />
                </td>
                <td className="p-4 font-medium text-slate-900 dark:text-slate-100">{item.name}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.section === 'HERO' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'}`}>
                    {item.section}
                  </span>
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
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No logos found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30">
              <h3 className="text-xl font-bold">{editingItem ? "Edit Logo" : "Add New Logo"}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Logo Image (Transparent PNG recommended)</label>
                <ImageUpload name="logoUrl" defaultValue={editingItem?.logoUrl} className="pb-2" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company Name</label>
                <input 
                  required autoFocus
                  name="name" 
                  defaultValue={editingItem?.name} 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Section</label>
                  <select 
                    name="section"
                    defaultValue={editingItem?.section || "WALL"}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="HERO">Hero (Top Section)</option>
                    <option value="WALL">Wall (Bottom Grid)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Height (px)</label>
                  <input 
                    type="number"
                    name="height" 
                    defaultValue={editingItem?.height ?? 48} 
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
                  {editingItem ? "Save Changes" : "Create Logo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
