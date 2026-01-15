import Image from "next/image";
import Link from "next/link";
import { pricingPlans } from "@/config/pricing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteFooter } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-16">
        <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <span className="text-sm uppercase tracking-[0.3em] text-black/50">
              Saas Wedding Website Builder
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-black md:text-6xl md:leading-tight font-[var(--font-display)]">
              Create a wedding website that feels like an invitation.
            </h1>
            <p className="text-lg text-black/70">
              Launch a stunning wedding page with RSVP, gallery, guestbook, and
              custom themes. One payment, per event. No subscriptions.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button>Start your first event</Button>
              <Button variant="ghost" asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
          <Card className="relative overflow-hidden p-3">
            <Image
              src="/hero-illustration.svg"
              alt="Hero collage of wedding website sections"
              width={1200}
              height={800}
              priority
              className="h-auto w-full rounded-2xl"
            />
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "High-converting RSVP flow",
              copy: "Collect confirmations with QR check-in support and export-ready lists.",
            },
            {
              title: "Gallery-first storytelling",
              copy: "Lazy-loaded galleries keep your site fast on every device.",
            },
            {
              title: "Templates that feel bespoke",
              copy: "Unlock premium layouts and custom themes as your event grows.",
            },
          ].map((item) => (
            <Card key={item.title} className="flex flex-col gap-3">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-black/60">{item.copy}</p>
            </Card>
          ))}
        </section>

        <section className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-0">
            <Image
              src="/template-grid.svg"
              alt="Preview of wedding templates"
              width={1200}
              height={700}
              className="h-auto w-full rounded-3xl"
            />
          </Card>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold font-[var(--font-display)]">
              Curated templates
            </h2>
            <p className="text-black/70">
              Pick a starting point and tailor every detail. From minimal to
              cinematic, each template is optimized for SEO and speed.
            </p>
            <Button variant="ghost" asChild>
              <Link href="/templates">Browse all templates</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold font-[var(--font-display)]">
              Plans for every celebration
            </h2>
            <Button variant="ghost" asChild>
              <Link href="/pricing">See full comparison</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className="flex flex-col gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-black/40">
                    {plan.name}
                  </p>
                  <h3 className="text-2xl font-semibold">${plan.price}</h3>
                  <p className="text-sm text-black/60">{plan.tagline}</p>
                </div>
                <ul className="text-sm text-black/70">
                  <li>{plan.features.rsvpLimit} RSVPs</li>
                  <li>{plan.features.galleryLimit} gallery photos</li>
                  <li>
                    {plan.features.customTheme ? "Custom themes" : "Preset themes"}
                  </li>
                </ul>
                <Button>Choose {plan.name}</Button>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
