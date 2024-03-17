import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// npx prisma migrate reset
// npx prisma migrate dev --name init1
// npx prisma db seed
// npx prisma studio

async function main() {
  
}

main()
  .then(() => {
    prisma.$disconnect().catch(console.error);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect().catch(console.error);
    process.exit(1);
  });
