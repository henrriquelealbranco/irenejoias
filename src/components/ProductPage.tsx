import { useRef, useState } from "react";
import type { Product } from "../types";
import { PRODUCTS } from "../data/products";
import { catalogHref } from "../navigation";
import { useStore } from "../store/StoreContext";
import { formatPrice } from "../utils";
import { Icon } from "./Icon";
import { ProductImage } from "./ProductImage";
import { ProductCard } from "./ProductCard";
import { DemoNotice } from "./Footer";
import { Modal } from "./Modal";
export function ProductPage({ product }: { product: Product }) {
  const { state, dispatch, notify } = useStore();
  const [view, setView] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [variant, setVariant] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const startX = useRef<number | null>(null);
  const favorite = !!state.favorites[product.id];
  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  function add() {
    if (product.variants.length && !variant) {
      setError(true);
      document.getElementById("variation-options")?.focus();
      return;
    }
    dispatch({ type: "cart/add", productId: product.id, variant, qty });
    notify(product.name + " adicionada ao carrinho.");
    setAdded(true);
  }
  return (
    <div className="container innerPage productPage">
      <div className="breadcrumbs">
        <a href="#/">Início</a>
        <span>/</span>
        <a href={catalogHref(product.category)}>{product.category}</a>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <section className="productLayout">
        <div className="gallery">
          <button
            className={"mainProductImage" + (view === 1 ? " detailView" : "")}
            onClick={() => setZoom(true)}
            aria-label={"Ampliar fotografia de " + product.name}
            onTouchStart={(e) => {
              startX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (
                startX.current !== null &&
                Math.abs(e.changedTouches[0].clientX - startX.current) > 45
              )
                setView(view === 0 ? 1 : 0);
              startX.current = null;
            }}
          >
            <ProductImage product={product} loading="eager" />
            <span className="imageCaption">
              Fotografia ilustrativa{view === 1 ? " · recorte de detalhe" : ""}
            </span>
            <span className="zoomIcon">
              <Icon name="zoom" width={20} height={20} />
            </span>
          </button>
          <div className="galleryBottom">
            <div className="thumbnails">
              {["Peça", "Detalhe"].map((label, i) => (
                <button
                  key={label}
                  className={
                    "thumbnail" +
                    (view === i ? " selected" : "") +
                    (i === 1 ? " detailThumb" : "")
                  }
                  aria-label={"Ver " + label.toLowerCase()}
                  aria-pressed={view === i}
                  onClick={() => setView(i)}
                >
                  <ProductImage product={product} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <span className="galleryHint">
              Toque para ampliar
              <br />
              <small>
                {view + 1} / 2 ·{" "}
                {view === 0 ? "Peça completa" : "Recorte da mesma foto"}
              </small>
            </span>
          </div>
          <p className="photoDisclaimer">
            Imagem de banco de imagens. Não representa uma peça real da Irene.
          </p>
        </div>
        <div className="productDetails">
          <span className="eyebrow">
            COLEÇÃO {product.collection.toUpperCase()} · DEMONSTRATIVA
          </span>
          <h1>{product.name}</h1>
          <p className="productLead">Seu brilho está nos detalhes.</p>
          <div className="productPrice">
            {formatPrice(product.priceCents)}
            <span>Preço demonstrativo</span>
          </div>
          <p className="description">{product.description}</p>
          <div className="finishRow">
            <span className="goldSwatch" />
            <span>Visual dourado</span>
            <span className="demoAvailability">Disponível na simulação</span>
          </div>
          {product.variants.length > 0 && (
            <fieldset
              id="variation-options"
              className="variationOptions"
              tabIndex={-1}
              aria-describedby={error ? "variation-error" : undefined}
            >
              <legend>
                Escolha o aro <span>· demonstrativo</span>
              </legend>
              <div>
                {product.variants.map((v) => (
                  <label
                    className={"variation" + (variant === v ? " selected" : "")}
                    key={v}
                  >
                    <input
                      type="radio"
                      name="aro"
                      value={v}
                      checked={variant === v}
                      onChange={() => {
                        setVariant(v);
                        setError(false);
                        setAdded(false);
                      }}
                    />
                    {v}
                  </label>
                ))}
              </div>
              {error && (
                <p id="variation-error" className="fieldError" role="alert">
                  Selecione um aro para adicionar a peça.
                </p>
              )}
            </fieldset>
          )}
          <div className="purchaseRow">
            <div className="quantityControl">
              <button
                aria-label="Diminuir quantidade"
                disabled={qty <= 1}
                onClick={() => setQty(qty - 1)}
              >
                <Icon name="minus" width={17} height={17} />
              </button>
              <span aria-live="polite">{qty}</span>
              <button
                aria-label="Aumentar quantidade"
                disabled={qty >= 99}
                onClick={() => setQty(qty + 1)}
              >
                <Icon name="plus" width={17} height={17} />
              </button>
            </div>
            <button className="primaryButton" onClick={add}>
              <Icon name="bag" width={19} height={19} /> Adicionar ao carrinho
            </button>
          </div>
          {added && (
            <div className="addedNotice" role="status">
              <Icon name="check" width={17} height={17} /> Peça adicionada.{" "}
              <a href="#/carrinho">
                Ver carrinho <span>→</span>
              </a>
            </div>
          )}
          <button
            className="saveProduct textLink"
            aria-pressed={favorite}
            onClick={() => {
              dispatch({ type: "fav/toggle", productId: product.id });
              notify(
                favorite
                  ? "Peça removida dos favoritos."
                  : "Peça salva nos favoritos.",
              );
            }}
          >
            <Icon name="heart" width={19} height={19} />
            {favorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
          </button>
          <div className="productAccordions">
            <details open>
              <summary>
                Sobre esta peça <span>+</span>
              </summary>
              <p>
                Esta peça faz parte de um catálogo fictício para apresentar a
                experiência da loja. Nome, preço, aro e disponibilidade são
                exemplos. Materiais, medidas e informações técnicas serão
                definidos com o catálogo real da Irene.
              </p>
            </details>
            <details>
              <summary>
                Como funciona a demonstração <span>+</span>
              </summary>
              <p>
                Você pode salvar favoritos, montar seu carrinho e simular o
                checkout. Nenhum pedido ou pagamento será realizado.
              </p>
              <a className="textLink" href="#/sobre-a-demo">
                Entenda a proposta <Icon name="arrow" width={17} height={17} />
              </a>
            </details>
          </div>
        </div>
      </section>
      <section className="relatedSection">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">CONTINUE SE INSPIRANDO</span>
            <h2>Outros detalhes para você.</h2>
          </div>
          <a className="textLink" href={catalogHref(product.category)}>
            Ver {product.category.toLowerCase()}{" "}
            <Icon name="arrow" width={19} height={19} />
          </a>
        </div>
        <div className="productGrid relatedGrid">
          {related.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </section>
      <DemoNotice />
      <Modal
        open={zoom}
        onClose={() => setZoom(false)}
        title={"Fotografia ampliada de " + product.name}
        className="imageModal"
      >
        <ProductImage product={product} loading="eager" />
        <p>Fotografia ilustrativa · {product.name}</p>
        <p className="small">
          Não representa uma peça real da Irene Semijoias.
        </p>
      </Modal>
    </div>
  );
}
