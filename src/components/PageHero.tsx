import { type ReactNode } from "react";
import { Container } from "./Container";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="bg-[var(--color-navy)] text-white">
      <Container className="py-20 sm:py-28">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-[family-name:var(--font-poppins)] text-3xl font-bold leading-tight sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {intro}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
