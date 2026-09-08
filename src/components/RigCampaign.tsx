import Image from "next/image";
import { Container } from "@/components/Container";
import { Link } from "@/i18n/routing";

// Project duration, concurrent supply period and rig names confirmed by Luther,
// 8 September 2026. Photographs selected from the supplied TLC marketing archive.
const content = {
  en: {
    eyebrow: "Offshore supply · Namibia",
    title: "Three rigs. Two years. Proven capability.",
    body: "Over a two-year project in Namibia, Daron Namibia supplied Deepsea Mira, Deepsea Bollsta and Deepsea Hercules — including more than eight months supplying all three simultaneously.",
    rigs: "rigs supplied simultaneously",
    months: "months of concurrent supply",
    years: "years — complete project duration",
    herculesAlt: "Aerial photograph of Hercules with a vessel alongside",
    miraAlt: "Deepsea Mira photographed from the water, with its name visible on the hull",
    cta: "Discuss your offshore supply requirements",
  },
  fr: {
    eyebrow: "Approvisionnement offshore · Namibie",
    title: "Trois plateformes. Deux ans. Un savoir-faire éprouvé.",
    body: "Au cours d’un projet de deux ans en Namibie, Daron Namibia a approvisionné Deepsea Mira, Deepsea Bollsta et Deepsea Hercules, dont plus de huit mois d’approvisionnement simultané des trois plateformes.",
    rigs: "plateformes approvisionnées simultanément",
    months: "mois d’approvisionnement simultané",
    years: "ans — durée totale du projet",
    herculesAlt: "Vue aérienne de Hercules avec un navire à ses côtés",
    miraAlt: "Deepsea Mira photographiée depuis la mer, son nom visible sur la coque",
    cta: "Parlons de vos besoins d’approvisionnement offshore",
  },
  pt: {
    eyebrow: "Abastecimento offshore · Namíbia",
    title: "Três plataformas. Dois anos. Capacidade comprovada.",
    body: "Durante um projeto de dois anos na Namíbia, a Daron Namibia abasteceu a Deepsea Mira, a Deepsea Bollsta e a Deepsea Hercules, incluindo mais de oito meses de abastecimento simultâneo das três plataformas.",
    rigs: "plataformas abastecidas em simultâneo",
    months: "meses de abastecimento simultâneo",
    years: "anos — duração total do projeto",
    herculesAlt: "Fotografia aérea da Hercules com uma embarcação ao lado",
    miraAlt: "Deepsea Mira fotografada a partir do mar, com o nome visível no casco",
    cta: "Fale connosco sobre o seu abastecimento offshore",
  },
};

export function RigCampaign({ locale }: { locale: string }) {
  const t = content[locale as keyof typeof content] ?? content.en;
  return (
    <section className="rig-campaign" id="offshore-campaign" aria-labelledby="rig-campaign-title">
      <Container>
        <div className="rig-campaign-heading">
          <div>
            <p className="premium-eyebrow">{t.eyebrow}</p>
            <h2 id="rig-campaign-title">{t.title}</h2>
          </div>
          <p className="rig-campaign-intro">{t.body}</p>
        </div>
        <dl className="rig-campaign-stats">
          <div><dt>{t.rigs}</dt><dd>3</dd></div>
          <div><dt>{t.months}</dt><dd>8+</dd></div>
          <div><dt>{t.years}</dt><dd>2</dd></div>
        </dl>
        <div className="rig-campaign-gallery">
          <figure>
            <Image src="/images/site/operations/hercules-aerial.jpg" alt={t.herculesAlt} width={1280} height={960} sizes="(max-width: 700px) 100vw, 50vw" />
            <figcaption>Deepsea Hercules</figcaption>
          </figure>
          <figure>
            <Image src="/images/site/operations/deepsea-mira.jpg" alt={t.miraAlt} width={1280} height={960} sizes="(max-width: 700px) 100vw, 50vw" />
            <figcaption>Deepsea Mira</figcaption>
          </figure>
        </div>
        <div className="rig-campaign-footer">
          <ul aria-label={t.eyebrow}>
            <li>Deepsea Mira</li><li>Deepsea Bollsta</li><li>Deepsea Hercules</li>
          </ul>
          <Link href="/contact#rfq" className="premium-text-link">{t.cta} <span aria-hidden="true">↗</span></Link>
        </div>
      </Container>
    </section>
  );
}
