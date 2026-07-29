import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "text-white btn-gradient-blue border-b-2 border-[#0D47A1] shadow-sm hover:shadow-md active:shadow-inner",
        outline:
          "bg-white text-[#1565C0] border-2 border-[#1565C0] hover:bg-[#E3F2FD] hover:border-[#0D47A1]",
        ghost: "bg-transparent text-foreground hover:bg-[#E3F2FD]",
        accent:
          "text-white btn-gradient-orange border-b-2 border-[#E65100] shadow-sm hover:shadow-md active:shadow-inner",
        secondary:
          "text-white btn-gradient-red border-b-2 border-[#B71C1C] shadow-sm hover:shadow-md active:shadow-inner",
        success:
          "text-white btn-gradient-green border-b-2 border-[#1B5E20] shadow-sm hover:shadow-md active:shadow-inner",
        gold:
          "text-[#333] btn-gradient-gold border-b-2 border-[#FFB300] shadow-sm hover:shadow-md active:shadow-inner",
        link: "text-[#1565C0] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
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
