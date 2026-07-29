import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/85 hover:shadow-[0_0_30px_-8px_oklch(0.82_0.14_78/0.6)] hover:scale-[1.02] active:scale-[0.98] shadow-[0_1px_0_0_oklch(1_0_0/0.15)_inset,0_10px_30px_-12px_oklch(0.82_0.14_78/0.5)]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted hover:border-primary/40 hover:text-primary",
        ghost: "hover:bg-primary-light text-foreground hover:text-primary",
        accent: "bg-accent text-accent-foreground hover:bg-accent/85 hover:shadow-[0_0_30px_-8px_oklch(0.72_0.18_32/0.5)] hover:scale-[1.02] active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-3.5 rounded-md text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
