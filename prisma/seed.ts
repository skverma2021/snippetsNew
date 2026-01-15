import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create snippet types
  const types = await prisma.snippetType.createMany({
    data: [
      { description: "JavaScript" },
      { description: "TypeScript" },
      { description: "SQL" },
      { description: "Python" },
      { description: "HTML" },
      { description: "CSS" },
    ],
  });

  console.log(`Created ${types.count} snippet types`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
