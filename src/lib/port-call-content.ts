// Copy for /port-call-checklist. Facts: Customs hours and clearance from Daron Namibia's
// customer notice on foreign vessel deliveries (Customs and Excise Act, 1998); the quayside
// rule from Daron Namibia's standard delivery terms; delivery points and bonded stores as
// already published on this site. The downloads themselves are English files.
import type { ResourceAssetFormCopy } from "./resource-form-content";

type PortCallContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  checklistHeading: string;
  sections: Array<{ title: string; items: string[] }>;
  goodToKnowTitle: string;
  goodToKnow: string[];
  sendTo: string;
  orWhatsApp: string;
  packEyebrow: string;
  packTitle: string;
  packIntro: string;
  packIncludesTitle: string;
  packIncludes: string[];
  form: ResourceAssetFormCopy;
  resourcesLink: string;
};

const en: PortCallContent = {
  metaTitle: "Walvis Bay port call supply checklist",
  metaDescription: "What to send, and when, so stores, provisions and spares are ready when your vessel calls at Walvis Bay. Free checklist and RFQ template from Daron Namibia.",
  eyebrow: "PORT CALL CHECKLIST",
  title: "Walvis Bay port call supply checklist",
  intro: "What to send, and when, so stores, provisions and spares are ready when your vessel calls at Walvis Bay.",
  checklistHeading: "The checklist",
  sections: [
    {
      title: "1. When the call is planned",
      items: [
        "Send the vessel name, IMO number, ETA, ETD and the ship’s agent in Walvis Bay.",
        "Say where delivery is needed: alongside at the quay, at anchorage by launch, or in dry dock or on the syncrolift.",
        "Send the whole requirement in one RFQ, one line per item. Our RFQ template below has the columns we need.",
        "Mark urgent or critical items, and any item where only one brand will do.",
        "Tell us if the vessel is foreign-going and needs bonded stores.",
        "If spares are being sent to the vessel through Walvis Bay, ask us for the consignee details before they ship, and send us the airway bill or tracking number.",
      ],
    },
    {
      title: "2. Once the ETA is firm",
      items: [
        "Confirm the quote and send your purchase order, with your PO number and the company we invoice.",
        "Agree one final list between the ship and the office, so nothing is ordered twice.",
        "Order bonded stores early: Customs must clear goods for foreign vessels before they leave Namibia.",
      ],
    },
    {
      title: "3. The day before arrival",
      items: [
        "Confirm the ETA and the berth or anchorage with us and with the agent.",
        "Tell us who receives the stores on board and how they will be lifted.",
      ],
    },
    {
      title: "4. On delivery",
      items: [
        "Check the goods against the delivery note before you sign it.",
        "Write any shortage or damage on the delivery note and tell us straight away.",
      ],
    },
  ],
  goodToKnowTitle: "Good to know",
  goodToKnow: [
    "Customs clears goods for foreign vessels during set working hours, typically 08:00 to 17:00, Monday to Friday, excluding public holidays. Deliveries outside these hours need prior arrangement and may be delayed.",
    "Our responsibility ends at the quayside. Lifting from the quay onto the vessel is under the vessel’s operational control and responsibility.",
    "Availability, lead times and delivery are confirmed for each order.",
  ],
  sendTo: "Send RFQs to",
  orWhatsApp: "or WhatsApp",
  packEyebrow: "PORT CALL PACK",
  packTitle: "Get the checklist and our RFQ template.",
  packIntro: "A printable checklist (Word) and an Excel RFQ template with the details we need to quote without coming back to you.",
  packIncludesTitle: "Inside",
  packIncludes: [
    "This checklist, ready to print",
    "An RFQ template: vessel details, then one line per item with IMPA code, pack size and unit",
    "A note on each column, so the list is complete the first time",
  ],
  form: {
    formTitle: "Get the pack",
    submit: "Get the pack",
    successTitle: "Your pack is ready.",
    successBody: "Download both files. When the RFQ template is filled in, email it to the operations team.",
    downloads: { checklist: "Download the checklist (Word)", rfq: "Download the RFQ template (Excel)" },
    followUp: { label: "Email your RFQ", subject: "RFQ - Walvis Bay" },
  },
  resourcesLink: "Planning a call at Walvis Bay? Get the port call checklist and RFQ template",
};

