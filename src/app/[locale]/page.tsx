import Image from "next/image";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/Container";
import { CountUp } from "@/components/CountUp";
import { DeferredHeroVideo } from "@/components/DeferredHeroVideo";
import { DonOperationsFlow, SectorSelector } from "@/components/OperationsCommand";
import { OperationsNetworkCanvas } from "@/components/OperationsNetworkCanvas";
import { Link } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { clients, contact } from "@/lib/site";

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

const metrics = [
  { label: "Daron Group founded", value: 1959, suffix: "", separator: false },
  { label: "Namibia operations", value: 2012, suffix: "", separator: false },
  { label: "Verified supplier network", value: 2500, suffix: "+", separator: true },
  { label: "Operational response", value: 24, suffix: "/7", separator: false },
];

const divisions = [
  {
    number: "01",
    eyebrow: "Deck · engine · provisions · bonded",
    title: "Marine chandlery",
    body: "Full vessel supply from Walvis Bay, staged against port-call pressure and delivered through one accountable operations desk.",
    image: "/images/site/operations/seven-borealis-dock.jpg",
    alt: "Seven Borealis offshore construction vessel alongside in Walvis Bay",
    href: "/services/ship-chandlery" as const,
    className: "lg:col-span-7 lg:row-span-2 min-h-[440px] lg:min-h-[640px]",
  },
  {
    number: "02",
    eyebrow: "Rigs · subsea · campaign support",
    title: "Oil and gas offshore",
    body: "Procurement, technical supply, safety and quayside coordination for complex offshore campaigns.",
    image: "/images/site/operations/daron-fleet-normand-energy.jpg",
    alt: "Daron vehicles supporting an offshore energy vessel",
    href: "/industries/oil-and-gas" as const,
    className: "lg:col-span-5 min-h-[360px]",
  },
  {
    number: "03",
    eyebrow: "Catering · cold chain · HACCP",
    title: "Crew welfare",
    body: "Controlled provisioning for vessels, rigs and remote operations.",
    image: "/images/site/offshore-catering.jpg",
    alt: "Offshore catering and vessel provisions prepared by Daron",
    href: "/services" as const,
    className: "lg:col-span-5 min-h-[280px]",
  },
  {
    number: "04",
    eyebrow: "UHP · Hempel · dry dock",
    title: "Coatings and maintenance",
    body: "High-pressure systems, marine surface preparation and coating supply aligned to the maintenance window.",
    image: "/generated/daron/high-pressure-maintenance.jpg",
    alt: "High-pressure marine maintenance and surface preparation",
    href: "/services/dry-dock" as const,
    className: "lg:col-span-5 min-h-[360px]",
  },
  {
    number: "05",
    eyebrow: "Warehouse · fleet · technical supply",
    title: "Operational logistics",
    body: "Cold, frozen and dry storage, branded vehicles, technical stores and timed release control from warehouse to quayside.",
    image: "/images/site/operations/truck-fleet-night.jpg",
    alt: "Daron Namibia truck fleet ready for night operations",
    href: "/services" as const,
    className: "lg:col-span-7 min-h-[360px]",
  },
];

const projects = [
  "Saipem Santorini",
  "Deepsea Mira",
  "Deepsea Bollsta",
  "Deepsea Hercules",
  "Subsea7",
  "Seven Borealis",
  "Sapura Berani",
  "Transocean Marianas",
];

const operations = [
  {
    number: "OP-01",
    title: "Concurrent drilling support",
    body: "Deepsea Mira, Deepsea Bollsta and Deepsea Hercules supported during active offshore campaign pressure.",
    image: "/images/site/operations/daron-fleet-normand-energy.jpg",
    alt: "Daron fleet supporting simultaneous offshore drilling operations",
    meta: "3 rigs · Walvis Bay",
    className: "lg:col-span-7",
  },
  {
    number: "OP-02",
    title: "Subsea7 / Seven Borealis",
    body: "Quayside heavy-lift and offshore construction support executed from Walvis Bay.",
    image: "/images/site/operations/container-lift-subsea7.jpg",
    alt: "Container lift operation supporting Subsea7 and Seven Borealis",
    meta: "Heavy lift · Quayside",
    className: "lg:col-span-5",
  },
  {
    number: "OP-03",
    title: "Sapura Berani reactivation",
    body: "Catering, cleaning, technical sourcing and rapid release under severe reactivation pressure.",
    image: "/images/site/operations/crew-lifting-pallet.jpg",
    alt: "Daron crew lifting supplies during an offshore vessel operation",
    meta: "Reactivation · Rapid supply",
    className: "lg:col-span-5",
  },
  {
    number: "OP-04",
    title: "Cruise vessel provisioning",
    body: "Dock-to-gangway provisioning, cold-chain handling and fast turnaround for passenger vessel requirements.",
    image: "/images/site/operations/daron-truck-cruise-ship.jpg",
    alt: "Daron truck provisioning a cruise vessel at the port",
    meta: "Cold chain · Turnaround",
    className: "lg:col-span-7",
  },
];

