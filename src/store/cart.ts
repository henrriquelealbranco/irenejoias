// Adapted from the original MIT-licensed StoreContext reducer. See LICENSE.
import type { CartItem, ShopState, Product } from "../types.ts";
export type ShopAction =
  | { type: "cart/add"; productId: string; variant: string; qty?: number }
  | { type: "cart/setQty"; productId: string; variant: string; qty: number }
  | { type: "cart/remove"; productId: string; variant: string }
  | { type: "fav/toggle"; productId: string };
const quantity = (n: number) =>
  Number.isFinite(n) ? Math.max(1, Math.min(99, Math.floor(n))) : 1;
export function shopReducer(state: ShopState, action: ShopAction): ShopState {
  if (action.type === "fav/toggle") {
    const favorites = { ...state.favorites };
    if (favorites[action.productId]) delete favorites[action.productId];
    else favorites[action.productId] = true;
    return { ...state, favorites };
  }
  const matches = (item: CartItem) =>
    item.productId === action.productId && item.variant === action.variant;
  if (action.type === "cart/remove")
    return { ...state, cart: state.cart.filter((item) => !matches(item)) };
  if (action.type === "cart/setQty")
    return {
      ...state,
      cart: state.cart.map((item) =>
        matches(item) ? { ...item, qty: quantity(action.qty) } : item,
      ),
    };
  const existing = state.cart.find(matches);
  const cart = existing
    ? state.cart.map((item) =>
        matches(item)
          ? { ...item, qty: quantity(item.qty + quantity(action.qty ?? 1)) }
          : item,
      )
    : [
        ...state.cart,
        {
          productId: action.productId,
          variant: action.variant,
          qty: quantity(action.qty ?? 1),
        },
      ];
  return { ...state, cart };
}
export function subtotal(cart: CartItem[], products: Product[]): number {
  return cart.reduce(
    (sum, item) =>
      sum +
      (products.find((p) => p.id === item.productId)?.priceCents ?? 0) *
        item.qty,
    0,
  );
}
export function sanitizeState(raw: unknown, products: Product[]): ShopState {
  const empty: ShopState = { cart: [], favorites: {} };
  if (!raw || typeof raw !== "object") return empty;
  const source = raw as { cart?: unknown; favorites?: unknown };
  let state = empty;
  if (Array.isArray(source.cart)) {
    for (const line of source.cart) {
      if (!line || typeof line !== "object") continue;
      const product = products.find((p) => p.id === line.productId);
      if (
        !product ||
        typeof line.variant !== "string" ||
        typeof line.qty !== "number" ||
        !Number.isFinite(line.qty) ||
        line.qty < 1
      )
        continue;
      if (
        product.variants.length
          ? !product.variants.includes(line.variant)
          : line.variant !== ""
      )
        continue;
      state = shopReducer(state, {
        type: "cart/add",
        productId: product.id,
        variant: line.variant,
        qty: line.qty,
      });
    }
  }
  if (source.favorites && typeof source.favorites === "object") {
    for (const p of products)
      if ((source.favorites as Record<string, unknown>)[p.id] === true)
        state.favorites[p.id] = true;
  }
  return state;
}
