"use client";

import { useEffect, useRef } from "react";

type NetworkNode = {
  id: string;
  x: number;
  y: number;
  hub?: boolean;
  dashed?: boolean;
  floating?: boolean;
  labelDx?: number;
  labelDy?: number;
};

type MapRing = [number, number][];

type MapCountry = {
  name: string;
  operating: boolean;
  rings: MapRing[];
};

type AfricaMapData = {
  countries: MapCountry[];
};

const MAP_INSET = {
  left: 0.08,
  right: 0.08,
  top: 0.08,
  bottom: 0.05,
};

const nodes: NetworkNode[] = [
  { id: "Walvis Bay", x: 0.46, y: 0.824, hub: true, labelDx: 18, labelDy: -1 },
  { id: "Angola", x: 0.443, y: 0.633, labelDx: 14, labelDy: 6 },
  { id: "Congo", x: 0.425, y: 0.578, labelDx: 14, labelDy: 10 },
  { id: "Gabon", x: 0.384, y: 0.523, labelDx: 14, labelDy: -14 },
  { id: "Mozambique", x: 0.735, y: 0.775, labelDx: 14, labelDy: -2 },
  { id: "South Africa", x: 0.56, y: 0.905, labelDx: 14, labelDy: 0 },
  { id: "France supply node", x: 0.3, y: 0.075, dashed: true, floating: true, labelDx: 14, labelDy: -2 },
];

function mapX(x: number) {
  return MAP_INSET.left + x * (1 - MAP_INSET.left - MAP_INSET.right);
}

function mapY(y: number) {
  return MAP_INSET.top + y * (1 - MAP_INSET.top - MAP_INSET.bottom);
}

function displayPoint(node: NetworkNode | { x: number; y: number; floating?: boolean }) {
  return {
    x: node.floating ? node.x : mapX(node.x),
    y: node.floating ? node.y : mapY(node.y),
  };
}

function route(a: NetworkNode, b: NetworkNode) {
  const start = displayPoint(a);
  const end = displayPoint(b);
  const northbound = end.y < start.y;
  const westbound = end.x < start.x;
  const overseas = b.dashed;

  return {
    start,
    end,
    dashed: overseas,
    control: {
      x: (start.x + end.x) / 2 + (overseas ? -0.1 : westbound ? -0.06 : 0.08),
      y: (start.y + end.y) / 2 - (overseas ? 0.16 : northbound ? 0.1 : 0.035),
    },
  };
}

function overlayPosition(node: NetworkNode) {
  const p = displayPoint(node);

  return {
    left: `calc(${p.x * 100}% + ${node.labelDx ?? 10}px)`,
    top: `calc(${p.y * 100}% + ${node.labelDy ?? 0}px)`,
  };
}

