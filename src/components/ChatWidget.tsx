"use client";

/**
 * Daron AI assistant — floating chat widget.
 *
 * Flow (Option A, gated):
 *   1. Visitor sees floating button bottom-right.
 *   2. Click → panel opens with intro + gate form (name, email, company/vessel, WhatsApp).
 *   3. Submit → POST /api/chat-lead (capture lead), transition to chat view.
 *   4. Each message → POST /api/chat with lead + message history → stream response.
 *
 * Session is held in sessionStorage so a page refresh does not lose the
 * conversation (but closing the tab does — that's intentional for a sales widget).
 *
 * Accessibility:
 *   - Button labelled `aria-label`; panel has `role="dialog"`; focus trap.
 *   - ESC to close.
 *
 * NOTE: Styling follows the site's Tailwind v4 tokens: `--color-accent`,
 * `--color-navy`, `--color-ink`, `--color-sand`, `--color-line`, `--color-mute`.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { contact } from "@/lib/site";

type Role = "user" | "assistant";
type Message = { role: Role; content: string };

type Lead = {
  name: string;
  email: string;
  company?: string;
  vessel?: string;
  whatsapp?: string;
};

const STORAGE_KEY = "daron-chat-v1";

type StoredState = {
  lead: Lead;
  messages: Message[];
};

function loadStored(): StoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredState;
    if (!parsed.lead?.email || !parsed.lead?.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveStored(state: StoredState) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota or privacy mode — ignore */
  }
}

