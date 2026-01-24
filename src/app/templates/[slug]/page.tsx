import { notFound } from "next/navigation";
import { getTemplatePreview } from "@/lib/template-previews";
import {
  HarmoniPreview,
  HeritagePreview,
  LuminousPreview,
  RimbunPreview,
  SavanaPreview,
} from "@/components/templates/preview-layouts";

type PageProps = {
  params: { slug: string };
};

export default function TemplatePreviewPage({ params }: PageProps) {
  const template = getTemplatePreview(params.slug);

  if (!template) {
    notFound();
  }

  const layouts = {
    luminous: LuminousPreview,
    harmoni: HarmoniPreview,
    savana: SavanaPreview,
    heritage: HeritagePreview,
    rimbun: RimbunPreview,
  } as const;

  const TemplateLayout = layouts[template.slug] ?? LuminousPreview;

  return <TemplateLayout template={template} />;
}
