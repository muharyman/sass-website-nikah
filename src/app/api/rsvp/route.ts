import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type RsvpPayload = {
  slug?: string;
  name?: string;
  email?: string;
  guests?: number;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RsvpPayload;
    const slug = body.slug?.trim() ?? "";
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const guests = Number(body.guests ?? 1);

    if (!slug || !name) {
      return NextResponse.json(
        { error: "Slug and name are required" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(guests) || guests < 1) {
      return NextResponse.json(
        { error: "Guests must be at least 1" },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { slug },
      select: { id: true, status: true },
    });

    if (!event || event.status !== "published") {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        eventId: event.id,
        name,
        email: email || null,
        guests,
        message: body.message?.trim() || null,
      },
    });

    return NextResponse.json({ id: rsvp.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
  }
}
