"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"
import { typographyVariants } from "@tfds/components"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border typography-body-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        brand:
          "bg-action-primary/10 text-action-primary border-action-primary/20 hover:bg-action-primary/20 dark:bg-action-primary/20 dark:border-action-primary/30 ocean-sunset:bg-action-primary/20 ocean-sunset:border-action-primary/30",
        neutral:
          "bg-bg-default/50 text-text-primary border-border-default/30 hover:bg-bg-default/70 dark:bg-bg-subtle dark:text-text-primary dark:border-border-default/50 ocean-sunset:bg-bg-subtle ocean-sunset:text-text-primary ocean-sunset:border-border-default/50",
        success:
          "bg-feedback-success/90 text-white border-feedback-success hover:bg-feedback-success dark:bg-feedback-success dark:text-white dark:border-feedback-success ocean-sunset:bg-feedback-success ocean-sunset:text-white ocean-sunset:border-feedback-success",
        outline:
          "bg-bg-default/50 text-text-primary border-border-default/30 hover:bg-bg-default/70 dark:bg-bg-subtle dark:text-text-primary dark:border-border-default/50 ocean-sunset:bg-bg-subtle ocean-sunset:text-text-primary ocean-sunset:border-border-default/50",
        secondary:
          "bg-action-primary/10 text-action-primary border-action-primary/20 hover:bg-action-primary/20 dark:bg-action-primary/20 dark:border-action-primary/30 ocean-sunset:bg-action-primary/20 ocean-sunset:border-action-primary/30",
        current:
          "bg-feedback-success/10 text-feedback-success border-feedback-success/30 gap-1.5",
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
          className="w-1.5 h-1.5 rounded-full bg-feedback-success shrink-0"
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
