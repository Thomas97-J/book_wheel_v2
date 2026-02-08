"use client";

import { useEffect, useState } from "react";
import { getPosts, Post, PostCard } from "@/entities/post";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { PenSquare } from "lucide-react";

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold">게시판</h2>
        <Link href="/board/write">
          <Button>
            <PenSquare className="mr-2 h-4 w-4" />
            글쓰기
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground mb-4">작성된 글이 없습니다.</p>
          <Link href="/board/write">
            <Button variant="outline">첫 번째 글 쓰기</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
