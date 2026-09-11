import { ImmersiveHome } from "@/components/ImmersiveHome";
import { HempelComparison } from "@/components/HempelComparison";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { Link } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { contact, partners } from "@/lib/site";
import { GroupCapability } from "@/components/GroupCapability";
import { SolutionCards } from "@/components/SolutionCards";
import { RigCampaign } from "@/components/RigCampaign";
import { getGrowthContent } from "@/lib/growth-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({ locale, path: "/", title: t("homeTitle"), description: t("homeDescription"), titleAbsolute: true });
}
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale); const t = await getTranslations("PremiumHome");
  if (locale === "en") return <ImmersiveHome />;
  const growth = getGrowthContent(locale);
  const services = [
    {key:"marine",href:"/services/ship-chandlery"}, {key:"offshore",href:"/industries/oil-and-gas"},
    {key:"provisions",href:"/services#catering"}, {key:"coatings",href:"/services/coatings"}, {key:"logistics",href:"/services#warehousing"},
  ];
  return <div className="premium-home">
    <section className="premium-hero">
      <Container className="premium-hero-inner"><div className="premium-hero-copy">
        <p className="premium-eyebrow">{t("location")}<span aria-hidden="true" /></p>
        <h1>{t("title")}</h1><p className="premium-lead">{t("intro")}</p>
        <div className="premium-hero-actions"><Link href="/contact#rfq" className="premium-button">{t("quote")}<span aria-hidden="true">→</span></Link><Link href="/track-record" className="premium-text-link">{t("explore")} <span aria-hidden="true">↗</span></Link></div>
      </div></Container>
      <figure className="premium-hero-photo"><Image src="/images/site/operations/daron-fleet-normand-energy.jpg" alt={t("heroAlt")} fill preload sizes="(max-width: 850px) 100vw, 58vw" /><figcaption>{t("caption")}</figcaption></figure>
    </section>
    <section className="premium-facts"><Container><dl><div><dt>{t("since")}</dt><dd>2012</dd></div><div><dt>{t("base")}</dt><dd>{t("baseValue")}</dd></div><div><dt>{t("reach")}</dt><dd>{t("reachValue")}</dd></div></dl></Container></section>
    <section className="premium-section"><Container><div className="premium-section-heading"><div><p className="premium-eyebrow">{t("servicesEyebrow")}</p><h2>{t("servicesTitle")}</h2></div><p>{t("servicesBody")}</p></div>
      <div className="premium-services"><figure><Image src="/images/site/operations/seven-borealis-dock.jpg" alt={t("serviceAlt")} fill sizes="(max-width: 850px) 100vw, 40vw" /><figcaption>Seven Borealis · Walvis Bay</figcaption></figure>
      <div className="premium-service-list">{services.map((service,index)=><Link href={service.href} key={service.key}><span className="premium-service-number">0{index+1}</span><div><h3>{t(service.key)}</h3><p>{t(`${service.key}Body`)}</p></div><span className="premium-service-arrow" aria-hidden="true">↗</span></Link>)}<Link className="all-services" href="/services">{t("allServices")} →</Link></div></div>
    </Container></section>
    <section className="premium-section home-solutions"><Container><div className="premium-section-heading"><div><p className="premium-eyebrow">{growth.solutionsEyebrow}</p><h2>{growth.solutionsTitle}</h2></div><p>{growth.solutionsIntro}</p></div><SolutionCards locale={locale} /></Container></section>
    <RigCampaign locale={locale} />
    <section className="premium-section premium-proof"><Container><div className="premium-section-heading"><div><p className="premium-eyebrow">{t("proofEyebrow")}</p><h2>{t("proofTitle")}</h2></div><p>{t("proofBody")}</p></div>
      <div className="premium-projects"><Link href="/track-record"><div className="premium-project-image"><Image src="/images/site/operations/container-lift-subsea7.jpg" alt={t("projectAlt")} fill sizes="(max-width: 600px) 100vw, 50vw" /></div><div className="premium-project-caption"><div><h3>{t("project1")}</h3><p>{t("project1Body")}</p></div><span aria-hidden="true">↗</span></div></Link>
      <Link href="/services/dry-dock"><HempelComparison locale={locale} /><div className="premium-project-caption"><div><h3>{t("project2")}</h3><p>{t("project2Body")}</p></div><span aria-hidden="true">↗</span></div></Link></div>
      <Link href="/track-record" className="premium-text-link mt-8 inline-flex">{t("projectCta")} →</Link>
    </Container></section>
    <section className="premium-section"><Container className="premium-team"><div><p className="premium-eyebrow">{t("teamEyebrow")}</p><h2>{t("teamTitle")}</h2><p className="premium-lead">{t("teamBody")}</p><Link href="/about" className="premium-text-link">{t("teamCta")} →</Link></div><figure><Image src="/images/site/operations/daron-team-hempel-launch.jpg" alt={t("teamAlt")} width={1600} height={1200} sizes="(max-width: 850px) 100vw, 50vw" /></figure></Container></section>
    <section className="premium-section premium-brands" id="brands"><Container><div className="premium-section-heading"><div><p className="premium-eyebrow">{t("brandsEyebrow")}</p><h2>{t("brandsTitle")}</h2></div><p>{t("brandsBody")}</p></div><div className="premium-brand-list">{[["Hempel","hempel"],["Orlichem","orlichem"],["Hammelmann","hammelmann"],["Honeywell","honeywell"],["Blackline Safety","blackline-safety"],["Industrial Scientific","industrial-scientific"]].map(([name,slug])=>{
      const brand = partners.find(partner => partner.name === name);
      return <Link href={`/brands/${slug}`} key={slug} aria-label={name}>
        <span className="premium-brand-logo">{brand?.logo ? <Image src={brand.logo} alt={name} fill sizes="(max-width: 600px) 35vw, 220px" /> : name}</span>
        <span className="premium-brand-arrow" aria-hidden="true">↗</span>
      </Link>;
    })}</div><Link href="/brands" className="premium-text-link mt-8 inline-flex">{t("brandsCta")} →</Link></Container></section>
    <GroupCapability locale={locale} />
    <section className="premium-cta"><Container><div><p className="premium-eyebrow">{t("ctaEyebrow")}</p><h2>{t("ctaTitle")}</h2><p>{t("ctaBody")}</p></div><div className="premium-cta-actions"><Link href="/contact#rfq" className="premium-button">{t("quote")} →</Link><a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="premium-text-link">{t("whatsapp")} ↗</a><Link href="/procurement-resources" className="premium-text-link">{growth.resourcesLink} →</Link></div></Container></section>
  </div>;
}
