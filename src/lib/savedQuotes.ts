import type { QuoteFormData } from "@/components/dashboard/quote/quick-quote/QuoteResults";

export interface CarrierInfo {
  name: string;
  logo: string;
  color: string;
}

export interface SavedQuote {
  id: string;
  savedAt: string; // ISO string
  formData: QuoteFormData;
  totalServices: number;
  lowestPrice: number;
  currency: string;
  carriers: CarrierInfo[];
}

const STORAGE_KEY = "hircon_saved_quotes";

export function getSavedQuotes(): SavedQuote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedQuote[]) : [];
  } catch {
    return [];
  }
}

export function saveQuote(quote: Omit<SavedQuote, "id" | "savedAt">): SavedQuote {
  const saved = getSavedQuotes();
  const newQuote: SavedQuote = {
    ...quote,
    id: `quote_${Date.now()}`,
    savedAt: new Date().toISOString(),
  };
  saved.unshift(newQuote); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  return newQuote;
}

export function deleteSavedQuote(id: string): void {
  const saved = getSavedQuotes().filter((q) => q.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}
