import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { contact } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
        image={{ src: "/images/site/containers-row.png" }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-8 md:grid-cols-3">
          <ContactCard
            eyebrow={t("card1Eyebrow")}
            title={t("card1Title")}
            body={t("card1Body")}
            href={contact.whatsapp.href}
            cta={`${contact.whatsapp.display} \u2192`}
            external
            highlight
          />
          <ContactCard
            eyebrow={t("card2Eyebrow")}
            title={t("card2Title")}
            body={t("card2Body")}
            href={`mailto:${contact.emails.operations}`}
            cta={contact.emails.operations}
          />
          <ContactCard
            eyebrow={t("card3Eyebrow")}
            title={t("card3Title")}
            body={t("card3Body")}
            href={`mailto:${contact.emails.technical}`}
            cta={contact.emails.technical}
          />
        </Container>
      </section>

      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              {t("officeEyebrow")}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
              {t("officeHeading")}
            </h2>
            <address className="mt-6 space-y-4 text-base not-italic leading-relaxed text-[var(--color-ink)]">
              <p>
                {contact.address.line1}
                <br />
                {contact.address.line2}
                <br />
                {contact.address.city}, {contact.address.region}
                <br />
                {contact.address.country}
              </p>
              <p>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-mute)]">
                  {t("officeLine")}
                </span>
                <a
                  href={contact.phone.href}
                  className="text-lg font-semibold text-[var(--color-navy)] hover:text-[var(--color-accent)]"
                >
                  {contact.phone.display}
                </a>
              </p>
              <p>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-mute)]">
                  {t("hours")}
                </span>
                {t("hoursValue")}
                <br />
                {t("hoursOffshore")}
              </p>
              <p className="flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href={contact.socials.linkedin}
                  className="font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("linkedinLink")} &rarr;
                </a>
                <a
                  href={contact.socials.facebook}
                  className="font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("facebookLink")} &rarr;
                </a>
              </p>
            </address>
          </div>

          <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8 shadow-sm">
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)]">
              {t("formHeading")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-mute)]">
              {t("formIntro")}
            </p>
            <form
              className="mt-6 grid gap-4"
              action={`mailto:${contact.emails.operations}`}
              method="post"
              encType="text/plain"
            >
              <Field id="firstName" label={t("firstName")} required />
              <Field id="surname" label={t("surname")} required />
              <Field id="email" label={t("contactEmail")} type="email" required />
              <Field id="phone" label={t("telephone")} type="tel" />
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-[var(--color-ink)]"
                >
                  {t("yourMessage")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-base text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)]"
              >
                {t("sendMessage")}
              </button>
              <p className="text-xs text-[var(--color-mute)]">
                {t("formNote")}
              </p>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactCard({
  eyebrow,
  title,
  body,
  href,
  cta,
  external,
  highlight,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  external?: boolean;
  highlight?: boolean;
}) {
  return (
    <article
      className={
        highlight
          ? "rounded-2xl bg-[var(--color-accent)] p-7 text-white shadow-md"
          : "rounded-2xl border border-[var(--color-line)] bg-white p-7 shadow-sm"
      }
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
          highlight ? "text-white/85" : "text-[var(--color-accent)]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-[family-name:var(--font-poppins)] text-xl font-bold ${
          highlight ? "text-white" : "text-[var(--color-navy)]"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-3 text-sm leading-relaxed ${
          highlight ? "text-white/90" : "text-[var(--color-mute)]"
        }`}
      >
        {body}
      </p>
      <a
        href={href}
        className={`mt-5 inline-flex items-center font-semibold underline-offset-4 hover:underline ${
          highlight ? "text-white" : "text-[var(--color-navy)]"
        }`}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {cta}
      </a>
    </article>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-[var(--color-ink)]"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-[var(--color-accent)]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={
          id === "email"
            ? "email"
            : id === "phone"
              ? "tel"
              : id === "firstName"
                ? "given-name"
                : id === "surname"
                  ? "family-name"
                  : undefined
        }
        className="rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-base text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
      />
    </div>
  );
}
