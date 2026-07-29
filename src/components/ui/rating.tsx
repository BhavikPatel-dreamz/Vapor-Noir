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
              "size-3.5 transition-colors duration-200",
              n <= Math.round(value) ? "fill-primary/90 text-primary" : "text-muted-foreground/30",
            )}
          />
        ))}
      </div>
      <span className="text-[11px] text-muted-foreground font-medium">
        {value.toFixed(1)}{count != null && <span className="font-normal"> · {count}</span>}
      </span>
    </div>
  );
}
