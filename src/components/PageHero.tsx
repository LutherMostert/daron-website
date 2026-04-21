import Image from "next/image";
import { type ReactNode } from "react";
import { Container } from "./Container";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: {
    src: string;
    alt?: string;
  };
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, intro, image, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy)] text-white">
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt || ""}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden={image.alt ? undefined : true}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)]/92 via-[var(--color-navy)]/75 to-[var(--color-navy)]/50"
          />
        </>
      )}
      <Container className="relative py-20 sm:py-28">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-[family-name:var(--font-poppins)] text-3xl font-bold leading-tight sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {intro}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
