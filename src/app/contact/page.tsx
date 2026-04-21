import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Daron Namibia in Walvis Bay for tailored supply chain solutions. WhatsApp Daron AI assistant for an instant quote, or message the team directly.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let&apos;s talk about your next delivery"
        intro="Looking for a trusted partner to simplify your supply chain? Get in touch with our team today."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-8 md:grid-cols-3">
          <ContactCard
            eyebrow="Fastest"
            title="WhatsApp Daron AI assistant"
            body="The Daron AI assistant is our AI quoting agent, live on WhatsApp. Drafted quotes back in minutes."
            href={contact.whatsapp.href}
            cta={`${contact.whatsapp.display} →`}
            external
            highlight
          />
          <ContactCard
            eyebrow="Operations"
            title="Email ops"
            body="For order coordination, deliveries, and account questions."
            href={`mailto:${contact.emails.operations}`}
            cta={contact.emails.operations}
          />
          <ContactCard
            eyebrow="Technical"
            title="Email technical"
            body="For specifications, sourcing, and technical sales support."
            href={`mailto:${contact.emails.technical}`}
            cta={contact.emails.technical}
          />
        </Container>
      </section>

      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Head office
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
              Walvis Bay, Namibia
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
                  Office line
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
                  Hours
                </span>
                Mon&ndash;Fri 08:00&ndash;17:00 CAT (GMT+2)
                <br />
                Offshore RFQs handled outside hours via WhatsApp
              </p>
              <p>
                <a
                  href={contact.socials.linkedin}
                  className="font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Daron Namibia on LinkedIn &rarr;
                </a>
              </p>
            </address>
          </div>

          <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8 shadow-sm">
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)]">
              Send us a message
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-mute)]">
              We&apos;ll route your enquiry to the right team and reply within
              one business day. For instant quotes, the Daron AI assistant on WhatsApp is faster.
            </p>
            <form
              className="mt-6 grid gap-4"
              action={`mailto:${contact.emails.operations}`}
              method="post"
              encType="text/plain"
            >
              <Field id="firstName" label="First name" required />
              <Field id="surname" label="Surname" required />
              <Field id="email" label="Contact email" type="email" required />
              <Field id="phone" label="Telephone number" type="tel" />
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-[var(--color-ink)]"
                >
                  Your message
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
                Send message
              </button>
              <p className="text-xs text-[var(--color-mute)]">
                This form opens your default email app for now. Hermes-backed
                live form launches Week&nbsp;2.
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
