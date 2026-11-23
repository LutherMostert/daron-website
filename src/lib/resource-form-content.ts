// Shared labels for the gated-download form (Vendor Registration Pack, Port Call Pack).
// `roles` and `platforms` follow the order of REQUEST_ROLES and REQUEST_PLATFORMS.

const en = {
  email: "Work email",
  company: "Company",
  role: "Your role",
  roles: [
    "Purchasing or procurement",
    "Technical or marine superintendent",
    "Master or officer on board",
    "Ship agent",
    "Offshore or rig operations",
    "Other",
  ],
  platform: "Where do you register suppliers?",
  platforms: ["ShipServ", "MESPAS", "ProcureShip", "Own ERP or vendor portal", "Email or paper forms", "Other"],
  choose: "Choose…",
  optional: "optional",
  callTitle: "Planning a call at Walvis Bay?",
  callHint: "Tell us the vessel and ETA and we will contact you about supply for that call.",
  vessel: "Vessel name",
  eta: "ETA",
  sending: "Preparing your download…",
  privacy: "We use these details to give you the download and to follow up on your request. Read our",
  privacyLink: "privacy policy",
  ready: "READY",
  reference: "Reference",
  error: "We could not prepare the download. Please try again, or email",
  etaError: "Check the ETA. Choose a date from today onwards.",
  rateError: "Too many requests from this connection. Please try again in an hour, or email",
};

export type ResourceFormLabels = typeof en;

/** The parts of the form copy that differ per download. `downloads` is keyed by file key. */
export type ResourceAssetFormCopy = {
  formTitle: string;
  submit: string;
  successTitle: string;
  successBody: string;
  downloads: Record<string, string>;
  followUp: { label: string; subject: string };
};

export type ResourceFormCopy = ResourceFormLabels & ResourceAssetFormCopy;

const fr: ResourceFormLabels = {
  email: "E-mail professionnel",
  company: "Société",
  role: "Votre fonction",
  roles: [
    "Achats / approvisionnement",
    "Surintendant technique ou maritime",
    "Capitaine ou officier à bord",
    "Agent maritime",
    "Opérations offshore ou plateforme",
    "Autre",
  ],
  platform: "Où référencez-vous vos fournisseurs ?",
  platforms: ["ShipServ", "MESPAS", "ProcureShip", "ERP ou portail fournisseurs interne", "E-mail ou formulaires papier", "Autre"],
  choose: "Choisir…",
  optional: "facultatif",
  callTitle: "Une escale prévue à Walvis Bay ?",
  callHint: "Indiquez le navire et l’ETA : nous vous contacterons pour l’avitaillement de cette escale.",
  vessel: "Nom du navire",
  eta: "ETA",
  sending: "Préparation du téléchargement…",
  privacy: "Nous utilisons ces informations pour vous fournir le téléchargement et donner suite à votre demande. Consultez notre",
  privacyLink: "politique de confidentialité",
  ready: "PRÊT",
  reference: "Référence",
  error: "Le téléchargement n’a pas pu être préparé. Réessayez ou écrivez à",
  etaError: "Vérifiez l’ETA : choisissez une date à partir d’aujourd’hui.",
  rateError: "Trop de demandes depuis cette connexion. Réessayez dans une heure ou écrivez à",
};

const pt: ResourceFormLabels = {
  email: "E-mail profissional",
  company: "Empresa",
  role: "A sua função",
  roles: [
    "Compras / aprovisionamento",
    "Superintendente técnico ou marítimo",
    "Comandante ou oficial a bordo",
    "Agente de navegação",
    "Operações offshore ou de plataforma",
    "Outra",
  ],
  platform: "Onde regista os fornecedores?",
  platforms: ["ShipServ", "MESPAS", "ProcureShip", "ERP ou portal de fornecedores próprio", "E-mail ou formulários em papel", "Outro"],
  choose: "Escolher…",
  optional: "opcional",
  callTitle: "Tem uma escala prevista em Walvis Bay?",
  callHint: "Indique o navio e o ETA e contactamo-lo sobre o abastecimento para essa escala.",
  vessel: "Nome do navio",
  eta: "ETA",
  sending: "A preparar o download…",
  privacy: "Usamos estes dados para lhe fornecer o download e dar seguimento ao seu pedido. Leia a nossa",
  privacyLink: "política de privacidade",
  ready: "PRONTO",
  reference: "Referência",
  error: "Não foi possível preparar o download. Tente novamente ou envie um e-mail para",
  etaError: "Verifique o ETA: escolha uma data a partir de hoje.",
  rateError: "Demasiados pedidos a partir desta ligação. Tente novamente dentro de uma hora ou envie um e-mail para",
};

export function getResourceFormLabels(locale: string): ResourceFormLabels {
  return locale === "fr" ? fr : locale === "pt" ? pt : en;
}
