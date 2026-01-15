export type PlanType = "free" | "basic" | "premium" | "exclusive";

export type EventStatus = "draft" | "published";

export type TemplateAccess = "starter" | "classic" | "premium" | "all";

export type FeatureSet = {
  rsvpLimit: number;
  galleryLimit: number;
  watermark: boolean;
  templateAccess: TemplateAccess;
  customTheme: boolean;
  guestbook: boolean;
  backgroundMusic: boolean;
  exportRsvp: boolean;
  customDomain: boolean;
  qrCheckIn: boolean;
};

export type PlanConfig = {
  id: PlanType;
  name: string;
  price: number;
  tagline: string;
  features: FeatureSet;
};

export type AddonType =
  | "extra_rsvp"
  | "extra_gallery"
  | "remove_watermark"
  | "custom_domain"
  | "qr_checkin"
  | "background_music"
  | "guestbook"
  | "export_rsvp"
  | "custom_theme"
  | "template_pack";

export type AddonItem = {
  type: AddonType;
  amount?: number;
  templateAccess?: TemplateAccess;
};

export type FeatureFlags = FeatureSet & {
  rsvpUsed?: number;
  galleryUsed?: number;
};

export function applyAddons(base: FeatureSet, addons: AddonItem[] = []): FeatureSet {
  return addons.reduce((features, addon) => {
    switch (addon.type) {
      case "extra_rsvp":
        return {
          ...features,
          rsvpLimit: features.rsvpLimit + (addon.amount ?? 0),
        };
      case "extra_gallery":
        return {
          ...features,
          galleryLimit: features.galleryLimit + (addon.amount ?? 0),
        };
      case "remove_watermark":
        return { ...features, watermark: false };
      case "custom_domain":
        return { ...features, customDomain: true };
      case "qr_checkin":
        return { ...features, qrCheckIn: true };
      case "background_music":
        return { ...features, backgroundMusic: true };
      case "guestbook":
        return { ...features, guestbook: true };
      case "export_rsvp":
        return { ...features, exportRsvp: true };
      case "custom_theme":
        return { ...features, customTheme: true };
      case "template_pack":
        return {
          ...features,
          templateAccess: addon.templateAccess ?? features.templateAccess,
        };
      default:
        return features;
    }
  }, base);
}

export function canAddRsvp(featureFlags: FeatureFlags) {
  if (featureFlags.rsvpLimit === 0) return false;
  if (featureFlags.rsvpUsed === undefined) return true;
  return featureFlags.rsvpUsed < featureFlags.rsvpLimit;
}

export function canAddGalleryItem(featureFlags: FeatureFlags) {
  if (featureFlags.galleryLimit === 0) return false;
  if (featureFlags.galleryUsed === undefined) return true;
  return featureFlags.galleryUsed < featureFlags.galleryLimit;
}

export function hasAccess(featureFlags: FeatureFlags, key: keyof FeatureSet) {
  return Boolean(featureFlags[key]);
}
