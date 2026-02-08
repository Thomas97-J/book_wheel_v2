import Link from "next/link";
import { Button } from "@/shared/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background text-foreground space-y-8 p-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-serif font-bold tracking-tight text-primary">
          책바퀴
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
          당신의 이야기를 기록하고 공유하는 공간.
          <br />
          책바퀴처럼 지식이 굴러가며 새로운 이야기를 만들어냅니다.
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
