import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";

type PageProps = {
  params: { id: string };
};

export default async function RsvpDashboardPage({ params }: PageProps) {
  if (!params?.id) {
    notFound();
  }

  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: { rsvps: { orderBy: { createdAt: "desc" } } },
  });

  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">RSVP List</h1>
          <p className="text-black/60">Track guest confirmations.</p>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/dashboard/events">Back to events</Link>
        </Button>
      </header>

      <div className="grid gap-4">
        {event.rsvps.length === 0 ? (
          <Card className="p-6 text-sm text-black/60">No RSVPs yet.</Card>
        ) : (
          event.rsvps.map((rsvp) => (
            <Card key={rsvp.id} className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{rsvp.name}</h2>
                <p className="text-sm text-black/50">
                  {rsvp.guests} guest{rsvp.guests > 1 ? "s" : ""} - {rsvp.message || "No message"}
                </p>
              </div>
              <Button variant="ghost">Message</Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
