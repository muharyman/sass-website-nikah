"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type FormState = {
  brideName: string;
  groomName: string;
  eventDate: string;
  city: string;
  venue: string;
};

const initialState: FormState = {
  brideName: "",
  groomName: "",
  eventDate: "",
  city: "",
  venue: "",
};

type OnboardingFormProps = {
  planType: string;
};

export function OnboardingForm({ planType }: OnboardingFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, planType }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to create event");
      }

      const data = (await response.json()) as { id: string };
      router.push(`/dashboard/events/${data.id}/templates`);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unknown error"
      );
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            Bride name
            <input
              className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
              value={formState.brideName}
              onChange={(event) => updateField("brideName", event.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Groom name
            <input
              className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
              value={formState.groomName}
              onChange={(event) => updateField("groomName", event.target.value)}
              required
            />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm">
            Event date
            <input
              type="date"
              className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
              value={formState.eventDate}
              onChange={(event) => updateField("eventDate", event.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            City
            <input
              className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
              value={formState.city}
              onChange={(event) => updateField("city", event.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Venue
            <input
              className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
              value={formState.venue}
              onChange={(event) => updateField("venue", event.target.value)}
              required
            />
          </label>
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Continue to templates"}
        </Button>
      </form>
    </Card>
  );
}
