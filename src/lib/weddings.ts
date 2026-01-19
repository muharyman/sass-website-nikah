import { prisma } from "@/lib/db";

export async function getWeddingBySlug(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: {
      addons: true,
      gallery: true,
      _count: {
        select: {
          rsvps: true,
          gallery: true,
        },
      },
    },
  });
}
