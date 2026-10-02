import { WhatsAppLinks } from "@/components/WhatsAppLinks";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { QuoteLink } from "@/components/QuoteLink";
import { contact } from "@/lib/site";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({ locale, path: "/contact", title: t("contactTitle"), description: t("contactDescription") });
}
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("Intake"); const office = await getTranslations("Contact"); const email = await getTranslations("QuoteEmail");
  return <section className="premium-contact"><Container className="premium-contact-grid">
    <div className="premium-contact-intro"><p className="premium-eyebrow">{t("eyebrow")}</p><h1>{t("title")}</h1><p className="premium-lead">{t("intro")}</p>
      <div className="contact-direct"><p className="premium-eyebrow">{t("urgentTitle")}</p><a href={contact.phone.href}>{contact.phone.display}</a><WhatsAppLinks className="contact-whatsapp" showNumber /><p>{t("directHint")}</p></div>
      <div className="contact-office"><h2>{office("officeHeading")}</h2><address>{contact.address.line1}<br />{contact.address.line2}, {contact.address.city}<br />{office("hoursValue")}</address><a href={`mailto:${contact.emails.operations}`}>{contact.emails.operations}</a><a href={`mailto:${contact.emails.technical}`}>{contact.emails.technical}</a></div>
    </div>
    <div id="rfq" className="premium-form-panel"><p className="premium-eyebrow">{t("formEyebrow")}</p><h2>{email("heading")}</h2><p className="mb-7 mt-3 text-sm leading-6 text-slate-600">{email("intro")}</p><QuoteLink className="premium-button">{email("button")} →</QuoteLink><p className="mt-6 text-sm leading-6 text-slate-600">{email("hint")}</p><a href={`mailto:${contact.emails.operations}`} className="mt-3 block break-all font-semibold text-[var(--color-accent-text)] underline underline-offset-4">{contact.emails.operations}</a></div>
  </Container></section>;
}
