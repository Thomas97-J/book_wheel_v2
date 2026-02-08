"use client";

import { Button } from "@/shared/ui/button";
import { useAuth } from "./auth-provider";

export function LoginButton() {
  const { user, signIn, logout, loading } = useAuth();

  if (loading)
    return (
      <Button disabled variant="ghost" size="sm">
        Loading...
      </Button>
    );

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium hidden sm:inline-block">
          {user.displayName}
        </span>
        <Button onClick={logout} variant="ghost" size="sm">
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={signIn} variant="default" size="sm">
      Google 로그인
    </Button>
  );
}
