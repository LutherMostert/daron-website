"use client";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/routing";

/** The English concept carries its own navigation; existing translated pages retain theirs. */
export function PreviewChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  return pathname === "/" && locale === "en" ? null : <>{children}</>;
}
