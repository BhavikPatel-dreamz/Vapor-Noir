import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="relative">
        <div className="font-display text-[8rem] leading-none font-light text-primary/20 md:text-[10rem] select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display text-3xl tracking-tight md:text-4xl">Lost in the vapor</div>
        </div>
      </div>
      <p className="mt-6 max-w-md text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
