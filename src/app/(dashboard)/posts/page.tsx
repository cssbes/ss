import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PostsClient } from "./client";

interface PostsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sort?: string;
    direction?: string;
  }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 10;
  const search = params.search || "";
  const sort = params.sort || "createdAt";
  const direction = params.direction === "asc" ? "asc" : "desc";

  const where = search
    ? { title: { contains: search, mode: "insensitive" as const } }
    : {};

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { [sort]: direction },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: { select: { name: true } },
      },
    }),
    prisma.post.count({ where }),
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">Manage posts</p>
        </div>
      </div>

      <PostsClient
        posts={JSON.parse(JSON.stringify(posts))}
        total={total}
        page={page}
        limit={limit}
      />
    </div>
  );
}
