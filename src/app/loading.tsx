import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="size-10 animate-spin text-[#1565C0]" />
        <div className="text-sm font-bold text-muted-foreground">Loading...</div>
      </div>
    </div>
  );
}
