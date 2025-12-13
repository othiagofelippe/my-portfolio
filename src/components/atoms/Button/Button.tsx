import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent-brand text-text-label shadow-md hover:bg-accent-brand/90 hover:shadow-lg active:scale-[0.98]",
        outline:
          "border-2 border-border-primary bg-transparent text-text-body hover:bg-background-secondary/50 hover:text-text-headline active:scale-[0.98]",
        ghost:
          "bg-transparent text-text-body hover:bg-background-secondary/50 hover:text-text-headline active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-3 typography-body",
        sm: "h-9 px-4 py-2 typography-body-sm",
        lg: "h-12 px-8 py-3 typography-body-lg",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
