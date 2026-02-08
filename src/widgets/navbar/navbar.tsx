"use client";

import Link from "next/link";
import { LoginButton } from "@/features/auth";
import { cn } from "@/shared/lib/utils";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-serif font-bold sm:inline-block text-xl">
            책바퀴
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search or other items could go here */}
          </div>
          <nav className="flex items-center space-x-4">
            <Link
              href="/board"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
              )}
            >
              게시판
            </Link>
            <LoginButton />
          </nav>
        </div>
      </div>
    </nav>
  );
}
