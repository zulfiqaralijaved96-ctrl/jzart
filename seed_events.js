const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding JZ Events database items...');

  // 1. Seed JZ Events Packages
  const eventPackages = [
    {
      name: "Basic Birthday Setup",
      slug: "basic-birthday",
      shortDescription: "Ideal for home birthdays & smaller family gatherings in Karachi. Covers essential custom styling elements.",
      fullDescription: "Our Basic Setup package is tailored to bring character-themed joy directly to your living room or backyard. Ideal for intimate gatherings where space is cozy but a custom backdrop is a must.",
      bestFor: "Cozy spaces, Home lounges, Small gardens",
      includedItems: JSON.stringify([
        "Standard themed backdrop (8ft x 8ft)",
        "Cake table themed decoration",
        "Balloon garland border (up to 150 balloons)",
        "Welcome standee board at entrance",
        "1-2 character standee cutouts",
        "Standard cake cake-cutting stand"
      ]),
      optionalAddons: JSON.stringify(["cartoon-bouncy-house", "cotton-candy-cart", "popcorn-machine"]),
      startingPrice: 25000,
      priceLabel: "Rs. 25,000",
      setupTime: "1.5 - 2 Hours",
      guestRange: "Up to 30 Guests",
      coverImageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 10
    },
    {
      name: "Premium Birthday Setup",
      slug: "premium-birthday",
      shortDescription: "Perfect for larger backyard birthdays or banquet setups. Adds entrance styling, photo corners, and premium light sets.",
      fullDescription: "Elevate your celebration with professional lighting, expansive custom organic balloon installations, and custom guest welcome paths. Our most popular choice for banquet halls and large backyards.",
      bestFor: "Banquet halls, Large backyards, Club lawns",
      includedItems: JSON.stringify([
        "Large premium themed backdrop (12ft x 8ft)",
        "Deluxe themed cake table & cake stands",
        "Organic balloon arch/garland (300+ balloons)",
        "3-4 character standees matching theme",
        "Decorative entrance entryway & themed path",
        "Dedicated photo corner backdrop",
        "Basic LED spotlight fixtures & ambient lighting"
      ]),
      optionalAddons: JSON.stringify(["mega-castle-slide", "cartoon-bouncy-house", "cotton-candy-cart", "popcorn-machine", "puppet-show", "magic-show", "balloon-twister"]),
      startingPrice: 60000,
      priceLabel: "Rs. 60,000",
      setupTime: "3 - 4 Hours",
      guestRange: "30 - 80 Guests",
      coverImageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 20
    },
    {
      name: "Grand Theme Event",
      slug: "grand-theme",
      shortDescription: "Designed for banquet halls, large school arenas, and large outdoor gardens. Creates a fully immersive theme setup.",
      fullDescription: "Make a breathtaking statement. Features massive double-decker thematic tables, 3D custom-designed entryway portals, full-stage coverage, and continuous on-site coordinator presence to manage every detail.",
      bestFor: "Large banquet halls, School grounds, Massive lawn events",
      includedItems: JSON.stringify([
        "Full environment themed backdrop (16ft+ stage)",
        "3D theme entrance portal tunnel",
        "Double decker themed cake/desert table",
        "Massive balloon installations & ceiling drops",
        "5+ lifelike themed character props & stands",
        "Dedicated high-fidelity photo booth zone",
        "Professional stage lighting rig (6 focus lights)",
        "On-site event supervisor throughout duration"
      ]),
      optionalAddons: JSON.stringify(["mega-castle-slide", "cotton-candy-cart", "popcorn-machine", "puppet-show", "magic-show", "sound-system", "silent-generator-50kva", "custom-goodie-bags", "balloon-twister", "themed-entrance", "bubble-machine"]),
      startingPrice: 150000,
      priceLabel: "Rs. 150,000",
      setupTime: "6 - 8 Hours",
      guestRange: "80 - 250 Guests",
      coverImageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 30
    },
    {
      name: "Custom Corporate / School Event",
      slug: "custom-corporate",
      shortDescription: "Turnkey brand activations, massive school sports galas, corporate family days, and mall setups in Karachi.",
      fullDescription: "A fully customizable premium corporate or institutional activation. Built with safety certification, custom brand collateral printing, massive activity stages, sound reinforcement systems, and professional project managers.",
      bestFor: "Corporate campuses, Sports grounds, Commercial centers",
      includedItems: JSON.stringify([
        "Custom conceptual layout & architectural mockups",
        "Dedicated activity zones & custom play sections",
        "Full branding installation & banner printing",
        "Commercial inflatable attractions setup",
        "Turnkey stage production & professional audio systems",
        "Rigorously checked safety plans & certified staff",
        "Complete logistics, setup, and teardown management"
      ]),
      optionalAddons: JSON.stringify(["mega-castle-slide", "cotton-candy-cart", "popcorn-machine", "sound-system", "silent-generator-50kva", "themed-entrance"]),
      startingPrice: 0,
      priceLabel: "Request Quote",
      setupTime: "8 - 12 Hours",
      guestRange: "250+ Guests",
      coverImageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 40
    }
  ];

  for (const pkg of eventPackages) {
    const existing = await prisma.eventPackage.findUnique({ where: { slug: pkg.slug } });
    if (existing) {
      await prisma.eventPackage.update({ where: { slug: pkg.slug }, data: pkg });
      console.log(`Updated package: ${pkg.name}`);
    } else {
      await prisma.eventPackage.create({ data: pkg });
      console.log(`Created package: ${pkg.name}`);
    }
  }

  // 2. Seed JZ Events Themes
  const eventThemes = [
    {
      name: "Jungle Safari Expedition",
      slug: "jungle-safari",
      publicSafeName: "Jungle Safari Expedition",
      category: "Animals & Adventure",
      description: "An adventurous jungle backdrop complete with lush green palm arches, cute watercolor monkeys, giraffes, and lions, perfect for active young explorers.",
      colorPalette: JSON.stringify(["#15803d", "#22c55e", "#eab308", "#ffffff"]),
      bestAgeGroup: "1 - 7 Years",
      recommendedPackage: "Premium Birthday Setup",
      coverImageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 10
    },
    {
      name: "Super Speedster Race Track",
      slug: "neon-race-car",
      publicSafeName: "Super Speedster Race Track",
      category: "Action & Vehicles",
      description: "Race-themed event setup with checkered flags, red racing car standees, start/finish arches, and high-energy neon color schemes.",
      colorPalette: JSON.stringify(["#ff3b30", "#000000", "#ffcc00", "#007aff"]),
      bestAgeGroup: "3 - 10 Years",
      recommendedPackage: "Premium Birthday Setup",
      coverImageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 20
    },
    {
      name: "Magical Sweet Candy Land",
      slug: "candy-land",
      publicSafeName: "Magical Sweet Candy Land",
      category: "Fantasy & Magic",
      description: "Step into a whimsical world of giant lollipop standees, swirl candy backdrops, pastel balloon clouds, and fairytale gingerbread houses.",
      colorPalette: JSON.stringify(["#ff85a2", "#ffb3c6", "#ffc6ff", "#e8dbfc"]),
      bestAgeGroup: "2 - 8 Years",
      recommendedPackage: "Grand Theme Event",
      coverImageUrl: "https://images.unsplash.com/photo-1507504038482-76210f5c055a?w=500&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 30
    },
    {
      name: "Cosmic Rocket & Space Odyssey",
      slug: "space-odyssey",
      publicSafeName: "Cosmic Rocket & Space Odyssey",
      category: "Sci-Fi & Cosmic",
      description: "Travel to the stars with galaxy backdrops, rocket cutouts, astronaut props, and glowing LED star constellations.",
      colorPalette: JSON.stringify(["#1e1b4b", "#4338ca", "#06b6d4", "#f1f5f9"]),
      bestAgeGroup: "4 - 12 Years",
      recommendedPackage: "Grand Theme Event",
      coverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 40
    },
    {
      name: "Jurassic Dino Kingdom",
      slug: "jurassic-dino",
      publicSafeName: "Jurassic Dino Kingdom",
      category: "Prehistoric & Adventure",
      description: "Walk with giants among deep jungle vines, T-Rex cardboard cutouts, volcanic backdrops, and earthy stone pedestals.",
      colorPalette: JSON.stringify(["#0f2d1e", "#3f6212", "#ca8a04", "#854d0e"]),
      bestAgeGroup: "2 - 9 Years",
      recommendedPackage: "Premium Birthday Setup",
      coverImageUrl: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=500&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 50
    },
    {
      name: "Pastel Rainbow Unicorn",
      slug: "rainbow-unicorn",
      publicSafeName: "Pastel Rainbow Unicorn",
      category: "Fantasy & Magic",
      description: "Sparkling unicorn fantasy backdrop adorned with pastel pink, lilac, and soft yellow balloon arches, and gold glitter horn details.",
      colorPalette: JSON.stringify(["#fbcfe8", "#c084fc", "#93c5fd", "#fef08a"]),
      bestAgeGroup: "1 - 8 Years",
      recommendedPackage: "Basic Birthday Setup",
      coverImageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 60
    },
    {
      name: "Under the Sea Mermaid Cave",
      slug: "sea-mermaid",
      publicSafeName: "Under the Sea Mermaid Cave",
      category: "Water & Wonders",
      description: "Dive deep with coral reefs, friendly starfish, giant oyster shells with pearl pillows, and teal wave streamers.",
      colorPalette: JSON.stringify(["#0d9488", "#2dd4bf", "#818cf8", "#f472b6"]),
      bestAgeGroup: "2 - 10 Years",
      recommendedPackage: "Premium Birthday Setup",
      coverImageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 70
    },
    {
      name: "Enchanted Fairy Forest",
      slug: "fairy-garden",
      publicSafeName: "Enchanted Fairy Forest",
      category: "Fantasy & Magic",
      description: "A whimsical fairy garden layout with woodland tree logs, moss table spreads, butterflies, and sparkling string lights.",
      colorPalette: JSON.stringify(["#16a34a", "#86efac", "#d8b4fe", "#fae8ff"]),
      bestAgeGroup: "3 - 8 Years",
      recommendedPackage: "Premium Birthday Setup",
      coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 80
    },
    {
      name: "Superhero City Skyline",
      slug: "superhero-city",
      publicSafeName: "Superhero City Skyline",
      category: "Action & Heroes",
      description: "Save the day in front of a comic book city skyline, glowing superhero logos, and actions-packed speech bubble props.",
      colorPalette: JSON.stringify(["#dc2626", "#2563eb", "#facc15", "#0f172a"]),
      bestAgeGroup: "3 - 11 Years",
      recommendedPackage: "Premium Birthday Setup",
      coverImageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 90
    },
    {
      name: "Wild West Cowboy Frontier",
      slug: "wild-west",
      publicSafeName: "Wild West Cowboy Frontier",
      category: "Adventure & Retro",
      description: "Yeehaw! A rustic cowboy setting with wagon wheels, hay bales, wooden fence panels, and custom Sheriff star graphics.",
      colorPalette: JSON.stringify(["#b45309", "#d97706", "#fef3c7", "#78350f"]),
      bestAgeGroup: "4 - 10 Years",
      recommendedPackage: "Premium Birthday Setup",
      coverImageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 100
    },
    {
      name: "Royal Palace Ballroom",
      slug: "royal-palace",
      publicSafeName: "Royal Palace Ballroom",
      category: "Elegant & Classic",
      description: "An elegant princess/prince castle scene with gold crown emblems, velvet carpet runners, and majestic castle towers.",
      colorPalette: JSON.stringify(["#1e3a8a", "#d97706", "#ffffff", "#f8fafc"]),
      bestAgeGroup: "1 - 6 Years",
      recommendedPackage: "Grand Theme Event",
      coverImageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 110
    },
    {
      name: "Pirates Treasure Cove",
      slug: "pirate-island",
      publicSafeName: "Pirates Treasure Cove",
      category: "Adventure & Pirates",
      description: "Set sail to treasure island with wooden pirate ships, gold doubloons, sand decor, and skull-and-crossbones flags.",
      colorPalette: JSON.stringify(["#991b1b", "#1e293b", "#eab308", "#78350f"]),
      bestAgeGroup: "4 - 12 Years",
      recommendedPackage: "Premium Birthday Setup",
      coverImageUrl: "https://images.unsplash.com/photo-1505664194779-8bebcb95c539?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 120
    }
  ];

  for (const th of eventThemes) {
    const existing = await prisma.eventTheme.findUnique({ where: { slug: th.slug } });
    if (existing) {
      await prisma.eventTheme.update({ where: { slug: th.slug }, data: th });
      console.log(`Updated theme: ${th.name}`);
    } else {
      await prisma.eventTheme.create({ data: th });
      console.log(`Created theme: ${th.name}`);
    }
  }

  // 3. Seed JZ Events Addons
  const eventAddons = [
    {
      name: "Mega Castle Slide Inflatable",
      slug: "mega-castle-slide",
      category: "Jumping Castles",
      shortDescription: "Our flagship double-slide bouncy castle. Guaranteed to keep up to 15 kids entertained concurrently.",
      fullDescription: "Premium structural quality with top-tier anchor points. Inspected periodically for secure operations. Includes continuous air-blower.",
      startingPrice: 18000,
      priceLabel: "Rs. 18,000 / day",
      quantityAllowed: false,
      coverImageUrl: "https://images.unsplash.com/photo-1572244144345-df943a44f30a?w=500&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 10
    },
    {
      name: "Cartoon Bouncy House",
      slug: "cartoon-bouncy-house",
      category: "Jumping Castles",
      shortDescription: "A standard-size themed bouncy castle perfect for backyards and medium-sized gardens.",
      fullDescription: "Vibrant custom graphics and fully netted protective borders. Safe for toddlers and children up to 8 years.",
      startingPrice: 12000,
      priceLabel: "Rs. 12,000 / day",
      quantityAllowed: false,
      coverImageUrl: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 20
    },
    {
      name: "Live Cotton Candy Cart",
      slug: "cotton-candy-cart",
      category: "Live Snacks",
      shortDescription: "Unlimited sugar cotton candy spun fresh live by our professional catering cart handler.",
      fullDescription: "Fresh cotton candy in pink, blue, and yellow spun live on wooden skewers. Clean cart structure with custom themed branding wraps.",
      startingPrice: 6000,
      priceLabel: "Rs. 6,000 (Unlimited)",
      quantityAllowed: true,
      coverImageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 30
    },
    {
      name: "Movie Theatre Popcorn Cart",
      slug: "popcorn-machine",
      category: "Live Snacks",
      shortDescription: "Freshly popped butter/salted popcorn served in classic red stripes paper cones.",
      fullDescription: "Continuous popcorn production throughout the event. Kept warm and crisp. Fully compliant hygiene operation standards.",
      startingPrice: 6000,
      priceLabel: "Rs. 6,000 (Unlimited)",
      quantityAllowed: true,
      coverImageUrl: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=500&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 40
    },
    {
      name: "Interactive Puppet Show",
      slug: "puppet-show",
      category: "Entertainment",
      shortDescription: "30-minute interactive storytelling puppet show featuring animal characters and laughter.",
      fullDescription: "Conducted by professional voice actors. Fun storylines with moral takeaways, keeping kids engaged and laughing.",
      startingPrice: 8000,
      priceLabel: "Rs. 8,000 / show",
      quantityAllowed: false,
      coverImageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 50
    },
    {
      name: "Magic Comedy Performance",
      slug: "magic-show",
      category: "Entertainment",
      shortDescription: "Mesmerizing interactive comedy magic act with birds, card tricks, and child volunteer acts.",
      fullDescription: "A premium 45-minute magic show led by a specialized children's magician in Karachi. Totally family-friendly with spectacular visual tricks.",
      startingPrice: 12000,
      priceLabel: "Rs. 12,000 / session",
      quantityAllowed: false,
      coverImageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 60
    },
    {
      name: "Professional Audio Sound System",
      slug: "sound-system",
      category: "AV Production",
      shortDescription: "Dual-column professional active speaker setup with wireless microphones and party playlists.",
      fullDescription: "Professional JBL/RCF column system delivering crisp sound without deafening volume. Includes operator, audio mix-board, and mics.",
      startingPrice: 10000,
      priceLabel: "Rs. 10,000 (Dual Columns)",
      quantityAllowed: false,
      coverImageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 70
    },
    {
      name: "Backup Silent Generator (50 KVA)",
      slug: "silent-generator-50kva",
      category: "AV Production",
      shortDescription: "Super silent backup power generator to ensure zero event load shedding disruption.",
      fullDescription: "Delivered on wheels. Price covers logistics inside DHA/Clifton Karachi, 4 hours of operation fuel, cabling, and operator supervision.",
      startingPrice: 20000,
      priceLabel: "Rs. 20,000 (Includes fuel)",
      quantityAllowed: false,
      coverImageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 80
    },
    {
      name: "Custom Theme Goodie Bags",
      slug: "custom-goodie-bags",
      category: "Favors & Gifts",
      shortDescription: "Themed goodie bags with customized names, activity notebooks, crayon sets, and premium toys.",
      fullDescription: "Premium cardboard printing tailored to your chosen backdrop theme. Custom items sourced to ensure absolute premium quality.",
      startingPrice: 400,
      priceLabel: "Rs. 400 / unit",
      quantityAllowed: true,
      coverImageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 90
    },
    {
      name: "Balloon Modeling Artist",
      slug: "balloon-twister",
      category: "Entertainment",
      shortDescription: "Creative twister artist crafting balloon swords, dogs, and crowns for guest children.",
      fullDescription: "3 hours of continuous balloon twisting. Uses imported biodegradable latex balloons. Kept clean and well organized.",
      startingPrice: 6000,
      priceLabel: "Rs. 6,000 / 3 hours",
      quantityAllowed: false,
      coverImageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 100
    },
    {
      name: "Thematic Entrance Portal",
      slug: "themed-entrance",
      category: "Decor Upgrades",
      shortDescription: "Custom 3D entry portal matching the backdrop theme with themed signboards and carpet.",
      fullDescription: "Create a dramatic first impression for guests. Built with wooden arch framing and custom vinyl overlays.",
      startingPrice: 15000,
      priceLabel: "Rs. 15,000 onwards",
      quantityAllowed: false,
      coverImageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 110
    },
    {
      name: "Bubble Machine Extravaganza",
      slug: "bubble-machine",
      category: "Entertainment",
      shortDescription: "High-capacity continuous double-wheel bubble blower to cover the lawn in bubbles.",
      fullDescription: "Includes 5 liters of premium non-staining, hypoallergenic bubble fluid. Safe for toddlers, eyes, and luxury clothes.",
      startingPrice: 4000,
      priceLabel: "Rs. 4,000 / day",
      quantityAllowed: true,
      coverImageUrl: "https://images.unsplash.com/photo-1547347298-4074fc3086c0?w=500&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 120
    }
  ];

  for (const ad of eventAddons) {
    const existing = await prisma.eventAddon.findUnique({ where: { slug: ad.slug } });
    if (existing) {
      await prisma.eventAddon.update({ where: { slug: ad.slug }, data: ad });
      console.log(`Updated addon: ${ad.name}`);
    } else {
      await prisma.eventAddon.create({ data: ad });
      console.log(`Created addon: ${ad.name}`);
    }
  }

  // 4. Seed JZ Events Gallery Items
  const eventGalleryItems = [
    {
      title: "Jungle Safari Spectacular setup at Clifton",
      category: "Jungle Safari",
      location: "Clifton Block 5, Karachi",
      description: "A gorgeous premium 1st birthday theme activation. Included a custom double-deck dessert bar and 3D leaf arches.",
      imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 10
    },
    {
      title: "Neon Car Grand Activation in DHA Phase 8",
      category: "Neon Race Car",
      location: "DHA Phase 8, Karachi",
      description: "Checkered flag entrance portal and customized backdrop featuring 3D speedster cutout decorations.",
      imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 20
    },
    {
      title: "Pastel Unicorn Fantasy Party in DHA Phase 6",
      category: "Pastel Unicorn",
      location: "DHA Phase 6, Karachi",
      description: "An elegant soft-pastel themed celebration with organic unicorn balloon columns and customized fairy light grids.",
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 30
    },
    {
      title: "Under the Sea Mermaid Cove in PECHS",
      category: "Sea Mermaid",
      location: "PECHS, Karachi",
      description: "Turquoise backdrop combined with giant shell standees, glowing LED starfish, and balloon bubble columns.",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
      isFeatured: true,
      isActive: true,
      sortOrder: 40
    },
    {
      title: "Cosmic Odyssey Birthday at Clifton Block 2",
      category: "Space Odyssey",
      location: "Clifton Block 2, Karachi",
      description: "Deep space theme setup equipped with a glowing rocket launch stage and customized LED solar systems.",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 50
    },
    {
      title: "Jurassic Dino Kingdom Setup at DHA Phase 5",
      category: "Jurassic Dino",
      location: "DHA Phase 5, Karachi",
      description: "Large environment dinosaur setup complete with lifelike dinosaur standees and natural jungle foliage garlands.",
      imageUrl: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 60
    },
    {
      title: "Candy Land Fantasy Backdrop at KDA Scheme 1",
      category: "Candy Land",
      location: "KDA Scheme 1, Karachi",
      description: "Giant lollipop props, Gingerbread house entry portals, and candy-swirl floor vinyl mappings.",
      imageUrl: "https://images.unsplash.com/photo-1507504038482-76210f5c055a?w=800&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 70
    },
    {
      title: "Superhero Metropolis Skyline at PECHS",
      category: "Superhero City",
      location: "PECHS, Karachi",
      description: "Vibrant primary-colored setup featuring a 16-foot cityscape skyline stage backdrop and superhero prop figures.",
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
      isFeatured: false,
      isActive: true,
      sortOrder: 80
    }
  ];

  for (const item of eventGalleryItems) {
    const existing = await prisma.eventGalleryItem.findFirst({
      where: { title: item.title, category: item.category }
    });
    if (existing) {
      await prisma.eventGalleryItem.update({
        where: { id: existing.id },
        data: item
      });
      console.log(`Updated gallery item: ${item.title}`);
    } else {
      await prisma.eventGalleryItem.create({ data: item });
      console.log(`Created gallery item: ${item.title}`);
    }
  }

  console.log('JZ Events seed operations completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding JZ Events:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
