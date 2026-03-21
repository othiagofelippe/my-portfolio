"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border typography-body-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        brand:
          "bg-accent-brand/10 text-accent-brand border-accent-brand/20 hover:bg-accent-brand/20 dark:bg-accent-brand/20 dark:border-accent-brand/30 ocean-sunset:bg-accent-brand/20 ocean-sunset:border-accent-brand/30",
        neutral:
          "bg-background-secondary/50 text-text-heading border-border-primary/30 hover:bg-background-secondary/70 dark:bg-background-tertiary dark:text-text-heading dark:border-border-primary/50 ocean-sunset:bg-background-tertiary ocean-sunset:text-text-headline ocean-sunset:border-border-primary/50",
        success:
          "bg-accent-green/90 text-white border-accent-green hover:bg-accent-green dark:bg-accent-green dark:text-white dark:border-accent-green ocean-sunset:bg-accent-green ocean-sunset:text-white ocean-sunset:border-accent-green",
        outline:
          "bg-background-secondary/50 text-text-heading border-border-primary/30 hover:bg-background-secondary/70 dark:bg-background-tertiary dark:text-text-heading dark:border-border-primary/50 ocean-sunset:bg-background-tertiary ocean-sunset:text-text-headline ocean-sunset:border-border-primary/50",
        secondary:
          "bg-accent-brand/10 text-accent-brand border-accent-brand/20 hover:bg-accent-brand/20 dark:bg-accent-brand/20 dark:border-accent-brand/30 ocean-sunset:bg-accent-brand/20 ocean-sunset:border-accent-brand/30",
        current:
          "bg-accent-green/10 text-accent-green border-accent-green/30 gap-1.5",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5",
        lg: "px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  if (variant === "current") {
    return (
      <div className={cn(badgeVariants({ variant, size }), className)}>
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-accent-green shrink-0"
          animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        {props.children}
      </div>
    )
  }

  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
