import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getTemplatePreview } from "@/lib/template-previews";

type PageProps = {
  params: { slug: string };
};

export default function TemplatePreviewPage({ params }: PageProps) {
  const template = getTemplatePreview(params.slug);

  if (!template) {
    notFound();
  }

  return (
    <main
      className="min-h-screen px-6 pb-24 pt-12"
      style={{
        background: `radial-gradient(circle at 20% 10%, ${template.palette.accent}30, transparent 40%), linear-gradient(180deg, ${template.palette.background} 0%, #ffffff 100%)`,
      }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-6 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-black/50">
            Template preview
          </span>
          <h1
            className="text-4xl font-semibold md:text-6xl font-[var(--font-display)]"
            style={{ color: template.palette.base }}
          >
            {template.couple.bride} &amp; {template.couple.groom}
          </h1>
          <p className="text-black/70">{template.hero.subtitle}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/pricing">Use this template</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/templates">Back to templates</Link>
            </Button>
          </div>
        </header>

        <Card className="flex flex-col gap-6 p-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-[0.3em] text-black/40">
              {template.name}
            </p>
            <h2 className="text-2xl font-semibold">{template.hero.title}</h2>
            <p className="text-black/70">{template.style}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                Date
              </p>
              <p className="mt-2 text-sm font-semibold">{template.event.date}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                City
              </p>
              <p className="mt-2 text-sm font-semibold">{template.event.city}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                Venue
              </p>
              <p className="mt-2 text-sm font-semibold">{template.event.venue}</p>
            </div>
          </div>
        </Card>

        <section className="grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col gap-3 p-6">
            <h3 className="text-lg font-semibold">Story highlight</h3>
            <p className="text-sm text-black/60">
              Use this section to share your journey together, add photos, and
              build excitement for guests.
            </p>
          </Card>
          <Card className="flex flex-col gap-3 p-6">
            <h3 className="text-lg font-semibold">Event timeline</h3>
            <p className="text-sm text-black/60">
              Add ceremonies, receptions, and after-parties in a clean timeline
              layout.
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
}
