# Page 5: Ports we serve

> **Status:** draft copy, written 6 Oct 2026 from the live site, the repo (`main`) and the AI-visibility audit. Anything in **[CONFIRM: …]** must be answered by Luther and then either filled in or deleted before the page ships. Do not publish a page, or its JSON-LD, while it still contains `[CONFIRM`.

## Page settings

| Field | Value |
|---|---|
| URL slug | `/ports-we-serve` |
| Route file | `src/app/[locale]/ports-we-serve/page.tsx (new)` |
| SEO title (53 chars, render with `titleAbsolute: true`) | Ports We Serve: Walvis Bay & Offshore Namibia \| Daron |
| Meta description (155 chars) | Daron Namibia supplies vessels at Walvis Bay, alongside and at anchorage, and offshore rigs in Namibian waters. See ports, delivery methods and lead times. |
| H1 | Ports and locations we serve in Namibia |
| Hero eyebrow | Ports we serve |
| Breadcrumb | Home › Ports we serve |
| Suggested hero image (existing asset) | `/images/site/operations/normand-energy-wide.jpg` |

**Notes for the developer:**

- If Luther confirms Lüderitz, change the title to "Ports We Serve: Walvis Bay, Lüderitz & Offshore | Daron" and add Lüderitz to the meta description: "…at Walvis Bay and Lüderitz…".
- Add this page to the footer sitemap list. A header link is optional (see the brief).

## Body copy

**Intro**
Daron Namibia supplies vessels and offshore units from its base at No. 31 Grand Avenue, Industrial Area, Walvis Bay, Namibia. The table shows where we deliver and how.

| Location | UN/LOCODE | How we deliver | Typical lead time |
|---|---|---|---|
| Port of Walvis Bay, alongside | NAWVB | Our own trucks to the berth | [CONFIRM] |
| Walvis Bay anchorage | NAWVB | By launch, with your agent | [CONFIRM] |
| Offshore Namibia (rigs, FPSOs, offshore units) | n/a | Staged loads for the operator's supply vessel | [CONFIRM] |
| Lüderitz | NALUD | [CONFIRM: road delivery from Walvis Bay, or a local partner] | [CONFIRM] |

### Walvis Bay
Walvis Bay is our home port. Our warehouse, cold store, bonded store and delivery fleet are based in the Walvis Bay Industrial Area. We supply vessels alongside, at anchorage (see [Anchorage and launch delivery](/services/anchorage-launch-delivery)) and in the dry dock (see [Dry-dock support](/services/dry-dock)).

### Offshore Namibia
Our first offshore engagement was the Transocean Marianas in 2013. Over a two-year campaign we supplied the Deepsea Mira, Deepsea Bollsta and Deepsea Hercules, including more than eight months supplying all three rigs at once. We pack, document and stage consolidated loads for the operator's supply vessels from Walvis Bay. See [Oil and gas](/industries/oil-and-gas).

### Lüderitz
[CONFIRM: does Daron supply vessels at Lüderitz? If yes, write 2–3 sentences: how goods get there (road from Walvis Bay or a local partner), what you supply (provisions, stores, paint, chemicals), and the lead time. If not, delete this section and the Lüderitz table row.]

### Elsewhere in Namibia
We deliver Hempel coatings, Orlichem chemicals and safety equipment to industrial and mine sites inland. [CONFIRM: regions and towns served.]

### Vessels heading to other African ports
Daron Group companies operate in other African countries, including South Africa, Angola, Mozambique and the Republic of the Congo. If your vessel's next port is outside Namibia, tell us, and we will put you in touch with the right group company. [CONFIRM: final list of group countries; the site currently says 7, 8 and 15 in different places.]

## FAQ block

Heading: **Ports and coverage: common questions**

**Which Namibian ports does Daron Namibia serve?**  
Daron Namibia serves the Port of Walvis Bay (alongside and at anchorage) and offshore rigs and units in Namibian waters. [CONFIRM: add 'and Lüderitz' if true.]

**Is there a ship chandler that supplies Lüderitz?**  
[CONFIRM: 'Yes. Daron Namibia supplies vessels at Lüderitz by [method], usually within [lead time].' Delete this Q&A if not.]

**Do you supply offshore drilling rigs off Namibia?**  
Yes. Daron Namibia has supplied offshore rigs since its first offshore engagement in 2013. In Namibia it supplied the Deepsea Mira, Deepsea Bollsta and Deepsea Hercules, with more than eight months supplying all three at once.

**Where is Daron Namibia located?**  
No. 31 Grand Avenue, Industrial Area, Walvis Bay, Namibia. Phone +264 83 337 4710, email dnoperations@daron-group.com. Office hours are Monday to Friday, 08:00–17:00 CAT.

**Can you deliver to vessels at Walvis Bay anchorage?**  
Yes. Vessels at Walvis Bay anchorage are supplied by launch, coordinated with the ship's agent and port clearance.

## FAQPage JSON-LD

Must match the visible FAQ text word for word. Remove any Q&A whose [CONFIRM] is answered "no".

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which Namibian ports does Daron Namibia serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Daron Namibia serves the Port of Walvis Bay (alongside and at anchorage) and offshore rigs and units in Namibian waters. [CONFIRM: add 'and Lüderitz' if true.]"
      }
    },
    {
      "@type": "Question",
      "name": "Is there a ship chandler that supplies Lüderitz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[CONFIRM: 'Yes. Daron Namibia supplies vessels at Lüderitz by [method], usually within [lead time].' Delete this Q&A if not.]"
      }
    },
    {
      "@type": "Question",
      "name": "Do you supply offshore drilling rigs off Namibia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Daron Namibia has supplied offshore rigs since its first offshore engagement in 2013. In Namibia it supplied the Deepsea Mira, Deepsea Bollsta and Deepsea Hercules, with more than eight months supplying all three at once."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Daron Namibia located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. 31 Grand Avenue, Industrial Area, Walvis Bay, Namibia. Phone +264 83 337 4710, email dnoperations@daron-group.com. Office hours are Monday to Friday, 08:00–17:00 CAT."
      }
    },
    {
      "@type": "Question",
      "name": "Can you deliver to vessels at Walvis Bay anchorage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Vessels at Walvis Bay anchorage are supplied by launch, coordinated with the ship's agent and port clearance."
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
  "name": "Ship supply, ports served in Namibia",
  "serviceType": "Ship chandler",
  "provider": {
    "@id": "https://www.daron.com.na/#organization"
  },
  "areaServed": [
    {
      "@type": "Place",
      "name": "Port of Walvis Bay (NAWVB)"
    },
    {
      "@type": "Place",
      "name": "Offshore Namibia"
    },
    {
      "@type": "Country",
      "name": "Namibia"
    }
  ],
  "description": "Ship supply from Walvis Bay to vessels alongside and at anchorage at the Port of Walvis Bay, and to offshore units in Namibian waters."
}
```

## Internal links to add

- Link from the FAQ answer "Where are you based and which ports do you serve?" (update that answer to match this page).
- Link from the ship-chandlery, anchorage and oil-and-gas pages.
