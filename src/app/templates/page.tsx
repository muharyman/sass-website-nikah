import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Templates",
  description: "Browse wedding website templates optimized for SEO and speed.",
};

const templateList = [
  { name: "Luminous", style: "Modern editorial" },
  { name: "Harmoni", style: "Warm minimal" },
  { name: "Sakura", style: "Romantic floral" },
  { name: "Savana", style: "Sunset cinematic" },
  { name: "Heritage", style: "Classic elegance" },
  { name: "Selaras", style: "Soft pastel" },
];

export default function TemplatesPage() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-16">
        <header className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-[0.3em] text-black/50">
            Templates
          </span>
          <h1 className="text-4xl font-semibold md:text-5xl font-[var(--font-display)]">
            Choose the mood for your celebration
          </h1>
          <p className="max-w-2xl text-black/70">
            Every template includes SEO metadata, fast image delivery, and a
            mobile-first layout. Upgrade anytime to unlock premium collections.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button>Start from a template</Button>
            <Button variant="ghost" asChild>
              <Link href="/pricing">Compare plans</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/">Back to homepage</Link>
            </Button>
          </div>
        </header>

        <Card className="p-0">
          <Image
            src="/template-grid.svg"
            alt="Template grid preview"
            width={1200}
            height={700}
            className="h-auto w-full rounded-3xl"
          />
        </Card>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templateList.map((template) => (
            <Card key={template.name} className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{template.name}</h3>
              <p className="text-sm text-black/60">{template.style}</p>
            </Card>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
