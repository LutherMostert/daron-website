"use client";

import { useEffect, useRef, useState } from "react";

type NetworkInformation = {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
};

export function DeferredHeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as NavigatorWithConnection).connection;
    const constrained = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "");

    if (!desktop || reduced || constrained) return;

    const timer = window.setTimeout(() => setEnabled(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video) return;

    const updatePlayback = (visible: boolean) => {
      if (visible && document.visibilityState === "visible") {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    let inView = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        updatePlayback(inView);
      },
      { threshold: 0.05 },
    );
    const onVisibility = () => updatePlayback(inView);

    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 hidden h-full w-full object-cover mix-blend-screen transition-opacity duration-700 md:block ${
        ready ? "opacity-32" : "opacity-0"
      }`}
      muted
      autoPlay
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onCanPlay={() => setReady(true)}
    >
      <source src="/generated/daron/hero-offshore-operations.mp4" type="video/mp4" />
    </video>
  );
}
