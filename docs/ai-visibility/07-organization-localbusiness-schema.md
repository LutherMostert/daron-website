# Organization / LocalBusiness JSON-LD (site-wide, `src/app/[locale]/layout.tsx`)

> **Status:** draft, 6 Oct 2026. Values marked `[CONFIRM …]` must be filled in or deleted before deploy. A `[CONFIRM` string must never reach production JSON-LD.

## What changes compared with the live site (checked 6 Oct 2026, 20:55 CAT)

The live site already has `@id`s (`#organization`, `#localbusiness`), `legalName`, `alternateName` (Walvis Bay Ship Chandlers, WBSC, Daron Trading Namibia), `foundingDate`, `knowsAbout` and `sameAs` (LinkedIn and Facebook). The audit (run earlier today) marked some of these as missing; a deploy at about 20:45 CAT added them (the sitemap build timestamp is 18:45 UTC). The changes still needed are:

1. **Put both nodes in one `@graph`** in a single `<script>` (or keep two scripts, but link them). `LocalBusiness.parentOrganization` should point to `{"@id": "https://www.daron.com.na/#organization"}`, not to a name-only "Daron Group" stub. Daron Group becomes the Organization's `parentOrganization`, with `url: https://daron-group.com`.
2. **`alternateName`:** keep the three existing names on both nodes. On the Organization also add "Daron Namibia (Pty) Ltd" and "Walvis Bay Ship Chandlers (Pty) Ltd", the exact strings used on the old directory listings.
3. **`postalCode`:** add `9000` [CONFIRM] to both addresses, and set `contact.address.postalCode` in `src/lib/site.ts`.
4. **`sameAs`:** normalise LinkedIn to `https://www.linkedin.com/...`. Add the ShipServ profile now. Add the Google Business Profile, IMPA and ISSA URLs once they exist and show Daron's current details.
5. **`areaServed`:** Walvis Bay, offshore Namibia and Namibia; add Lüderitz only if confirmed. Drop the vague "Southern Africa" string, or keep it only if Luther wants it.
6. **`knowsAbout`:** extend it as below. It now covers anchorage delivery, marine paint, CIP and Hammelmann.
7. **New:** `employee` (Luther Mostert, MD, with his LinkedIn as `sameAs`), `brand` (all 7 brands), `contactPoint`, `hasMap` (GBP URL once verified) and `hasCredential` (ISO 9001:2015). [CONFIRM: use `founder` instead of `employee` for Luther if he founded WBSC in 2012.]
8. **Geo pin:** `-22.957, 14.508` is only 3 decimal places (about 100 m). [CONFIRM: take the exact coordinates of No. 31 Grand Avenue from the Google Business Profile pin.]
9. **Brand-page `Service` provider:** `/brands/[brand]/page.tsx` uses `provider: {"@type":"Organization", name, url}` with no `@id`. Change it to `provider: {"@id": "https://www.daron.com.na/#organization"}` and add `brand: {"@type":"Brand","name": b.name, "url": b.manufacturerUrl}`.

## Target JSON-LD

