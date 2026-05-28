"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBrandSettings(formData: FormData) {
  try {
    const siteName = formData.get("siteName") as string;
    const logoUrl = formData.get("logoUrl") as string;
    const logoUrlDark = formData.get("logoUrlDark") as string;
    const primaryColor = formData.get("primaryColor") as string;
    const logoHeightStr = formData.get("logoHeight") as string;
    const logoHeight = parseInt(logoHeightStr, 10) || 56;

    const currentSettings = await prisma.siteSettings.findFirst();

    if (!currentSettings) {
      await prisma.siteSettings.create({
        data: {
          siteName,
          logoUrl,
          logoUrlDark,
          logoHeight,
          primaryColor,
        },
      });
    } else {
      await prisma.siteSettings.update({
        where: { id: currentSettings.id },
        data: {
          siteName,
          logoUrl,
          logoUrlDark,
          logoHeight,
          primaryColor,
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/dashboard/brand-settings");

    return { success: true };
  } catch (error) {
    console.error("Error updating brand settings:", error);
    return { success: false, error: "Failed to update brand settings" };
  }
}
