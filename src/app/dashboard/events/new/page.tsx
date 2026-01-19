"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const planOptions = [
  { value: "free", label: "Free" },
  { value: "basic", label: "Basic" },
  { value: "premium", label: "Premium" },
  { value: "exclusive", label: "Exclusive" },
];

type FormState = {
  brideName: string;
  groomName: string;
  eventDate: string;
  city: string;
  venue: string;
  planType: string;
};

const initialState: FormState = {
  brideName: "",
  groomName: "",
  eventDate: "",
  city: "",
  venue: "",
  planType: "basic",
};

export default function NewEventPage() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to create event");
      }

      const data = (await response.json()) as { id: string };
      router.push(`/dashboard/events/${data.id}/editor`);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unknown error"
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Create event</h1>
        <p className="text-black/60">
          Fill in the details to start your wedding website.
        </p>
      </header>
      <Card className="p-6">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              Bride name
              <input
                className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
                value={formState.brideName}
                onChange={(e) => updateField("brideName", e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Groom name
              <input
                className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
                value={formState.groomName}
                onChange={(e) => updateField("groomName", e.target.value)}
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
                onChange={(e) => updateField("eventDate", e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              City
              <input
                className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
                value={formState.city}
                onChange={(e) => updateField("city", e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Venue
              <input
                className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
                value={formState.venue}
                onChange={(e) => updateField("venue", e.target.value)}
                required
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm">
            Plan
            <select
              className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
              value={formState.planType}
              onChange={(e) => updateField("planType", e.target.value)}
            >
              {planOptions.map((plan) => (
                <option key={plan.value} value={plan.value}>
                  {plan.label}
                </option>
              ))}
            </select>
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create event"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