Build this from `site` / `contact` constants in `src/lib/site.ts`. Do not hard-code strings in `layout.tsx`.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.daron.com.na/#organization",
      "name": "Daron Namibia",
      "legalName": "Daron Trading Namibia (Pty) Ltd",
      "alternateName": [
        "Walvis Bay Ship Chandlers",
        "WBSC",
        "Daron Trading Namibia",
        "Daron Namibia (Pty) Ltd",
        "Walvis Bay Ship Chandlers (Pty) Ltd"
      ],
      "url": "https://www.daron.com.na",
      "logo": "https://www.daron.com.na/icon",
      "image": "https://www.daron.com.na/images/site/operations/normand-energy-wide.jpg",
      "description": "Daron Namibia (formerly Walvis Bay Ship Chandlers) is a ship chandler and marine and industrial supplier in Walvis Bay, Namibia, since 2012. Official Hempel distributor for Namibia; exclusive Orlichem and Hammelmann distributor.",
      "foundingDate": "2012",
      "foundingLocation": {
        "@type": "Place",
        "name": "Walvis Bay, Namibia"
      },
      "email": "dnoperations@daron-group.com",
      "telephone": "+264833374710",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No. 31 Grand Avenue, Industrial Area",
        "addressLocality": "Walvis Bay",
        "postalCode": "9000 [CONFIRM]",
        "addressRegion": "Erongo Region",
        "addressCountry": "NA"
      },
      "parentOrganization": {
        "@type": "Organization",
        "name": "Daron Group",
        "url": "https://daron-group.com"
      },
      "employee": {
        "@type": "Person",
        "name": "Luther Mostert",
        "jobTitle": "Managing Director",
        "sameAs": [
          "https://www.linkedin.com/in/luther-mostert-48915b54"
        ]
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Walvis Bay"
        },
        {
          "@type": "City",
          "name": "Lüderitz [CONFIRM or delete]"
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
      "knowsAbout": [
        "Ship chandling",
        "Vessel provisions",
        "Bonded stores",
        "Deck, engine and cabin stores",
        "Anchorage and launch delivery",
        "Offshore rig supply",
        "Hempel marine and protective coatings",
        "Marine paint",
        "Orlichem industrial cleaning and degreasing chemicals",
        "Clean-in-place (CIP) chemicals",
        "Hammelmann high-pressure water jetting",
        "Gas detection and safety equipment",
        "Dry-dock technical support"
      ],
      "brand": [
        {
          "@type": "Brand",
          "name": "Hempel",
          "url": "https://www.hempel.com"
        },
        {
          "@type": "Brand",
          "name": "Orlichem"
        },
        {
          "@type": "Brand",
          "name": "Hammelmann",
          "url": "https://www.hammelmann.com"
        },
        {
          "@type": "Brand",
          "name": "Honeywell"
        },
        {
          "@type": "Brand",
          "name": "Blackline Safety"
        },
        {
          "@type": "Brand",
          "name": "Industrial Scientific"
        },
        {
          "@type": "Brand",
          "name": "Katradis"
        }
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "ISO 9001:2015"
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/daron-namibia",
        "https://www.facebook.com/WBshipchandlers",
        "https://www.shipserv.com/supplier/profile/s/daron-trading-namibia-pty-ltd-218967",
        "[CONFIRM: Google Business Profile URL, once renamed to Daron Namibia]",
        "[CONFIRM: IMPA member profile URL]",
        "[CONFIRM: ISSA member page URL, if one exists]"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.daron.com.na/#localbusiness",
      "name": "Daron Namibia",
      "alternateName": [
        "Walvis Bay Ship Chandlers",
        "WBSC",
        "Daron Trading Namibia"
      ],
      "parentOrganization": {
        "@id": "https://www.daron.com.na/#organization"
      },
      "description": "Ship chandler in Walvis Bay, Namibia (formerly Walvis Bay Ship Chandlers): provisions, bonded, deck, engine and cabin stores, Hempel coatings and Orlichem chemicals, delivered quayside, at anchorage and offshore.",
      "url": "https://www.daron.com.na",
      "image": "https://www.daron.com.na/images/site/operations/normand-energy-wide.jpg",
      "telephone": "+264833374710",
      "email": "dnoperations@daron-group.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No. 31 Grand Avenue, Industrial Area",
        "addressLocality": "Walvis Bay",
        "postalCode": "9000 [CONFIRM]",
        "addressRegion": "Erongo Region",
        "addressCountry": "NA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -22.957,
        "longitude": 14.508
      },
      "hasMap": "[CONFIRM: Google Business Profile / Maps place URL]",
      "areaServed": [
        {
          "@type": "City",
          "name": "Walvis Bay"
        },
        {
          "@type": "City",
          "name": "Lüderitz [CONFIRM or delete]"
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
      "knowsAbout": [
        "Ship chandling",
        "Vessel provisions",
        "Bonded stores",
        "Anchorage and launch delivery",
        "Hempel marine coatings",
        "Orlichem industrial cleaning chemicals",
        "Hammelmann high-pressure water jetting"
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "08:00",
          "closes": "17:00"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "telephone": "+264833374710",
          "email": "dnoperations@daron-group.com",
          "availableLanguage": [
            "en",
            "pt",
            "fr"
          ],
          "areaServed": "NA"
        },
        {
          "@type": "ContactPoint",
          "contactType": "technical support",
          "email": "namtechnical@daron-group.com",
          "areaServed": "NA"
        }
      ]
    }
  ]
}
```

## Suggested `src/lib/site.ts` additions

```ts
export const site = {
  // …existing…
  alternateNames: ["Walvis Bay Ship Chandlers", "WBSC", "Daron Trading Namibia"],
  legacyLegalNames: ["Daron Namibia (Pty) Ltd", "Walvis Bay Ship Chandlers (Pty) Ltd"],
  parentOrganizationUrl: "https://daron-group.com",
  managingDirector: { name: "Luther Mostert", linkedin: "https://www.linkedin.com/in/luther-mostert-48915b54" },
  areaServed: ["Walvis Bay", /* "Lüderitz", ← only if confirmed */ "Offshore Namibia", "Namibia"],
} as const;

export const contact = {
  address: { /* … */ postalCode: "9000" /* CONFIRM */ },
  socials: {
    linkedin: "https://www.linkedin.com/company/daron-namibia",
    facebook: "https://www.facebook.com/WBshipchandlers",
    shipserv: "https://www.shipserv.com/supplier/profile/s/daron-trading-namibia-pty-ltd-218967",
    googleBusinessProfile: "", // CONFIRM, then add to sameAs + hasMap + footer + /contact
    impa: "",                  // CONFIRM
  },
};
```

Filter out empty strings when you build `sameAs`, so unconfirmed URLs are simply left out.
