import { Link } from "@/i18n/routing";
import { getGrowthContent, solutionSlugs } from "@/lib/growth-content";
export function SolutionCards({ locale }: { locale: string }) {
  const c = getGrowthContent(locale);
  return <div className="solution-cards">{solutionSlugs.map((slug, index) => <Link href={`/solutions/${slug}`} key={slug}><span className="premium-eyebrow">0{index + 1}</span><h3>{c.solutions[slug].title}</h3><p>{c.solutions[slug].local[0]}</p><span className="solution-card-arrow" aria-hidden="true">↗</span></Link>)}</div>;
}
