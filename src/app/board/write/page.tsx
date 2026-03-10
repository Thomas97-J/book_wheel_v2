"use client";

import { PostForm } from "@/features/post";

export default function WritePage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">글쓰기</h1>
      <PostForm />
    </div>
  );
}
