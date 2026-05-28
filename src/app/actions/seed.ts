"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  // Ensure Admin user exists
  const adminUser = await prisma.user.findUnique({ where: { email: "admin@jzarts.com" } });
  if (!adminUser) {
    const passwordHash = await bcrypt.hash("admin", 10);
    await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@jzarts.com",
        passwordHash,
        role: "ADMIN",
      },
    });
  }

  // Check if we already have data
  const leadCount = await prisma.lead.count();
  if (leadCount > 0) return { success: true, message: "Admin user checked and database already seeded!" };

  // 1. Create Leads
  await prisma.lead.createMany({
    data: [
      { name: "John Doe", email: "john@example.com", phone: "555-0100", company: "High School Spirit", mascotType: "Eagle", quantity: 1, budget: "$3,000" },
      { name: "Sarah Smith", email: "sarah@university.edu", phone: "555-0101", company: "State University", mascotType: "Panther", quantity: 2, budget: "$8,000", status: "CONTACTED" },
      { name: "Mike Johnson", email: "mike@sportsclub.com", mascotType: "Bear", quantity: 1, status: "QUALIFIED" },
      { name: "Emily Davis", email: "emily@corporate.com", company: "TechCorp", mascotType: "Robot", quantity: 1, status: "LOST" },
      { name: "Chris Wilson", email: "chris@localbrand.net", company: "Wilson's Auto", mascotType: "Tire Man", budget: "$4,500" },
    ],
  });

  // 2. Create Clients
  const client1 = await prisma.client.create({
    data: { name: "University of ABC", company: "University of ABC", email: "athletics@abc.edu", phone: "555-0200", address: "123 College Ave" }
  });
  
  const client2 = await prisma.client.create({
    data: { name: "Pro Sports Team", company: "Pro Sports LLC", email: "mascot@prosports.com", phone: "555-0201", address: "456 Stadium Dr" }
  });

  // 3. Create Projects
  await prisma.project.create({
    data: {
      clientId: client1.id,
      title: "ABC Mascot Renewal",
      status: "PRODUCING",
      startDate: new Date(),
    }
  });

  await prisma.project.create({
    data: {
      clientId: client2.id,
      title: "New Team Mascot",
      status: "PLANNING",
    }
  });

  // 4. Create Portfolio Items
  const portfolioItems = [
    {
      title: "Thunder the Eagle",
      slug: "thunder-the-eagle",
      clientName: "High School Spirit",
      category: "Sports",
      industry: "Education",
      description: "A dynamic and fiercely competitive eagle mascot featuring a specialized lightweight foam core for high-flying stunt performances. The character incorporates our proprietary cooling system and custom-dyed athletic fabrics designed for maximum agility.\n\nKey features include an articulated beak structure and oversized wingspan designed to command attention from the stadium bleachers.",
      coverImage: "https://images.unsplash.com/photo-1549247796-6b2158864d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnailImage: "https://images.unsplash.com/photo-1549247796-6b2158864d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]),
      featured: true,
      isPublished: true,
      year: "2023",
      tags: "Lightweight, Cooling System, Athletic",
      order: 1
    },
    {
      title: "Techy the Robot",
      slug: "techy-the-robot",
      clientName: "TechCorp Inc.",
      category: "Corporate",
      industry: "Technology",
      description: "Bringing silicon and steel to life through soft, huggable fabrics. Techy the Robot was designed to make a notoriously cold tech brand feel approachable and fun at consumer electronics conventions.\n\nThe suit features embedded programmable LED arrays in the eyes and chest plate, alongside metallic-finish textiles that retain breathability.",
      coverImage: "https://images.unsplash.com/photo-1531746790731-6bc0fbce2bf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnailImage: "https://images.unsplash.com/photo-1531746790731-6bc0fbce2bf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]),
      featured: true,
      isPublished: true,
      year: "2024",
      tags: "LED Integration, Metallic Fabrics",
      order: 2
    },
    {
      title: "Berry the Bear",
      slug: "berry-the-bear",
      clientName: "Local Sports Club",
      category: "Sports",
      industry: "Community",
      description: "A classic, lovable bear character built for long-duration community appearances. Berry required extremely durable, washable faux fur capable of withstanding rough outdoor conditions and hundreds of children's hugs.",
      coverImage: "https://images.unsplash.com/photo-1560114928-40f1f1d2ce6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnailImage: "https://images.unsplash.com/photo-1560114928-40f1f1d2ce6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      isPublished: true,
      year: "2022",
      tags: "Heavy Duty Faux Fur, Washable",
      order: 3
    },
    {
      title: "Prowler the Panther",
      slug: "prowler-panther",
      clientName: "State University",
      category: "Sports",
      industry: "Education",
      description: "A sleek, intimidating panther design combining high-performance spandex segments with targeted muscle-sculpting padding to create an athletic, powerful silhouette.",
      coverImage: "https://images.unsplash.com/photo-1549480111-9a9ecf20a9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnailImage: "https://images.unsplash.com/photo-1549480111-9a9ecf20a9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      isPublished: true,
      order: 4
    },
    {
      title: "Tommy the Tire",
      slug: "tommy-tire",
      clientName: "Wilson's Auto",
      category: "Custom Objects",
      industry: "Automotive",
      description: "Transforming an inanimate object into a charismatic character is our specialty. Tommy features an innovative internal tension ring that maintains the perfect circular shape regardless of how the performer moves.",
      coverImage: "https://images.unsplash.com/photo-1617300326442-fbbc105ec2c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnailImage: "https://images.unsplash.com/photo-1617300326442-fbbc105ec2c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      galleryImages: JSON.stringify([
         "https://images.unsplash.com/photo-1590202482326-fa4d2be73426?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]),
      featured: true,
      isPublished: true,
      year: "2023",
      tags: "Structural Engineering",
      order: 5
    }
  ];

  for (const item of portfolioItems) {
    await prisma.portfolioItem.create({ data: item });
  }

  revalidatePath("/dashboard");
  revalidatePath("/leads");
  revalidatePath("/clients");
  revalidatePath("/portfolio");

  return { success: true, message: "Successfully seeded initial data." };
}
