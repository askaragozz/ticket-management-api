import { prisma } from "../src/db/prisma.js";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: { email: "user@test.com", role: "USER" },
  });

  await prisma.ticket.create({
    data: {
      title: "First ticket",
      description: "Seeded ticket",
      priority: "MEDIUM",
      createdById: user.id,
    },
  });

  console.log("Seeded:", { userId: user.id });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
