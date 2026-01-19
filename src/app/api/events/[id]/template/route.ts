import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export const runtime = "nodejs";

type PageProps = {
  params: Promise<{ id?: string }>;
};

type TemplatePayload = {
  templateKey?: string;
};

export async function POST(request: Request, { params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing event id" }, { status: 400 });
  }

  const session = await requireSession();
  const body = (await request.json()) as TemplatePayload;
  const templateKey = body.templateKey?.trim() ?? "";

  if (!templateKey) {
    return NextResponse.json(
      { error: "Template key is required" },
      { status: 400 }
    );
  }

  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  if (event.ownerId && event.ownerId !== session.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.event.update({
    where: { id },
    data: { templateKey },
  });

  return NextResponse.json({ ok: true });
}
