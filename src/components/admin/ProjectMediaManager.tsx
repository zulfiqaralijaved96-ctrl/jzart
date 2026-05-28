"use client";

import React, { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { addProjectMedia } from "@/app/actions/project";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

type MediaItem = {
  id: string;
  url: string;
  fileType: string | null;
  createdAt: Date;
};

interface ProjectMediaManagerProps {
  projectId: string;
  initialMedia: MediaItem[];
}

export default function ProjectMediaManager({ projectId, initialMedia }: ProjectMediaManagerProps) {
  const router = useRouter();
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [uploadUrl, setUploadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setMediaList(initialMedia);
  }, [initialMedia]);

  const handleAttach = async () => {
    if (!uploadUrl) {
      message.warning("Please upload a file first.");
      return;
    }

    setLoading(true);
    const res = await addProjectMedia(projectId, uploadUrl, "image");
    setLoading(false);

    if (res.success) {
      message.success("Progress photo attached successfully!");
      const newMedia: MediaItem = {
        id: `temp_${Date.now()}`,
        url: uploadUrl,
        fileType: "image",
        createdAt: new Date(),
      };
      setMediaList(prev => [newMedia, ...prev]);
      setUploadUrl("");
      router.refresh();
    } else {
      message.error(res.error || "Failed to attach file.");
    }
  };

  return (
    <div className="space-y-6 bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-lg font-bold text-gray-800">Attachments & Progress Photos</h3>
      </div>

      {/* Grid of uploaded images */}
      {mediaList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {mediaList.map((media) => (
            <div 
              key={media.id} 
              className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group bg-slate-50"
            >
              <img 
                src={media.url} 
                alt="Project Attachment" 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 pointer-events-none">
                <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                  {new Date(media.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400 italic text-center py-4">
          No manufacturing snapshots or blueprints attached yet.
        </p>
      )}

      {/* Upload attachment area */}
      <div className="pt-6 border-t border-gray-100 space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attach Manufacturing Photo</h4>
        
        <ImageUpload
          name="projectMedia"
          defaultValue={uploadUrl}
          className="pb-2"
        />

        {/* Dynamic button to trigger attachment save */}
        <div className="flex justify-end pt-2">
          {/* We capture the uploaded URL from state since ImageUpload updates its preview */}
          <input 
            type="hidden" 
            id="hidden-url-tracker" 
            value={uploadUrl}
            onChange={(e) => setUploadUrl(e.target.value)} 
          />
          
          <Button 
            type="primary" 
            onClick={() => {
              // Read current hidden input value
              const urlEl = document.querySelector('input[name="projectMedia"]') as HTMLInputElement;
              if (urlEl && urlEl.value) {
                setUploadUrl(urlEl.value);
                // Trigger action directly
                addProjectMedia(projectId, urlEl.value, "image").then(res => {
                  if (res.success) {
                    message.success("Progress photo attached successfully!");
                    router.refresh();
                  } else {
                    message.error(res.error || "Failed to attach photo.");
                  }
                });
              } else {
                message.warning("Please upload an image first.");
              }
            }}
            loading={loading}
            className="bg-blue-600 font-bold"
          >
            Attach Photo to Project Workspace
          </Button>
        </div>
      </div>
    </div>
  );
}
