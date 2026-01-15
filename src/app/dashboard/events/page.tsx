import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: "evt_01",
    title: "Alya & Reza",
    status: "draft",
    plan: "basic",
  },
  {
    id: "evt_02",
    title: "Nadia & Kamil",
    status: "published",
    plan: "premium",
  },
];

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Events</h1>
          <p className="text-black/60">
            Manage your wedding websites and add-ons.
          </p>
        </div>
        <Button>Create event</Button>
      </header>
      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">{event.title}</h2>
              <p className="text-sm text-black/50">
                {event.status} · {event.plan}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href={`/dashboard/events/${event.id}/editor`}>Editor</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href={`/dashboard/events/${event.id}/rsvp`}>RSVP</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
