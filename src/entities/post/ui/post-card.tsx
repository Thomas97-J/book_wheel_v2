import Link from "next/link";
import { format } from "date-fns";
import { Post } from "../model/types";
import { cn } from "@/shared/lib/utils";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link
      href={`/board/${post.id}`}
      className={cn(
        "block rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:bg-accent/5 hover:shadow-md",
        className,
      )}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">
          {post.title}
        </h3>
        <div className="flex items-center text-sm text-muted-foreground gap-4">
          <span>{post.authorName}</span>
          <span>
            {post.createdAt
              ? format(post.createdAt.toDate(), "yyyy.MM.dd")
              : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
