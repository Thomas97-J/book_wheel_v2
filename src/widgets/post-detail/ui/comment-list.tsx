"use client";

import { Comment } from "@/entities/comment";
import { CommentItem } from "./comment-item";

interface CommentListProps {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export function CommentList({ comments, setComments }: CommentListProps) {
  const handleDelete = (deletedCommentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== deletedCommentId));
  };

  if (comments.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground text-sm">
        첫 번째 댓글을 남겨보세요.
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
