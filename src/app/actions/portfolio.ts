"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Helper function to extract multiple gallery images handling FormData appropriately
function extractGalleryImages(formData: FormData): string | null {
  const images = formData.get("galleryImages") as string;
  if (!images) return null;
  // Try to parse if it was sent as JSON string, otherwise split by comma if manually typed
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) ? JSON.stringify(parsed) : null;
  } catch (e) {
    const split = images.split(',').map(s => s.trim()).filter(Boolean);
    return split.length > 0 ? JSON.stringify(split) : null;
  }
}

export async function createPortfolioItem(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const clientName = formData.get("clientName") as string;
  const category = (formData.get("category") as string) || "Corporate";
  const industry = formData.get("industry") as string;
  const description = formData.get("description") as string;
  const coverImage = formData.get("coverImage") as string;
  const thumbnailImage = formData.get("thumbnailImage") as string;
  const galleryImages = extractGalleryImages(formData);
  const featured = formData.get("featured") === "true" || formData.get("featured") === "on";
  const isPublished = formData.get("isPublished") !== "false"; // Default true
  const year = formData.get("year") as string;
  const tags = formData.get("tags") as string;
  const themeAccentOptional = formData.get("themeAccentOptional") as string;
  const order = parseInt((formData.get("order") as string) || "0");

  await prisma.portfolioItem.create({
    data: { 
      title, slug, clientName, category, industry, description, 
      coverImage, thumbnailImage, galleryImages, featured, isPublished, 
      year, tags, themeAccentOptional, order 
    },
  });

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");
}

export async function updatePortfolioItem(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const clientName = formData.get("clientName") as string;
  const category = formData.get("category") as string;
  const industry = formData.get("industry") as string;
  const description = formData.get("description") as string;
  const coverImage = formData.get("coverImage") as string;
  const thumbnailImage = formData.get("thumbnailImage") as string;
  const galleryImages = extractGalleryImages(formData);
  const featured = formData.get("featured") === "true" || formData.get("featured") === "on";
  const isPublished = formData.get("isPublished") !== "false" && formData.get("isPublished") !== null; 
  const year = formData.get("year") as string;
  const tags = formData.get("tags") as string;
  const themeAccentOptional = formData.get("themeAccentOptional") as string;
  const order = parseInt((formData.get("order") as string) || "0");

  const updateData: Prisma.PortfolioItemUpdateInput = { 
    title, clientName, category, industry, description, 
    coverImage, thumbnailImage, featured, isPublished, 
    year, tags, themeAccentOptional, order 
  };

  if (slug) updateData.slug = slug;
  if (galleryImages) updateData.galleryImages = galleryImages;

  await prisma.portfolioItem.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");
}

export async function deletePortfolioItem(id: string) {
  await prisma.portfolioItem.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");
}