export function ChatWidget() {
  const t = useTranslations("ChatWidget");
  const [open, setOpen] = useState(false);
  // Use lazy initial state so sessionStorage restoration happens during the
  // first client render (not in an effect) — avoids React Compiler "cascading
  // renders" warning and produces less flicker.
  const [lead, setLead] = useState<Lead | null>(() => loadStored()?.lead ?? null);
  const [messages, setMessages] = useState<Message[]>(
    () => loadStored()?.messages ?? [],
  );
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  // Persist whenever lead or messages change
  useEffect(() => {
    if (lead) saveStored({ lead, messages });
  }, [lead, messages]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus appropriately when opening
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      if (lead) {
        inputRef.current?.focus();
      } else {
        firstFieldRef.current?.focus();
      }
    }, 50);
    return () => clearTimeout(t);
  }, [open, lead]);

  const sendToServer = useCallback(
    async (leadForSend: Lead, history: Message[]) => {
      setStreaming(true);
      setError(null);
      const assistantIndex = history.length; // next message to append

      // Optimistically add empty assistant bubble to append into
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lead: leadForSend, messages: history }),
        });

        if (!res.ok) {
          const errJson = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(errJson.error || `Server returned ${res.status}`);
        }

        if (!res.body) throw new Error("No response stream.");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";

        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = prev.slice();
            next[assistantIndex] = { role: "assistant", content: acc };
            return next;
          });
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong.";
        setError(msg);
        setMessages((prev) => {
          const next = prev.slice();
          next[assistantIndex] = {
            role: "assistant",
            content: t("offlineError", { whatsapp: contact.whatsapp.display, email: contact.emails.operations }),
          };
          return next;
        });
      } finally {
        setStreaming(false);
      }
    },
    [t],
  );

  const handleGateSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      const form = e.currentTarget;
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const company = String(fd.get("company") || "").trim() || undefined;
      const vessel = String(fd.get("vessel") || "").trim() || undefined;
      const whatsapp = String(fd.get("whatsapp") || "").trim() || undefined;

      if (!name || !email || !email.includes("@")) {
        setError(t("validationError"));
        return;
      }

      const newLead: Lead = { name, email, company, vessel, whatsapp };

      // Fire-and-forget lead capture; don't block the chat
      void fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newLead,
          referrer: typeof document !== "undefined" ? document.referrer : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      }).catch(() => {
        /* non-fatal */
      });

      setLead(newLead);
      // Kick off the conversation with a neutral opener — Don's system prompt
      // already tells him to greet by first name.
      const opener: Message = { role: "user", content: `Hi Don.` };
      setMessages([opener]);
      void sendToServer(newLead, [opener]);
    },
    [sendToServer, t],
  );

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || streaming || !lead) return;
    const nextHistory: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextHistory);
    setInput("");
    void sendToServer(lead, nextHistory);
  }, [input, streaming, lead, messages, sendToServer]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleReset = useCallback(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
    setLead(null);
    setMessages([]);
    setInput("");
    setError(null);
  }, []);

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          type="button"
          aria-label={t("openChat")}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg transition-all hover:scale-105 hover:bg-[var(--color-accent-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 sm:bottom-8 sm:right-8"
        >
          <svg
            width="24"
            height="24"
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
          <span className="sr-only">{t("openChatSrOnly")}</span>
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 flex h-3 w-3"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-widget-title"
          className="fixed bottom-0 right-0 z-40 flex h-[min(640px,100dvh)] w-full flex-col border border-[var(--color-line)] bg-white shadow-2xl sm:bottom-6 sm:right-6 sm:h-[640px] sm:max-h-[calc(100dvh-3rem)] sm:w-[400px] sm:rounded-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] bg-[var(--color-navy)] px-4 py-3 text-white sm:rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)] text-base font-bold"
              >
                ⚓
              </div>
              <div>
                <p
                  id="chat-widget-title"
                  className="font-[family-name:var(--font-poppins)] text-sm font-semibold leading-none"
                >
                  {t("title")}
                </p>
                <p className="mt-0.5 text-xs text-white/70">
                  {t("subtitle")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {lead && (
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label={t("resetLabel")}
                  className="rounded-md px-2 py-1 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {t("reset")}
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("closeChat")}
                className="rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          {!lead ? (
            // GATE FORM
            <form
              onSubmit={handleGateSubmit}
              className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5"
            >
              <div>
                <p className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-[var(--color-ink)]">
                  {t("gateHeading")}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-mute)]">
                  {t("gateIntro")}
                </p>
              </div>

              <label className="block text-sm">
                <span className="mb-1 inline-block font-medium text-[var(--color-ink)]">
                  {t("nameLabel")} <span className="text-[var(--color-accent)]">*</span>
                </span>
                <input
                  ref={firstFieldRef}
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  maxLength={120}
                  className="w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1 inline-block font-medium text-[var(--color-ink)]">
                  {t("emailLabel")} <span className="text-[var(--color-accent)]">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  maxLength={160}
                  className="w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="mb-1 inline-block font-medium text-[var(--color-ink)]">
                    {t("companyLabel")}
                  </span>
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    maxLength={120}
                    className="w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
                  />
                </label>

                <label className="block text-sm">
                  <span className="mb-1 inline-block font-medium text-[var(--color-ink)]">
                    {t("vesselLabel")}
                  </span>
                  <input
                    type="text"
                    name="vessel"
                    maxLength={120}
                    placeholder={t("vesselPlaceholder")}
                    className="w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-mute)]/60 outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1 inline-block font-medium text-[var(--color-ink)]">
                  {t("whatsappLabel")} <span className="text-xs font-normal text-[var(--color-mute)]">({t("whatsappHint")})</span>
                </span>
                <input
                  type="tel"
                  name="whatsapp"
                  autoComplete="tel"
                  maxLength={30}
                  placeholder={t("whatsappPlaceholder")}
                  className="w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-mute)]/60 outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
                />
              </label>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-1 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
              >
                {t("startChat")} &rarr;
              </button>

              <p className="text-xs leading-relaxed text-[var(--color-mute)]">
                {t("legalText")}
              </p>
            </form>
          ) : (
            // CHAT VIEW
            <>
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto bg-[var(--color-sand)]/30 px-4 py-4"
                aria-live="polite"
                aria-atomic="false"
              >
                <div className="flex flex-col gap-3">
                  {messages.map((m, i) => (
                    <MessageBubble key={i} role={m.role} content={m.content} />
                  ))}
                  {streaming && messages[messages.length - 1]?.content === "" && (
                    <MessageBubble role="assistant" content="…" />
                  )}
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-[var(--color-line)] bg-white px-3 py-3 sm:rounded-b-2xl">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    maxLength={2000}
                    placeholder={t("inputPlaceholder")}
                    aria-label={t("inputLabel")}
                    className="flex-1 resize-none rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={streaming || !input.trim()}
                    aria-label={t("sendLabel")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-white transition-colors hover:bg-[var(--color-accent-deep)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-[11px] leading-tight text-[var(--color-mute)]">
                  {t("whatsappFooter", { phone: contact.whatsapp.display })}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

function MessageBubble({ role, content }: { role: Role; content: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-[var(--color-navy)] text-white"
            : "rounded-bl-sm bg-white text-[var(--color-ink)] shadow-sm ring-1 ring-[var(--color-line)]"
        }`}
      >
        {content || <span className="inline-block animate-pulse">…</span>}
      </div>
    </div>
  );
}
