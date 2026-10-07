import json, os, re
OUT="/workspace/ai-visibility/website-pages"
PHONE="+264 83 337 4710"; EMAIL="dnoperations@daron-group.com"; TECH="namtechnical@daron-group.com"
WA="Hein +264 81 129 6407 or Marco +264 81 203 6751"
ADDR="No. 31 Grand Avenue, Industrial Area, Walvis Bay, Namibia"

COMMON_NOTE = """> **Status:** draft copy, written 6 Oct 2026 from the live site, the repo (`main`) and the AI-visibility audit. Anything in **[CONFIRM: …]** must be answered by Luther and then either filled in or deleted before the page ships. Do not publish a page, or its JSON-LD, while it still contains `[CONFIRM`.
"""

def faq_ld(faqs):
    return {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
        {"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in faqs]}

def render(p):
    t=p["title"]; d=p["desc"]
    s=[f"# {p['name']}\n", COMMON_NOTE,
       "## Page settings\n",
       "| Field | Value |","|---|---|",
       f"| URL slug | `{p['slug']}` |",
       f"| Route file | `{p['route']}` |",
       f"| SEO title ({len(t)} chars, render with `titleAbsolute: true`) | {t.replace('|','\\|')} |",
       f"| Meta description ({len(d)} chars) | {d} |",
       f"| H1 | {p['h1']} |",
       f"| Hero eyebrow | {p['eyebrow']} |",
       f"| Breadcrumb | {p['crumb']} |",
       f"| Suggested hero image (existing asset) | `{p['image']}` |",
       ""]
    if p.get("notes"): s += ["**Notes for the developer:**\n"] + [f"- {n}" for n in p["notes"]] + [""]
    s += ["## Body copy\n", p["body"].strip(), "",
          "## FAQ block\n", f"Heading: **{p['faqHeading']}**\n"]
    for q,a in p["faqs"]:
        s += [f"**{q}**  ", a, ""]
    s += ["## FAQPage JSON-LD\n",
          "Must match the visible FAQ text word for word. Remove any Q&A whose [CONFIRM] is answered \"no\".\n",
          "```json", json.dumps(faq_ld(p["faqs"]),indent=2,ensure_ascii=False), "```", ""]
    if p.get("service"):
        s += ["## Service JSON-LD (same pattern as `/services/ship-chandlery`)\n","```json",
              json.dumps(p["service"],indent=2,ensure_ascii=False),"```",""]
    if p.get("links"):
        s += ["## Internal links to add\n"] + [f"- {l}" for l in p["links"]] + [""]
    open(os.path.join(OUT,p["file"]),"w").write("\n".join(s))
    return p

def service(name, stype, desc, area=None, extra=None):
    o={"@context":"https://schema.org","@type":"Service","name":name,"serviceType":stype,
       "provider":{"@id":"https://www.daron.com.na/#organization"},
       "areaServed": area or [{"@type":"City","name":"Walvis Bay"},{"@type":"Country","name":"Namibia"}],
       "description":desc}
    if extra: o.update(extra)
    return o

pages=[]

# ---------------- 1 SHIP CHANDLING ----------------
pages.append(dict(file="01-ship-chandling-walvis-bay.md", name="Page 1: Ship chandling in Walvis Bay",
 slug="/services/ship-chandlery (existing URL, rewrite in place; do not create a second chandlery URL)",
 route="src/app/[locale]/services/ship-chandlery/page.tsx + `ShipChandlery` namespace in messages/*.json",
 title="Ship Chandler in Walvis Bay, Namibia | Daron Namibia",
 desc="Ship chandler in Walvis Bay since 2012, formerly Walvis Bay Ship Chandlers. Provisions, bonded, deck, engine and cabin stores, quayside or at anchorage.",
 h1="Ship chandler in Walvis Bay, Namibia", eyebrow="Ship chandlery · Walvis Bay",
 crumb="Home › Services › Ship chandler in Walvis Bay", image="/images/site/man-loading-ship.jpg",
 notes=["This page already ranks (#3 for \"ship chandler Walvis Bay\" in the audit). Keep the URL and expand it, so it does not compete with a new page.",
        "The current page already has the WBSC heritage block, the anchorage delivery card and a 6-question FAQ. Replace that copy with the copy below. Keep the existing layout, components and the `ld-chandlery-*` JSON-LD ids.",
        "Swap the generic Google Maps *search* link for the verified Google Business Profile link once it exists [CONFIRM: GBP URL]."],
 body=f"""
**Intro (hero paragraph)**
Daron Namibia is a ship chandler in Walvis Bay, Namibia. We supply provisions, bonded stores, and deck, engine and cabin stores to vessels alongside at the Port of Walvis Bay, at the anchorage, and to offshore rigs in Namibian waters. We started in 2012 as Walvis Bay Ship Chandlers (WBSC), joined the Daron Group in 2023 and became Daron Namibia. We deliver 24/7, including weekends and public holidays. We are ISO 9001:2015 certified, HACCP compliant, and ISSA and IMPA listed.

### What a vessel can order from us
- **Provisions:** fresh, chilled, frozen and dry provisions, with meat from our in-house butchery and perishables held in our Walvis Bay cold store.
- **Bonded stores:** tobacco, spirits, beer and wine, plus SIM cards. They are held in our bonded store in Walvis Bay, cleared in-house, and delivered alongside or to vessels at anchorage.
- **Deck stores:** ropes and mooring lines (including Katradis), paint and coatings (Hempel), cleaning chemicals (Orlichem), tools and consumables.
- **Engine stores:** engine parts, technical spares, marine lubricants [CONFIRM: lubricant brands] and consumables.
- **Cabin and galley stores:** crew supplies, plus Orlichem galley, laundry and housekeeping products. [CONFIRM: other typical cabin lines you want named, e.g. linen or toiletries.]
- **Safety and survival equipment:** PPE, pyrotechnics, gas detection (Honeywell, Blackline Safety, Industrial Scientific) and medicine.
- **Stationery.**

If an item is not in our warehouse, we source it through our supplier network in Southern Africa and Europe and the Daron Group.

### How we deliver in Walvis Bay
- **Quayside:** our own branded trucks deliver to the vessel alongside at the Port of Walvis Bay, timed to the berthing window.
- **Anchorage:** vessels at Walvis Bay anchorage are supplied by a contracted launch operator, in coordination with the ship's agent and port and customs clearance. We need 48 hours' notice. Bonded stores can go out on the same launch. See [Anchorage and launch delivery](/services/anchorage-launch-delivery).
- **Lüderitz:** vessels at Lüderitz are supplied by road from Walvis Bay, with a 48-hour lead time. See [Ports we serve](/ports-we-serve).
- **Offshore:** we pack, document and stage consolidated loads for supply vessels serving drilling rigs and offshore units.
- **Cold chain and bonded:** chilled, frozen and bonded goods stay in controlled storage until dispatch.

### How to order
1. Send your requisition to **{EMAIL}**, or by WhatsApp to {WA}. IMPA codes are welcome; Excel, PDF and Word lists all work.
2. Include the vessel name, IMO number, ETA and ETD, berth or anchorage position, ship's agent, and the required delivery date and time.
3. We confirm price, availability and the delivery plan. [CONFIRM: standard quote turnaround, e.g. "within X working hours" or "the same working day". The Why Daron page already says "A KAM will be back to you the same day".]
4. We deliver, and the vessel signs the delivery note on receipt.

**Hours:** deliveries to vessels run 24/7, including weekends and public holidays. The office is open Monday to Friday, 08:00–17:00 CAT, and offshore RFQs are handled 24/7 on WhatsApp.

**Call:** {PHONE} · **Address:** {ADDR}

### Formerly Walvis Bay Ship Chandlers
Daron Namibia was founded in Walvis Bay in 2012 as Walvis Bay Ship Chandlers (WBSC). In 2023 the company joined the Daron Group and became Daron Namibia; the name change was completed at the end of 2024. We are the same company, with the same team, and we answer RFQs from Walvis Bay. If you have bought from WBSC before, you are already a Daron client. The old wbsc.com.na website now redirects here.

### Why vessels use Daron in Walvis Bay
- One supplier for provisions, technical stores, coatings, chemicals and safety equipment.
- Our own warehouse, cold store, bonded store and delivery fleet in Walvis Bay.
- Offshore experience: we supplied the Deepsea Mira, Deepsea Bollsta and Deepsea Hercules over a two-year campaign, including more than eight months supplying all three at once.
""",
 faqHeading="Ship chandler in Walvis Bay: common questions",
 faqs=[
  ("Who is a good ship chandler in Walvis Bay, Namibia?",
   "Daron Namibia (formerly Walvis Bay Ship Chandlers) has supplied vessels and offshore rigs from Walvis Bay since 2012. It holds ISO 9001:2015 certification, is HACCP compliant, is ISSA and IMPA listed, and delivers alongside, at anchorage and offshore, 24/7."),
  ("Is Daron Namibia the same company as Walvis Bay Ship Chandlers?",
   "Yes. Walvis Bay Ship Chandlers (WBSC) was founded in Walvis Bay in 2012. It joined the Daron Group in 2023 and became Daron Namibia; the name change was completed at the end of 2024. The team and the Walvis Bay warehouse are the same."),
  ("What can a ship order from a chandler in Walvis Bay?",
   "From Daron Namibia: fresh, chilled, frozen and dry provisions; bonded stores (tobacco, spirits, beer, wine) and SIM cards; deck, engine and cabin stores; safety and survival equipment; technical spares; Hempel coatings; Orlichem cleaning chemicals; and Katradis mooring ropes."),
  ("Can you deliver provisions to a vessel at Walvis Bay anchorage?",
   "Yes. Vessels at Walvis Bay anchorage are supplied by a contracted launch operator, coordinated with the ship's agent and port clearance, 24/7 including weekends and public holidays. Bonded stores can be delivered at anchorage too. Vessels alongside are supplied by our own trucks."),
  ("How quickly can I get a quote from Daron Namibia?",
   "[CONFIRM: e.g. 'Most requisitions are quoted the same working day.'] Send your list, with IMPA codes if you have them, to dnoperations@daron-group.com or on WhatsApp. Offshore RFQs are handled 24/7."),
  ("How do I send a requisition to Daron Namibia?",
   "Email it to dnoperations@daron-group.com or send it on WhatsApp to Hein (+264 81 129 6407) or Marco (+264 81 203 6751). Include the vessel name, ETA, berth or anchorage, agent, item list with quantities, and the delivery deadline."),
 ],
 service=service("Ship chandler, Walvis Bay","Ship chandler",
   "Ship chandler in Walvis Bay, Namibia (formerly Walvis Bay Ship Chandlers): provisions, bonded stores, deck, engine and cabin stores, delivered quayside, at anchorage by launch and offshore, 24/7.",
   area=[{"@type":"City","name":"Walvis Bay"},{"@type":"City","name":"Lüderitz"},{"@type":"Country","name":"Namibia"}],
   extra={"hasOfferCatalog":{"@type":"OfferCatalog","name":"Ship chandlery","itemListElement":[
     {"@type":"OfferCatalog","name":n} for n in ["Provisions","Bonded stores","Deck stores","Engine stores","Cabin stores","Safety and survival equipment"]]}}),
 links=["Link from the home page \"Marine chandlery\" card (already points here).",
        "Link to `/services/anchorage-launch-delivery`, `/ports-we-serve`, `/services/marine-paint-namibia` and `/services/industrial-cleaning-chemicals` from the body."]))

# ---------------- 2 ANCHORAGE ----------------
pages.append(dict(file="02-anchorage-launch-delivery.md", name="Page 2: Anchorage and launch delivery",
 slug="/services/anchorage-launch-delivery", route="src/app/[locale]/services/anchorage-launch-delivery/page.tsx (new)",
 title="Anchorage & Launch Delivery, Walvis Bay | Daron Namibia",
 desc="Provisions, stores and spares delivered by launch to vessels at Walvis Bay anchorage, coordinated with your agent and customs. Send your requisition.",
 h1="Anchorage and launch delivery to vessels at Walvis Bay", eyebrow="Anchorage delivery · Walvis Bay",
 crumb="Home › Services › Anchorage and launch delivery", image="/images/site/operations/daron-fleet-orange-vessel.jpg",
 notes=["Main buyer queries this page targets: \"vessel provisions Walvis Bay anchorage\" and \"launch delivery Walvis Bay\". NSC is #1 for these today, partly because it says \"anchorage via launch services\" explicitly.",
        "Confirmed by Luther (6 Oct 2026): launches are run by a contracted operator (do not name them); deliveries are 24/7 including weekends and public holidays; bonded stores go out at anchorage; anchorage deliveries need 48 hours' notice; Lüderitz is supplied by road from Walvis Bay with a 48-hour lead time."],
 body=f"""
**Intro**
Daron Namibia delivers provisions, stores and spares to vessels at Walvis Bay anchorage. We pack and label the order in our Walvis Bay warehouse, clear it with customs where needed, and our contracted launch operator delivers it to the vessel. We deliver 24/7, including weekends and public holidays. The delivery is coordinated with the ship's agent and port clearance.

### How an anchorage delivery works
1. **Requisition:** send the list to {EMAIL} or on WhatsApp ({WA}), with the vessel name, IMO number, anchorage position, ship's agent and the required delivery window.
2. **Confirmation:** we confirm price, availability and the delivery plan, including the launch time. Notice needed: 48 hours.
3. **Packing:** goods are packed and labelled for the vessel in our Walvis Bay warehouse. [CONFIRM: if you pack by department (provisions, bonded, deck, engine, cabin), say so.] Chilled and frozen goods stay in the cold chain until loading.
4. **Clearance:** we clear bonded stores with customs in-house, and coordinate port clearance with your agent.
5. **Launch transfer:** our contracted launch operator takes the order out to the vessel.
6. **Hand-over:** the vessel signs the delivery note on receipt.

### What we can deliver at anchorage
Fresh, chilled, frozen and dry provisions; bonded stores (tobacco, spirits, beer and wine) and SIM cards; deck, engine and cabin stores; spares and technical items; Hempel paint; Orlichem chemicals; mooring ropes; and safety equipment. [CONFIRM: any limit on the weight or size of a single launch delivery, e.g. pallets, drums or rope coils, and how larger items are handled.]

### Weather and sea state
Launch transfers depend on wind, swell and the launch master's decision. If conditions close the transfer window, we hold the order in controlled storage and rebook the delivery with your agent.

### Lüderitz and offshore
- **Lüderitz:** we supply vessels at Lüderitz by road from Walvis Bay. Lead time: 48 hours.
- **Offshore:** for drilling rigs, FPSOs and offshore units in Namibian waters, we stage documented loads for the operator's supply vessel. See [Ports we serve](/ports-we-serve).

### Cost
[CONFIRM: how launch hire is charged, e.g. "included in the delivery" or "charged at cost and shown on the quote". Delete this section if you prefer not to say.]

**Hours:** anchorage deliveries run 24/7, including weekends and public holidays. The office is open Monday to Friday, 08:00–17:00 CAT.
""",
 faqHeading="Anchorage delivery at Walvis Bay: common questions",
 faqs=[
  ("Can I get provisions delivered to my vessel at Walvis Bay anchorage?",
   "Yes. Daron Namibia supplies vessels at Walvis Bay anchorage using a contracted launch operator, coordinated with the ship's agent and port clearance, 24/7 including weekends and public holidays. Provisions, bonded stores, spares, paint and chemicals can all go out on the same delivery."),
  ("Which ship chandler in Walvis Bay delivers by launch?",
   "Daron Namibia (formerly Walvis Bay Ship Chandlers) delivers to vessels at Walvis Bay anchorage by contracted launch, and alongside the quay with its own trucks, 24/7 including weekends and public holidays."),
  ("How much notice do you need for an anchorage delivery?",
   "We need 48 hours' notice. Send the requisition at least 48 hours before the delivery window, with the anchorage position and your agent's details."),
  ("Can bonded stores be delivered to a vessel at anchorage?",
   "Yes. Daron Namibia supplies bonded stores (tobacco, spirits, beer and wine) and SIM cards to vessels at Walvis Bay anchorage. We clear them with customs in-house and deliver them by launch with the rest of the order."),
  ("Do you deliver to vessels at Lüderitz?",
   "Yes. Daron Namibia supplies vessels at Lüderitz by road from Walvis Bay. Lead time: 48 hours."),
  ("What happens if the weather stops the launch?",
   "Launch transfers depend on wind, swell and the launch master's decision. If the window closes, we hold the order in controlled storage, including chilled and frozen goods, and rebook the delivery with your agent."),
 ],
 service=service("Anchorage and launch delivery, Walvis Bay","Ship supply delivery to vessels at anchorage",
   "Provisions, stores and spares delivered by launch to vessels at Walvis Bay anchorage, coordinated with the ship's agent and customs.",
   area=[{"@type":"Place","name":"Port of Walvis Bay anchorage"},{"@type":"City","name":"Walvis Bay"},{"@type":"Country","name":"Namibia"}]),
 links=["Link from `/services/ship-chandlery` (the Anchorage delivery card), `/ports-we-serve`, `/services` and the FAQ page."]))

# ---------------- 3 HEMPEL ----------------
pages.append(dict(file="03-hempel-marine-paint-namibia.md", name="Page 3: Hempel marine paint and protective coatings in Namibia",
 slug="/services/marine-paint-namibia", route="src/app/[locale]/services/marine-paint-namibia/page.tsx (new)",
 title="Hempel Marine Paint & Coatings in Namibia | Daron Namibia",
 desc="Daron Namibia in Walvis Bay is the official Hempel distributor for Namibia: marine paint, antifouling and protective coatings, with technical support.",
 h1="Hempel marine paint and protective coatings in Namibia", eyebrow="Marine paint · Hempel distributor · Namibia",
 crumb="Home › Services › Marine paint in Namibia", image="/images/site/drydock/case-study-hempel-bow.jpg",
 notes=["This is the generic *category* page (\"marine paint Namibia\", where Daron is only 5th). `/brands/hempel` stays as the product-range and catalogue page. The two pages link to each other. `/services/coatings` (surface prep plus Hammelmann) links here as well.",
        "Wording confirmed by Luther (6 Oct 2026): say \"official Hempel distributor\" only. **Never call Daron an \"exclusive\" Hempel distributor.** Hempel's own Distributors Africa page lists DARON NAMIBIA as its Namibia entry. The live site still says \"exclusive\" for Hempel in several places; CLAUDE_BRIEF.md tells Claude to remove it.",
        "Add an outbound link to Hempel's official site (https://www.hempel.com) on this page and on `/brands/hempel` (audit check #37)."],
 body=f"""
**Intro**
Daron Namibia is the official Hempel distributor for Namibia, based in Walvis Bay. We supply Hempel marine paint, antifouling and protective coatings for vessels, dry-dock projects, offshore structures, mines and industrial sites. We launched the Hempel partnership in Walvis Bay on 12 December 2024. Hempel's own distributor directory lists Daron Namibia as its distributor in Namibia.

### About Hempel
Hempel is a Danish coatings manufacturer founded in 1915. It operates in more than 80 countries. Its marine systems are specified worldwide for hull protection, fouling control and corrosion protection.

### What we supply
- **Antifouling and self-polishing hull coatings:** SPC and silyl-acrylate systems, including the Globic, Sonic, Dynamic and Oceanic+ families.
- **Fouling-release and biocide-free systems:** Hempaguard, Hempasil and Silic One.
- **Anticorrosive and protective coatings:** Avantguard activated zinc, Quattro XO epoxy and Galvosil zinc silicate, for steel in marine, offshore and infrastructure service.
- **Passive fire protection:** Hempafire and Hempacore intumescent coatings.
- **Tank, cargo and ballast linings:** Hempaline linings for cargo holds, ballast tanks and process vessels.
- **Primers and topcoats** to complete each system.

### Who we supply
- Vessels calling at Walvis Bay, including fishing and offshore vessels.
- Dry-dock and ship-repair projects in Walvis Bay.
- Oil and gas, mining, energy and infrastructure assets in Namibia.

### Stock, colours and delivery
[CONFIRM: which Hempel ranges you keep in stock in Walvis Bay; whether you can tint or colour-match (e.g. a tinting machine on site); pack sizes; and typical lead time for non-stock items ordered from Hempel.]
We deliver to vessels alongside and at anchorage in Walvis Bay, 24/7, by road to Lüderitz, to the dry dock, and to sites in Namibia. [CONFIRM: other inland towns and mine sites, and how.]

### Technical support
Send us the asset, the substrate, the existing coating, the exposure conditions, the surface area and the work window. We will propose a Hempel system with product data sheets. [CONFIRM: is coating inspection or specification support available (the November 2024 LinkedIn post mentions "qualified NACE inspectors")? If yes, say who provides it: Daron, Hempel or the Daron Group.]

### How to order
Email {EMAIL} or {TECH}, WhatsApp {WA}, or call {PHONE}. Include product names or the specification, quantities, colours and the delivery date. Product brochures are on the [Hempel brand page](/brands/hempel).

### Proof
- Hull coating refurbishment: a vessel bow with heavy rust and fouling, prepared and coated with Hempel systems by the Daron technical team (see [Track record](/track-record)).
""",
 faqHeading="Hempel and marine paint in Namibia: common questions",
 faqs=[
  ("Who is the Hempel paint distributor in Namibia?",
   "Daron Namibia, based at No. 31 Grand Avenue, Industrial Area, Walvis Bay, is the official Hempel distributor for Namibia. Contact +264 83 337 4710 or dnoperations@daron-group.com."),
  ("Where can I buy marine paint in Walvis Bay?",
   "Daron Namibia in Walvis Bay supplies Hempel marine paint, antifouling and protective coatings, and delivers to vessels alongside, at anchorage and at the dry dock."),
  ("Do you keep Hempel antifouling in stock in Walvis Bay?",
   "[CONFIRM: e.g. 'Yes, we keep core antifouling and primer lines in Walvis Bay; other products are ordered from Hempel, typically in X weeks.']"),
  ("Can you help choose the right Hempel coating system?",
   "Yes. Send us the asset, substrate, existing coating, exposure conditions, surface area and work window, and we will propose a Hempel system with product data sheets. [CONFIRM: add inspection support if available.]"),
  ("Do you supply protective coatings for mines and industrial sites in Namibia?",
   "Yes. We supply Hempel anticorrosive, protective and passive fire protection coatings for mining, energy, oil and gas, and infrastructure assets in Namibia. [CONFIRM: inland delivery.]"),
  ("Is Daron Namibia an official Hempel distributor?",
   "Yes. Daron Namibia is the official Hempel distributor for Namibia, and Hempel's distributor directory lists it as its Namibia distributor. The partnership was launched in Walvis Bay on 12 December 2024."),
 ],
 service=service("Hempel marine paint and protective coatings, Namibia","Marine and protective coatings distribution",
   "Official Hempel distributor for Namibia: marine paint, antifouling, fouling-release, anticorrosive and fire-protection coatings, supplied from Walvis Bay.",
   area={"@type":"Country","name":"Namibia"},
   extra={"brand":{"@type":"Brand","name":"Hempel","url":"https://www.hempel.com"}}),
 links=["Two-way link with `/brands/hempel` (\"Marine paint in Namibia: stock, delivery and support\").",
        "Link from `/services/coatings`, `/services/dry-dock` and the ship-chandlery page."]))

# ---------------- 4 ORLICHEM ----------------
pages.append(dict(file="04-industrial-cleaning-chemicals-namibia.md", name="Page 4: Industrial cleaning and degreasing chemicals in Namibia (Orlichem)",
 slug="/services/industrial-cleaning-chemicals", route="src/app/[locale]/services/industrial-cleaning-chemicals/page.tsx (new)",
 title="Industrial Cleaning Chemicals in Namibia | Daron Namibia",
 desc="Industrial degreasers, CIP, galley, laundry and marine cleaning chemicals in Namibia. Daron Namibia is the exclusive Orlichem distributor, in Walvis Bay.",
 h1="Industrial cleaning and degreasing chemicals in Namibia", eyebrow="Cleaning chemicals · Orlichem · Namibia",
 crumb="Home › Services › Industrial cleaning chemicals", image="/images/site/drydock/case-study-orlichem-deck.jpg",
 notes=["Generic category page for \"industrial cleaning chemicals Namibia\". Daron is not in the top 5 for this query today; Sentratek, Cernol/SWACO and Taurus are. `/brands/orlichem` stays as the brand and catalogue page; link both ways.",
        "\"Exclusive Orlichem distributor\" is already stated on the live site. Keep it.",
        "Add an outbound link to Orlichem's official site [CONFIRM: correct URL; the audit used orlichem.co.za] on this page and on `/brands/orlichem`.",
        "The 9 Orlichem PDFs linked from `/brands/orlichem` still show the old WBSC name and address (see CLAUDE_BRIEF.md). Fix them before or together with this page."],
 body=f"""
**Intro**
Daron Namibia supplies industrial cleaning and degreasing chemicals across Namibia from Walvis Bay. We are the exclusive Namibian distributor for Orlichem, a South African speciality-chemical manufacturer established in 2008 and certified to ISO 9001 and by Intertek. Orlichem's range covers degreasers, clean-in-place (CIP) chemicals, metal treatment, galley and laundry products, hand hygiene and marine chemicals. We hold the range locally, so most orders do not have to wait for an import.

### Product ranges
- **Engineering and industrial degreasers:** water-based and solvent-based degreasers for workshops, plant, vehicles and marine engine rooms. Products include Wipe Out (SANS 1828 food-approved), CSM, Degrasol and Eco-Solve.
- **Clean-in-place (CIP):** Acid CIP and Alkaline CIP LF circulation cleaners for food, beverage and fish-processing plants.
- **Metal treatment:** corrosion control, degreasing and pickling and passivation.
- **Marine vessel chemicals:** engine-room and air-system cleaning, boiler and evaporator treatment, fuel treatment, ballast and potable-water treatment, corrosion control and oil-spill dispersant.
- **Galley and kitchen:** HACCP-compliant, EN 1276-certified kitchen degreasers, sanitisers and dishwash products.
- **Laundry:** Atom Wash, AquaTerge Ultra and Atom Soft laundry systems.
- **Housekeeping and hand hygiene:** floor care, general-purpose cleaners, odour control and EN 1276-certified hand care.

### Who we supply
Vessels and fishing fleets; ship-repair and dry-dock projects; engineering workshops and manufacturers; food-processing plants (CIP); hospitality and institutional sites; and offshore and remote-site operations.

### Cleaning work we support
Orlichem chemicals are used in Daron's own work, for example for deck cleaning on a working vessel and for mould treatment during the 11-day Sapura Berani rig reactivation. For high-pressure cleaning and surface preparation, we also supply [Hammelmann water-jetting systems](/brands/hammelmann).

### Safety data, packs and delivery
- Safety data sheets (SDS) and technical data sheets: [CONFIRM: available on request for every product? If yes, say so.]
- Pack sizes: [CONFIRM: e.g. 5 L, 25 L and 200 L, or 1,000 L IBC on request.]
- Delivery: to vessels in Walvis Bay (alongside and at anchorage, 24/7), by road to Lüderitz, and to sites in Namibia [CONFIRM: other towns and regions you deliver to, e.g. Swakopmund, Windhoek, mine sites, and lead times].
- Dosing equipment, site surveys or user training: [CONFIRM: offered or not.]

### How to order
Email {EMAIL}, WhatsApp {WA}, or call {PHONE}. Tell us the application (what you clean, the soil type and the surface), the volumes and the delivery location. Brochures for every range are on the [Orlichem brand page](/brands/orlichem).
""",
 faqHeading="Industrial cleaning chemicals in Namibia: common questions",
 faqs=[
  ("Where can I buy industrial degreasers in Namibia?",
   "Daron Namibia in Walvis Bay supplies industrial degreasers from Orlichem, including Wipe Out, CSM, Degrasol and Eco-Solve, for workshops, plant, vehicles and marine engine rooms. [CONFIRM: delivery areas.]"),
  ("Who distributes Orlichem chemicals in Namibia?",
   "Daron Namibia is the exclusive Namibian distributor for Orlichem, a South African speciality-chemical manufacturer certified to ISO 9001 and by Intertek."),
  ("Do you supply CIP chemicals for food and fish-processing plants in Namibia?",
   "Yes. We supply Orlichem Acid CIP and Alkaline CIP LF circulation cleaners, plus HACCP-compliant, EN 1276-certified sanitisers, for food, beverage and fish-processing plants."),
  ("Is there a food-safe degreaser available in Namibia?",
   "Yes. Orlichem Wipe Out is SANS 1828 food-approved, and the Orlichem kitchen range is HACCP compliant and EN 1276 certified. Daron Namibia supplies both from Walvis Bay."),
  ("Can I get safety data sheets for your cleaning chemicals?",
   "[CONFIRM: 'Yes. We supply SDS and technical data sheets for every product on request.']"),
  ("Which marine cleaning chemicals do you supply to ships in Walvis Bay?",
   "Engine-room and air-system cleaners, boiler and evaporator treatment, fuel treatment, ballast and potable-water treatment, corrosion control and oil-spill dispersant from Orlichem, delivered alongside or at anchorage."),
 ],
 service=service("Industrial cleaning and degreasing chemicals, Namibia","Industrial and marine cleaning chemical supply",
   "Exclusive Orlichem distributor for Namibia: industrial degreasers, CIP, metal treatment, marine, galley, laundry and hygiene chemicals, supplied from Walvis Bay.",
   area={"@type":"Country","name":"Namibia"},
   extra={"brand":{"@type":"Brand","name":"Orlichem"}}),
 links=["Two-way link with `/brands/orlichem`. Link from `/services/coatings`, `/services/dry-dock`, `/solutions/remote-site-supply` and the ship-chandlery page."]))

# ---------------- 5 PORTS ----------------
pages.append(dict(file="05-ports-we-serve.md", name="Page 5: Ports we serve",
 slug="/ports-we-serve", route="src/app/[locale]/ports-we-serve/page.tsx (new)",
 title="Ports We Serve: Walvis Bay, Lüderitz & Offshore | Daron",
 desc="Daron Namibia supplies vessels at Walvis Bay (alongside and at anchorage), at Lüderitz by road, and offshore rigs in Namibian waters, 24/7.",
 h1="Ports and locations we serve in Namibia", eyebrow="Ports we serve",
 crumb="Home › Ports we serve", image="/images/site/operations/normand-energy-wide.jpg",
 notes=["Lüderitz confirmed by Luther (6 Oct 2026): supplied by road from Walvis Bay, 48-hour lead time. Anchorage deliveries need 48 hours' notice.",
        "Add this page to the footer sitemap list. A header link is optional (see the brief)."],
 body=f"""
**Intro**
Daron Namibia supplies vessels and offshore units from its base at {ADDR}. We deliver 24/7, including weekends and public holidays. The table shows where we deliver and how.

| Location | UN/LOCODE | How we deliver | Typical lead time |
|---|---|---|---|
| Port of Walvis Bay, alongside | NAWVB | Our own trucks to the berth, 24/7 | [CONFIRM: alongside lead time] |
| Walvis Bay anchorage | NAWVB | Contracted launch operator, coordinated with your agent, 24/7 | 48 hours' notice |
| Lüderitz | NALUD | By road from Walvis Bay | 48 hours |
| Offshore Namibia (rigs, FPSOs, offshore units) | n/a | Staged loads for the operator's supply vessel | [CONFIRM: offshore lead time] |

### Walvis Bay
Walvis Bay is our home port. Our warehouse, cold store, bonded store and delivery fleet are based in the Walvis Bay Industrial Area. We supply vessels alongside, at anchorage (see [Anchorage and launch delivery](/services/anchorage-launch-delivery)) and in the dry dock (see [Dry-dock support](/services/dry-dock)).

### Offshore Namibia
Our first offshore engagement was the Transocean Marianas in 2013. Over a two-year campaign we supplied the Deepsea Mira, Deepsea Bollsta and Deepsea Hercules, including more than eight months supplying all three rigs at once. We pack, document and stage consolidated loads for the operator's supply vessels from Walvis Bay. See [Oil and gas](/industries/oil-and-gas).

### Lüderitz
We supply vessels at the Port of Lüderitz by road from Walvis Bay. Send the requisition the same way as for Walvis Bay, with the vessel's ETA at Lüderitz. Lead time: 48 hours.

### Elsewhere in Namibia
We deliver Hempel coatings, Orlichem chemicals and safety equipment to industrial and mine sites inland. [CONFIRM: regions and towns served.]

### Vessels heading to other African ports
Daron Group companies operate in other African countries, including South Africa, Angola, Mozambique and the Republic of the Congo. If your vessel's next port is outside Namibia, tell us, and we will put you in touch with the right group company. [CONFIRM: final list of group countries; the site currently says 7, 8 and 15 in different places.]
""",
 faqHeading="Ports and coverage: common questions",
 faqs=[
  ("Which Namibian ports does Daron Namibia serve?",
   "Daron Namibia serves the Port of Walvis Bay (alongside and at anchorage), the Port of Lüderitz (by road from Walvis Bay), and offshore rigs and units in Namibian waters. Deliveries run 24/7, including weekends and public holidays."),
  ("Is there a ship chandler that supplies Lüderitz?",
   "Yes. Daron Namibia supplies vessels at Lüderitz by road from Walvis Bay. Lead time: 48 hours."),
  ("Do you supply offshore drilling rigs off Namibia?",
   "Yes. Daron Namibia has supplied offshore rigs since its first offshore engagement in 2013. In Namibia it supplied the Deepsea Mira, Deepsea Bollsta and Deepsea Hercules, with more than eight months supplying all three at once."),
  ("Where is Daron Namibia located?",
   "No. 31 Grand Avenue, Industrial Area, Walvis Bay, Namibia. Phone +264 83 337 4710, email dnoperations@daron-group.com. The office is open Monday to Friday, 08:00–17:00 CAT; deliveries run 24/7, including weekends and public holidays."),
  ("Can you deliver to vessels at Walvis Bay anchorage?",
   "Yes. Vessels at Walvis Bay anchorage are supplied by a contracted launch operator, coordinated with the ship's agent and port clearance, 24/7."),
 ],
 service=service("Ship supply, ports served in Namibia","Ship chandler",
   "Ship supply from Walvis Bay to vessels alongside and at anchorage at the Port of Walvis Bay, by road to the Port of Lüderitz, and to offshore units in Namibian waters.",
   area=[{"@type":"Place","name":"Port of Walvis Bay (NAWVB)"},{"@type":"Place","name":"Port of Lüderitz (NALUD)"},{"@type":"Place","name":"Offshore Namibia"},{"@type":"Country","name":"Namibia"}]),
 links=["Link from the FAQ answer \"Where are you based and which ports do you serve?\" (update that answer to match this page).",
        "Link from the ship-chandlery, anchorage and oil-and-gas pages."]))

for p in pages: render(p)
# length check
for p in pages:
    print(p['file'], len(p['title']), len(p['desc']))
