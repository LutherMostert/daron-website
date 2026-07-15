"use client";

import { useTranslations } from "next-intl";
import { contact } from "@/lib/site";

/**
 * Mobile sticky conversion bar — RFQ, operations chat and tap-to-call, always one
 * thumb away. Hidden at xl+ where the sticky header CTA covers the same job.
 * The flow spacer keeps the bar from covering the footer's last lines.
 */
export function StickyActions() {
  const t = useTranslations("Sticky");
  const tChat = useTranslations("ChatWidget");

  return (
    <>
      <div aria-hidden="true" className="h-14 xl:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-px border-t border-[var(--color-line)] bg-[var(--color-line)] pb-[env(safe-area-inset-bottom)] xl:hidden">
        <a
          href={contact.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="plausible-event-name=RFQ_WhatsApp flex items-center justify-center gap-2 bg-[var(--color-cta)] py-3.5 text-sm font-semibold text-[var(--color-cta-ink)]"
        >
          {t("rfq")} &rarr;
        </a>
        <a
          href={contact.phone.href}
          className="flex items-center justify-center gap-2 bg-[var(--color-navy)] py-3.5 text-sm font-semibold text-white"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {t("call")}
        </a>
        <button
          type="button"
          aria-label={`AI chat: ${tChat("openChat")}`}
          onClick={() => window.dispatchEvent(new Event("daron:open-chat"))}
          className="flex items-center justify-center gap-1.5 bg-white py-3.5 text-sm font-semibold text-[var(--color-navy)]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          AI chat
        </button>
      </div>
    </>
  );
}
