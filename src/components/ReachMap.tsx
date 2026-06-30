"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ReachNode = {
  /** Stylised map position (viewBox 0 0 800 620) — not cartographic. */
  x: number;
  y: number;
  label: string;
  /** Dashed arc + hollow node for the off-continent supplier network. */
  dashed?: boolean;
  /** Quadratic arc path from the Walvis Bay hub. */
  arc: string;
  /** Label anchor side. */
  anchor?: "start" | "end" | "middle";
};

const HUB = { x: 368, y: 472 };

/**
 * "African reach" network visual — animated route lines from the Walvis Bay
 * hub to the Daron Group's real operating countries. GSAP + ScrollTrigger
 * draw the arcs (stroke-dashoffset) and pop the nodes when the band scrolls
 * into view. Everything is fully visible in markup; animation only ever runs
 * FROM hidden, so no-JS and prefers-reduced-motion users see the finished map.
 */
export function ReachMap({
  nodes,
  hubLabel,
}: {
  nodes: ReachNode[];
  hubLabel: string;
}) {
  const rootRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const arcs = gsap.utils.toArray<SVGPathElement>("[data-arc]", root);
      const dots = gsap.utils.toArray<SVGGElement>("[data-node]", root);
      const labels = gsap.utils.toArray<SVGTextElement>("[data-label]", root);
      const rings = gsap.utils.toArray<SVGCircleElement>("[data-ring]", root);

      // Prepare line-draw: dash each arc by its own length.
      arcs.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(dots, { scale: 0, transformOrigin: "center", opacity: 0 });
      gsap.set(labels, { opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
          defaults: { ease: "power2.out" },
        })
        .to(arcs, { strokeDashoffset: 0, duration: 1.4, stagger: 0.12 })
        .to(dots, { scale: 1, opacity: 1, duration: 0.45, stagger: 0.08 }, "-=0.9")
        .to(labels, { opacity: 1, duration: 0.5, stagger: 0.06 }, "-=0.5");

      // Radar pulse on the hub, forever but gentle.
      rings.forEach((ring, i) => {
        gsap.fromTo(
          ring,
          { attr: { r: 10 }, opacity: 0.55 },
          {
            attr: { r: 46 },
            opacity: 0,
            duration: 2.6,
            repeat: -1,
            delay: i * 1.3,
            ease: "power1.out",
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 800 620"
      role="img"
      aria-label={hubLabel}
      className="h-auto w-full"
    >
      <defs>
        <pattern id="reach-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M40 0H0V40"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id="reach-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(21,180,199,0.28)" />
          <stop offset="100%" stopColor="rgba(21,180,199,0)" />
        </radialGradient>
      </defs>

      {/* coordinate grid + hub glow */}
      <rect width="800" height="620" fill="url(#reach-grid)" />
      <circle cx={HUB.x} cy={HUB.y} r="130" fill="url(#reach-glow)" />

      {/* route arcs */}
      {nodes.map((n) => (
        <path
          key={`arc-${n.label}`}
          data-arc
          d={n.arc}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={n.dashed ? 1.5 : 2}
          strokeLinecap="round"
          opacity={n.dashed ? 0.55 : 0.85}
          {...(n.dashed ? { strokeDasharray: "6 6" } : {})}
        />
      ))}

      {/* destination nodes + labels */}
      {nodes.map((n) => (
        <g key={`node-${n.label}`}>
          <g data-node>
            <circle
              cx={n.x}
              cy={n.y}
              r="6"
              fill={n.dashed ? "transparent" : "var(--color-accent)"}
              stroke="var(--color-accent)"
              strokeWidth="2"
            />
          </g>
          <text
            data-label
            x={n.anchor === "end" ? n.x - 12 : n.anchor === "middle" ? n.x : n.x + 12}
            y={n.y + 4}
            textAnchor={n.anchor ?? "start"}
            className="fill-white/85"
            fontSize="15"
            fontWeight="600"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Walvis Bay hub: radar rings + safety-orange core */}
      <circle data-ring cx={HUB.x} cy={HUB.y} r="10" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0" />
      <circle data-ring cx={HUB.x} cy={HUB.y} r="10" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0" />
      <circle cx={HUB.x} cy={HUB.y} r="9" fill="var(--color-cta)" stroke="#fff" strokeWidth="2.5" />
      <text
        x={HUB.x + 18}
        y={HUB.y + 5}
        className="fill-white"
        fontSize="17"
        fontWeight="700"
      >
        {hubLabel}
      </text>
      <text
        x={HUB.x + 18}
        y={HUB.y + 24}
        className="fill-white/55"
        fontSize="12"
        fontFamily="monospace"
      >
        22.95°S · 14.50°E
      </text>
    </svg>
  );
}
