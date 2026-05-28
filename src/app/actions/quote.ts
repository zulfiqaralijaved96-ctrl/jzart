"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createQuote(data: {
  leadId?: string | null;
  clientId?: string | null;
  total: number;
  status: string;
  items?: string | null;
  expireAt?: string | null;
}) {
  try {
    const quote = await prisma.quote.create({
      data: {
        leadId: data.leadId || null,
        clientId: data.clientId || null,
        total: data.total,
        status: data.status || "DRAFT",
        items: data.items || null,
        expireAt: data.expireAt ? new Date(data.expireAt) : null,
      },
    });

    revalidatePath("/quotes");
    revalidatePath("/dashboard");
    return { success: true, quote };
  } catch (error: any) {
    console.error("Failed to create quote:", error);
    return { success: false, error: error.message || "Failed to create quote." };
  }
}

export async function updateQuote(id: string, data: {
  leadId?: string | null;
  clientId?: string | null;
  total: number;
  status: string;
  items?: string | null;
  expireAt?: string | null;
}) {
  try {
    const oldQuote = await prisma.quote.findUnique({ where: { id } });
    if (!oldQuote) return { success: false, error: "Quote not found" };

    const updated = await prisma.quote.update({
      where: { id },
      data: {
        leadId: data.leadId || null,
        clientId: data.clientId || null,
        total: data.total,
        status: data.status,
        items: data.items || null,
        expireAt: data.expireAt ? new Date(data.expireAt) : null,
      },
    });

    // If status transitioned to ACCEPTED, trigger project generation automatically
    if (data.status === "ACCEPTED" && oldQuote.status !== "ACCEPTED") {
      let linkedClientId = updated.clientId;
      
      // If quote is only linked to a lead, we first need to convert that lead to a client!
      if (!linkedClientId && updated.leadId) {
        const lead = await prisma.lead.findUnique({ where: { id: updated.leadId } });
        if (lead) {
          const client = await prisma.client.create({
            data: {
              name: lead.name,
              email: lead.email,
              phone: lead.phone,
              company: lead.company,
            },
          });
          linkedClientId = client.id;
          // Update quote to point to the new client
          await prisma.quote.update({
            where: { id },
            data: { clientId: client.id },
          });
          // Update lead status to Qualified
          await prisma.lead.update({
            where: { id: lead.id },
            data: { status: "QUALIFIED" },
          });
        }
      }

      if (linkedClientId) {
        // Create live project build
        await prisma.project.create({
          data: {
            clientId: linkedClientId,
            title: `Build Project for Quote #${id.substring(0, 6).toUpperCase()}`,
            status: "PLANNING",
          },
        });
      }
    }

    revalidatePath("/quotes");
    revalidatePath("/clients");
    revalidatePath("/leads");
    revalidatePath("/projects");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update quote:", error);
    return { success: false, error: error.message || "Failed to update quote." };
  }
}

export async function deleteQuote(id: string) {
  try {
    await prisma.quote.delete({
      where: { id },
    });

    revalidatePath("/quotes");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete quote:", error);
    return { success: false, error: error.message || "Failed to delete quote." };
  }
}
