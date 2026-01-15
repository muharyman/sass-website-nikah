import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-black/10 bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-black/60 md:flex-row md:items-center md:justify-between">
        <div>Built for modern wedding stories.</div>
        <div className="flex items-center gap-4">
          <Link className="hover:text-black" href="/pricing">
            Pricing
          </Link>
          <Link className="hover:text-black" href="/templates">
            Templates
          </Link>
          {siteConfig.showFooterCredit && (
            <Link
              className="hover:text-black"
              href={siteConfig.url}
              target="_blank"
            >
              Powered by {siteConfig.name}
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
