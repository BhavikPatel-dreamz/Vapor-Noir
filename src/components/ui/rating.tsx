import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({ value, count, className }: { value: number; count?: number; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={cn(
              "size-3.5",
              n <= Math.round(value) ? "fill-[#FFC107] text-[#FFC107]" : "text-[#ddd]",
            )}
          />
        ))}
      </div>
      <span className="text-[11px] font-bold text-muted-foreground">
        {value.toFixed(1)}{count != null && <span> ({count})</span>}
      </span>
    </div>
  );
}
