// Copy for /rig-mobilisation. Every fact is already published on this site (track record,
// oil and gas page, FAQ, "Reviving Sapura Berani") or in Daron Namibia's customer notice on
// Customs clearance for foreign vessels (Customs and Excise Act, 1998). No lead-time figures:
// IQ cannot measure supplier lead time. The download is an English Word file.
import type { ResourceAssetFormCopy } from "./resource-form-content";

type RigContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  recordTitle: string;
  record: Array<{ name: string; body: string }>;
  recordLink: string;
  checklistHeading: string;
  sections: Array<{ title: string; intro?: string; items: string[] }>;
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
  heroCta: string;
  resourcesLink: string;
};

const en: RigContent = {
  metaTitle: "Rig mobilisation and reactivation in Walvis Bay",
  metaDescription: "What to line up before a rig mobilises or comes out of a stack in Walvis Bay, and what we supply to rigs. Free checklist and supply brief from Daron Namibia.",
  eyebrow: "RIG MOBILISATION BRIEF",
  title: "Rig mobilisation and reactivation in Walvis Bay",
  intro: "What to line up before a rig mobilises, starts a campaign or comes out of a stack in Walvis Bay, and what we supply from here.",
  recordTitle: "Rigs we have supplied",
  record: [
    { name: "Deepsea Mira, Bollsta and Hercules", body: "Supplied over a two-year project in Namibia, including more than eight months supplying all three at the same time." },
    { name: "Sapura Berani", body: "Reactivated in 11 days after 13 months cold-stacked, with the galley, laundry and sanitation back in service in the first three days." },
    { name: "Transocean Marianas", body: "Our first major offshore engagement, in 2013." },
  ],
  recordLink: "See our track record",
  checklistHeading: "The checklists",
  sections: [
    {
      title: "Before the rig mobilises: what to send us",
      items: [
        "Rig name, operator and drilling contractor, and the shore base and supply vessel arrangements.",
        "Arrival date and where supply is needed: alongside, at anchorage or offshore.",
        "Persons on board and the crew change rota.",
        "Provisioning schedule: menu standard, dietary needs and how often supply runs go out.",
        "Technical stores list with makes and part numbers, marking anything critical to the campaign.",
        "Chemicals used on board, with product names or data sheets and monthly quantities.",
        "Bonded stores needs and the rig’s Customs status.",
        "Contacts: materials coordinator, shore-base manager and the agent.",
        "Your vendor registration requirements. Our Vendor Registration Pack covers most of them.",
      ],
    },
    {
      title: "Coming out of a stack: what to check first",
      intro: "These were the problems on the Sapura Berani after 13 months cold-stacked. Check them before the crew moves back on board.",
      items: [
        "Galley: test every piece of equipment before the first meal service, and list repairs and parts.",
        "Freezers and cold rooms: check for mould and hold temperature before you restock.",
        "Cabins: check for mould, and count bedding and linen.",
        "Laundry: test the machines and list the parts you need.",
        "Water lines: check them before the crew moves in. On the Sapura Berani, burst pipes flooded crew quarters.",
        "Spare parts: list early what is not available in Namibia. On the Sapura Berani, parts were imported quickly or made on site.",
        "Cleaning: plan mould and stain treatment with the right chemicals. Orlichem products were used on the Sapura Berani.",
        "Order of work: get the galley, laundry and sanitation working first. On the Sapura Berani that took the first three days.",
      ],
    },
  ],
  goodToKnowTitle: "Planning lead times",
  goodToKnow: [
    "Items we hold in Walvis Bay avoid transport time. Ask which items on your list we hold.",
    "Other items come by road from South Africa, or by air or sea through the Daron Group’s procurement and cargo consolidation from Europe and South Africa.",
    "Lead times are confirmed for each item on the quote. Send the list early so long-lead items can be ordered first.",
    "Customs clears goods for foreign vessels during set working hours, typically 08:00 to 17:00, Monday to Friday, excluding public holidays. Deliveries outside these hours need prior arrangement and may be delayed.",
  ],
  sendTo: "Send rig requirements to",
  orWhatsApp: "or WhatsApp",
  packEyebrow: "SUPPLY BRIEF",
  packTitle: "Get the full brief as a Word document.",
  packIntro: "The checklists, what we supply to rigs and our offshore track record in one document to share with your team.",
  packIncludesTitle: "Inside",
  packIncludes: [
    "Rigs we have supplied from Walvis Bay",
    "What we supply to rigs, from provisions to logistics",
    "Both checklists, ready to print and tick off",
  ],
  form: {
    formTitle: "Get the brief",
    submit: "Get the brief",
    successTitle: "Your brief is ready.",
    successBody: "Download the Word document. Send us the rig’s requirements when you have them.",
    downloads: { brief: "Download the brief (Word)" },
    followUp: { label: "Send rig requirements", subject: "Rig supply - Walvis Bay" },
  },
  heroCta: "Rig mobilisation brief",
  resourcesLink: "Mobilising or reactivating a rig? Get the rig mobilisation brief",
};

