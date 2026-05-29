const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing existing portfolio items to avoid duplicates...')
  await prisma.portfolioItem.deleteMany()
  console.log('Database cleared of old portfolio items.')

  console.log('Seeding portfolio items with premium, physical mascot costumes and working Supabase URLs...')

  const portfolioItems = [
    {
      title: "Thunder the Eagle",
      slug: "thunder-the-eagle",
      clientName: "High School Spirit",
      category: "Sports Mascots",
      industry: "Education",
      description: "A custom mascot costume engineered for athletic stunts on school and sports turf. Built with a lightweight molded foam head core, detailed hand-carved facial features, and our proprietary internal ventilation fan system. Outfitted with heavy-duty washable athletic fabrics and slip-resistant performance boots, ensuring maximum performer agility, comfort, and safety.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/thunder_eagle.png",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/thunder_eagle.png",
      galleryImages: JSON.stringify([
        "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_31.jpg",
        "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_32.jpg"
      ]),
      featured: true,
      isPublished: true,
      year: "2023",
      tags: "Lightweight, Cooling Fans, Athletic Performance",
      order: 1
    },
    {
      title: "Techy the Robot",
      slug: "techy-the-robot",
      clientName: "TechCorp Inc.",
      category: "Brand Mascots",
      industry: "Technology",
      description: "An event-ready custom mascot costume designed to drive brand activations at conventions. Combines sleek metallic-finish textiles with internal structural foam molding. Equipped with integrated battery-powered cooling fans, glowing LED eyes, and a highly ventilated mouth grille, delivering a striking tech presence while keeping the performer cool and comfortable for extended shifts.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_28.jpg",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_28.jpg",
      galleryImages: JSON.stringify([
        "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_14.png"
      ]),
      featured: true,
      isPublished: true,
      year: "2024",
      tags: "LED Integration, Rigid Foam Carving, Brand Activation",
      order: 2
    },
    {
      title: "Berry the Bear",
      slug: "berry-the-bear",
      clientName: "Local Sports Club",
      category: "School Mascots",
      industry: "Community",
      description: "A lovable, classic custom mascot costume built to withstand rugged outdoor game environments and hundreds of children's hugs. Hand-tailored with premium, heavy-duty washable faux fur, double-reinforced stitching, and an internal adjustable helmet harness. Designed with wide vision screening for superb performer visibility.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/berry_bear.png",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/berry_bear.png",
      featured: false,
      isPublished: true,
      year: "2022",
      tags: "Durable Fur, Washable Body, High Visibility",
      order: 3
    },
    {
      title: "Prowler the Panther",
      slug: "prowler-panther",
      clientName: "State University",
      category: "Sports Mascots",
      industry: "Education",
      description: "A sleek, powerful custom panther mascot costume created for high-impact hockey rink and basketball court stunts. Features detailed custom muscle-sculpting padding seamlessly integrated into lightweight, breathable performance spandex sections. Complete with a wide-angle vision port and high-capacity internal cooling fan.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/prowler_panther.png",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/prowler_panther.png",
      featured: false,
      isPublished: true,
      year: "2023",
      tags: "Muscle-Sculpting, High Stretch, Ice Ready",
      order: 4
    },
    {
      title: "Tommy the Tire",
      slug: "tommy-tire",
      clientName: "Wilson's Auto",
      category: "Brand Mascots",
      industry: "Automotive",
      description: "A specialized custom mascot costume built to resemble a physical product. Features an innovative, ultra-lightweight structural internal tension ring to perfectly maintain the flawless circular tire shape during movement. Outfitted with high-transparency mesh panels for excellent performer visibility and ventilation.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/tommy_tire.png",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/tommy_tire.png",
      galleryImages: JSON.stringify([
        "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_21.png"
      ]),
      featured: true,
      isPublished: true,
      year: "2023",
      tags: "Lightweight Structure, Tension Ring, Brand Activation",
      order: 5
    },
    {
      title: "Captain Crimson",
      slug: "captain-crimson",
      clientName: "City College",
      category: "School Mascots",
      industry: "Education",
      description: "A proud heroic humanoid custom mascot costume representing high school and sports legacy. Sculpted using high-density foam for the armor and jawline, tailored with lightweight premium fabrics, and equipped with a high-flow internal cooling fan to ensure maximum performer endurance during warm daytime parades.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_37.jpg",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/local_asset_37.jpg",
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
      category: "Event Mascots",
      industry: "Events",
      description: "An oversized seasonal custom mascot costume designed for winter street festivals. Crafted with shimmering white faux fur and structured foam layers to maintain his round body shape without adding heavy bulk. Outfitted with an internal cooling vest and secret side mesh ventilation pockets to prevent heat fatigue.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/frosty_snowman.png",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/frosty_snowman.png",
      featured: false,
      isPublished: true,
      year: "2022",
      tags: "Seasonal, Lightweight Structure, Cooling Vest",
      order: 7
    },
    {
      title: "Blaze the Dragon",
      slug: "blaze-dragon",
      clientName: "Firebirds Hockey",
      category: "Sports Mascots",
      industry: "Sports",
      description: "A spectacular custom dragon mascot costume engineered for ice rink performances. Built with articulated wings that expand via performer arm motion and an internal LED mouth lighting system. Features custom-engineered slip-resistant hockey outsoles for exceptional stability and performer safety on the ice.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/blaze_dragon.png",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/blaze_dragon.png",
      featured: true,
      isPublished: true,
      year: "2024",
      tags: "LED Mouth, Articulated Wings, Ice Grip Outsoles",
      order: 8
    },
    {
      title: "Corky the Cup",
      slug: "corky-cup",
      clientName: "Morning Roast Coffee",
      category: "Restaurant Mascots",
      industry: "Food & Beverage",
      description: "A commercial custom mascot costume designed to drive street-level cafe activations. Constructed using a rigid, featherlight carbon-fiber interior cylindrical frame. Built with custom-printed durable textiles and wide-mesh eye screens hidden in the face design to ensure clear vision and excellent ventilation.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/corky_cup.png",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/corky_cup.png",
      featured: false,
      isPublished: true,
      year: "2023",
      tags: "Carbon Fiber, Rigid Frame, High Mobility",
      order: 9
    },
    {
      title: "Finny the Shark",
      slug: "finny-shark",
      clientName: "Oceanside Aquarium",
      category: "Event Mascots",
      industry: "Tourism",
      description: "An incredibly approachable custom mascot costume created for family and aquarium activations. Crafted with premium, soft-touch custom-dyed blue fabrics and extra-wide internal ventilation gaps. Features highly flexible lightweight fins allowing the performer to dance and wave easily.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/finny_shark.png",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/finny_shark.png",
      featured: false,
      isPublished: true,
      year: "2023",
      tags: "Soft Plush, Flexible Fins, Child Friendly",
      order: 10
    },
    {
      title: "Cheesy the Burger",
      slug: "cheesy-burger",
      clientName: "Burger Town",
      category: "Restaurant Mascots",
      industry: "Food & Beverage",
      description: "A nostalgic custom burger mascot costume designed for restaurant promotions and grand openings. Features intricate hand-painted foam sculpting to simulate a realistic multi-layered cheeseburger, combined with tailored comfortable fabrics, built-in cooling fan, and lightweight structural rings.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/cheesy_burger.png",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/cheesy_burger.png",
      featured: true,
      isPublished: true,
      year: "2021",
      tags: "Hand-Painted Foam, Multi-Layered, Custom Fit",
      order: 11
    },
    {
      title: "Turbo the Speedster",
      slug: "turbo-speedster",
      clientName: "Racing Circuit",
      category: "Character Costumes",
      industry: "Gaming",
      description: "A high-performance promotional custom mascot costume built for rapid movements and sprints at racing circuit events. Engineered with a specialized foam skull cap, high-stretch activewear textiles, custom ventilation grills, and reinforced anti-tear stitching.",
      coverImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/turbo_speedster.png",
      thumbnailImage: "https://mpiirvcygcqhiwcdxxfu.supabase.co/storage/v1/object/public/mascot-assets/turbo_speedster.png",
      featured: false,
      isPublished: true,
      year: "2023",
      tags: "Activewear Fabric, High Sprint, Ventilation Grills",
      order: 12
    }
  ];

  for (const item of portfolioItems) {
    await prisma.portfolioItem.create({ data: item });
    console.log(`Created physical mascot: ${item.title}`);
  }

  console.log('Seeding process completed successfully.')
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
