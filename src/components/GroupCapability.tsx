import { Container } from "./Container";
import { Link } from "@/i18n/routing";
import { getGrowthContent } from "@/lib/growth-content";

export function GroupCapability({ locale, detailed = false }: { locale: string; detailed?: boolean }) {
  const c = getGrowthContent(locale);
  return <section className="premium-section group-capability" id="group-capability"><Container>
    {detailed && <h2 className="sr-only">{c.networkCta}</h2>}
    {!detailed && <div className="premium-section-heading"><div><p className="premium-eyebrow">{c.networkEyebrow}</p><h2>{c.networkTitle}</h2></div><p>{c.networkIntro}</p></div>}
    <div className="group-network-grid">
      <div className="group-local"><p className="premium-eyebrow">{c.localLabel}</p><h3>{c.localTitle}</h3><p>{c.localBody}</p><Link href="/contact?from=group-network#rfq" className="premium-text-link">{c.requestCta} →</Link></div>
      <div className="group-connections">{c.networkSteps.map((step, index) => <a key={step.href} href={step.href} target="_blank" rel="noopener noreferrer"><span className="group-step" aria-hidden="true">0{index + 1}</span><div><h3>{step.title} <span aria-hidden="true">↗</span></h3><p>{step.body}</p></div></a>)}</div>
    </div>
    <p className="group-scope-note">{c.scopeNote}</p>
    {!detailed && <Link href="/group-network" className="premium-text-link">{c.networkCta} →</Link>}
  </Container></section>;
}
