import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SolutionCards } from "@/components/SolutionCards";
import { Link, routing } from "@/i18n/routing";
import { getGrowthContent, solutionSlugs, type SolutionSlug } from "@/lib/growth-content";
import { buildMetadata } from "@/lib/seo";
type Props = { params: Promise<{ locale: string; solution: string }> };
function isSolution(value: string): value is SolutionSlug { return (solutionSlugs as readonly string[]).includes(value); }
export function generateStaticParams() { return routing.locales.flatMap(locale => solutionSlugs.map(solution => ({ locale, solution }))); }
export async function generateMetadata({ params }: Props) { const { locale, solution } = await params; if (!isSolution(solution)) return {}; const s = getGrowthContent(locale).solutions[solution]; return buildMetadata({ locale, path: `/solutions/${solution}`, title: s.title, description: s.intro }); }
export default async function SolutionPage({ params }: Props) {
  const { locale, solution } = await params; if (!isSolution(solution)) notFound(); setRequestLocale(locale);
  const c = getGrowthContent(locale); const s = c.solutions[solution];
  return <div className="growth-page"><section className="growth-intro"><Container><Link href="/solutions" className="premium-text-link">← {c.back}</Link><p className="premium-eyebrow mt-8">{c.solutionsEyebrow}</p><h1>{s.title}</h1><p className="premium-lead">{s.intro}</p><Link href={`/contact?from=${solution}#rfq`} className="premium-button">{c.requestCta} →</Link></Container></section>
    <section className="premium-section pt-0"><Container><div className="solution-scope"><div><p className="premium-eyebrow">DARON NAMIBIA</p><h2>{c.localScope}</h2><ul>{s.local.map(item => <li key={item}>{item}</li>)}</ul></div><div><p className="premium-eyebrow">DARON GROUP</p><h2>{c.groupScope}</h2><ul>{s.group.map(item => <li key={item}>{item}</li>)}</ul><a href={s.groupHref} target="_blank" rel="noopener noreferrer" className="premium-text-link">{c.groupCapability} ↗</a></div></div><p className="group-scope-note">{c.scopeNote}</p></Container></section>
    <section className="premium-section growth-process"><Container className="growth-two-column"><div><h2>{c.prepareTitle}</h2><ul className="growth-checklist">{s.prepare.map(item => <li key={item}>{item}</li>)}</ul><Link href={`/contact?from=${solution}#rfq`} className="premium-button mt-6">{c.requestCta} →</Link></div><div className="growth-evidence"><Image src={s.image} alt="" width={1200} height={800} sizes="(max-width: 850px) 100vw, 45vw" /><h3>{c.evidenceTitle}</h3><p>{s.evidence}</p>{s.evidenceHref.startsWith("https:") ? <a href={s.evidenceHref} target="_blank" rel="noopener noreferrer" className="premium-text-link">{c.evidenceCta} ↗</a> : <Link href={s.evidenceHref} className="premium-text-link">{c.evidenceCta} →</Link>}</div></Container></section>
    <section className="premium-section"><Container><h2 className="mb-8">{c.related}</h2><SolutionCards locale={locale} /><Link href="/procurement-resources" className="premium-text-link mt-8 inline-flex">{c.resourcesLink} →</Link></Container></section>
  </div>;
}
