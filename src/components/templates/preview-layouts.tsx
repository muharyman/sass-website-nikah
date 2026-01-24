import Link from "next/link";
import type { TemplatePreview } from "@/lib/template-previews";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type TemplateLayoutProps = {
  template: TemplatePreview;
};

function PreviewActions() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Button asChild>
        <Link href="/pricing">Use this template</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/templates">Back to templates</Link>
      </Button>
    </div>
  );
}

export function LuminousPreview({ template }: TemplateLayoutProps) {
  return (
    <main
      className="min-h-screen px-6 pb-24 pt-12"
      style={{
        background: `radial-gradient(circle at 20% 10%, ${template.palette.accent}30, transparent 50%), linear-gradient(180deg, ${template.palette.background} 0%, #ffffff 100%)`,
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 template-reveal">
            <span className="text-xs uppercase tracking-[0.4em] text-black/50">
              {template.style}
            </span>
            <h1
              className="text-4xl font-semibold md:text-6xl font-[var(--font-display)]"
              style={{ color: template.palette.base }}
            >
              {template.couple.bride} &amp; {template.couple.groom}
            </h1>
            <p className="max-w-xl text-black/70">{template.hero.subtitle}</p>
            <PreviewActions />
          </div>
          <div className="relative">
            <div
              className="aspect-[3/4] w-full rounded-[2.5rem] border border-black/10 shadow-xl template-float"
              style={{
                background: `linear-gradient(160deg, ${template.palette.base}, ${template.palette.accent})`,
              }}
            />
            <Card className="absolute -bottom-8 left-6 right-6 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                Celebration
              </p>
              <div className="mt-4 grid gap-3 text-sm">
                <p className="font-semibold">{template.event.date}</p>
                <p className="text-black/60">{template.event.venue}</p>
                <p className="text-black/60">{template.event.city}</p>
              </div>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Editorial story</h3>
            <p className="text-sm text-black/60">
              Showcase the journey with a magazine-style narrative and gallery.
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Ceremony details</h3>
            <p className="text-sm text-black/60">
              Highlight ceremony flow, attire guidance, and RSVP deadline.
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Travel notes</h3>
            <p className="text-sm text-black/60">
              Share accommodation blocks, shuttle info, and local tips.
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
}

export function HarmoniPreview({ template }: TemplateLayoutProps) {
  return (
    <main
      className="min-h-screen px-6 pb-24 pt-16"
      style={{
        background: `linear-gradient(180deg, ${template.palette.background} 0%, #fffaf5 100%)`,
      }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <header className="flex flex-col gap-6 text-center template-reveal">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.4em] text-black/50">
            <span>{template.event.date}</span>
            <span className="h-1 w-1 rounded-full bg-black/30" />
            <span>{template.event.city}</span>
          </div>
          <h1
            className="text-4xl font-semibold md:text-6xl font-[var(--font-display)]"
            style={{ color: template.palette.base }}
          >
            {template.couple.bride} &amp; {template.couple.groom}
          </h1>
          <p className="mx-auto max-w-2xl text-black/60">
            {template.hero.subtitle}
          </p>
          <PreviewActions />
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Intimate schedule</h2>
            <div className="space-y-3 text-sm text-black/60">
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span>Akad nikah</span>
                <span>10:00 WIB</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span>Resepsi</span>
                <span>12:30 WIB</span>
              </div>
              <div className="flex items-center justify-between">
                <span>After moments</span>
                <span>15:00 WIB</span>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Gentle details</h2>
            <p className="text-sm text-black/60">
              Use this layout for soft neutrals, warm shadows, and simple
              sections that keep guests focused on the details.
            </p>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-black/40">
              <span className="rounded-full border border-black/10 px-3 py-1">
                Dress code
              </span>
              <span className="rounded-full border border-black/10 px-3 py-1">
                RSVP
              </span>
              <span className="rounded-full border border-black/10 px-3 py-1">
                Gift
              </span>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}

export function SavanaPreview({ template }: TemplateLayoutProps) {
  return (
    <main
      className="min-h-screen px-6 pb-24 pt-12"
      style={{
        background: `linear-gradient(180deg, ${template.palette.base} 0%, ${template.palette.background} 55%, #ffffff 100%)`,
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10 p-10 text-white shadow-2xl backdrop-blur template-reveal">
          <div className="absolute inset-0 opacity-40">
            <div
              className="h-full w-full"
              style={{
                background: `radial-gradient(circle at 30% 20%, ${template.palette.accent}80, transparent 55%)`,
              }}
            />
          </div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.5em] text-white/70">
                {template.style}
              </p>
              <h1 className="text-4xl font-semibold md:text-6xl font-[var(--font-display)]">
                {template.couple.bride} &amp; {template.couple.groom}
              </h1>
              <p className="max-w-xl text-white/80">{template.hero.subtitle}</p>
              <PreviewActions />
            </div>
            <div className="grid gap-4">
              <Card className="border-white/20 bg-white/10 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Location
                </p>
                <p className="mt-3 text-lg font-semibold">{template.event.venue}</p>
                <p className="text-sm text-white/70">{template.event.city}</p>
              </Card>
              <Card className="border-white/20 bg-white/10 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Date
                </p>
                <p className="mt-3 text-lg font-semibold">{template.event.date}</p>
                <p className="text-sm text-white/70">Golden hour ceremony</p>
              </Card>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {["Story", "Gallery", "RSVP"].map((label) => (
            <Card key={label} className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                {label}
              </p>
              <h3 className="text-lg font-semibold">Cinematic {label}</h3>
              <p className="text-sm text-black/60">
                Layered sections with bold imagery and immersive storytelling.
              </p>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}

export function HeritagePreview({ template }: TemplateLayoutProps) {
  return (
    <main
      className="min-h-screen px-6 pb-24 pt-16"
      style={{
        background: `linear-gradient(180deg, ${template.palette.background} 0%, #f7f4ef 100%)`,
      }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <header className="text-center template-reveal">
          <div className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-black/20 px-4 py-2 text-xs uppercase tracking-[0.4em] text-black/60">
            {template.style}
          </div>
          <h1
            className="text-4xl font-semibold md:text-6xl font-[var(--font-display)]"
            style={{ color: template.palette.base }}
          >
            {template.couple.bride} &amp; {template.couple.groom}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-black/60">
            {template.hero.subtitle}
          </p>
          <div className="mt-6">
            <PreviewActions />
          </div>
        </header>

        <section className="rounded-[2.5rem] border border-black/10 bg-white/80 p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                Date
              </p>
              <p className="mt-3 text-sm font-semibold">{template.event.date}</p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                Venue
              </p>
              <p className="mt-3 text-sm font-semibold">{template.event.venue}</p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                City
              </p>
              <p className="mt-3 text-sm font-semibold">{template.event.city}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Classic gallery</h3>
            <p className="text-sm text-black/60">
              Symmetric grids, serif accents, and timeless spacing.
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Formal RSVP</h3>
            <p className="text-sm text-black/60">
              Present guest invitations with refined form fields and etiquette.
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
}

export function RimbunPreview({ template }: TemplateLayoutProps) {
  return (
    <main
      className="min-h-screen px-6 pb-24 pt-12"
      style={{
        background: `radial-gradient(circle at 70% 15%, ${template.palette.accent}35, transparent 55%), linear-gradient(160deg, ${template.palette.background} 0%, #f9f7f2 100%)`,
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 template-reveal">
            <span className="text-xs uppercase tracking-[0.4em] text-black/50">
              {template.style}
            </span>
            <h1
              className="text-4xl font-semibold md:text-6xl font-[var(--font-display)]"
              style={{ color: template.palette.base }}
            >
              {template.couple.bride} &amp; {template.couple.groom}
            </h1>
            <p className="max-w-xl text-black/70">{template.hero.subtitle}</p>
            <PreviewActions />
          </div>
          <div className="grid gap-4">
            <div
              className="h-48 rounded-[2rem] border border-black/10 shadow-lg template-float"
              style={{
                background: `linear-gradient(140deg, ${template.palette.base}, ${template.palette.accent})`,
              }}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-28 rounded-[1.5rem] border border-black/10 bg-white/70" />
              <div className="h-28 rounded-[1.5rem] border border-black/10 bg-white/70" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Garden venue</h3>
            <p className="text-sm text-black/60">
              Present the ceremony in a lush, botanical layout with soft layers.
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Signature details</h3>
            <p className="text-sm text-black/60">
              Highlight dress codes, songs, and guest notes in compact cards.
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Gift registry</h3>
            <p className="text-sm text-black/60">
              Provide a gentle, botanical section for blessings and gifts.
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
}
