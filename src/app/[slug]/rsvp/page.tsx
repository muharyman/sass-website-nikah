import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PublicRsvpForm } from "@/components/site/rsvp-form";
import { Card } from "@/components/ui/card";

type PageProps = {
  params: Promise<{ slug?: string }>;
};

export default async function PublicRsvpPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const event = await prisma.event.findUnique({
    where: { slug },
    select: { brideName: true, groomName: true, status: true },
  });

  if (!event || event.status !== "published") {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-6 pb-24 pt-16">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-black/50">
          RSVP
        </p>
        <h1 className="mt-4 text-3xl font-semibold font-[var(--font-display)]">
          {event.brideName} &amp; {event.groomName}
        </h1>
        <p className="mt-3 text-sm text-black/60">
          Please let us know if you can join.
        </p>
      </header>

      <Card className="p-6">
        <PublicRsvpForm slug={slug} />
      </Card>

      <Link className="text-center text-sm text-black/60" href={`/${slug}`}>
        Back to invitation
      </Link>
    </main>
  );
}
