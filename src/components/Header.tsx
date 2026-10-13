import { useEffect, useRef, useState, type FormEvent } from "react";
import { useStore } from "../store/StoreContext";
import { CATEGORIES } from "../data/products";
import { catalogHref, INSTAGRAM } from "../navigation";
import { Icon } from "./Icon";
export function Wordmark() {
  return (
    <span className="wordmark">
      <span>
        irene<span className="wordmarkDot">.</span>
      </span>
      <small>SEMIJOIAS</small>
    </span>
  );
}
export function Header({ path, category }: { path: string; category: string }) {
  const { cartCount, favCount } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [path, category]);
  useEffect(() => {
    if (search) input.current?.focus();
  }, [search]);
  function submit(e: FormEvent) {
    e.preventDefault();
    window.location.hash = catalogHref("", query).slice(1);
    setSearch(false);
    setQuery("");
  }
  return (
    <header className="siteHeader">
      <div className="topbar">
        <span>De Guarapuava, para todo o Brasil</span>
        <a href="#/sobre-a-demo">
          <span className="desktopDemo">Experiência demonstrativa</span>
          <span className="mobileDemo">Demonstração</span>
        </a>
      </div>
      <div className="headerMain container">
        <div className="headerLeft">
          <button
            className="iconButton mobileMenu"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            aria-controls="main-navigation"
            onClick={() => {
              setMenu(!menu);
              setSearch(false);
            }}
          >
            <Icon name={menu ? "x" : "menu"} width={22} height={22} />
          </button>
          <a
            className="socialHeader"
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="instagram" width={18} height={18} />
            <span>@irene.semijoias_</span>
            <span className="srOnly"> (abre em nova aba)</span>
          </a>
        </div>
        <a className="brand" href="#/" aria-label="Irene Semijoias — início">
          <Wordmark />
        </a>
        <div className="headerActions">
          <button
            className="iconButton"
            aria-label={search ? "Fechar busca" : "Abrir busca"}
            aria-expanded={search}
            aria-controls="header-search"
            onClick={() => {
              setSearch(!search);
              setMenu(false);
            }}
          >
            <Icon name={search ? "x" : "search"} width={22} height={22} />
          </button>
          <a
            className="iconButton favoritesLink"
            href="#/favoritos"
            aria-label={"Favoritos, " + favCount + " peças"}
          >
            <Icon name="heart" width={22} height={22} />
            {favCount > 0 && <span className="counter">{favCount}</span>}
          </a>
          <a
            className="iconButton"
            href="#/carrinho"
            aria-label={"Carrinho, " + cartCount + " itens"}
          >
            <Icon name="bag" width={22} height={22} />
            {cartCount > 0 && <span className="counter">{cartCount}</span>}
          </a>
        </div>
      </div>
      <nav
        id="main-navigation"
        className={"mainNav" + (menu ? " menuOpen" : "")}
        aria-label="Navegação principal"
      >
        <a
          href={catalogHref()}
          aria-current={path === "/catalogo" && !category ? "page" : undefined}
        >
          Todas as peças
        </a>
        {CATEGORIES.map((c) => (
          <a
            key={c}
            href={catalogHref(c)}
            aria-current={
              path === "/catalogo" && category === c ? "page" : undefined
            }
          >
            {c}
          </a>
        ))}
        <a href="#/marca" aria-current={path === "/marca" ? "page" : undefined}>
          A Irene
        </a>
        <a className="mobileFavorites" href="#/favoritos">
          Meus favoritos{favCount > 0 ? " (" + favCount + ")" : ""}
        </a>
      </nav>
      {search && (
        <form
          id="header-search"
          className="headerSearch container"
          onSubmit={submit}
          role="search"
        >
          <label className="srOnly" htmlFor="global-search">
            Buscar peças
          </label>
          <Icon name="search" width={22} height={22} />
          <input
            ref={input}
            id="global-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que você está procurando?"
            onKeyDown={(e) => {
              if (e.key === "Escape") setSearch(false);
            }}
          />
          <button className="textLink" type="submit">
            Buscar <Icon name="arrow" width={18} height={18} />
          </button>
        </form>
      )}
    </header>
  );
}
