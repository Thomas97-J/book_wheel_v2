import type { Metadata } from "next";
import { Gowun_Batang, Noto_Sans_KR } from "next/font/google"; // eslint-disable-line @typescript-eslint/no-unused-vars
import "./globals.css";
import { AuthProvider } from "@/features/auth";
import { Navbar } from "@/widgets/navbar";
import { cn } from "@/shared/lib/utils";

const gowunBatang = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gowun",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "책바퀴 (Book Wheel)",
  description: "Next.js 게시판 프로젝트",
  icons: {
    icon: "/logo_favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          gowunBatang.variable,
          notoSansKr.variable,
        )}
      >
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col font-serif">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
