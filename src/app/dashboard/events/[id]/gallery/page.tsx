import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { canAddGalleryItem } from "@/lib/plans";
import { getFeatureFlags } from "@/lib/features";
import { GalleryForm } from "@/components/dashboard/gallery-form";

type PageProps = {
  params: Promise<{ id?: string }>;
};

export default async function GalleryPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      addons: true,
      gallery: { orderBy: { createdAt: "desc" } },
      _count: { select: { gallery: true } },
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
    galleryUsed: event._count.gallery,
  });

  const canAdd = canAddGalleryItem(featureFlags);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Gallery</h1>
          <p className="text-black/60">
            {featureFlags.galleryUsed}/{featureFlags.galleryLimit} photos used.
          </p>
        </div>
        <Button variant="ghost" asChild>
          <Link href={`/dashboard/events/${event.id}/editor`}>Back to editor</Link>
        </Button>
      </header>

      <Card className="p-6">
        <GalleryForm eventId={event.id} canAdd={canAdd} />
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {event.gallery.length === 0 ? (
          <Card className="p-6 text-sm text-black/60">
            No gallery items yet.
          </Card>
        ) : (
          event.gallery.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.caption ?? "Gallery image"}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4 text-sm text-black/60">
                {item.caption || "No caption"}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
