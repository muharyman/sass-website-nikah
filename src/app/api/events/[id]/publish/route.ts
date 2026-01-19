import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export const runtime = "nodejs";

type PageProps = {
  params: Promise<{ id?: string }>;
};

export async function POST(request: Request, { params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing event id" }, { status: 400 });
  }

  const session = await requireSession();
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  if (event.ownerId && event.ownerId !== session.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = await prisma.event.update({
    where: { id },
    data: { status: "published" },
  });

  return NextResponse.json({ ok: true, slug: updated.slug });
}
