"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Helper to parse strings or JSON inputs into stored JSON arrays
function parseJsonArrayString(value: string | null): string | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? JSON.stringify(parsed) : null;
  } catch (e) {
    const split = value.split(',').map(s => s.trim()).filter(Boolean);
    return split.length > 0 ? JSON.stringify(split) : null;
  }
}

// ==========================================
// EVENT PACKAGE ACTIONS
// ==========================================
export async function createEventPackage(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const shortDescription = formData.get("shortDescription") as string;
  const fullDescription = formData.get("fullDescription") as string;
  const bestFor = formData.get("bestFor") as string;
  const includedItems = parseJsonArrayString(formData.get("includedItems") as string);
  const optionalAddons = parseJsonArrayString(formData.get("optionalAddons") as string);
  const startingPrice = parseFloat((formData.get("startingPrice") as string) || "0");
  const priceLabel = formData.get("priceLabel") as string;
  const setupTime = formData.get("setupTime") as string;
  const guestRange = formData.get("guestRange") as string;
  const coverImageUrl = formData.get("coverImageUrl") as string;
  const galleryImages = parseJsonArrayString(formData.get("galleryImages") as string);
  const tags = formData.get("tags") as string;
  const isFeatured = formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on";
  const isActive = formData.get("isActive") !== "false" && formData.get("isActive") !== null;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");

  await prisma.eventPackage.create({
    data: {
      name, slug, shortDescription, fullDescription, bestFor, includedItems,
      optionalAddons, startingPrice, priceLabel, setupTime, guestRange,
      coverImageUrl, galleryImages, tags, isFeatured, isActive, sortOrder
    }
  });

  revalidatePath("/dashboard/events/packages");
}

export async function updateEventPackage(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const fullDescription = formData.get("fullDescription") as string;
  const bestFor = formData.get("bestFor") as string;
  const includedItems = parseJsonArrayString(formData.get("includedItems") as string);
  const optionalAddons = parseJsonArrayString(formData.get("optionalAddons") as string);
  const startingPrice = parseFloat((formData.get("startingPrice") as string) || "0");
  const priceLabel = formData.get("priceLabel") as string;
  const setupTime = formData.get("setupTime") as string;
  const guestRange = formData.get("guestRange") as string;
  const coverImageUrl = formData.get("coverImageUrl") as string;
  const galleryImages = parseJsonArrayString(formData.get("galleryImages") as string);
  const tags = formData.get("tags") as string;
  const isFeatured = formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on";
  const isActive = formData.get("isActive") === "true" || formData.get("isActive") === "on" || formData.get("isActive") === "active";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");

  await prisma.eventPackage.update({
    where: { id },
    data: {
      name, slug, shortDescription, fullDescription, bestFor, includedItems,
      optionalAddons, startingPrice, priceLabel, setupTime, guestRange,
      coverImageUrl, galleryImages, tags, isFeatured, isActive, sortOrder
    }
  });

  revalidatePath("/dashboard/events/packages");
}

export async function deleteEventPackage(id: string) {
  await prisma.eventPackage.delete({
    where: { id }
  });
  revalidatePath("/dashboard/events/packages");
}

// ==========================================
// EVENT THEME ACTIONS
// ==========================================
export async function createEventTheme(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const publicSafeName = formData.get("publicSafeName") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const colorPalette = parseJsonArrayString(formData.get("colorPalette") as string);
  const bestAgeGroup = formData.get("bestAgeGroup") as string;
  const recommendedPackage = formData.get("recommendedPackage") as string;
  const coverImageUrl = formData.get("coverImageUrl") as string;
  const galleryImages = parseJsonArrayString(formData.get("galleryImages") as string);
  const tags = formData.get("tags") as string;
  const isFeatured = formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on";
  const isActive = formData.get("isActive") !== "false" && formData.get("isActive") !== null;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");
  
  const fullDescription = formData.get("fullDescription") as string;
  const selectableColors = parseJsonArrayString(formData.get("selectableColors") as string);
  const decorOptions = formData.get("decorOptions") as string;
  const balloonColorOptions = parseJsonArrayString(formData.get("balloonColorOptions") as string);

  await prisma.eventTheme.create({
    data: {
      name, slug, publicSafeName, category, description, colorPalette,
      bestAgeGroup, recommendedPackage, coverImageUrl, galleryImages, tags,
      isFeatured, isActive, sortOrder,
      fullDescription, selectableColors, decorOptions, balloonColorOptions
    }
  });

  revalidatePath("/dashboard/events/themes");
}

export async function updateEventTheme(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const publicSafeName = formData.get("publicSafeName") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const colorPalette = parseJsonArrayString(formData.get("colorPalette") as string);
  const bestAgeGroup = formData.get("bestAgeGroup") as string;
  const recommendedPackage = formData.get("recommendedPackage") as string;
  const coverImageUrl = formData.get("coverImageUrl") as string;
  const galleryImages = parseJsonArrayString(formData.get("galleryImages") as string);
  const tags = formData.get("tags") as string;
  const isFeatured = formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on";
  const isActive = formData.get("isActive") === "true" || formData.get("isActive") === "on" || formData.get("isActive") === "active";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");
  
  const fullDescription = formData.get("fullDescription") as string;
  const selectableColors = parseJsonArrayString(formData.get("selectableColors") as string);
  const decorOptions = formData.get("decorOptions") as string;
  const balloonColorOptions = parseJsonArrayString(formData.get("balloonColorOptions") as string);

  await prisma.eventTheme.update({
    where: { id },
    data: {
      name, slug, publicSafeName, category, description, colorPalette,
      bestAgeGroup, recommendedPackage, coverImageUrl, galleryImages, tags,
      isFeatured, isActive, sortOrder,
      fullDescription, selectableColors, decorOptions, balloonColorOptions
    }
  });

  revalidatePath("/dashboard/events/themes");
}

