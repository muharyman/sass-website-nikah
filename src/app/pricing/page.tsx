import type { Metadata } from "next";
import Link from "next/link";
import { pricingPlans } from "@/config/pricing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/footer";
import { formatRupiah } from "@/lib/utils";
import { MidtransCheckoutButton } from "@/components/payments/midtrans-button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose a plan that fits your wedding event.",
};

export default function PricingPage() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-16">
        <header className="flex flex-col gap-4 text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-black/50">
            One-time payment in Rupiah (IDR)
          </span>
          <h1 className="text-4xl font-semibold md:text-5xl font-[var(--font-display)]">
            Pricing
          </h1>
          <p className="mx-auto max-w-2xl text-black/70">
            Pay once per event. Upgrade later with add-ons when you need more
            RSVP seats, gallery space, or premium features.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <Card key={plan.id} className="flex h-full flex-col gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-black/40">
                  {plan.name}
                </p>
                <h2 className="text-3xl font-semibold">
                  {formatRupiah(plan.price)}
                </h2>
                <p className="text-sm text-black/60">{plan.tagline}</p>
              </div>
              <ul className="space-y-2 text-sm text-black/70">
                <li>{plan.features.rsvpLimit} RSVP seats</li>
                <li>{plan.features.galleryLimit} gallery uploads</li>
                <li>{plan.features.watermark ? "Watermark" : "No watermark"}</li>
                <li>
                  {plan.features.customTheme ? "Custom themes" : "Preset themes"}
                </li>
                <li>
                  {plan.features.customDomain ? "Custom domain" : "Default domain"}
                </li>
              </ul>
              {plan.price === 0 ? (
                <Button className="mt-auto" asChild>
                  <Link href="/dashboard">Start free</Link>
                </Button>
              ) : (
                <MidtransCheckoutButton className="mt-auto" planId={plan.id}>
                  Select {plan.name}
                </MidtransCheckoutButton>
              )}
            </Card>
          ))}
        </section>

        <section className="grid gap-4 rounded-3xl border border-black/10 bg-white/80 p-8 text-sm text-black/70">
          <h3 className="text-lg font-semibold text-black">Add-ons</h3>
          <p>
            Add extra RSVP seats, gallery slots, QR check-in, or custom domains
            anytime after you publish.
          </p>
          <p>Payments are processed securely via Midtrans.</p>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Manage your events</Link>
          </Button>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
