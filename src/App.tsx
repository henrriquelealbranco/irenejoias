import { useEffect } from "react";
import { StoreProvider } from "./store/StoreContext";
import { useRoute } from "./navigation";
import { PRODUCTS, CATEGORIES } from "./data/products";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";
import { LandingPage } from "./components/LandingPage";
import { CatalogPage } from "./components/CatalogPage";
import { ProductPage } from "./components/ProductPage";
import { CartPage } from "./components/CartPage";
import { FavoritesPage } from "./components/FavoritesPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { BrandPage } from "./components/BrandPage";
import { DemoPage } from "./components/DemoPage";
function Screen() {
  const { path, params } = useRoute();
  const requestedCategory = params.get("categoria") ?? "";
  const category = CATEGORIES.find((c) => c === requestedCategory) ?? "";
  const product = PRODUCTS.find((p) => path === "/produto/" + p.id);
  const title =
    product?.name ??
    (
      {
        "/": "Seu brilho em cada detalhe",
        "/catalogo": category || "Todas as peças",
        "/carrinho": "Meu carrinho",
        "/favoritos": "Meus favoritos",
        "/checkout": "Simulação",
        "/marca": "A Irene",
        "/sobre-a-demo": "Sobre a demonstração",
      } as Record<string, string>
    )[path] ??
    "Página não encontrada";
  useEffect(() => {
    document.title = title + " | Irene Semijoias";
  }, [title]);
  let content;
  if (path === "/") content = <LandingPage />;
  else if (path === "/catalogo")
    content = (
      <CatalogPage
        category={category}
        initialQuery={params.get("busca") ?? ""}
      />
    );
  else if (product)
    content = <ProductPage product={product} key={product.id} />;
  else if (path === "/carrinho") content = <CartPage />;
  else if (path === "/favoritos") content = <FavoritesPage />;
  else if (path === "/checkout") content = <CheckoutPage />;
  else if (path === "/marca") content = <BrandPage />;
  else if (path === "/sobre-a-demo") content = <DemoPage />;
  else
    content = (
      <section className="container emptyState">
        <span className="eyebrow">PÁGINA NÃO ENCONTRADA</span>
        <h1>Vamos encontrar o seu brilho?</h1>
        <p>Este endereço não faz parte da demonstração.</p>
        <a className="primaryButton" href="#/catalogo">
          Explorar as peças
        </a>
      </section>
    );
  return (
    <>
      <a
        className="skipLink"
        href="#conteudo"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("conteudo")?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <Header path={path} category={category} />
      <main id="conteudo" tabIndex={-1}>
        {content}
      </main>
      <Footer />
      <Toast />
    </>
  );
}
export default function App() {
  return (
    <StoreProvider>
      <Screen />
    </StoreProvider>
  );
}
