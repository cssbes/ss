"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Pencil, Trash2, Undo } from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  name: string | null;
  email: string;
  role: string;
  isActive: boolean;
  deletedAt: Date | null;
  createdAt: Date;
}

interface AdminUsersClientProps {
  users: UserData[];
  total: number;
  page: number;
  limit: number;
  trashed: boolean;
}

export function AdminUsersClient({
  users,
  total,
  page,
  limit,
  trashed,
}: AdminUsersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/dashboard/admin/users?${params.toString()}`);
  };

  const handleSort = (key: string, direction: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", key);
    params.set("direction", direction);
    params.set("page", "1");
    router.push(`/dashboard/admin/users?${params.toString()}`);
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) params.set("search", query);
    else params.delete("search");
    params.set("page", "1");
    router.push(`/dashboard/admin/users?${params.toString()}`);
  };

  const handleDelete = async (ids: string[]) => {
    const res = await fetch("/api/admin/users/bulk-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, soft: true }),
    });

    if (res.ok) {
      toast({ title: "Users deleted" });
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: "Failed to delete users",
        variant: "destructive",
      });
    }
  };

  const handleRestore = async (ids: string[]) => {
    const res = await fetch("/api/admin/users/bulk-restore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });

    if (res.ok) {
      toast({ title: "Users restored" });
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: "Failed to restore users",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    const csv = [
      "ID,Name,Email,Role,Status,Created",
      ...users.map((u) =>
        `${u.id},"${u.name || ""}","${u.email}",${u.role},${
          u.isActive ? "Active" : "Inactive"
        },${u.createdAt}`
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns: Column<UserData>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (user) => (
        <div className="font-medium">{user.name || "Unnamed"}</div>
      ),
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
    },
    {
      key: "role",
      header: "Role",
      render: (user) => (
        <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
          {user.role}
        </Badge>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (user) => (
        <Badge variant={user.isActive ? "success" : "warning"}>
          {user.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (user) => formatDate(user.createdAt),
    },
  ];

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Button
          variant={trashed ? "default" : "outline"}
          size="sm"
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.delete("trashed");
            params.set("page", "1");
            router.push(`/dashboard/admin/users?${params.toString()}`);
          }}
        >
          Active
        </Button>
        <Button
          variant={trashed ? "outline" : "default"}
          size="sm"
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set("trashed", "true");
            params.set("page", "1");
            router.push(`/dashboard/admin/users?${params.toString()}`);
          }}
        >
          Trashed
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        total={total}
        page={page}
        limit={limit}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onSort={handleSort}
        onSearch={handleSearch}
        onDelete={handleDelete}
        onRestore={handleRestore}
        onExport={handleExport}
        selectable
        softDelete
        searchPlaceholder="Search users..."
        actions={(user) => (
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/dashboard/users/${user.id}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            {user.deletedAt ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRestore([user.id])}
              >
                <Undo className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete([user.id])}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      />
    </div>
  );
}
