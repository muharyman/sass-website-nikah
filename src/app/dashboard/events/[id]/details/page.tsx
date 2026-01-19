import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EventDetailsForm } from "@/components/dashboard/event-details-form";

type PageProps = {
  params: Promise<{ id?: string }>;
};

export default async function EventDetailsPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const session = await requireSession();
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    notFound();
  }

  if (event.ownerId && event.ownerId !== session.userId) {
    notFound();
  }

  const eventDate = new Date(event.eventDate);
  const dateValue = `${eventDate.getFullYear()}-${String(
    eventDate.getMonth() + 1
  ).padStart(2, "0")}-${String(eventDate.getDate()).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-black/50">
            Step 6: Details
          </p>
          <h1 className="text-3xl font-semibold">Complete your event details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href={`/${event.slug}`} target="_blank">
              Preview
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`/dashboard/events/${event.id}/editor`}>
              Back to editor
            </Link>
          </Button>
        </div>
      </header>
      <Card className="p-6">
        <EventDetailsForm
          eventId={event.id}
          initial={{
            brideName: event.brideName,
            groomName: event.groomName,
            eventDate: dateValue,
            city: event.city,
            venue: event.venue,
            slug: event.slug,
          }}
          isPublished={event.status === "published"}
        />
      </Card>
    </div>
  );
}
