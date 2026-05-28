"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateClient(id: string, data: {
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  address?: string | null;
}) {
  try {
    await prisma.client.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        address: data.address || null,
      },
    });

    revalidatePath("/clients");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update client:", error);
    return { success: false, error: error.message || "Failed to update client." };
  }
}

export async function deleteClient(id: string) {
  try {
    // Delete linked projects/quotes cascade safely since we configured onDelete: Cascade in prisma schema
    await prisma.client.delete({
      where: { id },
    });

    revalidatePath("/clients");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete client:", error);
    return { success: false, error: error.message || "Failed to delete client." };
  }
}
