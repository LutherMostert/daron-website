import { parseContact, buildRfqEmail, MAX_FILE_BYTES, ACCEPTED_EXTENSIONS } from "@/lib/rfq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Attachment = {
  name: string;
  type: string;
  size: number;
  base64: string;
};

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

function extension(name: string) {
  const lower = name.toLowerCase();
  return ACCEPTED_EXTENSIONS.find((ext) => lower.endsWith(ext));
}

function beginsWith(bytes: Uint8Array, signature: number[]) {
  return signature.every((value, index) => bytes[index] === value);
}

function contentMatchesExtension(bytes: Uint8Array, ext: string): boolean {
  if (ext === ".pdf") return beginsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d]);
  if (ext === ".docx" || ext === ".xlsx") {
    return (
      beginsWith(bytes, [0x50, 0x4b, 0x03, 0x04]) ||
      beginsWith(bytes, [0x50, 0x4b, 0x05, 0x06]) ||
      beginsWith(bytes, [0x50, 0x4b, 0x07, 0x08])
    );
  }
  if (ext === ".doc" || ext === ".xls") {
    return beginsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
  }
  if (ext === ".csv" || ext === ".txt") {
    if (bytes.some((value) => value === 0)) return false;
    try {
      new TextDecoder("utf-8", { fatal: true }).decode(bytes.slice(0, 8192));
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength > MAX_FILE_BYTES + 128 * 1024) return Response.json({ error: "Request is too large. Attach a file smaller than 4 MB." }, { status: 413 });
  const contentType = request.headers.get("content-type") || "";
  let raw: Record<string, unknown> = {};
  let attachment: Attachment | undefined;

  if (contentType.includes("multipart/form-data")) {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    raw = {
      requestType: formData.get("requestType"),
      website: formData.get("website"),
      firstName: formData.get("firstName"),
      surname: formData.get("surname"),
      company: formData.get("company"),
      vessel: formData.get("vessel"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      deliveryPoint: formData.get("deliveryPoint"),
      urgency: formData.get("urgency"),
      category: formData.get("category"),
      preferredContact: formData.get("preferredContact"),
      message: formData.get("message"),
      catalogueSelections: formData.get("catalogueSelections"),
      sourceContext: formData.get("sourceContext"),
      multiLocation: formData.get("multiLocation"),
    };

    const file = formData.get("rfqFile");
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) {
        return Response.json({ error: "File is too large - 4 MB maximum." }, { status: 413 });
      }
      const ext = extension(file.name);
      if (!ext) {
        return Response.json({ error: "Unsupported file type. Use Excel, PDF, Word, CSV or TXT." }, { status: 400 });
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      if (!contentMatchesExtension(bytes, ext)) {
        return Response.json(
          { error: "The attachment content does not match its file type. Please export it again and retry." },
          { status: 400 },
        );
      }
      attachment = {
        name: clean(file.name, 160),
        type: clean(file.type, 100),
        size: file.size,
        base64: Buffer.from(bytes).toString("base64"),
      };
    }
  } else {
    try {
      raw = (await request.json()) as Record<string, unknown>;
    } catch {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return Response.json({ error: "Invalid request." }, { status: 400 });
  if (raw.website) return Response.json({ error: "Invalid request." }, { status: 400 });
  const parsed = parseContact(raw, Boolean(attachment));
  if (!parsed.fields) return Response.json({ error: parsed.error }, { status: 400 });
  const preview = buildRfqEmail(parsed.fields, "PREVIEW-NOT-SENT", new Date().toISOString(), attachment);
  return Response.json({
    ok: true, preview: true, subject: preview.subject,
    text: preview.text.replace("— attached to this email", "— validated for preview, not sent"),
  }, { headers: { "Cache-Control": "no-store" } });
}
