import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { GroupCapability } from "@/components/GroupCapability";
import { Link } from "@/i18n/routing";
import { getGrowthContent } from "@/lib/growth-content";
import { buildMetadata } from "@/lib/seo";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; const c = getGrowthContent(locale); return buildMetadata({ locale, path: "/group-network", title: c.networkTitle, description: c.networkIntro }); }
export default async function GroupNetworkPage({ params }: Props) {
  const { locale } = await params; setRequestLocale(locale); const c = getGrowthContent(locale);
  return <div className="growth-page"><section className="growth-intro"><Container><p className="premium-eyebrow">{c.networkEyebrow}</p><h1>{c.networkTitle}</h1><p className="premium-lead">{c.networkPageIntro}</p><a href="https://daron-group.com/our-group/" target="_blank" rel="noopener noreferrer" className="premium-text-link">{c.groupSite} ↗</a></Container></section>
    <GroupCapability locale={locale} detailed />
    <section className="premium-section growth-process"><Container><h2>{c.processTitle}</h2><ol>{c.process.map((step, index) => <li key={step}><span aria-hidden="true">0{index + 1}</span><p>{step}</p></li>)}</ol></Container></section>
    <section className="premium-section"><Container className="growth-two-column"><div><p className="premium-eyebrow">DARON GROUP</p><h2>{c.locationsTitle}</h2></div><div><p className="premium-lead">{c.locationsBody}</p><a href="https://daron-group.com/contact/" target="_blank" rel="noopener noreferrer" className="premium-text-link">{c.locationsCta} ↗</a><Link href="/contact?from=group-network#rfq" className="premium-button mt-8">{c.requestCta} →</Link></div></Container></section>
  </div>;
}