const fr: PortCallContent = {
  metaTitle: "Liste de contrôle d’escale à Walvis Bay",
  metaDescription: "Quoi envoyer, et quand, pour que provisions, fournitures et pièces soient prêtes à l’escale de votre navire à Walvis Bay. Liste et modèle de demande de prix.",
  eyebrow: "LISTE D’ESCALE",
  title: "Liste de contrôle d’avitaillement pour une escale à Walvis Bay",
  intro: "Quoi envoyer, et quand, pour que les provisions, fournitures et pièces soient prêtes à l’arrivée de votre navire à Walvis Bay.",
  checklistHeading: "La liste",
  sections: [
    {
      title: "1. Dès que l’escale est prévue",
      items: [
        "Envoyez le nom du navire, le numéro OMI, l’ETA, l’ETD et l’agent du navire à Walvis Bay.",
        "Indiquez le lieu de livraison : à quai, au mouillage par vedette, ou en cale sèche ou sur le syncrolift.",
        "Envoyez tout le besoin dans une seule demande de prix, une ligne par article. Notre modèle ci-dessous contient les colonnes nécessaires.",
        "Signalez les articles urgents ou critiques, et ceux pour lesquels une seule marque convient.",
        "Précisez si le navire est en navigation internationale et a besoin d’avitaillement sous douane.",
        "Si des pièces sont envoyées au navire via Walvis Bay, demandez-nous les coordonnées du destinataire avant l’expédition et envoyez-nous la lettre de transport aérien ou le numéro de suivi.",
      ],
    },
    {
      title: "2. Quand l’ETA est confirmée",
      items: [
        "Confirmez le devis et envoyez votre bon de commande, avec votre numéro de commande et la société à facturer.",
        "Arrêtez une seule liste finale entre le bord et le bureau, pour éviter les doubles commandes.",
        "Commandez tôt l’avitaillement sous douane : la douane doit dédouaner les marchandises destinées aux navires étrangers avant qu’elles ne quittent la Namibie.",
      ],
    },
    {
      title: "3. La veille de l’arrivée",
      items: [
        "Confirmez l’ETA et le poste à quai ou le mouillage avec nous et avec l’agent.",
        "Indiquez-nous qui réceptionne à bord et comment les marchandises seront hissées.",
      ],
    },
    {
      title: "4. À la livraison",
      items: [
        "Vérifiez les marchandises par rapport au bon de livraison avant de le signer.",
        "Notez tout manquant ou dommage sur le bon de livraison et prévenez-nous immédiatement.",
      ],
    },
  ],
  goodToKnowTitle: "Bon à savoir",
  goodToKnow: [
    "La douane dédouane les marchandises destinées aux navires étrangers pendant ses heures de service, en général de 8 h à 17 h, du lundi au vendredi, hors jours fériés. Les livraisons en dehors de ces heures doivent être organisées à l’avance et peuvent être retardées.",
    "Notre responsabilité s’arrête au quai. Le levage du quai vers le navire relève du contrôle opérationnel et de la responsabilité du navire.",
    "La disponibilité, les délais et la livraison sont confirmés pour chaque commande.",
  ],
  sendTo: "Envoyez vos demandes de prix à",
  orWhatsApp: "ou par WhatsApp à",
  packEyebrow: "PACK ESCALE",
  packTitle: "Recevez la liste et notre modèle de demande de prix.",
  packIntro: "Une liste imprimable (Word) et un modèle Excel de demande de prix avec les informations nécessaires pour chiffrer sans revenir vers vous. Documents en anglais.",
  packIncludesTitle: "Contenu",
  packIncludes: [
    "Cette liste, prête à imprimer",
    "Un modèle de demande de prix : le navire, puis une ligne par article avec code IMPA, conditionnement et unité",
    "Une note sur chaque colonne, pour une liste complète du premier coup",
  ],
  form: {
    formTitle: "Obtenir le pack",
    submit: "Obtenir le pack",
    successTitle: "Votre pack est prêt.",
    successBody: "Téléchargez les deux fichiers. Une fois le modèle rempli, envoyez-le par e-mail à l’équipe opérationnelle.",
    downloads: { checklist: "Télécharger la liste (Word)", rfq: "Télécharger le modèle (Excel)" },
    followUp: { label: "Envoyer votre demande de prix", subject: "RFQ - Walvis Bay" },
  },
  resourcesLink: "Une escale prévue à Walvis Bay ? Obtenez la liste d’escale et le modèle de demande de prix",
};

