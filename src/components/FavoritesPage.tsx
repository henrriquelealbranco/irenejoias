import { PRODUCTS } from "../data/products";
import { useStore } from "../store/StoreContext";
import { EmptyState } from "./CartPage";
import { ProductCard } from "./ProductCard";
import { DemoNotice } from "./Footer";
export function FavoritesPage() {
  const { state, favCount } = useStore();
  return (
    <section className="container innerPage">
      <div className="breadcrumbs">
        <a href="#/">Início</a>
        <span>/</span>
        <span>Favoritos</span>
      </div>
      <div className="pageHeading">
        <span className="eyebrow">UM ESPAÇO PARA O QUE ENCANTA VOCÊ</span>
        <h1>
          Meus favoritos <span className="headingCount">({favCount})</span>
        </h1>
        <p>Os detalhes que você guardou para olhar de novo.</p>
      </div>
      {favCount ? (
        <div className="productGrid">
          {PRODUCTS.filter((p) => state.favorites[p.id]).map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      ) : (
        <EmptyState kind="favorites" />
      )}
      <DemoNotice />
    </section>
  );
}
