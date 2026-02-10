"use client";

import { useState } from "react";
import { useAuth } from "@/features/auth";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { createComment } from "@/entities/comment";
import { Send } from "lucide-react";

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const newCommentData = {
        content: content.trim(),
        postId,
        authorId: user.uid,
        authorName: user.displayName || "익명",
      };

      await createComment(newCommentData);

      // We need to fetch the created comment or construct it.
      // Since createComment only returns ID, we construct a partial one for immediate UI update
      // triggering a refresh might be better, but let's try to optimistic/manual update first.

      // Wait a bit or accept that we don't have the real server timestamp yet.
      // For immediate feedback we can use current date.

      // Re-fetching might be safer to get the server timestamp.
      // But let's pass the data back.

      // Actually, for better consistency, usually we re-fetch the list or the added item.
      // Let's rely on the parent to re-fetch or just append with a client-side timestamp.

      // Wait, I need a proper Timestamp object for the interface.
      // I'll leave re-fetching logic to the parent or just use a placeholder.

      // Let's just reload the comments in the parent component for simplicity in this iteration?
      // Or passing a "refetch" trigger.

      // Let's just call onCommentAdded with a "fake" comment object for now,
      // but realized I need Timestamp.

      onCommentAdded(); // Changed signature to just notify parent
      setContent("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="p-4 bg-muted/50 rounded-lg text-center text-sm text-muted-foreground">
        댓글을 작성하려면 로그인이 필요합니다.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        className="min-h-[100px] resize-none"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !content.trim()}>
          <Send className="w-4 h-4 mr-2" />
          등록
        </Button>
      </div>
    </form>
  );
}
