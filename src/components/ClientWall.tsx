import { getTranslations } from "next-intl/server";
import { clients } from "@/lib/site";
import { Container } from "./Container";

/**
 * "Trusted by" wall — real operator / vessel / partner names already public on
 * the site (not logos, to avoid trademark-usage questions). Renders from
 * site.ts `clients`.
 */
export async function ClientWall({
  variant = "white",
}: {
  variant?: "white" | "sand";
}) {
  const t = await getTranslations("Proof");

  return (
    <section
      className={
        variant === "sand"
          ? "bg-[var(--color-sand)] py-16 sm:py-20"
          : "bg-white py-16 sm:py-20"
      }
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-text)]">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
            {t("heading")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-mute)]">
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
              className="rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 text-center shadow-sm"
            >
              <p className="font-[family-name:var(--font-poppins)] text-base font-bold text-[var(--color-navy)]">
                {c.name}
              </p>
              <p className="mt-1 text-[11px] leading-tight text-[var(--color-mute)]">
                {c.note}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
