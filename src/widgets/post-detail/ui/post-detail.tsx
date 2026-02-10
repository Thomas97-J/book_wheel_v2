"use client";

import { Post, deletePost } from "@/entities/post";
import { format } from "date-fns";
import { Button } from "@/shared/ui/button";
import { useAuth } from "@/features/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Edit, Eye } from "lucide-react";
import { CommentSection } from "./comment-section";

interface PostDetailProps {
  post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setIsDeleting(true);
    try {
      await deletePost(post.id);
      router.push("/board");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete post:", error);
      setIsDeleting(false);
    }
  };

  const isAuthor = user?.uid === post.authorId;

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/board">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 pl-0 hover:bg-transparent hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </Link>
        <h1 className="text-4xl font-serif font-bold mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-muted-foreground border-b pb-4">
          <div className="flex items-center gap-4">
            <span className="font-medium text-foreground">
              {post.authorName}
            </span>
            <span>
              {post.createdAt
                ? format(post.createdAt.toDate(), "yyyy.MM.dd HH:mm")
                : ""}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.viewCount || 0}
            </span>
          </div>
          {isAuthor && (
            <div className="flex gap-2">
              <Link href={`/board/${post.id}/edit`}>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  수정
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                삭제
              </Button>
            </div>
          )}
        </div>
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none min-h-[300px]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <CommentSection postId={post.id} />
    </article>
  );
}
