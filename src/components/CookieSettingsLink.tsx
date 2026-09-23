"use client";

import { useTranslations } from "next-intl";
import { openCookieSettings } from "@/lib/consent";

/** Footer control that reopens the cookie banner so visitors can change their choice. */
export function CookieSettingsLink({ className }: { className?: string }) {
  const t = useTranslations("Cookies");
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {t("settings")}
    </button>
  );
}
