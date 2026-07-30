import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminUsersClient } from "./client";

interface AdminUsersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sort?: string;
    direction?: string;
    trashed?: string;
  }>;
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 10;
  const search = params.search || "";
  const sort = params.sort || "createdAt";
  const direction = params.direction === "asc" ? "asc" : "desc";
  const trashed = params.trashed === "true";

  const where: any = trashed
    ? { deletedAt: { not: null } }
    : { deletedAt: null };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" as const } },
      { email: { contains: search, mode: "insensitive" as const } },
    ];
  }

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
        deletedAt: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Users</h1>
          <p className="text-muted-foreground">
            Manage all users in the system
          </p>
        </div>
      </div>

      <AdminUsersClient
        users={JSON.parse(JSON.stringify(users))}
        total={total}
        page={page}
        limit={limit}
        trashed={trashed}
      />
    </div>
  );
}
