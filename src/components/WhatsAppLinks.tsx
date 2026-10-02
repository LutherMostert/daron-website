import { contact } from "@/lib/site";

type Props = {
  className?: string;
  message?: string;
  showNumber?: boolean;
};

/** Direct, named contacts; usable in both server and client component trees. */
export function WhatsAppLinks({ className, message, showNumber = false }: Props) {
  return (
    <>
      {contact.whatsapp.contacts.map((person) => (
        <a
          key={person.name}
          href={message ? `${person.href}?text=${encodeURIComponent(message)}` : person.href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          title={`${person.name} · ${person.display}`}
        >
          WhatsApp {person.name}{showNumber ? ` · ${person.display}` : ""} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </>
  );
}
