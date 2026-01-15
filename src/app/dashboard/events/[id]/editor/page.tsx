import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeatureFlags } from "@/lib/features";
import { canAddGalleryItem, canAddRsvp } from "@/lib/plans";

const sampleEvent = {
  id: "evt_01",
  planType: "basic" as const,
  addons: [{ type: "extra_gallery" as const, amount: 30 }],
  usage: { rsvpUsed: 120, galleryUsed: 58 },
};

export default function EventEditorPage() {
  const featureFlags = getFeatureFlags(
    sampleEvent.planType,
    sampleEvent.addons,
    sampleEvent.usage
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Event editor</h1>
          <p className="text-black/60">
            Adjust content, templates, and settings.
          </p>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/dashboard/events">Back to events</Link>
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Gallery</h2>
          <p className="text-sm text-black/60">
            {featureFlags.galleryUsed}/{featureFlags.galleryLimit} photos used.
          </p>
          <Button disabled={!canAddGalleryItem(featureFlags)}>
            Add gallery photos
          </Button>
          {!canAddGalleryItem(featureFlags) && (
            <p className="text-sm text-black/50">
              Gallery limit reached. Upgrade or buy an add-on.
            </p>
          )}
        </Card>

        <Card className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">RSVP</h2>
          <p className="text-sm text-black/60">
            {featureFlags.rsvpUsed}/{featureFlags.rsvpLimit} seats used.
          </p>
          <Button disabled={!canAddRsvp(featureFlags)}>Invite guests</Button>
          {!canAddRsvp(featureFlags) && (
            <p className="text-sm text-black/50">
              RSVP limit reached. Upgrade or add more seats.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
