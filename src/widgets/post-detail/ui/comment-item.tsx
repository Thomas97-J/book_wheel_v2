"use client";

import { Comment, deleteComment } from "@/entities/comment";
import { useAuth } from "@/features/auth";
import { Button } from "@/shared/ui/button";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface CommentItemProps {
  comment: Comment;
  onDelete: (id: string) => void;
}

export function CommentItem({ comment, onDelete }: CommentItemProps) {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const isAuthor = user?.uid === comment.authorId;

  const handleDelete = async () => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    setIsDeleting(true);
    try {
      await deleteComment(comment.id);
      onDelete(comment.id);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="py-4 border-b last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">
            {comment.authorName || "익명"}
          </span>
          <span className="text-xs text-muted-foreground">
            {comment.createdAt
              ? format(comment.createdAt.toDate(), "yyyy.MM.dd HH:mm")
              : ""}
          </span>
        </div>
        {isAuthor && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>
      <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
    </div>
  );
}
