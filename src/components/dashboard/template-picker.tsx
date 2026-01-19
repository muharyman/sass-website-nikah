"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { TemplatePreview } from "@/lib/template-previews";

type TemplatePickerProps = {
  eventId: string;
  templates: TemplatePreview[];
  selected?: string | null;
};

export function TemplatePicker({
  eventId,
  templates,
  selected,
}: TemplatePickerProps) {
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSelect(templateKey: string) {
    setError(null);
    setIsSubmitting(templateKey);

    try {
      const response = await fetch(`/api/events/${eventId}/template`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateKey }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to select template");
      }

      router.push(`/dashboard/events/${eventId}/details`);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unknown error"
      );
      setIsSubmitting(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => {
          const isActive = selected === template.slug;
          return (
            <Card key={template.slug} className="flex flex-col gap-4 p-4">
              <div
                className="h-32 rounded-2xl border border-black/10"
                style={{
                  background: `linear-gradient(135deg, ${template.palette.background}, ${template.palette.base})`,
                }}
              />
              <div>
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <p className="text-sm text-black/60">{template.style}</p>
              </div>
              <Button
                type="button"
                onClick={() => handleSelect(template.slug)}
                disabled={Boolean(isSubmitting)}
              >
                {isSubmitting === template.slug
                  ? "Selecting..."
                  : isActive
                  ? "Selected"
                  : "Choose template"}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
