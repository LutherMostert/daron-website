"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ConversionAnalytics() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!target) return;
      const href = target.href;
      if (href.startsWith("tel:")) trackEvent("Phone_Click");
      else if (href.startsWith("mailto:")) trackEvent("Email_Click");
      else if (href.includes("wa.me/") || href.includes("whatsapp.com/")) trackEvent("WhatsApp_Click");
      else {
        const url = new URL(href);
        if (url.hostname === "daron-group.com") trackEvent("Group_Capability_Click", { destination: url.pathname });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
