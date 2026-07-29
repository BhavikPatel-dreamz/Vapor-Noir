import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-sm border-2 border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-150 focus-visible:outline-none focus-visible:border-[#1565C0] focus-visible:ring-1 focus-visible:ring-[#1565C0] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
