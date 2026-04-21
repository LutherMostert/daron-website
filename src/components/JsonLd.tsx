type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
};

/**
 * Inject JSON-LD into a page.
 * Server component — Next.js App Router places this in `<head>` automatically
 * when used inside a layout/page tree.
 */
export function JsonLd({ data, id }: Props) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
