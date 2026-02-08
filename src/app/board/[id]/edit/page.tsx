"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPost, Post } from "@/entities/post";
import { PostForm } from "@/features/post";
import { useAuth } from "@/features/auth";

export default function EditPage() {
  const { id } = useParams() as { id: string };
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPost(id)
        .then(setPost)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading || authLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!post) {
    return <div className="p-10 text-center">글을 찾을 수 없습니다.</div>;
  }

  if (user?.uid !== post.authorId) {
    return <div className="p-10 text-center">수정 권한이 없습니다.</div>;
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">
        글 수정
      </h1>
      <PostForm initialData={post} isEditing />
    </div>
  );
}
