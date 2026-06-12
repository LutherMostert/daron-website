"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Hero entrance — staggers in every `[data-hero-seq]` element on first paint.
 * Mounted once inside the hero. Skipped entirely under prefers-reduced-motion
 * (elements are fully visible in markup; GSAP only ever animates FROM hidden,
 * so no-JS users see the complete hero).
 */
export function HeroTimeline() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = gsap.utils.toArray<HTMLElement>("[data-hero-seq]");
    if (targets.length === 0) return;

    const tl = gsap.from(targets, {
      opacity: 0,
      y: 26,
      duration: 0.75,
      ease: "power3.out",
      stagger: 0.09,
      clearProps: "opacity,transform",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return null;
}
