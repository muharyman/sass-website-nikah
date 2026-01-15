import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await prisma.event.findMany({
    where: { status: "published" },
    select: { slug: true, updatedAt: true },
  });

  const staticRoutes = ["", "/pricing", "/templates"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
    })),
    ...events.map((event) => ({
      url: `${siteConfig.url}/${event.slug}`,
      lastModified: event.updatedAt,
    })),
  ];
}
