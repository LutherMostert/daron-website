import Image from "next/image";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ClientWall } from "@/components/ClientWall";
import { Container } from "@/components/Container";
import { CountUp } from "@/components/CountUp";
import { DeferredHeroVideo } from "@/components/DeferredHeroVideo";
import { InlineRFQ } from "@/components/InlineRFQ";
import { OperationsNetworkCanvas } from "@/components/OperationsNetworkCanvas";
import { Link } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { contact, site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    locale,
    path: "/",
    title: t("homeTitle"),
    description: t("homeDescription"),
    titleAbsolute: true,
  });
}

const heroStats = [
  { label: "Daron Group founded", value: 1959, suffix: "" },
  { label: "Namibia operation", value: 2012, suffix: "" },
  { label: "Supplier network", value: 2500, suffix: "+" },
  { label: "Operations response", value: 24, suffix: "/7" },
];

const services = [
  {
    title: "Ship chandlery",
    kicker: "Deck · engine · bonded · provisions",
    body: "Full vessel supply from Walvis Bay: deck and engine stores, provisions, bonded stores, cabin requirements and last-minute operational requests.",
    href: "/services/ship-chandlery" as const,
  },
  {
    title: "Oil, gas & offshore support",
    kicker: "Rigs · subsea · campaign pressure",
    body: "Procurement, provisioning, safety, logistics and specialist sourcing for drilling, subsea and offshore construction campaigns.",
    href: "/industries/oil-and-gas" as const,
  },
  {
    title: "Catering & provisioning",
    kicker: "Crew welfare · HACCP control",
    body: "Fresh, frozen and dry supply with practical menu, crew, vessel and remote-site requirements handled under one accountable desk.",
    href: "/services" as const,
  },
  {
    title: "Warehousing & logistics",
    kicker: "Cold · frozen · dry · quayside",
    body: "In-house infrastructure, branded vehicles, staging control and release timing for port calls, projects, camps and industrial operations.",
    href: "/services" as const,
  },
  {
    title: "Health, safety & technical stores",
    kicker: "PPE · fire · rescue · MRO",
    body: "Safety equipment, tools, technical consumables, chemicals, lubricants, electrical stores and hard-to-source parts.",
    href: "/brands" as const,
  },
  {
    title: "Dry-dock support",
    kicker: "Coatings · cleaning · repair scopes",
    body: "Dry-dock procurement support, marine coatings coordination, chemicals, deck treatment, repair materials and urgent technical supply.",
    href: "/services/dry-dock" as const,
  },
];

const industries = [
  { title: "Marine & shipping", image: "/images/site/operations/seven-borealis-dock.jpg", body: "Vessels, port calls, chandlery, provisions and technical stores." },
  { title: "Offshore oil & gas", image: "/generated/daron/hero-offshore-poster.jpg", body: "Rig campaigns, subsea vessels, offshore construction and shutdown pressure." },
  { title: "Mining & industrial", image: "/images/site/mining.jpeg", body: "Remote sites, PPE, MRO, chemicals, tools and logistics support." },
  { title: "Hospitality & catering", image: "/images/site/offshore-catering.jpg", body: "Crew feeding, remote camps, galley supply and welfare-critical procurement." },
  { title: "Ports & logistics", image: "/generated/daron/port-logistics-night.jpg", body: "Truck movement, quayside coordination, customs timing and staged delivery." },
  { title: "Dry dock & repair", image: "/images/site/drydock/case-study-hempel-bow.jpg", body: "Refit scopes, coating supply, cleaning chemicals and technical materials." },
];

const whyDaron = [
  ["01", "Local command", "Walvis Bay presence, local port knowledge and in-house operations when time is tight."],
  ["02", "African reach", "Daron Group network depth across Africa with supplier access into Europe."],
  ["03", "Infrastructure", "Warehousing, cold chain, vehicles, staging discipline and accountable release control."],
  ["04", "Compliance", "ISO 9001:2015, HACCP, ISSA and IMPA credibility for procurement teams."],
  ["05", "RFQ speed", "Don AI structures requests fast while Daron specialists retain final commercial control."],
];

const rfqWorkflow = [
  ["01", "Send RFQ", "WhatsApp, email, Excel, PDF, Word, photo or vessel list."],
  ["02", "Don structures it", "Lines are classified, cleaned and matched against catalogue and supplier logic."],
  ["03", "KAM review", "A Daron specialist checks exceptions, pricing, availability and delivery pressure."],
  ["04", "Quote issued", "Professional Excel quote, follow-up trail and operational handoff."],
];

