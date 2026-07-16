"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";

export function DonOperationsFlow() {
  const t = useTranslations("CommandHome");
  const workflow = [
    {
      id: "intake",
      number: "01",
      title: t("workflow.intake.title"),
      label: t("workflow.intake.label"),
      description: t("workflow.intake.description"),
      status: t("workflow.intake.status"),
      rows: [
        ["PDF", t("workflow.intake.rowPdf")],
        ["XLS", t("workflow.intake.rowXls")],
        ["MSG", t("workflow.intake.rowMsg")],
        ["WEB", t("workflow.intake.rowWeb")],
      ],
    },
    {
      id: "capture",
      number: "02",
      title: t("workflow.capture.title"),
      label: t("workflow.capture.label"),
      description: t("workflow.capture.description"),
      status: t("workflow.capture.status"),
      rows: [
        [t("workflow.capture.keyScope"), t("workflow.capture.rowScope")],
        [t("workflow.capture.keyPort"), "Walvis Bay"],
        [t("workflow.capture.keyPriority"), t("workflow.capture.rowPriority")],
        [t("workflow.capture.keyRoute"), t("workflow.capture.rowRoute")],
      ],
    },
    {
      id: "review",
      number: "03",
      title: t("workflow.review.title"),
      label: t("workflow.review.label"),
      description: t("workflow.review.description"),
      status: t("workflow.review.status"),
      rows: [
        [t("workflow.review.keySpec"), t("workflow.review.rowSpec")],
        [t("workflow.review.keySource"), t("workflow.review.rowSource")],
        ["ETA", t("workflow.review.rowEta")],
        [t("workflow.review.keyOwner"), t("workflow.review.rowOwner")],
      ],
    },
    {
      id: "response",
      number: "04",
      title: t("workflow.response.title"),
      label: t("workflow.response.label"),
      description: t("workflow.response.description"),
      status: t("workflow.response.status"),
      rows: [
        [t("workflow.response.keyQuote"), t("workflow.response.rowQuote")],
        [t("workflow.response.keyTiming"), t("workflow.response.rowTiming")],
        [t("workflow.response.keyDelivery"), t("workflow.response.rowDelivery")],
        [t("workflow.response.keyFollowUp"), t("workflow.response.rowFollowUp")],
      ],
    },
  ];
  const [active, setActive] = useState(0);
  const step = workflow[active];

  return (
    <div className="grid overflow-hidden border border-white/12 bg-[#050d18] lg:grid-cols-[0.82fr_1.18fr]">
      <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/64">{t("workflow.sequence")}</p>
        </div>
        <div role="tablist" aria-label={t("workflow.ariaLabel")}>
          {workflow.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`don-workflow-tab-${item.id}`}
              aria-selected={active === index}
              aria-controls="don-workflow-panel"
              onClick={() => setActive(index)}
              className={`group grid w-full grid-cols-[2.7rem_1fr_auto] items-center gap-3 border-b border-white/8 px-5 py-4 text-left transition duration-300 last:border-b-0 sm:px-6 ${
                active === index ? "bg-white/[0.07] text-white" : "text-white/68 hover:bg-white/[0.035] hover:text-white/88"
              }`}
            >
              <span className={`font-mono text-xs ${active === index ? "text-[var(--color-cta)]" : "text-white/62"}`}>{item.number}</span>
              <span>
                <span className="block text-sm font-bold">{item.title}</span>
                <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.15em] text-white/60 sm:block">{item.label}</span>
              </span>
              <span className={`h-1.5 w-1.5 rounded-full ${active === index ? "bg-[var(--color-cta)]" : "bg-white/18"}`} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div id="don-workflow-panel" role="tabpanel" aria-labelledby={`don-workflow-tab-${step.id}`} className="relative min-h-[420px] overflow-hidden p-5 sm:p-7 lg:p-9">
        <div className="industrial-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="command-scan absolute inset-x-0 top-0 h-px bg-[var(--color-accent)]/60" aria-hidden="true" />
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">{t("workflow.consoleTitle")}</p>
              <p className="mt-2 font-mono text-xs text-white/64">{t("workflow.consoleReference")}</p>
            </div>
            <span className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.04] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/64">
              <span className="live-status-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {step.status}
            </span>
          </div>

          <div key={step.id} className="workflow-panel-in mt-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-cta)]">{t("workflow.stage", { number: step.number })}</p>
            <h3 className="mt-3 max-w-xl text-2xl font-black text-white sm:text-3xl">{step.title}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/64 sm:text-base">{step.description}</p>

            <div className="mt-7 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {step.rows.map(([key, value]) => (
                <div key={key} className="grid min-h-20 grid-cols-[5.4rem_1fr] items-center gap-3 bg-[#071321] px-4 py-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/62">{key}</span>
                  <span className="text-sm font-semibold text-white/86">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SectorSelector() {
  const t = useTranslations("CommandHome");
  const sectors = [
    {
      id: "marine",
      name: t("sectors.marine.name"),
      eyebrow: t("sectors.marine.eyebrow"),
      title: t("sectors.marine.title"),
      body: t("sectors.marine.body"),
      image: "/images/site/operations/seven-borealis-dock.jpg",
      alt: t("sectors.marine.alt"),
      capabilities: [t("sectors.marine.cap1"), t("sectors.marine.cap2"), t("sectors.marine.cap3"), t("sectors.marine.cap4")],
      stat: "24/7",
      statLabel: t("sectors.marine.statLabel"),
      href: "/services/ship-chandlery" as const,
    },
    {
      id: "offshore",
      name: t("sectors.offshore.name"),
      eyebrow: t("sectors.offshore.eyebrow"),
      title: t("sectors.offshore.title"),
      body: t("sectors.offshore.body"),
      image: "/images/site/operations/daron-fleet-normand-energy.jpg",
      alt: t("sectors.offshore.alt"),
      capabilities: [t("sectors.offshore.cap1"), t("sectors.offshore.cap2"), t("sectors.offshore.cap3"), t("sectors.offshore.cap4")],
      stat: "3",
      statLabel: t("sectors.offshore.statLabel"),
      href: "/industries/oil-and-gas" as const,
    },
    {
      id: "maintenance",
      name: t("sectors.maintenance.name"),
      eyebrow: t("sectors.maintenance.eyebrow"),
      title: t("sectors.maintenance.title"),
      body: t("sectors.maintenance.body"),
      image: "/generated/daron/high-pressure-maintenance.jpg",
      alt: t("sectors.maintenance.alt"),
      capabilities: [t("sectors.maintenance.cap1"), t("sectors.maintenance.cap2"), t("sectors.maintenance.cap3"), t("sectors.maintenance.cap4")],
      stat: "UHP",
      statLabel: t("sectors.maintenance.statLabel"),
      href: "/services/dry-dock" as const,
    },
    {
      id: "catering",
      name: t("sectors.catering.name"),
      eyebrow: t("sectors.catering.eyebrow"),
      title: t("sectors.catering.title"),
      body: t("sectors.catering.body"),
      image: "/images/site/offshore-catering.jpg",
      alt: t("sectors.catering.alt"),
      capabilities: [t("sectors.catering.cap1"), t("sectors.catering.cap2"), t("sectors.catering.cap3"), t("sectors.catering.cap4")],
      stat: "HACCP",
      statLabel: t("sectors.catering.statLabel"),
      href: "/services" as const,
    },
  ];
  const [active, setActive] = useState(0);
  const sector = sectors[active];

  return (
    <div className="border border-white/12 bg-[#050d18]">
      <div className="grid border-b border-white/10 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label={t("sectors.ariaLabel")}>
        {sectors.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`sector-tab-${item.id}`}
            aria-selected={active === index}
            aria-controls="sector-panel"
            onClick={() => setActive(index)}
            className={`relative min-h-16 border-b border-white/10 px-4 py-4 text-left text-xs font-bold uppercase tracking-[0.08em] transition sm:border-r lg:border-b-0 ${
              active === index ? "bg-white/[0.08] text-white" : "text-white/66 hover:bg-white/[0.035] hover:text-white/88"
            }`}
          >
            <span className="mr-3 font-mono text-[9px] text-[var(--color-cta)]">0{index + 1}</span>
            {item.name}
            {active === index && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--color-cta)]" aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div id="sector-panel" role="tabpanel" aria-labelledby={`sector-tab-${sector.id}`} key={sector.id} className="sector-panel-in grid min-h-[520px] lg:grid-cols-[1.12fr_0.88fr]">
        <div className="relative min-h-[330px] overflow-hidden lg:min-h-full">
          <Image src={sector.image} alt={sector.alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,24,.05),rgba(5,13,24,.72))]" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-7">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/58">{sector.eyebrow}</p>
              <p className="mt-2 max-w-md text-sm font-semibold text-white/88">{t("sectors.operationalControl")}</p>
            </div>
            <div className="border-l border-[var(--color-cta)] pl-4 text-right">
              <p className="font-mono text-2xl font-bold text-white sm:text-3xl">{sector.stat}</p>
              <p className="mt-1 max-w-28 text-[10px] uppercase leading-4 tracking-[0.1em] text-white/68">{sector.statLabel}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">{sector.eyebrow}</p>
          <h3 className="mt-4 text-3xl font-black leading-[1.08] text-white sm:text-4xl">{sector.title}</h3>
          <p className="mt-5 text-sm leading-7 text-white/62 sm:text-base">{sector.body}</p>
          <ul className="mt-7 border-t border-white/10">
            {sector.capabilities.map((capability) => (
              <li key={capability} className="flex items-center gap-3 border-b border-white/10 py-3 text-sm text-white/78">
                <span className="h-px w-5 bg-[var(--color-cta)]" aria-hidden="true" />
                {capability}
              </li>
            ))}
          </ul>
          <Link href={sector.href} className="mt-7 inline-flex min-h-12 items-center justify-center self-start bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#07111f] transition hover:bg-[var(--color-cta)]">
            {t("openCapability")}
          </Link>
        </div>
      </div>
    </div>
  );
}
