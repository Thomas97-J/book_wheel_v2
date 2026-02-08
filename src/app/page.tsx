import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background text-foreground space-y-8 p-4">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Image
            src="/logo_with_text.svg"
            alt="책바퀴"
            width={150}
            height={150}
            priority
          />
        </div>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
          당신의 이야기를 기록하고 공유하는 공간.
        </p>
      </div>

      <div className="flex gap-4">
        <Link href="/board">
          <Button size="lg" className="text-lg px-8 py-6">
            게시판 입장하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
