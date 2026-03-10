"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getPost, incrementViewCount, Post } from "@/entities/post";
import { PostDetail } from "@/widgets/post-detail";

export default function PostPage() {
  const { id } = useParams() as { id: string };
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const ignore = useRef(false);

  useEffect(() => {
    if (id) {
      if (!ignore.current) {
        ignore.current = true;
        incrementViewCount(id);
      }

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
    <div className="container mx-auto px-4 py-10">
      <PostDetail post={post} />
    </div>
  );
}
