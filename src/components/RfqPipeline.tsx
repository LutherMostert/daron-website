import { useTranslations } from "next-intl";

/**
 * The RFQ lifecycle — Received → Matched → Quoted → Reviewed → Delivered.
 * Steps fade-up in sequence via the data-reveal stagger (reduced-motion safe),
 * with a connecting rail on md+. `onDark` flips the palette for navy bands.
 */
export function RfqPipeline({ onDark = false }: { onDark?: boolean }) {
  const t = useTranslations("Pipeline");
  const steps = [1, 2, 3, 4, 5] as const;

  return (
    <div className="mt-14">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
          onDark ? "text-[var(--color-accent)]" : "text-[var(--color-accent-text)]"
        }`}
      >
        {t("eyebrow")}
      </p>
      <p
        className={`mt-2 font-[family-name:var(--font-poppins)] text-lg font-semibold ${
          onDark ? "text-white" : "text-[var(--color-navy)]"
        }`}
      >
        {t("heading")}
      </p>

      <ol className="relative mt-8 grid gap-6 md:grid-cols-5 md:gap-4">
        {/* connecting rail (md+) */}
        <div
          aria-hidden="true"
          className={`absolute left-0 right-0 top-4 hidden h-px md:block ${
            onDark ? "bg-white/15" : "bg-[var(--color-line)]"
          }`}
        />
        {steps.map((n, idx) => (
          <li
            key={n}
            data-reveal
            style={{ "--reveal-delay": `${idx * 120}ms` } as React.CSSProperties}
            className="relative"
          >
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full font-[family-name:var(--font-poppins)] text-sm font-bold ${
                n === 4
                  ? "bg-[var(--color-cta)] text-[var(--color-cta-ink)]"
                  : onDark
                    ? "bg-[var(--color-accent)] text-[var(--color-navy)]"
                    : "bg-[var(--color-navy)] text-white"
              }`}
              aria-hidden="true"
            >
              {n}
            </span>
            <p
              className={`mt-3 font-[family-name:var(--font-poppins)] text-base font-semibold ${
                onDark ? "text-white" : "text-[var(--color-navy)]"
              }`}
            >
              {t(`s${n}Title`)}
            </p>
            <p
              className={`mt-1.5 text-sm leading-relaxed ${
                onDark ? "text-white/70" : "text-[var(--color-mute)]"
              }`}
            >
              {t(`s${n}Body`)}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
