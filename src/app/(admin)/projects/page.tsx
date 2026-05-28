import React from "react";
import prisma from "@/lib/prisma";
import ProjectsTable from "@/components/admin/ProjectsTable";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  // Query all projects with client details
  const projects = await prisma.project.findMany({
    include: {
      client: {
        select: {
          name: true,
          company: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Query all client selectors for creating projects
  const clients = await prisma.client.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Project Tracking</h1>
        <p className="text-sm text-slate-500 mt-1">Manage mascot costume manufacturing builds and workflows.</p>
      </div>
      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <ProjectsTable 
          items={projects as any} 
          clients={clients} 
        />
      </div>
    </div>
  );
}
