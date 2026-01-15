import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const rsvpList = [
  { name: "Hana", guests: 2, message: "Congrats!" },
  { name: "Dimas", guests: 1, message: "See you soon." },
];

export default function RsvpDashboardPage() {
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
        {rsvpList.map((rsvp) => (
          <Card key={rsvp.name} className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">{rsvp.name}</h2>
              <p className="text-sm text-black/50">
                {rsvp.guests} guest{rsvp.guests > 1 ? "s" : ""} · {rsvp.message}
              </p>
            </div>
            <Button variant="ghost">Message</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
