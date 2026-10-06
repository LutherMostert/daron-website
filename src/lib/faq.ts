import { contact } from "./site";

/**
 * FAQ content — grounded in real site facts (services, certifications, track
 * record, the Don workflow). English for launch; PT/FR via Sanity (Week 2).
 * Rendered on /faq and emitted as FAQPage JSON-LD for rich results.
 */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What does Daron Namibia supply?",
    a: "We are a full-service ship chandler and marine supplier based in Walvis Bay. We supply provisions and catering, deck and engine stores, bonded stores, technical spares, marine chemicals and coatings, health & safety equipment, and dry-dock technical support — across the marine, oil & gas, mining and hospitality sectors.",
  },
  {
    q: "Is Daron Namibia the same company as Walvis Bay Ship Chandlers?",
    a: "Yes. Daron Namibia was founded in Walvis Bay in 2012 as Walvis Bay Ship Chandlers (WBSC) and took the Daron Namibia name when it joined the Daron Group. Same company, same team and the same Walvis Bay warehouse.",
  },
  {
    q: "Where are you based and which ports do you serve?",
    a: "Our head office and warehousing are at No. 31 Grand Avenue, Industrial Area, Walvis Bay, Namibia. We supply vessels and rigs calling at Walvis Bay and Lüderitz, and support operations along the Namibian coast and the wider Southern African region through the Daron Group network.",
  },
  {
    q: "How fast can I get a quote?",
    a: `Fast. Send your RFQ to Daron operations on WhatsApp (${contact.whatsapp.display}). The team structures the request and routes it to the right key account manager for pricing, availability and delivery control.`,
  },
  {
    q: "Do you supply offshore drilling rigs?",
    a: "Yes. Daron Namibia has supplied multiple offshore drilling rigs simultaneously under active drilling conditions — including the Deepsea Mira, Deepsea Bollsta and Deepsea Hercules, with our first offshore engagement on the Transocean Marianas in 2013.",
  },
  {
    q: "Which brands does Daron distribute in Namibia?",
    a: "We are the authorised local distributor for Hempel (marine and protective coatings), Orlichem (specialised marine and industrial chemicals), Honeywell (gas detection and safety instruments), Blackline Safety (connected lone-worker monitoring) and Hammelmann (high-pressure pumps and water-jetting systems).",
  },
  {
    q: "Is Daron certified?",
    a: "Yes. We hold ISO 9001:2015 certification and HACCP food-safety compliance, and we are ISSA and IMPA listed for international chandlery compatibility.",
  },
  {
    q: "Do you handle logistics, customs and clearance?",
    a: "Yes. We provide customs clearance, freight forwarding, permits, crew changes and dockside staging, delivered with our own branded fleet and warehousing — including refrigerated, freezer, dry and bonded storage.",
  },
  {
    q: "How do I send an RFQ or request for quote?",
    a: `Use any Request a quote button to open an email to ${contact.emails.operations}, or contact Daron operations on WhatsApp at ${contact.whatsapp.display}. Include your item list, quantities and delivery requirements, and attach supporting documents in your email.`,
  },
  {
    q: "What is “Don”, the Daron AI assistant?",
    a: "Don is our website AI operations copilot. It answers operational questions from approved Daron reference information and captures the context needed for a direct handoff. Pricing, availability and every quote remain under specialist control.",
  },
];
