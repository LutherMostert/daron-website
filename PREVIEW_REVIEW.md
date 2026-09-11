# Daron immersive design preview

This branch is a Vercel PREVIEW ONLY. Do not merge or promote it to production.
Base: published commit f7dfc151307d03f8341901321ea35ac081ee371e.

## Review scope

- English homepage concept with offshore photography and the user-confirmed rig story.
- Honeywell Flex 5 showroom: four genuine manufacturer views, zoom, specifications and PDF.
- Equipment and group capability selections flow into an editable enquiry form.
- Form validates fields and attachments and formats an RFQ review. It never stores leads,
  sends email, invokes AI or delivers webhooks. Chat routes return 503 in this branch.
- Existing supporting pages and French/Portuguese layouts remain available for reference;
  the new homepage concept is English for this first review.
- Robots disallow and HTTP noindex apply to the entire branch.

## Asset provenance

Source pack supplied by Luther: Daron Website / wetransfer_ppsv-marketing-material_2026-05-18_1420.
Product views: BW Flex 5 / Flex5-4-Hero-1.png, Flex5-4-Front.png, Flex5-4-Back.png,
Flex5-4-Right.png. Original files copied intact, displayed with CSS containment.
Datasheet: Portable Gas Detection / hon-ia-imc-flex-5-datasheet-en-30apr2026.pdf.
Only high-level series capabilities are displayed. The source contains apparent anomalies
in its logged-information/weight row and pending-approval wording; these are not copied into
the page. Suitability, exact sensor combinations, availability and lead time require confirmation.
Video: Daron Website / seven 4.mp4, copied intact; loads on user action, muted by default.
Rig photographs and partner logos reuse the previously published, reviewed website assets.
Campaign claim: two-year total project; more than eight months supplying all three rigs
simultaneously. Deepsea Mira, Deepsea Bollsta and Deepsea Hercules.

## Verification

Production build and TypeScript; ESLint; browser desktop and mobile review.
RFQ tests cover required fields, valid preview, WhatsApp number requirement, valid and
invalid PDF uploads, disabled chat endpoints, supporting routes and noindex headers.
No delivery-to-inbox claim is made for this preview: external dispatch is intentionally absent.

## Before a future production release

Port the approved UI into a fresh production-based branch with the production integrations.
Do not carry over these preview endpoint replacements or noindex rules. Localize the new
experience, confirm product commercial scope and verify a specifically agreed live test enquiry.
