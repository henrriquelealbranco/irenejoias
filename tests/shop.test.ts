import { test } from "node:test";
import assert from "node:assert/strict";
import { shopReducer, subtotal, sanitizeState } from "../src/store/cart.ts";
import { filterProducts } from "../src/data/catalog.ts";
const products = [
  {
    id: "ring",
    name: "Anel Luz",
    category: "Anéis",
    priceCents: 6900,
    finish: "Dourado",
    collection: "Luz",
    description: "Anel delicado",
    image: "",
    variants: ["14", "16"],
  },
  {
    id: "ear",
    name: "Argola Textura",
    category: "Brincos",
    priceCents: 8900,
    finish: "Dourado",
    collection: "Formas",
    description: "Brinco",
    image: "",
    variants: [],
  },
] as any;
test("carrinho mantém aros separados e soma a mesma variação", () => {
  let s: any = { cart: [], favorites: {} };
  s = shopReducer(s, { type: "cart/add", productId: "ring", variant: "14" });
  s = shopReducer(s, { type: "cart/add", productId: "ring", variant: "16" });
  s = shopReducer(s, {
    type: "cart/add",
    productId: "ring",
    variant: "14",
    qty: 2,
  });
  assert.deepEqual(s.cart, [
    { productId: "ring", variant: "14", qty: 3 },
    { productId: "ring", variant: "16", qty: 1 },
  ]);
  assert.equal(subtotal(s.cart, products), 27600);
});
test("quantidades são inteiras de 1 a 99 e remover afeta só um aro", () => {
  let s: any = {
    cart: [
      { productId: "ring", variant: "14", qty: 1 },
      { productId: "ring", variant: "16", qty: 1 },
    ],
    favorites: {},
  };
  s = shopReducer(s, {
    type: "cart/setQty",
    productId: "ring",
    variant: "14",
    qty: 1000,
  });
  assert.equal(s.cart[0].qty, 99);
  s = shopReducer(s, {
    type: "cart/setQty",
    productId: "ring",
    variant: "14",
    qty: -2,
  });
  assert.equal(s.cart[0].qty, 1);
  s = shopReducer(s, {
    type: "cart/setQty",
    productId: "ring",
    variant: "14",
    qty: 2.7,
  });
  assert.equal(s.cart[0].qty, 2);
  s = shopReducer(s, { type: "cart/remove", productId: "ring", variant: "14" });
  assert.deepEqual(s.cart, [{ productId: "ring", variant: "16", qty: 1 }]);
});
test("restaurar descarta dados corrompidos, produtos desconhecidos e aros inválidos", () => {
  assert.deepEqual(sanitizeState(null, products), { cart: [], favorites: {} });
  assert.deepEqual(
    sanitizeState(
      {
        cart: [
          { productId: "ring", variant: "14", qty: 2 },
          { productId: "ring", variant: "90", qty: 1 },
          { productId: "missing", variant: "", qty: 1 },
          { productId: "ear", variant: "", qty: "3" },
        ],
        favorites: { ring: true, ear: false, missing: true },
        personalData: { email: "discard" },
      },
      products,
    ),
    {
      cart: [{ productId: "ring", variant: "14", qty: 2 }],
      favorites: { ring: true },
    },
  );
});
test("favoritos alternam sem remover o carrinho", () => {
  const s: any = {
    cart: [{ productId: "ear", variant: "", qty: 1 }],
    favorites: {},
  };
  const saved = shopReducer(s, { type: "fav/toggle", productId: "ear" });
  assert.equal(saved.favorites.ear, true);
  assert.deepEqual(
    shopReducer(saved, { type: "fav/toggle", productId: "ear" }),
    s,
  );
});
test("busca ignora acentos e combina categoria, coleção, teto de preço e ordenação", () => {
  assert.deepEqual(
    filterProducts(products, {
      query: "aneis",
      category: "Anéis",
      collection: "Luz",
      maxPrice: 7000,
    }).map((p) => p.id),
    ["ring"],
  );
  assert.equal(
    filterProducts(products, { query: "anel", category: "Brincos" }).length,
    0,
  );
  assert.deepEqual(
    filterProducts(products, { sort: "preco-desc" }).map((p) => p.id),
    ["ear", "ring"],
  );
  assert.deepEqual(filterProducts(products, { maxPrice: 5000 }), []);
});
