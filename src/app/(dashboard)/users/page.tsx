import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UsersClient } from "./client";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sort?: string;
    direction?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 10;
  const search = params.search || "";
  const sort = params.sort || "createdAt";
  const direction = params.direction === "asc" ? "asc" : "desc";

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { [sort]: direction },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts</p>
        </div>
      </div>

      <UsersClient
        users={JSON.parse(JSON.stringify(users))}
        total={total}
        page={page}
        limit={limit}
      />
    </div>
  );
}
