"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type GalleryFormProps = {
  eventId: string;
  canAdd: boolean;
};

export function GalleryForm({ eventId, canAdd }: GalleryFormProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!canAdd) {
      setError("Gallery limit reached.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/events/${eventId}/gallery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, caption }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to add gallery item");
      }

      setImageUrl("");
      setCaption("");
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
        Image URL
        <input
          className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          required
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Caption (optional)
        <input
          className="rounded-xl border border-black/10 bg-white/80 px-4 py-2"
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={!canAdd || isSubmitting}>
        {isSubmitting ? "Adding..." : "Add to gallery"}
      </Button>
    </form>
  );
}
