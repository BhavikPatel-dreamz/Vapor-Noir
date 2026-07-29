import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "accent" | "muted" | "success" | "warning" | "sale";

const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-primary text-primary-foreground shadow-[0_0_12px_-4px_oklch(0.82_0.14_78/0.4)]",
  outline: "border border-border text-foreground",
  accent: "bg-accent text-accent-foreground",
  muted: "bg-muted text-muted-foreground",
  success: "bg-success-light text-success border border-success/20",
  warning: "bg-warning-light text-warning border border-warning/20",
  sale: "bg-accent text-accent-foreground shadow-[0_0_12px_-4px_oklch(0.72_0.18_32/0.4)]",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: BadgeVariant }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase transition-all duration-200",
        badgeStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
