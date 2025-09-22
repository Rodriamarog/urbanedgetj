import React from "react"
import Link from "next/link"
import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "./button"
import { cn } from "@/lib/utils"

interface LinkButtonProps extends VariantProps<typeof buttonVariants> {
  href: string
  className?: string
  children: React.ReactNode
}

/**
 * LinkButton - A server component safe button-styled link
 *
 * Use this component in server components when you need a button-styled link.
 * For interactive buttons with onClick handlers, use the regular Button component in client components.
 */
export function LinkButton({
  href,
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  )
}