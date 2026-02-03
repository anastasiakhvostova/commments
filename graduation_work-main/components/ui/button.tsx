import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        locked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90",
        dlocked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border0neutral-400 border-b-4 active:border-b-0",
        default: "bg-amber-200 text-stone-800 hover:bg-pink-300 border-pink-300 border-b-4 active:border-b-0",
        primary: "bg-amber-200 text-stone-800 hover:bg-amber-300 border-amber-300 border-b-4 active:border-b-0",
        primaryOutline: "bg-transparent text-amber-600 border border-amber-300 hover:bg-amber-100",
        secondary: "bg-orange-200 text-stone-800 hover:bg-orange-300 border-orange-300 border-b-4 active:border-b-0",
        secondaryOutline: "bg-transparent text-orange-500 border border-orange-300 hover:bg-orange-100",
        danger: "bg-rose-300 text-stone-800 hover:bg-rose-400 border-rose-400 border-b-4 active:border-b-0",
        dangerOutline: "bg-transparent text-rose-500 border border-rose-300 hover:bg-rose-100",
        super: "bg-yellow-200 text-stone-800 hover:bg-yellow-300 border-yellow-300 border-b-4 active:border-b-0",
        ghost: "bg-transparent text-stone-500 border-transparent hover:bg-orange-100 data-[active=true]:bg-amber-100 data-[active=true]:text-amber-700",
        sidebar: "bg-transparent text-stone-500 border-2 border-transparent hover:bg-orange-100 transition-none data-[active=true]:bg-rose-200 data-[active=true]:text-rose-600",
        sidebarOutline: "bg-amber-100 text-amber-600 border-amber-200 border-2 hover:bg-amber-200 transition-none"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        rounded: "rounded-full",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
