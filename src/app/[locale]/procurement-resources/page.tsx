import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { Link } from "@/i18n/routing";
import { getGrowthContent } from "@/lib/growth-content";
import { buildMetadata } from "@/lib/seo";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; const c = getGrowthContent(locale); return buildMetadata({ locale, path: "/procurement-resources", title: c.resourcesTitle, description: c.resourcesIntro }); }
export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params; setRequestLocale(locale); const c = getGrowthContent(locale);
  return <div className="growth-page"><section className="growth-intro"><Container><p className="premium-eyebrow">{c.resourcesEyebrow}</p><h1>{c.resourcesTitle}</h1><p className="premium-lead">{c.resourcesIntro}</p></Container></section>
    <section className="premium-section pt-0"><Container><div className="resource-cards">
      {[{ title: c.catalogueTitle, body: c.catalogueBody, cta: c.catalogueCta, href: "/brands" }, { title: c.capabilityTitle, body: c.capabilityBody, cta: c.capabilityCta, href: "/services" }, { title: c.onboardingTitle, body: c.onboardingBody, cta: c.onboardingCta, href: "/contact?from=procurement-resources#rfq" }].map((item, index) => <article key={item.href}><span className="premium-eyebrow">0{index + 1}</span><h2>{item.title}</h2><p>{item.body}</p><Link href={item.href} className="premium-text-link">{item.cta} →</Link></article>)}
    </div><p className="group-scope-note">{c.documentNote}</p><Link href="/group-network" className="premium-text-link">{c.networkCta} →</Link></Container></section>
  </div>;
}
