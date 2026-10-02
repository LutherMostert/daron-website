import type { Brand } from "./site";

type KatradisTranslation = Pick<
  Brand,
  "tagline" | "distributorTier" | "sectors" | "intro" | "ranges" | "enquiryNote"
> & {
  productDetail: Pick<NonNullable<Brand["productDetail"]>, "alt" | "title" | "body">;
};

const translations: Record<"fr" | "pt", KatradisTranslation> = {
  fr: {
    tagline: "Cordages d'amarrage synthétiques",
    distributorTier: "Demandes Katradis — Walvis Bay",
    sectors: ["Marine et transport maritime", "Navires offshore", "Navires de pêche"],
    intro: [
      "Découvrez les cordages d'amarrage Katradis avec Daron Namibia à Walvis Bay. Transmettez à notre équipe les spécifications des cordages de votre navire et vos besoins de livraison pour la sélection des produits, les prix et la disponibilité.",
      "La gamme Katradis comprend IMPROVED 8, un cordage d'amarrage mixte spécialisé à huit torons composé de fibres de polyoléfine haute ténacité NIKA-Steel et de polyester. Les documents techniques du fabricant sont disponibles ci-dessous pour accompagner votre demande.",
    ],
    ranges: [
      {
        title: "Cordage d'amarrage mixte IMPROVED 8",
        body: "Une construction à huit torons associant des fibres de polyoléfine haute ténacité NIKA-Steel et de polyester. Le fabricant décrit un cordage flottant résistant à l'abrasion ; les spécifications exactes doivent correspondre aux exigences de votre navire.",
      },
      {
        title: "Spécifications et sélection des produits",
        body: "Indiquez le diamètre, la longueur, la quantité, le matériau et la construction requis, la charge minimale de rupture ainsi que les exigences relatives aux œils, aux épissures ou à la certification. Notre équipe confirmera le produit proposé et les documents associés avant d'établir le devis.",
      },
      {
        title: "Manipulation, entretien et inspection",
        body: "Consultez le manuel du fabricant sur les cordages d'amarrage synthétiques pour les consignes de manipulation, de stockage, d'inspection et de retrait du service. Suivez les procédures d'amarrage du navire et maintenez le personnel à distance des cordages sous tension et des zones potentielles de retour de fouet.",
      },
    ],
    productDetail: {
      alt: "Cordage d'amarrage mixte Katradis IMPROVED 8 à huit torons, présenté dans la fiche technique du fabricant",
      title: "IMPROVED 8 de plus près",
      body: "Image du produit fournie par le fabricant. IMPROVED 8 présente une construction mixte à huit torons ; la construction à retour de fouet réduit relève d'une gamme de produits Katradis distincte.",
    },
    enquiryNote: "Indiquez le nom du navire, les spécifications des cordages, la quantité, la date de livraison souhaitée et le lieu de livraison. Les dimensions, l'affectation du stock, les documents et le délai sont confirmés pour chaque demande.",
  },
  pt: {
    tagline: "Cabos sintéticos de amarração",
    distributorTier: "Pedidos Katradis — Walvis Bay",
    sectors: ["Setor marítimo e navegação", "Navios offshore", "Navios de pesca"],
    intro: [
      "Conheça os cabos de amarração Katradis com a Daron Namibia em Walvis Bay. Envie à nossa equipa as especificações dos cabos do seu navio e os requisitos de entrega para seleção dos produtos, preços e disponibilidade.",
      "A gama Katradis inclui IMPROVED 8, um cabo de amarração misto especializado de oito cordões, fabricado com fibras de poliolefina de alta tenacidade NIKA-Steel e poliéster. Os documentos técnicos do fabricante estão disponíveis abaixo para apoiar o seu pedido.",
    ],
    ranges: [
      {
        title: "Cabo misto de amarração IMPROVED 8",
        body: "Uma construção de oito cordões que combina fibras de poliolefina de alta tenacidade NIKA-Steel e poliéster. O fabricante descreve um cabo flutuante com resistência à abrasão; as especificações exatas devem corresponder aos requisitos do seu navio.",
      },
      {
        title: "Especificações e seleção dos produtos",
        body: "Indique o diâmetro, o comprimento, a quantidade, o material e a construção necessários, a carga mínima de rotura e quaisquer requisitos relativos a olhais, emendas ou certificação. A nossa equipa confirmará o produto proposto e a documentação de apoio antes de apresentar o orçamento.",
      },
      {
        title: "Manuseamento, cuidados e inspeção",
        body: "Consulte o manual do fabricante para cabos sintéticos de amarração quanto às orientações de manuseamento, armazenamento, inspeção e retirada de serviço. Siga os procedimentos de amarração do navio e mantenha o pessoal afastado dos cabos sob tensão e das potenciais zonas de efeito de chicote.",
      },
    ],
    productDetail: {
      alt: "Cabo misto de amarração Katradis IMPROVED 8 de oito cordões, apresentado na ficha técnica do fabricante",
      title: "IMPROVED 8 em detalhe",
      body: "Imagem do produto fornecida pelo fabricante. IMPROVED 8 apresenta uma construção mista de oito cordões; a construção com efeito de chicote reduzido pertence a uma gama de produtos Katradis distinta.",
    },
    enquiryNote: "Indique o nome do navio, as especificações dos cabos, a quantidade, a data de entrega necessária e o local de entrega. Os diâmetros, a afetação de stock, a documentação e o prazo de fornecimento são confirmados para cada pedido.",
  },
};

/** Localise only the new Katradis copy, retaining all product and asset identifiers. */
export function localizeKatradisBrand(brand: Brand, locale: string): Brand {
  if (brand.slug !== "katradis" || (locale !== "fr" && locale !== "pt")) return brand;

  const copy = translations[locale];
  return {
    ...brand,
    ...copy,
    productDetail: brand.productDetail
      ? { ...brand.productDetail, ...copy.productDetail }
      : undefined,
  };
}