const trackRecord = [
  { title: "Concurrent offshore rig support", image: "/generated/daron/hero-offshore-poster.jpg", body: "Deepsea Mira, Deepsea Bollsta and Deepsea Hercules supported during active offshore campaign pressure." },
  { title: "Sapura Berani reactivation", image: "/generated/daron/high-pressure-maintenance.jpg", body: "Rig reactivation support under severe time pressure, including catering, cleaning, technical sourcing and rapid release." },
  { title: "Subsea7 / Seven Borealis", image: "/images/site/operations/container-lift-subsea7.jpg", body: "Quayside heavy-lift and offshore construction support from Walvis Bay." },
  { title: "Cruise provisioning", image: "/images/site/operations/daron-truck-cruise-ship.jpg", body: "Dock-to-gangway provisioning, cold-chain handling and fast turnaround for passenger vessel requirements." },
];

const partners = ["Hempel", "Orlichem", "Honeywell", "ISSA", "IMPA", "Marine safety", "Lubricants", "Technical catalogues"];

const certifications = ["ISO 9001:2015", "HACCP", "ISSA listed", "IMPA listed", "Supplier QA", "Human-reviewed RFQs"];

const primaryCta = contact.whatsapp.href;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="ops-hero relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#030a12] text-white">
        <Image
          src="/images/site/operations/seven-borealis-dusk.jpg"
          alt="Daron Namibia offshore and quayside operations in Walvis Bay"
          fill
          priority
          sizes="100vw"
          className="hero-media object-cover opacity-62"
        />
        <DeferredHeroVideo />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#030a12_0%,rgba(3,10,18,.90)_36%,rgba(3,10,18,.42)_100%)]" />
        <div className="absolute inset-0 industrial-grid opacity-45" />
        <div className="absolute right-[-18rem] top-[10%] h-[48rem] w-[48rem] rounded-full border border-cyan-300/18 radar-pulse" />
        <div className="absolute right-[8%] top-[22%] hidden h-[22rem] w-[22rem] rounded-full border border-cyan-300/12 lg:block radar-pulse radar-pulse-delay" />
        <Container className="relative flex min-h-[calc(100svh-5rem)] items-center py-8 sm:py-10">
          <div className="grid w-full gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
            <div data-gsap="hero-copy" className="max-w-5xl">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-cta)]">
                Walvis Bay command · Africa supply reach · Marine operations since {site.founded}
              </p>
              <h1 className="mt-5 max-w-5xl text-balance font-[family-name:var(--font-poppins)] text-[clamp(3.1rem,6.6vw,7.2rem)] font-black uppercase leading-[0.82] tracking-[-0.06em]">
                When operations cannot wait.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">
                Daron Namibia supplies vessels, rigs, ports, mines, dry docks and industrial sites with fast RFQ response, serious procurement control and real infrastructure on the ground.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={primaryCta} target="_blank" rel="noopener noreferrer" className="magnetic-action plausible-event-name=Hero+RFQ inline-flex min-h-12 items-center justify-center bg-[var(--color-cta)] px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-[var(--color-cta-ink)] transition hover:bg-[var(--color-cta-deep)]">
                  Send Your RFQ
                </a>
                <a href={contact.phone.href} className="magnetic-action inline-flex min-h-12 items-center justify-center border border-white/24 bg-white/[0.06] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-white/60 hover:bg-white/[0.12]">
                  Talk to the Operations Team
                </a>
              </div>
              <a href={contact.phone.href} className="mt-4 inline-flex font-mono text-xs uppercase tracking-[0.18em] text-white/72 underline decoration-[var(--color-cta)] underline-offset-4 hover:text-white">
                Need urgent supply? Call Daron now: {contact.phone.display}
              </a>
            </div>
            <aside data-gsap="hero-panel" className="ops-panel hidden p-5 lg:block">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/44">Live RFQ posture</p>
              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="bg-[#06111d]/90 p-4">
                    <p className="font-[family-name:var(--font-poppins)] text-3xl font-black text-white sm:text-4xl">
                      <CountUp to={stat.value} separator={stat.value > 999} suffix={stat.suffix} animate={false} />
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/54">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-l-2 border-[var(--color-cta)] pl-4">
                <p className="text-sm font-semibold text-white">RFQ in. Quote out. Cargo moving.</p>
                <p className="mt-2 text-sm leading-6 text-white/58">Don accelerates intake. Daron people keep the judgement, pricing and delivery accountable.</p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-[#06111d] py-4 text-white">
        <div className="kinetic-band gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-[0.24em] text-white/64">
          {["Marine", "Oil & gas", "Logistics", "Catering", "Warehousing", "Safety", "Dry dock", "Mining", "Industrial", "Emergency supply", "AI-assisted RFQs", "Walvis Bay", "African reach", "Marine", "Oil & gas", "Logistics"].map((item, idx) => (
            <span key={`${item}-${idx}`} className="inline-flex items-center gap-4">
              <span className="h-1.5 w-1.5 bg-[var(--color-cta)]" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#071521] py-6 text-white lg:hidden">
        <Container>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-[#06111d] p-4">
                <p className="font-[family-name:var(--font-poppins)] text-3xl font-black">
                  <CountUp to={stat.value} separator={stat.value > 999} suffix={stat.suffix} animate={false} />
                </p>
                <p className="mt-1 text-xs leading-5 text-white/68">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="services" className="dark-section py-16 text-white sm:py-20">
        <Container>
          <SectionIntro eyebrow="Service command" title="One operating platform for serious marine, offshore and industrial supply." body="Six capability lanes connect urgent vessel demand, controlled sourcing, staging and delivery to one accountable operations desk." />
          <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <Link key={service.title} href={service.href} data-gsap="service-card" style={{ "--reveal-delay": `${idx * 55}ms` } as CSSProperties} className="service-card group min-h-[220px] bg-[#071521] p-6 transition hover:bg-[#0b2133] md:min-h-[270px] sm:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">{service.kicker}</p>
                <h3 className="mt-6 font-[family-name:var(--font-poppins)] text-3xl font-black leading-none tracking-[-0.04em] text-white">{service.title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/74">{service.body}</p>
                <span className="mt-8 inline-flex font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-cta)] group-hover:text-white">Open capability →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#e9edf2] py-16 text-[#08111f] sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div data-gsap="fade-up">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-text)]">African supplier network</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">Walvis Bay control. Continental reach.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">Daron combines Namibian port presence with Daron Group supplier depth, giving procurement teams a single accountable desk for local execution and regional sourcing.</p>
              <div className="mt-8 grid gap-px border border-slate-300 bg-slate-300 sm:grid-cols-2">
                {whyDaron.map(([n, title, body]) => (
                  <div key={title} className="bg-white p-4">
                    <p className="font-mono text-xs text-[var(--color-cta-text)]">{n}</p>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.08em]">{title}</p>
                    <p className="mt-2 hidden text-xs leading-5 text-slate-600 sm:block">{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative" data-gsap="network-map">
              <OperationsNetworkCanvas />
            </div>
          </div>
        </Container>
      </section>

      <section className="dark-section py-16 text-white sm:py-20">
        <Container>
          <SectionIntro eyebrow="Industries" title="Built for sectors where delay has a real cost." body="Direct capability routes for vessel managers, offshore teams, industrial buyers, ports and remote operations." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, idx) => (
              <article key={industry.title} data-gsap="image-card" style={{ "--reveal-delay": `${idx * 60}ms` } as CSSProperties} className="group relative min-h-[320px] overflow-hidden border border-white/10 bg-[#081726] md:min-h-[370px]">
                <Image src={industry.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-62 transition duration-700 group-hover:scale-[1.045] group-hover:opacity-78" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040b13] via-[#040b13]/44 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-cta)]">Industry 0{idx + 1}</p>
                  <h3 className="mt-3 font-[family-name:var(--font-poppins)] text-3xl font-black leading-none tracking-[-0.04em]">{industry.title}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-white/76">{industry.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#071521] py-16 text-white sm:py-20">
        <div className="absolute inset-0 industrial-grid opacity-30" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
            <div data-gsap="fade-up">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">Don AI RFQ workflow</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">AI speed. Human accountability.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/78">Don is Daron&apos;s RFQ operations layer. It structures complex client requests, accelerates quote drafting and keeps the human KAM in control before anything is sent.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/ai" className="bg-[var(--color-cta)] px-6 py-3 text-center text-sm font-black uppercase tracking-[0.16em] text-[var(--color-cta-ink)]">View Don AI</Link>
                <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="border border-white/18 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-white">WhatsApp RFQ</a>
              </div>
            </div>
            <div className="rfq-console border border-white/12 bg-[#030a12] p-5 sm:p-7" data-gsap="rfq-workflow">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/46">RFQ control loop</p>
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-cta)] shadow-[0_0_24px_var(--color-cta)]" />
              </div>
              <div className="relative grid gap-4">
                <span className="route-line absolute left-[1.65rem] top-10 h-[calc(100%-5rem)] w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-cta)] to-transparent" aria-hidden />
                {rfqWorkflow.map(([n, title, body]) => (
                  <article key={title} className="rfq-step relative grid grid-cols-[3.4rem_1fr] gap-4">
                    <div className="z-10 flex h-12 w-12 items-center justify-center border border-white/16 bg-[#071521] font-mono text-xs text-[var(--color-cta)]">{n}</div>
                    <div className="border border-white/10 bg-white/[0.035] p-4">
                      <h3 className="font-[family-name:var(--font-poppins)] text-xl font-black">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/72">{body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 text-[#08111f] sm:py-20">
        <Container>
          <SectionIntro light eyebrow="Track record" title="Proof that belongs in the procurement room." body="Named vessels, campaign context and operational imagery show where Daron has already delivered under pressure." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {trackRecord.map((item, idx) => (
              <article key={item.title} data-gsap="image-card" style={{ "--reveal-delay": `${idx * 65}ms` } as CSSProperties} className="group relative min-h-[340px] overflow-hidden border border-slate-300 bg-[#08111f] text-white sm:grid sm:min-h-[300px] sm:grid-cols-[.92fr_1.08fr]">
                <div className="absolute inset-0 overflow-hidden sm:relative">
                  <Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover opacity-78 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08111f] via-[#08111f]/32 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-[#08111f]/45" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 sm:relative">
                  <p className="font-mono text-xs text-[var(--color-cta)]">OPERATION 0{idx + 1}</p>
                  <h3 className="mt-5 font-[family-name:var(--font-poppins)] text-2xl font-black leading-none tracking-[-0.04em]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/76">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/track-record" className="inline-flex bg-[#08111f] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-white">View track record</Link>
            <Link href="/services/dry-dock" className="inline-flex border border-slate-300 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#08111f]">Dry-dock cases</Link>
          </div>
        </Container>
      </section>

      <section className="bg-[#e9edf2] py-16 text-[#08111f] sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <div data-gsap="fade-up">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-text)]">Procurement confidence</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">Supplier depth. Documented control.</h2>
              <p className="mt-6 text-base leading-8 text-slate-600">Compliance, catalogue access and specialist supplier paths give buyers a faster route from requirement to defensible purchase.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/brands" className="inline-flex justify-center bg-[#08111f] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-white">Open catalogues</Link>
                <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center border border-slate-400 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#08111f]">Ask for availability</a>
              </div>
            </div>
            <div className="grid gap-6">
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600">Standards & controls</p>
                <div className="grid grid-cols-2 gap-px border border-slate-300 bg-slate-300 lg:grid-cols-3">
                  {certifications.map((cert) => (
                    <div key={cert} className="bg-white p-4 sm:p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-cta-text)]">Verified</p>
                      <p className="mt-3 font-[family-name:var(--font-poppins)] text-base font-black tracking-[-0.04em] sm:mt-4 sm:text-xl">{cert}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600">Partners & catalogue routes</p>
                <div className="grid grid-cols-2 gap-px border border-slate-300 bg-slate-300 sm:grid-cols-4">
                  {partners.map((partner) => (
                    <div key={partner} className="bg-white p-4 text-center font-mono text-xs uppercase tracking-[0.12em] text-slate-700">{partner}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ClientWall variant="navy" />

      <InlineRFQ
        variant="navy"
        heading="When vessels, rigs and operations cannot wait, Daron moves."
        body={`Send the RFQ by WhatsApp, call ${contact.phone.display}, or email ${contact.emails.operations}.`}
      />
    </>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  light?: boolean;
}) {
  return (
    <div data-gsap="fade-up" className="max-w-4xl">
      <p className={`font-mono text-xs uppercase tracking-[0.24em] ${light ? "text-[var(--color-accent-text)]" : "text-[var(--color-accent)]"}`}>{eyebrow}</p>
      <h2 className={`mt-4 text-balance font-[family-name:var(--font-poppins)] text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl ${light ? "text-[#08111f]" : "text-white"}`}>{title}</h2>
      <p className={`mt-6 max-w-2xl text-base leading-8 ${light ? "text-slate-600" : "text-white/66"}`}>{body}</p>
    </div>
  );
}
