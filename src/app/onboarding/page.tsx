import { OnboardingForm } from "@/components/onboarding-form";

type PageProps = {
  searchParams?: { plan?: string };
};

export default function OnboardingPage({ searchParams }: PageProps) {
  const planType = searchParams?.plan ?? "basic";

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 pb-24 pt-16">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-black/50">
          Step 3: Event info
        </p>
        <h1 className="text-3xl font-semibold font-[var(--font-display)]">
          Tell us about your celebration
        </h1>
        <p className="mt-2 text-sm text-black/60">
          We will generate your first draft based on these basics.
        </p>
      </header>
      <OnboardingForm planType={planType} />
    </main>
  );
}
