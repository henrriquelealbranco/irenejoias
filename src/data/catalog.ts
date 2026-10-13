import type { Product } from "../types.ts";
export type CatalogFilter = {
  category?: string;
  query?: string;
  collection?: string;
  maxPrice?: number;
  sort?: string;
};
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function filterProducts(items: Product[], f: CatalogFilter): Product[] {
  const words = normalize(f.query?.trim() ?? "")
    .split(/\s+/)
    .filter(Boolean);
  const filtered = items.filter((p) => {
    const hay = normalize(
      [p.name, p.category, p.collection, p.description, p.finish].join(" "),
    );
    return (
      (!f.category || p.category === f.category) &&
      (!f.collection || p.collection === f.collection) &&
      (f.maxPrice === undefined || p.priceCents <= f.maxPrice) &&
      words.every((word) => hay.includes(word))
    );
  });
  if (f.sort === "preco-asc")
    filtered.sort((a, b) => a.priceCents - b.priceCents);
  if (f.sort === "preco-desc")
    filtered.sort((a, b) => b.priceCents - a.priceCents);
  if (f.sort === "nome")
    filtered.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  return filtered;
}
