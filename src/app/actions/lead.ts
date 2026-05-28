"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateLead(id: string, data: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  mascotType?: string | null;
  budget?: string | null;
  status: string;
  notes?: string | null;
}) {
  try {
    await prisma.lead.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        mascotType: data.mascotType || null,
        budget: data.budget || null,
        status: data.status,
        notes: data.notes || null,
      },
    });

    revalidatePath("/leads");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update lead:", error);
    return { success: false, error: error.message || "Failed to update lead." };
  }
}

export async function deleteLead(id: string) {
  try {
    await prisma.lead.delete({
      where: { id },
    });

    revalidatePath("/leads");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete lead:", error);
    return { success: false, error: error.message || "Failed to delete lead." };
  }
}

export async function convertLeadToClient(id: string) {
  try {
    // 1. Fetch Lead
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      return { success: false, error: "Lead not found" };
    }

    // 2. Create Client in database
    const client = await prisma.client.create({
      data: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
      },
    });

    // 3. Mark Lead as qualified / won
    await prisma.lead.update({
      where: { id },
      data: { status: "WON" },
    });

    // 4. Create an initial default Project linked to this Client
    await prisma.project.create({
      data: {
        clientId: client.id,
        title: `${lead.mascotType || "Brand"} Mascot Build`,
        status: "PLANNING",
      },
    });

    revalidatePath("/leads");
    revalidatePath("/clients");
    revalidatePath("/dashboard");

    return { success: true, clientId: client.id };
  } catch (error: any) {
    console.error("Failed to convert lead to client:", error);
    return { success: false, error: error.message || "Failed to convert lead." };
  }
}
