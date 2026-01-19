import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { requireSession } from "@/lib/auth";

type EventPayload = {
  brideName?: string;
  groomName?: string;
  eventDate?: string;
  city?: string;
  venue?: string;
  planType?: string;
};

function normalizePlanType(value?: string) {
  switch (value) {
    case "free":
    case "basic":
    case "premium":
    case "exclusive":
      return value;
    default:
      return "basic";
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    const body = (await request.json()) as EventPayload;
    const brideName = body.brideName?.trim() ?? "";
    const groomName = body.groomName?.trim() ?? "";
    const eventDate = body.eventDate?.trim() ?? "";
    const city = body.city?.trim() ?? "";
    const venue = body.venue?.trim() ?? "";

    if (!brideName || !groomName || !eventDate || !city || !venue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const slugBase = slugify(`${brideName}-${groomName}`);
    const slug = `${slugBase}-${crypto.randomBytes(3).toString("hex")}`;

    const event = await prisma.event.create({
      data: {
        ownerId: session.userId,
        slug,
        planType: normalizePlanType(body.planType),
        status: "draft",
        brideName,
        groomName,
        eventDate: new Date(eventDate),
        city,
        venue,
      },
    });

    return NextResponse.json({ id: event.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
