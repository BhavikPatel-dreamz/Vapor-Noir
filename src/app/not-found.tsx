import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-white">
      <div className="container-x flex min-h-[80vh] flex-col items-center justify-center text-center">
        <div className="text-[8rem] leading-none font-black text-[#1565C0]/10 md:text-[10rem] select-none">404</div>
        <div className="bg-[#D32F2F] text-white font-bold text-sm px-4 py-1 -mt-6 mb-4 uppercase tracking-wider">Page Not Found</div>
        <h1 className="text-[28px] font-black text-[#1565C0]">Oops! This page doesn&apos;t exist</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          The page you&apos;re looking for was moved, removed, or might never have existed.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/"><Home className="size-4" /> Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
