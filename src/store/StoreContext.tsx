// React context and derived cart state adapted from Lumiere. Copyright (c) 2026 Mehrab Gholamsamani (MIT).
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
  type Dispatch,
} from "react";
import { PRODUCTS } from "../data/products";
import { shopReducer, subtotal, type ShopAction } from "./cart";
import { loadPersisted, savePersisted } from "./storage";
import type { ShopState } from "../types";
const StoreCtx = createContext<{
  state: ShopState;
  dispatch: Dispatch<ShopAction>;
  cartCount: number;
  cartSubtotalCents: number;
  favCount: number;
  toast: string;
  notify: (message: string) => void;
  storageAvailable: boolean;
} | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shopReducer, PRODUCTS, loadPersisted);
  const [toast, setToast] = useState("");
  const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => {
    setStorageAvailable(savePersisted(state));
  }, [state]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  return (
    <StoreCtx.Provider
      value={{
        state,
        dispatch,
        cartCount: state.cart.reduce((n, line) => n + line.qty, 0),
        cartSubtotalCents: subtotal(state.cart, PRODUCTS),
        favCount: Object.keys(state.favorites).length,
        toast,
        notify: setToast,
        storageAvailable,
      }}
    >
      {children}
    </StoreCtx.Provider>
  );
}
export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("StoreProvider ausente");
  return ctx;
}