const fr: RigContent = {
  metaTitle: "Mobilisation et remise en service de plateformes à Walvis Bay",
  metaDescription: "Ce qu’il faut préparer avant de mobiliser ou de remettre en service une plateforme à Walvis Bay, et ce que nous fournissons. Liste et brief gratuits.",
  eyebrow: "BRIEF DE MOBILISATION",
  title: "Mobilisation et remise en service de plateformes à Walvis Bay",
  intro: "Ce qu’il faut préparer avant qu’une plateforme ne soit mobilisée, ne commence une campagne ou ne sorte de désarmement à Walvis Bay, et ce que nous fournissons sur place.",
  recordTitle: "Plateformes que nous avons approvisionnées",
  record: [
    { name: "Deepsea Mira, Bollsta et Hercules", body: "Approvisionnées pendant un projet de deux ans en Namibie, dont plus de huit mois à approvisionner les trois en même temps." },
    { name: "Sapura Berani", body: "Remise en service en 11 jours après 13 mois de désarmement à froid, avec la cuisine, la blanchisserie et l’assainissement rétablis dès les trois premiers jours." },
    { name: "Transocean Marianas", body: "Notre premier grand projet offshore, en 2013." },
  ],
  recordLink: "Voir nos références",
  checklistHeading: "Les listes de contrôle",
  sections: [
    {
      title: "Avant la mobilisation : ce qu’il faut nous envoyer",
      items: [
        "Nom de la plateforme, opérateur et entrepreneur de forage, ainsi que la base à terre et les navires de ravitaillement.",
        "Date d’arrivée et lieu d’approvisionnement : à quai, au mouillage ou en mer.",
        "Personnel à bord et rotation des équipages.",
        "Calendrier d’avitaillement : niveau des menus, régimes alimentaires et fréquence des ravitaillements.",
        "Liste des fournitures techniques avec marques et références, en signalant les articles critiques pour la campagne.",
        "Produits chimiques utilisés à bord, avec leurs noms ou fiches techniques et les quantités mensuelles.",
        "Besoins en avitaillement sous douane et statut douanier de la plateforme.",
        "Contacts : coordinateur logistique, responsable de la base à terre et agent.",
        "Vos exigences de référencement fournisseur. Notre dossier de référencement en couvre l’essentiel.",
      ],
    },
    {
      title: "Sortie de désarmement : ce qu’il faut vérifier d’abord",
      intro: "Voici les problèmes rencontrés sur la Sapura Berani après 13 mois de désarmement à froid. Vérifiez-les avant le retour de l’équipage à bord.",
      items: [
        "Cuisine : testez chaque équipement avant le premier service et listez les réparations et pièces nécessaires.",
        "Congélateurs et chambres froides : vérifiez l’absence de moisissures et la tenue en température avant de réapprovisionner.",
        "Cabines : vérifiez l’absence de moisissures et comptez la literie et le linge.",
        "Blanchisserie : testez les machines et listez les pièces nécessaires.",
        "Canalisations d’eau : vérifiez-les avant le retour de l’équipage. Sur la Sapura Berani, des ruptures de canalisations ont inondé les quartiers d’équipage.",
        "Pièces de rechange : listez tôt ce qui n’est pas disponible en Namibie. Sur la Sapura Berani, les pièces ont été importées rapidement ou fabriquées sur place.",
        "Nettoyage : prévoyez le traitement des moisissures et des taches avec les bons produits. Des produits Orlichem ont été utilisés sur la Sapura Berani.",
        "Ordre des travaux : remettez d’abord en service la cuisine, la blanchisserie et l’assainissement. Sur la Sapura Berani, cela a pris les trois premiers jours.",
      ],
    },
  ],
  goodToKnowTitle: "Prévoir les délais",
  goodToKnow: [
    "Les articles que nous stockons à Walvis Bay évitent les délais de transport. Demandez-nous lesquels figurent sur votre liste.",
    "Les autres articles arrivent par la route depuis l’Afrique du Sud, ou par avion ou par mer grâce aux achats et au groupage du groupe Daron depuis l’Europe et l’Afrique du Sud.",
    "Les délais sont confirmés pour chaque article sur le devis. Envoyez la liste tôt pour commander d’abord les articles à long délai.",
    "La douane dédouane les marchandises destinées aux navires étrangers pendant ses heures de service, en général de 8 h à 17 h, du lundi au vendredi, hors jours fériés. Les livraisons en dehors de ces heures doivent être organisées à l’avance et peuvent être retardées.",
  ],
  sendTo: "Envoyez les besoins de la plateforme à",
  orWhatsApp: "ou par WhatsApp à",
  packEyebrow: "BRIEF D’APPROVISIONNEMENT",
  packTitle: "Recevez le brief complet en document Word.",
  packIntro: "Les listes de contrôle, ce que nous fournissons aux plateformes et nos références offshore, en un document à partager avec votre équipe. Document en anglais.",
  packIncludesTitle: "Contenu",
  packIncludes: [
    "Les plateformes que nous avons approvisionnées depuis Walvis Bay",
    "Ce que nous fournissons aux plateformes, de l’avitaillement à la logistique",
    "Les deux listes de contrôle, prêtes à imprimer et à cocher",
  ],
  form: {
    formTitle: "Obtenir le brief",
    submit: "Obtenir le brief",
    successTitle: "Votre brief est prêt.",
    successBody: "Téléchargez le document Word. Envoyez-nous les besoins de la plateforme dès que vous les avez.",
    downloads: { brief: "Télécharger le brief (Word)" },
    followUp: { label: "Envoyer les besoins de la plateforme", subject: "Rig supply - Walvis Bay" },
  },
  heroCta: "Brief de mobilisation",
  resourcesLink: "Vous mobilisez ou remettez en service une plateforme ? Obtenez le brief de mobilisation",
};

