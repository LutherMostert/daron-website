"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    if (reduced || mobile) {
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-gsap]").forEach((el) => {
        el.classList.add("is-visible");
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
        el.style.removeProperty("visibility");
      });
      return;
    }

    let cancelled = false;
    let cleanup = () => undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollModule]) => {
        if (cancelled) return;

        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollModule.ScrollTrigger;
        const listenerCleanups: Array<() => void> = [];
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          gsap.set("[data-reveal], [data-gsap='fade-up'], [data-gsap='service-card'], [data-gsap='image-card']", {
            autoAlpha: 0,
            y: 24,
          });

          gsap.utils.toArray<HTMLElement>("[data-reveal], [data-gsap='fade-up']").forEach((el) => {
            gsap.to(el, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              delay: parseDelay(el),
              scrollTrigger: { trigger: el, start: "top 86%", once: true },
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-gsap='service-card']").forEach((el) => {
            gsap.to(el, {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              delay: parseDelay(el),
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });

            if (!canHover) return;
            const onMove = (event: MouseEvent) => {
              const rect = el.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
              const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
              gsap.to(el, { x, y, duration: 0.3, ease: "power2.out" });
            };
            const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.35, ease: "power2.out" });
            el.addEventListener("mousemove", onMove);
            el.addEventListener("mouseleave", onLeave);
            listenerCleanups.push(() => {
              el.removeEventListener("mousemove", onMove);
              el.removeEventListener("mouseleave", onLeave);
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-gsap='image-card']").forEach((el) => {
            gsap.to(el, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              delay: parseDelay(el),
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
          });

          gsap.from("[data-gsap='hero-copy'] > *", {
            autoAlpha: 0,
            y: 24,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.07,
          });

          gsap.from("[data-gsap='hero-panel']", {
            autoAlpha: 0,
            y: 28,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.18,
          });

          gsap.to(".ops-hero .hero-media", {
            yPercent: 5,
            scale: 1.04,
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
            scale: 0.98,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-gsap='network-map']", start: "top 82%", once: true },
          });

          gsap.from(".rfq-step", {
            autoAlpha: 0,
            x: 22,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-gsap='rfq-workflow']", start: "top 80%", once: true },
          });

          gsap.fromTo(
            ".route-line",
            { scaleY: 0, transformOrigin: "top" },
            {
              scaleY: 1,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: { trigger: "[data-gsap='rfq-workflow']", start: "top 80%", once: true },
            },
          );
        });

        ScrollTrigger.refresh();
        cleanup = () => {
          listenerCleanups.forEach((remove) => remove());
          ctx.revert();
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
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
