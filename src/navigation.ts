import { useEffect, useState } from "react";
export const catalogHref = (category = "", query = "") =>
  "#/catalogo" +
  (category || query
    ? "?" +
      new URLSearchParams({
        ...(category ? { categoria: category } : {}),
        ...(query ? { busca: query } : {}),
      }).toString()
    : "");
export function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const update = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const [path, query = ""] = hash.slice(1).split("?");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [path]);
  return { path: path || "/", params: new URLSearchParams(query) };
}
export const INSTAGRAM = "https://www.instagram.com/irene.semijoias_/";
export const WHATSAPP = "https://wa.me/5542999992166";
