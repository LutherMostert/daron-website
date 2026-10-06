/**
 * Category landing pages that answer the generic searches Daron was missing
 * from (audit 6 Oct 2026): "marine paint Namibia", "industrial cleaning
 * chemicals Namibia" and "vessel provisions Walvis Bay".
 *
 * Every claim here is taken from facts already published on the site
 * (brand data in site.ts, services copy, FAQ, track record) or confirmed by
 * Luther (Lüderitz coverage, ISSA membership). Do not add lead times, stock
 * levels or certifications that are not confirmed.
 */

export type CategorySlug = "marine-paint" | "industrial-cleaning-chemicals" | "vessel-provisions";

type Item = { title: string; body: string };
type Faq = { q: string; a: string };

export type CategoryContent = {
  /** Browser title, rendered verbatim (no "| Daron Namibia" template). */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Short label used in footer and cross-links. */
  navLabel: string;
  supplyHeading: string;
  supply: Item[];
  sectorsHeading: string;
  sectors: string[];
  whyHeading: string;
  why: string[];
  relatedHeading: string;
  related: { href: string; label: string }[];
  faqHeading: string;
  faqs: Faq[];
  rfqHeading: string;
  rfqBody: string;
  serviceType: string;
  brand?: { name: string; url: string };
};

type Locale = "en" | "pt" | "fr";

export const categoryMeta: Record<CategorySlug, { image: string; imageAlt: Record<Locale, string> }> = {
  "marine-paint": {
    image: "/images/site/drydock/case-study-hempel-bow.jpg",
    imageAlt: {
      en: "Vessel bow freshly coated with Hempel marine paint in Walvis Bay",
      pt: "Proa de navio recém-pintada com tinta marítima Hempel em Walvis Bay",
      fr: "Étrave de navire fraîchement revêtue de peinture marine Hempel à Walvis Bay",
    },
  },
  "industrial-cleaning-chemicals": {
    image: "/images/site/drydock/case-study-orlichem-deck.jpg",
    imageAlt: {
      en: "Deck cleaned with Orlichem marine chemicals",
      pt: "Convés limpo com químicos marítimos Orlichem",
      fr: "Pont nettoyé avec les produits chimiques marins Orlichem",
    },
  },
  "vessel-provisions": {
    image: "/images/site/operations/daron-truck-normand-energy.jpg",
    imageAlt: {
      en: "Daron delivery truck alongside the Normand Energy in Walvis Bay",
      pt: "Camião da Daron junto ao Normand Energy em Walvis Bay",
      fr: "Camion Daron le long du Normand Energy à Walvis Bay",
    },
  },
};

