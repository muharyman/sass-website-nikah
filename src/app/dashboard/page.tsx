import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await requireSession();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-black/60">
          Signed in as {session.email}. Track your events, manage add-ons, and
          monitor RSVP totals.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Create a new event</h2>
          <p className="text-sm text-black/60">
            Launch a new wedding website in minutes.
          </p>
          <Button asChild>
            <Link href="/dashboard/events/new">Start event</Link>
          </Button>
        </Card>
        <Card className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Manage events</h2>
          <p className="text-sm text-black/60">
            Edit templates, RSVP flows, and guestbooks.
          </p>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/events">View events</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
