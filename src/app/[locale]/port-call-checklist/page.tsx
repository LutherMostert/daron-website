import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { ResourceRequestForm } from "@/components/ResourceRequestForm";
import { getPortCallContent } from "@/lib/port-call-content";
import { getResourceFormLabels } from "@/lib/resource-form-content";
import { buildMetadata } from "@/lib/seo";
import { contact } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const c = getPortCallContent(locale);
  return buildMetadata({ locale, path: "/port-call-checklist", title: c.metaTitle, description: c.metaDescription });
}

export default async function PortCallChecklistPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getPortCallContent(locale);
  const formCopy = { ...getResourceFormLabels(locale), ...c.form };
  const [hein, marco] = contact.whatsapp.contacts;

  return (
    <div className="growth-page">
      <section className="growth-intro">
        <Container>
          <p className="premium-eyebrow">{c.eyebrow}</p>
          <h1>{c.title}</h1>
          <p className="premium-lead">{c.intro}</p>
        </Container>
      </section>

      <section className="premium-section pt-0" aria-labelledby="port-call-steps">
        <Container>
          <h2 id="port-call-steps" className="sr-only">{c.checklistHeading}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {c.sections.map(section => (
              <article key={section.title} className="border border-[#d7dedf] bg-white p-7">
                <h3>{section.title}</h3>
                <ul className="growth-checklist">{section.items.map(item => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className="mt-8 border-l-2 border-[#0a7180] bg-white p-7">
            <h3>{c.goodToKnowTitle}</h3>
            <ul className="growth-checklist">{c.goodToKnow.map(item => <li key={item}>{item}</li>)}</ul>
            <p className="text-sm leading-7 text-[#536373]">
              {c.sendTo} <a className="premium-text-link" href={`mailto:${contact.emails.operations}`}>{contact.emails.operations}</a>, {c.orWhatsApp}{" "}
              <a className="premium-text-link" href={hein.href} target="_blank" rel="noopener noreferrer">{hein.name} {hein.display}</a> ·{" "}
              <a className="premium-text-link" href={marco.href} target="_blank" rel="noopener noreferrer">{marco.name} {marco.display}</a>.
            </p>
          </div>
        </Container>
      </section>

      <section id="port-call-pack" className="premium-section" aria-labelledby="port-call-pack-title">
        <Container className="growth-two-column">
          <div>
            <p className="premium-eyebrow">{c.packEyebrow}</p>
            <h2 id="port-call-pack-title" className="mt-4">{c.packTitle}</h2>
            <p className="premium-lead mt-5">{c.packIntro}</p>
            <h3 className="mt-8">{c.packIncludesTitle}</h3>
            <ul className="growth-checklist">{c.packIncludes.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="premium-form-panel">
            <h3 className="mb-6">{c.form.formTitle}</h3>
            <ResourceRequestForm asset="port-call-pack" copy={formCopy} locale={locale} showPlatform={false} />
          </div>
        </Container>
      </section>
    </div>
  );
}
