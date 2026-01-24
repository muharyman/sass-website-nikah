export type TemplatePreview = {
  slug: string;
  name: string;
  style: string;
  palette: {
    base: string;
    accent: string;
    background: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  couple: {
    bride: string;
    groom: string;
  };
  event: {
    date: string;
    city: string;
    venue: string;
  };
};

export const templatePreviews: TemplatePreview[] = [
  {
    slug: "luminous",
    name: "Luminous",
    style: "Modern editorial",
    palette: {
      base: "#1f4b7a",
      accent: "#d9b574",
      background: "#f4f7fb",
    },
    hero: {
      title: "An evening to remember",
      subtitle: "An elegant editorial layout for city celebrations.",
    },
    couple: {
      bride: "Alya",
      groom: "Reza",
    },
    event: {
      date: "Saturday, 12 July 2026",
      city: "Jakarta",
      venue: "Nusantara Hall",
    },
  },
  {
    slug: "harmoni",
    name: "Harmoni",
    style: "Warm minimal",
    palette: {
      base: "#2d5b6f",
      accent: "#b8895b",
      background: "#f6f3ee",
    },
    hero: {
      title: "Warm, soft, and intimate",
      subtitle: "Perfect for cozy gatherings and daylight ceremonies.",
    },
    couple: {
      bride: "Nadia",
      groom: "Fajar",
    },
    event: {
      date: "Sunday, 2 August 2026",
      city: "Bandung",
      venue: "Cendana Garden",
    },
  },
  {
    slug: "savana",
    name: "Savana",
    style: "Sunset cinematic",
    palette: {
      base: "#244866",
      accent: "#d28a6a",
      background: "#f9f1ea",
    },
    hero: {
      title: "Golden hour vows",
      subtitle: "A cinematic layout for adventurous celebrations.",
    },
    couple: {
      bride: "Maya",
      groom: "Dimas",
    },
    event: {
      date: "Friday, 19 September 2026",
      city: "Yogyakarta",
      venue: "Savana Terrace",
    },
  },
  {
    slug: "heritage",
    name: "Heritage",
    style: "Classic elegance",
    palette: {
      base: "#173a52",
      accent: "#c1a16b",
      background: "#f2f4f7",
    },
    hero: {
      title: "A timeless celebration",
      subtitle: "Classic typography and graceful spacing.",
    },
    couple: {
      bride: "Rani",
      groom: "Arman",
    },
    event: {
      date: "Saturday, 8 November 2026",
      city: "Surabaya",
      venue: "Meru Ballroom",
    },
  },
  {
    slug: "rimbun",
    name: "Rimbun",
    style: "Botanical layers",
    palette: {
      base: "#1f5b45",
      accent: "#caa46a",
      background: "#f5f3ee",
    },
    hero: {
      title: "A garden promise",
      subtitle: "Soft botanical textures with layered, organic sections.",
    },
    couple: {
      bride: "Selma",
      groom: "Irfan",
    },
    event: {
      date: "Saturday, 14 December 2026",
      city: "Malang",
      venue: "Rimbun Estate",
    },
  },
];

export function getTemplatePreview(slug: string) {
  return templatePreviews.find((template) => template.slug === slug);
}
