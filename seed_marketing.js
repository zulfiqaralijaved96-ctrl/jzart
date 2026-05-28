const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding marketing settings and logos with local Mascot imagery...')

  // Upsert settings
  const existingSettings = await prisma.siteSettings.findFirst();
  if (existingSettings) {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: {
        heroImageUrl: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/hero_mascot.jpg",
        studioImageUrl: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/studio_mascot.jpg",
        finalRevealVideo: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/video_mascot.jpg"
      }
    });
    console.log("Updated SiteSettings with local mascot images.");
  } else {
    // If deleted, recreate
    await prisma.siteSettings.create({
      data: {
        heroBadge: "Premium Mascot Fabricators",
        heroTitle: 'High-End Custom Mascots<br/>Built for<br/><span class="t-accent">Maximum Performance</span>',
        heroSubtitle: "Exquisite physical mascot manufacturing featuring high-grade foam carving, custom-engineered ventilation, and ergonomic comfort. Built for ultimate durability and high-impact brand presence.",
        heroImageUrl: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/hero_mascot.jpg",
        studioTitle: "Over 20 Years of<br/>Fabrication & Foam Carving",
        studioLocation: "Our Workshop / Manila, Philippines",
        studioImageUrl: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/studio_mascot.jpg",
        finalRevealTitle: "The Engineered Character<br/>Comes to Life",
        finalRevealVideo: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/video_mascot.jpg"
      }
    });
    console.log("Created SiteSettings with local mascot images.");
  }

  // Wipe out the old VW logos from Unsplash 
  await prisma.partnerLogo.deleteMany();

  // Seed Partner Logos (Use the user's actual logo.svg or simple geometric placeholders)
  const heroLogos = [
    { name: "Brand Partner 1", logoUrl: "/globe.svg", section: "HERO", order: 1 },
    { name: "Brand Partner 2", logoUrl: "/window.svg", section: "HERO", order: 2 },
    { name: "Brand Partner 3", logoUrl: "/file.svg", section: "HERO", order: 3 },
    { name: "Brand Partner 4", logoUrl: "/globe.svg", section: "HERO", order: 4 },
  ];

  for (const logo of heroLogos) {
    await prisma.partnerLogo.create({ data: logo });
  }
  
  const wallLogos = [
    { name: "Client 1", logoUrl: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/logo.svg", section: "WALL", order: 1 },
    { name: "Client 2", logoUrl: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/logo.svg", section: "WALL", order: 2 },
    { name: "Client 3", logoUrl: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/logo.svg", section: "WALL", order: 3 },
    { name: "Client 4", logoUrl: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/logo.svg", section: "WALL", order: 4 },
    { name: "Client 5", logoUrl: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/logo.svg", section: "WALL", order: 5 },
    { name: "Client 6", logoUrl: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/logo.svg", section: "WALL", order: 6 },
  ];
  
  for (const logo of wallLogos) {
    await prisma.partnerLogo.create({ data: logo });
  }

  console.log("Replaced generic VW logos with UI wireframe placeholders.");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
