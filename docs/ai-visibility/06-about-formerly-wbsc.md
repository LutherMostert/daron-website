# About page addition: "Formerly Walvis Bay Ship Chandlers"

> **Status:** draft copy, written 6 Oct 2026. Anything in **[CONFIRM: …]** must be answered by Luther, then filled in or deleted before it ships.

**Where it goes:** `src/app/[locale]/about/page.tsx` and the `About` and `Meta` namespaces in `messages/en.json` (plus pt/fr). Add a new **"Our history"** section straight after the existing "The story" section, and a **"Company facts"** block before Certifications.

## 1. Fix the current story paragraph (it contradicts the rest of the site)

The live `About.storyP1` says Daron Namibia "was founded in 2012 as the Namibian presence of the Daron Group". The chandlery page, the FAQ, the JSON-LD and Luther's LinkedIn all say the company was founded in 2012 as **Walvis Bay Ship Chandlers** and joined the Daron Group later. AI assistants notice contradictions like this. Replace `storyP1` with:

> Daron Namibia was founded in Walvis Bay in {founded} as Walvis Bay Ship Chandlers (WBSC). The company later joined the Daron Group, a family-owned marine supply group that has operated in Africa since 1959, and now trades as Daron Namibia. Through the group we work alongside Daron companies in [CONFIRM: final country list. The page currently names Namibia, South Africa, Angola, Senegal, Mozambique, Congo and Côte d'Ivoire (7), while the stat band says 8 and daron-group.com says 15].

Also fix the stat band so that `stat2Value` matches the number of countries named in the text. [CONFIRM: one figure for countries and one for group staff, used everywhere.]

## 2. New section: "Our history"

**Eyebrow:** Our history
**H2:** Formerly Walvis Bay Ship Chandlers

**Body:**

Daron Namibia (Pty) Ltd, legal name Daron Trading Namibia (Pty) Ltd, was founded in Walvis Bay in 2012 as **Walvis Bay Ship Chandlers (WBSC)**. It started in a small office on 6th Street and grew into a ship chandler and logistics supplier for vessels and offshore rigs on the Namibian coast.

The Daron Group invested in the company in [CONFIRM: year; the audit cites 2023 from the Daron Group history]. At the end of 2024 we completed the change of name from Walvis Bay Ship Chandlers to **Daron Namibia**. The company, the team and the Walvis Bay operation stayed the same. Only the name changed. Clients, suppliers and directories that know us as WBSC are dealing with the same business.

**Milestones** (render as a short timeline or list):
- **2012:** Walvis Bay Ship Chandlers founded in Walvis Bay.
- **2013:** First offshore engagement, supplying the Transocean Marianas.
- **[CONFIRM: year]:** Daron Group invests in WBSC.
- **[CONFIRM: year]:** Exclusive Namibian distributor for Orlichem cleaning and marine chemicals.
- **[CONFIRM: year]:** Two-year offshore campaign supplying the Deepsea Mira, Deepsea Bollsta and Deepsea Hercules, including more than eight months supplying all three rigs at once.
- **[CONFIRM: year]:** Sapura Berani rig reactivated in 11 days with catering partner Pellegrini.
- **12 December 2024:** Hempel partnership launched in Walvis Bay. Daron Namibia becomes Hempel's distributor for Namibia.
- **End of 2024:** Rename from Walvis Bay Ship Chandlers to Daron Namibia completed.
- **[CONFIRM: year]:** Exclusive Namibian distributor for Hammelmann high-pressure pumps and water-jetting systems.
- **[CONFIRM: year]:** Moved to No. 31 Grand Avenue, Industrial Area, Walvis Bay. (Old listings still show 10 Gamsberg Avenue, 82 Hanna Mupetami Road and Circumferential Road. If the company was at those addresses, saying "previously at …" here helps AI connect the old listings to Daron. [CONFIRM: which old addresses were real company premises.])

**Closing line:** If you have worked with Walvis Bay Ship Chandlers, you are already a Daron client. Our phone number, +264 83 337 4710, has not changed. Old wbsc.com.na email addresses now go to [CONFIRM: forwarding is set up for operations@ and contact@wbsc.com.na], and the main address is now dnoperations@daron-group.com.

## 3. New block: "Company facts"

Render as a two-column definition list. It is plain, scannable and easy for AI assistants to quote.

| Fact | Value |
|---|---|
| Trading name | Daron Namibia |
| Legal name | Daron Trading Namibia (Pty) Ltd |
| Former name | Walvis Bay Ship Chandlers (Pty) Ltd (WBSC) |
| Founded | 2012, Walvis Bay, Namibia |
| Company registration no. | [CONFIRM: e.g. 2012/0895 (an old WBSC listing shows this; check whether it is still the registration number after the rename)] |
| Parent group | Daron Group (since 1959) |
| Managing Director | Luther Mostert |
| Address | No. 31 Grand Avenue, Industrial Area, Walvis Bay [CONFIRM: postal code 9000], Erongo Region, Namibia |
| Phone | +264 83 337 4710 |
| Email | dnoperations@daron-group.com · namtechnical@daron-group.com |
| Office hours | Monday to Friday, 08:00–17:00 CAT; offshore RFQs 24/7 on WhatsApp |
| Ports served | Walvis Bay (alongside and anchorage), offshore Namibia [CONFIRM: Lüderitz] |
| Distributor for | Hempel (official Namibia distributor) · Orlichem (exclusive) · Hammelmann (exclusive) · Honeywell · Blackline Safety · Industrial Scientific · Katradis (enquiries) |
| Certifications | ISO 9001:2015 [CONFIRM: certificate number and certification body] · HACCP [CONFIRM: certifying body] |
| Memberships | ISSA [CONFIRM: member number, or change "listed" to the correct status] · IMPA [CONFIRM: member number or profile URL] |
| Staff in Namibia | [CONFIRM: e.g. 51 (the internal organigram in CLAUDE.md lists 51 people). Publish only if Luther agrees.] |
| Facilities | Warehouse with refrigerated, freezer, dry and bonded storage; in-house butchery; own branded delivery fleet [CONFIRM: warehouse m² and number of vehicles if you want to publish them] |

## 4. Optional leadership line (audit fix #9)

> **Leadership:** Luther Mostert, Managing Director · [CONFIRM: other names and titles to publish, e.g. Hein Behnke, Commercial Manager; Yolande Kuhn, General Manager].

## 5. Meta updates for /about

- **SEO title (55 chars):** `About Daron Namibia, formerly Walvis Bay Ship Chandlers` (render with `titleAbsolute: true`)
- **Meta description (150 chars):** `Daron Namibia was founded in Walvis Bay in 2012 as Walvis Bay Ship Chandlers (WBSC) and is now part of the Daron Group. Company history and key facts.`
- **H1:** keep the PageHero title, but make it descriptive: `About Daron Namibia, formerly Walvis Bay Ship Chandlers`. Move the current "From ship chandler to full-service partner" into the eyebrow or intro.

## 6. Footer line (all pages)

Add under the footer tagline (new message key `Footer.formerly`):

> Daron Namibia (Pty) Ltd, formerly Walvis Bay Ship Chandlers

Also change the Facebook link label from "Walvis Bay Ship Chandlers on Facebook" to "Daron Namibia (formerly Walvis Bay Ship Chandlers) on Facebook", if that label exists in the page data.
