import type { Product, ShopState } from "../types";
import { sanitizeState } from "./cart";
export const STORAGE_KEY = "irene_semijoias_demo_v1";
export function loadPersisted(products: Product[]): ShopState {
  try {
    return sanitizeState(
      JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"),
      products,
    );
  } catch {
    return { cart: [], favorites: {} };
  }
}
export function savePersisted(state: ShopState): boolean {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cart: state.cart, favorites: state.favorites }),
    );
    return true;
  } catch {
    return false;
  }
}
