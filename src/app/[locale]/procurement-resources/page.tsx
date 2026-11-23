import { QuoteLink } from "@/components/QuoteLink";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { ResourceRequestForm } from "@/components/ResourceRequestForm";
import { Link } from "@/i18n/routing";
import { getGrowthContent } from "@/lib/growth-content";
import { getPortCallContent } from "@/lib/port-call-content";
import { getResourceFormLabels } from "@/lib/resource-form-content";
import { buildMetadata } from "@/lib/seo";
import { getVendorPackContent } from "@/lib/vendor-pack-content";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; const c = getGrowthContent(locale); return buildMetadata({ locale, path: "/procurement-resources", title: c.resourcesTitle, description: c.resourcesIntro }); }
export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params; setRequestLocale(locale); const c = getGrowthContent(locale); const pack = getVendorPackContent(locale); const portCall = getPortCallContent(locale);
  const formCopy = { ...getResourceFormLabels(locale), ...pack.form };
  return <div className="growth-page"><section className="growth-intro"><Container><p className="premium-eyebrow">{c.resourcesEyebrow}</p><h1>{c.resourcesTitle}</h1><p className="premium-lead">{c.resourcesIntro}</p></Container></section>
    <section id="vendor-pack" className="premium-section pt-0" aria-labelledby="vendor-pack-title"><Container className="growth-two-column">
      <div><p className="premium-eyebrow">{pack.eyebrow}</p><h2 id="vendor-pack-title" className="mt-4">{pack.title}</h2><p className="premium-lead mt-5">{pack.intro}</p>
        <h3 className="mt-8">{pack.includesTitle}</h3><ul className="growth-checklist">{pack.includes.map(item => <li key={item}>{item}</li>)}</ul>
        <p className="group-scope-note">{pack.certNote}</p>
        <Link href="/port-call-checklist" className="premium-text-link mt-6 inline-block">{portCall.resourcesLink} →</Link></div>
      <div className="premium-form-panel"><h3 className="mb-6">{pack.form.formTitle}</h3><ResourceRequestForm asset="vendor-pack" copy={formCopy} locale={locale} /></div>
    </Container></section>
    <section className="premium-section"><Container><div className="resource-cards">
      {[{ title: c.catalogueTitle, body: c.catalogueBody, cta: c.catalogueCta, href: "/brands" }, { title: c.capabilityTitle, body: c.capabilityBody, cta: c.capabilityCta, href: "/services" }, { title: c.onboardingTitle, body: c.onboardingBody, cta: c.onboardingCta, href: "email" }].map((item, index) => <article key={item.href}><span className="premium-eyebrow">0{index + 1}</span><h2>{item.title}</h2><p>{item.body}</p>{item.href === "email" ? <QuoteLink context={item.title} className="premium-text-link">{item.cta} →</QuoteLink> : <Link href={item.href} className="premium-text-link">{item.cta} →</Link>}</article>)}
    </div><p className="group-scope-note">{c.documentNote}</p><Link href="/group-network" className="premium-text-link">{c.networkCta} →</Link></Container></section>
  </div>;
}