const content: Record<Locale, Record<CategorySlug, CategoryContent>> = {
  en: {
    "marine-paint": {
      metaTitle: "Marine Paint in Namibia | Hempel Distributor | Daron",
      metaDescription:
        "Marine paint and protective coatings in Namibia from Daron, authorised Hempel distributor in Walvis Bay: antifouling, anticorrosive and tank linings.",
      eyebrow: "Marine paint · Namibia",
      title: "Marine paint and protective coatings in Namibia",
      intro:
        "Daron Namibia is the authorised Hempel distributor in Namibia. From Walvis Bay we supply marine paint, antifouling and protective coatings to fishing fleets, offshore operators, dry docks and industry — delivered to the quay, the dock or the site, with technical support.",
      navLabel: "Marine paint",
      supplyHeading: "Hempel coatings we supply",
      supply: [
        { title: "Antifouling and hull coatings", body: "Self-polishing and silyl-acrylate antifouling (Globic, Sonic, Dynamic and Oceanic+ families) for controlled polishing and longer dry-dock intervals." },
        { title: "Fouling-release, biocide-free", body: "Hempaguard, Hempasil and Silic One for an ultra-smooth hull, targeting fuel savings and lower emissions." },
        { title: "Anticorrosive and protective", body: "Avantguard activated zinc, Quattro XO pure epoxy and Galvosil zinc silicate for steel in marine, offshore and infrastructure service." },
        { title: "Tank, cargo and ballast linings", body: "Hempaline chemical- and abrasion-resistant linings for holds, ballast tanks and process vessels." },
        { title: "Passive fire protection", body: "Hempafire and Hempacore intumescent coatings for structural steel on offshore, commercial and industrial structures." },
        { title: "Surface preparation", body: "Hammelmann ultra-high-pressure water-jetting equipment and Orlichem cleaning and surface-treatment chemicals for preparation before coating." },
      ],
      sectorsHeading: "Who we supply",
      sectors: ["Fishing fleets", "Merchant vessels", "Offshore and oil & gas", "Dry docks and ship repair", "Mining and minerals", "Energy and infrastructure"],
      whyHeading: "Why buy marine paint from Daron",
      why: [
        "Authorised Hempel distributor, so you get genuine product and manufacturer documentation.",
        "Supplied from Walvis Bay, with delivery to the quay, dry dock or site in Walvis Bay and Lüderitz.",
        "One supplier for paint, surface preparation, chemicals and ship stores in the same dry-dock window.",
      ],
      relatedHeading: "Related",
      related: [
        { href: "/brands/hempel", label: "Hempel range and catalogues" },
        { href: "/services/coatings", label: "Coatings and surface preparation" },
        { href: "/services/dry-dock", label: "Dry-dock support in Walvis Bay" },
      ],
      faqHeading: "Marine paint in Namibia: common questions",
      faqs: [
        { q: "Who is the Hempel distributor in Namibia?", a: "Daron Namibia (formerly Walvis Bay Ship Chandlers) is the authorised Hempel distributor in Namibia, based at No. 31 Grand Avenue, Industrial Area, Walvis Bay." },
        { q: "Where can I buy marine paint in Walvis Bay?", a: "Order from Daron Namibia in Walvis Bay. Email dnoperations@daron-group.com or call +264 83 337 4710 with the product list or specification, quantities and delivery date." },
        { q: "Do you supply antifouling for fishing vessels and dry dock?", a: "Yes. We supply Hempel antifouling, hull, tank and anticorrosive systems for fishing vessels, merchant ships and offshore units, delivered to the quay or dry dock in Walvis Bay." },
        { q: "Can you help choose the right coating system?", a: "Yes. Share the asset, substrate, existing coating, exposure and work window, and our technical team will identify the Hempel products and product information for your scope." },
        { q: "Do you supply protective coatings for mining and industry?", a: "Yes. Hempel protective, anticorrosive and passive-fire-protection coatings are supplied for mining, energy, infrastructure and industrial steel across Namibia." },
      ],
      rfqHeading: "Send your coating requirement",
      rfqBody: "Attach the specification, product list or scope of work. Include surface area, vessel or asset and delivery date if known.",
      serviceType: "Marine paint and protective coatings supply",
      brand: { name: "Hempel", url: "https://www.hempel.com" },
    },
    "industrial-cleaning-chemicals": {
      metaTitle: "Industrial Cleaning Chemicals & Degreasers in Namibia | Daron",
      metaDescription:
        "Industrial cleaning chemicals, degreasers, CIP and marine chemicals in Namibia from Daron, exclusive Orlichem distributor in Walvis Bay. Food-safe ranges.",
      eyebrow: "Cleaning chemicals · Namibia",
      title: "Industrial cleaning chemicals and degreasers in Namibia",
      intro:
        "Daron Namibia is the exclusive Orlichem distributor in Namibia. From Walvis Bay we supply industrial degreasers, clean-in-place (CIP), marine, galley, laundry and hygiene chemicals to vessels, factories, food processors and facilities across Namibia — held locally, so you are not waiting on imports.",
      navLabel: "Cleaning chemicals",
      supplyHeading: "Orlichem chemicals we supply",
      supply: [
        { title: "Industrial degreasers", body: "Water- and solvent-based degreasers for engineering, manufacturing, automotive and marine, including Wipe Out (SANS 1828 food-approved), CSM, Degrasol and Eco-Solve." },
        { title: "Clean-in-place (CIP)", body: "Acid CIP and Alkaline CIP LF circulation cleaning for food, beverage and fish-processing plant." },
        { title: "Metal treatment", body: "Corrosion control, degreasing and pickling and passivation chemicals." },
        { title: "Marine vessel chemicals", body: "Engine-room and air-system cleaning, boiler and evaporator treatment, fuel treatment, ballast and potable-water treatment, corrosion control and oil-spill dispersant." },
        { title: "Galley, kitchen and laundry", body: "HACCP-compliant, EN 1276-certified kitchen degreasers, sanitisers and dishwash, and laundry systems (Atom Wash, AquaTerge Ultra, Atom Soft)." },
        { title: "Housekeeping and hand hygiene", body: "Floorcare, general-purpose cleaners, odour control and EN 1276-certified hand care for accommodation, hospitality and institutions." },
      ],
      sectorsHeading: "Who we supply",
      sectors: ["Fish and food processing", "Engineering and manufacturing", "Ships and offshore", "Mining", "Hospitality and catering", "Institutions and facilities"],
      whyHeading: "Why buy cleaning chemicals from Daron",
      why: [
        "Exclusive Orlichem distributor in Namibia. Orlichem is ISO 9001 and Intertek certified, with SANS- and EN 1276-certified formulations.",
        "Stock held in Walvis Bay and delivered by our own fleet, across Namibia and to Lüderitz.",
        "Product brochures are downloadable, and our technical team helps match the chemical to the job.",
      ],
      relatedHeading: "Related",
      related: [
        { href: "/brands/orlichem", label: "Orlichem range and brochures" },
        { href: "/services/ship-chandlery", label: "Ship chandlery in Walvis Bay" },
        { href: "/services/coatings", label: "Coatings and surface preparation" },
      ],
      faqHeading: "Cleaning chemicals in Namibia: common questions",
      faqs: [
        { q: "Where can I buy industrial degreasers in Namibia?", a: "Daron Namibia in Walvis Bay supplies Orlichem industrial degreasers, including Wipe Out, CSM, Degrasol and Eco-Solve, across Namibia. Email dnoperations@daron-group.com or call +264 83 337 4710." },
        { q: "Do you supply food-safe cleaning chemicals for fish and food processing?", a: "Yes. The range includes Wipe Out (SANS 1828 food-approved), Acid CIP and Alkaline CIP LF clean-in-place chemicals and EN 1276-certified sanitisers." },
        { q: "Do you supply boiler, water and engine-room chemicals for ships?", a: "Yes. Orlichem marine chemicals cover engine-room cleaning, boiler and evaporator treatment, fuel treatment, ballast and potable-water treatment and oil-spill dispersant." },
        { q: "Who distributes Orlichem in Namibia?", a: "Daron Namibia (formerly Walvis Bay Ship Chandlers) is the exclusive Orlichem distributor in Namibia." },
        { q: "Can I get product and safety information before I order?", a: "Yes. Orlichem brochures are on our Orlichem page, and our team provides product and safety information for the chemicals you order." },
      ],
      rfqHeading: "Send your chemical requirement",
      rfqBody: "List the application, products or current chemicals you use, quantities and delivery location. We will match the Orlichem product and quote.",
      serviceType: "Industrial and marine cleaning chemicals supply",
      brand: { name: "Orlichem", url: "https://www.orlichem.co.za" },
    },
    "vessel-provisions": {
      metaTitle: "Vessel Provisions in Walvis Bay & Lüderitz | Daron Namibia",
      metaDescription:
        "Ship provisions in Walvis Bay and Lüderitz: fresh, chilled and frozen food and bonded stores, delivered quayside, at anchorage and offshore by Daron Namibia.",
      eyebrow: "Vessel provisions · Walvis Bay",
      title: "Vessel provisions in Walvis Bay and Lüderitz",
      intro:
        "Daron Namibia (formerly Walvis Bay Ship Chandlers) supplies fresh, chilled, frozen and dry provisions and bonded stores to vessels, rigs and offshore units — from our own refrigerated and bonded warehouse in Walvis Bay, delivered quayside, at anchorage and offshore.",
      navLabel: "Vessel provisions",
      supplyHeading: "What we supply",
      supply: [
        { title: "Fresh produce", body: "Fruit, vegetables and dairy for crews in port and offshore." },
        { title: "Meat and fish", body: "Vacuum-packed meats from our in-house butchery, chilled and frozen." },
        { title: "Dry and frozen goods", body: "Dry stores, frozen goods and beverages, held in our Walvis Bay warehouse." },
        { title: "Bonded stores", body: "Bonded stores held under customs control and cleared in-house." },
        { title: "Galley and cabin stores", body: "Galley consumables, cleaning and hygiene chemicals and cabin stores alongside your provisions order." },
        { title: "Offshore catering supply", body: "Provisioning for rigs and offshore units, with menus designed with dietitians and emergency stock control." },
      ],
      sectorsHeading: "How we deliver",
      sectors: ["Quayside, Port of Walvis Bay", "Walvis Bay anchorage by launch", "Lüderitz", "Offshore rigs and FPSOs via supply vessel"],
      whyHeading: "Why vessels provision with Daron",
      why: [
        "Our own refrigerated, freezer, dry and bonded storage in Walvis Bay, with HACCP food-safety compliance.",
        "In-house butchery, customs clearance and a dedicated branded delivery fleet.",
        "Proven offshore: we supplied the Deepsea Mira, Deepsea Bollsta and Deepsea Hercules at the same time.",
      ],
      relatedHeading: "Related",
      related: [
        { href: "/services/ship-chandlery", label: "Ship chandlery in Walvis Bay" },
        { href: "/industries/oil-and-gas", label: "Offshore and oil & gas supply" },
        { href: "/track-record", label: "Track record" },
      ],
      faqHeading: "Vessel provisions: common questions",
      faqs: [
        { q: "Can you deliver provisions to a vessel at Walvis Bay anchorage?", a: "Yes. We deliver provisions quayside at the Port of Walvis Bay and to vessels at anchorage by launch, coordinated with your ship's agent." },
        { q: "Do you supply provisions in Lüderitz?", a: "Yes. We supply vessels calling at Lüderitz from our Walvis Bay warehouse, with documentation and clearance handled in-house." },
        { q: "Do you supply bonded stores?", a: "Yes. Bonded stores are held in our Walvis Bay warehouse under customs control and cleared in-house for your vessel." },
        { q: "Can you provision offshore rigs?", a: "Yes. We have supplied several drilling rigs at once, including the Deepsea Mira, Deepsea Bollsta and Deepsea Hercules. Loads are consolidated and documented for the supply vessel." },
        { q: "How do I order provisions?", a: "Email your provision list (IMPA codes welcome) to dnoperations@daron-group.com or send it to our operations team on WhatsApp. Offshore RFQs are handled 24/7." },
      ],
      rfqHeading: "Send your provision list",
      rfqBody: "Attach the provision or stores list with vessel name, ETA, port or anchorage and delivery window.",
      serviceType: "Ship provisions supply",
    },
  },
  pt: {
    "marine-paint": {
      metaTitle: "Tinta Marítima na Namíbia | Distribuidor Hempel | Daron",
      metaDescription:
        "Tintas marítimas e revestimentos de proteção na Namíbia da Daron, distribuidor autorizado Hempel em Walvis Bay: antivegetativas, anticorrosivos e tanques.",
      eyebrow: "Tinta marítima · Namíbia",
      title: "Tintas marítimas e revestimentos de proteção na Namíbia",
      intro:
        "A Daron Namibia é o distribuidor autorizado Hempel na Namíbia. A partir de Walvis Bay fornecemos tintas marítimas, antivegetativas e revestimentos de proteção a frotas de pesca, operadores offshore, docas secas e indústria — entregues no cais, na doca ou no local, com apoio técnico.",
      navLabel: "Tinta marítima",
      supplyHeading: "Revestimentos Hempel que fornecemos",
      supply: [
        { title: "Antivegetativas e casco", body: "Antivegetativas autopolidoras e de silil-acrilato (famílias Globic, Sonic, Dynamic e Oceanic+) para polimento controlado e intervalos de doca mais longos." },
        { title: "Anti-incrustantes sem biocidas", body: "Hempaguard, Hempasil e Silic One para um casco ultraliso, com poupança de combustível e menores emissões." },
        { title: "Anticorrosivos e proteção", body: "Avantguard de zinco ativado, epóxi Quattro XO e silicato de zinco Galvosil para aço em serviço marítimo, offshore e de infraestrutura." },
        { title: "Tanques, porões e lastro", body: "Revestimentos Hempaline resistentes a químicos e abrasão para porões, tanques de lastro e reservatórios de processo." },
        { title: "Proteção passiva contra incêndio", body: "Revestimentos intumescentes Hempafire e Hempacore para aço estrutural offshore, comercial e industrial." },
        { title: "Preparação de superfície", body: "Equipamento de jato de água de ultra-alta pressão Hammelmann e químicos de limpeza Orlichem para preparar antes de pintar." },
      ],
      sectorsHeading: "A quem fornecemos",
      sectors: ["Frotas de pesca", "Navios mercantes", "Offshore e petróleo e gás", "Docas secas e reparação naval", "Mineração", "Energia e infraestrutura"],
      whyHeading: "Porquê comprar tinta marítima à Daron",
      why: [
        "Distribuidor autorizado Hempel: produto genuíno e documentação do fabricante.",
        "Fornecimento a partir de Walvis Bay, com entrega no cais, doca seca ou local em Walvis Bay e Lüderitz.",
        "Um só fornecedor para tinta, preparação de superfície, químicos e paióis na mesma janela de doca.",
      ],
      relatedHeading: "Relacionado",
      related: [
        { href: "/brands/hempel", label: "Gama e catálogos Hempel" },
        { href: "/services/coatings", label: "Revestimentos e preparação de superfície" },
        { href: "/services/dry-dock", label: "Apoio em doca seca em Walvis Bay" },
      ],
      faqHeading: "Tinta marítima na Namíbia: perguntas frequentes",
      faqs: [
        { q: "Quem é o distribuidor Hempel na Namíbia?", a: "A Daron Namibia (antiga Walvis Bay Ship Chandlers) é o distribuidor autorizado Hempel na Namíbia, em No. 31 Grand Avenue, Industrial Area, Walvis Bay." },
        { q: "Onde comprar tinta marítima em Walvis Bay?", a: "Encomende à Daron Namibia em Walvis Bay. Envie a lista de produtos ou especificação, quantidades e data de entrega para dnoperations@daron-group.com ou ligue +264 83 337 4710." },
        { q: "Fornecem antivegetativas para navios de pesca e doca seca?", a: "Sim. Fornecemos sistemas Hempel antivegetativos, de casco, tanques e anticorrosivos para navios de pesca, mercantes e unidades offshore, entregues no cais ou na doca em Walvis Bay." },
        { q: "Podem ajudar a escolher o sistema de revestimento?", a: "Sim. Indique o equipamento, substrato, revestimento existente, exposição e janela de trabalho, e a nossa equipa técnica identifica os produtos Hempel e a informação técnica adequados." },
        { q: "Fornecem revestimentos de proteção para mineração e indústria?", a: "Sim. Os revestimentos Hempel de proteção, anticorrosivos e contra incêndio são fornecidos para mineração, energia, infraestrutura e aço industrial em toda a Namíbia." },
      ],
      rfqHeading: "Envie o seu pedido de revestimentos",
      rfqBody: "Anexe a especificação, lista de produtos ou âmbito de trabalho. Indique a área, o navio ou equipamento e a data de entrega, se conhecidos.",
      serviceType: "Fornecimento de tintas marítimas e revestimentos de proteção",
      brand: { name: "Hempel", url: "https://www.hempel.com" },
    },
    "industrial-cleaning-chemicals": {
      metaTitle: "Químicos de Limpeza Industrial na Namíbia | Daron",
      metaDescription:
        "Químicos de limpeza industrial, desengordurantes, CIP e químicos marítimos na Namíbia da Daron, distribuidor exclusivo Orlichem em Walvis Bay.",
      eyebrow: "Químicos de limpeza · Namíbia",
      title: "Químicos de limpeza industrial e desengordurantes na Namíbia",
      intro:
        "A Daron Namibia é o distribuidor exclusivo Orlichem na Namíbia. A partir de Walvis Bay fornecemos desengordurantes industriais, limpeza CIP e químicos marítimos, de cozinha, lavandaria e higiene a navios, fábricas, processadores alimentares e instalações em toda a Namíbia — com stock local, sem esperar por importações.",
      navLabel: "Químicos de limpeza",
      supplyHeading: "Químicos Orlichem que fornecemos",
      supply: [
        { title: "Desengordurantes industriais", body: "Desengordurantes à base de água e solvente para engenharia, indústria, automóvel e marítimo, incluindo Wipe Out (aprovado para uso alimentar SANS 1828), CSM, Degrasol e Eco-Solve." },
        { title: "Limpeza CIP", body: "Acid CIP e Alkaline CIP LF para limpeza por circulação em fábricas de alimentos, bebidas e processamento de pescado." },
        { title: "Tratamento de metais", body: "Controlo de corrosão, desengorduramento, decapagem e passivação." },
        { title: "Químicos para navios", body: "Limpeza de casa das máquinas e sistemas de ar, tratamento de caldeiras e evaporadores, combustível, água de lastro e potável, controlo de corrosão e dispersante de hidrocarbonetos." },
        { title: "Cozinha e lavandaria", body: "Desengordurantes, desinfetantes e detergentes de loiça conformes HACCP e certificados EN 1276, e sistemas de lavandaria (Atom Wash, AquaTerge Ultra, Atom Soft)." },
        { title: "Limpeza geral e higiene das mãos", body: "Pavimentos, limpeza geral, controlo de odores e higiene das mãos certificada EN 1276 para alojamento, hotelaria e instituições." },
      ],
      sectorsHeading: "A quem fornecemos",
      sectors: ["Processamento de pescado e alimentos", "Engenharia e indústria", "Navios e offshore", "Mineração", "Hotelaria e restauração", "Instituições e instalações"],
      whyHeading: "Porquê comprar químicos à Daron",
      why: [
        "Distribuidor exclusivo Orlichem na Namíbia. A Orlichem tem certificação ISO 9001 e Intertek e fórmulas certificadas SANS e EN 1276.",
        "Stock em Walvis Bay, entregue pela nossa própria frota em toda a Namíbia e em Lüderitz.",
        "Brochuras disponíveis para download e equipa técnica para escolher o químico certo.",
      ],
      relatedHeading: "Relacionado",
      related: [
        { href: "/brands/orlichem", label: "Gama e brochuras Orlichem" },
        { href: "/services/ship-chandlery", label: "Ship chandlery em Walvis Bay" },
        { href: "/services/coatings", label: "Revestimentos e preparação de superfície" },
      ],
      faqHeading: "Químicos de limpeza na Namíbia: perguntas frequentes",
      faqs: [
        { q: "Onde comprar desengordurantes industriais na Namíbia?", a: "A Daron Namibia em Walvis Bay fornece desengordurantes industriais Orlichem, incluindo Wipe Out, CSM, Degrasol e Eco-Solve, em toda a Namíbia. Contacte dnoperations@daron-group.com ou +264 83 337 4710." },
        { q: "Fornecem químicos de limpeza aptos para processamento de pescado e alimentos?", a: "Sim. A gama inclui Wipe Out (aprovado para uso alimentar SANS 1828), Acid CIP e Alkaline CIP LF, e desinfetantes certificados EN 1276." },
        { q: "Fornecem químicos para caldeiras, água e casa das máquinas?", a: "Sim. Os químicos marítimos Orlichem cobrem limpeza da casa das máquinas, tratamento de caldeiras e evaporadores, combustível, água de lastro e potável, e dispersante de hidrocarbonetos." },
        { q: "Quem distribui a Orlichem na Namíbia?", a: "A Daron Namibia (antiga Walvis Bay Ship Chandlers) é o distribuidor exclusivo Orlichem na Namíbia." },
        { q: "Posso obter informação de produto e segurança antes de encomendar?", a: "Sim. As brochuras Orlichem estão na nossa página Orlichem e a equipa fornece informação de produto e segurança dos químicos que encomenda." },
      ],
      rfqHeading: "Envie o seu pedido de químicos",
      rfqBody: "Indique a aplicação, os produtos ou químicos que usa, quantidades e local de entrega. Indicamos o produto Orlichem e cotamos.",
      serviceType: "Fornecimento de químicos de limpeza industrial e marítima",
      brand: { name: "Orlichem", url: "https://www.orlichem.co.za" },
    },
    "vessel-provisions": {
      metaTitle: "Provisões para Navios em Walvis Bay e Lüderitz | Daron",
      metaDescription:
        "Provisões para navios em Walvis Bay e Lüderitz: frescos, refrigerados, congelados e paióis alfandegados, entregues no cais, no fundeadouro e offshore.",
      eyebrow: "Provisões · Walvis Bay",
      title: "Provisões para navios em Walvis Bay e Lüderitz",
      intro:
        "A Daron Namibia (antiga Walvis Bay Ship Chandlers) fornece provisões frescas, refrigeradas, congeladas e secas e paióis alfandegados a navios, plataformas e unidades offshore — a partir do nosso armazém refrigerado e alfandegado em Walvis Bay, com entrega no cais, no fundeadouro e offshore.",
      navLabel: "Provisões",
      supplyHeading: "O que fornecemos",
      supply: [
        { title: "Produtos frescos", body: "Fruta, legumes e lacticínios para tripulações no porto e offshore." },
        { title: "Carne e peixe", body: "Carnes embaladas a vácuo do nosso talho próprio, refrigeradas e congeladas." },
        { title: "Secos e congelados", body: "Secos, congelados e bebidas no nosso armazém em Walvis Bay." },
        { title: "Paióis alfandegados", body: "Paióis em regime aduaneiro, desalfandegados internamente." },
        { title: "Cozinha e camarotes", body: "Consumíveis de cozinha, químicos de limpeza e higiene e artigos de camarote com a sua encomenda." },
        { title: "Catering offshore", body: "Abastecimento de plataformas e unidades offshore, com menus elaborados com nutricionistas e controlo de stock de emergência." },
      ],
      sectorsHeading: "Como entregamos",
      sectors: ["No cais, Porto de Walvis Bay", "Fundeadouro de Walvis Bay por lancha", "Lüderitz", "Plataformas e FPSOs via navio de apoio"],
      whyHeading: "Porquê abastecer com a Daron",
      why: [
        "Armazenamento próprio refrigerado, congelado, seco e alfandegado em Walvis Bay, com conformidade HACCP.",
        "Talho próprio, despacho aduaneiro interno e frota de entrega própria.",
        "Experiência offshore: abastecemos o Deepsea Mira, o Deepsea Bollsta e o Deepsea Hercules em simultâneo.",
      ],
      relatedHeading: "Relacionado",
      related: [
        { href: "/services/ship-chandlery", label: "Ship chandlery em Walvis Bay" },
        { href: "/industries/oil-and-gas", label: "Abastecimento offshore e petróleo e gás" },
        { href: "/track-record", label: "Experiência comprovada" },
      ],
      faqHeading: "Provisões para navios: perguntas frequentes",
      faqs: [
        { q: "Entregam provisões a navios no fundeadouro de Walvis Bay?", a: "Sim. Entregamos no cais do Porto de Walvis Bay e a navios fundeados por lancha, em coordenação com o agente do navio." },
        { q: "Fornecem provisões em Lüderitz?", a: "Sim. Abastecemos navios em Lüderitz a partir do nosso armazém em Walvis Bay, com documentação e despacho tratados internamente." },
        { q: "Fornecem paióis alfandegados?", a: "Sim. Os paióis alfandegados ficam no nosso armazém em Walvis Bay sob controlo aduaneiro e são desalfandegados internamente." },
        { q: "Abastecem plataformas offshore?", a: "Sim. Abastecemos várias plataformas em simultâneo, incluindo o Deepsea Mira, o Deepsea Bollsta e o Deepsea Hercules, com cargas consolidadas e documentadas para o navio de apoio." },
        { q: "Como encomendo provisões?", a: "Envie a lista (códigos IMPA são bem-vindos) para dnoperations@daron-group.com ou para a equipa de operações por WhatsApp. Pedidos offshore são tratados 24/7." },
      ],
      rfqHeading: "Envie a sua lista de provisões",
      rfqBody: "Anexe a lista com nome do navio, ETA, porto ou fundeadouro e janela de entrega.",
      serviceType: "Fornecimento de provisões para navios",
    },
  },
  fr: {
    "marine-paint": {
      metaTitle: "Peinture Marine en Namibie | Distributeur Hempel | Daron",
      metaDescription:
        "Peintures marines et revêtements de protection en Namibie par Daron, distributeur agréé Hempel à Walvis Bay : antifouling, anticorrosion, citernes.",
      eyebrow: "Peinture marine · Namibie",
      title: "Peintures marines et revêtements de protection en Namibie",
      intro:
        "Daron Namibia est le distributeur agréé Hempel en Namibie. Depuis Walvis Bay, nous fournissons peintures marines, antifoulings et revêtements de protection aux flottes de pêche, opérateurs offshore, cales sèches et industriels — livrés à quai, en cale ou sur site, avec un soutien technique.",
      navLabel: "Peinture marine",
      supplyHeading: "Les revêtements Hempel que nous fournissons",
      supply: [
        { title: "Antifouling et carène", body: "Antifoulings autopolissants et silyl-acryliques (familles Globic, Sonic, Dynamic et Oceanic+) pour un polissage maîtrisé et des arrêts techniques espacés." },
        { title: "Anti-salissures sans biocide", body: "Hempaguard, Hempasil et Silic One pour une carène ultra-lisse, des économies de carburant et moins d'émissions." },
        { title: "Anticorrosion et protection", body: "Avantguard au zinc activé, époxy Quattro XO et silicate de zinc Galvosil pour l'acier en service marin, offshore et d'infrastructure." },
        { title: "Citernes, cales et ballasts", body: "Revêtements Hempaline résistants aux produits chimiques et à l'abrasion pour cales, ballasts et réservoirs de procédé." },
        { title: "Protection passive incendie", body: "Revêtements intumescents Hempafire et Hempacore pour l'acier de structure offshore, commercial et industriel." },
        { title: "Préparation de surface", body: "Équipements de jet d'eau ultra-haute pression Hammelmann et produits de nettoyage Orlichem pour préparer avant peinture." },
      ],
      sectorsHeading: "Nos clients",
      sectors: ["Flottes de pêche", "Navires marchands", "Offshore et pétrole et gaz", "Cales sèches et réparation navale", "Mines", "Énergie et infrastructures"],
      whyHeading: "Pourquoi acheter votre peinture marine chez Daron",
      why: [
        "Distributeur agréé Hempel : produit authentique et documentation fabricant.",
        "Fourni depuis Walvis Bay, livré à quai, en cale sèche ou sur site à Walvis Bay et Lüderitz.",
        "Un seul fournisseur pour la peinture, la préparation de surface, les produits chimiques et l'avitaillement pendant le même arrêt technique.",
      ],
      relatedHeading: "Voir aussi",
      related: [
        { href: "/brands/hempel", label: "Gamme et catalogues Hempel" },
        { href: "/services/coatings", label: "Revêtements et préparation de surface" },
        { href: "/services/dry-dock", label: "Soutien en cale sèche à Walvis Bay" },
      ],
      faqHeading: "Peinture marine en Namibie : questions fréquentes",
      faqs: [
        { q: "Qui est le distributeur Hempel en Namibie ?", a: "Daron Namibia (anciennement Walvis Bay Ship Chandlers) est le distributeur agréé Hempel en Namibie, au No. 31 Grand Avenue, Industrial Area, Walvis Bay." },
        { q: "Où acheter de la peinture marine à Walvis Bay ?", a: "Commandez auprès de Daron Namibia à Walvis Bay. Envoyez la liste de produits ou la spécification, les quantités et la date de livraison à dnoperations@daron-group.com ou appelez le +264 83 337 4710." },
        { q: "Fournissez-vous des antifoulings pour navires de pêche et cale sèche ?", a: "Oui. Nous fournissons les systèmes Hempel antifouling, carène, citernes et anticorrosion pour navires de pêche, marchands et unités offshore, livrés à quai ou en cale à Walvis Bay." },
        { q: "Pouvez-vous aider à choisir le bon système ?", a: "Oui. Indiquez l'équipement, le support, le revêtement existant, l'exposition et la fenêtre de travaux ; notre équipe technique identifie les produits Hempel et la documentation adaptés." },
        { q: "Fournissez-vous des revêtements de protection pour les mines et l'industrie ?", a: "Oui. Les revêtements Hempel de protection, anticorrosion et protection incendie sont fournis pour les mines, l'énergie, les infrastructures et l'acier industriel dans toute la Namibie." },
      ],
      rfqHeading: "Envoyer votre besoin en revêtements",
      rfqBody: "Joignez la spécification, la liste de produits ou le descriptif. Indiquez la surface, le navire ou l'équipement et la date de livraison si connus.",
      serviceType: "Fourniture de peintures marines et revêtements de protection",
      brand: { name: "Hempel", url: "https://www.hempel.com" },
    },
    "industrial-cleaning-chemicals": {
      metaTitle: "Produits de Nettoyage Industriel en Namibie | Daron",
      metaDescription:
        "Produits de nettoyage industriel, dégraissants, NEP et produits marins en Namibie par Daron, distributeur exclusif Orlichem à Walvis Bay.",
      eyebrow: "Produits de nettoyage · Namibie",
      title: "Produits de nettoyage industriel et dégraissants en Namibie",
      intro:
        "Daron Namibia est le distributeur exclusif Orlichem en Namibie. Depuis Walvis Bay, nous fournissons dégraissants industriels, nettoyage en place (NEP), produits marins, cuisine, blanchisserie et hygiène aux navires, usines, transformateurs alimentaires et établissements de toute la Namibie — en stock local, sans attendre l'importation.",
      navLabel: "Produits de nettoyage",
      supplyHeading: "Les produits Orlichem que nous fournissons",
      supply: [
        { title: "Dégraissants industriels", body: "Dégraissants aqueux et solvants pour l'ingénierie, l'industrie, l'automobile et le maritime, dont Wipe Out (agréé contact alimentaire SANS 1828), CSM, Degrasol et Eco-Solve." },
        { title: "Nettoyage en place (NEP)", body: "Acid CIP et Alkaline CIP LF pour le nettoyage en circulation dans l'agroalimentaire, les boissons et la transformation du poisson." },
        { title: "Traitement des métaux", body: "Protection anticorrosion, dégraissage, décapage et passivation." },
        { title: "Produits chimiques marins", body: "Nettoyage salle des machines et circuits d'air, traitement chaudières et évaporateurs, carburant, eau de ballast et eau potable, anticorrosion et dispersant d'hydrocarbures." },
        { title: "Cuisine et blanchisserie", body: "Dégraissants, désinfectants et produits vaisselle conformes HACCP et certifiés EN 1276, et systèmes de blanchisserie (Atom Wash, AquaTerge Ultra, Atom Soft)." },
        { title: "Entretien et hygiène des mains", body: "Sols, nettoyants polyvalents, contrôle des odeurs et hygiène des mains certifiée EN 1276 pour l'hébergement, l'hôtellerie et les collectivités." },
      ],
      sectorsHeading: "Nos clients",
      sectors: ["Transformation du poisson et agroalimentaire", "Ingénierie et industrie", "Navires et offshore", "Mines", "Hôtellerie et restauration", "Collectivités et sites"],
      whyHeading: "Pourquoi acheter vos produits chez Daron",
      why: [
        "Distributeur exclusif Orlichem en Namibie. Orlichem est certifié ISO 9001 et Intertek, avec des formules certifiées SANS et EN 1276.",
        "Stock à Walvis Bay, livré par notre propre flotte dans toute la Namibie et à Lüderitz.",
        "Brochures téléchargeables et équipe technique pour choisir le bon produit.",
      ],
      relatedHeading: "Voir aussi",
      related: [
        { href: "/brands/orlichem", label: "Gamme et brochures Orlichem" },
        { href: "/services/ship-chandlery", label: "Shipchandler à Walvis Bay" },
        { href: "/services/coatings", label: "Revêtements et préparation de surface" },
      ],
      faqHeading: "Produits de nettoyage en Namibie : questions fréquentes",
      faqs: [
        { q: "Où acheter des dégraissants industriels en Namibie ?", a: "Daron Namibia à Walvis Bay fournit les dégraissants industriels Orlichem, dont Wipe Out, CSM, Degrasol et Eco-Solve, dans toute la Namibie. Contactez dnoperations@daron-group.com ou le +264 83 337 4710." },
        { q: "Avez-vous des produits adaptés à la transformation du poisson et à l'agroalimentaire ?", a: "Oui. La gamme comprend Wipe Out (agréé contact alimentaire SANS 1828), Acid CIP et Alkaline CIP LF, et des désinfectants certifiés EN 1276." },
        { q: "Fournissez-vous des produits pour chaudières, eau et salle des machines ?", a: "Oui. Les produits marins Orlichem couvrent le nettoyage de la salle des machines, le traitement des chaudières et évaporateurs, du carburant, de l'eau de ballast et potable, et le dispersant d'hydrocarbures." },
        { q: "Qui distribue Orlichem en Namibie ?", a: "Daron Namibia (anciennement Walvis Bay Ship Chandlers) est le distributeur exclusif Orlichem en Namibie." },
        { q: "Puis-je obtenir les informations produit et sécurité avant de commander ?", a: "Oui. Les brochures Orlichem sont sur notre page Orlichem et notre équipe fournit les informations produit et sécurité des produits commandés." },
      ],
      rfqHeading: "Envoyer votre besoin en produits chimiques",
      rfqBody: "Indiquez l'application, les produits utilisés, les quantités et le lieu de livraison. Nous proposons le produit Orlichem adapté et un devis.",
      serviceType: "Fourniture de produits de nettoyage industriels et marins",
      brand: { name: "Orlichem", url: "https://www.orlichem.co.za" },
    },
    "vessel-provisions": {
      metaTitle: "Avitaillement de Navires à Walvis Bay et Lüderitz | Daron",
      metaDescription:
        "Avitaillement de navires à Walvis Bay et Lüderitz : vivres frais, réfrigérés et surgelés, sous douane, livrés à quai, au mouillage et en offshore.",
      eyebrow: "Avitaillement · Walvis Bay",
      title: "Avitaillement de navires à Walvis Bay et Lüderitz",
      intro:
        "Daron Namibia (anciennement Walvis Bay Ship Chandlers) fournit vivres frais, réfrigérés, surgelés et secs et avitaillement sous douane aux navires, plateformes et unités offshore — depuis notre entrepôt frigorifique et sous douane de Walvis Bay, livrés à quai, au mouillage et en offshore.",
      navLabel: "Avitaillement",
      supplyHeading: "Ce que nous fournissons",
      supply: [
        { title: "Produits frais", body: "Fruits, légumes et produits laitiers pour les équipages au port et en offshore." },
        { title: "Viande et poisson", body: "Viandes sous vide de notre boucherie intégrée, réfrigérées et surgelées." },
        { title: "Épicerie et surgelés", body: "Épicerie, surgelés et boissons stockés dans notre entrepôt de Walvis Bay." },
        { title: "Avitaillement sous douane", body: "Marchandises sous douane, dédouanées en interne." },
        { title: "Cuisine et cabines", body: "Consommables de cuisine, produits d'entretien et d'hygiène et fournitures de cabine avec votre commande." },
        { title: "Restauration offshore", body: "Approvisionnement des plateformes et unités offshore, menus conçus avec des diététiciens et gestion des stocks d'urgence." },
      ],
      sectorsHeading: "Nos livraisons",
      sectors: ["À quai, port de Walvis Bay", "Mouillage de Walvis Bay par vedette", "Lüderitz", "Plateformes et FPSO via navire ravitailleur"],
      whyHeading: "Pourquoi s'avitailler chez Daron",
      why: [
        "Stockage réfrigéré, surgelé, sec et sous douane à Walvis Bay, conforme HACCP.",
        "Boucherie intégrée, dédouanement en interne et flotte de livraison dédiée.",
        "Expérience offshore : nous avons approvisionné simultanément le Deepsea Mira, le Deepsea Bollsta et le Deepsea Hercules.",
      ],
      relatedHeading: "Voir aussi",
      related: [
        { href: "/services/ship-chandlery", label: "Shipchandler à Walvis Bay" },
        { href: "/industries/oil-and-gas", label: "Offshore et pétrole et gaz" },
        { href: "/track-record", label: "Références" },
      ],
      faqHeading: "Avitaillement : questions fréquentes",
      faqs: [
        { q: "Livrez-vous les vivres aux navires au mouillage de Walvis Bay ?", a: "Oui. Nous livrons à quai au port de Walvis Bay et au mouillage par vedette, en coordination avec l'agent du navire." },
        { q: "Avitaillez-vous à Lüderitz ?", a: "Oui. Nous approvisionnons les navires à Lüderitz depuis notre entrepôt de Walvis Bay, avec documentation et dédouanement gérés en interne." },
        { q: "Fournissez-vous l'avitaillement sous douane ?", a: "Oui. Les marchandises sous douane sont stockées dans notre entrepôt de Walvis Bay et dédouanées en interne pour votre navire." },
        { q: "Approvisionnez-vous les plateformes offshore ?", a: "Oui. Nous avons approvisionné plusieurs plateformes simultanément, dont le Deepsea Mira, le Deepsea Bollsta et le Deepsea Hercules, avec des chargements consolidés et documentés pour le ravitailleur." },
        { q: "Comment commander ?", a: "Envoyez votre liste (codes IMPA bienvenus) à dnoperations@daron-group.com ou à notre équipe opérations sur WhatsApp. Les demandes offshore sont traitées 24h/24." },
      ],
      rfqHeading: "Envoyer votre liste d'avitaillement",
      rfqBody: "Joignez la liste avec le nom du navire, l'ETA, le port ou mouillage et la fenêtre de livraison.",
      serviceType: "Avitaillement de navires",
    },
  },
};

export const categorySlugs = Object.keys(content.en) as CategorySlug[];

export function isCategorySlug(slug: string): slug is CategorySlug {
  return (categorySlugs as string[]).includes(slug);
}

export function getCategory(slug: CategorySlug, locale: string): CategoryContent {
  return (content[locale as Locale] ?? content.en)[slug];
}
