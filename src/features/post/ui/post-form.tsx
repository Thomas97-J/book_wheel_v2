"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { TiptapEditor } from "@/features/editor";
import { createPost, updatePost, Post } from "@/entities/post";
import { useAuth } from "@/features/auth";
import { Loader2 } from "lucide-react";

interface PostFormProps {
  initialData?: Post;
  isEditing?: boolean;
}

export function PostForm({ initialData, isEditing = false }: PostFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      if (isEditing && initialData) {
        await updatePost(initialData.id, {
          title,
          content,
        });
        router.push(`/board/${initialData.id}`);
      } else {
        const id = await createPost({
          title,
          content,
          authorId: user.uid,
          authorName: user.displayName || "Anonymous",
        });
        router.push(`/board/${id}`);
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to save post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user && !loading) {
    return <div className="text-center p-10">로그인이 필요합니다.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl font-bold bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary placeholder:text-muted-foreground/50 transition-colors"
          required
        />
      </div>

      <div className="min-h-[400px]">
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={loading}
        >
          취소
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? "수정하기" : "등록하기"}
        </Button>
      </div>
    </form>
  );
}
