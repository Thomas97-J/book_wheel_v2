"use client";

import { useCallback, useEffect, useState } from "react";
import { Comment, getComments } from "@/entities/comment";
import { CommentList } from "./comment-list";
import { CommentForm } from "./comment-form";

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    try {
      const fetchedComments = await getComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold">
          댓글 <span className="text-primary">{comments.length}</span>
        </h2>
      </div>

      <CommentForm postId={postId} onCommentAdded={fetchComments} />

      <div className="my-8 h-px bg-border" />

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">
          댓글을 불러오는 중...
        </div>
      ) : (
        <CommentList comments={comments} setComments={setComments} />
      )}
    </div>
  );
}
