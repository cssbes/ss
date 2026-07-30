"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface PostData {
  id: string;
  title: string;
  published: boolean;
  createdAt: Date;
  author: { name: string | null };
}

interface PostsClientProps {
  posts: PostData[];
  total: number;
  page: number;
  limit: number;
}

const columns: Column<PostData>[] = [
  {
    key: "title",
    header: "Title",
    sortable: true,
    render: (post) => <div className="font-medium max-w-md truncate">{post.title}</div>,
  },
  {
    key: "author",
    header: "Author",
    render: (post) => post.author.name || "Unknown",
  },
  {
    key: "published",
    header: "Status",
    render: (post) => (
      <Badge variant={post.published ? "success" : "secondary"}>
        {post.published ? "Published" : "Draft"}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    header: "Created",
    sortable: true,
    render: (post) => formatDate(post.createdAt),
  },
];

export function PostsClient({ posts, total, page, limit }: PostsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/dashboard/posts?${params.toString()}`);
  };

  const handleSort = (key: string, direction: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", key);
    params.set("direction", direction);
    params.set("page", "1");
    router.push(`/dashboard/posts?${params.toString()}`);
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) params.set("search", query);
    else params.delete("search");
    params.set("page", "1");
    router.push(`/dashboard/posts?${params.toString()}`);
  };

  return (
    <DataTable
      columns={columns}
      data={posts}
      total={total}
      page={page}
      limit={limit}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onSort={handleSort}
      onSearch={handleSearch}
      selectable
      searchPlaceholder="Search posts..."
    />
  );
}
