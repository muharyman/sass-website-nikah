"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type MidtransCheckoutButtonProps = {
  planId: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function MidtransCheckoutButton({
  planId,
  children,
  variant,
  className,
}: MidtransCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout() {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/payments/midtrans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        throw new Error("Failed to start checkout");
      }

      const data = (await response.json()) as { redirectUrl?: string };

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error("Missing redirect URL");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleCheckout}
      disabled={isLoading}
      aria-busy={isLoading}
      variant={variant}
      className={className}
    >
      {isLoading ? "Processing..." : children}
    </Button>
  );
}
