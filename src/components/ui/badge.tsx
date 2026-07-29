import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "accent" | "muted" | "success" | "warning" | "sale" | "new" | "gold";

const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-[#1565C0] text-white",
  outline: "border-2 border-[#1565C0] text-[#1565C0] bg-white",
  accent: "bg-[#F57C00] text-white",
  muted: "bg-[#F5F5F5] text-[#777] border border-border",
  success: "bg-[#2E7D32] text-white",
  warning: "bg-[#F57C00] text-white",
  sale: "bg-[#D32F2F] text-white",
  new: "bg-[#2E7D32] text-white",
  gold: "bg-[#FFC107] text-[#333]",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: BadgeVariant }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm",
        badgeStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
