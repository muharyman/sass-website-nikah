import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildWeddingMetadata } from "@/lib/seo";
import { getWeddingBySlug } from "@/lib/weddings";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: Promise<{ slug?: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    return {};
  }
  const session = await getSession();
  const event = await getWeddingBySlug(slug);

  if (!event) {
    return {};
  }

  if (event.status !== "published" && event.ownerId !== session?.userId) {
    return {};
  }

  const title = `${event.brideName} & ${event.groomName}`;
  const description = `Join ${event.brideName} and ${event.groomName} in ${event.city} on ${new Intl.DateTimeFormat(
    "en-US",
    { dateStyle: "long" }
  ).format(event.eventDate)} at ${event.venue}.`;

  return buildWeddingMetadata({
    slug,
    title,
    description,
    published: event.status === "published",
  });
}

export default async function WeddingPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }
  const session = await getSession();
  const event = await getWeddingBySlug(slug);

  if (!event) {
    notFound();
  }

  if (event.status !== "published" && event.ownerId !== session?.userId) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 pb-24 pt-16">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-black/50">
          Wedding Invitation
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl font-[var(--font-display)]">
          {event.brideName} &amp; {event.groomName}
        </h1>
        <p className="mt-4 text-black/70">
          {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
            event.eventDate
          )}{" "}
          di {event.city} di {event.venue}
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href={`/${event.slug}/rsvp`}>RSVP</Link>
          </Button>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-black/10 bg-white/80 p-6">
          <h2 className="text-xl font-semibold">Welcome</h2>
          <p className="mt-3 text-sm text-black/60">
            We are delighted to celebrate our day with family and friends. Please
            RSVP and explore the story behind our journey.
          </p>
        </div>
        <div className="rounded-3xl border border-black/10 bg-white/80 p-6">
          <h2 className="text-xl font-semibold">Event details</h2>
          <ul className="mt-3 text-sm text-black/60">
            <li>Date: {event.eventDate.toDateString()}</li>
            <li>City: {event.city}</li>
            <li>Venue: {event.venue}</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Gallery</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {event.gallery.slice(0, 6).map((photo) => (
            <div
              key={photo.id}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white/70"
            >
              <Image
                src={photo.imageUrl}
                alt={photo.caption ?? "Wedding gallery image"}
                width={600}
                height={450}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
