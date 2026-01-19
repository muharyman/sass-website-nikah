import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { templatePreviews } from "@/lib/template-previews";
import { TemplatePicker } from "@/components/dashboard/template-picker";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: Promise<{ id?: string }>;
};

export default async function TemplateSelectPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const session = await requireSession();
  const event = await prisma.event.findUnique({
    where: { id },
    select: { id: true, ownerId: true, templateKey: true },
  });

  if (!event) {
    notFound();
  }

  if (event.ownerId && event.ownerId !== session.userId) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-black/50">
            Step 5: Templates
          </p>
          <h1 className="text-3xl font-semibold">Choose your template</h1>
        </div>
        <Button variant="ghost" asChild>
          <Link href={`/dashboard/events/${event.id}/editor`}>Back to editor</Link>
        </Button>
      </header>
      <TemplatePicker
        eventId={event.id}
        templates={templatePreviews}
        selected={event.templateKey}
      />
    </div>
  );
}