export async function deleteEventTheme(id: string) {
  await prisma.eventTheme.delete({
    where: { id }
  });
  revalidatePath("/dashboard/events/themes");
}

// ==========================================
// EVENT ADDON ACTIONS
// ==========================================
export async function createEventAddon(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const category = formData.get("category") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const fullDescription = formData.get("fullDescription") as string;
  const startingPrice = parseFloat((formData.get("startingPrice") as string) || "0");
  const priceLabel = formData.get("priceLabel") as string;
  const quantityAllowed = formData.get("quantityAllowed") === "true" || formData.get("quantityAllowed") === "on";
  const minQuantity = parseInt((formData.get("minQuantity") as string) || "0");
  const maxQuantity = parseInt((formData.get("maxQuantity") as string) || "100");
  const buttonLabel = formData.get("buttonLabel") as string;
  const coverImageUrl = formData.get("coverImageUrl") as string;
  const galleryImages = parseJsonArrayString(formData.get("galleryImages") as string);
  const compatiblePackages = parseJsonArrayString(formData.get("compatiblePackages") as string);
  const tags = formData.get("tags") as string;
  const isFeatured = formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on";
  const isActive = formData.get("isActive") !== "false" && formData.get("isActive") !== null;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");

  await prisma.eventAddon.create({
    data: {
      name, slug, category, shortDescription, fullDescription, startingPrice,
      priceLabel, quantityAllowed, minQuantity, maxQuantity, buttonLabel, coverImageUrl,
      galleryImages, compatiblePackages, tags, isFeatured, isActive, sortOrder
    }
  });

  revalidatePath("/dashboard/events/addons");
}

export async function updateEventAddon(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const fullDescription = formData.get("fullDescription") as string;
  const startingPrice = parseFloat((formData.get("startingPrice") as string) || "0");
  const priceLabel = formData.get("priceLabel") as string;
  const quantityAllowed = formData.get("quantityAllowed") === "true" || formData.get("quantityAllowed") === "on";
  const minQuantity = parseInt((formData.get("minQuantity") as string) || "0");
  const maxQuantity = parseInt((formData.get("maxQuantity") as string) || "100");
  const buttonLabel = formData.get("buttonLabel") as string;
  const coverImageUrl = formData.get("coverImageUrl") as string;
  const galleryImages = parseJsonArrayString(formData.get("galleryImages") as string);
  const compatiblePackages = parseJsonArrayString(formData.get("compatiblePackages") as string);
  const tags = formData.get("tags") as string;
  const isFeatured = formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on";
  const isActive = formData.get("isActive") === "true" || formData.get("isActive") === "on" || formData.get("isActive") === "active";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");

  await prisma.eventAddon.update({
    where: { id },
    data: {
      name, slug, category, shortDescription, fullDescription, startingPrice,
      priceLabel, quantityAllowed, minQuantity, maxQuantity, buttonLabel, coverImageUrl,
      galleryImages, compatiblePackages, tags, isFeatured, isActive, sortOrder
    }
  });

  revalidatePath("/dashboard/events/addons");
}

export async function deleteEventAddon(id: string) {
  await prisma.eventAddon.delete({
    where: { id }
  });
  revalidatePath("/dashboard/events/addons");
}

// ==========================================
// EVENT GALLERY ACTIONS
// ==========================================
export async function createEventGalleryItem(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const galleryImages = parseJsonArrayString(formData.get("galleryImages") as string);
  const tags = formData.get("tags") as string;
  const isFeatured = formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on";
  const isActive = formData.get("isActive") !== "false" && formData.get("isActive") !== null;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");

  await prisma.eventGalleryItem.create({
    data: {
      title, category, location, description, imageUrl, galleryImages, tags, isFeatured,
      isActive, sortOrder
    }
  });

  revalidatePath("/dashboard/events/gallery");
}

export async function updateEventGalleryItem(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const galleryImages = parseJsonArrayString(formData.get("galleryImages") as string);
  const tags = formData.get("tags") as string;
  const isFeatured = formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on";
  const isActive = formData.get("isActive") === "true" || formData.get("isActive") === "on" || formData.get("isActive") === "active";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0");

  await prisma.eventGalleryItem.update({
    where: { id },
    data: {
      title, category, location, description, imageUrl, galleryImages, tags, isFeatured,
      isActive, sortOrder
    }
  });

  revalidatePath("/dashboard/events/gallery");
}

export async function deleteEventGalleryItem(id: string) {
  await prisma.eventGalleryItem.delete({
    where: { id }
  });
  revalidatePath("/dashboard/events/gallery");
}

// ==========================================
// EVENT REQUEST ACTIONS
// ==========================================
export async function updateEventRequestStatus(id: string, status: string) {
  await prisma.eventRequest.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/dashboard/events/requests");
  revalidatePath(`/dashboard/events/requests/${id}`);
}
