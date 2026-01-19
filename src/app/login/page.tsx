"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Login failed");
      }

      router.push("/pricing");
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unknown error"
      );
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 pb-24 pt-16">
      <header className="text-center">
        <h1 className="text-3xl font-semibold font-[var(--font-display)]">
          Welcome back
        </h1>
        <p className="text-sm text-black/60">
          Login to continue building your wedding website.
        </p>
      </header>
      <Card className="p-6">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm">
            Email
            <input
              type="email"
              className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Password
            <input
              type="password"
              className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Card>
      <p className="text-center text-sm text-black/60">
        Don&apos;t have an account?{" "}
        <Link className="font-semibold text-black" href="/register">
          Create one
        </Link>
      </p>
    </main>
  );
}
