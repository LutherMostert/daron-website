"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { addCatalogue, saveCatalogueEnquiry, useCatalogueEnquiry } from "@/lib/enquiry-browser";
import { trackEvent } from "@/lib/analytics";

export function AddCatalogue({ file }: { file: string }) {
  const t = useTranslations("Growth"); const items = useCatalogueEnquiry();
  const [error, setError] = useState(false); const selected = items.some(item => item.file === file);
  return <div className="catalogue-add">
    <button type="button" aria-pressed={selected} onClick={() => {
      const saved = selected ? saveCatalogueEnquiry(items.filter(item => item.file !== file)) : addCatalogue(file); setError(!saved);
      if (saved && !selected) trackEvent("Catalogue_Add_To_Enquiry", { catalogue: file });
    }}>{t(selected ? "added" : "addCatalogue")} {selected ? "✓" : "+"}</button>
    {selected && <Link href="/contact#rfq">{t("reviewList", { count: items.length })} →</Link>}
    {error && <p role="alert">{t("listError")}</p>}
  </div>;
}
export function CatalogueEnquiryList() {
  const t = useTranslations("Growth"); const items = useCatalogueEnquiry(); const [error, setError] = useState(false);
  if (!items.length) return null;
  return <section className="enquiry-catalogues" aria-labelledby="catalogue-list-title">
    <h3 id="catalogue-list-title">{t("listTitle", { count: items.length })}</h3>
    <p>{t("listHint")}</p>
    {items.map(item => <div className="enquiry-catalogue" key={item.file}>
      <div className="enquiry-catalogue-heading"><a href={item.file} target="_blank" rel="noopener noreferrer">{item.brand} · {item.title} ↗</a>
        <button type="button" aria-label={`${t("remove")} ${item.title}`} onClick={() => setError(!saveCatalogueEnquiry(items.filter(other => other.file !== item.file)))}>{t("remove")}</button></div>
      <label className="intake-field"><span>{t("itemDetail")}</span><input value={item.detail} maxLength={300} placeholder={t("itemHint")} onChange={event => setError(!saveCatalogueEnquiry(items.map(other => other.file === item.file ? { ...other, detail: event.target.value } : other)))} /></label>
      <label className="intake-field"><span>{t("quantity")}</span><input value={item.quantity} maxLength={80} placeholder={t("quantityHint")} onChange={event => setError(!saveCatalogueEnquiry(items.map(other => other.file === item.file ? { ...other, quantity: event.target.value } : other)))} /></label>
    </div>)}
    <p className="text-xs">{t("browserSaved")}</p>{error && <p role="alert">{t("listError")}</p>}
  </section>;
}
