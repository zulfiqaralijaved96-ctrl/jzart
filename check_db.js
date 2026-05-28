const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const settings = await prisma.siteSettings.findFirst();
  console.log("Settings:", settings);
  
  const logos = await prisma.partnerLogo.findMany();
  console.log("Logos:", logos);
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
