import { useEffect, useState } from "react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { filterProducts } from "../data/catalog";
import { catalogHref } from "../navigation";
import { ProductCard } from "./ProductCard";
import { DemoNotice } from "./Footer";
import { Icon } from "./Icon";
export function CatalogPage({
  category,
  initialQuery,
}: {
  category: string;
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [collection, setCollection] = useState("");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sort, setSort] = useState("destaques");
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => {
    setQuery(initialQuery);
    setCollection("");
    setMaxPrice(20000);
  }, [category, initialQuery]);
  const items = filterProducts(PRODUCTS, {
    category,
    query,
    collection,
    maxPrice,
    sort,
  });
  function clear() {
    setQuery("");
    setCollection("");
    setMaxPrice(20000);
    setSort("destaques");
  }
  return (
    <section className="container innerPage">
      <div className="breadcrumbs">
        <a href="#/">Início</a>
        <span>/</span>
        <span>{category || "Todas as peças"}</span>
      </div>
      <div className="pageHeading">
        <span className="eyebrow">EXPLORE O SEU BRILHO</span>
        <h1>{category || "Todas as peças"}</h1>
        <p>Encontre aquele detalhe que tem tudo a ver com você.</p>
      </div>
      <div className="categoryChips" aria-label="Categorias">
        <a className={!category ? "selected" : ""} href={catalogHref()}>
          Todas
        </a>
        {CATEGORIES.map((c) => (
          <a
            className={category === c ? "selected" : ""}
            href={catalogHref(c)}
            key={c}
          >
            {c}
          </a>
        ))}
      </div>
      <div className="catalogToolbar">
        <div className="searchField">
          <Icon name="search" width={20} height={20} />
          <label className="srOnly" htmlFor="catalog-search">
            Buscar no catálogo
          </label>
          <input
            id="catalog-search"
            type="search"
            placeholder="Busque uma peça, um detalhe..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className="outlineButton filterToggle"
          aria-expanded={filtersOpen}
          aria-controls="catalog-filters"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <Icon name="filter" width={18} height={18} /> Filtros
          {(collection || maxPrice < 20000) && <span> · ativos</span>}
        </button>
        <label className="sortLabel">
          Ordenar por
          <select
            aria-label="Ordenar peças"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="destaques">Seleção da coleção</option>
            <option value="preco-asc">Menor preço</option>
            <option value="preco-desc">Maior preço</option>
            <option value="nome">Nome: A a Z</option>
          </select>
        </label>
      </div>
      <div
        id="catalog-filters"
        className={"filterControls" + (filtersOpen ? " filtersOpen" : "")}
      >
        <label>
          Coleção demonstrativa
          <select
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          >
            <option value="">Todas as coleções</option>
            <option>Essenciais</option>
            <option>Luz</option>
            <option>Formas</option>
          </select>
        </label>
        <label>
          Preço máximo: R$ {(maxPrice / 100).toFixed(0)}
          <input
            type="range"
            aria-label="Preço máximo"
            min="6000"
            max="20000"
            step="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
        <button className="textLink" onClick={clear}>
          Limpar filtros <Icon name="x" width={15} height={15} />
        </button>
      </div>
      <div className="resultsCount" role="status">
        {items.length}{" "}
        {items.length === 1 ? "peça encontrada" : "peças encontradas"}
        {query && <span> para “{query}”</span>}
      </div>
      {items.length ? (
        <div className="productGrid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="emptyState">
          <Icon name="search" width={32} height={32} />
          <h2>Nenhuma peça por aqui.</h2>
          <p>Tente outra busca ou limpe os filtros para explorar a coleção.</p>
          <button className="primaryButton" onClick={clear}>
            Limpar busca e filtros
          </button>
          {category && (
            <a className="textLink" href={catalogHref()}>
              Ver todas as categorias{" "}
              <Icon name="arrow" width={18} height={18} />
            </a>
          )}
        </div>
      )}
      <DemoNotice />
    </section>
  );
}
