import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SolutionCards } from "@/components/SolutionCards";
import { GroupCapability } from "@/components/GroupCapability";
import { getGrowthContent } from "@/lib/growth-content";
import { buildMetadata } from "@/lib/seo";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; const c = getGrowthContent(locale); return buildMetadata({ locale, path: "/solutions", title: c.solutionsTitle, description: c.solutionsIntro }); }
export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params; setRequestLocale(locale); const c = getGrowthContent(locale);
  return <div className="growth-page"><section className="growth-intro"><Container><p className="premium-eyebrow">{c.solutionsEyebrow}</p><h1>{c.solutionsTitle}</h1><p className="premium-lead">{c.solutionsIntro}</p></Container></section><section className="premium-section pt-0"><Container><SolutionCards locale={locale} /></Container></section><GroupCapability locale={locale} /></div>;
}
