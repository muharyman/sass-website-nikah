import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/footer";
import { templatePreviews } from "@/lib/template-previews";
import { basePalettes } from "@/config/theme";

export const metadata: Metadata = {
  title: "Templates",
  description: "Browse wedding website templates optimized for SEO and speed.",
};

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

        <section className="grid gap-4 rounded-3xl border border-black/10 bg-white/80 p-6">
          <h2 className="text-xl font-semibold">Base color palettes</h2>
          <p className="text-sm text-black/60">
            Start with elegant blue by default, then switch to another palette
            when you customize your event.
          </p>
          <div className="flex flex-wrap gap-3">
            {basePalettes.map((palette) => (
              <div
                key={palette.name}
                className="flex items-center gap-3 rounded-full border border-black/10 bg-white/90 px-4 py-2 text-sm"
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: palette.value }}
                />
                <span className="font-medium">
                  {palette.name}
                  {palette.isDefault ? " (default)" : ""}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-3 rounded-3xl border border-black/10 bg-white/80 p-6 text-sm text-black/60">
          <h2 className="text-xl font-semibold text-black">Need a custom build?</h2>
          <p>
            If you want a fully custom theme, contact our team and we will help
            you design it.
          </p>
          <Button variant="ghost" asChild>
            <Link href="mailto:hello@nikah-studio.example">Contact us</Link>
          </Button>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templatePreviews.map((template) => (
            <Card key={template.slug} className="flex flex-col gap-4">
              <div
                className="h-40 rounded-2xl border border-black/10"
                style={{
                  background: `linear-gradient(135deg, ${template.palette.background}, ${template.palette.base})`,
                }}
              />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <p className="text-sm text-black/60">{template.style}</p>
                </div>
                <div className="flex gap-2">
                  {[template.palette.base, template.palette.accent].map((color) => (
                    <span
                      key={color}
                      className="h-4 w-4 rounded-full border border-black/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <Button variant="ghost" asChild>
                <Link href={`/templates/${template.slug}`}>Preview template</Link>
              </Button>
            </Card>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
