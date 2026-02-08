import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/features/auth";
import { Navbar } from "@/widgets/navbar";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = {
  title: "책바퀴 (Book Wheel)",
  description: "Next.js 게시판 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
