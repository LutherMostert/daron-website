"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  /** Use a thousands separator (e.g. 2,500). */
  separator?: boolean;
  /** Disable animation when the final value must remain in rendered HTML. */
  animate?: boolean;
  className?: string;
};

/**
 * Animated stat counter. Counts 0 → `to` once, the first time it scrolls into
 * view. Falls straight to the final value when prefers-reduced-motion is set.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  durationMs = 1500,
  separator = true,
  animate = true,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [val, setVal] = useState(to);

  useEffect(() => {
    if (!animate) return;

    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            io.disconnect();
            if (reduce) {
              setVal(to);
              return;
            }
            setVal(0);
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / durationMs);
              const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
              setVal(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, durationMs, animate]);

  const displayValue = animate ? val : to;
  const formatted = separator ? displayValue.toLocaleString("en-US") : String(displayValue);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