const controls = ["ISO 9001:2015", "HACCP", "ISSA listed", "IMPA listed"];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="command-home bg-[#080f1e] text-white">
      <section className="ops-hero relative isolate min-h-[calc(100svh-7rem)] overflow-hidden bg-[#050b14]">
        <Image
          src="/images/site/operations/seven-borealis-dusk.jpg"
          alt="Seven Borealis and offshore support operations at dusk in Walvis Bay"
          width={1302}
          height={2312}
          priority
          fetchPriority="high"
          decoding="sync"
          sizes="100vw"
          className="hero-media absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-72"
        />
        <DeferredHeroVideo />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050b14_0%,rgba(5,11,20,.94)_42%,rgba(5,11,20,.45)_72%,rgba(5,11,20,.24)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,11,20,.08)_0%,rgba(5,11,20,.12)_58%,#050b14_100%)]" />
        <div className="industrial-grid absolute inset-0 opacity-28" aria-hidden="true" />
        <div className="scanline absolute inset-x-0 top-0 h-px bg-[var(--color-accent)]/38" aria-hidden="true" />

        <Container className="relative flex min-h-[calc(100svh-7rem)] max-w-[1320px] items-center py-10 sm:py-14 lg:py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[1.18fr_.82fr] lg:items-end">
            <div data-gsap="hero-copy" className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 sm:text-xs">
                <span>Walvis Bay / Namibia</span>
                <span className="h-px w-8 bg-[var(--color-cta)]" aria-hidden="true" />
                <span>Africa supply reach</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.8rem,6.2vw,6.5rem)] font-black uppercase leading-[0.92]">
                When operations cannot wait.
              </h1>
              <p className="mt-5 text-xl font-bold text-white sm:text-2xl">Walvis Bay command. Africa reach.</p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                Marine supply, offshore logistics, technical procurement and crew support for vessels, rigs and industrial operations working under real pressure.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="magnetic-action plausible-event-name=Hero+RFQ inline-flex min-h-13 items-center justify-center bg-[var(--color-cta)] px-7 py-4 text-sm font-black uppercase tracking-[0.13em] text-[var(--color-cta-ink)] transition duration-300 hover:bg-white">
                  Send your RFQ
                  <span className="ml-4 text-lg" aria-hidden="true">→</span>
                </Link>
                <a href={contact.phone.href} className="magnetic-action inline-flex min-h-13 items-center justify-center border border-white/22 bg-white/[0.055] px-7 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white backdrop-blur-md transition duration-300 hover:border-white/60 hover:bg-white/[0.1]">
                  <span className="mr-3 flex h-3 w-3 items-center justify-center" aria-hidden="true"><span className="live-status-dot h-2 w-2 rounded-full bg-emerald-400" /></span>
                  Talk to operations
                </a>
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white/68">24/7 operational contact · {contact.phone.display}</p>
            </div>

            <aside data-gsap="hero-panel" className="command-surface hidden border border-white/14 bg-[#071321]/76 backdrop-blur-xl lg:block">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/64">Operations node</p>
                  <p className="mt-1 text-sm font-bold">Walvis Bay Command</p>
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-300">
                  <span className="live-status-dot h-2 w-2 rounded-full bg-emerald-400" /> Active
                </span>
              </div>
              <div className="p-5">
                <div className="grid gap-px border border-white/10 bg-white/10">
                  {[
                    ["RFQ intake", "Ready"],
                    ["Port coordination", "Walvis Bay"],
                    ["Supplier network", "2,500+"],
                    ["Commercial control", "Human reviewed"],
                  ].map(([label, value], index) => (
                    <div key={label} className="grid grid-cols-[1fr_auto] items-center gap-4 bg-[#071321] px-4 py-3">
                      <span className="flex items-center gap-3 text-xs text-white/68"><span className="font-mono text-[9px] text-[var(--color-cta)]">0{index + 1}</span>{label}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/84">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-l-2 border-[var(--color-cta)] pl-4">
                  <p className="text-sm font-bold">RFQ in. Operation moving.</p>
                  <p className="mt-2 text-xs leading-5 text-white/66">Digital intake accelerates the handoff. Daron people control sourcing, pricing and delivery.</p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section aria-label="Daron operational metrics" className="border-y border-white/10 bg-[#071321]">
        <Container className="max-w-[1320px] px-0 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="min-h-32 border-b border-r border-white/10 p-5 last:border-r-0 sm:p-6 lg:border-b-0">
                <p className="font-mono text-3xl font-bold text-white sm:text-4xl">
                  <CountUp to={metric.value} suffix={metric.suffix} separator={metric.separator} animate={index === 2} />
                </p>
                <p className="mt-3 max-w-40 text-[10px] uppercase leading-4 tracking-[0.14em] text-white/64">{metric.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="capabilities" className="bg-[#080f1e] py-18 sm:py-24">
        <Container className="max-w-[1320px]">
          <SectionHeading
            eyebrow="Integrated operating divisions"
            title="One command structure. Multiple routes to execution."
            body="Daron connects vessel supply, offshore support, technical procurement, crew welfare and controlled logistics without handing the operation between disconnected suppliers."
          />

          <div className="mt-12 grid gap-3 lg:grid-cols-12 lg:auto-rows-[minmax(280px,auto)]">
            {divisions.map((division, index) => (
              <Link
                key={division.title}
                href={division.href}
                data-gsap="image-card"
                style={{ "--reveal-delay": `${index * 55}ms` } as CSSProperties}
                className={`operations-bento group relative isolate overflow-hidden border border-white/12 bg-[#071321] ${division.className}`}
              >
                <Image src={division.image} alt={division.alt} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,24,.08)_0%,rgba(5,13,24,.2)_35%,rgba(5,13,24,.96)_100%)]" />
                <div className="industrial-grid absolute inset-0 opacity-18" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/70">
                    <span className="text-[var(--color-cta)]">{division.number}</span>
                    <span>{division.eyebrow}</span>
                  </div>
                  <h3 className="mt-4 max-w-xl text-3xl font-black uppercase leading-[1.02] sm:text-4xl">{division.title}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/66 sm:text-base sm:leading-7">{division.body}</p>
                  <span className="mt-6 inline-flex items-center text-xs font-black uppercase tracking-[0.12em] text-white transition group-hover:text-[var(--color-cta)]">Open capability <span className="ml-3" aria-hidden="true">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="command-defer border-y border-white/10 bg-[#050b14] py-18 sm:py-24">
        <Container className="max-w-[1320px]">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <SectionHeading
              eyebrow="Don AI / Operations intake"
              title="Digital speed. Human command."
              body="Don keeps the first response moving while Daron specialists retain control of specifications, sourcing, pricing, availability and delivery."
            />
            <div className="border-l border-white/12 pl-5 lg:justify-self-end lg:max-w-md">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-cta)]">Important control</p>
              <p className="mt-3 text-sm leading-6 text-white/68">Don does not issue pricing or confirm stock. Every commercial response is reviewed and released by the Daron operations team.</p>
            </div>
          </div>
          <div className="mt-12" data-gsap="fade-up">
            <DonOperationsFlow />
          </div>
        </Container>
      </section>

      <section className="command-defer bg-[#0a1422] py-18 sm:py-24">
        <Container className="max-w-[1320px]">
          <SectionHeading
            eyebrow="Sector command"
            title="Select the operation. See the execution path."
            body="Four operating modes, each connected to Daron's Walvis Bay infrastructure, people and regional sourcing network."
          />
          <div className="mt-12" data-gsap="fade-up">
            <SectorSelector />
          </div>
        </Container>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-[#050b14] py-4" aria-label="Named offshore operations">
        <div className="operations-marquee">
          <div className="operations-marquee-track font-mono text-[10px] uppercase tracking-[0.2em] text-white/68">
            {[...projects, ...projects].map((project, index) => (
              <span key={`${project}-${index}`} className="inline-flex items-center gap-5 px-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cta)]" aria-hidden="true" />
                {project}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="command-defer bg-[#e9edf2] py-18 text-[#08111f] sm:py-24">
        <Container className="max-w-[1320px]">
          <SectionHeading
            light
            eyebrow="Operational track record"
            title="Proof from the quay, the rig and the vessel schedule."
            body="Named campaigns and real Daron operational imagery show where the team has already executed under pressure."
          />
          <div className="mt-12 grid gap-3 lg:grid-cols-12">
            {operations.map((operation, index) => (
              <article key={operation.title} data-gsap="image-card" style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties} className={`group relative min-h-[410px] overflow-hidden border border-slate-300 bg-[#08111f] text-white ${operation.className}`}>
                <Image src={operation.image} alt={operation.alt} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover opacity-78 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-90" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,31,.08),rgba(8,17,31,.3)_42%,rgba(8,17,31,.98))]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.16em]">
                    <span className="text-[var(--color-cta)]">{operation.number}</span>
                    <span className="text-white/70">{operation.meta}</span>
                  </div>
                  <h3 className="mt-4 max-w-xl text-2xl font-black uppercase sm:text-3xl">{operation.title}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/68">{operation.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/track-record" className="inline-flex min-h-12 items-center justify-center bg-[#08111f] px-6 py-3 text-xs font-black uppercase tracking-[0.13em] text-white transition hover:bg-[var(--color-cta)] hover:text-[#08111f]">View full track record</Link>
            <Link href="/services/dry-dock" className="inline-flex min-h-12 items-center justify-center border border-slate-400 px-6 py-3 text-xs font-black uppercase tracking-[0.13em] text-[#08111f] transition hover:border-[#08111f]">Explore dry-dock support</Link>
          </div>
        </Container>
      </section>

      <section className="command-defer border-y border-white/10 bg-[#071321] py-18 sm:py-24">
        <Container className="max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
            <div data-gsap="fade-up">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">African supply network</p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-[1.02] sm:text-5xl">Walvis Bay control. Regional reach.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/62">Daron connects local port knowledge, warehousing, vehicles and technical sourcing with the wider Daron Group supplier network across Southern and West Africa.</p>
              <div className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
                {["Namibia", "Angola", "Congo", "Gabon", "Mozambique", "South Africa"].map((country) => (
                  <div key={country} className="bg-[#071321] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/64">{country}</div>
                ))}
              </div>
            </div>
            <div data-gsap="network-map">
              <OperationsNetworkCanvas />
            </div>
          </div>
        </Container>
      </section>

      <section className="command-defer bg-[#f8fafc] py-16 text-[#08111f] sm:py-20">
        <Container className="max-w-[1320px]">
          <div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr] lg:items-start">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent-text)]">Procurement confidence</p>
              <h2 className="mt-5 text-3xl font-black uppercase leading-[1.05] sm:text-4xl">Controls buyers can defend.</h2>
              <p className="mt-5 text-sm leading-7 text-slate-600">Recognised quality, food-safety and procurement standards support every operational response.</p>
            </div>
            <div className="grid grid-cols-2 gap-px border border-slate-300 bg-slate-300 lg:grid-cols-4">
              {controls.map((control) => (
                <div key={control} className="min-h-32 bg-white p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-cta-text)]">Verified control</p>
                  <p className="mt-5 text-lg font-black">{control}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 overflow-hidden border-y border-slate-200 py-7" aria-label="Operators and partners Daron has supported">
            <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
              {clients.map((client) => (
                <li key={client.name} className="flex min-h-12 items-center justify-center text-center">
                  {client.logo ? (
                    <Image src={client.logo} alt={`${client.name} logo`} width={client.logoWidth ?? 160} height={client.logoHeight ?? 48} className="max-h-9 w-auto max-w-[120px] object-contain grayscale opacity-68" />
                  ) : (
                    <span className="text-xs font-black uppercase">{client.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="command-defer relative isolate overflow-hidden bg-[#050b14] py-20 sm:py-28">
        <Image src="/generated/daron/port-logistics-night.jpg" alt="Walvis Bay port and marine logistics operating at night" fill sizes="100vw" className="object-cover opacity-48" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050b14_0%,rgba(5,11,20,.92)_46%,rgba(5,11,20,.58)_100%)]" />
        <div className="industrial-grid absolute inset-0 opacity-22" aria-hidden="true" />
        <Container className="relative max-w-[1320px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-cta)]">Start an operation</p>
              <h2 className="mt-5 text-balance text-4xl font-black uppercase leading-[0.98] sm:text-6xl">Complex requirement? Put Daron on it.</h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/66">Send the RFQ, call the operations desk or open WhatsApp. A Daron specialist will take control of the commercial response and delivery path.</p>
            </div>
            <div className="flex min-w-[260px] flex-col gap-3">
              <Link href="/contact" className="inline-flex min-h-13 items-center justify-center bg-[var(--color-cta)] px-7 py-4 text-sm font-black uppercase tracking-[0.13em] text-[var(--color-cta-ink)] transition hover:bg-white">Send your RFQ <span className="ml-4" aria-hidden="true">→</span></Link>
              <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 items-center justify-center border border-white/24 bg-white/[0.055] px-7 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white backdrop-blur-md transition hover:border-white/60">WhatsApp operations</a>
              <p className="pt-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">{contact.emails.operations}</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function SectionHeading({
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
      <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${light ? "text-[var(--color-accent-text)]" : "text-[var(--color-accent)]"}`}>{eyebrow}</p>
      <h2 className={`mt-5 text-balance text-4xl font-black uppercase leading-[1.02] sm:text-5xl lg:text-6xl ${light ? "text-[#08111f]" : "text-white"}`}>{title}</h2>
      <p className={`mt-6 max-w-2xl text-base leading-8 ${light ? "text-slate-600" : "text-white/62"}`}>{body}</p>
    </div>
  );
}
