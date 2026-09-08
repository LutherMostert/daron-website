import Image from "next/image";

const labels = {
  en: { before: "Before", after: "After", beforeAlt: "Worn coating on the vessel bow before refurbishment", afterAlt: "The vessel bow after coating refurbishment" },
  fr: { before: "Avant", after: "Après", beforeAlt: "Revêtement usé de la proue avant rénovation", afterAlt: "La proue après rénovation du revêtement" },
  pt: { before: "Antes", after: "Depois", beforeAlt: "Revestimento desgastado da proa antes da renovação", afterAlt: "A proa após a renovação do revestimento" },
};

export function HempelComparison({ locale }: { locale: string }) {
  const t = labels[locale as keyof typeof labels] ?? labels.en;
  return <div className="hempel-comparison">
    {(["before", "after"] as const).map((stage) => (
      <figure key={stage} className={`hempel-comparison-photo hempel-comparison-${stage}`}>
        {/* Display the original left and right photographs through CSS viewports.
            The middle duplicate, embedded labels and decorative frame stay outside the viewport.
            Preserve the source photograph; do not generate or retouch project evidence. */}
        <Image src="/images/site/drydock/case-study-hempel-bow.jpg"
          alt={t[`${stage}Alt`]} width={3000} height={1688}
          sizes="(max-width: 600px) 200vw, 1200px" />
        <figcaption>{t[stage]}</figcaption>
      </figure>
    ))}
  </div>;
}
