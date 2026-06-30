import Image from "next/image";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ClientWall } from "@/components/ClientWall";
import { Container } from "@/components/Container";
import { CountUp } from "@/components/CountUp";
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
  { title: "Concurrent offshore rig support", body: "Deepsea Mira, Deepsea Bollsta and Deepsea Hercules supported during active offshore campaign pressure." },
  { title: "Sapura Berani reactivation", body: "Rig reactivation support under severe time pressure, including catering, cleaning, technical sourcing and rapid release." },
  { title: "Subsea7 / Seven Borealis", body: "Quayside heavy-lift and offshore construction support from Walvis Bay." },
  { title: "Cruise provisioning", body: "Dock-to-gangway provisioning, cold-chain handling and fast turnaround for passenger vessel requirements." },
];

const partners = ["Hempel", "Orlichem", "Honeywell", "ISSA", "IMPA", "Marine safety", "Lubricants", "Technical catalogues"];

const certifications = ["ISO 9001:2015", "HACCP", "ISSA listed", "IMPA listed", "Supplier QA", "Human-reviewed RFQs"];

const gallery = [
  { title: "Normand Energy supply", image: "/images/site/operations/daron-truck-normand-energy.jpg" },
  { title: "Seven Borealis alongside", image: "/images/site/operations/seven-borealis-dusk.jpg" },
  { title: "Quayside readiness", image: "/images/site/operations/daron-ranger-quayside.jpg" },
  { title: "Cruise provisioning", image: "/images/site/operations/daron-truck-cruise-ship.jpg" },
  { title: "Container logistics", image: "/images/site/operations/container-lift-subsea7.jpg" },
  { title: "Warehouse execution", image: "/images/site/forklift-warehouse.png" },
];

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
        <video
          className="hero-media absolute inset-0 h-full w-full object-cover opacity-42 mix-blend-screen"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          poster="/generated/daron/hero-offshore-poster.jpg"
          aria-hidden="true"
        >
          <source src="/generated/daron/hero-offshore-operations.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#030a12_0%,rgba(3,10,18,.90)_36%,rgba(3,10,18,.42)_100%)]" />
        <div className="absolute inset-0 industrial-grid opacity-45" />
        <div className="absolute right-[-18rem] top-[10%] h-[48rem] w-[48rem] rounded-full border border-cyan-300/18 radar-pulse" />
        <div className="absolute right-[8%] top-[22%] hidden h-[22rem] w-[22rem] rounded-full border border-cyan-300/12 lg:block radar-pulse radar-pulse-delay" />
        <Container className="relative flex min-h-[calc(100svh-5rem)] items-end py-10 sm:py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[1.06fr_.94fr] lg:items-end">
            <div data-gsap="hero-copy" className="max-w-5xl pb-4">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-cta)]">
                Walvis Bay command · Africa supply reach · Marine operations since {site.founded}
              </p>
              <h1 className="mt-5 max-w-5xl text-balance font-[family-name:var(--font-poppins)] text-[clamp(3.1rem,9vw,8.6rem)] font-black uppercase leading-[0.78] tracking-[-0.08em]">
                When operations cannot wait.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 sm:text-xl">
                Daron Namibia supplies vessels, rigs, ports, mines, dry docks and industrial sites with fast RFQ response, serious procurement control and real infrastructure on the ground.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={primaryCta} target="_blank" rel="noopener noreferrer" className="magnetic-action plausible-event-name=Hero+RFQ inline-flex min-h-12 items-center justify-center bg-[var(--color-cta)] px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-[var(--color-cta-ink)] transition hover:bg-[var(--color-cta-deep)]">
                  Send Your RFQ
                </a>
                <a href={contact.phone.href} className="magnetic-action inline-flex min-h-12 items-center justify-center border border-white/24 bg-white/[0.06] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-white/60 hover:bg-white/[0.12]">
                  Talk to the Operations Team
                </a>
              </div>
              <a href={contact.phone.href} className="mt-5 inline-flex font-mono text-xs uppercase tracking-[0.18em] text-white/64 underline decoration-[var(--color-cta)] underline-offset-4 hover:text-white">
                Need urgent supply? Call Daron now: {contact.phone.display}
              </a>
            </div>
            <aside data-gsap="hero-panel" className="ops-panel p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/44">Live RFQ posture</p>
              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="bg-[#06111d]/90 p-4">
                    <p className="font-[family-name:var(--font-poppins)] text-3xl font-black text-white sm:text-4xl">
                      <CountUp to={stat.value} separator={stat.value > 999} suffix={stat.suffix} />
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
        <div className="kinetic-band gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-[0.24em] text-white/42">
          {["Marine", "Oil & gas", "Logistics", "Catering", "Warehousing", "Safety", "Dry dock", "Mining", "Industrial", "Emergency supply", "AI-assisted RFQs", "Walvis Bay", "African reach", "Marine", "Oil & gas", "Logistics"].map((item, idx) => (
            <span key={`${item}-${idx}`} className="inline-flex items-center gap-4">
              <span className="h-1.5 w-1.5 bg-[var(--color-cta)]" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section id="services" className="dark-section py-20 text-white sm:py-28">
        <Container>
          <SectionIntro eyebrow="Service command" title="One operating platform for serious marine, offshore and industrial supply." body="The new Daron experience is built around how procurement teams actually buy under pressure: clear scopes, fast RFQs, evidence of capability and one path to a human operations desk." />
          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <Link key={service.title} href={service.href} data-gsap="service-card" style={{ "--reveal-delay": `${idx * 55}ms` } as CSSProperties} className="service-card group min-h-[310px] bg-[#071521] p-6 transition hover:bg-[#0b2133] sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">{service.kicker}</p>
                <h3 className="mt-6 font-[family-name:var(--font-poppins)] text-3xl font-black leading-none tracking-[-0.04em] text-white">{service.title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/62">{service.body}</p>
                <span className="mt-8 inline-flex font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-cta)] group-hover:text-white">Open capability →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#e9edf2] py-20 text-[#08111f] sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div data-gsap="fade-up">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-text)]">African supplier network</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">Walvis Bay control. Continental reach.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">Daron combines Namibian port presence with Daron Group supplier depth, giving procurement teams a single accountable desk for local execution and regional sourcing.</p>
              <div className="mt-8 grid grid-cols-2 gap-px border border-slate-300 bg-slate-300">
                {whyDaron.map(([n, title]) => (
                  <div key={title} className="bg-white p-4">
                    <p className="font-mono text-xs text-[var(--color-cta)]">{n}</p>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.08em]">{title}</p>
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

      <section className="dark-section py-20 text-white sm:py-28">
        <Container>
          <SectionIntro eyebrow="Industries" title="Built for sectors where delay has a real cost." body="This is not generic logistics copy. Each vertical routes visitors into the operational proof and RFQ path that matters to them." />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, idx) => (
              <article key={industry.title} data-gsap="image-card" style={{ "--reveal-delay": `${idx * 60}ms` } as CSSProperties} className="group relative min-h-[430px] overflow-hidden border border-white/10 bg-[#081726]">
                <Image src={industry.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-62 transition duration-700 group-hover:scale-[1.045] group-hover:opacity-78" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040b13] via-[#040b13]/44 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-cta)]">Industry 0{idx + 1}</p>
                  <h3 className="mt-3 font-[family-name:var(--font-poppins)] text-3xl font-black leading-none tracking-[-0.04em]">{industry.title}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-white/66">{industry.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#06111d] py-20 text-white sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28" data-gsap="fade-up">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-cta)]">Why Daron</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">Confidence under pressure.</h2>
              <p className="mt-6 text-base leading-8 text-white/66">Buyers do not need slogans. They need a supplier who answers, sources, stages, documents, delivers and follows up.</p>
              <Link href="/why-daron" className="mt-8 inline-flex border border-white/18 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white hover:border-[var(--color-cta)]">Read why Daron →</Link>
            </div>
            <div className="grid gap-px border border-white/10 bg-white/10">
              {whyDaron.map(([n, title, body], idx) => (
                <article key={title} data-gsap="fade-up" style={{ "--reveal-delay": `${idx * 70}ms` } as CSSProperties} className="grid gap-6 bg-[#0a1a29] p-6 sm:grid-cols-[110px_1fr] sm:p-8">
                  <p className="font-mono text-4xl text-[var(--color-accent)]">{n}</p>
                  <div>
                    <h3 className="font-[family-name:var(--font-poppins)] text-2xl font-black tracking-[-0.04em]">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/62">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#071521] py-20 text-white sm:py-28">
        <div className="absolute inset-0 industrial-grid opacity-30" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
            <div data-gsap="fade-up">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">Don AI RFQ workflow</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">AI speed. Human accountability.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/68">Don is Daron&apos;s RFQ operations layer. It helps structure messy client requests, accelerates quote drafting and keeps the human KAM in control before anything is sent.</p>
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
                      <p className="mt-2 text-sm leading-6 text-white/60">{body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 text-[#08111f] sm:py-28">
        <Container>
          <SectionIntro light eyebrow="Track record" title="Proof that belongs in the procurement room." body="The site brings real operations forward: names, contexts, vessels, photos and categories that make Daron feel like a working platform, not a brochure." />
          <div className="mt-12 grid gap-px border border-slate-300 bg-slate-300 md:grid-cols-2 lg:grid-cols-4">
            {trackRecord.map((item, idx) => (
              <article key={item.title} data-gsap="fade-up" style={{ "--reveal-delay": `${idx * 65}ms` } as CSSProperties} className="bg-white p-6 transition hover:bg-slate-50">
                <p className="font-mono text-xs text-[var(--color-cta)]">0{idx + 1}</p>
                <h3 className="mt-8 font-[family-name:var(--font-poppins)] text-2xl font-black leading-none tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/track-record" className="inline-flex bg-[#08111f] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-white">View track record</Link>
            <Link href="/services/dry-dock" className="inline-flex border border-slate-300 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#08111f]">Dry-dock cases</Link>
          </div>
        </Container>
      </section>

      <section className="dark-section py-20 text-white sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <SectionIntro eyebrow="Partners & catalogues" title="Supplier depth buyers can actually use." body="Product ranges, represented brands, specialist catalogues and trusted supplier paths are positioned as procurement assets — with RFQ conversion always close by." />
            <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
              {partners.map((partner) => (
                <div key={partner} className="bg-[#091726] p-5 text-center font-mono text-xs uppercase tracking-[0.16em] text-white/68">{partner}</div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/brands" className="inline-flex bg-[var(--color-cta)] px-6 py-3 text-center text-sm font-black uppercase tracking-[0.14em] text-[var(--color-cta-ink)]">Open partners / catalogues</Link>
            <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex border border-white/18 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-white">Ask for availability</a>
          </div>
        </Container>
      </section>

      <section className="bg-[#e9edf2] py-20 text-[#08111f] sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div data-gsap="fade-up">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-text)]">Compliance</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">High-trust signals, above the fold and throughout.</h2>
              <p className="mt-6 text-base leading-8 text-slate-600">Certifications and operating standards are treated as conversion assets for procurement teams, agents, vessel managers and offshore buyers.</p>
            </div>
            <div className="grid gap-px border border-slate-300 bg-slate-300 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert) => (
                <div key={cert} className="bg-white p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-cta)]">Verified</p>
                  <p className="mt-5 font-[family-name:var(--font-poppins)] text-2xl font-black tracking-[-0.04em]">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#06111d] py-20 text-white sm:py-28">
        <Container>
          <SectionIntro eyebrow="Real operations gallery" title="No generic stock feeling. Real Daron movement." body="The visual system is built around actual vessels, trucks, quayside scenes, warehouse work and offshore support — supported by subtle grids, route lines and radar motion." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, idx) => (
              <article key={item.title} data-gsap="image-card" style={{ "--reveal-delay": `${idx * 55}ms` } as CSSProperties} className="group relative min-h-[320px] overflow-hidden border border-white/10 bg-[#091726]">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-76 transition duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030a12] via-transparent to-transparent" />
                <h3 className="absolute bottom-5 left-5 right-5 font-[family-name:var(--font-poppins)] text-2xl font-black tracking-[-0.04em]">{item.title}</h3>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-[#030a12] py-20 text-white sm:py-28">
        <Image src="/images/site/bg-desert-daron.png" alt="" fill sizes="100vw" className="object-cover opacity-28" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030a12] via-[#030a12]/90 to-[#030a12]/52" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-end">
            <div data-gsap="fade-up">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-cta)]">About Daron Namibia</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">A Namibian operator backed by Daron Group depth.</h2>
            </div>
            <div data-gsap="fade-up" className="max-w-2xl text-base leading-8 text-white/70">
              <p>Founded in Walvis Bay in {site.founded}, Daron Namibia has grown into a marine, offshore, logistics, catering, warehousing, health and safety, and dry-dock support partner for clients who need fast answers and dependable execution.</p>
              <p className="mt-5">The digital platform now reflects that posture: sharper RFQ flow, more proof, better vertical routing, real operation visuals and a premium industrial interface built for conversion.</p>
            </div>
          </div>
        </Container>
      </section>

      <ClientWall variant="navy" />

      <section id="rfq" className="relative overflow-hidden bg-white py-20 text-[#08111f] sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
            <div data-gsap="fade-up">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-text)]">Contact / RFQ</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">Send the file. We&apos;ll move the requirement.</h2>
              <p className="mt-6 text-base leading-8 text-slate-600">The RFQ page supports structured intake and file upload for Excel, PDF, Word and CSV requirements. WhatsApp remains the fastest route for urgent vessel supply.</p>
              <div className="mt-8 flex flex-col gap-3">
                <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex bg-[var(--color-cta)] px-6 py-3 text-center text-sm font-black uppercase tracking-[0.14em] text-[var(--color-cta-ink)]">Send Your RFQ</a>
                <a href={contact.phone.href} className="inline-flex border border-slate-300 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#08111f]">Need urgent supply? Call Daron now</a>
              </div>
            </div>
            <div data-gsap="fade-up" className="border border-slate-300 bg-[#f5f7fa] p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Company name",
                  "Vessel / project",
                  "Port / delivery point",
                  "Urgency / ETA",
                ].map((field) => (
                  <div key={field} className="bg-white p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">{field}</p>
                    <div className="mt-8 h-px bg-slate-300" />
                  </div>
                ))}
                <div className="border border-dashed border-slate-400 bg-white p-8 text-center sm:col-span-2">
                  <p className="font-[family-name:var(--font-poppins)] text-2xl font-black tracking-[-0.04em]">RFQ file upload</p>
                  <p className="mt-3 text-sm text-slate-600">Excel · PDF · Word · CSV · photos via WhatsApp</p>
                </div>
              </div>
              <Link href="/contact" className="mt-5 inline-flex w-full justify-center bg-[#08111f] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white">Open full RFQ form</Link>
            </div>
          </div>
        </Container>
      </section>

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
