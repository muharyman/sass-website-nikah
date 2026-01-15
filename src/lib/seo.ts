import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export type WeddingSeoData = {
  slug: string;
  title: string;
  description: string;
  published: boolean;
  ogImage?: string;
};

export function buildWeddingMetadata(data: WeddingSeoData): Metadata {
  const ogImage = data.ogImage ?? `/${data.slug}/opengraph-image`;

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "website",
      url: `${siteConfig.url}/${data.slug}`,
      images: [ogImage],
    },
    robots: data.published
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
