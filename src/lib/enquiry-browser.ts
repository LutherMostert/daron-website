"use client";
import { useSyncExternalStore } from "react";
import { parseCatalogueSelections, type CatalogueSelection, MAX_CATALOGUES } from "./enquiry-context";

const KEY = "daron:catalogue-enquiry:v1";
const EVENT = "daron:enquiry-change";
function snapshot() { try { return localStorage.getItem(KEY) || "[]"; } catch { return "[]"; } }
function subscribe(notify: () => void) {
  window.addEventListener("storage", notify); window.addEventListener(EVENT, notify);
  return () => { window.removeEventListener("storage", notify); window.removeEventListener(EVENT, notify); };
}
export function useCatalogueEnquiry() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  return parseCatalogueSelections(raw).items;
}
export function saveCatalogueEnquiry(items: CatalogueSelection[]) {
  if (items.length > MAX_CATALOGUES || parseCatalogueSelections(items).error) return false;
  try { localStorage.setItem(KEY, JSON.stringify(items)); window.dispatchEvent(new Event(EVENT)); return true; } catch { return false; }
}
export function addCatalogue(file: string) {
  const items = parseCatalogueSelections(snapshot()).items;
  return items.some(item => item.file === file) || saveCatalogueEnquiry([...items, { file, detail: "", quantity: "" }]);
}
