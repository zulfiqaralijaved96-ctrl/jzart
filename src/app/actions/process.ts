"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProcessStep(formData: FormData) {
  const stepNumber = formData.get("stepNumber") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageUrl = (formData.get("imageUrl") as string) || "";
  const illustrationType = (formData.get("illustrationType") as string) || "animation";
  const assetLight = (formData.get("assetLight") as string) || undefined;
  const assetDark = (formData.get("assetDark") as string) || undefined;
  const transitionStyle = (formData.get("transitionStyle") as string) || undefined;
  const backgroundStyle = (formData.get("backgroundStyle") as string) || undefined;
  const orderString = (formData.get("order") as string) || "0";

  await prisma.processStep.create({
    data: {
      stepNumber,
      title,
      description,
      imageUrl,
      illustrationType,
      assetLight,
      assetDark,
      transitionStyle,
      backgroundStyle,
      order: parseInt(orderString),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/process");
}

export async function updateProcessStep(id: string, formData: FormData) {
  const stepNumber = formData.get("stepNumber") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageUrl = (formData.get("imageUrl") as string) || "";
  const illustrationType = (formData.get("illustrationType") as string) || "animation";
  const assetLight = (formData.get("assetLight") as string) || undefined;
  const assetDark = (formData.get("assetDark") as string) || undefined;
  const transitionStyle = (formData.get("transitionStyle") as string) || undefined;
  const backgroundStyle = (formData.get("backgroundStyle") as string) || undefined;
  const orderString = (formData.get("order") as string) || "0";

  // Check if step exists
  const existingStep = await prisma.processStep.findUnique({
    where: { id }
  });

  if (!existingStep) {
    return { success: false, error: "Process step not found." };
  }

  await prisma.processStep.update({
    where: { id },
    data: {
      stepNumber,
      title,
      description,
      imageUrl,
      illustrationType,
      assetLight,
      assetDark,
      transitionStyle,
      backgroundStyle,
      order: parseInt(orderString),
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/process");
}

export async function deleteProcessStep(id: string) {
  await prisma.processStep.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/process");
}
