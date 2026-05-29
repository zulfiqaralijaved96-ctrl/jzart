const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const items = await prisma.portfolioItem.findMany();
  console.log("Portfolio Items count:", items.length);
  items.forEach(item => {
    console.log({
      id: item.id,
      title: item.title,
      category: item.category,
      coverImage: item.coverImage,
      thumbnailImage: item.thumbnailImage,
      isPublished: item.isPublished
    });
  });
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