export function OperationsNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mapDataRef = useRef<AfricaMapData | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const surface = canvas;
    const ctx = context;

    let frame = 0;
    let width = 0;
    let height = 0;
    let alive = true;
    let visible = false;
    const hub = nodes[0];
    const routes = nodes.slice(1).map((node) => route(hub, node));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const rect = surface.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      surface.width = Math.round(width * dpr);
      surface.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function point(p: { x: number; y: number }) {
      return { x: p.x * width, y: p.y * height };
    }

    function mapPoint(p: [number, number]) {
      return { x: mapX(p[0]) * width, y: mapY(p[1]) * height };
    }

    function drawCountry(country: MapCountry) {
      ctx.beginPath();
      country.rings.forEach((ring) => {
        ring.forEach((coordinate, index) => {
          const p = mapPoint(coordinate);
          if (index === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.lineTo(p.x, p.y);
          }
        });
        ctx.closePath();
      });
    }

    function quadratic(a: { x: number; y: number }, c: { x: number; y: number }, b: { x: number; y: number }, t: number) {
      const mt = 1 - t;
      return {
        x: mt * mt * a.x + 2 * mt * t * c.x + t * t * b.x,
        y: mt * mt * a.y + 2 * mt * t * c.y + t * t * b.y,
      };
    }

    function drawMap() {
      const mapData = mapDataRef.current;
      if (!mapData) return;

      ctx.save();
      ctx.shadowColor = "rgba(21,180,199,.1)";
      ctx.shadowBlur = 24;
      mapData.countries.forEach((country) => {
        if (country.operating) return;
        drawCountry(country);
        ctx.fillStyle = "rgba(255,255,255,.038)";
        ctx.strokeStyle = "rgba(255,255,255,.18)";
        ctx.lineWidth = 0.8;
        ctx.fill("evenodd");
        ctx.stroke();
      });
      ctx.restore();

      ctx.save();
      mapData.countries.forEach((country) => {
        if (!country.operating) return;
        drawCountry(country);
        ctx.fillStyle = country.name === "Namibia" ? "rgba(249,115,22,.22)" : "rgba(21,180,199,.15)";
        ctx.strokeStyle = country.name === "Namibia" ? "rgba(249,115,22,.58)" : "rgba(21,180,199,.42)";
        ctx.lineWidth = country.name === "Namibia" ? 1.4 : 1.1;
        ctx.fill("evenodd");
        ctx.stroke();
      });
      ctx.restore();
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#07111f";
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalAlpha = 0.42;
      ctx.strokeStyle = "rgba(255,255,255,.07)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 34) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 34) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      drawMap();

      routes.forEach((r, index) => {
        const a = point(r.start);
        const b = point(r.end);
        const c = point(r.control);

        ctx.save();
        ctx.strokeStyle = r.dashed ? "rgba(21,180,199,.26)" : "rgba(21,180,199,.58)";
        ctx.setLineDash(r.dashed ? [7, 8] : []);
        ctx.lineWidth = r.dashed ? 1 : 1.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(c.x, c.y, b.x, b.y);
        ctx.stroke();
        ctx.restore();

        if (!reduced) {
          for (let i = 0; i < 3; i += 1) {
            const t = (time / 2700 + index * 0.13 + i * 0.31) % 1;
            const p = quadratic(a, c, b, t);
            ctx.save();
            ctx.fillStyle = i === 0 ? "rgba(249,115,22,.94)" : "rgba(21,180,199,.84)";
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(p.x, p.y, i === 0 ? 3.2 : 2.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      });

      nodes.forEach((n) => {
        const p = point(displayPoint(n));
        ctx.save();
        ctx.fillStyle = n.hub ? "#f97316" : "#15b4c7";
        ctx.strokeStyle = "rgba(255,255,255,.82)";
        ctx.lineWidth = n.hub ? 2.4 : 1.4;
        ctx.shadowColor = n.hub ? "rgba(249,115,22,.46)" : "rgba(21,180,199,.36)";
        ctx.shadowBlur = n.hub ? 28 : 14;
        ctx.beginPath();
        ctx.arc(p.x, p.y, n.hub ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

    }

    function tick(time: number) {
      draw(time);
      frame = visible && !reduced ? requestAnimationFrame(tick) : 0;
    }

    function startAnimation() {
      if (!reduced && visible && frame === 0) {
        frame = requestAnimationFrame(tick);
      }
    }

    function stopAnimation() {
      if (frame !== 0) cancelAnimationFrame(frame);
      frame = 0;
      draw(performance.now());
    }

    resize();
    draw(0);

    fetch("/generated/maps/africa-network-map.json")
      .then((response) => {
        if (!response.ok) throw new Error("Africa map data failed to load");
        return response.json() as Promise<AfricaMapData>;
      })
      .then((data) => {
        if (!alive) return;
        mapDataRef.current = data;
        draw(performance.now());
        startAnimation();
      })
      .catch(() => {
        mapDataRef.current = null;
      });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(surface);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startAnimation();
        else stopAnimation();
      },
      { rootMargin: "120px 0px", threshold: 0.01 },
    );
    visibilityObserver.observe(surface);

    return () => {
      alive = false;
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-md border border-white/10 bg-[#07111f] shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
      <canvas
        ref={canvasRef}
        className="h-[420px] w-full"
        aria-label="Animated logistics route map from Walvis Bay to Daron Group operating countries"
      />
      <div className="pointer-events-none absolute inset-0">
        {nodes.map((node) => (
          <span
            key={node.id}
            className={`absolute rounded-full border border-white/10 bg-[#07111f]/72 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/72 backdrop-blur ${
              node.hub ? "text-[var(--color-cta)]" : ""
            }`}
            style={{
              ...overlayPosition(node),
              transform: "translateY(-50%)",
            }}
          >
            {node.id}
          </span>
        ))}
      </div>
    </div>
  );
}
