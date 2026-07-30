import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateTime } from "@/lib/utils";

interface RecentActivityProps {
  posts: {
    id: string;
    title: string;
    createdAt: Date;
    author: { name: string | null; image: string | null };
  }[];
}

export function RecentActivities({ posts }: RecentActivityProps) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted-foreground">No recent activity</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.image || ""} />
            <AvatarFallback>
              {post.author.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{post.title}</p>
            <p className="text-xs text-muted-foreground">
              by {post.author.name} &middot; {formatDateTime(post.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
