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
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mascot Costume Project Tracking</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <ProjectsTable 
          items={projects as any} 
          clients={clients} 
        />
      </div>
    </div>
  );
}
