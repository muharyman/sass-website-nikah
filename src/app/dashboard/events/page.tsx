import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export default async function EventsPage() {
  const session = await requireSession();
  const events = await prisma.event.findMany({
    where: { ownerId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Events</h1>
          <p className="text-black/60">
            Manage your wedding websites and add-ons.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/events/new">Create event</Link>
        </Button>
      </header>
      <div className="grid gap-4">
        {events.length === 0 ? (
          <Card className="flex flex-col gap-3 p-6 text-sm text-black/60">
            <p>No events yet. Create your first event to get started.</p>
            <Button asChild>
              <Link href="/dashboard/events/new">Create event</Link>
            </Button>
          </Card>
        ) : (
          events.map((event) => (
            <Card key={event.id} className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  {event.brideName} &amp; {event.groomName}
                </h2>
                <p className="text-sm text-black/50">
                  {event.status} - {event.planType}
                </p>
                <p className="text-xs text-black/40">/{event.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" asChild>
                  <Link href={`/${event.slug}`} target="_blank">
                    Open page
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href={`/dashboard/events/${event.id}/editor`}>Editor</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href={`/dashboard/events/${event.id}/rsvp`}>RSVP</Link>
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
