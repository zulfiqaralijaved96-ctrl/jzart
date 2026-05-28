"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const budget = formData.get("budget") as string;
  const notes = formData.get("notes") as string;

  if (!firstName || !lastName || !email) {
    return { success: false, error: "Name and email are required." };
  }

  try {
    await prisma.lead.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        company: company || null,
        budget: budget || null,
        notes: notes || null,
        status: "NEW", // Default status for new inquiries
      },
    });

    revalidatePath("/leads");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}