const pt: PortCallContent = {
  metaTitle: "Lista de verificação de escala em Walvis Bay",
  metaDescription: "O que enviar, e quando, para que provisões, abastecimentos e peças estejam prontos na escala do seu navio em Walvis Bay. Lista e modelo de pedido de cotação.",
  eyebrow: "LISTA DE ESCALA",
  title: "Lista de verificação de abastecimento para escala em Walvis Bay",
  intro: "O que enviar, e quando, para que provisões, abastecimentos e peças estejam prontos quando o seu navio fizer escala em Walvis Bay.",
  checklistHeading: "A lista",
  sections: [
    {
      title: "1. Quando a escala é planeada",
      items: [
        "Envie o nome do navio, o número IMO, o ETA, o ETD e o agente do navio em Walvis Bay.",
        "Indique onde a entrega é necessária: atracado no cais, ao largo por lancha, ou em doca seca ou no syncrolift.",
        "Envie toda a necessidade num único pedido de cotação, uma linha por artigo. O nosso modelo abaixo tem as colunas de que precisamos.",
        "Assinale os artigos urgentes ou críticos, e aqueles em que só serve uma marca.",
        "Diga-nos se o navio faz navegação internacional e precisa de abastecimento sob regime aduaneiro.",
        "Se forem enviadas peças para o navio através de Walvis Bay, peça-nos os dados do consignatário antes do envio e envie-nos a guia aérea ou o número de seguimento.",
      ],
    },
    {
      title: "2. Quando o ETA estiver confirmado",
      items: [
        "Confirme a cotação e envie a sua nota de encomenda, com o número de encomenda e a empresa a faturar.",
        "Acorde uma única lista final entre o navio e o escritório, para que nada seja encomendado duas vezes.",
        "Encomende cedo o abastecimento sob regime aduaneiro: a alfândega tem de desalfandegar as mercadorias para navios estrangeiros antes de saírem da Namíbia.",
      ],
    },
    {
      title: "3. Na véspera da chegada",
      items: [
        "Confirme o ETA e o cais ou fundeadouro connosco e com o agente.",
        "Diga-nos quem recebe a bordo e como as mercadorias serão içadas.",
      ],
    },
    {
      title: "4. Na entrega",
      items: [
        "Verifique as mercadorias com a guia de entrega antes de a assinar.",
        "Registe qualquer falta ou dano na guia de entrega e avise-nos de imediato.",
      ],
    },
  ],
  goodToKnowTitle: "Bom saber",
  goodToKnow: [
    "A alfândega desalfandega as mercadorias para navios estrangeiros no seu horário de serviço, normalmente das 8h00 às 17h00, de segunda a sexta-feira, exceto feriados. Entregas fora deste horário exigem combinação prévia e podem sofrer atrasos.",
    "A nossa responsabilidade termina no cais. A elevação do cais para o navio é feita sob o controlo operacional e a responsabilidade do navio.",
    "A disponibilidade, os prazos e a entrega são confirmados para cada encomenda.",
  ],
  sendTo: "Envie os pedidos de cotação para",
  orWhatsApp: "ou por WhatsApp para",
  packEyebrow: "PACOTE DE ESCALA",
  packTitle: "Receba a lista e o nosso modelo de pedido de cotação.",
  packIntro: "Uma lista para imprimir (Word) e um modelo Excel de pedido de cotação com os dados de que precisamos para cotar sem voltar a contactá-lo. Documentos em inglês.",
  packIncludesTitle: "Conteúdo",
  packIncludes: [
    "Esta lista, pronta a imprimir",
    "Um modelo de pedido de cotação: o navio, depois uma linha por artigo com código IMPA, embalagem e unidade",
    "Uma nota em cada coluna, para uma lista completa à primeira",
  ],
  form: {
    formTitle: "Obter o pacote",
    submit: "Obter o pacote",
    successTitle: "O seu pacote está pronto.",
    successBody: "Descarregue os dois ficheiros. Quando o modelo estiver preenchido, envie-o por e-mail à equipa de operações.",
    downloads: { checklist: "Descarregar a lista (Word)", rfq: "Descarregar o modelo (Excel)" },
    followUp: { label: "Enviar o seu pedido de cotação", subject: "RFQ - Walvis Bay" },
  },
  resourcesLink: "Tem uma escala prevista em Walvis Bay? Obtenha a lista de escala e o modelo de pedido de cotação",
};

export function getPortCallContent(locale: string): PortCallContent {
  return locale === "fr" ? fr : locale === "pt" ? pt : en;
}
