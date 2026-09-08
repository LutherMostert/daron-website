# Daron website and enquiry redesign

Prepared on 8 September 2026 in branch `codex/premium-rfq-20260908`, based on `origin/main` at `fc4e9ec`.

## Review the work

- Website: http://localhost:3100
- Enquiry form: http://localhost:3100/contact#rfq
- Coatings: http://localhost:3100/services/coatings
- Sample internal email: http://localhost:3101 (fictional example; not sent).

These are local previews. The public website, DNS, production environment variables and mailboxes have not been changed. Live enquiries are not connected to this preview.

The existing checkout is preserved, including its uncommitted `next.config.ts` comment change. No other AI model was called to produce this redesign.

## What changed

- Replaced the dashboard-heavy homepage with a photograph-led design, five clear service routes, project evidence, team imagery and brand links. Existing real operational photos are reused; generated images and simulated live statuses are removed from the homepage.
- Simplified shared navigation and standardized the primary quote action on the locale-aware website form. WhatsApp links identify their destination explicitly. Retained phone and AI assistance routes.
- Put the form before office/contact cards on phones. Added quote/general-enquiry selection, a full-name field, an explicit service choice, default email replies and conditional international phone validation for WhatsApp/calls.
- A real attached requirement can replace the message text. Optional vessel/delivery fields are collapsed. A saved-but-unnotified enquiry shows the reference and contact instructions instead of inviting a duplicate submission.
- Added escaped HTML and plain-text operations emails with customer reply-to, explicit missing information, the original message, contact preference, attachment and local timestamp. General enquiries use ENQ references; quotation requests retain RFQ references.
- Retained attachments in durable storage and forward the full accepted file to email/webhook. Previously only metadata was saved and webhook attachments above 3 MB were omitted.
- Production sending refuses the development `resend.dev` fallback. Existing configured operations recipients and customer Reply-To behavior are preserved.
- Added a localized coatings/surface-preparation page, its sitemap entry and technical-brand routes. New homepage, form and page content are provided in English, French and Portuguese.
- No live prices, delivery promises, certifications or new quantified project outcomes were invented. Existing deeper project claims were not independently re-audited.

## Group integration additions

- New `/group-network` page and homepage section explain sourcing, technical and D-Food connections, with links to the relevant Group pages. Header/footer affiliation links retain the transparent Daron logo treatment.
- New `/solutions` overview and three pages: `/solutions/vessel-reactivation`, `/solutions/planned-maintenance`, `/solutions/remote-site-supply`. Each separates local discussion scope from Group capabilities and attributes its project evidence.
- New `/procurement-resources` page links existing catalogues and service information and provides an onboarding-document request route. It does not publish unverified certificates or claim that a new capability-statement download exists.
- Every catalogue listed on brand/service pages has an Add to enquiry control. Up to ten references persist locally in the browser, with editable product/page notes and quantities. Personal/contact form fields are not stored in this browser list. Users can remove selections; successful submission clears the list. Storage or notification errors retain it.
- The server resolves document titles and paths against its own catalogue directory. Forged URLs, duplicate entries, oversized lists and malformed selections are rejected. References, notes, quantities, source context and optional multiple-location requirements are retained in lead storage, the operations email and the signed webhook payload.
- Group link clicks, catalogue additions and enquiry source are instrumented through the existing optional analytics hook. Production analytics configuration and CRM reporting remain separate release work.
- All new content and form controls are available in English, French and Portuguese.
- `GROUP_HANDOFF.md` contains ready-to-review return links for the Group website. That website has not been changed. Publish the Namibia routes before adding Group return links.

This implements the first recommended phase. Cross-office CRM assignment, shared customer accounts, saved order history, automated photo/document extraction and a customer portal remain future work; they require agreed operating processes and integrations. The present list is a local enquiry aid, not an authenticated account or a stock/pricing system.

## Current validation

Run `pnpm test`, `pnpm lint`, `pnpm build`, then `node scripts/check-preview.mjs`.

Completed: all 18 RFQ tests passed; full lint and production build passed (101 generated pages). Metadata checks passed for 27 new/changed pages across all three languages, and homepage destinations and service anchors resolved. Browser checks cover the new group/solution pages, catalogue selection, editing, removal, retained context across navigation, mobile form layout and the email sample. Language switching retains the enquiry source. Removed an obsolete pre-paint script that caused a React warning on locale changes; content remains visible while optional motion loads.

Tests use isolated mail/storage dependencies, including failure cases and a 3.5 MB attachment. They do not send mail, contact prospects, or write live customer records. The HTML email has a browser preview; Outlook inbox rendering and real delivery remain release checks.

Start previews with `pnpm dev --hostname localhost --port 3100` and `node scripts/preview-email.mjs --serve`. Use localhost consistently: mixed localhost/127.0.0.1 development hosts can cause next-intl redirect loops. Native dependencies use their supplied platform binaries; install scripts remain explicitly disabled.

## Before production release

1. Review the design and provide authority to publish. Do not merge or push main just to obtain a preview.
2. Reconnect the Vercel app (the connector currently reports reauthentication required), confirm this repository's production project and inspect configured sender/recipient names without exposing secrets.
3. Confirm a Daron sending address on a Resend-verified domain and set `RFQ_FROM_EMAIL` or `RESEND_EMAIL_DOMAIN`. The sample does not establish domain verification. Do not change existing Microsoft 365 inbound MX records to configure outbound mail.
4. Verify the production Redis plan accepts a persisted 4 MB file plus base64 overhead and the webhook accepts the full payload. If the configured services have smaller limits, reduce the visible limit or use private file storage; do not silently discard attachments. Confirm the configured recipient is the intended operations inbox.
5. With explicit authority for an internal test email, test end-to-end delivery, attachment opening, normal Outlook Reply behavior, the saved-error reference, and international phone routing. Resend API acceptance alone does not establish inbox delivery.
6. Deploy a preview/release through the confirmed hosting project and check desktop/mobile, all three languages, canonical URLs and the live request path before promoting production.

Known limit: an indeterminate network interruption can occur after the server stores a request. The UI advises contacting operations before retrying; this change does not implement cross-session idempotency, a delivery dashboard, or an automated outbox retry worker.
