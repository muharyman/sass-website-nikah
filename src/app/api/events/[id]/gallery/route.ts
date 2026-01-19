import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getFeatureFlags } from "@/lib/features";
import { canAddGalleryItem } from "@/lib/plans";
import { requireSession } from "@/lib/auth";

export const runtime = "nodejs";

type PageProps = {
  params: Promise<{ id?: string }>;
};

type GalleryPayload = {
  imageUrl?: string;
  caption?: string;
};

export async function POST(request: Request, { params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing event id" }, { status: 400 });
  }

  const session = await requireSession();
  const body = (await request.json()) as GalleryPayload;
  const imageUrl = body.imageUrl?.trim() ?? "";

  if (!imageUrl) {
    return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
  }

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      addons: true,
      _count: { select: { gallery: true } },
    },
  });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  if (event.ownerId && event.ownerId !== session.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const addons = event.addons.map((addon) => ({
    type: addon.type,
    amount: addon.amount ?? undefined,
    templateAccess: addon.templateAccess ?? undefined,
  }));

  const featureFlags = getFeatureFlags(event.planType, addons, {
    galleryUsed: event._count.gallery,
  });

  if (!canAddGalleryItem(featureFlags)) {
    return NextResponse.json(
      { error: "Gallery limit reached" },
      { status: 403 }
    );
  }

  const item = await prisma.galleryItem.create({
    data: {
      eventId: event.id,
      imageUrl,
      caption: body.caption?.trim() || null,
    },
  });

  return NextResponse.json({ id: item.id });
}
