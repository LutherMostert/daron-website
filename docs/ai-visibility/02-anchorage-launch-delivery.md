# Page 2: Anchorage and launch delivery

> **Status:** draft copy, written 6 Oct 2026 from the live site, the repo (`main`) and the AI-visibility audit. Anything in **[CONFIRM: …]** must be answered by Luther and then either filled in or deleted before the page ships. Do not publish a page, or its JSON-LD, while it still contains `[CONFIRM`.

## Page settings

| Field | Value |
|---|---|
| URL slug | `/services/anchorage-launch-delivery` |
| Route file | `src/app/[locale]/services/anchorage-launch-delivery/page.tsx (new)` |
| SEO title (55 chars, render with `titleAbsolute: true`) | Anchorage & Launch Delivery, Walvis Bay \| Daron Namibia |
| Meta description (149 chars) | Provisions, stores and spares delivered by launch to vessels at Walvis Bay anchorage, coordinated with your agent and customs. Send your requisition. |
| H1 | Anchorage and launch delivery to vessels at Walvis Bay |
| Hero eyebrow | Anchorage delivery · Walvis Bay |
| Breadcrumb | Home › Services › Anchorage and launch delivery |
| Suggested hero image (existing asset) | `/images/site/operations/daron-fleet-orange-vessel.jpg` |

**Notes for the developer:**

- Main buyer queries this page targets: "vessel provisions Walvis Bay anchorage" and "launch delivery Walvis Bay". NSC is #1 for these today, partly because it says "anchorage via launch services" explicitly.
- The live chandlery page already says that vessels at anchorage are supplied by launch. Luther should still confirm the operational details below before this page goes live.

## Body copy

**Intro**
Daron Namibia delivers provisions, stores and spares to vessels at Walvis Bay anchorage. We pack and label the order in our Walvis Bay warehouse, clear it with customs where needed, take it to the launch and deliver it to the vessel. The delivery is coordinated with the ship's agent and port clearance.

### How an anchorage delivery works
1. **Requisition:** send the list to dnoperations@daron-group.com or on WhatsApp (Hein +264 81 129 6407 or Marco +264 81 203 6751), with the vessel name, IMO number, anchorage position, ship's agent and the required delivery window.
2. **Confirmation:** we confirm price, availability and the delivery plan, including the launch time. [CONFIRM: standard lead time for an anchorage delivery, e.g. "24 hours' notice for full orders, shorter for urgent items".]
3. **Packing:** goods are packed and labelled for the vessel in our Walvis Bay warehouse. [CONFIRM: if you pack by department (provisions, bonded, deck, engine, cabin), say so.] Chilled and frozen goods stay in the cold chain until loading.
4. **Clearance:** we clear bonded stores with customs in-house, and coordinate port clearance with your agent.
5. **Launch transfer:** the launch carries the order to the vessel. [CONFIRM: does Daron operate its own launch, or use a contracted launch or boat operator? Name the operator if you want to.]
6. **Hand-over:** the vessel signs the delivery note on receipt.

### What we can deliver at anchorage
Fresh, chilled, frozen and dry provisions; bonded stores [CONFIRM: bonded at anchorage]; deck, engine and cabin stores; spares and technical items; Hempel paint; Orlichem chemicals; mooring ropes; and safety equipment. [CONFIRM: any limit on the weight or size of a single launch delivery, e.g. pallets, drums or rope coils, and how larger items are handled.]

### Weather and sea state
Launch transfers depend on wind, swell and the launch master's decision. If conditions close the transfer window, we hold the order in controlled storage and rebook the delivery with your agent.

### Other Namibian anchorages and offshore
- **Lüderitz:** [CONFIRM: does Daron deliver to vessels at Lüderitz, alongside and/or at anchorage? If yes, give the delivery method (road from Walvis Bay, local partner) and lead time. If not, delete this line.]
- **Offshore:** for drilling rigs, FPSOs and offshore units in Namibian waters, we stage documented loads for the operator's supply vessel. See [Ports we serve](/ports-we-serve).

### Cost
[CONFIRM: how launch hire is charged, e.g. "included in the delivery" or "charged at cost and shown on the quote". Delete this section if you prefer not to say.]

