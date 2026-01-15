import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
