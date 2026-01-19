import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";

export const runtime = "nodejs";

type PageProps = {
  params: Promise<{ id?: string }>;
};

type UpdatePayload = {
  brideName?: string;
  groomName?: string;
  eventDate?: string;
  city?: string;
  venue?: string;
  slug?: string;
};

export async function PATCH(request: Request, { params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing event id" }, { status: 400 });
  }

  const session = await requireSession();
  const body = (await request.json()) as UpdatePayload;

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  if (event.ownerId && event.ownerId !== session.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const slug = body.slug ? slugify(body.slug) : event.slug;

  try {
    await prisma.event.update({
      where: { id },
      data: {
        brideName: body.brideName?.trim() || event.brideName,
        groomName: body.groomName?.trim() || event.groomName,
        eventDate: body.eventDate ? new Date(body.eventDate) : event.eventDate,
        city: body.city?.trim() || event.city,
        venue: body.venue?.trim() || event.venue,
        slug,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, slug });
}
