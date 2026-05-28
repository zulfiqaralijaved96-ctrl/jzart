"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function seedHomePageContent() {
  try {
    // 1. Site Settings
    const existingSettings = await prisma.siteSettings.findFirst();
    if (!existingSettings) {
      await prisma.siteSettings.create({
        data: {} // Relies on defaults from schema
      });
    }

    // 2. Partner Logos
    const existingLogos = await prisma.partnerLogo.count();
    if (existingLogos === 0) {
      await prisma.partnerLogo.createMany({
        data: [
          { name: "Knorr", logoUrl: "/uploads/local_asset_4.png", section: "HERO", order: 1 },
          { name: "Walls", logoUrl: "/uploads/local_asset_5.png", section: "HERO", order: 2 },
          { name: "Unilever", logoUrl: "/uploads/local_asset_6.png", section: "HERO", order: 3 },
          { name: "P&G", logoUrl: "/uploads/local_asset_7.png", section: "HERO", order: 4 },
          
          { name: "Partner 1", logoUrl: "/uploads/local_asset_8.png", section: "WALL", order: 1 },
          { name: "Partner 2", logoUrl: "/uploads/local_asset_9.png", section: "WALL", order: 2 },
          { name: "Partner 3", logoUrl: "/uploads/local_asset_10.png", section: "WALL", order: 3 },
          { name: "Partner 4", logoUrl: "/uploads/local_asset_11.png", section: "WALL", order: 4 },
          { name: "Partner 5", logoUrl: "/uploads/local_asset_12.png", section: "WALL", order: 5 },
          { name: "Partner 6", logoUrl: "/uploads/local_asset_13.png", section: "WALL", order: 6 },
        ]
      });
    }

    // 3. Process Steps
    const existingSteps = await prisma.processStep.count();
    if (existingSteps === 0) {
      await prisma.processStep.createMany({
        data: [
          {
            stepNumber: "01",
            title: "Anatomical Blueprinting",
            description: "We translate character concepts into precise structural 3D blueprints, engineering perfect balance, optimized performer sightlines, and anatomical proportions before fabrication begins.",
            imageUrl: "/uploads/local_asset_14.png",
            order: 1
          },
          {
            stepNumber: "02",
            title: "Precision Foam Carving",
            description: "Using premium, high-density industrial foam, our master artisans hand-carve the core anatomy, sculpting custom ventilation channels and carving expressive physical traits directly into the head structure.",
            imageUrl: "/uploads/local_asset_15.png",
            order: 2
          },
          {
            stepNumber: "03",
            title: "Ergonomic Assembly",
            description: "The high-grade foam skeleton is reinforced and bonded with lightweight internal support rings, integrating our advanced Vis/Vent ventilation cooling system for maximum airflow and heat dissipation.",
            imageUrl: "/uploads/local_asset_16.png",
            order: 3
          },
          {
            stepNumber: "04",
            title: "Premium Fabric Application",
            description: "We source and apply heavy-duty, commercial-grade athletic fabrics, custom-dyed faux furs, and wear-resistant textiles, ensuring extreme durability under intense physical performance.",
            imageUrl: "/uploads/local_asset_17.png",
            order: 4
          },
          {
            stepNumber: "05",
            title: "Master Hand-Stitching",
            description: "Every seam is reinforced with high-tensile industrial stitching. Expressive physical eyes, custom details, and ergonomic harness straps are hand-crafted to secure a perfect fit for the performer.",
            imageUrl: "/uploads/local_asset_18.png",
            order: 5
          }
        ]
      });
    }

    // 4. Portfolio Items
    const existingPortfolio = await prisma.portfolioItem.count();
    if (existingPortfolio === 0) {
      await prisma.portfolioItem.createMany({
        data: [
          {
            title: "Sparky the Bolt",
            slug: "sparky-the-bolt",
            clientName: "Energy Solutions Corp",
            category: "Corporate",
            coverImage: "/uploads/local_asset_19.png",
            order: 1
          },
          {
            title: "Honey Bear",
            slug: "honey-bear",
            clientName: "Nature's Best",
            category: "Food Brands",
            coverImage: "/uploads/local_asset_20.png",
            order: 2
          },
          {
            title: "Cyber Cat",
            slug: "cyber-cat",
            clientName: "TechVerse",
            category: "Corporate",
            coverImage: "/uploads/local_asset_21.png",
            order: 3
          },
          {
            title: "Glee Monster",
            slug: "glee-monster",
            clientName: "Festival of Joy",
            category: "Events",
            coverImage: "/uploads/local_asset_22.png",
            order: 4
          }
        ]
      });
    }

    revalidatePath("/");
    revalidatePath("/dashboard/site-content");
    return { success: true };
  } catch (error) {
    console.error("Error seeding content:", error);
    return { success: false, error: String(error) };
  }
}
