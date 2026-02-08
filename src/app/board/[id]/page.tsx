"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPost, Post } from "@/entities/post";
import { PostDetail } from "@/widgets/post-detail";

export default function PostPage() {
  const { id } = useParams() as { id: string };
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPost(id)
        .then(setPost)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!post) {
    return <div className="p-10 text-center">글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container py-10">
      <PostDetail post={post} />
    </div>
  );
}
