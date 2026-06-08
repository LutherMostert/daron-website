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
    q: "Where are you based and which ports do you serve?",
    a: "Our head office and warehousing are at No. 31 Grand Avenue, Industrial Area, Walvis Bay, Namibia. We supply vessels and rigs calling at Walvis Bay and support operations along the Namibian coast and the wider Southern African region through the Daron Group network.",
  },
  {
    q: "How fast can I get a quote?",
    a: "Fast. Send your RFQ to the Daron AI assistant on WhatsApp (+264 81 141 3840) and a drafted quote comes back in minutes. A human key account manager reviews and approves every quote before it ships — usually the same business day.",
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
    a: "The fastest route is WhatsApp to the Daron AI assistant at +264 81 141 3840 — you can send a spreadsheet, PDF or voice note. You can also use the contact form on our site or email dnoperations@daron-group.com.",
  },
  {
    q: "What is “Don”, the Daron AI assistant?",
    a: "Don is our AI operations copilot. He reads incoming RFQs, matches them against our live catalog, applies the right client pricing and drafts a ready-to-send quote in minutes. Don never sends a quote on his own — a Daron specialist reviews and approves every quote before it leaves our system.",
  },
];
