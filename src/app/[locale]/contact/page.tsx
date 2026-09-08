import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { contact } from "@/lib/site";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({ locale, path: "/contact", title: t("contactTitle"), description: t("contactDescription") });
}
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("Intake"); const office = await getTranslations("Contact");
  return <section className="premium-contact"><Container className="premium-contact-grid">
    <div className="premium-contact-intro"><p className="premium-eyebrow">{t("eyebrow")}</p><h1>{t("title")}</h1><p className="premium-lead">{t("intro")}</p>
      <div className="contact-direct"><p className="premium-eyebrow">{t("urgentTitle")}</p><a href={contact.phone.href}>{contact.phone.display}</a><a className="contact-whatsapp" href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer">{t("whatsapp")} ↗</a><p>{t("directHint")}</p></div>
      <div className="contact-office"><h2>{office("officeHeading")}</h2><address>{contact.address.line1}<br />{contact.address.line2}, {contact.address.city}<br />{office("hoursValue")}</address><a href={`mailto:${contact.emails.operations}`}>{contact.emails.operations}</a><a href={`mailto:${contact.emails.technical}`}>{contact.emails.technical}</a></div>
    </div>
    <div id="rfq" className="premium-form-panel"><p className="premium-eyebrow">{t("formEyebrow")}</p><h2>{t("formTitle")}</h2><p className="mb-7 mt-3 text-sm leading-6 text-slate-600">{t("formHint")}</p><ContactForm /></div>
  </Container></section>;
}
