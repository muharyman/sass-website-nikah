import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getFeatureFlags } from "@/lib/features";
import { canAddRsvp } from "@/lib/plans";

export const runtime = "nodejs";

type PageProps = {
  params: Promise<{ id?: string }>;
};

type RsvpPayload = {
  name?: string;
  email?: string;
  guests?: number;
  message?: string;
};

export async function POST(request: Request, { params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing event id" }, { status: 400 });
  }

  const body = (await request.json()) as RsvpPayload;
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const guests = Number(body.guests ?? 1);

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!Number.isFinite(guests) || guests < 1) {
    return NextResponse.json(
      { error: "Guests must be at least 1" },
      { status: 400 }
    );
  }

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      addons: true,
      _count: { select: { rsvps: true } },
    },
  });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const addons = event.addons.map((addon) => ({
    type: addon.type,
    amount: addon.amount ?? undefined,
    templateAccess: addon.templateAccess ?? undefined,
  }));

  const featureFlags = getFeatureFlags(event.planType, addons, {
    rsvpUsed: event._count.rsvps,
  });

  if (!canAddRsvp(featureFlags)) {
    return NextResponse.json(
      { error: "RSVP limit reached" },
      { status: 403 }
    );
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
}
