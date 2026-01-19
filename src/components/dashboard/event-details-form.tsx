"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type EventDetails = {
  brideName: string;
  groomName: string;
  eventDate: string;
  city: string;
  venue: string;
  slug: string;
};

type EventDetailsFormProps = {
  eventId: string;
  initial: EventDetails;
  isPublished: boolean;
};

export function EventDetailsForm({
  eventId,
  initial,
  isPublished,
}: EventDetailsFormProps) {
  const [formState, setFormState] = useState<EventDetails>(initial);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  function updateField(field: keyof EventDetails, value: string) {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus(null);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to save");
      }

      const data = (await response.json()) as { slug?: string };
      setStatus("Saved.");
      if (data.slug && data.slug !== initial.slug) {
        router.refresh();
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unknown error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePublish() {
    setError(null);
    setStatus(null);
    setIsPublishing(true);

    try {
      const response = await fetch(`/api/events/${eventId}/publish`, {
        method: "POST",
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to publish");
      }

      setStatus("Published! Your page is live.");
      router.refresh();
    } catch (publishError) {
      setError(
        publishError instanceof Error ? publishError.message : "Unknown error"
      );
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSave}>
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
      <label className="flex flex-col gap-2 text-sm">
        Slug
        <input
          className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
          value={formState.slug}
          onChange={(event) => updateField("slug", event.target.value)}
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {status ? <p className="text-sm text-black/60">{status}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={handlePublish}
          disabled={isPublishing || isPublished}
        >
          {isPublished ? "Published" : isPublishing ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </form>
  );
}
