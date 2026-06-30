"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site motion controller.
 * Uses GSAP for scroll-triggered reveals, route-line growth, service-card tactility,
 * RFQ workflow sequencing and cinematic hero parallax. Reduced-motion users get a
 * static, fully visible page.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-gsap]").forEach((el) => {
        el.classList.add("is-visible");
        gsap.set(el, { clearProps: "all", opacity: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set("[data-reveal], [data-gsap='fade-up'], [data-gsap='service-card'], [data-gsap='image-card']", {
        autoAlpha: 0,
        y: 28,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal], [data-gsap='fade-up']").forEach((el) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: parseDelay(el),
          scrollTrigger: {
            trigger: el,
            start: "top 84%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap='service-card']").forEach((el) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: parseDelay(el),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });

        const onMove = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
          const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
          gsap.to(el, { x, y, duration: 0.35, ease: "power2.out" });
        };
        const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.45)" });
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap='image-card']").forEach((el) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: parseDelay(el),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.from("[data-gsap='hero-copy'] > *", {
        autoAlpha: 0,
        y: 34,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
      });

      gsap.from("[data-gsap='hero-panel']", {
        autoAlpha: 0,
        y: 42,
        duration: 1,
        ease: "power3.out",
        delay: 0.25,
      });

      gsap.to(".ops-hero .hero-media", {
        yPercent: 8,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".ops-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from("[data-gsap='network-map']", {
        autoAlpha: 0,
        scale: 0.96,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-gsap='network-map']", start: "top 78%", once: true },
      });

      gsap.from(".rfq-step", {
        autoAlpha: 0,
        x: 28,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-gsap='rfq-workflow']", start: "top 76%", once: true },
      });

      gsap.fromTo(
        ".route-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-gsap='rfq-workflow']", start: "top 75%", once: true },
        },
      );
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return null;
}

function parseDelay(el: HTMLElement): number {
  const raw = el.style.getPropertyValue("--reveal-delay").trim();
  if (!raw) return 0;
  if (raw.endsWith("ms")) return Number.parseFloat(raw) / 1000;
  if (raw.endsWith("s")) return Number.parseFloat(raw);
  return 0;
}
