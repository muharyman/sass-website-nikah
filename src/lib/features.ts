import { pricingPlans } from "@/config/pricing";
import type { AddonItem, FeatureFlags, PlanType } from "@/lib/plans";
import { applyAddons } from "@/lib/plans";

export function getPlanConfig(planType: PlanType) {
  const plan = pricingPlans.find((entry) => entry.id === planType);
  if (!plan) {
    throw new Error(`Unknown plan type: ${planType}`);
  }
  return plan;
}

export function getFeatureFlags(
  planType: PlanType,
  addons: AddonItem[] = [],
  usage?: { rsvpUsed?: number; galleryUsed?: number }
): FeatureFlags {
  const base = getPlanConfig(planType).features;
  return {
    ...applyAddons(base, addons),
    ...usage,
  };
}

export function getLimitCopy(key: "rsvp" | "gallery", limit: number) {
  if (limit === 0) return "Not included";
  return `${limit} ${key === "rsvp" ? "RSVPs" : "gallery photos"}`;
}
