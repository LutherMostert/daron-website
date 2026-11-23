// Copy for the Vendor Registration Pack block on /procurement-resources.
// The pack itself is an English Word file; French and Portuguese pages say so.
import type { ResourceAssetFormCopy } from "./resource-form-content";

type VendorPackContent = {
  eyebrow: string;
  title: string;
  intro: string;
  includesTitle: string;
  includes: string[];
  certNote: string;
  form: ResourceAssetFormCopy;
};

const en: VendorPackContent = {
  eyebrow: "VENDOR REGISTRATION PACK",
  title: "Register Daron Namibia in your supplier system.",
  intro: "One Word document with the details supplier forms ask for, taken from our registration and tax certificates.",
  includesTitle: "Inside the pack",
  includes: [
    "Registered name, former name, company and VAT numbers",
    "Addresses, contacts and WhatsApp numbers",
    "What to include when you send us an RFQ",
    "Payment and how to verify our bank details",
    "The certificates we send on request",
    "Our ShipServ supplier profile",
  ],
  certNote: "Certificates and bank letters are not in the download. The operations team sends current copies on request.",
  form: {
    formTitle: "Get the pack",
    submit: "Get the pack",
    successTitle: "Your pack is ready.",
    successBody: "Download the Word document. For certificates or a bank letter, email the operations team and quote your reference.",
    downloads: { pack: "Download the pack (Word)" },
    followUp: { label: "Request certificates", subject: "Certificates for vendor registration" },
  },
};

const fr: VendorPackContent = {
  eyebrow: "DOSSIER DE RÉFÉRENCEMENT FOURNISSEUR",
  title: "Référencez Daron Namibia dans votre système fournisseurs.",
  intro: "Un document Word avec les informations demandées par les formulaires fournisseurs, reprises de nos certificats d’immatriculation et fiscaux. Document en anglais.",
  includesTitle: "Contenu du dossier",
  includes: [
    "Raison sociale, ancien nom, numéros d’entreprise et de TVA",
    "Adresses, contacts et numéros WhatsApp",
    "Les informations à inclure dans une demande de prix",
    "Le paiement et la vérification de nos coordonnées bancaires",
    "Les certificats envoyés sur demande",
    "Notre profil fournisseur ShipServ",
  ],
  certNote: "Les certificats et lettres bancaires ne sont pas inclus dans le téléchargement. L’équipe opérationnelle envoie des copies à jour sur demande.",
  form: {
    formTitle: "Obtenir le dossier",
    submit: "Obtenir le dossier",
    successTitle: "Votre dossier est prêt.",
    successBody: "Téléchargez le document Word. Pour les certificats ou une lettre bancaire, écrivez à l’équipe opérationnelle en indiquant votre référence.",
    downloads: { pack: "Télécharger le dossier (Word)" },
    followUp: { label: "Demander les certificats", subject: "Certificates for vendor registration" },
  },
};

const pt: VendorPackContent = {
  eyebrow: "PACOTE DE REGISTO DE FORNECEDOR",
  title: "Registe a Daron Namibia no seu sistema de fornecedores.",
  intro: "Um documento Word com os dados que os formulários de fornecedores pedem, retirados dos nossos certificados de registo e fiscais. Documento em inglês.",
  includesTitle: "Conteúdo do pacote",
  includes: [
    "Denominação social, nome anterior, números de registo e de IVA",
    "Moradas, contactos e números de WhatsApp",
    "O que incluir num pedido de cotação",
    "Pagamento e verificação dos nossos dados bancários",
    "Os certificados enviados a pedido",
    "O nosso perfil de fornecedor na ShipServ",
  ],
  certNote: "Os certificados e cartas bancárias não estão incluídos no download. A equipa de operações envia cópias atualizadas a pedido.",
  form: {
    formTitle: "Obter o pacote",
    submit: "Obter o pacote",
    successTitle: "O seu pacote está pronto.",
    successBody: "Descarregue o documento Word. Para certificados ou uma carta bancária, envie um e-mail à equipa de operações com a sua referência.",
    downloads: { pack: "Descarregar o pacote (Word)" },
    followUp: { label: "Pedir certificados", subject: "Certificates for vendor registration" },
  },
};

export function getVendorPackContent(locale: string): VendorPackContent {
  return locale === "fr" ? fr : locale === "pt" ? pt : en;
}
