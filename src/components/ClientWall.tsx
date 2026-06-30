import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { clients } from "@/lib/site";
import { Container } from "./Container";

/**
 * "Trusted by" wall — real operators / partners from site.ts `clients`.
 * Renders the official logo where we hold one (grayscale at rest for a calm,
 * uniform wall; full colour on hover), with the name + note as text fallback.
 * Logo usage approved by Luther (MD), 2026-06-12.
 */
export async function ClientWall({
  variant = "white",
}: {
  variant?: "white" | "sand" | "navy";
}) {
  const t = await getTranslations("Proof");
  const isNavy = variant === "navy";

  return (
    <section
      className={
        isNavy
          ? "dark-section border-y border-white/10 py-16 text-white sm:py-20"
          : variant === "sand"
          ? "bg-[var(--color-sand)] py-16 sm:py-20"
          : "bg-white py-16 sm:py-20"
      }
    >
      <Container>
        <div className="max-w-2xl">
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isNavy ? "text-[var(--color-accent)]" : "text-[var(--color-accent-text)]"}`}>
            {t("eyebrow")}
          </p>
          <h2 className={`mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl ${isNavy ? "text-white" : "text-[var(--color-navy)]"}`}>
            {t("heading")}
          </h2>
          <p className={`mt-3 text-sm leading-relaxed ${isNavy ? "text-white/62" : "text-[var(--color-mute)]"}`}>
            {t("intro")}
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((c, idx) => (
            <li
              key={c.name}
              data-reveal
              style={
                { "--reveal-delay": `${Math.min(idx, 8) * 45}ms` } as React.CSSProperties
              }
              className={`group flex flex-col items-center justify-center rounded-xl px-5 py-4 text-center shadow-sm ${
                isNavy
                  ? "border border-white/10 bg-white/[0.05] shadow-black/20"
                  : "border border-[var(--color-line)] bg-white"
              }`}
            >
              {c.logo ? (
                <span className="flex h-14 items-center justify-center">
                  <Image
                    src={c.logo}
                    alt={`${c.name} logo`}
                    width={c.logoWidth ?? 160}
                    height={c.logoHeight ?? 48}
                    className={`w-auto max-w-[150px] object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 ${
                      (c.logoHeight ?? 0) > (c.logoWidth ?? 1)
                        ? "max-h-14"
                        : "max-h-9"
                    }`}
                  />
                </span>
              ) : (
                <p className={`font-[family-name:var(--font-poppins)] text-base font-bold ${isNavy ? "text-white" : "text-[var(--color-navy)]"}`}>
                  {c.name}
                </p>
              )}
              <p className={`mt-1.5 text-[11px] leading-tight ${isNavy ? "text-white/52" : "text-[var(--color-mute)]"}`}>
                {c.note}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
