"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface UserData {
  id: string;
  name: string | null;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
}

interface UsersClientProps {
  users: UserData[];
  total: number;
  page: number;
  limit: number;
}

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

export function UsersClient({ users, total, page, limit }: UsersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/dashboard/users?${params.toString()}`);
  };

  const handleSort = (key: string, direction: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", key);
    params.set("direction", direction);
    params.set("page", "1");
    router.push(`/dashboard/users?${params.toString()}`);
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) params.set("search", query);
    else params.delete("search");
    params.set("page", "1");
    router.push(`/dashboard/users?${params.toString()}`);
  };

  return (
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
      selectable
      searchPlaceholder="Search users..."
      actions={(user) => (
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/users/${user.id}/edit`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      )}
    />
  );
}
