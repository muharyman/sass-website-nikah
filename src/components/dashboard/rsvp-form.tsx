"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type RsvpFormProps = {
  eventId: string;
  canAdd: boolean;
};

export function RsvpForm({ eventId, canAdd }: RsvpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!canAdd) {
      setError("RSVP limit reached.");
      return;
    }

    if (!Number.isFinite(guests) || guests < 1) {
      setError("Guests must be at least 1.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/events/${eventId}/rsvps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, guests, message }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to add RSVP");
      }

      setName("");
      setEmail("");
      setGuests(1);
      setMessage("");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unknown error"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2 text-sm">
        Name
        <input
          className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Email (optional)
        <input
          type="email"
          className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Guests
        <input
          type="number"
          min={1}
          max={10}
          className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Message (optional)
        <input
          className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={!canAdd || isSubmitting}>
        {isSubmitting ? "Adding..." : "Add RSVP"}
      </Button>
    </form>
  );
}
