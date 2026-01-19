import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LogoutButton } from "@/components/dashboard/logout-button";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white/80">
      <header className="border-b border-black/10 bg-white/90">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold">
            {siteConfig.name}
          </Link>
          <nav className="flex items-center gap-4 text-sm text-black/60">
            <Link className="hover:text-black" href="/dashboard">
              Overview
            </Link>
            <Link className="hover:text-black" href="/dashboard/events">
              Events
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
