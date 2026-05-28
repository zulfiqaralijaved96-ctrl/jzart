"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(data: {
  clientId: string;
  title: string;
  status: string;
  startDate?: string | null;
  dueDate?: string | null;
}) {
  try {
    const project = await prisma.project.create({
      data: {
        clientId: data.clientId,
        title: data.title,
        status: data.status || "PLANNING",
        startDate: data.startDate ? new Date(data.startDate) : null,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });

    // Seed default tasks for physical custom mascot costume manufacturing project
    const defaultTasks = [
      "Discovery & Mascot Strategy Drafting",
      "Precision Foam Silhouette Sculpting",
      "Rigid Structure & Articulation Engineering",
      "Premium Fabrics & Color Stitching Application",
      "Performer Ventilation Fans & Internal Fitting Testing",
      "Final Quality Inspection & Client Sign-Off Review",
      "Global Packaging & Delivery Shipment"
    ];

    for (const title of defaultTasks) {
      await prisma.task.create({
        data: {
          projectId: project.id,
          title,
          isCompleted: false,
        },
      });
    }

    revalidatePath("/projects");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create project:", error);
    return { success: false, error: error.message || "Failed to create project." };
  }
}

export async function updateProject(id: string, data: {
  clientId: string;
  title: string;
  status: string;
  startDate?: string | null;
  dueDate?: string | null;
}) {
  try {
    await prisma.project.update({
      where: { id },
      data: {
        clientId: data.clientId,
        title: data.title,
        status: data.status,
        startDate: data.startDate ? new Date(data.startDate) : null,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update project:", error);
    return { success: false, error: error.message || "Failed to update project." };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/projects");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete project:", error);
    return { success: false, error: error.message || "Failed to delete project." };
  }
}

// Tasks Management Server Actions
export async function toggleTaskStatus(taskId: string, isCompleted: boolean, projectId: string) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { isCompleted },
    });
    revalidatePath(`/projects/${projectId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to toggle task." };
  }
}

export async function addProjectTask(projectId: string, title: string) {
  try {
    await prisma.task.create({
      data: {
        projectId,
        title,
        isCompleted: false,
      },
    });
    revalidatePath(`/projects/${projectId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to add task." };
  }
}

export async function deleteProjectTask(taskId: string, projectId: string) {
  try {
    await prisma.task.delete({
      where: { id: taskId },
    });
    revalidatePath(`/projects/${projectId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete task." };
  }
}

// Media Attachment Server Actions
export async function addProjectMedia(projectId: string, url: string, fileType: string = "image") {
  try {
    await prisma.media.create({
      data: {
        projectId,
        url,
        fileType,
      },
    });
    revalidatePath(`/projects/${projectId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to attach file." };
  }
}
