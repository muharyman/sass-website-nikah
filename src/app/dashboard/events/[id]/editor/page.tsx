import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeatureFlags } from "@/lib/features";
import { canAddGalleryItem, canAddRsvp } from "@/lib/plans";
import { prisma } from "@/lib/db";

type PageProps = {
  params: Promise<{ id?: string }>;
};

export default async function EventEditorPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      addons: true,
      _count: { select: { rsvps: true, gallery: true } },
    },
  });

  if (!event) {
    notFound();
  }

  const addons = event.addons.map((addon) => ({
    type: addon.type,
    amount: addon.amount ?? undefined,
    templateAccess: addon.templateAccess ?? undefined,
  }));

  const featureFlags = getFeatureFlags(event.planType, addons, {
    rsvpUsed: event._count.rsvps,
    galleryUsed: event._count.gallery,
  });

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
