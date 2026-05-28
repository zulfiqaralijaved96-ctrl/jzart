const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding portfolio items with Mascot-specific imagery...')

  const portfolioItems = [
    {
      title: "Thunder the Eagle",
      slug: "thunder-the-eagle",
      clientName: "High School Spirit",
      category: "Sports",
      industry: "Education",
      description: "A dynamic and fiercely competitive eagle mascot featuring a specialized lightweight foam core for high-flying stunt performances. The character incorporates our proprietary cooling system and custom-dyed athletic fabrics designed for maximum agility.\n\nKey features include an articulated beak structure and oversized wingspan designed to command attention from the stadium bleachers.",
      coverImage: "https://images.unsplash.com/photo-1577908906060-1596e4fc348f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Eagle mascot
      thumbnailImage: "https://images.unsplash.com/photo-1577908906060-1596e4fc348f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1549480111-9a9ecf20a9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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
      coverImage: "https://images.unsplash.com/photo-1531746790731-6bc0fbce2bf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Robot costume
      thumbnailImage: "https://images.unsplash.com/photo-1531746790731-6bc0fbce2bf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      galleryImages: JSON.stringify([
        "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_28.jpg"
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
      coverImage: "https://images.unsplash.com/photo-1590202482326-fa4d2be73426?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Bear mascot suit
      thumbnailImage: "https://images.unsplash.com/photo-1590202482326-fa4d2be73426?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_31.jpg", // Panther/Tiger mascot
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_32.jpg",
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
      coverImage: "https://images.unsplash.com/photo-1549480111-9a9ecf20a9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Large foam costume
      thumbnailImage: "https://images.unsplash.com/photo-1549480111-9a9ecf20a9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      isPublished: true,
      year: "2023",
      tags: "Structural Engineering",
      order: 5
    },
    {
      title: "Captain Crimson",
      slug: "captain-crimson",
      clientName: "City College",
      category: "Sports",
      industry: "Education",
      description: "A bold humanoid mascot with oversized armor and an expressive heroic jawline. Captain Crimson serves as the face of City College athletics, designed to inspire the crowd with dynamic poses.",
      coverImage: "https://images.unsplash.com/photo-1560114928-40f1f1d2ce6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Hero costume
      thumbnailImage: "https://images.unsplash.com/photo-1560114928-40f1f1d2ce6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      isPublished: true,
      year: "2021",
      tags: "Heroic, Armor, Humanoid",
      order: 6
    },
    {
      title: "Frosty the Snowman",
      slug: "frosty-snowman",
      clientName: "Winter Fest",
      category: "Entertainment",
      industry: "Events",
      description: "A magical, oversized seasonal character designed for an annual winter festival. Frosty was built with specialized glittering white faux fur and an internal cooling vest for the performer, ensuring comfort during long holiday parades.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_37.jpg", // Snowman style costume
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_38.jpg",
      featured: false,
      isPublished: true,
      year: "2022",
      tags: "Seasonal, Faux Fur, Lighting System",
      order: 7
    },
    {
      title: "Blaze the Dragon",
      slug: "blaze-dragon",
      clientName: "Firebirds Hockey",
      category: "Sports",
      industry: "Sports",
      description: "A fierce dragon mascot with articulated wings and an internal LED system in the mouth to simulate breathing fire. Built strictly for the ice, Blaze features special gripping outsoles for safe performance on hockey rinks.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_39.jpg", // Mascot suit
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_40.jpg",
      featured: true,
      isPublished: true,
      year: "2024",
      tags: "LED, Articulated Wings, Ice Grip",
      order: 8
    },
    {
      title: "Corky the Cup",
      slug: "corky-cup",
      clientName: "Morning Roast Coffee",
      category: "Custom Objects",
      industry: "Food & Beverage",
      description: "A larger-than-life walking coffee cup designed for street-level brand activations. Corky is engineered with a rigid, ultra-lightweight carbon fiber frame to perfectly maintain the cylinder shape while allowing full mobility.",
      coverImage: "https://images.unsplash.com/photo-1544819491-0eab8bfdd158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Object mascot
      thumbnailImage: "https://images.unsplash.com/photo-1544819491-0eab8bfdd158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      isPublished: true,
      year: "2023",
      tags: "Carbon Fiber, Rigid Structure",
      order: 9
    },
    {
      title: "Finny the Shark",
      slug: "finny-shark",
      clientName: "Oceanside Aquarium",
      category: "Entertainment",
      industry: "Tourism",
      description: "An approachable, friendly shark character created to educate children about marine life. Features custom-dyed aquatic blue textiles and a soft, plush exterior that invites interaction.",
      coverImage: "https://images.unsplash.com/photo-1562928829-1b32f5d96f9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Shark character
      thumbnailImage: "https://images.unsplash.com/photo-1562928829-1b32f5d96f9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      isPublished: true,
      order: 10
    },
    {
      title: "Cheesy the Burger",
      slug: "cheesy-burger",
      clientName: "Burger Town",
      category: "Corporate",
      industry: "Food & Beverage",
      description: "A nostalgic retro remake of a classic burger mascot. Features intricate hand-painted foam detailing to simulate a real cheeseburger, combined with tailored plush clothing.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_45.jpg", // Object costume
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_46.jpg",
      featured: true,
      isPublished: true,
      year: "2021",
      order: 11
    },
    {
      title: "Turbo the Speedster",
      slug: "turbo-speedster",
      clientName: "Racing Circuit",
      category: "Entertainment",
      industry: "Gaming",
      description: "A promotional walkaround suit created for a localized event. Accurately scaled and painted to match iconic pantone colors, designed for sprinting and jumping safely.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_47.jpg", // Racing mascot
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_48.jpg",
      featured: false,
      isPublished: true,
      order: 12
    }
  ];

  for (const item of portfolioItems) {
    const existing = await prisma.portfolioItem.findUnique({ where: { slug: item.slug } })
    if(existing) {
       await prisma.portfolioItem.update({ where: { slug: item.slug }, data: item });
       console.log(`Updated: ${item.title}`)
    } else {
       await prisma.portfolioItem.create({ data: item });
       console.log(`Created: ${item.title}`)
    }
  }

  console.log('Done seeding portfolio.')
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
