import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin123!", 12);
  const userPassword = await bcrypt.hash("User1234!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@authapp.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@authapp.com",
      password: adminPassword,
      role: Role.ADMIN,
      isActive: true,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@authapp.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "user@authapp.com",
      password: userPassword,
      role: Role.USER,
      isActive: true,
    },
  });

  await prisma.post.createMany({
    data: [
      {
        title: "Getting Started with Next.js 15",
        content:
          "Next.js 15 introduces many new features including improved performance, enhanced developer experience, and better support for React 19. In this post, we'll explore the key features and how to get started.",
        published: true,
        authorId: admin.id,
      },
      {
        title: "Building with Prisma and PostgreSQL",
        content:
          "Prisma provides a type-safe database client that makes working with PostgreSQL a breeze. Learn how to set up your schema, write queries, and handle migrations effectively.",
        published: true,
        authorId: admin.id,
      },
      {
        title: "Docker for Web Development",
        content:
          "Containerization has revolutionized how we develop and deploy applications. This guide covers Docker fundamentals and best practices for web developers.",
        published: false,
        authorId: user.id,
      },
    ],
  });

  console.log("Seed completed successfully");
  console.log(`Admin: admin@authapp.com / Admin123!`);
  console.log(`User: user@authapp.com / User1234!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
