export type Category = "Brincos" | "Colares" | "Anéis" | "Pulseiras";
export type Product = {
  id: string;
  name: string;
  category: Category;
  priceCents: number;
  finish: "Dourado";
  collection: "Essenciais" | "Luz" | "Formas";
  description: string;
  image: string;
  variants: string[];
};
export type CartItem = { productId: string; variant: string; qty: number };
export type ShopState = { cart: CartItem[]; favorites: Record<string, true> };