const pt: RigContent = {
  metaTitle: "Mobilização e reativação de plataformas em Walvis Bay",
  metaDescription: "O que preparar antes de mobilizar ou reativar uma plataforma em Walvis Bay, e o que fornecemos às plataformas. Lista e guia de abastecimento gratuitos.",
  eyebrow: "GUIA DE MOBILIZAÇÃO",
  title: "Mobilização e reativação de plataformas em Walvis Bay",
  intro: "O que preparar antes de uma plataforma ser mobilizada, iniciar uma campanha ou sair de hibernação em Walvis Bay, e o que fornecemos a partir daqui.",
  recordTitle: "Plataformas que abastecemos",
  record: [
    { name: "Deepsea Mira, Bollsta e Hercules", body: "Abastecidas durante um projeto de dois anos na Namíbia, incluindo mais de oito meses a abastecer as três ao mesmo tempo." },
    { name: "Sapura Berani", body: "Reativada em 11 dias após 13 meses de hibernação a frio, com a cozinha, a lavandaria e o saneamento de volta ao serviço nos primeiros três dias." },
    { name: "Transocean Marianas", body: "O nosso primeiro grande projeto offshore, em 2013." },
  ],
  recordLink: "Ver o nosso historial",
  checklistHeading: "As listas de verificação",
  sections: [
    {
      title: "Antes da mobilização: o que nos enviar",
      items: [
        "Nome da plataforma, operador e empreiteiro de perfuração, e a base em terra e os navios de abastecimento.",
        "Data de chegada e onde é preciso o abastecimento: atracada, ao largo ou offshore.",
        "Pessoas a bordo e a rotação das tripulações.",
        "Calendário de abastecimento: nível das ementas, necessidades alimentares e frequência das viagens de abastecimento.",
        "Lista de abastecimentos técnicos com marcas e referências, assinalando o que é crítico para a campanha.",
        "Químicos usados a bordo, com nomes dos produtos ou fichas técnicas e quantidades mensais.",
        "Necessidades de abastecimento sob regime aduaneiro e o estatuto aduaneiro da plataforma.",
        "Contactos: coordenador de materiais, responsável da base em terra e agente.",
        "Os seus requisitos de registo de fornecedor. O nosso pacote de registo de fornecedor cobre a maior parte.",
      ],
    },
    {
      title: "Saída de hibernação: o que verificar primeiro",
      intro: "Estes foram os problemas na Sapura Berani após 13 meses de hibernação a frio. Verifique-os antes de a tripulação voltar a bordo.",
      items: [
        "Cozinha: teste todos os equipamentos antes do primeiro serviço de refeições e liste reparações e peças.",
        "Congeladores e câmaras frigoríficas: verifique se há bolor e se mantêm a temperatura antes de reabastecer.",
        "Camarotes: verifique se há bolor e conte a roupa de cama.",
        "Lavandaria: teste as máquinas e liste as peças necessárias.",
        "Canalizações de água: verifique-as antes de a tripulação se instalar. Na Sapura Berani, roturas de canos inundaram os alojamentos.",
        "Peças sobressalentes: liste cedo o que não existe na Namíbia. Na Sapura Berani, as peças foram importadas rapidamente ou fabricadas no local.",
        "Limpeza: planeie o tratamento de bolor e manchas com os químicos certos. Na Sapura Berani foram usados produtos Orlichem.",
        "Ordem dos trabalhos: ponha primeiro a cozinha, a lavandaria e o saneamento a funcionar. Na Sapura Berani isso levou os primeiros três dias.",
      ],
    },
  ],
  goodToKnowTitle: "Planear os prazos",
  goodToKnow: [
    "Os artigos que temos em Walvis Bay evitam o tempo de transporte. Pergunte-nos quais da sua lista temos em stock.",
    "Os restantes chegam por estrada da África do Sul, ou por via aérea ou marítima através das compras e da consolidação de carga do Grupo Daron a partir da Europa e da África do Sul.",
    "Os prazos são confirmados para cada artigo na cotação. Envie a lista cedo para que os artigos de prazo longo sejam encomendados primeiro.",
    "A alfândega desalfandega as mercadorias para navios estrangeiros no seu horário de serviço, normalmente das 8h00 às 17h00, de segunda a sexta-feira, exceto feriados. Entregas fora deste horário exigem combinação prévia e podem sofrer atrasos.",
  ],
  sendTo: "Envie as necessidades da plataforma para",
  orWhatsApp: "ou por WhatsApp para",
  packEyebrow: "GUIA DE ABASTECIMENTO",
  packTitle: "Receba o guia completo em documento Word.",
  packIntro: "As listas de verificação, o que fornecemos às plataformas e o nosso historial offshore num documento para partilhar com a sua equipa. Documento em inglês.",
  packIncludesTitle: "Conteúdo",
  packIncludes: [
    "As plataformas que abastecemos a partir de Walvis Bay",
    "O que fornecemos às plataformas, das provisões à logística",
    "As duas listas de verificação, prontas a imprimir e assinalar",
  ],
  form: {
    formTitle: "Obter o guia",
    submit: "Obter o guia",
    successTitle: "O seu guia está pronto.",
    successBody: "Descarregue o documento Word. Envie-nos as necessidades da plataforma quando as tiver.",
    downloads: { brief: "Descarregar o guia (Word)" },
    followUp: { label: "Enviar as necessidades da plataforma", subject: "Rig supply - Walvis Bay" },
  },
  heroCta: "Guia de mobilização",
  resourcesLink: "Vai mobilizar ou reativar uma plataforma? Obtenha o guia de mobilização",
};

export function getRigContent(locale: string): RigContent {
  return locale === "fr" ? fr : locale === "pt" ? pt : en;
}
