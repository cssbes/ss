import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({
  params,
}: UserDetailPageProps) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: { select: { posts: true } },
    },
  });

  if (!user) notFound();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
        <p className="text-muted-foreground">
          Viewing user: {user.name || user.email}
        </p>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm font-medium">{user.name || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Role</span>
            <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
              {user.role}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge
              variant={user.isActive ? "success" : "warning"}
            >
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Posts</span>
            <span className="text-sm font-medium">{user._count.posts}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Joined</span>
            <span className="text-sm font-medium">
              {formatDateTime(user.createdAt)}
            </span>
          </div>
          {user.deletedAt && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Deleted</span>
              <span className="text-sm font-medium">
                {formatDateTime(user.deletedAt)}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
