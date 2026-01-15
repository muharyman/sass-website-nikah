import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  asChild?: boolean;
};

export function Button({
  className,
  variant = "primary",
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition",
        variant === "primary" &&
          "bg-[color:var(--color-accent)] text-white shadow-sm hover:brightness-95",
        variant === "ghost" &&
          "border border-black/10 bg-white/70 text-[color:var(--color-foreground)] hover:bg-white",
        className
      )}
      {...props}
    />
  );
}