**Office hours:** Monday to Friday, 08:00–17:00 CAT. Offshore RFQs are handled 24/7 on WhatsApp. [CONFIRM: are out-of-hours and weekend anchorage deliveries available?]

## FAQ block

Heading: **Anchorage delivery at Walvis Bay: common questions**

**Can I get provisions delivered to my vessel at Walvis Bay anchorage?**  
Yes. Daron Namibia supplies vessels at Walvis Bay anchorage by launch, coordinated with the ship's agent and port clearance. Provisions, stores, spares, paint and chemicals can all go out on the same delivery.

**Which ship chandler in Walvis Bay delivers by launch?**  
Daron Namibia (formerly Walvis Bay Ship Chandlers) delivers to vessels at Walvis Bay anchorage by launch, and alongside the quay with its own trucks.

**How much notice do you need for an anchorage delivery?**  
[CONFIRM: e.g. 'Send the requisition at least 24 hours before the delivery window; urgent items can often go out sooner.'] Include the anchorage position and your agent's details.

**Can bonded stores be delivered to a vessel at anchorage?**  
[CONFIRM: 'Yes. We clear bonded stores with customs in-house and deliver them by launch with the rest of the order.' Or delete this Q&A.]

**Do you deliver to vessels at Lüderitz?**  
[CONFIRM: yes or no, and how. Delete this Q&A if you do not serve Lüderitz.]

**What happens if the weather stops the launch?**  
Launch transfers depend on wind, swell and the launch master's decision. If the window closes, we hold the order in controlled storage, including chilled and frozen goods, and rebook the delivery with your agent.

## FAQPage JSON-LD

Must match the visible FAQ text word for word. Remove any Q&A whose [CONFIRM] is answered "no".

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I get provisions delivered to my vessel at Walvis Bay anchorage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Daron Namibia supplies vessels at Walvis Bay anchorage by launch, coordinated with the ship's agent and port clearance. Provisions, stores, spares, paint and chemicals can all go out on the same delivery."
      }
    },
    {
      "@type": "Question",
      "name": "Which ship chandler in Walvis Bay delivers by launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Daron Namibia (formerly Walvis Bay Ship Chandlers) delivers to vessels at Walvis Bay anchorage by launch, and alongside the quay with its own trucks."
      }
    },
    {
      "@type": "Question",
      "name": "How much notice do you need for an anchorage delivery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[CONFIRM: e.g. 'Send the requisition at least 24 hours before the delivery window; urgent items can often go out sooner.'] Include the anchorage position and your agent's details."
      }
    },
    {
      "@type": "Question",
      "name": "Can bonded stores be delivered to a vessel at anchorage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[CONFIRM: 'Yes. We clear bonded stores with customs in-house and deliver them by launch with the rest of the order.' Or delete this Q&A.]"
      }
    },
    {
      "@type": "Question",
      "name": "Do you deliver to vessels at Lüderitz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[CONFIRM: yes or no, and how. Delete this Q&A if you do not serve Lüderitz.]"
      }
    },
    {
      "@type": "Question",
      "name": "What happens if the weather stops the launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Launch transfers depend on wind, swell and the launch master's decision. If the window closes, we hold the order in controlled storage, including chilled and frozen goods, and rebook the delivery with your agent."
      }
    }
  ]
}
```

## Service JSON-LD (same pattern as `/services/ship-chandlery`)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Anchorage and launch delivery, Walvis Bay",
  "serviceType": "Ship supply delivery to vessels at anchorage",
  "provider": {
    "@id": "https://www.daron.com.na/#organization"
  },
  "areaServed": [
    {
      "@type": "Place",
      "name": "Port of Walvis Bay anchorage"
    },
    {
      "@type": "City",
      "name": "Walvis Bay"
    },
    {
      "@type": "Country",
      "name": "Namibia"
    }
  ],
  "description": "Provisions, stores and spares delivered by launch to vessels at Walvis Bay anchorage, coordinated with the ship's agent and customs."
}
```

## Internal links to add

- Link from `/services/ship-chandlery` (the Anchorage delivery card), `/ports-we-serve`, `/services` and the FAQ page.
