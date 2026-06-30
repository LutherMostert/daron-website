"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroMetric = {
  label: string;
  value: string;
};

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  posterSrc: string;
  videoSrc?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  metrics: HeroMetric[];
};

export function CinematicHero({
  eyebrow,
  title,
  intro,
  posterSrc,
  videoSrc,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  metrics,
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root) return;

    let frame = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const rect = root.getBoundingClientRect();
      const travel = Math.max(1, rect.height + window.innerHeight);
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel));
      root.style.setProperty("--hero-progress", progress.toFixed(4));

      if (video && video.duration && !prefersReduced) {
        video.currentTime = Math.min(video.duration - 0.08, progress * video.duration);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#07111f] text-white"
    >
      <div className="absolute inset-0">
        <Image
          src={posterSrc}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="hero-media object-cover object-center opacity-90"
          aria-hidden="true"
        />
        {videoSrc && !videoFailed ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-95"
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            onError={() => setVideoFailed(true)}
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,.96),rgba(7,17,31,.74)_42%,rgba(7,17,31,.28))]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(249,115,22,.22),transparent_30%),radial-gradient(circle_at_22%_72%,rgba(21,180,199,.18),transparent_34%)]" />
      <div aria-hidden="true" className="industrial-grid absolute inset-0 opacity-45" />
      <div aria-hidden="true" className="scanline absolute inset-x-0 top-0 h-px bg-[var(--color-cta)]/70" />

      <div className="relative mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-7xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-16 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(360px,.58fr)] lg:items-end">
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-poppins)] text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.88] tracking-normal">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/76 sm:text-xl">
              {intro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={primaryHref}
                target={primaryHref.startsWith("http") ? "_blank" : undefined}
                rel={primaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
                className="magnetic-action inline-flex items-center justify-center rounded-full bg-[var(--color-cta)] px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-cta-ink)] transition-transform active:translate-y-[1px]"
              >
                {primaryLabel}
              </a>
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur transition-colors hover:bg-white/[0.12] active:translate-y-[1px]"
              >
                {secondaryLabel}
              </a>
            </div>
          </div>

          <aside className="liquid-panel relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
                Live operating posture
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                Active
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="border-t border-white/10 pt-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/42">
                    {metric.label}
                  </dt>
                  <dd className="mt-2 font-[family-name:var(--font-poppins)] text-2xl font-black text-white">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 rounded-2xl border border-white/10 bg-[#081726]/80 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-cta)]">
                Mission brief
              </p>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Walvis Bay base. African reach. Marine supply, offshore support, logistics and AI-assisted RFQ control under one operational roof.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
