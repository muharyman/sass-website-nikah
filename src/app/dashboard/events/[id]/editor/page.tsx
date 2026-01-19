import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeatureFlags } from "@/lib/features";
import { canAddGalleryItem, canAddRsvp } from "@/lib/plans";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

type PageProps = {
  params: Promise<{ id?: string }>;
};

export default async function EventEditorPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const session = await requireSession();
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

  if (event.ownerId && event.ownerId !== session.userId) {
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
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href={`/dashboard/events/${event.id}/templates`}>
              Templates
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`/dashboard/events/${event.id}/details`}>Details</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`/${event.slug}`} target="_blank">
              Preview
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Gallery</h2>
          <p className="text-sm text-black/60">
            {featureFlags.galleryUsed}/{featureFlags.galleryLimit} photos used.
          </p>
          {canAddGalleryItem(featureFlags) ? (
            <Button asChild>
              <Link href={`/dashboard/events/${event.id}/gallery`}>
                Add gallery photos
              </Link>
            </Button>
          ) : (
            <Button disabled>Add gallery photos</Button>
          )}
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
          {canAddRsvp(featureFlags) ? (
            <Button asChild>
              <Link href={`/dashboard/events/${event.id}/rsvp`}>Invite guests</Link>
            </Button>
          ) : (
            <Button disabled>Invite guests</Button>
          )}
          {!canAddRsvp(featureFlags) && (
            <p className="text-sm text-black/50">
              RSVP limit reached. Upgrade or add more seats.
            </p>
          )}
        </Card>
      </div>

      <Card className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Add-ons</h2>
        <p className="text-sm text-black/60">
          Unlock more RSVP seats, gallery slots, QR check-in, and custom domains.
          After payment, the add-on is activated for this event.
        </p>
        <div className="flex flex-wrap gap-2 text-sm text-black/60">
          {[
            "Extra RSVP seats",
            "Extra gallery slots",
            "Remove watermark",
            "Custom domain",
            "QR check-in",
          ].map((label) => (
            <span
              key={label}
              className="rounded-full border border-black/10 bg-white/80 px-3 py-1"
            >
              {label}
            </span>
          ))}
        </div>
        <Button variant="ghost" asChild>
          <Link href="mailto:hello@nikah-studio.example">Request add-on</Link>
        </Button>
      </Card>
    </div>
  );
}
