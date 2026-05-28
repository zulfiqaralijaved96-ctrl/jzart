const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = "admin@jzarts.com";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin user already exists in DB.");
    return;
  }
  const passwordHash = await bcrypt.hash("admin", 10);
  await prisma.user.create({
    data: {
      name: "Admin User",
      email,
      passwordHash,
      role: "ADMIN"
    }
  });
  console.log("Admin user seeded successfully in DB!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
