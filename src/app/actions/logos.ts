"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPartnerLogo(formData: FormData) {
  const name = formData.get("name") as string;
  const logoUrl = formData.get("logoUrl") as string;
  const section = formData.get("section") as string;
  const height = parseInt((formData.get("height") as string) || "48");
  const order = parseInt((formData.get("order") as string) || "0");

  await prisma.partnerLogo.create({
    data: { name, logoUrl, section, height, order },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/logos");
}

export async function updatePartnerLogo(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const logoUrl = formData.get("logoUrl") as string;
  const section = formData.get("section") as string;
  const height = parseInt((formData.get("height") as string) || "48");
  const order = parseInt((formData.get("order") as string) || "0");

  await prisma.partnerLogo.update({
    where: { id },
    data: { name, logoUrl, section, height, order },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/logos");
}

export async function deletePartnerLogo(id: string) {
  await prisma.partnerLogo.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/logos");
}
