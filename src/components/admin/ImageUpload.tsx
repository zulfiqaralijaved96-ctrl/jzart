"use client";

import { useState } from "react";

interface ImageUploadProps {
  name: string;
  defaultValue?: string;
  className?: string;
}

export function ImageUpload({ name, defaultValue, className = "" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setPreview(data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Hidden input to pass the final URL to the parent form */}
      <input type="hidden" name={name} value={preview || ""} />
      
      <div className="flex items-start gap-6">
        <div 
          className="relative w-32 h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center group"
          style={{
            backgroundImage: preview ? `url('${preview}')` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!preview && (
            <span className="material-symbols-outlined text-slate-400 text-3xl">image</span>
          )}
          
          <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined text-white">upload</span>
            <input 
              type="file" 
              accept="image/*,video/*,application/json" 
              className="hidden" 
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>

        <div className="flex-1 space-y-2">
          <div className="text-sm text-slate-500">
            {isUploading ? "Uploading..." : preview ? "Image uploaded successfully." : "Click the placeholder to upload an image."}
          </div>
          {error && <div className="text-sm text-red-500 font-medium">{error}</div>}
          
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              value={preview || ""} 
              readOnly 
              className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-3 py-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 outline-none"
              placeholder="No image uploaded..."
            />
            {preview && (
              <button 
                type="button" 
                onClick={() => setPreview(null)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Remove Image"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
