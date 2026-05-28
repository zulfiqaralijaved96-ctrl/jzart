import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";
import ProjectTasksManager from "@/components/admin/ProjectTasksManager";
import ProjectMediaManager from "@/components/admin/ProjectMediaManager";

export default async function ProjectDetailPage({ params }: { params: any }) {
  const { id } = await params;

  // Query project with client and task listings
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: true,
      tasks: { orderBy: { createdAt: "asc" } },
      media: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!project) {
    return notFound();
  }

  // Calculate manufacturing build progress
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(t => t.isCompleted).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Back to list */}
      <div>
        <Link 
          href="/projects" 
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-xs">arrow_back</span>
          Back to Projects Workspace
        </Link>
      </div>

      {/* Main header details */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
            ${project.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
              project.status === 'PLANNING' ? 'bg-amber-100 text-amber-800' :
              project.status === 'DESIGN' ? 'bg-purple-100 text-purple-800' :
              project.status === 'PRODUCTION' ? 'bg-blue-100 text-blue-800' :
              project.status === 'QUALITY_CHECK' ? 'bg-yellow-100 text-yellow-800' :
              project.status === 'READY' ? 'bg-lime-100 text-lime-800' :
              project.status === 'DELIVERED' ? 'bg-cyan-100 text-cyan-800' :
              'bg-slate-100 text-slate-800'}`}>
            Build Stage: {project.status}
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-gray-850 mt-2">{project.title}</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Account Client: <strong className="text-slate-800">{project.client.name}</strong> 
            {project.client.company ? ` (${project.client.company})` : ""}
          </p>
        </div>

        <div className="flex flex-col md:items-end text-sm text-slate-500 font-medium">
          <p>Start Date: <strong className="text-slate-800">{project.startDate ? new Date(project.startDate).toLocaleDateString() : "Pending"}</strong></p>
          <p className="mt-1">Due Date: <strong className="text-slate-800">{project.dueDate ? new Date(project.dueDate).toLocaleDateString() : "Pending"}</strong></p>
        </div>
      </div>

      {/* Progress tracking banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex justify-between items-center text-sm font-bold text-slate-600">
          <span>Manufacturing Progression</span>
          <span>{progressPercent}% Completed</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Dual Workspace column grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left column: Checklist items */}
        <ProjectTasksManager 
          projectId={project.id} 
          initialTasks={project.tasks as any} 
        />

        {/* Right column: Progress Photos & Upload Attachment files */}
        <ProjectMediaManager 
          projectId={project.id} 
          initialMedia={project.media as any} 
        />
      </div>
    </div>
  );
}
